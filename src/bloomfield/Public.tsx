import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  CalendarDays,
  Search,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import {
  ButtonLink,
  PageHeading,
  Eyebrow,
  TextLink,
  Modal,
  SimpleForm,
  Empty,
  Success,
} from "./shared";
import { useFilter, useStored } from "./demo";
import {
  programmes,
  facilities,
  stories,
  notices,
  events,
  faculty,
  clubs,
  careers,
  download,
  dateLabel,
  calendarDownload,
  type Entry,
} from "./data";
export function NotFound() {
  return (
    <div className="page">
      <PageHeading
        label="404"
        title="A little off the beaten path."
        text="We couldn't find that page. There are still plenty of things to discover."
      />
      <ButtonLink to="/">Back to Bloomfield</ButtonLink>
    </div>
  );
}
function About() {
  const [year, setYear] = useState(0);
  const years = ["1986", "2002", "2015", "2026"];
  const chapters = [
    [
      "A school. A shared belief.",
      "Bloomfield began in this fictional history with a simple idea: learning should shape both the mind and the person. A small community of educators imagined a school where every child would be known.",
      "school-20.webp",
    ],
    [
      "A bigger world of learning",
      "New reading rooms and science spaces gave students more ways to explore their questions. The sample school grew while keeping a close-knit spirit.",
      "reading-room.webp",
    ],
    [
      "Making room for possibility",
      "Arts, sport and independent projects became part of a broader learning journey, helping each learner discover their own strengths.",
      "school-23.webp",
    ],
    [
      "Rooted in values. Looking forward.",
      "Today, our imagined community continues to bring care, academic depth and curiosity into every classroom. The next chapter belongs to our learners.",
      "classroom.webp",
    ],
  ];
  return (
    <div className="page">
      <PageHeading
        label="Our story"
        title="A legacy of looking forward."
        text="An education is more than what a child knows. It is who they become—and how they choose to make a difference."
      />
      <div className="wide-photo">
        <img
          src="/images/school-20.webp"
          alt="Illustrative school building and courtyard"
        />
      </div>
      <div className="editorial-section">
        <Eyebrow>Our purpose</Eyebrow>
        <div>
          <h2>
            Knowledge with character.
            <br />
            <em>Ambition with kindness.</em>
          </h2>
          <p>
            We nurture thoughtful learners who ask good questions, act with
            integrity and feel responsible for the world around them. Our
            approach brings rigorous learning into a warm, supportive community.
          </p>
          <div className="mini-grid">
            {[
              "Curiosity before certainty",
              "Care in every interaction",
              "A voice for every learner",
            ].map((x) => (
              <div key={x}>
                <Check size={19} />
                <h3>{x}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="timeline">
        <Eyebrow>The chapters that shaped us</Eyebrow>
        <h2>A story still being written.</h2>
        <p className="hint">
          Illustrative school history · All milestones are fictional.
        </p>
        <div
          className="timeline-years"
          role="tablist"
          aria-label="School history"
        >
          {years.map((y, i) => (
            <button
              key={y}
              role="tab"
              aria-selected={year === i}
              onClick={() => setYear(i)}
            >
              {y}
              <span />
            </button>
          ))}
        </div>
        <div className="split">
          <img
            src={"/images/" + chapters[year][2]}
            alt={"Illustrative archive for " + years[year]}
          />
          <article>
            <span className="display-year">{years[year]}</span>
            <h3>{chapters[year][0]}</h3>
            <p>{chapters[year][1]}</p>
          </article>
        </div>
      </section>
      <section className="editorial-section">
        <Eyebrow>The people behind the purpose</Eyebrow>
        <div>
          <h2>Teachers. Mentors. Possibility-makers.</h2>
          <p>
            Meet the fictional educators who bring the Bloomfield philosophy to
            life, one thoughtful lesson at a time.
          </p>
          <ButtonLink to="/faculty">Meet our educators</ButtonLink>
        </div>
      </section>
    </div>
  );
}
function Academics({ slug }: { slug?: string }) {
  const [filter, setFilter] = useFilter("stage");
  const p = programmes.find((x) => x.slug === slug);
  if (slug && !p) return <NotFound />;
  return (
    <div className="page">
      <PageHeading
        label="Academics"
        title={p ? p.name : "A learning journey, uniquely theirs."}
        text={
          p
            ? p.description
            : "From first discoveries to independent thinking, every stage opens up a new world."
        }
      />
      {p ? (
        <div className="chapter-layout">
          <aside className="chapter-nav">
            {[
              "Overview",
              "Curriculum",
              "A day at Bloomfield",
              "Next steps",
            ].map((t, i) => (
              <a key={t} href={"#chapter-" + i}>
                <span>0{i + 1}</span>
                {t}
              </a>
            ))}
            <Link to="/academics">
              All programmes <ArrowRight size={16} />
            </Link>
          </aside>
          <div>
            <img
              className="detail-image"
              src={"/images/" + p.image}
              alt={p.name + " illustrative classroom"}
            />
            <section id="chapter-0">
              <Eyebrow>
                {p.grades} · {p.age}
              </Eyebrow>
              <h2>Space to find their own way.</h2>
              <p>
                Learning connects careful foundations with hands-on discovery.
                Small-group discussion, purposeful projects and regular feedback
                help children become confident, thoughtful learners.
              </p>
            </section>
            <section id="chapter-1">
              <h2>A connected curriculum.</h2>
              <div className="mini-grid">
                {p.subjects.map((s) => (
                  <div key={s}>
                    <BookOpen size={22} />
                    <h3>{s}</h3>
                    <p>
                      Explore, practise and connect ideas through meaningful
                      projects.
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section id="chapter-2">
              <h2>A day full of possibility.</h2>
              <div className="table-wrap">
                <table>
                  <caption>Illustrative weekday timetable · IST</caption>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Learning experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["08:30", "Morning circle & reading"],
                      ["09:00", "Language & mathematics"],
                      ["10:30", "Break & outdoor play"],
                      ["11:00", "Inquiry studio"],
                      ["12:30", "Lunch"],
                      ["13:15", "Art, music & sport"],
                      ["15:00", "Reflection & home time"],
                    ].map((r) => (
                      <tr key={r[0]}>
                        <td>{r[0]}</td>
                        <td>{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section id="chapter-3">
              <h2>Let's explore what's next.</h2>
              <div className="actions">
                <ButtonLink to="/admissions/eligibility">
                  Check eligibility
                </ButtonLink>
                <ButtonLink to="/admissions/fees" secondary>
                  Explore fees
                </ButtonLink>
                <button
                  className="text-link"
                  onClick={() =>
                    download(
                      p.slug + "-guide.txt",
                      `BLOOMFIELD SCHOOL — SAMPLE PROGRAMME GUIDE\n${p.name}\n${p.grades}\n${p.subjects.join("\n")}\nSample timetable: 08:30–15:00 IST. Version 1, September 2026. Fictional preview; no affiliation claims.`,
                    )
                  }
                >
                  Download programme guide
                  <Download size={16} />
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <>
          <div className="chips">
            {["All", ...programmes.map((p) => p.slug)].map((s) => (
              <button
                className={filter === s ? "active" : ""}
                key={s}
                onClick={() => setFilter(s)}
              >
                {programmes.find((p) => p.slug === s)?.name || s}
              </button>
            ))}
          </div>
          <div className="programme-grid">
            {programmes
              .filter((p) => filter === "All" || p.slug === filter)
              .map((p, i) => (
                <Link
                  className="programme-card"
                  key={p.slug}
                  to={"/academics/" + p.slug}
                >
                  <img
                    src={"/images/" + p.image}
                    alt={p.name + " sample learning space"}
                    loading="lazy"
                  />
                  <div>
                    <span className="tag">
                      {p.grades} · {p.age}
                    </span>
                    <h2>
                      {p.name}
                      <ArrowUpRight size={23} />
                    </h2>
                    <p>{p.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
function Campus({ slug }: { slug?: string }) {
  const [params, setParams] = useSearchParams();
  const index = facilities.findIndex(
    (f) => f.slug === (slug || params.get("stop")),
  );
  const active = Math.max(index, 0);
  const f = facilities[active];
  const [mode, setMode] = useState("Trail");
  const [campus, setCampus] = useState("Bloomfield Campus");
  if (slug && index < 0) return <NotFound />;
  function select(i: number) {
    setParams({ stop: facilities[(i + 3) % 3].slug });
  }
  return (
    <div className="page">
      <PageHeading
        label="Our campus"
        title="A place for every possibility."
        text="Take the long way around. Follow a question. Find a favourite corner. This is where learning comes to life."
      />
      <div className="filter-bar">
        <label>
          Explore a campus
          <select value={campus} onChange={(e) => setCampus(e.target.value)}>
            <option>Bloomfield Campus</option>
            <option>River Campus — preview</option>
          </select>
        </label>
        <div className="chips">
          {["Trail", "Campus map", "360 / 3D"].map((x) => (
            <button
              className={mode === x ? "active" : ""}
              key={x}
              onClick={() => setMode(x)}
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      {campus !== "Bloomfield Campus" ? (
        <Empty
          title="A new chapter is being planned."
          text="No facilities or location data are configured for River Campus. Choose Bloomfield Campus to continue."
        />
      ) : (
        <>
          <div className="campus-explorer">
            <aside>
              <Eyebrow>The campus trail</Eyebrow>
              {facilities.map((t, i) => (
                <Link
                  key={t.slug}
                  to={"/campus?stop=" + t.slug}
                  className={active === i ? "selected" : ""}
                >
                  <span>{t.number}</span>
                  <div>
                    {t.short}
                    <small>
                      {i === 0
                        ? "A world between the pages"
                        : i === 1
                          ? "For minds that ask why"
                          : "Learning to play, together"}
                    </small>
                  </div>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </aside>
            <div className="campus-scene">
              {mode === "Campus map" ? (
                <svg
                  viewBox="0 0 700 430"
                  role="img"
                  aria-label="Fictional campus diagram: entrance at bottom, library left, science wing right, sports grounds above"
                >
                  <rect width="700" height="430" fill="#e9eee4" />
                  <path
                    d="M350 430V160M140 270H560"
                    stroke="#fff"
                    strokeWidth="38"
                  />
                  <rect
                    x="230"
                    y="25"
                    width="240"
                    height="125"
                    rx="50"
                    fill="#b7c4a2"
                  />
                  <text x="350" y="92" textAnchor="middle">
                    03 · Sports Grounds
                  </text>
                  <rect
                    x="30"
                    y="180"
                    width="235"
                    height="135"
                    fill="#d1bb8d"
                    rx="8"
                  />
                  <text x="145" y="245" textAnchor="middle">
                    01 · Library
                  </text>
                  <rect
                    x="430"
                    y="180"
                    width="240"
                    height="135"
                    fill="#b1c4cf"
                    rx="8"
                  />
                  <text x="550" y="245" textAnchor="middle">
                    02 · Science Wing
                  </text>
                  <text x="350" y="398" textAnchor="middle">
                    Entrance · Parking · Access path
                  </text>
                </svg>
              ) : (
                <img
                  src={"/images/" + f.image}
                  alt={f.short + " still-image tour"}
                />
              )}
              <div className="scene-label">
                {mode === "360 / 3D"
                  ? "Still-image fallback · Panorama and approved 3D model not supplied"
                  : "Illustrative campus · Select stops in the trail list"}
              </div>
            </div>
          </div>
          <div className="facility-detail">
            <div>
              <Eyebrow>Stop {f.number} / 03</Eyebrow>
              <h2>{f.name}</h2>
              <p>{f.description}</p>
            </div>
            <div>
              <h3>Access & visiting</h3>
              <p>
                {f.access} These fictional details require school verification.
              </p>
              <div className="actions">
                <Link
                  className="icon-button"
                  aria-label="Previous stop"
                  to={"/campus?stop=" + facilities[(active + 2) % 3].slug}
                >
                  <ChevronLeft />
                </Link>
                <Link
                  className="icon-button"
                  aria-label="Next stop"
                  to={"/campus?stop=" + facilities[(active + 1) % 3].slug}
                >
                  <ChevronRight />
                </Link>
                <ButtonLink to="/visit">See it for yourself</ButtonLink>
              </div>
            </div>
          </div>
          <div className="info-panel">
            <MapPin />
            <div>
              <h3>Finding your way</h3>
              <p>
                Sample entrance: South gate · Visitor parking beside reception ·
                Step-free entrance route. Real coordinates and nearby landmarks
                have not been configured.
              </p>
              <button disabled className="button secondary">
                Configure school location
              </button>
              <TextLink to="/transport">
                Explore sample transport coverage
              </TextLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
const catalogue: Record<
  string,
  { title: string; intro: string; items: Entry[] }
> = {
  faculty: {
    title: "People who make a difference.",
    intro:
      "Educators who see the person behind the pupil. All profiles are fictional.",
    items: faculty,
  },
  achievements: {
    title: "The joy of going a little further.",
    intro:
      "Celebrate curiosity, effort and the things we discover together. Sample stories and outcomes.",
    items: stories,
  },
  community: {
    title: "Many voices. One community.",
    intro:
      "The stories, shared moments and small discoveries that make us Bloomfield.",
    items: stories,
  },
  alumni: {
    title: "Always a part of the story.",
    intro:
      "Different paths. Shared beginnings. Discover our fictional alumni community.",
    items: stories.filter((s) => s.category === "Alumni"),
  },
  notices: {
    title: "The latest from Bloomfield.",
    intro:
      "The dates, details and everyday updates you need. Published sample circulars.",
    items: notices,
  },
  events: {
    title: "Good things ahead.",
    intro:
      "A calendar of discovery, celebration and coming together. Sample events · Asia/Kolkata.",
    items: events,
  },
  clubs: {
    title: "Find your people. Find your passion.",
    intro:
      "After the last bell, a whole new world opens up. Explore our sample clubs.",
    items: clubs,
  },
  careers: {
    title: "Help shape the next chapter.",
    intro:
      "Bring your curiosity, your care and your love of learning. Fictional vacancies for this preview.",
    items: careers,
  },
};
function Catalogue({ kind, slug }: { kind: string; slug?: string }) {
  const info = catalogue[kind];
  const [category, setCategory] = useFilter();
  const [query, setQuery] = useFilter("q");
  const [date, setDate] = useFilter("after");
  const [view, setView] = useState("Agenda");
  const [summary, setSummary] = useState(false);
  const [modal, setModal] = useState("");
  const [joined, setJoined] = useStored<string[]>("registrations", []);
  const entry = info.items.find((e) => e.slug === slug);
  const isMember = entry && joined.includes(entry.slug);
  if (slug && !entry) return <NotFound />;
  const filtered = info.items.filter(
    (e) =>
      (category === "All" || e.category === category) &&
      (query === "All" ||
        (e.title + " " + e.text).toLowerCase().includes(query.toLowerCase())) &&
      (date === "All" || e.date >= date),
  );
  return (
    <div className="page">
      <PageHeading
        label={kind}
        title={entry ? entry.title : info.title}
        text={entry ? entry.extra : info.intro}
      />
      {kind === "community" && !entry && (
        <nav className="chips" aria-label="Community sections">
          {[
            ["Photo gallery", "/gallery"],
            ["Clubs & societies", "/clubs"],
            ["Achievements", "/achievements"],
            ["Alumni", "/alumni"],
          ].map(([label, to]) => (
            <Link className="button secondary" key={to} to={to}>
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </nav>
      )}
      {entry ? (
        <article className="reading-detail">
          {entry.image && (
            <img
              className="detail-image"
              src={"/images/" + entry.image}
              alt={
                "Illustrative " + entry.category.toLowerCase() + " photograph"
              }
            />
          )}
          <div className="meta">
            <span className="tag">{entry.category}</span>
            <span>{dateLabel(entry.date)} · Sample content</span>
          </div>
          <p className="lead">{entry.text}</p>
          {kind === "notices" && (
            <>
              <button
                className="button secondary"
                onClick={() => setSummary(!summary)}
              >
                Show key dates & actions
              </button>
              {summary && (
                <div className="info-panel">
                  <div>
                    <h3>Demo circular summary</h3>
                    <p>
                      {entry.slug === "reading-week"
                        ? "5–9 October: Reading Week. Bring a favourite, labelled book on Monday 5 October. No purchase required."
                        : entry.text}
                    </p>
                    <a href={"/notices/" + entry.slug}>
                      Original circular · {dateLabel(entry.date)} · v1
                    </a>
                  </div>
                </div>
              )}
              <button
                className="text-link"
                onClick={() =>
                  download(
                    entry.slug + ".txt",
                    entry.title +
                      "\nSample circular v1 · " +
                      entry.date +
                      "\n" +
                      entry.text,
                  )
                }
              >
                Download sample circular
                <Download size={16} />
              </button>
            </>
          )}
          {kind === "events" && (
            <div className="actions">
              <button
                className="button"
                onClick={() => setModal("Event registration")}
              >
                Register your interest
                <ArrowRight size={16} />
              </button>
              <button
                className="button secondary"
                onClick={() => calendarDownload(entry)}
              >
                Add to calendar
                <CalendarDays size={16} />
              </button>
            </div>
          )}
          {kind === "clubs" && (
            <>
              <button
                className="button"
                onClick={() =>
                  setJoined(
                    isMember
                      ? joined.filter((s) => s !== entry.slug)
                      : [...joined, entry.slug],
                  )
                }
              >
                {isMember
                  ? "Cancel demo registration"
                  : entry.slug === "field-club"
                    ? "Join demo waitlist"
                    : "Join club preview"}
              </button>
              {isMember && (
                <Success>
                  {entry.slug === "field-club"
                    ? "Added to the sample waitlist. No place reserved."
                    : "Demo registration saved. No real place reserved."}
                </Success>
              )}
            </>
          )}
          {kind === "careers" && (
            <SimpleForm kind="Career application" upload />
          )}
          {kind === "faculty" && (
            <>
              <h2>A classroom built around questions.</h2>
              <p>
                Our sample teaching approach combines guided enquiry, regular
                feedback and a supportive learning environment. No personal
                contact details are published.
              </p>
              <ButtonLink to="/visit">Meet the community</ButtonLink>
            </>
          )}
          {["community", "achievements", "alumni"].includes(kind) && (
            <div className="info-panel">
              <BookOpen />
              <div>
                <h3>From our sample school journal</h3>
                <p>
                  This is a fictional editorial story, not a verified award or
                  real alumni testimonial. Evidence and consent-approved media
                  would be supplied by the school before publication.
                </p>
                <TextLink to="/clubs">Find a new interest</TextLink>
              </div>
            </div>
          )}
        </article>
      ) : (
        <>
          <div className="filter-bar">
            <label className="search-field">
              <Search size={17} />
              <input
                aria-label={"Search " + kind}
                placeholder={"Search " + kind + "…"}
                value={query === "All" ? "" : query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label>
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["All", ...new Set(info.items.map((e) => e.category))].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </label>
            {["events", "notices", "achievements"].includes(kind) && (
              <label>
                From date
                <input
                  type="date"
                  value={date === "All" ? "" : date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
            )}
            {kind === "events" && (
              <div className="chips">
                {["Agenda", "Month"].map((x) => (
                  <button
                    key={x}
                    className={view === x ? "active" : ""}
                    onClick={() => setView(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            )}
          </div>
          {view === "Month" && kind === "events" ? (
            <>
              <h2>October 2026</h2>
              <div className="month-grid">
                {Array.from({ length: 31 }, (_, i) => {
                  const e = filtered.find(
                    (e) => Number(e.date.slice(-2)) === i + 1,
                  );
                  return (
                    <div key={i}>
                      <span>{i + 1}</span>
                      {e && <Link to={"/events/" + e.slug}>{e.title}</Link>}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div
              className={
                "content-grid " +
                (!info.items.some((i) => i.image) ? "text-cards" : "")
              }
            >
              {filtered.map((e) => (
                <Link
                  key={e.slug}
                  to={"/" + kind + "/" + e.slug}
                  className="content-card"
                >
                  {e.image ? (
                    <img
                      src={"/images/" + e.image}
                      alt={"Illustrative " + e.category + " image"}
                      loading="lazy"
                    />
                  ) : kind === "faculty" ? (
                    <div className="faculty-monogram">
                      {e.title
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                      <GraduationCap size={40} />
                    </div>
                  ) : (
                    <div className="card-symbol">
                      <BookOpen size={25} />
                    </div>
                  )}
                  <div className="card-body">
                    <span className="tag">{e.category}</span>
                    <h2>{e.title}</h2>
                    <p>{e.text.slice(0, 135)}…</p>
                    <span className="card-bottom">
                      {dateLabel(e.date)}
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {!filtered.length && <Empty />}
          {kind === "alumni" && (
            <section className="panel">
              <h2>Stay part of the story.</h2>
              <p>
                Opt in to the fictional alumni interest list. No contact
                information is published or sent.
              </p>
              <SimpleForm kind="Alumni interest" />
            </section>
          )}
        </>
      )}
      {modal && (
        <Modal title={modal} onClose={() => setModal("")}>
          <SimpleForm kind={modal} />
        </Modal>
      )}
    </div>
  );
}
function Gallery() {
  const [category, setCategory] = useFilter();
  const [year, setYear] = useFilter("year");
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState<number | null>(null);
  const photos = [
    {
      image: "school-22.webp",
      title: "Friendships for the journey",
      category: "Community",
    },
    {
      image: "school-23.webp",
      title: "A rhythm of their own",
      category: "Arts",
    },
    {
      image: "science-lab.webp",
      title: "Questions worth exploring",
      category: "Learning",
    },
    {
      image: "school-38.webp",
      title: "Together on the field",
      category: "Sports",
    },
    {
      image: "reading-room.webp",
      title: "A world between the pages",
      category: "Learning",
    },
    {
      image: "young-makers.webp",
      title: "Ideas taking shape",
      category: "Learning",
    },
    {
      image: "classroom.webp",
      title: "Room to discover",
      category: "Learning",
    },
    {
      image: "school-20.webp",
      title: "A place to belong",
      category: "Community",
    },
  ];
  const filtered = photos.filter(
    (p) =>
      (category === "All" || category === p.category) &&
      (year === "All" || year === "2026"),
  );
  const page = Number(params.get("page") || 1);
  const current = filtered.slice((page - 1) * 6, page * 6);
  const change = (delta: number) =>
    setOpen((v) =>
      v === null ? null : (v + delta + filtered.length) % filtered.length,
    );
  return (
    <div className="page">
      <PageHeading
        label="Gallery"
        title="A thousand little moments."
        text="A glimpse of learning, laughter and life together. All photographs are illustrative sample assets."
      />
      <div className="filter-bar">
        <div className="chips">
          {["All", "Learning", "Arts", "Sports", "Community"].map((c) => (
            <button
              className={c === category ? "active" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label>
          Year
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>All</option>
            <option>2026</option>
            <option>2025</option>
          </select>
        </label>
      </div>
      <div className="gallery-grid">
        {current.map((p) => (
          <button key={p.title} onClick={() => setOpen(filtered.indexOf(p))}>
            <img src={"/images/" + p.image} alt={p.title} loading="lazy" />
            <span>
              {p.title}
              <ArrowUpRight size={18} />
            </span>
          </button>
        ))}
      </div>
      {!filtered.length && <Empty />}
      {filtered.length > 6 && (
        <div className="pagination">
          {[1, 2].map((n) => (
            <button
              className={n === page ? "active" : ""}
              key={n}
              onClick={() =>
                setParams((p) => {
                  p.set("page", String(n));
                  return p;
                })
              }
            >
              Page {n}
            </button>
          ))}
        </div>
      )}
      {open !== null && filtered[open] && (
        <Modal title={filtered[open].title} onClose={() => setOpen(null)}>
          <div
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") change(-1);
              if (e.key === "ArrowRight") change(1);
            }}
          >
            <img
              className="lightbox-image"
              src={"/images/" + filtered[open].image}
              alt={filtered[open].title}
            />
            <div className="actions">
              <button className="button secondary" onClick={() => change(-1)}>
                <ChevronLeft />
                Previous
              </button>
              <span>
                {open + 1} / {filtered.length}
              </span>
              <button className="button secondary" onClick={() => change(1)}>
                Next
                <ChevronRight />
              </button>
            </div>
            <p className="hint">
              Illustrative sample · 2026 · Use arrow keys to explore.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
const resources = [
  {
    title: "Bloomfield prospectus",
    category: "Admissions",
    stage: "All",
    text: "Welcome to Bloomfield School. Fictional school preview. Explore Early Years, Primary, Middle and Senior School. Sample school day: 08:30–15:00 IST. Admissions: birth certificate and latest school report. Visit slots: 10, 17, 24 October 2026. No real submissions or payments.",
  },
  {
    title: "Primary programme guide",
    category: "Curriculum",
    stage: "Primary",
    text: "Primary programme: Grades I–V. English, Hindi, mathematics, environmental studies, art, music and sport. Learning through enquiry, practice and play.",
  },
  {
    title: "Class 6 book list",
    category: "Curriculum",
    stage: "Middle",
    text: "Sample Class 6 reading list: a language reader, mathematics workbook, science journal and social science atlas. Titles require school confirmation; do not purchase from this sample list.",
  },
  {
    title: "Admission & fee policy",
    category: "Admissions",
    stage: "All",
    text: "Sample policy v1. Primary tuition: INR 72,000/year; one-time admission INR 15,000; optional transport INR 18,000/year; meals INR 12,000/year. Cutoff: 31 March 2027. LKG age 4–5 inclusive, UKG age 5–6 inclusive, Grade I age 6–7 inclusive. Indicative school rules for this fictional preview only.",
  },
];
function Downloads() {
  const [q, setQ] = useFilter("q");
  const [c, setC] = useFilter();
  const [stage, setStage] = useFilter("stage");
  const found = resources.filter(
    (r) =>
      (q === "All" || r.title.toLowerCase().includes(q.toLowerCase())) &&
      (c === "All" || r.category === c) &&
      (stage === "All" || r.stage === stage || r.stage === "All"),
  );
  return (
    <div className="page">
      <PageHeading
        label="Resource library"
        title="The details, all in one place."
        text="Helpful guides for your family's journey. Versioned, downloadable sample documents."
      />
      <div className="filter-bar">
        <label>
          Find a resource
          <input
            placeholder="Try Class 6…"
            value={q === "All" ? "" : q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <label>
          Category
          <select value={c} onChange={(e) => setC(e.target.value)}>
            <option>All</option>
            <option>Admissions</option>
            <option>Curriculum</option>
          </select>
        </label>
        <label>
          Stage
          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            <option>All</option>
            <option>Primary</option>
            <option>Middle</option>
          </select>
        </label>
      </div>
      {found.map((r) => (
        <div className="resource-row" key={r.title}>
          <BookOpen />
          <div>
            <h2>{r.title}</h2>
            <p>
              {r.category} · {r.stage} · TXT · {new Blob([r.text]).size} bytes ·
              v1 · 22 Sep 2026
            </p>
          </div>
          <button
            className="button secondary"
            onClick={() =>
              download(
                r.title.toLowerCase().replaceAll(" ", "-") + ".txt",
                r.text,
              )
            }
          >
            Download
            <Download size={16} />
          </button>
        </div>
      ))}
      {!found.length && <Empty />}
    </div>
  );
}
function SearchPage() {
  const [q, setQ] = useFilter("q");
  const [mode, setMode] = useFilter("mode");
  const [type, setType] = useFilter("type");
  const all = [
    ...programmes.map((p) => ({
      title: p.name,
      text: p.description + " " + p.subjects.join(" "),
      type: "Programmes",
      link: "/academics/" + p.slug,
    })),
    ...clubs.map((e) => ({
      title: e.title,
      text: e.text,
      type: "Clubs",
      link: "/clubs/" + e.slug,
    })),
    ...notices.map((e) => ({
      title: e.title,
      text: e.text,
      type: "Notices",
      link: "/notices/" + e.slug,
    })),
    ...resources.map((r) => ({
      title: r.title,
      text: r.text,
      type: "Resources",
      link: "/downloads",
    })),
  ];
  const words = (q === "All" ? "" : q).toLowerCase();
  const term =
    mode === "Semantic" && /robot|build|coding|seekhna/.test(words)
      ? "robot"
      : words;
  const results = all.filter(
    (r) =>
      (type === "All" || type === r.type) &&
      (!term || (r.title + " " + r.text).toLowerCase().includes(term)),
  );
  return (
    <div className="page">
      <PageHeading
        label="Search Bloomfield"
        title="What would you like to discover?"
        text="Search public programmes, notices, clubs and guides. Private school records are never included."
      />
      <div className="filter-bar">
        <label className="search-field">
          <Search />
          <input
            autoFocus
            placeholder="Try robotics, fees or Class 6…"
            aria-label="Search public content"
            value={q === "All" ? "" : q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <label>
          Search mode
          <select
            value={mode === "All" ? "Keyword" : mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option>Keyword</option>
            <option>Semantic</option>
          </select>
        </label>
        <label>
          Content type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {["All", "Programmes", "Clubs", "Notices", "Resources"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      {mode === "Semantic" && (
        <p className="hint">
          Demo semantic matching: curated robotics synonyms with keyword
          fallback. Live embeddings are not connected.
        </p>
      )}
      <p>{results.length} public results · Sample index updated 22 Sep 2026</p>
      {results.map((r) => (
        <Link key={r.title} className="search-result" to={r.link}>
          <span className="tag">{r.type}</span>
          <h2>
            {r.title}
            <ArrowUpRight size={20} />
          </h2>
          <p>{r.text.slice(0, 180)}</p>
        </Link>
      ))}
      {!results.length && (
        <Empty
          title="Let's try another path."
          text="Try “Primary”, “fees”, “robotics” or “Class 6”. You can also ask Bloomfield for source-linked guidance."
        />
      )}
    </div>
  );
}
function Transport() {
  const [q, setQ] = useState("");
  const [checked, setChecked] = useState(false);
  const [origin, setOrigin] = useState("");
  const [travel, setTravel] = useState(false);
  const covered = /green park|lake road|demo north/i.test(q);
  return (
    <div className="page">
      <PageHeading
        label="Transport"
        title="A thoughtful journey, every day."
        text="Explore fictional route coverage. Exact stops and availability need school confirmation."
      />
      <div className="split">
        <section className="panel">
          <h2>Does the route come your way?</h2>
          <p>Sample localities: Green Park, Lake Road, Demo North.</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              setChecked(true);
            }}
          >
            <label>
              Locality or pincode
              <input
                required
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setChecked(false);
                }}
                placeholder="e.g. Green Park"
              />
            </label>
            <button className="button">
              Check sample coverage
              <ArrowRight size={16} />
            </button>
          </form>
          {checked && (
            <div className="info-panel" role="status">
              <p>
                {covered
                  ? "Indicative match: sample Route H1. Final stop and seat availability require office confirmation."
                  : "No configured sample route matches this locality. Contact the office for manual review."}
              </p>
            </div>
          )}
        </section>
        <section className="panel">
          <h2>Plan your visit.</h2>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              setTravel(true);
            }}
          >
            <label>
              Starting locality
              <input
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Enter a locality voluntarily"
              />
            </label>
            <button className="button secondary">Check travel estimate</button>
          </form>
          {travel && (
            <p role="status">
              Travel time unavailable: real campus coordinates and a routing
              provider have not been configured. No location permission is
              requested.
            </p>
          )}
          <TextLink to="/contact">Entrance & access information</TextLink>
        </section>
      </div>
    </div>
  );
}
function Support({ kind }: { kind: string }) {
  const titles: Record<string, string> = {
    contact: "A conversation starts something.",
    help: "A little help along the way.",
    privacy: "Your trust matters.",
    accessibility: "A place for everyone.",
  };
  return (
    <div className="page">
      <PageHeading
        label={kind}
        title={titles[kind]}
        text="Bloomfield School is a fictional frontend demonstration. These sample policies require school review before any real use."
      />
      {kind === "contact" ? (
        <div className="split">
          <section>
            <h2>We'd love to hear your question.</h2>
            <p>Sample office hours: Monday–Friday, 9:00 AM–3:00 PM IST.</p>
            <p>
              hello@bloomfield.example · Reserved example address, not a working
              inbox.
            </p>
            <div className="info-panel">
              <MapPin />
              <div>
                <h3>Bloomfield Campus</h3>
                <p>
                  Fictional location · Real address not configured.
                  <br />
                  Sample entrance: South gate; parking beside reception.
                </p>
                <button className="button secondary" disabled>
                  Configure school location
                </button>
              </div>
            </div>
          </section>
          <section className="panel">
            <h2>Start a conversation</h2>
            <SimpleForm kind="Enquiry" />
          </section>
        </div>
      ) : (
        <div className="reading-detail">
          {(kind === "help"
            ? [
                [
                  "How do I apply?",
                  "Explore a programme, check eligibility and fees, then complete the guided sample application. You can save a fictional draft and resume it on this browser.",
                ],
                [
                  "Are bookings and payments real?",
                  "No. Every booking, application and transaction in this preview is simulated. No external messages or payments are sent.",
                ],
                [
                  "How can I reset my demo?",
                  "Use Reset demo at the top of any page to clear namespaced fictional browser data.",
                ],
                [
                  "How do I access the portal?",
                  "Open School portal and choose a sample Parent, Student, Teacher or Admin role. There is no real authentication.",
                ],
              ]
            : kind === "privacy"
              ? [
                  [
                    "What is stored?",
                    "Only the fictional values you enter in this demo may be stored in this browser under the bloomfield-demo namespace. File contents are not uploaded or persisted. Do not enter actual personal information.",
                  ],
                  [
                    "Control your data",
                    "Reset demo removes the application’s namespaced browser data. No advertising trackers, external AI requests or analytics collectors are enabled.",
                  ],
                  [
                    "Production policy",
                    "A real school must provide an approved retention policy, consent process, identity provider, access controls and support contacts before collecting personal data.",
                  ],
                ]
              : [
                  [
                    "Designed for different ways of exploring",
                    "Semantic headings, keyboard controls, visible focus, reduced-motion support and text alternatives are included. Charts have table equivalents; campus exploration has a selectable list.",
                  ],
                  [
                    "Need another format?",
                    "Use the sample contact form to preview an accessibility request. Actual support channels must be configured by the school.",
                  ],
                  [
                    "Ongoing review",
                    "Accessibility is an ongoing process. This preview does not claim formal WCAG certification.",
                  ],
                ]
          ).map(([t, d]) => (
            <details key={t} open>
              <summary>{t}</summary>
              <p>{d}</p>
            </details>
          ))}
          <ButtonLink to={kind === "help" ? "/admissions" : "/contact"}>
            {kind === "help" ? "Explore admissions" : "Contact & support"}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
function Login() {
  return (
    <div className="page">
      <PageHeading
        label="School portal"
        title="Your school day, a little simpler."
        text="Choose a fictional role to explore. This demo switcher is not authentication and grants no access to real school information."
      />
      <div className="role-grid">
        {[
          [
            "parent",
            "For families",
            "Today, attendance, fees and the little things that matter.",
          ],
          [
            "student",
            "For learners",
            "Your timetable, your work, your next discovery.",
          ],
          [
            "teacher",
            "For educators",
            "Class registers, assignments and thoughtful feedback.",
          ],
          [
            "admin",
            "For school teams",
            "Admissions, content and a clear picture of the school.",
          ],
        ].map(([role, title, text]) => (
          <Link className="role-card" to={"/portal/" + role} key={role}>
            <ShieldCheck size={28} />
            <span className="tag">{role} preview</span>
            <h2>{title}</h2>
            <p>{text}</p>
            <span className="text-link">
              Enter demo portal
              <ArrowRight size={18} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default function Public() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  const [kind, slug] = parts;
  if (
    parts.length > 2 &&
    !(kind === "school-life" && slug === "projects" && parts.length === 3)
  )
    return <NotFound />;
  if (kind === "about")
    return !slug || slug === "history" ? <About /> : <NotFound />;
  if (kind === "academics") return <Academics slug={slug} />;
  if (kind === "campus") return <Campus slug={slug} />;
  if (
    (kind === "stories" && parts.length === 2) ||
    (kind === "school-life" && slug === "projects" && parts.length === 3)
  )
    return <Catalogue kind="community" slug={parts.at(-1)} />;
  if (catalogue[kind])
    return <Catalogue key={kind + "/" + slug} kind={kind} slug={slug} />;
  if (kind === "gallery" && !slug) return <Gallery />;
  if (kind === "downloads" && !slug) return <Downloads />;
  if (kind === "search" && !slug) return <SearchPage />;
  if (kind === "transport" && !slug) return <Transport />;
  if (["contact", "help", "privacy", "accessibility"].includes(kind) && !slug)
    return <Support kind={kind} />;
  if (kind === "login" || pathname === "/auth/callback") return <Login />;
  if (kind === "verify")
    return (
      <div className="page">
        <PageHeading
          label="Verification"
          title={
            slug === "demo-certificate"
              ? "Sample certificate preview."
              : "This verification link is unavailable."
          }
          text={
            slug === "demo-certificate"
              ? "Demo token · Sample participation certificate · Issued 22 September 2026. No personal information is displayed. This is not a signed or valid certificate."
              : "The token is unknown, expired or revoked. Ask the issuer for a current link. No private record is disclosed."
          }
        />
        <ButtonLink to="/help">Get help</ButtonLink>
      </div>
    );
  return <NotFound />;
}
