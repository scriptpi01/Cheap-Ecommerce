import React from 'react';
import '../styles/Card1.css';

const Card1 = ({ id, name, expired, price, quantity, onClick, onDelete }) => {
  return (
    <div className="card1">
      <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>X</button>
      <div className="card1-image" onClick={onClick}>
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
