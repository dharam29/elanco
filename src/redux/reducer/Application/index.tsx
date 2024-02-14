import { createSlice } from "@reduxjs/toolkit";

const initialState: applicationsType = {
  loader: false,
  applicationsData: [],
  applicationsDataByName: [],
  resourcesData: [
    {
      ResourceGroup: "",
      ServiceName: "",
      Date: "",
      Cost: "",
      Location: "",
      ConsumedQuantity: "",
      InstanceId: "",
    },
  ],
};
const applicationsData = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setLoader(state, action) {
      state.loader = action.payload;
    },
    getAllApplicationsData(state, action) {
      state.applicationsData = action.payload;
    },
    getAppDataByName(state, action) {
      state.applicationsDataByName = action.payload;
    },
    getAllResourcesData(state, action) {
      state.resourcesData = action.payload;
    },
  },
});

export const {
  setLoader,
  getAppDataByName,
  getAllResourcesData,
  getAllApplicationsData,
} = applicationsData.actions;
export default applicationsData.reducer;
