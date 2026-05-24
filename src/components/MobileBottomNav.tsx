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
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      <div className="border-t border-border/40 bg-background/92 backdrop-blur-xl">
        <ul className="mx-auto grid max-w-md grid-cols-3 px-1 py-1">
          {items.map((it) => {
            const active = it.match(path);
            const Icon = it.icon;

            return (
              <li key={it.key} className="flex">
                <Link
                  to={it.to}
                  className="flex w-full items-center justify-center active:scale-95 transition-transform duration-100"
                >
                  <span className="relative flex flex-col items-center gap-0.5 py-1.5 px-2 w-full">
                    {active && (
                      <span className="absolute inset-x-1 top-0.5 h-8 rounded-xl bg-primary/10" />
                    )}
                    <span
                      className={
                        "relative z-10 transition-all duration-200 " +
                        (active ? "text-primary scale-110" : "text-muted-foreground")
                      }
                    >
                      <Icon
                        className={
                          "transition-all duration-200 " +
                          (active
                            ? "h-5 w-5 stroke-[2.2]" + (it.key === "fav" ? " fill-red-500 stroke-red-500" : "")
                            : "h-5 w-5 stroke-[1.8]")
                        }
                      />
                    </span>
                    <span
                      className={
                        "relative z-10 text-[10px] font-medium leading-none transition-all duration-200 " +
                        (active ? "text-primary" : "text-muted-foreground")
                      }
                    >
                      {it.label}
                    </span>
                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
