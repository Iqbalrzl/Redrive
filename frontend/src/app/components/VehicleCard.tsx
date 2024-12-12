import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth-provider'

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
    const router = useRouter()
    const { user } = useAuth()

    const handleReserve = () => {
        if (user) {
            router.push(`/reserve/${vehicle.id}`)
        } else {
            router.push('/login')
        }
    }

    return (
        <Card className="overflow-hidden border-0 bg-card/50">
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-6">
                <h3 className="text-2xl font-semibold">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-muted-foreground">Year: {vehicle.year}</p>
                <p className="text-xl font-bold mt-2">${vehicle.price.toFixed(2)}/hour</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button
                    onClick={handleReserve}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                >
                    Reserve Now
                </Button>
            </CardFooter>
        </Card>
    )
}

