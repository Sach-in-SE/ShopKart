<div align="center">

# 🛒 ShopKart

### A Modern, Full-Featured E-Commerce Web Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-shopkart--shop.vercel.app-blue?style=for-the-badge&logo=vercel)](https://shopkart-shop.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 Project Overview

**ShopKart** is a scalable, responsive, and feature-rich e-commerce web application built with **Next.js 13** and **TypeScript**. It delivers a smooth, modern shopping experience with a clean UI, dark/light mode support, persistent cart management, and a complete order flow — all without a backend dependency, making it ideal for prototyping or frontend portfolio showcases.

The project demonstrates real-world frontend engineering practices including context-based state management, form validation with Zod, component-driven architecture using shadcn/ui, and smooth animations powered by Framer Motion.

---

## 🌐 Live Demo

🔗 **[https://shopkart-shop.vercel.app/](https://shopkart-shop.vercel.app/)**

---

## ✨ Features

### 👤 User Features
- **Authentication** — Register and log in with form validation; session persisted via `localStorage`
- **Product Browsing** — Browse all products in a responsive grid with ratings and pricing
- **Product Detail Page** — Full product info, quantity selector, related products, and tabbed description
- **Category Filtering** — Dedicated pages for Electronics, Clothing, Home & Kitchen, Beauty, Books, and Accessories
- **Featured Products** — Curated homepage section highlighting trending items
- **Shopping Cart** — Add, remove, and update quantities; cart state persisted across sessions
- **Checkout & Orders** — Place orders and view full order history with status indicators (Pending / In Transit / Delivered)
- **User Profile** — View and edit personal account information
- **Hero Carousel** — Auto-rotating hero banner with touch/swipe support on mobile
- **Testimonials** — Customer review section on the homepage
- **Newsletter** — Email subscription section
- **Contact Form** — Reach-out form embedded in the footer
- **Dark / Light Mode** — System-aware theme toggle via `next-themes`
- **Fully Responsive** — Mobile-first design that scales seamlessly across all screen sizes
- **404 Page** — Custom not-found page

### 🛠️ Developer / Structural Features
- Static site generation (`generateStaticParams`) for all product and category routes
- Dynamic metadata generation per page for SEO
- Modular component architecture using shadcn/ui + Radix UI primitives
- Centralized state via React Context (Auth + Cart)
- Schema-based form validation with React Hook Form + Zod
- Smooth page and list animations using Framer Motion

> **Note:** Admin dashboard functionality is planned as a future improvement (see below).

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5.2](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3.3](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) + Radix Toast |
| Charts | [Recharts](https://recharts.org/) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) |
| Font | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
ShopKart/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout (providers, header, footer)
│   ├── account/            # Login & Register
│   ├── cart/               # Shopping cart
│   ├── category/[slug]/    # Category product listing
│   ├── orders/             # Order history
│   ├── products/           # All products & product detail ([id])
│   ├── profile/            # User profile & edit
│   ├── about/              # About page
│   └── privacy/            # Privacy policy
├── components/             # Reusable UI components
│   ├── header.tsx          # Sticky navbar with search & cart badge
│   ├── footer.tsx          # Footer with contact form & social links
│   ├── hero.tsx            # Auto-rotating hero carousel
│   ├── featured-products.tsx
│   ├── category-grid.tsx
│   ├── product-grid.tsx
│   ├── product-detail.tsx
│   ├── testimonials.tsx
│   ├── newsletter.tsx
│   └── ui/                 # shadcn/ui component library
├── context/
│   ├── auth-context.tsx    # Authentication state
│   └── cart-context.tsx    # Cart state
├── lib/
│   ├── products.ts         # Product data & helper functions
│   └── utils.ts            # Utility functions
└── hooks/
    └── use-toast.ts        # Toast notification hook
```

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sach-in-SE/ShopKart.git
   cd ShopKart
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |

---

## 🖥️ Usage

1. **Browse** products from the homepage or navigate to `/products`
2. **Filter** by category using the navbar or the Category Grid section
3. **Register / Log in** at `/account` to unlock cart and checkout features
4. **Add items** to your cart from any product card or detail page
5. **Review your cart** at `/cart`, adjust quantities, and proceed to checkout
6. **View order history** at `/orders` after placing an order
7. **Manage your profile** at `/profile`

> Authentication is simulated client-side using `localStorage` — no backend or API keys are required to run the project.

---

## 📸 Screenshots

### Homepage
<!-- Replace with actual screenshot -->
![Homepage](screenshots/homepage.png)

### Product Listing
<!-- Replace with actual screenshot -->
![Products](screenshots/products.png)

### Product Detail
<!-- Replace with actual screenshot -->
![Product Detail](screenshots/product-detail.png)

### Shopping Cart
<!-- Replace with actual screenshot -->
![Cart](screenshots/cart.png)

### Order History
<!-- Replace with actual screenshot -->
![Orders](screenshots/orders.png)

### Dark Mode
<!-- Replace with actual screenshot -->
![Dark Mode](screenshots/dark-mode.png)

---

## 🔮 Future Improvements

- [ ] **Backend Integration** — Replace `localStorage` with a real database (e.g., PostgreSQL via Prisma or MongoDB)
- [ ] **REST / GraphQL API** — Build API routes for products, users, and orders
- [ ] **Real Authentication** — Implement JWT-based auth or OAuth (Google, GitHub) via NextAuth.js
- [ ] **Payment Gateway** — Integrate Stripe or Razorpay for real transactions
- [ ] **Admin Dashboard** — Product management, order tracking, and analytics panel
- [ ] **Product Search** — Functional full-text search with filters and sorting
- [ ] **Wishlist** — Save favourite products across sessions
- [ ] **Product Reviews** — Allow authenticated users to submit ratings and reviews
- [ ] **Email Notifications** — Order confirmation and shipping update emails
- [ ] **Image Optimization** — Migrate to `next/image` for automatic format and size optimization
- [ ] **Pagination / Infinite Scroll** — For product and category listing pages
- [ ] **PWA Support** — Service worker and offline capability

---

## 👨‍💻 Author

**Sachin Kumar**

- 📧 Email: [lucky002954@gmail.com](mailto:lucky002954@gmail.com)
- 💼 GitHub: [@Sach-in-SE](https://github.com/Sach-in-SE)
- 📸 Instagram: [@official__luc_ky](https://www.instagram.com/official__luc_ky/)
- 📍 Bareilly, Uttar Pradesh, India

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [Sachin Kumar](https://github.com/Sach-in-SE)

⭐ If you found this project helpful, please give it a star!

</div>
