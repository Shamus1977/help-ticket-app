import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage once a user is logged in.
const user = JSON.parse(localStorage.getItem("user"));


const initialState = {
    //If there is a user in local storage we use it.
    //Else, we set to null
    user: user? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

//Register new user
export const register =  createAsyncThunk("auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString();
            //Passes in error message to the action.payload
            return thunkAPI.rejectWithValue(message);
        }
        //Information be caught below in extraReducers
        //Then action can be taken with information.
        // Set user, etc...
    });

//Login user
export const login =  createAsyncThunk("auth/login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message || error.toString();
            //Passes in error message to the action.payload
            return thunkAPI.rejectWithValue(message);
        }
        //Information be caught below in extraReducers
        //Then action can be taken with information.
        // Set user, etc...
    });

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});



export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        //Reset the state to default with exception of user.
        //Functions and propertes here can be exported and imported
        //from this file. They can be dispatched. Example: reset()
        // Is exported below above default export. It is an action,
        // so is reached for export with authSlice.actions
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    //Catches information from functions dispatched and called.
    // Acts like switch function in old Redux
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;