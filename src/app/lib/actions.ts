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

  // Vérifier combien d'inscrits déjà pour ce créneau
  const { data: existing, error } = await sb
    .from("attendances")
    .select("name", { count: "exact" })
    .eq("date", date)
    .eq("slot", slot);

  if (error) return { error };

  if (existing && existing.length >= 14) {
    return { error: "Ce créneau est déjà complet (14 max)" };
  }

  // Sinon on inscrit
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
