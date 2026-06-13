import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "scroll back to top" button.
 * Hidden until the user has scrolled past ~500px. Tapping flies back to 0.
 * Hidden on print and when prefers-reduced-motion is set.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      className="press fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card text-foreground shadow-[0_4px_16px_-2px_rgb(20_50_90/0.18)] backdrop-blur transition-colors hover:bg-secondary sm:bottom-6 sm:right-6"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
