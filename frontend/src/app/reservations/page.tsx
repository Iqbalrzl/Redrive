"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, CarIcon, DollarSignIcon } from "lucide-react";

interface Reservation {
  id: number;
  vehicle: {
    brand: string;
    model: string;
  };
  date: string;
  duration: number;
  starts: string;
  ends: string;
  total: number;
}

export default function ReservationsPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Your Reservations</h1>
      {user.reservations && user.reservations.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {user.reservations.map((reservation: Reservation) => (
            <Card key={reservation.id} className="bg-neutral-400/4 text-black">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CarIcon className="h-5 w-5" />
                  <span>
                    {reservation.vehicle.brand} {reservation.vehicle.model}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(reservation.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-gray-500" />
                    <span>{reservation.duration} hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-gray-500" />
                    <span>Starts: {reservation.starts}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-gray-500" />
                    <span>Ends: {reservation.ends}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSignIcon className="h-4 w-4 text-gray-500" />
                    <span>Total: ${reservation.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have no reservations yet.</p>
      )}
    </div>
  );
}
