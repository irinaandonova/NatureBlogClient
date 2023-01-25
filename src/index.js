import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { EventType, PublicClientApplication } from '@azure/msal-browser';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

const pca = new PublicClientApplication({
  auth: {
    clientId: 'a7d91e71-ae1d-4347-9f2e-249dd5a8270e',
    redirectUri: 'http://localhost:3000/auth/register',
    authority: 'https://login.microsoftonline.com/common',
    navigateToLoginRequestUrl: false
  }
});

pca.addEventCallback((e) => {
  if (e.eventType === EventType.LOGIN_SUCCESS) {
    pca.setActiveAccount(e.payload.account);
  }
});
pca.addEventCallback((e) => {
  if (e.eventType === EventType.LOGOUT_SUCCESS) {
    pca.setActiveAccount(null);
  }
})
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App msauInstance={pca} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
