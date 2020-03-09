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
              <CardImg 
                tag={() => <div style={{ 
                  width: "400px", 
                  height: "200px",
  backgroundImage: 'linear-gradient(to bottom, #333333, transparent), url("https://cdn.tasteatlas.com/images/dishes/45a5e559c33a4d4ebd70851df05f5061.jpg?mw=1300")',
  backgroundSize: "cover"
                }} />}
                width="100%" 
                // src={img || "/318x180.svg"} 
                alt={text} 
                className="promotion-card-image" />
              <CardImgOverlay>
                <CardTitle className="promotion-card-title">{ text }</CardTitle>
                <CardText>{ suppliText }</CardText>
              </CardImgOverlay>
            </>
        }
      </Card>
    </a>
  </div>
);

export default PromotionItem;