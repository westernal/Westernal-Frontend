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
   
    }
})

export default userSlice.reducer
