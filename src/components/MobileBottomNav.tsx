import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Home, Search } from "lucide-react";

type Item = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  match: (path: string) => boolean;
};

const items: Item[] = [
  { key: "home", label: "Beranda", icon: Home, to: "/", match: (p) => p === "/" },
  {
    key: "search",
    label: "Cari",
    icon: Search,
    to: "/villas",
    match: (p) => p.startsWith("/villas"),
  },
  {
    key: "fav",
    label: "Favorit",
    icon: Heart,
    to: "/favorites",
    match: (p) => p === "/favorites",
  },
];

export function MobileBottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="mx-auto max-w-[26rem] px-4">
        <div className="glass-edge overflow-hidden rounded-[1.45rem] border border-border/70 bg-card/92 backdrop-blur-2xl dark:border-white/10 dark:bg-black/82">
          <ul className="grid h-14 grid-cols-3">
            {items.map((it) => {
              const active = it.match(path);
              const Icon = it.icon;

              return (
                <li key={it.key} className="relative">
                  <Link
                    to={it.to}
                    aria-current={active ? "page" : undefined}
                    className="pressable flex h-full w-full flex-col items-center justify-center gap-0.5"
                  >
                    <div className="relative group">
                      <div
                        className={`absolute -inset-2 rounded-full transition-all duration-500 ${
                          active
                            ? "scale-100 bg-primary/12 opacity-100 blur-md"
                            : "scale-0 opacity-0"
                        }`}
                      />
                      <Icon
                        className={
                          "relative z-10 h-[1.15rem] w-[1.15rem] transition-all duration-300 ease-[var(--ease-out-quart)] " +
                          (active
                            ? "-translate-y-0.5 scale-110 stroke-[2.35] text-primary " +
                              (it.key === "fav" ? "fill-red-500 stroke-red-500" : "")
                            : "stroke-[2] text-muted-foreground group-hover:text-foreground")
                        }
                      />
                    </div>
                    <span
                      className={
                        "text-[10px] font-bold tracking-tight transition-all duration-500 " +
                        (active ? "text-primary" : "text-muted-foreground")
                      }
                    >
                      {it.label}
                    </span>
                  </Link>
                  {active && (
                    <div className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-b-full bg-primary animate-fade-in" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
