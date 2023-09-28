/**
 * Formats date to a "yyyy-mm-dd" string
 * @param date - Date which shall be formated
 * @returns {string} - formated string
 */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function printDate(date: Date): string {
  return date
    .toLocaleDateString('de-ch', {
      timeZone: 'Europe/Zurich',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .slice(0, 10)
}
