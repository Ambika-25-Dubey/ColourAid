import test from "node:test";
import assert from "node:assert";
import daltonizationService from "../services/daltonizationService.js";

test("Daltonization Service validation", async (t) => {
  await t.test("should export processImage and processProtanopia functions", () => {
    assert.strictEqual(typeof daltonizationService.processImage, "function");
    assert.strictEqual(typeof daltonizationService.processProtanopia, "function");
  });
});
