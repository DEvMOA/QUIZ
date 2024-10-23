import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Quiz } from './components/Quiz.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Quiz/>
  </StrictMode>,
)
