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

interface Customer {
  id: number;
  username: string;
  birthdate: string;
  address: string;
  phone: string;
}

export default function CustomerManagementPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerId, setCustomerId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/customer", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      setCustomers(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch customers.",
      });
    }
  };

  const fetchCustomerById = async () => {
    if (!customerId) return;
    try {
      const response = await axiosInstance.get(
        `/api/admin/customer/${customerId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      setSelectedCustomer(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch customer.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Customer Management</h2>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Search Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              className="bg-neutral-50/20"
              placeholder="Enter Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
            <Button onClick={fetchCustomerById}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedCustomer && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Selected Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>ID:</strong> {selectedCustomer.id}
              </div>
              <div>
                <strong>Username:</strong> {selectedCustomer.username}
              </div>
              <div>
                <strong>Birthdate:</strong> {selectedCustomer.birthdate}
              </div>
              <div>
                <strong>Address:</strong> {selectedCustomer.address}
              </div>
              <div>
                <strong>Phone:</strong> {selectedCustomer.phone}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Birthdate</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.username}</TableCell>
                  <TableCell>{customer.birthdate}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
