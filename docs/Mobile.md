# ROLE
You are a UI/UX Specialist with a deep focus on Typography and Mobile Ergonomics.
You understand that for Vietnamese language support, font selection is critical.

# OBJECTIVE
Refine the application's Typography and Mobile Experience to be production-ready for a QR-Code based user journey.

# 1. TYPOGRAPHY UPGRADE (VIETNAMESE SUPPORT)
Replace current fonts with a pairing that perfectly supports Vietnamese diacritics:
- **Headings (Titles, Hero text):** Use **"Playfair Display"**. It adds a sense of history, solemnity, and elegance.
- **Body Text (Paragraphs, UI elements):** Use **"Be Vietnam Pro"**. This is the gold standard for modern Vietnamese interfaces—highly readable, geometric, and clean.

**Action:**
- Import these fonts via `@import` in `index.css` from Google Fonts.
- Update `tailwind.config.js` to extend the font family:
  - `font-serif`: ['Playfair Display', 'serif']
  - `font-sans`: ['Be Vietnam Pro', 'sans-serif']
- Apply `font-serif` to all H1, H2, H3 and large titles.
- Apply `font-sans` to body, buttons, and inputs.

# 2. MOBILE-FIRST OPTIMIZATION (QR CODE CONTEXT)
Since users access this via QR Scan on mobile, optimize the Layout:
- **Touch Targets:** Ensure all buttons and interactive elements have a minimum height of 44px (Tailwind `min-h-[44px]`).
- **Padding:** Increase whitespace on mobile. Avoid text touching the edges. Use `px-4` or `px-6` for container padding on mobile screens.
- **Navigation:**
  - On Mobile: Instead of a top menu that is hard to reach, implement a **Sticky Bottom Navigation Bar** or a clear **Floating Action Button (FAB)** for the "Search" feature.
  - Or ensure the Top Hamburger menu is large and easy to tap.
- **Performance:** Ensure images in the "Slide" view are optimized (object-cover) so they don't break layout on small screens.

# 3. MODERN UI POLISH
- **Cards:** Use soft shadows (`shadow-md` or `shadow-lg` with low opacity) and rounded corners (`rounded-xl` or `rounded-2xl`).
- **Gradients:** Add subtle background gradients to the Hero section (e.g., from faint yellow to white) to avoid a boring flat look, but keep it subtle.
- **Readability:** ensure high contrast. For text over images, strictly use `bg-black/40` or `bg-gradient-to-t` overlays.

# INSTRUCTION FOR AI
1.  Update the fonts first and show me the `index.css` change.
2.  Refactor the **MartyrDetail** page to ensure the "Split Screen" becomes a nice "Stacked Vertical Scroll" on mobile, where the image takes the top 40vh and content takes the rest.
3.  Check the **Navigation** component and optimize it for mobile thumb reach.