console.log(`[APP] running in ${process.env.NODE_ENV} mode.`)
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
      .then((registration) => {
        console.log('[SW] service Worker is registered', registration.scope)
      })
      .catch((error) => {
        console.error('[SW] service Worker registration failed:', error)
      })
    })
  } else {
    console.log('No serviceWorker in navigator, are you on localhost?')
  }
}
