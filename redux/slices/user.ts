import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/interface";

const initialState: User = {
    _id: "",
    username: "",
    email: "",
    image: "",
    bio: "",
    followings: [],
    followers: [],
    posts: [],
    verified: false,
    new_notification: 0,
    saved_posts: [],
    personal_link: "",
    failed_login_attempts: 0,
}

const userSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
   
    }
})

export default userSlice.reducer
