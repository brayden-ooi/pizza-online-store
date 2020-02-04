import React from "react";

import PromotionItem from "../promotion-item/promotion-item.component";

import { CardDeck } from "reactstrap";


const PromotionOverview = () => {
  // TODO to be placed in backend, for admins to change in admin page
  const PromotionMaterials = [
    {
      text: "Try it!",
      img: false,
      pathTo: "/menu"
    },
    {
      text: "Buy 2 free 1!",
      img: false,
      pathTo: "/menu"
    },
    {
      text: "See more discount!",
      img: false,
      pathTo: "/menu"
    }
  ];

  return (
    // TODO create own scss
    <CardDeck style={{ justifyContent: "center" }}>
      {
        PromotionMaterials.map(PromotionMaterial => <PromotionItem { ...PromotionMaterial } />)
      }
    </CardDeck>
  );
};

export default PromotionOverview;