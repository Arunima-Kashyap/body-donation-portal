import { Reveal, display } from "./ui";
import { Band, Arch, ProgressRing } from "./graphics";
import { greeting, nextStep, statusRows, describe, stages } from "./portalData";
import { Journey, Commitments, Gratitude, Explore } from "./HomeLower";

const chip = {
  ok: "bg-[#DCE5DD] text-[#292F2D]",
  wait: "bg-[#EDE5D1] text-[#292F2D]",
  other: "bg-[#EDF1EE] text-[#68716D]",
};

function Hero({ first, status, go }) {
  const summary = describe(status); // { headline, detail }
  const step = nextStep(status); // { title, text, label }
  const items = stages(status);
  const done = items.filter((i) => i.state === "done").length;

  return (
    <Band bg="bg-[#F2E8E2]">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="text-base font-medium text-[#68716D]">{greeting()}, {first}</p>
          <h1 style={display} className="mt-3 text-4xl leading-tight text-[#292F2D] md:text-5xl">
            Thank you for choosing to give.
          </h1>
          <div className="mt-8 flex max-w-2xl items-center gap-6">
            <ProgressRing done={done} total={items.length} />
            <div>
              <p className="text-lg font-semibold text-[#292F2D]">{summary.headline}</p>
              <p className="mt-1 text-base leading-relaxed text-[#68716D]">{summary.detail}</p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={() => go("consent")}
              className="rounded-full bg-[#214F50] px-7 py-3 text-base font-medium text-[#F8F7F2] transition-colors hover:bg-[#292F2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]"
            >
              {step.label}
            </button>
            <span className="text-sm text-[#68716D]">{step.title}</span>
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5">
          <Arch
            className="mx-auto max-w-sm"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80"
            alt="A medical student studying anatomy"
          />
        </Reveal>
      </div>
    </Band>
  );
}

function Record({ status }) {
  const rows = statusRows(status); // [title, value, tone]

  return (
    <Band bg="bg-[#F2F0E8]">
      <Reveal>
        <div id="your-registration" className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">Your record</h2>
            <p className="mt-2 max-w-xs text-base leading-relaxed text-[#68716D]">Where your registration stands today.</p>
          </div>
          <ul className="divide-y divide-[#DCDDD4] border-y border-[#DCDDD4] lg:col-span-8">
            {rows.map(([title, value, tone]) => (
              <li key={title} className="flex items-center justify-between gap-4 py-5">
                <span className="text-lg text-[#292F2D]">{title}</span>
                <span className={`rounded-full px-4 py-1.5 text-sm font-medium ${chip[tone] ?? chip.other}`}>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Band>
  );
}

export default function Home({ first, status, go }) {
  return (
    <div className="text-[#292F2D]">
      <Hero first={first} status={status} go={go} />
      <Record status={status} />
      <Journey status={status} />
      <Commitments />
      <Gratitude go={go} />
      <Explore go={go} />
    </div>
  );
}