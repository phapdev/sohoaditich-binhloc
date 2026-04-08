import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
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

export function MapPage() {
  const locations = locationsData as Location[]
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  // Create a map URL with all markers
  const mapUrl = locations.length > 0
    ? `https://www.google.com/maps?q=${locations[0].coordinates.lat},${locations[0].coordinates.lng}&hl=vi&z=14&output=embed`
    : 'https://www.google.com/maps?q=10.7769,106.7009&hl=vi&z=14&output=embed'

  return (
    <div className="space-y-6 mx-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold">Bản đồ Địa chỉ đỏ</h1>
        <p className="text-muted-foreground">
          Xem vị trí các di tích và địa chỉ đỏ trên địa bàn phường Bình Lộc
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Bản đồ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapUrl}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách địa điểm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {locations.map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedLocation?.id === location.id
                        ? 'border-primary bg-primary/5'
                        : ''
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{location.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {location.address}
                          </p>
                          <Link to={`/locations/${location.id}`}>
                            <Button
                              variant="link"
                              className="mt-2 h-auto p-0 text-sm"
                            >
                              Xem chi tiết →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
