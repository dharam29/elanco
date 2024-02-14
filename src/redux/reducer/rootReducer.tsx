import { combineReducers } from "@reduxjs/toolkit";
import applicationsData from "./Application";

const rootReducer = combineReducers({
  applications: applicationsData,
});

export default rootReducer;
