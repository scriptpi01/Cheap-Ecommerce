import{f as y,r as u,j as s,h as f,c as i,d as c,q as w,w as N,g as b}from"./index-CaDHxqAo.js";const C=()=>{const d=y(),[r,l]=u.useState(!1),[e,p]=u.useState({username:"",firstname:"",surname:"",email:"",password:"",confirmPassword:"",companyName:"",address:"",phoneNumber:""}),[h,o]=u.useState(!1),a=n=>{p({...e,[n.target.name]:n.target.value})},g=async n=>{const m=i(c,"Users"),t=w(m,N("username","==",n));return!(await b(t)).empty},x=async n=>{if(n.preventDefault(),e.password!==e.confirmPassword){alert("Passwords do not match");return}if(o(!0),await g(e.username)){alert("Username already exists. Please choose another username."),o(!1);return}try{const t={username:e.username,firstname:e.firstname,surname:e.surname,email:e.email,password:e.password,roles:r?["seller"]:["buyer"],phoneNumber:e.phoneNumber||"",address:e.address||"",companyName:r?e.companyName:""};await f(i(c,"Users"),t),d("/registration-success")}catch(t){console.error("Error adding document: ",t),alert("Error registering the user: "+t.message)}finally{o(!1)}};return s.jsxs("div",{className:"register-container",children:[s.jsxs("div",{className:"role-switcher",children:[s.jsx("button",{className:`role-button ${r?"":"active"}`,onClick:()=>l(!1),children:"Buyer"}),s.jsx("button",{className:`role-button ${r?"active":""}`,onClick:()=>l(!0),children:"Seller"})]}),s.jsxs("form",{className:"register-form",onSubmit:x,children:[r&&s.jsx("input",{type:"text",name:"companyName",value:e.companyName,onChange:a,placeholder:"Company Name"}),s.jsx("input",{type:"text",name:"username",value:e.username,onChange:a,placeholder:"Username",required:!0}),s.jsx("input",{type:"text",name:"firstname",value:e.firstname,onChange:a,placeholder:"First Name",required:!0}),s.jsx("input",{type:"text",name:"surname",value:e.surname,onChange:a,placeholder:"Surname",required:!0}),s.jsx("input",{type:"email",name:"email",value:e.email,onChange:a,placeholder:"Email",required:!0}),s.jsx("input",{type:"password",name:"password",value:e.password,onChange:a,placeholder:"Password",required:!0}),s.jsx("input",{type:"password",name:"confirmPassword",value:e.confirmPassword,onChange:a,placeholder:"Confirm Password",required:!0}),!r&&s.jsx("input",{type:"text",name:"phoneNumber",value:e.phoneNumber,onChange:a,placeholder:"Phone Number"}),!r&&s.jsx("input",{type:"text",name:"address",value:e.address,onChange:a,placeholder:"Address"}),s.jsx("button",{type:"submit",className:"register-button",disabled:h,children:r?"Register as Seller":"Register as Buyer"})]})]})};export{C as default};
