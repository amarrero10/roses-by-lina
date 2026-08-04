export function formatCents(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const categoryLabels: Record<string, string> = {
  bouquet: "Bouquets",
  arrangement: "Arrangements",
  centerpiece: "Centerpieces",
  seasonal: "Seasonal",
  other: "More",
};
