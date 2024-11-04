import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    articlesList: [],
    articleDetails: null
}

export const addNewArticle = createAsyncThunk('/articles/addNewArticle',
    async (formData) => {
        const result = await axios.post("http://localhost:5000/api/admin/articles/add", formData, {
        })
        return result?.data;
    })

export const getAllArticles = createAsyncThunk('/articles/getAllArticles',
    async () => {
        const result = await axios.get("http://localhost:5000/api/admin/articles/get");
        return result?.data;
    })

export const getArticleDetails = createAsyncThunk(`/articles/getArticleDetails`,
    async (id) => {
        const result = await axios.get(`http://localhost:5000/api/admin/articles/get/${id}`);
        return result?.data;
    })

export const updateArticle = createAsyncThunk('/articles/updateArticle',
    async ({ id, formData }) => {        
        const result = await axios.put(`http://localhost:5000/api/admin/articles/update/${id}`, formData, {
        })
        return result?.data;
    })

export const deleteArticle = createAsyncThunk('/articles/deleteArticle',
    async (id) => {
        const result = await axios.delete(`http://localhost:5000/api/admin/articles/delete/${id}`)
        return result?.data;
    })



const adminArticlesSlice = createSlice({
    name: 'adminArticles',
    initialState,
    reducers: {
        setArticletDetails: (state) => {
            state.articleDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllArticles.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllArticles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.articlesList = action.payload.data
        }).addCase(getAllArticles.rejected, (state) => {
            state.isLoading = false;
            state.articlesList = [];
        }).addCase(getArticleDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(getArticleDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.articleDetails = action.payload.data
        }).addCase(getArticleDetails.rejected, (state) => {
            state.isLoading = false;
            state.articleDetails = [];
        })
    }
});

export const { setArticletDetails } = adminArticlesSlice.actions;
export default adminArticlesSlice.reducer;