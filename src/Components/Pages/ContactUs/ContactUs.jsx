import React from 'react';
import ContactInfo from './ContactInfo'; // This should point to your separate ContactInfo file
// import FAQs from './FAQs';

const ContactPage = () => {
  return (
    <div className="bg-white">
      <ContactInfo />
      {/* <FAQs /> */}
    </div>
  );
};

export default ContactPage;