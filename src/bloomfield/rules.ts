export function ageOn(dob: string, cutoff = "2027-03-31"): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const [y, m, d] = dob.split("-").map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  if (
    parsed.getUTCFullYear() !== y ||
    parsed.getUTCMonth() !== m - 1 ||
    parsed.getUTCDate() !== d ||
    dob > cutoff
  )
    return null;
  const [cy, cm, cd] = cutoff.split("-").map(Number);
  return cy - y - (cm < m || (cm === m && cd < d) ? 1 : 0);
}
export function eligibility(dob: string, grade: string) {
  const age = ageOn(dob);
  if (age === null)
    return {
      age: null,
      status: "Enter a valid date of birth before the cutoff.",
    };
  const min = grade === "LKG" ? 4 : grade === "UKG" ? 5 : Number(grade) + 5;
  return {
    age,
    status:
      age >= min && age <= min + 1
        ? "Indicatively eligible"
        : "Office review required",
  };
}
export function feeEstimate(stage: string, transport: boolean, meals: boolean) {
  const tuition: Record<string, number> = {
    "early-years": 54000,
    primary: 72000,
    middle: 84000,
    senior: 96000,
  };
  const lines = [
    {
      label: "Annual tuition",
      amount: tuition[stage] ?? null,
      frequency: "Annual",
    },
    { label: "Admission fee", amount: 15000, frequency: "One-time" },
    ...(transport
      ? [{ label: "School transport", amount: 18000, frequency: "Annual" }]
      : []),
    ...(meals
      ? [{ label: "Meal plan", amount: 12000, frequency: "Annual" }]
      : []),
  ];
  const recurring = lines
    .filter((l) => l.frequency === "Annual")
    .reduce((s, l) => s + (l.amount || 0), 0);
  return { lines, recurring, total: recurring + 15000 };
}
export function validateFile(
  file: { name: string; size: number },
  assignment = false,
) {
  const pattern = assignment
    ? /\.(pdf|jpe?g|png|docx)$/i
    : /\.(pdf|jpe?g|png)$/i;
  return (
    pattern.test(file.name) && file.size <= (assignment ? 20 : 10) * 1024 * 1024
  );
}
