#!/bin/bash

# Production deployment script for Vercel
# This handles database migrations for production builds

echo "Starting production build process..."

# Check if we're in production
if [ "$NODE_ENV" = "production" ]; then
  echo "Production environment detected"
  
  # Check migration status first
  echo "Checking migration status..."
  pnpm payload migrate:status
  
  # If PAYLOAD_MIGRATE is set to true, run migrations
  if [ "$PAYLOAD_MIGRATE" = "true" ]; then
    echo "PAYLOAD_MIGRATE=true detected, running migrations..."
    echo "yes" | pnpm payload migrate
  else
    echo "Skipping migrations (PAYLOAD_MIGRATE not set to true)"
  fi
else
  echo "Non-production environment, skipping migration check"
fi

# Run the build
echo "Running Next.js build..."
pnpm build

echo "Build process completed"
