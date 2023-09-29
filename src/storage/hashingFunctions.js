import bcrypt from 'bcryptjs'

// Function to hash a password
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw new Error(`Error hashing the password: ${  error.message}`)
  }
}

// Function to verify a password
export async function verifyPassword(plainTextPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword)
    return isMatch
  } catch (error) {
    throw new Error(`Error verifying the password: ${  error.message}`)
  }
}
