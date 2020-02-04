import React from "react";

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from "reactstrap";


const MenuItem = () => (
  <Card style={{ 
    flexGrow: "0",
    flexBasis: "auto"
  }}>
    <CardImg top width="100%" src="318x180.svg" alt="Card image cap" />
    <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>foofofofofofofod</CardText>
      <Button>Button</Button>
    </CardBody>
  </Card>
);

export default MenuItem;