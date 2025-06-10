import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store, { persistor } from './redux/store.ts';

import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

      <BrowserRouter>
      <ToastContainer
            position="top-right" 
            autoClose={5000} 
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      
      </BrowserRouter>
 
  </StrictMode>,
)
