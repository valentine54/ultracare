import React from 'react'
import Hero from './Hero'
import CoverageOptions from './CoverageOptions'
import ServicesSteps from './ServicesSteps'
import WhyChooseUs from './WhyChooseUs'
import PensionService from './PensionService'
import Testimonials from './Testimonials'
import Newsletter from './Newsletter'

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
    </div>
  )
}

export default LandingPage