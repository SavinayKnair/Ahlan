## Cloudflare Free Tier Deployment (Workers + D1)

This project is optimized for the **Cloudflare Free Tier**, ensuring 100% free monthly hosting with high performance.

### 1. Prerequisites
- [Cloudflare Account](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-setup/)

### 2. Setup D1 Database (FREE)
```bash
# Create the database
npx wrangler d1 create AhlanDB

# Initialize the schema
npx wrangler d1 execute AhlanDB --remote --file=migrations/schema.sql

# Seed the data from database.json
npx wrangler d1 execute AhlanDB --remote --file=migrations/seed.sql
```
*Note: Copy the `database_id` from the output and paste it into `wrangler.toml`.*

### 3. Static Image Hosting
Images are served from the repository's `public/images/` folder. This eliminates the need for paid R2 storage.
- **Rooms**: `/public/images/rooms/`
- **Packages**: `/public/images/packages/`
- **General**: `/public/images/common/`

### 4. Deployment
```bash
# Build and Deploy to Cloudflare Workers
npm run deploy
```

## Architecture (100% FREE)
- **Runtime**: Cloudflare Workers (OpenNext) - *Free up to 100k requests/day*
- **Database**: Cloudflare D1 (SQLite) - *Free up to 5M reads/day*
- **Images**: Next.js Static Assets - *Zero cost*
- **SEO**: Fully optimized for Google Lighthouse with static assets.
