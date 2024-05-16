import React from 'react';
import '../styles/Card1.css';

const Card1 = ({ id, name, expired, price, quantity, onClick }) => {
  return (
    <div className="card1" onClick={onClick}>
      <div className="card1-image">
        <span>{name}</span>  
      </div>
      <div className="card1-details">
        <div className="expired">Expired: {expired}</div>  
        <div className="quantity">Quantity: {quantity}</div>
        <div className="price">${price}</div>
      </div>
    </div>
  );
};

export default Card1;
