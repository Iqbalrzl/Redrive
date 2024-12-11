import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
    onReserve: () => void;
}

export default function VehicleCard({ vehicle, onReserve }: VehicleCardProps) {
    return (
        <Card className="overflow-hidden">
            <div className="relative w-full h-48">
                <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-muted-foreground">Year: {vehicle.year}</p>
                <p className="text-lg font-bold mt-2">${vehicle.price.toFixed(2)}/hour</p>
            </CardContent>
            <CardFooter className="p-4">
                <Button onClick={onReserve} className="w-full">Reserve Now</Button>
            </CardFooter>
        </Card>
    )
}

