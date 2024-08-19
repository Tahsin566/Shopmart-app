import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Themeprovider } from './context/Global.jsx'
import { Authprovider } from './context/Auth.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Cartprovider } from './context/cart.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Cartprovider>

      <BrowserRouter>
        <App />
      </BrowserRouter>
      
    </Cartprovider>
  </QueryClientProvider>
  // </React.StrictMode>

)
