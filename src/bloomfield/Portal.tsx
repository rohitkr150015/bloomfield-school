import { children } from "./portal-data";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Bell,
  ClipboardCheck,
  Bus,
  LogOut,
  Settings,
  BarChart3,
  Users,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Empty } from "./shared";
import { useStored } from "./demo";
import {
  Summary,
  Today,
  Attendance,
  Progress,
  Timetable,
  Assignments,
} from "./PortalLearning";
import {
  Fees,
  Messages,
  Notifications,
  Requests,
  Library,
  BusTracking,
} from "./PortalServices";
import Admin from "./PortalAdmin";
const roles = ["parent", "student", "teacher", "admin"];
export default function Portal() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [savedRole, setRole] = useStored("role", "parent");
  const [childId, setChild] = useStored("active-child", "aarav");
  const segments = pathname.split("/").filter(Boolean);
  const role = roles.includes(segments[1]) ? segments[1] : savedRole;
  const explicitRole = roles.includes(segments[1]);
  useEffect(() => {
    if (explicitRole && savedRole !== role) setRole(role);
  }, [role, savedRole, explicitRole, setRole]);
  const child =
    role === "student"
      ? children[0]
      : children.find((c) => c.id === childId) || children[0];
  const page = roles.includes(segments[1])
    ? segments[2] || "overview"
    : segments[1] || "overview";
  const id = segments[2];
  const nav =
    role === "admin"
      ? [
          ["Overview", "/portal/admin", LayoutDashboard],
          ["Admissions", "/portal/admin/admissions", Users],
          ["Content studio", "/portal/admin/content", FileText],
          ["Reports & insights", "/portal/admin/reports", BarChart3],
          ["Integrations & settings", "/portal/admin/settings", Settings],
        ]
      : [
          ["Overview", "/portal/" + role, LayoutDashboard],
          ["Attendance", "/portal/attendance", ClipboardCheck],
          ["Progress & marks", "/portal/progress", BarChart3],
          ["Timetable", "/portal/timetable", CalendarDays],
          ["Assignments", "/portal/assignments", BookOpen],
          ...(role === "teacher"
            ? []
            : [["Fees & receipts", "/portal/fees", CreditCard]]),
          ["Messages", "/portal/messages", MessageSquare],
          ["Notifications", "/portal/notifications", Bell],
          ["Parent–teacher meeting", "/portal/ptm", Users],
          ["Leave requests", "/portal/leave", CalendarDays],
          ["Library", "/portal/library", BookOpen],
          ["Transport", "/portal/transport", Bus],
          ["Certificates", "/portal/documents", FileText],
          ["Support & concerns", "/portal/complaints", ShieldCheck],
        ];
  let view: React.ReactNode;
  if (page === "overview")
    view = (
      <>
        <Summary role={role} child={child} />
        {role === "teacher" ? (
          <Attendance role={role} child={child} />
        ) : role === "admin" ? (
          <Admin kind="admissions" />
        ) : (
          <Today child={child} />
        )}
      </>
    );
  else if (
    role === "admin" &&
    ["admissions", "content", "reports", "settings"].includes(page)
  )
    view = <Admin kind={page} />;
  else if (page === "attendance")
    view = <Attendance role={role} child={child} />;
  else if (page === "progress") view = <Progress role={role} child={child} />;
  else if (page === "timetable") view = <Timetable />;
  else if (page === "assignments")
    view = (
      <Assignments
        role={role}
        child={child}
        id={roles.includes(segments[1]) ? segments[3] : id}
      />
    );
  else if (page === "fees" || page === "receipts")
    view =
      role === "teacher" ? (
        <Empty
          title="Outside this preview's scope."
          text="The teacher role does not have finance access."
        />
      ) : (
        <Fees child={child} receipts={page === "receipts"} />
      );
  else if (page === "messages") view = <Messages />;
  else if (page === "notifications") view = <Notifications />;
  else if (["ptm", "leave", "documents", "complaints"].includes(page))
    view = <Requests kind={page} child={child} role={role} />;
  else if (page === "library") view = <Library child={child} />;
  else if (page === "transport") view = <BusTracking />;
  else
    view = (
      <Empty
        title="Portal page not found."
        text="Choose a section in the sidebar to continue."
      />
    );
  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <div className="portal-label">
          <GraduationCap />
          <span>
            THE BLOOMFIELD PORTAL<small>A little closer to school.</small>
          </span>
        </div>
        <label>
          Demo role
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              navigate("/portal/" + e.target.value);
            }}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)} preview
              </option>
            ))}
          </select>
        </label>
        <nav aria-label="Portal navigation">
          {nav.map(([name, url, Icon]) => {
            const I = Icon as typeof BookOpen;
            return (
              <Link
                key={String(url)}
                className={pathname === url ? "active" : ""}
                to={String(url)}
                onClick={() => setRole(role)}
              >
                <I size={18} />
                {String(name)}
              </Link>
            );
          })}
        </nav>
        <Link className="portal-exit" to="/login">
          <LogOut size={18} />
          Leave role preview
        </Link>
        <p>
          Fictional records only.
          <br />
          Role switching is a demo feature.
        </p>
      </aside>
      <div className="portal-main">
        <header className="portal-toolbar">
          <div>
            <span className="breadcrumb">
              School portal <ChevronRight size={14} />{" "}
              {page.replaceAll("-", " ")}
            </span>
            <span className="status">Demo workspace</span>
          </div>
          {role !== "admin" && (
            <label className="child-picker">
              <span className="avatar">{child.initials}</span>
              <select
                aria-label={
                  role === "teacher" ? "Sample learner" : "Linked sample child"
                }
                value={child.id}
                disabled={role === "student"}
                onChange={(e) => setChild(e.target.value)}
              >
                {children.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} · {c.class}
                  </option>
                ))}
              </select>
            </label>
          )}
        </header>
        <div key={role + child.id + page + id} className="portal-content">
          {view}
        </div>
      </div>
    </div>
  );
}
