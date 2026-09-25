import { useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Download,
  FileText,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { PageHeading, ButtonLink, TextLink, DemoHint, Success } from "./shared";
import { useStored } from "./demo";
import { programmes, money, download, dateLabel } from "./data";
import { eligibility, feeEstimate, validateFile } from "./rules";
import { NotFound } from "./Public";
function AdmissionGuide() {
  return (
    <div className="page">
      <PageHeading
        label="Admissions 2027–28"
        title="Their next chapter starts here."
        text="Choosing a school is choosing a community. We'll help you discover whether Bloomfield feels like home."
      />
      <div className="admission-intro">
        <img
          src="/images/student-voices.webp"
          alt="Illustrative students celebrating a school activity"
        />
        <div>
          <span className="tag">A WARM WELCOME</span>
          <h2>
            Big possibilities.
            <br />
            <em>A personal beginning.</em>
          </h2>
          <p>
            From the first question to the first day, take your time to explore.
            Every step of this sample journey is designed to help you make an
            informed decision.
          </p>
          <div className="actions">
            <ButtonLink to="/admissions/apply">Start an application</ButtonLink>
            <TextLink to="/admissions/track">Resume or track</TextLink>
          </div>
        </div>
      </div>
      <div className="admission-steps">
        {[
          [
            "01",
            "Get to know us",
            "Explore our programmes and find the right stage.",
            "/academics",
          ],
          [
            "02",
            "Explore the details",
            "Check indicative eligibility and build a fee estimate.",
            "/admissions/eligibility",
          ],
          [
            "03",
            "Come for a visit",
            "See the spaces and meet our community.",
            "/visit",
          ],
          [
            "04",
            "Begin your application",
            "Complete the guided demo at your own pace.",
            "/admissions/apply",
          ],
        ].map(([n, t, d, url]) => (
          <Link key={n} to={url}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
            <ArrowUpRightIcon />
          </Link>
        ))}
      </div>
      <div className="split">
        <section>
          <h2>A few useful dates.</h2>
          <div className="resource-row">
            <CalendarDays />
            <div>
              <h3>Explore the 2027–28 intake</h3>
              <p>Sample applications: 22 September–30 November 2026</p>
            </div>
          </div>
          <div className="resource-row">
            <Clock />
            <div>
              <h3>Age cutoff</h3>
              <p>31 March 2027 · Exact date-based calculation</p>
            </div>
          </div>
          <p className="hint">
            Fictional dates and availability, not an actual admission offer.
          </p>
        </section>
        <section>
          <h2>Your questions, answered.</h2>
          {[
            [
              "Which documents do I need?",
              "Preview a birth certificate and latest report, if applicable. In this demo, only file names and sizes are shown; nothing is uploaded.",
            ],
            [
              "What will it cost?",
              "The itemized estimator separates annual tuition, optional services and one-time admission charges. Books and uniforms need office confirmation.",
            ],
            [
              "Can I save my progress?",
              "Yes. Save a fictional application draft on this browser and return through Resume or track. Do not enter personal information.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
          <TextLink to="/admissions/fees">Build your fee estimate</TextLink>
        </section>
      </div>
    </div>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={19} />;
}
function Eligibility() {
  const [dob, setDob] = useState("");
  const [grade, setGrade] = useState("1");
  const [result, setResult] = useState<ReturnType<typeof eligibility> | null>(
    null,
  );
  return (
    <div className="page">
      <PageHeading
        label="Eligibility"
        title="Find the right beginning."
        text="An indicative check against fictional age rules for 2027–28. Every child's situation deserves a thoughtful review."
      />
      <div className="split">
        <form
          className="panel form"
          onSubmit={(e) => {
            e.preventDefault();
            setResult(eligibility(dob, grade));
          }}
        >
          <DemoHint />
          <label>
            Academic year
            <select>
              <option>2027–28 · Cutoff 31 March 2027</option>
            </select>
          </label>
          <label>
            Target class
            <select
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
                setResult(null);
              }}
            >
              {[
                "LKG",
                "UKG",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
              ].map((g) => (
                <option value={g} key={g}>
                  {Number(g) ? "Grade " + g : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date of birth
            <input
              type="date"
              required
              max="2027-03-31"
              min="2000-01-01"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setResult(null);
              }}
            />
          </label>
          <button className="button">
            Check indicative eligibility
            <ArrowRight size={16} />
          </button>
        </form>
        <section>
          <h2>A guide, not a decision.</h2>
          <p>
            The sample rule uses completed calendar years on 31 March 2027. LKG:
            4–5 years; UKG: 5–6 years; Grade I: 6–7 years. Each following grade
            adds one year.
          </p>
          {result && (
            <div className="result-card" role="status">
              <Check />
              <h3>{result.status}</h3>
              {result.age !== null && (
                <p>Age at cutoff: {result.age} completed years.</p>
              )}
              <p>
                Final placement, prior schooling and individual circumstances
                need school review.
              </p>
              <ButtonLink to="/admissions/fees">
                Explore your estimate
              </ButtonLink>
            </div>
          )}
          <TextLink to="/downloads">
            Source: sample admission policy v1
          </TextLink>
        </section>
      </div>
    </div>
  );
}
function Fees() {
  const [stage, setStage] = useState("primary");
  const [transport, setTransport] = useState(false);
  const [meals, setMeals] = useState(false);
  const [saved, setSaved] = useStored<{
    stage: string;
    transport: boolean;
    meals: boolean;
    total: number;
  } | null>("estimate", null);
  const [success, setSuccess] = useState(false);
  const estimate = feeEstimate(stage, transport, meals);
  return (
    <div className="page">
      <PageHeading
        label="Fee estimator"
        title="A clearer picture of the journey."
        text="Build an indicative estimate for your family. Transparent line items, with space for the choices that suit you."
      />
      <div className="fee-layout">
        <div className="panel form">
          <span className="tag">MAKE IT YOURS</span>
          <label>
            Programme
            <select
              value={stage}
              onChange={(e) => {
                setStage(e.target.value);
                setSuccess(false);
              }}
            >
              {programmes.map((p) => (
                <option value={p.slug} key={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Campus
            <select>
              <option>Bloomfield Campus · 2027–28</option>
            </select>
          </label>
          <h3>A little extra support</h3>
          <label className="service-option">
            <span>
              <strong>School transport</strong>
              <small>Sample route · annual</small>
            </span>
            <input
              type="checkbox"
              checked={transport}
              onChange={(e) => {
                setTransport(e.target.checked);
                setSuccess(false);
              }}
            />
          </label>
          <label className="service-option">
            <span>
              <strong>Meal plan</strong>
              <small>School lunches · annual</small>
            </span>
            <input
              type="checkbox"
              checked={meals}
              onChange={(e) => {
                setMeals(e.target.checked);
                setSuccess(false);
              }}
            />
          </label>
          {saved && (
            <button
              className="text-link"
              onClick={() => {
                setStage(saved.stage);
                setTransport(saved.transport);
                setMeals(saved.meals);
                setSuccess(false);
              }}
            >
              Restore saved estimate
              <ArrowRight size={16} />
            </button>
          )}
        </div>
        <section className="fee-summary">
          <EyebrowLocal>Your indicative estimate</EyebrowLocal>
          <h2>{programmes.find((p) => p.slug === stage)?.name}</h2>
          <p>Academic year 2027–28 · INR</p>
          <div className="table-wrap">
            <table>
              <caption className="sr-only">Itemized sample fees</caption>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Frequency</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {estimate.lines.map((l) => (
                  <tr key={l.label}>
                    <td>{l.label}</td>
                    <td>{l.frequency}</td>
                    <td>
                      {l.amount === null
                        ? "Office confirmation required"
                        : money(l.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fee-total">
            <span>Estimated first year</span>
            <strong>{money(estimate.total)}</strong>
          </div>
          <p>
            Recurring annual charges: {money(estimate.recurring)}
            <br />
            Books, uniform and optional trips: office confirmation required.
          </p>
          <button
            className="button"
            onClick={() => {
              setSaved({ stage, transport, meals, total: estimate.total });
              setSuccess(true);
            }}
          >
            Save demo estimate
            <Check size={17} />
          </button>
          {success && (
            <Success>
              Estimate saved on this browser. This is not a payable invoice.
            </Success>
          )}
          <button
            className="text-link"
            onClick={() =>
              download(
                "bloomfield-fee-estimate.txt",
                `BLOOMFIELD SCHOOL — FICTIONAL ESTIMATE\n2027–28 / ${stage}\n${estimate.lines.map((l) => `${l.label}: INR ${l.amount} (${l.frequency})`).join("\n")}\nFirst year: INR ${estimate.total}\nBooks, uniform and trips: office confirmation required.\nIndicative only. Source: sample fee policy v1, 22 Sep 2026.`,
              )
            }
          >
            Download estimate
            <Download size={16} />
          </button>
        </section>
      </div>
      <p className="hint">
        Source: sample fee policy v1 · 22 September 2026. No fee waiver,
        admission offer or payment is implied.
      </p>
      <ButtonLink to="/visit" secondary>
        Plan a campus visit
      </ButtonLink>
    </div>
  );
}
function EyebrowLocal({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
type Draft = {
  guardian: string;
  email: string;
  child: string;
  dob: string;
  stage: string;
  campus: string;
  birth: string;
  report: string;
};
const blank: Draft = {
  guardian: "",
  email: "",
  child: "",
  dob: "",
  stage: "primary",
  campus: "Bloomfield Campus",
  birth: "",
  report: "",
};
type Application = { ref: string; stage: string; date: string; status: string };
function Apply() {
  const [draft, setDraft, storageError] = useStored<Draft>(
    "application-draft",
    blank,
  );
  const [apps, setApps] = useStored<Application[]>("applications", []);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const [saved, setSaved] = useState(false);
  const [ocr, setOcr] = useState(false);
  const labels = ["Guardian", "Learner", "Choices", "Documents", "Review"];
  const update = (k: keyof Draft, v: string) => {
    setDraft({ ...draft, [k]: v });
    setSaved(false);
    setError("");
  };
  function next(e: FormEvent) {
    e.preventDefault();
    if (
      step === 1 &&
      !eligibility(draft.dob, "1").age &&
      eligibility(draft.dob, "1").age !== 0
    )
      return setError("Enter a valid birth date.");
    if (step === 3 && !draft.birth)
      return setError(
        "Choose a sample birth certificate file before continuing.",
      );
    if (step < 4) setStep(step + 1);
    else {
      if (!navigator.onLine)
        return setError("You are offline. Reconnect to complete the demo.");
      if (receipt) return;
      const ref = "BF-27-" + Date.now().toString().slice(-6);
      setApps([
        ...apps,
        {
          ref,
          stage: draft.stage,
          date: new Date().toISOString(),
          status: "Submitted",
        },
      ]);
      setReceipt(ref);
    }
  }
  if (receipt)
    return (
      <div className="page">
        <PageHeading
          label="Application preview"
          title="A new chapter, begun."
        />
        <div className="panel confirmation">
          <Check size={40} />
          <h2>Demo application recorded.</h2>
          <p>Your fictional reference</p>
          <strong className="reference">{receipt}</strong>
          <p>No application or document has been sent to a school.</p>
          <ButtonLink to="/admissions/track">
            Track this demo application
          </ButtonLink>
        </div>
      </div>
    );
  return (
    <div className="page">
      <PageHeading
        label="Apply to Bloomfield"
        title="Let's get to know your family."
        text="A guided sample application, at your pace. Your fictional draft is saved in this browser."
      />
      <ol className="stepper">
        {labels.map((s, i) => (
          <li
            className={i === step ? "current" : i < step ? "complete" : ""}
            key={s}
          >
            <span>{i < step ? <Check size={15} /> : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <div className="application-layout">
        <form className="panel form" onSubmit={next}>
          <h2>
            {labels[step]}{" "}
            {step === 0
              ? "details"
              : step === 1
                ? "details"
                : step === 2
                  ? "& preferences"
                  : step === 3
                    ? "checklist"
                    : "your application"}
          </h2>
          <DemoHint />
          {step === 0 && (
            <>
              <label>
                Guardian's sample name
                <input
                  required
                  minLength={2}
                  value={draft.guardian}
                  onChange={(e) => update("guardian", e.target.value)}
                  placeholder="e.g. Alex Sample"
                />
              </label>
              <label>
                Email address
                <input
                  required
                  type="email"
                  value={draft.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="alex@example.com"
                />
              </label>
            </>
          )}
          {step === 1 && (
            <>
              <label>
                Learner's sample name
                <input
                  required
                  minLength={2}
                  value={draft.child}
                  onChange={(e) => update("child", e.target.value)}
                  placeholder="e.g. Sam Sample"
                />
              </label>
              <label>
                Date of birth
                <input
                  type="date"
                  min="2000-01-01"
                  max="2027-03-31"
                  required
                  value={draft.dob}
                  onChange={(e) => update("dob", e.target.value)}
                />
              </label>
              <button
                type="button"
                className="text-link"
                onClick={() => setOcr(!ocr)}
              >
                <Sparkles size={16} />
                Preview document prefill
              </button>
              {ocr && (
                <div className="info-panel">
                  <div>
                    <h3>OCR integration preview</h3>
                    <p>
                      Sample suggested fields: Sam Sample · 15 June 2020. No
                      document was read. Review before applying these fictional
                      suggestions.
                    </p>
                    <button
                      type="button"
                      className="button secondary"
                      onClick={() => {
                        setDraft({
                          ...draft,
                          child: "Sam Sample",
                          dob: "2020-06-15",
                        });
                        setOcr(false);
                      }}
                    >
                      Use reviewed sample fields
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <label>
                Programme
                <select
                  value={draft.stage}
                  onChange={(e) => update("stage", e.target.value)}
                >
                  {programmes.map((p) => (
                    <option value={p.slug} key={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Campus
                <select
                  value={draft.campus}
                  onChange={(e) => update("campus", e.target.value)}
                >
                  <option>Bloomfield Campus</option>
                </select>
              </label>
              <p>
                Academic year: 2027–28. Fee estimates must be checked for your
                selected programme.
              </p>
              <TextLink to="/admissions/fees">Review programme fees</TextLink>
            </>
          )}
          {step === 3 && (
            <>
              {(["birth", "report"] as const).map((k, i) => (
                <label className="upload-field" key={k}>
                  <FileText size={25} />
                  <strong>
                    {i === 0
                      ? "Birth certificate (required)"
                      : "Latest school report (optional)"}
                  </strong>
                  <span>PDF, JPG, PNG · Maximum 10 MB</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f && !validateFile(f)) {
                        e.target.value = "";
                        setError("Use a PDF, JPG or PNG under 10 MB.");
                        return;
                      }
                      update(
                        k,
                        f ? `${f.name} (${Math.ceil(f.size / 1024)} KB)` : "",
                      );
                    }}
                  />
                  <small>
                    {draft[k]
                      ? "Local preview: " + draft[k]
                      : "No file selected"}
                  </small>
                </label>
              ))}
              <p className="hint">
                Only filename and size are retained. No file content is
                uploaded, scanned or stored.
              </p>
            </>
          )}
          {step === 4 && (
            <>
              <dl className="review-list">
                {[
                  ["Guardian", draft.guardian],
                  ["Email", draft.email],
                  ["Learner", draft.child],
                  ["Date of birth", draft.dob],
                  ["Programme", draft.stage],
                  ["Campus", draft.campus],
                  ["Birth certificate", draft.birth],
                  ["School report", draft.report || "Not applicable"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <label className="check">
                <input type="checkbox" required />I reviewed these fictional
                details and understand no real application will be sent.
              </label>
            </>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {storageError && (
            <p className="error">
              Browser storage is unavailable. Keep this page open; your draft
              cannot persist after reload.
            </p>
          )}
          <div className="actions">
            {step > 0 && (
              <button
                type="button"
                className="button secondary"
                onClick={() => {
                  setStep(step - 1);
                  setError("");
                }}
              >
                <ChevronLeft size={16} />
                Back
              </button>
            )}
            <button className="button">
              {step === 4 ? "Submit demo application" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
          <button
            type="button"
            className="text-link"
            onClick={() => setSaved(true)}
          >
            Save draft for later
            <Check size={16} />
          </button>
          {saved && !storageError && (
            <Success>
              Draft saved on this browser. Return via Apply or Resume to
              continue.
            </Success>
          )}
        </form>
        <aside className="application-help">
          <EyebrowLocal>Every step, together</EyebrowLocal>
          <h3>A thoughtful beginning takes a little time.</h3>
          <p>
            You can go back to edit any step. No real information or documents
            are needed to explore.
          </p>
          <TextLink to="/help">Help with your application</TextLink>
          <TextLink to="/admissions/track">View saved applications</TextLink>
        </aside>
      </div>
    </div>
  );
}
function Track() {
  const [apps] = useStored<Application[]>("applications", []);
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const found = query
    ? apps.filter((a) => a.ref.toLowerCase() === query.toLowerCase())
    : apps;
  return (
    <div className="page">
      <PageHeading
        label="Application tracking"
        title="Every step of your journey."
        text="View applications created in this browser's fictional demo. No real application records are accessible."
      />
      <form
        className="filter-bar"
        onSubmit={(e) => {
          e.preventDefault();
          setSearched(true);
        }}
      >
        <label>
          Demo reference
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearched(false);
            }}
            placeholder="BF-27-…"
          />
        </label>
        <button className="button">
          Find application
          <ArrowRight size={16} />
        </button>
      </form>
      {found.map((a) => (
        <section className="panel" key={a.ref}>
          <div className="section-heading">
            <h2>{a.ref}</h2>
            <span className="status">{a.status} · Demo</span>
          </div>
          <p>
            {a.stage} · Saved {new Date(a.date).toLocaleDateString("en-IN")}
          </p>
          <ol className="status-timeline">
            <li className="complete">Draft prepared</li>
            <li className="complete">Demo submitted</li>
            <li>School review · Integration preview</li>
            <li>Decision · Not available in frontend demo</li>
          </ol>
        </section>
      ))}
      {!found.length && (
        <p role="status">
          {searched
            ? "No matching demo reference was found in this browser."
            : "No demo applications submitted yet."}
        </p>
      )}
      <ButtonLink to="/admissions/apply">
        Start or resume an application
      </ButtonLink>
    </div>
  );
}
type Booking = {
  ref: string;
  date: string;
  slot: string;
  name: string;
  status: string;
};
function Visit() {
  const [bookings, setBookings] = useStored<Booking[]>("visits", []);
  const [date, setDate] = useState("2026-10-10");
  const [slot, setSlot] = useState("10:00 AM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState("");
  const reserved = bookings.some(
    (b) => b.date === date && b.slot === slot && b.status === "Reserved",
  );
  const confirm = () => {
    if (reserved)
      return setError(
        "You already reserved this demo slot. Choose another time or cancel below.",
      );
    if (!navigator.onLine)
      return setError("You are offline. Reconnect before confirming.");
    const ref = "VIS-" + Date.now().toString().slice(-6);
    setBookings([...bookings, { ref, date, slot, name, status: "Reserved" }]);
    setReceipt(ref);
    setReview(false);
  };
  return (
    <div className="page">
      <PageHeading
        label="Visit Bloomfield"
        title="Come with questions. Leave with a feeling."
        text="Some things make more sense when you're here. Plan a sample visit, meet the community and picture a school day."
      />
      <div className="booking-layout">
        <div className="booking-photo">
          <img
            src="/images/school-20.webp"
            alt="Illustrative campus for a family visit"
          />
          <div>
            <h2>Your first hello.</h2>
            <p>
              60-minute guided visit · Bloomfield Campus
              <br />
              All times are Indian Standard Time.
            </p>
          </div>
        </div>
        <section className="panel">
          {receipt ? (
            <Success>
              <h2>A little closer to your next chapter.</h2>
              <p>
                Demo booking {receipt}
                <br />
                {dateLabel(date)} · {slot} IST
                <br />
                Bloomfield Campus · Sample South gate
              </p>
              <p>No real reservation has been made.</p>
              <button
                className="text-link"
                onClick={() => {
                  setReceipt("");
                  setReview(false);
                }}
              >
                Explore another date
              </button>
            </Success>
          ) : review ? (
            <>
              <h2>Review your visit</h2>
              <dl className="review-list">
                {[
                  ["Campus", "Bloomfield Campus"],
                  ["Date", dateLabel(date)],
                  ["Time", slot + " IST"],
                  ["Visitor", name],
                  ["Email", email],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p>
                Destination: local demo booking list. No email or external
                reservation is sent.
              </p>
              <div className="actions">
                <button
                  className="button secondary"
                  onClick={() => setReview(false)}
                >
                  Edit details
                </button>
                <button className="button" onClick={confirm}>
                  Confirm demo visit
                  <Check size={16} />
                </button>
              </div>
            </>
          ) : (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                setReview(true);
                setError("");
              }}
            >
              <h2>Make time for possibility.</h2>
              <DemoHint />
              <label>
                Campus
                <select>
                  <option>Bloomfield Campus</option>
                </select>
              </label>
              <label>
                Visit date
                <select
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setError("");
                  }}
                >
                  {["2026-10-10", "2026-10-17", "2026-10-24"].map((d) => (
                    <option key={d} value={d}>
                      {dateLabel(d)}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset>
                <legend>Choose a time · IST</legend>
                <div className="chips">
                  {["10:00 AM", "11:30 AM"].map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={s === slot ? "active" : ""}
                      onClick={() => {
                        setSlot(s);
                        setError("");
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label>
                Your sample name
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Sample"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                />
              </label>
              <button className="button" disabled={reserved}>
                {reserved
                  ? "Already reserved in your demo"
                  : "Review your visit"}
                <ArrowRight size={16} />
              </button>
            </form>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </section>
      </div>
      {bookings.length > 0 && (
        <section className="panel">
          <h2>Your sample visits</h2>
          {bookings.map((b) => (
            <div className="resource-row" key={b.ref}>
              <CalendarDays />
              <div>
                <h3>
                  {dateLabel(b.date)} · {b.slot} IST
                </h3>
                <p>
                  {b.ref} · {b.status} · Fictional booking
                </p>
              </div>
              {b.status === "Reserved" && (
                <button
                  className="button secondary"
                  onClick={() => {
                    setBookings(
                      bookings.map((x) =>
                        x.ref === b.ref ? { ...x, status: "Cancelled" } : x,
                      ),
                    );
                    setReceipt("");
                  }}
                >
                  Cancel booking
                </button>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
export default function Admissions() {
  const { pathname } = useLocation();
  if (pathname === "/visit") return <Visit />;
  const route = pathname.split("/")[2] || "";
  if (!route) return <AdmissionGuide />;
  if (route === "eligibility") return <Eligibility />;
  if (route === "fees") return <Fees />;
  if (route === "apply") return <Apply />;
  if (route === "track") return <Track />;
  return <NotFound />;
}
