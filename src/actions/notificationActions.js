import {  CONTRACT_NOTIFY  } from "../constants/notificationConstants";
  
  export const contractNotify = (text) => {
    return {
      type: CONTRACT_NOTIFY,
      payload: text
    };
  };
  export const clearNotify = () => {
    return {
      type: CONTRACT_NOTIFY
    };
  };

  

  
  
  