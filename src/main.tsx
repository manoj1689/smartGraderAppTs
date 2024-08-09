import React from 'react'
import ReactDOM from 'react-dom/client'
import 'regenerator-runtime/runtime'
import App from './App.tsx'
import { UserIdProvider } from './context/userId.tsx';
import './index.css'
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserIdProvider>
    <App />
  </UserIdProvider>
  </React.StrictMode>
)
