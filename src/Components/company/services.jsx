import React from "react";
import hero from "../../assets/hero.jpeg";
import pharmacyImage from "../../assets/pharmacy.jpg";
import consultationsImage  from "../../assets/consulations.jpg";
import dentalImage from "../../assets/ental.jpg";
import inpatientImage  from "../../assets/inpatient.jpg";
import  maternityImage from "../../assets/maternity.jpg";
import surgeryImage from "../../assets/surgical.jpg";
import pediatricsImage from "../../assets/pedeatrics.jpg";
import physiotherapyImage from "../../assets/physiotherapy.jpg";
import radiologyImage from "../../assets/radiology.jpg";
import emergencyImage from "../../assets/emergency.jpg";
import gynecologyImage from "../../assets/gyna.jpg";
import entImage from "../../assets/ent.jpg";
import dialysisImage from "../../assets/renal.jpg";
import mentalHealthImage from "../../assets/mental.jpg";
import wellnessImage from "../../assets/wellness.jpg";   
import opticalImage from "../../assets/optical.jpg";
import labImage from "../../assets/lab.jpeg";
const services = [
  {
    title: "Pharmacy",
    description:
      "Our 24-hour pharmacy ensures patients have access to essential medications anytime. Licensed pharmacists provide expert guidance on usage, dosage, and side effects.",
    image: pharmacyImage, // pharmacyImage,
  },
  {
    title: "Laboratory Services",
    description:
      "The hospital’s well-equipped laboratory department offers a range of diagnostic tests to aid in disease detection and management. Skilled laboratory technicians use state-of-the-art equipment to ensure accurate results.",
    image: labImage, // labImage
  },
  {
    title: "Consultations",
    description:
      "Bosongo Hospital provides outpatient consultations with general practitioners and specialists to diagnose, manage, and treat medical conditions.",
    image: consultationsImage, // consultationsImage
  },
  {
    title: "Dental care",
    description:
      "Dental check-ups, tooth extractions, cavity treatments, root canals, orthodontics, and cosmetic dentistry.",
    image: dentalImage, // dentalImage
  },
  {
    title: "Inpatient Services",
    description:
      "Comfortable wards with 24-hour medical supervision, post-surgical care, and specialized treatment for critical conditions.",
    image: inpatientImage, // inpatientImage
  },
  {
    title: "Maternity Services",
    description:
      "Antenatal care, safe deliveries (normal & C-section), postnatal support, and family planning services.",
    image:  maternityImage, // maternityImage
  },
  {
    title: "Surgical Services",
    description:
      "General, orthopedic, gynecological, urological, and emergency surgeries performed by skilled surgeons.",
    image: surgeryImage, // surgeryImage
  },
  {
    title: "Pediatrics",
    description:
      "Specialized child healthcare, immunizations, emergency pediatric care, and growth monitoring.",
    image: pediatricsImage, // pediatricsImage
  },
  {
    title: "Physiotherapy",
    description:
      "Rehabilitation for post-surgery, stroke recovery, sports injuries, and chronic pain management.",
    image: physiotherapyImage, // physiotherapyImage
  },
  {
    title: "Radiology & Imaging",
    description:
      "X-rays, ultrasound, CT scans, MRI, mammography, and bone density tests for accurate diagnostics.",
    image: radiologyImage, // radiologyImage
  },
  {
    title: "Emergency & Trauma Care",
    description:
      "24/7 emergency response for accidents, cardiac arrests, poisoning, and critical trauma cases.",
    image: emergencyImage, // emergencyImage
  },
  {
    title: "Gynecology & Obstetrics",
    description:
      "Fertility treatments, menstrual disorder management, cancer screenings, and menopause care.",
    image:gynecologyImage, // gynecologyImage
  },
  {
    title: "ENT (Ear, Nose & Throat)",
    description:
      "Treatment for hearing loss, sinusitis, throat infections, and voice disorders.",
    image: entImage, // entImage
  },
  {
    title: "Optical Services",
    description:
      "Eye exams, prescription glasses, cataract screening, and glaucoma treatment.",
    image: opticalImage, // opticalImage
  },
  {
    title: "Renal Dialysis",
    description:
      "Hemodialysis, kidney function monitoring, and lifestyle counseling for kidney disease.",
    image: dialysisImage, // dialysisImage
  },
  {
    title: "Mental Health & Counseling",
    description:
      "Therapy for depression, anxiety, substance abuse, stress, and psychiatric evaluations.",
    image: mentalHealthImage, // mentalHealthImage
  },
  {
    title: "Wellness & Preventive Care",
    description:
      "Health screenings, immunization programs, weight management, and workplace wellness initiatives.",
    image: wellnessImage, // wellnessImage
  },
];

const ServicesSection = () => {
  return (
    <section className="py-10 bg-gray-100 pt-40 text-center">
      {/* Services Heading and Description */}
      <div className="max-w-4xl mx-auto mb-10 px-4">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="text-gray-600 mt-2 text-lg">
          We provide a wide range of healthcare services to cater to all your medical needs, ensuring quality treatment and care.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
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
