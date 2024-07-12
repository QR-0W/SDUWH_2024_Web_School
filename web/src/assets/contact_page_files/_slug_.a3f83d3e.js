import{_ as j,c as G,a as U}from"./Footer.e6485fe5.js";import{_ as q}from"./HeroMeta.7906402e.js";import{_ as P,d as J,b as K}from"./usePageTransition.c85436b5.js";import{o as n,c as l,b as r,F as b,m as c,a as k,p as M,q as L,k as T,i as u,t as C,G as x,h as $,T as H,K as Q,M as X,r as Y,g as D,N as Z,d as a,J as A,j as I,f as tt,w as et,s as at,R as nt,L as st}from"./entry.b64d388a.js";import{o as ot,u as lt,b as ct,_ as it,a as rt}from"./Blocks.44438b3b.js";import{c as mt,_ as dt,b as _t}from"./Landing.df64328f.js";import{_ as ut}from"./List.4457a9db.js";import{_ as pt}from"./BlockTimedTabs.vue.d0651cc9.js";import{_ as ht,a as gt}from"./ResearchPublications.8d82d2af.js";import{s as O,u as yt,_ as ft}from"./useHeadSeo.d3db824e.js";import{u as B}from"./usePreviewToken.81b6aab9.js";import{u as kt}from"./useErrorPage.23109362.js";import"./Listing.a298d72a.js";import"./slugify.3ca60c52.js";import"./useResourceIndexData.dc2ced4d.js";/* empty css                   */import"./usePageLoading.6c7406d2.js";import"./lang.4a9029fb.js";const bt={name:"HeroSummary",props:{releaseSummary:{type:String,default:null},releaseWhyItMatters:{type:String,default:null},releaseSafety:{type:String,default:null}}},vt={key:0,class:"container"},Tt={class:"cols-container"},xt={class:"mt-spacing-6 f-body-1 md:w-6-cols lg:ml-2-cols lg:w-6-cols"},wt=r("h3",{class:"mt-spacing-4 f-meta-1 first:mt-0"},"Summary",-1),St=["innerHTML"],Pt=r("h3",{class:"mt-spacing-4 f-meta-1 first:mt-0"},"Why it matters",-1),Rt=["innerHTML"],Mt=r("h3",{class:"mt-spacing-4 f-meta-1 first:mt-0"},"Safety",-1),Lt=["innerHTML"];function Ct(e,i,t,m,p,s){return t.releaseSummary||t.releaseWhyItMatters||t.releaseSafety?(n(),l("div",vt,[r("div",Tt,[r("div",xt,[t.releaseSummary?(n(),l(b,{key:0},[wt,r("div",{innerHTML:t.releaseSummary},null,8,St)],64)):c("",!0),t.releaseWhyItMatters?(n(),l(b,{key:1},[Pt,r("div",{innerHTML:t.releaseWhyItMatters},null,8,Rt)],64)):c("",!0),t.releaseSafety?(n(),l(b,{key:2},[Mt,r("div",{innerHTML:t.releaseSafety},null,8,Lt)],64)):c("",!0)])])])):c("",!0)}const At=P(bt,[["render",Ct]]),Bt={name:"HeroWrapper",props:{data:{type:Object,default:null},name:{type:String,default:"Generic"},pageTheme:{type:String,default:"light-gray"}},setup(e){return{options:ot}}},Et={key:0,class:"container"},$t={class:"cols-container"},Ht=r("h2",{class:"f-heading-3"},"Abstract",-1),Dt={class:"ui-richtext mt-spacing-4"};function It(e,i,t,m,p,s){const _=j,o=q,g=At,d=G;return t.data?(n(),l("div",{key:0,class:T(t.pageTheme&&t.pageTheme!=="light-gray"?`theme-${t.pageTheme} pb-spacing-7`:null)},[k(_,{name:t.name,image:t.data.coverImage,intro:t.data.description,"intro-rich-text":t.data.descriptionRichText,template:t.data.template,title:t.data.title,theme:t.data.colorTheme,differenceMode:t.data.heroBlendMode&&t.data.heroBlendMode==="difference"},null,8,["name","image","intro","intro-rich-text","template","title","theme","differenceMode"]),k(o,M(L(t.data.meta)),null,16),k(g,M(L(t.data.summary)),null,16),t.data.publicationAbstractRichText?(n(),l("div",Et,[r("div",$t,[r("div",{class:T(`f-body-2 md:w-6-cols lg:ml-2-cols lg:w-6-cols ${t.data.meta.authors||t.data.meta.links&&t.data.meta.links.find(h=>h.href!==null)||t.data.meta.tags.length>0?"mt-spacing-7":"mt-0"}`)},[Ht,r("div",Dt,[t.data.publicationAbstractRichText?(n(),u(d,{key:0,content:t.data.publicationAbstractRichText,options:m.options},null,8,["content","options"])):c("",!0)])],2)])])):c("",!0)],2)):c("",!0)}const Ot=P(Bt,[["render",It]]);let E=0;const Wt={name:"CitationLinks",props:{title:{type:String,default:null},columns:{type:Array,default(){return[]}}},data(){return E+=1,{}},computed:{listId(){return`citationList${E}`},randomizedColumns(){return this.columns.map(e=>e.map(i=>({...i,links:i.random?i.links.sort(()=>.5-Math.random()):i.links})))}}},zt={class:"container"},Ft={class:"mt-spacing-7 border-t border-primary pt-8 lg:pt-12"},Nt={class:"cols-container"},Vt={class:"xs:w-6-cols md:w-2-cols lg:w-2-cols"},jt={key:0,class:"f-subhead-2"},Gt={key:0,class:"mt-40 xs:w-6-cols md:w-6-cols md:mt-0 lg:w-10-cols"},Ut={class:"cols-container"},qt={class:"cols-container"},Jt={key:0,class:"f-subhead-2"},Kt={key:1},Qt={key:2,class:"f-caption-1 mt-8"};function Xt(e,i,t,m,p,s){const _=U;return n(),l("div",zt,[r("div",Ft,[r("div",Nt,[r("div",Vt,[t.title?(n(),l("h3",jt,C(t.title),1)):c("",!0)]),s.randomizedColumns&&s.randomizedColumns.length?(n(),l("div",Gt,[r("div",Ut,[(n(!0),l(b,null,x(s.randomizedColumns,(o,g)=>(n(),l("div",{key:g,class:T(["xs:w-6-cols md:w-6-cols lg:w-4-cols",{"xs:mt-40 md:mt-48 lg:ml-1-cols lg:mt-0":g===1}])},[r("div",qt,[(n(!0),l(b,null,x(o,(d,h)=>(n(),l("div",{key:h,class:T(["xs:w-3-cols md:w-2-cols lg:w-2-cols",{"md:ml-1-cols lg:ml-0 lg:pl-gutter":h===1}])},[d.title?(n(),l("h4",Jt,C(d.title),1)):c("",!0),d.links?(n(),l("ul",Kt,[(n(!0),l(b,null,x(d.links,(y,v)=>(n(),l("li",{class:T([{"mt-4":v!==0},{"mt-4":v===0&&d.title}]),key:v},[k(_,{label:y.text,url:y.url,modifier:"underline"},null,8,["label","url"])],2))),128))])):c("",!0),d.random?(n(),l("p",Qt," (Order randomized each pageload) ")):c("",!0)],2))),128))])],2))),128))])])):c("",!0)])])])}const Yt=P(Wt,[["render",Xt]]);function Zt(e){var m,p,s,_;const{$helpers:i}=$(),t=e.template===H?Q:X;return{type:e.type,id:e.id,acknowledgments:e.acknowledgments,authors:i.researchPublications.authors(e),blocks:(m=e.blocks)==null?void 0:m.default,chapters:e.chapters,contentTypes:e.contentTypes,coverImage:((s=(p=e.media)==null?void 0:p.cover)==null?void 0:s.length)&&e.media.cover[0][t],description:e.description,descriptionRichText:e.descriptionRichText,heroBlendMode:e.heroBlendMode,meta:{date:e.publicationDateFormatted,links:i.researchPublications.links(e),tags:i.researchPublications.tags(e)},models:e.models,publicationAbstract:e.publicationAbstract,publicationAbstractRichText:e.publicationAbstractRichText,publicationDate:e.publicationDate,publicationDateFormatted:e.publicationDateFormatted,recirculationBlocks:(_=e.blocks)==null?void 0:_.recirculation,summary:{releaseSummary:e.releaseSummary,releaseWhyItMatters:e.releaseWhyItMatters,releaseSafety:e.releaseSafety},template:e.template,title:e.heroTitle??e.title,colorTheme:e.colorTheme,seo:e.seo,slug:e.slug,topics:e.topics,citations:[...e.footnotes,...e.references]}}const te={key:2,class:"ui-recirc"},ee={__name:"ResearchPublication",props:{data:Object},setup(e){var d;const i=e,{footnotes:t,references:m,setCitations:p}=lt(),s=J(),_=Y(null),o=Zt(i.data);p(o.citations),D(()=>{O(i.data)}),s.value=[Z,H].includes((d=o.value)==null?void 0:d.template)?"feature":"simple";function g(h){_.value=h}return(h,y)=>{const v=Ot,w=mt,S=it,R=ut,W=pt,z=Yt,F=ht,N=gt,V=rt;return n(),l("div",null,[k(v,{data:a(o),pageTheme:a(o).colorTheme,name:"Article"},null,8,["data","pageTheme"]),r("div",{class:"relative bg-[color:white]",style:A(a(o).chapters?`padding-top: calc(${a(_)}px + var(--spacing-spacing-7))`:"")},[a(o).chapters?(n(),u(w,{key:0,blocks:a(o).blocks,sticky:!0,onSetPadding:g},null,8,["blocks"])):c("",!0),k(S,{blocks:a(o).blocks,class:T(a(o).citations.length||a(o).authors.length||a(o).acknowledgments?"ui-blocks--padded":""),style:A(a(o).chapters?`margin-top: calc(-1 * (${a(_)}px + var(--spacing-spacing-7)))`:"")},null,8,["blocks","class","style"])],4),k(W,null,{default:I(()=>[a(t)&&a(t).length?(n(),u(R,{key:0,title:"Footnotes",list:a(t),"counter-type":"alphabet","list-type":"footnotes"},null,8,["list"])):c("",!0),a(m)&&a(m).length?(n(),u(R,{key:1,title:"References",list:a(m),"list-type":"references"},null,8,["list"])):c("",!0)]),_:1}),a(o).authors.every(f=>f.length===0)?c("",!0):(n(),u(z,{key:0,title:"Authors",columns:a(o).authors},null,8,["columns"])),Object.values(a(o).acknowledgments).every(f=>f===null||f==="")?c("",!0):(n(),u(F,{key:1,title:"Acknowledgments",content:a(o).acknowledgments},null,8,["content"])),k(N,{topics:a(o).topics,exclude:[a(o).id]},null,8,["topics","exclude"]),a(o).recirculationBlocks?(n(),l("div",te,[(n(!0),l(b,null,x(a(o).recirculationBlocks,f=>(n(),l("div",{class:T(a(ct)(f,a(o).recirculationBlocks))},[f.blockType==="feature-1up"?(n(),u(V,{key:0,block:f},null,8,["block"])):c("",!0)],2))),256))])):c("",!0)])}}},be={__name:"[slug]",async setup(e){var o,g;let i,t;const m=tt(),{$api:p}=$(),{data:s,error:_}=([i,t]=et(()=>K(`research-publicaton-or-landing-${m.params.slug}`,()=>Promise.all([p.researchPublicationBySlug({slug:m.params.slug,preview:B().value}),p.landingBySlug({slug:m.params.slug,scope:"research",preview:B().value})]).then(([d,h])=>{const y=d||h;return y||at({statusCode:400,message:"Page not found"}),y}))),i=await i,t(),i);return kt({data:s,error:_}),yt({title:(o=s==null?void 0:s.value)==null?void 0:o.title,seo:(g=s==null?void 0:s.value)==null?void 0:g.seo}),D(()=>{O(s==null?void 0:s.value)}),(d,h)=>{const y=ee,v=dt,w=_t,S=ft;return a(_)?c("",!0):(n(),u(S,{key:0,id:`${a(s).type}-${a(s).slug}`},{default:I(()=>[a(s).type===nt?(n(),u(y,{key:0,data:a(s)},null,8,["data"])):a(s).type===st?(n(),l(b,{key:1},[a(s).template==="detail"?(n(),u(v,{key:0,data:a(s)},null,8,["data"])):(n(),u(w,{key:1,data:a(s),brand:!0},null,8,["data"]))],64)):c("",!0)]),_:1},8,["id"]))}}};export{be as default};