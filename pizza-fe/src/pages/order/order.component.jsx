import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Loader from "../../components/loader/loader.component";
import OrderItem from "../../components/order-item/order-item.component";

import { UncontrolledCollapse, Table } from 'reactstrap';
import "./order.styles.scss";


const OrderPage = () => {
  const history = useHistory();
  const [ pendingOrders, setPendingOrders ] = useState(null);
  const fetchOrders = () => fetch("/api/pending_orders", {
    headers: {
      'Authorization': `Token ${window.localStorage.getItem("token")}`
    }
  }).then(response => response.json());

  useEffect(() => {
    Promise.resolve(fetchOrders())
    .then(response => setPendingOrders(response[response.length - 1]))
    .catch(error => {
      alert("There is a problem with the page. Please try again later.");
      history.push("/");
    });
  }, []);

  if (pendingOrders) {
    return (
      <main className="order-page">
        {
          pendingOrders.cooked ? (
            <span>Your order is prepared. Please come to pick it up!</span>
          ) : (
            <div className="loading-screen-container">
              <div className="image-container" />
              <span className="loading-text text-center">Your order is being prepared. Please wait for approximately 15 minutes.</span>
            </div>
          )
        }
        <div id="toggler" className="text-right py-3 order-check">check out your last order</div>
        <UncontrolledCollapse toggler="#toggler">
          <div className="order-table" id="order-detail">
            <Table hover>
              <thead>
                <tr>
                  <th className="type">Item</th>
                  <th>Name</th>
                  <th className="size">Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  pendingOrders.items_ordered.map((item, index) => (
                    <OrderItem key={index} {...item} />
                  ))
                }
              </tbody>
              <tfoot>
                <tr>
                  <td className="type" />
                  <td />
                  <td className="size" />
                  <td className="text-right">TOTAL:</td>
                  <td className="text-center">{ pendingOrders.total_price }</td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </UncontrolledCollapse>
      </main>
    );
  } else if (pendingOrders !== null) {
    return (
      <main className="order-page">
        <div>
          You don't seem to have a pending order. Go to <Link to="/menu">our menu</Link> to begin ordering.
        </div>
      </main>
    )
  } else return (
    <Loader />
  );
};

export default OrderPage;