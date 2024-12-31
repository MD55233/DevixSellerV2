"use strict";(self.webpackChunklaikostar_seller=self.webpackChunklaikostar_seller||[]).push([[450],{3328:function(t,e,n){var a=n(7621),r=n(493),i=n(5484),o=n(653),s=n(7047),h=n(9900),l=n(184);e.Z=()=>(0,l.jsx)(a.Z,{sx:{p:2},children:(0,l.jsx)(r.Z,{sx:{py:0},children:(0,l.jsxs)(i.ZP,{alignItems:"center",disableGutters:!0,sx:{py:0},children:[(0,l.jsx)(o.Z,{children:(0,l.jsx)(s.Z,{variant:"rectangular",width:44,height:44})}),(0,l.jsx)(h.Z,{sx:{py:0},primary:(0,l.jsx)(s.Z,{variant:"rectangular",height:20}),secondary:(0,l.jsx)(s.Z,{variant:"text"})})]})})})},5450:function(t,e,n){n.r(e);var a=n(2791),r=n(1889),i=n(890),o=n(7621),s=n(9504),h=n(6934),l=n(2903),d=n(1527),c=n(3735),u=n(3328),g=n(184);const m=(0,h.ZP)(c.Z)((t=>{let{theme:e}=t;return{overflow:"hidden",position:"relative","&:after":{content:'""',position:"absolute",width:210,height:210,background:`linear-gradient(210.04deg, ${e.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,borderRadius:"50%",top:-30,right:-180},"&:before":{content:'""',position:"absolute",width:210,height:210,background:`linear-gradient(140.9deg, ${e.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,borderRadius:"50%",top:-160,right:-130}}}));e.default=t=>{let{isLoading:e}=t;const{username:n}=(0,d.a)(),[h,c]=(0,a.useState)([]);return(0,a.useEffect)((()=>{(async()=>{try{const t=await l.Z.get(`http://localhost:8001/api/user-accounts/${n}`);c(t.data)}catch(t){console.error("Error fetching accounts:",t)}})()}),[n]),(0,g.jsx)(g.Fragment,{children:e?(0,g.jsx)(u.Z,{}):(0,g.jsx)(m,{border:!1,content:!1,children:(0,g.jsxs)(r.ZP,{container:!0,spacing:3,justifyContent:"center",children:[(0,g.jsx)(r.ZP,{item:!0,xs:12,children:(0,g.jsx)(i.Z,{variant:"h3",gutterBottom:!0,sx:{color:"secondary.main",textAlign:"center",mt:2},children:"My Wallets"})}),h.map((t=>(0,g.jsx)(r.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,g.jsx)(o.Z,{children:(0,g.jsxs)(s.Z,{children:[(0,g.jsx)(i.Z,{variant:"h5",children:t.gateway}),(0,g.jsxs)(i.Z,{variant:"body1",children:["Account Number: ",t.accountNumber]}),(0,g.jsxs)(i.Z,{variant:"body1",children:["Account Title: ",t.accountTitle]})]})})},t._id)))]})})})}},7047:function(t,e,n){n.d(e,{Z:function(){return R}});var a=n(3366),r=n(7462),i=n(2791),o=n(9278),s=n(2554),h=n(4419);function l(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function d(t){return parseFloat(t)}var c=n(2065),u=n(6934),g=n(1402),m=n(5878),p=n(1217);function f(t){return(0,p.Z)("MuiSkeleton",t)}(0,m.Z)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var b=n(184);const v=["animation","className","component","height","style","variant","width"];let x,w,Z,y,j=t=>t;const k=(0,s.F4)(x||(x=j`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),C=(0,s.F4)(w||(w=j`
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
`)),S=(0,u.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],!1!==n.animation&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})((t=>{let{theme:e,ownerState:n}=t;const a=l(e.shape.borderRadius)||"px",i=d(e.shape.borderRadius);return(0,r.Z)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,c.Fq)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===n.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${a}/${Math.round(i/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===n.variant&&{borderRadius:"50%"},"rounded"===n.variant&&{borderRadius:(e.vars||e).shape.borderRadius},n.hasChildren&&{"& > *":{visibility:"hidden"}},n.hasChildren&&!n.width&&{maxWidth:"fit-content"},n.hasChildren&&!n.height&&{height:"auto"})}),(t=>{let{ownerState:e}=t;return"pulse"===e.animation&&(0,s.iv)(Z||(Z=j`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),k)}),(t=>{let{ownerState:e,theme:n}=t;return"wave"===e.animation&&(0,s.iv)(y||(y=j`
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
    `),C,(n.vars||n).palette.action.hover)}));var R=i.forwardRef((function(t,e){const n=(0,g.Z)({props:t,name:"MuiSkeleton"}),{animation:i="pulse",className:s,component:l="span",height:d,style:c,variant:u="text",width:m}=n,p=(0,a.Z)(n,v),x=(0,r.Z)({},n,{animation:i,component:l,variant:u,hasChildren:Boolean(p.children)}),w=(t=>{const{classes:e,variant:n,animation:a,hasChildren:r,width:i,height:o}=t,s={root:["root",n,a,r&&"withChildren",r&&!i&&"fitContent",r&&!o&&"heightAuto"]};return(0,h.Z)(s,f,e)})(x);return(0,b.jsx)(S,(0,r.Z)({as:l,ref:e,className:(0,o.Z)(w.root,s),ownerState:x},p,{style:(0,r.Z)({width:m,height:d},c)}))}))}}]);
//# sourceMappingURL=450.0bf5b524.chunk.js.map