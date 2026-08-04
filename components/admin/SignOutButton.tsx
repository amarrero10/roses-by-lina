"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-muted-ink hover:text-accent-black cursor-pointer"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
