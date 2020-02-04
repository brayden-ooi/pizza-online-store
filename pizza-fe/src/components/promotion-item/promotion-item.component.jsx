import React from "react";
import { Link } from "react-router-dom";

import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';


const PromotionItem = ({ text, img, pathTo }) => (
  <div>
    <Link to={pathTo}>
      <Card inverse>
        <CardImg width="100%" src="/318x180.svg" alt={text} />
        <CardImgOverlay>
          <CardTitle>{ text }</CardTitle>
          <CardText>Promotion Text here...</CardText>
          <CardText>
            <small className="text-muted">Click to see more...</small>
          </CardText>
        </CardImgOverlay>
      </Card>
    </Link>
  </div>
);

export default PromotionItem;