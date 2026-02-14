import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useThemeStore } from '@/store/themeStore'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/', label: 'Trang chủ' },
  { path: '/martyrs', label: 'Tra cứu Liệt sĩ' },
  { path: '/activities', label: 'Hoạt động' },
  { path: '/locations', label: 'Di tích' },
  { path: '/map', label: 'Bản đồ' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useThemeStore()

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 shadow-sm'
          : 'bg-blue-500 backdrop-blur-sm text-white'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            src="/images/logo-doan.webp"
            alt="Đoàn Thanh niên"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />
          <div className="hidden flex-col sm:flex">
            <span className="font-bold text-sm leading-tight uppercase">Địa Chỉ Đỏ</span>
            <span className={`text-xs ${scrolled ? 'text-muted-foreground' : 'text-white'} leading-tight`}>
              Phường Bình Lộc, Tỉnh Đồng Nai
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors uppercase hover:text-primary ${scrolled ? 'text-muted-foreground' : 'text-white'} ${
                location.pathname === item.path
                  ? scrolled ? 'text-primary' : 'text-white'
                  : scrolled ? 'text-muted-foreground' : 'text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
