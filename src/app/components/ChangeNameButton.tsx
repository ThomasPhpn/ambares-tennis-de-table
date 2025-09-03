"use client";

export default function ChangeNameButton() {
  function resetName() {
    localStorage.removeItem("playerName");
    location.reload();
  }
  return (
    <button
      type="button"
      onClick={resetName}
      className="rounded-full px-4 py-2 bg-[#EB212E] text-white border border-black hover:bg-[#f24b55] transition"
    >
      Changer de prénom
    </button>
  );
}
