import { useEffect, useRef, useState } from "react";
import { C, display, sans, label } from "./ui";
import Home from "./Home";
import Consent from "./Consent";
import Resources from "./Resources";
import { DEMO, demoStatus, demoUser } from "./portalData";

const pages = [["home", "Home"], ["consent", "My Consent"], ["resources", "Resources"]];

const profileItems = ["Account information", "Change password", "Help and support"];

export default function PortalLayout({ user, status, onLogout, onSubmitConsent }) {
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const box = useRef(null);

  const demo = DEMO && !status;
  const u = user ?? (demo ? demoUser : null);
  const s = status ?? (demo ? demoStatus : null);
  const first = u?.full_name?.split(" ")[0] ?? "there";

  const go = (p) => { setPage(p); setMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  useEffect(() => {
    const away = (e) => box.current && !box.current.contains(e.target) && setProfile(false);
    const esc = (e) => e.key === "Escape" && setProfile(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, []);

  const link = (id, text, mobile) => (
    <button
      key={id}
      onClick={() => go(id)}
      aria-current={page === id ? "page" : undefined}
      className={`${label} border-b-2 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214F50] ${
        mobile ? "w-full text-left" : ""
      } ${
        page === id
          ? "border-[#214F50] text-[#214F50]"
          : "border-transparent text-[#292F2D]/60 hover:text-[#292F2D]"
      }`}
    >
      {text}
    </button>
  );

  return (
    <div style={{ ...sans, backgroundColor: C.paper, color: C.ink }} className="flex min-h-screen flex-col justify-between antialiased">
      <div>
        {demo && (
          <div className="bg-[#D9C58E] px-4 py-2 text-center text-sm font-medium text-[#292F2D]">
            Showing sample donor preview data.
          </div>
        )}

        <header className="sticky top-0 z-40 border-b border-[#DCDDD4] bg-[#F2F0E8]/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-[1536px] items-center justify-between px-6 py-4 md:px-10 lg:px-14">
            <button onClick={() => go("home")} className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[#C98269]" />
              <span style={display} className="text-2xl text-[#292F2D]">LifeBridge</span>
            </button>

            <div className="hidden gap-9 md:flex">{pages.map(([id, t]) => link(id, t))}</div>

            <div className="flex items-center gap-4">
              <div ref={box} className="relative">
                <button
                  onClick={() => setProfile(!profile)}
                  aria-label="Open profile menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#214F50] text-sm font-bold text-[#F8F7F2] transition-colors hover:bg-[#292F2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]"
                >
                  {first[0]?.toUpperCase()}
                </button>
                {profile && (
                  <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-[#DCDDD4] bg-[#F8F7F2] p-2 shadow-lg">
                    {profileItems.map((t) => (
                      <button key={t} disabled className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-[#292F2D]/40">
                        {t}<span className="rounded-full bg-[#EDF1EE] px-2 py-0.5 text-xs text-[#68716D]">Soon</span>
                      </button>
                    ))}
                    <button onClick={onLogout} className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#214F50] hover:bg-[#E8EEEA]">
                      Log out
                    </button>
                  </div>
                )}
              </div>
              <button onClick={() => setMenu(!menu)} className={`${label} md:hidden`}>
                {menu ? "Close" : "Menu"}
              </button>
            </div>
          </nav>
          {menu && <div className="flex flex-col gap-2 border-t border-[#DCDDD4] px-6 py-4 md:hidden">{pages.map(([id, t]) => link(id, t, true))}</div>}
        </header>

        <main key={page}>
          {page === "home" && <Home first={first} status={s} go={go} />}
          {page === "consent" && <Consent status={s} go={go} onSubmit={onSubmitConsent} />}
          {page === "resources" && <Resources />}
        </main>
      </div>

      <footer className="border-t border-[#DCDDD4] bg-[#E8EEEA]">
        <div className="mx-auto flex max-w-[1536px] flex-wrap items-center justify-between gap-6 px-6 py-12 md:px-10 lg:px-14">
          <div>
            <span style={display} className="text-2xl text-[#292F2D]">LifeBridge</span>
            <p className="mt-1 text-sm text-[#68716D]">
              Human dignity and informed consent, in service of medical learning.
            </p>
          </div>
          <div className={`${label} flex flex-wrap gap-6 text-[#68716D]`}>
            {pages.map(([id, t]) => (
              <button key={id} onClick={() => go(id)} className="hover:text-[#214F50]">
                {t}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
