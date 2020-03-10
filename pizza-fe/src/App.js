import React, { lazy, Suspense, useContext } from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Loader from "./components/loader/loader.component";

import PrivateRoute from "./components/private-route/private-route.component";

import MenuProvider from "./providers/menu/menu.provider";
import { UserContext } from "./providers/user/user.provider";
import ErrorContainer from './components/error-container/error-container.component';

// import { getCSRFToken } from "./providers/user/user.utils";

import './App.css';

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const MenuPage = lazy(() => import("./pages/menu/menu.component"));
const SignInPage = lazy(() => import("./pages/sign-in/sign-in.component"));
const RegisterPage = lazy(() => import("./pages/register/register.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const OrderPage = lazy(() => import("./pages/order/order.component"));


function App() {
  const { userState } = useContext(UserContext);  

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Route exact path="/"><HomePage /></Route>
            <Route exact path="/menu">
              <MenuProvider>
                <MenuPage />
              </MenuProvider>
            </Route>
            <PrivateRoute 
              exact 
              path="/signin" 
              condition={!userState}
              deniedPath="/"
            >
              <SignInPage />
            </PrivateRoute>
            <PrivateRoute 
              path="/register"
              condition={!userState}
              deniedPath="/"
            >
              <RegisterPage />
            </PrivateRoute>
            <PrivateRoute 
              exact 
              path="/checkout"
              condition={userState}
              deniedPath="/signin"
            >
              <CheckoutPage />
            </PrivateRoute>
            <PrivateRoute 
              exact 
              path="/order"
              condition={userState}
              deniedPath="/signin"
            >
              <OrderPage />
            </PrivateRoute>
            <Route exact path="/about"><ErrorContainer /></Route>
            <Route exact path="/contact"><ErrorContainer /></Route>
            <Route exact path="/promo"><ErrorContainer /></Route>
            <Route exact path="/delivery"><ErrorContainer /></Route>
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
