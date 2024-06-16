import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";

import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/fakeAuthContext";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Products from "./pages/Products";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import AppLayOut from "./pages/AppLayOut";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

const HomePage = lazy(() => import("./pages/HomePage"));
const Products = lazy(() => import("./pages/Products"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayOut = lazy(() => import("./pages/AppLayOut"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-BG9Ud_cd.css   29.89 kB │ gzip:   5.04 kB
// dist/assets/index-DCIMJjAr.js   513.27 kB │ gzip: 147.86 kB

function App() {
  /*anything outer the router will state on the page forever */
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            {/* ///we use sunspense to wait the other pae to wait until its file is
            dowloaded and creat a spinner until suspension */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* or   <Route index element={<HomePage />} /> */}
              <Route path="/product" element={<Products />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayOut />
                  </ProtectedRoute>
                }
              >
                {/*this will be the default child route of the app page. */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                {/* we can put this dynamic route any where we want */}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
              {/*if none of the routers   matched this page will then be displayed */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
