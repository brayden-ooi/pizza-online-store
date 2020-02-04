import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import './App.css';

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const MenuPage = lazy(() => import("./pages/menu/menu.component"));


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>I am loading!</div>}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/menu" component={MenuPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
