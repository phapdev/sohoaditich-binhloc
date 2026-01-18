import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import locationsData from '@/data/locations.json'
import { motion } from 'framer-motion'

type Location = {
  id: number
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  history: string
  images: string[]
}

export function LocationsPage() {
  const locations = locationsData as Location[]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold">Di tích và Địa chỉ đỏ</h1>
        <p className="text-muted-foreground">
          Khám phá các di tích lịch sử và địa chỉ đỏ trên địa bàn phường Bình Lộc
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center space-x-2 text-primary">
                  <MapPin className="h-5 w-5" />
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {location.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                  {location.history}
                </p>
                <Link to={`/locations/${location.id}`}>
                  <Button className="w-full">
                    Xem chi tiết
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
