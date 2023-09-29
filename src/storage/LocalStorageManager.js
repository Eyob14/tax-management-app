export default class LocalStorageManager {
  // Function to check if a key is already present in local storage
  static checkKeyInLocalStorage(key) {
    const value = localStorage.getItem(key)
    return value !== null
  }

  // Get request key from local storage
  static getValueFromLocalStorage(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  // Set item to local storage using specified key
  static setValueInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
