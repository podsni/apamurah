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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filter</h3>
        <button
          onClick={onReset}
          className="text-xs font-medium text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <Group title="Area">
        <div className="flex flex-col gap-2">
          {AREAS.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={values.areas.includes(a)}
                onChange={() => onChange({ areas: toggle(values.areas, a) })}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              {a}
            </label>
          ))}
        </div>
      </Group>

      <Group title="Kategori">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = values.categories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ categories: toggle(values.categories, c) })}
                className={
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
                  (active
                    ? "border-primary bg-primary text-primary-foreground"
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
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatIDR(values.minPrice)}</span>
            <span>{formatIDR(values.maxPrice)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <span className="text-[11px] uppercase text-muted-foreground">Min</span>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={50000}
                value={values.minPrice}
                onChange={(e) => onChange({ minPrice: Math.min(Number(e.target.value), values.maxPrice) })}
                className="w-full accent-primary"
              />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase text-muted-foreground">Max</span>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={50000}
                value={values.maxPrice}
                onChange={(e) => onChange({ maxPrice: Math.max(Number(e.target.value), values.minPrice) })}
                className="w-full accent-primary"
              />
            </label>
          </div>
        </div>
      </Group>

      <Group title="Jumlah Tamu">
        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => onChange({ guests: Math.max(1, values.guests - 1) })}
            className="grid h-8 w-8 place-items-center rounded text-foreground hover:bg-secondary"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center text-sm font-medium text-foreground">
            {values.guests}+
          </span>
          <button
            type="button"
            onClick={() => onChange({ guests: Math.min(20, values.guests + 1) })}
            className="grid h-8 w-8 place-items-center rounded text-foreground hover:bg-secondary"
          >
            +
          </button>
        </div>
      </Group>

      <Group title="Fasilitas">
        <div className="grid grid-cols-1 gap-2">
          {AMENITIES.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={values.amenities.includes(a)}
                onChange={() => onChange({ amenities: toggle(values.amenities, a) })}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              {a}
            </label>
          ))}
        </div>
      </Group>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      {children}
    </div>
  );
}