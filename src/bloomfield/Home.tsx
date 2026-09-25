import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  Heart,
  Leaf,
  Sparkles,
  Play,
  BookOpen,
  Sun,
  Users,
  Palette,
  MoveUpRight,
} from "lucide-react";
import { ButtonLink, TextLink, Eyebrow } from "./shared";
import { programmes, events } from "./data";
import { useLanguage } from "./demo";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
export function Bloom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse cx="50" cy="25" rx="14" ry="24" />
        <ellipse cx="50" cy="75" rx="14" ry="24" />
        <ellipse cx="25" cy="50" rx="24" ry="14" />
        <ellipse cx="75" cy="50" rx="24" ry="14" />
        <ellipse
          cx="32"
          cy="32"
          rx="14"
          ry="23"
          transform="rotate(-45 32 32)"
        />
        <ellipse
          cx="68"
          cy="68"
          rx="14"
          ry="23"
          transform="rotate(-45 68 68)"
        />
        <ellipse cx="68" cy="32" rx="14" ry="23" transform="rotate(45 68 32)" />
        <ellipse cx="32" cy="68" rx="14" ry="23" transform="rotate(45 32 68)" />
      </g>
      <circle cx="50" cy="50" r="14" fill="#163f33" />
    </svg>
  );
}
export default function Home() {
  const [stage, setStage] = useState(0);
  const { hindi } = useLanguage();
  return (
    <>
      <section className="b-hero wrap">
        <div className="hero-copy">
          <div className="open-pill">
            <span />A new chapter · Admissions 2027–28
            <ArrowUpRight size={15} />
          </div>
          <h1>
            {hindi ? (
              <>
                हर बच्चा।
                <br />
                एक नई <span>संभावना।</span>
              </>
            ) : (
              <>
                Little moments.
                <br />
                Big discoveries.
                <br />
                <span>A place to bloom.</span>
              </>
            )}
          </h1>
          <p>
            {hindi
              ? "जिज्ञासु मन, नए दोस्त और सीखने का आनंद। LKG से कक्षा XII तक, हर कदम साथ।"
              : "For curious minds, kind hearts and wonderfully big dreams. A caring school community, from LKG to Class XII."}
          </p>
          <div className="hero-buttons">
            <ButtonLink to="/admissions/apply">
              {hindi ? "अपना सफ़र शुरू करें" : "Begin your journey"}
            </ButtonLink>
            <Link className="hero-visit" to="/visit">
              <span>
                <Play size={14} fill="currentColor" />
              </span>
              Come, meet us
            </Link>
          </div>
          <div className="hero-foot">
            <div className="mini-icon">
              <BookOpen size={20} />
            </div>
            <span>
              CBSE learning, thoughtfully imagined.
              <small>LKG – CLASS XII · FICTIONAL SCHOOL PREVIEW</small>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-main-image"
            src="/images/outdoor.webp"
            alt="Children enjoying a group activity outdoors"
            {...{ fetchpriority: "high" }}
            width="800"
            height="850"
          />
          <div className="photo-top-note">
            <Sun size={18} />A little sunshine. A lot of possibility.
          </div>
          <div className="hero-photo-inset">
            <img
              src="/images/early-years-small.webp"
              alt="A colourful early-years classroom"
            />
            <span>
              Small steps, happy beginnings <Heart size={13} />
            </span>
          </div>
          <div className="hero-sticker">
            <Bloom />
            <span>
              Room to grow.
              <br />
              <b>Space to be you.</b>
            </span>
          </div>
          <span className="photo-credit">
            MOMENTS FROM OUR SAMPLE SCHOOL JOURNAL
          </span>
        </div>
      </section>
      {createElement("school-discovery", { theme: "bloomfield", id: "discovery-studio" })}
      <div className="values-ribbon">
        <span>
          <Leaf />
          Rooted in care
        </span>
        <i>✳</i>
        <span>
          <BookOpen />
          Learning with wonder
        </span>
        <i>✳</i>
        <span>
          <Users />
          Growing together
        </span>
        <i>✳</i>
        <span>
          <Sun />A brighter tomorrow
        </span>
      </div>
      <section className="week-section wrap">
        <div className="week-intro">
          <span className="small-label">
            <CalendarDays size={16} />
            THE SCHOOL DIARY
          </span>
          <h2>
            This week.
            <br />
            <span>And what’s next.</span>
          </h2>
          <TextLink to="/events">The full calendar</TextLink>
        </div>
        <div className="week-events">
          {events.map((event, i) => (
            <Link
              key={event.slug}
              to={"/events/" + event.slug}
              className="week-event"
            >
              <span className={"date-tile date-" + i}>
                <b>{event.date.slice(-2)}</b>OCT
              </span>
              <div>
                <small>{event.category} · Sample event</small>
                <h3>{event.title}</h3>
                <span>10:00 AM · Bloomfield Campus</span>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>
      <Reveal className="learning-section">
        <section className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>A LITTLE WONDER AT EVERY AGE</Eyebrow>
              <h2>
                Every stage. <span>A new possibility.</span>
              </h2>
            </div>
            <p>
              Learning that grows with your child,
              <br />
              with care woven into every day.
            </p>
          </div>
          <div
            className="stage-tabs"
            role="tablist"
            aria-label="Learning stages"
          >
            {programmes.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={stage === i}
                aria-controls="stage-panel"
                id={"stage-" + i}
                onClick={() => setStage(i)}
                className={stage === i ? "active" : ""}
              >
                <span>0{i + 1}</span>
                <div>
                  {p.name}
                  <small>{p.grades}</small>
                </div>
                <ArrowUpRight size={20} />
              </button>
            ))}
          </div>
          <div
            className="stage-feature"
            role="tabpanel"
            id="stage-panel"
            aria-labelledby={"stage-" + stage}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={stage}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.2 }}
                src={
                  "/images/" +
                  ["early-years", "project", "computing", "library"][stage] +
                  ".webp"
                }
                alt={
                  programmes[stage].name + " illustrative learning environment"
                }
                loading="lazy"
              />
            </AnimatePresence>
            <div>
              <span className="tag">
                {programmes[stage].age} · CBSE LEARNING
              </span>
              <h3>{programmes[stage].description}</h3>
              <p>
                Space to ask questions, try something new and learn in your own
                way. Our educators nurture confidence alongside knowledge.
              </p>
              <div className="subject-pills">
                {programmes[stage].subjects.slice(0, 3).map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
              <TextLink to={"/academics/" + programmes[stage].slug}>
                Explore {programmes[stage].name.toLowerCase()}
              </TextLink>
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal className="life-home wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>MORE THAN A SCHOOL DAY</Eyebrow>
            <h2>
              This is what <span>belonging looks like.</span>
            </h2>
          </div>
          <TextLink to="/gallery">Open the school journal</TextLink>
        </div>
        <div className="life-mosaic">
          <Link to="/gallery?category=Arts" className="mosaic-big">
            <img
              src="/images/dance.webp"
              alt="A vibrant group dance performance on stage"
              loading="lazy"
            />
            <div>
              <span>THE ARTS</span>
              <h3>
                A thousand ways
                <br />
                to express yourself.
              </h3>
              <span className="circle-arrow">
                <ArrowUpRight />
              </span>
            </div>
          </Link>
          <Link
            to="/school-life/projects/water-wise"
            className="mosaic-project"
          >
            <img
              src="/images/project.webp"
              alt="Students presenting a working science model"
              loading="lazy"
            />
            <div>
              <span>SMALL IDEAS, BIG IMPACT</span>
              <h3>“What if?” is where it starts.</h3>
              <ArrowUpRight />
            </div>
          </Link>
          <Link to="/clubs" className="mosaic-club">
            <Palette size={32} />
            <h3>
              Find your thing.
              <br />
              Find your people.
            </h3>
            <span>
              Explore clubs & interests
              <ArrowUpRight />
            </span>
            <Bloom />
          </Link>
          <Link to="/gallery?category=Sports" className="mosaic-sport">
            <img
              src="/images/sport.webp"
              alt="A child practising a sport with a teacher"
              loading="lazy"
            />
            <div>
              <span>PLAY. TRY. GROW.</span>
              <h3>Every little win counts.</h3>
              <ArrowUpRight />
            </div>
          </Link>
        </div>
        <div className="photo-note">
          Real moments from supplied photographs. Stories and school identity
          are illustrative.
        </div>
      </Reveal>
      <Reveal className="stories-section wrap">
        <div className="story-photo">
          <img
            src="/images/art.webp"
            alt="Children making art and exploring colours together"
            loading="lazy"
          />
          <span className="paper-note">
            The best part?
            <br />
            <b>We made it together.</b>
            <Heart size={22} />
          </span>
        </div>
        <div className="story-copy">
          <Eyebrow>THE BLOOMFIELD WAY</Eyebrow>
          <h2>
            Known by name.
            <br />
            <span>
              Encouraged to be
              <br />
              themselves.
            </span>
          </h2>
          <p>
            Some days, growth is solving a difficult problem. Other days, it’s
            raising a hand, making a friend or having the courage to try again.
          </p>
          <p>We make room for all of it.</p>
          <TextLink to="/about">Get to know our school</TextLink>
          <div className="story-sign">
            <Heart size={23} />
            <span>
              Care comes first.<small>Our promise to every learner.</small>
            </span>
          </div>
        </div>
      </Reveal>
      <section className="family-home">
        <div className="wrap">
          <div>
            <Eyebrow>WE’RE IN THIS TOGETHER</Eyebrow>
            <h2>
              A little closer
              <br />
              to their school day.
            </h2>
            <p>
              Homework, school updates, conversations and small milestones.
              Everything families need, in one thoughtful space.
            </p>
            <ButtonLink to="/families">Your family hub</ButtonLink>
          </div>
          <div className="family-preview">
            <div className="preview-head">
              <span>
                <span className="avatar">AS</span>
                <b>
                  Aarav’s day<small>Class VI · Sample preview</small>
                </b>
              </span>
              <span className="tag">TUESDAY</span>
            </div>
            <Link to="/portal/assignments">
              <BookOpen />
              <span>
                <b>A question worth exploring</b>
                <small>Science · Water-wise project · Due tomorrow</small>
              </span>
              <ArrowUpRight />
            </Link>
            <Link to="/portal/ptm">
              <Users />
              <span>
                <b>Let’s talk about their progress</b>
                <small>Choose a parent–teacher meeting slot</small>
              </span>
              <ArrowUpRight />
            </Link>
            <Link to="/portal/parent">
              <Heart />
              <span>
                <b>Small steps. Steady progress.</b>
                <small>Explore attendance, learning & school messages</small>
              </span>
              <ArrowUpRight />
            </Link>
            <TextLink to="/login">Step inside the family portal</TextLink>
          </div>
        </div>
      </section>
      <Reveal className="campus-home wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>SPACES FOR EVERY SIDE OF YOU</Eyebrow>
            <h2>
              A campus made <span>for discovery.</span>
            </h2>
          </div>
          <TextLink to="/campus">Take a look around</TextLink>
        </div>
        <div className="campus-trio">
          {[
            ["Learn", "library", "The world, one page at a time.", "library"],
            [
              "Play",
              "outdoor",
              "A little fresh air. A new adventure.",
              "sports-grounds",
            ],
            ["Create", "makers", "Ideas belong in your hands.", "science-wing"],
          ].map(([title, img, text, slug]) => (
            <Link
              key={title}
              to={"/campus?interest=" + title + "&stop=" + slug}
            >
              <div>
                <img
                  src={"/images/" + img + ".webp"}
                  alt={text}
                  loading="lazy"
                />
                <span>
                  {title}
                  <MoveUpRight size={20} />
                </span>
              </div>
              <h3>{text}</h3>
            </Link>
          ))}
        </div>
      </Reveal>
      <section className="admissions-home wrap">
        <div>
          <span className="small-label">YOUR NEXT CHAPTER</span>
          <h2>
            Big decisions.
            <br />
            <span>A friendly first step.</span>
          </h2>
          <p>
            Explore, ask questions, and picture your child here.
            <br />
            We’ll help you find your way.
          </p>
          <ButtonLink to="/admissions">Let’s talk admissions</ButtonLink>
        </div>
        <div className="admission-road">
          {[
            [
              "01",
              "Find their learning stage",
              "From first discoveries to future pathways.",
              "/academics",
            ],
            [
              "02",
              "Get the little details",
              "Eligibility, indicative fees and documents.",
              "/admissions/eligibility",
            ],
            [
              "03",
              "Come and say hello",
              "Choose a time to meet our community.",
              "/visit",
            ],
          ].map(([n, t, p, url]) => (
            <Link to={url} key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
              <ArrowRight size={20} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
