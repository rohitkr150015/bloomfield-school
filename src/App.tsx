import { lazy, Suspense, Component, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { SiteLayout, DemoProvider } from "./bloomfield/shared";
import Home from "./bloomfield/Home";
const Public = lazy(() => import("./bloomfield/Public"));
const Experiences = lazy(() => import("./bloomfield/Experiences"));
const Admissions = lazy(() => import("./bloomfield/Admissions"));
const Portal = lazy(() => import("./bloomfield/Portal"));
class Recovery extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="page">
        <h1>Let’s try that again.</h1>
        <p>
          This page could not load. Your saved demo drafts are still on this
          device.
        </p>
        <button className="button" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <MotionConfig reducedMotion="user">
          <SiteLayout>
            <Recovery>
              <Suspense
                fallback={
                  <div className="page loading" role="status">
                    <div className="loading-leaf" />
                    Loading your next discovery…
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  {[
                    "gallery",
                    "school-life",
                    "community",
                    "families",
                    "academics",
                    "campus",
                  ].map((path) => (
                    <Route
                      key={path}
                      path={`/${path}`}
                      element={<Experiences />}
                    />
                  ))}
                  <Route path="/admissions/*" element={<Admissions />} />
                  <Route path="/visit" element={<Admissions />} />
                  <Route path="/portal/*" element={<Portal />} />
                  <Route path="*" element={<Public />} />
                </Routes>
              </Suspense>
            </Recovery>
          </SiteLayout>
        </MotionConfig>
      </DemoProvider>
    </BrowserRouter>
  );
}
