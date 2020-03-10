import React from "react";

import FormInput from "../../../components/form-input/form-input.component";

import { stateUpdate, correctedPayload } from "../../../reducers/form/form.utils";

import { Col, Row, Button, Form } from 'reactstrap';
import "./register-details.styles.scss";


const RegisterDetails = ({ detailPage, formDispatch, handleSubmit }) => {
  // the original formReducer only works well with flat state, but for registration there are nested objects that are 2 levels deep
  // therefore the functions below clone the nested objects along with the changes before returning the target object to reducer.
  const nestedChangeFn = state => (targetNode, event) => 
    stateUpdate(state, targetNode, 
      stateUpdate(state[targetNode], event.target.name, event.target.value)); // to update state 2nd level deep

  const handleChange = state => (targetNode, event) => correctedPayload("detailPage")(nestedChangeFn(state)(targetNode, event)); // to update state 1st level deep
  const detailHandleChange = handleChange(detailPage);
  
  const fullNameHandleChange = event => formDispatch({ type: "FORM_CHANGE", payload: detailHandleChange("fullName", event)});
  const fullAddressHandleChange = event => formDispatch({ type: "FORM_CHANGE", payload: detailHandleChange("fullAddress", event)});
  
  const { fullName: { first_name, last_name }, 
    fullAddress: { address, city, state, zip_code } } = detailPage;

  return (
    <Form onSubmit={handleSubmit} className="register-details">
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