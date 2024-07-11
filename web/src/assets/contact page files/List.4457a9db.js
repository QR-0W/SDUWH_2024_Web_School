import{c as k,g as v}from"./Footer.e6485fe5.js";import{s as x,o as T}from"./Blocks.44438b3b.js";import{_ as w}from"./usePageTransition.c85436b5.js";import{o as e,c as s,b as l,t as C,m as c,F as u,G as p,k as S,a as f,d as B}from"./entry.b64d388a.js";let _=0;const L={name:"CitationList",props:{counterType:{type:String,default:"numeric",validator(t){return["numeric","alphabet"].includes(t)}},title:{type:String,default:null},link:{type:Object,default:null},list:{type:Array,default(){return[]}},listType:{type:String,default:null}},data(){return _+=1,{richTextOptions:{div:t=>({...t,type:"span"}),p:t=>({...t,type:"span"})}}},mounted(){this.$refs.footnote.forEach(t=>{const i=this.$refs.backlink.filter(r=>r.closest("li")===t),o=t.querySelector("p:last-of-type");i.forEach(r=>{r.classList.add("ml-2","no-underline"),r.style.textDecoration="none",r.style.top="2px",o.appendChild(r)}),o.querySelector("br.softbreak:last-of-type").remove()})},computed:{listId(){return this.listType==="footnotes"||this.listType==="references"?this.listType:`citationList${_}`},counterClass(){return this.counterType==="alphabet"?" [counter-increment:chapter] before:[content:counter(chapter,upper-alpha)]":" [counter-increment:step-counter] before:content-[counter(step-counter)]"}},methods:{scroll(t,i){x(t,i)}}},$={class:"container"},D={class:"mt-spacing-7 border-t border-primary pt-8 lg:pt-12"},E={class:"cols-container"},I={class:"xs:w-6-cols md:w-2-cols lg:w-2-cols"},N=["id"],V={class:"mt-40 xs:w-6-cols md:w-6-cols md:mt-0 lg:w-10-cols"},q={class:"f-body-1"},A=["aria-labelledby"],F=["id"],O=["href","onClick"],R={key:0,class:"mt-40 md:mt-48 lg:mt-60"};function j(t,i,o,r,z,a){const m=k,h=v;return e(),s("div",$,[l("div",D,[l("div",E,[l("div",I,[o.title?(e(),s("h3",{key:0,id:`${a.listId}Title`,class:"f-subhead-2"},C(o.title),9,N)):c("",!0)]),l("div",V,[l("div",q,[o.list?(e(),s("ol",{key:0,"aria-labelledby":`${a.listId}Title`,class:"-mt-spacing-3 list-none lg:columns-2 lg:gap-[var(--inner-gutter)]"},[(e(!0),s(u,null,p(o.list,(n,y)=>(e(),s(u,null,[n.text?(e(),s("li",{id:n.id?`fn-${n.id}`:null,class:S(["w-full target:bg-[color:var(--background-interactive-primary-hover)] mt-spacing-3 relative inline-block pl-48 before:absolute before:top-0 before:left-0 lg:pr-32 md:scroll-mt-96 scroll-mt-80",a.counterClass]),key:y,ref_for:!0,ref:"footnote"},[f(m,{content:n.richText,options:"options"in t?t.options:B(T),class:"[&_a]:break-all ui-richtext"},null,8,["content","options"]),(e(!0),s(u,null,p(n.backlinks,(d,b)=>(e(),s("a",{href:`#ref-${d}`,key:b,onClick:g=>a.scroll(g,`#ref-${d}`),ref_for:!0,ref:"backlink"},"↩︎",8,O))),128))],10,F)):c("",!0)],64))),256))],8,A)):c("",!0)]),o.link?(e(),s("div",R,[f(h,{label:"link.text",url:"link.url",modifier:"outline","icon-name":"ArrowDown400","icon-position":"last"})])):c("",!0)])])])])}const J=w(L,[["render",j]]);export{J as _};
