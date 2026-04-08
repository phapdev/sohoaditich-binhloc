import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export function LocationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const locations = locationsData as Location[]
  const location = locations.find((loc) => loc.id === Number(id))

  if (!location) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Không tìm thấy di tích</h1>
        <p className="mb-4 text-muted-foreground">Đang cập nhật</p>
        <Link to="/locations">
          <Button>Quay lại danh sách</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link to="/locations">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="mb-2 flex items-center space-x-2 text-primary">
              <MapPin className="h-5 w-5" />
              <CardTitle className="text-2xl">{location.name}</CardTitle>
            </div>
            <p className="text-muted-foreground">{location.address}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Lịch sử</h3>
              <p className="text-justify leading-relaxed text-muted-foreground">
                {location.history}
              </p>
            </div>

            {location.images && location.images.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold">Hình ảnh</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {location.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg bg-muted"
                    >
                      <img
                        src={image}
                        alt={`${location.name} - Hình ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                        <p>Hình ảnh đang cập nhật</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-4 text-lg font-semibold">Vị trí trên bản đồ</h3>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&hl=vi&z=15&output=embed`}
                  
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
