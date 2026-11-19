
import { Reveal, display, serif } from "./ui";
import { Band } from "./graphics";
import { statusRows, describe } from "./portalData";

const chip = {
  ok: "bg-[#DCE5DD] text-[#214F50]",
  wait: "bg-[#EDE5D1] text-[#66552E]",
  other: "bg-[#EDF1EE] text-[#68716D]",
};

export function RegistrationRecord({ status }) {
  const rows = statusRows(status);
  const summary = describe(status);

  return (
    <Band bg="bg-[#214F50]">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#D9C58E]">
              Your registration
            </p>

            <h2
              style={display}
              className="mt-5 text-4xl leading-tight text-[#F8F7F2] md:text-5xl"
            >
              Your record, clearly laid out.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[#DCE5DD]">
              Your current registration information, gathered in one place.
            </p>
          </div>

          <div className="lg:col-span-8">
            <p className="mb-5 max-w-2xl text-sm leading-relaxed text-[#DCE5DD]">
              {summary.headline} {summary.detail}
            </p>

            <div className="border-y border-[#F8F7F2]/25">
              {rows.map(([title, value, tone], index) => (
                <div
                  key={title}
                  className="grid grid-cols-1 items-center gap-3 border-b border-[#F8F7F2]/15 py-5 last:border-0 sm:grid-cols-[1fr_auto]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#D9C58E]">
                      0{index + 1}
                    </span>
                    <span className="text-base text-[#F8F7F2]">
                      {title}
                    </span>
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-1.5 text-xs font-medium ${
                      chip[tone] ?? chip.other
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-start gap-3 border-t border-[#F8F7F2]/20 pt-5">
              <span className="mt-0.5 text-[#D9C58E]" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" />
                </svg>
              </span>

              <div>
                <p className="text-sm font-medium text-[#F8F7F2]">
                  More updates are on the way.
                </p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#DCE5DD]/85">
                  More detailed registration updates and tracking features
                  will be integrated into LifeBridge shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function AnatomyFeature({ go }) {
  return (
    <Band bg="bg-[#F2F0E8]">
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="relative aspect-[5/4] overflow-hidden rounded-t-full bg-[#DCE5DD]">
              <img
                src="/images/anatomy.png"
                alt="Anatomy study materials used in medical education"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-[#68716D]">
              Anatomy education · A closer look at medical learning
            </p>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#C98269]">
              Beyond the classroom
            </p>

            <h2
              style={display}
              className="mt-5 max-w-xl text-4xl leading-tight text-[#292F2D] md:text-5xl"
            >
              Inside the anatomy laboratory.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[#68716D]">
              Anatomy is not learned from diagrams alone. In practical
              sessions, medical students study the structures of the
              human body and develop a deeper understanding of how they
              relate to one another.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#68716D]">
              Where institutions use donated bodies for teaching, this
              learning takes place with respect for the person who made
              that contribution possible.
            </p>

            <button
              onClick={() => go("resources")}
              className="mt-8 inline-flex items-center gap-3 border-b border-[#214F50] pb-2 text-sm font-medium text-[#214F50] transition-colors hover:text-[#C98269] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50]"
            >
              Read about anatomy education
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

export function FamilyGuidance({ go }) {
  return (
    <Band bg="bg-[#E8EEEA]">
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#68716D]">
              For the people close to you
            </p>

            <h2
              style={display}
              className="mt-5 max-w-2xl text-4xl leading-tight text-[#292F2D] md:text-5xl"
            >
              A conversation worth having.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#68716D]">
              Your family may have questions about what you have decided,
              what happens after death and how institutions handle donated
              bodies. Having those conversations early can help everyone
              understand your wishes.
            </p>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="max-w-sm border-l border-[#AABFC0] py-3 pl-7">
              <p
                style={serif}
                className="text-2xl leading-snug text-[#292F2D]"
              >
                Clear information can make a difficult conversation easier.
              </p>

              <button
                onClick={() => go("resources")}
                className="mt-7 rounded-full bg-[#214F50] px-6 py-3 text-sm font-medium text-[#F8F7F2] transition-colors hover:bg-[#292F2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]"
              >
                Visit the Resource Centre →
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </Band>
  );
}
