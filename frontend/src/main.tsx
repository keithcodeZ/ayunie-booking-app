import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      // refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* we need to wrap our App component in the react-query client provider*/}
    {/* this means that App has access to all those hooks that we added */}
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        {/* any components that the <App /> renders will have access to the AppContextProvider */}
        <App />
      </AppContextProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
