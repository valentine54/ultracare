const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  motorPolicy: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      localStorage.setItem("darkMode", !state.darkMode);
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case "SET_MOTOR_POLICY":
      return {
        ...state,
        motorPolicy: action.payload,
      };



    default:
      return state;
  }
};

export default appReducer;
