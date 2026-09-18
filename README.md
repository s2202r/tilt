# TILT

Collective buying platform: more committed buyers unlock lower prices.

## Production MVP surfaces
- Buyer storefront and live drops
- Target-price commitment UX
- Buyer dashboard
- Seller demand/offer portal
- Admin control room
- Supabase schema with RLS foundation
- Payment-provider abstraction envs

## Run
```bash
npm install
npm run dev
```

Configure `.env.local` from `.env.example` after provisioning Supabase. Real-money payments remain disabled until provider credentials and final commitment/refund terms are configured.
