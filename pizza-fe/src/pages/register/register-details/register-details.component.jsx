import React from "react";

import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';


const RegisterDetails = ({ firstname, lastname, address, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="firstname">First name</Label>
          <Input 
            type="text" 
            name="firstname" 
            id="firstname"
            required 

            value={ firstname }
            onChange={ handleChange }
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="lastname">Last name</Label>
          <Input 
            type="text" 
            name="lastname" 
            id="lastname"
            required

            value={ lastname }
            onChange={ handleChange }
          />
        </FormGroup>
      </Col>
    </Row>

    <FormGroup>
      <Label for="address">Address</Label>
      <Input 
        type="text" 
        name="address" 
        id="address" 
        placeholder="74 Winthrop Street"
        required

        value={ address }
        onChange={ handleChange }
      />
    </FormGroup>

    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="city">City</Label>
          <Input type="text" name="city" id="city" placeholder="Cambridge" />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label for="exampleState">State</Label>
          <Input type="text" name="state" id="exampleState" placeholder="Massachusetts" />
        </FormGroup>
      </Col>
      <Col md={2}>
        <FormGroup>
          <Label for="exampleZip">Zip</Label>
          <Input type="text" name="zip" id="exampleZip" placeholder="02128" />
        </FormGroup>  
      </Col>
    </Row>

    <Button>Register</Button>
  </Form>
);

export default RegisterDetails;