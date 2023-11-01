import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLoading from './component/PageLoading/PageLoading';
import Home from './pages/Home';
import PageNotFound from './component/PageError';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import OTPVerification from './pages/SignUp/OTP';
import ForgotPassword from './pages/SignIn/ForgotPassword';
import PasswordReset from './pages/SignIn/PasswordReset';
import ProductPage from './pages/somepages/ProductPage';
import OrderPage from './pages/somepages/OrderPage';
import OrderDetails from './pages/somepages/OrderDetails';
import NewProduct from './pages/somepages/NewProduct';
import Profile from './pages/somepages/Profile';
import AllProduct from './pages/somepages/AllProduct';
import CreateAccount from './pages/somepages/CreateAccount';
import SellerDashboardLayout from './layout/SellerDashboardLayout';
import SellersHome from './pages/SellerDashboard/Home';
import Notification from './pages/somepages/Notification';
import Prefernces from './pages/somepages/Prefernces';
import ProductCategory from './pages/somepages/ProductCategory';
import AllDiscounts from './pages/somepages/AllDiscounts';
import NewDiscount from './pages/somepages/NewDiscount';
import Customers from './pages/somepages/Customers';
import CustomerDetails from './pages/somepages/CustomerDetails';
import EditDiscount from './pages/somepages/EditDiscount';
import Dashboard from './pages/somepages/Dashboard';
import Settings from './pages/somepages/Settings';
import Plan from './pages/SellerDashboard/Settings/Plan';
import Billing from './pages/SellerDashboard/Settings/Billing';
import Payment from './pages/SellerDashboard/Settings/Payment';
import UserPermission from './pages/SellerDashboard/Settings/UserPermission';
import Analytics from './pages/SellerDashboard/Analytics';
import BuyerHome from './pages/Buyer/BuyerHome';

function Routings() {
  return (
    <Routes>
      {/* -------------------------->>> SELLER DASHBOARD -------------->>>>>>>>>>>>>>>> */}
      <Route
        path='/seller-dashboard'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Dashboard />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/preferences'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Prefernces />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/notification'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Notification />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      <Route
        path='/seller/profile'
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
        path='/seller/new-product'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <NewProduct />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/products'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <AllProduct />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/products/categories'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <ProductCategory />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/product-details/:id'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <ProductPage />
            </SellerDashboardLayout>
          </Suspense>
        }
      />

      {/* DISCOUNT */}
      <Route
        path='/seller/discount-details/:id'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <ProductPage />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/discounts'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <AllDiscounts />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/new-discount'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <NewDiscount />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/edit-discount/:id'
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
          path="/seller/orders"
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
          path="/seller/analytics"
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
          path="/seller/customers"
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
        path='/seller/settings'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Settings />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/settings/plan'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Plan />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/settings/billing'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Billing />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/settings/payment'
        element={
          <Suspense fallback={<PageLoading />}>
            <SellerDashboardLayout>
              <Payment />
            </SellerDashboardLayout>
          </Suspense>
        }
      />
      <Route
        path='/seller/settings/user-permission'
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
        path='/account'
        element={
          <Suspense fallback={<PageLoading />}>
            <CreateAccount />
          </Suspense>
        }
      />
      <Route
        path='/sign-up'
        element={
          <Suspense fallback={<PageLoading />}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path='/sign-in'
        element={
          <Suspense fallback={<PageLoading />}>
            <SignIn />
          </Suspense>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <Suspense fallback={<PageLoading />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path='/otp'
        element={
          <Suspense fallback={<PageLoading />}>
            <OTPVerification />
          </Suspense>
        }
      />
      <Route
        path='/password-reset'
        element={
          <Suspense fallback={<PageLoading />}>
            <PasswordReset />
          </Suspense>
        }
      />

      {/* -------------------------->>> END AUTHENTICATION -------------->>>>>>>>>>>>>>>> */}

      {/* -------------------------->>> BUYERS -------------->>>>>>>>>>>>>>>> */}

      <Route
        path='/'
        element={
          <Suspense fallback={<PageLoading />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path='/buyer-dashboard'
        element={
          <Suspense fallback={<PageLoading />}>
            <BuyerHome />
          </Suspense>
        }
      />

      {/* -------------------------->>> END BUYERS -------------->>>>>>>>>>>>>>>> */}

      <Route
        path='*'
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
