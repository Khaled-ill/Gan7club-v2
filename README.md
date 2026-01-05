# GAN7Club V2 - Landing Page

A high-end, professional landing page built with Next.js, Tailwind CSS, GSAP, and Apollo Client.

## Features

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **GSAP** animations with ScrollTrigger
- **Apollo Client** for GraphQL integration
- **Lucide React** for icons
- Fully responsive design
- Glassmorphism navigation
- Smooth scroll animations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with Apollo wrapper
│   ├── page.tsx          # Main landing page
│   └── globals.css       # Global styles
├── components/
│   ├── ApolloWrapper.tsx # Apollo Client provider
│   ├── Nav.tsx           # Navigation component
│   ├── Hero.tsx          # Hero section
│   ├── Services.tsx      # Services section
│   ├── Pricing.tsx       # Pricing tiers
│   └── CategoryGrid.tsx  # Talent categories grid
└── lib/
    ├── apollo-client.ts  # Apollo Client configuration
    └── graphql/
        └── queries.ts    # GraphQL queries and mock data
```

## Customization

- Update the GraphQL endpoint in `components/ApolloWrapper.tsx`
- Modify mock data in `lib/graphql/queries.ts`
- Adjust colors and styling in `tailwind.config.js`
- Customize animations in individual components

