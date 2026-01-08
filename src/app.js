import express from "express";
import { db } from "./db.js";

const app = express();
app.use(express.json());

// BUG 1: validation incomplète / incorrecte pour POST /pets
// BUG 2: génération d'id basée sur la longueur du tableau -> peut réutiliser un id supprimé
// BUG 3: filtre de tag strictement sensible à la casse alors que l'OpenAPI parle de case-insensitive
// BUG 4: DELETE /pets/:id renvoie 204 mais ne supprime pas vraiment l'élément

// GET /pets?tag=...
app.get("/pets", (req, res) => {
  const { tag } = req.query;
  let pets = db.pets;

  if (tag) {
    // BUG 3 : filtre case-sensitive, alors qu'on voudrait du case-insensitive
    pets = pets.filter((p) => p.tag === tag);
  }

  res.status(200).json(pets);
});

// GET /pets/:id
app.get("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  const pet = db.pets.find((p) => p.id === id);

  if (!pet) {
    return res.sendStatus(404);
  }

  res.status(200).json(pet);
});

// POST /pets
app.post("/pets", (req, res) => {
  const pet = req.body;

  // BUG 1 : validation très laxiste, accepte presque tout
  // On ne vérifie que name, pas tag, et aucun type
  if (!pet?.name) {
    // On ne renvoie 400 que si name est complètement absent
    return res.status(400).json({ error: "Invalid pet" });
  }

  // BUG 2 : génération d'id basée sur la longueur -> collision possible après DELETE
  const id = db.pets.length + 1;

  const newPet = {
    id,
    name: pet.name,
    tag: pet.tag ?? "unknown" // tag par défaut douteux
  };

  db.pets.push(newPet);
  res.status(201).json(newPet);
});

// DELETE /pets/:id
app.delete("/pets/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = db.pets.find((p) => p.id === id);

  if (!existing) {
    return res.sendStatus(404);
  }

  // BUG 4 : on calcule un nouveau tableau, mais on ne le réassigne pas à db.pets
  db.pets.filter((p) => p.id !== id);

  // On renvoie 204 comme si tout allait bien
  res.sendStatus(204);
});

export default app;

// Pour lancer en standalone : node src/app.js
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`PetStore MCP Demo listening on port ${port}`);
  });
}
