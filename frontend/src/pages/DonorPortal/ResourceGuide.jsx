
import { display, serif } from "./ui";

const guides = {
  understanding: {
    number: "01",
    category: "THE BASICS",
    title: "Understanding Body Donation",
    intro:
      "Whole-body donation is a decision made during life, with arrangements that take place after death. Understanding what the decision involves—and what it does not guarantee—is an important first step.",
    sections: [
      {
        heading: "What does it mean to donate your body?",
        paragraphs: [
          "Whole-body donation is the decision to give one's body after death to a medical or teaching institution for anatomical examination, medical education or research, according to that institution's approved purposes and procedures.",
          "It is a decision made during life, but the arrangements take place after death. The intended institution must be contacted and must determine whether it can accept the body.",
        ],
      },
      {
        heading: "How does the process generally work?",
        items: [
          ["01", "A decision during life", "A person expresses an intention to donate and makes enquiries about the receiving institution's requirements."],
          ["02", "Notification after death", "The family or responsible person contacts the intended institution and follows its instructions."],
          ["03", "Institutional assessment", "The institution considers the documentation, circumstances and condition of the body before deciding whether to accept it."],
          ["04", "Use and final disposition", "If accepted, the body may be used for permitted educational or research purposes. Preservation, duration of use and final disposition depend on institutional policy."],
        ],
      },
      {
        heading: "Whole-body donation and organ donation are different",
        paragraphs: [
          "Whole-body donation is intended primarily for anatomical examination, medical education and research. Organ donation is intended for transplantation to patients who need an organ. They are separate processes governed by different legal and medical frameworks.",
          "Whether eye or tissue donation can be coordinated with whole-body donation depends on the relevant eye bank and receiving anatomy department. Confirm the arrangements in advance rather than assuming both will be possible.",
        ],
      },
      {
        heading: "There is no single reason to choose donation",
        paragraphs: [
          "Some people are interested in contributing to medical education or scientific learning. Others have personal, philosophical or practical views about death and the use of the body.",
          "Some may decide against donation because of religious or cultural practices, family considerations or personal discomfort. The decision is individual; it is not an obligation.",
        ],
      },
    ],
    note: "This is a broad outline, not a universal sequence. The receiving institution's procedure takes precedence.",
  },

  education: {
    number: "02",
    category: "MEDICAL EDUCATION",
    title: "The Role of Anatomy in Medicine",
    intro:
      "Anatomy is not only about memorising the names of structures. It is about understanding how the human body is organised, how its parts relate to one another and how they differ between individuals.",
    sections: [
      {
        heading: "Learning beyond the diagram",
        paragraphs: [
          "Studying donated human bodies gives medical students an opportunity to encounter anatomical structures in their actual spatial relationships. Students can observe how muscles, nerves, blood vessels and organs are arranged in relation to one another.",
          "This experience complements textbooks, models, medical imaging and digital learning tools. It does not make those other methods unnecessary.",
        ],
      },
      {
        heading: "Understanding anatomical variation",
        paragraphs: [
          "Human anatomy is not identical from one individual to another. Natural differences in the arrangement of structures help students understand why textbook illustrations represent common patterns rather than every possible anatomical arrangement.",
          "Recognising variation is important when students later study medical imaging, physical examination and clinical procedures.",
        ],
      },
      {
        heading: "Connecting anatomy to clinical learning",
        paragraphs: [
          "Anatomical knowledge provides a foundation for later clinical learning. Understanding the location and relationships of structures helps students interpret medical images, understand examination findings and learn procedural approaches.",
        ],
      },
      {
        heading: "The cadaver as the first teacher",
        paragraphs: [
          "The National Medical Commission's AETCOM curriculum includes a module titled The Cadaver as Our First Teacher. It introduces students to the importance of donated bodies in medical education and the responsibility to approach anatomical study with respect and dignity.",
        ],
      },
      {
        heading: "Respect is part of the learning",
        paragraphs: [
          "A donated body is not simply a teaching specimen. Medical education involving human remains carries an ethical responsibility. Students and institutions are expected to approach anatomical study with respect, appropriate handling and awareness of the person's decision and the family's involvement.",
        ],
      },
    ],
  },

  ethics: {
    number: "03",
    category: "ETHICS & CONSENT",
    title: "Consent, Choice & Dignity",
    intro:
      "Consent is meaningful only when a person understands what they are agreeing to and is free to make the decision without pressure. A decision about body donation should remain informed, voluntary and personal.",
    sections: [
      {
        heading: "What makes consent meaningful?",
        items: [
          ["01", "Understanding", "Know the purpose of donation, the intended uses of the body and the procedures that may follow."],
          ["02", "Voluntariness", "The decision should be the person's own, made without coercion, pressure or inducement."],
          ["03", "Scope", "Understand whether the institution's programme includes teaching, research, surgical training or other uses."],
          ["04", "Transparency", "Ask how the body will be handled, what happens to personal information and how remains are dealt with."],
        ],
      },
      {
        heading: "Questions a donor should be able to ask",
        items: [
          ["ABOUT USE", "What will the body be used for?", "Will it be used for teaching, research or other activities? Can the donor specify or limit these uses?"],
          ["ABOUT PRIVACY", "How is personal information protected?", "How are donor identities, records and photographs protected? Who can access personal information?"],
          ["ABOUT WITHDRAWAL", "Can the decision be changed?", "How can a declaration or institutional registration be changed or withdrawn? What procedure must be followed?"],
        ],
      },
      {
        heading: "A note on the LifeBridge declaration",
        paragraphs: [
          "LifeBridge asks donors to complete a declaration and name witnesses. Odisha's Anatomy Act contains a provision for a written intention to donate in the presence of two or more witnesses.",
          "The legal status of a declaration completed electronically through this portal has not been established here. Donors should also understand and follow the receiving institution's own registration and documentation procedure.",
        ],
      },
    ],
    note: "A decision to donate should never be treated as an obligation. Take the time you need to understand the process and discuss any questions with the intended institution.",
  },

  institutions: {
    number: "04",
    category: "LAW & PROCEDURE",
    title: "Institutions, Law & Acceptance",
    intro:
      "A person's intention to donate is important, but it does not remove the receiving institution's responsibility to assess whether it can accept the donation. Procedures and requirements differ between institutions.",
    sections: [
      {
        heading: "Why might acceptance differ?",
        paragraphs: [
          "Institutions may consider their available capacity, educational requirements, the condition of the body, circumstances of death, documentation and transportation arrangements. Some may have specific medical or procedural exclusion criteria.",
          "These criteria are not universal. A condition that prevents acceptance at one institution may be treated differently by another. The institution must provide its current requirements.",
        ],
      },
      {
        heading: "The Odisha legal framework",
        paragraphs: [
          "The Orissa Anatomy Act, 1975, as amended in 2013, regulates the use of human bodies for anatomical examination. The 2013 amendment inserted Section 5A, which addresses the donation of deceased persons' bodies for anatomical examination, dissection and research.",
          "Section 5A includes a provision concerning a person's written intention to donate, expressed in the presence of two or more witnesses. It also addresses authorisation by the person lawfully in possession of the body, subject to statutory conditions.",
        ],
      },
      {
        heading: "Questions to ask your intended institution",
        items: [
          ["01", "Advance registration", "Do you accept advance body donation registrations?"],
          ["02", "Documentation", "What documents and witness details are required?"],
          ["03", "Notification", "Who must be contacted when death occurs? Is there a time limit for notification?"],
          ["04", "Eligibility", "What are your current medical and procedural exclusion criteria?"],
          ["05", "Transportation", "Who arranges transportation, and are there associated costs?"],
          ["06", "Other donations", "Can eye donation be coordinated with body donation?"],
          ["07", "Final arrangements", "How long may the body be retained, and what happens to the remains afterwards?"],
          ["08", "Family arrangements", "Can the family perform religious rituals before handover?"],
        ],
      },
      {
        heading: "An example from Odisha",
        paragraphs: [
          "AIIMS Bhubaneswar publishes its own body donation procedure. Its published procedure describes donor and family documentation, notification after death, assessment before acceptance and the eventual disposition of remains.",
          "Its eligibility requirements and procedures are specific to that institution. They should not be treated as rules that every medical college in Odisha follows. LifeBridge is not affiliated with AIIMS Bhubaneswar through this information.",
        ],
      },
    ],
    note: "The legal information here is a simplified educational summary, not legal advice. Check the current legislation and obtain qualified advice where necessary. Confirm institutional requirements directly with the institution.",
  },

  families: {
    number: "05",
    category: "FAMILY GUIDANCE",
    title: "A Guide for Families",
    intro:
      "Families often become responsible for making arrangements when a person dies. Knowing about a donation intention in advance gives them time to understand the decision and contact the intended institution.",
    sections: [
      {
        heading: "Make sure your family knows",
        items: [
          ["01", "The decision", "Explain that you have expressed an intention to donate your body and why you made that decision."],
          ["02", "The institution", "Share the name and contact details of the Anatomy Department you intend to approach. Explain whether you have separately completed its registration."],
          ["03", "The documents", "Tell your family where the declaration, institution forms and other relevant documents are kept."],
          ["04", "The people involved", "Share the contact details of the witnesses and the family member who will coordinate arrangements."],
          ["05", "The alternative plan", "Discuss what your family should do if the institution cannot accept the body."],
        ],
      },
      {
        heading: "Keep important information accessible",
        items: [
          ["", "Donor declaration", "A copy of the declaration or other relevant paperwork."],
          ["", "Institution details", "The preferred institution's contact details and any registration or donor number, if issued."],
          ["", "Witness information", "Names and contact information for the witnesses."],
          ["", "Relevant documents", "Identity and medical documents requested by the institution."],
          ["", "Written arrangements", "A short note explaining the arrangements and the people to contact."],
        ],
      },
      {
        heading: "When death occurs",
        paragraphs: [
          "The family or responsible person should contact the intended institution promptly and follow its instructions. Do not assume that LifeBridge automatically notifies the institution or arranges collection.",
          "The institution will explain its current documentation, assessment and transportation procedures. Families should follow those instructions rather than relying on a general guide.",
        ],
      },
      {
        heading: "Keep an alternative plan",
        paragraphs: [
          "A donation may not proceed because of the institution's criteria, capacity or circumstances at the time of death. Discuss an alternative funeral arrangement with your family so they are not left without a plan.",
          "This is not a reason to avoid expressing an intention to donate. It is a practical step that acknowledges that institutional acceptance cannot be guaranteed.",
        ],
      },
    ],
  },

  questions: {
    number: "06",
    category: "QUICK REFERENCE",
    title: "Frequently Asked Questions",
    intro:
      "Some questions concern whole-body donation generally. Others relate specifically to what LifeBridge records and displays. Where procedures differ, the intended institution is the right place to confirm the details.",
    faqs: [
      {
        group: "Understanding donation",
        questions: [
          ["How is whole-body donation different from organ donation?", "Whole-body donation is intended primarily for anatomical education and research. Organ donation is intended for transplantation to patients who need an organ. They are separate processes governed by different frameworks."],
          ["Can I donate my eyes as well as my body?", "It may be possible, but arrangements must be discussed in advance with both the relevant eye bank and the anatomy department. Do not assume every institution will accept a body following eye or other tissue retrieval."],
          ["Will every medical institution accept a donated body?", "No. Institutions assess donations according to their own requirements, capacity and the circumstances at the time of death. A declaration made during your lifetime does not guarantee acceptance."],
          ["Can I choose which institution receives my body?", "You can identify an institution you would prefer to approach. Contact it directly to understand its registration procedure, eligibility criteria and arrangements after death. Recording a preferred institution on LifeBridge does not constitute acceptance."],
          ["Can my family perform religious rituals before handover?", "Possibilities and timing differ between institutions. Discuss this with the intended institution in advance so your family understands what can be arranged."],
          ["Will the remains be returned to my family?", "This depends on the institution's policy. Ask directly about preservation, duration of use, memorial ceremonies and final disposition."],
          ["Are there medical conditions that make someone ineligible?", "There is no single exclusion list that applies to every institution. Medical history, the condition of the body and the circumstances of death may affect acceptance. Ask the intended institution for its current criteria."],
          ["Who pays for transporting the body?", "Transport arrangements and associated costs depend on the receiving institution and the family's location. Confirm these details in advance."],
          ["Can I change my mind?", "Withdrawal procedures differ. Contact the institution with which you have registered and follow its instructions. If you have also recorded your intention on LifeBridge, update the relevant people and check what changes the portal supports."],
          ["What happens if no institution accepts the body?", "The family will need to make alternative funeral arrangements. This is why a backup plan should be discussed in advance."],
        ],
      },
      {
        group: "Using LifeBridge",
        questions: [
          ["What does submitting the LifeBridge consent form mean?", "It records your declaration and the information submitted through the portal. It does not, by itself, establish that a medical institution has registered or accepted you as a donor."],
          ["Why are witnesses required?", "The LifeBridge process asks you to name two witnesses who are invited to confirm your declaration. Odisha's Anatomy Act also contains a provision concerning a person's written intention to donate in the presence of two or more witnesses. Whether the portal's electronic process satisfies the statutory requirements requires appropriate legal verification."],
          ["Does LifeBridge arrange the transfer of my body?", "No. LifeBridge is a declaration-recording portal, not a medical institution or body transportation service. Families must contact the intended receiving institution and follow its procedures."],
          ["Does LifeBridge guarantee institutional acceptance?", "No. LifeBridge does not currently have registered medical institution partners. Acceptance is a separate decision made by the intended institution under its own procedures."],
          ["What do the statuses in my account mean?", "Your dashboard displays information recorded by the portal about your submission. A status such as 'registered' refers to your LifeBridge portal record; it should not be interpreted as acceptance by a medical institution."],
          ["What happens if a witness does not respond?", "Check your account for the latest available status and contact the LifeBridge team if you need assistance. Do not assume that an unanswered witness request has been confirmed."],
        ],
      },
    ],
    glossary: [
      ["Whole-body donation", "The donation of a person's body after death for anatomical examination, medical education or research."],
      ["Anatomy", "The study of the structures of the human body and how they relate to one another."],
      ["Cadaver", "A deceased human body used for anatomical study."],
      ["Dissection", "The careful separation and examination of anatomical structures for educational or scientific purposes."],
      ["Embalming", "The use of chemical processes to preserve a body."],
      ["Anatomical variation", "A natural difference in the structure or arrangement of anatomical features between individuals."],
      ["Institutional acceptance", "A medical institution's decision to receive a body under its applicable procedures."],
      ["Next of kin", "A person's closest family member or relevant representative; the precise legal meaning depends on the context."],
    ],
  },
};

function Eyebrow({ children, light = false }) {
  return (
    <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${light ? "text-[#D9C58E]" : "text-[#9A6957]"}`}>
      {children}
    </p>
  );
}

function Section({ section, index }) {
  return (
    <section
      id={`guide-section-${index}`}
      className="scroll-mt-24 border-b border-[#DCDDD4] py-7 last:border-b-0 md:py-9"
    >
      <div className="grid gap-3 md:grid-cols-[2.5rem_minmax(0,1fr)] md:gap-5">
        <span className="pt-1 text-xs tabular-nums text-[#9A6957]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h2 style={serif} className="max-w-3xl text-xl leading-snug text-[#214F50] md:text-2xl">
            {section.heading}
          </h2>

          {section.paragraphs?.map((paragraph, i) => (
            <p key={i} className="mt-3 max-w-3xl text-[14px] leading-[1.8] text-[#68716D]">
              {paragraph}
            </p>
          ))}

          {section.items && (
            <div className="mt-5 border-y border-[#DCDDD4]">
              {section.items.map(([number, title, description], i) => (
                <div
                  key={`${title}-${i}`}
                  className="grid gap-2 border-b border-[#DCDDD4] py-4 last:border-b-0 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-4"
                >
                  <span className="pt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#9A6957]">
                    {number || String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-medium leading-5 text-[#292F2D]">
                      {title}
                    </h3>
                    <p className="mt-1.5 max-w-3xl text-[13px] leading-[1.75] text-[#68716D]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Questions({ groups }) {
  return (
    <div className="mt-6">
      {groups.map((group, groupIndex) => (
        <div key={group.group} className="mb-9 last:mb-0">
          <div className="mb-3 flex items-baseline gap-4">
            <span className="text-[11px] tabular-nums text-[#9A6957]">
              {String(groupIndex + 1).padStart(2, "0")}
            </span>
            <h3 style={display} className="text-xl text-[#214F50] md:text-2xl">
              {group.group}
            </h3>
          </div>

          <div className="divide-y divide-[#DCDDD4] border-y border-[#DCDDD4]">
            {group.questions.map(([question, answer]) => (
              <details key={question} className="group py-4">
                <summary
                  style={serif}
                  className="flex cursor-pointer list-none items-start justify-between gap-4 text-base leading-snug text-[#292F2D] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50] md:text-lg"
                >
                  <span>{question}</span>
                  <span className="shrink-0 pt-1 text-[10px] font-sans font-medium uppercase tracking-[0.1em] text-[#9A6957] group-open:hidden">
                    Read
                  </span>
                  <span className="hidden shrink-0 pt-1 text-[10px] font-sans font-medium uppercase tracking-[0.1em] text-[#9A6957] group-open:inline">
                    Close
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl pr-6 text-[13px] leading-[1.8] text-[#68716D] md:text-sm">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReferenceSection({ guide }) {
  if (!guide.glossary) return null;

  const references = [
    ["The Orissa Anatomy Act, 1975", "State legislation governing the use of bodies for anatomical examination."],
    ["The Odisha Anatomy (Amendment) Act, 2013", "Includes Section 5A concerning donation of deceased persons' bodies."],
    ["Transplantation of Human Organs and Tissues Act, 1994", "Central legislation governing organ and tissue transplantation."],
    ["National Medical Commission — AETCOM curriculum", "Includes the module The Cadaver as Our First Teacher."],
    ["AIIMS Bhubaneswar — Body Donation Procedure", "An example of an institution's published donor and family procedures."],
    ["International Federation of Associations of Anatomists", "Recommendations for good practice in body donation and anatomical study."],
    ["Indian Journal of Medical Ethics", "Academic discussion of ethical issues in the use of human bodies in anatomy education."],
  ];

  return (
    <>
      <section className="mt-10 border-t border-[#DCDDD4] pt-7">
        <Eyebrow>REFERENCE</Eyebrow>
        <h2 style={display} className="mt-2 text-2xl leading-tight text-[#214F50] md:text-3xl">
          Words worth understanding.
        </h2>

        <div className="mt-5 divide-y divide-[#DCDDD4] border-y border-[#DCDDD4]">
          {guide.glossary.map(([term, definition]) => (
            <div key={term} className="grid gap-1.5 py-3 sm:grid-cols-[10rem_1fr] sm:gap-5">
              <h3 className="text-[13px] font-medium text-[#214F50]">{term}</h3>
              <p className="text-[13px] leading-6 text-[#68716D]">{definition}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-[#DCDDD4] pt-7">
        <Eyebrow>FURTHER READING</Eyebrow>
        <h2 style={display} className="mt-2 text-2xl leading-tight text-[#214F50] md:text-3xl">
          Explore the subject further.
        </h2>

        <div className="mt-5 grid gap-x-8 gap-y-5 md:grid-cols-2">
          {references.map(([title, description], i) => (
            <div key={title} className="border-t border-[#DCDDD4] pt-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#9A6957]">
                SOURCE {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 text-[13px] font-medium text-[#292F2D]">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-[#68716D]">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function GuideHero({ guide, onBack }) {
  return (
    <header className="relative overflow-hidden border-b border-[#DCDDD4] bg-[#F2F0E8]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-[28rem] w-[28rem] rounded-full border border-[#214F50]/15 md:right-[-3rem] md:top-[-14rem] md:h-[38rem] md:w-[38rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-[-4rem] h-64 w-64 rounded-full bg-[#AABFC0]/30" />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-6 md:px-12 md:pb-14 md:pt-8">
        <button
          onClick={() => onBack?.()}
          className="mb-8 text-[13px] text-[#214F50] transition-colors hover:text-[#9A6957] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50]"
        >
          ← Back to Resources
        </button>

        <div className="grid gap-5 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-7">
          <div className="hidden border-r border-[#C98269]/50 md:block">
            <span style={display} className="text-5xl leading-none text-[#A59D87]">
              {guide.number}
            </span>
          </div>

          <div className="max-w-3xl">
            <Eyebrow>
              GUIDE {guide.number} <span className="mx-1">·</span> {guide.category}
            </Eyebrow>

            <h1 style={display} className="mt-3 text-3xl leading-[1.08] tracking-[-0.03em] text-[#214F50] md:text-5xl">
              {guide.title}
            </h1>

            <p style={serif} className="mt-4 max-w-3xl text-base italic leading-7 text-[#292F2D] md:text-lg">
              {guide.intro}
            </p>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9A6957]">
              LifeBridge educational resource · India / Odisha
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ResourceGuide({ guideId, onBack, onNavigate }) {
  const guide = guides[guideId];

  if (!guide) {
    return (
      <div className="min-h-[50vh] bg-[#F8F7F2] px-6 py-14 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-[#68716D]">This guide could not be found.</p>
          <button onClick={() => onBack?.()} className="mt-4 text-[13px] text-[#214F50] underline underline-offset-4">
            Back to Resources
          </button>
        </div>
      </div>
    );
  }

  const allGuides = Object.keys(guides);
  const currentIndex = allGuides.indexOf(guideId);
  const previous = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
  const next = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

  const sectionLinks = guide.sections?.map((section, index) => ({
    title: section.heading,
    index,
  })) ?? [];

  return (
    <div className="overflow-hidden bg-[#F8F7F2] text-[#292F2D]">
      <GuideHero guide={guide} onBack={onBack} />

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
        <div className={`grid gap-8 ${sectionLinks.length > 1 ? "lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10" : "lg:grid-cols-1"}`}>
          {sectionLinks.length > 1 && (
            <aside className="h-fit lg:sticky lg:top-8">
              <Eyebrow>IN THIS GUIDE</Eyebrow>
              <nav className="mt-3 border-l border-[#DCDDD4]">
                {sectionLinks.map(({ title, index }) => (
                  <a
                    key={title}
                    href={`#guide-section-${index}`}
                    className="block border-l-2 border-transparent py-1.5 pl-3 text-[12px] leading-5 text-[#68716D] transition-colors hover:border-[#C98269] hover:text-[#214F50]"
                  >
                    {title}
                  </a>
                ))}
              </nav>

              {guide.faqs && (
                <a href="#guide-questions" className="mt-3 block border-l-2 border-transparent py-1.5 pl-3 text-[12px] text-[#68716D] hover:border-[#C98269] hover:text-[#214F50]">
                  Frequently asked questions
                </a>
              )}
            </aside>
          )}

          <div className="min-w-0">
            {guide.sections?.map((section, index) => (
              <Section key={section.heading} section={section} index={index} />
            ))}

            {guide.faqs && (
              <section id="guide-questions" className="scroll-mt-24 pt-7">
                <Eyebrow>QUICK REFERENCE</Eyebrow>
                <h2 style={display} className="mt-2 text-2xl leading-tight text-[#214F50] md:text-3xl">
                  Questions you may have.
                </h2>
                <Questions groups={guide.faqs} />
              </section>
            )}

            <ReferenceSection guide={guide} />

            {guide.note && (
              <aside className="mt-10 border-l-2 border-[#C98269] py-1 pl-5">
                <Eyebrow>A NOTE TO KEEP IN MIND</Eyebrow>
                <p className="mt-2 max-w-3xl text-[13px] leading-6 text-[#68716D]">
                  {guide.note}
                </p>
              </aside>
            )}

            <div className="mt-10 border-t border-[#DCDDD4] pt-5">
              <p className="text-[12px] leading-6 text-[#68716D]">
                This page is educational information, not legal or medical advice. Laws, institutional policies and procedures may change. Confirm current requirements directly with the relevant institution before making arrangements.
              </p>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9A6957]">
                Jurisdiction: India · Odisha
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#214F50] px-6 py-8 text-[#F8F7F2] md:px-12 md:py-10">
        <div className="mx-auto max-w-7xl">
          <Eyebrow light>CONTINUE READING</Eyebrow>

          <div className="mt-5 grid gap-6 border-b border-[#F8F7F2]/20 pb-6 sm:grid-cols-2">
            <div>
              {previous && (
                <button onClick={() => onNavigate?.(previous)} className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9C58E]">
                  <span className="text-[10px] font-medium uppercase tracking-[0.13em] text-[#D9C58E]">Previous guide</span>
                  <span style={serif} className="mt-2 block max-w-sm text-xl leading-snug text-[#F8F7F2] transition-colors hover:text-[#D9C58E] md:text-2xl">
                    {guides[previous].title}
                  </span>
                </button>
              )}
            </div>

            <div className="sm:text-right">
              {next && (
                <button onClick={() => onNavigate?.(next)} className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9C58E] sm:text-right">
                  <span className="text-[10px] font-medium uppercase tracking-[0.13em] text-[#D9C58E]">Next guide</span>
                  <span style={serif} className="mt-2 block max-w-sm text-xl leading-snug text-[#F8F7F2] transition-colors hover:text-[#D9C58E] md:ml-auto md:text-2xl">
                    {guides[next].title}
                  </span>
                </button>
              )}
            </div>
          </div>

          <button onClick={() => onBack?.()} className="mt-5 text-[13px] text-[#DCE5DD] transition-colors hover:text-[#D9C58E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9C58E]">
            ← Return to the Resources library
          </button>
        </div>
      </footer>
    </div>
  );
}
