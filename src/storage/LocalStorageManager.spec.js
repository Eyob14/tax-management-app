import { it, expect, describe, beforeEach } from 'vitest'
import LocalStorageManager from './LocalStorageManager'

describe('LocalStorageManager', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should check if a key is present in local storage', () => {
    const key = 'testKey'

    localStorage.setItem(key, 'testValue')

    const result = LocalStorageManager.checkKeyInLocalStorage(key)

    expect(result).toBe(true)
  })

  it('should return false for a key not present in local storage', () => {
    const key = 'nonExistentKey'

    const result = LocalStorageManager.checkKeyInLocalStorage(key)

    expect(result).toBe(false)
  })

  it('should get a value from local storage', () => {
    const key = 'testKey'
    const value = { foo: 'bar' }

    localStorage.setItem(key, JSON.stringify(value))

    const result = LocalStorageManager.getValueFromLocalStorage(key)

    expect(result).toEqual(value)
  })

  it('should return null for a non-existent key when getting a value', () => {
    const key = 'nonExistentKey'

    const result = LocalStorageManager.getValueFromLocalStorage(key)

    expect(result).toBeNull()
  })

  it('should set a value in local storage', () => {
    const key = 'testKey'
    const value = { foo: 'bar' }

    LocalStorageManager.setValueInLocalStorage(key, value)

    const result = JSON.parse(localStorage.getItem(key))

    expect(result).toEqual(value)
  })
})
