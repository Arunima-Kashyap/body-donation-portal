import { useState } from "react";
import { API, login } from "./Autho";

const roles = [
  ["donor", "Donor"],
  ["family_member", "Family"],
  ["institution_staff", "Institution"],
];

const field =
  "w-full min-w-0 rounded-2xl border border-[#e7e5df] bg-[#f7f6f2] px-4 py-3.5 text-sm text-[#141414] outline-none transition duration-200 placeholder:text-[#141414]/45 focus:border-[#668b91] focus:bg-white focus:ring-2 focus:ring-[#668b91]/15";

export default function SignupModal({ onSwitch, onAuthed }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", password: "", role: "donor", terms: false });

  const change = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
  };

  async function submit(e) {
    e.preventDefault();
    setStatus(null);

    if (!form.terms) {
      setStatus({ ok: false, text: "Please accept the Terms & Conditions first." });
      return;
    }

    setLoading(true);

    try {
      const fullName = `${form.first} ${form.last}`.trim();

      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const detail = data.detail || data.message;
        const message =
          typeof detail === "string"
            ? detail
            : "We couldn't create your account. Please check your details.";

        throw new Error(message);
      }

      // A new donor goes straight into the portal.
      if (form.role === "donor") {
        try {
          const session = await login(form.email, form.password);
          onAuthed?.({ ...session, name: session.name || fullName });
          return;
        } catch {
          setStatus({
            ok: true,
            text: "Your account has been created. Please log in to continue.",
          });
          return;
        }
      }

      setStatus({
        ok: true,
        text: "Your account has been created successfully.",
      });
    } catch (err) {
      setStatus({
        ok: false,
        text:
          err instanceof TypeError
            ? "Unable to connect to the server. Please try again."
            : err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="space-y-2 pr-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#668b91]">LIFEBRIDGE · JOIN THE COMMUNITY</p>
        <h2 id="modal-heading" className="text-2xl font-semibold tracking-tight text-[#141414] sm:text-[1.75rem]">
          Create your account
        </h2>
        <p className="text-sm leading-6 text-[#141414]/60">
          Start documenting your wishes and exploring the donation process.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-[#141414]/75">I am registering as</label>
        <div role="radiogroup" aria-label="I am registering as" className="grid grid-cols-3 gap-1 rounded-2xl bg-[#f2f1ea] p-1.5">
          {roles.map(([value, text]) => {
            const selected = form.role === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setForm((previous) => ({ ...previous, role: value }))}
                className={`min-w-0 rounded-xl px-1.5 py-3 text-[10px] font-medium transition duration-200 sm:text-xs ${
                  selected ? "bg-white text-[#141414] shadow-sm" : "text-[#141414]/55 hover:text-[#141414]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#668b91]`}
              >
                {text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-[#141414]/75">Full name</label>
        <div className="grid grid-cols-2 gap-3">
          <input className={field} name="first" autoComplete="given-name" placeholder="First name" value={form.first} onChange={change} required />
          <input className={field} name="last" autoComplete="family-name" placeholder="Last name" value={form.last} onChange={change} required />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-email" className="block text-xs font-medium text-[#141414]/75">Email address</label>
        <input id="signup-email" className={field} name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={change} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-phone" className="block text-xs font-medium text-[#141414]/75">Phone number</label>
        <input id="signup-phone" className={field} name="phone" type="tel" autoComplete="tel" placeholder="Enter your phone number" value={form.phone} onChange={change} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-password" className="block text-xs font-medium text-[#141414]/75">Password</label>
        <div className="relative">
          <input
            id="signup-password"
            className={`${field} pr-16`}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={change}
            minLength={8}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md text-[10px] font-semibold uppercase tracking-wider text-[#668b91] hover:text-[#1d4e56] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#668b91]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <p className="text-[11px] leading-5 text-[#141414]/50">Choose a password with at least 8 characters.</p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#141414]/65">
        <input type="checkbox" name="terms" checked={form.terms} onChange={change} className="mt-1 h-4 w-4 shrink-0 accent-[#1d4e56]" />
        <span>
          I agree to the{" "}
          <a href="/terms" target="_blank" rel="noreferrer" className="font-medium text-[#1d4e56] underline underline-offset-2">
            Terms &amp; Conditions
          </a>
          .
        </span>
      </label>

      {status && (
        <p
          role={status.ok ? "status" : "alert"}
          aria-live={status.ok ? "polite" : "assertive"}
          className={`rounded-xl px-4 py-3 text-sm leading-5 ${
            status.ok ? "bg-[#eaf3ed] text-[#286344]" : "bg-[#fff0e9] text-[#a34124]"
          }`}
        >
          {status.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6b3f] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition duration-200 hover:bg-[#ec5a2d] hover:shadow-lg hover:shadow-[#ff6b3f]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Create account"}
        {!loading && <span aria-hidden="true">→</span>}
      </button>

      <p className="text-center text-sm text-[#141414]/60">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-[#1d4e56] underline decoration-[#ff6b3f] decoration-2 underline-offset-4 hover:text-[#ff6b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#668b91]"
        >
          Log in
        </button>
      </p>
    </form>
  );
}