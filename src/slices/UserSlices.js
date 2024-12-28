import { createSlice } from '@reduxjs/toolkit'

export const UserSlices = createSlice({
  name: 'counter',
  initialState: {
    value:JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")):null
  },
  reducers: {
    
    userDataReducer: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {userDataReducer } = UserSlices.actions

export default UserSlices.reducer