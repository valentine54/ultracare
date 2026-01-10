import React from "react";

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amara Njeri",
      role: "Wellness Patient",
      quote:
        "Rand Direction Ultracare transformed my experience with healthcare. Everything felt personalized and supportive.",
      rating: 5,
      department: "Holistic Care",
      date: "February 2024",
    },
    {
      id: 2,
      name: "Elias Mwenda",
      role: "Corporate Partner",
      quote:
        "Collaborating with Ultracare has streamlined our employee health programs. Their efficiency is unmatched.",
      rating: 5,
      department: "Corporate Health",
      date: "December 2023",
    },
    {
      id: 3,
      name: "Dr. Fatuma Ali",
      role: "Referring Specialist",
      quote:
        "I confidently refer patients to Ultracare knowing they will receive advanced care and attentive follow-up.",
      rating: 5,
      department: "Neurology",
      date: "January 2024",
    },
    {
      id: 4,
      name: "Samuel Otieno",
      role: "Family Member",
      quote:
        "The staff treated my father with genuine compassion. The support made our hospital stay much easier.",
      rating: 5,
      department: "Geriatric Services",
      date: "November 2023",
    },
    {
      id: 5,
      name: "Li Wei",
      role: "International Patient",
      quote:
        "From arrival to treatment, everything was seamless. Ultracare takes care of all the details for international patients.",
      rating: 4,
      department: "Global Patient Services",
      date: "October 2023",
    },
    {
      id: 6,
      name: "Amina Hassan",
      role: "New Mother",
      quote:
        "The maternity team made my delivery comfortable and stress-free. Postnatal care was thorough and reassuring.",
      rating: 5,
      department: "Maternity & Pediatrics",
      date: "March 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-teal-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-teal-800 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-teal-700">
            Hear firsthand from patients, partners, and professionals at Rand Direction Ultracare.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-teal-600 p-6 rounded-xl shadow-md hover:bg-teal-700 transition-all duration-300 text-white"
            >
              {/* Testimonial Text */}
              <p className="italic mb-4">"{testimonial.quote}"</p>

              {/* Info */}
              <div className="text-sm">
                <div className="font-bold">{testimonial.name}</div>
                <div>{testimonial.role} • {testimonial.department}</div>
                <div className="text-teal-200">{testimonial.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
