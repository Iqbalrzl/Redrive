import VehicleList from './components/VehicleList'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-black">Vehicles</h1>
      <VehicleList />
    </div>
  )
}

