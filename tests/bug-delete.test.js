import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("DELETE /pets/:id should actually remove the pet", async () => {
  const createRes = await request(app)
    .post("/pets")
    .send({ name: "ToDelete", tag: "test" });

  assert.equal(createRes.status, 201);
  const petId = createRes.body.id;

  const delRes = await request(app).delete(`/pets/${petId}`);
  assert.equal(delRes.status, 204);

  const listRes = await request(app).get("/pets");
  assert.equal(listRes.status, 200);
  const found = listRes.body.find((p) => p.id === petId);

  assert.equal(found, undefined, "deleted pet should not be found anymore");

  const getRes = await request(app).get(`/pets/${petId}`);
  assert.equal(getRes.status, 404);
});
