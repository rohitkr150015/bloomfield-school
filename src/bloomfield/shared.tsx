import { lazy, Suspense } from "react";
const SuccessAnimation = lazy(() => import("./SuccessAnimation"));
import { answerQuestion } from "./knowledge";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Globe2,
  Menu,
  MessageCircle,
  Search,
  X,
  Sparkles,
  Mic,
  Check,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { school } from "./data";
import { DemoContext, useLanguage } from "./demo";
export function DemoProvider({ children }: { children: ReactNode }) {
  const [hindi, setHindi] = useState(false);
  return (
    <DemoContext.Provider value={{ hindi, toggle: () => setHindi((v) => !v) }}>
      {children}
    </DemoContext.Provider>
  );
}
export function Crest() {
  return (
    <svg className="crest" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 31C10 33 6 13 10 5c17 0 25 10 22 26Z" fill="currentColor" />
      <path d="M34 31C32 11 46 3 58 5c2 16-7 28-24 26Z" fill="currentColor" />
      <path d="M31 34C13 31 3 44 6 59c18 0 28-9 25-25Z" fill="currentColor" />
      <path d="M34 34c19-3 28 10 25 25-18 0-28-9-25-25Z" fill="currentColor" />
      <circle cx="32" cy="32" r="6" fill="#f4c84b" />
    </svg>
  );
}
export function ButtonLink({
  to,
  children,
  secondary = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "secondary" : ""} ${className}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function PageHeading({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="page-heading">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={13} />
        <span>{label}</span>
      </div>
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement;
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-head">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Empty({
  title = "Nothing here just yet.",
  text = "Try another filter or clear your search.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="empty">
      <BookOpen size={32} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
export function Success({ children }: { children: ReactNode }) {
  return (
    <div className="success" role="status">
      <span
        style={{
          position: "relative",
          width: 38,
          height: 38,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Check size={18} />
        <Suspense fallback={null}>
          <SuccessAnimation />
        </Suspense>
      </span>
      <div>{children}</div>
    </div>
  );
}
export function DemoHint() {
  return (
    <p className="hint">
      Interactive demo · Use fictional details only. Files stay on your device.
    </p>
  );
}
export function SimpleForm({
  kind,
  upload = false,
}: {
  kind: string;
  upload?: boolean;
}) {
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!navigator.onLine)
      return setError(
        "You are offline. Reconnect before saving this demo request.",
      );
    setDone("BF-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  }
  return done ? (
    <Success>
      <strong>{kind} saved in this preview.</strong>
      <p>Demo reference {done}. No request was sent to a school.</p>
      <button className="text-link" onClick={() => setDone("")}>
        Start another request
      </button>
    </Success>
  ) : (
    <form className="form" onSubmit={submit}>
      <DemoHint />
      <label>
        Sample name
        <input required name="name" placeholder="e.g. Alex Sample" />
      </label>
      <label>
        Email
        <input
          required
          type="email"
          name="email"
          placeholder="alex@example.com"
        />
      </label>
      <label>
        {kind === "Event registration" ? "Number of attendees" : "Details"}
        {kind === "Event registration" ? (
          <input type="number" min="1" max="5" required defaultValue="2" />
        ) : (
          <textarea
            required
            minLength={10}
            placeholder="Tell us a little more…"
          />
        )}
      </label>
      {upload && (
        <label>
          CV · PDF, JPG or PNG · max 10 MB
          <input
            type="file"
            required
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const f = e.target.files?.[0];
              const invalid =
                f && (f.size > 10485760 || !/\.(pdf|jpe?g|png)$/i.test(f.name));
              e.target.setCustomValidity(
                invalid ? "Choose a PDF, JPG or PNG under 10 MB." : "",
              );
              setFile(f && !invalid ? `${f.name} — local preview only` : "");
            }}
          />
          <small>{file}</small>
        </label>
      )}
      <label className="check">
        <input type="checkbox" required />I am using fictional details for this
        demo.
      </label>
      {error && <p role="alert">{error}</p>}
      <button className="button">
        Save demo {kind.toLowerCase()}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
export function AskBloomfield({ onClose }: { onClose: () => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("/admissions");
  const [voice, setVoice] = useState(false);
  const ask = (q: string) => {
    setQuestion(q);
    const result = answerQuestion(q);
    setAnswer(result.text);
    setSource(result.source);
  };
  return (
    <Modal title="Ask Bloomfield" onClose={onClose}>
      <div className="assistant-intro">
        <Sparkles />
        <p>
          A little guidance for your next chapter.
          <small>
            Demo answers · Curated sample sources, updated {school.updated}
          </small>
        </p>
      </div>
      <div className="chips">
        {[
          "What are the admission documents?",
          "How much are Primary fees?",
          "Can I visit the library?",
        ].map((q) => (
          <button key={q} onClick={() => ask(q)}>
            {q}
          </button>
        ))}
      </div>
      {answer && (
        <div className="answer" aria-live="polite">
          <p>{answer}</p>
          <Link onClick={onClose} to={source}>
            Read source: Bloomfield sample guide, v1 <ArrowUpRight size={14} />
          </Link>
          <small>
            Section: {source.split("/").filter(Boolean).join(" / ")} · 22 Sep
            2026
          </small>
        </div>
      )}
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          if (question.trim()) ask(question);
        }}
      >
        <label className="sr-only" htmlFor="question">
          Your question
        </label>
        <input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about life at Bloomfield…"
          required
        />
        <button
          type="button"
          className="icon-button"
          aria-label="Voice assistant availability"
          onClick={() => setVoice(!voice)}
        >
          <Mic size={18} />
        </button>
        <button aria-label="Ask question" className="icon-button">
          <ArrowRight />
        </button>
      </form>
      {voice && (
        <p className="hint">
          Voice integration preview: speech recognition is not connected. Use
          the text field to ask your question.
        </p>
      )}
      <Link className="button" to="/visit" onClick={onClose}>
        Explore visit slots
        <ArrowUpRight size={17} />
      </Link>
    </Modal>
  );
}
export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { hindi, toggle } = useLanguage();
  const [menu, setMenu] = useState(false),
    [chat, setChat] = useState(false),
    [offline, setOffline] = useState(!navigator.onLine);
  const portal = pathname.startsWith("/portal");
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
    const title =
      pathname === "/"
        ? "A place to bloom"
        : pathname
            .split("/")
            .filter(Boolean)
            .map((x) => x.replaceAll("-", " "))
            .join(" · ");
    document.title = title + " | Bloomfield School";
    document.documentElement.lang = "en";
  }, [pathname]);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  const nav = [
    ["Our School", "/about", "हमारा विद्यालय"],
    ["Learning", "/academics", "शिक्षा"],
    ["School Life", "/school-life", "स्कूल जीवन"],
    ["Admissions", "/admissions", "प्रवेश"],
    ["Families", "/families", "परिवार"],
  ];
  const reset = () => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("bloomfield-demo:"))
        .forEach((k) => localStorage.removeItem(k));
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="demo-bar">
        <span>
          <span className="demo-dot" />
          Demo school — sample data; no real submission/payment.
        </span>
        <button onClick={reset}>Reset demo</button>
      </div>
      {offline && (
        <div className="offline" role="status">
          You’re offline. Public pages remain available; reconnect before
          submitting a demo form.
        </div>
      )}
      <header className="site-header">
        <div className="utility">
          <span>A place to learn. A place to belong.</span>
          <div>
            <Link to="/events">Calendar</Link>
            <Link to="/notices">Notices</Link>
            <button onClick={toggle}>
              <Globe2 size={14} />
              {hindi ? "English" : "हिन्दी"}
            </button>
            <Link to="/login" className="portal-link">
              Family portal
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
        <div className="masthead">
          <Link to="/" className="brand" aria-label="Bloomfield School home">
            <Crest />
            <span>
              Bloomfield<small>SCHOOL · GROWING TOGETHER</small>
            </span>
          </Link>
          <nav aria-label="Main navigation">
            {nav.map(([name, path, hi]) => (
              <NavLink key={path} to={path}>
                {hindi ? <span lang="hi">{hi}</span> : name}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="icon-button"
              aria-label="Search website"
              to="/search"
            >
              <Search size={20} />
            </Link>
            <ButtonLink to="/visit">Meet us</ButtonLink>
            <button
              className="icon-button menu-toggle"
              aria-label="Open navigation"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      {hindi && (
        <div className="language-note">
          <span lang="hi">हिन्दी नेविगेशन सक्रिय है।</span> English fallback:
          detailed pages and demo forms are currently in English.
        </div>
      )}
      {menu && (
        <Modal title="Explore Bloomfield" onClose={() => setMenu(false)}>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[
              ...nav,
              ["Gallery", "/gallery"],
              ["Calendar", "/events"],
              ["Notices", "/notices"],
              ["Family portal", "/login"],
              ["Contact & support", "/contact"],
            ].map(([name, path]) => (
              <Link key={path} onClick={() => setMenu(false)} to={path}>
                {name}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
          <p className="hint">
            Family help: hello@bloomfield.example
            <br />
            Illustrative contact · No live school office
          </p>
        </Modal>
      )}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      {!portal && (
        <>
          <section className="visit-band">
            <div>
              <Eyebrow>LET’S START WITH HELLO</Eyebrow>
              <h2>
                Your child’s next chapter
                <br />
                could begin with a visit.
              </h2>
              <p>Come with questions. Leave with a feeling.</p>
            </div>
            <ButtonLink to="/visit" secondary>
              Find a day to meet us
            </ButtonLink>
            <span className="visit-doodle" aria-hidden="true">
              ✳
            </span>
          </section>
          <footer>
            <div className="footer-top">
              <div className="footer-brand">
                <Link className="brand" to="/">
                  <Crest />
                  <span>
                    Bloomfield<small>SCHOOL · GROWING TOGETHER</small>
                  </span>
                </Link>
                <p>
                  Curious minds. Kind hearts.
                  <br />A little more possibility, every day.
                </p>
                <small>Fictional CBSE school concept · LKG – XII</small>
              </div>
              {[
                [
                  "Discover",
                  ["Our school", "/about"],
                  ["Learning", "/academics"],
                  ["Our educators", "/faculty"],
                  ["Campus & spaces", "/campus"],
                  ["School journal", "/gallery"],
                  ["Clubs & interests", "/clubs"],
                ],
                [
                  "Your next step",
                  ["Admissions", "/admissions"],
                  ["Fees & eligibility", "/admissions/fees"],
                  ["Visit Bloomfield", "/visit"],
                  ["Track application", "/admissions/track"],
                  ["Careers", "/careers"],
                  ["Alumni", "/alumni"],
                ],
                [
                  "Here to help",
                  ["Family hub", "/families"],
                  ["Calendar", "/events"],
                  ["Notices", "/notices"],
                  ["Downloads", "/downloads"],
                  ["Transport", "/transport"],
                  ["Contact & support", "/contact"],
                ],
              ].map(([heading, ...links]) => (
                <div key={String(heading)}>
                  <h3>{String(heading)}</h3>
                  {(links as string[][]).map(([label, path]) => (
                    <Link key={path} to={path}>
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="footer-bottom">
              <span>
                © 2026 Bloomfield School · Made for brighter beginnings.
              </span>
              <div>
                <Link to="/privacy">Privacy</Link>
                <Link to="/accessibility">Accessibility</Link>
                <Link to="/help">Help</Link>
              </div>
            </div>
          </footer>
        </>
      )}
      <button
        className="ask-button"
        aria-label="Ask Bloomfield"
        onClick={() => setChat(true)}
      >
        <Sparkles size={18} />
        <span>Ask Bloomfield</span>
        <span className="ai-dot" />
      </button>
      {chat && <AskBloomfield onClose={() => setChat(false)} />}
      {!portal && (
        <div className="mobile-actions">
          <Link to="/admissions/apply">
            Apply now
            <ArrowUpRight size={16} />
          </Link>
          <Link to="/visit">
            Meet us
            <CalendarDays size={16} />
          </Link>
        </div>
      )}
    </>
  );
}
