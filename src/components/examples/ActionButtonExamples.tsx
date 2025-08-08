import { ActionButton } from '@/components/ui/action-button'
import { Target, ExternalLink, Archive } from 'lucide-react'

/**
 * Example usage of the ActionButton component
 */
export function ActionButtonExamples() {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold mb-4">ActionButton Examples</h2>

      {/* Scroll to Block Examples */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Scroll to Block</h3>

        {/* Basic scroll */}
        <ActionButton
          actionType="scroll"
          scrollTarget="contact-section"
          variant="default"
          size="lg"
        >
          <Target className="h-4 w-4 mr-2" />
          Scroll to Contact
        </ActionButton>

        {/* Scroll with custom offset (useful for fixed headers) */}
        <ActionButton
          actionType="scroll"
          scrollTarget="services-section"
          scrollOffset={80} // 80px offset from top
          scrollDuration={1200} // Slower animation
          variant="outline"
        >
          Scroll to Services (with offset)
        </ActionButton>

        {/* Instant scroll */}
        <ActionButton
          actionType="scroll"
          scrollTarget="footer"
          scrollBehavior="instant"
          variant="ghost"
          size="sm"
        >
          Jump to Footer
        </ActionButton>
      </div>

      {/* Link Examples */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Links</h3>

        {/* External link */}
        <ActionButton
          actionType="link"
          linkType="custom"
          url="https://example.com"
          newTab={true}
          variant="secondary"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          External Link
        </ActionButton>

        {/* Internal link to page - using string value */}
        <ActionButton
          actionType="link"
          linkType="reference"
          reference={{
            relationTo: 'pages',
            value: 'about-page-id',
          }}
          variant="link"
        >
          About Page (Reference)
        </ActionButton>

        {/* Custom internal link */}
        <ActionButton actionType="link" linkType="custom" url="/contact" variant="outline">
          Contact Page
        </ActionButton>
      </div>

      {/* Archive Examples */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Archive Links</h3>

        {/* Posts archive */}
        <ActionButton actionType="archive" archive="posts" variant="default">
          <Archive className="h-4 w-4 mr-2" />
          View All Posts
        </ActionButton>

        {/* Custom archive */}
        <ActionButton actionType="archive" archive="properties" variant="secondary">
          View All Properties
        </ActionButton>
      </div>

      {/* Advanced Examples */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Advanced Usage</h3>

        {/* Button with custom onClick handler */}
        <ActionButton
          actionType="scroll"
          scrollTarget="hero-section"
          variant="destructive"
          onClick={() => {
            console.log('Custom action before scroll')
          }}
        >
          Scroll with Custom Action
        </ActionButton>

        {/* Button as child (using asChild) */}
        <ActionButton actionType="link" linkType="custom" url="/special-page" asChild>
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Custom Styled Button
          </div>
        </ActionButton>
      </div>

      {/* Demo sections for scrolling */}
      <div className="mt-12 space-y-8">
        <div id="hero-section" className="h-64 bg-blue-100 rounded p-4">
          <h3 className="text-xl font-bold">Hero Section</h3>
          <p>This is the hero section for scroll testing.</p>
        </div>

        <div id="services-section" className="h-64 bg-green-100 rounded p-4">
          <h3 className="text-xl font-bold">Services Section</h3>
          <p>This is the services section for scroll testing.</p>
        </div>

        <div id="contact-section" className="h-64 bg-yellow-100 rounded p-4">
          <h3 className="text-xl font-bold">Contact Section</h3>
          <p>This is the contact section for scroll testing.</p>
        </div>

        <div id="footer" className="h-32 bg-gray-100 rounded p-4">
          <h3 className="text-lg font-bold">Footer</h3>
          <p>This is the footer for scroll testing.</p>
        </div>
      </div>
    </div>
  )
}
