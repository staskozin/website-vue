import { randomUUID } from 'node:crypto'
import {
  createError,
  defineEventHandler,
  getHeader,
  getRequestIP,
  getRequestProtocol,
  getRequestURL,
  readBody,
  setCookie,
  setResponseStatus,
} from 'h3'
import {
  ANALYTICS_CONSENT_VERSION,
  ANALYTICS_COOKIE_MAX_AGE,
  ANALYTICS_COOKIE_NAME,
} from '../../shared/analytics'
import { appendConsentRecord } from '../utils/consent-log'

type ConsentRequest = {
  page?: unknown
}

function validatePage(value: unknown) {
  if (typeof value !== 'string' || value.length === 0 || value.length > 2048) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page' })
  }

  if (!value.startsWith('/') || value.includes('?') || value.includes('#')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page' })
  }

  const parsed = new URL(value, 'https://staskozin.invalid')
  if (parsed.pathname !== value) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid page' })
  }

  return value
}

export default defineEventHandler(async (event) => {
  const origin = getHeader(event, 'origin')
  const requestOrigin = getRequestURL(event, { xForwardedHost: true }).origin

  if (!origin || origin !== requestOrigin) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid origin' })
  }

  const body = await readBody<ConsentRequest>(event)
  const page = validatePage(body?.page)
  const eventId = randomUUID()
  const acceptedAt = new Date().toISOString()
  const userAgent = (getHeader(event, 'user-agent') || 'unknown').slice(0, 1024)
  const ip = (getRequestIP(event, { xForwardedFor: true }) || 'unknown').slice(0, 128)

  try {
    await appendConsentRecord({
      eventId,
      acceptedAt,
      decision: 'accepted',
      consentVersion: ANALYTICS_CONSENT_VERSION,
      ip,
      userAgent,
      page,
    })
  } catch (error) {
    console.error('Consent log write failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to save consent',
    })
  }

  setCookie(event, ANALYTICS_COOKIE_NAME, ANALYTICS_CONSENT_VERSION, {
    httpOnly: false,
    maxAge: ANALYTICS_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: getRequestProtocol(event) === 'https',
  })
  setResponseStatus(event, 201)

  return {
    eventId,
    acceptedAt,
    consentVersion: ANALYTICS_CONSENT_VERSION,
  }
})
