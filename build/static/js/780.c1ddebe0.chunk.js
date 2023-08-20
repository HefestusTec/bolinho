"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[780],{780:function(e,t,o){o.r(t),o.d(t,{default:function(){return N}});var i=o(791),a={theme_selector:"configPage_theme_selector__t74Xp",animation_selector:"configPage_animation_selector__ey++U",global_limits:"configPage_global_limits__2fEha",other_selector:"configPage_other_selector__nBEEN"},c=o(413),l=o(885),n=o(986),s=o(708),r=o(787),u={button_group_div:"buttonGroup_button_group_div__RF88g",button:"buttonGroup_button__mf-ij",button_active:"buttonGroup_button_active__e9BDS",vertical_line:"buttonGroup_vertical_line__JUYJb"},m={custom_button:"buttonSingle_custom_button__BJ0fz"},_=o(184),d=function(e){var t=e.preIcon,o=e.postIcon,i=e.color,a=e.iconSize,c=e.children,l=e.className,n=e.buttonKey,s=e.clickCallBack,r={"--font_color":i},u={color:i||"#000000",width:a||"1em",height:a||"1em",verticalAlign:"middle"};return(0,_.jsxs)("button",{className:[l,m.custom_button].join(" "),style:r,onClick:function(){void 0!==s&&s(n)},children:[function(){if(t)return(0,_.jsx)(t.type,{style:u})}()," ",c," ",function(){if(o)return(0,_.jsx)(o.type,{style:u})}()]})},b=function(e){var t=e.currentActive,o=void 0===t?"1":t,i=e.options,a=void 0===i?["1","2"]:i,c=e.setCurrentActive,l=e.activeColor,n=void 0===l?"":l,s=e.inactiveColor,r=void 0===s?"":s,m=e.dividerColor,b=void 0===m?"":m,v=e.className,x=void 0===v?"":v,h=e.clickCallBack,f={"--active_color":n,"--inactive_color":r,"--divider_color":b},Z=function(e){void 0!==h?h(e):void 0!==c&&c(e)};return(0,_.jsx)("div",{className:[x,u.button_group_div].join(" "),style:f,children:a.map((function(e){return(0,_.jsx)(d,{buttonKey:e,color:" ",className:(t=e,t===o?[u.button_active,u.button].join(" "):u.button),clickCallBack:Z,children:e},e.toString());var t}))})};function v(e){var t=e.className,o=e.scaleOrigin,a=(0,i.useContext)(r.Z),u=(0,l.Z)(a,2),m=u[0],d=u[1],v=(0,i.useState)(m.theme),x=(0,l.Z)(v,2),h=x[0],f=x[1];return(0,_.jsx)(n.Z,{className:t,scaleOrigin:o,children:(0,_.jsx)(s.Z,{headerText:"Temas",children:(0,_.jsx)(b,{currentActive:h,clickCallBack:function(e){f(e),d((0,c.Z)((0,c.Z)({},m),{},{theme:e}))},options:["Claro","Escuro","Meia Noite"]})})})}var x={custom_checkbox_div:"customCheckbox_custom_checkbox_div__uFaaE",custom_button:"customCheckbox_custom_button__qTSwO"},h=function(e){var t=e.children,o=e.className,i=e.clickCallBack,a=e.checked,c=function(){void 0!==i&&i()};return(0,_.jsxs)("div",{className:[x.custom_checkbox_div,o].join(" "),children:[(0,_.jsx)("button",{className:x.custom_button,onClick:c,children:t}),(0,_.jsx)("input",{type:"checkbox",checked:a,onChange:c})]})},f=o(956);function Z(e){var t=e.className,o=e.scaleOrigin,a=(0,i.useContext)(r.Z),u=(0,l.Z)(a,2),m=u[0],d=u[1],b=(0,i.useState)(m.backgroundBlur),v=(0,l.Z)(b,2),x=v[0],Z=v[1],k=(0,i.useState)(m.shadows),g=(0,l.Z)(k,2),j=g[0],C=g[1],p=(0,i.useState)(m.enableHover),N=(0,l.Z)(p,2),S=N[0],T=N[1];return(0,_.jsx)(n.Z,{className:t,scaleOrigin:o,children:(0,_.jsxs)(s.Z,{headerText:"Efeitos visuais",children:[(0,_.jsx)(h,{clickCallBack:function(){Z(!x),d((0,c.Z)((0,c.Z)({},m),{},{backgroundBlur:!x}))},checked:x,children:"Desfocar fundo"}),(0,_.jsx)(h,{clickCallBack:function(){C(!j),d((0,c.Z)((0,c.Z)({},m),{},{shadows:!j}))},checked:j,children:"Sombras"}),(0,_.jsx)(f.Z,{keys:["R\xe1pido","Normal","Desligado"],clickCallBack:function(e){d((0,c.Z)((0,c.Z)({},m),{},{animationSpeed:e}))},selected:m.animationSpeed,children:"Anima\xe7\xf5es"}),(0,_.jsx)(h,{clickCallBack:function(){var e="enable"===S?"disable":"enable";T(e),d((0,c.Z)((0,c.Z)({},m),{},{enableHover:e}))},checked:"enable"===S,children:"Indicador de sele\xe7\xe3o"})]})})}var k=o(353),g=o(811),j=o(648),C=function(e){var t=e.className,o=e.scaleOrigin,a=(0,i.useContext)(r.Z),u=(0,l.Z)(a,2),m=u[0],d=u[1],b=(0,i.useState)(m.absoluteMaximumForce),v=(0,l.Z)(b,2),x=v[0],h=v[1],f=(0,i.useState)(m.absoluteMaximumTime),Z=(0,l.Z)(f,2),C=Z[0],p=Z[1],N=(0,i.useState)(m.absoluteMaximumTravel),S=(0,l.Z)(N,2),T=S[0],B=S[1],y=(0,i.useState)(!1),O=(0,l.Z)(y,2),M=O[0],w=O[1],F=(0,i.useState)(!1),E=(0,l.Z)(F,2),A=E[0],V=E[1],z=(0,i.useState)(!1),D=(0,l.Z)(z,2),G=D[0],K=D[1];return(0,i.useEffect)((function(){w(x!==m.absoluteMaximumForce),V(C!==m.absoluteMaximumTime),K(T!==m.absoluteMaximumTravel)}),[m,x,C,T]),(0,_.jsx)(n.Z,{className:t,scaleOrigin:o,children:(0,_.jsxs)(s.Z,{headerText:"Limites globais",children:[(0,_.jsxs)(g.Z,{children:[(0,_.jsx)(j.Z,{bgColor:"var(--positive_button_color)",fontColor:"var(--font_color_inverted)",clickCallBack:function(){d((0,c.Z)((0,c.Z)({},m),{},{absoluteMaximumForce:x,absoluteMaximumTime:C,absoluteMaximumTravel:T}))},children:"Salvar"}),(0,_.jsx)(j.Z,{bgColor:"var(--warning_button_color)",fontColor:"var(--font_color)",clickCallBack:function(){h(m.absoluteMaximumForce),p(m.absoluteMaximumTime),B(m.absoluteMaximumTravel)},children:"Carregar"})]}),(0,_.jsx)(k.Z,{title:"For\xe7a m\xe1xima",setValue:h,value:x,inputType:"number",suffix:"N",alert:M,alertColor:"var(--positive_button_color)"}),(0,_.jsx)(k.Z,{title:"Tempo m\xe1xima",setValue:p,value:C,inputType:"number",suffix:"s",alert:A,alertColor:"var(--positive_button_color)"}),(0,_.jsx)(k.Z,{title:"Desloc. m\xe1ximo",setValue:B,value:T,inputType:"number",suffix:"mm",alert:G,alertColor:"var(--positive_button_color)"})]})})};function p(e){var t=e.className,o=e.scaleOrigin,a=(0,i.useContext)(r.Z),u=(0,l.Z)(a,2),m=u[0],d=u[1],b=(0,i.useState)(m.forceVirtualKeyboard),v=(0,l.Z)(b,2),x=v[0],Z=v[1];return(0,_.jsx)(n.Z,{className:t,scaleOrigin:o,children:(0,_.jsxs)(s.Z,{headerText:"Outros",children:[(0,_.jsx)(f.Z,{keys:["50%","75%","100%","125%","150%","200%"],clickCallBack:function(e){d((0,c.Z)((0,c.Z)({},m),{},{fontSize:e}))},selected:m.fontSize,children:"Texto"}),(0,_.jsx)(h,{clickCallBack:function(){Z(!x),d((0,c.Z)((0,c.Z)({},m),{},{forceVirtualKeyboard:!x}))},checked:x,children:"Teclado virtual"})]})})}function N(){return(0,_.jsxs)(i.Fragment,{children:[(0,_.jsx)(v,{className:a.theme_selector,scaleOrigin:"top left"}),(0,_.jsx)(Z,{className:a.animation_selector,scaleOrigin:"top right"}),(0,_.jsx)(C,{className:a.global_limits,scaleOrigin:"bottom left"}),(0,_.jsx)(p,{className:a.other_selector,scaleOrigin:"bottom right"})]})}}}]);
//# sourceMappingURL=780.c1ddebe0.chunk.js.map