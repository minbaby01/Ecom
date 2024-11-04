import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productLists: [],
    productDetails: null
}

export const getAllFilterdProducts = createAsyncThunk('/products/getAllProducts',
    async ({ filtersParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filtersParams,
            sortBy: sortParams
        })

        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);
        return result?.data;
    })

export const getProductDetails = createAsyncThunk(`/products/getProductDetails`,
    async (id) => {
        const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`);
        return result?.data;
    })

const ShoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllFilterdProducts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllFilterdProducts.fulfilled, (state, action) => {
            state.isLoading = false,
            state.productLists = action.payload.data
        }).addCase(getAllFilterdProducts.rejected, (state, action) => {
            state.isLoading = false,
            state.productLists = []
        }).addCase(getProductDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getProductDetails.fulfilled, (state, action) => {
            state.isLoading = false,
            state.productDetails = action.payload.data
        }).addCase(getProductDetails.rejected, (state, action) => {
            state.isLoading = false,
            state.productDetails = null
        })
    }
})

export const { setProductDetails } = ShoppingProductsSlice.actions;
export default ShoppingProductsSlice.reducer;