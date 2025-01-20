import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Pages/Landing/LandingPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RequestQuotation from "./Components/Pages/RequestQuotation/RequestQuotation";
import HomePageServices from "./Components/Pages/HomepageServices/HomePageServices";
import ContactUs from "./Components/Pages/ContactUs/ContactUs";
import CompanyPageInsurance from "./Components/Pages/CompanyPageInsurance/CompanyPageInsurance";
import PoliciesDetails from "./Components/Pages/PoliciesDetails/PoliciesDetails";


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Header />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/request-quotation" element={<RequestQuotation />} />
        <Route path="/services" element={<HomePageServices />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/company-insurance" element={<CompanyPageInsurance />} />
        <Route path="/policies-details" element={<PoliciesDetails />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
