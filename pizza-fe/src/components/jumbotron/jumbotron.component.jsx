import React from "react";
import { Link } from "react-router-dom";

import { Jumbotron } from 'reactstrap';

import "./jumbotron.styles.scss";


const PizzaJumbotron = () => (
  <Jumbotron className="jumbotron-container">
    <section className="jumbotron-text-content">
      <h1 className="jumbotron-header text-center">
        50 <span className="jumbotron-mobile-none">‧ </span> 
        <Link to="/menu" className="jumbotron-mobile-none">
          <img src="/static/logo_small.gif" alt="logo" />
        </Link>
        <span className="jumbotron-mobile-none"> ‧</span>  years
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
          <span className="jumbotron-mobile-none"> Oh, and always remember:</span>
        </p>
        <p className="text-center jumbotron-bold-text jumbotron-mobile-none">
          eat ‧ more ‧ pizz
          <img src="/static/pizza-icon.png" alt="pizza-icon" />
          !
        </p>
      </section>
  </Jumbotron>
);

export default PizzaJumbotron;