export const rules = [
  // EMERGENCY RULES (High Priority)
  {
    id: "emergency-chest-pain",
    description: "Chest pain or shortness of breath indicates potential emergency.",
    match: { anySymptoms: ["chest pain", "shortness of breath"] },
    effects: {
      severityDelta: 10,
      flags: ["EMERGENCY"],
      suggestions: [
        "Seek immediate medical care or call emergency services.",
        "Do not drive yourself; arrange transport to the nearest ER.",
      ],
    },
  },

  // HIGH SEVERITY RULES
  {
    id: "high-fever",
    description: "High temperature (>= 39°C) warrants attention.",
    match: { minTemp: 39 },
    effects: {
      severityDelta: 5,
      suggestions: ["Use antipyretics as directed and monitor temperature."],
      flags: ["ATTENTION"],
    },
  },

  // MODERATE SEVERITY RULES
  {
    id: "fever-cough",
    description: "Fever with cough may indicate respiratory infection.",
    match: { allSymptoms: ["fever", "cough"] },
    effects: {
      severityDelta: 4,
      suggestions: [
        "Hydrate and rest.",
        "Consider at-home COVID/flu testing.",
        "If symptoms persist beyond 3 days, consult your doctor.",
      ],
    },
  },
  {
    id: "fever-sore-throat",
    description: "Fever with sore throat may indicate infection.",
    match: { allSymptoms: ["fever", "sore throat"] },
    effects: {
      severityDelta: 3,
      suggestions: [
        "Gargle with warm salt water.",
        "Stay hydrated and rest.",
        "Consider throat lozenges for comfort.",
      ],
    },
  },
  {
    id: "fever-fatigue",
    description: "Fever with fatigue may indicate viral infection.",
    match: { allSymptoms: ["fever", "fatigue"] },
    effects: {
      severityDelta: 3,
      suggestions: [
        "Get plenty of rest.",
        "Stay hydrated.",
        "Monitor temperature regularly.",
      ],
    },
  },

  // LOW-MODERATE SEVERITY RULES
  {
    id: "prolonged-symptoms",
    description: "Symptoms lasting >= 5 days should be reviewed by a clinician.",
    match: { minDurationDays: 5 },
    effects: {
      severityDelta: 2,
      suggestions: ["Schedule a non-urgent appointment with your clinician."],
      flags: ["REVIEW"],
    },
  },
  {
    id: "mild-fever",
    description: "Low-grade fever (37.5-38.9°C) with general symptoms.",
    match: { minTemp: 37.5, maxTemp: 38.9 },
    effects: {
      severityDelta: 2,
      suggestions: [
        "Monitor temperature regularly.",
        "Stay hydrated and rest.",
        "Use fever-reducing medication if needed.",
      ],
    },
  },

  // LOW SEVERITY RULES
  {
    id: "headache-mild",
    description: "Mild isolated headache.",
    match: { allSymptoms: ["headache"], maxTemp: 37.4 },
    effects: {
      severityDelta: 1,
      suggestions: [
        "Hydration, rest, and over-the-counter analgesics as needed.",
        "Avoid bright lights and loud noises.",
        "Consider relaxation techniques.",
      ],
    },
  },
  {
    id: "cough-mild",
    description: "Mild cough without fever.",
    match: { allSymptoms: ["cough"], maxTemp: 37.4 },
    effects: {
      severityDelta: 1,
      suggestions: [
        "Stay hydrated with warm liquids.",
        "Use cough drops or honey for throat irritation.",
        "Consider humidifier for dry air.",
      ],
    },
  },
  {
    id: "fatigue-mild",
    description: "Mild fatigue without other symptoms.",
    match: { allSymptoms: ["fatigue"], maxTemp: 37.4 },
    effects: {
      severityDelta: 1,
      suggestions: [
        "Ensure adequate sleep (7-9 hours).",
        "Stay hydrated and eat nutritious meals.",
        "Consider light exercise if feeling up to it.",
      ],
    },
  },
  {
    id: "sore-throat-mild",
    description: "Mild sore throat without fever.",
    match: { allSymptoms: ["sore throat"], maxTemp: 37.4 },
    effects: {
      severityDelta: 1,
      suggestions: [
        "Gargle with warm salt water 3-4 times daily.",
        "Stay hydrated with warm liquids.",
        "Avoid irritants like smoking or dry air.",
      ],
    },
  },
  {
    id: "nausea-mild",
    description: "Mild nausea without other severe symptoms.",
    match: { allSymptoms: ["nausea"], maxTemp: 37.4 },
    effects: {
      severityDelta: 1,
      suggestions: [
        "Eat small, bland meals.",
        "Stay hydrated with small sips of water.",
        "Avoid strong smells and spicy foods.",
      ],
    },
  },

  // DURATION-BASED RULES
  {
    id: "short-duration",
    description: "Symptoms lasting less than 24 hours.",
    match: { maxDurationDays: 1 },
    effects: {
      severityDelta: 0,
      suggestions: [
        "Monitor symptoms closely.",
        "Rest and stay hydrated.",
        "Seek medical attention if symptoms worsen.",
      ],
    },
  },

  // FALLBACK RULE (Always applies)
  {
    id: "general-guidance",
    description: "General health guidance for any symptoms.",
    match: { anySymptoms: [] }, // This will always match
    effects: {
      severityDelta: 0,
      suggestions: [
        "Monitor your symptoms closely.",
        "Stay hydrated and get adequate rest.",
        "Seek medical attention if symptoms worsen or persist.",
      ],
    },
  },
];
