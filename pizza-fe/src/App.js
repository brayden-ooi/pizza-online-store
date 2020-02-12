import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import './App.css';

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const MenuPage = lazy(() => import("./pages/menu/menu.component"));
const SignInPage = lazy(() => import("./pages/sign-in/sign-in.component"));
const RegisterPage = lazy(() => import("./pages/register/register.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>I am loading!</div>}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/menu" component={MenuPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
