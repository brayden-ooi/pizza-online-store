import React from "react";

import FormInput from "../../../components/form-input/form-input.component";

import { Col, Row, Button, Form } from 'reactstrap';


const RegisterDetails = ({ detailPage, formDispatch, handleSubmit }) => {
  const handleChange = (targetNode, event) => ({
    name: "detailPage",
    value: { 
      ...detailPage, 
      [targetNode]: {
        ...detailPage[targetNode],
        [event.target.name]: event.target.value }
      }
  });
  const fullNameHandleChange = event => formDispatch(handleChange("fullName", event));
  const fullAddressHandleChange = event => formDispatch(handleChange("fullAddress", event));
  
  const { fullName: { first_name, last_name }, 
    fullAddress: { address, city, state, zip_code } } = detailPage;

  return (
    <Form onSubmit={handleSubmit}>
      <Row form>
        <Col md={6}>
          <FormInput 
            name="first_name"
            label="First name"

            value={ first_name }
            onChange={ fullNameHandleChange }
          />
        </Col>
        <Col md={6}>
          <FormInput 
            name="last_name"
            label="Last name"

            value={ last_name }
            onChange={ fullNameHandleChange }
          />
        </Col>
      </Row>

      <FormInput 
        name="address"
        placeholder="74 Winthrop Street"

        value={ address }
        onChange={ fullAddressHandleChange }
      />

      <Row form>
        <Col md={6}>
          <FormInput 
            name="city"
            placeholder="Cambridge"

            value={ city }
            onChange={ fullAddressHandleChange }
          />
        </Col>
        <Col md={4}>
          <FormInput 
            name="state"
            placeholder="Massachusetts"

            value={ state }
            onChange={ fullAddressHandleChange }
          />
        </Col>
        <Col md={2}>
          <FormInput 
            name="zip_code"
            label="Zip Code"
            placeholder="02128"

            value={ zip_code }
            onChange={ fullAddressHandleChange }
          /> 
        </Col>
      </Row>

      <Button>Register</Button>
    </Form>
  );
};

export default RegisterDetails;