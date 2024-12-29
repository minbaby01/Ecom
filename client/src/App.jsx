import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminProducts from "./pages/admin-view/products"
import AdminOrders from "./pages/admin-view/orders"
import AdminFeatures from "./pages/admin-view/features"
import ShoppingLayout from "./components/shoppping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingListing from "./pages/shopping-view/listing"
import CheckAuth from "./common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import AdminArticles from "./pages/admin-view/articles"
import AdminArticleEditor from "./pages/admin-view/articles-editor"
import SearchProducts from "./pages/shopping-view/search"
import ShoppingOrderDetailsView from "./pages/shopping-view/order-details"

function App() {

  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">

      <Routes>

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />

          <Route path="articles">
            <Route path="" element={<AdminArticles />} />
            <Route path="create" element={<AdminArticleEditor />} />
            <Route path="update/:id" element={<AdminArticleEditor />} />
          </Route>

        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="account">
            <Route path="" element={<ShoppingAccount />} />
            <Route path="order/:id" element={< ShoppingOrderDetailsView />} />
          </Route>

          <Route path="checkout" element={<ShoppingCheckout />} />

        </Route>

        <Route path="/shop" element={
          <ShoppingLayout />
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="*" element={
          <>
            <ShoppingLayout />
            <NotFound />
          </>
        } />

        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>

    </div>
  )
}

export default App
