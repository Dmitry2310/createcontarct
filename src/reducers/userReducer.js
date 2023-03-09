import { USER_LOGIN, USER_LOGOUT } from "../constants/userConstants";

const initialState = {
  data: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        data: action.payload.data
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        data: null
      };
    }
    default:
      return state;
  }
};

export default userReducer;