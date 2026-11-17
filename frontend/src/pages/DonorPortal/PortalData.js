// ─────────────────────────────────────────────────────────────
// TEMPORARY DATA. While DEMO is true and no real `status` is passed
// to <PortalLayout>, the portal shows this sample and a banner says so.
// Set DEMO to false once the status endpoint is connected.
//
// Expected shape of `status` (adjust once the backend response is known):
// { consentSubmitted: true|false|null, witnessConfirmed: true|false|null,
//   registrationStatus: "text from backend"|null, institutionUpdate: "text"|null }
// null means "the backend did not tell us". The portal never guesses.
// ─────────────────────────────────────────────────────────────
export const DEMO = false;
export const demoUser = { full_name: "Arunima" };
export const demoStatus = {
  consentSubmitted: false,
  witnessConfirmed: false,
  registrationStatus: null,
  institutionUpdate: null,
};

export function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

const yesNo = (v, yes, no) => (v === true ? yes : v === false ? no : "Not available");

// Plain-language summary of where the donor stands.
export function describe(s) {
  if (!s) return { headline: "We couldn't load your status.", detail: "Please try again in a moment." };
  if (s.consentSubmitted === false)
    return { headline: "You haven't started your registration yet.", detail: "Registration begins with your consent form. Read it through at your own pace." };
  if (s.consentSubmitted === true && s.witnessConfirmed === false)
    return { headline: "Your consent is submitted. We are waiting for your witness to confirm.", detail: "Once they have, the status here will update." };
  if (s.consentSubmitted === true && s.witnessConfirmed === true)
    return { headline: "Your consent and your witness confirmation are both in place.", detail: "Submitting consent does not guarantee acceptance by an institution, so keep an eye on updates here." };
  return { headline: "Part of your status isn't available yet.", detail: "Open My Consent to see what we can show." };
}

export function statusRows(s) {
  s = s || {};
  const tone = (v) => (v === true ? "ok" : v === false ? "wait" : "none");
  return [
    ["Consent", yesNo(s.consentSubmitted, "Submitted", "Not submitted"), tone(s.consentSubmitted)],
    ["Witness confirmation", yesNo(s.witnessConfirmed, "Confirmed", "Pending"), tone(s.witnessConfirmed)],
    ["Registration", s.registrationStatus ?? "Not available yet", s.registrationStatus ? "ok" : "none"],
    ["Institution update", s.institutionUpdate ?? "No updates", s.institutionUpdate ? "ok" : "none"],
  ];
}

// The one action that should dominate the page.
export function nextStep(s) {
  if (s?.consentSubmitted === false)
    return { title: "Complete your consent form", text: "It is the first step, and it is yours to take whenever you feel ready.", label: "Open consent form" };
  if (s?.consentSubmitted === true && s?.witnessConfirmed === false)
    return { title: "Follow up on witness confirmation", text: "Your witness needs to confirm before this step is complete.", label: "See witness details" };
  if (s?.consentSubmitted === true)
    return { title: "Review your submitted information", text: "Make sure everything on record is what you intended.", label: "Review my consent" };
  return { title: "Check your registration status", text: "We could not read your status just now. My Consent shows what we have.", label: "Go to My Consent" };
}

// Three stages. A state is only claimed when the backend said so.
export function stages(s) {
  s = s || {};
  const c = s.consentSubmitted, w = s.witnessConfirmed;
  return [
    { title: "Consent submission", state: c === true ? "done" : c === false ? "awaiting" : "unknown",
      label: c === true ? "Completed" : c === false ? "Awaiting your action" : "Not available",
      note: "Your consent form, submitted for the registration workflow." },
    { title: "Witness confirmation", state: w === true ? "done" : c === true && w === false ? "awaiting" : c === false ? "pending" : "unknown",
      label: w === true ? "Completed" : c === true && w === false ? "Awaiting confirmation" : c === false ? "Not yet reached" : "Not available",
      note: "Your witness confirms that your decision is voluntary." },
    { title: "Registration status", state: "unknown", label: s.registrationStatus ?? "Not available yet",
      note: "Where your registration stands with the institution." },
  ];
}