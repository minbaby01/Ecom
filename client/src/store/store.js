import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice';
import shoppingProductsSlice from './shop/products-slice'
import shoppingCartsSlice from './shop/carts-slice';
import ShoppingAddressSlice from './shop/address-slice'
import commonFeatureSlice from './common-slice';
import adminArticlesSlice from './admin/articles-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductsSlice,
        adminArticles: adminArticlesSlice,
        shoppingProducts: shoppingProductsSlice,
        shoppingCarts : shoppingCartsSlice,
        shoppingAddress: ShoppingAddressSlice,
        commonFeature: commonFeatureSlice
    }
})

export default store;