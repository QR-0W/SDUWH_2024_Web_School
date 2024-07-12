import{a as $,_ as j}from"./Footer.e6485fe5.js";import{_ as q}from"./Blocks.44438b3b.js";import{_ as F,b as G}from"./usePageTransition.c85436b5.js";import{o as n,c as h,b as l,i as y,j as T,e as U,t as W,k as u,v as z,m as d,F as I,x as O,h as R,w as J,g as K,y as Q,d as o,a as m}from"./entry.b64d388a.js";import{_ as X}from"./Blog.4476b770.js";import{s as Y,u as Z,_ as ee}from"./useHeadSeo.d3db824e.js";import{u as N}from"./usePreviewToken.81b6aab9.js";import{u as te}from"./useErrorPage.23109362.js";import"./BlockTimedTabs.vue.d0651cc9.js";import"./Listing.a298d72a.js";import"./slugify.3ca60c52.js";import"./useResourceIndexData.dc2ced4d.js";import"./indexComponents.44e4cc59.js";import"./usePageLoading.6c7406d2.js";import"./lang.4a9029fb.js";const se=["primary","secondary","tertiary"],oe={props:{link:{type:Object,default:null},content:{type:String,default:null},contentLeft:{type:Boolean,default:!1},headingLevel:{type:Number,default:2},level:{type:String,default:"primary",validator(i){return se.includes(i)}},title:{type:String,default:null}},computed:{contentClass(){return this.level==="primary"?"f-subhead-1 xs:mt-16 md:mt-0":"f-body-1 xs:mt-16 md:mt-0"},headingClass(){return this.level==="secondary"?"f-heading-3":this.level==="tertiary"?"f-heading-5":"f-heading-1"}}},ne={class:"cols-container"},re={class:"xs:w-6-cols md:w-4-cols lg:w-6-cols"},ae={class:"xs:w-6-cols md:w-4-cols md:flex md:flex-col lg:w-6-cols"},le=["innerHTML"];function ie(i,r,e,_,f,t){const c=$;return n(),h("div",{class:u(`pt-spacing-3 mt-spacing-7 w-full border-t ${e.level==="primary"?"border-primary":"border-secondary"}`)},[l("div",ne,[l("div",re,[e.title?(n(),y(z(`h${e.headingLevel}`),{key:0,class:u(t.headingClass)},{default:T(()=>[U(W(e.title),1)]),_:1},8,["class"])):d("",!0)]),l("div",ae,[e.content||e.link?(n(),h(I,{key:0},[e.content?(n(),h("div",{key:0,class:u(t.contentClass),innerHTML:e.content},null,10,le)):d("",!0),e.link?(n(),y(c,{key:1,label:e.link.text,url:e.link.url,modifier:"underline",class:u(`block ${e.content?"mt-spacing-4":"xs:mt-24 md:mt-4 md:ml-auto lg:mt-8"}`)},null,8,["label","url","class"])):d("",!0)],64)):O(i.$slots,"content",{key:1})])])],2)}const ce=F(oe,[["render",ie]]),ue={class:"mt-spacing-7"},me={class:"container"},Be={__name:"index",async setup(i){var g,v,x,k;let r,e;const{$api:_,$twill:f}=R(),{data:t,error:c}=([r,e]=J(()=>G("blog-index",()=>{const s=f.find("blog-indices");return N().value&&s.query("preview",N().value),Promise.all([_.topicsWhereHas("blog-details"),_.authorsWhereHas("blog-details"),s.fetch()])},{transform:([s,a,p])=>({topics:s,authors:a,resource:f.transform(p).pop()})})),r=await r,e(),r);te({data:t,error:c}),K(()=>{var s;Y((s=t==null?void 0:t.value)==null?void 0:s.resource)}),Z({title:(v=(g=t.value)==null?void 0:g.resource)==null?void 0:v.title,seo:(k=(x=t.value)==null?void 0:x.resource)==null?void 0:k.seo});const V=Q(()=>{var s,a;return{topics:(s=t.value)==null?void 0:s.topics,authors:(a=t.value)==null?void 0:a.authors}});return(s,a)=>{const p=j,A=q,D=ce,P=X,M=ee;return o(c)?d("",!0):(n(),y(M,{key:0,id:"blog-index"},{default:T(()=>{var b,w,C,L,H,B,S,E;return[m(p,{name:"Generic",intro:(w=(b=o(t))==null?void 0:b.resource)==null?void 0:w.description,title:(L=(C=o(t))==null?void 0:C.resource)==null?void 0:L.title,theme:(H=o(t).resource)==null?void 0:H.colorTheme},null,8,["intro","title","theme"]),m(A,{blocks:(E=(S=(B=o(t))==null?void 0:B.resource)==null?void 0:S.blocks)==null?void 0:E.default,padded:!0},null,8,["blocks"]),l("div",ue,[l("div",me,[m(D,{title:"Latest updates"}),m(P,{filters:o(V)},null,8,["filters"])])])]}),_:1}))}}};export{Be as default};