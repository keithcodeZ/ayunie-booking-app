import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout';
// import SignUpLogin from "./layouts/SignUpLogin";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddProperty from "./pages/AddProperty";
import { useAppContext } from "./contexts/AppContext";
import Search from "./pages/Search";
import MyProperties from "./pages/MyProperties";
import EditProperty from "./pages/EditProperty";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import MyPropertyBookings from "./pages/MyPropertyBookings";
import UserProfile from "./pages/UserProfile";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>}/>
        <Route path="/search" element={<Layout><Search/></Layout>}/>
        <Route path="/detail/:propertyId" element={<Layout><Detail/></Layout>}/>
        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>

        {isLoggedIn && (
          <>
            <Route path="/property/:propertyId/booking" element={<Layout><Booking/></Layout>}/>
            <Route path="/add-property" element={<Layout><AddProperty/></Layout>}/>
            <Route path="/my-properties" element={<Layout><MyProperties/></Layout>}/>
            <Route path="/my-bookings" element={<Layout><MyBookings/></Layout>}/>
            <Route path="/edit-property/:propertyId" element={<Layout><EditProperty /></Layout>}/>
            <Route path="/my-properties/:propertyId/bookings" element={<Layout><MyPropertyBookings/></Layout>}/>
            <Route path="/profile" element={<Layout><UserProfile/></Layout>}/>
          </>
        )}

        {/* Catches all routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
