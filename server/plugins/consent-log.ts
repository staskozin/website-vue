import { initializeConsentLogSync } from '../utils/consent-log'

try {
  initializeConsentLogSync()
} catch (error) {
  console.error('Consent log initialization failed:', error)
  throw error
}

export default defineNitroPlugin(() => undefined)
