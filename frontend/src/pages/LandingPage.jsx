
function LandingPage({ onSignup, onLogin }) {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 sm:px-12">
        <a href="#" className="text-xl font-semibold tracking-tight">
          Life<span className="text-[#668b91]">Bridge</span>
        </a>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogin}
            className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-white"
          >
            Login
          </button>

          <button
            onClick={onSignup}
            className="rounded-lg bg-[#668b91] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#52767c]"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Temporary hero section */}
      <section className="mx-auto flex min-h-[75vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-5 rounded-full bg-white px-4 py-2 text-sm text-[#52767c]">
          Compassion. Dignity. Purpose.
        </span>

        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          A legacy that can
          <span className="text-[#668b91]"> help others live.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
          Connecting individuals and families with information and support
          for the body donation process.
        </p>

        <button
          onClick={onSignup}
          className="mt-8 rounded-lg bg-slate-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Get started
        </button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-5 text-center text-xs text-slate-500">
        A student project built around dignity and care.
      </footer>
    </main>
  );
}

export default LandingPage;
