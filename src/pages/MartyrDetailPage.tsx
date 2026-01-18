import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Award, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import martyrsData from '@/data/martyrs.json'

type Martyr = {
  id: number
  name: string
  birthYear: number
  deathYear: number
  hometown: string
  rank: string
  description: string
  image?: string
  biography?: string
}

export function MartyrDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const martyrs = martyrsData as Martyr[]
  const martyr = martyrs.find((m) => m.id === Number(id))

  if (!martyr) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Không tìm thấy thông tin</h1>
          <p className="mb-4 text-muted-foreground">Đang cập nhật</p>
          <Link to="/martyrs">
            <Button>Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    )
  }

  const age = martyr.deathYear - martyr.birthYear

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDItMiA0LTQgNHMtNC0yLTQtNCAyLTQgNC00IDQgNCA0IDJ6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==')] bg-repeat" />
      </div>

      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed left-4 top-4 z-50 md:left-6 md:top-6"
      >
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm shadow-lg"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </motion.div>

      <div className="container mx-auto px-4 py-4 md:px-6 md:py-8 lg:py-12">
        {/* Mobile: Stacked Layout */}
        <div className="flex flex-col md:grid md:grid-cols-5 md:gap-12">
          {/* Image Section - Mobile: 40vh, Desktop: Sticky */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-[40vh] md:sticky md:top-24 md:h-auto md:col-span-2"
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg md:rounded-2xl md:shadow-2xl">
                {martyr.image ? (
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    src={martyr.image}
                    alt={martyr.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <User className="h-16 w-16 text-primary/30 md:h-32 md:w-32" />
                  </div>
                )}
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:via-transparent" />
                
                {/* Decorative Frame - Hidden on mobile */}
                <div className="hidden md:absolute md:inset-4 md:rounded-xl md:border-2 md:border-white/20" />
              </div>
          </motion.div>

          {/* Content Section - Mobile: Scroll, Desktop: 60% */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 md:col-span-3 md:mt-0"
          >
            <div className="space-y-8">
              {/* Name - Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="font-serif text-3xl font-bold text-primary md:text-5xl lg:text-6xl">
                  {martyr.name}
                </h1>
                <div className="mt-2 h-1 w-24 bg-gradient-to-r from-primary to-secondary" />
              </motion.div>

              {/* Info Grid - Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Năm sinh</p>
                          <p className="text-lg font-semibold">{martyr.birthYear}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                          <Calendar className="h-6 w-6 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Năm hy sinh</p>
                          <p className="text-lg font-semibold">{martyr.deathYear}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                          <MapPin className="h-6 w-6 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Quê quán</p>
                          <p className="text-lg font-semibold">{martyr.hometown}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cấp bậc</p>
                          <Badge variant="default" className="mt-1">
                            {martyr.rank}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-2 border-t pt-4">
                      <p className="text-sm text-muted-foreground">Tuổi khi hy sinh:</p>
                      <Badge variant="outline" className="text-base">
                        {age} tuổi
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Biography - Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-md md:shadow-lg">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="mb-4 font-serif text-xl font-bold text-primary md:text-2xl">
                      Tiểu sử
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      {martyr.biography || martyr.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quote Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="rounded-xl border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent p-4 shadow-md md:p-6 md:shadow-lg">
                  <p className="font-serif text-lg italic text-primary md:text-xl">
                    "Đời đời nhớ ơn các Anh hùng Liệt sĩ"
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
