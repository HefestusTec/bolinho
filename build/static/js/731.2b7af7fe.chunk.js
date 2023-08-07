"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[731],{731:function(e,t,o){o.r(t),o.d(t,{default:function(){return L}});var i=o(791),n={theme_selector:"configPage_theme_selector__t74Xp",animation_selector:"configPage_animation_selector__ey++U",global_limits:"configPage_global_limits__2fEha",other_selector:"configPage_other_selector__nBEEN"},c=o(413),a=o(885),s=o(986),l=o(708),r=o(787),u={button_group_div:"buttonGroup_button_group_div__RF88g",button:"buttonGroup_button__mf-ij",button_active:"buttonGroup_button_active__e9BDS",vertical_line:"buttonGroup_vertical_line__JUYJb"},_={custom_button:"buttonSingle_custom_button__BJ0fz"},d=o(184),m=function(e){var t=e.preIcon,o=e.postIcon,i=e.color,n=e.iconSize,c=e.children,a=e.className,s=e.buttonKey,l=e.clickCallBack,r={"--font_color":i},u={color:i||"#000000",width:n||"1em",height:n||"1em",verticalAlign:"middle"};return(0,d.jsxs)("button",{className:[a,_.custom_button].join(" "),style:r,onClick:function(){void 0!==l&&l(s)},children:[function(){if(t)return(0,d.jsx)(t.type,{style:u})}()," ",c," ",function(){if(o)return(0,d.jsx)(o.type,{style:u})}()]})},v=function(e){var t=e.currentActive,o=void 0===t?"1":t,i=e.options,n=void 0===i?["1","2"]:i,c=e.setCurrentActive,a=e.activeColor,s=void 0===a?"":a,l=e.inactiveColor,r=void 0===l?"":l,_=e.dividerColor,v=void 0===_?"":_,x=e.className,f=void 0===x?"":x,b=e.clickCallBack,h={"--active_color":s,"--inactive_color":r,"--divider_color":v},p=function(e){void 0!==b?b(e):void 0!==c&&c(e)};return(0,d.jsx)("div",{className:[f,u.button_group_div].join(" "),style:h,children:n.map((function(e){return(0,d.jsx)(m,{buttonKey:e,color:" ",className:(t=e,t===o?[u.button_active,u.button].join(" "):u.button),clickCallBack:p,children:e},e.toString());var t}))})};function x(e){var t=e.className,o=e.scaleOrigin,n=(0,i.useContext)(r.Z),u=(0,a.Z)(n,2),_=u[0],m=u[1],x=(0,i.useState)(_.theme),f=(0,a.Z)(x,2),b=f[0],h=f[1];return(0,d.jsx)(s.Z,{className:t,scaleOrigin:o,children:(0,d.jsx)(l.Z,{headerText:"Temas",children:(0,d.jsx)(v,{currentActive:b,clickCallBack:function(e){h(e),m((0,c.Z)((0,c.Z)({},_),{},{theme:e}))},options:["Claro","Escuro","Meia Noite"]})})})}var f={custom_checkbox_div:"customCheckbox_custom_checkbox_div__uFaaE",custom_button:"customCheckbox_custom_button__qTSwO"},b=function(e){var t=e.children,o=e.className,i=e.clickCallBack,n=e.checked,c=function(){void 0!==i&&i()};return(0,d.jsxs)("div",{className:[f.custom_checkbox_div,o].join(" "),children:[(0,d.jsx)("button",{className:f.custom_button,onClick:c,children:t}),(0,d.jsx)("input",{type:"checkbox",checked:n,onChange:c})]})},h={custom_list_selector_div:"customListSelector_custom_list_selector_div__ITvak",custom_list_selector:"customListSelector_custom_list_selector__olo8g",button_name:"customListSelector_button_name__mtmdd",selected_div:"customListSelector_selected_div__4NDVn",expand_menu_indicator:"customListSelector_expand_menu_indicator__JrJbx",expand_menu_indicator_open:"customListSelector_expand_menu_indicator_open__g+2Jb",dropdown_div:"customListSelector_dropdown_div__82aGU","fade-in":"customListSelector_fade-in__I86g2",dropdown_button:"customListSelector_dropdown_button__TtGL3"},p=o(648),j=function(e){var t=e.children,o=e.className,n=e.clickCallBack,c=e.keys,s=void 0===c?["default 1","default 2"]:c,l=e.selected,r=void 0===l?"":l,u=(0,i.useState)(!1),_=(0,a.Z)(u,2),m=_[0],v=_[1],x=function(e){n(e),v(!1)};return(0,d.jsxs)("div",{className:[o,h.custom_list_selector_div].join(" "),children:[(0,d.jsxs)("button",{className:h.custom_list_selector,onClick:function(){v(!m)},children:[(0,d.jsx)("div",{className:h.button_name,children:t}),(0,d.jsxs)("div",{className:h.selected_div,children:[r,"\xa0",(0,d.jsx)("div",{className:m?[h.expand_menu_indicator_open,h.expand_menu_indicator].join(" "):[h.expand_menu_indicator].join(" ")})]})]}),function(){if(m)return(0,d.jsx)("div",{className:h.dropdown_div,children:s.map((function(e){return(0,d.jsx)(p.Z,{clickCallBack:x,className:h.dropdown_button,children:e},"list_"+e)}))})}()]})};function k(e){var t=e.className,o=e.scaleOrigin,n=(0,i.useContext)(r.Z),u=(0,a.Z)(n,2),_=u[0],m=u[1],v=(0,i.useState)(_.backgroundBlur),x=(0,a.Z)(v,2),f=x[0],h=x[1],p=(0,i.useState)(_.shadows),k=(0,a.Z)(p,2),g=k[0],C=k[1],Z=(0,i.useState)(_.enableHover),N=(0,a.Z)(Z,2),S=N[0],T=N[1];return(0,d.jsx)(s.Z,{className:t,scaleOrigin:o,children:(0,d.jsxs)(l.Z,{headerText:"Efeitos visuais",children:[(0,d.jsx)(b,{clickCallBack:function(){h(!f),m((0,c.Z)((0,c.Z)({},_),{},{backgroundBlur:!f}))},checked:f,children:"Desfocar fundo"}),(0,d.jsx)(b,{clickCallBack:function(){C(!g),m((0,c.Z)((0,c.Z)({},_),{},{shadows:!g}))},checked:g,children:"Sombras"}),(0,d.jsx)(j,{keys:["R\xe1pido","Normal","Desligado"],clickCallBack:function(e){m((0,c.Z)((0,c.Z)({},_),{},{animationSpeed:e}))},selected:_.animationSpeed,children:"Anima\xe7\xf5es"}),(0,d.jsx)(b,{clickCallBack:function(){var e="enable"===S?"disable":"enable";T(e),m((0,c.Z)((0,c.Z)({},_),{},{enableHover:e}))},checked:"enable"===S,children:"Indicador de sele\xe7\xe3o"})]})})}var g="CustomTextInput_main_div__66H9v",C="CustomTextInput_main_button__PlUFv",Z="CustomTextInput_title_span__Lebde",N="CustomTextInput_input_span__rCyJ1",S="CustomTextInput_text_input__ubqAa",T="CustomTextInput_suffix__4kEVz",y=function(e){var t=e.inputType,o=void 0===t?"text":t,n=e.title,c=e.value,s=e.setValue,l=e.suffix,r=e.alert,u=e.alertColor,_=void 0===u?"var(--warning_button_color)":u,m=(0,i.useMemo)((function(){return{borderColor:_,borderWidth:r?"0px 0px 4px 0px":"0"}}),[r,_]),v=(0,i.useState)(m),x=(0,a.Z)(v,2),f=x[0],b=x[1],h=(0,i.useRef)(null);(0,i.useEffect)((function(){b(m)}),[m]);return(0,d.jsx)("div",{className:g,children:(0,d.jsxs)("button",{className:C,style:f,onClick:function(){var e;null===(e=h.current)||void 0===e||e.focus()},children:[(0,d.jsx)("span",{className:Z,children:n}),(0,d.jsxs)("span",{className:N,children:[(0,d.jsx)("input",{type:o,className:S,ref:h,onChange:function(e){e.preventDefault();var t=e.target.value;s(t)},value:c}),(0,d.jsx)("p",{className:T,children:l})]})]})})},B=function(e){return i.isValidElement(e)&&e.type===p.Z},w=function(e){var t=e.children,o=i.Children.toArray(t).filter(B);return(0,d.jsx)("div",{style:{width:"90%",display:"flex",height:"7vh",minHeight:"calc(var(--font_m) * 2.7)",paddingLeft:"5%",marginBottom:"2vh",gap:"5px",justifyContent:"center"},children:o})},M=function(e){var t=e.className,o=e.scaleOrigin,n=(0,i.useContext)(r.Z),u=(0,a.Z)(n,2),_=u[0],m=u[1],v=(0,i.useState)(_.absoluteMaximumForce),x=(0,a.Z)(v,2),f=x[0],b=x[1],h=(0,i.useState)(_.absoluteMaximumTime),j=(0,a.Z)(h,2),k=j[0],g=j[1],C=(0,i.useState)(_.absoluteMaximumTravel),Z=(0,a.Z)(C,2),N=Z[0],S=Z[1],T=(0,i.useState)(!1),B=(0,a.Z)(T,2),M=B[0],O=B[1],L=(0,i.useState)(!1),I=(0,a.Z)(L,2),E=I[0],F=I[1],V=(0,i.useState)(!1),A=(0,a.Z)(V,2),J=A[0],D=A[1];return(0,i.useEffect)((function(){O(f!==_.absoluteMaximumForce),F(k!==_.absoluteMaximumTime),D(N!==_.absoluteMaximumTravel)}),[_,f,k,N]),(0,d.jsx)(s.Z,{className:t,scaleOrigin:o,children:(0,d.jsxs)(l.Z,{headerText:"Limites globais",children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(p.Z,{bgColor:"var(--positive_button_color)",fontColor:"var(--font_color_inverted)",clickCallBack:function(){m((0,c.Z)((0,c.Z)({},_),{},{absoluteMaximumForce:f,absoluteMaximumTime:k,absoluteMaximumTravel:N}))},children:"Salvar"}),(0,d.jsx)(p.Z,{bgColor:"var(--warning_button_color)",fontColor:"var(--font_color)",clickCallBack:function(){b(_.absoluteMaximumForce),g(_.absoluteMaximumTime),S(_.absoluteMaximumTravel)},children:"Carregar"})]}),(0,d.jsx)(y,{title:"For\xe7a m\xe1xima",setValue:b,value:f,inputType:"number",suffix:"N",alert:M,alertColor:"var(--positive_button_color)"}),(0,d.jsx)(y,{title:"Tempo m\xe1xima",setValue:g,value:k,inputType:"number",suffix:"s",alert:E,alertColor:"var(--positive_button_color)"}),(0,d.jsx)(y,{title:"Desloc. m\xe1ximo",setValue:S,value:N,inputType:"number",suffix:"mm",alert:J,alertColor:"var(--positive_button_color)"})]})})};function O(e){var t=e.className,o=e.scaleOrigin,n=(0,i.useContext)(r.Z),u=(0,a.Z)(n,2),_=u[0],m=u[1],v=(0,i.useState)(_.forceVirtualKeyboard),x=(0,a.Z)(v,2),f=x[0],h=x[1];return(0,d.jsx)(s.Z,{className:t,scaleOrigin:o,children:(0,d.jsxs)(l.Z,{headerText:"Outros",children:[(0,d.jsx)(j,{keys:["50%","75%","100%","125%","150%","200%"],clickCallBack:function(e){m((0,c.Z)((0,c.Z)({},_),{},{fontSize:e}))},selected:_.fontSize,children:"Texto"}),(0,d.jsx)(b,{clickCallBack:function(){h(!f),m((0,c.Z)((0,c.Z)({},_),{},{forceVirtualKeyboard:!f}))},checked:f,children:"Teclado virtual"})]})})}function L(){return(0,d.jsxs)(i.Fragment,{children:[(0,d.jsx)(x,{className:n.theme_selector,scaleOrigin:"top left"}),(0,d.jsx)(k,{className:n.animation_selector,scaleOrigin:"top right"}),(0,d.jsx)(M,{className:n.global_limits,scaleOrigin:"bottom left"}),(0,d.jsx)(O,{className:n.other_selector,scaleOrigin:"bottom right"})]})}}}]);
//# sourceMappingURL=731.2b7af7fe.chunk.js.map