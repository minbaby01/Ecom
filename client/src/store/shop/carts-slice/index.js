import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    cartItems: []
}

export const addToCart = createAsyncThunk('/carts/addToCart',
    async ({ userId, productId, quantity }) => {

        const result = await axios.post("http://localhost:5000/api/shop/carts", { userId, productId, quantity });
        return result?.data;
    })

export const getCart = createAsyncThunk('/carts/getCart',
    async (userId) => {
        const result = await axios.get(`http://localhost:5000/api/shop/carts/${userId}`)
        return result?.data;
    })

export const updateCartProduct = createAsyncThunk('/carts/updateCartProduct',
    async ({ userId, productId, quantity }) => {
        const result = await axios.put("http://localhost:5000/api/shop/carts", ({ userId, productId, quantity }));
        return result?.data;
    })

export const deleteCartProduct = createAsyncThunk('/carts/deleteCartProduct',
    async ({ userId, productId }) => {

        const result = await axios.delete(`http://localhost:5000/api/shop/carts/${userId}/${productId}`)
        return result?.data;
    })



const ShoppingCartsSlice = createSlice({
    name: 'shoppingCarts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(getCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(getCart.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(updateCartProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCartProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(updateCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(deleteCartProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCartProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(deleteCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.cartItems = [];
        })
    }
});

export default ShoppingCartsSlice.reducer;