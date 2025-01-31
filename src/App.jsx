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
import Blogs from "./Components/Pages/Blogs/Blogs"; // Add this import

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrapper div for entire application */}
      <div className="app-wrapper">
        {/* Header/Navbar */}
        <Header />

        {/* Main content area with routes */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/request-quotation" element={<RequestQuotation />} />
            {/* <Route path="/services" element={<HomePageServices />} /> */}
            <Route path="/contact" element={<ContactUs />} />
            {/* <Route path="/insurance" element={<CompanyPageInsurance />} /> */}
            {/* <Route path="/policies" element={<PoliciesDetails />} /> */}

            {/* Blog routes */}
            <Route path="/blogs" element={<Blogs />} />

            {/* 404 route - should be last */}
            {/* <Route path="*" element={<div>Page not found</div>} /> */}
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
