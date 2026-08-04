import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { formatCents } from "@/lib/format";
import OrderStatusForm from "@/components/admin/OrderStatusForm";

type AdminOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const { id } = await params;
  const db = getDb();

  const [order] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (!order) notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light text-accent-black">{order.orderNumber}</h1>
          <p className="text-sm text-muted-ink">
            Placed {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-md border border-hairline bg-primary-white p-6">
          <h2 className="mb-4 text-sm uppercase tracking-widest text-muted-ink">Customer</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-ink">Name</dt>
              <dd className="text-accent-black">{order.customerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-ink">Email</dt>
              <dd className="text-accent-black">{order.customerEmail}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-ink">Phone</dt>
              <dd className="text-accent-black">{order.customerPhone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-ink">Payment</dt>
              <dd className="capitalize text-accent-black">
                {order.paymentMethod.replace("_", " ")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-md border border-hairline bg-primary-white p-6">
          <h2 className="mb-4 text-sm uppercase tracking-widest text-muted-ink">Fulfillment</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-ink">Method</dt>
              <dd className="capitalize text-accent-black">{order.fulfillmentMethod}</dd>
            </div>
            {order.fulfillmentMethod === "delivery" && (
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-muted-ink">Address</dt>
                <dd className="text-right text-accent-black">
                  {order.deliveryAddressLine1}
                  {order.deliveryAddressLine2 ? `, ${order.deliveryAddressLine2}` : ""},{" "}
                  {order.deliveryCity}, {order.deliveryState} {order.deliveryZip}
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-ink">Requested</dt>
              <dd className="text-accent-black">
                {order.requestedDate}
                {order.requestedTimeWindow ? ` · ${order.requestedTimeWindow}` : ""}
              </dd>
            </div>
          </dl>
          {order.customerNotes && (
            <p className="mt-4 border-t border-hairline pt-4 text-sm text-muted-ink">
              &ldquo;{order.customerNotes}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="mb-6 rounded-md border border-hairline bg-primary-white p-6">
        <h2 className="mb-4 text-sm uppercase tracking-widest text-muted-ink">Items</h2>
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
          <div className="flex justify-between">
            <span className="text-muted-ink">Delivery Fee</span>
            <span className="text-accent-black">{formatCents(order.deliveryFeeCents)}</span>
          </div>
          {order.rushFeeCents > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-ink">Rush Fee</span>
              <span className="text-accent-black">{formatCents(order.rushFeeCents)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-medium">
            <span className="text-accent-black">Total</span>
            <span className="text-accent-black">{formatCents(order.totalCents)}</span>
          </div>
        </div>
      </div>

      <OrderStatusForm
        orderId={order.id}
        status={order.status}
        deliveryFeeCents={order.deliveryFeeCents}
        adminNotes={order.adminNotes}
      />
    </div>
  );
}
