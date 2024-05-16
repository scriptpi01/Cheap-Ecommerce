import{j as e,r,u as E,b,d as x,i as A,c as S,h as R,q as U,w as k,g as Q}from"./index-CaDHxqAo.js";const L=({id:v,name:d,expired:t,price:a,quantity:u,onClick:o})=>e.jsxs("div",{className:"card1",onClick:o,children:[e.jsx("div",{className:"card1-image",children:e.jsx("span",{children:d})}),e.jsxs("div",{className:"card1-details",children:[e.jsxs("div",{className:"expired",children:["Expired: ",t]}),e.jsxs("div",{className:"quantity",children:["Quantity: ",u]}),e.jsxs("div",{className:"price",children:["$",a]})]})]}),M=({onSave:v,onClose:d,initialData:t})=>{const[a,u]=r.useState(""),[o,g]=r.useState(""),[l,j]=r.useState(""),[p,y]=r.useState(""),[i,f]=r.useState(""),[h,P]=r.useState(""),[N,w]=r.useState(!1),{user:m}=E();r.useEffect(()=>{t&&(u(t.product_name||""),g(t.imageUrl||""),j(t.price||""),y(t.product_detail||""),f(t.defect_exp_date||""),P(t.quantity||""))},[t]);const C=async s=>{const n=S(x,"Products"),c=U(n,k("product_name","==",s));return!(await Q(c)).empty},_=async()=>{if(!m){alert("You are not logged in!");return}if(await C(a)&&(!t||t.product_name!==a)){alert("A product with the same name already exists. Please use a different name.");return}const n={product_name:a,imageUrl:o,price:l,product_detail:p,defect_exp_date:i,quantity:Number(h),username:m.username,uid:m.uid};try{if(t&&t.id){const c=b(x,"Products",t.id);await A(c,n)}else{const c=S(x,"Products");await R(c,n)}w(!0),setTimeout(()=>{d(),v(),window.location.reload()},2e3)}catch(c){console.error("Error saving product:",c),alert("Failed to save product: "+c.message)}},q=()=>a&&o&&l&&p&&i&&h;return e.jsx("div",{className:"modal",children:e.jsxs("div",{className:"modal-content",children:[e.jsx("span",{className:"close",onClick:d,children:"×"}),e.jsx("h2",{children:t&&t.id?"Edit Product":"Add Product"}),e.jsx("input",{type:"text",placeholder:"Product Name",value:a,onChange:s=>u(s.target.value)}),e.jsx("input",{type:"text",placeholder:"Image URL",value:o,onChange:s=>g(s.target.value)}),e.jsx("input",{type:"text",placeholder:"Price",value:l,onChange:s=>j(s.target.value)}),e.jsx("textarea",{placeholder:"Description",value:p,onChange:s=>y(s.target.value)}),e.jsx("input",{type:"text",placeholder:"Expiration Date",value:i,onChange:s=>f(s.target.value)}),e.jsx("input",{type:"number",placeholder:"Quantity",value:h,onChange:s=>P(s.target.value)}),e.jsx("button",{onClick:_,disabled:!q(),children:"Save Product"}),N]})})};export{M as A,L as C};
