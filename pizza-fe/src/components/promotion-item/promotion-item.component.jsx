import React from "react";

import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import "./promotion-item.styles.scss";


const PromotionItem = ({ text, suppliText, img, pathTo, display }) => (
  <div>
    <a href={pathTo} target="_blank">
      <Card inverse className="promotion-card">
        {
          display ? display : 
            <>
              <CardImg width="100%" src={img || "/318x180.svg"} alt={text} />
              <CardImgOverlay>
                <CardTitle>{ text }</CardTitle>
                <CardText>{ suppliText }</CardText>
                <CardText>
                  <small className="text-muted">Click to see more...</small>
                </CardText>
              </CardImgOverlay>
            </>
        }
      </Card>
    </a>
  </div>
);

export default PromotionItem;