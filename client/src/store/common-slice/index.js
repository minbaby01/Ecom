import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    featureImageList: []
}

export const addFeatureImages = createAsyncThunk('addFeatureImages',
    async (image) => {
        const response = await axios.post('http://localhost:5000/api/common/feature/add', { image }
        );
        return response.data;
    })


export const getFeatureImages = createAsyncThunk('getFeatureImages',
    async () => {
        const response = await axios.get('http://localhost:5000/api/common/feature/get'
        );
        return response.data;
    })

const commonSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state) => {
                state.isLoading = false;
                state.featureImageList = [];
            })
    },
});

export default commonSlice.reducer;