import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Self-hosted fonts (no Google Fonts round-trip). unicode-range keeps downloads to the scripts actually used.
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/plus-jakarta-sans/800.css'
import '@fontsource/mukta/400.css'
import '@fontsource/mukta/500.css'
import '@fontsource/mukta/600.css'
import '@fontsource/mukta/700.css'
import '@fontsource/mukta/800.css'
import '@fontsource/lora/500-italic.css'
import '@fontsource/lora/400-italic.css'
import '@fontsource/noto-serif-devanagari/500.css'
import './index.css'
import { initSmoothScroll } from './lib/smoothScroll'

initSmoothScroll()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
