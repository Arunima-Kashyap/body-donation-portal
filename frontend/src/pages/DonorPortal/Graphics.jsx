// Small shared graphics for the donor portal. Everything is drawn in code, in the LifeBridge palette.

const PATHS = {
  check: "M5 12.5l4.5 4.5L19 7.5",
  doc: "M7 3h7l4 4v14H7z M14 3v4h4 M10 13l2 2 4-4",
  people: "M9 11a3 3 0 100-6 3 3 0 000 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M16 11a2.5 2.5 0 100-5 M17 14c2.5.3 4 2.4 4 5",
  building: "M3 9l9-5 9 5 M5 9v9 M9.5 9v9 M14.5 9v9 M19 9v9 M3 20h18",
  home: "M4 11l8-7 8 7 M6 10v10h12V10 M10 20v-5h4v5",
  book: "M4 5h6a2 2 0 012 2v13a2 2 0 00-2-2H4z M20 5h-6a2 2 0 00-2 2v13a2 2 0 012-2h6z",
  scale: "M12 4v16 M7 20h10 M5 7h14 M5 7l-3 7a3 3 0 006 0z M19 7l-3 7a3 3 0 006 0z",
  heart: "M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z",
};

export function Icon({ name, className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={PATHS[name]} />
    </svg>
  );
}

// A full-width band with a background colour and a centred, wide content area.
export function Band({ bg, children, className = "" }) {
  return (
    <section className={bg}>
      <div className={`mx-auto w-full max-w-[1536px] px-6 py-12 md:px-10 md:py-16 lg:px-14 ${className}`}>{children}</div>
    </section>
  );
}

// A photo in an arch frame: the one recurring shape, taken from the name LifeBridge.
export function Arch({ src, alt, className = "" }) {
  return (
    <div className={`aspect-[3/4] w-full overflow-hidden rounded-t-full bg-[#AABFC0] ${className}`}>
      {src && <img src={src} alt={alt} className="h-full w-full object-cover" />}
    </div>
  );
}

// Shows how many registration stages are complete.
export function ProgressRing({ done, total }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - (total ? done / total : 0));
  return (
    <div className="relative h-28 w-28 shrink-0" role="img" aria-label={`${done} of ${total} steps done`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#F8F7F2" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="#214F50" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-[#292F2D]">{done}/{total}</span>
        <span className="text-xs text-[#68716D]">steps done</span>
      </div>
    </div>
  );
}