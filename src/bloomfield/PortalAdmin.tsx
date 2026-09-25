import { useState } from "react";
import { FileText } from "lucide-react";
import { Empty, ButtonLink } from "./shared";
import { useStored } from "./demo";
import { Chart } from "./PortalLearning";
const integrations = [
  ["Identity / OIDC", "Login, session recovery and server-assigned roles"],
  [
    "CMS & media",
    "Reviewed content, consent-approved images and private uploads",
  ],
  ["ERP / LMS", "Student records, attendance and assignment synchronization"],
  ["Payments", "Hosted checkout, webhook verification and reconciliation"],
  ["AI / search / speech", "Approved knowledge retrieval, OCR and voice"],
  ["Maps / GPS", "Verified coordinates, routing and private vehicle feed"],
  ["Calendars", "Slot capacity, school timezone and provider sync"],
  ["Email / SMS / push", "Reviewed messages, delivery retries and preferences"],
  ["Realtime", "Authorized event stream, reconnect and stale states"],
  [
    "PWA / offline",
    "Public shell only; private pages and submissions excluded",
  ],
  ["QR verification", "Opaque, expiring and revocable issued tokens"],
  ["Audit / monitoring", "Scoped audit events, redacted errors and metrics"],
];
export default function Admin({ kind }: { kind: string }) {
  const [filter, setFilter] = useState("All");
  const [content, setContent] = useStored<
    { title: string; status: string; body?: string }[]
  >("content", [
    { title: "October reading circular", status: "Draft" },
    { title: "Primary programme guide", status: "In review" },
    { title: "Campus visitor guide", status: "Published" },
  ]);
  const [queue, setQueue] = useStored<
    { name: string; interest: string; stage: string; owner: string }[]
  >("enquiries", [
    {
      name: "Sample family A",
      interest: "Primary",
      stage: "New",
      owner: "Unassigned",
    },
    {
      name: "Sample family B",
      interest: "Transport",
      stage: "Follow-up",
      owner: "Admissions team",
    },
    {
      name: "Sample family C",
      interest: "Senior",
      stage: "Reviewed",
      owner: "Admissions team",
    },
  ]);
  const [ai, setAi] = useState("");
  const [draft, setDraft] = useState("");
  const [action, setAction] = useState("");
  const [scenario, setScenario] = useState("Available");
  const [rolePreview, setRolePreview] = useState("Content editor");
  const [metric, setMetric] = useState("Admissions funnel");
  const [period, setPeriod] = useState("September 2026");
  const [cohort, setCohort] = useState("All");
  const metricData: Record<string, [string[], number[], string]> = {
    "Admissions funnel": [
      ["Enquiry", "Visit", "Applied", "Reserved"],
      [42, 26, 18, 8],
      "Unique sample family cohort · reserved is not admitted",
    ],
    "Class capacity": [
      ["Primary", "Middle", "Senior"],
      [24, 20, 16],
      "Available places: configured 30 minus active/reserved 6,10,14",
    ],
    "Fee collections": [
      ["Settled", "Pending"],
      [72000, 24000],
      "INR · sample invoices total 96,000; no refunds",
    ],
    "Transport occupancy": [
      ["H1", "H2", "H3"],
      [24, 18, 27],
      "Assigned seats / 30 configured seats per bus",
    ],
    "Library usage": [
      ["Fiction", "Science", "History"],
      [38, 24, 18],
      "Sample loans by category · September cohort",
    ],
    "Website analytics": [
      ["Programme", "Fees", "Visit", "Apply"],
      [400, 180, 90, 45],
      "Sample page events; visitors may appear in multiple steps",
    ],
  };
  if (kind === "reports")
    return (
      <>
        <h2>A clearer view of the whole.</h2>
        <div className="filter-bar">
          <label>
            Report
            <select value={metric} onChange={(e) => setMetric(e.target.value)}>
              {Object.keys(metricData).map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </label>
          <label>
            Period
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option>September 2026</option>
              <option>August 2026 — no sample data</option>
            </select>
          </label>
          <label>
            Campus
            <select value={cohort} onChange={(e) => setCohort(e.target.value)}>
              <option>All</option>
              <option>Bloomfield Campus</option>
              <option>River Campus</option>
            </select>
          </label>
        </div>
        {period.startsWith("August") || cohort === "River Campus" ? (
          <Empty
            title="No observations for these filters."
            text="Choose September and Bloomfield Campus to explore the sample cohort."
          />
        ) : (
          <Chart
            title={metric}
            labels={metricData[metric][0]}
            values={metricData[metric][1]}
            unit=""
            description={metricData[metric][2]}
          />
        )}
        <p className="hint">
          Demo chart values are fixtures, not verified school outcomes. Live
          exports need server permission checks.
        </p>
      </>
    );
  if (kind === "content")
    return (
      <section className="panel">
        <div className="section-heading">
          <h2>The school journal, thoughtfully edited.</h2>
          <label>
            Demo capability
            <select
              value={rolePreview}
              onChange={(e) => setRolePreview(e.target.value)}
            >
              <option>Content editor</option>
              <option>Publisher</option>
            </select>
          </label>
        </div>
        {content.map((c, i) => (
          <div className="resource-row" key={c.title}>
            <FileText />
            <div>
              <h3>{c.title}</h3>
              <span className="status">{c.status}</span>
              {c.body && (
                <details>
                  <summary>Read saved draft</summary>
                  <p>{c.body}</p>
                </details>
              )}
            </div>
            <button
              className="button secondary"
              disabled={
                c.status === "Archived" ||
                (c.status === "In review" && rolePreview !== "Publisher") ||
                (c.status === "Published" && rolePreview !== "Publisher")
              }
              onClick={() =>
                setContent(
                  content.map((x, j) =>
                    i === j
                      ? {
                          ...x,
                          status:
                            x.status === "Draft"
                              ? "In review"
                              : x.status === "In review"
                                ? "Published"
                                : "Archived",
                        }
                      : x,
                  ),
                )
              }
            >
              {c.status === "Draft"
                ? "Send for review"
                : c.status === "In review"
                  ? "Publish reviewed item"
                  : c.status === "Published"
                    ? "Archive"
                    : "Archived"}
            </button>
          </div>
        ))}
        <p className="hint">
          Editors prepare drafts; the publisher preview releases them. Sample
          workflow states do not alter public canonical pages or AI sources.
          Production requires server authorization and index refresh.
        </p>
        <h3>Writing & translation studio</h3>
        <label>
          Brief
          <textarea
            value={ai}
            onChange={(e) => setAi(e.target.value)}
            placeholder="e.g. A notice about reading week"
          />
        </label>
        <div className="actions">
          <button
            className="button secondary"
            disabled={!ai.trim()}
            onClick={() => {
              setDraft(
                "DEMO DRAFT — Reading Week runs 5–9 October 2026. Please bring a favourite labelled book on Monday 5 October. No purchase is required. Review all dates and recipients before publication.",
              );
              setAction("Writing assistant sample");
            }}
          >
            Generate sample draft
          </button>
          <button
            className="button secondary"
            onClick={() => {
              setDraft(
                "हिन्दी प्रारूप: पठन सप्ताह 5–9 अक्टूबर 2026 को आयोजित होगा। सोमवार 5 अक्टूबर को अपनी पसंदीदा, नाम लिखी पुस्तक लाएँ। नई पुस्तक खरीदना आवश्यक नहीं है।",
              );
              setAction("Hindi translation draft · Human review required");
            }}
          >
            Preview Hindi translation
          </button>
        </div>
        {draft && (
          <div className="answer">
            <h3>{action}</h3>
            <label>
              Edit draft
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </label>
            <p>
              Source: Reading Week circular v1 · 20 September 2026. Curated
              demonstration; no AI service connected.
            </p>
            <button
              className="button"
              onClick={() => {
                setContent([
                  ...content,
                  {
                    title: "Studio draft " + (content.length + 1),
                    status: "Draft",
                    body: draft,
                  },
                ]);
                setDraft("");
              }}
            >
              Save as draft
            </button>
          </div>
        )}
      </section>
    );
  if (kind === "settings")
    return (
      <section className="panel">
        <h2>Connections, with clear boundaries.</h2>
        <p>
          All providers are disconnected. This application runs entirely in demo
          mode; a query parameter cannot enable live access.
        </p>
        <label>
          Preview integration state
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          >
            <option>Available</option>
            <option>Loading</option>
            <option>Empty</option>
            <option>Provider unavailable</option>
            <option>Session expired</option>
            <option>Permission denied</option>
          </select>
        </label>
        {scenario === "Loading" ? (
          <div className="skeleton" role="status">
            Loading provider preview…
            <button
              className="text-link"
              onClick={() => setScenario("Available")}
            >
              Finish demo load
            </button>
          </div>
        ) : scenario === "Empty" ? (
          <Empty
            title="No provider configuration yet."
            text="Choose Available to inspect the integration checklist."
          />
        ) : scenario === "Session expired" ? (
          <div className="info-panel">
            <p>
              Sample session expired. No private data is being displayed.
              Re-enter a demo role to recover.
            </p>
            <ButtonLink to="/login">Return to role preview</ButtonLink>
          </div>
        ) : scenario === "Permission denied" ? (
          <Empty
            title="This action is outside this role's scope."
            text="No private record details are shown. A real school administrator must review access."
          />
        ) : scenario === "Provider unavailable" ? (
          <div role="alert" className="info-panel">
            <p>Provider unavailable. No request was marked successful.</p>
            <button className="button" onClick={() => setScenario("Available")}>
              Retry preview
            </button>
          </div>
        ) : (
          integrations.map(([title, description]) => (
            <details key={title}>
              <summary>
                {title}
                <span className="status">Integration preview</span>
              </summary>
              <p>
                {description}. Requires a configured server adapter, provider
                credentials and school-approved data. This frontend contains no
                secrets.
              </p>
            </details>
          ))
        )}
      </section>
    );
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Every enquiry is a beginning.</h2>
          <p>Fictional admissions queue · Changes stay in this browser.</p>
        </div>
        <label>
          Status
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {["All", "New", "Follow-up", "Reviewed", "Closed"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Family</th>
              <th>Interest / suggested routing</th>
              <th>Owner</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            {queue
              .filter((q) => filter === "All" || q.stage === filter)
              .map((q) => (
                <tr key={q.name}>
                  <td>{q.name}</td>
                  <td>
                    {q.interest}
                    <small>
                      Demo suggestion:{" "}
                      {q.interest === "Transport"
                        ? "Transport desk"
                        : "Admissions"}
                    </small>
                  </td>
                  <td>
                    <select
                      aria-label={"Owner for " + q.name}
                      value={q.owner}
                      onChange={(e) =>
                        setQueue(
                          queue.map((x) =>
                            x.name === q.name
                              ? { ...x, owner: e.target.value }
                              : x,
                          ),
                        )
                      }
                    >
                      <option>Unassigned</option>
                      <option>Admissions team</option>
                      <option>Transport desk</option>
                    </select>
                  </td>
                  <td>
                    <select
                      aria-label={"Stage for " + q.name}
                      value={q.stage}
                      onChange={(e) =>
                        setQueue(
                          queue.map((x) =>
                            x.name === q.name
                              ? { ...x, stage: e.target.value }
                              : x,
                          ),
                        )
                      }
                    >
                      {["New", "Follow-up", "Reviewed", "Closed"].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {!queue.some((q) => filter === "All" || q.stage === filter) && <Empty />}
      <details>
        <summary>Feedback analysis · Sample evidence</summary>
        <p>
          Two of three fictional feedback notes ask for clearer transport
          updates. One asks for a reading list. Suggested action: review the
          transport FAQ and publish the reading guide.
        </p>
        <blockquote>
          “It would help to know when the bus information was last updated.” —
          Fictional anonymized sample
        </blockquote>
        <p className="hint">
          Curated analysis preview; no inferred certainty or actual feedback
          processed.
        </p>
      </details>
    </section>
  );
}
