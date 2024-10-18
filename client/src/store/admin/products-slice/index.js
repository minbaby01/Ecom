import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    productLists: []
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct',
    async (formData) => {
        const result = await axios.post("http://localhost:5000/api/admin/products/add", formData, {
            headers: {
                'Content-Type': "application/json",
            }
        })
        return result?.data;
    })

export const getAllProducts = createAsyncThunk('/products/getAllProducts',
    async () => {
        const result = await axios.get("http://localhost:5000/api/admin/products/get");
        return result?.data;
    })

export const updateProduct = createAsyncThunk('/products/updateProduct',
    async ({id, formData}) => {
        const result = await axios.put(`http://localhost:5000/api/admin/products/update/${id}`, formData, {
            headers: {
                'Content-Type': "application/json",
            }
        })
        return result?.data;
    })

export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async (id) => {
        const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)
        return result?.data;
    })



const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productLists = action.payload.data
        }).addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.productLists = [];
        })
    }
});

export default AdminProductsSlice.reducer;