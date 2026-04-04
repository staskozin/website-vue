type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')
  const isInitialized = useState<boolean>('theme-initialized', () => false)

  const applyTheme = (value: Theme) => {
    if (!import.meta.client) return

    const root = document.documentElement
    root.dataset.theme = value
    root.style.colorScheme = value
  }

  const setTheme = (value: Theme, persist = true) => {
    theme.value = value
    applyTheme(value)

    if (persist && import.meta.client)
      localStorage.setItem(STORAGE_KEY, value)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  if (import.meta.client && !isInitialized.value) {
    isInitialized.value = true

    onMounted(() => {
      const savedTheme = localStorage.getItem(STORAGE_KEY)
      if (isTheme(savedTheme)) {
        setTheme(savedTheme, false)
        return
      }

      const preferredTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(preferredTheme, false)
    })
  }

  return {
    theme,
    isDark: computed(() => theme.value === 'dark'),
    setTheme,
    toggleTheme
  }
}

