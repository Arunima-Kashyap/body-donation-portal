
import { display, serif } from "./ui";

const guides = [
  {
    id: "understanding",
    number: "01",
    category: "THE BASICS",
    title: "Understanding Body Donation",
    description: "What whole-body donation means, how it differs from organ donation, and what generally happens after a person expresses an intention to donate.",
    reading: "5 min read",
    accent: "sage",
  },
  {
    id: "education",
    number: "02",
    category: "MEDICAL EDUCATION",
    title: "The Role of Anatomy in Medicine",
    description: "How donated bodies contribute to anatomical learning, medical training and a deeper understanding of the human body.",
    reading: "4 min read",
    accent: "clay",
  },
  {
    id: "ethics",
    number: "03",
    category: "ETHICS & CONSENT",
    title: "Consent, Choice & Dignity",
    description: "Informed consent, personal autonomy, ethical responsibilities, privacy and the questions a donor should feel able to ask.",
    reading: "5 min read",
    accent: "blue",
  },
  {
    id: "institutions",
    number: "04",
    category: "LAW & PROCEDURE",
    title: "Institutions, Law & Acceptance",
    description: "The legal framework in Odisha, institutional procedures, acceptance decisions and what to clarify before registering.",
    reading: "7 min read",
    accent: "teal",
  },
  {
    id: "families",
    number: "05",
    category: "FAMILY GUIDANCE",
    title: "A Guide for Families",
    description: "How to communicate a donation decision, prepare documents, contact an institution and make alternative arrangements.",
    reading: "5 min read",
    accent: "sage",
  },
  {
    id: "questions",
    number: "06",
    category: "QUICK REFERENCE",
    title: "Frequently Asked Questions",
    description: "Direct answers to common questions about whole-body donation and what the LifeBridge portal does—and does not—do.",
    reading: "6 min read",
    accent: "clay",
  },
];

function Eyebrow({ children, light = false }) {
  return (
    <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${light ? "text-[#D9C58E]" : "text-[#9A6957]"}`}>
      {children}
    </p>
  );
}

function GuideCard({ guide, onOpenGuide }) {
  const accents = {
    sage: "#AABFC0",
    clay: "#C98269",
    blue: "#AABFC0",
    teal: "#214F50",
  };

  return (
    <button
      type="button"
      onClick={() => onOpenGuide(guide.id)}
      className="group relative flex min-h-[205px] flex-col overflow-hidden border border-[#DCDDD4] bg-[#F8F7F2] p-5 text-left transition-colors duration-300 hover:border-[#AABFC0] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214F50] md:min-h-[215px] md:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-14 h-36 w-36 rounded-full opacity-[0.13] transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: accents[guide.accent] }}
      />

      <div className="relative z-10 grid flex-1 grid-cols-[3.3rem_minmax(0,1fr)] gap-4">
        <div className="border-r border-[#C98269]/50 pr-3">
          <span style={display} className="text-3xl leading-none text-[#A59D87] md:text-4xl">
            {guide.number}
          </span>
        </div>

        <div className="flex min-w-0 flex-col">
          <Eyebrow>{guide.category}</Eyebrow>

          <h3 style={serif} className="mt-2.5 max-w-sm text-[21px] leading-[1.16] text-[#214F50] md:text-[23px]">
            {guide.title}
          </h3>

          <p className="mt-3 max-w-sm text-[13px] leading-[1.65] text-[#68716D]">
            {guide.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <span className="text-[13px] font-medium text-[#214F50] transition-colors group-hover:text-[#9A6957]">
              Read the guide
            </span>
            <span className="text-[11px] text-[#68716D]">{guide.reading}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Resources({ onOpenGuide }) {
  return (
    <div className="overflow-hidden bg-[#F8F7F2] text-[#292F2D]">
      <header className="relative overflow-hidden border-b border-[#DCDDD4] bg-[#F2F0E8]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-[30rem] w-[30rem] rounded-full border border-[#214F50]/15 md:right-[-4rem] md:top-[-15rem] md:h-[40rem] md:w-[40rem]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-[-5rem] h-72 w-72 rounded-full bg-[#AABFC0]/45" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 right-12 h-64 w-64 rounded-full bg-[#C98269]/35" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          <div className="max-w-2xl">
            <Eyebrow>THE LIFEBRIDGE LIBRARY</Eyebrow>

            <h1 style={display} className="mt-4 text-[3.2rem] leading-[0.98] tracking-[-0.04em] text-[#214F50] md:text-[4.6rem]">
              Resources Library
            </h1>

            <p style={serif} className="mt-4 text-lg italic text-[#292F2D] md:text-xl">
              Trusted information. Thoughtful guidance.
            </p>

            <div className="mt-5 h-px w-16 bg-[#C98269]" />

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#68716D]">
              Explore clear, considered guides to whole-body donation, medical education, consent, institutional procedures and family preparation. Start with the basics, or go directly to the subject you want to understand.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#DCDDD4] pb-5">
          <div>
            <Eyebrow>EXPLORE THE LIBRARY</Eyebrow>
            <h2 style={display} className="mt-2 text-2xl leading-tight text-[#214F50] md:text-3xl">
              Six guides, one subject.
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-5 text-[#68716D]">
            Read in sequence or choose the subject most relevant to your questions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} onOpenGuide={onOpenGuide} />
          ))}
        </div>

        <div className="mt-11 grid gap-4 border-t border-[#DCDDD4] pt-6 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <div>
            <Eyebrow>EDUCATIONAL RESOURCES · INDIA / ODISHA</Eyebrow>
            <h2 style={display} className="mt-3 max-w-sm text-2xl leading-tight text-[#214F50] md:text-3xl">
              Information first. No assumptions.
            </h2>
          </div>
          <p className="max-w-2xl text-[13px] leading-6 text-[#68716D]">
            These resources are written for readers in India, with particular reference to the legal framework in Odisha. Institutional procedures differ. Always confirm current requirements with the institution concerned.
          </p>
        </div>

        <section className="relative mt-12 overflow-hidden rounded-xl bg-[#214F50] px-6 py-8 text-[#F8F7F2] md:px-9 md:py-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-64 w-64 rounded-full border border-[#AABFC0]/25" />
          <div className="relative max-w-2xl">
            <Eyebrow light>A NOTE ABOUT LIFEBRIDGE</Eyebrow>
            <h2 style={display} className="mt-3 text-2xl leading-tight text-[#F8F7F2] md:text-3xl">
              A place to record your intention.
            </h2>
            <div className="mt-4 h-px w-16 bg-[#C98269]" />
            <p className="mt-4 text-[13px] leading-6 text-[#DCE5DD]">
              LifeBridge is a declaration-recording portal. It is not a medical institution, does not receive donated bodies and does not currently have registered medical institution partners. A portal record does not guarantee institutional acceptance.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
