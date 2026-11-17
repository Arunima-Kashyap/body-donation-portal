import { useEffect, useRef, useState } from "react";
import { askBot } from "./chatApi";

const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const SUGGESTIONS = [
  "What does registering involve?",
  "Who confirms my consent?",
  "Do I have to choose an institution?",
];

const WELCOME = {
  role: "bot",
  text: "Hello, I’m the LifeBridge assistant. Ask me about body donation, registering, or how this site works. I can’t give medical or legal advice.",
};

const bubble = {
  user: "ml-auto rounded-2xl rounded-br-md bg-[#EDE5D1] text-[#292F2D]",
  bot: "mr-auto rounded-2xl rounded-bl-md border border-[#DCDDD4] bg-white text-[#292F2D]",
  error: "mr-auto rounded-2xl rounded-bl-md bg-[#EBDAD2] text-[#292F2D]",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([WELCOME]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, busy, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  async function send(raw) {
    const q = raw.trim();
    if (!q || busy) return;
    const history = msgs.filter((m) => m !== WELCOME && !m.error);
    setText("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setBusy(true);
    try {
      const reply = await askBot(q);
      setMsgs((m) => [...m, { role: "bot", text: reply }]);
    } catch (e) {
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          error: true,
          text:
            e.message === "NOT_CONNECTED"
              ? "The chatbot isn’t connected yet. Please check back soon."
              : "Sorry, I couldn’t reach the assistant just now. Please try again.",
        },
      ]);
    }
    setBusy(false);
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="LifeBridge assistant"
          className="fixed bottom-24 right-4 z-40 flex h-[32rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-[#DCDDD4] bg-[#F8F7F2] shadow-2xl sm:right-6"
        >
          <div className="flex items-start justify-between gap-3 bg-[#F2E8E2] px-5 py-4">
            <div>
              <p style={serif} className="text-lg text-[#292F2D]">LifeBridge assistant</p>
              <p className="text-sm text-[#68716D]">Here to help with your questions</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-[#292F2D] hover:bg-[#F8F7F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <p key={i} className={`max-w-[85%] whitespace-pre-wrap px-4 py-2.5 text-sm leading-relaxed ${m.error ? bubble.error : bubble[m.role]}`}>
                {m.text}
              </p>
            ))}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-[#214F50]/40 px-3.5 py-1.5 text-left text-sm text-[#292F2D] transition-colors hover:bg-[#DCE5DD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#214F50]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {busy && <p className="mr-auto px-2 text-sm text-[#68716D]">Thinking…</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(text); }}
            className="flex gap-2 border-t border-[#DCDDD4] bg-[#F8F7F2] p-3"
          >
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your question"
              aria-label="Type your question"
              className="min-w-0 flex-1 rounded-full border border-[#DCDDD4] bg-white px-4 py-2.5 text-base text-[#292F2D] focus:border-[#214F50] focus:outline-none focus:ring-2 focus:ring-[#214F50]/20"
            />
            <button
              type="submit"
              disabled={busy || !text.trim()}
              className="rounded-full bg-[#214F50] px-5 py-2.5 text-sm font-medium text-[#F8F7F2] transition-colors hover:bg-[#292F2D] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50]"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#214F50] text-[#F8F7F2] shadow-lg transition-colors hover:bg-[#292F2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#214F50] sm:right-6"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 5h16v11H9l-5 4z" />
        </svg>
      </button>
    </>
  );
}