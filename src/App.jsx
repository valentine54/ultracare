import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AddBenefits from "./Components/Pages/CarInsurance/AddBenefits";
import GetQuoteCommercial from "./Components/Pages/CarInsurance/GetQuoteCommercial";
import GetQuotePSV from "./Components/Pages/CarInsurance/GetQuotePSV";

import CarPaymentPage from "./Components/Pages/CarInsurance/PaymentPage";
import CarMpesaPayment from "./Components/Pages/CarInsurance/MpesaPayment";

// import BasicInformationForm from "./Components/Pages/PersonalAccident/BasicInformationForm";
// import { InsuranceFormProvider } from "./Components/Context/InsuranceFormContext";
// import PersonalAccidentHealth from "./Components/Pages/PersonalAccident/PersonalAccidentHealth";
// import PersonalAccidentQuote from "./Components/Pages/PersonalAccident/PersonalAccidentQuote";
// import PersonalAccidentPayment from "./Components/Pages/PersonalAccident/PersonalAccidentPayment";
import SignupPage from "./Components/Pages/Registration/SignupPage";
import LoginPage from "./Components/Pages/Registration/LoginPage";
// import UserDashboard from "./Components/Pages/Dashboard/UserDashboard";

import Policies from "./Components/Pages/policies/index";
import Claims from "./Components/Pages/claims/index";
import Settings from "./Components/Pages/settings/index";
import Notifications from "./Components/Pages/notifications/index";
import CustomerPage from "./Components/Pages/customers/index";

// Personal Accident imports
import BasicInformation from "./Components/Pages/PersonalAccident/BasicInformation";
import HealthLifestyle from "./Components/Pages/PersonalAccident/HealthAndLifestyle";
import Quote from "./Components/Pages/PersonalAccident/QuotePage";
import Payment from "./Components/Pages/PersonalAccident/PaymentPage";
import CarPayment from "./Components/Pages/CarInsurance/PaymentPage";
import MpesaPayment from "./Components/Pages/PersonalAccident/MpesaPayment";
import { PersonalAccidentProvider } from "./Components/Context/PersonalAccidentContext";
import { AlertModalProvider } from "./Components/AlertModal";
import PoliciesPage from "./Components/Pages/policies/index";

import UserDashboard from "./Components/Pages/Dashboard/UserDashboard";
import ForgotPassword from "./Components/Pages/Registration/ForgotPassword";
import UploadDocuments from "./Components/Pages/Dashboard/UploadDocuments";
import { ProgressProvider } from "./Components/Pages/Dashboard/ProgressContext";
import Navigation from "./Components//Pages/Dashboard/Navigation";

// Motor Policy imports
import { MotorFormProvider } from "./Components/Pages/policies/motor/context/MotorFormContext";
import VehicleCategory from "./Components/Pages/policies/motor/components/VehicleCategory";
import MotorPolicyForm from "./Components/Pages/policies/motor/MotorPolicyForm";
import PremiumSetup from "./Components/Pages/policies/motor/components/PremiumSetup";
import Benefits from "./Components/Pages/policies/motor/components/Benefits";
import AgeExperience from "./Components/Pages/policies/motor/components/AgeExperience";
import { useSelector,useDispatch } from "react-redux";


import { getCurrentUser } from "./Components/helper/insurances";
const RoutedContent = () => {
  const location = useLocation();
  const [user, setUser] = useState()
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user)
  // console.log(userData.data) 
  const protectedRoutes = [
    "/signin",
    "/dashboard",
    "/dashboard",
    "/policies",
    "/customers",
    "/claims",
    "/settings",
    "/notifications",
  ];
 
  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (!userData.loggedIn) { 
      getCurrentUser(dispatch)
    }
  },[])

  return (
    <div className="app-wrapper">
      {/* {!isProtectedRoute && <Header />} */}
      {  location.pathname !== "/navigation" &&
                location.pathname !== "/upload-documents" &&
                location.pathname !== "/user-dashboard" && <Header />
      }
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup/*" element={<SignupPage />} />
          <Route path="/login/*" element={<LoginPage />} />
          {/* Types Routes */}
          <Route path="/request-quote" element={<RequestQuotation />} />
          <Route path="/compare-quotes" element={<CompareQuotes />} />
          {/* Personal Accident Insurance Flow */}
          {/* <Route path="/personal-accident">
            <Route path="basic-info" element={<BasicInformationForm />} />
            <Route path="health" element={<PersonalAccidentHealth />} />
            <Route path="quote" element={<PersonalAccidentQuote />} />
            <Route path="payment" element={<PersonalAccidentPayment />} />
          </Route> */}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* Dashboard route */}
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/:category" element={<PoliciesPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Motor Policy Routes */}
          <Route
            path="/policies/motor/*"
            element={
              <MotorFormProvider>
                <Routes>
                  <Route index element={<VehicleCategory />} />
                  <Route path="form" element={<MotorPolicyForm />} />
                </Routes>
              </MotorFormProvider>
            }
          />
          {/* Personal Accident Routes */}
          <Route path="/personal-accident" element={<BasicInformation />} />
          <Route
            path="/personal-accident/health-lifestyle"
            element={<HealthLifestyle />}
          />
          <Route path="/personal-accident/quote" element={<Quote />} />
          <Route path="/personal-accident/payment" element={<Payment />} />
          <Route
            path="/personal-accident/mpesa-payment"
            element={<MpesaPayment />}
          />
          <Route path="/individual-pension" element={<IndividualPension />} />
          {/* Types Routes */}
          <Route path="/request-quote" element={<RequestQuotation />} />
          <Route path="/compare-quotes" element={<CompareQuotes />} />
          {/* Quotes Routes */}
          <Route path="/individual-pension" element={<IndividualPension />} />
          <Route
            path="/occupational-pension"
            element={<OccupationalPension />}
          />
          <Route path="/defined-benefit" element={<DefinedBenefit />} />
          <Route path="/umbrella-retirement" element={<UmbrellaRetirement />} />
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
          <Route
            path="/get-quote-commercial"
            element={<GetQuoteCommercial />}
          />
          <Route path="/get-quote-psv" element={<GetQuotePSV />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/quote-list" element={<QuoteList />} />
          <Route path="/pension" element={<Pension />} />
          <Route path="/addbenefits" element={<AddBenefits />} />
          <Route path="/payment" element={<CarPayment />} />
          <Route path="/car-insurance/payment" element={<CarPaymentPage />} />
          <Route path="/car-insurance/mpesa" element={<CarMpesaPayment />} />
          <Route path="/pension-calculator" element={<PensionCalculator />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/upload-documents" element={<UploadDocuments />} />
          <Route path="/navigation" element={<Navigation />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {  location.pathname !== "/navigation" &&
                location.pathname !== "/upload-documents" &&
                location.pathname !== "/user-dashboard" && <Footer />
      }
      {/* {!isProtectedRoute && <Footer />} */}
    </div>
  );
};

const App = () => {
  return (
    <AlertModalProvider>
      <PersonalAccidentProvider>
        <ProgressProvider>

        <BrowserRouter>
          <RoutedContent />
        </BrowserRouter>
        </ProgressProvider>
      </PersonalAccidentProvider>
    </AlertModalProvider>
  );
};

export default App;
