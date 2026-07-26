export type SiteLink = {
  id: string
  label: string
  url: string
  internal?: boolean
  hiddenOnPaths?: readonly string[]
}

export const CONTACT_LINKS = [
  {
    id: 'cv',
    label: 'Резюме',
    url: '/cv',
    internal: true,
    hiddenOnPaths: ['/cv'],
  },
  {
    id: 'github',
    label: 'Гитхаб',
    url: 'https://github.com/staskozin',
  },
  {
    id: 'telegram',
    label: 'Телеграм',
    url: 'https://t.me/staskozin',
  },
  {
    id: 'email',
    label: 'stas@staskozin.ru',
    url: 'mailto:stas@staskozin.ru',
  },
] satisfies readonly SiteLink[]

export const FOOTER_LINKS = [
  ...CONTACT_LINKS,
  {
    id: 'personal-data',
    label: 'Политика обработки персональных данных',
    url: '/personal-data',
    internal: true,
  },
  {
    id: 'consent',
    label: 'Согласие на обработку персональных данных',
    url: '/consent',
    internal: true,
  },
] satisfies readonly SiteLink[]
