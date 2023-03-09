import jwtDecode from "jwt-decode";
import authStorage from "./authStorage";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../actions/userActions";

const useAuth = () => {
  const dispatch = useDispatch();
  const login = authToken => {
    // when user login succesfully => a jwt is returned
    // => then decode the jwt to get the user's info
    const user = jwtDecode(authToken);

    // store the user's info into the context for global usage
    dispatch(loginAction(user));

    // store the jwt to the storage
    // the jwt is for calling protected api
    authStorage.storeToken(authToken);
  };

  const logout = () => {
    // remove the user's info from the context
    dispatch(logoutAction());

    // remove the jwt from the storage
    authStorage.removeToken();
  };

  return { login, logout };
};

export default useAuth;