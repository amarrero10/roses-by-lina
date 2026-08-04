import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { orders, products } from "@/db/schema";
import { formatCents } from "@/lib/format";

export default async function AdminDashboardPage() {
  const db = getDb();

  const [pendingCount, activeProductCount, recentOrders] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, "pending_payment")),
    db.select({ count: sql<number>`count(*)` }).from(products).where(eq(products.isActive, true)),
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(8),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 font-serif text-3xl font-light text-accent-black">Dashboard</h1>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-hairline bg-primary-white p-6">
          <p className="text-sm text-muted-ink">Pending Payment</p>
          <p className="mt-2 text-3xl font-light text-accent-black">{pendingCount[0]?.count ?? 0}</p>
        </div>
        <div className="rounded-md border border-hairline bg-primary-white p-6">
          <p className="text-sm text-muted-ink">Active Products</p>
          <p className="mt-2 text-3xl font-light text-accent-black">
            {activeProductCount[0]?.count ?? 0}
          </p>
        </div>
      </div>

      <div className="rounded-md border border-hairline bg-primary-white">
        <div className="flex items-center justify-between border-b border-hairline p-6">
          <h2 className="text-sm uppercase tracking-widest text-muted-ink">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm underline hover:text-accent-black">
            View All
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="p-6 text-sm text-muted-ink">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-hairline">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-warm-surface"
                >
                  <div>
                    <p className="text-sm font-medium text-accent-black">{order.orderNumber}</p>
                    <p className="text-xs text-muted-ink">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-accent-black">{formatCents(order.totalCents)}</p>
                    <p className="text-xs capitalize text-muted-ink">
                      {order.status.replace("_", " ")}
                    </p>
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
