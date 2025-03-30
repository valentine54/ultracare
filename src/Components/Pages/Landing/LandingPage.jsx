// LandingPage.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Hero from "./Hero";
// import CoverageOptions from "./CoverageOptions";
// import ServicesSteps from "./ServicesSteps";
import WhyChooseUs from "./WhyChooseUs";
import PensionService from "./PensionService";
import Testimonials from "./Testimonials";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      {/* <CoverageOptions /> */}
      {/* <ServicesSteps /> */}
      <Testimonials />
      <PensionService />
      <WhyChooseUs />
      
      {/* <Newsletter /> */}
      {/* <Brands /> */}
      {/* <LogoShowcase /> */}
      {/* <BlogSection /> */}
      <Outlet /> 
    </div>
  );
};

export default LandingPage;
