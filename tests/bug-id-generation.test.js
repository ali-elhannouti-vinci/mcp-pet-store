import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("POST /pets should generate monotonically increasing ids, even after deletion", async () => {
  const initialRes = await request(app).get("/pets");
  assert.equal(initialRes.status, 200);

  const initialPets = initialRes.body;
  const maxId = Math.max(...initialPets.map((p) => p.id));

  const toDelete = maxId;
  const delRes = await request(app).delete(`/pets/${toDelete}`);
  assert.ok([204, 404].includes(delRes.status));

  const createRes = await request(app)
    .post("/pets")
    .send({ name: "NewAfterDelete", tag: "dog" });

  assert.equal(createRes.status, 201);
  const newPet = createRes.body;

  assert.ok(
    newPet.id > maxId,
    `Expected new id > ${maxId}, got ${newPet.id}`
  );
});
