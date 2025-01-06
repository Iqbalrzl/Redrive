"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";
import {
  Car,
  Users,
  Calendar,
  LayoutDashboard,
  Menu,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, title: "Dashboard" },
    { href: "/admin/vehicles", icon: Car, title: "Vehicles" },
    { href: "/admin/customers", icon: Users, title: "Customers" },
    { href: "/admin/reservations", icon: Calendar, title: "Reservations" },
  ];

  useEffect(() => {
    const checkAdminAuth = async () => {
      const user = await isLoggedIn();
      if (!user || "birthdate" in user) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAdminAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/vehicles"
                className="block p-2 hover:bg-gray-200 rounded"
              >
                Vehicle
              </Link>
            </li>
            <li>
              <Link
                href="/admin/customers"
                className="block p-2 hover:bg-gray-200 rounded"
              >
                Customer
              </Link>
            </li>
            <li>
              <Link
                href="/admin/reservations"
                className="block p-2 hover:bg-gray-200 rounded"
              >
                Reservation
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
