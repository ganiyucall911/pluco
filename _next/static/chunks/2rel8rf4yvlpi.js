(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,986565,t=>{var e=t.i(960398),i=t.i(971080),r=t.i(227302),o=t.i(653157),a=t.i(803468),n=t.i(82283),s=t.i(221728),l=t.i(218454),c=t.i(811424);t.i(404041);var d=t.i(645975),u=t.i(26892);let p=class extends u.W3mEmailOtpWidget{constructor(){super(...arguments),this.onOtpSubmit=async t=>{try{if(this.authConnector){let r=e.f.state.activeChain,d=i.f.getConnections(r),u=n.f.state.remoteFeatures?.multiWallet,p=d.length>0;if(await this.authConnector.provider.connectOtp({otp:t}),o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),r)await i.f.connectExternal(this.authConnector,r);else throw Error("Active chain is not set on ChainController");if(n.f.state.remoteFeatures?.emailCapture)return;if(n.f.state.siwx){await l.f.isAuthenticated()&&a.f.close();return}if(p&&u){s.f.replace("ProfileWallets"),c.f.showSuccess("New Wallet Added");return}a.f.close()}}catch(t){throw o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:r.f.parseError(t)}}),t}},this.onOtpResend=async t=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:t}),o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};p=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n}([(0,d.f)("w3m-email-verify-otp-view")],p),t.s(["W3mEmailVerifyOtpView",0,p],349468),t.i(812207);var h=t.i(108285),f=t.i(654479);t.i(374576);var m=t.i(56350),g=t.i(149454);t.i(62238),t.i(746650),t.i(210380),t.i(249536);var b=t.i(162611);let v=b.m`
  wui-icon-box {
    height: ${({spacing:t})=>t["16"]};
    width: ${({spacing:t})=>t["16"]};
  }
`;var y=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let w=class extends h.f{constructor(){super(),this.email=s.f.state.data?.email,this.authConnector=g.f.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw Error("w3m-email-verify-device-view: No auth connector provided");return f.c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["6","3","6","3"]}
        gap="4"
      >
        <wui-icon-box size="xl" color="accent-primary" icon="sealCheck"></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="3">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="md-regular" color="primary">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="md-regular" color="primary"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="sm-regular" color="secondary" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="2">
            <wui-text variant="sm-regular" color="primary" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),o.f.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),s.f.replace("EmailVerifyOtp",{email:this.email})}catch(t){s.f.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),c.f.showSuccess("Code email resent")}}catch(t){c.f.showError(t)}finally{this.loading=!1}}};w.styles=v,y([(0,m.f)()],w.prototype,"loading",void 0),w=y([(0,d.f)("w3m-email-verify-device-view")],w),t.s(["W3mEmailVerifyDeviceView",0,w],639385);var $=h;t.i(684326);var x=t.i(765090);t.i(534420),t.i(39299);var E=t.i(315193);let O=E.m`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var k=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let I=class extends $.f{constructor(){super(...arguments),this.formRef=(0,x.J)(),this.initialEmail=s.f.state.data?.email??"",this.redirectView=s.f.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",t=>{"Enter"===t.key&&this.onSubmitEmail(t)})}render(){return f.c`
      <wui-flex flexDirection="column" padding="4" gap="4">
        <form ${(0,x.C)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(t){this.email=t.detail}async onSubmitEmail(t){try{if(this.loading)return;this.loading=!0,t.preventDefault();let e=g.f.getAuthConnector();if(!e)throw Error("w3m-update-email-wallet: Auth connector not found");let i=await e.provider.updateEmail({email:this.email});o.f.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===i.action?s.f.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):s.f.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(t){c.f.showError(t),this.loading=!1}}buttonsTemplate(){let t=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?f.c`
      <wui-flex gap="3">
        <wui-button size="md" variant="neutral" fullWidth @click=${s.f.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!t}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:f.c`
        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!t}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};I.styles=O,k([(0,m.f)()],I.prototype,"email",void 0),k([(0,m.f)()],I.prototype,"loading",void 0),I=k([(0,d.f)("w3m-update-email-wallet-view")],I),t.s(["W3mUpdateEmailWalletView",0,I],168265);var A=u;let C=class extends A.W3mEmailOtpWidget{constructor(){super(),this.email=s.f.state.data?.email,this.onOtpSubmit=async t=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:t}),o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),s.f.replace("UpdateEmailSecondaryOtp",s.f.state.data))}catch(t){throw o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:r.f.parseError(t)}}),t}},this.onStartOver=()=>{s.f.replace("UpdateEmailWallet",s.f.state.data)}}};C=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n}([(0,d.f)("w3m-update-email-primary-otp-view")],C),t.s(["W3mUpdateEmailPrimaryOtpView",0,C],282746);var S=u;let R=class extends S.W3mEmailOtpWidget{constructor(){super(),this.email=s.f.state.data?.newEmail,this.redirectView=s.f.state.data?.redirectView,this.onOtpSubmit=async t=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:t}),o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&s.f.reset(this.redirectView))}catch(t){throw o.f.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:r.f.parseError(t)}}),t}},this.onStartOver=()=>{s.f.replace("UpdateEmailWallet",s.f.state.data)}}};R=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n}([(0,d.f)("w3m-update-email-secondary-otp-view")],R),t.s(["W3mUpdateEmailSecondaryOtpView",0,R],534349);var T=h,P=t.i(401564),D=t.i(16555),_=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let j=class extends T.f{constructor(){super(),this.authConnector=g.f.getAuthConnector(),this.isEmailEnabled=n.f.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(g.f.state.connectors),this.connectors=g.f.state.connectors,g.f.subscribeKey("connectors",t=>{this.connectors=t,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw Error("w3m-email-login-view: No auth connector provided");return f.c`<wui-flex flexDirection="column" .padding=${["1","3","3","3"]} gap="4">
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(t){let e=t.filter(t=>t.type===D.f.CONNECTOR_TYPE_AUTH).map(t=>t.chain);return P.f.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(t=>e.includes(t))}};_([(0,m.f)()],j.prototype,"connectors",void 0),j=_([(0,d.f)("w3m-email-login-view")],j),t.s(["W3mEmailLoginView",0,j],863611),t.i(349468),t.i(639385),t.i(168265),t.i(282746),t.i(534349),t.i(863611),t.s(["W3mEmailLoginView",0,j,"W3mEmailOtpWidget",()=>u.W3mEmailOtpWidget,"W3mEmailVerifyDeviceView",0,w,"W3mEmailVerifyOtpView",0,p,"W3mUpdateEmailPrimaryOtpView",0,C,"W3mUpdateEmailSecondaryOtpView",0,R,"W3mUpdateEmailWalletView",0,I],986565)},26892,t=>{t.i(812207);var e,i=t.i(108285),r=t.i(654479);t.i(374576);var o=t.i(56350),a=t.i(149454),n=t.i(227302),s=t.i(221728),l=t.i(811424);t.i(404041);var c=t.i(645975);t.i(62238),t.i(210380),t.i(421147);var d=i,u=t.i(120119);t.i(73944);var p=t.i(459088),h=t.i(112699),f=i,m=t.i(162611);let g=m.m`
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
`;var b=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let v=class extends f.f{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return r.c`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};v.styles=[p.e,p.j,g],b([(0,u.f)({type:Boolean})],v.prototype,"disabled",void 0),b([(0,u.f)({type:String})],v.prototype,"value",void 0),v=b([(0,c.f)("wui-input-numeric")],v);var y=t.i(315193);let w=y.m`
  :host {
    position: relative;
    display: block;
  }
`;var $=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let x=class extends d.f{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=t=>this.values.slice(0,t).every(t=>""!==t),this.handleKeyDown=(t,e)=>{let i=t.target,r=this.getInputElement(i);if(!r)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(t.key)&&t.preventDefault();let o=r.selectionStart;switch(t.key){case"ArrowLeft":o&&r.setSelectionRange(o+1,o+1),this.focusInputField("prev",e);break;case"ArrowRight":case"Shift":this.focusInputField("next",e);break;case"Delete":case"Backspace":""===r.value?this.focusInputField("prev",e):this.updateInput(r,e,"")}},this.focusInputField=(t,e)=>{if("next"===t){let t=e+1;if(!this.shouldInputBeEnabled(t))return;let i=this.numerics[t<this.length?t:e],r=i?this.getInputElement(i):void 0;r&&(r.disabled=!1,r.focus())}if("prev"===t){let t=e-1,i=this.numerics[t>-1?t:e],r=i?this.getInputElement(i):void 0;r&&r.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));let t=this.shadowRoot?.querySelectorAll("wui-input-numeric");t&&(this.numerics=Array.from(t)),this.numerics[0]?.focus()}render(){return r.c`
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
    `}updateInput(t,e,i){let r=this.numerics[e],o=t||(r?this.getInputElement(r):void 0);o&&(o.value=i,this.values=this.values.map((t,r)=>r===e?i:t))}selectInput(t){let e=t.target;if(e){let t=this.getInputElement(e);t?.select()}}handleInput(t,e){let i=t.target,r=this.getInputElement(i);if(r){let i=r.value;"insertFromPaste"===t.inputType?this.handlePaste(r,i,e):h.f.isNumber(i)&&t.data?(this.updateInput(r,e,t.data),this.focusInputField("next",e)):this.updateInput(r,e,"")}this.dispatchInputChangeEvent()}handlePaste(t,e,i){let r=e[0];if(r&&h.f.isNumber(r)){this.updateInput(t,i,r);let o=e.substring(1);if(i+1<this.length&&o.length){let t=this.numerics[i+1],e=t?this.getInputElement(t):void 0;e&&this.handlePaste(e,o,i+1)}else this.focusInputField("next",i)}else this.updateInput(t,i,"")}getInputElement(t){return t.shadowRoot?.querySelector("input")?t.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){let t=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:t,bubbles:!0,composed:!0}))}};x.styles=[p.e,w],$([(0,u.f)({type:Number})],x.prototype,"length",void 0),$([(0,u.f)({type:String})],x.prototype,"otp",void 0),$([(0,o.f)()],x.prototype,"values",void 0),x=$([(0,c.f)("wui-otp")],x),t.i(249536);var E=t.i(810923);let O=y.m`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var k=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let I=e=class extends i.f{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=E.f.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=s.f.state.data?.email,this.authConnector=a.f.getAuthConnector()}render(){if(!this.email)throw Error("w3m-email-otp-widget: No email provided");let t=!!this.timeoutTimeLeft,e=this.getFooterLabels(t);return r.c`
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
    `}startOTPTimeout(){this.timeoutTimeLeft=E.f.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=E.f.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(t){try{!this.loading&&(this.otp=t.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await this.onOtpSubmit?.(this.otp)))}catch(t){this.error=n.f.parseError(t),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){if(this.error="",this.otp="",!a.f.getAuthConnector()||!this.email)throw Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),l.f.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(t){l.f.showError(t)}finally{this.loading=!1}}getFooterLabels(t){return this.onStartOver?{title:"Something wrong?",action:`Try again ${t?`in ${this.timeoutTimeLeft}s`:""}`}:{title:"Didn't receive it?",action:`Resend ${t?`in ${this.timeoutTimeLeft}s`:"Code"}`}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===e.OTP_LENGTH}};I.OTP_LENGTH=6,I.styles=O,k([(0,o.f)()],I.prototype,"loading",void 0),k([(0,o.f)()],I.prototype,"timeoutTimeLeft",void 0),k([(0,o.f)()],I.prototype,"error",void 0),I=e=k([(0,c.f)("w3m-email-otp-widget")],I),t.s(["W3mEmailOtpWidget",0,I],26892)},534420,624947,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119);t.i(852634),t.i(383227),t.i(839009);var o=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({spacing:t})=>t[2]};
    transition:
      scale ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-1"]},
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      border-radius ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-1"]};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({borderRadius:t})=>t[2]};
    padding: 0 ${({spacing:t})=>t[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({borderRadius:t})=>t[3]};
    padding: 0 ${({spacing:t})=>t[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({borderRadius:t})=>t[4]};
    padding: 0 ${({spacing:t})=>t[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({tokens:t})=>t.core.backgroundAccentPrimary};
    color: ${({tokens:t})=>t.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
    color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({tokens:t})=>t.theme.backgroundInvert};
    color: ${({tokens:t})=>t.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({tokens:t})=>t.core.textError};
    color: ${({tokens:t})=>t.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({tokens:t})=>t.core.backgroundError};
    color: ${({tokens:t})=>t.core.textError};
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
`;var l=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let c={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},d={lg:"md",md:"md",sm:"sm"},u=class extends e.f{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let t=this.textVariant??c[this.size];return i.c`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let t=d[this.size],e="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return i.c`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`}return null}};u.styles=[o.e,o.j,s],l([(0,r.f)()],u.prototype,"size",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"disabled",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"fullWidth",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"loading",void 0),l([(0,r.f)()],u.prototype,"variant",void 0),l([(0,r.f)()],u.prototype,"textVariant",void 0),u=l([(0,a.f)("wui-button")],u),t.s([],624947),t.s([],534420)},39299,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119);t.i(234051);var o=t.i(829389);t.i(852634),t.i(839009);var a=t.i(459088),n=t.i(645975);t.i(835902);var s=t.i(315193);let l=s.m`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var c=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let d=class extends e.f{constructor(){super(...arguments),this.disabled=!1}render(){return i.c`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="lg"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,o.f)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?i.c`<wui-text variant="sm-regular" color="error">${this.errorMessage}</wui-text>`:null}};d.styles=[a.e,l],c([(0,r.f)()],d.prototype,"errorMessage",void 0),c([(0,r.f)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,r.f)()],d.prototype,"value",void 0),c([(0,r.f)()],d.prototype,"tabIdx",void 0),d=c([(0,n.f)("wui-email-input")],d),t.s([],39299)},62238,112699,73944,249536,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119),o=t.i(459088);let a={getSpacingStyles:(t,e)=>Array.isArray(t)?t[e]?`var(--apkt-spacing-${t[e]})`:void 0:"string"==typeof t?`var(--apkt-spacing-${t})`:void 0,getFormattedDate:t=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t),formatCurrency(t=0,e={}){let i=Number(t);return isNaN(i)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...e}).format(i)},getHostName(t){try{return new URL(t).hostname}catch(t){return""}},getTruncateString:({string:t,charsStart:e,charsEnd:i,truncate:r})=>t.length<=e+i?t:"end"===r?`${t.substring(0,e)}...`:"start"===r?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`,generateAvatarColors(t){let e=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(e),r=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),o=100-3*Number(r?.replace("px","")),a=`${o}% ${o}% at 65% 40%`,n=[];for(let t=0;t<5;t+=1){let e=this.tintColor(i,.15*t);n.push(`rgb(${e[0]}, ${e[1]}, ${e[2]})`)}return`
    --local-color-1: ${n[0]};
    --local-color-2: ${n[1]};
    --local-color-3: ${n[2]};
    --local-color-4: ${n[3]};
    --local-color-5: ${n[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(t){let e=parseInt(t,16);return[e>>16&255,e>>8&255,255&e]},tintColor(t,e){let[i,r,o]=t;return[Math.round(i+(255-i)*e),Math.round(r+(255-r)*e),Math.round(o+(255-o)*e)]},isNumber:t=>/^[0-9]+$/u.test(t),getColorTheme:t=>t?t:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(t){let e=t.split(".");return 2===e.length?[e[0],e[1]]:["0","00"]},roundNumber:(t,e,i)=>t.toString().length>=e?Number(t).toFixed(i):t,cssDurationToNumber:t=>t.endsWith("s")?1e3*Number(t.replace("s","")):t.endsWith("ms")?Number(t.replace("ms","")):0,maskInput({value:t,decimals:e,integers:i}){if("."===(t=t.replace(",",".")))return"0.";let[r="",o]=t.split(".").map(t=>t.replace(/[^0-9]/gu,"")),a=i?r.substring(0,i):r,n=2===a.length?String(Number(a)):a,s="number"==typeof e?o?.substring(0,e):o;return("string"==typeof s&&("number"!=typeof e||e>0)?[n,s].join("."):n)??""},capitalize:t=>t?t.charAt(0).toUpperCase()+t.slice(1):""};t.s(["f",0,a],112699);var n=t.i(645975),s=t.i(315193);let l=s.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var c=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let d=class extends e.f{render(){return this.style.cssText=`
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
    `,i.c`<slot></slot>`}};d.styles=[o.e,l],c([(0,r.f)()],d.prototype,"flexDirection",void 0),c([(0,r.f)()],d.prototype,"flexWrap",void 0),c([(0,r.f)()],d.prototype,"flexBasis",void 0),c([(0,r.f)()],d.prototype,"flexGrow",void 0),c([(0,r.f)()],d.prototype,"flexShrink",void 0),c([(0,r.f)()],d.prototype,"alignItems",void 0),c([(0,r.f)()],d.prototype,"justifyContent",void 0),c([(0,r.f)()],d.prototype,"columnGap",void 0),c([(0,r.f)()],d.prototype,"rowGap",void 0),c([(0,r.f)()],d.prototype,"gap",void 0),c([(0,r.f)()],d.prototype,"padding",void 0),c([(0,r.f)()],d.prototype,"margin",void 0),c([(0,r.f)()],d.prototype,"width",void 0),d=c([(0,n.f)("wui-flex")],d),t.s([],73944),t.s([],62238),t.i(839009),t.s([],249536)},746650,t=>{t.i(912190),t.s([])},210380,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119);t.i(852634),t.i(839009);var o=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
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
`;var l=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let c={sm:"sm-medium",md:"md-medium"},d={accent:"accent-primary",secondary:"secondary"},u=class extends e.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.variant="accent",this.icon=void 0}render(){return i.c`
      <button ?disabled=${this.disabled} data-variant=${this.variant}>
        <slot name="iconLeft"></slot>
        <wui-text
          color=${d[this.variant]}
          variant=${c[this.size]}
        >
          <slot></slot>
        </wui-text>
        ${this.iconTemplate()}
      </button>
    `}iconTemplate(){return this.icon?i.c`<wui-icon name=${this.icon} size="sm"></wui-icon>`:null}};u.styles=[o.e,o.j,s],l([(0,r.f)()],u.prototype,"size",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"disabled",void 0),l([(0,r.f)()],u.prototype,"variant",void 0),l([(0,r.f)()],u.prototype,"icon",void 0),u=l([(0,a.f)("wui-link")],u),t.s([],210380)},421147,t=>{t.i(383227),t.s([])},912190,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119);t.i(234051);var o=t.i(829389);t.i(852634);var a=t.i(459088),n=t.i(645975),s=t.i(162611);let l=s.m`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({borderRadius:t})=>t[2]};
    padding: ${({spacing:t})=>t[1]} !important;
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    position: relative;
  }

  :host([data-padding='2']) {
    padding: ${({spacing:t})=>t[2]} !important;
  }

  :host:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  :host > wui-icon {
    z-index: 10;
  }

  /* -- Colors --------------------------------------------------- */
  :host([data-color='accent-primary']) {
    color: ${({tokens:t})=>t.core.iconAccentPrimary};
  }

  :host([data-color='accent-primary']):after {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  :host([data-color='default']),
  :host([data-color='secondary']) {
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  :host([data-color='default']):after {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  :host([data-color='secondary']):after {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  :host([data-color='success']) {
    color: ${({tokens:t})=>t.core.iconSuccess};
  }

  :host([data-color='success']):after {
    background-color: ${({tokens:t})=>t.core.backgroundSuccess};
  }

  :host([data-color='error']) {
    color: ${({tokens:t})=>t.core.iconError};
  }

  :host([data-color='error']):after {
    background-color: ${({tokens:t})=>t.core.backgroundError};
  }

  :host([data-color='warning']) {
    color: ${({tokens:t})=>t.core.iconWarning};
  }

  :host([data-color='warning']):after {
    background-color: ${({tokens:t})=>t.core.backgroundWarning};
  }

  :host([data-color='inverse']) {
    color: ${({tokens:t})=>t.theme.iconInverse};
  }

  :host([data-color='inverse']):after {
    background-color: transparent;
  }
`;var c=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let d=class extends e.f{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,i.c`
      <wui-icon size=${(0,o.f)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};d.styles=[a.e,a.j,l],c([(0,r.f)()],d.prototype,"icon",void 0),c([(0,r.f)()],d.prototype,"size",void 0),c([(0,r.f)()],d.prototype,"padding",void 0),c([(0,r.f)()],d.prototype,"color",void 0),d=c([(0,n.f)("wui-icon-box")],d),t.s([],912190)},835902,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var r=t.i(120119);t.i(234051);var o=t.i(829389);t.i(684326);var a=t.i(765090);t.i(852634),t.i(839009);var n=t.i(459088),s=t.i(645975),l=t.i(162611);let c=l.m`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.textPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[3]} ${({spacing:t})=>t[10]};
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t["lg-regular"].lineHeight};
    letter-spacing: ${({typography:t})=>t["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:t})=>t[4]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[4]} ${({spacing:t})=>t[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:t})=>t[4]};
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:t})=>t[2]};
    color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:t})=>t[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var d=function(t,e,i,r){var o,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(n=(a<3?o(n):a>3?o(e,i,n):o(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let u=class extends e.f{constructor(){super(...arguments),this.inputElementRef=(0,a.J)(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return i.c` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${(0,a.C)(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${(0,o.f)(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?i.c`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?i.c`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?i.c`<wui-icon name="spinner" size="md"></wui-icon>`:i.c`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?i.c`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?i.c`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};u.styles=[n.e,n.j,c],d([(0,r.f)()],u.prototype,"icon",void 0),d([(0,r.f)({type:Boolean})],u.prototype,"disabled",void 0),d([(0,r.f)({type:Boolean})],u.prototype,"loading",void 0),d([(0,r.f)()],u.prototype,"placeholder",void 0),d([(0,r.f)()],u.prototype,"type",void 0),d([(0,r.f)()],u.prototype,"value",void 0),d([(0,r.f)()],u.prototype,"errorText",void 0),d([(0,r.f)()],u.prototype,"warningText",void 0),d([(0,r.f)()],u.prototype,"onSubmit",void 0),d([(0,r.f)()],u.prototype,"size",void 0),d([(0,r.f)({attribute:!1})],u.prototype,"onKeyDown",void 0),u=d([(0,s.f)("wui-input-text")],u),t.s([],835902)},684326,765090,t=>{var e=t.i(654479);let{I:i}=e.e;var r=t.i(391909);let o=(t,e)=>{let i=t._$AN;if(void 0===i)return!1;for(let t of i)t._$AO?.(e,!1),o(t,e);return!0},a=t=>{let e,i;do{if(void 0===(e=t._$AM))break;(i=e._$AN).delete(t),t=e}while(0===i?.size)},n=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),c(e)}};function s(t){void 0!==this._$AN?(a(this),this._$AM=t,n(this)):this._$AM=t}function l(t,e=!1,i=0){let r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(e)if(Array.isArray(r))for(let t=i;t<r.length;t++)o(r[t],!1),a(r[t]);else null!=r&&(o(r,!1),a(r));else o(this,t)}let c=t=>{t.type==r.x.CHILD&&(t._$AP??=l,t._$AQ??=s)};class d extends r.C{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),n(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(o(this,t),a(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class u{}let p=new WeakMap,h=(0,r.l)(class extends d{render(t){return e.i}update(t,[i]){let r=i!==this.G;return r&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.G=i,this.ht=t.options?.host,this.rt(this.ct=t.element)),e.i}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){let e=this.ht??globalThis,i=p.get(e);void 0===i&&(i=new WeakMap,p.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?p.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});t.s(["J",0,()=>new u,"C",0,h],765090),t.s([],684326)}])})();