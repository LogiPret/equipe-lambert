import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param _cacheTag Optional cache tag to append to the URL (ignored for performance)
 * @returns Properly formatted URL without cache tagging
 */
export const getMediaUrl = (url: string | null | undefined, _cacheTag?: string | null): string => {
  if (!url) return ''

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url // No cache tagging to avoid timeouts
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return `${baseUrl}${url}` // No cache tagging to avoid timeouts
}
