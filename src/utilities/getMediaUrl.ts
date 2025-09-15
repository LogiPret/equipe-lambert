/**
 * Normalize media URLs so SSR and CSR render the same string.
 * - If absolute (http/https), return as-is.
 * - Otherwise, return a relative path (ensuring a single leading slash).
 */
export const getMediaUrl = (url: string | null | undefined, _cacheTag?: string | null): string => {
  if (!url) return ''

  // Absolute URL: leave untouched
  if (/^https?:\/\//i.test(url)) return url

  // Ensure a single leading slash for relative paths
  const cleaned = url.replace(/^\/+/, '')
  return `/${cleaned}`
}
