import type { CaseNote } from "./types";

export const TYPING_STATUSES = [
  "House is ignoring you...",
  "House is questioning your life choices...",
  "House is reluctantly thinking...",
  "House is googling your symptoms anyway...",
  "House is blaming the lupus...",
  "House is avoiding clinic duty...",
];

const OPENERS = [
  "Everybody lies. So let's start with what you're not telling me.",
  "Interesting. Tell me more, and skip the part where you Googled it already.",
  "That's either nothing, or it's everything. Keep talking.",
  "You came to me instead of a real doctor. That's either smart or stupid. Continue.",
  "Fascinating. Wrong, probably, but fascinating.",
];

const FOLLOWUPS = [
  "Any fever? And don't lie, I'll know.",
  "Family history of anything you're embarrassed about? Didn't think so.",
  "Are you on any medication you 'forgot' to mention?",
  "When did this actually start — not the version you tell people, the real one.",
  "Pain on a scale of one to 'I'm being dramatic to get attention'?",
  "Have you traveled anywhere recently? Eaten anything you shouldn't have?",
  "Is there anyone else in your life with similar symptoms, or are you just special?",
];

const VERDICTS = [
  "It's never lupus. But let's rule it out anyway, because someone always asks.",
  "Could be environmental. Could be you're just falling apart. We'll test both theories.",
  "My differential just got longer, which means you're more interesting than I expected.",
  "I want bloodwork, an MRI, and for you to stop lying about the symptoms you left out.",
  "This is either a dying-cells problem or a you-need-better-life-choices problem. Possibly both.",
];

let responseIndex = 0;

export function generateHouseResponse(_userText: string): string {
  const opener = OPENERS[responseIndex % OPENERS.length];
  const followup = FOLLOWUPS[(responseIndex * 3 + 1) % FOLLOWUPS.length];
  const verdict = VERDICTS[(responseIndex * 5 + 2) % VERDICTS.length];
  responseIndex += 1;
  return `${opener} ${followup} ${verdict}`;
}

const NOTE_TEMPLATES: Array<{ label: string; detail: string; severity: CaseNote["severity"] }> = [
  { label: "Patient is withholding information", detail: "Classic. Nobody tells the truth on the first pass.", severity: "moderate" },
  { label: "Symptom timeline inconsistent", detail: "Reported onset doesn't match described severity.", severity: "low" },
  { label: "Rule out environmental factors", detail: "Check recent travel, diet, and home exposure.", severity: "low" },
  { label: "Possible autoimmune marker", detail: "Differential includes lupus. It's not lupus.", severity: "moderate" },
  { label: "Family history flagged", detail: "Patient deflected — worth revisiting.", severity: "low" },
  { label: "Medication non-disclosure suspected", detail: "Ask again. They're lying.", severity: "high" },
  { label: "Pain scale self-reported as unreliable", detail: "Cross-check against behavior, not words.", severity: "low" },
  { label: "Differential expanding", detail: "Case is more interesting than initially presented.", severity: "moderate" },
];

let noteIndex = 0;

export function generateCaseNote(): CaseNote {
  const tpl = NOTE_TEMPLATES[noteIndex % NOTE_TEMPLATES.length];
  noteIndex += 1;
  return {
    id: `note-${Date.now()}-${noteIndex}`,
    ...tpl,
  };
}
