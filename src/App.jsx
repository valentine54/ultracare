import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "./Components/helper/insurances";
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

import CarPaymentPage from "./Components/Pages/Dashboard/DashboardPayment/PaymentPage";
import CarMpesaPayment from "./Components/Pages/Dashboard/DashboardPayment/MpesaPayment";

import SignupPage from "./Components/Pages/Registration/SignupPage";
import LoginPage from "./Components/Pages/Registration/LoginPage";

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
import CarPayment from "./Components/Pages/Dashboard/DashboardPayment/PaymentPage";
import { PersonalAccidentProvider } from "./Components/Context/PersonalAccidentContext";
import { AlertModalProvider } from "./Components/AlertModal";
import PoliciesPage from "./Components/Pages/policies/index";

// import UserDashboard from "./Components/Pages/Dashboard/UserDashboard";
import ForgotPassword from "./Components/Pages/Registration/ForgotPassword";
import DashboardLayout from "./Components/Pages/Dashboard/DashboardLayout";
import UserDashboard from "./Components/Pages/Dashboard/UserDashboard";
import Navigation from "./Components/Pages/Dashboard/Navigation";
import UploadDocuments from "./Components/Pages/Dashboard/UploadDocuments";
import { ProgressProvider } from "./Components/Pages/Dashboard/ProgressContext";
import PaymentsSection from "./Components/Pages/Dashboard/PaymentsSection";
import PaymentsHistory from "./Components/Pages/Dashboard/PaymentsHistory";
import PaymentPage from "./Components/Pages/Dashboard/DashboardPayment/PaymentPage";
import MpesaPayment from "./Components/Pages/Dashboard/DashboardPayment/MpesaPayment";

// Motor Policy imports
import { MotorFormProvider } from "./Components/Pages/policies/motor/context/MotorFormContext";
import VehicleCategory from "./Components/Pages/policies/motor/components/VehicleCategory";
import MotorPolicyForm from "./Components/Pages/policies/motor/MotorPolicyForm";
import PremiumSetup from "./Components/Pages/policies/motor/components/PremiumSetup";
import Benefits from "./Components/Pages/policies/motor/components/Benefits";
import AgeExperience from "./Components/Pages/policies/motor/components/AgeExperience";

const RoutedContent = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const protectedRoutes = [
    "/signin",
    "/dashboard",
    "/user-dashboard",
    "/company-dashboard",
    "/policies",
    "/customers",
    "/claims",
    "/settings",
    "/notifications",
  ];

  const isCompanyDashboardRoute =
    location.pathname.includes("/company-dashboard");

  const isDashboardRoute =
    location.pathname.includes("/user-dashboard");

  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (!userData.loggedIn) {
      getCurrentUser(dispatch);
    }
  }, []);

  // Pending Payments
  const redirectToPendingPayments = () => {
    return <Navigate to="/user-dashboard/payments?filter=pending" replace />;
  };

  return (
    <div className="app-wrapper">
      {!isDashboardRoute &&
        !isCompanyDashboardRoute &&
        location.pathname !== "/navigation" &&
        location.pathname !== "/upload-documents" && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup/*" element={<SignupPage />} />
          <Route path="/login/*" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Company Dashboard Routes */}
          <Route path="/company-dashboard/*" element={<Dashboard />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/:category" element={<PoliciesPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />

          {/* User Dashboard Routes - with ProgressProvider */}
          <Route
            path="/user-dashboard"
            element={
              <ProgressProvider>
                <DashboardLayout />
              </ProgressProvider>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="upload" element={<UploadDocuments />} />
            <Route path="payments">
              <Route index element={<PaymentsHistory />} />
              <Route path="pending" element={redirectToPendingPayments} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="mpesa" element={<MpesaPayment />} />
            </Route>
            <Route path="policy" element={<div>Policy</div>} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route path="notifications" element={<div>Notifications</div>} />
          </Route>

          <Route
            path="/upload-documents"
            element={<Navigate to="/user-dashboard/upload" replace />}
          />
          <Route
            path="/payment"
            element={<Navigate to="/user-dashboard/payments" replace />}
          />
          <Route
            path="/mpesa-payment"
            element={<Navigate to="/user-dashboard/payments/mpesa" replace />}
          />

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

          {/* Car Insurance Routes */}
          <Route path="/car-insurance" element={<CarInsurance />} />
          <Route
            path="/get-quote-commercial"
            element={<GetQuoteCommercial />}
          />
          <Route path="/get-quote-psv" element={<GetQuotePSV />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/quote-list" element={<QuoteList />} />
          <Route path="/addbenefits" element={<AddBenefits />} />
          <Route path="/payment" element={<CarPayment />} />

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

          {/* Other routes */}
          <Route path="/request-quote" element={<RequestQuotation />} />
          <Route path="/compare-quotes" element={<CompareQuotes />} />
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
          <Route path="/services" element={<HomePageServices />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/insurance" element={<CompanyPageInsurance />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/pension" element={<Pension />} />
          <Route path="/pension-calculator" element={<PensionCalculator />} />

          {/* Special case for navigation testing */}
          <Route path="/navigation" element={<Navigation />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Only show footer when not in dashboard routes */}
      {!isDashboardRoute &&
        location.pathname !== "/navigation" &&
        location.pathname !== "/upload-documents" && <Footer />}
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
