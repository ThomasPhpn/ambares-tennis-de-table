"use client";
import { useState } from "react";
import Onboarding from "./components/Onboarding";
import WeekView from "./components/WeekView";

export default function Home() {
  const [ready, setReady] = useState<boolean>(
    typeof window !== "undefined" ? !!localStorage.getItem("playerName") : false
  );
  return (
    <main className="mx-auto max-w-5xl p-4">
      {!ready && <Onboarding onReady={() => setReady(true)} />}
      <header className="mb-6">
        <h2 className="text-xl font-semibold">Calendrier</h2>
      </header>

      <WeekView />
    </main>
  );
}
