import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}

export const addAddress = createAsyncThunk('/address/addAddress',
    async (formData) => {
        console.log(formData);
        const result = await axios.post("http://localhost:5000/api/shop/address/add", formData);
        return result?.data;
    })

export const getAddress = createAsyncThunk('/carts/getAddress',
    async (userId) => {
        const result = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`)
        return result?.data;
    })

export const updateAddress = createAsyncThunk('/carts/updateAddress',
    async ({ userId, addressId, formData }) => {
        const result = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
            formData
        );
        return result?.data;
    })

export const deleteAddress = createAsyncThunk('/carts/deleteAddress',
    async ({ userId, addressId }) => {

        const result = await axios.delete(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`)
        return result?.data;
    })



const ShoppingAddressSlice = createSlice({
    name: 'shoppingAddress',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(getAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.addressList = [];
        }).addCase(addAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(addAddress.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(addAddress.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
});


export default ShoppingAddressSlice.reducer;