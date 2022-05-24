const initialState = {
  darkMode: false,
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setDarkMode":
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};
export default mainReducer;
