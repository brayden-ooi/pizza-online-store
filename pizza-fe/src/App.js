import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { UserContext } from "./providers/user/user.provider";

import { getCSRFToken } from "./providers/user/user.utils";

import './App.css';

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const MenuPage = lazy(() => import("./pages/menu/menu.component"));
const SignInPage = lazy(() => import("./pages/sign-in/sign-in.component"));
const RegisterPage = lazy(() => import("./pages/register/register.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));


function App() {
  const { userState } = useContext(UserContext);

  useEffect(() => {

    // if (token) {
    //   const fetchData = async () => {
    //     const fetchUserStatus = await fetch("http://localhost:8000/api/userstatus", {
    //       credentials: 'include',
    //       headers: {
    //         'Authorization': `Token ${token}`,
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': await getCSRFToken()
    //       },
    //     }
    //     );
    //     const response = await fetchUserStatus.json();
    //     await getCurrentUser(response || null);
    //   };
  
    //   fetchData();
    // }
  }, []);
  

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>I am loading!</div>}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/menu" component={MenuPage} />
            <Route exact path="/signin" render={() => userState ? <Redirect to="/" /> : <SignInPage />} />
            <Route path="/register" render={() => userState ? <Redirect to="/" /> : <RegisterPage />} />
            <Route exact path="/checkout" render={() => userState ? <CheckoutPage /> : <Redirect to="/signin" />} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
