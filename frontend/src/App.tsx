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
import SignUpLogin from "./layouts/SignUpLogin";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home Page</p>
        </Layout>} />
        
        <Route path="/search" element={<Layout>Search Page</Layout>}/>
        
        <Route path="/register" element={<SignUpLogin><Register /></SignUpLogin>}/>

        <Route path="/sign-in" element={<SignUpLogin><SignIn /></SignUpLogin>}/>

        {/* Catches all routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
