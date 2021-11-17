(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{391:function(e,t,r){"use strict";r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return d})),r.d(t,"d",(function(){return l}));var n=r(9),c=r(39),s=r.n(c),i=r(22),a=function(){return function(e){e(j()),s.a.get("/orders").then((function(t){return e({type:n.s,payload:t.data})})).catch((function(t){return e(Object(i.b)(t.response.data,t.response.status))}))}},o=function(e){return function(t){s.a.post("/add_order",e).then((function(e){return t({type:n.d,payload:e.data})})).catch((function(e){console.log("catch block error"),t(Object(i.b)(e.response.data,e.response.status,"ORDER_ADD_FAIL"))}))}},d=function(e){return function(t){console.log("Id of Order",e);var r=JSON.stringify({id:e});console.log("Action Order Id",e),s.a.post("/delete_order",r,{headers:{"Content-Type":"application/json"}}).then((function(r){return t({type:n.k,payload:e})})).catch((function(e){return t(Object(i.b)(e.response.data,e.response.status))}))}},l=function(e){var t=e.id,r=e.product_id,c=e.customer_id,a=e.by_user_id,o=e.quantity,d=e.total,l=e.payment;return function(e){console.log("Id of ORDER",t);var j=JSON.stringify({id:t,product_id:r,customer_id:c,by_user_id:a,quantity:o,total:d,payment:l});console.log("Action Order Id",t),s.a.post("/update_order",j,{headers:{"Content-Type":"application/json"}}).then((function(t){return e({type:n.F,payload:t.data})})).catch((function(t){return e(Object(i.b)(t.response.data,t.response.status))}))}},j=function(){return{type:n.z}}},392:function(e,t,r){"use strict";r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return d}));var n=r(9),c=r(39),s=r.n(c),i=r(22),a=function(){return function(e){e(l()),s.a.get("/customers").then((function(t){return e({type:n.p,payload:t.data})})).catch((function(t){return e(Object(i.b)(t.response.data,t.response.status))}))}},o=function(e){return function(t){s.a.post("/add_customer",e).then((function(e){return t({type:n.b,payload:e.data?e.data:{}})})).catch((function(e){return t(Object(i.b)(e.response.data,e.response.status))}))}},d=function(e){return function(t){console.log("Id of Customer",e);var r=JSON.stringify({id:e});console.log("Action Order Id",e),s.a.post("/delete_customer",r,{headers:{"Content-Type":"application/json"}}).then((function(r){return t({type:n.i,payload:e})})).catch((function(e){return t(Object(i.b)(e.response.data,e.response.status))}))}},l=function(){return{type:n.h}}},402:function(e,t,r){},413:function(e,t,r){"use strict";r.r(t);var n=r(38),c=r(87),s=r(1),i=r(20),a=r(391),o=r(31),d=r(392),l=r(19),j=r(389),u=r(379),h=r(196),p=r(376),b=r(383),m=r(388),O=r(380),x=r(197),y=r(17),g=r(12),f=r(73),v=r(10),_=r(11),C=r(14),S=r(15),k=r(384),I=r(377),w=r(385),q=r(26),P=r(35),A=r(18),L=r(22),R=r(37),F=r(16),T=r(370),z=r(364),D=r(0),B=F.b({quantity:F.a().positive().integer().min(1,"Price Should be More Than 1").max(1e3,"Price Should be Less Than 500K"),payment1:F.a().positive().integer().min(1,"Choose Any Payment Status")}),N=function(e){Object(C.a)(r,e);var t=Object(S.a)(r);function r(){var e;Object(v.a)(this,r);for(var c=arguments.length,s=new Array(c),i=0;i<c;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={modal:!1,product_id:"",customer_id:"",by_user_id:"",quantity:0,total:0,payment:0,msg:null,isUpdate:!1},e.toggle=function(){e.props.clearErrors(),console.log("Props",e.props),e.setState({modal:!e.state.modal})},e.onChange=function(t){e.setState(Object(n.a)({},t.target.name,t.target.value))},e}return Object(_.a)(r,[{key:"componentDidMount",value:function(){var e=this.props.order,t=(e.id,e.product_id),r=e.customer_id,n=e.by_user_id,c=e.quantity,s=e.total,i=e.payment;this.setState({product_id:t,customer_id:r,quantity:c,by_user_id:n,total:s,payment:i})}},{key:"componentDidUpdate",value:function(e){var t=this.props,r=t.error,n=t.isUpdate;r!==e.error&&("UPDATE_FAIL"===r.id?this.setState({msg:r.msg.msg}):this.setState({msg:null})),this.state.modal&&n&&(this.toggle(),this.props.loadUser())}},{key:"render",value:function(){var e=this;return console.log("product Edit Modal:",this.props.product),Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(T.a,{placement:"bottom",overlay:Object(D.jsx)(z.a,{id:"button-tooltip-2",children:"Edit Order"}),children:Object(D.jsx)(x.a,{style:{height:"31px",fontSize:"10px",padding:".5rem .5rem",margin:"0rem"},onClick:this.toggle,variant:"primary",size:"sm",children:Object(D.jsx)(y.a,{icon:g.o})})}),Object(D.jsxs)(k.a,{show:this.state.modal,onHide:this.toggle,children:[Object(D.jsx)(k.a.Header,{toggle:this.toggle,style:{color:"white",backgroundImage:'url("'.concat(P.a,'")'),backgroundSize:"32rem",backgroundRepeat:"no-repeat"},closeButton:!0,children:"Update"}),Object(D.jsxs)(k.a.Body,{children:[Object(D.jsx)(j.a,{style:{display:"flex"},children:Object(D.jsxs)(u.a,{style:{display:"flex",alignItems:"center"},children:[Object(D.jsxs)("div",{style:{display:"flex",width:"15rem"},children:[Object(D.jsx)(h.a,{style:{marginLeft:".5 rem"},children:Object(D.jsx)("img",{alt:"alt",style:{height:"80px",width:"80px"},src:this.props.product_img})}),Object(D.jsxs)(h.a,{style:{marginTop:"1rem",display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(D.jsx)("h7",{children:Object(D.jsx)("b",{children:this.props.product_name})}),Object(D.jsxs)("span",{style:{fontSize:"12px",color:"gray"},children:["Qnty:",this.props.order.quantity]})]})]}),Object(D.jsxs)("div",{style:{display:"flex",width:"15rem"},children:[Object(D.jsx)(h.a,{style:{marginLeft:"1rem"},children:Object(D.jsx)("img",{alt:"alt",style:{borderRadius:"50%",border:"2px solid #3b44c1",height:"50px",width:"50px"},src:this.props.customer_img})}),Object(D.jsx)(h.a,{style:{marginTop:".8rem",display:"flex",flexDirection:"column",alignItems:"center"},children:Object(D.jsx)("h7",{children:Object(D.jsx)("b",{children:this.props.customer_name})})})]})]})}),this.state.msg?Object(D.jsx)(I.a,{color:"danger",children:this.state.msg}):null,Object(D.jsx)(R.a,{validationSchema:B,initialValues:{quantity:this.state.quantity,total:this.state.quantity*this.props.product_price,payment1:"Completed"===this.state.payment?"1":"2",price:this.props.product_price},onSubmit:function(t){var r=t.quantity,n="1"===t.payment1?"Completed":"Pending",c={id:e.props.order.id,product_id:e.state.product_id,customer_id:e.state.customer_id,by_user_id:e.state.by_user_id,quantity:r,total:r*e.props.product_price,payment:n};console.log("Submit:",c),e.props.updateOrder(c),e.toggle(),setTimeout((function(){e.props.getOrders()}),1500)},children:function(t){var r=t.handleSubmit,n=t.handleChange,c=t.values,s=t.errors;return Object(D.jsxs)(w.a,{noValidate:!0,onSubmit:r,children:[Object(D.jsxs)(w.a.Row,{children:[Object(D.jsxs)(w.a.Group,{as:h.a,md:"6",controlId:"validationFormik01",children:[Object(D.jsx)(w.a.Label,{children:"Quantity"}),Object(D.jsx)(w.a.Control,{type:"text",placeholder:"",name:"quantity",value:c.quantity,onChange:n,isInvalid:!!s.quantity}),Object(D.jsx)(w.a.Control.Feedback,{type:"invalid",children:s.quantity})]}),Object(D.jsxs)(w.a.Group,{as:h.a,md:"6",controlId:"validationFormik01",children:[Object(D.jsx)(w.a.Label,{children:"Payment"}),Object(D.jsxs)(w.a.Control,{as:"select",placeholder:"",name:"payment1",value:c.payment1,onChange:n,isInvalid:!!s.payment1,children:[Object(D.jsx)("option",{value:"0",children:"Choose Payment"}),Object(D.jsx)("option",{value:"1",children:"Completed"}),Object(D.jsx)("option",{value:"2",children:"Pending"})]}),Object(D.jsx)(w.a.Control.Feedback,{type:"invalid",children:s.payment1})]})]}),Object(D.jsxs)(w.a.Row,{style:{fontWeight:"bold",color:"gray",border:"1px solid rgba(0,0,0,.125)",padding:".5rem",borderRadius:"5px",marginBottom:".5rem"},children:[Object(D.jsx)("h7",{children:"Total:"}),Object(D.jsx)("span",{children:Object(D.jsx)("b",{children:e.props.product_price})}),"X",Object(D.jsxs)("span",{children:[Object(D.jsx)("b",{children:c.quantity}),"=",Object(D.jsx)("b",{children:c.quantity*c.price})]})]}),Object(D.jsx)(x.a,{type:"submit",children:"Update"})]})}})]})]})]})}}]),r}(s.Component),E=Object(i.b)((function(e){return{error:e.error}}),{updateOrder:a.d,clearErrors:L.a,loginModalOpen:A.e,getOrders:a.c})(Object(q.j)(N)),U=r(200),G=r(40),Q=F.b({customer_id:F.a().positive().integer().min(1,"Choose Any Customer"),category_id:F.a().positive().integer().min(1,"Choose Any Category"),product_id:F.c().min(9,"Choose Any Product"),payment1:F.a().positive().integer().min(1,"Choose Any Payment Status"),quantity:F.a().integer().min(1,"Choose Atleast One Quantity").max(100,"Max 100 Allowed/Order")}),H=function(e){Object(C.a)(r,e);var t=Object(S.a)(r);function r(){var e;Object(v.a)(this,r);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(e=t.call.apply(t,[this].concat(c))).state={modal:!1,msg:null},e.toggle=function(){e.props.clearErrors(),e.setState({modal:!e.state.modal}),console.log("Toggle:",e.state.modal)},e}return Object(_.a)(r,[{key:"componentDidMount",value:function(){this.props.getCustomers(),this.props.getCategories(),this.props.getItems()}},{key:"componentDidUpdate",value:function(e){console.log("Add Order Called");var t=this.props.error;t!==e.error&&("UPDATE_FAIL"===t.id?this.setState({msg:t.msg.msg}):this.setState({msg:null}))}},{key:"render",value:function(){var e=this,t=(0===this.props.customers.length||this.props.customers,0===this.props.products.length?[]:this.props.products),r=0===this.props.categories.length?[]:this.props.categories,n=function(e,t){if("0"===e)return[];var n=function(e){return r.filter((function(t){return t.id===parseInt(e)}))[0].name}(e);return t.filter((function(e){return e.category===n}))},c=function(e){return"0"!==e?t.filter((function(t){return t.id===e}))[0].price:0};return console.log("User:",this.props.user),Object(D.jsxs)("div",{children:[Object(D.jsx)(U.a,{href:"#",onClick:this.toggle,children:Object(D.jsx)(x.a,{style:{paddingLeft:" 1.5rem",paddingRight:"1.5rem"},children:Object(D.jsx)("b",{children:"Add Order"})})}),Object(D.jsxs)(k.a,{show:this.state.modal,onHide:this.toggle,children:[Object(D.jsx)(k.a.Header,{style:{color:"white",backgroundImage:'url("'.concat(P.a,'")'),backgroundSize:"32rem",backgroundRepeat:"no-repeat"},closeButton:!0,children:Object(D.jsx)("b",{children:"Add Order"})}),Object(D.jsxs)(k.a.Body,{children:[this.state.msg?Object(D.jsx)(I.a,{color:"danger",children:this.state.msg}):null,Object(D.jsx)(R.a,{validationSchema:Q,initialValues:{customer_id:"0",product_id:"0",quantity:0,total:0,category_id:"0",payment1:"0"},onSubmit:function(t){var r=t.product_id,n=t.customer_id,s=t.quantity,i=t.payment1,a=e.props.user?e.props.user._id:9,o=1===parseInt(i)?"Completed":"Pending",d=s*c(r);console.log(r,n,a,s,d,o);var l={product_id:r,customer_id:n,by_user_id:a,quantity:s,total:d,payment:o};e.props.addOrder(l),e.toggle(),setTimeout((function(){e.props.getOrders()}),1500)},children:function(s){var i=s.handleSubmit,a=s.handleChange,o=s.values,d=s.errors;return Object(D.jsxs)(w.a,{noValidate:!0,onSubmit:i,children:[Object(D.jsxs)(w.a.Row,{children:[Object(D.jsxs)(w.a.Group,{as:h.a,md:"6",children:[Object(D.jsx)(w.a.Label,{children:"Customer"}),Object(D.jsxs)(w.a.Control,{as:"select",placeholder:"",name:"customer_id",value:o.customer_id,onChange:a,isInvalid:!!d.customer_id,children:[Object(D.jsx)("option",{value:"0",children:"Choose Customer"}),e.props.customers.map((function(e,t){return Object(D.jsx)("option",{value:e.id,children:e.fname+" "+e.lname})}))]}),Object(D.jsx)(w.a.Control.Feedback,{type:"invalid",children:d.customer_id})]}),Object(D.jsxs)(w.a.Group,{as:h.a,md:"6",children:[Object(D.jsx)(w.a.Label,{children:"Category"}),Object(D.jsxs)(w.a.Control,{as:"select",placeholder:"",name:"category_id",value:o.category_id,onChange:a,isInvalid:!!d.category_id,children:[Object(D.jsx)("option",{value:"0",children:"Choose Category"}),r.map((function(e,t){return Object(D.jsx)("option",{value:e.id,children:e.name})}))]}),Object(D.jsx)(w.a.Control.Feedback,{type:"invalid",children:d.category_id})]})]}),Object(D.jsx)(w.a.Row,{children:Object(D.jsxs)(w.a.Group,{as:h.a,md:"12",children:[Object(D.jsx)(w.a.Label,{children:"Product Under Choosen Category"}),Object(D.jsxs)(w.a.Control,{as:"select",placeholder:"",name:"product_id",value:o.product_id,onChange:a,isInvalid:!!d.product_id,children:[Object(D.jsx)("option",{value:"0",children:"Choose Product"}),n(o.category_id,t).map((function(e,t){return Object(D.jsxs)("option",{style:{fontWeight:"bold"},value:e.id,children:[" #",t+1," | ",e.name," | Price: \u20b9",e.price," | Stock: ",e.stock]})}))]}),Object(D.jsx)(w.a.Control.Feedback,{type:"invalid",children:d.product_id})]})}),Object(D.jsxs)(w.a.Row,{children:[Object(D.jsxs)(w.a.Group,{as:h.a,md:"6",children:[Object(D.jsx)(w.a.Label,{children:"Quantity"}),Object(D.jsx)(w.a.Control,{type:"number",placeholder:"Quantity",name:"quantity",value:o.quantity,onChange:a,isInvalid:!!d.quantity}),Object(D.jsx)(w.a.Control.Feedback,{type:"invalid",children:d.quantity})]}),Object(D.jsxs)(w.a.Group,{as:h.a,md:"6",children:[Object(D.jsx)(w.a.Label,{children:"Total"}),Object(D.jsx)(w.a.Control,{disabled:!0,type:"number",placeholder:"total",name:"total",value:0===o.quantity?o.total:o.quantity*parseInt(c(o.product_id)),onChange:a})]})]}),Object(D.jsx)(w.a.Row,{children:Object(D.jsxs)(w.a.Group,{as:h.a,md:"12",children:[Object(D.jsx)(w.a.Label,{children:"Payment"}),Object(D.jsxs)(w.a.Control,{as:"select",placeholder:"",name:"payment1",value:o.payment1,onChange:a,isInvalid:!!d.payment1,children:[Object(D.jsx)("option",{value:"0",children:"Choose Product"}),Object(D.jsx)("option",{value:"1",children:"Completed"}),Object(D.jsx)("option",{value:"2",children:"Pending"})]}),Object(D.jsx)(w.a.Control.Feedback,{type:"invalid",children:d.payment1})]})}),Object(D.jsx)(x.a,{type:"submit",children:"Add Order"})]})}})]})]})]})}}]),r}(s.Component),M=Object(i.b)((function(e){return{customers:e.customer.customers,products:e.item.items,categories:e.category.categories,user:e.auth.user,error:e.error}}),{loadUser:A.c,clearErrors:L.a,addOrder:a.a,getOrders:a.c,getCategories:G.a,getCustomers:d.c,getItems:o.d})(H);r(402),t.default=Object(i.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated,orders:e.order.orders,products:e.item.items,customers:e.customer.customers}}),{getOrders:a.c,getItems:o.d,getCustomers:d.c,deleteOrder:a.b})((function(e){var t,r,i,a=Object(s.useState)([]),o=Object(c.a)(a,2),d=o[0],v=o[1],_=Object(s.useState)(""),C=Object(c.a)(_,2),S=C[0],k=C[1],I=Object(s.useState)(!0),w=Object(c.a)(I,2),q=w[0],P=w[1],A=Object(s.useState)(!0),L=Object(c.a)(A,2),R=L[0],F=L[1],T=Object(s.useState)(!0),z=Object(c.a)(T,2),B=z[0],N=z[1],U=Object(s.useState)(!0),G=Object(c.a)(U,2),Q=G[0],H=G[1],J=Object(s.useState)(!0),W=Object(c.a)(J,2),K=(W[0],W[1],Object(s.useState)(!0)),V=Object(c.a)(K,2),X=V[0],Y=V[1];Object(s.useEffect)((function(){e.getCustomers(),e.getItems(),e.getOrders()}),[]),Object(s.useEffect)((function(){0!==e.orders.length&&v(e.orders)}),[e.orders,e.products]);var Z=function(t){return e.products.length>0?e.products.filter((function(e){return e.id===t}))[0].name:"Loading...."},$=function(t){if(e.customers.length>0){var r=e.customers.filter((function(e){return e.id===t}));return r[0].fname+" "+r[0].lname}return"Loading...."},ee=function(t){if(e.customers.length>0){var r=e.customers.filter((function(e){return e.id===t}));return console.log("Customer:",r,t),0===r[0].img.length?f.a:r[0].img}return"Loading...."},te=function(t){return e.products.length>0?e.products.filter((function(e){return e.id===t}))[0].img:"Loading...."},re=function(t){return e.products.length>0?e.products.filter((function(e){return e.id===t}))[0].price:"Loading...."},ne=function(e){return 0!==e.length?e.filter((function(e){return e.payment?-1!==e.payment.toLowerCase().indexOf(S.toLowerCase()):""})):""};return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(j.a,{style:{margin:"1rem",padding:"1rem"},children:Object(D.jsxs)(u.a,{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Object(D.jsx)(h.a,{sm:8,children:Object(D.jsx)(u.a,{children:Object(D.jsxs)(h.a,{style:{display:"flex",flexDirection:"column"},children:[Object(D.jsx)("h7",{children:Object(D.jsx)("b",{children:"Orders"})}),Object(D.jsx)("span",{style:{color:"gray"},children:"Pending/Completed Orders"})]})})}),Object(D.jsx)(h.a,{sm:2,children:Object(D.jsx)(M,{})})]})}),Object(D.jsxs)(j.a,{style:{margin:"1rem",padding:"0rem"},children:[Object(D.jsx)(p.a,{className:"order-list",children:Object(D.jsxs)(j.a.Header,{children:[Object(D.jsxs)("div",{className:"header-filter",children:[Object(D.jsxs)("div",{className:"search-bar",children:[Object(D.jsx)(y.a,{icon:g.z}),Object(D.jsx)("input",{type:"text",value:S,placeholder:"Search Orders By Payments Only...",onChange:function(e){k(e.target.value)}})]}),Object(D.jsx)("div",{className:"filter-icon",children:Object(D.jsx)(b.a,{title:Object(D.jsx)(y.a,{icon:g.r}),className:"filter-button",style:{borderRadius:"50%",background:"transparent",color:"#3c44b1",border:"none",boxShadow:"none"},children:Object(D.jsx)(u.a,{children:Object(D.jsx)("div",{children:Object(D.jsx)(j.a,{className:"filter-card",children:Object(D.jsx)(j.a.Body,{className:"filter-body",style:{width:"15rem",padding:"0rem"},children:Object(D.jsx)(m.a,{defaultActiveKey:"1",children:Object(D.jsxs)(j.a,{children:[Object(D.jsx)(m.a.Toggle,{style:{background:X?"#f3f3f3":"#fff"},eventKey:"1",onClick:function(){return Y(!X)},children:Object(D.jsxs)("div",{className:"accordion-header",children:[Object(D.jsx)("h6",{children:"Customize Columns"}),Object(D.jsx)(y.a,{style:{color:X?"red":"#3b44c1"},icon:X?g.i:g.h})]})}),Object(D.jsx)(m.a.Collapse,{eventKey:"1",children:Object(D.jsxs)(j.a.Body,{children:[Object(D.jsxs)(u.a,{children:[Object(D.jsxs)(h.a,{style:{display:"flex",paddingBottom:".3rem"},sm:6,children:[Object(D.jsx)("input",{style:{marginRight:".3rem"},type:"checkbox",checked:q,onChange:function(){return P(!q)}}),Object(D.jsx)("h6",{children:"Client"})]}),Object(D.jsxs)(h.a,(t={style:{display:"flex",paddingBottom:".3rem"},sm:6},Object(n.a)(t,"sm",6),Object(n.a)(t,"children",[Object(D.jsx)("input",{style:{marginRight:".3rem"},type:"checkbox",checked:R,onChange:function(){return F(!R)}}),Object(D.jsx)("h6",{children:"Product"})]),t))]}),Object(D.jsxs)(u.a,{children:[Object(D.jsxs)(h.a,(r={style:{display:"flex",paddingBottom:".3rem"},sm:6},Object(n.a)(r,"sm",6),Object(n.a)(r,"children",[Object(D.jsx)("input",{style:{marginRight:".3rem"},type:"checkbox",checked:Q,onChange:function(){return H(!Q)}}),Object(D.jsx)("h6",{children:"Total"})]),r)),Object(D.jsxs)(h.a,(i={style:{display:"flex",paddingBottom:".3rem"},sm:6},Object(n.a)(i,"sm",6),Object(n.a)(i,"children",[Object(D.jsx)("input",{style:{marginRight:".3rem"},type:"checkbox",checked:B,onChange:function(){return N(!B)}}),Object(D.jsx)("h6",{children:"Payment"})]),i))]})]})})]})})})})})})})})]}),Object(D.jsxs)(u.a,{style:{width:"105%",fontWeight:"bold",color:"#3b44c1"},children:[Object(D.jsx)(h.a,{sm:1,children:"Order"}),Object(D.jsx)(h.a,{style:{display:q?"":"none"},sm:3,children:"Client"}),Object(D.jsx)(h.a,{style:{display:R?"":"none"},sm:2,children:"Product"}),Object(D.jsx)(h.a,{style:{display:B?"":"none"},sm:2,children:"Payment"}),Object(D.jsx)(h.a,{style:{display:Q?"":"none"},sm:2,children:"Total"})]})]})}),Object(D.jsx)(p.a,{className:"order-list",children:0===d.length?Object(D.jsx)(p.a,{children:Object(D.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(D.jsx)(O.a,{style:{width:"5rem",height:"5rem"},animation:"border",variant:"primary"})})}):Object(D.jsx)(D.Fragment,{children:ne(d).map((function(t,r){return Object(D.jsxs)(j.a,{style:{padding:"0"},children:[Object(D.jsx)(j.a.Body,{children:Object(D.jsxs)(u.a,{style:{display:"flex",alignItems:"center"},children:[Object(D.jsx)(h.a,{sm:1,children:Object(D.jsx)("h7",{children:Object(D.jsxs)("b",{children:["#",r+1]})})}),Object(D.jsx)(h.a,{style:{display:q?"":"none"},sm:3,children:Object(D.jsxs)(u.a,{style:{display:"flex",alignItems:"center",width:"15rem"},children:[Object(D.jsx)("img",{style:{borderRadius:"50%",border:"2px solid #3b44c1",height:"50px",width:"50px"},src:ee(t.customer_id)}),Object(D.jsx)(h.a,{style:{display:"flex",flexDirection:"column"},children:Object(D.jsx)(l.b,{to:"/admin/customers",children:Object(D.jsx)("h7",{children:Object(D.jsx)("b",{children:$(t.customer_id)})})})})]})}),Object(D.jsx)(h.a,{style:{display:R?"":"none"},sm:2,children:Object(D.jsxs)(u.a,{style:{display:"flex",alignItems:"center",width:"15rem"},children:[Object(D.jsx)("img",{style:{height:"80px",width:"80px"},src:te(t.product_id)}),Object(D.jsxs)(h.a,{style:{display:"flex",flexDirection:"column"},children:[Object(D.jsx)(l.b,{to:"/admin/products",children:Object(D.jsx)("h7",{children:Object(D.jsx)("b",{children:Z(t.product_id)})})}),Object(D.jsxs)("span",{style:{color:"gray",fontSize:"12px"},children:["Qty:",Object(D.jsx)("b",{children:t.quantity})]})]})]})}),Object(D.jsx)(h.a,{style:{display:B?"":"none"},sm:2,children:Object(D.jsx)("h7",{style:{border:"Completed"===t.payment?"2px solid #1bc943":"2px solid #f83245",padding:"5px 15px",background:"Completed"===t.payment?"#e5f9ed":"#fff5f6",fontSize:"12px",fontWeight:"bold",color:"Pending"===t.payment?"#f83245":"#1bc943"},children:t.payment})}),Object(D.jsx)(h.a,{style:{display:Q?"":"none"},sm:2,children:Object(D.jsx)("h7",{style:{width:"10px"},children:Object(D.jsxs)("b",{children:["\u20b9",t.total]})})}),Object(D.jsxs)(h.a,{sm:2,style:{display:"flex",justifyContent:"space-around"},children:[Object(D.jsx)(E,{customer_img:ee(t.customer_id),product_price:re(t.product_id),customer_name:$(t.customer_id),product_img:te(t.product_id),product_name:Z(t.product_id),order:t}),Object(D.jsx)(x.a,{onClick:function(){return e.deleteOrder(t.id)},style:{height:"31px",fontSize:"10px",padding:".5rem .5rem",margin:"0rem"},variant:"danger",children:Object(D.jsx)(y.a,{icon:g.G})})]})]})}),Object(D.jsx)(j.a.Footer,{style:{padding:".2rem 2rem"},children:Object(D.jsxs)(u.a,{style:{color:"gray",fontSize:"10px",padding:"0rem"},children:[Object(D.jsx)("h7",{children:"Created On:"}),Object(D.jsx)("span",{children:Object(D.jsx)("b",{children:t.date})})]})})]})}))})}),Object(D.jsx)(p.a,{className:"order-grid",children:Object(D.jsx)(u.a,{children:0===d.length?Object(D.jsx)(p.a,{children:Object(D.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(D.jsx)(O.a,{style:{width:"5rem",height:"5rem"},animation:"border",variant:"primary"})})}):Object(D.jsx)(D.Fragment,{children:ne(d).map((function(t,r){return Object(D.jsxs)(j.a,{style:{width:"100%",padding:"0",margin:"1rem"},children:[Object(D.jsx)(j.a.Header,{children:Object(D.jsxs)(u.a,{style:{display:"flex",alignItems:"center",width:"15rem"},children:[Object(D.jsx)("img",{style:{borderRadius:"10px",border:"2px Solid #ebebeb",height:"90px",width:"90px"},src:te(t.product_id)}),Object(D.jsxs)(h.a,{style:{display:"flex",flexDirection:"column"},children:[Object(D.jsx)(l.b,{to:"/admin/products",children:Object(D.jsx)("h7",{children:Object(D.jsx)("b",{children:Z(t.product_id)})})}),Object(D.jsxs)("span",{style:{color:"gray",fontSize:"12px"},children:["Qty:",Object(D.jsx)("b",{children:t.quantity})]})]})]})}),Object(D.jsxs)(j.a.Body,{style:{color:"gray",fontSize:"12px"},children:[Object(D.jsx)(u.a,{children:Object(D.jsxs)(h.a,{children:[Object(D.jsx)("h7",{children:"Order:"}),Object(D.jsx)("span",{children:Object(D.jsxs)("b",{children:["#",r+1]})})]})}),Object(D.jsx)(u.a,{children:Object(D.jsx)(h.a,{children:Object(D.jsxs)("div",{children:[Object(D.jsx)("h7",{children:"Client:"}),Object(D.jsx)(l.b,{to:"/admin/customers",children:Object(D.jsx)("span",{children:Object(D.jsx)("b",{children:$(t.customer_id)})})})]})})}),Object(D.jsx)(u.a,{children:Object(D.jsx)(h.a,{children:Object(D.jsxs)("div",{children:[Object(D.jsx)("h7",{children:"Created On:"}),Object(D.jsx)("span",{children:Object(D.jsx)("b",{children:t.date})})]})})}),Object(D.jsxs)(u.a,{children:[Object(D.jsxs)(h.a,{children:[Object(D.jsx)("h7",{children:"Status:"}),Object(D.jsx)("span",{style:{border:"Completed"===t.payment?"1px solid #1bc943":"1px solid #f83245",padding:"1px 5px",background:"Completed"===t.payment?"#e5f9ed":"#fff5f6",fontSize:"10px",fontWeight:"bold",color:"Pending"===t.payment?"#f83245":"#1bc943"},children:t.payment})]}),Object(D.jsxs)(h.a,{children:[Object(D.jsx)("h7",{children:"Total:"}),Object(D.jsx)("span",{children:Object(D.jsxs)("b",{children:["\u20b9",t.total]})})]})]})]}),Object(D.jsx)(j.a.Footer,{className:"text-muted",children:Object(D.jsxs)(u.a,{style:{marginTop:".5rem",display:"flex",justifyContent:"space-around",width:"50%"},children:[Object(D.jsx)(E,{customer_img:ee(t.customer_id),product_price:re(t.product_id),customer_name:$(t.customer_id),product_img:te(t.product_id),product_name:Z(t.product_id),order:t}),Object(D.jsx)(x.a,{onClick:function(){return e.deleteOrder(t.id)},style:{height:"31px",fontSize:"10px",padding:".5rem .5rem",margin:"0rem"},variant:"danger",children:Object(D.jsx)(y.a,{icon:g.G})})]})})]},r)}))})})})]})]})}))}}]);
//# sourceMappingURL=4.ab3b6146.chunk.js.map