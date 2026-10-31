(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,455587,729084,595157,e=>{var t=e.i(365801),i=e.i(742710);let r=(0,t.s)({isLegalCheckboxChecked:!1}),o={state:r,subscribe:e=>(0,t.i)(r,()=>e(r)),subscribeKey:(e,t)=>(0,i.T)(r,e,t),setIsLegalCheckboxChecked(e){r.isLegalCheckboxChecked=e}};e.s(["f",0,o],455587),e.i(812207);var a=e.i(108285),s=e.i(654479);e.i(374576);var n=e.i(56350),c=e.i(82283);e.i(404041);var l=e.i(645975),d=a,h=e.i(120119);e.i(234051);var u=e.i(829389);e.i(684326);var p=e.i(765090);e.i(852634),e.i(839009);var f=e.i(459088),g=e.i(162611);let m=g.m`
  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    column-gap: ${({spacing:e})=>e[2]};
  }

  label > input[type='checkbox'] {
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }

  label > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border: 1px solid ${({colors:e})=>e.neutrals400};
    color: ${({colors:e})=>e.white};
    background-color: transparent;
    will-change: border-color, background-color;
  }

  label > span > wui-icon {
    opacity: 0;
    will-change: opacity;
  }

  label > input[type='checkbox']:checked + span > wui-icon {
    color: ${({colors:e})=>e.white};
  }

  label > input[type='checkbox']:not(:checked) > span > wui-icon {
    color: ${({colors:e})=>e.neutrals900};
  }

  label > input[type='checkbox']:checked + span > wui-icon {
    opacity: 1;
  }

  /* -- Sizes --------------------------------------------------- */
  label[data-size='lg'] > span {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    border-radius: ${({borderRadius:e})=>e[10]};
  }

  label[data-size='md'] > span {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  label[data-size='sm'] > span {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  /* -- Focus states --------------------------------------------------- */
  label > input[type='checkbox']:focus-visible + span,
  label > input[type='checkbox']:focus + span {
    border: 1px solid ${({tokens:e})=>e.core.borderAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  label > input[type='checkbox']:checked + span {
    background-color: ${({tokens:e})=>e.core.iconAccentPrimary};
    border: 1px solid transparent;
  }

  /* -- Hover states --------------------------------------------------- */
  input[type='checkbox']:not(:checked):not(:disabled) + span:hover {
    border: 1px solid ${({colors:e})=>e.neutrals700};
    background-color: ${({colors:e})=>e.neutrals800};
    box-shadow: none;
  }

  input[type='checkbox']:checked:not(:disabled) + span:hover {
    border: 1px solid transparent;
    background-color: ${({colors:e})=>e.accent080};
    box-shadow: none;
  }

  /* -- Disabled state --------------------------------------------------- */
  label > input[type='checkbox']:checked:disabled + span {
    border: 1px solid transparent;
    opacity: 0.3;
  }

  label > input[type='checkbox']:not(:checked):disabled + span {
    border: 1px solid ${({colors:e})=>e.neutrals700};
  }

  label:has(input[type='checkbox']:disabled) {
    cursor: auto;
  }

  label > input[type='checkbox']:disabled + span {
    cursor: not-allowed;
  }
`;var b=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let v={lg:"md",md:"sm",sm:"sm"},w=class extends d.f{constructor(){super(...arguments),this.inputElementRef=(0,p.J)(),this.checked=void 0,this.disabled=!1,this.size="md"}render(){let e=v[this.size];return s.c`
      <label data-size=${this.size}>
        <input
          ${(0,p.C)(this.inputElementRef)}
          ?checked=${(0,u.f)(this.checked)}
          ?disabled=${this.disabled}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" size=${e}></wui-icon>
        </span>
        <slot></slot>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("checkboxChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};w.styles=[f.e,m],b([(0,h.f)({type:Boolean})],w.prototype,"checked",void 0),b([(0,h.f)({type:Boolean})],w.prototype,"disabled",void 0),b([(0,h.f)()],w.prototype,"size",void 0),w=b([(0,l.f)("wui-checkbox")],w),e.i(249536);let y=g.m`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  wui-checkbox {
    padding: ${({spacing:e})=>e["3"]};
  }
  a {
    text-decoration: none;
    color: ${({tokens:e})=>e.theme.textSecondary};
    font-weight: 500;
  }
`;var x=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let $=class extends a.f{constructor(){super(),this.unsubscribe=[],this.checked=o.state.isLegalCheckboxChecked,this.unsubscribe.push(o.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=c.f.state,i=c.f.state.features?.legalCheckbox;return(e||t)&&i?s.c`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="secondary" variant="sm-regular" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `:null}andTemplate(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=c.f.state;return e&&t?"and":""}termsTemplate(){let{termsConditionsUrl:e}=c.f.state;return e?s.c`<a rel="noreferrer" target="_blank" href=${e}>terms of service</a>`:null}privacyTemplate(){let{privacyPolicyUrl:e}=c.f.state;return e?s.c`<a rel="noreferrer" target="_blank" href=${e}>privacy policy</a>`:null}onCheckboxChange(){o.setIsLegalCheckboxChecked(!this.checked)}};$.styles=[y],x([(0,n.f)()],$.prototype,"checked",void 0),$=x([(0,l.f)("w3m-legal-checkbox")],$),e.s([],729084);var k=a;let C=g.m`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${e=>e.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var S=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let P=class extends k.f{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let e=this.radius>50?50:this.radius,t=36-e;return s.c`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${116+t} ${245+t}"
          stroke-dashoffset=${360+1.75*t}
        />
      </svg>
    `}};P.styles=[f.e,C],S([(0,h.f)({type:Number})],P.prototype,"radius",void 0),P=S([(0,l.f)("wui-loading-thumbnail")],P),e.s([],595157)},328182,496969,655934,e=>{var t=e.i(365801),i=e.i(401564),r=e.i(960398),o=e.i(149454),a=e.i(653157),s=e.i(221728),n=e.i(811424),c=e.i(227302),l=e.i(758331);async function d(){s.f.push("ConnectingFarcaster");let e=o.f.getAuthConnector();if(e){let t=r.f.getAccountData();if(!t?.farcasterUrl)try{let{url:t}=await e.provider.getFarcasterUri();r.f.setAccountProp("farcasterUrl",t,r.f.state.activeChain)}catch(e){s.f.goBack(),n.f.showError(e)}}}async function h(e){s.f.push("ConnectingSocial");let d=o.f.getAuthConnector(),h=null;try{let o=setTimeout(()=>{throw Error("Social login timed out. Please try again.")},45e3);if(d&&e){if(c.f.isTelegram()||(h=function(){try{return c.f.returnOpenHref(`${i.f.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch(e){throw Error("Could not open social popup")}}()),h)r.f.setAccountProp("socialWindow",(0,t.C)(h),r.f.state.activeChain);else if(!c.f.isTelegram())throw Error("Could not create social popup");let{uri:a}=await d.provider.getSocialRedirectUri({provider:e});if(!a)throw h?.close(),Error("Could not fetch the social redirect uri");if(h&&(h.location.href=a),c.f.isTelegram()){l.f.setTelegramSocialProvider(e);let t=c.f.formatTelegramSocialLoginUrl(a);c.f.openHref(t,"_top")}clearTimeout(o)}}catch(i){h?.close();let t=c.f.parseError(i);n.f.showError(t),a.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:e,message:t}})}}async function u(e){r.f.setAccountProp("socialProvider",e,r.f.state.activeChain),a.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),"farcaster"===e?await d():await h(e)}e.s(["f",0,u],328182),e.i(812207);var p=e.i(108285),f=e.i(654479);e.i(374576);var g=e.i(120119);e.i(234051);var m=e.i(829389);e.i(839009);var b=e.i(459088),v=e.i(645975),w=p;e.i(852634);var y=e.i(162611);let x=y.m`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:e})=>e["20"]};
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;var $=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let k=class extends w.f{constructor(){super(...arguments),this.logo="google"}render(){return f.c`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};k.styles=[b.e,x],$([(0,g.f)()],k.prototype,"logo",void 0),k=$([(0,v.f)("wui-logo")],k),e.s([],496969);let C=y.m`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: transparent;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-text {
    text-transform: capitalize;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var S=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let P=class extends p.f{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.disabled=!1}render(){return f.c`
      <button ?disabled=${this.disabled} tabindex=${(0,m.f)(this.tabIdx)}>
        <wui-flex gap="2" alignItems="center">
          <wui-image ?boxed=${!0} logo=${this.logo}></wui-image>
          <wui-text variant="lg-regular" color="primary">${this.name}</wui-text>
        </wui-flex>
        <wui-icon name="chevronRight" size="lg" color="default"></wui-icon>
      </button>
    `}};P.styles=[b.e,b.j,C],S([(0,g.f)()],P.prototype,"logo",void 0),S([(0,g.f)()],P.prototype,"name",void 0),S([(0,g.f)()],P.prototype,"tabIdx",void 0),S([(0,g.f)({type:Boolean})],P.prototype,"disabled",void 0),P=S([(0,v.f)("wui-list-social")],P),e.s([],655934)},863166,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(56350);e.i(234051);var o=e.i(829389),a=e.i(82283),s=e.i(455587);e.i(404041);var n=e.i(645975);e.i(62238),e.i(729084);var c=t,l=e.i(120119),d=e.i(851887),h=e.i(886259),u=e.i(149454),p=e.i(360334),f=e.i(221728),g=e.i(328182),m=e.i(227302);e.i(655934);var b=e.i(542991),v=e.i(162611);let w=v.m`
  :host {
    margin-top: ${({spacing:e})=>e["1"]};
  }
  wui-separator {
    margin: ${({spacing:e})=>e["3"]} calc(${({spacing:e})=>e["3"]} * -1)
      ${({spacing:e})=>e["2"]} calc(${({spacing:e})=>e["3"]} * -1);
    width: calc(100% + ${({spacing:e})=>e["3"]} * 2);
  }
`;var y=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let x=class extends c.f{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.f.state.connectors,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.remoteFeatures=a.f.state.remoteFeatures,this.isPwaLoading=!1,this.hasExceededUsageLimit=h.f.state.plan.hasExceededUsageLimit,this.unsubscribe.push(u.f.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type)}),a.f.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.remoteFeatures?.socials||[],t=!!this.authConnector,r=e?.length,o="ConnectSocials"===f.f.state.view;return t&&r||o?(o&&!r&&(e=p.W.DEFAULT_SOCIALS),i.c` <wui-flex flexDirection="column" gap="2">
      ${e.map(e=>i.c`<wui-list-social
            @click=${()=>{this.onSocialClick(e)}}
            data-testid=${`social-selector-${e}`}
            name=${e}
            logo=${e}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`):null}async onSocialClick(e){this.hasExceededUsageLimit?f.f.push("UsageExceeded"):e&&await (0,g.f)(e)}async handlePwaFrameLoad(){if(m.f.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof b.f&&await this.authConnector.provider.init()}catch(e){d.f.open({displayMessage:"Error loading embedded wallet in PWA",debugMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}};x.styles=w,y([(0,l.f)()],x.prototype,"tabIdx",void 0),y([(0,r.f)()],x.prototype,"connectors",void 0),y([(0,r.f)()],x.prototype,"authConnector",void 0),y([(0,r.f)()],x.prototype,"remoteFeatures",void 0),y([(0,r.f)()],x.prototype,"isPwaLoading",void 0),y([(0,r.f)()],x.prototype,"hasExceededUsageLimit",void 0),x=y([(0,n.f)("w3m-social-login-list")],x);let $=v.m`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity ${({durations:e})=>e.md}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: opacity;
  }

  wui-flex::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var k=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let C=class extends t.f{constructor(){super(),this.unsubscribe=[],this.checked=s.f.state.isLegalCheckboxChecked,this.unsubscribe.push(s.f.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=a.f.state,r=a.f.state.features?.legalCheckbox,s=!!(e||t)&&!!r&&!this.checked;return i.c`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        gap="01"
        class=${(0,o.f)(s?"disabled":void 0)}
      >
        <w3m-social-login-list tabIdx=${(0,o.f)(s?-1:void 0)}></w3m-social-login-list>
      </wui-flex>
    `}};C.styles=$,k([(0,r.f)()],C.prototype,"checked",void 0),C=k([(0,n.f)("w3m-connect-socials-view")],C),e.s(["W3mConnectSocialsView",0,C],897802);var S=t,P=e.i(960398),E=e.i(971080),O=e.i(653157),R=e.i(803468),A=e.i(811424),T=e.i(758331),I=e.i(639403);e.i(746650),e.i(595157),e.i(496969),e.i(249536);var _=e.i(535568),L=e.i(542904);let j=v.m`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: ${({borderRadius:e})=>e["8"]};
  }
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
  wui-flex:first-child:not(:only-child) {
    position: relative;
  }
  wui-loading-thumbnail {
    position: absolute;
  }
  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e["1"]} * -1);
    bottom: calc(${({spacing:e})=>e["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition: all ${({easings:e})=>e["ease-out-power-2"]}
      ${({durations:e})=>e.lg};
  }
  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:e})=>e["4"]};
  }
  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }
  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:e})=>e["ease-out-power-2"]} both;
  }
  .capitalize {
    text-transform: capitalize;
  }
`;var z=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let N=class extends S.f{constructor(){super(),this.unsubscribe=[],this.socialProvider=P.f.getAccountData()?.socialProvider,this.socialWindow=P.f.getAccountData()?.socialWindow,this.error=!1,this.connecting=!1,this.message="Connect in the provider window",this.remoteFeatures=a.f.state.remoteFeatures,this.address=P.f.getAccountData()?.address,this.connectionsByNamespace=E.f.getConnections(P.f.state.activeChain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.authConnector=u.f.getAuthConnector(),this.handleSocialConnection=async e=>{if(e.data?.resultUri)if(e.origin===L.f.SECURE_SITE_ORIGIN){window.removeEventListener("message",this.handleSocialConnection,!1);try{if(this.authConnector&&!this.connecting){this.connecting=!0;let t=this.parseURLError(e.data.resultUri);if(t)return void this.handleSocialError(t);this.closeSocialWindow(),this.updateMessage();let i=e.data.resultUri;this.socialProvider&&O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}}),await E.f.connectExternal({id:this.authConnector.id,type:this.authConnector.type,socialUri:i},this.authConnector.chain),this.socialProvider&&(T.f.setConnectedSocialProvider(this.socialProvider),O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider}}))}}catch(e){this.error=!0,this.updateMessage(),this.socialProvider&&O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider,message:m.f.parseError(e)}})}}else f.f.goBack(),A.f.showError("Untrusted Origin"),this.socialProvider&&O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider,message:"Untrusted Origin"}})},_.f.EmbeddedWalletAbortController.signal.addEventListener("abort",()=>{this.closeSocialWindow()}),this.unsubscribe.push(P.f.subscribeChainProp("accountState",e=>{if(e&&(this.socialProvider=e.socialProvider,e.socialWindow&&(this.socialWindow=e.socialWindow),e.address)){let t=this.remoteFeatures?.multiWallet;e.address!==this.address&&(this.hasMultipleConnections&&t?(f.f.replace("ProfileWallets"),A.f.showSuccess("New Wallet Added"),this.address=e.address):(R.f.state.open||a.f.state.enableEmbedded)&&R.f.close())}}),a.f.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e})),this.authConnector&&this.connectSocial()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),window.removeEventListener("message",this.handleSocialConnection,!1),P.f.state.activeCaipAddress||!this.socialProvider||this.connecting||O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_CANCELED",properties:{provider:this.socialProvider}}),this.closeSocialWindow()}render(){return i.c`
      <wui-flex
        data-error=${(0,o.f)(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${(0,o.f)(this.socialProvider)}></wui-logo>
          ${this.error?null:this.loaderTemplate()}
          <wui-icon-box color="error" icon="close" size="sm"></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="lg-medium" color="primary"
            >Log in with
            <span class="capitalize">${this.socialProvider??"Social"}</span></wui-text
          >
          <wui-text align="center" variant="lg-regular" color=${this.error?"error":"secondary"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `}loaderTemplate(){let e=I.f.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return i.c`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}parseURLError(e){try{let t="error=",i=e.indexOf(t);if(-1===i)return null;return e.substring(i+t.length)}catch{return null}}connectSocial(){let e=setInterval(()=>{this.socialWindow?.closed&&(this.connecting||"ConnectingSocial"!==f.f.state.view||f.f.goBack(),clearInterval(e))},1e3);window.addEventListener("message",this.handleSocialConnection,!1)}updateMessage(){this.error?this.message="Something went wrong":this.connecting?this.message="Retrieving user data":this.message="Connect in the provider window"}handleSocialError(e){this.error=!0,this.updateMessage(),this.socialProvider&&O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider,message:e}}),this.closeSocialWindow()}closeSocialWindow(){this.socialWindow&&(this.socialWindow.close(),P.f.setAccountProp("socialWindow",void 0,P.f.state.activeChain))}};N.styles=j,z([(0,r.f)()],N.prototype,"socialProvider",void 0),z([(0,r.f)()],N.prototype,"socialWindow",void 0),z([(0,r.f)()],N.prototype,"error",void 0),z([(0,r.f)()],N.prototype,"connecting",void 0),z([(0,r.f)()],N.prototype,"message",void 0),z([(0,r.f)()],N.prototype,"remoteFeatures",void 0),N=z([(0,n.f)("w3m-connecting-social-view")],N),e.s(["W3mConnectingSocialView",0,N],384803);var U=t,D=e.i(218454);e.i(534420),e.i(443452),e.i(732965),e.i(780313);let W=v.m`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: ${({borderRadius:e})=>e["8"]};
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e["1"]} * -1);
    bottom: calc(${({spacing:e})=>e["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var F=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let G=class extends U.f{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.socialProvider=P.f.getAccountData()?.socialProvider,this.uri=P.f.getAccountData()?.farcasterUrl,this.ready=!1,this.loading=!1,this.remoteFeatures=a.f.state.remoteFeatures,this.authConnector=u.f.getAuthConnector(),this.forceUpdate=()=>{this.requestUpdate()},this.unsubscribe.push(P.f.subscribeChainProp("accountState",e=>{this.socialProvider=e?.socialProvider,this.uri=e?.farcasterUrl,this.connectFarcaster()}),a.f.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e})),window.addEventListener("resize",this.forceUpdate)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timeout),window.removeEventListener("resize",this.forceUpdate),!P.f.state.activeCaipAddress&&this.socialProvider&&(this.uri||this.loading)&&O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_CANCELED",properties:{provider:this.socialProvider}})}render(){return this.onRenderProxy(),i.c`${this.platformTemplate()}`}platformTemplate(){return m.f.isMobile()?i.c`${this.mobileTemplate()}`:i.c`${this.desktopTemplate()}`}desktopTemplate(){return this.loading?i.c`${this.loadingTemplate()}`:i.c`${this.qrTemplate()}`}qrTemplate(){return i.c` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["0","5","5","5"]}
      gap="5"
    >
      <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

      <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
      ${this.copyTemplate()}
    </wui-flex>`}loadingTemplate(){return i.c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["5","5","5","5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
          <wui-icon-box color="error" icon="close" size="sm"></wui-icon-box>
        </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <wui-text align="center" variant="md-medium" color="primary">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="sm-regular" color="secondary">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}mobileTemplate(){return i.c` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["10","5","5","5"]}
      gap="5"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
        <wui-icon-box
          color="error"
          icon="close"
          size="sm"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="2">
        <wui-text align="center" variant="md-medium" color="primary"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="sm-regular" color="secondary"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`}loaderTemplate(){let e=I.f.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return i.c`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}async connectFarcaster(){if(this.authConnector)try{await this.authConnector?.provider.connectFarcaster(),this.socialProvider&&(T.f.setConnectedSocialProvider(this.socialProvider),O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}})),this.loading=!0;let e=E.f.getConnections(this.authConnector.chain).length>0;await E.f.connectExternal(this.authConnector,this.authConnector.chain);let t=this.remoteFeatures?.multiWallet;this.socialProvider&&O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider}}),this.loading=!1,(!a.f.state.siwx||await D.f.isAuthenticated())&&(e&&t?(f.f.replace("ProfileWallets"),A.f.showSuccess("New Wallet Added")):R.f.close())}catch(e){this.socialProvider&&O.f.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider,message:m.f.parseError(e)}}),f.f.goBack(),A.f.showError(e)}}mobileLinkTemplate(){return i.c`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri||this.loading}
      @click=${()=>{this.uri&&m.f.openHref(this.uri,"_blank")}}
    >
      Open farcaster</wui-button
    >`}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.getBoundingClientRect().width-40,t=I.f.state.themeVariables["--apkt-qr-color"]??I.f.state.themeVariables["--w3m-qr-color"];return i.c` <wui-qr-code
      size=${e}
      theme=${I.f.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${(0,o.f)(t)}
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return i.c`<wui-button
      .disabled=${e}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="sm" color="default" slot="iconRight" name="copy"></wui-icon>
      Copy link
    </wui-button>`}onCopyUri(){try{this.uri&&(m.f.copyToClopboard(this.uri),A.f.showSuccess("Link copied"))}catch{A.f.showError("Failed to copy")}}};G.styles=W,F([(0,r.f)()],G.prototype,"socialProvider",void 0),F([(0,r.f)()],G.prototype,"uri",void 0),F([(0,r.f)()],G.prototype,"ready",void 0),F([(0,r.f)()],G.prototype,"loading",void 0),F([(0,r.f)()],G.prototype,"remoteFeatures",void 0),G=F([(0,n.f)("w3m-connecting-farcaster-view")],G),e.s(["W3mConnectingFarcasterView",0,G],901728),e.i(897802),e.i(384803),e.i(901728),e.s(["W3mConnectSocialsView",0,C,"W3mConnectingFarcasterView",0,G,"W3mConnectingSocialView",0,N],863166)},542904,e=>{var t=e.i(247167);let i={ACCOUNT_TABS:[{label:"Tokens"},{label:"Activity"}],SECURE_SITE_ORIGIN:(void 0!==t.default&&void 0!==t.default.env?t.default.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",VIEW_DIRECTION:{Next:"next",Prev:"prev"},ANIMATION_DURATIONS:{HeaderText:120,ModalHeight:150,ViewTransition:150},VIEWS_WITH_LEGAL_FOOTER:["Connect","ConnectWallets","OnRampTokenSelect","OnRampFiatSelect","OnRampProviders"],VIEWS_WITH_DEFAULT_FOOTER:["Networks"]};e.s(["f",0,i])},534420,624947,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(120119);e.i(852634),e.i(383227),e.i(839009);var o=e.i(459088),a=e.i(645975),s=e.i(162611);let n=s.m`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({spacing:e})=>e[2]};
    transition:
      scale ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({borderRadius:e})=>e[2]};
    padding: 0 ${({spacing:e})=>e[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({borderRadius:e})=>e[3]};
    padding: 0 ${({spacing:e})=>e[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: 0 ${({spacing:e})=>e[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({tokens:e})=>e.core.backgroundAccentPrimary};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({tokens:e})=>e.theme.backgroundInvert};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({tokens:e})=>e.core.textError};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({tokens:e})=>e.core.backgroundError};
    color: ${({tokens:e})=>e.core.textError};
  }

  button[data-variant='shade'] {
    background: var(--wui-color-gray-glass-002);
    color: var(--wui-color-fg-200);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-size='sm']:focus-visible:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:focus-visible:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:focus-visible:enabled {
    border-radius: 48px;
  }
  button[data-variant='shade']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button[data-size='sm']:hover:enabled {
      border-radius: 28px;
    }

    button[data-size='md']:hover:enabled {
      border-radius: 38px;
    }

    button[data-size='lg']:hover:enabled {
      border-radius: 48px;
    }

    button[data-variant='shade']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='shade']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }
  }

  button[data-size='sm']:active:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:active:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:active:enabled {
    border-radius: 48px;
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    opacity: 0.3;
  }
`;var c=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let l={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},d={lg:"md",md:"md",sm:"sm"},h=class extends t.f{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let e=this.textVariant??l[this.size];return i.c`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let e=d[this.size],t="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return i.c`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return null}};h.styles=[o.e,o.j,n],c([(0,r.f)()],h.prototype,"size",void 0),c([(0,r.f)({type:Boolean})],h.prototype,"disabled",void 0),c([(0,r.f)({type:Boolean})],h.prototype,"fullWidth",void 0),c([(0,r.f)({type:Boolean})],h.prototype,"loading",void 0),c([(0,r.f)()],h.prototype,"variant",void 0),c([(0,r.f)()],h.prototype,"textVariant",void 0),h=c([(0,a.f)("wui-button")],h),e.s([],624947),e.s([],534420)},62238,112699,73944,249536,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(120119),o=e.i(459088);let a={getSpacingStyles:(e,t)=>Array.isArray(e)?e[t]?`var(--apkt-spacing-${e[t]})`:void 0:"string"==typeof e?`var(--apkt-spacing-${e})`:void 0,getFormattedDate:e=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e),formatCurrency(e=0,t={}){let i=Number(e);return isNaN(i)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...t}).format(i)},getHostName(e){try{return new URL(e).hostname}catch(e){return""}},getTruncateString:({string:e,charsStart:t,charsEnd:i,truncate:r})=>e.length<=t+i?e:"end"===r?`${e.substring(0,t)}...`:"start"===r?`...${e.substring(e.length-i)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(i))}`,generateAvatarColors(e){let t=e.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(t),r=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),o=100-3*Number(r?.replace("px","")),a=`${o}% ${o}% at 65% 40%`,s=[];for(let e=0;e<5;e+=1){let t=this.tintColor(i,.15*e);s.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`
    --local-color-1: ${s[0]};
    --local-color-2: ${s[1]};
    --local-color-3: ${s[2]};
    --local-color-4: ${s[3]};
    --local-color-5: ${s[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(e){let t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]},tintColor(e,t){let[i,r,o]=e;return[Math.round(i+(255-i)*t),Math.round(r+(255-r)*t),Math.round(o+(255-o)*t)]},isNumber:e=>/^[0-9]+$/u.test(e),getColorTheme:e=>e?e:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(e){let t=e.split(".");return 2===t.length?[t[0],t[1]]:["0","00"]},roundNumber:(e,t,i)=>e.toString().length>=t?Number(e).toFixed(i):e,cssDurationToNumber:e=>e.endsWith("s")?1e3*Number(e.replace("s","")):e.endsWith("ms")?Number(e.replace("ms","")):0,maskInput({value:e,decimals:t,integers:i}){if("."===(e=e.replace(",",".")))return"0.";let[r="",o]=e.split(".").map(e=>e.replace(/[^0-9]/gu,"")),a=i?r.substring(0,i):r,s=2===a.length?String(Number(a)):a,n="number"==typeof t?o?.substring(0,t):o;return("string"==typeof n&&("number"!=typeof t||t>0)?[s,n].join("."):s)??""},capitalize:e=>e?e.charAt(0).toUpperCase()+e.slice(1):""};e.s(["f",0,a],112699);var s=e.i(645975),n=e.i(315193);let c=n.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var l=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let d=class extends t.f{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding&&a.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&a.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&a.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&a.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&a.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&a.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&a.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&a.getSpacingStyles(this.margin,3)};
      width: ${this.width};
    `,i.c`<slot></slot>`}};d.styles=[o.e,c],l([(0,r.f)()],d.prototype,"flexDirection",void 0),l([(0,r.f)()],d.prototype,"flexWrap",void 0),l([(0,r.f)()],d.prototype,"flexBasis",void 0),l([(0,r.f)()],d.prototype,"flexGrow",void 0),l([(0,r.f)()],d.prototype,"flexShrink",void 0),l([(0,r.f)()],d.prototype,"alignItems",void 0),l([(0,r.f)()],d.prototype,"justifyContent",void 0),l([(0,r.f)()],d.prototype,"columnGap",void 0),l([(0,r.f)()],d.prototype,"rowGap",void 0),l([(0,r.f)()],d.prototype,"gap",void 0),l([(0,r.f)()],d.prototype,"padding",void 0),l([(0,r.f)()],d.prototype,"margin",void 0),l([(0,r.f)()],d.prototype,"width",void 0),d=l([(0,s.f)("wui-flex")],d),e.s([],73944),e.s([],62238),e.i(839009),e.s([],249536)},746650,e=>{e.i(912190),e.s([])},443452,e=>{e.i(852634),e.s([])},780313,e=>{e.i(864576),e.s([])},864576,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(120119),o=e.i(645975),a=e.i(162611);let s=a.m`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:e})=>e.theme.foregroundPrimary} 0%,
      ${({tokens:e})=>e.theme.foregroundSecondary} 50%,
      ${({tokens:e})=>e.theme.foregroundPrimary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;var n=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let c=class extends t.f{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",i.c`<slot></slot>`}};c.styles=[s],n([(0,r.f)()],c.prototype,"width",void 0),n([(0,r.f)()],c.prototype,"height",void 0),n([(0,r.f)()],c.prototype,"variant",void 0),n([(0,r.f)({type:Boolean})],c.prototype,"rounded",void 0),c=n([(0,o.f)("wui-shimmer")],c),e.s([],864576)},912190,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(120119);e.i(234051);var o=e.i(829389);e.i(852634);var a=e.i(459088),s=e.i(645975),n=e.i(162611);let c=n.m`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({borderRadius:e})=>e[2]};
    padding: ${({spacing:e})=>e[1]} !important;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: relative;
  }

  :host([data-padding='2']) {
    padding: ${({spacing:e})=>e[2]} !important;
  }

  :host:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host > wui-icon {
    z-index: 10;
  }

  /* -- Colors --------------------------------------------------- */
  :host([data-color='accent-primary']) {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  :host([data-color='accent-primary']):after {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  :host([data-color='default']),
  :host([data-color='secondary']) {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  :host([data-color='default']):after {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-color='secondary']):after {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  :host([data-color='success']) {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  :host([data-color='success']):after {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  :host([data-color='error']) {
    color: ${({tokens:e})=>e.core.iconError};
  }

  :host([data-color='error']):after {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  :host([data-color='warning']) {
    color: ${({tokens:e})=>e.core.iconWarning};
  }

  :host([data-color='warning']):after {
    background-color: ${({tokens:e})=>e.core.backgroundWarning};
  }

  :host([data-color='inverse']) {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  :host([data-color='inverse']):after {
    background-color: transparent;
  }
`;var l=function(e,t,i,r){var o,a=arguments.length,s=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(a<3?o(s):a>3?o(t,i,s):o(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let d=class extends t.f{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,i.c`
      <wui-icon size=${(0,o.f)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};d.styles=[a.e,a.j,c],l([(0,r.f)()],d.prototype,"icon",void 0),l([(0,r.f)()],d.prototype,"size",void 0),l([(0,r.f)()],d.prototype,"padding",void 0),l([(0,r.f)()],d.prototype,"color",void 0),d=l([(0,s.f)("wui-icon-box")],d),e.s([],912190)},684326,765090,e=>{var t=e.i(654479);let{I:i}=t.e;var r=e.i(391909);let o=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),o(e,t);return!0},a=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},s=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),l(t)}};function n(e){void 0!==this._$AN?(a(this),this._$AM=e,s(this)):this._$AM=e}function c(e,t=!1,i=0){let r=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(t)if(Array.isArray(r))for(let e=i;e<r.length;e++)o(r[e],!1),a(r[e]);else null!=r&&(o(r,!1),a(r));else o(this,e)}let l=e=>{e.type==r.x.CHILD&&(e._$AP??=c,e._$AQ??=n)};class d extends r.C{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),s(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(o(this,e),a(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class h{}let u=new WeakMap,p=(0,r.l)(class extends d{render(e){return t.i}update(e,[i]){let r=i!==this.G;return r&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.G=i,this.ht=e.options?.host,this.rt(this.ct=e.element)),t.i}rt(e){if(void 0!==this.G)if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,i=u.get(t);void 0===i&&(i=new WeakMap,u.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?u.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});e.s(["J",0,()=>new h,"C",0,p],765090),e.s([],684326)}])})();