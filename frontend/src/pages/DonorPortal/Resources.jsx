import { Reveal, display, serif } from "./ui";
import { Band, Icon } from "./graphics";

const TOPICS = [
  {
    id: "understanding", icon: "heart", title: "Understanding body donation", bg: "bg-[#F2F0E8]", frame: "bg-[#DCE5DD]",
    body: [
      "Body donation is the decision to give your body to a medical institution after your death so that students can learn from it.",
      "It is separate from organ donation. Organs are transplanted to patients who need them, while a donated body is used for anatomy teaching and study. The two are different decisions, and an institution may have its own rules about both, so ask the institution you have in mind.",
    ],
  },
  {
    id: "education", icon: "book", title: "How anatomy education works", bg: "bg-[#E8EEEA]", frame: "bg-[#F8F7F2]",
    body: [
      "Anatomy is where medical students first see how the body is built and how its parts relate to one another.",
      "Working with a donated body shows how much people differ from one another, which diagrams and models cannot. Institutions generally teach students to treat every donor with respect.",
    ],
  },
  {
    id: "ethics", icon: "scale", title: "Ethics, dignity and consent", bg: "bg-[#F2F0E8]", frame: "bg-[#EDE5D1]",
    body: [
      "Consent has to be informed and voluntary. That is why LifeBridge asks you to read and accept a declaration, and to name witnesses who confirm that the decision was your own.",
      "Submitting consent does not guarantee acceptance by an institution. Your status page shows what has been confirmed and what is still pending.",
    ],
  },
  {
    id: "families", icon: "home", title: "Guidance for families", bg: "bg-[#EBDAD2]", frame: "bg-[#F2E8E2]",
    body: [
      "Tell the people close to you. Family members are often the ones who must act when the time comes, and a donor’s wishes are easier to honour when they are known in advance.",
      "Share the name of your preferred institution and let them know where your registration details are kept. A calm conversation now spares your family uncertainty later.",
    ],
  },
];

const FAQS = [
  ["What does registering on LifeBridge involve?", "You complete a consent form, name two witnesses, and accept a declaration. Your witnesses are then asked to confirm, and your status updates on the Home page."],
  ["Who confirms my consent?", "The witnesses you name on your form. They confirm that your decision is voluntary."],
  ["Does submitting consent guarantee that an institution will accept me?", "No. Acceptance is the institution’s decision, which is why your status page keeps registration and institution updates separate."],
  ["What happens after my witnesses confirm?", "Your registration becomes active, a confirmation is emailed to you, and your status on the Home page updates."],
  ["Should I tell my family?", "Yes, if you can. It helps them understand and carry out your wishes. The family guidance above is a good place to start."],
];

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Resources() {
  return (
    <div className="text-[#292F2D]">
      <Band bg="bg-[#F2E8E2]">
        <Reveal>
          <h1 style={display} className="text-4xl text-[#292F2D] md:text-5xl">Resource centre</h1>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#68716D]">
            Plain answers to what donors and their families ask most. Read what is useful and leave the rest.
          </p>
          <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-5">
            {[...TOPICS.map((t) => [t.id, t.title, t.icon]), ["faq", "Common questions", "doc"]].map(([id, t, icon]) => (
              <button key={id} onClick={() => jump(id)} className="flex items-center gap-3 border-t border-[#C98269]/40 pt-4 text-left transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50]">
                <span className="text-[#214F50]"><Icon name={icon} className="h-6 w-6" /></span>
                <span className="text-base text-[#292F2D]">{t}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </Band>

      {TOPICS.map((t, i) => (
        <Band key={t.id} bg={t.bg}>
          <Reveal>
            <article id={t.id} className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-12">
              <div className={`lg:col-span-4 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className={`mx-auto flex aspect-[3/4] w-full max-w-[16rem] items-center justify-center rounded-t-full text-[#214F50] ${t.frame}`}>
                  <Icon name={t.icon} className="h-20 w-20" />
                </div>
              </div>
              <div className="lg:col-span-8">
                <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">{t.title}</h2>
                <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed text-[#292F2D]/85">
                  {t.body.map((p) => <p key={p}>{p}</p>)}
                </div>
              </div>
            </article>
          </Reveal>
        </Band>
      ))}

      <Band bg="bg-[#EDF1EE]">
        <Reveal>
          <section id="faq" className="grid scroll-mt-24 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 style={display} className="text-2xl text-[#292F2D] md:text-3xl">Common questions</h2>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-[#68716D]">
                Rules differ between institutions. For anything not covered here, contact the institution you named on your form.
              </p>
            </div>
            <div className="divide-y divide-[#DCDDD4] border-y border-[#DCDDD4] lg:col-span-8">
              {FAQS.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary style={serif} className="cursor-pointer list-none text-xl text-[#292F2D] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50]">
                    {q}
                  </summary>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#68716D]">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </Reveal>
      </Band>
    </div>
  );
}