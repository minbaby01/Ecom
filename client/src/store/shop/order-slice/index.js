import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    orderId: null,
    orders: [],
    order: null
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder',
    async (orderData) => {
        const response = await axios.post('http://localhost:5000/api/shop/order/create', orderData);
        return response?.data;
    }
)

export const getOrders = createAsyncThunk('/order/getOrders',
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/shop/order/get/${userId}`);
        return response?.data;
    }
)

export const getOrderDetail = createAsyncThunk('/order/getOrderDetail',
    async (id) => {        
        const response = await axios.get(`http://localhost:5000/api/shop/order/details/${id}`);
        return response?.data;
    }
)

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.orderId = action.payload.orderId
            sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false
            state.orderId = null
        }).addCase(getOrders.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false
            state.orders = action.payload.data
        }).addCase(getOrders.rejected, (state) => {
            state.isLoading = false
            state.orders = []
        }).addCase(getOrderDetail.pending, (state) => {
            state.isLoading = true
        }).addCase(getOrderDetail.fulfilled, (state, action) => {
            state.isLoading = false
            state.order = action.payload.data
        }).addCase(getOrderDetail.rejected, (state) => {
            state.isLoading = false
            state.order = null
        })
    }
})

export default shoppingOrderSlice.reducer;