const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  policyDetails:{}
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      localStorage.setItem("darkMode", !state.darkMode);
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case "SET_POLICY_DETAILS":
      return {
       ...state,
        policyDetails: action.payload,
      };



    default:
      return state;
  }
};

export default appReducer;
