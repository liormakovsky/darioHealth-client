import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import messagesReducer from "./messages/messagesReducer";

const rootReducer = combineReducers({
  userReducer,
  messagesReducer,
});

export default rootReducer;
