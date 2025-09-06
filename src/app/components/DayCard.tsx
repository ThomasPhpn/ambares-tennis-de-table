"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { SLOTS_BY_DAY } from "../lib/slots";
import {
  listAttendance,
  addAttendance,
  removeAttendance,
} from "../lib/actions";

// Types
type AttendanceRow = {
  slot: string;
  name: string;
};

type MapSlots = Record<string, string[]>;

// Format heures
function formatHour(hhmm: string) {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${h}h` : `${h}h${m}`;
}

// Titre jour
function labelFr(dateISO: string) {
  const d = new Date(dateISO);
  const jour = d.toLocaleDateString("fr-FR", { weekday: "long" });
  const n = d.getDate();
  const num = n === 1 ? "1er" : String(n);
  return `${jour.charAt(0).toUpperCase() + jour.slice(1)} ${num}`;
}

export default function DayCard({ dateISO }: { dateISO: string }) {
  const [bySlot, setBySlot] = useState<MapSlots>({});
  const name =
    typeof window !== "undefined"
      ? localStorage.getItem("playerName") || ""
      : "";

  const refresh = useCallback(async () => {
    const { data } = await listAttendance(dateISO);

    const day = new Date(dateISO)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const slots = SLOTS_BY_DAY[day as keyof typeof SLOTS_BY_DAY] || [];
    const map: MapSlots = Object.fromEntries(slots.map((s) => [s.start, []]));

    for (const row of (data ?? []) as AttendanceRow[]) {
      const s = row.slot.slice(0, 5);
      if (map[s]) {
        map[s] = [...(map[s] || []), row.name];
      }
    }
    setBySlot(map);
  }, [dateISO]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function toggle(slot: string) {
    if (!name) return alert("Renseigne ton prénom (bouton en haut).");
    const present = (bySlot[slot] || []).includes(name);
    if (present) await removeAttendance(dateISO, slot, name);
    else await addAttendance(dateISO, slot, name);
    refresh();
  }

  const day = new Date(dateISO)
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const slots = SLOTS_BY_DAY[day as keyof typeof SLOTS_BY_DAY] || [];

  return (
    <div className="rounded-2xl p-4 border border-black bg-white">
      <h3 className="mb-3 text-lg text-[#EB212E] font-semibold text-center">
        <Link href={`/${dateISO}`} className="underline hover:no-underline">
          {labelFr(dateISO)}
        </Link>
      </h3>
      <div className="space-y-3">
        {slots.map(({ start, end, label, capacity }) => {
          const list = bySlot[start] || [];
          const imIn = list.includes(name);
          const cap = capacity ?? 14;

          return (
            <div key={start} className="rounded-xl border border-black p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">
                  {formatHour(start)} - {formatHour(end)}
                </span>

                <button
                  onClick={() => toggle(start)}
                  disabled={!imIn && list.length >= cap}
                  className="text-sm rounded-full px-3 py-1 bg-white text-black border border-black hover:bg-[#f24b55] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {imIn
                    ? "Me désinscrire"
                    : list.length >= cap
                    ? "Complet"
                    : "Je viens"}
                </button>
              </div>
              <div className="text-sm opacity-70 text-[#EB212E]">
                {list.length} / {cap} inscrit(s)
                {label && <span className="ml-2 font-semibold">{label}</span>}
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {list.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border-black px-2 py-1 text-sm"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
