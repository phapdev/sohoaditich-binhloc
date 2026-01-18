# ROLE
You are a Lead Frontend Engineer and Creative Director with expertise in "Awwwards-winning" style websites. You specialize in creating emotional, immersive historical experiences using modern web technologies.

# PROJECT UPGRADE CONTEXT
We are upgrading the "So Hoa Dia Chi Do" (Digitization of Red Addresses) project.
The previous version was too basic. The new goal is to create a "Visual Storytelling" experience.
Key focus:
1.  **Martyr Detail Page:** Must look like a high-end PowerPoint presentation slide. Split screen (Image vs Content). Highly animated.
2.  **Activities Hub:** A dynamic news/activities section with a Carousel on the Homepage and a dedicated listing page.

# TECH STACK (STRICT)
- Core: React (Vite) + TypeScript.
- Styling: Tailwind CSS.
- UI Components: Shadcn/UI (Carousel, Dialog, Cards, ScrollArea, Badge).
- Animation: **Framer Motion** (Heavy usage for the "Slide" effect).
- Icons: Lucide-React.
- Routing: React Router DOM.

# VISUAL & UX DIRECTIVES
- **PowerPoint Style:** The detail pages should feel like a crafted slide. Use large imagery, clear typography hierarchy, and entrance animations (staggered fade-ins, slide-ups).
- **Color Palette:** Deep Flag Red (#B71C1C) to Bright Red (#FF5252), Gold (#FFD700) for accents. Use Gradients to make it look modern, not flat.
- **Glassmorphism:** Use subtle glass effects (`bg-white/90 backdrop-blur`) for text containers over images.

# STEP-BY-STEP IMPLEMENTATION PLAN

## 1. Enhanced Data Structure
Update `martyrs.json` and `activities.json` to include high-res image URLs.
- **Activities Data:** Field include `id`, `title`, `date`, `summary`, `content`, `images` (array), `type` ('past' or 'upcoming').

## 2. Feature: Homepage "Activities Carousel"
- Implement a **Shadcn Carousel** right below the Hero section.
- Content: Highlights of recent activities at the memorial.
- Behavior: Auto-play, smooth transition.
- Visual: Card overlay style (Text over Image gradient).
- Add a "Sắp diễn ra" (Upcoming) section sidebar or widget showing future events with a calendar icon.

## 3. Feature: The "Cinema Mode" Martyr Detail Page
Create a dynamic route `/martyrs/:id`.
**Layout Design (The "PowerPoint" Effect):**
- **Desktop:** Split screen.
  - Left (40%): A large, vertical portrait of the Martyr (or a silhouette placeholder if missing), stylized with a frame or fading gradient.
  - Right (60%): The Content Area.
- **Mobile:** Stacked layout but keep the "Slide" feel using full-screen sections.
- **Animations (Framer Motion):**
  - On page load: The image slides in from the left. The text content staggers in from the right (Name first -> then Details -> then Story).
  - Background: A subtle pattern (lotus or star) floating in the background.
- **Content:**
  - Full Name (Large H1).
  - Info Grid: Birth/Death year, Hometown, Rank (displayed with badges/icons).
  - Biography: A readable paragraph describing their sacrifice and dedication.
  - "Close" or "Back" button floating for easy navigation.

## 4. Feature: Activities & Events Page
Route: `/activities`
- **Featured Event:** A large hero banner for the latest event.
- **Grid Layout:** List of past activities with hover effects (card lifts up).
- **Upcoming Events:** A distinct section/timeline showing schedule for the next memorial service or Youth Union cleanup day.

## 5. Global UI Polish
- **Navbar:** Sticky, transparent-to-solid on scroll.
- **Footer:** Formal, containing contact info of the Ward Youth Union.
- **Fonts:** Use a serif font (like Merriweather or Playfair Display) for Headings to add solemnity, and Sans-serif (Inter/Roboto) for body text.

# INSTRUCTION FOR AI
1.  First, install `framer-motion` and `embla-carousel-react` (for Shadcn carousel).
2.  Create the **MartyrDetail** component first. I want to see the "PowerPoint" animation code using `<motion.div>`.
3.  Then, build the **HomeActivitiesCarousel** component.
4.  Finally, assemble the pages.

**Focus on "Wow Factor" but keep it respectful.**