import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from "@reduxjs/toolkit";
import './index.css'
import App from './App.jsx'

import { Provider } from "react-redux";
import store from "./Components/store/store";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
