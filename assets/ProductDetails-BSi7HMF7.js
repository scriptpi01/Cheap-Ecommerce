import{e as x,f,r as i,j as e,q as j,w as v,c as y,g as b,d as C}from"./index-8owD9tSN.js";import{Q as w,B as p}from"./ReactToastify-BzDN3UPS.js";const O=()=>{const{productName:d}=x(),n=f(),[t,m]=i.useState(null),[r,h]=i.useState(1);if(i.useEffect(()=>{(async()=>{const s=j(y(C,"Products"),v("product_name","==",d)),a=await b(s);a.empty?(p.error("Product not found",{position:"bottom-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),n("/")):m(a.docs[0].data())})()},[d,n]),!t)return e.jsx("div",{children:"Loading..."});const u=o=>{let s=JSON.parse(localStorage.getItem("cart"))||[];const a={image:t.imageUrl,name:t.product_name,price:`$${t.price}`,quantity:r,totalPrice:parseFloat(t.price)*r},c=s.findIndex(g=>g.name===a.name);c>-1?(s[c].quantity+=r,s[c].totalPrice=parseFloat(t.price)*s[c].quantity):s.push(a),localStorage.setItem("cart",JSON.stringify(s)),window.dispatchEvent(new Event("storage")),p.success("Item added to cart!",{position:"bottom-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),o&&n("/cart")},l=o=>{const s=Math.max(1,r+o);h(s)};return e.jsxs("div",{className:"product-container",children:[e.jsx("div",{className:"product-image",children:e.jsx("img",{src:t.imageUrl,alt:t.product_name})}),e.jsxs("div",{className:"product-info",children:[e.jsx("h1",{children:t.product_name}),e.jsxs("h2",{children:["$",t.price]}),e.jsxs("p",{children:["Defect / Expired Date: ",t.defect_exp_date]}),e.jsxs("p",{children:["Seller: ",t.username||"Unknown"," ",e.jsx("br",{})," Description: ",t.product_detail]})," ",e.jsxs("div",{className:"quantity-controls-product",children:[e.jsx("button",{onClick:()=>l(-1),children:"-"}),e.jsx("span",{children:r}),e.jsx("button",{onClick:()=>l(1),children:"+"})]}),e.jsxs("div",{className:"actions",children:[e.jsx("button",{onClick:()=>u(!0),className:"buy-now",children:"Buy Now"}),e.jsx("button",{onClick:()=>u(!1),className:"add-to-cart",children:"Add to Cart"})]})]}),e.jsx(w,{position:"bottom-center",autoClose:3e3,hideProgressBar:!0,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0})]})};export{O as default};
