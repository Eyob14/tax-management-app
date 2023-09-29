import { it, expect, describe, beforeEach } from 'vitest'
import TaxManager from './TaxManager'

describe('TaxManager', () => {
  let taxManager

  beforeEach(() => {
    taxManager = new TaxManager()
  })

  it('should calculate tax correctly for Level 1', () => {
    const incomeLevel = 'Level 1'
    const annualIncome = 50000
    const expectedTax = 5000 // 0.1 * 50000

    const calculatedTax = taxManager.calculateTax(incomeLevel, annualIncome)

    expect(calculatedTax).toBe(expectedTax)
  })

  it('should calculate tax correctly for Level 2', () => {
    const incomeLevel = 'Level 2'
    const annualIncome = 75000
    const expectedTax = 15000 // 0.2 * 75000

    const calculatedTax = taxManager.calculateTax(incomeLevel, annualIncome)

    expect(calculatedTax).toBe(expectedTax)
  })

  it('should calculate tax correctly for Level 3', () => {
    const incomeLevel = 'Level 3'
    const annualIncome = 100000
    const expectedTax = 30000 // 0.3 * 100000

    const calculatedTax = taxManager.calculateTax(incomeLevel, annualIncome)

    expect(calculatedTax).toBe(expectedTax)
  })

  it('should return 0 for an unknown income level', () => {
    const incomeLevel = 'Unknown'
    const annualIncome = 60000

    const calculatedTax = taxManager.calculateTax(incomeLevel, annualIncome)

    expect(calculatedTax).toBe(0)
  })
})
