// The PURPOSE OF createAsyncThunk:
//createAsyncThunk, generates three Redux action creators using
// createAction: pending, fulfilled and rejected. Each lifecycle
//action will be attatched to the returned thunk action creater
//so that your reducer logic can reference the action types and
//respond tot he actions when dispatched. This will take place
//in extraReducers.
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
    tickets: [],
    ticket:{},
    isError:false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new ticket
export const createTicket = createAsyncThunk(
    "tickets/createTicket",
    //ThunkAPI allows us to get any state in redux. 
    //So we can get the user from auth state
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            const message = (
                error.response && error.response.data &&
                error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Populate tickets.
export const getTickets = createAsyncThunk(
    "tickets/getTickets",
    //ThunkAPI allows us to get any state in redux. 
    //So we can get the user from auth state
    //The underscore passed in allows you access to thunkAPI
    //whithout having to pass in actual data
    //when actual data is not needed.
    //The underscore is convention for "not needing" an
    //argument for said parameter.
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTickets(token);
        } catch (error) {
            const message = (
                error.response && error.response.data &&
                error.response.data.message
            ) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const ticketSlice = createSlice({
    name:"ticket",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const {reset} = ticketSlice.actions;
export default ticketSlice.reducer;
