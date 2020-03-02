import React from "react";

import { FormGroup, Label, Col } from "reactstrap"


const ModalInput = ({ listName, children }) => (
  <FormGroup row>
    <Label sm={3}>{ listName }</Label>
    <Col sm={9}>
        { children }
      </Col>
  </FormGroup>
);

export default ModalInput; 