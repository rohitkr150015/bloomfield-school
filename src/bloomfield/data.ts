export const school = {
  name: "Bloomfield School",
  year: "2027–28",
  timezone: "Asia/Kolkata",
  email: "hello@bloomfield.example",
  updated: "22 September 2026",
};
export const programmes = [
  {
    slug: "early-years",
    name: "Early Years",
    grades: "LKG – UKG",
    age: "Ages 4–5",
    image: "early-years.webp",
    description: "Small discoveries. Extraordinary beginnings.",
    subjects: [
      "Language & stories",
      "Early numeracy",
      "Creative play",
      "Movement & wellbeing",
    ],
  },
  {
    slug: "primary",
    name: "Primary School",
    grades: "Grades I – V",
    age: "Ages 6–10",
    image: "art.webp",
    description: "A foundation for a lifetime of asking why.",
    subjects: [
      "English & Hindi",
      "Mathematics",
      "Environmental studies",
      "Art, music & sport",
    ],
  },
  {
    slug: "middle",
    name: "Middle School",
    grades: "Grades VI – VIII",
    age: "Ages 11–13",
    image: "project.webp",
    description: "Room to explore. Confidence to find a voice.",
    subjects: [
      "Languages",
      "Science & mathematics",
      "Social science",
      "Computing & design",
    ],
  },
  {
    slug: "senior",
    name: "Senior School",
    grades: "Grades IX – XII",
    age: "Ages 14–18",
    image: "library.webp",
    description: "Deeper thinking. Wider horizons.",
    subjects: [
      "Science pathway",
      "Humanities pathway",
      "Commerce pathway",
      "Independent research",
    ],
  },
];
export const facilities = [
  {
    slug: "library",
    name: "The Reading Room",
    short: "Library",
    image: "library.webp",
    description:
      "A quiet corner for a big idea. Reading circles, research and independent discovery come together in a space made for curiosity.",
    access: "Sample: ground-floor entrance and quiet reading spaces.",
    number: "01",
  },
  {
    slug: "science-wing",
    name: "Where questions come alive",
    short: "Science Wing",
    image: "project.webp",
    description:
      "From a first microscope slide to a student-designed experiment, learning starts with a question.",
    access: "Sample: step-free teaching laboratory; supervised sessions.",
    number: "02",
  },
  {
    slug: "sports-grounds",
    name: "A little more room to grow",
    short: "Sports Grounds",
    image: "outdoor.webp",
    description:
      "Teamwork, movement and the joy of trying again. Open spaces for sport and everyday play.",
    access: "Sample: level spectator path and accessible changing area.",
    number: "03",
  },
];
export type Entry = {
  slug: string;
  title: string;
  category: string;
  date: string;
  text: string;
  image?: string;
  extra?: string;
};
export const events: Entry[] = [
  {
    slug: "open-house",
    title: "Come curious. Leave inspired.",
    category: "Open house",
    date: "2026-10-10",
    text: "Meet our educators, visit the classrooms and discover a school day at Bloomfield. Families with children of all ages are welcome.",
    image: "school-20.webp",
    extra: "10:00 AM – 12:00 PM IST · Bloomfield Campus · 24 sample places",
  },
  {
    slug: "young-discoverers",
    title: "Young Discoverers Exhibition",
    category: "Academics",
    date: "2026-10-16",
    text: "Student-led experiments and thoughtful questions from our middle-school science community.",
    image: "project.webp",
    extra: "10:00 AM – 12:00 PM IST · Science Wing",
  },
  {
    slug: "field-day",
    title: "Together on the field",
    category: "Sports",
    date: "2026-10-24",
    text: "A morning of friendly competition, shared effort and cheering each other on.",
    image: "outdoor.webp",
    extra: "10:00 AM – 12:00 PM IST · Sports Grounds",
  },
];
export const notices: Entry[] = [
  {
    slug: "admissions-2027",
    title: "A new chapter: admissions 2027–28",
    category: "Admissions",
    date: "2026-09-22",
    text: "Explore our sample admission journey for LKG through Class XII. Start with the programme guide, check indicative eligibility, and book a campus visit. This fictional preview does not offer actual places.",
  },
  {
    slug: "reading-week",
    title: "Reading Week: bring a favourite story",
    category: "Primary",
    date: "2026-09-20",
    text: "Reading Week runs from 5 to 9 October 2026. Primary pupils may bring a favourite book on Monday, 5 October. Label the book with the sample class name. No purchase is required.",
  },
  {
    slug: "term-calendar",
    title: "October term calendar",
    category: "All school",
    date: "2026-09-18",
    text: "Open House is on 10 October, Young Discoverers Exhibition on 16 October, and Field Day on 24 October. All event times use Asia/Kolkata. See the calendar for details.",
  },
];
export const stories: Entry[] = [
  {
    slug: "water-wise",
    title: "Small ideas. A world of difference.",
    category: "Innovation",
    date: "2026-09-15",
    text: "Our fictional Grade VIII team explored how a rainwater garden could help a neighbourhood save water. Sketches became prototypes, and prototypes became conversations about a more thoughtful future.",
    image: "project.webp",
  },
  {
    slug: "the-reading-project",
    title: "One book, many new beginnings",
    category: "Community",
    date: "2026-09-12",
    text: "A sample student-led reading project pairs older pupils with younger readers. Together they discover new stories, new words and the confidence to read aloud.",
    image: "library.webp",
  },
  {
    slug: "finding-my-voice",
    title: "Finding a voice beyond the classroom",
    category: "Alumni",
    date: "2026-09-08",
    text: "Fictional alumna Mira Sen reflects on how debate club taught her to listen carefully, speak clearly and stay curious about other perspectives.",
    image: "school-22.webp",
  },
];
export const faculty: Entry[] = [
  {
    slug: "ananya-rao",
    title: "Ananya Rao",
    category: "Science",
    date: "2026-09-22",
    text: "M.Sc. Education · 12 sample years of teaching. Ananya helps learners connect scientific ideas with everyday observations. Fictional professional profile.",
    extra: "Head of Science",
  },
  {
    slug: "kabir-sen",
    title: "Kabir Sen",
    category: "Humanities",
    date: "2026-09-22",
    text: "M.A. History, B.Ed. · A fictional educator who brings primary sources, discussion and local histories into the classroom.",
    extra: "Humanities educator",
  },
  {
    slug: "meera-shah",
    title: "Meera Shah",
    category: "Primary",
    date: "2026-09-22",
    text: "M.Ed. Primary Education · A fictional educator focused on literacy, creative inquiry and a caring classroom culture.",
    extra: "Primary coordinator",
  },
];
export const clubs: Entry[] = [
  {
    slug: "robotics",
    title: "Robotics & Makers",
    category: "Technology",
    date: "2026-09-22",
    text: "Build, test and try again. Grades VI–VIII · Wednesdays, 3:15 PM · Science Wing. 4 sample places available.",
    image: "project.webp",
  },
  {
    slug: "reading-circle",
    title: "The Reading Circle",
    category: "Literature",
    date: "2026-09-22",
    text: "Grades III–V · Thursdays, 3:15 PM · Library. Stories, thoughtful conversations and 6 sample places available.",
    image: "library.webp",
  },
  {
    slug: "field-club",
    title: "Beyond the Field",
    category: "Sports",
    date: "2026-09-22",
    text: "Grades VI–X · Fridays, 3:15 PM · Sports Grounds. Full; demo waitlist available.",
    image: "outdoor.webp",
  },
];
export const careers: Entry[] = [
  {
    slug: "primary-educator",
    title: "Primary educator",
    category: "Teaching",
    date: "2026-09-22",
    text: "A fictional full-time opportunity for an educator who values curiosity and care. B.Ed. and classroom experience form the sample criteria. Demo applications close 30 October 2026.",
    extra: "Bloomfield Campus · Full time",
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
export const dateLabel = (date: string) =>
  new Date(date + "T12:00:00+05:30").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: school.timezone,
  });
export function download(name: string, content: string, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function calendarDownload(event: Entry) {
  const day = event.date.replaceAll("-", "");
  download(
    event.slug + ".ics",
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Bloomfield School Demo//EN",
      "BEGIN:VEVENT",
      `UID:${event.slug}@bloomfield.example`,
      "DTSTAMP:20260922T000000Z",
      `DTSTART:${day}T043000Z`,
      `DTEND:${day}T063000Z`,
      `SUMMARY:Demo - ${event.title}`,
      "DESCRIPTION:Fictional Bloomfield School sample event.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n"),
    "text/calendar",
  );
}
