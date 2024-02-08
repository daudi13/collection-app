import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './appstore/store.js'
import CollectionContext from './CollectionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CollectionContext>
      <Provider store={store}>
        <App />
      </Provider>
    </CollectionContext>
  </React.StrictMode>
)
