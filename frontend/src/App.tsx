// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout';
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddProperty from "./pages/AddProperty";
import { useAppContext } from "./contexts/AppContext";
import Search from "./pages/Search";

function App() {

  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
        <Route path="/search" element={<Layout><Search/></Layout>}/>
        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>

        {isLoggedIn &&
          <>
            <Route path="/add-property" element={
              <Layout>
                <AddProperty />
              </Layout>
            }/>
          </>
        }

        {/* Catches all routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
