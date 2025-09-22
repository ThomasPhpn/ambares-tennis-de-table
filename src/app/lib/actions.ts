import { sb } from "../lib/supabase";

export async function listAttendance(date: string) {
  return sb
    .from("attendances")
    .select("name, slot")
    .eq("date", date)
    .order("slot");
}

export async function addAttendance(
  date: string,
  slotHHmm: string,
  name: string
) {
  const slot = `${slotHHmm}:00`;

  // ✅ plus de limite côté serveur (géré dans DayCard avec slots.ts)
  return sb
    .from("attendances")
    .upsert(
      { date, slot, name },
      { onConflict: "date,slot,name", ignoreDuplicates: true }
    );
}

export async function removeAttendance(
  date: string,
  slotHHmm: string,
  name: string
) {
  const slot = `${slotHHmm}:00`;
  return sb
    .from("attendances")
    .delete()
    .eq("date", date)
    .eq("slot", slot)
    .eq("name", name);
}
