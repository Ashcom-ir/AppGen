
import React from "react";
import {  } from "lucide-react";
import './ShoppingCart.scss';

export default function MotionShoppingCart(props) {
  return (
    <div className="motion-cart-wrapper">
      <ShoppingCart {...props} className={"motion-cart " + (props.className || "")} />
    </div>
  );
}
