// Adventure Olympiad 2026 details from the approved design. Editable in the CMS later.
export const olympiad = {
  name: "Adventure Olympiad 1.0",
  tagline: "India’s 1st Adventure Olympiad",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScmRxjPKSZCuYZX5RQz1Dwh2RzibDaG4xgqlgHrFkRd1_kfwg/viewform",
  rulesPdf: "https://www.cnacamp.com/rules-of-camp.pdf",
  lavkumarPdf: "https://www.cnacamp.com/Lavkumar.pdf",
  ketankumarPdf: "https://www.cnacamp.com/Dr-ketankumar-new.pdf",
  campFee: 18000,
  opens: "2026-04-02T12:59:00+05:30",
  closes: "2026-06-20T23:59:00+05:30",
  dates: [
    {
      icon: "📝",
      label: "Registration opens",
      value: "02 April 2026, 12:59 PM"
    },
    {
      icon: "⏰",
      label: "Registration closes",
      value: "20 June 2026, 11:59 PM"
    },
    {
      icon: "📚",
      label: "Round 1 — Eco-STEM quiz",
      value: "Early July 2026"
    },
    {
      icon: "⛰",
      label: "Astro Adventure Camp, Manali",
      value: "Dates after the final merit list"
    }
  ],
  fees: [
    {
      fee: 90,
      who: "Govt. school students",
      group: "Group A / B · Scholarship 1"
    },
    {
      fee: 108,
      who: "All students",
      group: "Group A / B / C · Scholarship 2"
    },
    {
      fee: 504,
      who: "Teachers & sports persons",
      group: "Group D · volunteers"
    }
  ],
  stats: [
    [
      "14–25",
      "Age group"
    ],
    [
      "100%",
      "Max scholarship"
    ],
    [
      "₹18K",
      "Camp fee covered"
    ],
    [
      "100",
      "MCQ questions"
    ],
    [
      "5",
      "Quiz rounds"
    ]
  ],
  about: [
    "Organised jointly by Saurashtra Education & Charitable Trust, Rajkot and Climber Nature Adventure Club, Rajkot, the Adventure Olympiad 1.0 builds adventure spirit, leadership, scientific thinking and environmental awareness in young people, in line with the experiential learning model of the National Education Policy.",
    "Students take an Eco-STEM online quiz covering maths, science, social studies, general knowledge and logical reasoning. Top performers win scholarships for the Astro Adventure Trekking Camp in Manali: hiking, snow trekking, river rafting, rock climbing, astronomy sessions, STEM activities, yoga, and guest lectures by experts in space, environment, technology and more."
  ],
  pillars: [
    [
      "🌳",
      "Environment education",
      "Learn conservation through nature."
    ],
    [
      "🔭",
      "Astronomy & STEM",
      "Star gazing, space awareness and hands-on activities."
    ],
    [
      "🥾",
      "Adventure activities",
      "Trekking, rafting and rock climbing."
    ],
    [
      "💪",
      "Leadership & life skills",
      "Experiential learning, as NEP recommends."
    ]
  ],
  groups: [
    {
      g: "A",
      age: "14+ to 16 years",
      std: "Std 8 to 9 (academic year 2025-26)",
      syllabus: "Std 8 level",
      fee: "₹90 (govt. school, Scholarship 1) · ₹108 (all students, Scholarship 2)"
    },
    {
      g: "B",
      age: "16+ to 18 years",
      std: "Std 10 to 11 (academic year 2025-26)",
      syllabus: "Std 10 level",
      fee: "₹90 (govt. school, Scholarship 1) · ₹108 (all students, Scholarship 2)"
    },
    {
      g: "C",
      age: "18 to 25 years",
      std: "Std 12 and above / college / university",
      syllabus: "Std 12 level",
      fee: "₹108 (govt. background up to 70%, others up to 60%)"
    },
    {
      g: "D",
      age: "25+ years",
      std: "Teachers & sports persons only",
      syllabus: "No quiz: join as a volunteer",
      fee: "₹504"
    }
  ],
  steps: [
    [
      "📝",
      "Register & pay online",
      "Read the rules, pay the registration fee online, then fill the Google Form with your payment screenshot and submit."
    ],
    [
      "📚",
      "Take the Eco-STEM quiz",
      "100 MCQs, 100 marks, 60 minutes. Rounds 1-3 are online. Rounds 4-5 are offline, with basic training camps in Gujarat."
    ],
    [
      "🏆",
      "Merit list & documents",
      "Final merit uses the quiz plus other achievements (NMMS, science fairs, sports). Selected students submit a medical certificate and parental consent within 10 days."
    ],
    [
      "⛰",
      "Manali adventure camp",
      "Ahmedabad to Ahmedabad travel (rail/bus), hotel or tent stay, pure vegetarian meals, trekking, rafting, astronomy, STEM sessions and a certificate."
    ]
  ],
  quiz: [
    [
      "Type",
      "Multiple choice questions (MCQ)"
    ],
    [
      "Language",
      "Gujarati or English"
    ],
    [
      "Subjects",
      "Maths, science, social studies, GK, logical reasoning"
    ],
    [
      "Level",
      "Based on your group (Std 8 / 10 / 12)"
    ],
    [
      "Format",
      "Online: quiz link sent on WhatsApp"
    ]
  ],
  rounds: [
    [
      "Round 1",
      "Pre-prelims quiz",
      "Online"
    ],
    [
      "Round 2",
      "Prelims quiz",
      "Online"
    ],
    [
      "Round 3",
      "Quarter-final: selection for the pre-basic camp",
      "Online"
    ],
    [
      "Round 4",
      "Semi-final quiz + pre-basic camp",
      "Offline · Gujarat"
    ],
    [
      "Round 5",
      "Grand final quiz + basic adventure activity camp",
      "Offline · Gujarat"
    ]
  ],
  roundsResult: "Selection for the Astro Adventure Trekking Camp, Manali (2026-27)",
  selectionNote: "Final selection is not quiz-only. The Trust also considers NMMS results, science fairs, Gyan Sadhana, sports achievements and teacher recommendations.",
  scholarships: [
    {
      n: 1,
      name: "K.S. Sir Lavkumar Khachar Adventure Scholarship",
      pct: "100%",
      img: "/img/olympiad/lavkumar-khachar.webp",
      pdf: "lavkumarPdf",
      pdfLabel: "About Sir Lavkumar Khachar",
      text: "Full scholarship for government school students who passed Std 8 from a government primary school (or RTE students in private schools).",
      points: [
        "100% scholarship for Group A & Group B",
        "Students must currently be in Std 8–12",
        "Registration fee: ₹90"
      ]
    },
    {
      n: 2,
      name: "Sir Dr. Ketankumar Trivedi Adventure Scholarship",
      pct: "Up to 70%",
      img: "/img/olympiad/ketankumar-trivedi.webp",
      pdf: "ketankumarPdf",
      pdfLabel: "About Sir Dr. Ketankumar Trivedi",
      text: "For all students from any school, college or university. Up to 60% for Groups A/B/C. Special 70% for Group C students who passed Std 8 from a government school and now study in a government or grant-aided college or university.",
      points: [
        "Open to all students (Group A/B/C)",
        "Up to 60% scholarship on the camp fee",
        "70% for Group C with a government school background",
        "Select the correct age group while registering",
        "Registration fee: ₹108"
      ]
    }
  ],
  scholarshipRule: "You can apply for only ONE scholarship. Applying for both means automatic disqualification. Once selected, your choice cannot be changed. Scholarships are non-transferable and not paid in cash. The organiser’s decision is final.",
  included: [
    [
      "🚌",
      "Travel (Ahmedabad–Ahmedabad)",
      "Round trip from Ahmedabad by rail/bus. Bring your own dry snacks: meals are not provided during travel."
    ],
    [
      "🏠",
      "Hotel / tent stay",
      "Stay in hotels or tents in Manali, surrounded by the Himalaya."
    ],
    [
      "🍽",
      "Pure vegetarian meals",
      "Breakfast, lunch and dinner, checked by instructors. Tell us about special dietary needs in advance."
    ],
    [
      "🥾",
      "Hiking & snow trekking",
      "Guided mountain and snow treks with trained instructors, following safety protocols."
    ],
    [
      "🌊",
      "River rafting & rock climbing",
      "Supervised by certified instructors. Insurance provided for selected students."
    ],
    [
      "🔭",
      "Astro & STEM activities",
      "Night sky observation, telescope sessions, STEM learning and workshops."
    ],
    [
      "🧘",
      "Yoga & meditation",
      "Scientific and suitable methods of yoga and meditation."
    ],
    [
      "🎓",
      "Expert guest lectures",
      "Space, science, maths, environment, law, technology, cyber crime, art and social topics."
    ],
    [
      "📜",
      "Certificate of achievement",
      "Participation and achievement certificate from Climber Nature Adventure Club."
    ]
  ],
  regions: [
    "Saurashtra",
    "Kutch",
    "North Gujarat",
    "Central Gujarat",
    "South Gujarat"
  ],
  eligibility: [
    "Age 14+ to 25 years (as of 31 May 2026)",
    "Students (Std 8+), teachers or sports persons",
    "From any district of Gujarat",
    "Select the correct age group and standard",
    "Physically and mentally fit for camp activities",
    "Selected students submit a medical fitness certificate, parental consent and risk declaration within 10 days"
  ],
  rules: [
    "Registration fee is non-refundable under any circumstances",
    "Wrong age group or standard = automatic rejection, no refund",
    "Apply for only ONE scholarship: applying for both = disqualification",
    "Pay only to the official CNA account shown in the registration form. Check carefully",
    "Any misconduct during camp = immediate removal at the participant’s cost",
    "The organiser is not liable for injury, accident, illness or natural calamity during camp. Participation is voluntary"
  ],
  faqs: [
    {
      q: "What is the Adventure Olympiad 1.0?",
      a: "India’s first Eco-STEM quiz-based adventure scholarship program, organised jointly by Saurashtra Education & Charitable Trust and Climber Nature Adventure Club, Rajkot. Students take an online quiz (100 MCQs, 60 minutes). Top performers earn scholarships (up to 100%) for the Astro Adventure Trekking Camp in Manali."
    },
    {
      q: "Is registration free?",
      a: "No. The fee is ₹90 (Scholarship 1: govt. school students, Group A/B), ₹108 (Scholarship 2: all students, Group A/B/C) or ₹504 (Group D: teachers and sports persons). It is non-refundable and paid online only."
    },
    {
      q: "What is the difference between the two scholarships?",
      a: "Scholarship 1 (K.S. Sir Lavkumar Khachar): 100% for Group A/B govt. school students, fee ₹90. Scholarship 2 (Sir Dr. Ketankumar Trivedi): up to 60% for all students (Group A/B/C), and 70% for Group C students with a govt. school background, fee ₹108. You can apply for only one."
    },
    {
      q: "What does the scholarship cover?",
      a: "It applies to the ₹18,000 camp fee. 100% means the full fee is covered. 60% means you pay ₹7,200. The camp includes travel (Ahmedabad to Ahmedabad), stay, meals, all activities and a certificate."
    },
    {
      q: "Is selection based only on the quiz?",
      a: "No. The Trust prepares the final merit list using the quiz score, NMMS results, maths-science fair and Gyan Sadhana results, sports and science activities, other merit certificates, medical fitness and govt. school teacher recommendations."
    },
    {
      q: "Who can apply? Which districts?",
      a: "Any eligible student (age 14+ to 25) or teacher / sports person from any district of Gujarat: Saurashtra, Kutch, North, Central and South Gujarat."
    },
    {
      q: "What documents are needed after selection?",
      a: "Within 10 days: (1) medical fitness certificate, (2) parental consent letter, (3) risk & responsibility declaration, (4) hard copy of the registration form (Scholarship 1 applicants need the principal’s verification). Missing documents = automatic cancellation."
    },
    {
      q: "How do I register?",
      a: "Read the rules, pay the registration fee online, click Register, fill the Google Form and upload your payment screenshot. After you submit, the quiz link comes to your WhatsApp number."
    }
  ]
} as const;
