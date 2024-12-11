import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Vehicle {
    id: number;
    year: number;
    price: number;
    model: string;
    brand: string;
    imageUrl: string;
}

interface ReservationModalProps {
    vehicle: Vehicle;
    onClose: () => void;
}

export default function ReservationModal({ vehicle, onClose }: ReservationModalProps) {
    const [hours, setHours] = useState(1)

    const handleReservation = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the reservation data to your backend
        console.log(`Reserved ${vehicle.brand} ${vehicle.model} for ${hours} hours`)
        onClose()
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reserve {vehicle.brand} {vehicle.model}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReservation}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="hours" className="text-right">
                                Hours
                            </Label>
                            <Input
                                id="hours"
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(parseInt(e.target.value))}
                                min={1}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Total</Label>
                            <div className="col-span-3">
                                ${(hours * vehicle.price).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Confirm Reservation</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

