<template>
  <aside
    v-if="isVisible"
    class="consent-banner"
    aria-labelledby="analytics-consent-title"
  >
    <p id="analytics-consent-title">
      Сайт использует cookie Яндекс Метрики для статистики посещаемости страниц. Подробнее&nbsp;&mdash; в
      <NuxtLink to="/consent">согласии</NuxtLink>
      и
      <NuxtLink to="/personal-data">политике</NuxtLink>.
    </p>
    <div class="actions">
      <button
        type="button"
        :disabled="isSubmitting"
        @click="acceptAnalytics"
      >
        {{ isSubmitting ? 'Сохраняю…' : 'Согласен' }}
      </button>
      <p
        v-if="errorMessage"
        class="error"
        role="alert"
      >
        {{ errorMessage }}
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ANALYTICS_CONSENT_VERSION,
  ANALYTICS_COOKIE_MAX_AGE,
  ANALYTICS_COOKIE_NAME,
  YANDEX_METRIKA_ID,
} from '../shared/analytics'

type ConsentResponse = {
  eventId: string
  acceptedAt: string
  consentVersion: string
}

type YmFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][]
  l?: number
}

declare global {
  interface Window {
    ym?: YmFunction
  }
}

const route = useRoute()
const consentCookie = useCookie<string | null>(ANALYTICS_COOKIE_NAME, {
  maxAge: ANALYTICS_COOKIE_MAX_AGE,
  path: '/',
  sameSite: 'lax',
  secure: !import.meta.dev,
})

const isVisible = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
let isMetrikaEnabled = false

function createYmQueue(): YmFunction {
  const ym: YmFunction = (...args: unknown[]) => {
    if (!ym.a) ym.a = []
    ym.a.push(args)
  }
  ym.l = Date.now()
  return ym
}

function sendHit() {
  if (!isMetrikaEnabled || !window.ym) return

  const pageUrl = new URL(route.path, window.location.origin).href
  window.ym(YANDEX_METRIKA_ID, 'hit', pageUrl)
}

function enableMetrika() {
  if (isMetrikaEnabled) return

  if (!window.ym) window.ym = createYmQueue()

  if (!document.querySelector('script[data-yandex-metrika]')) {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://mc.yandex.ru/metrika/tag.js'
    script.dataset.yandexMetrika = 'true'
    document.head.append(script)
  }

  window.ym(YANDEX_METRIKA_ID, 'init', {
    accurateTrackBounce: false,
    clickmap: false,
    defer: true,
    ecommerce: false,
    trackHash: false,
    trackLinks: false,
    webvisor: false,
  })

  isMetrikaEnabled = true
  sendHit()
}

async function acceptAnalytics() {
  if (isSubmitting.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<ConsentResponse>('/api/consent', {
      method: 'POST',
      body: { page: window.location.pathname },
    })

    consentCookie.value = response.consentVersion
    isVisible.value = false
    enableMetrika()
  } catch {
    errorMessage.value = 'Не удалось сохранить согласие. Попробуйте ещё раз.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (consentCookie.value === ANALYTICS_CONSENT_VERSION) {
    enableMetrika()
  } else {
    isVisible.value = true
  }
})

watch(
  () => route.path,
  async () => {
    if (!isMetrikaEnabled) return

    await nextTick()
    sendHit()
  },
)
</script>

<style scoped>
.consent-banner {
  position: fixed;
  z-index: 1000;
  right: 12px;
  bottom: 12px;
  box-sizing: border-box;
  width: min(360px, calc(100vw - 24px));
  padding: 18px;
  border-radius: 10px;
  background: var(--background-color);
  box-shadow: 0 8px 30px rgba(35, 54, 64, 0.2);
  font-size: 18px;
  line-height: 1.4;
}

.consent-banner p {
  margin: 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}

button {
  width: 100%;
  flex: 0 0 auto;
  cursor: pointer;
  padding: 7px 12px 9px;
  border: 2px solid #135d86;
  border-radius: 6px;
  color: #ffffff;
  background-color: #135d86;
  font: inherit;
  line-height: 1.1;
  transition: background-color 0.22s ease-out, border-color 0.22s ease-out;
}

button:focus-visible {
  outline: 2px solid #1f73e3;
  outline-offset: 2px;
}

button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.error {
  color: #a31919;
  font-size: 0.9em;
}

@media screen and (max-width: 520px) {
  .consent-banner {
    padding: 14px;
    width: calc(100vw - 24px);
  }

  .actions {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (hover: hover) {
  button:not(:disabled):hover {
    border-color: #3377a2;
    background-color: #3377a2;
    transition: none;
  }
}
</style>
