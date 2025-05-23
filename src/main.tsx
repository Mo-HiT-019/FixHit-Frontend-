import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store, { persistor } from './redux/store.ts';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

      <BrowserRouter>
      
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      
      </BrowserRouter>
 
  </StrictMode>,
)
