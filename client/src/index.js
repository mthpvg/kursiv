const SERVER = 'http://192.168.1.13:3000'
const page = require('page')

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


fetch(`${SERVER}/data`)
  .then((response) => response.json())
  .then((myJson) => {
    console.log(myJson)
  })

page('/', index)
page('/sign-in', signIn)
page('/login', login)
page('/logout', logout)
page()

function index() {
  console.log('index')
}
function signIn() {
  console.log('signIn')
}
function login() {
  console.log('login')
}
function logout() {
  console.log('logout')
}
