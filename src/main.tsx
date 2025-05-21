
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Add Poppins font from Google Fonts
const poppinsLink = document.createElement('link');
poppinsLink.rel = 'stylesheet';
poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
document.head.appendChild(poppinsLink);

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element not found. Did you forget to add it to your HTML?")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
