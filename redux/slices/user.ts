import { createSlice } from "@reduxjs/toolkit";
import { UserSlice } from "../../interfaces/interface";

const initialState: UserSlice = {
   users: [],
   isLoading: false,
   error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
   getUsers: ((state, action) => {
    state.users = action.payload
   })
    }
})

export default userSlice.reducer
