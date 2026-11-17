import { useEffect, useRef, useState } from "react";

// ye baad mein edit hoga
const HERO_IMAGE = null; // need to find a wide picture of surgeons in teal scrubs operating or smth like that
const SAMPLE = true; // stories pe kuch add ho jaye to false kar dena aur stories ke liye photos bhi chahiye

const stories = [
  { name: "Sample donor", role: "Donor, in her own words", color: "#2f7f86", img: null,
    text: "I spent forty years teaching biology. Giving my body to a medical college felt like one more lesson." },
  { name: "Sample family", role: "A donor's son", color: "#e58b6a", img: null,
    text: "My father filled in the forms years ago and told us once. When the time came, we knew exactly what to do." },
  { name: "Sample donor", role: "Donor, in his own words", color: "#4b7f8c", img: null,
    text: "I have no use for it afterwards. A student does." },
  { name: "Sample family", role: "A donor's daughter", color: "#c9a45c", img: null,
    text: "The college held a ceremony for the families. I did not expect to feel so proud." },
  { name: "Sample family", role: "A donor's wife", color: "#6f9a8f", img: null,
    text: "He always said he wanted to be useful. He still is." },
  { name: "Sample donor", role: "Donor, in her own words", color: "#d4745a", img: null,
    text: "I told my family early, so nobody would be surprised or have to decide for me." },
];

const doctors = [
  { name: "Dr. Name Surname", role: "Professor of Anatomy, your institute",
    quote: "Every first-year remembers their first dissection. They also remember who made it possible." },
  { name: "Dr. Name Surname", role: "Consultant Surgeon, your hospital",
    quote: "A surgeon's hands learn the body long before they touch a patient. Donors give us that time." },
];

const steps = [
  ["Read", "Plain explanations of how donation works, who can take part, and what happens afterward."],
  ["Decide", "Take your time. Nothing here asks you to commit before you feel sure."],
  ["Talk", "The people closest to you should hear it from you first. We help you find the words."],
  ["Write it down", "Your wishes are recorded, so no one has to guess when the time comes."],
];

const questions = [
  ["Who can donate", "Eligibility depends on the institution that receives the donation. We explain the usual conditions and point you to the right place to confirm yours."],
  ["Changing your mind", "A decision made today can be withdrawn or updated whenever you choose."],
  ["What your family does", "Very little, if you have planned ahead. That is the reason this page exists."],
  ["Costs", "Costs vary by institution. We list what to ask so there are no surprises for your family."],
];

// ───────── Look ─────────
const ORANGE = "#ff6b3f", TEAL = "#1d4e56", INK = "#141414", PAPER = "#f2f1ea";
const display = { fontFamily: "'Anton', Impact, sans-serif" };
const css = `
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes settle{from{transform:scale(1.07)}to{transform:scale(1)}}
.rise{animation:rise .9s cubic-bezier(.2,.7,.2,1) both}
.settle{animation:settle 2.6s ease-out both}
@media (prefers-reduced-motion:reduce){.rise,.settle{animation:none}}`;

function Bars({ className = "", color = ORANGE }) {
  const h = [30, 52, 72, 88, 100, 88, 72, 52, 30];
  return (
    <svg viewBox="0 0 90 100" className={className} aria-hidden="true">
      {h.map((v, i) => <rect key={i} x={i * 10 + 1} y={(100 - v) / 2} width="6" height={v} rx="3" fill={color} />)}
    </svg>
  );
}

function Pill({ children, onClick, href, variant = "solid", className = "" }) {
  const look = {
    solid: "bg-[#ff6b3f] text-white hover:bg-[#ec5a2d]",
    outline: "border border-[#141414] hover:bg-[#141414] hover:text-white",
    light: "border border-white/70 text-white hover:bg-white hover:text-[#141414]",
    dark: "bg-[#141414] text-white hover:bg-black",
  }[variant];
  const cls = `inline-flex items-center justify-center rounded-full px-9 py-4 text-xs font-medium uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff6b3f] ${look} ${className}`;
  return href ? <a href={href} className={cls}>{children}</a> : <button onClick={onClick} className={cls}>{children}</button>;
}

// Fades an element in once, the first time it scrolls into view.
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

// Row of tall pills. The open one widens to show the story.
function Stories() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex h-[26rem] gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {stories.map((s, i) => {
        const on = open === i;
        return (
          <button key={i} onClick={() => setOpen(i)} onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)} aria-expanded={on}
            style={{ backgroundColor: s.color, backgroundImage: s.img ? `url(${s.img})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}
            className={`relative shrink-0 overflow-hidden rounded-[2.5rem] text-left transition-[width] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414] focus-visible:ring-offset-2 ${on ? "w-[min(82vw,26rem)]" : "w-16 sm:w-20"}`}>
            {!s.img && <span style={display} className="absolute inset-x-0 top-6 text-center text-3xl text-white/40">{s.name[7]?.toUpperCase()}</span>}
            <span className={`absolute bottom-0 left-0 block w-[min(82vw,26rem)] bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-24 text-white transition-opacity duration-500 ${on ? "opacity-100 delay-200" : "pointer-events-none opacity-0"}`}>
              {SAMPLE && <span className="mb-3 inline-block rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium text-[#141414]">Sample</span>}
              <span className="block text-[11px] font-medium uppercase tracking-wider text-[#ffb59c]">{s.role}</span>
              <span className="mt-1 block text-lg font-semibold">{s.name}</span>
              <span className="mt-2 block text-sm leading-6 text-white/85">{s.text}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function LandingPage({ onSignup, onLogin }) {
  return (
    <main style={{ fontFamily: "'Inter Tight', system-ui, sans-serif", backgroundColor: PAPER, color: INK }} className="min-h-screen antialiased">
      <style>{css}</style>

      {/* Hero: the photo does the talking */}
      <header className="relative flex min-h-[100svh] flex-col overflow-hidden text-white" style={{ backgroundColor: TEAL }}>
        <div className="settle absolute inset-0">
          {HERO_IMAGE
            ? <img src={HERO_IMAGE} alt="Surgeons in teal scrubs operating" className="h-full w-full object-cover" />
            : <div className="h-full w-full" style={{ background: "radial-gradient(circle at 70% 30%, #3f8a91 0, transparent 45%), radial-gradient(circle at 20% 60%, #2a6a73 0, transparent 50%), #1d4e56" }} />}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2f35] via-[#0f2f35]/40 to-[#0f2f35]/20" />

        <nav className="relative z-10 mx-auto mt-5 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-md sm:w-[calc(100%-5rem)]">
          <a href="#" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <Bars className="h-6 w-6" />
            <span style={display} className="text-lg uppercase tracking-wide">LifeBridge</span>
          </a>
          <div className="hidden gap-8 text-[11px] font-medium uppercase tracking-wider md:flex">
            {[["Why it matters", "#why"], ["Stories", "#stories"], ["Doctors", "#doctors"], ["Process", "#process"]].map(([t, h]) => (
              <a key={h} href={h} className="opacity-90 hover:text-[#ffb59c] hover:opacity-100">{t}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onLogin} className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider hover:text-[#ffb59c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Log in</button>
            <button onClick={onSignup} className="rounded-full border border-white/70 px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider transition hover:bg-white hover:text-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Sign up</button>
          </div>
        </nav>

        <div className="relative z-10 mx-auto mt-auto w-full max-w-7xl px-6 pb-14 pt-32 sm:px-10 sm:pb-20">
          <h1 style={{ ...display, fontSize: "clamp(3rem, 8.5vw, 8rem)", lineHeight: 0.95, animationDelay: ".15s" }} className="rise max-w-5xl uppercase">
            What the body teaches, a doctor carries for life
          </h1>
          <p style={{ animationDelay: ".35s" }} className="rise mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
            Donated bodies are how medical students learn anatomy and how surgeons rehearse what they will one day do for real. LifeBridge guides you and your family through the process.
          </p>
          <div style={{ animationDelay: ".55s" }} className="rise mt-8 flex flex-wrap gap-4">
            <Pill onClick={onSignup}>Get started</Pill>
            <Pill href="#stories" variant="light">Read the stories</Pill>
          </div>
        </div>
      </header>

      {/* Why it matters */}
      <section id="why" className="mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:px-10 lg:grid-cols-2">
        <Reveal>
          <h2 style={display} className="text-5xl uppercase leading-[0.98] sm:text-6xl">
            Every future doctor learns from <span style={{ color: ORANGE }}>someone</span> first
          </h2>
        </Reveal>
        <Reveal delay={150} className="space-y-5 text-base leading-7 text-[#141414]/75">
          <p>Medical schools rely on donated bodies to teach anatomy, because no diagram shows how a real body is put together. Surgeons use the same gift to rehearse procedures before they ever operate on a patient.</p>
          <p>Donation is a personal decision with practical details attached, and most families have never been walked through them. That is the gap LifeBridge fills.</p>
        </Reveal>
      </section>

      {/* Stories */}
      <section id="stories" className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
        <Reveal className="mx-auto mb-12 max-w-xl text-center">
          <h2 style={display} className="text-5xl uppercase sm:text-6xl">Here our <span style={{ color: ORANGE }}>stories</span></h2>
          <p className="mt-4 text-sm leading-6 text-[#141414]/70">Some chose it for themselves. Others carried out the wishes of someone they loved.</p>
        </Reveal>
        <Stories />
        <div className="mt-10 text-center"><Pill onClick={onSignup}>Share your story</Pill></div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="px-6 py-24 text-white sm:px-10" style={{ backgroundColor: TEAL }}>
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 style={display} className="text-5xl uppercase sm:text-6xl">A word from the <span style={{ color: "#ff9a7a" }}>doctors</span></h2></Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            {doctors.map((d, i) => (
              <Reveal key={i} delay={i * 150}>
                <figure>
                  <span style={display} className="block text-7xl leading-none text-[#ff9a7a]" aria-hidden="true">”</span>
                  <blockquote className="mt-2 max-w-lg text-xl leading-8 sm:text-2xl sm:leading-9">{d.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    <span className="h-12 w-12 shrink-0 rounded-full bg-white/20" aria-hidden="true" />
                    <span className="text-sm">
                      <span className="block font-semibold">{d.name}</span>
                      <span className="text-white/70">{d.role}</span>
                      {SAMPLE && <span className="ml-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#141414]">Sample</span>}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <Reveal><h2 style={display} className="text-5xl uppercase sm:text-6xl">The process, <span style={{ color: ORANGE }}>step by step</span></h2></Reveal>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <Reveal delay={i * 120} className="border-t border-[#141414] pt-5">
                <span style={{ ...display, color: ORANGE }} className="text-5xl leading-none">{i + 1}</span>
                <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-wider">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-[#141414]/70">{d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Questions */}
      <section id="questions" className="mx-auto max-w-3xl px-6 pb-24 sm:px-10">
        <h2 style={display} className="text-4xl uppercase sm:text-5xl">Questions people ask <span style={{ color: ORANGE }}>first</span></h2>
        <div className="mt-8 border-t border-[#141414]/20">
          {questions.map(([q, a]) => (
            <details key={q} className="group border-b border-[#141414]/20 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]">
                {q}<span aria-hidden="true" className="text-base transition-transform duration-300 group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[#141414]/70">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing band */}
      <section className="px-4 sm:px-10">
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 overflow-hidden px-8 py-16 sm:flex-row sm:items-center sm:px-16 sm:py-20" style={{ backgroundColor: ORANGE }}>
          <Bars color={PAPER} className="absolute -left-6 -top-6 h-40 w-40 opacity-20" />
          <h2 style={display} className="relative max-w-xl text-5xl uppercase leading-[0.95] sm:text-7xl">Start when you are ready</h2>
          <Pill onClick={onSignup} variant="dark" className="relative">Create an account</Pill>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-[11px] uppercase tracking-wider text-[#141414]/60 sm:px-10">
        <span className="flex items-center gap-2"><Bars className="h-4 w-4" /> LifeBridge</span>
        <span>A student project built around dignity and care</span>
      </footer>
    </main>
  );
}

export default LandingPage;