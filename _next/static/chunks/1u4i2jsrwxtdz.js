(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,707876,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(56350);e.i(234051);var o=e.i(829389),a=e.i(436220),n=e.i(960398),s=e.i(227302),l=e.i(221728),c=e.i(811424),p=e.i(639403),d=e.i(564126);e.i(404041);var u=e.i(112699),h=e.i(645975),g=t,f=e.i(120119);e.i(852634),e.i(864380),e.i(839009),e.i(73944);var m=e.i(459088),w=e.i(162611);let b=w.m`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[4]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]};
    border: none;
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:active:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-text {
    flex: 1;
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-flex {
    width: auto;
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e["01"]};
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .network-icon {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[4]};
    overflow: hidden;
    margin-left: -8px;
  }

  .network-icon:first-child {
    margin-left: 0px;
  }

  .network-icon:after {
    position: absolute;
    inset: 0;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
  }
`;var y=function(e,t,i,r){var o,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let $=class extends g.f{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return i.c`
      <button>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
        <wui-flex>
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="inherit"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){let e=this.networkImages.slice(0,5);return i.c` <wui-flex class="networks">
      ${e?.map(e=>i.c` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`}};$.styles=[m.e,m.j,b],y([(0,f.f)({type:Array})],$.prototype,"networkImages",void 0),y([(0,f.f)()],$.prototype,"text",void 0),$=y([(0,h.f)("wui-compatible-network")],$),e.i(62238),e.i(732965),e.i(249536);var v=e.i(979484);let x=w.m`
  wui-compatible-network {
    margin-top: ${({spacing:e})=>e["4"]};
    width: 100%;
  }

  wui-qr-code {
    width: unset !important;
    height: unset !important;
  }

  wui-icon {
    align-items: normal;
  }
`;var k=function(e,t,i,r){var o,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let S=class extends t.f{constructor(){super(),this.unsubscribe=[],this.address=n.f.getAccountData()?.address,this.profileName=n.f.getAccountData()?.profileName,this.network=n.f.state.activeCaipNetwork,this.unsubscribe.push(n.f.subscribeChainProp("accountState",e=>{e?(this.address=e.address,this.profileName=e.profileName):c.f.showError("Account not found")}),n.f.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-wallet-receive-view: No account provided");let e=a.f.getNetworkImage(this.network);return i.c` <wui-flex
      flexDirection="column"
      .padding=${["0","4","4","4"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${u.f.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:4*!this.profileName,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["4","0","0","0"]}
        alignItems="center"
        gap="4"
      >
        <wui-qr-code
          size=${232}
          theme=${p.f.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,o.f)(p.f.state.themeVariables["--apkt-qr-color"]??p.f.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="lg-regular" color="primary" align="center">
          Copy your address or scan this QR code
        </wui-text>
        <wui-button @click=${this.onCopyClick.bind(this)} size="sm" variant="neutral-secondary">
          <wui-icon slot="iconLeft" size="sm" color="inherit" name="copy"></wui-icon>
          <wui-text variant="md-regular" color="inherit">Copy address</wui-text>
        </wui-button>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let e=n.f.getAllRequestedCaipNetworks(),t=n.f.checkIfSmartAccountEnabled(),r=n.f.state.activeCaipNetwork,o=e.filter(e=>e?.chainNamespace===r?.chainNamespace);if((0,d.P)(r?.chainNamespace)===v.P.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return r?i.c`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[a.f.getNetworkImage(r)??""]}
      ></wui-compatible-network>`:null;let s=(o?.filter(e=>e?.assets?.imageId)?.slice(0,5)).map(a.f.getNetworkImage).filter(Boolean);return i.c`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${s}
    ></wui-compatible-network>`}onReceiveClick(){l.f.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(s.f.copyToClopboard(this.address),c.f.showSuccess("Address copied"))}catch{c.f.showError("Failed to copy")}}};S.styles=x,k([(0,r.f)()],S.prototype,"address",void 0),k([(0,r.f)()],S.prototype,"profileName",void 0),k([(0,r.f)()],S.prototype,"network",void 0),S=k([(0,h.f)("w3m-wallet-receive-view")],S),e.s(["W3mWalletReceiveView",0,S],847751),e.i(847751),e.s(["W3mWalletReceiveView",0,S],707876)},62238,112699,73944,249536,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(120119),o=e.i(459088);let a={getSpacingStyles:(e,t)=>Array.isArray(e)?e[t]?`var(--apkt-spacing-${e[t]})`:void 0:"string"==typeof e?`var(--apkt-spacing-${e})`:void 0,getFormattedDate:e=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e),formatCurrency(e=0,t={}){let i=Number(e);return isNaN(i)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...t}).format(i)},getHostName(e){try{return new URL(e).hostname}catch(e){return""}},getTruncateString:({string:e,charsStart:t,charsEnd:i,truncate:r})=>e.length<=t+i?e:"end"===r?`${e.substring(0,t)}...`:"start"===r?`...${e.substring(e.length-i)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(i))}`,generateAvatarColors(e){let t=e.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(t),r=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),o=100-3*Number(r?.replace("px","")),a=`${o}% ${o}% at 65% 40%`,n=[];for(let e=0;e<5;e+=1){let t=this.tintColor(i,.15*e);n.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`
    --local-color-1: ${n[0]};
    --local-color-2: ${n[1]};
    --local-color-3: ${n[2]};
    --local-color-4: ${n[3]};
    --local-color-5: ${n[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(e){let t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]},tintColor(e,t){let[i,r,o]=e;return[Math.round(i+(255-i)*t),Math.round(r+(255-r)*t),Math.round(o+(255-o)*t)]},isNumber:e=>/^[0-9]+$/u.test(e),getColorTheme:e=>e?e:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(e){let t=e.split(".");return 2===t.length?[t[0],t[1]]:["0","00"]},roundNumber:(e,t,i)=>e.toString().length>=t?Number(e).toFixed(i):e,cssDurationToNumber:e=>e.endsWith("s")?1e3*Number(e.replace("s","")):e.endsWith("ms")?Number(e.replace("ms","")):0,maskInput({value:e,decimals:t,integers:i}){if("."===(e=e.replace(",",".")))return"0.";let[r="",o]=e.split(".").map(e=>e.replace(/[^0-9]/gu,"")),a=i?r.substring(0,i):r,n=2===a.length?String(Number(a)):a,s="number"==typeof t?o?.substring(0,t):o;return("string"==typeof s&&("number"!=typeof t||t>0)?[n,s].join("."):n)??""},capitalize:e=>e?e.charAt(0).toUpperCase()+e.slice(1):""};e.s(["f",0,a],112699);var n=e.i(645975),s=e.i(315193);let l=s.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var c=function(e,t,i,r){var o,a=arguments.length,n=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(a<3?o(n):a>3?o(t,i,n):o(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n};let p=class extends t.f{render(){return this.style.cssText=`
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
    `,i.c`<slot></slot>`}};p.styles=[o.e,l],c([(0,r.f)()],p.prototype,"flexDirection",void 0),c([(0,r.f)()],p.prototype,"flexWrap",void 0),c([(0,r.f)()],p.prototype,"flexBasis",void 0),c([(0,r.f)()],p.prototype,"flexGrow",void 0),c([(0,r.f)()],p.prototype,"flexShrink",void 0),c([(0,r.f)()],p.prototype,"alignItems",void 0),c([(0,r.f)()],p.prototype,"justifyContent",void 0),c([(0,r.f)()],p.prototype,"columnGap",void 0),c([(0,r.f)()],p.prototype,"rowGap",void 0),c([(0,r.f)()],p.prototype,"gap",void 0),c([(0,r.f)()],p.prototype,"padding",void 0),c([(0,r.f)()],p.prototype,"margin",void 0),c([(0,r.f)()],p.prototype,"width",void 0),p=c([(0,n.f)("wui-flex")],p),e.s([],73944),e.s([],62238),e.i(839009),e.s([],249536)}])})();