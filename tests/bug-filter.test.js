import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /pets?tag=... should filter case-insensitively", async () => {
  const resLower = await request(app).get("/pets?tag=dog");
  assert.equal(resLower.status, 200);
  assert.ok(resLower.body.length > 0, "should have at least one dog");

  const resUpper = await request(app).get("/pets?tag=Dog");
  assert.equal(resUpper.status, 200);

  assert.equal(
    resUpper.body.length,
    resLower.body.length,
    "tag filter should be case-insensitive"
  );
});
