// src/app/(normal)/academy/workshops/register/constants.ts

/** 所有可选 Workshop & 其属性 */
export const WORKSHOPS = [
  {
    code: "WSH1",
    name: "Spark Curiosity This School Holiday! - Lego Spike, micro:bit & Soldering (3 Days for 9-18 yrs old)",
    soldOut: true,
    minAge: 9,
    maxAge: 18,
    timeslots: ["Morning (10:00 AM - 1:00 PM)"],
    weeks: [
      { label: "Week 3: 15 - 17 July 2025", value: "Week 3: 15 - 17 July 2025" },
    ],
  },
  {
    code: "WSH2",
    name: "Spark Curiosity This School Holiday! - Scratch & 3D Design (2 Days for 8-10 yrs old)",
    soldOut: false,
    minAge: 8,
    maxAge: 10,
    timeslots: ["Morning (10:30 AM - 1:00 PM)"],
    weeks: [
      { label: "Week 2: 10 - 11 July 2025", value: "Week 2: 10 - 11 July 2025" },
      { label: "Week 3: 17 - 18 July 2025", value: "Week 3: 17 - 18 July 2025" },
    ],
  },
] as const;
