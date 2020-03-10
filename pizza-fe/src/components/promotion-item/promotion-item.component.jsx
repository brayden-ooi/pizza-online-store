import React from "react";

import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import "./promotion-item.styles.scss";


const PromotionItem = ({ text, suppliText, img, pathTo, display }) => (
  <div>
    <a href={pathTo} target="_blank" rel="noopener noreferrer">
      <Card inverse className="promotion-card mb-4">
        {
          display ? display : 
            <>
              <CardImg 
                tag={() => <div 
                  className="promotion-card-image"
                  style={{ 
                    backgroundImage: 
                    `linear-gradient(to bottom, #111111, transparent), url(${img || "./318x180.svg"})`,
                  }} 
                />}
                width="100%" 
                alt={text}
              />
              <CardImgOverlay>
                <CardTitle className="promotion-card-title">{ text }</CardTitle>
                <CardText className="promotion-card-text">{ suppliText }</CardText>
              </CardImgOverlay>
            </>
        }
      </Card>
    </a>
  </div>
);

export default PromotionItem;