"use client";
import { useEffect, useState } from "react";

export default function Onboarding({ onReady }: { onReady: () => void }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("playerName")) onReady();
  }, [onReady]);

  function save() {
    if (!name.trim()) return;
    localStorage.setItem("playerName", name.trim());
    onReady();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-amber-50 p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-black">Bienvenue 👋</h2>
        <input
          className="mb-2 w-full rounded border text-black border-gray-900 px-3 py-2"
          placeholder="Ton prénom + 2 lettres du nom (ex: MaximeBe)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mb-4 text-sm text-gray-700">
          👉 Pour éviter les doublons, utilise{" "}
          <strong>Prénom + 2 premières lettres du nom</strong>.
        </p>
        <button
          onClick={save}
          className="w-full rounded-full px-4 py-2 bg-white text-black border border-black hover:bg-[#f24b55]"
        >
          C’est parti
        </button>
      </div>
    </div>
  );
}
