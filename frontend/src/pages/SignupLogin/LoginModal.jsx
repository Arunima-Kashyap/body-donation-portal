import { useState } from "react";
import { API, readSession, isDonor } from "./Autho";

const field =
  "w-full min-w-0 rounded-2xl border border-[#e7e5df] bg-[#f7f6f2] px-4 py-3.5 text-sm text-[#141414] outline-none transition duration-200 placeholder:text-[#141414]/45 focus:border-[#668b91] focus:bg-white focus:ring-2 focus:ring-[#668b91]/15";

export default function LoginModal({ onSwitch, onAuthed }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  async function submit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const body = new URLSearchParams();
      body.append("username", form.email.trim());
      body.append("password", form.password);

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: body.toString(),
      });

      const responseText = await res.text();
      let data = null;

      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch {
        data = responseText;
      }

      if (!res.ok) {
        const detail =
          typeof data === "object" && data !== null
            ? data.detail || data.message
            : data;

        const message =
          typeof detail === "string"
            ? detail
            : res.status === 401
              ? "Incorrect email or password. Please try again."
              : "We couldn't log you in. Please check your details and try again.";

        throw new Error(message);
      }

      // Login worked. If this is a donor, move to the donor portal.
      const session = readSession(data);

      if (!session) {
        const keys = data && typeof data === "object" ? Object.keys(data).join(", ") : "nothing readable";
        console.log("Login response from the server:", data);
        setStatus({
          ok: false,
          text: `You are logged in, but the server's reply had no access token (it sent: ${keys}), so the portal cannot open.`,
        });
        return;
      }

      if (await isDonor(session)) {
        onAuthed?.(session);
        return;
      }

      setStatus({
        ok: true,
        text: "Login successful! The portal for your account type is not available yet.",
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
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#668b91]">
          LIFEBRIDGE · WELCOME BACK
        </p>
        <h2 id="modal-heading" className="text-2xl font-semibold tracking-tight text-[#141414] sm:text-[1.75rem]">
          Good to see you again.
        </h2>
        <p className="text-sm leading-6 text-[#141414]/60">Log in to continue your journey with LifeBridge.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-xs font-medium text-[#141414]/75">Email address</label>
        <input
          id="login-email"
          className={field}
          name="email"
          type="email"
          autoComplete="username"
          placeholder="you@example.com"
          value={form.email}
          onChange={change}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="login-password" className="block text-xs font-medium text-[#141414]/75">Password</label>
        <div className="relative">
          <input
            id="login-password"
            className={`${field} pr-16`}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={form.password}
            onChange={change}
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
        <p className="text-[11px] leading-5 text-[#141414]/50">Enter the password associated with your account.</p>
      </div>

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
        {loading ? "Logging in…" : "Log in"}
        {!loading && <span aria-hidden="true">→</span>}
      </button>

      <p className="text-center text-sm text-[#141414]/60">
        New to LifeBridge?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-[#1d4e56] underline decoration-[#ff6b3f] decoration-2 underline-offset-4 hover:text-[#ff6b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#668b91]"
        >
          Create an account
        </button>
      </p>
    </form>
  );
}