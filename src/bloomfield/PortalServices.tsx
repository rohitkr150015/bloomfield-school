import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  FileText,
  Bell,
  Bus,
  Download,
} from "lucide-react";
import { Empty, Success, DemoHint, Modal, TextLink } from "./shared";
import { useStored } from "./demo";
import { money, download } from "./data";
import type { Child } from "./portal-data";
export function Fees({
  child,
  receipts = false,
}: {
  child: Child;
  receipts?: boolean;
}) {
  const [state, setState] = useStored<string>("payment:" + child.id, "Unpaid");
  const [checkout, setCheckout] = useState(false);
  const [scenario, setScenario] = useState("Success");
  const total = child.id === "aarav" ? 24000 : 18000;
  const paid = state === "Simulated paid";
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="tag">TERM I · 2026–27</span>
          <h2>
            {receipts
              ? "Your sample receipts"
              : "A clear picture of school fees."}
          </h2>
        </div>
        <span className="status">{state}</span>
      </div>
      <p>
        Fictional invoice BF-{child.id.toUpperCase()}-01 · {child.name}
      </p>
      <div className="table-wrap">
        <table>
          <caption>Invoice in INR · sample ledger</caption>
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Term tuition</td>
              <td>{money(total - 3000)}</td>
            </tr>
            <tr>
              <td>Activity & resources</td>
              <td>{money(3000)}</td>
            </tr>
            <tr>
              <th>Total</th>
              <th>{money(total)}</th>
            </tr>
            <tr>
              <td>Sample pending</td>
              <td>{money(paid ? 0 : total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {paid ? (
        <>
          <Success>
            Payment scenario completed in this demo. No money was charged.
          </Success>
          <button
            className="button"
            onClick={() =>
              download(
                "sample-receipt-" + child.id + ".txt",
                `NOT A VALID PAYMENT RECEIPT\nBloomfield School fictional demo\nInvoice BF-${child.id}-01\nAmount INR ${total}\nSimulated paid. No funds transferred.`,
              )
            }
          >
            Download sample receipt
            <Download size={16} />
          </button>
        </>
      ) : receipts ? (
        <Empty
          title="No sample receipt yet."
          text="Complete a payment simulation to explore the receipt format."
        />
      ) : (
        <button className="button" onClick={() => setCheckout(true)}>
          Preview checkout
          <CreditCard size={17} />
        </button>
      )}
      <TextLink to={receipts ? "/portal/fees" : "/portal/receipts"}>
        {receipts ? "Back to invoice" : "View receipts"}
      </TextLink>
      {checkout && (
        <Modal
          title="Payment integration preview"
          onClose={() => setCheckout(false)}
        >
          <p>
            {money(total)} · Invoice BF-{child.id.toUpperCase()}-01
          </p>
          <p>
            No payment provider is connected. Choose a test outcome; no card
            details are requested.
          </p>
          <label>
            Demo outcome
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            >
              <option>Success</option>
              <option>Pending verification</option>
              <option>Failed</option>
              <option>Abandoned</option>
            </select>
          </label>
          <button
            className="button"
            onClick={() => {
              setState(
                scenario === "Success"
                  ? "Simulated paid"
                  : scenario === "Pending verification"
                    ? "Pending verification · Demo"
                    : "Unpaid · " + scenario.toLowerCase(),
              );
              setCheckout(false);
            }}
          >
            Run selected simulation
          </button>
        </Modal>
      )}
      <p className="hint">
        Production requires server-created orders, signed webhooks and a
        reconciled ledger. This frontend cannot verify real payments.
      </p>
    </section>
  );
}
export function Messages() {
  const [recipient, setRecipient] = useState("Class teacher");
  const [text, setText] = useState("");
  const [review, setReview] = useState(false);
  const [messages, setMessages] = useStored<
    { recipient: string; text: string; time: string }[]
  >("messages", []);
  return (
    <div className="portal-grid">
      <section className="panel">
        <h2>A conversation, with care.</h2>
        <p>School contacts available in the sample family scope.</p>
        <label>
          Conversation
          <select
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setReview(false);
            }}
          >
            <option>Class teacher</option>
            <option>Admissions office</option>
            <option>Transport office</option>
          </select>
        </label>
        <div className="message-bubble">
          <strong>{recipient}</strong>
          <p>
            Welcome to the sample conversation. This is a local demo; messages
            will not be delivered.
          </p>
        </div>
        {messages
          .filter((m) => m.recipient === recipient)
          .map((m, i) => (
            <div className="message-bubble sent" key={i}>
              <p>{m.text}</p>
              <small>Saved locally · {m.time} · Not delivered</small>
            </div>
          ))}
      </section>
      <section className="panel">
        <h2>Write a message</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setReview(true);
          }}
        >
          <DemoHint />
          <label>
            Message
            <textarea
              required
              minLength={3}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setReview(false);
              }}
            />
          </label>
          <button className="button">
            Review message
            <ArrowRight size={16} />
          </button>
        </form>
        {review && (
          <div className="answer">
            <h3>Review for {recipient}</h3>
            <p>{text}</p>
            <p className="hint">Destination: local demo conversation only.</p>
            <div className="actions">
              <button
                className="button secondary"
                onClick={() => setReview(false)}
              >
                Cancel
              </button>
              <button
                className="button"
                onClick={() => {
                  setMessages([
                    ...messages,
                    {
                      recipient,
                      text,
                      time: new Date().toLocaleTimeString("en-IN"),
                    },
                  ]);
                  setText("");
                  setReview(false);
                }}
              >
                Confirm demo message
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
export function Notifications() {
  const [read, setRead] = useStored<string[]>("read-notifications", []);
  const [prefs, setPrefs] = useStored("notification-preferences", {
    email: true,
    push: false,
  });
  return (
    <section className="panel">
      <h2>The latest in your school day.</h2>
      {[
        ["Reading Week circular", "/notices/reading-week"],
        ["A science task is waiting", "/portal/assignments/science-journal"],
        ["Term fees are ready to review", "/portal/fees"],
      ].map(([title, to]) => (
        <div className="resource-row" key={title}>
          <Bell />
          <div>
            <h3>
              <Link to={to}>{title}</Link>
            </h3>
            <p>
              {read.includes(title) ? "Read" : "Unread"} · Sample notification
            </p>
          </div>
          <button
            className="button secondary"
            disabled={read.includes(title)}
            onClick={() => setRead([...read, title])}
          >
            Mark read
          </button>
        </div>
      ))}
      <h3>Notification preferences</h3>
      <label className="check">
        <input
          type="checkbox"
          checked={prefs.email}
          onChange={(e) => setPrefs({ ...prefs, email: e.target.checked })}
        />
        Email updates (demo preference only)
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={prefs.push}
          onChange={(e) => setPrefs({ ...prefs, push: e.target.checked })}
        />
        Push updates (provider not connected)
      </label>
    </section>
  );
}
type RequestRecord = {
  id: string;
  kind: string;
  child: string;
  detail: string;
  status: string;
};
export function Requests({
  kind,
  child,
  role,
}: {
  kind: string;
  child: Child;
  role: string;
}) {
  const [records, setRecords] = useStored<RequestRecord[]>("requests", []);
  const [detail, setDetail] = useState("");
  const [start, setStart] = useState("2026-10-01");
  const [end, setEnd] = useState("2026-10-01");
  const [type, setType] = useState(
    kind === "documents"
      ? "Bonafide certificate"
      : kind === "complaints"
        ? "Academic support"
        : "Class teacher",
  );
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const title =
    kind === "ptm"
      ? "Make time for a conversation."
      : kind === "leave"
        ? "Keep the school in the loop."
        : kind === "documents"
          ? "The documents you need."
          : "Your voice matters.";
  const save = () => {
    if (!navigator.onLine)
      return setError("Reconnect before saving this demo request.");
    const payload =
      kind === "ptm"
        ? type + " · " + start + " · " + detail + " IST"
        : kind === "leave"
          ? start + " to " + end + " · " + detail
          : type + " · " + detail;
    if (
      records.some(
        (r) =>
          r.kind === kind &&
          r.child === child.id &&
          r.detail === payload &&
          r.status !== "Cancelled",
      )
    )
      return setError(
        "This request already exists in the demo. Choose another slot or review its status below.",
      );
    setRecords([
      ...records,
      {
        id: "REQ-" + Date.now().toString().slice(-6),
        kind,
        child: child.id,
        detail: payload,
        status: kind === "ptm" ? "Reserved · Demo" : "Pending review",
      },
    ]);
    setReview(false);
    setDetail("");
    setError("");
  };
  return (
    <>
      <section className="panel">
        <h2>{title}</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setReview(true);
          }}
        >
          <DemoHint />
          {kind !== "leave" && (
            <label>
              {kind === "ptm"
                ? "Teacher"
                : kind === "documents"
                  ? "Certificate type"
                  : "Category"}
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {(kind === "ptm"
                  ? ["Class teacher", "Science teacher"]
                  : kind === "documents"
                    ? [
                        "Bonafide certificate",
                        "Transfer certificate",
                        "Participation certificate",
                      ]
                    : [
                        "Academic support",
                        "Facilities",
                        "Transport",
                        "General concern",
                      ]
                ).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          )}
          {["ptm", "leave"].includes(kind) && (
            <label>
              {kind === "ptm" ? "Meeting date" : "From date"}
              <input
                type="date"
                required
                min="2026-09-22"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                  if (e.target.value > end) setEnd(e.target.value);
                }}
              />
            </label>
          )}
          {kind === "leave" && (
            <label>
              To date
              <input
                type="date"
                required
                min={start}
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </label>
          )}
          <label>
            {kind === "ptm" ? "Time · IST" : "Details"}
            {kind === "ptm" ? (
              <select
                required
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              >
                <option value="">Choose a sample slot</option>
                <option>10:00 AM</option>
                <option>10:20 AM</option>
                <option>10:40 AM</option>
              </select>
            ) : (
              <textarea
                required
                minLength={10}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Use fictional information…"
              />
            )}
          </label>
          <button className="button">
            Review request
            <ArrowRight size={16} />
          </button>
        </form>
        {review && (
          <div className="answer">
            <h3>Review for {child.name}</h3>
            <p>
              {type} ·{" "}
              {["ptm", "leave"].includes(kind)
                ? start + (kind === "leave" ? " to " + end : "")
                : ""}
              <br />
              {detail}
            </p>
            <p>
              Destination: local demo school queue. No real request is sent.
            </p>
            <div className="actions">
              <button
                className="button secondary"
                onClick={() => setReview(false)}
              >
                Cancel
              </button>
              <button className="button" onClick={save}>
                Confirm demo request
              </button>
            </div>
          </div>
        )}
        {error && <p role="alert">{error}</p>}
      </section>
      <section className="panel">
        <h2>Request history</h2>
        {records
          .filter(
            (r) =>
              r.kind === kind && (role === "teacher" || r.child === child.id),
          )
          .map((r) => (
            <div className="resource-row" key={r.id}>
              <FileText />
              <div>
                <h3>{r.id}</h3>
                <p>{r.detail}</p>
                <span className="status">{r.status}</span>
              </div>
              <div className="actions">
                {role === "teacher" &&
                kind === "leave" &&
                r.status === "Pending review" ? (
                  <>
                    <button
                      className="button secondary"
                      onClick={() =>
                        setRecords(
                          records.map((x) =>
                            x.id === r.id
                              ? { ...x, status: "Approved · Demo" }
                              : x,
                          ),
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="button secondary"
                      onClick={() =>
                        setRecords(
                          records.map((x) =>
                            x.id === r.id
                              ? { ...x, status: "Rejected · Demo" }
                              : x,
                          ),
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  !r.status.includes("Cancelled") && (
                    <button
                      className="text-link"
                      onClick={() =>
                        setRecords(
                          records.map((x) =>
                            x.id === r.id ? { ...x, status: "Cancelled" } : x,
                          ),
                        )
                      }
                    >
                      Cancel request
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        {!records.some(
          (r) =>
            r.kind === kind && (role === "teacher" || r.child === child.id),
        ) && (
          <Empty
            title="No requests yet."
            text="Your sample request and status will appear here."
          />
        )}
        {kind === "documents" && (
          <TextLink to="/verify/demo-certificate">
            Preview sample certificate verification
          </TextLink>
        )}
        {kind === "leave" && (
          <p className="hint">
            Leave approval does not change any attendance mark.
          </p>
        )}
      </section>
    </>
  );
}
export function Library({ child }: { child: Child }) {
  const [q, setQ] = useState("");
  const [reserved, setReserved] = useStored<string[]>("books:" + child.id, []);
  const books = [
    ["The Blue Umbrella", "Fiction", "Available"],
    ["A Brief History of Science", "Science", "Available"],
    ["Stories from Around the World", "Literature", "On loan"],
  ];
  return (
    <section className="panel">
      <h2>Your next great discovery.</h2>
      <label>
        Search the catalogue
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a book or subject…"
        />
      </label>
      {books
        .filter((b) => b.join(" ").toLowerCase().includes(q.toLowerCase()))
        .map(([title, category, status]) => (
          <div className="resource-row" key={title}>
            <BookOpen />
            <div>
              <h3>{title}</h3>
              <p>
                {category} ·{" "}
                {reserved.includes(title) ? "Reserved in demo" : status}
              </p>
            </div>
            <button
              className="button secondary"
              disabled={status === "On loan"}
              onClick={() =>
                setReserved(
                  reserved.includes(title)
                    ? reserved.filter((x) => x !== title)
                    : [...reserved, title],
                )
              }
            >
              {reserved.includes(title)
                ? "Cancel reservation"
                : "Reserve sample"}
            </button>
          </div>
        ))}
      {!books.some((b) =>
        b.join(" ").toLowerCase().includes(q.toLowerCase()),
      ) && <Empty />}
      <h3>Your sample loan</h3>
      <p>
        The Secret Garden · Due 28 September 2026 · Return at the library desk.
      </p>
      <p className="hint">
        A reservation is a local preview. A librarian must issue or return real
        books.
      </p>
    </section>
  );
}
export function BusTracking() {
  const [scenario, setScenario] = useState("Current simulation");
  return (
    <section className="panel">
      <h2>A little reassurance on the journey.</h2>
      <label>
        GPS preview state
        <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
          <option>Current simulation</option>
          <option>Stale — 2 minutes old</option>
          <option>Unavailable — 8 minutes old</option>
        </select>
      </label>
      <div className="bus-diagram">
        <span>School</span>
        <i />
        <Bus size={36} />
        <i />
        <span>Sample stop</span>
      </div>
      <span className="status">{scenario}</span>
      <h3>Assigned sample route H1 · Bus 04</h3>
      <p>
        {scenario.startsWith("Current")
          ? "Static simulated position · Last sample observation: 22 Sep 2026, 15:12 IST."
          : scenario.startsWith("Stale")
            ? "Stale position: 22 Sep 2026, 15:10 IST. Current location cannot be confirmed."
            : "Tracking unavailable. Last known sample observation: 22 Sep 2026, 15:04 IST."}
      </p>
      <p>
        ETA unavailable. This is not a live GPS feed. No student location is
        collected.
      </p>
    </section>
  );
}
