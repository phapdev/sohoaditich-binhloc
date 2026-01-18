# ROLE
You are a Senior Frontend Engineer and UI/UX Designer specialized in building government/historical digital transformation projects. You are disciplined, precise, and focused on clean architecture.

# PROJECT CONTEXT
We are building a web application named "So Hoa Dia Chi Do - Binh Loc" (Digitization of Red Addresses in Binh Loc Ward). 
Goal: To provide historical information, a searchable database of martyrs (Liệt sĩ), and a digital map for local citizens and youth members via QR codes.

# TECH STACK
- Framework: React (Vite) + TypeScript.
- Styling: Tailwind CSS.
- UI Library: Shadcn/UI (This is a strict requirement).
- Icons: Lucide-React.
- Routing: React Router DOM.
- State Management: Zustand.
- Animation: Framer Motion (for subtle, respectful entrance animations).
- Package manager: pnpm

# DESIGN SYSTEM & THEME
- Primary Colors: Flag Red (#DA251D) and Gold Yellow (#FFFF00) - used tastefully.( and funciton switch theme) 
- Background: Clean white/off-white for readability.
- Typography: Sans-serif, clear, readable on mobile devices.
- Vibe: Solemn, respectful, modern, and patriotic.
- Resposible for cross-platform (mobile - tablet - laptop-pc)
# REQUIRED FEATURES & STEP-BY-STEP IMPLEMENTATION PLAN

## Step 1: Project Initialization & Structure
- Initialize a Vite React TS project.
- Setup Vite alias "@" for import.
- Setup Tailwind CSS and Shadcn/UI.
- Create folder structure: /components, /pages, /data, /assets, /layouts.

## Step 2: Define Data Structure (Mock Data)
- Create a `martyrs.json` file containing at least 20 dummy records of martyrs with fields: `id`, `name`, `birthYear`, `deathYear`, `hometown`, `rank`, `description`.
- Create a `locations.json` for 2 key locations: 
  1. "Nhà bia ghi tên liệt sĩ phường Bình Lộc" (Kp phố 1, phường Bình Lộc).
  2. "Đền thờ Liệt sỹ" (Quốc lộ 1A, phường Bình Lộc).
  Include coordinates, history summary, and image placeholders.

## Step 3: Core Components (Shadcn)
- **Navigation:** Mobile-responsive hamburger menu. Links: Trang chủ, Tra cứu Liệt sĩ, Di tích, Bản đồ.
- **Hero Section:** A banner with the Youth Union logo and background image of the memorial. Title: "SỐ HÓA ĐỊA CHỈ ĐỎ PHƯỜNG BÌNH LỘC".
- **Martyr List Table:** Use Shadcn `DataTable`. Features: 
  - Pagination.
  - Search bar (Filter by Name or Hometown).
  - Sortable columns.
- **Location Card:** Card component displaying image, title, and "Xem chi tiết" (View Details) button.

## Step 4: Page Development
1.  **Home Page (Trang chủ):** - Hero section.
    - Introduction text about the project significance (Reference Plan No. 11-KH/ĐTN).
    - Quick links to "Tra cứu" and "Bản đồ".
2.  **Martyr Search Page (Tra cứu thông tin Liệt sĩ):** - Render the Shadcn DataTable here. 
    - Add a solemn quote at the top: "Đời đời nhớ ơn các Anh hùng Liệt sĩ".
3.  **Location Details Page (Chi tiết Di tích):**
    - Dynamic routing `/locations/:id`.
    - Display history text, image gallery.
    - Embedded Google Map iframe based on coordinates.

## Step 5: Testing & QA Guidelines
- **Responsiveness:** content must be readable on iPhone SE size up to Desktop.
- **Accessibility:** Ensure high contrast for text (WCAG AA).
- **Performance:** Lazy load images and maps.
- **Error Handling:** Show "Đang cập nhật" (Updating) if data is missing.

# INSTRUCTION FOR AI
Please execute the construction of this app step-by-step.
Start by setting up the project structure and installing necessary Shadcn components (button, table, card, input, sheet, navigation-menu).
Then, provide the code for the `App.tsx`, `Layout`, and the `MartyrSearch` page as priority.