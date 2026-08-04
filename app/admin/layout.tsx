import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-warm-surface">
      <header className="flex items-center justify-between border-b border-hairline bg-primary-white px-6 py-4 md:px-10">
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/admin" className="font-serif text-lg text-accent-black">
            Admin
          </Link>
          <Link href="/admin/products" className="text-muted-ink hover:text-accent-black">
            Products
          </Link>
          <Link href="/admin/orders" className="text-muted-ink hover:text-accent-black">
            Orders
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted-ink hover:text-accent-black">
            View Site
          </Link>
          <UserButton />
        </div>
      </header>
      <main className="px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
