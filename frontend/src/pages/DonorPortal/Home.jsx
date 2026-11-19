
import { Reveal, display } from "./ui";
import { Band } from "./graphics";
import { greeting, nextStep } from "./portalData";
import {
  RegistrationRecord,
  AnatomyFeature,
  FamilyGuidance,
} from "./HomeLower";

function Welcome({ first, status, go }) {
  const step = nextStep(status);

  return (
    <Band bg="bg-[#F2E8E2]">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="text-sm font-medium tracking-wide text-[#68716D]">
            {greeting()}, {first}
          </p>

          <h1
            style={display}
            className="mt-5 max-w-3xl text-5xl leading-[1.08] text-[#292F2D] md:text-7xl"
          >
            Your decision
            <span className="block text-[#214F50]">
              has a place here.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#68716D]">
            This is your space to review your information, follow your
            registration and find answers whenever you need them.
          </p>

          <button
            onClick={() => go("consent")}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#214F50] px-7 py-3.5 text-sm font-medium text-[#F8F7F2] transition-colors hover:bg-[#292F2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]"
          >
            {step.label}
            <span aria-hidden="true">→</span>
          </button>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-4">
          <div className="relative border-l border-[#C98269] py-5 pl-7">
            <span className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-[#C98269]" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#68716D]">
              A note for you
            </p>
            <p
              style={display}
              className="mt-4 text-2xl leading-snug text-[#292F2D]"
            >
              Take your time. Keep your information close. Ask questions
              whenever you need to.
            </p>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}

export default function Home({ first, status, go }) {
  return (
    <div className="overflow-hidden text-[#292F2D]">
      <Welcome first={first} status={status} go={go} />
      <RegistrationRecord status={status} />
      <AnatomyFeature go={go} />
      <FamilyGuidance go={go} />
    </div>
  );
}
