'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollAnimation } from '@/components/scroll-animations'
import { Calculator, Home, DollarSign, Percent, Calendar } from 'lucide-react'

// Custom Slider Component
const CustomSlider = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
}: {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={`relative ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="w-full h-2 bg-branding0 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, var(--accent3-static) 0%, var(--accent3-static) ${percentage}%, var(--branding-25) ${percentage}%, var(--branding-25) 100%)`,
        }}
      />
    </div>
  )
}

interface MortgageCalculatorBlockProps {
  title?: string
  subtitle?: string
  description?: string
  defaultValues?: {
    homePrice?: number
    downPayment?: number
    interestRate?: number
    loanTerm?: number
  }
}

export default function MortgageCalculatorBlock({
  title = 'Calculateur Hypothécaire',
  subtitle = 'Estimez vos paiements mensuels',
  description = 'Utilisez notre calculateur pour estimer vos paiements hypothécaires mensuels et planifier votre achat immobilier.',
  defaultValues = {
    homePrice: 500000,
    downPayment: 100000,
    interestRate: 5.25,
    loanTerm: 25,
  },
}: MortgageCalculatorBlockProps) {
  const [homePrice, setHomePrice] = useState(defaultValues.homePrice || 500000)
  const [downPayment, setDownPayment] = useState(defaultValues.downPayment || 100000)
  const [interestRate, setInterestRate] = useState(defaultValues.interestRate || 5.25)
  const [loanTerm, setLoanTerm] = useState(defaultValues.loanTerm || 25)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  // Animation function for smooth value transitions
  const animateValue = (
    startValue: number,
    endValue: number,
    duration: number,
    updateFunction: (value: number) => void,
  ) => {
    const startTime = performance.now()
    const valueChange = endValue - startValue

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Enhanced easing function for smoother animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)

      const currentValue = startValue + valueChange * easeOutCubic

      // Round to step increments for cleaner values
      const step = valueChange > 0 ? 1000 : -1000
      const roundedValue = Math.round(currentValue / Math.abs(step)) * Math.abs(step)

      updateFunction(Math.max(0, roundedValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Ensure we end exactly at the target value
        updateFunction(endValue)
      }
    }

    requestAnimationFrame(animate)
  }

  // Calculate mortgage payments
  useEffect(() => {
    const principal = homePrice - downPayment
    const numberOfPayments = loanTerm * 12

    const annualRate = interestRate / 100

    if (principal > 0 && annualRate > 0 && numberOfPayments > 0) {
      const monthlyRate = Math.pow(1 + annualRate / 2, 1 / 6) - 1

      const monthly = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments))

      const totalPaid = monthly * numberOfPayments
      const totalInt = totalPaid - principal

      setMonthlyPayment(monthly)
      setTotalInterest(totalInt)
      setTotalPayment(totalPaid)
    } else {
      setMonthlyPayment(0)
      setTotalInterest(0)
      setTotalPayment(0)
    }
  }, [homePrice, downPayment, interestRate, loanTerm])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-CA').format(num)
  }

  const loanAmount = homePrice - downPayment
  const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0

  return (
    <section className="py-20 bg-gradient-to-br from-branding0 to-secondarystatic">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <div className="inline-block bg-accent3static h-1 w-24 mb-6"></div>
            <h2 className="text-4xl font-serif font-bold text-branding100 mb-6">{title}</h2>
            <p className="text-2xl text-accent3static font-semibold mb-4">{subtitle}</p>
            <p className="text-lg text-branding75 max-w-3xl mx-auto">{description}</p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Form */}
          <ScrollAnimation animation="slideRight" delay={300}>
            <Card className="bg-secondarystatic shadow-xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Calculator className="h-6 w-6 text-accent3static mr-3" />
                    <h3 className="text-2xl font-bold text-branding100">Paramètres du prêt</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Home Price */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-branding75 mb-2">
                      <Home className="h-4 w-4 mr-2 text-accent3static" />
                      Prix de la propriété
                    </label>
                    <Input
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="text-lg p-4 mb-3 text-branding100 bg-branding0 border border-borderprimarystatic"
                      min="0"
                      step="10000"
                    />
                    <CustomSlider
                      value={homePrice}
                      onValueChange={setHomePrice}
                      min={100000}
                      max={2000000}
                      step={10000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-branding75">
                      <span>100k $</span>
                      <span>{formatCurrency(homePrice)}</span>
                      <span>2M $</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-branding75 mb-2">
                      <DollarSign className="h-4 w-4 mr-2 text-accent3static" />
                      Mise de fonds
                    </label>
                    <div className="flex gap-3 mb-3">
                      <Input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="text-lg p-4 flex-1 text-branding100 bg-branding0 border border-borderprimarystatic"
                        min="0"
                        step="1000"
                      />
                      <div className="flex gap-1">
                        {[5, 10, 15, 20].map((percentage) => (
                          <Button
                            key={percentage}
                            type="button"
                            variant={
                              Math.abs((downPayment / homePrice) * 100 - percentage) < 0.1
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            className={`px-3 py-2 text-xs transition-all duration-200 hover:scale-105 ${
                              Math.abs((downPayment / homePrice) * 100 - percentage) < 0.1
                                ? 'bg-accent3static text-branding0 hover:text-branding0 hover:bg-accent3static/90 border-accent3static'
                                : 'bg-branding0 text-accent3static hover:text-branding0 border-accent3static hover:bg-accent3static'
                            }`}
                            onClick={() => {
                              const targetValue = Math.round((homePrice * percentage) / 100)
                              animateValue(downPayment, targetValue, 800, setDownPayment)
                            }}
                          >
                            {percentage}%
                          </Button>
                        ))}
                      </div>
                    </div>
                    <CustomSlider
                      value={downPayment}
                      onValueChange={setDownPayment}
                      min={Math.min(25000, homePrice * 0.05)}
                      max={homePrice * 0.5}
                      step={5000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-branding75">
                      <span>5%</span>
                      <span>
                        {formatCurrency(downPayment)} ({downPaymentPercent.toFixed(1)}%)
                      </span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-branding75 mb-2">
                      <Percent className="h-4 w-4 mr-2 text-accent3static" />
                      Taux d&apos;intérêt annuel (%)
                    </label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="text-lg p-4  text-branding100 bg-branding0 border border-borderprimarystatic"
                      min="0"
                      max="20"
                      step="0.01"
                    />
                    <p className="text-sm text-branding50 mt-1">{interestRate}% par année</p>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-branding75 mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-accent3static" />
                      Période d&apos;amortissement (années)
                    </label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="text-lg p-4  text-branding100 bg-branding0 border border-borderprimarystatic"
                      min="20"
                      max="35"
                      step="1"
                    />
                    <p className="text-sm text-branding50 mt-1">{loanTerm} années</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Results */}
          <ScrollAnimation animation="slideLeft" delay={600}>
            <Card className="bg-gradient-to-br from-accent3static to-accent4static text-branding0 shadow-xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Résultats du calcul</h3>
                  <p className="text-accent1static">Basé sur vos paramètres</p>
                </div>

                <div className="space-y-6">
                  {/* Monthly Payment */}
                  <div className="bg-white/10 rounded-lg p-6 pl-10">
                    <h4 className="text-lg font-semibold mb-2">Paiement mensuel</h4>
                    <p className="text-3xl font-bold">{formatCurrency(monthlyPayment)}</p>
                    <p className="text-accent1static text-sm mt-1">Capital et intérêts</p>
                  </div>

                  {/* Loan Amount */}
                  <div className="bg-white/10 rounded-lg p-4 pl-10">
                    <h4 className="text-sm font-semibold mb-1">Montant du prêt</h4>
                    <p className="text-xl font-bold">{formatCurrency(loanAmount)}</p>
                  </div>

                  {/* Total Interest */}
                  <div className="bg-white/10 rounded-lg p-4 pl-10">
                    <h4 className="text-sm font-semibold mb-1">Intérêts totaux</h4>
                    <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
                  </div>

                  {/* Total Payment */}
                  <div className="bg-white/10 rounded-lg p-4 pl-10">
                    <h4 className="text-sm font-semibold mb-1">Paiements totaux</h4>
                    <p className="text-xl font-bold">{formatCurrency(totalPayment)}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-accent3static">
                  <p className="text-sm text-accent1static">
                    * Ce calculateur fournit une estimation approximative. Consultez un conseiller
                    financier pour des calculs précis.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>

        {/* Summary Stats */}
        <ScrollAnimation animation="fadeIn" delay={900}>
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent3static mb-2">
                {formatNumber(loanTerm * 12)}
              </div>
              <div className="text-branding75">Paiements totaux</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent3static mb-2">
                {downPaymentPercent.toFixed(1)}%
              </div>
              <div className="text-branding75">Mise de fonds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent3static mb-2">{interestRate}%</div>
              <div className="text-branding75">Taux d&apos;intérêt</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent3static mb-2">{loanTerm}</div>
              <div className="text-branding75">Années</div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
