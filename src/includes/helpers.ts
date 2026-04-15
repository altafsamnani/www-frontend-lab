export function useReadableFileSize(file) {
  const DEFAULT_SIZE = 0
  const fileSize = file ?? DEFAULT_SIZE

  if (!fileSize) {
    return
  }

  const sizeInKb = fileSize / 1024

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`
  } else {
    return `${sizeInKb.toFixed(2)} kb`
  }
}

function preview(url: string, width: number, height: number, fit: string = 'outside') {
  const configImage = { bucket: import.meta.env.VITE_S3_BUCKET, key: 'images/' + url }
  if (width || height) {
    configImage.edits = {}
    width ? (configImage.edits.width = width) : ''
    height ? (configImage.edits.height = height) : ''
    fit ? (configImage.edits.fit = fit) : ''
  }
  const imageRequest = JSON.stringify(configImage)
  return import.meta.env.VITE_S3_ENDPOINT + '/' + btoa(imageRequest)
}

export const thumbnail200 = (url: string) => {
  return preview(url, 200, 200)
}

export const thumbnail_50 = (url: string) => {
  return preview(url, 50, 50)
}

export const largeImage = (url: string) => {
  return preview(url, 800, 800)
}

export const getSeverity = (stockLevel: number) => {
  if (stockLevel < 4) {
    return 'success'
  } else if (stockLevel < 6) {
    return 'warn'
  } else {
    return 'danger'
  }
}

export const capitalizeFirstWord = (str: string) => {
  if (!str) return ''
  return str
    .split(' ')
    .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}

export const getAttributeOptionTranslation = (
  t,
  facetItemLabelKey: number | string,
  facetItemsKey?: string
) => {
  if (!isNaN(Number(facetItemLabelKey))) {
    return facetItemLabelKey.toString()
  }

  return facetItemsKey
    ? t('attributeOptions.' + facetItemsKey + '.' + facetItemLabelKey)
    : capitalizeFirstWord(facetItemLabelKey.toString())
}

export const facetCountClass = (str: any): string => {
  const count = 5 + str.toString().length

  return 'w-' + count + ' h-' + count
}

/**
 * Supported locale codes
 */
export const LOCALE_CODES = ['nl', 'en'] as const
export type LocaleCode = (typeof LOCALE_CODES)[number]
export const DEFAULT_LOCALE: LocaleCode = 'nl'

/**
 * Get supported locales with translated labels
 * @param t - i18n translation function
 * @returns Array of locale options with value, label, and language
 */
export const getSupportedLocales = (t: (key: string) => string) => {
  return LOCALE_CODES.map((code) => ({
    value: code,
    label: t(`languages.${code}`),
    language: code,
  }))
}

/**
 * Get locale label by code
 * @param t - i18n translation function
 * @param code - locale code
 * @returns Translated label for the locale
 */
export const getLocaleLabel = (t: (key: string) => string, code: string): string => {
  return t(`languages.${code}`)
}

import { marked } from 'marked'

marked.setOptions({
  breaks: true,
  gfm: true,
})

const renderer = new marked.Renderer()
renderer.link = ({ href, text }: { href: string; text: string }) => {
  return `<a href="${href}" target="_blank" rel="noopener" class="underline text-primary">${text}</a>`
}
marked.use({ renderer })

export const markdownToHtml = (md: string): string => {
  if (!md) return ''
  return marked.parse(md) as string
}
