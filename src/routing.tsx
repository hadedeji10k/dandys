import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom"
import PageLoading from "./component/PageLoading/PageLoading";
import Home from "./pages/Home";
import PageNotFound from "./component/PageError";
import SignUp from "./pages/SignUp";

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
            path="/sign-up"
            element={
              <Suspense fallback={<PageLoading />}>
                <SignUp />
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
