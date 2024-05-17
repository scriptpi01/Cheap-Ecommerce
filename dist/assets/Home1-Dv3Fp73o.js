import{j as e,r as c,u as b,b as E,d as v,h as A,c as N,i as R,q as k,w as U,g as Q}from"./index-9z2HV39b.js";const L=({id:i,name:u,expired:t,price:r,quantity:n,onClick:o,onDelete:l})=>e.jsxs("div",{className:"card1",children:[e.jsx("button",{className:"delete-button",onClick:d=>{d.stopPropagation(),l(i)},children:"X"}),e.jsx("div",{className:"card1-image",onClick:o,children:e.jsx("span",{children:u})}),e.jsxs("div",{className:"card1-details",children:[e.jsxs("div",{className:"expired",children:["Expired: ",t]}),e.jsxs("div",{className:"quantity",children:["Quantity: ",n]}),e.jsxs("div",{className:"price",children:["$",r]})]})]}),M=({onSave:i,onClose:u,initialData:t})=>{const[r,n]=c.useState(""),[o,l]=c.useState(""),[d,j]=c.useState(""),[h,y]=c.useState(""),[m,f]=c.useState(""),[x,P]=c.useState(""),[S,w]=c.useState(!1),{user:g}=b();c.useEffect(()=>{t&&(n(t.product_name||""),l(t.imageUrl||""),j(t.price||""),y(t.product_detail||""),f(t.defect_exp_date||""),P(t.quantity||""))},[t]);const C=async s=>{const p=N(v,"Products"),a=k(p,U("product_name","==",s));return!(await Q(a)).empty},_=async()=>{if(!g){alert("You are not logged in!");return}if(await C(r)&&(!t||t.product_name!==r)){alert("A product with the same name already exists. Please use a different name.");return}const p={product_name:r,imageUrl:o,price:d,product_detail:h,defect_exp_date:m,quantity:Number(x),username:g.username,uid:g.uid};try{if(t&&t.id){const a=E(v,"Products",t.id);await A(a,p)}else{const a=N(v,"Products");await R(a,p)}w(!0),setTimeout(()=>{u(),i(),navigate(0),window.location.reload()},2e3)}catch(a){console.error("Error saving product:",a),alert("Failed to save product: "+a.message)}},q=()=>r&&o&&d&&h&&m&&x;return e.jsx("div",{className:"modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsx("span",{className:"close",onClick:u,children:"×"}),e.jsx("h2",{children:t&&t.id?"Edit Product":"Add Product"}),e.jsx("input",{type:"text",placeholder:"Product Name",value:r,onChange:s=>n(s.target.value)}),e.jsx("input",{type:"text",placeholder:"Image URL",value:o,onChange:s=>l(s.target.value)}),e.jsx("input",{type:"text",placeholder:"Price",value:d,onChange:s=>j(s.target.value)}),e.jsx("textarea",{placeholder:"Description",value:h,onChange:s=>y(s.target.value)}),e.jsx("input",{type:"text",placeholder:"Expiration Date",value:m,onChange:s=>f(s.target.value)}),e.jsx("input",{type:"number",placeholder:"Quantity",value:x,onChange:s=>P(s.target.value)}),e.jsx("button",{onClick:_,disabled:!q(),children:"Save Product"}),S]})})};export{M as A,L as C};
