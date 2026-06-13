import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart } from "lucide-react";

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
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto max-w-lg px-4 pb-4">
        <div className="bg-black/80 dark:bg-white/80 backdrop-blur-2xl rounded-[2rem] border border-white/10 dark:border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
          <ul className="grid grid-cols-3 h-16">
            {items.map((it) => {
              const active = it.match(path);
              const Icon = it.icon;

              return (
                <li key={it.key} className="relative">
                  <Link
                    to={it.to}
                    aria-current={active ? "page" : undefined}
                    className="flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300"
                  >
                    <div className="relative group">
                      <div className={`absolute -inset-3 rounded-full transition-all duration-500 ${active ? "bg-primary/20 scale-100 opacity-100 blur-md" : "scale-0 opacity-0"}`} />
                      <Icon
                        className={
                          "relative z-10 transition-all duration-500 " +
                          (active
                            ? "h-5 w-5 stroke-[2.5] text-white dark:text-black " +
                              (it.key === "fav" ? "fill-red-500 stroke-red-500" : "")
                            : "h-5 w-5 stroke-[2] text-white/50 dark:text-black/50 group-hover:text-white/80")
                        }
                      />
                    </div>
                    <span
                      className={
                        "text-[9px] font-black uppercase tracking-[0.1em] transition-all duration-500 " +
                        (active ? "text-white dark:text-black" : "text-white/40 dark:text-black/40")
                      }
                    >
                      {it.label}
                    </span>
                  </Link>
                  {active && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-fade-in" />
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
