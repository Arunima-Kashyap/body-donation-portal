
import { useEffect, useRef, useState } from "react";

const css = `
@keyframes modalVeilIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalVeilOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes modalCardIn {
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes modalCardOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(10px) scale(0.985);
  }
}

.modal-veil {
  animation: modalVeilIn 280ms ease-out both;
}

.modal-veil.is-closing {
  animation: modalVeilOut 200ms ease-in both;
  pointer-events: none;
}

.modal-card {
  animation: modalCardIn 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.modal-card.is-closing {
  animation: modalCardOut 200ms ease-in both;
}

.modal-content {
  animation: modalContentIn 300ms ease-out both;
}

@keyframes modalContentIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-veil,
  .modal-card,
  .modal-content,
  .modal-veil.is-closing,
  .modal-card.is-closing {
    animation: none;
  }
}
`;

export default function ModalShell({
  onClose,
  label,
  swapKey,
  children,
}) {
  const [closing, setClosing] = useState(false);
  const cardRef = useRef(null);
  const closingRef = useRef(false);
  const closeTimerRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const close = () => {
    if (closingRef.current) return;

    closingRef.current = true;
    setClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      onCloseRef.current?.();
    }, 200);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    cardRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`modal-veil fixed inset-0 z-50 overflow-y-auto ${
        closing ? "is-closing" : ""
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      style={{
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        backgroundColor: "rgba(15, 47, 53, 0.38)",
        backdropFilter: "blur(9px)",
        WebkitBackdropFilter: "blur(9px)",
      }}
    >
      <style>{css}</style>

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <section
          ref={cardRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          aria-labelledby="modal-heading"
          className={`modal-card relative my-auto w-full max-w-md rounded-[2rem] sm:rounded-[2.5rem] bg-[#fffefa] p-6 text-[#141414] shadow-[0_28px_90px_-22px_rgba(15,47,53,0.5)] outline-none sm:p-9 ${
            closing ? "is-closing" : ""
          }`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close dialog"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-[#141414]/50 transition-colors duration-200 hover:bg-[#f2f1ea] hover:text-[#141414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b3f]"
          >
            ×
          </button>

          <div key={swapKey} className="modal-content">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
