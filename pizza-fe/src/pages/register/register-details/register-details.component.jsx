import React from "react";

import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';


// TODO refactor
const RegisterDetails = ({ first_name, last_name, address, city, state, zip_code, handleChange, handleSubmit }) => (
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

            value={ first_name }
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

            value={ last_name }
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
          <Input 
            type="text" 
            name="city" 
            id="city" 
            placeholder="Cambridge"
            required

            value={ city }
            onChange={ handleChange }
          />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label for="state">State</Label>
          <Input 
            type="text" 
            name="state" 
            id="state" 
            placeholder="Massachusetts"
            required
            
            value={ state }
            onChange={ handleChange }
          />
        </FormGroup>
      </Col>
      <Col md={2}>
        <FormGroup>
          <Label for="zipCode">Zip</Label>
          <Input 
            type="text" 
            name="zipCode" 
            id="zipCode" 
            placeholder="02128"
            required

            value={ zip_code }
            onChange={ handleChange } 
          />
        </FormGroup>  
      </Col>
    </Row>

    <Button>Register</Button>
  </Form>
);

export default RegisterDetails;