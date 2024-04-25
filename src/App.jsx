import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SigninPage/Signinpage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OrganizerHomePage from "./pages/OrganizerHomePage/OrganizerHomePage";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import VenueDetails from "./pages/OrganizerHomePage/venueDetails";
import UserEvents from "./pages/UserHomePage/UserEvents";
import BookEvent from "./pages/UserHomePage/BookEvent";
import { UserBooking } from "./pages/UserHomePage/UserBooking";
import AdminLoginPage from "./pages/AdminHomePage/AdminLogin";


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<UserHomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/organizer" element={<OrganizerHomePage />} />
                <Route path="/adminlogin" element={<AdminLoginPage/>} />
                <Route path="/admin" element={<AdminHomePage />} />
                <Route path="/organizer/venue/:id" element={<VenueDetails />}></Route>
                <Route path="/user/events" element={<UserEvents />} />
                <Route path="/user/events/booking/:id" element={<BookEvent />} />
                <Route path="/user/bookings" element={<UserBooking />} />
                
            </Routes>
        </div>
    );
}

export default App;
