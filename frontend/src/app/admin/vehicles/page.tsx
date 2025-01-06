"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  price: number;
  year: number;
  imageUrl?: string;
}

export default function VehicleManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    price: "",
    year: "",
  });
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/vehicle");
      setVehicles(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch vehicles.",
      });
    }
  };

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/admin/vehicle", newVehicle);
      setNewVehicle({ brand: "", model: "", price: "", year: "" });
      fetchVehicles();
      toast({
        title: "Success",
        description: "Vehicle created successfully.",
        className: "bg-success text-white",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create vehicle.",
      });
    }
  };

  const handleUpdateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;
    try {
      await axiosInstance.put(
        `/api/admin/vehicle/${editingVehicle.id}/update`,
        editingVehicle
      );
      setEditingVehicle(null);
      fetchVehicles();
      toast({
        title: "Success",
        description: "Vehicle updated successfully.",
        className: "bg-success text-white",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update vehicle.",
      });
    }
  };

  const handleDeleteVehicle = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/admin/vehicle/${id}/delete`);
      fetchVehicles();
      toast({
        title: "Success",
        description: "Vehicle deleted successfully.",
        className: "bg-success text-white",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete vehicle.",
      });
    }
  };

  const handleImageUpload = async (vehicleId: number) => {
    if (!selectedImage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an image to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await axiosInstance.post(
        `/api/admin/vehicle/${vehicleId}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchVehicles();
      setSelectedImage(null);
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
        className: "bg-success text-white",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Create Vehicle</h3>
          <form onSubmit={handleCreateVehicle} className="space-y-4">
            <Input
              placeholder="Brand"
              value={newVehicle.brand}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, brand: e.target.value })
              }
              required
            />
            <Input
              placeholder="Model"
              value={newVehicle.model}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, model: e.target.value })
              }
              required
            />
            <Input
              type="number"
              placeholder="Price"
              value={newVehicle.price}
              onChange={(e) =>
                setNewVehicle({
                  ...newVehicle,
                  price: parseFloat(e.target.value),
                })
              }
              min="0.00"
              step="0.01"
              required
            />
            <Input
              type="number"
              placeholder="Year"
              value={newVehicle.year}
              onChange={(e) =>
                setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })
              }
              required
            />
            <Button type="submit" className="w-full">
              Create Vehicle
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="p-6 border rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{vehicle.brand}</h3>
                  <h3 className="text-xl font-semibold">{vehicle.model}</h3>
                  <p className="text-gray-600">Year: {vehicle.year}</p>
                  <p className="text-lg font-bold mt-2">${vehicle.price}</p>
                </div>
              </div>

              {vehicle.imageUrl && (
                <div className="mt-4">
                  <img
                    src={vehicle.imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}

              <div className="mt-4">
                <Input
                  type="file"
                  onChange={(e) =>
                    setSelectedImage(e.target.files ? e.target.files[0] : null)
                  }
                  accept="image/*"
                  className="mb-2"
                />
                <Button
                  onClick={() => handleImageUpload(vehicle.id)}
                  className="w-full"
                >
                  {vehicle.imageUrl ? "Update Image" : "Upload Image"}
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex justify-start items-center mt-4 space-x-2">
                  <Button
                    onClick={() => setEditingVehicle(vehicle)}
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    variant="destructive"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>

                {editingVehicle && editingVehicle.id === vehicle.id && (
                  <form
                    onSubmit={handleUpdateVehicle}
                    className="mt-4 space-y-2 w-full"
                  >
                    <Input
                      placeholder="Brand"
                      value={editingVehicle.brand}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          brand: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Model"
                      value={editingVehicle.model}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          model: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={editingVehicle.price}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Year"
                      value={editingVehicle.year}
                      onChange={(e) =>
                        setEditingVehicle({
                          ...editingVehicle,
                          year: parseInt(e.target.value),
                        })
                      }
                    />
                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
