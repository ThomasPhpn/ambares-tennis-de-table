"use client";
import DayCard from "./DayCard";

function toISODateLocal(d: Date) {
  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
}

export default function WeekView() {
  const today = new Date();
  today.setHours(12, 0, 0, 0); // stabilité TZ
  const days = [...Array(7)]
    .map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    })
    .filter((d) => {
      const day = d.getDay(); // 0 dimanche, 6 samedi
      return day >= 1 && day <= 5;
    })
    .map((d) => ({ iso: toISODateLocal(d) }));
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {days.map((d) => (
        <div key={d.iso}>
          <DayCard dateISO={d.iso} />
        </div>
      ))}
    </div>
  );
}
