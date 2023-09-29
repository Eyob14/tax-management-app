import { hashPassword, verifyPassword } from './hashingFunctions'
import LocalStorageManager from './LocalStorageManager'
import AdminUser from '../utils/authentication/AdminUser'

export default class AuthenticationManager {
  static async signup(userName, password, firstName, lastName, phoneNumber, address) {
    try {
      const normalUsers = LocalStorageManager.getValueFromLocalStorage('users') || []

      const userExists = normalUsers.find((user) => user.userName === userName)

      if (userExists || userName === 'admin') {
        return { status: 'error', message: 'User already exists' }
      }

      const hashedPassword = await hashPassword(password)

      // Create the new user object
      const newUser = {
        firstName,
        lastName,
        userName,
        password: hashedPassword,
        role: 'user',
        phoneNumber,
        address
      }

      // Add the new user to the list
      normalUsers.push(newUser)

      // Update the list in local storage
      LocalStorageManager.setValueInLocalStorage('users', normalUsers)
      LocalStorageManager.setValueInLocalStorage('loggedInUser', newUser)

      return { status: 'success', message: 'User created successfully' }
    } catch (error) {
      return { status: 'error', message: 'An error occurred during signup' }
    }
  }

  static async login(userName, password) {
    try {
      if (userName === AdminUser.userName) {
        // Verify the password
        const isMatch = password === AdminUser.password

        if (!isMatch) {
          return { status: 'error', message: 'Invalid password' }
        }
        const loggedInUser = {
          firstName: AdminUser.firstName,
          lastName: AdminUser.lastName,
          phoneNumber: AdminUser.phoneNumber,
          address: AdminUser.address,
          userName: AdminUser.userName,
          role: AdminUser.role
        }
        LocalStorageManager.setValueInLocalStorage('loggedInUser', loggedInUser)

        return { status: 'success', message: 'admin' }
      }

      const normalUsers = LocalStorageManager.getValueFromLocalStorage('users') || []

      const userExists = normalUsers.find((user) => user.userName === userName)

      if (!userExists) {
        return { status: 'error', message: 'User name does not exist!' }
      }

      // Verify the password
      const isMatch = await verifyPassword(password, userExists.password)

      if (!isMatch) {
        return { status: 'error', message: 'Invalid password!' }
      }
      const loggedInUser = {
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        phoneNumber: userExists.phoneNumber,
        address: userExists.address,
        userName: userExists.userName,
        role: userExists.role
      }
      // Store the logged-in user in local storage
      LocalStorageManager.setValueInLocalStorage('loggedInUser', loggedInUser)

      return { status: 'success', message: 'user' }
    } catch (error) {
      return { status: 'error', message: 'Unexpected Error occurred!' }
    }
  }

  static logout() {
    LocalStorageManager.setValueInLocalStorage('loggedInUser', null)
  }

  static getLoggedInUser() {
    const loggedInUser = LocalStorageManager.getValueFromLocalStorage('loggedInUser')
    return loggedInUser
  }

  static isAdminCreated() {
    const existingAdminUser = LocalStorageManager.getValueFromLocalStorage('adminUser')
    return existingAdminUser !== null
  }
}
