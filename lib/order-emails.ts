import { sendMail, SENDER_EMAIL } from "@/utils/mailer";
import { formatCents } from "@/lib/format";
import type { orders, orderItems } from "@/db/schema";

type Order = typeof orders.$inferSelect;
type OrderItem = typeof orderItems.$inferSelect;

const paymentInstructions: Record<Order["paymentMethod"], string> = {
  zelle: "Please send your total via Zelle to albert.marrero10@gmail.com.",
  apple_pay: "We'll text or email you an Apple Pay request shortly.",
  cash_app: "We'll text or email you a Cash App request shortly.",
  cash: "Please have cash ready at pickup or delivery.",
  card_pending: "Online card payment isn't available yet — we'll reach out to arrange payment.",
};

function itemsList(items: OrderItem[]) {
  return items
    .map(
      (item) =>
        `- ${item.productNameSnapshot} x${item.quantity} — ${formatCents(item.lineTotalCents)}`,
    )
    .join("\n");
}

export async function sendOrderConfirmationEmails(order: Order, items: OrderItem[]) {
  const fulfillmentDetail =
    order.fulfillmentMethod === "delivery"
      ? `Delivery to: ${order.deliveryAddressLine1}${
          order.deliveryAddressLine2 ? `, ${order.deliveryAddressLine2}` : ""
        }, ${order.deliveryCity}, ${order.deliveryState} ${order.deliveryZip}`
      : "Pickup at our studio (details to follow)";

  await sendMail({
    from: SENDER_EMAIL,
    to: order.customerEmail,
    subject: `Order Confirmation — ${order.orderNumber} | Roses by Lina`,
    text: `Thank you for your order, ${order.customerName}!

Order ${order.orderNumber} has been received and is pending payment confirmation.

${itemsList(items)}

Subtotal: ${formatCents(order.subtotalCents)}
Delivery fee: ${formatCents(order.deliveryFeeCents)} (to be confirmed if applicable)
${order.rushFeeCents > 0 ? `Rush fee: ${formatCents(order.rushFeeCents)}\n` : ""}Total: ${formatCents(order.totalCents)}

${fulfillmentDetail}
Requested date: ${order.requestedDate}${order.requestedTimeWindow ? ` (${order.requestedTimeWindow})` : ""}

Payment method: ${order.paymentMethod.replace("_", " ")}
${paymentInstructions[order.paymentMethod]}

We'll follow up shortly to confirm details. Questions? Call or text 813-956-2388.

— Roses by Lina`,
  });

  await sendMail({
    from: SENDER_EMAIL,
    // Preview phase: business-side notifications go only to the developer, not the shop
    // owner, until she's ready to see live order traffic. Switch to MY_EMAIL when ready.
    to: process.env.NOTIFICATION_EMAIL || process.env.MY_EMAIL,
    subject: `New Order ${order.orderNumber} — ${order.customerName}`,
    text: `New shop order received.

${itemsList(items)}

Total: ${formatCents(order.totalCents)}
Payment method: ${order.paymentMethod}
Fulfillment: ${fulfillmentDetail}
Requested date: ${order.requestedDate}${order.requestedTimeWindow ? ` (${order.requestedTimeWindow})` : ""}

Customer: ${order.customerName} · ${order.customerEmail} · ${order.customerPhone}
${order.customerNotes ? `Notes: ${order.customerNotes}` : ""}

Manage this order in the admin dashboard.`,
  });
}
