"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
}

export default function ReservePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [duration, setDuration] = useState(1);
  const [startTime, setStartTime] = useState("09:00");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/vehicle/${resolvedParams.id}`
        );
        setVehicle(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch vehicle details.",
        });
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [resolvedParams.id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await axiosInstance.post(
        `/api/vehicle/${resolvedParams.id}/reservation`,
        {
          duration: duration,
          starts: startTime,
        }
      );
      toast({
        title: "Success",
        description: "Reservation created successfully.",
      });
      router.push("/reservations");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create reservation. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Vehicle not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden shadow-2xl">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-[calc(100vh-6rem)] lg:h-auto">
            <Image
              src={vehicle.imageUrl}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-2xl text-white opacity-90">{vehicle.year}</p>
            </div>
          </div>
          <CardContent className="p-8 bg-white">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-semibold mb-4">Reservation</h2>
                <p className="text-gray-600">
                  Complete the form below to reserve this vehicle.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="duration"
                    className="text-lg font-medium mb-2 block"
                  >
                    Duration (hours)
                  </Label>
                  <div className="relative">
                    <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      min={1}
                      required
                      className="pl-10 text-lg"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="startTime"
                    className="text-lg font-medium mb-2 block"
                  >
                    Start Time
                  </Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="pl-10 text-lg"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                  <h3 className="text-2xl font-semibold mb-4 text-center">
                    Total Price
                  </h3>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-black flex items-center justify-center">
                      {(vehicle.price * duration).toFixed(2)}
                    </p>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 py-6 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Confirm Reservation
                </Button>
              </form>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
