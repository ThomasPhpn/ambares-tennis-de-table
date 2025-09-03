"use client";
import DayCard from "./DayCard";

function toISODateLocal(d: Date) {
  return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
}

export default function WeekView() {
  const today = new Date();
  today.setHours(12, 0, 0, 0); // stabilité TZ
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { iso: toISODateLocal(d) };
  });
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
