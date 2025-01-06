"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

interface Reservation {
  id: number;
  customer: [];
  vehicle: [];
  date: string;
  duration: number;
  starts: string;
  ends: string;
  total: number;
}

export default function ReservationManagementPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [reservationId, setReservationId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/reservation", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      setReservations(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch reservations.",
      });
    }
  };

  const fetchReservationById = async () => {
    if (!reservationId) return;
    try {
      const response = await axiosInstance.get(
        `/api/admin/reservation/${reservationId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      setSelectedReservation(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch reservation.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Reservation Management</h2>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Search Reservation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Reservation ID"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
            />
            <Button onClick={fetchReservationById}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedReservation && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Selected Reservation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>ID:</strong> {selectedReservation.id}
              </div>
              <div>
                <strong>Date:</strong> {selectedReservation.date.slice(0, 10)}
              </div>
              <div>
                <strong>Customer ID:</strong> {selectedReservation.customer.id}
              </div>
              <div>
                <strong>Customer Name:</strong>{" "}
                {selectedReservation.customer.username}
              </div>
              <div>
                <strong>Vehicle ID:</strong> {selectedReservation.vehicle.id}
              </div>
              <div>
                <strong>Vehicle:</strong> {selectedReservation.vehicle.brand}{" "}
                {selectedReservation.vehicle.model}
              </div>
              <div>
                <strong>Starts:</strong> {selectedReservation.starts}
              </div>
              <div>
                <strong>Duration:</strong> {selectedReservation.duration} hours
              </div>
              <div>
                <strong>Ends:</strong> {selectedReservation.ends}
              </div>
              <div>
                <strong>Total:</strong> ${selectedReservation.total.toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Vehicle ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Starts</TableHead>
                <TableHead>Ends</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>
                    {reservation.customer.username} ({reservation.customer.id})
                  </TableCell>
                  <TableCell>
                    {reservation.vehicle.brand} {reservation.vehicle.model} (
                    {reservation.vehicle.id})
                  </TableCell>
                  <TableCell>{reservation.date.slice(0, 10)}</TableCell>
                  <TableCell>{reservation.duration} hours</TableCell>
                  <TableCell>{reservation.starts}</TableCell>
                  <TableCell>{reservation.ends}</TableCell>
                  <TableCell>${reservation.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
