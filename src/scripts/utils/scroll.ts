const STORAGE_PREFIX = 'scroll:'

export function getScrollKey(pathname = window.location.pathname) {
  return `${STORAGE_PREFIX}${pathname}`
}

export function saveScrollPosition(pathname = window.location.pathname) {
  const key = getScrollKey(pathname)
  localStorage.setItem(key, String(window.scrollY))
}

export function restoreScrollPosition(pathname = window.location.pathname) {
  const key = getScrollKey(pathname)
  const raw = localStorage.getItem(key)
  if (raw == null) return false

  const y = Number.parseInt(raw, 10)
  if (Number.isNaN(y)) return false

  window.scrollTo(0, y)
  return true
}

export function initScrollRestore() {
  const pathname = window.location.pathname

  // restore immediately on load, before paint
  restoreScrollPosition(pathname)

  const save = () => saveScrollPosition(pathname)

  window.addEventListener('beforeunload', save)
  window.addEventListener('pagehide', save)
}
