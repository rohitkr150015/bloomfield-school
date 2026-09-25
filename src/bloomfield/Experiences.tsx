import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Grid2X2,
  Camera,
  BookOpen,
  CalendarDays,
  MapPin,
  Box,
  Trees,
  Palette,
  Users,
  Sparkles,
  GraduationCap,
  CreditCard,
  FileText,
  Bus,
  Search,
  Download,
  Clock,
  Check,
} from "lucide-react";
import {
  PageHeading,
  ButtonLink,
  TextLink,
  Eyebrow,
  Modal,
  Empty,
} from "./shared";
import { useStored } from "./demo";
import {
  programmes,
  facilities,
  events,
  clubs,
  stories,
  calendarDownload,
} from "./data";
import { Bloom, Reveal } from "./Home";
const Campus3D = lazy(() => import("./Campus3D"));

export const photos = [
  {
    id: "outdoor",
    title: "A little fresh air, a lot of friendship",
    category: "School days",
    event: "Everyday discoveries",
    year: "2026",
    caption: "A shared outdoor activity, where teamwork becomes second nature.",
  },
  {
    id: "dance",
    title: "The stage is theirs",
    category: "Arts",
    event: "Annual celebration",
    year: "2026",
    caption: "Movement, colour and the joy of performing together.",
  },
  {
    id: "project",
    title: "Big questions. Handmade answers.",
    category: "Learning",
    event: "Young discoverers",
    year: "2026",
    caption: "Young makers share a science model and the ideas behind it.",
  },
  {
    id: "early-years",
    title: "Their world is getting bigger",
    category: "School days",
    event: "Everyday discoveries",
    year: "2026",
    caption: "A classroom designed for small discoveries and happy beginnings.",
  },
  {
    id: "wellbeing",
    title: "A moment to breathe",
    category: "Wellbeing",
    event: "Everyday discoveries",
    year: "2026",
    caption: "A gentle stretch, a calmer mind, and a fresh start to the day.",
  },
  {
    id: "art",
    title: "A splash of imagination",
    category: "Arts",
    event: "Everyday discoveries",
    year: "2026",
    caption: "Exploring colour together. The process is part of the joy.",
  },
  {
    id: "computing",
    title: "Tomorrow starts with curiosity",
    category: "Learning",
    event: "Young discoverers",
    year: "2026",
    caption:
      "Making connections and building digital confidence in the computer room.",
  },
  {
    id: "sport",
    title: "Just one more try",
    category: "Sports",
    event: "Field day",
    year: "2026",
    caption: "Encouragement, practice and the confidence to try again.",
  },
  {
    id: "choir",
    title: "Many voices. One beautiful moment.",
    category: "Arts",
    event: "Annual celebration",
    year: "2025",
    caption: "A shared performance celebrates the power of belonging.",
  },
  {
    id: "riding",
    title: "A different kind of classroom",
    category: "Sports",
    event: "Field day",
    year: "2026",
    caption: "A supervised outdoor experience makes space for a new adventure.",
  },
  {
    id: "makers",
    title: "Made with their own two hands",
    category: "Learning",
    event: "Young discoverers",
    year: "2025",
    caption:
      "Student creations turn abstract ideas into something you can share.",
  },
  {
    id: "celebration",
    title: "A day to remember, together",
    category: "Community",
    event: "Annual celebration",
    year: "2025",
    caption: "A colourful school celebration brings the community together.",
  },
  {
    id: "community",
    title: "Proud little moments",
    category: "Community",
    event: "Together at school",
    year: "2026",
    caption: "Children mark a shared occasion with enthusiasm and colour.",
  },
  {
    id: "team",
    title: "More than a team",
    category: "Sports",
    event: "Field day",
    year: "2025",
    caption:
      "On the field, friendship and sportsmanship are part of the lesson.",
  },
  {
    id: "library",
    title: "A world between the pages",
    category: "Learning",
    event: "Everyday discoveries",
    year: "2026",
    caption: "A reading space with room for independent discovery.",
  },
  {
    id: "lab",
    title: "Where “why” becomes “let’s find out”",
    category: "Learning",
    event: "Young discoverers",
    year: "2026",
    caption: "A science space for careful experiments and new questions.",
  },
];
function Gallery() {
  const [params, setParams] = useSearchParams();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [saved, setSaved] = useStored<string[]>("saved-photos", []);
  const category = params.get("category") || "All moments",
    year = params.get("year") || "All years",
    event = params.get("event") || "All events";
  const filter = (key: string, value: string) =>
    setParams((p) => {
      value.startsWith("All") ? p.delete(key) : p.set(key, value);
      p.delete("page");
      return p;
    });
  const selected = photos.filter(
    (p) =>
      (category === "All moments" ||
        (category === "Favourites"
          ? saved.includes(p.id)
          : p.category === category)) &&
      (year === "All years" || p.year === year) &&
      (event === "All events" || p.event === event),
  );
  const rawPage = Number(params.get("page") || 1);
  const page = Math.min(
    Math.max(Number.isInteger(rawPage) ? rawPage : 1, 1),
    Math.max(1, Math.ceil(selected.length / 9)),
  );
  const active = selected.findIndex((p) => p.id === lightbox);
  const photo = selected[active];
  const step = (dir: number) =>
    setLightbox(
      selected[(active + dir + selected.length) % selected.length]?.id || null,
    );
  useEffect(() => {
    if (!lightbox) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [lightbox, active, selected.length]);
  const save = (id: string) =>
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  return (
    <div className="journal-page">
      <div className="journal-heading wrap">
        <div>
          <Eyebrow>THE BLOOMFIELD JOURNAL</Eyebrow>
          <h1>
            Life happens here.
            <br />
            <span>And it’s quite wonderful.</span>
          </h1>
          <p>
            The little discoveries, big celebrations and everything in between.
            <br />A window into a school day, well lived.
          </p>
        </div>
        <div className="journal-stamp">
          <Bloom />
          <span>
            MEMORIES IN
            <br />
            THE MAKING
          </span>
        </div>
      </div>
      <div className="journal-cover wrap">
        <img
          src="/images/dance.webp"
          alt="Students sharing a colourful performance on stage"
        />
        <div>
          <span className="tag">IN THE SPOTLIGHT · ILLUSTRATIVE ALBUM</span>
          <h2>
            One stage.
            <br />A hundred little stars.
          </h2>
          <button
            className="button"
            onClick={() => {
              filter("event", "Annual celebration");
              document
                .getElementById("photo-grid")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore the celebration
            <ArrowUpRight size={18} />
          </button>
        </div>
        <span className="cover-caption">
          <Camera size={16} />
          The joy of coming together
        </span>
      </div>
      <section className="wrap gallery-section" id="photo-grid">
        <div className="gallery-toolbar">
          <div>
            <Eyebrow>FIND YOUR FAVOURITE MOMENT</Eyebrow>
            <h2>
              Our days, <span>in pictures.</span>
            </h2>
          </div>
          <div className="gallery-selects">
            <label>
              Academic year
              <select
                value={year}
                onChange={(e) => filter("year", e.target.value)}
              >
                {["All years", "2026", "2025"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Album
              <select
                value={event}
                onChange={(e) => filter("event", e.target.value)}
              >
                {["All events", ...new Set(photos.map((p) => p.event))].map(
                  (x) => (
                    <option key={x}>{x}</option>
                  ),
                )}
              </select>
            </label>
          </div>
        </div>
        <div className="journal-filters" aria-label="Photo categories">
          {[
            "All moments",
            "School days",
            "Learning",
            "Arts",
            "Sports",
            "Wellbeing",
            "Community",
            "Favourites",
          ].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "active" : ""}
              onClick={() => filter("category", c)}
            >
              {c === "Favourites" && <Heart size={15} />} {c}
            </button>
          ))}
        </div>
        <div className="results-line">
          <span role="status">{selected.length} moments to discover</span>
          <span>
            <Grid2X2 size={15} />
            Photo journal
          </span>
        </div>
        {selected.length === 0 ? (
          <Empty
            title="No moments in this collection yet."
            text="Choose another album, clear your filters, or save photos with the heart button."
          />
        ) : (
          <div className="journal-grid">
            <AnimatePresence mode="popLayout">
              {selected.slice((page - 1) * 9, page * 9).map((p, i) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className={"journal-card card-shape-" + (i % 4)}
                >
                  <div className="journal-image">
                    <button
                      className="photo-open"
                      onClick={() => setLightbox(p.id)}
                      aria-label={"View photo: " + p.title}
                    >
                      <img
                        src={"/images/" + p.id + "-small.webp"}
                        alt={p.caption}
                        loading="lazy"
                      />
                      <span className="photo-expand">
                        <ArrowUpRight size={22} />
                      </span>
                    </button>
                    <button
                      className={
                        "photo-heart " + (saved.includes(p.id) ? "saved" : "")
                      }
                      aria-label={
                        (saved.includes(p.id) ? "Unsave " : "Save ") + p.title
                      }
                      aria-pressed={saved.includes(p.id)}
                      onClick={() => save(p.id)}
                    >
                      <Heart
                        size={18}
                        fill={saved.includes(p.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="journal-card-caption">
                    <small>
                      {p.category.toUpperCase()} <span>· {p.year}</span>
                    </small>
                    <h3>
                      <button onClick={() => setLightbox(p.id)}>
                        {p.title}
                      </button>
                    </h3>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
        <div className="pagination">
          <button
            className="button secondary"
            disabled={page <= 1}
            onClick={() =>
              setParams((p) => {
                p.set("page", String(page - 1));
                return p;
              })
            }
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span>
            Page {page} of {Math.max(1, Math.ceil(selected.length / 9))}
          </span>
          <button
            className="button secondary"
            disabled={page * 9 >= selected.length}
            onClick={() =>
              setParams((p) => {
                p.set("page", String(page + 1));
                return p;
              })
            }
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
        <p className="photo-note">
          Illustrative albums use supplied photographs. Dates, captions and
          school stories are fictional. Publication consent must be verified for
          a live school.
        </p>
      </section>
      {photo && (
        <Modal title={photo.title} onClose={() => setLightbox(null)}>
          <div className="lightbox-photo">
            <img src={"/images/" + photo.id + ".webp"} alt={photo.caption} />
          </div>
          <div className="lightbox-meta">
            <span>
              {photo.event} · {photo.year} · Sample album
            </span>
            <button
              className="icon-button"
              aria-label="Save current photo"
              aria-pressed={saved.includes(photo.id)}
              onClick={() => save(photo.id)}
            >
              <Heart
                fill={saved.includes(photo.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <p>{photo.caption}</p>
          <div className="lightbox-controls">
            <button
              className="button secondary"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              <ChevronLeft />
              Previous
            </button>
            <span>
              {active + 1} / {selected.length}
            </span>
            <button
              className="button secondary"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              Next
              <ChevronRight />
            </button>
          </div>
          <small className="hint">
            Use ← → to explore. Press Escape to close.
          </small>
        </Modal>
      )}
    </div>
  );
}
function SchoolLife() {
  const [params, setParams] = useSearchParams();
  const selected = params.get("interest") || "All";
  const [day, setDay] = useState(0);
  const week = [
    [
      "Monday",
      "Reading together",
      "Start the week with a reading circle and a favourite story.",
      "/clubs/reading-circle",
      "library",
    ],
    [
      "Tuesday",
      "Make room for imagination",
      "Colour, sketch and build in our creative spaces.",
      "/gallery?category=Arts",
      "art",
    ],
    [
      "Wednesday",
      "What if we could build it?",
      "Robotics & Makers · 3:15 PM · Classes VI–VIII.",
      "/clubs/robotics",
      "project",
    ],
    [
      "Thursday",
      "A moment for ourselves",
      "Movement, reflection and wellbeing in the school day.",
      "/help",
      "wellbeing",
    ],
    [
      "Friday",
      "Together on the field",
      "Celebrate effort and teamwork, one little win at a time.",
      "/clubs/field-club",
      "sport",
    ],
  ];
  return (
    <div className="page school-life-page">
      <PageHeading
        label="School life"
        title="A whole world beyond the bell."
        text="Friendships that grow. Interests that surprise. Experiences that help children become more themselves."
      />
      <div className="life-banner">
        <img
          src="/images/celebration.webp"
          alt="A lively celebration with students on stage"
        />
        <div>
          <span className="tag">THE JOY OF BELONGING</span>
          <h2>
            Here, everyone
            <br />
            has a part to play.
          </h2>
          <ButtonLink to="/gallery">Open our photo journal</ButtonLink>
        </div>
      </div>
      <section className="week-planner">
        <div className="section-heading">
          <div>
            <Eyebrow>A WEEK AT BLOOMFIELD</Eyebrow>
            <h2>
              Ordinary days.
              <br />
              <span>Extraordinary little moments.</span>
            </h2>
          </div>
          <p>An illustrative week in our community.</p>
        </div>
        <div className="day-tabs" role="tablist" aria-label="Week planner">
          {week.map((d, i) => (
            <button
              role="tab"
              aria-selected={day === i}
              aria-controls="day-panel"
              key={d[0]}
              onClick={() => setDay(i)}
              className={day === i ? "active" : ""}
            >
              {d[0]}
            </button>
          ))}
        </div>
        <div className="day-panel" id="day-panel" role="tabpanel">
          <img src={"/images/" + week[day][4] + ".webp"} alt={week[day][1]} />
          <div>
            <CalendarDays />
            <small>{week[day][0].toUpperCase()} · SAMPLE SCHOOL WEEK</small>
            <h3>{week[day][1]}</h3>
            <p>{week[day][2]}</p>
            <TextLink to={week[day][3]}>Discover more</TextLink>
          </div>
        </div>
      </section>
      <section className="club-explorer">
        <div className="section-heading">
          <div>
            <Eyebrow>FOLLOW A LITTLE CURIOSITY</Eyebrow>
            <h2>
              Find your people.
              <br />
              <span>Find your thing.</span>
            </h2>
          </div>
          <TextLink to="/clubs">All clubs & interests</TextLink>
        </div>
        <div className="chips">
          {["All", "Technology", "Literature", "Sports"].map((x) => (
            <button
              aria-pressed={selected === x}
              key={x}
              className={selected === x ? "active" : ""}
              onClick={() => setParams(x === "All" ? {} : { interest: x })}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="club-grid">
          {clubs
            .filter((c) => selected === "All" || c.category === selected)
            .map((c, i) => (
              <Link key={c.slug} to={"/clubs/" + c.slug}>
                <img
                  src={
                    "/images/" +
                    {
                      Technology: "project",
                      Literature: "library",
                      Sports: "sport",
                    }[c.category] +
                    ".webp"
                  }
                  alt={c.title}
                  loading="lazy"
                />
                <div>
                  <span className="tag">{c.category}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="text-link">
                    Explore club
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <div className="section-heading">
        <div>
          <Eyebrow>STUDENT VOICES</Eyebrow>
          <h2>
            Small stories. <span>Lasting meaning.</span>
          </h2>
        </div>
      </div>
      <div className="story-list">
        {stories.map((s, i) => (
          <Link key={s.slug} to={"/stories/" + s.slug}>
            <span className="story-index">0{i + 1}</span>
            <div>
              <small>{s.category} · Fictional student story</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
            <ArrowUpRight />
          </Link>
        ))}
      </div>
      <div className="info-panel">
        <Users />
        <div>
          <h3>A community that keeps growing.</h3>
          <p>
            There is a place for parents, educators and alumni in the Bloomfield
            story.
          </p>
          <TextLink to="/alumni">Meet our alumni community</TextLink>
        </div>
      </div>
    </div>
  );
}
function Learning() {
  const [params, setParams] = useSearchParams();
  const stage = params.get("stage") || "All";
  const interest = params.get("interest") || "All";
  const results = programmes.filter(
    (p) =>
      (stage === "All" || p.slug === stage) &&
      (interest === "All" ||
        p.subjects.some((s) =>
          s.toLowerCase().includes(interest.toLowerCase()),
        )),
  );
  return (
    <div className="page learning-page">
      <PageHeading
        label="Learning at Bloomfield"
        title="The next question changes everything."
        text="From the first ‘why?’ to the next ‘what if?’, our LKG–XII CBSE learning concept makes room for every kind of curiosity."
      />
      <div className="learning-principles">
        {[
          [
            BookOpen,
            "Strong foundations",
            "A thoughtful balance of knowledge, skills and understanding.",
          ],
          [
            Heart,
            "A caring classroom",
            "Children learn best when they feel seen, heard and safe.",
          ],
          [
            Sparkles,
            "Room to explore",
            "Real questions and hands-on experiences bring learning to life.",
          ],
        ].map(([Icon, title, text]) => {
          const I = Icon as typeof BookOpen;
          return (
            <div key={String(title)}>
              <I />
              <h3>{String(title)}</h3>
              <p>{String(text)}</p>
            </div>
          );
        })}
      </div>
      <div className="filter-bar">
        <label>
          Learning stage
          <select
            value={stage}
            onChange={(e) =>
              setParams((p) => {
                p.set("stage", e.target.value);
                return p;
              })
            }
          >
            <option>All</option>
            {programmes.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Explore an interest
          <select
            value={interest}
            onChange={(e) =>
              setParams((p) => {
                p.set("interest", e.target.value);
                return p;
              })
            }
          >
            {["All", "Language", "Science", "Art", "Computing"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <span>{results.length} learning stages</span>
      </div>
      <div className="learning-rows">
        {results.map((p) => {
          const i = programmes.indexOf(p);
          return (
            <Reveal key={p.slug} className="learning-row">
              <img
                src={
                  "/images/" +
                  ["early-years", "art", "project", "library"][i] +
                  ".webp"
                }
                alt={p.name + " learning setting"}
                loading="lazy"
              />
              <div>
                <span className="stage-number">
                  0{i + 1} / THE LEARNING JOURNEY
                </span>
                <h2>{p.name}</h2>
                <span className="tag">
                  {p.grades} · {p.age}
                </span>
                <h3>{p.description}</h3>
                <div className="subject-pills">
                  {p.subjects.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <ButtonLink to={"/academics/" + p.slug}>
                  Inside {p.name.toLowerCase()}
                </ButtonLink>
              </div>
            </Reveal>
          );
        })}
      </div>
      {!results.length && <Empty />}
      <div className="info-panel">
        <GraduationCap />
        <div>
          <h3>Thinking about their next step?</h3>
          <p>
            Explore indicative eligibility, fees and a guided sample
            application.
          </p>
          <TextLink to="/admissions">Your admissions guide</TextLink>
        </div>
      </div>
    </div>
  );
}
function Campus() {
  const [params, setParams] = useSearchParams();
  const interest = params.get("interest") || "All";
  const [mode, setMode] = useState("Photos");
  const [campus, setCampus] = useState("Bloomfield Campus");
  const stops = [
    { ...facilities[0], category: "Learn", img: "library" },
    { ...facilities[1], category: "Create", img: "lab" },
    { ...facilities[2], category: "Play", img: "outdoor" },
  ];
  const matches = stops.filter(
    (s) => interest === "All" || s.category === interest,
  );
  const current =
    matches.find((s) => s.slug === params.get("stop")) || matches[0];
  const pick = (slug: string) =>
    setParams((p) => {
      p.set("stop", slug);
      return p;
    });
  return (
    <div className="page campus-page">
      <PageHeading
        label="Our campus"
        title="Follow a question. Find your place."
        text="A quiet reading corner. A field full of possibility. A space to make something your own. Explore a fictional campus, designed around school life."
      />
      <div className="filter-bar">
        <label>
          Campus
          <select value={campus} onChange={(e) => setCampus(e.target.value)}>
            <option>Bloomfield Campus</option>
            <option>River Campus — preview</option>
          </select>
        </label>
        <div className="chips">
          {["All", "Learn", "Play", "Create"].map((x) => (
            <button
              key={x}
              className={interest === x ? "active" : ""}
              aria-pressed={interest === x}
              onClick={() => setParams(x === "All" ? {} : { interest: x })}
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      {campus !== "Bloomfield Campus" ? (
        <Empty
          title="This campus is still a blank page."
          text="River Campus has no configured facilities. Choose Bloomfield Campus to explore the demo."
        />
      ) : !current ? (
        <Empty />
      ) : (
        <>
          <div className="campus-view-bar">
            <span>
              <MapPin size={17} />
              BLOOMFIELD EXPLORER
            </span>
            <div className="chips">
              {["Photos", "Campus map", "3D model", "360 tour"].map((x) => (
                <button
                  key={x}
                  onClick={() => setMode(x)}
                  aria-pressed={mode === x}
                  className={mode === x ? "active" : ""}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="b-campus-explorer">
            <aside>
              {matches.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => pick(s.slug)}
                  className={current.slug === s.slug ? "active" : ""}
                >
                  <span>{s.number}</span>
                  <div>
                    <small>{s.category.toUpperCase()}</small>
                    <b>{s.short}</b>
                  </div>
                  <ArrowUpRight size={18} />
                </button>
              ))}
              <div className="campus-aside-note">
                <Trees />
                <p>
                  A place for big ideas
                  <br />
                  and little adventures.
                </p>
                <span>ILLUSTRATIVE CAMPUS</span>
              </div>
            </aside>
            <div className="b-campus-scene">
              {mode === "3D model" ? (
                <Suspense
                  fallback={
                    <div className="empty">Preparing the campus model…</div>
                  }
                >
                  <Campus3D active={current.slug} onSelect={pick} />
                </Suspense>
              ) : mode === "Campus map" ? (
                <div className="map-diagram">
                  <svg
                    viewBox="0 0 700 450"
                    role="img"
                    aria-label="Fictional campus: sports field north, library west, science wing east, accessible entrance and parking south"
                  >
                    <rect width="700" height="450" rx="12" fill="#e9eee1" />
                    <path
                      d="M350 450V130M90 290h520"
                      stroke="#fffdf4"
                      strokeWidth="38"
                    />
                    <rect
                      x="235"
                      y="30"
                      width="230"
                      height="135"
                      rx="60"
                      fill="#9eb78f"
                    />
                    <rect
                      x="245"
                      y="40"
                      width="210"
                      height="115"
                      rx="55"
                      fill="none"
                      stroke="white"
                    />
                    <text x="350" y="105" textAnchor="middle">
                      03 · Sports grounds
                    </text>
                    <rect
                      x="35"
                      y="190"
                      width="245"
                      height="145"
                      rx="12"
                      fill="#e9ce87"
                    />
                    <text x="158" y="260" textAnchor="middle">
                      01 · Library
                    </text>
                    <rect
                      x="425"
                      y="190"
                      width="245"
                      height="145"
                      rx="12"
                      fill="#b4c9b7"
                    />
                    <text x="548" y="260" textAnchor="middle">
                      02 · Science wing
                    </text>
                    <text x="350" y="410" textAnchor="middle">
                      Entrance · Parking · Step-free path
                    </text>
                  </svg>
                  <p>Fictional layout · Select a facility from the list.</p>
                </div>
              ) : (
                <>
                  <img
                    src={"/images/" + current.img + ".webp"}
                    alt={current.short + " illustrative photograph"}
                  />
                  {mode === "360 tour" && (
                    <div className="tour-fallback">
                      <Camera />
                      <h3>A still moment, for now.</h3>
                      <p>
                        A licensed 360° panorama has not been supplied. Explore
                        the same facilities through photos, map or the 3D
                        concept.
                      </p>
                      <button
                        className="button"
                        onClick={() => setMode("Photos")}
                      >
                        Explore photos
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="facility-detail">
            <div>
              <Eyebrow>
                {current.category} · STOP {current.number}
              </Eyebrow>
              <h2>{current.name}</h2>
              <p>{current.description}</p>
            </div>
            <div>
              <h3>Everyone is welcome.</h3>
              <p>
                {current.access} Illustrative access information; a live school
                must verify these details.
              </p>
              <ButtonLink to="/visit">Come and explore</ButtonLink>
            </div>
          </div>
          <div className="info-panel">
            <MapPin />
            <div>
              <h3>Your first stop: a friendly hello.</h3>
              <p>
                Sample arrival: South gate, visitor parking beside reception,
                step-free entrance path. Real coordinates, landmarks and travel
                times have not been configured.
              </p>
              <button className="button secondary" disabled>
                Configure school location
              </button>
              <TextLink to="/transport">
                Check sample transport coverage
              </TextLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
function Families() {
  return (
    <div className="page families-page">
      <PageHeading
        label="For our families"
        title="We’re on this journey together."
        text="From a first school visit to the everyday questions, find a little help and a clear next step."
      />
      <div className="family-welcome">
        <div>
          <Eyebrow>YOUR SCHOOL DAY, SIMPLIFIED</Eyebrow>
          <h2>
            A window into
            <br />
            <span>their everyday world.</span>
          </h2>
          <p>
            See what’s coming up, follow their learning and stay connected with
            the people who care for them.
          </p>
          <ButtonLink to="/portal/parent">Explore the parent portal</ButtonLink>
        </div>
        <img
          src="/images/early-years.webp"
          alt="Children learning together in a welcoming classroom"
        />
      </div>
      <div className="family-tools">
        {[
          [
            CalendarDays,
            "Dates for your diary",
            "School events, open house and everyday updates.",
            "/events",
          ],
          [
            BookOpen,
            "Learning & homework",
            "Assignments, resources and a little encouragement.",
            "/portal/assignments",
          ],
          [
            CreditCard,
            "Fees, clearly explained",
            "Indicative estimates, invoices and receipt previews.",
            "/portal/fees",
          ],
          [
            Users,
            "Time for a conversation",
            "Book a sample parent–teacher meeting.",
            "/portal/ptm",
          ],
          [
            Bus,
            "Getting to school",
            "Coverage, sample routes and transport information.",
            "/transport",
          ],
          [
            FileText,
            "The things you need",
            "School guides, book lists and useful documents.",
            "/downloads",
          ],
          [
            Heart,
            "Wellbeing & support",
            "Find the right person for a school-day concern.",
            "/help",
          ],
          [
            Sparkles,
            "Your next chapter",
            "A friendly guide to the admission process.",
            "/admissions",
          ],
        ].map(([Icon, title, text, path]) => {
          const I = Icon as typeof Heart;
          return (
            <Link key={String(path)} to={String(path)}>
              <I />
              <h3>{String(title)}</h3>
              <p>{String(text)}</p>
              <ArrowUpRight className="tool-arrow" />
            </Link>
          );
        })}
      </div>
      <div className="section-heading">
        <div>
          <Eyebrow>A LITTLE REASSURANCE</Eyebrow>
          <h2>
            Questions are <span>always welcome.</span>
          </h2>
        </div>
      </div>
      {[
        [
          "How can I follow my child’s progress?",
          "The parent preview includes a child switcher, attendance, subject progress, assignments and school messages. All records are fictional.",
        ],
        [
          "Who can help with a wellbeing concern?",
          "Use the support and concerns form in the family portal, or explore Contact & Support. For urgent safety concerns, contact local emergency services or an appropriate trusted adult.",
        ],
        [
          "Can I meet the school before applying?",
          "Yes. Explore the Meet Us journey to select a sample date, time and campus. You can review details before saving a demo booking.",
        ],
        [
          "Are online payments available?",
          "The demo includes an invoice and payment-state walkthrough. It does not collect money. A verified school payment provider is required for a live service.",
        ],
      ].map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
      <div className="info-panel">
        <Heart />
        <div>
          <h3>Sometimes, you just need to talk.</h3>
          <p>Our sample support hub can help you find the right next step.</p>
          <TextLink to="/contact">Find your school contact</TextLink>
        </div>
      </div>
    </div>
  );
}
export default function Experiences() {
  const { pathname } = useLocation();
  if (pathname === "/gallery") return <Gallery />;
  if (pathname === "/academics") return <Learning />;
  if (pathname === "/campus") return <Campus />;
  if (pathname === "/families") return <Families />;
  return <SchoolLife />;
}
