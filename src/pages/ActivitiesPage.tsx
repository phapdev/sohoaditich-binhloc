import { useEffect, useState } from 'react'
import { Calendar, Clock, ArrowRight, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  video: string
}

export function ActivitiesPage() {
  const activities = activitiesData as Activity[]
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null)

  const pastActivities = activities.filter((a) => a.type === 'past').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const upcomingActivities = activities.filter((a) => a.type === 'upcoming')
  const featuredActivity = pastActivities[0] || upcomingActivities[0]

  useEffect(() => {
    // Handle hash navigation
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const activity = activities.find((a) => a.id === Number(hash))
      if (activity) {
        setSelectedActivity(activity)
        setTimeout(() => {
          document.getElementById(`activity-${activity.id}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }, 100)
      }
    }
  }, [activities])

  useEffect(() => {
    if (!selectedActivity) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null)
          return
        }
        setSelectedActivity(null)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEsc)
    }
  }, [selectedActivity, previewImage])

  return (
    <div className="mx-4 space-y-10 md:mx-6 md:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">Hoạt động & Sự kiện</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base md:text-lg">
          Các hoạt động tưởng niệm, chăm sóc địa chỉ đỏ và giáo dục truyền thống
        </p>
      </motion.div>

      {/* Featured Event */}
      {featuredActivity && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/95 shadow-sm">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                {featuredActivity.images && featuredActivity.images.length > 0 ? (
                  <img
                    src={featuredActivity.images[0]}
                    alt={featuredActivity.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <Calendar className="h-24 w-24 text-primary/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/10" />
              </div>
              <CardContent className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
                <Badge
                  variant={featuredActivity.type === 'upcoming' ? 'default' : 'secondary'}
                  className="mb-4 w-fit"
                >
                  {featuredActivity.type === 'upcoming' ? 'Sắp diễn ra' : 'Đã diễn ra'}
                </Badge>
                <CardTitle className="mb-3 font-serif text-2xl leading-tight sm:mb-4 sm:text-3xl">
                  {featuredActivity.title}
                </CardTitle>
                <div className="mb-3 flex items-center space-x-4 text-xs text-muted-foreground sm:mb-4 sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(featuredActivity.date).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:mb-6 sm:text-base">
                  {featuredActivity.summary}
                </p>
                <Button
                  onClick={() => setSelectedActivity(featuredActivity)}
                  className="w-fit gap-2"
                >
                  Đọc chi tiết
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </motion.section>
      )}

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Past Activities Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h2 className="mb-5 font-serif text-xl font-bold sm:mb-6 sm:text-2xl">Hoạt động đã diễn ra</h2>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {pastActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                id={`activity-${activity.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className={`group h-full cursor-pointer overflow-hidden rounded-2xl border-border/60 bg-card/95 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl ${
                    selectedActivity?.id === activity.id
                      ? 'ring-2 ring-primary'
                      : ''
                  }`}
                  onClick={() => setSelectedActivity(activity)}
                >
                  {activity.images && activity.images.length > 0 && (
                    <div className="relative aspect-video overflow-hidden">
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
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                  )}
                  <CardHeader className="p-5 sm:p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="secondary">Đã diễn ra</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-base sm:text-lg">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {activity.summary}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Upcoming Events Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-5 sm:space-y-6"
        >
          <div>
            <h2 className="mb-4 flex items-center space-x-2 font-serif text-xl font-bold sm:text-2xl">
              <Calendar className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
              <span>Sắp diễn ra</span>
            </h2>
            <Card className="rounded-2xl border-border/60 bg-card/95">
              <ScrollArea className="h-[500px] sm:h-[560px] lg:h-[600px]">
                <div className="space-y-4 p-4">
                  {upcomingActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <Card
                        className="cursor-pointer rounded-xl border-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center space-x-2">
                            <Badge variant="default">Sắp diễn ra</Badge>
                          </div>
                          <h3 className="mb-2 font-serif text-sm font-semibold sm:text-base">
                            {activity.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(activity.date).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            {activity.summary}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  {upcomingActivities.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                      Chưa có sự kiện sắp diễn ra
                    </p>
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </motion.aside>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-3 md:p-5"
          onClick={() => setSelectedActivity(null)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border/60 bg-background shadow-2xl sm:rounded-2xl"
          >
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-4 top-4 z-30 h-9 w-9 rounded-full border border-border/60 bg-background/95 shadow-sm backdrop-blur"
              onClick={() => setSelectedActivity(null)}
              aria-label="Đóng chi tiết hoạt động"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="overflow-y-auto">
              <Card className="border-0 shadow-none">
              {selectedActivity.images && selectedActivity.images.length > 0 && (
                <div className="relative aspect-video">
                  <img
                    src={selectedActivity.images[0]}
                    alt={selectedActivity.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              )}
              <CardHeader className="sticky top-0 z-20 border-b border-border/60 bg-background/95 p-5 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:p-6">
                <div className="mb-4 flex items-center pr-12">
                  <Badge variant={selectedActivity.type === 'upcoming' ? 'default' : 'secondary'}>
                    {selectedActivity.type === 'upcoming' ? 'Sắp diễn ra' : 'Đã diễn ra'}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-2xl leading-tight md:text-3xl">
                  {selectedActivity.title}
                </CardTitle>
                <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(selectedActivity.date).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </CardHeader>
                <CardContent className="p-5 sm:p-6 md:p-8">
                <div className="prose max-w-none">
                  <div className="space-y-4 leading-relaxed text-muted-foreground">
                    {selectedActivity.content
                      .split(/\n{2,}/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p key={index} className="whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
                {selectedActivity.images && selectedActivity.images.length > 1 && (
                  <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                    {selectedActivity.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedActivity.title} - ${index + 1}`}
                        className="aspect-video cursor-zoom-in rounded-xl border border-border/60 object-cover transition-transform duration-300 hover:scale-[1.02]"
                        loading="lazy"
                        onClick={() =>
                          setPreviewImage({
                            src: image,
                            alt: `${selectedActivity.title} - ${index + 1}`,
                          })
                        }
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ))}
                  </div>
                )}
                {selectedActivity.video && (
                  <div className="mt-8">
                    <iframe
                      src={selectedActivity.video}
                      title={`${selectedActivity.title} - Video`}
                      className="aspect-video w-full rounded-xl border border-border/60"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            </div>
          </motion.div>
        </motion.div>
      )}

      {previewImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full border border-white/20 bg-black/45 text-white backdrop-blur hover:bg-black/65"
              onClick={() => setPreviewImage(null)}
              aria-label="Đóng xem ảnh lớn"
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className="max-h-[88vh] w-full rounded-xl object-contain"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
