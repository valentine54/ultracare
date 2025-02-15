import React,{useState} from "react";
import { motion } from "framer-motion";
import { useMotorForm } from "../../context/MotorFormContext";
import { Check, Shield, ShieldCheck, AlertTriangle } from "lucide-react";

const CoverTypeStep = ({ handleNext }) => {
  const { formData, updateFormData } = useMotorForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const coverTypes = [
    {
      id: "Comprehensive",
      title: "Comprehensive Insurance Cover",
      description: "Full coverage for your vehicle and third-party damages",
      icon: ShieldCheck,
    },
    {
      id: "Third Party Only",
      title: "Third-Party Insurance Cover",
      description: "Basic coverage for third-party damages only",
      icon: Shield,
    },
    {
      id: "Third Party Fire and Theft",
      title: "Third-Party Fire and Theft Insurance Cover",
      description:
        "Third-party coverage plus protection against fire and theft",
      icon: AlertTriangle,
    },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    updateFormData({ cover_type: selectedCategory.id });
  };

  const handleSubmit = () => {
    if (formData.cover_type) {
      handleNext();
    }
  }

  const CoverTypeCard = ({ coverType, isSelected }) => {
    const Icon = coverType.icon;

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => updateFormData({ cover_type: coverType.id })}
        className={`
          relative p-5 rounded-lg cursor-pointer
          transition-all duration-200 border
          ${
            isSelected
              ? "border-blue-500 bg-blue-50 shadow-md"
              : "border-gray-200 hover:border-blue-200 hover:shadow-sm"
          }
        `}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`
            p-2 rounded-lg 
            ${
              isSelected
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500"
            }
          `}
          >
            <Icon size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium truncate ${
                isSelected ? "text-blue-700" : "text-gray-900"
              }`}
            >
              {coverType.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 truncate">
              {coverType.description}
            </p>
          </div>

          <div
            className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
            transition-colors duration-200
            ${isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"}
          `}
          >
            {isSelected && <Check size={12} className="text-white" />}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Select Cover Type
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Choose the insurance coverage that best suits your needs
          </p>
        </motion.div>

        <div className="space-y-3">
          {coverTypes.map((coverType, index) => (
            <motion.div
              key={coverType.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CoverTypeCard
                coverType={coverType}
                isSelected={formData.cover_type === coverType.id}
              />
            </motion.div>
          ))}
        </div>

        {formData.cover_type && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-sm text-blue-600"
          >
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              <span>
                You've selected{" "}
                {coverTypes.find((c) => c.id === formData.cover_type)?.title}
              </span>
            </div>
          </motion.div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-2 my-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Continue
      </button>
    </div>
  );
};

export default CoverTypeStep;
