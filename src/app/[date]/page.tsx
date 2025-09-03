"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import DayCard from "../components/DayCard";

function formatDateFr(dateISO: string) {
  const d = new Date(dateISO);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DayPage() {
  const params = useParams();
  const date = params?.date as string;

  return (
    <main className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Présences du {formatDateFr(date)}
        </h1>
        <Link
          href="/"
          className="rounded-full px-3 py-1 bg-[#EB212E] text-white border border-black hover:bg-[#f24b55]"
        >
          ← Retour au calendrier
        </Link>
      </div>
      <DayCard dateISO={date} />
    </main>
  );
}
