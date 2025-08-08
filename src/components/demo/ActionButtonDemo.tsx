import { ActionButton } from '@/components/ui/action-button'
import { ActionButtonExamples } from '@/components/examples/ActionButtonExamples'
import { LandingCTABlockEnhanced } from '@/blocks/LandingCommonBlocks/LandingCTABlock/ComponentEnhanced'
import BannerCTAScrollBlockEnhanced from '@/blocks/BannerCTAScrollBlock/ComponentEnhanced'
import { Target, ArrowDown, ExternalLink, Archive } from 'lucide-react'

export default function ActionButtonDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Enhanced Action Buttons Demo</h1>
            <ActionButton
              actionType="scroll"
              scrollTarget="bottom-section"
              variant="outline"
              size="sm"
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              Jump to Bottom
            </ActionButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero-section"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Enhanced Action Buttons</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Experience smooth scrolling, seamless navigation, and enhanced user interactions with
            our new ActionButton component.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton
              actionType="scroll"
              scrollTarget="features-section"
              scrollOffset={80}
              scrollDuration={1200}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Target className="h-5 w-5 mr-2" />
              Explore Features
            </ActionButton>

            <ActionButton
              actionType="link"
              linkType="custom"
              url="https://github.com"
              newTab={true}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View Documentation
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Block Demo */}
      <LandingCTABlockEnhanced
        mode="vendre"
        primaryButtonTarget="contact-section"
        secondaryButtonTarget="services-section"
      />

      {/* Enhanced Banner Demo */}
      <BannerCTAScrollBlockEnhanced
        backgroundColor="gradient_blue"
        title="Experience Smooth Scrolling"
        subtitle="Click the button below to see the enhanced scroll animation"
        button={{
          text: 'Scroll to Contact',
          icon: 'dollar_sign',
          scrollTarget: 'contact-section',
        }}
      />

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes our ActionButton component special
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smooth Scrolling</h3>
              <p className="text-gray-600 mb-4">
                Enhanced smooth scrolling with customizable duration, easing, and offset support.
              </p>
              <ActionButton
                actionType="scroll"
                scrollTarget="services-section"
                scrollOffset={80}
                scrollDuration={1500}
                variant="outline"
                size="sm"
              >
                Try Slow Scroll
              </ActionButton>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Navigation</h3>
              <p className="text-gray-600 mb-4">
                Unified API for internal links, external URLs, and archive pages.
              </p>
              <ActionButton
                actionType="link"
                linkType="custom"
                url="/about"
                variant="outline"
                size="sm"
              >
                Internal Link
              </ActionButton>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Archive className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Archive Support</h3>
              <p className="text-gray-600 mb-4">
                Quick navigation to archive pages like posts, properties, and more.
              </p>
              <ActionButton actionType="archive" archive="posts" variant="outline" size="sm">
                View Posts
              </ActionButton>
            </div>
          </div>

          <div className="text-center">
            <ActionButton
              actionType="scroll"
              scrollTarget="contact-section"
              scrollOffset={60}
              scrollDuration={800}
              size="lg"
              variant="default"
            >
              <ArrowDown className="h-5 w-5 mr-2" />
              Continue to Contact
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional real estate services with enhanced user experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Property Evaluation', target: 'contact-section' },
              { title: 'Market Analysis', target: 'contact-section' },
              { title: 'Investment Consulting', target: 'contact-section' },
              { title: 'Property Management', target: 'contact-section' },
              { title: 'Legal Support', target: 'contact-section' },
              { title: '24/7 Support', target: 'contact-section' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  Professional service with enhanced smooth scrolling experience.
                </p>
                <ActionButton
                  actionType="scroll"
                  scrollTarget={service.target}
                  scrollOffset={80}
                  scrollDuration={600 + index * 100} // Staggered animation
                  variant="outline"
                  className="w-full"
                >
                  Learn More
                </ActionButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ActionButtonExamples />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to experience the enhanced action buttons? Contact us today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton
              actionType="link"
              linkType="custom"
              url="tel:+1234567890"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Call Us Now
            </ActionButton>

            <ActionButton
              actionType="link"
              linkType="custom"
              url="mailto:contact@example.com"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Send Email
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section id="bottom-section" className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">You Made It!</h3>
          <p className="text-gray-300 mb-6">
            This is the bottom section. Try scrolling back to the top with our enhanced scroll
            functionality.
          </p>

          <ActionButton
            actionType="scroll"
            scrollTarget="hero-section"
            scrollOffset={0}
            scrollDuration={1500}
            size="lg"
            variant="secondary"
          >
            Back to Top
          </ActionButton>
        </div>
      </section>
    </div>
  )
}
