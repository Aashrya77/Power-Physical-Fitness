import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Nav/Nav";
import Plans from "./components/Plans/Plans";
import Intro from "./components/Intro/Intro";
import Services from "./components/Services/Services";
import Testimonials from "./components/Testimonials/Testimonials";
import ClassSchedule from "./components/ClassSchedule/ClassSchedule";
import TrainerProfiles from "./components/Trainer/Trainer";
import FacilitiesOverview from "./components/FacilitiesOverview/FacilitiesOverview";
import FAQs from "./components/FAQs/FAQs";
import CTA from "./components/CTA/CTA.jsx";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import { AuthProvider } from "./auth/AuthContext";
import PlanPage from "./components/PlanPage/PlanPage";
import Profile from "./components/UserProfile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import PaymentSuccess from './components/PaymentSuccess';
import Auth from "./auth/Auth.jsx";

import Confirm from "./components/ConfirmationPage/Confirm";
import ScorllToHashElement from "./ScrollToHashElement"; // Corrected path to ScrollToHashElement

// Corrected path to register if necessary

function App() {
  return (
    <AuthProvider>
      <Router>
       <ScorllToHashElement />
        <Navbar />
        <Routes>
          {/* Home route rendering multiple sections */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Intro />
                <Services />
                <Testimonials />
                <ClassSchedule />
                <TrainerProfiles />
                <FacilitiesOverview />
                <Plans />
                <FAQs />
                <CTA />
                
              </>
            }
          />
          {/* Individual routes for login and register */}
          <Route path="/Login" element={<Auth />} />
          {/* Other individual routes */}
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/intro" element={<Intro />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/schedule" element={<ClassSchedule />} />
          <Route path="/trainers" element={<TrainerProfiles />} />
          <Route path="/facilities" element={<FacilitiesOverview />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/cta" element={<CTA />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/plans/:planName" element={<PlanPage/>}/>
          <Route path="/plans/:planName/confirm" element={<Confirm/>}/>
          <Route path="/success" element={<PaymentSuccess />} />
        </Routes>
        <ContactInfo />
      </Router>
    </AuthProvider>
  );
}

export default App;
