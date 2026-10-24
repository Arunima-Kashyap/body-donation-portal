
import { useState } from "react";
import LandingPage from "./LandingPage";

const API_URL = "https://body-donation-portal-jj35.onrender.com";

function SignupPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "donor",
  });

  function openModal(selectedMode) {
    setMode(selectedMode);
    setMessage("");
    setIsOpen(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (mode === "login") {
      setMessage(
        "Login will be connected once we confirm the backend login endpoint."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        const detail = Array.isArray(data.detail)
          ? data.detail.map((item) => item.msg).join(", ")
          : data.detail;

        throw new Error(detail || data.message || "Signup failed.");
      }

      setMessage("Account created successfully! You can now log in.");
      setMode("login");

      setForm((previous) => ({
        ...previous,
        password: "",
      }));
    } catch (error) {
      setMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Landing page */}
      <LandingPage
        onSignup={() => openModal("signup")}
        onLogin={() => openModal("login")}
      />

      {/* Authentication modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/35 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            className="relative my-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
            >
              ×
            </button>

            <p className="text-sm font-medium text-[#668b91]">
              LifeBridge
            </p>

            <h2
              id="auth-title"
              className="mt-2 text-2xl font-semibold tracking-tight"
            >
              {mode === "signup"
                ? "Create your account"
                : "Welcome back"}
            </h2>

            <p className="mb-6 mt-2 text-sm text-slate-500">
              {mode === "signup"
                ? "Join us in making a meaningful difference."
                : "Enter your details to continue."}
            </p>

            {/* Status message */}
            {message && (
              <p
                role="status"
                className="mb-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700"
              >
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <input
                    name="full_name"
                    type="text"
                    placeholder="Full name"
                    value={form.full_name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#668b91] focus:ring-2 focus:ring-[#668b91]/15"
                  />

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#668b91] focus:ring-2 focus:ring-[#668b91]/15"
                  />
                </>
              )}

              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#668b91] focus:ring-2 focus:ring-[#668b91]/15"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete={
                  mode === "signup"
                    ? "new-password"
                    : "current-password"
                }
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#668b91] focus:ring-2 focus:ring-[#668b91]/15"
              />

              {mode === "signup" && (
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#668b91] focus:ring-2 focus:ring-[#668b91]/15"
                >
                  <option value="donor">Donor</option>
                  <option value="family_member">Family member</option>
                  <option value="institution_staff">
                    Institution staff
                  </option>
                </select>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#668b91] py-3 text-sm font-medium text-white transition hover:bg-[#52767c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : mode === "signup"
                    ? "Create account"
                    : "Continue"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              {mode === "signup"
                ? "Already have an account?"
                : "New to LifeBridge?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signup" ? "login" : "signup");
                  setMessage("");
                }}
                className="font-medium text-[#52767c] hover:underline"
              >
                {mode === "signup" ? "Login" : "Sign up"}
              </button>
            </p>
          </section>
        </div>
      )}
    </>
  );
}

export default SignupPage;
