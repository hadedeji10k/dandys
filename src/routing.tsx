import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom"
import PageLoading from "./component/PageLoading/PageLoading";
import Home from "./pages/Home";
import PageNotFound from "./component/PageError";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OTPVerification from "./pages/SignUp/OTP";
import ForgotPassword from "./pages/SignIn/ForgotPassword";
import PasswordReset from "./pages/SignIn/PasswordReset";
import ProductPage from "./pages/somepages/ProductPage";
import OrderPage from "./pages/somepages/OrderPage";
import OrderDetails from "./pages/somepages/OrderDetails";
import NewProduct from "./pages/somepages/NewProduct";
import Profile from "./pages/somepages/Profile";


function Routings() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<PageLoading />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/new-product"
          element={
            <Suspense fallback={<PageLoading />}>
              <NewProduct />
            </Suspense>
          }
        />
        <Route
          path="/product"
          element={
            <Suspense fallback={<PageLoading />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path="/order"
          element={
            <Suspense fallback={<PageLoading />}>
              <OrderPage />
            </Suspense>
          }
        />
        <Route
          path="/order-details"
          element={
            <Suspense fallback={<PageLoading />}>
              <OrderDetails />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<PageLoading />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Suspense fallback={<PageLoading />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<PageLoading />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path="/otp"
          element={
            <Suspense fallback={<PageLoading />}>
              <OTPVerification />
            </Suspense>
          }
        />
        <Route
          path="/password-reset"
          element={
            <Suspense fallback={<PageLoading />}>
              <PasswordReset />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoading />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default Routings;
