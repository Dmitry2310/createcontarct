  import { UPDATE_PAGE } from "../constants/notificationConstants";

  const initialState = {
    update: false
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PAGE: {
        return { ...state, update: !state.update };
      };
      default:
        return state;
    }
  };

 export const updatePage = () => ({type: UPDATE_PAGE})
 
  
  export default notificationReducer;
  