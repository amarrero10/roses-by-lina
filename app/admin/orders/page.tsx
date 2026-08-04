import Link from "next/link";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { orders } from "@/db/schema";
import { formatCents } from "@/lib/format";

const statusStyles: Record<string, string> = {
  pending_payment: "bg-main-text-gold/20 text-accent-black",
  confirmed: "bg-warm-surface text-accent-black",
  fulfilled: "bg-hairline text-accent-black",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage() {
  const db = getDb();
  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 font-serif text-3xl font-light text-accent-black">Orders</h1>

      <div className="rounded-md border border-hairline bg-primary-white">
        {allOrders.length === 0 ? (
          <p className="p-6 text-sm text-muted-ink">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-hairline">
            {allOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-warm-surface"
                >
                  <div>
                    <p className="text-sm font-medium text-accent-black">{order.orderNumber}</p>
                    <p className="text-xs text-muted-ink">
                      {order.customerName} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-accent-black">
                      {formatCents(order.totalCents)}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs capitalize ${
                        statusStyles[order.status] ?? ""
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
