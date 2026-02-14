import { Navigation } from '@/components/Navigation'
import { BottomNavigation } from '@/components/BottomNavigation'
import { motion } from 'framer-motion'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-0 py-0 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <BottomNavigation />
      <footer className="mt-auto border-t bg-muted/30 py-12">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-serif text-lg font-bold">Về dự án</h3>
              <p className="text-sm text-muted-foreground">
                Dự án Số Hóa Địa Chỉ Đỏ Phường Bình Lộc nhằm tưởng niệm và tôn vinh các Anh hùng Liệt sĩ, giáo dục truyền thống yêu nước cho thế hệ trẻ.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-lg font-bold">Liên hệ</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Đoàn Thanh niên Phường Bình Lộc</strong>
                </p>
                <p>Địa chỉ: Phường Bình Lộc, Tỉnh Đồng Nai</p>
                <p>Email: doantn.binhloc@example.com</p>
                <p>Điện thoại: (028) 1234 5678</p>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-lg font-bold">Thông tin</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>© 2026 Số Hóa Địa Chỉ Đỏ Phường Bình Lộc</p>
                <p className="font-semibold text-primary">
                  Đời đời nhớ ơn các Anh hùng Liệt sĩ
                </p>
                <div className="mt-4">
                  <img
                    src="/images/logo-doan.webp"
                    alt="Đoàn Thanh niên Cộng sản Hồ Chí Minh"
                    className="h-20 w-20 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>Dự án được thực hiện theo Kế hoạch số 11-KH/ĐTN</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
