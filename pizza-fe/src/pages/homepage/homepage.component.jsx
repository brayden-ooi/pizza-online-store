import React from "react";

import PizzaJumbotron from "../../components/jumbotron/jumbotron.component";
import PromotionOverview from "../../components/promotion-overview/promotion-overview.component";

import "./homepage.styles.scss";


const HomePage = () => (
  <main className="homepage">
    <PizzaJumbotron />
    <PromotionOverview />
  </main>
);

export default HomePage;