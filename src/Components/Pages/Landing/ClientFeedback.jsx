import React from "react";

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Mwangi",
      role: "Patient",
      quote: "The care I received was exceptional. The doctors were knowledgeable and took time to explain everything to me. The facilities are modern and clean.",
      rating: 5,
      department: "Cardiology",
      date: "March 2023",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Insurance Partner",
      quote: "Our partnership with this hospital has been seamless. Their billing process is efficient and transparent, which makes our work much easier.",
      rating: 4,
      department: "Billing Department",
      date: "January 2024",
    },
    {
      id: 3,
      name: "Dr. James Kariuki",
      role: "Referring Physician",
      quote: "I consistently refer patients here because of their excellent specialist care. The communication between our clinics is outstanding.",
      rating: 5,
      department: "Orthopedics",
      date: "November 2023",
    },
    {
      id: 4,
      name: "Mary Wambui",
      role: "Patient's Family",
      quote: "During my mother's stay, the nursing staff showed incredible compassion. They went above and beyond to make her comfortable.",
      rating: 5,
      department: "Geriatrics",
      date: "September 2023",
    },
    {
      id: 5,
      name: "David Omondi",
      role: "International Patient",
      quote: "As a medical tourist, I was impressed by the coordination of care. They handled all my travel and accommodation arrangements perfectly.",
      rating: 4,
      department: "International Services",
      date: "July 2023",
    },
    {
      id: 6,
      name: "Grace Atieno",
      role: "New Mother",
      quote: "The maternity ward made my delivery experience so comfortable. The pediatric follow-up care for my baby has been excellent.",
      rating: 5,
      department: "Obstetrics & Pediatrics",
      date: "May 2023",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from patients, partners, and professionals.
          </p>
        </div>
  
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Testimonial Text */}
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
  
              {/* Info */}
              <div className="text-sm text-gray-600">
                <div className="font-bold text-gray-800">{testimonial.name}</div>
                <div>{testimonial.role} • {testimonial.department}</div>
                <div className="text-gray-400">{testimonial.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;  