import { rules } from "./rules.js";

export function evaluate(input) {
  let severity = 0;
  const steps = [];
  const flags = [];
  const explanation = [];

  const applyRule = (r) => {
    severity += r.effects.severityDelta ?? 0;
    if (r.effects.suggestions) steps.push(...r.effects.suggestions);
    if (r.effects.flags) flags.push(...r.effects.flags);
    explanation.push(r.description);
  };

  for (const r of rules) {
    const { anySymptoms, allSymptoms, minTemp, maxTemp, minDurationDays, maxDurationDays } = r.match;
    let ok = true;

    // Handle anySymptoms (at least one symptom must match)
    if (anySymptoms && anySymptoms.length > 0) {
      ok = ok && anySymptoms.some((s) => input.symptoms.includes(s));
    }
    
    // Handle allSymptoms (all symptoms must match)
    if (allSymptoms && allSymptoms.length > 0) {
      ok = ok && allSymptoms.every((s) => input.symptoms.includes(s));
    }
    
    // Handle temperature range
    if (typeof minTemp === "number" && input.temperature != null) {
      ok = ok && input.temperature >= minTemp;
    }
    if (typeof maxTemp === "number" && input.temperature != null) {
      ok = ok && input.temperature <= maxTemp;
    }
    
    // Handle duration range
    if (typeof minDurationDays === "number") {
      ok = ok && input.durationDays >= minDurationDays;
    }
    if (typeof maxDurationDays === "number") {
      ok = ok && input.durationDays <= maxDurationDays;
    }

    // Special case for fallback rule (general guidance)
    if (r.id === "general-guidance") {
      // Only apply if no other rules have been applied yet
      if (steps.length === 0) {
        applyRule(r);
      }
    } else if (ok) {
      applyRule(r);
    }
  }

  // Clamp severity 0-10 and normalize suggestions/flags
  const score = Math.max(0, Math.min(10, Math.round(severity)));
  const unique = (arr) => Array.from(new Set(arr));

  return {
    severity_score: score,
    suggested_next_steps: unique(steps),
    flags: unique(flags),
    explanation,
  };
}
