// src/app/(normal)/academy/workshops/register/constants.ts

/** 所有可选 Workshop & 其属性 */
export const WORKSHOPS = [
  // {
  //   code: "WSH1",
  //   name: "Spark Curiosity This School Holiday! - Lego Spike, micro:bit & Soldering (3 Days for 9-18 yrs old)",
  //   soldOut: true,
  //   minAge: 9,
  //   maxAge: 18,
  //   timeslots: ["Morning (10:00 AM - 1:00 PM)"],
  //   weeks: [
  //     { label: "Week 3: 15 - 17 July 2025", value: "Week 3: 15 - 17 July 2025" },
  //   ],
  // },
  // {
  //   code: "WSH2",
  //   name: "Spark Curiosity This School Holiday! - Scratch & 3D Design (2 Days for 8-10 yrs old)",
  //   soldOut: true,
  //   minAge: 8,
  //   maxAge: 10,
  //   timeslots: ["Morning (10:30 AM - 1:00 PM)"],
  //   weeks: [
  //     { label: "Week 3: 17 - 18 July 2025", value: "Week 3: 17 - 18 July 2025" },
  //   ],
  // },
  // {
  //   code: "WSH3",
  //   name: "Spring Holiday Camp - Build your Smart City",
  //   soldOut: true,
  //   minAge: 9,
  //   maxAge: 18,
  //   timeslots: ["Full Day (10:00 AM - 2:00 PM)"],
  //   weeks: [
  //     { label: "Holiday Week: 7 - 9 October 2025", value: "Holiday Week: 7 - 9 October 2025" },
  //   ],
  // },
  // {
  //   code: "WSH3SP",
  //   name: "Spring Holiday Camp - Build your Smart City for Sheen Academy students",
  //   soldOut: true,
  //   minAge: 9,
  //   maxAge: 18,
  //   timeslots: ["Full Day (10:00 AM - 2:00 PM)"],
  //   weeks: [
  //     { label: "Holiday Week: 7 - 9 October 2025", value: "Holiday Week: 7 - 9 October 2025" },
  //   ],
  // },
  {
    code: "WSH4MM",
    name: "December Holiday Clubs Mini Makers for 6 to 8 yo",
    soldOut: false,
    minAge: 6,
    maxAge: 8,
    timeslots: ["Morning (10:00 - 12:00)"],
    weeks: [
      { label: "Holiday Week: 9 - 11 December 2025", value: "Holiday Week: 9 - 11 December 2025" },
    ],
  },
  {
    code: "WSH4YTI",
    name: "December Holiday Clubs Young Tech Innovators for 9 yo and above",
    soldOut: false,
    minAge: 9,
    maxAge: 18,
    timeslots: ["Afternoon (14:00 - 17:00)"],
    weeks: [
      { label: "Holiday Week: 9 - 11 December 2025", value: "Holiday Week: 9 - 11 December 2025" },
    ],
  },
] as const;

/* --- pricing per workshop --- */
export const WORKSHOP_PRICING: Record<string, number> = {
  WSH1: 750,
  WSH2: 600,
  WSH3: 750,
  WSH3SP: 600,
  WSH4MM: 750,
  WSH4YTI: 600,
};