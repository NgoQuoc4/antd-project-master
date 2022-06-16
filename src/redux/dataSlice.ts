import { createSlice } from "@reduxjs/toolkit";

interface Data {
  name: string;
  value: string;
}

interface DataState {
  data: Data[];
}

const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {},
  },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
