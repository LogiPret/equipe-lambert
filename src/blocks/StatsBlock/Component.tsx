'use client'
import { useEffect, useRef, useState } from 'react'

interface StatItem {
  number: number
  suffix?: string
  label: string
  description: string
}

interface StatsBlockProps {
  stats: StatItem[]
}

function CounterAnimation({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
      const increment = end / (duration / 16)
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [end, isVisible])

  return (
    <div ref={ref} className="text-4xl font-bold text-[#0f3046] mb-2">
      {count}
      {suffix}
    </div>
  )
}

function ScrollAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
}: {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn'
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out'

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClass} opacity-0`
        case 'slideUp':
          return `${baseClass} opacity-0 translate-y-8`
        case 'scaleIn':
          return `${baseClass} opacity-0 scale-95`
        default:
          return `${baseClass} opacity-0`
      }
    }

    return `${baseClass} opacity-100 translate-y-0 scale-100`
  }

  return (
    <div ref={ref} className={getAnimationClass()}>
      {children}
    </div>
  )
}

export default function StatsBlock({ stats }: StatsBlockProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollAnimation key={index} animation="scaleIn" delay={200 + index * 200}>
              <div className="text-center text-[#0f3046] p-8 border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg transition-shadow h-48 flex flex-col justify-center">
                <CounterAnimation end={stat.number} suffix={stat.suffix || ''} />
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                <div className="text-sm text-[#0f3046] mt-2">{stat.description}</div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
