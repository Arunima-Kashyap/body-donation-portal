
import { useState } from "react";
import { display } from "./ui";
import { describe } from "./portalData";

// Match these lists to the values your backend accepts.
const GENDERS = ["male", "female", "other"];
const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const ID_TYPES = ["Aadhaar", "Passport", "Voter ID", "Driving licence", "PAN"];

const RELATIONS = [
  { label: "Husband", value: "husband" },
  { label: "Wife", value: "wife" },
  { label: "Son", value: "son" },
  { label: "Daughter", value: "daughter" },
  { label: "Father", value: "parent" },
  { label: "Mother", value: "parent" },
  { label: "Brother", value: "parent" },
  { label: "Sister", value: "parent" },
  { label: "Friend", value: "friend" },
  { label: "Other", value: "other" },
];

const blank = {
  first_name: "", middle_name: "", last_name: "", parent_name: "", gender: "", date_of_birth: "", blood_type: "",
  address_line_1: "", address_line_2: "", city: "", district: "", state: "", zip_code: "", country: "India",
  identity_type: "", identity_number: "", preferred_institution: "", declaration_accepted: false,
};

const blankWitness = { full_name: "", email: "", phone: "", relation: "" };

const REQUIRED = [
  "first_name", "last_name", "parent_name", "gender", "date_of_birth",
  "blood_type", "address_line_1", "city", "district", "state",
  "zip_code", "country", "identity_type", "identity_number"
];

const input = "mt-1 w-full rounded-lg border border-[#DCDDD4] bg-white px-4 py-2.5 text-base text-[#292F2D] focus:border-[#214F50] focus:outline-none focus:ring-2 focus:ring-[#214F50]/20";

const btn = "rounded-full bg-[#214F50] px-7 py-3 text-base font-medium text-[#F8F7F2] transition-colors hover:bg-[#292F2D] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]";

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium text-[#292F2D]">
      {label}
      {children}
      {error && (
        <span className="mt-1 block rounded bg-[#EBDAD2] px-2 py-1 text-xs font-normal">
          {error}
        </span>
      )}
    </label>
  );
}

const Section = ({ title, hint, tint = "bg-[#F8F7F2]", wide, children }) => (
  <section className={`rounded-3xl p-7 md:p-8 ${tint} ${wide ? "lg:col-span-2" : ""}`}>
    <h2 style={display} className="text-2xl text-[#292F2D]">{title}</h2>
    {hint && <p className="mt-1 text-base text-[#68716D]">{hint}</p>}
    <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
  </section>
);

function statusValue(value) {
  return value ?? "Not available yet";
}

export default function Consent({ status, go, onSubmit }) {
  const [f, setF] = useState(blank);
  const [ws, setWs] = useState([{ ...blankWitness }, { ...blankWitness }]);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k) => (e) =>
    setF({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const setW = (i, k) => (e) =>
    setWs(ws.map((w, j) => (j === i ? { ...w, [k]: e.target.value } : w)));

  const text = (k, label, props = {}) => (
    <Field label={label} error={err[k]}>
      <input className={input} value={f[k]} onChange={set(k)} {...props} />
    </Field>
  );

  const pick = (k, label, options) => (
    <Field label={label} error={err[k]}>
      <select className={input} value={f[k]} onChange={set(k)}>
        <option value="">Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Field>
  );

  function validate() {
    const e = {};

    REQUIRED.forEach((k) => {
      if (!String(f[k]).trim()) e[k] = "Required";
    });

    ws.forEach((w, i) => {
      Object.keys(blankWitness).forEach((k) => {
        if (!w[k].trim()) e[`w${i}${k}`] = "Required";
      });

      if (w.email && !/^\S+@\S+\.\S+$/.test(w.email)) {
        e[`w${i}email`] = "Enter a valid email address";
      }
    });

    const emails = ws.map((w) => w.email.trim().toLowerCase());

    if (emails[0] && emails[0] === emails[1]) {
      e.w1email = "Your two witnesses need different email addresses";
    }

    const phones = ws.map((w) => w.phone.trim());

    if (phones[0] && phones[0] === phones[1]) {
      e.w1phone = "Your two witnesses need different phone numbers";
    }

    if (!f.declaration_accepted) {
      e.declaration_accepted = "Please accept the declaration to continue";
    }

    return e;
  }

  async function submit(ev) {
    ev.preventDefault();

    const e = validate();
    setErr(e);
    setFail("");

    if (Object.keys(e).length) return;

    if (typeof onSubmit !== "function") {
      setFail("Consent submission is not connected. Please try again later.");
      return;
    }

    const nul = (v) => (v.trim() ? v.trim() : null);

    const payload = {
      ...f,
      middle_name: nul(f.middle_name),
      address_line_2: null,
      preferred_institution: null,
      witnesses: ws,
    };

    setBusy(true);

    try {
      await onSubmit(payload);
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (x) {
      setFail(x?.message || "We could not submit your consent. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const submitted = sent || status?.consentSubmitted === true;

  if (submitted) {
    const live = sent
      ? { ...status, consentSubmitted: true, witnessConfirmed: null }
      : status;

    const d = sent
      ? {
          headline: "Your consent has been submitted.",
          detail: "Your details have been received. The next step is for your two witnesses to confirm your decision through their email links.",
        }
      : describe(status);

    const rows = [
      ["Consent submitted", "Submitted"],
      [
        "Witness confirmation",
        live.witnessConfirmed === true
          ? "Confirmed"
          : live.witnessConfirmed === false
            ? "Awaiting confirmation"
            : "Not available from the current status service",
      ],
      ["Registration status", statusValue(live.registrationStatus)],
      ["Institution update", statusValue(live.institutionUpdate)],
    ];

    return (
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
        <section className="rounded-[2.5rem] bg-[#F2E8E2] p-8 md:p-10">
          <h1 style={display} className="text-3xl text-[#292F2D] md:text-4xl">
            {d.headline}
          </h1>
          <p className="mt-2 text-lg leading-relaxed text-[#68716D]">
            {d.detail}
          </p>
        </section>

        <section className="rounded-3xl bg-[#EDE5D1] p-7 md:p-8">
          <h2 style={display} className="text-2xl text-[#292F2D]">
            What happens next?
          </h2>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-[#292F2D]/85">
            <li>
              Each of your two witnesses should receive an email containing a
              verification link.
            </li>
            <li>
              Both witnesses need to open their respective links and confirm
              your consent.
            </li>
            <li>
              After both confirmations, the portal activates your consent
              registration.
            </li>
            <li>
              Your consent certificate is then generated and emailed to you.
              The download link is time-limited, so save the PDF when it arrives.
            </li>
          </ol>

          <p className="mt-5 border-t border-[#292F2D]/10 pt-4 text-sm leading-relaxed text-[#68716D]">
            If your witnesses cannot find their emails, ask them to check their
            spam or junk folders too.
          </p>
        </section>

        <section className="rounded-2xl border border-[#DCDDD4] bg-[#F8F7F2] p-6">
          <h2 style={display} className="text-xl text-[#292F2D]">
            Where it stands
          </h2>

          <ul className="mt-3 divide-y divide-[#DCDDD4]">
            {rows.map(([t, v]) => (
              <li key={t} className="flex justify-between gap-4 py-3 text-sm">
                <span className="font-medium">{t}</span>
                <span className="text-right text-[#68716D]">{v}</span>
              </li>
            ))}
          </ul>

          <button onClick={() => go("home")} className={`${btn} mt-5`}>
            Back to Home
          </button>
        </section>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="mx-auto grid w-full max-w-[1536px] gap-8 px-6 py-10 md:px-10 lg:grid-cols-2 lg:px-14"
    >
      <header className="lg:col-span-2">
        <h1 style={display} className="text-4xl text-[#292F2D] md:text-5xl">
          My consent
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#68716D]">
          Read each part at your own pace. Fields marked optional can stay
          empty. Your consent is only submitted when you press the button at
          the end.
        </p>
      </header>

      <Section title="About you">
        {text("first_name", "First name")}
        {text("middle_name", "Middle name (optional)")}
        {text("last_name", "Last name")}
        {text("parent_name", "Parent’s name")}
        {pick("gender", "Gender", GENDERS)}
        {text("date_of_birth", "Date of birth", { type: "date" })}
        {pick("blood_type", "Blood type", BLOOD)}
      </Section>

      <Section title="Address" tint="bg-[#E8EEEA]">
        <div className="sm:col-span-2">
          {text("address_line_1", "Address line 1")}
        </div>
        <div className="sm:col-span-2">
          {text("address_line_2", "Address line 2 (optional)")}
        </div>
        {text("city", "City")}
        {text("district", "District")}
        {text("state", "State")}
        {text("zip_code", "PIN code", { inputMode: "numeric" })}
        {text("country", "Country")}
      </Section>

      <Section
        title="Identity"
        tint="bg-[#F2E8E2]"
        wide
        hint="Used to confirm who you are. Keep it accurate."
      >
        {pick("identity_type", "Identity document", ID_TYPES)}
        {text("identity_number", "Document number")}
      </Section>

      <section className="rounded-3xl bg-[#DCE5DD] p-7 md:p-8 lg:col-span-2">
        <h2 style={display} className="text-2xl text-[#292F2D]">
          Your witnesses
        </h2>

        <p className="mt-1 text-base text-[#68716D]">
          Exactly two people who can confirm that this decision is your own.
          Each will be emailed a link to confirm, so use real addresses. You
          cannot change them after you submit, so check each one carefully.
        </p>

        <div className="mt-4 space-y-4">
          {ws.map((w, i) => (
            <div key={i} className="rounded-xl bg-[#F8F7F2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold">Witness {i + 1}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Full name" error={err[`w${i}full_name`]}>
                  <input
                    className={input}
                    value={w.full_name}
                    onChange={setW(i, "full_name")}
                  />
                </Field>

                <Field label="Relation to you" error={err[`w${i}relation`]}>
                  <select
                    className={input}
                    value={w.relation}
                    onChange={setW(i, "relation")}
                  >
                    <option value="">Select</option>
                    {RELATIONS.map((r, index) => (
                      <option key={`${r.label}-${index}`} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Email" error={err[`w${i}email`]}>
                  <input
                    type="email"
                    className={input}
                    value={w.email}
                    onChange={setW(i, "email")}
                  />
                </Field>

                <Field label="Phone" error={err[`w${i}phone`]}>
                  <input
                    type="tel"
                    className={input}
                    value={w.phone}
                    onChange={setW(i, "phone")}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-[#EDE5D1] p-7 md:p-8 lg:col-span-2">
        <h2 style={display} className="text-2xl text-[#292F2D]">
          Declaration
        </h2>

        {/* Replace with your institution's approved declaration wording. */}
        <label className="mt-3 flex gap-3 text-base leading-relaxed">
          <input
            type="checkbox"
            checked={f.declaration_accepted}
            onChange={set("declaration_accepted")}
            className="mt-1 h-4 w-4 accent-[#214F50]"
          />
          <span>
            I confirm that the details above are correct and that I am making
            this decision voluntarily.
          </span>
        </label>

        {err.declaration_accepted && (
          <p className="mt-2 rounded bg-[#EBDAD2] px-2 py-1 text-xs">
            {err.declaration_accepted}
          </p>
        )}

        <p className="mt-3 text-xs text-[#292F2D]/70">
          Submitting consent does not guarantee acceptance by an institution.
        </p>

        {fail && (
          <p className="mt-3 rounded bg-[#EBDAD2] px-3 py-2 text-sm">
            {fail}
          </p>
        )}

        <button type="submit" disabled={busy} className={`${btn} mt-4`}>
          {busy ? "Submitting" : "Submit my consent"}
        </button>
      </section>
    </form>
  );
}
