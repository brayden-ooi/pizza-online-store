import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import PrivateRoute from "./components/private-route/private-route.component";
import MenuProvider from "./providers/menu/menu.provider";

import { UserContext } from "./providers/user/user.provider";

// import { getCSRFToken } from "./providers/user/user.utils";

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
            <Route path="*">
              <div>This page is not found!</div>
            </Route>
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
