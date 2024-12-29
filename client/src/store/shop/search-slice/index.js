import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    searchResults: []
}


export const getSearchResults = createAsyncThunk(`/search/getSearchResults`,
    async (keyword) => {
        const result = await axios.get(`http://localhost:5000/api/shop/search/${keyword}`);
        return result?.data;
    })

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setSearchResults: (state) => {
            state.searchResults = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchResults.pending, (state) => {
            state.isLoading = true;
        }).addCase(getSearchResults.fulfilled, (state, action) => {
            state.isLoading = false,
                state.searchResults = action.payload.data
        }).addCase(getSearchResults.rejected, (state) => {
            state.isLoading = false,
                state.searchResults = []
        })
    }
})

export const { setSearchResults } = searchSlice.actions
export default searchSlice.reducer;