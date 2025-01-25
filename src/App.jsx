// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Pages/Landing/LandingPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RequestQuotation from "./Components/Pages/RequestQuotation/CompareQuotes";
import HomePageServices from "./Components/Pages/HomepageServices/HomePageServices";
import ContactUs from "./Components/Pages/ContactUs/ContactUs";
import CompanyPageInsurance from "./Components/Pages/CompanyPageInsurance/CompanyPageInsurance";
import PoliciesDetails from "./Components/Pages/PoliciesDetails/PoliciesDetails";
import Blogs from "./Components/Pages/Blogs/Blogs";
import Pension from "./Components/Pages/Pension/Pension";
import PensionCalculator from "./Components/Pages/PensionCalculator/PensionCalculator";
import IndividualPension from "./Components/Pages/Insurance/IndividualPension";
import OccupationalPension from "./Components/Pages/Insurance/OccupationalPension";
import DefinedBenefit from "./Components/Pages/Insurance/DefinedBenefit";
import UmbrellaRetirement from "./Components/Pages/Insurance/UmbrellaRetirement";
import AccidentalDeath from "./Components/Pages/Insurance/AccidentalDeath";
import DisabilityInsurance from "./Components/Pages/Insurance/DisabilityInsurance";
import FamilyAccident from "./Components/Pages/Insurance/FamilyAccident";
import CompareQuotes from "./Components/Pages/RequestQuotation/CompareQuotes";
import NotFound from "./NotFound";
import CarInsurance from "./Components/Pages/CarInsurance/CarInsurance";
import GetQuote from "./Components/Pages/CarInsurance/GetQuote";
import { AlertModalProvider } from "./Components/AlertModal";
import QuoteList from "./Components/Pages/CarInsurance/QuoteList";



// npm install -g npm@11.0.0

const App = () => {
  return (
    <AlertModalProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              {/* Types Routes */}
              <Route path="/request-quote" element={<RequestQuotation />} />
              <Route path="/compare-quotes" element={<CompareQuotes />} />

              {/* Quotes Routes */}
              <Route
                path="/individual-pension"
                element={<IndividualPension />}
              />
              <Route
                path="/occupational-pension"
                element={<OccupationalPension />}
              />
              <Route path="/defined-benefit" element={<DefinedBenefit />} />
              <Route
                path="/umbrella-retirement"
                element={<UmbrellaRetirement />}
              />
              <Route path="/accidental-death" element={<AccidentalDeath />} />
              <Route
                path="/disability-insurance"
                element={<DisabilityInsurance />}
              />
              <Route path="/family-accident" element={<FamilyAccident />} />

              {/* Main Navigation Routes */}
              <Route path="/services" element={<HomePageServices />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/insurance" element={<CompanyPageInsurance />} />
              <Route path="/policies" element={<PoliciesDetails />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/car-insurance" element={<CarInsurance />} />
              <Route path="/get-quote" element={<GetQuote />} />
              <Route path="/quote-list" element={<QuoteList />} />
              <Route path="/pension" element={<Pension />} />
              <Route
                path="/pension-calculator"
                element={<PensionCalculator />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AlertModalProvider>
  );
};

export default App;
