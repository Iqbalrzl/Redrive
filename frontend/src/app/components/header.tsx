"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { MeResponse, AdminResponse } from "@/lib/auth";
import { Search } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
}

export function Header() {
  const { user, setUser } = useAuth() as {
    user: MeResponse | AdminResponse | null;
    setUser: React.Dispatch<
      React.SetStateAction<MeResponse | AdminResponse | null>
    >;
  };
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);

  const handleLogout = () => {
    logout();
    setUser(null);
    toast({
      title: "Success",
      description: "You have been logged out.",
      className: "bg-success text-white",
    });
    router.push("/");
  };

  const isAdmin = user && "username" in user && !("birthdate" in user);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axiosInstance.get(
          `/api/vehicle/search?q=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching vehicles:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          REDRIVE
        </Link>
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white text-black placeholder-gray-400 border-gray-700"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full max-w-md mt-1 bg-black rounded-md shadow-lg">
              {searchResults.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="px-4 py-2 hover:bg-transparant cursor-pointer"
                  onClick={() => {
                    router.push(`/reserve/${vehicle.id}`);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  {vehicle.brand} {vehicle.model}
                </div>
              ))}
            </div>
          )}
        </div>
        <nav className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-sm font-medium hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className=" text-white hover:text-gray-300 transition-colors">
                  {isAdmin ? "Admin" : user.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-gray-800">
                {isAdmin ? (
                  <DropdownMenuItem
                    onSelect={() => router.push("/admin")}
                    className="text-white hover:bg-gray-900"
                  >
                    Admin Dashboard
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem
                      onSelect={() => router.push("/profile")}
                      className="text-white hover:bg-gray-900"
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => router.push("/reservations")}
                      className="text-white hover:bg-gray-900"
                    >
                      Reservations
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem
                  onSelect={handleLogout}
                  className="text-white hover:bg-gray-900"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
