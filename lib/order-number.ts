export function generateOrderNumber() {
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
  return `RBL-${token}`;
}
