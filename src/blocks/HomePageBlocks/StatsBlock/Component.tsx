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
      const duration = 1000
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
    <div ref={ref} className="text-4xl font-bold text-primarystatic mb-2">
      {count}
      {suffix}
    </div>
  )
}

export default function StatsBlock({ stats }: StatsBlockProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center text-static p-8 border border-gray-200 bg-gradient-to-br from-[var(--card-var1)] to-[var(--card-var2)] hover:shadow-lg transition-shadow h-48 flex flex-col justify-center"
            >
              <CounterAnimation end={stat.number} suffix={stat.suffix || ''} />
              <div className="text-primarystatic font-medium text-lg">{stat.label}</div>
              <div className="text-sm text-primarystatic mt-2">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
