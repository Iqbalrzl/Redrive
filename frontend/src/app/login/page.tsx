"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login, isLoggedIn } from "@/lib/auth";
import { useAuth } from "@/components/auth-provider";

export default function LoginPage() {
  const [customerUsername, setCustomerUsername] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent, isAdmin: boolean = false) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = isAdmin
        ? { username: adminUsername, password: adminPassword }
        : { username: customerUsername, password: customerPassword };

      const [token, loggedInAsAdmin] = await login(credentials, isAdmin);
      const user = await isLoggedIn();
      setUser(user);

      if (
        (user && loggedInAsAdmin && "birthdate" in user) ||
        (user && !loggedInAsAdmin && !("birthdate" in user))
      ) {
        toast({
          variant: "destructive",
          title: "Invalid Form",
          description: `Please enter your credentials at the correct side.`,
        });
      } else {
        toast({
          title: "Success",
          description: `You have successfully logged in as ${
            isAdmin ? "admin" : "customer"
          }.`,
          className: "bg-success text-white",
        });
        router.push(loggedInAsAdmin ? "/admin" : "/");
      }
    } catch (err) {
      setError("Invalid username or password");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid username or password.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex space-x-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Customer Login</h1>
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerUsername">Username</Label>
              <Input
                id="customerUsername"
                type="text"
                value={customerUsername}
                onChange={(e) => setCustomerUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPassword">Password</Label>
              <Input
                id="customerPassword"
                type="password"
                value={customerPassword}
                onChange={(e) => setCustomerPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login as Customer
            </Button>
          </form>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminUsername">Username</Label>
              <Input
                id="adminUsername"
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login as Admin
            </Button>
          </form>
        </div>
      </div>
      {error && <p className="text-destructive text-center mt-4">{error}</p>}
    </div>
  );
}
