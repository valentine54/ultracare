// appActions.js

export const setDarkMode = () => {
  return {
    type: "SET_DARK_MODE",
  };
}

export const setMotorPolicy = (motorPolicy) => { 
  return {
    type: "SET_MOTOR_POLICY",
    payload: motorPolicy,
  };
}
