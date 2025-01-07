"use strict";(self.webpackChunklaikostar_seller=self.webpackChunklaikostar_seller||[]).push([[366],{1514:function(t,e,a){a.r(e),a.d(e,{default:function(){return R}});var n=a(2791),r=a(1889),i=a(890),o=a(4294),s=a(7621),l=a(9504),c=a(5289),d=a(5661),h=a(9157),u=a(7391),g=a(7123),m=a(6934),p=a(5488),x=a(2903),b=a(1527),f=a(6999),w=a(493),v=a(5021),Z=a(653),y=a(7047),j=a(9900),C=a(184);var k=()=>(0,C.jsx)(s.Z,{sx:{p:2},children:(0,C.jsx)(w.Z,{sx:{py:0},children:(0,C.jsxs)(v.ZP,{alignItems:"center",disableGutters:!0,sx:{py:0},children:[(0,C.jsx)(Z.Z,{children:(0,C.jsx)(y.Z,{variant:"rectangular",width:44,height:44})}),(0,C.jsx)(j.Z,{sx:{py:0},primary:(0,C.jsx)(y.Z,{variant:"rectangular",height:20}),secondary:(0,C.jsx)(y.Z,{variant:"text"})})]})})});const S=(0,m.ZP)(f.Z)((t=>{let{theme:e}=t;return{overflow:"hidden",position:"relative","&:after":{content:'""',position:"absolute",width:210,height:210,background:`linear-gradient(210.04deg, ${e.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,borderRadius:"50%",top:-30,right:-180},"&:before":{content:'""',position:"absolute",width:210,height:210,background:`linear-gradient(140.9deg, ${e.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,borderRadius:"50%",top:-160,right:-130}}}));var R=t=>{let{isLoading:e}=t;const a=(0,p.s0)(),{username:m}=(0,b.a)(),[f,w]=(0,n.useState)([]),[v,Z]=(0,n.useState)(!1),[y,j]=(0,n.useState)(null),[R,$]=(0,n.useState)({gateway:"",accountNumber:"",accountTitle:""});(0,n.useEffect)((()=>{(async()=>{try{const t=await x.Z.get(`http://localhost:8001/api/user-accounts/${m}`);w(t.data)}catch(t){console.error("Error fetching accounts:",t)}})()}),[m]);const N=t=>{const{name:e,value:a}=t.target;$((t=>({...t,[e]:a})))};return(0,C.jsxs)(C.Fragment,{children:[e?(0,C.jsx)(k,{}):(0,C.jsx)(S,{border:!1,content:!1,children:(0,C.jsxs)(r.ZP,{container:!0,spacing:3,justifyContent:"center",children:[(0,C.jsxs)(r.ZP,{item:!0,xs:12,sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,C.jsx)(i.Z,{variant:"h3",gutterBottom:!0,sx:{color:"secondary.main",mt:2,marginLeft:6},children:"My Wallets"}),(0,C.jsx)(o.Z,{variant:"contained",color:"primary",onClick:()=>{a("/wallet/add")},sx:{mt:2,marginRight:6},children:"Add Wallet"})]}),f.map((t=>(0,C.jsx)(r.ZP,{item:!0,xs:12,sm:6,md:4,sx:{marginRight:3,marginLeft:3},children:(0,C.jsx)(s.Z,{sx:{border:"1px solid #ccc",boxShadow:"0 2px 5px rgba(0,0,0,0.1)",padding:"16px"},children:(0,C.jsxs)(l.Z,{children:[(0,C.jsx)(i.Z,{variant:"h5",children:t.gateway}),(0,C.jsxs)(i.Z,{variant:"body1",children:["Account Number: ",t.accountNumber]}),(0,C.jsxs)(i.Z,{variant:"body1",children:["Account Title: ",t.accountTitle]}),(0,C.jsx)(o.Z,{variant:"outlined",color:"primary",sx:{marginRight:"8px",marginTop:"8px"},onClick:()=>(t=>{j(t),$({gateway:t.gateway||"",accountNumber:t.accountNumber||"",accountTitle:t.accountTitle||""}),Z(!0)})(t),children:"Edit"}),(0,C.jsx)(o.Z,{variant:"outlined",color:"error",sx:{marginTop:"8px"},onClick:()=>(async t=>{if(window.confirm("Are you sure you want to delete this wallet?"))try{await x.Z.delete(`http://localhost:8001/api/user-accounts/delete/${t}`),w(f.filter((e=>e._id!==t)))}catch(e){console.error("Error deleting account:",e)}})(t._id),children:"Delete"})]})})},t._id)))]})}),(0,C.jsxs)(c.Z,{open:v,onClose:()=>Z(!1),children:[(0,C.jsx)(d.Z,{children:"Edit Wallet"}),(0,C.jsxs)(h.Z,{children:[(0,C.jsx)(u.Z,{label:"Gateway",name:"gateway",fullWidth:!0,margin:"dense",value:R.gateway,onChange:N}),(0,C.jsx)(u.Z,{label:"Account Number",name:"accountNumber",fullWidth:!0,margin:"dense",value:R.accountNumber,onChange:N}),(0,C.jsx)(u.Z,{label:"Account Title",name:"accountTitle",fullWidth:!0,margin:"dense",value:R.accountTitle,onChange:N})]}),(0,C.jsxs)(g.Z,{children:[(0,C.jsx)(o.Z,{onClick:()=>Z(!1),children:"Cancel"}),(0,C.jsx)(o.Z,{onClick:async()=>{if(y)try{await x.Z.put(`http://localhost:8001/api/user-accounts/edit/${y._id}`,R),w((t=>t.map((t=>t._id===y._id?{...t,...R}:t)))),Z(!1),j(null)}catch(t){console.error("Error updating account:",t)}},color:"primary",children:"Save"})]})]})]})}},7047:function(t,e,a){a.d(e,{Z:function(){return R}});var n=a(3366),r=a(7462),i=a(2791),o=a(9278),s=a(2554),l=a(4419);function c(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function d(t){return parseFloat(t)}var h=a(2065),u=a(6934),g=a(1402),m=a(5878),p=a(1217);function x(t){return(0,p.Z)("MuiSkeleton",t)}(0,m.Z)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var b=a(184);const f=["animation","className","component","height","style","variant","width"];let w,v,Z,y,j=t=>t;const C=(0,s.F4)(w||(w=j`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),k=(0,s.F4)(v||(v=j`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),S=(0,u.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],!1!==a.animation&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})((t=>{let{theme:e,ownerState:a}=t;const n=c(e.shape.borderRadius)||"px",i=d(e.shape.borderRadius);return(0,r.Z)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,h.Fq)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===a.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${n}/${Math.round(i/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===a.variant&&{borderRadius:"50%"},"rounded"===a.variant&&{borderRadius:(e.vars||e).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})}),(t=>{let{ownerState:e}=t;return"pulse"===e.animation&&(0,s.iv)(Z||(Z=j`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),C)}),(t=>{let{ownerState:e,theme:a}=t;return"wave"===e.animation&&(0,s.iv)(y||(y=j`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),k,(a.vars||a).palette.action.hover)}));var R=i.forwardRef((function(t,e){const a=(0,g.Z)({props:t,name:"MuiSkeleton"}),{animation:i="pulse",className:s,component:c="span",height:d,style:h,variant:u="text",width:m}=a,p=(0,n.Z)(a,f),w=(0,r.Z)({},a,{animation:i,component:c,variant:u,hasChildren:Boolean(p.children)}),v=(t=>{const{classes:e,variant:a,animation:n,hasChildren:r,width:i,height:o}=t,s={root:["root",a,n,r&&"withChildren",r&&!i&&"fitContent",r&&!o&&"heightAuto"]};return(0,l.Z)(s,x,e)})(w);return(0,b.jsx)(S,(0,r.Z)({as:c,ref:e,className:(0,o.Z)(v.root,s),ownerState:w},p,{style:(0,r.Z)({width:m,height:d},h)}))}))}}]);
//# sourceMappingURL=366.4182994e.chunk.js.map