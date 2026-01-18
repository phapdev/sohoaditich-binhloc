# Số Hóa Địa Chỉ Đỏ Phường Bình Lộc

Ứng dụng web tưởng niệm và tôn vinh các Anh hùng Liệt sĩ, cung cấp cơ sở dữ liệu tra cứu và bản đồ các địa chỉ đỏ trên địa bàn phường Bình Lộc.

## Công nghệ sử dụng

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Animation**: Framer Motion

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

## Build

```bash
npm run build
```

## Tính năng

- ✅ Trang chủ với Hero Section và giới thiệu dự án
- ✅ Tra cứu thông tin Liệt sĩ với bảng tìm kiếm và sắp xếp
- ✅ Danh sách Di tích và Địa chỉ đỏ
- ✅ Trang chi tiết Di tích với bản đồ Google Maps
- ✅ Bản đồ tổng quan các địa chỉ đỏ
- ✅ Chuyển đổi theme (Light/Dark mode)
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Animation với Framer Motion

## Cấu trúc thư mục

```
src/
├── components/     # Các components UI
│   └── ui/        # Shadcn/UI components
├── pages/         # Các trang chính
├── layouts/       # Layout components
├── data/          # Dữ liệu mock (JSON)
├── store/         # Zustand stores
└── lib/           # Utilities
```

## Màu sắc chủ đạo

- **Primary (Đỏ cờ)**: #DA251D
- **Secondary (Vàng cờ)**: #FFFF00

## License

Dự án phục vụ mục đích giáo dục và tưởng niệm.
