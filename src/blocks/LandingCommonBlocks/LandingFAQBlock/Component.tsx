'use client'
import React, { useState } from 'react'

type FAQ = { question: string; answer: string }

interface Props {
  title?: string
  description?: string
  faqs?: FAQ[]
}

const LandingFAQBlock: React.FC<Props> = ({
  title = 'Frequently asked questions',
  description = 'lorem ipsum',
  faqs = [
    { question: 'question 1', answer: 'answer 1' },
    { question: 'question 2', answer: 'answer 2' },
    { question: 'question 3', answer: 'answer 3' },
    { question: 'question 4', answer: 'answer 4' },
  ],
}) => {
  // Open first by default, allow closing (null), but never more than one open at once
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="w-full py-12 md:py-16 bg-branding100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left column */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-branding0 mb-4">{title}</h2>
            <p className="text-branding25 max-w-prose pt-6">{description}</p>
          </div>

          {/* Right column */}
          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden bg-branding75 hover:bg-branding50"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left px-4 py-3 md:px-5 md:py-4"
                  >
                    <span className="text-branding0 font-medium">{item.question}</span>
                    <span className="ml-4 text-branding0 text-xl leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {/* Collapsible content with a fixed height when open to keep overall block height stable */}
                  <div
                    className={[
                      'bg-backgroundsecondary text-branding0 overflow-hidden',
                      // Fixed height when open to keep overall block height stable; closed uses h-0
                      isOpen ? 'h-48 md:h-56 opacity-100' : 'h-0 opacity-0',
                      'transition-opacity duration-200',
                    ].join(' ')}
                    aria-hidden={!isOpen}
                  >
                    <div className="px-4 py-3 md:px-5 md:py-4 overflow-y-auto h-full">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
            {/* Spacer to preserve overall height when no item is open */}
            <div
              className={[
                openIndex === null ? 'h-48 md:h-56' : 'h-0',
                'opacity-0 pointer-events-none',
              ].join(' ')}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingFAQBlock
