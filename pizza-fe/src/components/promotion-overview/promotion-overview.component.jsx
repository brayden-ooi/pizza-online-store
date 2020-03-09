import React from "react";

import PromotionItem from "../promotion-item/promotion-item.component";

import { CardDeck } from "reactstrap";


const PromotionOverview = () => {
  // TODO to be placed in backend, for admins to change in admin page
  const PromotionMaterials = [
    {
      text: "Sicilian Pizza?",
      suppliText: "Click here to find out more!",
      img: 'https://cdn.tasteatlas.com/images/dishes/45a5e559c33a4d4ebd70851df05f5061.jpg?mw=1300',
      pathTo: "https://www.pinocchiospizza.net/sicilian_vs_regular.html"
    },
    {
      text: "Buy 2 free 1!",
      img: false,
      pathTo: "/menu"
    },
    {
      text: "See more discount!",
      img: false,
      pathTo: "/menu",
      display: <iframe width="400" height="200" src="https://www.youtube.com/embed/hoM7PJu6V-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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