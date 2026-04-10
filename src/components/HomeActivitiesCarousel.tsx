import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import activitiesData from '@/data/activities.json'
import { motion } from 'framer-motion'

type Activity = {
  id: number
  title: string
  date: string
  type: 'past' | 'upcoming'
  summary: string
  content: string
  images: string[]
}

export function HomeActivitiesCarousel() {
  const activities = activitiesData as Activity[]
  const pastActivities = activities.filter((a) => a.type === 'past').slice(0, 5)

  if (pastActivities.length === 0) {
    return null
  }

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold">Hoạt động gần đây</h2>
            <p className="mt-2 text-muted-foreground">
              Các hoạt động tưởng niệm và chăm sóc địa chỉ đỏ
            </p>
          </div>
          <Link to="/activities">
            <Button variant="outline">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full px-2 md:px-8"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {pastActivities.map((activity, index) => (
            <CarouselItem key={activity.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Card className="group h-full overflow-hidden rounded-2xl border-border/60 bg-card/95 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                  <div className="relative aspect-video overflow-hidden">
                    {activity.images && activity.images.length > 0 ? (
                      <img
                        src={activity.images[0]}
                        alt={activity.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <Calendar className="h-16 w-16 text-primary/30" />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/5" />
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <Calendar className="h-3.5 w-3.5" />
                        Hoạt động
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="mb-2 flex items-center gap-2 text-white/90">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {new Date(activity.date).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 font-serif text-lg font-bold leading-snug md:text-xl">
                        {activity.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="space-y-4 p-5">
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {activity.summary}
                    </p>
                    <Link to={`/activities#${activity.id}`} className="block">
                      <Button variant="link" className="h-auto p-0 text-sm font-semibold text-primary">
                        Đọc thêm
                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 h-9 w-9 border-border/60 bg-background/90 shadow-sm backdrop-blur-sm hover:bg-background md:left-2" />
        <CarouselNext className="right-1 h-9 w-9 border-border/60 bg-background/90 shadow-sm backdrop-blur-sm hover:bg-background md:right-2" />
      </Carousel>
    </section>
  )
}
