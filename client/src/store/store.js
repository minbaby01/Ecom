import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice'

import adminProductsSlice from './admin/products-slice';
import adminArticlesSlice from './admin/articles-slice'

import shopProductsSlice from './shop/products-slice'
import shopCartsSlice from './shop/carts-slice';
import shopAddressSlice from './shop/address-slice'
import shopSearchSlice from './shop/search-slice'
import shopOrderSlice from './shop/order-slice'

import commonFeatureSlice from './common-slice';


const store = configureStore({
    reducer: {
        auth: authReducer,

        adminProducts : adminProductsSlice,
        adminArticles: adminArticlesSlice,

        shoppingProducts: shopProductsSlice,
        shoppingCarts : shopCartsSlice,
        shoppingAddress: shopAddressSlice,
        shopSearch: shopSearchSlice,
        shopOrder: shopOrderSlice,

        commonFeature: commonFeatureSlice
    }
})

export default store;