import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';

// Polyfills for Node.js globals
import { Buffer } from 'buffer';

(window as any).global = window; // Define global for SockJS
(window as any).process = { env: {} }; // Minimal polyfill for process
(window as any).Buffer = Buffer; // Polyfill Buffer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);