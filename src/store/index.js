import { Api } from "@mui/icons-material";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {
        login(state){
            state.isLoggedIn = true
        },
        logout(state) {
            localStorage.removeItem('useId');
            state.isLoggedIn = false
        },
    },
});

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer
})

export const comment = (value, id) => Api.post(`/posts/${id}/commentPost`, { value })