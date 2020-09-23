(this["webpackJsonpcourse-information"]=this["webpackJsonpcourse-information"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),u=t.n(c),o=t(4),l=t(2),i=t(3),m=t.n(i),s="api/persons",f=function(){return m.a.get(s).then((function(e){return e.data}))},d=function(e){return m.a.post(s,e).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},b=function(e,n){return m.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.message;return r.a.createElement("div",{className:n.success?"success":"failure"},n.content)},v=function(e){var n=e.persons,t=e.searchName,a=e.handleSearch,c=n.filter((function(e){return e.name.toUpperCase()===t.toUpperCase()}));return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:t,onChange:a}),c.map((function(e){return r.a.createElement("p",{key:e.name},r.a.createElement(w,{key:e.name,person:e}))})))},E=function(e){var n=e.newName,t=e.newNumber,a=e.handleSubmit,c=e.handleNameChange,u=e.handleNewNumberChange;return r.a.createElement("form",{onSubmit:a},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=function(e){var n=e.persons,t=e.handleDelete;return r.a.createElement("div",null,n.map((function(e){return r.a.createElement("div",{key:e.name},r.a.createElement("p",null,r.a.createElement(w,{person:e}),r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete")))})))},w=function(e){var n=e.person;return r.a.createElement(r.a.Fragment,null," ",n.name," ",n.number," ")},N=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],s=i[1],w=Object(a.useState)(""),N=Object(l.a)(w,2),j=N[0],O=N[1],C=Object(a.useState)(""),S=Object(l.a)(C,2),k=S[0],y=S[1],D=Object(a.useState)({content:"",success:null}),B=Object(l.a)(D,2),I=B[0],J=B[1];Object(a.useEffect)((function(){f().then((function(e){c(e)})).catch((function(e){U("Error, couldn't get the data :(",!1)}))}),[]);var U=function(e,n){J({content:e,success:n}),x(5e3)},x=function(e){setTimeout((function(){J({content:"",success:null})}),e)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),I.content?r.a.createElement(p,{message:I}):null,r.a.createElement(v,{persons:t,searchName:k,handleSearch:function(e){y(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(E,{newName:m,newNumber:j,handleSubmit:function(e){e.preventDefault();var n={name:m,number:j};if(Boolean(t.find((function(e){return e.name===m})))){if(window.confirm("".concat(m," is already added to phonebook, replace the old number with a new one?"))){var a=t.find((function(e){return e.name===m}));console.log(a);var r=Object(o.a)(Object(o.a)({},a),{},{number:j});b(a.id,r).then((function(e){c(t.map((function(n){return n.id!==a.id?n:e}))),U("".concat(a.name,"'s number has changed now."),!0),s(""),O("")})).catch((function(e){c(t.filter((function(e){return e!==a}))),U("Information of ".concat(a.name," has already been removed from the server."),!1),s(""),O("")}))}}else d(n).then((function(e){c(t.concat(e)),s(""),O(""),U("Added ".concat(m,"!"),!0)})).catch((function(e){U("Error, couldn't add this perosn :(",!1)}))},handleNameChange:function(e){s(e.target.value)},handleNewNumberChange:function(e){O(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(g,{persons:t,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));if(window.confirm("delete ".concat(n.name," ?")))return h(e).then((function(a){c(t.filter((function(n){return n.id!==e}))),U("Removed ".concat(n.name,"!"),!0)})).catch((function(a){c(t.filter((function(n){return n.id!==e}))),U("".concat(n.name," has already been removed from the server."),!1)}))}}))};t(37);u.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ee8179d1.chunk.js.map