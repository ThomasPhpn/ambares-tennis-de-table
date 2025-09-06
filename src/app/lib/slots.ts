// Type d'un créneau
export type SlotDef = {
  start: string;
  end: string;
  label?: string;
  capacity?: number;
};

// Créneaux par jour
export const SLOTS_BY_DAY: Record<string, SlotDef[]> = {
  monday: [
    { start: "17:00", end: "18:15", label: "Entraînement jeunes" },
    { start: "18:15", end: "19:30", label: "Entraînement jeunes" },
    { start: "19:30", end: "21:00" }, // libre
  ],
  tuesday: [
    { start: "18:00", end: "19:30", label: "Entraînement adultes" },
    { start: "19:30", end: "21:00", label: "Entraînement adultes" },
  ],
  wednesday: [{ start: "14:15", end: "16:00", label: "Entraînement jeunes" }],
  thursday: [
    { start: "17:00", end: "18:30" },
    { start: "18:30", end: "20:00" },
    { start: "20:00", end: "21:30" },
  ],
  friday: [
    { start: "17:00", end: "18:30" },
    { start: "18:30", end: "20:00" },
    { start: "20:00", end: "21:30" },
    { start: "20:30", end: "22:00", capacity: 28 }, // spécial 28 places
  ],
  saturday: [
    { start: "10:00", end: "12:00" },
    { start: "14:00", end: "16:00" },
    { start: "16:00", end: "18:00" },
  ],
  sunday: [
    { start: "10:00", end: "12:00" },
    { start: "14:00", end: "16:00" },
    { start: "16:00", end: "18:00" },
  ],
};
