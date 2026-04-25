## Cloudflare D1 & R2 Deployment (via OpenNext)

This project is optimized for Cloudflare Workers using OpenNext with D1 Database and R2 Storage.

### 1. Prerequisites
- [Cloudflare Account](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-setup/)

### 2. Setup D1 Database
```bash
# Create the database
npx wrangler d1 create AhlanDB

# Initialize the schema
npx wrangler d1 execute AhlanDB --remote --file=migrations/schema.sql

# Seed the data from database.json
npx wrangler d1 execute AhlanDB --remote --file=migrations/seed.sql
```
*Note: Copy the `database_id` from the output and paste it into `wrangler.toml`.*

### 3. Setup R2 Bucket
```bash
# Create the bucket for images
npx wrangler r2 bucket create ahlan-assets
```

### 4. Local Development
To run locally:
```bash
npm run dev
```

### 5. Deployment
```bash
npm run deploy
```

## Architecture
- **Runtime**: Cloudflare Workers (via OpenNext)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Persistence**: No more `database.json` in production! All changes via the Admin Panel persist in D1.
