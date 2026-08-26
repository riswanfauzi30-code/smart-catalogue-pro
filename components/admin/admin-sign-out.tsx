"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSignOut() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
