import React from "react";

import PromotionItem from "../promotion-item/promotion-item.component";

import PROMOTION_DATA from "./promotion.data";

import { CardDeck } from "reactstrap";
import "./promotion-overview.styles.scss";


const PromotionOverview = () => (
  <CardDeck className="promotion-overview">
    {
      PROMOTION_DATA.map((PromotionMaterial, index) => <PromotionItem { ...PromotionMaterial } key={index} />)
    }
  </CardDeck>
);

export default PromotionOverview;