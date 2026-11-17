import { useCallback, useEffect, useState } from "react";
import LandingPage from "../LandingPage";
import ModalShell from "./ModalShell";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import PortalLayout from "../DonorPortal/PortalLayout";
import { fetchStatus, fetchMe, toStatus, submitConsent } from "./Autho";

const KEY = "lifebridge_session";

function readSaved() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export default function SignupPage() {
  const [view, setView] = useState(null);
  const [session, setSession] = useState(readSaved);
  const [status, setStatus] = useState(undefined); // undefined while the status loads

  const openSignup = () => setView("signup");
  const openLogin = () => setView("login");
  const closeModal = () => setView(null);

  const logout = useCallback(() => {
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
    setSession(null);
    setStatus(undefined);
    setView(null);
  }, []);

  const refresh = useCallback(async (token) => {
    const result = await fetchStatus(token);
    if (result.kind === "forbidden" || result.kind === "unauthorized") return logout();
    setStatus(toStatus(result));
  }, [logout]);

  useEffect(() => {
    if (!session?.token) return;
    refresh(session.token);
    if (!session.name) {
      fetchMe(session.token).then((me) => {
        if (me?.full_name) setSession((s) => (s ? { ...s, name: me.full_name } : s));
      });
    }
  }, [session?.token, refresh]);

  // Called by the login and signup modals when a donor is signed in.
  const onAuthed = ({ token, name }) => {
    const next = { token, name };
    try { sessionStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setSession(next);
    setView(null);
  };

  const onSubmitConsent = async (payload) => {
    await submitConsent(session.token, payload);
    await refresh(session.token);
  };

  if (session) {
    if (status === undefined) {
      return <p className="p-10 text-center text-[#68716D]">Loading your portal…</p>;
    }
    return (
      <PortalLayout
        user={{ full_name: session.name || undefined }}
        status={status}
        onLogout={logout}
        onSubmitConsent={onSubmitConsent}
      />
    );
  }

  return (
    <>
      <LandingPage onSignup={openSignup} onLogin={openLogin} />

      {view && (
        <ModalShell
          onClose={closeModal}
          swapKey={view}
          label={view === "signup" ? "Create account" : "Log in"}
        >
          {view === "signup" ? (
            <SignupModal onSwitch={openLogin} onAuthed={onAuthed} />
          ) : (
            <LoginModal onSwitch={openSignup} onAuthed={onAuthed} />
          )}
        </ModalShell>
      )}
    </>
  );
}