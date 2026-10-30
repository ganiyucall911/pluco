(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,683026,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(56350);e.i(234051);var o=e.i(829389),n=e.i(241845),s=e.i(803468),a=e.i(230121),c=e.i(82283),l=e.i(455587);e.i(404041);var u=e.i(645975);e.i(62238),e.i(143053),e.i(249536),e.i(729084);var d=e.i(162611);let p=d.m`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var f=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let m=class extends t.f{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=a.f.state.paymentCurrency,this.currencies=a.f.state.paymentCurrencies,this.currencyImages=n.f.state.currencyImages,this.checked=l.f.state.isLegalCheckboxChecked,this.unsubscribe.push(a.f.subscribe(e=>{this.selectedCurrency=e.paymentCurrency,this.currencies=e.paymentCurrencies}),n.f.subscribeKey("currencyImages",e=>this.currencyImages=e),l.f.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=c.f.state,r=c.f.state.features?.legalCheckbox,n=!!(e||t)&&!!r&&!this.checked;return i.c`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        gap="2"
        class=${(0,o.f)(n?"disabled":void 0)}
      >
        ${this.currenciesTemplate(n)}
      </wui-flex>
    `}currenciesTemplate(e=!1){return this.currencies.map(t=>i.c`
        <wui-list-item
          imageSrc=${(0,o.f)(this.currencyImages?.[t.id])}
          @click=${()=>this.selectCurrency(t)}
          variant="image"
          tabIdx=${(0,o.f)(e?-1:void 0)}
        >
          <wui-text variant="md-medium" color="primary">${t.id}</wui-text>
        </wui-list-item>
      `)}selectCurrency(e){e&&(a.f.setPaymentCurrency(e),s.f.close())}};m.styles=p,f([(0,r.f)()],m.prototype,"selectedCurrency",void 0),f([(0,r.f)()],m.prototype,"currencies",void 0),f([(0,r.f)()],m.prototype,"currencyImages",void 0),f([(0,r.f)()],m.prototype,"checked",void 0),m=f([(0,u.f)("w3m-onramp-fiat-select-view")],m),e.s(["W3mOnrampFiatSelectView",0,m],531349);var h=t,y=e.i(960398),g=e.i(227302),w=e.i(653157),b=e.i(221728),v=e.i(564126),x=e.i(979484),$=t,k=e.i(120119),C=e.i(436220);e.i(443452),e.i(869609),e.i(421147),e.i(357650);let P=d.m`
  button {
    padding: ${({spacing:e})=>e["3"]};
    border-radius: ${({borderRadius:e})=>e["4"]};
    border: none;
    outline: none;
    background-color: ${({tokens:e})=>e.core.glass010};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({spacing:e})=>e["3"]};
    transition: background-color ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: background-color;
    cursor: pointer;
  }

  button:hover {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .provider-image {
    width: ${({spacing:e})=>e["10"]};
    min-width: ${({spacing:e})=>e["10"]};
    height: ${({spacing:e})=>e["10"]};
    border-radius: calc(
      ${({borderRadius:e})=>e["4"]} - calc(${({spacing:e})=>e["3"]} / 2)
    );
    position: relative;
    overflow: hidden;
  }

  .network-icon {
    width: ${({spacing:e})=>e["3"]};
    height: ${({spacing:e})=>e["3"]};
    border-radius: calc(${({spacing:e})=>e["3"]} / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px ${({tokens:e})=>e.theme.foregroundPrimary},
      0 0 0 3px ${({tokens:e})=>e.theme.backgroundPrimary};
    transition: box-shadow ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px ${({tokens:e})=>e.core.glass010},
      0 0 0 3px ${({tokens:e})=>e.theme.backgroundPrimary};
  }
`;var R=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let I=class extends $.f{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="",this.feeRange="",this.loading=!1,this.onClick=null}render(){return i.c`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${(0,o.f)(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="01">
          <wui-text variant="md-regular" color="primary">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="4">
            <wui-text variant="sm-medium" color="primary">
              <wui-text variant="sm-regular" color="secondary">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="2">
              <wui-icon name="bank" size="sm" color="default"></wui-icon>
              <wui-icon name="card" size="sm" color="default"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading?i.c`<wui-loading-spinner color="secondary" size="md"></wui-loading-spinner>`:i.c`<wui-icon name="chevronRight" color="default" size="sm"></wui-icon>`}
      </button>
    `}networksTemplate(){let e=y.f.getAllRequestedCaipNetworks(),t=e?.filter(e=>e?.assets?.imageId)?.slice(0,5);return i.c`
      <wui-flex class="networks">
        ${t?.map(e=>i.c`
            <wui-flex class="network-icon">
              <wui-image src=${(0,o.f)(C.f.getNetworkImage(e))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `}};I.styles=[P],R([(0,k.f)({type:Boolean})],I.prototype,"disabled",void 0),R([(0,k.f)()],I.prototype,"color",void 0),R([(0,k.f)()],I.prototype,"name",void 0),R([(0,k.f)()],I.prototype,"label",void 0),R([(0,k.f)()],I.prototype,"feeRange",void 0),R([(0,k.f)({type:Boolean})],I.prototype,"loading",void 0),R([(0,k.f)()],I.prototype,"onClick",void 0),I=R([(0,u.f)("w3m-onramp-provider-item")],I),e.i(550230);var O=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let A=class extends h.f{constructor(){super(),this.unsubscribe=[],this.providers=a.f.state.providers,this.unsubscribe.push(a.f.subscribeKey("providers",e=>{this.providers=e}))}render(){return i.c`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="2">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
    `}onRampProvidersTemplate(){return this.providers.filter(e=>e.supportedChains.includes(y.f.state.activeChain??"eip155")).map(e=>i.c`
          <w3m-onramp-provider-item
            label=${e.label}
            name=${e.name}
            feeRange=${e.feeRange}
            @click=${()=>{this.onClickProvider(e)}}
            ?disabled=${!e.url}
            data-testid=${`onramp-provider-${e.name}`}
          ></w3m-onramp-provider-item>
        `)}onClickProvider(e){a.f.setSelectedProvider(e),b.f.push("BuyInProgress"),g.f.openHref(a.f.state.selectedProvider?.url||e.url,"popupWindow","width=600,height=800,scrollbars=yes"),w.f.sendEvent({type:"track",event:"SELECT_BUY_PROVIDER",properties:{provider:e.name,isSmartAccount:(0,v.P)(y.f.state.activeChain)===x.P.ACCOUNT_TYPES.SMART_ACCOUNT}})}};O([(0,r.f)()],A.prototype,"providers",void 0),A=O([(0,u.f)("w3m-onramp-providers-view")],A),e.s(["W3mOnRampProvidersView",0,A],212292);var j=t;e.i(225416);let T=d.m`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var B=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let S=class extends j.f{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=a.f.state.purchaseCurrencies,this.tokens=a.f.state.purchaseCurrencies,this.tokenImages=n.f.state.tokenImages,this.checked=l.f.state.isLegalCheckboxChecked,this.unsubscribe.push(a.f.subscribe(e=>{this.selectedCurrency=e.purchaseCurrencies,this.tokens=e.purchaseCurrencies}),n.f.subscribeKey("tokenImages",e=>this.tokenImages=e),l.f.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=c.f.state,r=c.f.state.features?.legalCheckbox,n=!!(e||t)&&!!r&&!this.checked;return i.c`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        gap="2"
        class=${(0,o.f)(n?"disabled":void 0)}
      >
        ${this.currenciesTemplate(n)}
      </wui-flex>
    `}currenciesTemplate(e=!1){return this.tokens.map(t=>i.c`
        <wui-list-item
          imageSrc=${(0,o.f)(this.tokenImages?.[t.symbol])}
          @click=${()=>this.selectToken(t)}
          variant="image"
          tabIdx=${(0,o.f)(e?-1:void 0)}
        >
          <wui-flex gap="1" alignItems="center">
            <wui-text variant="md-medium" color="primary">${t.name}</wui-text>
            <wui-text variant="sm-regular" color="secondary">${t.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `)}selectToken(e){e&&(a.f.setPurchaseCurrency(e),s.f.close())}};S.styles=T,B([(0,r.f)()],S.prototype,"selectedCurrency",void 0),B([(0,r.f)()],S.prototype,"tokens",void 0),B([(0,r.f)()],S.prototype,"tokenImages",void 0),B([(0,r.f)()],S.prototype,"checked",void 0),S=B([(0,u.f)("w3m-onramp-token-select-view")],S),e.s(["W3mOnrampTokensView",0,S],896775);var z=t,D=e.i(971080),W=e.i(811424),L=e.i(639403);e.i(534420),e.i(746650),e.i(210380),e.i(595157);let V=d.m`
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

  wui-visual {
    border-radius: calc(
      ${({borderRadius:e})=>e["1"]} * 9 - ${({borderRadius:e})=>e["3"]}
    );
    position: relative;
    overflow: hidden;
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

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: ${({spacing:e})=>e["01"]} ${({spacing:e})=>e["2"]};
  }
`;var E=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let K=class extends z.f{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=a.f.state.selectedProvider,this.uri=D.f.state.wcUri,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.error=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(a.f.subscribeKey("selectedProvider",e=>{this.selectedOnRampProvider=e}))}disconnectedCallback(){this.intervalId&&clearInterval(this.intervalId)}render(){let e="Continue in external window";this.error?e="Buy failed":this.selectedOnRampProvider&&(e=`Buy in ${this.selectedOnRampProvider?.label}`);let t=this.error?"Buy can be declined from your side or due to and error on the provider app":"We’ll notify you once your Buy is processed";return i.c`
      <wui-flex
        data-error=${(0,o.f)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${(0,o.f)(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["4","0","0","0"]}
        >
          <wui-text variant="md-medium" color=${this.error?"error":"primary"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="sm-medium" color="secondary">${t}</wui-text>
        </wui-flex>

        ${this.error?this.tryAgainTemplate():null}
      </wui-flex>

      <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="secondary">
          <wui-icon size="sm" color="default" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `}onTryAgain(){this.selectedOnRampProvider&&(this.error=!1,g.f.openHref(this.selectedOnRampProvider.url,"popupWindow","width=600,height=800,scrollbars=yes"))}tryAgainTemplate(){return this.selectedOnRampProvider?.url?i.c`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`:null}loaderTemplate(){let e=L.f.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return i.c`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){if(!this.selectedOnRampProvider?.url){W.f.showError("No link found"),b.f.goBack();return}try{g.f.copyToClopboard(this.selectedOnRampProvider.url),W.f.showSuccess("Link copied")}catch{W.f.showError("Failed to copy")}}};K.styles=V,E([(0,r.f)()],K.prototype,"intervalId",void 0),E([(0,r.f)()],K.prototype,"selectedOnRampProvider",void 0),E([(0,r.f)()],K.prototype,"uri",void 0),E([(0,r.f)()],K.prototype,"ready",void 0),E([(0,r.f)()],K.prototype,"showRetry",void 0),E([(0,r.f)()],K.prototype,"buffering",void 0),E([(0,r.f)()],K.prototype,"error",void 0),E([(0,k.f)({type:Boolean})],K.prototype,"isMobile",void 0),E([(0,k.f)()],K.prototype,"onRetry",void 0),K=E([(0,u.f)("w3m-buy-in-progress-view")],K),e.s(["W3mBuyInProgressView",0,K],504364);var U=t;let q=class extends U.f{render(){return i.c`
      <wui-flex
        flexDirection="column"
        .padding=${["6","10","5","10"]}
        alignItems="center"
        gap="5"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="2" alignItems="center">
          <wui-text align="center" variant="md-medium" color="primary">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="sm-regular" color="secondary">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${b.f.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `}};q=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s}([(0,u.f)("w3m-what-is-a-buy-view")],q),e.s(["W3mWhatIsABuyView",0,q],840768);var F=t,N=t;e.i(6957);let M=d.m`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e["2"]};
    height: 40px;
    padding: ${({spacing:e})=>e["2"]} ${({spacing:e})=>e["2"]}
      ${({spacing:e})=>e["2"]} ${({spacing:e})=>e["2"]};
    min-width: 95px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundPrimary};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;var Q=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let X=class extends N.f{constructor(){super(),this.unsubscribe=[],this.type="Token",this.value=0,this.currencies=[],this.selectedCurrency=this.currencies?.[0],this.currencyImages=n.f.state.currencyImages,this.tokenImages=n.f.state.tokenImages,this.unsubscribe.push(a.f.subscribeKey("purchaseCurrency",e=>{e&&"Fiat"!==this.type&&(this.selectedCurrency=this.formatPurchaseCurrency(e))}),a.f.subscribeKey("paymentCurrency",e=>{e&&"Token"!==this.type&&(this.selectedCurrency=this.formatPaymentCurrency(e))}),a.f.subscribe(e=>{"Fiat"===this.type?this.currencies=e.purchaseCurrencies.map(this.formatPurchaseCurrency):this.currencies=e.paymentCurrencies.map(this.formatPaymentCurrency)}),n.f.subscribe(e=>{this.currencyImages={...e.currencyImages},this.tokenImages={...e.tokenImages}}))}firstUpdated(){a.f.getAvailableCurrencies()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.selectedCurrency?.symbol||"",t=this.currencyImages[e]||this.tokenImages[e];return i.c`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency?i.c` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="1"
            @click=${()=>s.f.open({view:`OnRamp${this.type}Select`})}
          >
            <wui-image src=${(0,o.f)(t)}></wui-image>
            <wui-text color="primary">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`:i.c`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`}formatPaymentCurrency(e){return{name:e.id,symbol:e.id}}formatPurchaseCurrency(e){return{name:e.name,symbol:e.symbol}}};X.styles=M,Q([(0,k.f)({type:String})],X.prototype,"type",void 0),Q([(0,k.f)({type:Number})],X.prototype,"value",void 0),Q([(0,r.f)()],X.prototype,"currencies",void 0),Q([(0,r.f)()],X.prototype,"selectedCurrency",void 0),Q([(0,r.f)()],X.prototype,"currencyImages",void 0),Q([(0,r.f)()],X.prototype,"tokenImages",void 0),X=Q([(0,u.f)("w3m-onramp-input")],X);let Y=d.m`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: ${({borderRadius:e})=>e["8"]};
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`;var _=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let G={USD:"$",EUR:"€",GBP:"£"},H=[100,250,500,1e3],J=class extends F.f{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.caipAddress=y.f.state.activeCaipAddress,this.loading=s.f.state.loading,this.paymentCurrency=a.f.state.paymentCurrency,this.paymentAmount=a.f.state.paymentAmount,this.purchaseAmount=a.f.state.purchaseAmount,this.quoteLoading=a.f.state.quotesLoading,this.unsubscribe.push(y.f.subscribeKey("activeCaipAddress",e=>this.caipAddress=e),s.f.subscribeKey("loading",e=>{this.loading=e}),a.f.subscribe(e=>{this.paymentCurrency=e.paymentCurrency,this.paymentAmount=e.paymentAmount,this.purchaseAmount=e.purchaseAmount,this.quoteLoading=e.quotesLoading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.c`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount||0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount||0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="2">
            ${H.map(e=>i.c`<wui-button
                  variant=${this.paymentAmount===e?"accent-secondary":"neutral-secondary"}
                  size="md"
                  textVariant="md-medium"
                  fullWidth
                  @click=${()=>this.selectPresetAmount(e)}
                  >${`${G[this.paymentCurrency?.id||"USD"]} ${e}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `}templateButton(){return this.caipAddress?i.c`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="accent-primary"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`:i.c`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`}getQuotes(){this.loading||s.f.open({view:"OnRampProviders"})}openModal(){s.f.open({view:"Connect"})}async onPaymentAmountChange(e){a.f.setPaymentAmount(Number(e.detail)),await a.f.getQuote()}async selectPresetAmount(e){a.f.setPaymentAmount(e),await a.f.getQuote()}};J.styles=Y,_([(0,k.f)({type:Boolean})],J.prototype,"disabled",void 0),_([(0,r.f)()],J.prototype,"caipAddress",void 0),_([(0,r.f)()],J.prototype,"loading",void 0),_([(0,r.f)()],J.prototype,"paymentCurrency",void 0),_([(0,r.f)()],J.prototype,"paymentAmount",void 0),_([(0,r.f)()],J.prototype,"purchaseAmount",void 0),_([(0,r.f)()],J.prototype,"quoteLoading",void 0),J=_([(0,u.f)("w3m-onramp-widget")],J),e.s(["W3mOnrampWidget",0,J],109520),e.i(531349),e.i(212292),e.i(896775),e.i(504364),e.i(840768),e.i(109520),e.s(["W3mBuyInProgressView",0,K,"W3mOnRampProvidersView",0,A,"W3mOnrampFiatSelectView",0,m,"W3mOnrampTokensView",0,S,"W3mOnrampWidget",0,J,"W3mWhatIsABuyView",0,q],683026)},869609,e=>{e.i(864380),e.s([])},143053,e=>{e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var r=e.i(120119);e.i(234051);var o=e.i(829389);e.i(383227),e.i(839009);var n=e.i(459088),s=e.i(645975),a=e.i(162611);let c=a.m`
  :host {
    width: 100%;
  }

  :host([data-type='primary']) > button {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  :host([data-type='secondary']) > button {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:e})=>e[3]};
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      scale ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  @media (hover: hover) {
    :host([data-type='primary']) > button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }

    :host([data-type='secondary']) > button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var l=function(e,t,i,r){var o,n=arguments.length,s=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,i,s):o(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let u=class extends t.f{constructor(){super(...arguments),this.type="primary",this.imageSrc="google",this.imageSize=void 0,this.loading=!1,this.boxColor="foregroundPrimary",this.disabled=!1,this.rightIcon=!0,this.boxed=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",this.dataset.type=this.type,i.c`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        tabindex=${(0,o.f)(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?i.c`<wui-image
        icon=${this.icon}
        iconColor=${(0,o.f)(this.iconColor)}
        ?boxed=${this.boxed}
        ?rounded=${this.rounded}
        boxColor=${this.boxColor}
      ></wui-image>`:i.c`<wui-image
      ?boxed=${this.boxed}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      size=${(0,o.f)(this.imageSize)}
      src=${this.imageSrc}
      boxColor=${this.boxColor}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?i.c`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:i.c`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};u.styles=[n.e,n.j,c],l([(0,r.f)()],u.prototype,"type",void 0),l([(0,r.f)()],u.prototype,"imageSrc",void 0),l([(0,r.f)()],u.prototype,"imageSize",void 0),l([(0,r.f)()],u.prototype,"icon",void 0),l([(0,r.f)()],u.prototype,"iconColor",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"loading",void 0),l([(0,r.f)()],u.prototype,"tabIdx",void 0),l([(0,r.f)()],u.prototype,"boxColor",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"disabled",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"rightIcon",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"boxed",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"rounded",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"fullSize",void 0),u=l([(0,s.f)("wui-list-item")],u),e.s([],143053)}])})();