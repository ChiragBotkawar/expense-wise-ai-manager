
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element not found. Did you forget to add it to your HTML?")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
