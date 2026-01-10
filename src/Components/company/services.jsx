import React from "react";
import pharmacyImage from "../../assets/pharmacy.jpg";
import consultationsImage  from "../../assets/consulations.jpg";
// import dentalImage from "../../assets/dental.jpg";
import inpatientImage  from "../../assets/inpatient.jpg";
import maternityImage from "../../assets/maternity.jpg";
import surgeryImage from "../../assets/surgical.jpg";
import pediatricsImage from "../../assets/pediatrics.jpg";
import physiotherapyImage from "../../assets/physiotherapy.jpg";
// import radiologyImage from "../../assets/radiology.jpg";
import emergencyImage from "../../assets/emergency.jpg";
import gynecologyImage from "../../assets/gynacologist.jpg";
import entImage from "../../assets/ent.jpg";
// import dialysisImage from "../../assets/renal.jpg";
// import mentalHealthImage from "../../assets/mental.jpg";
// import wellnessImage from "../../assets/wellness.jpg";   
// import opticalImage from "../../assets/optical.jpg";
import labImage from "../../assets/lab.jpg";

const services = [
  {
    title: "Pharmacy",
    description:
      "Round-the-clock access to essential medicines, with professional pharmacists offering personalized guidance on dosage, interactions, and safe usage.",
    image: pharmacyImage,
  },
  {
    title: "Laboratory Services",
    description:
      "Cutting-edge lab testing including blood work, microbiology, and pathology to support accurate diagnoses and timely treatment planning.",
    image: labImage,
  },
  {
    title: "Outpatient Consultations",
    description:
      "Expert consultations across multiple specialties, providing thorough assessments and individualized treatment plans for every patient.",
    image: consultationsImage,
  },
  // {
  //   title: "Dental Care",
  //   description:
  //     "Comprehensive oral health services, from preventive care to advanced restorative procedures, ensuring healthy smiles for all ages.",
  //   image: dentalImage,
  // },
  {
    title: "Inpatient Services",
    description:
      "Comfortable inpatient wards with attentive 24-hour care, offering specialized treatment for post-operative and critical patients.",
    image: inpatientImage,
  },
  {
    title: "Maternity & Newborn Care",
    description:
      "Full-spectrum maternity services including prenatal check-ups, safe deliveries, and postnatal support, backed by a state-of-the-art newborn unit.",
    image: maternityImage,
  },
  {
    title: "Surgical Services",
    description:
      "Expert surgical interventions covering general, orthopedic, gynecologic, and emergency procedures with advanced safety protocols.",
    image: surgeryImage,
  },
  {
    title: "Pediatrics",
    description:
      "Holistic child healthcare encompassing preventive check-ups, growth tracking, immunizations, and emergency pediatric management.",
    image: pediatricsImage,
  },
  {
    title: "Physiotherapy & Rehabilitation",
    description:
      "Personalized rehabilitation programs for recovery from injuries, surgeries, or chronic conditions to restore function and improve mobility.",
    image: physiotherapyImage,
  },
  // {
  //   title: "Radiology & Imaging",
  //   description:
  //     "High-resolution imaging services, including MRI, CT, ultrasound, and X-rays, aiding precise diagnosis and treatment planning.",
  //   image: radiologyImage,
  // },
  {
    title: "Emergency & Critical Care",
    description:
      "Immediate response for trauma, cardiac events, and medical emergencies, with expert triage and life-saving interventions available 24/7.",
    image: emergencyImage,
  },
  {
    title: "Gynecology & Obstetrics",
    description:
      "Comprehensive women’s health care, including fertility management, menstrual care, screenings, and support for high-risk pregnancies.",
    image: gynecologyImage,
  },
  {
    title: "ENT (Ear, Nose & Throat)",
    description:
      "Specialized treatment for ear, nose, and throat disorders, from hearing evaluations to surgical care for chronic conditions.",
    image: entImage,
  },
  // {
  //   title: "Renal Dialysis",
  //   description:
  //     "State-of-the-art hemodialysis services with continuous monitoring and support for patients managing kidney conditions.",
  //   image: dialysisImage,
  // },
  // {
  //   title: "Mental Health & Counseling",
  //   description:
  //     "Dedicated mental health services including counseling, therapy, and psychiatric assessments for stress, anxiety, depression, and more.",
  //   image: mentalHealthImage,
  // },
  // {
  //   title: "Wellness & Preventive Care",
  //   description:
  //     "Proactive health programs including screenings, lifestyle guidance, immunizations, and wellness initiatives to promote long-term health.",
  //   image: wellnessImage,
  // },
  // {
  //   title: "Optical Services",
  //   description:
  //     "Complete eye care solutions including vision testing, prescription eyewear, cataract assessment, and treatment for common eye conditions.",
  //   image: opticalImage,
  // },
];

const ServicesSection = () => {
  return (
    <section className="py-10 bg-gray-100 pt-40 text-center">
      {/* Heading */}
      <div className="max-w-4xl mx-auto mb-10 px-4">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="text-gray-600 mt-2 text-lg">
          At PEJMED Ultracare Specialist Hospital, we offer specialized healthcare services designed to meet the diverse needs of our patients with expertise and compassion.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <img src={service.image} alt={service.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
