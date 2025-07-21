# Vercel Environment Variables Setup

Go to your Vercel project dashboard at vercel.com and add these environment variables:

## Required Environment Variables:

1. **Database Variables** (copy from your .env file):
   - DATABASE_URL
   - DATABASE_URL_UNPOOLED
   - POSTGRES_URL
   - POSTGRES_URL_NON_POOLING
   - POSTGRES_USER
   - POSTGRES_HOST
   - POSTGRES_PASSWORD
   - POSTGRES_DATABASE

2. **Payload Configuration**:
   - PAYLOAD_SECRET (copy from .env)
   - CRON_SECRET (copy from .env)
   - PREVIEW_SECRET (copy from .env)
   - PAYLOAD_MIGRATE=true
   - NODE_ENV=production

3. **Storage**:
   - BLOB_READ_WRITE_TOKEN (copy from .env)

4. **Stack Auth**:
   - NEXT_PUBLIC_STACK_PROJECT_ID (copy from .env)
   - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY (copy from .env)
   - STACK_SECRET_SERVER_KEY (copy from .env)

5. **URL Configuration**:
   - Don't set NEXT_PUBLIC_SERVER_URL manually - Vercel will auto-set this

## Steps:
1. Go to your Vercel project
2. Click Settings → Environment Variables
3. Add each variable above for "Production" environment
4. Redeploy your project

