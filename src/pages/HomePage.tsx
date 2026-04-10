import { Link } from 'react-router-dom'
import { Search, MapPin, BookOpen, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HomeActivitiesCarousel } from '@/components/HomeActivitiesCarousel'
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

export function HomePage() {
  const locations = locationsData as Location[]
  const featuredLocation = locations[0]

  return (
    <div className="space-y-0">
      {/* Hero Section - Full Width với Background Image */}
      <section className="relative h-full overflow-hidden">
        {/* Background Image với Overlay */}
        <div className="absolute inset-0 h-full w-full">
          <img
            src="/images/dang-hoa-ntls.jpg"
            alt="Phường Bình Lộc"
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[78vh] items-center gap-8 sm:min-h-[82vh] lg:min-h-[85vh] lg:grid-cols-2 lg:gap-12">
            {/* Left: Text Overlay */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-5 py-10 sm:space-y-6 sm:py-12 lg:py-24"
            >
              <div>
                <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  Phường Bình Lộc
                </h1>
                <h2 className="mt-3 font-Playfair text-xl font-semibold text-secondary sm:mt-4 sm:text-2xl md:text-3xl lg:text-4xl">
                  Miền đất của những địa chỉ đỏ và truyền thống yêu nước
                </h2>
              </div>

              <div className="max-w-2xl space-y-3 text-base font-Playfair leading-relaxed text-white/90 sm:space-y-4 sm:text-lg md:mx-4 md:text-xl lg:mx-0">
                <p className="text-justify text-base sm:text-lg md:text-xl lg:text-2xl">
                  Công trình thanh niên do Đoàn thanh niên Cộng sản Hồ Chí Minh phường Bình Lộc thực hiện.<br />
                  <strong className="text-secondary"> "Số hóa địa chỉ đỏ phường Bình Lộc"</strong>
                  nhằm phát huy vai trò nòng cốt, đi đầu của các cấp cán bộ đoàn trong chuyển đổi số
                  quảng bá và giáo dục truyền thống yêu nước cho thế hệ trẻ.
                </p>

                {/* <p className="text-justify sm:text-lg md:text-xl lg:text-2xl">
                  Dự án tập trung vào việc xây dựng cơ sở dữ liệu số về các liệt sĩ và các địa chỉ đỏ
                  trên địa bàn phường, tạo điều kiện thuận lợi cho nhân dân, đặc biệt là thanh thiếu niên,
                  có thể tra cứu thông tin một cách dễ dàng thông qua mã QR.
                </p> */}
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link to="/martyrs">
                  <Button size="lg" className="min-h-[44px] text-sm sm:text-base">
                    <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Tra cứu Liệt sĩ
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button size="lg" variant="outline" className="min-h-[44px] border-white/30 bg-white/10 text-sm text-white backdrop-blur-sm hover:bg-white/20 sm:text-base">
                    <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Khám phá Di tích
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Circular Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative mx-auto aspect-square w-full max-w-lg">
                <div className="absolute inset-0 rounded-full border-5 border-white/30 shadow-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  {featuredLocation?.images && featuredLocation.images.length > 0 ? (
                    <img
                      src="/images/dang-huong-ntls.jpg"
                      alt="Dâng hương tưởng niệm liệt sĩ"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=800&fit=crop"
                      }}
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=800&fit=crop"
                      alt="Địa chỉ đỏ Phường Bình Lộc"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Văn hóa - Lịch sử */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 font-serif text-2xl font-bold text-primary sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
              Văn hóa - Lịch sử
            </h2>
            <h3 className="mb-5 font-serif text-xl font-semibold sm:mb-6 sm:text-2xl md:text-3xl">
              ĐỊA CHỈ ĐỎ PHƯỜNG BÌNH LỘC
            </h3>
            <div className="mx-auto max-w-4xl space-y-3 text-justify text-sm leading-relaxed text-muted-foreground sm:space-y-4 sm:text-base">
              <p>
                Phường Bình Lộc tự hào là nơi lưu giữ và phát huy giá trị các địa chỉ đỏ, nơi tưởng niệm
                và tôn vinh các Anh hùng Liệt sĩ đã hy sinh vì độc lập, tự do của Tổ quốc. Các di tích lịch sử
                này không chỉ là những công trình vật chất mà còn là biểu tượng của tinh thần yêu nước,
                lòng dũng cảm và sự hy sinh cao cả.
              </p>
              <p>
                Trong số các địa chỉ đỏ quan trọng, có Nhà bia ghi tên liệt sĩ và Đền thờ Liệt sỹ - những
                nơi thiêng liêng, nơi giáo dục truyền thống cách mạng, khơi dậy lòng yêu nước, tự hào dân tộc
                cho các thế hệ, đặc biệt là thanh thiếu niên.
              </p>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src="/images/dang-huong-ntls.jpg"
              alt="Di tích lịch sử Phường Bình Lộc"
              className="h-[260px] w-full object-cover sm:h-[340px] md:h-[430px] lg:h-[500px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Section: Di tích Thắng cảnh */}
      <section className="bg-background py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 font-serif text-2xl font-bold text-primary sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
              Những địa chỉ đỏ - Di tích lịch sử
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
              Khám phá các di tích lịch sử và địa chỉ đỏ trên địa bàn phường Bình Lộc
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden transition-all hover:shadow-xl">
                  <div className="relative aspect-video overflow-hidden">
                    {location.images && location.images.length > 0 ? (
                      <img
                        src={location.images[0]}
                        alt={location.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop"
                        }}
                      />
                    ) : (
                      <img
                        src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop"
                        alt={location.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
                  </div>
                  <CardHeader className="p-5 sm:p-6">
                    <CardTitle className="font-serif text-xl sm:text-2xl">{location.name}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{location.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
                    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:mb-6 sm:text-base">
                      {location.history}
                    </p>
                    <Link to={`/locations/${location.id}`}>
                      <Button className="w-full min-h-[44px]">
                        Khám phá chi tiết
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Carousel Section */}
      <section className="bg-muted/30 py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HomeActivitiesCarousel />
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-background py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 font-serif text-2xl font-bold text-primary sm:mb-4 sm:text-3xl md:text-4xl">
              Truy cập nhanh
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              Các tính năng chính của ứng dụng
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full rounded-xl transition-all hover:shadow-lg md:rounded-2xl">
                <CardHeader>
                  <Search className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle className="font-serif text-lg sm:text-xl">Tra cứu Liệt sĩ</CardTitle>
                  <CardDescription>
                    Tìm kiếm thông tin về các Anh hùng Liệt sĩ đã hy sinh vì Tổ quốc
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/martyrs">
                    <Button className="w-full min-h-[44px]">Xem chi tiết</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full rounded-xl transition-all hover:shadow-lg md:rounded-2xl">
                <CardHeader>
                  <BookOpen className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle className="font-serif text-lg sm:text-xl">Di tích</CardTitle>
                  <CardDescription>
                    Khám phá các địa chỉ đỏ và di tích lịch sử trên địa bàn phường
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/locations">
                    <Button className="w-full min-h-[44px]">Xem chi tiết</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full rounded-xl transition-all hover:shadow-lg md:rounded-2xl">
                <CardHeader>
                  <MapPin className="mb-2 h-10 w-10 text-primary" />
                  <CardTitle className="font-serif text-lg sm:text-xl">Bản đồ</CardTitle>
                  <CardDescription>
                    Xem vị trí các địa chỉ đỏ trên bản đồ tương tác
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/map">
                    <Button className="w-full min-h-[44px]">Xem bản đồ</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
