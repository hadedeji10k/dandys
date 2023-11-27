import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoading from "./component/PageLoading/PageLoading";
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
import AllProduct from "./pages/somepages/AllProduct";
import CreateAccount from "./pages/somepages/CreateAccount";
import SellerDashboardLayout from "./layout/SellerDashboardLayout";
import Notification from "./pages/somepages/Notification";
import Prefernces from "./pages/somepages/Prefernces";
import ProductCategory from "./pages/somepages/ProductCategory";
import AllDiscounts from "./pages/somepages/AllDiscounts";
import NewDiscount from "./pages/somepages/NewDiscount";
import Customers from "./pages/somepages/Customers";
import CustomerDetails from "./pages/somepages/CustomerDetails";
import EditDiscount from "./pages/somepages/EditDiscount";
import Dashboard from "./pages/somepages/Dashboard";
import Settings from "./pages/SellerDashboard/Settings";
import UserPermission from "./pages/SellerDashboard/Settings/UserPermission";
import Analytics from "./pages/SellerDashboard/Analytics";
import EditProduct from "./pages/somepages/EditProduct";
import ForgotPasswordOTPVerification from "./pages/SignIn/ForgotPasswordOTP";

function Routings() {
  return (
    <Routes>
      {/* -------------------------->>> SELLER DASHBOARD -------------->>>>>>>>>>>>>>>> */}
      <Route
        path="/"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Dashboard />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Dashboard />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/preferences"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Prefernces />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/notification"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Notification />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      <Route
        path="/profile"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Profile />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      {/* PRODUCT */}
      <Route
        path="/new-product"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <NewProduct />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/products"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <AllProduct />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/products/categories"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <ProductCategory />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/product-details/:id"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <ProductPage />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <EditProduct />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      {/* DISCOUNT */}
      <Route
        path="/discount-details/:id"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <ProductPage />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/discounts"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <AllDiscounts />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/new-discount"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <NewDiscount />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/edit-discount/:id"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <EditDiscount />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      {/* ORDER */}
      <Route
        path="/orders"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <OrderPage />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/order-details"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <OrderDetails />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      {/* Analytics*/}
      <Route
        path="/analytics"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Analytics />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      {/* CUSTOMER*/}
      <Route
        path="/customers"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Customers />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path="/customers/customer-details"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <CustomerDetails />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      {/* SETTINGS */}
      <Route
        path="/settings"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Settings />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      <Route
        path="/settings/user-permission"
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <UserPermission />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      {/* -------------------------->>> END SELLER DASHBOARD -------------->>>>>>>>>>>>>>>> */}

      {/* -------------------------->>> AUTHENTICATION -------------->>>>>>>>>>>>>>>> */}

      <Route
        path="/account"
        element={
          <Suspense fallback={<PageLoading />}>
            <CreateAccount />
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
        path="/password-otp"
        element={
          <Suspense fallback={<PageLoading />}>
            <ForgotPasswordOTPVerification />
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

      {/* -------------------------->>> END AUTHENTICATION -------------->>>>>>>>>>>>>>>> */}

      <Route
        path="*"
        element={
          <Suspense fallback={<PageLoading />}>
            <PageNotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default Routings;
