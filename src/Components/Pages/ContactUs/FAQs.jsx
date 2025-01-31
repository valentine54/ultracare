import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is personal insurance?",
      answer:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 2,
      question: "Why do I need a pension plan?",
      answer:
        "A pension plan is crucial for securing your financial future post-retirement. It provides regular income when you're no longer working, helps maintain your lifestyle, covers medical expenses, and offers tax benefits. Starting early allows your investments to grow over time through compound interest.",
    },
    {
      id: 3,
      question: "What are the different types of pension plans ?",
      answer:
        "There are several types of pension plans available: 1) Defined Benefit Plans which guarantee a specific payout amount, 2) Defined Contribution Plans where the final benefit depends on investment performance, 3) Individual Retirement Accounts (IRAs), 4) 401(k) plans for private sector employees, and 5) Government Pension Plans for public sector workers.",
    },
    {
      id: 4,
      question: "How much life insurance coverage do I need?",
      answer:
        "The amount of life insurance coverage needed varies based on factors like: your current income, outstanding debts, future financial obligations (children's education, mortgage), family's lifestyle needs, and long-term financial goals. A general rule of thumb is 10-15 times your annual income, but consulting with a financial advisor can help determine the right amount for your specific situation.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Increased left padding and adjusted max-width */}
        <div className="pl-8 md:pl-16 lg:pl-[0px]">
          <div className="mb-12">
            <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
              FAQS
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Answers to Your <br /> Questions
            </h2>
          </div>

          <div className="max-w-2xl space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-gray-50"
                >
                  <span
                    className={`text-base font-medium ${
                      openIndex === index ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`ml-6 flex-shrink-0 ${
                      openIndex === index ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="p-5 pt-0 text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
