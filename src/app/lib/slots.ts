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
    { start: "19:30", end: "21:00" },
    { start: "21:00", end: "22:00" },
  ],
  tuesday: [
    { start: "17:00", end: "18:00" },
    { start: "18:00", end: "19:30", label: "Entraînement adultes" },
    { start: "19:30", end: "21:00", label: "Entraînement adultes" },
    { start: "21:00", end: "22:00" },
  ],
  wednesday: [
    { start: "14:15", end: "16:00", label: "Entraînement jeunes" },
    { start: "16:00", end: "17:30" },
    { start: "17:30", end: "19:00" },
    { start: "19:00", end: "20:30" },
    { start: "20:30", end: "22:00" },
  ],
  thursday: [
    { start: "17:00", end: "18:30" },
    { start: "18:30", end: "20:00" },
    { start: "20:00", end: "21:30" },
    { start: "21:30", end: "22:00" },
  ],
  friday: [
    { start: "17:00", end: "18:30" },
    { start: "18:30", end: "20:30" }, // libre (14 places)
    { start: "20:30", end: "22:00", capacity: 28 }, // spécial
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
