import { useEffect, useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
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

  return (
    <div className="space-y-12 mx-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl font-bold">Hoạt động & Sự kiện</h1>
        <p className="mt-2 text-muted-foreground">
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
          <Card className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                {featuredActivity.images && featuredActivity.images.length > 0 ? (
                  <img
                    src={featuredActivity.images[0]}
                    alt={featuredActivity.title}
                    className="h-full w-full object-cover"
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              </div>
              <CardContent className="flex flex-col justify-center p-8">
                <Badge
                  variant={featuredActivity.type === 'upcoming' ? 'default' : 'secondary'}
                  className="mb-4 w-fit"
                >
                  {featuredActivity.type === 'upcoming' ? 'Sắp diễn ra' : 'Đã diễn ra'}
                </Badge>
                <CardTitle className="mb-4 font-serif text-3xl">
                  {featuredActivity.title}
                </CardTitle>
                <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
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
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {featuredActivity.summary}
                </p>
                <Button
                  onClick={() => setSelectedActivity(featuredActivity)}
                  className="w-fit"
                >
                  Đọc chi tiết
                </Button>
              </CardContent>
            </div>
          </Card>
        </motion.section>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Past Activities Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h2 className="mb-6 font-serif text-2xl font-bold">Hoạt động đã diễn ra</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pastActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                id={`activity-${activity.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all hover:shadow-lg ${
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
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="secondary">Đã diễn ra</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-lg">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
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
          className="space-y-6"
        >
          <div>
            <h2 className="mb-4 flex items-center space-x-2 font-serif text-2xl font-bold">
              <Calendar className="h-6 w-6 text-primary" />
              <span>Sắp diễn ra</span>
            </h2>
            <Card>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 p-4">
                  {upcomingActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <Card
                        className="cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setSelectedActivity(activity)}
                      >
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center space-x-2">
                            <Badge variant="default">Sắp diễn ra</Badge>
                          </div>
                          <h3 className="mb-2 font-serif font-semibold">
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
                          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-background shadow-2xl"
          >
            <Card className="border-0 shadow-none">
              {selectedActivity.images && selectedActivity.images.length > 0 && (
                <div className="relative aspect-video">
                  <img
                    src={selectedActivity.images[0]}
                    alt={selectedActivity.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <Badge
                    variant={selectedActivity.type === 'upcoming' ? 'default' : 'secondary'}
                  >
                    {selectedActivity.type === 'upcoming' ? 'Sắp diễn ra' : 'Đã diễn ra'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedActivity(null)}
                  >
                    ×
                  </Button>
                </div>
                <CardTitle className="font-serif text-3xl">
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
              <CardContent>
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
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {selectedActivity.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedActivity.title} - ${index + 1}`}
                        className="rounded-lg object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ))}
                  </div>
                )}
                {selectedActivity.video && (
                  <div className="mt-6">
                    <iframe
                      src={selectedActivity.video}
                      title={`${selectedActivity.title} - Video`}
                      className="w-full aspect-video rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
