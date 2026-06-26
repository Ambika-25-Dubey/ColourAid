import test from "node:test";
import assert from "node:assert";
import farnsworthService from "../services/farnsworthService.js";

test("Farnsworth D-15 scoring calculations", async (t) => {
  await t.test("should correctly identify normal color vision", () => {
    const perfectOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const results = farnsworthService.calculateFarnsworthD15Results(perfectOrder);
    
    assert.strictEqual(results.deficiencyType, "normal");
    assert.strictEqual(results.totalError, 15);
    assert.strictEqual(results.errorMargin, 0);
    assert.strictEqual(results.severity, 0);
  });

  await t.test("should identify red-green deficiency (Protan/Deutan style major crossings)", () => {
    // A sequence with multiple crossover errors
    const crossoverOrder = [0, 1, 15, 14, 2, 3, 13, 12, 4, 5, 11, 10, 6, 7, 9, 8];
    const results = farnsworthService.calculateFarnsworthD15Results(crossoverOrder);
    
    assert.strictEqual(results.deficiencyType, "possible_red_green");
    assert.ok(results.crossingErrors >= 2);
  });

  await t.test("should handle empty or invalid arrays", () => {
    const emptyResult = farnsworthService.calculateFarnsworthD15Results([]);
    assert.strictEqual(emptyResult, null);
    
    const invalidResult = farnsworthService.calculateFarnsworthD15Results(null);
    assert.strictEqual(invalidResult, null);
  });
});
