/** Finite public sample knowledge. This module never reads private/demo storage or executes actions. */
export function answerQuestion(question: string): {
  text: string;
  source: string;
  state: "known" | "unknown" | "review" | "private" | "blocked";
} {
  const q = question.toLowerCase();
  if (
    /ignore (all |previous |your )?instructions|system prompt|bypass|reveal secret|api key|grant.*admin|change.*marks|waive.*fee|pay.*automatically|accept.*application|broadcast/.test(
      q,
    )
  )
    return {
      state: "blocked",
      text: "I cannot change records, reveal secrets, accept applications or execute a payment. Open the relevant school workflow to review an allowed action. This public demo assistant only provides guidance.",
      source: "/help",
    };
  if (
    /outdated|conflict|superseded|deleted source|last year|old policy|2025.*fee|fee.*2025/.test(
      q,
    )
  )
    return {
      state: "review",
      text: "That source may be outdated, unavailable or in conflict with another policy. I cannot verify it. Please use the current sample guide or contact the office for review; no older policy is treated as current.",
      source: "/contact",
    };
  if (
    /attendance|invoice|marks|homework|student record|another child|private record|student address/.test(
      q,
    )
  )
    return {
      state: "private",
      text: "Student information is available only in the linked family portal. This public assistant cannot read private records. Explore the fictional portal to see an example.",
      source: "/login",
    };
  if (/fee|cost/.test(q))
    return {
      state: "known",
      text: "The sample Primary programme tuition is ₹72,000 per year. A one-time admission fee and optional transport are listed separately. Use the estimator for an itemized, indicative total.",
      source: "/admissions/fees",
    };
  if (/document|admission|apply/.test(q))
    return {
      state: "known",
      text: "The sample checklist includes a birth certificate and the latest school report, where applicable. Start the guided application to preview the checklist, review your entries and receive a demo reference.",
      source: "/admissions/apply",
    };
  if (/library|campus|visit/.test(q))
    return {
      state: "known",
      text: "Explore the Library, Science Wing and Sports Grounds on our campus trail. Sample visits are available on 10, 17 and 24 October, at 10:00 AM or 11:30 AM IST. Review your selection before confirming.",
      source: "/visit",
    };
  if (/robot|science/.test(q))
    return {
      state: "known",
      text: "The Robotics & Makers club welcomes Grades VI–VIII for a sample Wednesday session at 3:15 PM in the Science Wing. Explore the club for eligibility and demo registration.",
      source: "/clubs/robotics",
    };
  if (/timing|calendar/.test(q))
    return {
      state: "known",
      text: "Sample classroom hours are 8:30 AM–3:00 PM IST, Monday to Friday. The October calendar includes Open House on 10 October and Field Day on 24 October.",
      source: "/events",
    };
  return {
    state: "unknown",
    text: "I could not find a matching approved demo source. Please explore the admissions guide or contact the school office. I cannot verify other policies or current availability.",
    source: "/contact",
  };
}
