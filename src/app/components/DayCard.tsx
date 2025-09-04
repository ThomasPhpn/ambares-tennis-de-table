"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { SLOTS } from "../lib/slots";
import {
  listAttendance,
  addAttendance,
  removeAttendance,
} from "../lib/actions";

// Types pour plus de clarté
type AttendanceRow = {
  slot: string;
  name: string;
};

type MapSlots = Record<string, string[]>;

function formatHour(hhmm: string) {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${h}h` : `${h}h${m}`;
}

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
    const map: MapSlots = Object.fromEntries(SLOTS.map((s) => [s, []]));
    for (const row of (data ?? []) as AttendanceRow[]) {
      const s = row.slot.slice(0, 5);
      map[s] = [...(map[s] || []), row.name];
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

  function addMinutes(hhmm: string, minutes: number) {
    const [h, m] = hhmm.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    d.setMinutes(d.getMinutes() + minutes);
    return d.toTimeString().slice(0, 5); // "HH:MM"
  }

  return (
    <div className="rounded-2xl p-4 border border-black bg-white">
      <h3 className="mb-3 text-lg text-[#EB212E] font-semibold">
        <Link href={`/${dateISO}`} className="underline hover:no-underline">
          {labelFr(dateISO)}
        </Link>
      </h3>
      <div className="space-y-3">
        {SLOTS.map((slot) => {
          const list = bySlot[slot] || [];
          const imIn = list.includes(name);
          return (
            <div key={slot} className="rounded-xl border border-black p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">
                  {formatHour(slot)} - {formatHour(addMinutes(slot, 90))}
                </span>

                <button
                  onClick={() => toggle(slot)}
                  disabled={!imIn && list.length >= 14}
                  className="text-sm rounded-full px-3 py-1 bg-white text-black border border-black hover:bg-[#f24b55] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {imIn
                    ? "Me désinscrire"
                    : list.length >= 14
                    ? "Complet"
                    : "Je viens"}
                </button>
              </div>
              <div className="text-sm opacity-70 text-[#EB212E]">
                {list.length} / 14 inscrit(s)
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
