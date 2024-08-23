import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) {
      const isAdminUser = user?.role === "admin";
      if (isAdminUser) {
        setIsAdmin(true);
      } else {
        redirect("/");
      }
    } else {
      redirect("/");
    }
  }, [user]);

  if (isAdmin === null) {
    return null;
  }

  return isAdmin ? <>{children}</> : null;
}
