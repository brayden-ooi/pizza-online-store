import React from "react";
import { Link } from "react-router-dom";

import { Jumbotron, Button } from 'reactstrap';

import "./jumbotron.styles.scss";


const PizzaJumbotron = () => (
  <Jumbotron className="jumbotron-container">
    <section className="jumbotron-text-content">
      <h1 className="jumbotron-header text-center">
        50 ‧ 
        <Link to="/menu">
          <img src="logo_small.gif" alt="logo" />
        </Link>
         ‧ years
      </h1>
        <p className="lead text-center jumbotron-text-followup">
          That's right! Pinocchio's <em>50 years</em> in business! 
          We've been feeding Harvard and the surrounding area since 1966!
        </p>
        <hr className="my-2" />
        <p className="text-center">
          We deliver award-winning sicilian-style pizzas and mouth-watering steak subs! 
          <i> What else do we deliver? </i>
          We deliver them <em>wherever</em> you want! <br />
          Pizza for everyone!
          So start <Link to="/menu">ordering now</Link>! 
          Oh, and always remember:
        </p>
        <p className="text-center jumbotron-bold-text">
          eat ‧ more ‧ pizz
          <img src="pizza-icon.png" />
          !
        </p>
      </section>
  </Jumbotron>
);

export default PizzaJumbotron;