"use client";

import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { phoneModels } from "@/lib/products";

export function PhoneModelSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return phoneModels.slice(0, 24);
    }
    return phoneModels
      .filter((model) => model.toLowerCase().includes(search))
      .slice(0, 24);
  }, [query]);

  return (
    <div className="rounded-[20px] border border-black/10 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black">Phone model</p>
          <p className="text-xs font-bold text-black/55">
            Available for 500+ Phone Models
          </p>
        </div>
        {value ? (
          <span className="grid size-8 place-items-center rounded-full bg-green-600 text-white">
            <Check size={16} />
          </span>
        ) : null}
      </div>
      <label className="mt-4 flex h-12 items-center gap-2 rounded-[14px] border border-black/10 bg-[#fbf7f1] px-3">
        <Search size={18} className="text-black/45" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search brand or model"
          className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
        />
      </label>
      <div className="mt-3 max-h-56 overflow-y-auto pr-1">
        <div className="grid gap-2 sm:grid-cols-2">
          {filtered.map((model) => (
            <button
              key={model}
              type="button"
              onClick={() => onChange(model)}
              className={`min-h-11 rounded-[14px] border px-3 text-left text-sm font-bold transition ${
                value === model
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white hover:border-black/30"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
