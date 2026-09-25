import { lazy, Suspense } from "react";
const ChartVisual = lazy(() => import("./ChartVisual"));
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  BarChart3,
  Download,
  Plus,
  Sparkles,
} from "lucide-react";
import { Empty, Success, DemoHint, ButtonLink, TextLink } from "./shared";
import { useStored } from "./demo";
import { money, download, dateLabel } from "./data";
import { validateFile } from "./rules";
import { type Child } from "./portal-data";
const subjects = [
  "Mathematics",
  "English",
  "Science",
  "Hindi",
  "Social Science",
];
export function Chart({
  title,
  labels,
  values,
  unit = "%",
  description,
}: {
  title: string;
  labels: string[];
  values: (number | null)[];
  unit?: string;
  description: string;
}) {
  const maximum = Math.max(...values.map((v) => v || 0), 1);
  return (
    <section className="panel chart">
      <div className="section-heading">
        <h2>{title}</h2>
        <BarChart3 size={20} />
      </div>
      <p className="hint">
        {description} · Sample source · Updated 22 Sep 2026
      </p>
      <Suspense fallback={<p role="status">Preparing chart?</p>}>
        <ChartVisual labels={labels} values={values} unit={unit} />
      </Suspense>
      <details>
        <summary>View accessible data table</summary>
        <div className="table-wrap">
          <table>
            <caption>
              {title} · {description}
            </caption>
            <thead>
              <tr>
                <th>Measure</th>
                <th>Value ({unit || "count"})</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((l, i) => (
                <tr key={l}>
                  <td>{l}</td>
                  <td>{values[i] === null ? "Not recorded" : values[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="text-link"
          onClick={() =>
            download(
              title + ".csv",
              "Measure,Value\n" +
                labels
                  .map((l, i) => `${l},${values[i] ?? "Not recorded"}`)
                  .join("\n"),
              "text/csv",
            )
          }
        >
          Export current sample
          <Download size={16} />
        </button>
      </details>
    </section>
  );
}
export function Summary({ role, child }: { role: string; child: Child }) {
  return (
    <>
      <div className="portal-welcome">
        <div>
          <span className="eyebrow">TUESDAY, 22 SEPTEMBER 2026</span>
          <h1>
            {role === "parent"
              ? "Good morning, Mehta family."
              : role === "student"
                ? `Your next discovery awaits, ${child.name.split(" ")[0]}.`
                : role === "teacher"
                  ? "A new day to make a difference."
                  : "A thoughtful view of your school."}
          </h1>
          <p>
            {role === "parent"
              ? `A little closer to ${child.name.split(" ")[0]}'s school day.`
              : "Small steps today. A world of possibility tomorrow."}
          </p>
        </div>
        <span className="portal-date">
          <CalendarDays size={22} />
          Term I · 2026–27
        </span>
      </div>
      <div className="summary-grid">
        {(role === "admin"
          ? [
              ["42", "Sample enquiries", "/portal/admin/admissions"],
              ["18", "Applications", "/portal/admin/admissions"],
              ["8", "Reserved places", "/portal/admin/reports"],
              ["3", "Content drafts", "/portal/admin/content"],
            ]
          : role === "teacher"
            ? [
                ["2", "Assigned classes", "/portal/attendance"],
                ["2", "Assignments", "/portal/assignments"],
                ["3", "Assessments to review", "/portal/progress"],
                ["1", "Unread conversation", "/portal/messages"],
              ]
            : [
                [
                  child.id === "aarav" ? "95%" : "90%",
                  "Attendance this month",
                  "/portal/attendance",
                ],
                ["2", "Learning tasks", "/portal/assignments"],
                [
                  money(child.id === "aarav" ? 24000 : 18000),
                  "Term fees pending",
                  "/portal/fees",
                ],
                ["10 Oct", "Next community event", "/events/open-house"],
              ]
        ).map(([v, l, to]) => (
          <Link to={to} key={l}>
            <span>{l}</span>
            <strong>{v}</strong>
            <ArrowRight size={17} />
          </Link>
        ))}
      </div>
    </>
  );
}
export function Today({ child }: { child: Child }) {
  return (
    <div className="portal-grid">
      <section className="panel">
        <div className="section-heading">
          <h2>Today at a glance</h2>
          <Link to="/portal/timetable">
            Full timetable
            <ArrowRight size={15} />
          </Link>
        </div>
        {[
          ["08:30", "Morning circle", "Classroom " + child.class],
          ["09:00", "Mathematics", "Fractions & everyday patterns"],
          ["10:00", "English", "Reading between the lines"],
          ["11:15", "Science", "Exploring ecosystems"],
        ].map(([time, title, desc]) => (
          <div className="schedule-row" key={time}>
            <time>{time}</time>
            <span />
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
        <p className="hint">All sample timings are IST.</p>
      </section>
      <section className="panel diary">
        <div className="section-heading">
          <h2>School diary</h2>
          <BookOpen size={20} />
        </div>
        <span className="tag">A NOTE FROM THE CLASSROOM</span>
        <h3>Bring a little curiosity.</h3>
        <p>
          Reading Week is coming. Help your learner choose a favourite book to
          share on 5 October.
        </p>
        <TextLink to="/notices/reading-week">Read the circular</TextLink>
        <hr />
        <h3>Your next steps</h3>
        <Link className="task-row" to="/portal/assignments">
          <ClipboardCheck />
          <span>
            Complete the science journal
            <small>Due 2 October · Sample task</small>
          </span>
          <ArrowRight size={18} />
        </Link>
        <Link className="task-row" to="/portal/ptm">
          <CalendarDays />
          <span>
            Make time for a conversation
            <small>Book a parent–teacher meeting</small>
          </span>
          <ArrowRight size={18} />
        </Link>
      </section>
      <Chart
        title="A steady learning journey"
        labels={["April", "May", "July", "Aug", "Sep"]}
        values={
          child.id === "aarav" ? [68, 72, 76, 80, 84] : [72, 74, 78, 81, 86]
        }
        description="Term I · Mathematics /100 · Comparable chapter checks"
      />
      <section className="panel">
        <span className="tag">BEYOND THE CLASSROOM</span>
        <img
          className="portal-feature-image"
          src="/images/young-makers.webp"
          alt="Illustrative student science project"
        />
        <h2>Where a question becomes an idea.</h2>
        <p>Discover the Robotics & Makers club, and find new ways to create.</p>
        <TextLink to="/clubs">Explore clubs</TextLink>
      </section>
    </div>
  );
}
export function Attendance({ role, child }: { role: string; child: Child }) {
  const [month, setMonth] = useState("September 2026");
  const [day, setDay] = useState<number | null>(null);
  const [register, setRegister] = useStored<Record<string, string>>(
    "register",
    {},
  );
  const [className, setClass] = useState("VI A");
  const [date, setDate] = useState("2026-09-22");
  const [saved, setSaved] = useState(false);
  const [reason, setReason] = useState("");
  const names = ["Aarav Mehta", "Dev Sample", "Tara Sample", "Zoya Sample"];
  const marks = Array.from({ length: 20 }, (_, i) =>
    i === (child.id === "aarav" ? 8 : 5) || (child.id === "isha" && i === 12)
      ? "Absent"
      : "Present",
  );
  const present = marks.filter((x) => x === "Present").length;
  const registerKey = className + ":" + date;
  const [keys, setKeys] = useState<Record<string, string>>({});
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>
            {role === "teacher"
              ? "Your class register"
              : "Every day is part of the story."}
          </h2>
          <p>Marked sessions only · Holidays excluded from the rate.</p>
        </div>
        <label>
          Month
          <select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
              setDay(null);
            }}
          >
            <option>September 2026</option>
            <option>August 2026 — no sample data</option>
          </select>
        </label>
      </div>
      {role === "teacher" && (
        <form
          className="panel form"
          onSubmit={(e) => {
            e.preventDefault();
            setRegister({
              ...register,
              ...Object.fromEntries(
                names.map((n) => [
                  registerKey + ":" + n,
                  keys[n] ?? register[registerKey + ":" + n] ?? "Unmarked",
                ]),
              ),
              [registerKey + ":reason"]: reason,
            });
            setSaved(true);
          }}
        >
          <div className="filter-bar">
            <label>
              Assigned class
              <select
                value={className}
                onChange={(e) => {
                  setClass(e.target.value);
                  setKeys({});
                  setSaved(false);
                }}
              >
                <option>VI A</option>
                <option>VIII B</option>
              </select>
            </label>
            <label>
              Register date
              <input
                required
                type="date"
                max="2026-09-22"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setKeys({});
                  setSaved(false);
                }}
              />
            </label>
          </div>
          {names.map((n) => (
            <label className="register-row" key={n}>
              <span>
                {n}
                <small>Fictional student</small>
              </span>
              <select
                aria-label={"Attendance for " + n}
                value={keys[n] ?? register[registerKey + ":" + n] ?? "Unmarked"}
                onChange={(e) => {
                  setKeys({ ...keys, [n]: e.target.value });
                  setSaved(false);
                }}
              >
                {["Unmarked", "Present", "Absent", "Late"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
          ))}
          <label>
            Save / correction reason
            <input
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Morning register reviewed"
            />
          </label>
          <button className="button">
            Save sample register
            <Check size={16} />
          </button>
          {saved && (
            <Success>
              Sample register saved for {className} on {date}. Reason: {reason}.
              No real attendance was changed.
            </Success>
          )}
        </form>
      )}
      {month.startsWith("August") ? (
        <Empty
          title="No attendance recorded for this period."
          text="Missing sessions are not counted as zero or absent. Choose September to explore the fixture."
        />
      ) : (
        <section className="panel">
          <div className="section-heading">
            <h2>September attendance</h2>
            <span className="status">
              {present}/20 present · {(present / 20) * 100}%
            </span>
          </div>
          <div className="attendance-grid">
            {marks.map((m, i) => (
              <button
                key={i}
                className={m.toLowerCase()}
                onClick={() => setDay(i)}
                aria-label={`Session ${i + 1}: ${m}`}
              >
                <span>{i + 1}</span>
                {m === "Present" ? <Check size={16} /> : <span>A</span>}
              </button>
            ))}
          </div>
          <p className="hint">
            20 sample teaching sessions · ✓ Present · A / patterned: Absent · No
            holidays counted
          </p>
          {day !== null && (
            <p className="info-panel" role="status">
              Session {day + 1}: {marks[day]} · Source: fictional class
              register.
            </p>
          )}
          {register["VI A:2026-09-22:" + child.name] && (
            <Success>
              Latest saved register · 22 Sep:{" "}
              {register["VI A:2026-09-22:" + child.name]} ·{" "}
              {register["VI A:2026-09-22:reason"]}. Separate from the 20-session
              summary fixture.
            </Success>
          )}
          <details>
            <summary>Attendance data table</summary>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Session</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((m, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </section>
      )}
    </>
  );
}
export function Progress({ role, child }: { role: string; child: Child }) {
  const [subject, setSubject] = useState("Mathematics");
  const [term, setTerm] = useState("Term I");
  const [topic, setTopic] = useState("");
  const [marks, setMarks] = useStored<Record<string, string>>("marks", {});
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");
  const offset = subjects.indexOf(subject) * 2 + (child.id === "isha" ? 3 : 0);
  return (
    <>
      <div className="section-heading">
        <h2>Understanding the learning journey.</h2>
        <div className="filter-bar">
          <label>
            Subject
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Term
            <select value={term} onChange={(e) => setTerm(e.target.value)}>
              <option>Term I</option>
              <option>Term II</option>
            </select>
          </label>
        </div>
      </div>
      {role === "teacher" && (
        <form
          className="panel form"
          onSubmit={(e) => {
            e.preventDefault();
            setMarks({ ...marks, [child.id + ":" + subject]: score });
            setMessage(
              "Draft score saved. Publish to make the sample mark visible.",
            );
          }}
        >
          <h3>Record assessment · {child.name}</h3>
          <label>
            Score out of 100
            <input
              required
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </label>
          <div className="actions">
            <button className="button">Save draft</button>
            <button
              type="button"
              className="button secondary"
              disabled={marks[child.id + ":" + subject] === undefined}
              onClick={() => {
                setMarks({
                  ...marks,
                  ["published:" + child.id + ":" + subject]:
                    marks[child.id + ":" + subject],
                });
                setMessage("Sample assessment published.");
              }}
            >
              Publish reviewed mark
            </button>
          </div>
          {message && <Success>{message}</Success>}
        </form>
      )}
      {term === "Term II" ? (
        <Empty
          title="This chapter is still ahead."
          text="No published Term II scores. Unrecorded marks are not treated as zero."
        />
      ) : (
        <>
          <Chart
            title={subject + " progress"}
            labels={["Check 1", "Check 2", "Check 3", "Check 4"]}
            values={[66 + offset, 72 + offset, 77 + offset, 84 + offset]}
            description={`${child.name} · ${term} 2026–27 · Comparable chapter checks, each /100`}
          />
          {marks["published:" + child.id + ":" + subject] !== undefined && (
            <Success>
              Latest published sample assessment:{" "}
              {marks["published:" + child.id + ":" + subject]} / 100.
            </Success>
          )}
          <section className="panel">
            <h2>Where to explore next</h2>
            <p>
              Topic evidence from 10 scored questions per topic. Small sample;
              use with teacher feedback.
            </p>
            {[
              ["Foundations", 85],
              ["Application", 70],
              ["Reasoning", 60],
            ].map(([label, value]) => (
              <button
                className="mastery-row"
                key={label}
                onClick={() => setTopic(String(label))}
              >
                <span>{label}</span>
                <span>
                  <i style={{ width: value + "%" }} />
                </span>
                <strong>{value}%</strong>
                <ArrowRight size={15} />
              </button>
            ))}
            {topic && (
              <div className="info-panel">
                <div>
                  <h3>{topic}: a thoughtful next step</h3>
                  <p>
                    Try two worked examples, explain each step aloud, then solve
                    one similar problem independently. Rationale: 10 sample
                    scored questions suggest more practice here.
                  </p>
                  <TextLink to="/portal/assignments">
                    Open sample learning resources
                  </TextLink>
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
export function Timetable() {
  const [day, setDay] = useState("Monday");
  return (
    <section className="panel">
      <h2>A rhythm for the week.</h2>
      <div className="chips">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
          <button
            className={day === d ? "active" : ""}
            onClick={() => setDay(d)}
            key={d}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          <caption>{day} · Sample timetable · All times IST</caption>
          <thead>
            <tr>
              <th>Time</th>
              <th>Session</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Morning circle",
              ...(day === "Wednesday"
                ? ["Science", "English", "Mathematics"]
                : ["Mathematics", "English", "Science"]),
              "Lunch",
              "Art & movement",
              "Reflection",
            ].map((s, i) => (
              <tr key={s}>
                <td>
                  {
                    [
                      "08:30",
                      "09:00",
                      "10:00",
                      "11:15",
                      "12:30",
                      "13:15",
                      "14:30",
                    ][i]
                  }
                </td>
                <td>{s}</td>
                <td>
                  {s === "Science"
                    ? "Science Wing"
                    : "Classroom / activity space"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
const baseAssignments = [
  {
    id: "science-journal",
    title: "Observe a small ecosystem",
    subject: "Science",
    due: "2026-10-02",
    status: "Published",
    text: "Observe a garden or plant for three days. Record changes, sketch what you notice and write two questions. Submit a PDF or clear photograph. Late sample submissions are accepted with a label.",
  },
  {
    id: "reading-reflection",
    title: "A story worth sharing",
    subject: "English",
    due: "2026-10-05",
    status: "Published",
    text: "Write 200 words about a character whose choices surprised you. Include one quotation and your own reflection.",
  },
];
type Submission = {
  file: string;
  version: number;
  feedback: string;
  mark: string;
  released: boolean;
  status: string;
};
export function Assignments({
  role,
  child,
  id,
}: {
  role: string;
  child: Child;
  id?: string;
}) {
  const [assignments, setAssignments] = useStored(
    "assignments",
    baseAssignments,
  );
  const [submissions, setSubmissions] = useStored<Record<string, Submission>>(
    "submissions",
    {},
  );
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Science");
  const [due, setDue] = useState("2026-10-10");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [hint, setHint] = useState(false);
  const active = assignments.find((a) => a.id === id);
  const key = child.id + ":" + id;
  const s = submissions[key];
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState(s?.feedback || "");
  const [mark, setMark] = useState(s?.mark || "");
  const visible = assignments.filter(
    (a) => role === "teacher" || a.status === "Published",
  );
  if (id && (!active || (active.status !== "Published" && role !== "teacher")))
    return (
      <Empty
        title="Assignment unavailable."
        text="This sample assignment does not exist or has not been published."
      />
    );
  return (
    <>
      <div className="section-heading">
        <h2>{active ? active.title : "Small steps. Meaningful learning."}</h2>
        {role === "teacher" && !active && (
          <button className="button" onClick={() => setCreating(!creating)}>
            <Plus size={16} />
            New assignment
          </button>
        )}
      </div>
      {creating && (
        <form
          className="panel form"
          onSubmit={(e) => {
            e.preventDefault();
            setAssignments([
              ...assignments,
              {
                id: "task-" + Date.now(),
                title,
                subject,
                due,
                text,
                status: "Draft",
              },
            ]);
            setCreating(false);
            setTitle("");
          }}
        >
          <h3>Prepare a sample assignment</h3>
          <label>
            Title
            <input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Subject
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Due date
            <input
              type="date"
              required
              min="2026-09-22"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </label>
          <label>
            Instructions
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <button className="button">Save draft</button>
        </form>
      )}
      {!active ? (
        visible.map((a) => (
          <div className="assignment-row panel" key={a.id}>
            <div>
              <span className="tag">
                {a.subject} · {a.status}
              </span>
              <h3>
                <Link to={"/portal/assignments/" + a.id}>{a.title}</Link>
              </h3>
              <p>Due {dateLabel(a.due)} · 11:59 PM IST</p>
            </div>
            <div className="actions">
              {role === "teacher" && a.status === "Draft" && (
                <button
                  className="button secondary"
                  onClick={() =>
                    setAssignments(
                      assignments.map((x) =>
                        x.id === a.id ? { ...x, status: "Published" } : x,
                      ),
                    )
                  }
                >
                  Publish sample
                </button>
              )}
              <ButtonLink to={"/portal/assignments/" + a.id} secondary>
                Open task
              </ButtonLink>
            </div>
          </div>
        ))
      ) : (
        <section className="panel">
          <span className="tag">
            {active.subject} · Due {dateLabel(active.due)} · 11:59 PM IST
          </span>
          <p className="lead">{active.text}</p>
          <button
            className="text-link"
            onClick={() =>
              download(
                active.id + "-instructions.txt",
                active.title + "\n" + active.text,
              )
            }
          >
            Download instructions
            <Download size={16} />
          </button>
          {role === "student" && (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!navigator.onLine) {
                  setError("Reconnect before submitting the sample.");
                  return;
                }
                setSubmissions({
                  ...submissions,
                  [key]: {
                    file: selected,
                    version: (s?.version || 0) + 1,
                    feedback: "",
                    mark: "",
                    released: false,
                    status:
                      new Date() > new Date(active.due + "T23:59:00+05:30")
                        ? "Submitted late · Demo"
                        : "Submitted · Demo",
                  },
                });
                setSelected("");
              }}
            >
              <h3>Your work</h3>
              <DemoHint />
              <label>
                Attachment · PDF, JPG, PNG or DOCX · Max 20 MB
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png,.docx"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && !validateFile(f, true)) {
                      e.target.value = "";
                      setError("Choose an allowed file under 20 MB.");
                      setSelected("");
                      return;
                    }
                    setSelected(f?.name || "");
                    setError("");
                  }}
                />
              </label>
              <button className="button" disabled={!selected}>
                Submit sample version
              </button>
            </form>
          )}
          {s && (
            <Success>
              {s.status} · {s.file} · Version {s.version}. File metadata only;
              nothing uploaded.
            </Success>
          )}
          {role === "teacher" && s && (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmissions({
                  ...submissions,
                  [key]: { ...s, feedback, mark, released: false },
                });
              }}
            >
              <h3>Review {child.name}'s work</h3>
              <label>
                Feedback
                <textarea
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </label>
              <label>
                Score out of 100
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                />
              </label>
              <div className="actions">
                <button className="button">Save feedback draft</button>
                <button
                  type="button"
                  className="button secondary"
                  disabled={!s.feedback}
                  onClick={() =>
                    setSubmissions({
                      ...submissions,
                      [key]: { ...s, released: true },
                    })
                  }
                >
                  Release saved feedback
                </button>
              </div>
              <p>
                {s.released
                  ? "Published feedback"
                  : "Feedback draft is private in this role preview."}
              </p>
            </form>
          )}
          {role !== "teacher" && s?.released && (
            <div className="info-panel">
              <div>
                <h3>Teacher feedback · {s.mark}/100</h3>
                <p>{s.feedback}</p>
              </div>
            </div>
          )}
          <button className="button secondary" onClick={() => setHint(!hint)}>
            <Sparkles size={16} />
            Study assistant preview
          </button>
          {hint && (
            <div className="answer">
              <h3>A nudge, not the answer.</h3>
              <p>
                Start by listing what you observe. Separate an observation (what
                you can see) from an inference (what you think it means). What
                evidence would help you test your idea?
              </p>
              <p className="hint">
                Curated demo hint · Source: assignment instructions above, v1.
                No external AI or answer keys.
              </p>
            </div>
          )}
          {error && <p role="alert">{error}</p>}
        </section>
      )}
    </>
  );
}
