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
import QuoteList from "./Components/Pages/CarInsurance/QuoteList";
import Dashboard from "./Components/Pages/dashboard/index";
import Policies from "./Components/Pages/policies/index";
import Claims from "./Components/Pages/claims/index";
import Settings from "./Components/Pages/settings/index";
import Notifications from "./Components/Pages/notifications/index";

// Personal Accident imports
import BasicInformation from "./Components/Pages/PersonalAccident/BasicInformation";
import HealthLifestyle from "./Components/Pages/PersonalAccident/HealthAndLifestyle";
import Quote from "./Components/Pages/PersonalAccident/QuotePage";
import Payment from "./Components/Pages/PersonalAccident/PaymentPage";
import MpesaPayment from "./Components/Pages/PersonalAccident/MpesaPayment";
import { PersonalAccidentProvider } from "./Components/Context/PersonalAccidentContext";
import { AlertModalProvider } from "./Components/AlertModal";
import CustomersPage from "./Components/common/customers/CustomerTable/index";

const App = () => {

  return (
    <AlertModalProvider>
      <PersonalAccidentProvider>
        <BrowserRouter>
          <div className="app-wrapper">
            <Header />

            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />

                {/* Personal Accident Routes */}
                <Route
                  path="/personal-accident"
                  element={<BasicInformation />}
                />
                <Route
                  path="/personal-accident/health-lifestyle"
                  element={<HealthLifestyle />}
                />
                <Route path="/personal-accident/quote" element={<Quote />} />
                <Route
                  path="/personal-accident/payment"
                  element={<Payment />}
                />
                <Route
                  path="/personal-accident/mpesa-payment"
                  element={<MpesaPayment />}
                />

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
      </PersonalAccidentProvider>
    </AlertModalProvider>
  );
};

export default App;
