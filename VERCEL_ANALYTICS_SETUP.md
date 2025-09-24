# Vercel Custom Events Setup

This document outlines the custom events setup for tracking user interactions across the website.

## Event Types

### 1. **Page Views**

- `post_view`: Fired when an individual post page loads
- `posts_listing_view`: Fired when the posts listing page (/posts) loads

### 2. **Block Views**

- `block_view`: Fired when a content block becomes 50% visible on screen
  - Tracked on: /acheter, /vendre, individual post pages
  - Data includes: page, block_type, block_index

### 3. **Button/Link Clicks**

- `button_click`: Fired on any clickable element (buttons, links)
  - Tracked on: /acheter, /vendre, individual post pages
  - Data includes: page, label, block_type, block_index

### 4. **Post-Specific Events**

- `post_card_click`: Fired when a post card is clicked on the posts listing page
- `button_click` with `is_related_post` flag: Fired when related post links are clicked

## Tracking Components

### AcheterTracking.client.tsx

- **Location**: `src/analytics/AcheterTracking.client.tsx`
- **Used on**: `/acheter` page
- **Events**: `block_view`, `button_click`

### VendreTracking.client.tsx

- **Location**: `src/analytics/VendreTracking.client.tsx`
- **Used on**: `/vendre` page
- **Events**: `block_view`, `button_click`

### PostTracking.client.tsx

- **Location**: `src/analytics/PostTracking.client.tsx`
- **Used on**: Individual post pages (`/posts/[slug]`)
- **Events**: `post_view`, `block_view`, `button_click`
- **Special features**:
  - Tracks post slug in all events
  - Identifies related post clicks with additional metadata

### PostsListingTracking.client.tsx

- **Location**: `src/analytics/PostsListingTracking.client.tsx`
- **Used on**: Posts listing page (`/posts`)
- **Events**: `posts_listing_view`, `post_card_click`

## Implementation Details

### Block Tracking

All tracking components use Intersection Observer to detect when blocks are 50% visible:

- Uses `data-block-type` and `data-block-index` attributes on elements
- Prevents duplicate tracking with a `Set` to track seen blocks
- Threshold set to 0.5 (50% visibility)

### Click Tracking

All tracking components capture clicks at the document level:

- Uses event capture to catch clicks early
- Finds closest clickable element (`a, button`)
- Extracts labels from `aria-label` or `textContent`
- Identifies parent block context for additional metadata

### Data Attributes Required

For proper tracking, content blocks should include:

```html
<div data-block-type="heroBlock" data-block-index="0">
  <!-- block content -->
</div>
```

For related posts:

```html
<article data-related-post="true">
  <a href="/posts/some-post">Link</a>
</article>
```

## Event Data Structure

### Standard Fields

- `page`: Page identifier (e.g., 'acheter', 'vendre', 'post', 'posts_listing')
- `block_type`: Type of block (for block-related events)
- `block_index`: Index position of block
- `label`: Text content or aria-label of clicked element

### Post-Specific Fields

- `post_slug`: Slug of the current post
- `post_url`: Full URL path
- `is_related_post`: Boolean flag for related post interactions
- `related_post_slug`: Slug of related post being clicked

## Usage in Components

### Main Page Component

```tsx
// src/app/(frontend)/[slug]/page.tsx
{
  slug === 'acheter' ? <AcheterTracking /> : null
}
{
  slug === 'vendre' ? <VendreTracking /> : null
}
```

### Individual Post Page

```tsx
// src/app/(frontend)/posts/[slug]/page.tsx
<PostTracking />
```

### Posts Listing Page

```tsx
// src/app/(frontend)/posts/page.tsx
<PostsListingTracking />
```

## Dependencies

- `@vercel/analytics`: For the `track()` function
- `next/navigation`: For `usePathname()` hook
- React hooks: `useEffect` for side effects
