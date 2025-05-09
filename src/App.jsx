import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Pages/Landing/LandingPage";
import ContactUs from "./Components/Pages/ContactUs/ContactUs";
import Services from "./Components/company/services";
import About from "./Components/company/about";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NotFound from "./NotFound";
import Careers from "./Components/company/careers";
import ScrollBar from "./Components/Scrollbar";
import PostJob from "./Components/company/PostJob";
// import editJobs from "./Components/company/editJobs";
import EditJobs from "./Components/company/editJobs";
// import Navbar from "./Components/Navbar"; // Import the Navbar

const RoutedContent = () => {
  return (
    <div className="app-wrapper">
      {/* <Navbar/> */}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/post-job" element={<PostJob />} />
          {/* <Route path="/edit-job" element={<editJobs/>}/> */}
          <Route path="/edit-job" element={<EditJobs/>}/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ScrollBar/>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <RoutedContent />
    </BrowserRouter>
  );
};

export default App;