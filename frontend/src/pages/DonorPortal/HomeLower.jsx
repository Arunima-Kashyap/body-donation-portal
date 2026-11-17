import { Reveal, display, serif } from "./ui";
import { Band, Arch, Icon } from "./graphics";
import { stages } from "./portalData";

export function Journey({ status }) {
  const items = stages(status); // [{ title, state, label, note }]

  return (
    <Band bg="bg-[#E8EEEA]">
      <Reveal>
        <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">What happens next</h2>
        <p className="mt-2 max-w-md text-base leading-relaxed text-[#68716D]">Each stage has a reason behind it. The line shows how far you have come.</p>
        <ol className="mt-10 grid gap-10 md:grid-cols-3">
          {items.map((it, i) => {
            const done = it.state === "done";
            const wait = it.state === "awaiting";
            return (
              <li key={it.title}>
                <div className="flex items-center">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                      done
                        ? "bg-[#214F50] text-[#F8F7F2]"
                        : wait
                        ? "bg-[#D9C58E] text-[#292F2D] ring-4 ring-[#EDE5D1]"
                        : "border-2 border-dashed border-[#AABFC0] bg-[#F8F7F2] text-[#68716D]"
                    }`}
                  >
                    {done ? <Icon name="check" className="h-6 w-6" /> : <span className="font-semibold">{i + 1}</span>}
                  </span>
                  {i < items.length - 1 && (
                    <span className={`mx-3 hidden flex-1 border-t-2 md:block ${done ? "border-solid border-[#214F50]" : "border-dashed border-[#AABFC0]"}`} />
                  )}
                </div>
                <h3 style={serif} className="mt-5 text-xl text-[#292F2D]">{it.title}</h3>
                <p className="mt-1 text-sm font-medium text-[#68716D]">{it.label}</p>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-[#68716D]">{it.note}</p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Band>
  );
}

const promises = [
  { icon: "doc", title: "Informed consent", text: "Nothing is recorded until you accept your declaration." },
  { icon: "people", title: "Witnessed", text: "The people you name confirm your consent." },
  { icon: "building", title: "Clear updates", text: "Your Home page shows each stage as it is confirmed." },
  { icon: "home", title: "Family support", text: "Resources helps loved ones understand your decision." },
];

export function Commitments() {
  return (
    <Band bg="bg-[#F2F0E8]">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Arch
            className="mx-auto max-w-xs"
            src="https://images.unsplash.com/photo-1582718142938-92e8006e8972?auto=format&fit=crop&w=800&q=80"
            alt="Students learning anatomy together"
          />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-8">
          <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">Why your decision matters</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#68716D]">
            Medical students first meet the human body in full through anatomy, and what they learn there shapes how they care for patients for the rest of their careers. Body donation makes that learning possible.
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {promises.map((p) => (
              <div key={p.title} className="flex gap-4 border-t border-[#DCDDD4] pt-5">
                <span className="text-[#214F50]"><Icon name={p.icon} /></span>
                <div>
                  <p style={serif} className="text-xl text-[#292F2D]">{p.title}</p>
                  <p className="mt-1 text-base leading-relaxed text-[#68716D]">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Band>
  );
}

const gifts = [
  "Hands-on anatomy teaching for medical students",
  "Better-prepared young doctors",
  "Medical education and research that others build on",
  "Care for patients the donor will never meet",
];

export function Gratitude({ go }) {
  return (
    <Band bg="bg-[#EBDAD2]">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">What your gift makes possible</h2>
            <ul className="mt-6 divide-y divide-[#C98269]/30 border-y border-[#C98269]/30">
              {gifts.map((g) => (
                <li key={g} className="py-4 text-lg text-[#292F2D]">{g}</li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#292F2D]/85">
              It helps to tell the people close to you about your decision. The family guidance can make that conversation easier.
            </p>
            <button
              onClick={() => go("resources")}
              className="mt-4 rounded-full bg-[#214F50] px-6 py-3 text-base font-medium text-[#F8F7F2] transition-colors hover:bg-[#292F2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]"
            >
              Read the family guidance
            </button>
          </div>
          <div className="lg:border-l lg:border-[#C98269]/30 lg:pl-12">
            <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">A note from all of us at LifeBridge</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-[#292F2D]/85">
              <p>Deciding to donate your body means thinking about things most people put off. Thank you for giving it your time and your honesty.</p>
              <p>Nothing here is hurried. Each step is yours to take when you are ready, and the people you name as witnesses are there to stand beside your decision.</p>
              <p style={serif} className="text-xl text-[#292F2D]">With gratitude, the LifeBridge team</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

const topics = [
  { icon: "heart", title: "Understanding body donation", description: "What it means and what it leaves behind." },
  { icon: "book", title: "How anatomy education works", description: "How donated bodies shape the way doctors learn." },
  { icon: "scale", title: "Ethics, dignity and consent", description: "The framework that protects every donor’s choice." },
  { icon: "home", title: "Guidance for families", description: "Support and answers for the people close to you." },
];

export function Explore({ go }) {
  return (
    <Band bg="bg-[#E3EBE9]">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">Take your time to read</h2>
            <p className="mt-2 text-base text-[#68716D]">The Resource Centre answers what donors and families ask most.</p>
          </div>
          <button
            onClick={() => go("resources")}
            className="rounded-full bg-[#214F50] px-6 py-3 text-base font-medium text-[#F8F7F2] transition-colors hover:bg-[#292F2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]"
          >
            Open Resource Centre
          </button>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          {topics.map((t) => (
            <button
              key={t.title}
              onClick={() => go("resources")}
              className="border-t border-[#AABFC0] pt-5 text-left transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50]"
            >
              <span className="text-[#214F50]"><Icon name={t.icon} /></span>
              <p style={serif} className="mt-3 text-xl text-[#292F2D]">{t.title}</p>
              <p className="mt-1 text-base leading-relaxed text-[#68716D]">{t.description}</p>
            </button>
          ))}
        </div>
      </Reveal>
    </Band>
  );
}