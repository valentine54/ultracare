// src/Components/Context/InsuranceFormContext.js

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_FORM_STATE, FORM_STEPS } from '../Constants/insuranceFormConfig';

const InsuranceFormContext = createContext();

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STEP_DATA":
      return {
        ...state,
        [action.step]: {
          ...state[action.step],
          ...action.data,
        },
      };
    case "SET_COMPLETED_STEP":
      return {
        ...state,
        completedSteps: {
          ...state.completedSteps,
          [action.step]: true,
        },
      };
    case "LOAD_SAVED_STATE":
      return action.state;
    case "RESET_FORM":
      return INITIAL_FORM_STATE;
    default:
      return state;
  }
};

export const InsuranceFormProvider = ({ children }) => {
  const [formState, dispatch] = useReducer(formReducer, {
    ...INITIAL_FORM_STATE,
    completedSteps: {},
  });

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("insuranceFormState");
    if (savedState) {
      dispatch({
        type: "LOAD_SAVED_STATE",
        state: JSON.parse(savedState),
      });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("insuranceFormState", JSON.stringify(formState));
  }, [formState]);

  const updateStepData = (step, data) => {
    dispatch({ type: "UPDATE_STEP_DATA", step, data });
  };

  const setStepCompleted = (step) => {
    dispatch({ type: "SET_COMPLETED_STEP", step });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    localStorage.removeItem("insuranceFormState");
  };

  const getStepData = (step) => formState[step];

  const isStepCompleted = (step) => !!formState.completedSteps[step];

  const canAccessStep = (stepId) => {
    // Can access if it's the first step or previous step is completed
    return stepId === 1 || isStepCompleted(FORM_STEPS[`STEP_${stepId - 1}`]);
  };

  return (
    <InsuranceFormContext.Provider
      value={{
        formState,
        updateStepData,
        setStepCompleted,
        resetForm,
        getStepData,
        isStepCompleted,
        canAccessStep,
      }}
    >
      {children}
    </InsuranceFormContext.Provider>
  );
};

export const useInsuranceForm = () => {
  const context = useContext(InsuranceFormContext);
  if (!context) {
    throw new Error(
      "useInsuranceForm must be used within an InsuranceFormProvider"
    );
  }
  return context;
};
