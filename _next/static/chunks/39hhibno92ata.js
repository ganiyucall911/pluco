(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,849694,t=>{var e=t.i(365801),i=t.i(742710),o=t.i(675457),r=t.i(564126),a=t.i(360334),n=t.i(227302),s=t.i(124141),c=t.i(24742),l=t.i(960398),d=t.i(653157),u=t.i(82283),p=t.i(811424);let h={paymentAsset:null,amount:null,tokenAmount:0,priceLoading:!1,error:null,exchanges:[],isLoading:!1,currentPayment:void 0,isPaymentInProgress:!1,paymentId:"",assets:[]},m=(0,e.s)(h),g={state:m,subscribe:t=>(0,e.i)(m,()=>t(m)),subscribeKey:(t,e)=>(0,i.T)(m,t,e),resetState(){Object.assign(m,{...h})},async getAssetsForNetwork(t){let e=(0,s.O)(t),i=await g.getAssetsImageAndPrice(e),o=e.map(t=>{let e="native"===t.asset?(0,r.f)():`${t.network}:${t.asset}`,o=i.find(t=>t.fungibles?.[0]?.address?.toLowerCase()===e.toLowerCase());return{...t,price:o?.fungibles?.[0]?.price||1,metadata:{...t.metadata,iconUrl:o?.fungibles?.[0]?.iconUrl}}});return m.assets=o,o},async getAssetsImageAndPrice(t){let e=t.map(t=>"native"===t.asset?(0,r.f)():`${t.network}:${t.asset}`);return await Promise.all(e.map(t=>c.f.fetchTokenPrice({addresses:[t]})))},getTokenAmount(){if(!m?.paymentAsset?.price)throw Error("Cannot get token price");let t=o.f.bigNumber(m.amount??0).round(8),e=o.f.bigNumber(m.paymentAsset.price).round(8);return t.div(e).round(8).toNumber()},setAmount(t){m.amount=t,m.paymentAsset?.price&&(m.tokenAmount=g.getTokenAmount())},setPaymentAsset(t){m.paymentAsset=t},isPayWithExchangeEnabled:()=>u.f.state.remoteFeatures?.payWithExchange,isPayWithExchangeSupported:()=>g.isPayWithExchangeEnabled()&&l.f.state.activeCaipNetwork&&a.W.PAY_WITH_EXCHANGE_SUPPORTED_CHAIN_NAMESPACES.includes(l.f.state.activeCaipNetwork.chainNamespace),async fetchExchanges(){try{let t=g.isPayWithExchangeSupported();if(!m.paymentAsset||!t){m.exchanges=[],m.isLoading=!1;return}m.isLoading=!0;let e=await (0,s.M)({page:0,asset:(0,s.k)(m.paymentAsset.network,m.paymentAsset.asset),amount:m.amount?.toString()??"0"});m.exchanges=e.exchanges.slice(0,2)}catch(t){throw p.f.showError("Unable to get exchanges"),Error("Unable to get exchanges")}finally{m.isLoading=!1}},async getPayUrl(t,e){try{let i=Number(e.amount),o=await (0,s.V)({exchangeId:t,asset:(0,s.k)(e.network,e.asset),amount:i.toString(),recipient:`${e.network}:${e.recipient}`});return d.f.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{exchange:{id:t},configuration:{network:e.network,asset:e.asset,recipient:e.recipient,amount:i},currentPayment:{type:"exchange",exchangeId:t},source:"fund-from-exchange",headless:!1}}),o}catch(t){if(t instanceof Error&&t.message.includes("is not supported"))throw Error("Asset not supported");throw Error(t.message)}},async handlePayWithExchange(t){try{let e=l.f.getAccountData()?.address;if(!e)throw Error("No account connected");if(!m.paymentAsset)throw Error("No payment asset selected");let i=n.f.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!i)throw Error("Could not create popup window");m.isPaymentInProgress=!0,m.paymentId=crypto.randomUUID(),m.currentPayment={type:"exchange",exchangeId:t};let{network:o,asset:r}=m.paymentAsset,a={network:o,asset:r,amount:m.tokenAmount,recipient:e},s=await g.getPayUrl(t,a);if(!s){try{i.close()}catch(t){console.error("Unable to close popup window",t)}throw Error("Unable to initiate payment")}m.currentPayment.sessionId=s.sessionId,m.currentPayment.status="IN_PROGRESS",m.currentPayment.exchangeId=t,i.location.href=s.url}catch(t){m.error="Unable to initiate payment",p.f.showError(m.error)}},async waitUntilComplete({exchangeId:t,sessionId:e,paymentId:i,retries:o=20}){let r=await g.getBuyStatus(t,e,i);if("SUCCESS"===r.status||"FAILED"===r.status)return r;if(0===o)throw Error("Unable to get deposit status");return await new Promise(t=>{setTimeout(t,5e3)}),g.waitUntilComplete({exchangeId:t,sessionId:e,paymentId:i,retries:o-1})},async getBuyStatus(t,e,i){try{if(!m.currentPayment)throw Error("No current payment");let o=await (0,s.W)({sessionId:e,exchangeId:t});if(m.currentPayment.status=o.status,"SUCCESS"===o.status||"FAILED"===o.status){let t=l.f.getAccountData()?.address;m.currentPayment.result=o.txHash,m.isPaymentInProgress=!1,d.f.sendEvent({type:"track",event:"SUCCESS"===o.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===o.status?n.f.parseError(m.error):void 0,source:"fund-from-exchange",paymentId:i,configuration:{network:m.paymentAsset?.network||"",asset:m.paymentAsset?.asset||"",recipient:t||"",amount:m.amount??0},currentPayment:{type:"exchange",exchangeId:m.currentPayment?.exchangeId,sessionId:m.currentPayment?.sessionId,result:o.txHash}}})}return o}catch(t){return{status:"UNKNOWN",txHash:""}}},reset(){m.currentPayment=void 0,m.isPaymentInProgress=!1,m.paymentId="",m.paymentAsset=null,m.amount=0,m.tokenAmount=0,m.priceLoading=!1,m.error=null,m.exchanges=[],m.isLoading=!1}};t.s(["f",0,g])},837116,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(56350);t.i(234051);var r=t.i(829389),a=t.i(436220),n=t.i(960398),s=t.i(971080),c=t.i(849694),l=t.i(221728),d=t.i(811424);t.i(404041);var u=t.i(645975),p=e,h=t.i(120119);t.i(852634),t.i(864380),t.i(839009);var m=t.i(459088),g=t.i(162611);let f=g.m`
  button {
    border: none;
    border-radius: ${({borderRadius:t})=>t["20"]};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({spacing:t})=>t[1]};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, box-shadow;
  }

  /* -- Variants --------------------------------------------------------------- */
  button[data-type='accent'] {
    background-color: ${({tokens:t})=>t.core.backgroundAccentPrimary};
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  button[data-type='neutral'] {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  /* -- Sizes --------------------------------------------------------------- */
  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='sm'] > wui-image,
  button[data-size='sm'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image,
  button[data-size='md'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button[data-size='lg'] > wui-image,
  button[data-size='lg'] > wui-icon {
    width: 24px;
    height: 24px;
  }

  wui-text {
    padding-left: ${({spacing:t})=>t[1]};
    padding-right: ${({spacing:t})=>t[1]};
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t[3]};
    overflow: hidden;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /* -- States --------------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-type='accent']:not(:disabled):hover {
      background-color: ${({tokens:t})=>t.core.foregroundAccent060};
    }

    button[data-type='neutral']:not(:disabled):hover {
      background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
    }
  }

  button[data-type='accent']:not(:disabled):focus-visible,
  button[data-type='accent']:not(:disabled):active {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  button[data-type='neutral']:not(:disabled):focus-visible,
  button[data-type='neutral']:not(:disabled):active {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  button:disabled {
    opacity: 0.5;
  }
`;var b=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let y={sm:"sm-regular",md:"md-regular",lg:"lg-regular"},v=class extends p.f{constructor(){super(...arguments),this.type="accent",this.size="md",this.imageSrc="",this.disabled=!1,this.leftIcon=void 0,this.rightIcon=void 0,this.text=""}render(){return i.c`
      <button ?disabled=${this.disabled} data-type=${this.type} data-size=${this.size}>
        ${this.imageSrc?i.c`<wui-image src=${this.imageSrc}></wui-image>`:null}
        ${this.leftIcon?i.c`<wui-icon name=${this.leftIcon} color="inherit" size="inherit"></wui-icon>`:null}
        <wui-text variant=${y[this.size]} color="inherit">${this.text}</wui-text>
        ${this.rightIcon?i.c`<wui-icon name=${this.rightIcon} color="inherit" size="inherit"></wui-icon>`:null}
      </button>
    `}};v.styles=[m.e,m.j,f],b([(0,h.f)()],v.prototype,"type",void 0),b([(0,h.f)()],v.prototype,"size",void 0),b([(0,h.f)()],v.prototype,"imageSrc",void 0),b([(0,h.f)({type:Boolean})],v.prototype,"disabled",void 0),b([(0,h.f)()],v.prototype,"leftIcon",void 0),b([(0,h.f)()],v.prototype,"rightIcon",void 0),b([(0,h.f)()],v.prototype,"text",void 0),v=b([(0,u.f)("wui-chip-button")],v),t.i(62238),t.i(907170),t.i(869609),t.i(143053),t.i(780313),t.i(249536);var w=e;t.i(534420),t.i(538822),t.i(210380);var x=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let $=class extends w.f{constructor(){super(...arguments),this.maxDecimals=void 0,this.maxIntegers=void 0}render(){return i.c`
      <wui-flex alignItems="center" gap="1">
        <wui-input-amount
          widthVariant="fit"
          fontSize="h2"
          .maxDecimals=${(0,r.f)(this.maxDecimals)}
          .maxIntegers=${(0,r.f)(this.maxIntegers)}
          .value=${this.amount?String(this.amount):""}
        ></wui-input-amount>
        <wui-text variant="md-regular" color="secondary">USD</wui-text>
      </wui-flex>
    `}};x([(0,h.f)({type:Number})],$.prototype,"amount",void 0),x([(0,h.f)({type:Number})],$.prototype,"maxDecimals",void 0),x([(0,h.f)({type:Number})],$.prototype,"maxIntegers",void 0),$=x([(0,u.f)("w3m-fund-input")],$);let k=g.m`
  .amount-input-container {
    border-radius: ${({borderRadius:t})=>t["6"]};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    padding: ${({spacing:t})=>t[1]};
  }

  .container {
    border-radius: 30px;
  }
`;var P=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let A=[10,50,100],S=class extends e.f{constructor(){super(),this.unsubscribe=[],this.network=n.f.state.activeCaipNetwork,this.exchanges=c.f.state.exchanges,this.isLoading=c.f.state.isLoading,this.amount=c.f.state.amount,this.tokenAmount=c.f.state.tokenAmount,this.priceLoading=c.f.state.priceLoading,this.isPaymentInProgress=c.f.state.isPaymentInProgress,this.currentPayment=c.f.state.currentPayment,this.paymentId=c.f.state.paymentId,this.paymentAsset=c.f.state.paymentAsset,this.unsubscribe.push(n.f.subscribeKey("activeCaipNetwork",t=>{this.network=t,this.setDefaultPaymentAsset()}),c.f.subscribe(t=>{this.exchanges=t.exchanges,this.isLoading=t.isLoading,this.amount=t.amount,this.tokenAmount=t.tokenAmount,this.priceLoading=t.priceLoading,this.paymentId=t.paymentId,this.isPaymentInProgress=t.isPaymentInProgress,this.currentPayment=t.currentPayment,this.paymentAsset=t.paymentAsset,t.isPaymentInProgress&&t.currentPayment?.exchangeId&&t.currentPayment?.sessionId&&t.paymentId&&this.handlePaymentInProgress()}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),c.f.state.isPaymentInProgress||c.f.reset()}async firstUpdated(){await this.getPaymentAssets(),this.paymentAsset||await this.setDefaultPaymentAsset(),c.f.setAmount(A[0]),await c.f.fetchExchanges()}render(){return i.c`
      <wui-flex flexDirection="column" class="container">
        ${this.amountInputTemplate()} ${this.exchangesTemplate()}
      </wui-flex>
    `}exchangesLoadingTemplate(){return Array.from({length:2}).map(()=>i.c`<wui-shimmer width="100%" height="65px" borderRadius="xxs"></wui-shimmer>`)}_exchangesTemplate(){return this.exchanges.length>0?this.exchanges.map(t=>i.c`<wui-list-item
              @click=${()=>this.onExchangeClick(t)}
              chevron
              variant="image"
              imageSrc=${t.imageUrl}
              ?loading=${this.isLoading}
            >
              <wui-text variant="md-regular" color="primary">
                Deposit from ${t.name}
              </wui-text>
            </wui-list-item>`):i.c`<wui-flex flexDirection="column" alignItems="center" gap="4" padding="4">
          <wui-text variant="lg-medium" align="center" color="primary">
            No exchanges support this asset on this network
          </wui-text>
        </wui-flex>`}exchangesTemplate(){return i.c`<wui-flex
      flexDirection="column"
      gap="2"
      .padding=${["3","3","3","3"]}
      class="exchanges-container"
    >
      ${this.isLoading?this.exchangesLoadingTemplate():this._exchangesTemplate()}
    </wui-flex>`}amountInputTemplate(){return i.c`
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        class="amount-input-container"
      >
        <wui-flex
          justifyContent="space-between"
          alignItems="center"
          .margin=${["0","0","6","0"]}
        >
          <wui-text variant="md-medium" color="secondary">Asset</wui-text>
          <wui-token-button
            data-testid="deposit-from-exchange-asset-button"
            flexDirection="row-reverse"
            text=${this.paymentAsset?.metadata.symbol||""}
            imageSrc=${this.paymentAsset?.metadata.iconUrl||""}
            @click=${()=>l.f.push("PayWithExchangeSelectAsset")}
            size="lg"
            .chainImageSrc=${(0,r.f)(a.f.getNetworkImage(this.network))}
          >
          </wui-token-button>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          .margin=${["0","0","4","0"]}
        >
          <w3m-fund-input
            @inputChange=${this.onAmountChange.bind(this)}
            .amount=${this.amount}
            .maxDecimals=${6}
            .maxIntegers=${10}
          >
          </w3m-fund-input>
          ${this.tokenAmountTemplate()}
        </wui-flex>
        <wui-flex justifyContent="center" gap="2">
          ${A.map(t=>i.c`<wui-chip-button
                @click=${()=>c.f.setAmount(t)}
                type="neutral"
                size="lg"
                text=${`$${t}`}
              ></wui-chip-button>`)}
        </wui-flex>
      </wui-flex>
    `}tokenAmountTemplate(){return this.priceLoading?i.c`<wui-shimmer
        width="65px"
        height="20px"
        borderRadius="xxs"
        variant="light"
      ></wui-shimmer>`:i.c`
      <wui-text variant="md-regular" color="secondary">
        ${this.tokenAmount.toFixed(4)} ${this.paymentAsset?.metadata.symbol}
      </wui-text>
    `}async onExchangeClick(t){this.amount?await c.f.handlePayWithExchange(t.id):d.f.showError("Please enter an amount")}handlePaymentInProgress(){let t=n.f.state.activeChain,{redirectView:e="Account"}=l.f.state.data??{};this.isPaymentInProgress&&this.currentPayment?.exchangeId&&this.currentPayment?.sessionId&&this.paymentId&&(c.f.waitUntilComplete({exchangeId:this.currentPayment.exchangeId,sessionId:this.currentPayment.sessionId,paymentId:this.paymentId}).then(e=>{"SUCCESS"===e.status?(d.f.showSuccess("Deposit completed"),c.f.reset(),t&&(n.f.fetchTokenBalance(),s.f.updateBalance(t)),l.f.replace("Transactions")):"FAILED"===e.status&&d.f.showError("Deposit failed")}),d.f.showLoading("Deposit in progress..."),l.f.replace(e))}onAmountChange({detail:t}){c.f.setAmount(t?Number(t):null)}async getPaymentAssets(){this.network&&await c.f.getAssetsForNetwork(this.network.caipNetworkId)}async setDefaultPaymentAsset(){if(this.network){let t=await c.f.getAssetsForNetwork(this.network.caipNetworkId);t[0]&&c.f.setPaymentAsset(t[0])}}};S.styles=k,P([(0,o.f)()],S.prototype,"network",void 0),P([(0,o.f)()],S.prototype,"exchanges",void 0),P([(0,o.f)()],S.prototype,"isLoading",void 0),P([(0,o.f)()],S.prototype,"amount",void 0),P([(0,o.f)()],S.prototype,"tokenAmount",void 0),P([(0,o.f)()],S.prototype,"priceLoading",void 0),P([(0,o.f)()],S.prototype,"isPaymentInProgress",void 0),P([(0,o.f)()],S.prototype,"currentPayment",void 0),P([(0,o.f)()],S.prototype,"paymentId",void 0),P([(0,o.f)()],S.prototype,"paymentAsset",void 0),S=P([(0,u.f)("w3m-deposit-from-exchange-view")],S),t.s(["W3mDepositFromExchangeView",0,S],807189);var I=e,C=t.i(227302);t.i(443452),t.i(746650),t.i(6957),t.i(923838),t.i(79929);let z=g.m`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: ${({borderRadius:t})=>t["3"]};
  }
`;var E=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let R=class extends I.f{constructor(){super(),this.unsubscribe=[],this.assets=c.f.state.assets,this.search="",this.onDebouncedSearch=C.f.debounce(t=>{this.search=t}),this.unsubscribe.push(c.f.subscribe(t=>{this.assets=t.assets}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return i.c`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}templateSearchInput(){return i.c`
      <wui-flex gap="2" padding="3">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){let t=this.assets.filter(t=>t.metadata.name.toLowerCase().includes(this.search.toLowerCase())),e=t.length>0;return i.c`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","3","0","3"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["4","3","3","3"]}>
          <wui-text variant="md-medium" color="secondary">Available tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2">
          ${e?t.map(t=>i.c`<wui-list-item
                    .imageSrc=${t.metadata.iconUrl}
                    ?clickable=${!0}
                    @click=${this.handleTokenClick.bind(this,t)}
                  >
                    <wui-text variant="md-medium" color="primary">${t.metadata.name}</wui-text>
                    <wui-text variant="md-regular" color="secondary"
                      >${t.metadata.symbol}</wui-text
                    >
                  </wui-list-item>`):i.c`<wui-flex
                .padding=${["20","0","0","0"]}
                alignItems="center"
                flexDirection="column"
                gap="4"
              >
                <wui-icon-box icon="coinPlaceholder" color="default" size="lg"></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="2"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <wui-text variant="lg-medium" align="center" color="primary">
                    No tokens found
                  </wui-text>
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){l.f.push("OnRampProviders")}onInputChange(t){this.onDebouncedSearch(t.detail)}handleTokenClick(t){c.f.setPaymentAsset(t),l.f.goBack()}};R.styles=z,E([(0,o.f)()],R.prototype,"assets",void 0),E([(0,o.f)()],R.prototype,"search",void 0),R=E([(0,u.f)("w3m-deposit-from-exchange-select-asset-view")],R),t.s(["W3mDepositFromExchangeSelectAssetView",0,R],517240),t.i(807189),t.i(517240),t.s(["W3mDepositFromExchangeSelectAssetView",0,R,"W3mDepositFromExchangeView",0,S],837116)},534420,624947,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(852634),t.i(383227),t.i(839009);var r=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
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
`;var c=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let l={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},d={lg:"md",md:"md",sm:"sm"},u=class extends e.f{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let t=this.textVariant??l[this.size];return i.c`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let t=d[this.size],e="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return i.c`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`}return null}};u.styles=[r.e,r.j,s],c([(0,o.f)()],u.prototype,"size",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"fullWidth",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"loading",void 0),c([(0,o.f)()],u.prototype,"variant",void 0),c([(0,o.f)()],u.prototype,"textVariant",void 0),u=c([(0,a.f)("wui-button")],u),t.s([],624947),t.s([],534420)},62238,112699,73944,249536,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119),r=t.i(459088);let a={getSpacingStyles:(t,e)=>Array.isArray(t)?t[e]?`var(--apkt-spacing-${t[e]})`:void 0:"string"==typeof t?`var(--apkt-spacing-${t})`:void 0,getFormattedDate:t=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t),formatCurrency(t=0,e={}){let i=Number(t);return isNaN(i)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...e}).format(i)},getHostName(t){try{return new URL(t).hostname}catch(t){return""}},getTruncateString:({string:t,charsStart:e,charsEnd:i,truncate:o})=>t.length<=e+i?t:"end"===o?`${t.substring(0,e)}...`:"start"===o?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`,generateAvatarColors(t){let e=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(e),o=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),r=100-3*Number(o?.replace("px","")),a=`${r}% ${r}% at 65% 40%`,n=[];for(let t=0;t<5;t+=1){let e=this.tintColor(i,.15*t);n.push(`rgb(${e[0]}, ${e[1]}, ${e[2]})`)}return`
    --local-color-1: ${n[0]};
    --local-color-2: ${n[1]};
    --local-color-3: ${n[2]};
    --local-color-4: ${n[3]};
    --local-color-5: ${n[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(t){let e=parseInt(t,16);return[e>>16&255,e>>8&255,255&e]},tintColor(t,e){let[i,o,r]=t;return[Math.round(i+(255-i)*e),Math.round(o+(255-o)*e),Math.round(r+(255-r)*e)]},isNumber:t=>/^[0-9]+$/u.test(t),getColorTheme:t=>t?t:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(t){let e=t.split(".");return 2===e.length?[e[0],e[1]]:["0","00"]},roundNumber:(t,e,i)=>t.toString().length>=e?Number(t).toFixed(i):t,cssDurationToNumber:t=>t.endsWith("s")?1e3*Number(t.replace("s","")):t.endsWith("ms")?Number(t.replace("ms","")):0,maskInput({value:t,decimals:e,integers:i}){if("."===(t=t.replace(",",".")))return"0.";let[o="",r]=t.split(".").map(t=>t.replace(/[^0-9]/gu,"")),a=i?o.substring(0,i):o,n=2===a.length?String(Number(a)):a,s="number"==typeof e?r?.substring(0,e):r;return("string"==typeof s&&("number"!=typeof e||e>0)?[n,s].join("."):n)??""},capitalize:t=>t?t.charAt(0).toUpperCase()+t.slice(1):""};t.s(["f",0,a],112699);var n=t.i(645975),s=t.i(315193);let c=s.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var l=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let d=class extends e.f{render(){return this.style.cssText=`
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
    `,i.c`<slot></slot>`}};d.styles=[r.e,c],l([(0,o.f)()],d.prototype,"flexDirection",void 0),l([(0,o.f)()],d.prototype,"flexWrap",void 0),l([(0,o.f)()],d.prototype,"flexBasis",void 0),l([(0,o.f)()],d.prototype,"flexGrow",void 0),l([(0,o.f)()],d.prototype,"flexShrink",void 0),l([(0,o.f)()],d.prototype,"alignItems",void 0),l([(0,o.f)()],d.prototype,"justifyContent",void 0),l([(0,o.f)()],d.prototype,"columnGap",void 0),l([(0,o.f)()],d.prototype,"rowGap",void 0),l([(0,o.f)()],d.prototype,"gap",void 0),l([(0,o.f)()],d.prototype,"padding",void 0),l([(0,o.f)()],d.prototype,"margin",void 0),l([(0,o.f)()],d.prototype,"width",void 0),d=l([(0,n.f)("wui-flex")],d),t.s([],73944),t.s([],62238),t.i(839009),t.s([],249536)},746650,t=>{t.i(912190),t.s([])},907170,695553,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(852634);var r=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
  button {
    background-color: transparent;
    padding: ${({spacing:t})=>t[1]};
  }

  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  button[data-variant='accent']:hover:enabled,
  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  button[data-variant='primary']:hover:enabled,
  button[data-variant='primary']:focus-visible,
  button[data-variant='secondary']:hover:enabled,
  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  button[data-size='xs'] > wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='xs'],
  button[data-size='sm'] {
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='md'],
  button[data-size='lg'] {
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='md'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button:disabled {
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`;var c=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let l=class extends e.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="default",this.variant="accent"}render(){return i.c`
      <button data-variant=${this.variant} ?disabled=${this.disabled} data-size=${this.size}>
        <wui-icon
          color=${({accent:"accent-primary",primary:"inverse",secondary:"default"})[this.variant]||this.iconColor}
          size=${this.size}
          name=${this.icon}
        ></wui-icon>
      </button>
    `}};l.styles=[r.e,r.j,s],c([(0,o.f)()],l.prototype,"size",void 0),c([(0,o.f)({type:Boolean})],l.prototype,"disabled",void 0),c([(0,o.f)()],l.prototype,"icon",void 0),c([(0,o.f)()],l.prototype,"iconColor",void 0),c([(0,o.f)()],l.prototype,"variant",void 0),l=c([(0,a.f)("wui-icon-link")],l),t.s([],695553),t.s([],907170)},443452,t=>{t.i(852634),t.s([])},869609,t=>{t.i(864380),t.s([])},538822,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(684326);var r=t.i(765090),a=t.i(162611),n=t.i(459088),s=t.i(112699),c=t.i(645975);let l=a.m`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([data-error='true']) > input {
    color: ${({tokens:t})=>t.core.textError};
  }

  :host([data-error='false']) > input {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  input {
    background: transparent;
    height: auto;
    box-sizing: border-box;
    color: ${({tokens:t})=>t.theme.textPrimary};
    font-feature-settings: 'case' on;
    font-size: ${({textSize:t})=>t.h4};
    caret-color: ${({tokens:t})=>t.core.backgroundAccentPrimary};
    line-height: ${({typography:t})=>t["h4-regular-mono"].lineHeight};
    letter-spacing: ${({typography:t})=>t["h4-regular-mono"].letterSpacing};
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  :host([data-width-variant='auto']) input {
    width: 100%;
  }

  :host([data-width-variant='fit']) input {
    width: 1ch;
  }

  .wui-input-amount-fit-mirror {
    position: absolute;
    visibility: hidden;
    white-space: pre;
    font-size: var(--local-font-size);
    line-height: 130%;
    letter-spacing: -1.28px;
    font-family: ${({fontFamily:t})=>t.mono};
  }

  .wui-input-amount-fit-width {
    display: inline-block;
    position: relative;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }
`;var d=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let u=class extends e.f{constructor(){super(...arguments),this.inputElementRef=(0,r.J)(),this.disabled=!1,this.value="",this.placeholder="0",this.widthVariant="auto",this.maxDecimals=void 0,this.maxIntegers=void 0,this.fontSize="h4",this.error=!1}firstUpdated(){this.resizeInput()}updated(){this.style.setProperty("--local-font-size",a.i.textSize[this.fontSize]),this.resizeInput()}render(){return(this.dataset.widthVariant=this.widthVariant,this.dataset.error=String(this.error),this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),"auto"===this.widthVariant)?this.inputTemplate():i.c`
      <div class="wui-input-amount-fit-width">
        <span class="wui-input-amount-fit-mirror"></span>
        ${this.inputTemplate()}
      </div>
    `}inputTemplate(){return i.c`<input
      ${(0,r.C)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    />`}dispatchInputChangeEvent(){this.inputElementRef.value&&(this.inputElementRef.value.value=s.f.maskInput({value:this.inputElementRef.value.value,decimals:this.maxDecimals,integers:this.maxIntegers}),this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value.value,bubbles:!0,composed:!0})),this.resizeInput())}resizeInput(){if("fit"===this.widthVariant){let t=this.inputElementRef.value;if(t){let e=t.previousElementSibling;e&&(e.textContent=t.value||"0",t.style.width=`${e.offsetWidth}px`)}}}};u.styles=[n.e,n.j,l],d([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),d([(0,o.f)({type:String})],u.prototype,"value",void 0),d([(0,o.f)({type:String})],u.prototype,"placeholder",void 0),d([(0,o.f)({type:String})],u.prototype,"widthVariant",void 0),d([(0,o.f)({type:Number})],u.prototype,"maxDecimals",void 0),d([(0,o.f)({type:Number})],u.prototype,"maxIntegers",void 0),d([(0,o.f)({type:String})],u.prototype,"fontSize",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"error",void 0),u=d([(0,c.f)("wui-input-amount")],u),t.s([],538822)},6957,t=>{t.i(835902),t.s([])},210380,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(852634),t.i(839009);var r=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
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
`;var c=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let l={sm:"sm-medium",md:"md-medium"},d={accent:"accent-primary",secondary:"secondary"},u=class extends e.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.variant="accent",this.icon=void 0}render(){return i.c`
      <button ?disabled=${this.disabled} data-variant=${this.variant}>
        <slot name="iconLeft"></slot>
        <wui-text
          color=${d[this.variant]}
          variant=${l[this.size]}
        >
          <slot></slot>
        </wui-text>
        ${this.iconTemplate()}
      </button>
    `}iconTemplate(){return this.icon?i.c`<wui-icon name=${this.icon} size="sm"></wui-icon>`:null}};u.styles=[r.e,r.j,s],c([(0,o.f)()],u.prototype,"size",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,o.f)()],u.prototype,"variant",void 0),c([(0,o.f)()],u.prototype,"icon",void 0),u=c([(0,a.f)("wui-link")],u),t.s([],210380)},143053,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(234051);var r=t.i(829389);t.i(383227),t.i(839009);var a=t.i(459088),n=t.i(645975),s=t.i(162611);let c=s.m`
  :host {
    width: 100%;
  }

  :host([data-type='primary']) > button {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  :host([data-type='secondary']) > button {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:t})=>t[3]};
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      scale ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  @media (hover: hover) {
    :host([data-type='primary']) > button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }

    :host([data-type='secondary']) > button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var l=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let d=class extends e.f{constructor(){super(...arguments),this.type="primary",this.imageSrc="google",this.imageSize=void 0,this.loading=!1,this.boxColor="foregroundPrimary",this.disabled=!1,this.rightIcon=!0,this.boxed=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",this.dataset.type=this.type,i.c`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        tabindex=${(0,r.f)(this.tabIdx)}
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
        iconColor=${(0,r.f)(this.iconColor)}
        ?boxed=${this.boxed}
        ?rounded=${this.rounded}
        boxColor=${this.boxColor}
      ></wui-image>`:i.c`<wui-image
      ?boxed=${this.boxed}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      size=${(0,r.f)(this.imageSize)}
      src=${this.imageSrc}
      boxColor=${this.boxColor}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?i.c`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:i.c`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};d.styles=[a.e,a.j,c],l([(0,o.f)()],d.prototype,"type",void 0),l([(0,o.f)()],d.prototype,"imageSrc",void 0),l([(0,o.f)()],d.prototype,"imageSize",void 0),l([(0,o.f)()],d.prototype,"icon",void 0),l([(0,o.f)()],d.prototype,"iconColor",void 0),l([(0,o.f)({type:Boolean})],d.prototype,"loading",void 0),l([(0,o.f)()],d.prototype,"tabIdx",void 0),l([(0,o.f)()],d.prototype,"boxColor",void 0),l([(0,o.f)({type:Boolean})],d.prototype,"disabled",void 0),l([(0,o.f)({type:Boolean})],d.prototype,"rightIcon",void 0),l([(0,o.f)({type:Boolean})],d.prototype,"boxed",void 0),l([(0,o.f)({type:Boolean})],d.prototype,"rounded",void 0),l([(0,o.f)({type:Boolean})],d.prototype,"fullSize",void 0),d=l([(0,n.f)("wui-list-item")],d),t.s([],143053)},923838,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119),r=t.i(56350),a=t.i(675457);t.i(852634),t.i(864380),t.i(839009),t.i(73944);var n=t.i(459088),s=t.i(645975),c=t.i(162611);let l=c.m`
  :host {
    width: 100%;
  }

  button {
    padding: ${({spacing:t})=>t[3]};
    display: flex;
    gap: ${({spacing:t})=>t[3]};
    justify-content: space-between;
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    background-color: transparent;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }

  button:focus-visible:enabled {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: ${({spacing:t})=>t[10]};
    height: ${({spacing:t})=>t[10]};
  }

  wui-image {
    border-radius: ${({borderRadius:t})=>t[16]};
  }

  .token-name-container {
    flex: 1;
  }
`;var d=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let u=class extends e.f{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1,this.imageError=!1}render(){return i.c`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="2" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex
            flexDirection="column"
            justifyContent="space-between"
            gap="1"
            class="token-name-container"
          >
            <wui-text variant="md-regular" color="primary" lineClamp="1">
              ${this.tokenName}
            </wui-text>
            <wui-text variant="sm-regular-mono" color="secondary">
              ${a.f.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          justifyContent="space-between"
          gap="1"
          alignItems="flex-end"
          width="auto"
        >
          <wui-text variant="md-regular-mono" color="primary"
            >$${this.tokenValue.toFixed(2)}</wui-text
          >
          <wui-text variant="sm-regular-mono" color="secondary">
            ${a.f.formatNumberToLocalString(this.tokenAmount,4)}
          </wui-text>
        </wui-flex>
      </button>
    `}updated(t){t.has("tokenImageUrl")&&(this.imageError=!1)}visualTemplate(){return this.tokenName&&this.tokenImageUrl&&!this.imageError?i.c`<wui-image
        alt=${this.tokenName}
        src=${this.tokenImageUrl}
        @onLoadError=${this.handleImageError}
      ></wui-image>`:i.c`<wui-icon name="coinPlaceholder" color="default"></wui-icon>`}handleImageError(){this.imageError=!0}};u.styles=[n.e,n.j,l],d([(0,o.f)()],u.prototype,"tokenName",void 0),d([(0,o.f)()],u.prototype,"tokenImageUrl",void 0),d([(0,o.f)({type:Number})],u.prototype,"tokenValue",void 0),d([(0,o.f)()],u.prototype,"tokenAmount",void 0),d([(0,o.f)()],u.prototype,"tokenCurrency",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"clickable",void 0),d([(0,r.f)()],u.prototype,"imageError",void 0),u=d([(0,s.f)("wui-list-token")],u),t.s([],923838)},79929,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(839009);var r=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({tokens:t})=>t.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  :host([data-bg-color='primary']) > wui-text {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  :host([data-bg-color='secondary']) > wui-text {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }
`;var c=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let l=class extends e.f{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,i.c`${this.template()}`}template(){return this.text?i.c`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};l.styles=[r.e,s],c([(0,o.f)()],l.prototype,"text",void 0),c([(0,o.f)()],l.prototype,"bgColor",void 0),l=c([(0,a.f)("wui-separator")],l),t.s([],79929)},780313,t=>{t.i(864576),t.s([])},864576,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119),r=t.i(645975),a=t.i(162611);let n=a.m`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:t})=>t.theme.foregroundPrimary} 0%,
      ${({tokens:t})=>t.theme.foregroundSecondary} 50%,
      ${({tokens:t})=>t.theme.foregroundPrimary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:t})=>t[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;var s=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let c=class extends e.f{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",i.c`<slot></slot>`}};c.styles=[n],s([(0,o.f)()],c.prototype,"width",void 0),s([(0,o.f)()],c.prototype,"height",void 0),s([(0,o.f)()],c.prototype,"variant",void 0),s([(0,o.f)({type:Boolean})],c.prototype,"rounded",void 0),c=s([(0,r.f)("wui-shimmer")],c),t.s([],864576)},912190,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(234051);var r=t.i(829389);t.i(852634);var a=t.i(459088),n=t.i(645975),s=t.i(162611);let c=s.m`
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
`;var l=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let d=class extends e.f{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,i.c`
      <wui-icon size=${(0,r.f)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};d.styles=[a.e,a.j,c],l([(0,o.f)()],d.prototype,"icon",void 0),l([(0,o.f)()],d.prototype,"size",void 0),l([(0,o.f)()],d.prototype,"padding",void 0),l([(0,o.f)()],d.prototype,"color",void 0),d=l([(0,n.f)("wui-icon-box")],d),t.s([],912190)},835902,t=>{t.i(812207);var e=t.i(108285),i=t.i(654479);t.i(374576);var o=t.i(120119);t.i(234051);var r=t.i(829389);t.i(684326);var a=t.i(765090);t.i(852634),t.i(839009);var n=t.i(459088),s=t.i(645975),c=t.i(162611);let l=c.m`
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
`;var d=function(t,e,i,o){var r,a=arguments.length,n=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(n=(a<3?r(n):a>3?r(e,i,n):r(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n};let u=class extends e.f{constructor(){super(...arguments),this.inputElementRef=(0,a.J)(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return i.c` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${(0,a.C)(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${(0,r.f)(this.enterKeyHint)}
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
      </button>`:null}templateError(){return this.errorText?i.c`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?i.c`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};u.styles=[n.e,n.j,l],d([(0,o.f)()],u.prototype,"icon",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"loading",void 0),d([(0,o.f)()],u.prototype,"placeholder",void 0),d([(0,o.f)()],u.prototype,"type",void 0),d([(0,o.f)()],u.prototype,"value",void 0),d([(0,o.f)()],u.prototype,"errorText",void 0),d([(0,o.f)()],u.prototype,"warningText",void 0),d([(0,o.f)()],u.prototype,"onSubmit",void 0),d([(0,o.f)()],u.prototype,"size",void 0),d([(0,o.f)({attribute:!1})],u.prototype,"onKeyDown",void 0),u=d([(0,s.f)("wui-input-text")],u),t.s([],835902)},684326,765090,t=>{var e=t.i(654479);let{I:i}=e.e;var o=t.i(391909);let r=(t,e)=>{let i=t._$AN;if(void 0===i)return!1;for(let t of i)t._$AO?.(e,!1),r(t,e);return!0},a=t=>{let e,i;do{if(void 0===(e=t._$AM))break;(i=e._$AN).delete(t),t=e}while(0===i?.size)},n=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),l(e)}};function s(t){void 0!==this._$AN?(a(this),this._$AM=t,n(this)):this._$AM=t}function c(t,e=!1,i=0){let o=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(e)if(Array.isArray(o))for(let t=i;t<o.length;t++)r(o[t],!1),a(o[t]);else null!=o&&(r(o,!1),a(o));else r(this,t)}let l=t=>{t.type==o.x.CHILD&&(t._$AP??=c,t._$AQ??=s)};class d extends o.C{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),n(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(r(this,t),a(this))}setValue(t){if(void 0===this._$Ct.strings)this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class u{}let p=new WeakMap,h=(0,o.l)(class extends d{render(t){return e.i}update(t,[i]){let o=i!==this.G;return o&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=i,this.ht=t.options?.host,this.rt(this.ct=t.element)),e.i}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){let e=this.ht??globalThis,i=p.get(e);void 0===i&&(i=new WeakMap,p.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?p.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});t.s(["J",0,()=>new u,"C",0,h],765090),t.s([],684326)}])})();