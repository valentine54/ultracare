// LandingPage.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Hero from "./Hero";
import CoverageOptions from "./CoverageOptions";
import ServicesSteps from "./ServicesSteps";
import WhyChooseUs from "./WhyChooseUs";
import PensionService from "./PensionService";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Brands from "./Brands";
import LogoShowcase from "./LogoShowcase";
import BlogSection from "./BlogSection";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <CoverageOptions />
      <ServicesSteps />
      <WhyChooseUs />
      <PensionService />
      <Testimonials />
      <Newsletter />
      <Brands />
      <LogoShowcase />
      <BlogSection />
      <Outlet /> 
    </div>
  );
};

export default LandingPage;
