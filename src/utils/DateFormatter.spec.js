import { it, expect, describe } from 'vitest'
import formatDate from './DateFormatter'

describe('formatDate', () => {
  it('should format a date correctly', () => {
    const currentDate = new Date('2023-02-15T00:00:00.000Z')
    const formattedDate = formatDate(currentDate)
    expect(formattedDate).toBe('15-02-2023')
  })

  it('should handle single-digit day and month', () => {
    const currentDate = new Date('2023-01-05T00:00:00.000Z')
    const formattedDate = formatDate(currentDate)
    expect(formattedDate).toBe('05-01-2023')
  })

  it('should handle a date in a different year', () => {
    const currentDate = new Date('2024-11-20T00:00:00.000Z')
    const formattedDate = formatDate(currentDate)
    expect(formattedDate).toBe('20-11-2024')
  })

  it('should handle leap year (February 29)', () => {
    const currentDate = new Date('2024-02-29T00:00:00.000Z')
    const formattedDate = formatDate(currentDate)
    expect(formattedDate).toBe('29-02-2024')
  })

  it('should handle dates with leading zeros in the day and month', () => {
    const currentDate = new Date('2023-09-01T00:00:00.000Z')
    const formattedDate = formatDate(currentDate)
    expect(formattedDate).toBe('01-09-2023')
  })

  it('should handle dates with a different time zone offset', () => {
    const currentDate = new Date('2023-02-15T12:00:00.000+02:00')
    const formattedDate = formatDate(currentDate)
    expect(formattedDate).toBe('15-02-2023')
  })
})
