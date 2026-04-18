/**
 * Formats an ISO date string into a human-readable relative time.
 * @param {string} isoString - ISO 8601 date string
 * @returns {string} Human-readable relative time (e.g. "3 days ago")
 */
export function formatRelativeDate(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const days = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}
