import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Keep the locally served privacy integration outside Parcel's hashed asset graph.
const privacyScript = document.createElement('script');
privacyScript.src = '/site-privacy/runtime.js';
privacyScript.defer = true;
privacyScript.setAttribute('data-site-profile', 'game');
document.body.appendChild(privacyScript);
