(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,295191,298009,t=>{var e=t.i(401564),i=t.i(376527),r=t.i(886259),a=t.i(24742),o=t.i(960398),n=t.i(564126),s=t.i(681285);class l{constructor(t){this.getNonce=t.getNonce}async createMessage(t){let e={accountAddress:t.accountAddress,chainId:t.chainId,version:"1",domain:"u"<typeof document?"Unknown Domain":document.location.host,uri:"u"<typeof document?"Unknown URI":document.location.href,resources:this.resources,nonce:await this.getNonce(t),issuedAt:this.stringifyDate(new Date),statement:void 0,expirationTime:void 0,notBefore:void 0};return Object.assign(e,{toString:()=>this.stringify(e)})}stringify(t){let e=this.getNetworkName(t.chainId);return[`${t.domain} wants you to sign in with your ${e} account:`,t.accountAddress,t.statement?`
${t.statement}
`:"",`URI: ${t.uri}`,`Version: ${t.version}`,`Chain ID: ${t.chainId}`,`Nonce: ${t.nonce}`,t.issuedAt&&`Issued At: ${t.issuedAt}`,t.expirationTime&&`Expiration Time: ${t.expirationTime}`,t.notBefore&&`Not Before: ${t.notBefore}`,t.requestId&&`Request ID: ${t.requestId}`,t.resources?.length&&t.resources.reduce((t,e)=>`${t}
- ${e}`,"Resources:")].filter(t=>"string"==typeof t).join("\n").trim()}getNetworkName(t){let e=o.f.getAllRequestedCaipNetworks();return s.g.getNetworkNameByCaipNetworkId(e,t)}stringifyDate(t){return t.toISOString()}}t.s(["ReownAuthenticationMessenger",0,l],298009),t.s(["ReownAuthentication",0,class{constructor(t={}){this.otpUuid=null,this.listeners={sessionChanged:[]},this.localAuthStorageKey=t.localAuthStorageKey||i.A.SIWX_AUTH_TOKEN,this.localNonceStorageKey=t.localNonceStorageKey||i.A.SIWX_NONCE_TOKEN,this.required=t.required??!0,this.messenger=new l({getNonce:this.getNonce.bind(this)})}async createMessage(t){return this.messenger.createMessage(t)}async addSession(t){let e=await this.request({method:"POST",key:"authenticate",body:{data:t.data,message:t.message,signature:t.signature,clientId:this.getClientId(),walletInfo:this.getWalletInfo()},headers:["nonce","otp"]});this.setStorageToken(e.token,this.localAuthStorageKey),this.emit("sessionChanged",t),this.setAppKitAccountUser(function(t){let e=t.split(".");if(3!==e.length)throw Error("Invalid token");let i=e[1];if("string"!=typeof i)throw Error("Invalid token");let r=i.replace(/-/gu,"+").replace(/_/gu,"/");return JSON.parse(atob(r.padEnd(r.length+(4-r.length%4)%4,"=")))}(e.token)),this.otpUuid=null}async getSessions(t,e){try{if(!this.getStorageToken(this.localAuthStorageKey))return[];let i=await this.request({method:"GET",key:"me",query:{},headers:["auth"]});if(!i)return[];let r=i.address.toLowerCase()===e.toLowerCase(),a=i.caip2Network===t;if(!r||!a)return[];let o={data:{accountAddress:i.address,chainId:i.caip2Network},message:"",signature:""};return this.emit("sessionChanged",o),this.setAppKitAccountUser(i),[o]}catch{return[]}}async revokeSession(t,e){return Promise.resolve(this.clearStorageTokens())}async setSessions(t){if(0===t.length)this.clearStorageTokens();else{let e=t.find(t=>t.data.chainId===(0,n.V)()?.caipNetworkId)||t[0];await this.addSession(e)}}getRequired(){return this.required}async getSessionAccount(){if(!this.getStorageToken(this.localAuthStorageKey))throw Error("Not authenticated");return this.request({method:"GET",key:"me",body:void 0,query:{includeAppKitAccount:!0},headers:["auth"]})}async setSessionAccountMetadata(t=null){if(!this.getStorageToken(this.localAuthStorageKey))throw Error("Not authenticated");return this.request({method:"PUT",key:"account-metadata",body:{metadata:t},headers:["auth"]})}on(t,e){return this.listeners[t].push(e),()=>{this.listeners[t]=this.listeners[t].filter(t=>t!==e)}}removeAllListeners(){Object.keys(this.listeners).forEach(t=>{this.listeners[t]=[]})}async requestEmailOtp({email:t,account:e}){let i=await this.request({method:"POST",key:"otp",body:{email:t,account:e}});return this.otpUuid=i.uuid,this.messenger.resources=[`email:${t}`],i}confirmEmailOtp({code:t}){return this.request({method:"PUT",key:"otp",body:{code:t},headers:["otp"]})}async request({method:t,key:i,query:r,body:a,headers:o}){let{projectId:n,st:s,sv:l}=this.getSDKProperties(),c=new URL(`${e.f.W3M_API_URL}/auth/v1/${String(i)}`);c.searchParams.set("projectId",n),c.searchParams.set("st",s),c.searchParams.set("sv",l),r&&Object.entries(r).forEach(([t,e])=>c.searchParams.set(t,String(e)));let u=await fetch(c,{method:t,body:a?JSON.stringify(a):void 0,headers:Array.isArray(o)?o.reduce((t,e)=>{switch(e){case"nonce":t["x-nonce-jwt"]=`Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;break;case"auth":t.Authorization=`Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;break;case"otp":this.otpUuid&&(t["x-otp"]=this.otpUuid)}return t},{}):void 0});if(!u.ok)throw Error(await u.text());return u.headers.get("content-type")?.includes("application/json")?u.json():null}getStorageToken(t){return i.y.getItem(t)}setStorageToken(t,e){i.y.setItem(e,t)}clearStorageTokens(){this.otpUuid=null,i.y.removeItem(this.localAuthStorageKey),i.y.removeItem(this.localNonceStorageKey),this.emit("sessionChanged",void 0)}async getNonce(){let{nonce:t,token:e}=await this.request({method:"GET",key:"nonce"});return this.setStorageToken(e,this.localNonceStorageKey),t}getClientId(){return a.f.state.clientId}getWalletInfo(){let t=o.f.getAccountData()?.connectedWalletInfo;if(!t)return;if("social"in t&&"identifier"in t)return{type:"social",social:t.social,identifier:t.identifier};let{name:e,icon:i}=t,r="unknown";switch(t.type){case"EXTERNAL":case"INJECTED":case"ANNOUNCED":r="extension";break;case"WALLET_CONNECT":r="walletconnect";break;default:r="unknown"}return{type:r,name:e,icon:i}}getSDKProperties(){return r.f._getSdkProperties()}emit(t,e){this.listeners[t].forEach(t=>t(e))}setAppKitAccountUser(t){let{email:i}=t;i&&Object.values(e.f.CHAIN).forEach(t=>{o.f.setAccountProp("user",{email:i},t)})}}],295191)},818329,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119);t.i(404041);var a=t.i(645975),o=t.i(315193);let n=o.m`
  .email-sufixes {
    display: flex;
    flex-direction: row;
    gap: var(--wui-spacing-3xs);
    overflow-x: auto;
    max-width: 100%;
    margin-top: var(--wui-spacing-s);
    margin-bottom: calc(-1 * var(--wui-spacing-m));
    padding-bottom: var(--wui-spacing-m);
    margin-left: calc(-1 * var(--wui-spacing-m));
    margin-right: calc(-1 * var(--wui-spacing-m));
    padding-left: var(--wui-spacing-m);
    padding-right: var(--wui-spacing-m);

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;var s=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let l=["@gmail.com","@outlook.com","@yahoo.com","@hotmail.com","@aol.com","@icloud.com","@zoho.com"],c=class extends e.f{constructor(){super(...arguments),this.email=""}render(){let t=l.filter(this.filter.bind(this)).map(this.item.bind(this));return 0===t.length?null:i.c`<div class="email-sufixes">${t}</div>`}filter(t){if(!this.email)return!1;let e=this.email.split("@");if(e.length<2)return!0;let i=e.pop();return t.includes(i)&&t!==`@${i}`}item(t){let e=()=>{let e=this.email.split("@");e.length>1&&e.pop();let i=e[0]+t;this.dispatchEvent(new CustomEvent("change",{detail:i,bubbles:!0,composed:!0}))};return i.c`<wui-button variant="neutral" size="sm" @click=${e}
      >${t}</wui-button
    >`}};c.styles=[n],s([(0,r.f)()],c.prototype,"email",void 0),c=s([(0,a.f)("w3m-email-suffixes-widget")],c),t.s(["W3mEmailSuffixesWidget",0,c],1206);var u=e;let d=o.m`
  .recent-emails {
    display: flex;
    flex-direction: column;
    padding: var(--wui-spacing-s) 0;
    border-top: 1px solid var(--wui-color-gray-glass-005);
    border-bottom: 1px solid var(--wui-color-gray-glass-005);
  }

  .recent-emails-heading {
    margin-bottom: var(--wui-spacing-s);
  }

  .recent-emails-list-item {
    --wui-color-gray-glass-002: transparent;
  }
`;var h=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let p=class extends u.f{constructor(){super(...arguments),this.emails=[]}render(){return 0===this.emails.length?null:i.c`<div class="recent-emails">
      <wui-text variant="micro-600" color="fg-200" class="recent-emails-heading"
        >Recently used emails</wui-text
      >
      ${this.emails.map(this.item.bind(this))}
    </div>`}item(t){let e=()=>{this.dispatchEvent(new CustomEvent("select",{detail:t,bubbles:!0,composed:!0}))};return i.c`<wui-list-item
      @click=${e}
      ?chevron=${!0}
      icon="mail"
      iconVariant="overlay"
      class="recent-emails-list-item"
    >
      <wui-text variant="paragraph-500" color="fg-100">${t}</wui-text>
    </wui-list-item>`}};p.styles=[d],h([(0,r.f)()],p.prototype,"emails",void 0),p=h([(0,a.f)("w3m-recent-emails-widget")],p),t.s(["W3mRecentEmailsWidget",0,p],373050);var g=t.i(56350),m=t.i(960398),f=t.i(82283),w=t.i(221728),y=t.i(811424),v=t.i(295191),b=t.i(26892),x=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let $=class extends b.W3mEmailOtpWidget{constructor(){super(...arguments),this.siwx=f.f.state.siwx,this.onOtpSubmit=async t=>{await this.siwx.confirmEmailOtp({code:t}),w.f.replace("SIWXSignMessage")},this.onOtpResend=async t=>{let e=m.f.getAccountData();if(!e?.caipAddress)throw Error("No account data found");await this.siwx.requestEmailOtp({email:t,account:e.caipAddress})}}connectedCallback(){this.siwx&&this.siwx instanceof v.ReownAuthentication||y.f.showError("ReownAuthentication is not initialized."),super.connectedCallback()}shouldSubmitOnOtpChange(){return this.otp.length===b.W3mEmailOtpWidget.OTP_LENGTH}};x([(0,g.f)()],$.prototype,"siwx",void 0),$=x([(0,a.f)("w3m-data-capture-otp-confirm-view")],$),t.s(["W3mDataCaptureOtpConfirmView",0,$],590255);var S=e,k=t.i(376527),E=t.i(112699);let I=o.m`
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);

    transition-property: margin, height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    margin-top: -100px;

    &[data-state='loading'] {
      margin-top: 0px;
    }

    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 252px;
      width: 360px;
      background: radial-gradient(
        96.11% 53.95% at 50% 51.28%,
        transparent 0%,
        color-mix(in srgb, var(--wui-color-bg-100) 5%, transparent) 49%,
        color-mix(in srgb, var(--wui-color-bg-100) 65%, transparent) 99.43%
      );
    }
  }

  .hero-main-icon {
    width: 176px;
    transition-property: background-color;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      width: 56px;
    }
  }

  .hero-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
    flex-wrap: nowrap;
    min-width: fit-content;

    &:nth-child(1) {
      transform: translateX(-30px);
    }

    &:nth-child(2) {
      transform: translateX(30px);
    }

    &:nth-child(4) {
      transform: translateX(40px);
    }

    transition-property: height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    height: 68px;

    &[data-state='loading'] {
      height: 0px;
    }
  }

  .hero-row-icon {
    opacity: 0.1;
    transition-property: opacity;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      opacity: 0;
    }
  }
`;var A=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let T=class extends S.f{constructor(){super(...arguments),this.email=w.f.state.data?.email??m.f.getAccountData()?.user?.email??"",this.address=m.f.getAccountData()?.address??"",this.loading=!1,this.appName=f.f.state.metadata?.name??"AppKit",this.siwx=f.f.state.siwx,this.isRequired=Array.isArray(f.f.state.remoteFeatures?.emailCapture)&&f.f.state.remoteFeatures?.emailCapture.includes("required"),this.recentEmails=this.getRecentEmails()}connectedCallback(){this.siwx&&this.siwx instanceof v.ReownAuthentication||y.f.showError("ReownAuthentication is not initialized. Please contact support."),super.connectedCallback()}firstUpdated(){this.loading=!1,this.recentEmails=this.getRecentEmails(),this.email&&this.onSubmit()}render(){return i.c`
      <wui-flex flexDirection="column" .padding=${["3xs","m","m","m"]} gap="l">
        ${this.hero()} ${this.paragraph()} ${this.emailInput()} ${this.recentEmailsWidget()}
        ${this.footerActions()}
      </wui-flex>
    `}hero(){return i.c`
      <div class="hero" data-state=${this.loading?"loading":"default"}>
        ${this.heroRow(["id","mail","wallet","x","solana","qrCode"])}
        ${this.heroRow(["mail","farcaster","wallet","discord","mobile","qrCode"])}
        <div class="hero-row">
          ${this.heroIcon("github")} ${this.heroIcon("bank")}
          <wui-icon-box
            size="xl"
            iconSize="xxl"
            iconColor=${this.loading?"fg-100":"accent-100"}
            backgroundColor=${this.loading?"fg-100":"accent-100"}
            icon=${this.loading?"id":"user"}
            isOpaque
            class="hero-main-icon"
            data-state=${this.loading?"loading":"default"}
          >
          </wui-icon-box>
          ${this.heroIcon("id")} ${this.heroIcon("card")}
        </div>
        ${this.heroRow(["google","id","github","verify","apple","mobile"])}
      </div>
    `}heroRow(t){return i.c`
      <div class="hero-row" data-state=${this.loading?"loading":"default"}>
        ${t.map(this.heroIcon.bind(this))}
      </div>
    `}heroIcon(t){return i.c`
      <wui-icon-box
        size="xl"
        iconSize="xxl"
        iconColor="fg-100"
        backgroundColor="fg-100"
        icon=${t}
        data-state=${this.loading?"loading":"default"}
        isOpaque
        class="hero-row-icon"
      >
      </wui-icon-box>
    `}paragraph(){return this.loading?i.c`
        <wui-text variant="paragraph-400" color="fg-200" align="center"
          >We are verifying your account with email
          <wui-text variant="paragraph-600" color="accent-100">${this.email}</wui-text> and address
          <wui-text variant="paragraph-600" color="fg-100">
            ${E.f.getTruncateString({string:this.address,charsEnd:4,charsStart:4,truncate:"middle"})} </wui-text
          >, please wait a moment.</wui-text
        >
      `:this.isRequired?i.c`
        <wui-text variant="paragraph-600" color="fg-100" align="center">
          ${this.appName} requires your email for authentication.
        </wui-text>
      `:i.c`
      <wui-flex flexDirection="column" gap="xs" alignItems="center">
        <wui-text variant="paragraph-600" color="fg-100" align="center" size>
          ${this.appName} would like to collect your email.
        </wui-text>

        <wui-text variant="small-400" color="fg-200" align="center">
          Don't worry, it's optional&mdash;you can skip this step.
        </wui-text>
      </wui-flex>
    `}emailInput(){if(this.loading)return null;let t=t=>{"Enter"===t.key&&this.onSubmit()},e=t=>{this.email=t.detail};return i.c`
      <wui-flex flexDirection="column">
        <wui-email-input
          .value=${this.email}
          .disabled=${this.loading}
          @inputChange=${e}
          @keydown=${t}
        ></wui-email-input>

        <w3m-email-suffixes-widget
          .email=${this.email}
          @change=${e}
        ></w3m-email-suffixes-widget>
      </wui-flex>
    `}recentEmailsWidget(){if(0===this.recentEmails.length||this.loading)return null;let t=t=>{this.email=t.detail,this.onSubmit()};return i.c`
      <w3m-recent-emails-widget
        .emails=${this.recentEmails}
        @select=${t}
      ></w3m-recent-emails-widget>
    `}footerActions(){return i.c`
      <wui-flex flexDirection="row" fullWidth gap="s">
        ${this.isRequired?null:i.c`<wui-button
              size="lg"
              variant="neutral"
              fullWidth
              .disabled=${this.loading}
              @click=${this.onSkip.bind(this)}
              >Skip this step</wui-button
            >`}

        <wui-button
          size="lg"
          variant="main"
          type="submit"
          fullWidth
          .disabled=${!this.email||!this.isValidEmail(this.email)}
          .loading=${this.loading}
          @click=${this.onSubmit.bind(this)}
        >
          Continue
        </wui-button>
      </wui-flex>
    `}async onSubmit(){if(!(this.siwx instanceof v.ReownAuthentication))return void y.f.showError("ReownAuthentication is not initialized. Please contact support.");let t=m.f.getActiveCaipAddress();if(!t)throw Error("Account is not connected.");if(!this.isValidEmail(this.email))return void y.f.showError("Please provide a valid email.");try{this.loading=!0;let e=await this.siwx.requestEmailOtp({email:this.email,account:t});this.pushRecentEmail(this.email),null===e.uuid?w.f.replace("SIWXSignMessage"):w.f.replace("DataCaptureOtpConfirm",{email:this.email})}catch(t){y.f.showError("Failed to send email OTP"),this.loading=!1}}onSkip(){w.f.replace("SIWXSignMessage")}getRecentEmails(){let t=k.y.getItem(k.A.RECENT_EMAILS);return(t?t.split(","):[]).filter(this.isValidEmail.bind(this)).slice(0,3)}pushRecentEmail(t){let e=Array.from(new Set([t,...this.getRecentEmails()])).slice(0,3);k.y.setItem(k.A.RECENT_EMAILS,e.join(","))}isValidEmail(t){return/^\S+@\S+\.\S+$/u.test(t)}};T.styles=[I],A([(0,g.f)()],T.prototype,"email",void 0),A([(0,g.f)()],T.prototype,"address",void 0),A([(0,g.f)()],T.prototype,"loading",void 0),A([(0,g.f)()],T.prototype,"appName",void 0),A([(0,g.f)()],T.prototype,"siwx",void 0),A([(0,g.f)()],T.prototype,"isRequired",void 0),A([(0,g.f)()],T.prototype,"recentEmails",void 0),T=A([(0,a.f)("w3m-data-capture-view")],T),t.s(["W3mDataCaptureView",0,T],294120),t.i(1206),t.i(373050),t.i(590255),t.i(294120),t.s(["W3mDataCaptureOtpConfirmView",0,$,"W3mDataCaptureView",0,T,"W3mEmailSuffixesWidget",0,c,"W3mRecentEmailsWidget",0,p],818329)},26892,t=>{t.i(812207);var e,i=t.i(108285),r=t.i(654479);t.i(374576);var a=t.i(56350),o=t.i(149454),n=t.i(227302),s=t.i(221728),l=t.i(811424);t.i(404041);var c=t.i(645975);t.i(62238),t.i(210380),t.i(421147);var u=i,d=t.i(120119);t.i(73944);var h=t.i(459088),p=t.i(112699),g=i,m=t.i(162611);let f=m.m`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 48px;
    height: 48px;
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[4]};
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
    font-family: ${({fontFamily:t})=>t.regular};
    font-size: ${({textSize:t})=>t.large};
    line-height: 18px;
    letter-spacing: -0.16px;
    text-align: center;
    color: ${({tokens:t})=>t.theme.textPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      border-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: ${({spacing:t})=>t[4]};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  input:focus-visible:enabled {
    background-color: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }
`;var w=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let y=class extends g.f{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return r.c`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};y.styles=[h.e,h.j,f],w([(0,d.f)({type:Boolean})],y.prototype,"disabled",void 0),w([(0,d.f)({type:String})],y.prototype,"value",void 0),y=w([(0,c.f)("wui-input-numeric")],y);var v=t.i(315193);let b=v.m`
  :host {
    position: relative;
    display: block;
  }
`;var x=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let $=class extends u.f{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=t=>this.values.slice(0,t).every(t=>""!==t),this.handleKeyDown=(t,e)=>{let i=t.target,r=this.getInputElement(i);if(!r)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(t.key)&&t.preventDefault();let a=r.selectionStart;switch(t.key){case"ArrowLeft":a&&r.setSelectionRange(a+1,a+1),this.focusInputField("prev",e);break;case"ArrowRight":case"Shift":this.focusInputField("next",e);break;case"Delete":case"Backspace":""===r.value?this.focusInputField("prev",e):this.updateInput(r,e,"")}},this.focusInputField=(t,e)=>{if("next"===t){let t=e+1;if(!this.shouldInputBeEnabled(t))return;let i=this.numerics[t<this.length?t:e],r=i?this.getInputElement(i):void 0;r&&(r.disabled=!1,r.focus())}if("prev"===t){let t=e-1,i=this.numerics[t>-1?t:e],r=i?this.getInputElement(i):void 0;r&&r.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));let t=this.shadowRoot?.querySelectorAll("wui-input-numeric");t&&(this.numerics=Array.from(t)),this.numerics[0]?.focus()}render(){return r.c`
      <wui-flex gap="1" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((t,e)=>r.c`
            <wui-input-numeric
              @input=${t=>this.handleInput(t,e)}
              @click=${t=>this.selectInput(t)}
              @keydown=${t=>this.handleKeyDown(t,e)}
              .disabled=${!this.shouldInputBeEnabled(e)}
              .value=${this.values[e]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(t,e,i){let r=this.numerics[e],a=t||(r?this.getInputElement(r):void 0);a&&(a.value=i,this.values=this.values.map((t,r)=>r===e?i:t))}selectInput(t){let e=t.target;if(e){let t=this.getInputElement(e);t?.select()}}handleInput(t,e){let i=t.target,r=this.getInputElement(i);if(r){let i=r.value;"insertFromPaste"===t.inputType?this.handlePaste(r,i,e):p.f.isNumber(i)&&t.data?(this.updateInput(r,e,t.data),this.focusInputField("next",e)):this.updateInput(r,e,"")}this.dispatchInputChangeEvent()}handlePaste(t,e,i){let r=e[0];if(r&&p.f.isNumber(r)){this.updateInput(t,i,r);let a=e.substring(1);if(i+1<this.length&&a.length){let t=this.numerics[i+1],e=t?this.getInputElement(t):void 0;e&&this.handlePaste(e,a,i+1)}else this.focusInputField("next",i)}else this.updateInput(t,i,"")}getInputElement(t){return t.shadowRoot?.querySelector("input")?t.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){let t=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:t,bubbles:!0,composed:!0}))}};$.styles=[h.e,b],x([(0,d.f)({type:Number})],$.prototype,"length",void 0),x([(0,d.f)({type:String})],$.prototype,"otp",void 0),x([(0,a.f)()],$.prototype,"values",void 0),$=x([(0,c.f)("wui-otp")],$),t.i(249536);var S=t.i(810923);let k=v.m`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var E=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let I=e=class extends i.f{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=S.f.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=s.f.state.data?.email,this.authConnector=o.f.getAuthConnector()}render(){if(!this.email)throw Error("w3m-email-otp-widget: No email provided");let t=!!this.timeoutTimeLeft,e=this.getFooterLabels(t);return r.c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["4","0","4","0"]}
        gap="4"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0","5","0","5"]}
        >
          <wui-text variant="md-regular" color="primary" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="md-medium" color="primary" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="sm-regular" color="secondary">The code expires in 20 minutes</wui-text>

        ${this.loading?r.c`<wui-loading-spinner size="xl" color="accent-primary"></wui-loading-spinner>`:r.c` <wui-flex flexDirection="column" alignItems="center" gap="2">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?r.c`
                    <wui-text variant="sm-regular" align="center" color="error">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="2">
          <wui-text variant="sm-regular" color="secondary">${e.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${t}>
            ${e.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=S.f.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=S.f.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(t){try{!this.loading&&(this.otp=t.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await this.onOtpSubmit?.(this.otp)))}catch(t){this.error=n.f.parseError(t),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){if(this.error="",this.otp="",!o.f.getAuthConnector()||!this.email)throw Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),l.f.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(t){l.f.showError(t)}finally{this.loading=!1}}getFooterLabels(t){return this.onStartOver?{title:"Something wrong?",action:`Try again ${t?`in ${this.timeoutTimeLeft}s`:""}`}:{title:"Didn't receive it?",action:`Resend ${t?`in ${this.timeoutTimeLeft}s`:"Code"}`}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===e.OTP_LENGTH}};I.OTP_LENGTH=6,I.styles=k,E([(0,a.f)()],I.prototype,"loading",void 0),E([(0,a.f)()],I.prototype,"timeoutTimeLeft",void 0),E([(0,a.f)()],I.prototype,"error",void 0),I=e=E([(0,c.f)("w3m-email-otp-widget")],I),t.s(["W3mEmailOtpWidget",0,I],26892)},62238,112699,73944,249536,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119),a=t.i(459088);let o={getSpacingStyles:(t,e)=>Array.isArray(t)?t[e]?`var(--apkt-spacing-${t[e]})`:void 0:"string"==typeof t?`var(--apkt-spacing-${t})`:void 0,getFormattedDate:t=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t),formatCurrency(t=0,e={}){let i=Number(t);return isNaN(i)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...e}).format(i)},getHostName(t){try{return new URL(t).hostname}catch(t){return""}},getTruncateString:({string:t,charsStart:e,charsEnd:i,truncate:r})=>t.length<=e+i?t:"end"===r?`${t.substring(0,e)}...`:"start"===r?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`,generateAvatarColors(t){let e=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(e),r=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),a=100-3*Number(r?.replace("px","")),o=`${a}% ${a}% at 65% 40%`,n=[];for(let t=0;t<5;t+=1){let e=this.tintColor(i,.15*t);n.push(`rgb(${e[0]}, ${e[1]}, ${e[2]})`)}return`
    --local-color-1: ${n[0]};
    --local-color-2: ${n[1]};
    --local-color-3: ${n[2]};
    --local-color-4: ${n[3]};
    --local-color-5: ${n[4]};
    --local-radial-circle: ${o}
   `},hexToRgb(t){let e=parseInt(t,16);return[e>>16&255,e>>8&255,255&e]},tintColor(t,e){let[i,r,a]=t;return[Math.round(i+(255-i)*e),Math.round(r+(255-r)*e),Math.round(a+(255-a)*e)]},isNumber:t=>/^[0-9]+$/u.test(t),getColorTheme:t=>t?t:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(t){let e=t.split(".");return 2===e.length?[e[0],e[1]]:["0","00"]},roundNumber:(t,e,i)=>t.toString().length>=e?Number(t).toFixed(i):t,cssDurationToNumber:t=>t.endsWith("s")?1e3*Number(t.replace("s","")):t.endsWith("ms")?Number(t.replace("ms","")):0,maskInput({value:t,decimals:e,integers:i}){if("."===(t=t.replace(",",".")))return"0.";let[r="",a]=t.split(".").map(t=>t.replace(/[^0-9]/gu,"")),o=i?r.substring(0,i):r,n=2===o.length?String(Number(o)):o,s="number"==typeof e?a?.substring(0,e):a;return("string"==typeof s&&("number"!=typeof e||e>0)?[n,s].join("."):n)??""},capitalize:t=>t?t.charAt(0).toUpperCase()+t.slice(1):""};t.s(["f",0,o],112699);var n=t.i(645975),s=t.i(315193);let l=s.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var c=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let u=class extends e.f{render(){return this.style.cssText=`
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
      padding-top: ${this.padding&&o.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&o.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&o.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&o.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&o.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&o.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&o.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&o.getSpacingStyles(this.margin,3)};
      width: ${this.width};
    `,i.c`<slot></slot>`}};u.styles=[a.e,l],c([(0,r.f)()],u.prototype,"flexDirection",void 0),c([(0,r.f)()],u.prototype,"flexWrap",void 0),c([(0,r.f)()],u.prototype,"flexBasis",void 0),c([(0,r.f)()],u.prototype,"flexGrow",void 0),c([(0,r.f)()],u.prototype,"flexShrink",void 0),c([(0,r.f)()],u.prototype,"alignItems",void 0),c([(0,r.f)()],u.prototype,"justifyContent",void 0),c([(0,r.f)()],u.prototype,"columnGap",void 0),c([(0,r.f)()],u.prototype,"rowGap",void 0),c([(0,r.f)()],u.prototype,"gap",void 0),c([(0,r.f)()],u.prototype,"padding",void 0),c([(0,r.f)()],u.prototype,"margin",void 0),c([(0,r.f)()],u.prototype,"width",void 0),u=c([(0,n.f)("wui-flex")],u),t.s([],73944),t.s([],62238),t.i(839009),t.s([],249536)},210380,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119);t.i(852634),t.i(839009);var a=t.i(459088),o=t.i(645975),n=t.i(162611);let s=n.m`
  button {
    border: none;
    background: transparent;
    height: 20px;
    padding: ${({spacing:t})=>t[2]};
    column-gap: ${({spacing:t})=>t[1]};
    border-radius: ${({borderRadius:t})=>t[1]};
    padding: 0 ${({spacing:t})=>t[1]};
    border-radius: ${({spacing:t})=>t[1]};
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent'] {
    color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  button[data-variant='secondary'] {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[data-variant='accent']:focus-visible:enabled {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible:enabled {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-variant='accent']:hover:enabled {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  button[data-variant='secondary']:hover:enabled {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var l=function(t,e,i,r){var a,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(a=t[s])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let c={sm:"sm-medium",md:"md-medium"},u={accent:"accent-primary",secondary:"secondary"},d=class extends e.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.variant="accent",this.icon=void 0}render(){return i.c`
      <button ?disabled=${this.disabled} data-variant=${this.variant}>
        <slot name="iconLeft"></slot>
        <wui-text
          color=${u[this.variant]}
          variant=${c[this.size]}
        >
          <slot></slot>
        </wui-text>
        ${this.iconTemplate()}
      </button>
    `}iconTemplate(){return this.icon?i.c`<wui-icon name=${this.icon} size="sm"></wui-icon>`:null}};d.styles=[a.e,a.j,s],l([(0,r.f)()],d.prototype,"size",void 0),l([(0,r.f)({type:Boolean})],d.prototype,"disabled",void 0),l([(0,r.f)()],d.prototype,"variant",void 0),l([(0,r.f)()],d.prototype,"icon",void 0),d=l([(0,o.f)("wui-link")],d),t.s([],210380)},421147,t=>{t.i(383227),t.s([])}])})();