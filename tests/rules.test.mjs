import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ageOn,
  eligibility,
  feeEstimate,
  validateFile,
} from "../src/bloomfield/rules.ts";
test("Exact cutoff respects the birthday boundary", () => {
  assert.equal(ageOn("2021-03-31"), 6);
  assert.equal(ageOn("2021-04-01"), 5);
  assert.equal(eligibility("2021-03-31", "1").status, "Indicatively eligible");
  assert.equal(eligibility("2021-04-01", "1").status, "Office review required");
});
test("Leap day dates and impossible dates are distinguished", () => {
  assert.equal(ageOn("2020-02-29"), 7);
  assert.equal(ageOn("2021-02-29"), null);
  assert.equal(ageOn("2027-04-01"), null);
  assert.equal(ageOn("invalid"), null);
});
test("Fee totals separate annual services from admission charge", () => {
  const base = feeEstimate("primary", false, false);
  assert.equal(base.total, 87000);
  assert.equal(base.recurring, 72000);
  const all = feeEstimate("primary", true, true);
  assert.equal(all.total, 117000);
  assert.equal(all.recurring, 102000);
  assert.equal(
    all.lines.reduce((s, l) => s + (l.amount || 0), 0),
    all.total,
  );
});
test("Unknown tuition remains explicit and upload constraints differ by use", () => {
  assert.equal(feeEstimate("unknown", false, false).lines[0].amount, null);
  assert.equal(
    validateFile({ name: "birth.pdf", size: 10 * 1024 * 1024 }),
    true,
  );
  assert.equal(
    validateFile({ name: "birth.pdf", size: 10 * 1024 * 1024 + 1 }),
    false,
  );
  assert.equal(validateFile({ name: "bad.exe", size: 10 }), false);
  assert.equal(
    validateFile({ name: "work.docx", size: 19 * 1024 * 1024 }, true),
    true,
  );
  assert.equal(validateFile({ name: "work.docx", size: 1024 }), false);
});
