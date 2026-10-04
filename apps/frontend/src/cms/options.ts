export const regionOptions = [
  { label: "Gujarat", value: "gujarat" },
  { label: "Across India", value: "across-india" },
  { label: "North-East", value: "north-east" },
  { label: "Outside India", value: "outside-india" },
];

export const tripTypeOptions = [
  { label: "Trek", value: "trek" },
  { label: "Camp", value: "camp" },
  { label: "Nature Trail", value: "nature-trail" },
];

export const difficultyOptions = [
  { label: "Easy", value: "easy" },
  { label: "Moderate", value: "moderate" },
  { label: "Challenging", value: "challenging" },
];

export const monthOptions = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].map((m) => ({
  label: m[0].toUpperCase() + m.slice(1),
  value: m,
}));

export const audienceOptions = [
  { label: "Solo travellers", value: "solo" },
  { label: "School groups", value: "school" },
  { label: "College & friends", value: "college" },
  { label: "Families", value: "family" },
  { label: "Girls-only groups", value: "girls" },
  { label: "Corporate teams", value: "corporate" },
  { label: "Teachers, NGOs & clubs", value: "ngo" },
];
