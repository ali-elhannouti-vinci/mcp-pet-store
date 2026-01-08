import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("POST /pets should reject pet without name", async () => {
  const res = await request(app)
    .post("/pets")
    .send({ tag: "dog" });

  assert.equal(res.status, 400);
});

test("POST /pets should reject pet without tag", async () => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "NoTagPet" });

  assert.equal(res.status, 400, "pet without tag should be rejected");
});
