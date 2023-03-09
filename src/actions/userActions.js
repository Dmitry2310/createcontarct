import { USER_LOGIN, USER_LOGOUT } from "../constants/userConstants";

export const loginAction = data => {
  return {
    type: USER_LOGIN,
    payload: { data }
  };
};

export const logoutAction = () => {
  return {
    type: USER_LOGOUT
  };
};
