import{a as y,f as k}from"./Footer.e6485fe5.js";import{o as t,c as l,b as i,t as h,m as a,F as d,G as m,a as u,Q as w,k as b,e as v}from"./entry.b64d388a.js";const x={class:"container"},L={class:"xs:mt-96 md:mt-112 lg:mt-128 w-full border-t border-primary pt-8"},C={class:"cols-container"},_={class:"xs:w-6-cols md:w-2-cols lg:w-2-cols"},H={key:0,class:"f-meta-2"},S={key:0,class:"xs:w-6-cols xs:mt-spacing-4 md:w-3-cols md:mt-0 lg:w-5-cols"},A=i("h3",{id:"metaAuthorsHeading",class:"f-subhead-2"},"Authors",-1),p={key:0,"aria-labelledby":"metaAuthorsHeading"},j={key:1,id:"metaLinkListHeading",class:"sr-only"},B={key:2,"aria-labelledby":"metaLinkListHeading"},N={class:"md:w-1/2 only:w-full"},T={key:0,class:"mt-spacing-6 md:mt-4 md:w-1/2"},V={class:"flex h-[120px] w-[120px] lg:h-[144px] lg:w-[144px] items-center justify-center border border-secondary md:ml-auto"},$={name:"HeroMeta",props:{authors:{type:Array,default(){return[]}},date:{type:String,default:null},image:{type:Object,default:null},linksHeading:{type:String,default:"More resources"},links:{type:Array,default(){return[]}},tags:{type:Array,default(){return[]}}},computed:{validLinks(){return this.links.filter(e=>(e.href||e.url)&&(e.title||e.text))},renderSecondColumn(){return this.authors&&this.authors.length||this.validLinks&&this.validLinks.length}}},E=Object.assign($,{setup(e){function g(n){if(n){let c;try{c=document.querySelector(n)}catch{return}if(c){const r=document.documentElement.scrollTop+c.getBoundingClientRect().top;window.scrollTo({top:r-96,behavior:"smooth"})}}}return(n,c)=>{const r=y,f=k;return t(),l("div",x,[i("div",L,[i("div",C,[i("div",_,[e.date?(t(),l("span",H,h(e.date),1)):a("",!0)]),n.renderSecondColumn?(t(),l("div",S,[e.authors&&e.authors.length?(t(),l(d,{key:0},[A,e.authors&&e.authors.length?(t(),l("ul",p,[(t(!0),l(d,null,m(e.authors,(s,o)=>(t(),l("li",{class:"mt-4 first:mt-0",key:o},[u(r,{label:s.name,"icon-name":"ArrowDown400",url:`#${s.name.replace(" ","")}`,modifier:"underline",onClick:w(M=>g(`#${s.name.replace(" ","")}`),["prevent"])},null,8,["label","url","onClick"])]))),128))])):a("",!0)],64)):a("",!0),e.linksHeading&&n.validLinks.length?(t(),l("h3",j,h(e.linksHeading),1)):a("",!0),n.validLinks&&n.validLinks.length?(t(),l("ul",B,[(t(!0),l(d,null,m(n.validLinks,(s,o)=>(t(),l("li",{class:"mt-4 first:mt-0",key:o},[u(r,{label:s.title||s.text,url:s.href||s.url,modifier:"underline"},null,8,["label","url"])]))),128))])):a("",!0)])):a("",!0),e.tags&&e.tags.length||e.image?(t(),l("div",{key:1,class:b(["mt-spacing-4 xs:w-6-cols md:mt-0 md:flex md:flex-row",{"md:w-6-cols lg:w-10-cols":!n.renderSecondColumn,"md:w-3-cols lg:w-5-cols":n.renderSecondColumn}])},[i("div",N,[(t(!0),l(d,null,m(e.tags,(s,o)=>(t(),l("span",{key:o,class:"inline-block"},[u(r,{label:s.text,url:s.url,modifier:"underline"},null,8,["label","url"]),o!==e.tags.length-1?(t(),l(d,{key:0},[v(", ")],64)):a("",!0)]))),128))]),e.image?(t(),l("div",T,[i("div",V,[u(f,{ratio:"1x1",image:e.image,objectContain:!0,class:"block w-full"},null,8,["image"])])])):a("",!0)],2)):a("",!0)])])])}}});export{E as _};
