import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Calendar, MapPin, Navigation } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', label: 'Trang chủ', icon: Home },
  { path: '/martyrs', label: 'Tra cứu', icon: Search },
  { path: '/activities', label: 'Hoạt động', icon: Calendar },
  { path: '/locations', label: 'Di tích', icon: MapPin },
  { path: '/map', label: 'Bản đồ', icon: Navigation },
]

export function BottomNavigation() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center space-y-1 rounded-lg px-3 py-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
