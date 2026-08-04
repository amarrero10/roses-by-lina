import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderByNumber } from "@/lib/orders";
import { formatCents } from "@/lib/format";
import Button from "@/components/ui/Button";

type OrderConfirmationPageProps = {
  params: Promise<{ orderNumber: string }>;
};

const paymentLabels: Record<string, string> = {
  zelle: "Zelle",
  apple_pay: "Apple Pay",
  cash_app: "Cash App",
  cash: "Cash",
  card_pending: "Card (pending)",
};

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderNumber } = await params;
  const result = await getOrderByNumber(orderNumber);

  if (!result) notFound();

  const { order, items } = result;

  return (
    <section className="bg-primary-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-4 block text-sm uppercase tracking-widest text-muted-ink">
          Order Received
        </span>
        <h1 className="font-serif text-3xl font-light text-accent-black md:text-5xl">
          Thank You, {order.customerName.split(" ")[0]}!
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-ink">
          Your order <span className="font-medium text-accent-black">{order.orderNumber}</span> is
          confirmed as <span className="font-medium text-accent-black">pending payment</span>.
          We&apos;ve emailed the details to {order.customerEmail} and will follow up shortly to
          finalize payment and delivery details.
        </p>

        <div className="mt-12 rounded-md border border-hairline p-6 text-left">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-accent-black">
                  {item.productNameSnapshot} &times; {item.quantity}
                </span>
                <span className="text-muted-ink">{formatCents(item.lineTotalCents)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-hairline pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-ink">Subtotal</span>
              <span className="text-accent-black">{formatCents(order.subtotalCents)}</span>
            </div>
            {order.rushFeeCents > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-ink">Rush fee</span>
                <span className="text-accent-black">{formatCents(order.rushFeeCents)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-ink">Delivery fee</span>
              <span className="text-accent-black">
                {order.fulfillmentMethod === "pickup"
                  ? "Free (pickup)"
                  : `${formatCents(order.deliveryFeeCents)} (to be confirmed)`}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-base font-medium">
              <span className="text-accent-black">Total</span>
              <span className="text-accent-black">{formatCents(order.totalCents)}</span>
            </div>
          </div>
          <div className="mt-4 border-t border-hairline pt-4 text-sm text-muted-ink">
            <p>
              Payment method: <span className="text-accent-black">{paymentLabels[order.paymentMethod]}</span>
            </p>
            <p className="mt-1">
              {order.fulfillmentMethod === "delivery" ? "Delivery" : "Pickup"} requested for{" "}
              <span className="text-accent-black">{order.requestedDate}</span>
              {order.requestedTimeWindow ? ` · ${order.requestedTimeWindow}` : ""}
            </p>
          </div>
        </div>

        <Link href="/shop" className="mt-10 inline-block">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    </section>
  );
}
