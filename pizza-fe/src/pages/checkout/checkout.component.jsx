import React from "react";

import { Table } from 'reactstrap';


const CheckoutPage = () => (
  <Table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Name</th>
        <th>Size</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Regular Pizza</td>
        <td>Regular Pizza</td>
        <td>Small</td>
        <td>
          <div>&#10094;</div>
          1
          <div>&#10095;</div>
        </td>
        <td>12.95</td>
        <td>&#10005;</td>
      </tr>
    </tbody>
  </Table>
);

export default CheckoutPage;