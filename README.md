# FOLD — clothing shop (Next.js)

A small online clothing shop built with Next.js, React, Tailwind CSS, and JavaScript.

## Pages / features

- **Home** — logo, nav, hero, promo marquee, category shortcuts, best sellers
- **Search** — search products by text (name or category)
- **Shop** — browse all products, filter by category, view product detail
- **Cart** — add to cart, adjust quantity, remove items, checkout flow:
  delivery details (name, phone, location) → payment → **Buy now** → order confirmation
- **Account** — sign in (name, phone number, location), view saved profile, log out

All state (cart, user session, checkout) is kept in React state on the client —
there's no backend yet, so refreshing the page resets it. Swap in a real
database/auth/payment provider (e.g. a Postgres + NextAuth + Stripe stack) when
you're ready to go to production.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

```
app/
  layout.js       # root layout, loads global styles
  page.js         # renders the shop
  globals.css     # Tailwind + font imports
components/
  FoldShop.jsx    # the whole app: header, home, search, shop, cart/checkout, account
  data.js         # product catalog
```

## Build for production

```bash
npm run build
npm start
```
