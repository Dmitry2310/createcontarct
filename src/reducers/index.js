import userReducer from "./userReducer";
import { combineReducers } from "redux";
import contractReducer from "./contractReducer";
import notificationReducer from "./notifikationReducer";
import pageReducer from "./pageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  contract: contractReducer,
  notification: notificationReducer,
  pages: pageReducer
});


export default rootReducer;