import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

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
          <span className="text-sm text-muted-ink">{session.user.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
