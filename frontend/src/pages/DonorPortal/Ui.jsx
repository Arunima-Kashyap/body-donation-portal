import { useEffect, useRef, useState } from "react";

// LifeBridge palette (same as the landing page)
export const C = {
  paper: "#F2F0E8", // Warm Ivory
  white: "#F8F7F2", // Ivory White
  teal: "#214F50", // Deep Teal
  blue: "#AABFC0", // Dusty Blue
  clay: "#C98269", // Warm Clay
  mustard: "#D9C58E", // Muted Mustard
  ink: "#292F2D", // Dark Charcoal
  sage: "#DCE5DD",
  lightSage: "#E8EEEA",
  lightBlue: "#E3EBE9",
  paleBlue: "#EDF1EE",
  lightClay: "#EBDAD2",
  paleClay: "#F2E8E2",
  lightMustard: "#EDE5D1",
  border: "#DCDDD4",
  muted: "#68716D",
};

export const display = { fontFamily: "'Newsreader', Georgia, serif", fontWeight: 400 };
export const serif = { fontFamily: "'Newsreader', Georgia, serif" };
export const sans = { fontFamily: "'Inter Tight', system-ui, -apple-system, sans-serif" };

// Small sentence-case text style, used for navigation and quiet labels.
export const label = "text-sm font-medium tracking-wide";

export function Bars({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path d="M5 9H27M5 16H27M5 23H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Fades a block in once as it scrolls into view. Skipped for people who prefer reduced motion.
export function Reveal({ children, className = "", delay = 0 }) {
  const calm =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [visible, setVisible] = useState(calm);
  const ref = useRef(null);

  useEffect(() => {
    if (calm) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [calm]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 800ms ease-out ${delay}ms, transform 800ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
