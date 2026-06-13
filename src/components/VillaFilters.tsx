import { AREAS, CATEGORIES, AMENITIES, PRICE_MIN, PRICE_MAX, formatIDR } from "@/data/villas";
import type { SortKey } from "@/data/villas";

export type FilterValues = {
  areas: string[];
  categories: string[];
  amenities: string[];
  minPrice: number;
  maxPrice: number;
  guests: number;
  sort: SortKey;
};

type Props = {
  values: FilterValues;
  onChange: (next: Partial<FilterValues>) => void;
  onReset: () => void;
};

function toggle(list: string[], item: string) {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function VillaFilters({ values, onChange, onReset }: Props) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-[0.18em] text-foreground sm:text-sm sm:tracking-widest">
          Filter Pilihan
        </h3>
        <button onClick={onReset} className="text-xs font-bold text-primary hover:underline">
          Reset
        </button>
      </div>

      <Group title="Area">
        <div className="flex flex-col gap-3">
          {AREAS.map((a) => {
            const checked = values.areas.includes(a);
            return (
              <label
                key={a}
                className={`flex cursor-pointer items-center justify-between rounded-[1.1rem] border p-2.5 transition-all sm:p-3 ${
                  checked
                    ? "bg-primary/5 border-primary/20"
                    : "bg-secondary/20 border-transparent hover:bg-secondary/40"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${checked ? "text-primary" : "text-foreground"}`}
                >
                  {a}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ areas: toggle(values.areas, a) })}
                  className="h-[1.125rem] w-[1.125rem] rounded-md border-border text-primary transition-all focus:ring-primary"
                />
              </label>
            );
          })}
        </div>
      </Group>

      <Group title="Kategori Liburan">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = values.categories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ categories: toggle(values.categories, c) })}
                className={
                  "press rounded-full border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-all sm:px-4 " +
                  (active
                    ? "border-primary/20 bg-primary/10 text-primary shadow-none"
                    : "border-border bg-card text-foreground hover:bg-secondary")
                }
              >
                {c}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Rentang Harga / malam">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between text-xs font-black tabular-nums sm:text-sm">
            <span className="text-primary">{formatIDR(values.minPrice)}</span>
            <span className="text-primary">{formatIDR(values.maxPrice)}</span>
          </div>
          <div className="space-y-4">
            <div className="relative h-1 bg-secondary rounded-full">
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={50000}
                value={values.minPrice}
                onChange={(e) =>
                  onChange({ minPrice: Math.min(Number(e.target.value), values.maxPrice) })
                }
                className="absolute w-full h-full appearance-none bg-transparent cursor-pointer z-10 accent-primary"
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={50000}
                value={values.maxPrice}
                onChange={(e) =>
                  onChange({ maxPrice: Math.max(Number(e.target.value), values.minPrice) })
                }
                className="absolute w-full h-full appearance-none bg-transparent cursor-pointer z-20 accent-primary"
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Minimum
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Maksimum
              </span>
            </div>
          </div>
        </div>
      </Group>

      <Group title="Jumlah Tamu">
        <div className="flex items-center justify-between rounded-[1.1rem] border border-transparent bg-secondary/20 p-1.5 sm:p-2">
          <button
            type="button"
            onClick={() => onChange({ guests: Math.max(1, values.guests - 1) })}
            className="press grid h-10 w-10 place-items-center rounded-xl bg-card text-foreground shadow-sm transition-all hover:bg-secondary sm:h-12 sm:w-12"
          >
            −
          </button>
          <div className="text-center">
            <span className="text-base font-black tabular-nums text-foreground sm:text-lg">
              {values.guests}
            </span>
            <span className="ml-1 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Tamu
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange({ guests: Math.min(20, values.guests + 1) })}
            className="press grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-all hover:bg-primary/15 sm:h-12 sm:w-12"
          >
            +
          </button>
        </div>
      </Group>

      <Group title="Fasilitas Unggulan">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-1">
          {AMENITIES.map((a) => {
            const checked = values.amenities.includes(a);
            return (
              <label
                key={a}
                className={`flex cursor-pointer items-center justify-between rounded-[1.1rem] border p-2.5 transition-all sm:p-3 ${
                  checked
                    ? "bg-primary/5 border-primary/20"
                    : "bg-secondary/20 border-transparent hover:bg-secondary/40"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${checked ? "text-primary" : "text-foreground"}`}
                >
                  {a}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ amenities: toggle(values.amenities, a) })}
                  className="h-[1.125rem] w-[1.125rem] rounded-md border-border text-primary transition-all focus:ring-primary"
                />
              </label>
            );
          })}
        </div>
      </Group>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <h4 className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground/60 sm:mb-4 sm:tracking-[0.2em]">
        {title}
      </h4>
      {children}
    </div>
  );
}
