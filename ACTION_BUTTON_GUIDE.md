# Enhanced Action Button Component

The new `ActionButton` component provides smooth scrolling, link navigation, and archive functionality to replace the existing scroll-to-block behavior that was teleporting without animation.

## Features

### 🎯 Smooth Scrolling
- Enhanced smooth scrolling with customizable duration and easing
- Configurable offset for fixed headers
- Better visual feedback with smooth animations

### 🔗 Link Navigation
- Internal page references
- External URL links
- New tab support

### 📁 Archive Navigation
- Quick navigation to archive pages (posts, properties, etc.)

## Components

### ActionButton
Main button component with enhanced functionality.

```tsx
import { ActionButton } from '@/components/ui/action-button'

// Scroll to a block
<ActionButton
  actionType="scroll"
  scrollTarget="contact-section"
  scrollOffset={80}        // Offset for fixed header
  scrollDuration={800}     // Animation duration
  variant="default"
  size="lg"
>
  Contact Us
</ActionButton>

// External link
<ActionButton
  actionType="link"
  linkType="custom"
  url="https://example.com"
  newTab={true}
  variant="secondary"
>
  External Link
</ActionButton>

// Archive link
<ActionButton
  actionType="archive"
  archive="posts"
  variant="outline"
>
  View All Posts
</ActionButton>
```

### Smooth Scroll Hook
For custom scroll functionality.

```tsx
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

function MyComponent() {
  const { scrollToElement, scrollToTop } = useSmoothScroll()
  
  const handleScroll = async () => {
    await scrollToElement('target-section', {
      offset: 80,
      duration: 1000,
    })
  }
  
  return <button onClick={handleScroll}>Scroll</button>
}
```

## Migration Guide

### Update Existing Blocks

Replace existing scroll functions in your blocks:

```tsx
// Old way
const scrollToBlock = (blockId: string) => {
  const element = document.getElementById(blockId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

// New way
import { enhancedScrollToBlock } from '@/utilities/scroll'

const scrollToBlock = enhancedScrollToBlock
```

### Update Button Click Handlers

Replace button handlers in hero blocks:

```tsx
// Old way
const handleButtonClick = (button: ButtonData) => {
  if (button.actionType === 'scroll' && button.scrollTarget) {
    scrollToBlock(button.scrollTarget)
  } else if (button.actionType === 'link' && button.link) {
    // handle links...
  }
}

// New way
import { handleActionButtonClick } from '@/utilities/scroll'

const handleButtonClick = handleActionButtonClick
```

### Replace Regular Buttons

Update your existing buttons to use ActionButton:

```tsx
// Old way
<Button onClick={() => scrollToBlock('contact')}>
  Contact Us
</Button>

// New way
<ActionButton
  actionType="scroll"
  scrollTarget="contact"
  scrollOffset={80}
>
  Contact Us
</ActionButton>
```

## API Reference

### ActionButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actionType` | `'scroll' \| 'link' \| 'archive'` | - | **Required.** Type of action |
| `scrollTarget` | `string` | - | ID of element to scroll to |
| `scrollOffset` | `number` | `0` | Offset from top in pixels |
| `scrollDuration` | `number` | `800` | Animation duration in ms |
| `scrollBehavior` | `'smooth' \| 'instant' \| 'auto'` | `'smooth'` | Scroll behavior |
| `scrollBlock` | `'start' \| 'center' \| 'end' \| 'nearest'` | `'start'` | Scroll position |
| `linkType` | `'custom' \| 'reference'` | - | Type of link |
| `url` | `string` | - | Custom URL |
| `reference` | `object` | - | Page/post reference |
| `newTab` | `boolean` | `false` | Open in new tab |
| `archive` | `string` | - | Archive type |

### useSmoothScroll Hook

```tsx
const { scrollToElement, scrollToTop } = useSmoothScroll()

// Scroll to element
await scrollToElement('element-id', {
  behavior: 'smooth',
  block: 'start',
  offset: 80,
  duration: 800,
})

// Scroll to top
await scrollToTop({
  behavior: 'smooth',
  duration: 600,
})
```

## Examples

### Basic Scroll Button
```tsx
<ActionButton
  actionType="scroll"
  scrollTarget="services-section"
  variant="default"
  size="lg"
>
  <Target className="h-4 w-4 mr-2" />
  View Services
</ActionButton>
```

### Scroll with Fixed Header Offset
```tsx
<ActionButton
  actionType="scroll"
  scrollTarget="contact-form"
  scrollOffset={100}  // Account for 100px header
  scrollDuration={1200}
  variant="outline"
>
  Get in Touch
</ActionButton>
```

### External Link with Icon
```tsx
<ActionButton
  actionType="link"
  linkType="custom"
  url="https://example.com"
  newTab={true}
  variant="secondary"
>
  <ExternalLink className="h-4 w-4 mr-2" />
  Visit Website
</ActionButton>
```

### Archive Navigation
```tsx
<ActionButton
  actionType="archive"
  archive="posts"
  variant="ghost"
>
  <Archive className="h-4 w-4 mr-2" />
  View All Blog Posts
</ActionButton>
```

## Benefits

- ✅ **Smooth animations** instead of instant teleporting
- ✅ **Customizable scroll behavior** with offset and duration
- ✅ **Better UX** with visual feedback
- ✅ **Unified API** for all button actions
- ✅ **TypeScript support** with full type safety
- ✅ **Backward compatible** with existing code
- ✅ **Performance optimized** with requestAnimationFrame
- ✅ **Accessibility friendly** with proper ARIA attributes

## Performance

The component uses `requestAnimationFrame` for smooth animations and includes:
- Easing functions for natural motion
- Proper cleanup to prevent memory leaks
- Efficient element selection
- Fallback to browser smooth scroll when appropriate
