import{f as l,j as e}from"./index-BxpQZju1.js";const i=()=>{const s=l(),o=JSON.parse(localStorage.getItem("checkout_cart"))||[],a=o.reduce((t,c)=>t+c.totalPrice,0),r=()=>{s("/home"),localStorage.removeItem("checkout_cart")};return e.jsxs("div",{className:"checkout-success",children:[e.jsx("h1",{children:"Checkout Successful!"}),e.jsx("h2",{children:"Your order has been placed."}),e.jsxs("div",{className:"order-details",children:[o.map((t,c)=>e.jsx("div",{className:"order-item",children:e.jsxs("p",{children:[t.name," - $",t.totalPrice.toFixed(2)]})},c)),e.jsxs("p",{className:"total",children:["Total: $",a.toFixed(2)]})]}),e.jsx("button",{style:{backgroundColor:"#4C9A2A",color:"white",padding:"10px 20px",borderRadius:"5px"},onClick:r,children:"Back to Home"})]})};export{i as default};