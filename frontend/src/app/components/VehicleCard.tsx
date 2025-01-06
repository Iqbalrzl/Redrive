import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

interface Vehicle {
  id: number;
  year: number;
  price: number;
  model: string;
  brand: string;
  imageUrl: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter();
  const { user } = useAuth();

  const handleReserve = () => {
    router.push(`/reserve/${vehicle.id}`);
  };

  return (
    <Card className="overflow-hidden bg-neutral-400/1 text-black/63">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold">
          {vehicle.brand} {vehicle.model}
        </h3>
        <p className="text-black text-opacity-60">{vehicle.year}</p>
        <p className="font-bold mt-2">${vehicle.price.toFixed(2)}/hour</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleReserve}
          className="w-full bg-black text-white hover:bg-gray-800"
          size="lg"
        >
          Reserve Now
        </Button>
      </CardFooter>
    </Card>
  );
}
