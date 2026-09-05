/** Force a fresh resume download (avoids sticky browser caches on /resume). */
export async function downloadResume(url: string, fileName: string) {
  const separator = url.includes('?') ? '&' : '?'
  const freshUrl = `${url}${separator}_=${Date.now()}`

  const response = await fetch(freshUrl, {
    cache: 'no-store',
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
  })

  if (!response.ok) {
    throw new Error('Resume file is not available right now.')
  }

  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = fileName
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(objectUrl)
}
