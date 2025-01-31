import React from 'react'
import Hero from './Hero'
import CoverageOptions from './CoverageOptions'
import ServicesSteps from './ServicesSteps'
import WhyChooseUs from './WhyChooseUs'
import PensionService from './PensionService'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'
import Brands from './Brands'
import LogoShowcase from './LogoShowcase'
import BlogSection from './BlogSection'
import COptions from './CoverageOptions'

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <CoverageOptions />
      {/* <COptions /> */}
      <ServicesSteps />
      <WhyChooseUs />
      <PensionService />
      <Testimonials />
      <Newsletter />
      <Brands />
      <LogoShowcase />
      <BlogSection />
    </div>
  );
}

export default LandingPage