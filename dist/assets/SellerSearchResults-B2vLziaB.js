import{e as R,r as o,A as v,j as u,c as C,q as x,w as y,g as q,b as A,d as l,h as M}from"./index-BrqEdAXV.js";import{C as _,A as D}from"./Home1-BQ8grlsj.js";const L=()=>{const{searchTerm:r}=R(),[d,i]=o.useState([]),[w,p]=o.useState([]),[P,n]=o.useState(!1),[E,f]=o.useState(null),{user:e}=o.useContext(v);o.useEffect(()=>{(async()=>{if(e&&e.uid){const s=C(l,"Products"),a=x(s,y("uid","==",e.uid)),m=(await q(a)).docs.map(c=>({id:c.id,...c.data()}));i(m)}})()},[e==null?void 0:e.uid]),o.useEffect(()=>{if(r){const t=r.toLowerCase(),s=d.filter(a=>a.product_name.toLowerCase().includes(t));p(s)}else p(d)},[r,d]);const g=t=>{f(t),n(!0)},j=()=>{n(!1),f(null)},I=async t=>{try{const s=A(l,"Products",t.id);await M(s,t),n(!1);const a=C(l,"Products"),h=x(a,y("uid","==",e.uid)),c=(await q(h)).docs.map(S=>({id:S.id,...S.data()}));i(c)}catch(s){console.error("Error saving product:",s),alert("Product added/updated successfully!")}};return u.jsxs("div",{className:"home1",children:[w.map(t=>u.jsx(_,{id:t.id,name:t.product_name,expired:t.defect_exp_date,price:t.price,quantity:t.quantity,imageUrl:t.imageUrl,onClick:()=>g(t)},t.id)),P&&u.jsx(D,{onSave:I,onClose:j,initialData:E})]})};export{L as default};
