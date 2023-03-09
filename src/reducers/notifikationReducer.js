  import { CONTRACT_NOTIFY, CLEAN_NOTIFY } from "../constants/notificationConstants";

  const initialState = {
    notificationText: ""
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CONTRACT_NOTIFY: 
        return {
          ...state,
          notificationText: action.payload,
        };
        case CLEAN_NOTIFY: 
        return {
          ...state,
          notificationText: "",
        };
      default:
        return state;
    }
  };

 export const actions = {
  setNotification: (text) => ({type: CONTRACT_NOTIFY, payload: text})
 }

  
  export default notificationReducer;
  