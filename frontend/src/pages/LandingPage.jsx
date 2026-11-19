import { useEffect, useRef, useState } from "react";

const stories = [
  {
    name: "Jyoti Basu",
    role: "A life of public service",
    color: "#1d4e56",
    img: "/stories/jyoti_basu2.webp",
    teaser: "A commitment to serve humanity, beyond a lifetime.",
    years: "1914 – 2010",
    biography:
      "Jyoti Basu was one of India's most influential political leaders and served as Chief Minister of West Bengal from 1977 to 2000. A prominent figure in the Communist movement, he became known for his long public life and his role in shaping the state's political landscape.",
    legacy:
      "His decades in public life were marked by his advocacy for workers' rights, land reforms and democratic governance. He remains one of the most consequential figures in modern West Bengal politics.",
    donation:
      "Basu had pledged his body for medical science in 2003. After his death in 2010, his body was donated to the Anatomy Department of SSKM Hospital, Kolkata, for medical study and research.",
    remembrance:
      "As a Communist, I am pledged to serve humanity till my last breath. I am happy now I will continue to serve even after my death."
  },
  {
    name: "Nanaji Deshmukh",
    role: "A vision of rural transformation",
    color: "#8a765b",
    img: "/stories/nanaji_deshmukh.jpeg",
    teaser: "He believed that India's future began in its villages.",
    years: "1916 – 2010",
    biography:
      "Nanaji Deshmukh was a social reformer, political organiser and the founder of the Deendayal Research Institute. After retiring from active politics, he devoted his life to rural development, education and community-led transformation, particularly around Chitrakoot.",
    legacy:
      "His work focused on village self-reliance, education, healthcare and sustainable livelihoods. He helped establish India's first rural university at Chitrakoot and was awarded the Bharat Ratna posthumously in 2019.",
    donation:
      "In accordance with his wishes, Nanaji's body was donated to AIIMS, New Delhi, in 2010 for medical science.",
    remembrance:
      "I do not live for myself. I stand for those who are impoverished and deprived."
  },
  {
    name: "Justice Leila Seth",
    role: "A life that opened doors",
    color: "#756b75",
    img: "/stories/justice_leila_seth.jpeg",
    teaser: "She made history, and helped make justice more equal.",
    years: "1930 – 2017",
    biography:
      "Justice Leila Seth was a pioneering Indian jurist. She became the first woman to top the London Bar examinations and later became the first woman Chief Justice of a state High Court, serving as Chief Justice of the Himachal Pradesh High Court.",
    legacy:
      "Beyond the courtroom, she championed gender equality and children's rights. She played an important role in the campaign for equal inheritance rights for daughters and wrote several books, including her autobiography, On Balance.",
    donation:
      "In keeping with her wishes, her body was donated to the Army College of Medical Sciences, Delhi, for medical research in 2017.",
    remembrance:
      null
  },
  {
    name: "Somnath Chatterjee",
    role: "A voice in Parliament",
    color: "#526d78",
    img: "/stories/somnath_chatterjee.jpg",
    teaser: "A distinguished parliamentarian remembered for his conviction.",
    years: "1929 – 2018",
    biography:
      "Somnath Chatterjee was a lawyer, parliamentarian and former Speaker of the Lok Sabha. Elected to Parliament ten times, he served as Speaker from 2004 to 2009 and became widely recognised for his command of parliamentary procedure.",
    legacy:
      "His years in Parliament were marked by his legal knowledge, eloquence and commitment to the dignity of the House. His tenure as Speaker also saw him take a stand on the independence of that office.",
    donation:
      "Chatterjee had pledged his body for medical education. Following his death in 2018, his family donated it to SSKM Hospital, Kolkata, for educational and research purposes.",
    remembrance:
      null
  },
  {
    name: "Buddhadeb Bhattacharjee",
    role: "A life of thought and public service",
    color: "#806b60",
    img: "/stories/buddhadeb_bhattacharjee.jpeg",
    teaser: "A public life shaped by politics, literature and ideas.",
    years: "1944 – 2024",
    biography:
      "Buddhadeb Bhattacharjee was a political leader, writer and former Chief Minister of West Bengal. He served as Chief Minister from 2000 to 2011 and was known for his intellectual interests, simplicity and engagement with Bengali literature and culture.",
    legacy:
      "Alongside his political career, he wrote and translated literary works, and remained closely connected to the cultural and intellectual life of Bengal.",
    donation:
      "He had pledged his body through the organisation Ganadarpan in 2006. Following his death in 2024, his body was handed over to NRS Medical College and Hospital, Kolkata, for medical education and research.",
    remembrance:
      null
  },
  {
    name: "Sitaram Yechury",
    role: "A life of dialogue and conviction",
    color: "#657b70",
    img: "/stories/sitaram_yechury.jpeg",
    teaser: "Remembered for his intellect, dialogue and public life.",
    years: "1952 – 2024",
    biography:
      "Sitaram Yechury was an economist, parliamentarian and General Secretary of the Communist Party of India (Marxist). He served as a Rajya Sabha member and became known for his parliamentary interventions, political analysis and ability to engage across ideological differences.",
    legacy:
      "He was a prominent voice in national political debates and advocated secularism, social justice and democratic dialogue throughout his public life.",
    donation:
      "In accordance with his last wish, his family donated his body to AIIMS, New Delhi, in 2024 for teaching and research.",
    remembrance:
      null
  }
];


// These original values are retained for the existing Hear Our Stories panel.
const ORANGE = "#ff6b3f", TEAL = "#1d4e56", INK = "#141414", PAPER = "#f2f1ea";
const display = { fontFamily: "'Anton', Impact, sans-serif" };

const BRAND = {
  ivory: "#F2F0E8", teal: "#214F50", mustard: "#D9C58E",
  blue: "#AABFC0", clay: "#C98269", ink: "#292F2D",
  pale: "#E8EEEA", blush: "#EBDAD2", white: "#F8F7F2"
};

const css = `
  html { scroll-behavior: smooth; }
  .lb-hero-art {
    background:
      radial-gradient(ellipse at 72% 22%, rgba(217,197,142,.82), transparent 28%),
      radial-gradient(ellipse at 30% 72%, rgba(170,191,192,.75), transparent 38%),
      linear-gradient(145deg, #dce6df 0%, #f2e8df 48%, #d7e1dc 100%);
  }
  .lb-grain {
    background-image: radial-gradient(rgba(41,47,45,.07) .55px, transparent .55px);
    background-size: 7px 7px;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  }
`;

function Action({ children, onClick, href, tone = "dark", className = "" }) {
  const palette = {
    dark: "bg-[#214F50] text-white hover:bg-[#173d3e]",
    light: "border border-[#214F50]/25 text-[#214F50] hover:bg-[#E8EEEA]",
    white: "bg-white text-[#292F2D] hover:bg-[#F2F0E8]"
  };
  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98269] focus-visible:ring-offset-2 ${palette[tone]} ${className}`;
  return href
    ? <a href={href} className={cls}>{children}</a>
    : <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.15 });
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

function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.16em] text-[#71827b]">{eyebrow}</p>}
      <h2 className="text-[25px] font-medium leading-[1.2] tracking-[-.035em] text-[#292F2D] sm:text-[29px]">{title}</h2>
      {children && <p className="mt-3 text-[15px] leading-7 text-[#59635f]">{children}</p>}
    </div>
  );
}

function Stories() {
  const [open, setOpen] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <>
      <div className="flex h-[26rem] gap-3 overflow-x-auto pb-2 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stories.map((s, i) => {
          const on = open === i;

          return (
            <button
              key={s.name}
              onClick={() => {
                setOpen(i);
                setSelected(s);
              }}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              aria-expanded={on}
              aria-label={`Read about ${s.name}`}
              style={{
                backgroundColor: s.color,
                backgroundImage: `url("${s.img}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`relative shrink-0 overflow-hidden rounded-[2.5rem] text-left transition-[width] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414] focus-visible:ring-offset-2 ${
                on ? "w-[min(82vw,26rem)]" : "w-16 sm:w-20"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />

              <span
                className={`absolute bottom-0 left-0 block w-[min(82vw,26rem)] p-6 pt-24 text-white transition-opacity duration-500 ${
                  on ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
                }`}
              >
                <span className="block text-[11px] font-medium uppercase tracking-wider text-[#ffb59c]">
                  {s.role}
                </span>

                <span className="mt-1 block text-lg font-semibold">
                  {s.name}
                </span>

                <span className="mt-2 block text-sm leading-6 text-white/85">
                  {s.teaser}
                </span>

                <span className="mt-4 inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-white/75">
                  Read their story ↗
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#101b1d]/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-title"
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#f2f1ea] text-[#141414] shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close story"
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#141414]/80 text-2xl text-white transition hover:bg-[#ff6b3f]"
            >
              ×
            </button>

            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[22rem] md:min-h-full">
                <img
                  src={selected.img}
                  alt={selected.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                <div className="absolute bottom-0 left-0 p-7 text-white sm:p-10">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#ffb59c]">
                    {selected.role}
                  </p>
                  <h2
                    id="story-title"
                    style={display}
                    className="text-4xl uppercase leading-tight sm:text-5xl"
                  >
                    {selected.name}
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    {selected.years}
                  </p>
                </div>
              </div>

              <div className="max-h-[85vh] overflow-y-auto px-7 py-10 sm:px-10 sm:py-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c45c3e]">
                  A life remembered
                </p>

                <p className="mt-5 text-base leading-8 text-[#141414]/80">
                  {selected.biography}
                </p>

                <div className="my-8 border-t border-[#141414]/15" />

                <h3
                  style={display}
                  className="text-2xl uppercase tracking-wide"
                >
                  The legacy they left
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#141414]/75">
                  {selected.legacy}
                </p>

                <div className="my-8 border-t border-[#141414]/15" />

                <div className="rounded-2xl bg-[#1d4e56] p-6 text-white sm:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffb59c]">
                    The gift they left behind
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/90">
                    {selected.donation}
                  </p>
                </div>

                {selected.remembrance && (
                  <blockquote className="mt-8 border-l-2 border-[#ff6b3f] pl-5">
                    <p className="text-lg italic leading-8 text-[#1d4e56]">
                      “{selected.remembrance}”
                    </p>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#141414]/50">
                      {selected.name}
                    </p>
                  </blockquote>
                )}
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}


function LandingPage({ onSignup, onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const steps = [
    ["Understand", "Learn what whole-body donation involves and how it differs from organ donation."],
    ["Discuss", "Talk with your family so they understand your wishes and know where to find the relevant information."],
    ["Contact an institution", "Ask a medical college or anatomy department about its eligibility, registration and acceptance procedures."],
    ["Record your intention", "Use LifeBridge to document your stated intention and the witness details supported by the portal."]
  ];
  const faqs = [
    ["Who can donate their body?", "Eligibility is determined by the medical institution that would receive the donation. Age limits, medical exclusions and documentation requirements can differ, so check the policy of the institution you have in mind."],
    ["Does recording an intention guarantee acceptance?", "No. A recorded intention is not a guarantee of acceptance. The receiving institution makes the final decision at the time of death, based on its policy, circumstances and capacity."],
    ["Should I tell my family about my decision?", "Yes. Discussing your wishes with your family is strongly recommended. They may need to contact the institution and help complete the required steps when the time comes."],
    ["Can I change my mind later?", "A person may reconsider their wishes. If you have registered directly with a medical institution, contact it to update or withdraw your registration. You can also review the intention recorded in your LifeBridge account."],
    ["Is whole-body donation the same as organ donation?", "No. Organ and tissue donation is intended for transplantation, while whole-body donation is generally intended for anatomical education, medical training and research. The procedures are different; ask the relevant institutions whether both wishes can be accommodated."],
    ["What happens to the body after donation?", "The institution uses donated bodies according to its own procedures and applicable requirements. The period of use, final arrangements and whether ashes or remains are returned to the family vary between institutions."],
    ["Are there any costs?", "Arrangements differ between institutions. Ask the anatomy department about transport, documentation, preservation and any costs before making a decision."]
  ];

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#F2F0E8] font-sans text-[#292F2D] antialiased">
      <style>{css}</style>

      {/* Compact navigation */}
      <header className="relative z-30 bg-[#F2F0E8] px-5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between border-b border-[#214F50]/15 py-3">
          <a href="#top" aria-label="LifeBridge home" className="flex items-center gap-2.5 text-[#214F50]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#214F50] text-sm text-white">L</span>
            <span className="text-[18px] font-semibold tracking-[-.04em]">LifeBridge</span>
          </a>
          <div className="hidden items-center gap-6 text-[13px] text-[#46534e] lg:flex">
            <a href="#understanding" className="hover:text-[#C98269]">About donation</a><a href="#education" className="hover:text-[#C98269]">Medical education</a><a href="#process" className="hover:text-[#C98269]">The process</a><a href="#stories" className="hover:text-[#C98269]">Stories</a><a href="#questions" className="hover:text-[#C98269]">FAQs</a>
          </div>
          <div className="hidden items-center gap-3 sm:flex"><button onClick={onLogin} className="px-3 py-2 text-[13px] font-medium text-[#214F50] hover:underline">Log in</button><Action onClick={onSignup}>Create an account</Action></div>
          <button type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-[#214F50]/25 text-[#214F50] lg:hidden"><span className="text-xl">{menuOpen ? "×" : "☰"}</span></button>
        </nav>
        {menuOpen && <div className="absolute left-0 right-0 top-full z-40 grid gap-3 border-b border-[#214F50]/15 bg-[#F2F0E8] px-6 py-5 text-sm shadow-lg lg:hidden"><a href="#understanding" onClick={() => setMenuOpen(false)}>About donation</a><a href="#education" onClick={() => setMenuOpen(false)}>Medical education</a><a href="#process" onClick={() => setMenuOpen(false)}>The process</a><a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a><a href="#questions" onClick={() => setMenuOpen(false)}>FAQs</a><button onClick={onLogin} className="text-left">Log in</button><button onClick={onSignup} className="text-left font-semibold text-[#214F50]">Create an account ↗</button></div>}
      </header>

      {/* Hero: image and message are one composition */}
      <section className="relative mx-5 mt-4 min-h-[500px] overflow-hidden rounded-[1.8rem] bg-[#214F50] sm:mx-8 lg:mx-12 lg:min-h-[570px]">
        <img src="/images/hero_hands.png" alt="Two hands gently reaching towards one another" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#183f40]/95 via-[#183f40]/78 to-[#183f40]/5" />
        <div className="relative z-10 flex min-h-[500px] max-w-[1440px] items-center px-7 py-12 sm:px-12 lg:min-h-[570px] lg:px-20">
          <div className="max-w-[650px] text-white">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.22em] text-[#E7CFA0]">Understanding whole-body donation</p>
            <h1 className="font-serif text-[clamp(2.8rem,5.4vw,5.4rem)] leading-[.98] tracking-[-.045em]">A decision that begins with understanding.</h1>
            <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-white/85 sm:text-[18px] sm:leading-8">Whole-body donation is a personal choice that can contribute to medical education, training and research. Learn what it involves before deciding whether it is right for you.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3"><Action onClick={onSignup} tone="white">Explore your options</Action><a href="#understanding" className="px-3 py-2 text-sm font-medium text-white underline decoration-[#C98269] underline-offset-4">Understand the process ↓</a></div>
          </div>
        </div>
        <div className="absolute bottom-5 right-6 hidden rounded-full border border-white/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/85 md:block">An informed, voluntary choice</div>
      </section>

      {/* Intro strip */}
      <section className="relative z-10 mx-5 -mt-1 grid gap-5 border-b border-[#214F50]/20 px-2 py-8 sm:mx-8 sm:grid-cols-[.8fr_1.2fr] sm:px-4 lg:mx-12 lg:gap-12 lg:py-10">
        <p className="font-serif text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.08] tracking-[-.03em] text-[#214F50]">A personal decision.<br/>A process worth knowing.</p>
        <div className="flex flex-col justify-center gap-3 sm:max-w-3xl"><p className="text-[15px] leading-7 text-[#46534e]">Choosing to donate one's body after death involves more than expressing a wish. It means understanding how medical institutions receive donations, what their requirements are and how family members may be involved.</p><p className="text-[13px] leading-6 text-[#68746f]">LifeBridge brings together introductory information and a place to record your stated intention. It does not replace registration with a medical institution.</p></div>
      </section>

      {/* Hear Our Stories: original layout and alignment restored */}
      <section id="stories" className="mx-auto max-w-7xl px-6 pb-14 pt-2 sm:px-10 sm:pb-16">
        <Reveal className="mx-auto mb-8 max-w-xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.16em] text-[#71827b]">Personal accounts</p>
          <h2 className="font-serif text-[34px] tracking-[-.025em] text-[#292F2D] sm:text-[39px]">Hear Our Stories</h2>
          <p className="mt-3 text-[15px] leading-7 text-[#68746f]">Some chose it for themselves. Others carried out the wishes of someone they loved.</p>
        </Reveal>
        <div className="mx-auto w-full max-w-[1100px]">
          <Stories />
        </div>
        <div className="mt-7 text-center"><Action onClick={onSignup}>Share your story</Action></div>
      </section>

      {/* Understanding: compact, coloured split panel */}
      <section id="understanding" className="scroll-mt-8 bg-[#214F50] px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto grid max-w-[1440px] gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
          <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#D9C58E]">01 / Understanding donation</p><h2 className="max-w-[540px] font-serif text-[clamp(2.25rem,4vw,3.8rem)] leading-[1.02] tracking-[-.04em]">What does whole-body donation mean?</h2></div>
          <div className="grid gap-5 sm:grid-cols-[1.1fr_.9fr] sm:gap-8"><p className="text-[15px] leading-7 text-white/85">It is a voluntary decision to make one's body available to a medical institution after death. Depending on the institution's programme, donated bodies may be used for anatomical study, medical training and research.</p><div className="border-l-2 border-[#C98269] pl-5"><p className="font-serif text-[23px] leading-tight text-[#E8D8B6]">A personal decision, made with care.</p><p className="mt-2 text-[13px] leading-6 text-white/70">The institution's own eligibility criteria, consent process and acceptance policy should always be understood in advance.</p></div></div>
        </div>
      </section>

      {/* Education: image and text share a tight, editorial layout */}
      <section id="education" className="scroll-mt-8 bg-[#F8F7F2] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto grid max-w-[1440px] items-center gap-7 lg:grid-cols-[1fr_.88fr] lg:gap-14">
          <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a705e]">02 / Medical education</p><h2 className="max-w-[620px] font-serif text-[clamp(2.25rem,4vw,3.8rem)] leading-[1.02] tracking-[-.04em] text-[#214F50]">Learning the human body beyond the page.</h2><p className="mt-5 max-w-[650px] text-[15px] leading-7 text-[#46534e]">Anatomy is a foundation of medical education. Studying the human body directly helps students understand spatial relationships and natural variations that diagrams, models and imaging cannot fully reproduce on their own.</p>
            <div className="mt-6 grid grid-cols-3 border-y border-[#214F50]/20 py-4"><div className="pr-3"><p className="font-serif text-[21px] text-[#214F50]">Study</p><p className="mt-1 text-[11px] leading-5 text-[#68746f]">Anatomical structures</p></div><div className="border-l border-[#214F50]/15 px-3"><p className="font-serif text-[21px] text-[#214F50]">Practice</p><p className="mt-1 text-[11px] leading-5 text-[#68746f]">Clinical and surgical skills</p></div><div className="border-l border-[#214F50]/15 pl-3"><p className="font-serif text-[21px] text-[#214F50]">Research</p><p className="mt-1 text-[11px] leading-5 text-[#68746f]">Institution-led inquiry</p></div></div><p className="mt-3 text-[11px] leading-5 text-[#7a827e]">The uses of donated bodies depend on the institution's teaching and research policies.</p>
          </div>
          <div className="relative"><div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-[3rem] border-l-2 border-t-2 border-[#C98269]"/><div className="relative aspect-[5/4] overflow-hidden rounded-[46%_8%_8%_8%/12%_12%_12%_12%] bg-[#D9C58E]"><img src="/images/students.png" alt="Medical students studying anatomy together" className="h-full w-full object-cover"/></div><p className="mt-2 text-right text-[10px] font-semibold uppercase tracking-[.16em] text-[#71827b]">Learning through anatomical study</p></div>
        </div>
      </section>

      {/* Distinction: full-width two-tone comparison */}
      <section className="relative overflow-hidden bg-[#DCE5E0] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-[1440px]"><div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#8a765b]">03 / Two different purposes</p><h2 className="max-w-[700px] font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] tracking-[-.04em] text-[#214F50]">Not the same kind of donation.</h2></div><p className="max-w-sm text-[13px] leading-6 text-[#59635f]">Both involve a considered decision, but they serve different purposes and follow different procedures.</p></div>
          <div className="grid overflow-hidden rounded-[1.4rem] md:grid-cols-2"><div className="bg-[#214F50] p-6 text-white sm:p-8"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#D9C58E]">Whole-body donation</p><h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.7rem)] leading-tight">Education and research</h3><p className="mt-3 max-w-lg text-[14px] leading-7 text-white/80">Generally supports anatomical education, medical training and research through a medical institution.</p></div><div className="bg-[#EBDAD2] p-6 text-[#292F2D] sm:p-8"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a6c5b]">Organ and tissue donation</p><h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.7rem)] leading-tight text-[#214F50]">Transplantation</h3><p className="mt-3 max-w-lg text-[14px] leading-7 text-[#59635f]">Aims to provide organs or tissues for transplantation to people who need them.</p></div></div>
          <p className="mt-4 max-w-4xl border-l-2 border-[#C98269] pl-4 text-[12px] leading-6 text-[#59635f]">The procedures and eligibility requirements differ. If you wish to consider both, speak with the relevant donation organisations and medical institutions.</p>
        </div>
      </section>

      {/* Process: connected horizontal steps */}
      <section id="process" className="scroll-mt-8 bg-[#F2F0E8] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a705e]">04 / The process</p><h2 className="max-w-[720px] font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02] tracking-[-.04em] text-[#214F50]">A decision, approached one step at a time.</h2><p className="mt-3 max-w-2xl text-[14px] leading-6 text-[#59635f]">A general outline. Registration, documentation and acceptance procedures vary by institution.</p></div><a href="#questions" className="shrink-0 text-[13px] font-semibold text-[#214F50] underline decoration-[#C98269] underline-offset-4">Read common questions ↗</a></div>
          <div className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title, body], i) => <div key={title} className={`relative border-t-2 ${i===0?'border-[#C98269]':'border-[#214F50]/25'} py-4 pr-6 ${i>0?'lg:pl-5':''}`}><span className="font-serif text-[30px] leading-none text-[#C98269]">0{i+1}</span><h3 className="mt-3 font-serif text-[22px] text-[#214F50]">{title}</h3><p className="mt-2 max-w-xs text-[13px] leading-6 text-[#59635f]">{body}</p></div>)}</div>
          <p className="mt-5 bg-[#E8EEEA] px-5 py-4 text-[12px] leading-6 text-[#59635f]"><strong className="font-semibold text-[#292F2D]">Please note:</strong> LifeBridge records an individual's stated intention and the witness details supported by the portal. It is not a medical institution, and this record does not replace the receiving institution's registration or consent process.</p>
        </div>
      </section>

      {/* Considerations: compact editorial list */}
      <section className="bg-[#EBDAD2] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"><div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-12"><div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a6c5b]">05 / Before you decide</p><h2 className="max-w-[470px] font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.02] tracking-[-.04em] text-[#214F50]">A few things worth discussing.</h2><p className="mt-4 max-w-sm text-[14px] leading-6 text-[#59635f]">Take time to understand the practical details. The institution you approach should be able to explain its own policy.</p></div><div className="grid gap-x-8 sm:grid-cols-2">{[["Consent","Make sure the decision is informed and voluntary, without pressure."],["Family","Tell your family about your wishes and where you have recorded them."],["Eligibility","Ask about medical exclusions, age requirements and acceptance conditions."],["Use and preservation","Understand how the institution uses, stores and cares for donated bodies."],["Final arrangements","Ask what happens to remains or ashes and what arrangements are possible."],["Practical steps","Confirm whom the family should contact, what documents are needed and whether any costs apply."]].map(([title,body],i)=><div key={title} className="flex gap-3 border-t border-[#214F50]/20 py-3"><span className="pt-0.5 font-serif text-[17px] text-[#C98269]">0{i+1}</span><div><h3 className="font-serif text-[20px] text-[#214F50]">{title}</h3><p className="mt-1 text-[13px] leading-6 text-[#59635f]">{body}</p></div></div>)}</div></div></section>

      {/* FAQs */}
      <section id="questions" className="scroll-mt-8 bg-[#214F50] px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-14"><div className="mx-auto grid max-w-[1440px] gap-7 lg:grid-cols-[.72fr_1.28fr] lg:gap-14"><div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#D9C58E]">06 / Common questions</p><h2 className="max-w-[470px] font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.02] tracking-[-.04em]">Things people often want to know.</h2><p className="mt-4 max-w-sm text-[14px] leading-6 text-white/70">These answers are general information. Always confirm the details with the medical institution concerned.</p></div><div className="border-t border-white/25">{faqs.map(([q,a],i)=><div key={q} className="border-b border-white/20"><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?-1:i)} className="flex w-full items-center justify-between gap-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9C58E]"><span className="font-serif text-[18px] sm:text-[20px]">{q}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/35 text-[18px]">{openFaq===i?"−":"+"}</span></button>{openFaq===i&&<p className="max-w-2xl pb-4 pr-10 text-[13px] leading-6 text-white/75">{a}</p>}</div>)}</div></div></section>

      {/* About and closing */}
      <section className="bg-[#F8F7F2] px-5 py-10 sm:px-8 lg:px-12 lg:py-14"><div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-14"><div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#9a705e]">About LifeBridge</p><h2 className="max-w-[470px] font-serif text-[clamp(2.1rem,3.5vw,3.2rem)] leading-[1.02] tracking-[-.04em] text-[#214F50]">Information first. Decisions at your pace.</h2></div><div className="text-[14px] leading-7 text-[#59635f]"><p>LifeBridge is a body donation awareness and facilitation initiative. It provides educational information and a space for individuals to record their stated donation intentions, with witness details supported by the portal.</p><p className="mt-3">LifeBridge is not itself a medical institution and does not accept or receive donated bodies. It currently has no registered medical institutions on the platform. Recording an intention here should not be understood as confirmed registration with, or acceptance by, a medical college.</p></div></div>
        <div className="mx-auto mt-8 flex max-w-[1440px] flex-col gap-4 border-t border-[#214F50]/20 pt-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-serif text-[clamp(1.7rem,3vw,2.5rem)] leading-tight text-[#214F50]">Take the time to understand your options.</h2><p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#68746f]">Explore the information, discuss your questions with your family and consult a medical institution before making a decision.</p></div><Action onClick={onSignup}>Create an account</Action></div>
      </section>

      <footer className="bg-[#E8EEEA] px-5 py-6 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><a href="#top" className="text-[18px] font-semibold tracking-[-.03em] text-[#214F50]">LifeBridge</a><p className="mt-1 text-[11px] text-[#68746f]">Information and facilitation for whole-body donation.</p></div><div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#59635f]"><a href="#understanding">Understanding donation</a><a href="#process">The process</a><a href="#stories">Hear Our Stories</a><a href="#questions">FAQs</a></div></div><div className="mx-auto mt-4 max-w-[1440px] border-t border-[#214F50]/10 pt-3 text-[10px] leading-5 text-[#7a827e]">LifeBridge is an informational and facilitation platform, not a substitute for a medical institution. Registration, eligibility, acceptance and final arrangements are determined by the institution and applicable requirements.</div></footer>
    </main>
  );
}

export default LandingPage;
