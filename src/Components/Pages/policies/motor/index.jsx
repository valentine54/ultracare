import React from "react";
import { Routes, Route } from "react-router-dom";
import { MotorFormProvider } from "./context/MotorFormContext";
import VehicleCategory from "./components/VehicleCategory";
import MotorPolicyForm from "./MotorPolicyForm";

const MotorPolicyRoutes = () => {
  return (
    <MotorFormProvider>
      <Routes>
        <Route index element={<VehicleCategory />} />
        <Route path="form" element={<MotorPolicyForm />} />
      </Routes>
    </MotorFormProvider>
  );
};

export default MotorPolicyRoutes;
