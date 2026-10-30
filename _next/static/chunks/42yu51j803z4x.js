(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47755,e=>{var t=e.i(365801),o=e.i(742710),i=e.i(675457),r=e.i(401564),a=e.i(979484),n=e.i(518887),s=e.i(564126),c=e.i(360334),d=e.i(227302),l=e.i(664717);let u={getGasPriceInEther:(e,t)=>Number(t*e)/1e18,getGasPriceInUSD(e,t,o){let r=u.getGasPriceInEther(t,o);return i.f.bigNumber(e).times(r).toNumber()},getPriceImpact({sourceTokenAmount:e,sourceTokenPriceInUSD:t,toTokenPriceInUSD:o,toTokenAmount:r}){let a=i.f.bigNumber(e).times(t),n=i.f.bigNumber(r).times(o);return a.minus(n).div(a).times(100).toNumber()},getMaxSlippage(e,t){let o=i.f.bigNumber(e).div(100);return i.f.multiply(t,o).toNumber()},getProviderFee:(e,t=.0085)=>i.f.bigNumber(e).times(t).toString(),isInsufficientNetworkTokenForGas:(e,t)=>!!i.f.bigNumber(e).eq(0)||i.f.bigNumber(i.f.bigNumber(t||"0")).gt(e),isInsufficientSourceTokenForSwap(e,t,o){let r=o?.find(e=>e.address===t)?.quantity?.numeric;return i.f.bigNumber(r||"0").lt(e)}};var p=e.i(592279),h=e.i(851887),g=e.i(24742),m=e.i(960398),f=e.i(971080),b=e.i(149454),w=e.i(653157),v=e.i(221728),k=e.i(811424);let y={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:c.W.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},T=(0,t.s)({...y}),x={state:T,subscribe:e=>(0,t.i)(T,()=>e(T)),subscribeKey:(e,t)=>(0,o.T)(T,e,t),getParams(){let e=m.f.state.activeChain,t=m.f.getAccountData(e)?.caipAddress??m.f.state.activeCaipAddress,o=d.f.getPlainAddress(t),a=(0,s.f)(),n=b.f.getConnectorId(m.f.state.activeChain);if(!o)throw Error("No address found to swap the tokens from.");let c=!T.toToken?.address||!T.toToken?.decimals,l=!T.sourceToken?.address||!T.sourceToken?.decimals||!i.f.bigNumber(T.sourceTokenAmount).gt(0),u=!T.sourceTokenAmount;return{networkAddress:a,fromAddress:o,fromCaipAddress:t,sourceTokenAddress:T.sourceToken?.address,toTokenAddress:T.toToken?.address,toTokenAmount:T.toTokenAmount,toTokenDecimals:T.toToken?.decimals,sourceTokenAmount:T.sourceTokenAmount,sourceTokenDecimals:T.sourceToken?.decimals,invalidToToken:c,invalidSourceToken:l,invalidSourceTokenAmount:u,availableToSwap:t&&!c&&!l&&!u,isAuthConnector:n===r.f.CONNECTOR_ID.AUTH}},async setSourceToken(e){if(!e){T.sourceToken=e,T.sourceTokenAmount="",T.sourceTokenPriceInUSD=0;return}T.sourceToken=e,await $.setTokenPrice(e.address,"sourceToken")},setSourceTokenAmount(e){T.sourceTokenAmount=e},async setToToken(e){if(!e){T.toToken=e,T.toTokenAmount="",T.toTokenPriceInUSD=0;return}T.toToken=e,await $.setTokenPrice(e.address,"toToken")},setToTokenAmount(e){T.toTokenAmount=e?i.f.toFixed(e,6):""},async setTokenPrice(e,t){let o=T.tokensPriceMap[e]||0;o||(T.loadingPrices=!0,o=await $.getAddressPrice(e)),"sourceToken"===t?T.sourceTokenPriceInUSD=o:"toToken"===t&&(T.toTokenPriceInUSD=o),T.loadingPrices&&(T.loadingPrices=!1),$.getParams().availableToSwap&&!T.switchingTokens&&$.swapTokens()},async switchTokens(){if(!T.initializing&&T.initialized&&!T.switchingTokens){T.switchingTokens=!0;try{let e=T.toToken?{...T.toToken}:void 0,t=T.sourceToken?{...T.sourceToken}:void 0,o=e&&""===T.toTokenAmount?"1":T.toTokenAmount;$.setSourceTokenAmount(o),$.setToTokenAmount(""),await $.setSourceToken(e),await $.setToToken(t),T.switchingTokens=!1,$.swapTokens()}catch(e){throw T.switchingTokens=!1,e}}},resetState(){T.myTokensWithBalance=y.myTokensWithBalance,T.tokensPriceMap=y.tokensPriceMap,T.initialized=y.initialized,T.initializing=y.initializing,T.switchingTokens=y.switchingTokens,T.sourceToken=y.sourceToken,T.sourceTokenAmount=y.sourceTokenAmount,T.sourceTokenPriceInUSD=y.sourceTokenPriceInUSD,T.toToken=y.toToken,T.toTokenAmount=y.toTokenAmount,T.toTokenPriceInUSD=y.toTokenPriceInUSD,T.networkPrice=y.networkPrice,T.networkTokenSymbol=y.networkTokenSymbol,T.networkBalanceInUSD=y.networkBalanceInUSD,T.inputError=y.inputError},resetValues(){let{networkAddress:e}=$.getParams(),t=T.tokens?.find(t=>t.address===e);$.setSourceToken(t),$.setToToken(void 0)},getApprovalLoadingState:()=>T.loadingApprovalTransaction,clearError(){T.transactionError=void 0},async initializeState(){if(!T.initializing){if(T.initializing=!0,!T.initialized)try{await $.fetchTokens(),T.initialized=!0}catch(e){T.initialized=!1,k.f.showError("Failed to initialize swap"),v.f.goBack()}T.initializing=!1}},async fetchTokens(){let{networkAddress:e}=$.getParams();await $.getNetworkTokenPrice(),await $.getMyTokensWithBalance();let t=T.myTokensWithBalance?.find(t=>t.address===e);t&&(T.networkTokenSymbol=t.symbol,$.setSourceToken(t),$.setSourceTokenAmount("0"))},async getTokenList(){let e=m.f.state.activeCaipNetwork?.caipNetworkId;if(T.caipNetworkId!==e||!T.tokens)try{T.tokensLoading=!0;let t=await l.f.getTokenList(e);T.tokens=t,T.caipNetworkId=e,T.popularTokens=t.sort((e,t)=>e.symbol<t.symbol?-1:+(e.symbol>t.symbol));let o=(e&&c.W.SUGGESTED_TOKENS_BY_CHAIN?.[e]||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e),i=(c.W.SWAP_SUGGESTED_TOKENS||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e).filter(e=>!o.some(t=>t.address===e.address));T.suggestedTokens=[...o,...i]}catch(e){T.tokens=[],T.popularTokens=[],T.suggestedTokens=[]}finally{T.tokensLoading=!1}},async getAddressPrice(e){let t=T.tokensPriceMap[e];if(t)return t;let o=await g.f.fetchTokenPrice({addresses:[e]}),i=o?.fungibles||[],r=[...T.tokens||[],...T.myTokensWithBalance||[]],a=r?.find(t=>t.address===e)?.symbol,n=parseFloat((i.find(e=>e.symbol.toLowerCase()===a?.toLowerCase())?.price||0).toString());return T.tokensPriceMap[e]=n,n},async getNetworkTokenPrice(){let{networkAddress:e}=$.getParams(),t=await g.f.fetchTokenPrice({addresses:[e]}).catch(()=>(k.f.showError("Failed to fetch network token price"),{fungibles:[]})),o=t.fungibles?.[0],i=o?.price.toString()||"0";T.tokensPriceMap[e]=parseFloat(i),T.networkTokenSymbol=o?.symbol||"",T.networkPrice=i},async getMyTokensWithBalance(e){let t=await n.f.getMyTokensWithBalance({forceUpdate:e,caipNetwork:m.f.state.activeCaipNetwork,address:m.f.getAccountData()?.address}),o=l.f.mapBalancesToSwapTokens(t);o&&(await $.getInitialGasPrice(),$.setBalances(o))},setBalances(e){let{networkAddress:t}=$.getParams(),o=m.f.state.activeCaipNetwork;if(!o)return;let r=e.find(e=>e.address===t);e.forEach(e=>{T.tokensPriceMap[e.address]=e.price||0}),T.myTokensWithBalance=e.filter(e=>e.address.startsWith(o.caipNetworkId)),T.networkBalanceInUSD=r?i.f.multiply(r.quantity.numeric,r.price).toString():"0"},async getInitialGasPrice(){let e=await l.f.fetchGasPrice();if(!e)return{gasPrice:null,gasPriceInUSD:null};switch(m.f.state?.activeCaipNetwork?.chainNamespace){case r.f.CHAIN.SOLANA:return T.gasFee=e.standard??"0",T.gasPriceInUSD=i.f.multiply(e.standard,T.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(T.gasFee),gasPriceInUSD:Number(T.gasPriceInUSD)};case r.f.CHAIN.EVM:default:let t=e.standard??"0",o=BigInt(t),a=BigInt(15e4),n=u.getGasPriceInUSD(T.networkPrice,a,o);return T.gasFee=t,T.gasPriceInUSD=n,{gasPrice:o,gasPriceInUSD:n}}},async swapTokens(){let e=m.f.getAccountData()?.address,t=T.sourceToken,o=T.toToken,r=i.f.bigNumber(T.sourceTokenAmount).gt(0);if(r||$.setToTokenAmount(""),!o||!t||T.loadingPrices||!r||!e)return;T.loadingQuote=!0;let a=i.f.bigNumber(T.sourceTokenAmount).times(10**t.decimals).round(0).toFixed(0);try{let r=await g.f.fetchSwapQuote({userAddress:e,from:t.address,to:o.address,gasPrice:T.gasFee,amount:a.toString()});T.loadingQuote=!1;let n=r?.quotes?.[0]?.toAmount;if(!n)return void h.f.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");let s=i.f.bigNumber(n).div(10**o.decimals).toString();$.setToTokenAmount(s),$.hasInsufficientToken(T.sourceTokenAmount,t.address)?T.inputError="Insufficient balance":(T.inputError=void 0,$.setTransactionDetails())}catch(t){let e=await l.f.handleSwapError(t);T.loadingQuote=!1,T.inputError=e||"Insufficient balance"}},async getTransaction(){let{fromCaipAddress:e,availableToSwap:t}=$.getParams(),o=T.sourceToken,i=T.toToken;if(e&&t&&o&&i&&!T.loadingQuote)try{let t;return T.loadingBuildTransaction=!0,t=await l.f.fetchSwapAllowance({userAddress:e,tokenAddress:o.address,sourceTokenAmount:T.sourceTokenAmount,sourceTokenDecimals:o.decimals})?await $.createSwapTransaction():await $.createAllowanceTransaction(),T.loadingBuildTransaction=!1,T.fetchError=!1,t}catch(e){v.f.goBack(),k.f.showError("Failed to check allowance"),T.loadingBuildTransaction=!1,T.approvalTransaction=void 0,T.swapTransaction=void 0,T.fetchError=!0;return}},async createAllowanceTransaction(){let{fromCaipAddress:e,sourceTokenAddress:t,toTokenAddress:o}=$.getParams();if(e&&o){if(!t)throw Error("createAllowanceTransaction - No source token address found.");try{let i=await g.f.generateApproveCalldata({from:t,to:o,userAddress:e}),r=d.f.getPlainAddress(i.tx.from);if(!r)throw Error("SwapController:createAllowanceTransaction - address is required");let a={data:i.tx.data,to:r,gasPrice:BigInt(i.tx.eip155.gasPrice),value:BigInt(i.tx.value),toAmount:T.toTokenAmount};return T.swapTransaction=void 0,T.approvalTransaction={data:a.data,to:a.to,gasPrice:a.gasPrice,value:a.value,toAmount:a.toAmount},{data:a.data,to:a.to,gasPrice:a.gasPrice,value:a.value,toAmount:a.toAmount}}catch(e){v.f.goBack(),k.f.showError("Failed to create approval transaction"),T.approvalTransaction=void 0,T.swapTransaction=void 0,T.fetchError=!0;return}}},async createSwapTransaction(){let{networkAddress:e,fromCaipAddress:t,sourceTokenAmount:o}=$.getParams(),i=T.sourceToken,r=T.toToken;if(!t||!o||!i||!r)return;let a=f.f.parseUnits(o,i.decimals)?.toString();try{let o=i.address===e,n=await g.f.generateSwapCalldata({userAddress:t,from:i.address,to:r.address,amount:a,disableEstimate:!0}),s=BigInt(n.tx.eip155.gas),c=BigInt(n.tx.eip155.gasPrice);if(o&&a){let o=T.myTokensWithBalance?.find(t=>t.address===e);if(o){let e=parseInt(o.quantity.decimals,10),d=f.f.parseUnits(o.quantity.numeric,e)??0n,l=s*c;if(BigInt(a)+l>d){let e=d>l?d-l:0n;e>0n&&(n=await g.f.generateSwapCalldata({userAddress:t,from:i.address,to:r.address,amount:e.toString(),disableEstimate:!0}),a=e.toString(),s=BigInt(n.tx.eip155.gas),c=BigInt(n.tx.eip155.gasPrice))}}}let l=d.f.getPlainAddress(n.tx.to);if(!l)throw Error("SwapController:createSwapTransaction - address is required");let p={data:n.tx.data,to:l,gas:s,gasPrice:c,value:o?BigInt(a??"0"):BigInt("0"),toAmount:T.toTokenAmount};return T.gasPriceInUSD=u.getGasPriceInUSD(T.networkPrice,s,c),T.approvalTransaction=void 0,T.swapTransaction=p,p}catch(e){v.f.goBack(),k.f.showError("Failed to create transaction"),T.approvalTransaction=void 0,T.swapTransaction=void 0,T.fetchError=!0;return}},onEmbeddedWalletApprovalSuccess(){k.f.showLoading("Approve limit increase in your wallet"),v.f.replace("SwapPreview")},async sendTransactionForApproval(e){let{fromAddress:t,isAuthConnector:o}=$.getParams();T.loadingApprovalTransaction=!0,o?v.f.pushTransactionStack({onSuccess:$.onEmbeddedWalletApprovalSuccess}):k.f.showLoading("Approve limit increase in your wallet");try{await f.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:r.f.CHAIN.EVM}),await $.swapTokens(),await $.getTransaction(),T.approvalTransaction=void 0,T.loadingApprovalTransaction=!1}catch(e){T.transactionError=e?.displayMessage,T.loadingApprovalTransaction=!1,k.f.showError(e?.displayMessage||"Transaction error"),w.f.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:m.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:$.state.sourceToken?.symbol||"",swapToToken:$.state.toToken?.symbol||"",swapFromAmount:$.state.sourceTokenAmount||"",swapToAmount:$.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===a.P.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(e){if(!e)return;let{fromAddress:t,toTokenAmount:o,isAuthConnector:n}=$.getParams();T.loadingTransaction=!0;let c=`Swapping ${T.sourceToken?.symbol} to ${i.f.formatNumberToLocalString(o,3)} ${T.toToken?.symbol}`,d=`Swapped ${T.sourceToken?.symbol} to ${i.f.formatNumberToLocalString(o,3)} ${T.toToken?.symbol}`;n?v.f.pushTransactionStack({onSuccess(){v.f.replace("Account"),k.f.showLoading(c),x.resetState()}}):k.f.showLoading("Confirm transaction in your wallet");try{let o=[T.sourceToken?.address,T.toToken?.address].join(","),i=await f.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:r.f.CHAIN.EVM});return T.loadingTransaction=!1,k.f.showSuccess(d),w.f.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:m.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:$.state.sourceToken?.symbol||"",swapToToken:$.state.toToken?.symbol||"",swapFromAmount:$.state.sourceTokenAmount||"",swapToAmount:$.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===a.P.ACCOUNT_TYPES.SMART_ACCOUNT}}),x.resetState(),n||v.f.replace("Account"),x.getMyTokensWithBalance(o),i}catch(e){T.transactionError=e?.displayMessage,T.loadingTransaction=!1,k.f.showError(e?.displayMessage||"Transaction error"),w.f.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:m.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:$.state.sourceToken?.symbol||"",swapToToken:$.state.toToken?.symbol||"",swapFromAmount:$.state.sourceTokenAmount||"",swapToAmount:$.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===a.P.ACCOUNT_TYPES.SMART_ACCOUNT}});return}},hasInsufficientToken:(e,t)=>u.isInsufficientSourceTokenForSwap(e,t,T.myTokensWithBalance),setTransactionDetails(){let{toTokenAddress:e,toTokenDecimals:t}=$.getParams();e&&t&&(T.gasPriceInUSD=u.getGasPriceInUSD(T.networkPrice,BigInt(T.gasFee),BigInt(15e4)),T.priceImpact=u.getPriceImpact({sourceTokenAmount:T.sourceTokenAmount,sourceTokenPriceInUSD:T.sourceTokenPriceInUSD,toTokenPriceInUSD:T.toTokenPriceInUSD,toTokenAmount:T.toTokenAmount}),T.maxSlippage=u.getMaxSlippage(T.slippage,T.toTokenAmount),T.providerFee=u.getProviderFee(T.sourceTokenAmount))}},$=(0,p.O)(x);e.s(["f",0,$],47755)},741611,748449,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119),r=e.i(56350),a=e.i(803468),n=e.i(221728),s=e.i(365801),c=e.i(742710),d=e.i(592279);let l=(0,s.s)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),u=(0,d.O)({state:l,subscribe:e=>(0,s.i)(l,()=>e(l)),subscribeKey:(e,t)=>(0,c.T)(l,e,t),showTooltip({message:e,triggerRect:t,variant:o}){l.open=!0,l.message=e,l.triggerRect=t,l.variant=o},hide(){l.open=!1,l.message="",l.triggerRect={width:0,height:0,top:0,left:0}}});e.i(404041);var p=e.i(645975),h=e.i(315193);let g=h.m`
  :host {
    width: 100%;
    display: block;
  }
`;var m=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let f=class extends t.f{constructor(){super(),this.unsubscribe=[],this.text="",this.open=u.state.open,this.unsubscribe.push(n.f.subscribeKey("view",()=>{u.hide()}),a.f.subscribeKey("open",e=>{e||u.hide()}),u.subscribeKey("open",e=>{this.open=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),u.hide()}render(){return o.c`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return o.c`<slot></slot> `}onMouseEnter(){let e=this.getBoundingClientRect();if(!this.open){let t=document.querySelector("w3m-modal"),o={width:e.width,height:e.height,left:e.left,top:e.top};if(t){let i=t.getBoundingClientRect();o.left=e.left-(window.innerWidth-i.width)/2,o.top=e.top-(window.innerHeight-i.height)/2}u.showTooltip({message:this.text,triggerRect:o,variant:"shade"})}}onMouseLeave(e){this.contains(e.relatedTarget)||u.hide()}};f.styles=[g],m([(0,i.f)()],f.prototype,"text",void 0),m([(0,r.f)()],f.prototype,"open",void 0),f=m([(0,p.f)("w3m-tooltip-trigger")],f),e.s([],741611);var b=t;e.i(62238),e.i(443452),e.i(249536);var w=e.i(162611);let v=w.m`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:e})=>e["3"]} 10px ${({spacing:e})=>e["3"]};
    border-radius: ${({borderRadius:e})=>e["3"]};
    color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:e})=>e["5"]});
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var k=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let y=class extends b.f{constructor(){super(),this.unsubscribe=[],this.open=u.state.open,this.message=u.state.message,this.triggerRect=u.state.triggerRect,this.variant=u.state.variant,this.unsubscribe.push(u.subscribe(e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){this.dataset.variant=this.variant;let e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${e}px;
    --w3m-tooltip-left: ${t}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${+!!this.open};
    `,o.c`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};y.styles=[v],k([(0,r.f)()],y.prototype,"open",void 0),k([(0,r.f)()],y.prototype,"message",void 0),k([(0,r.f)()],y.prototype,"triggerRect",void 0),k([(0,r.f)()],y.prototype,"variant",void 0),y=k([(0,p.f)("w3m-tooltip")],y),e.s([],748449)},534420,624947,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(852634),e.i(383227),e.i(839009);var r=e.i(459088),a=e.i(645975),n=e.i(162611);let s=n.m`
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
`;var c=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let d={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},l={lg:"md",md:"md",sm:"sm"},u=class extends t.f{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let e=this.textVariant??d[this.size];return o.c`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let e=l[this.size],t="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return o.c`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return null}};u.styles=[r.e,r.j,s],c([(0,i.f)()],u.prototype,"size",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"fullWidth",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"loading",void 0),c([(0,i.f)()],u.prototype,"variant",void 0),c([(0,i.f)()],u.prototype,"textVariant",void 0),u=c([(0,a.f)("wui-button")],u),e.s([],624947),e.s([],534420)},746650,e=>{e.i(912190),e.s([])},443452,e=>{e.i(852634),e.s([])},6957,e=>{e.i(835902),e.s([])},780313,e=>{e.i(864576),e.s([])},497521,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(852634),e.i(864380),e.i(864576),e.i(839009),e.i(73944);var r=e.i(459088),a=e.i(645975),n=e.i(162611);let s=n.m`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[32]};
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e[32]};
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
    padding-right: ${({spacing:e})=>e[1]};
  }

  .left-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    border: 1px solid ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] .token-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .token-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .token-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .chain-image {
    width: 12px;
    height: 12px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='md'] .chain-image {
    width: 10px;
    height: 10px;
    bottom: 2px;
    right: -4px;
  }

  button[data-size='sm'] .chain-image {
    width: 8px;
    height: 8px;
    bottom: 2px;
    right: -3px;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;var c=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let d={lg:"lg-regular",md:"lg-regular",sm:"md-regular"},l={lg:"lg",md:"md",sm:"sm"},u=class extends t.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.text="",this.loading=!1}render(){return this.loading?o.c` <wui-flex alignItems="center" gap="01" padding="01">
        <wui-shimmer width="20px" height="20px"></wui-shimmer>
        <wui-shimmer width="32px" height="18px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:o.c`
      <button ?disabled=${this.disabled} data-size=${this.size}>
        ${this.imageTemplate()} ${this.textTemplate()}
      </button>
    `}imageTemplate(){if(this.imageSrc&&this.chainImageSrc)return o.c`<wui-flex class="left-image-container">
        <wui-image src=${this.imageSrc} class="token-image"></wui-image>
        <wui-image src=${this.chainImageSrc} class="chain-image"></wui-image>
      </wui-flex>`;if(this.imageSrc)return o.c`<wui-image src=${this.imageSrc} class="token-image"></wui-image>`;let e=l[this.size];return o.c`<wui-flex class="left-icon-container">
      <wui-icon size=${e} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}textTemplate(){let e=d[this.size];return o.c`<wui-text color="primary" variant=${e}
      >${this.text}</wui-text
    >`}};u.styles=[r.e,r.j,s],c([(0,i.f)()],u.prototype,"size",void 0),c([(0,i.f)()],u.prototype,"imageSrc",void 0),c([(0,i.f)()],u.prototype,"chainImageSrc",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,i.f)()],u.prototype,"text",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"loading",void 0),u=c([(0,a.f)("wui-token-button")],u),e.s([],497521)},864380,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(234051);var r=e.i(829389),a=e.i(459088),n=e.i(645975),s=e.i(162611);let c=s.m`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  :host([data-boxed='true']) {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-boxed='true']) img {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  :host([data-full='true']) img {
    width: 100%;
    height: 100%;
  }

  :host([data-boxed='true']) wui-icon {
    width: 20px;
    height: 20px;
  }

  :host([data-icon='error']) {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:e})=>e[16]};
  }
`;var d=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let l=class extends t.f{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0,this.boxed=!1,this.rounded=!1,this.fullSize=!1}render(){let e={inherit:"inherit",xxs:"2",xs:"3",sm:"4",md:"4",mdl:"5",lg:"5",xl:"6",xxl:"7","3xl":"8","4xl":"9","5xl":"10"};return(this.style.cssText=`
      --local-width: ${this.size?`var(--apkt-spacing-${e[this.size]});`:"100%"};
      --local-height: ${this.size?`var(--apkt-spacing-${e[this.size]});`:"100%"};
      `,this.dataset.boxed=this.boxed?"true":"false",this.dataset.rounded=this.rounded?"true":"false",this.dataset.full=this.fullSize?"true":"false",this.dataset.icon=this.iconColor||"inherit",this.icon)?o.c`<wui-icon
        color=${this.iconColor||"inherit"}
        name=${this.icon}
        size="lg"
      ></wui-icon> `:this.logo?o.c`<wui-icon size="lg" color="inherit" name=${this.logo}></wui-icon> `:o.c`<img src=${(0,r.f)(this.src)} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};l.styles=[a.e,c],d([(0,i.f)()],l.prototype,"src",void 0),d([(0,i.f)()],l.prototype,"logo",void 0),d([(0,i.f)()],l.prototype,"icon",void 0),d([(0,i.f)()],l.prototype,"iconColor",void 0),d([(0,i.f)()],l.prototype,"alt",void 0),d([(0,i.f)()],l.prototype,"size",void 0),d([(0,i.f)({type:Boolean})],l.prototype,"boxed",void 0),d([(0,i.f)({type:Boolean})],l.prototype,"rounded",void 0),d([(0,i.f)({type:Boolean})],l.prototype,"fullSize",void 0),l=d([(0,n.f)("wui-image")],l),e.s([],864380)},383227,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119),r=e.i(162611),a=e.i(459088),n=e.i(645975),s=e.i(315193);let c=s.m`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 1.4s linear infinite;
    color: var(--local-color);
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;var d=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let l=class extends t.f{constructor(){super(...arguments),this.color="primary",this.size="lg"}render(){let e={primary:r.i.tokens.theme.textPrimary,secondary:r.i.tokens.theme.textSecondary,tertiary:r.i.tokens.theme.textTertiary,invert:r.i.tokens.theme.textInvert,error:r.i.tokens.core.textError,warning:r.i.tokens.core.textWarning,"accent-primary":r.i.tokens.core.textAccentPrimary};return this.style.cssText=`
      --local-color: ${"inherit"===this.color?"inherit":e[this.color]};
      `,this.dataset.size=this.size,o.c`<svg viewBox="0 0 16 17" fill="none">
      <path
        d="M8.75 2.65625V4.65625C8.75 4.85516 8.67098 5.04593 8.53033 5.18658C8.38968 5.32723 8.19891 5.40625 8 5.40625C7.80109 5.40625 7.61032 5.32723 7.46967 5.18658C7.32902 5.04593 7.25 4.85516 7.25 4.65625V2.65625C7.25 2.45734 7.32902 2.26657 7.46967 2.12592C7.61032 1.98527 7.80109 1.90625 8 1.90625C8.19891 1.90625 8.38968 1.98527 8.53033 2.12592C8.67098 2.26657 8.75 2.45734 8.75 2.65625ZM14 7.90625H12C11.8011 7.90625 11.6103 7.98527 11.4697 8.12592C11.329 8.26657 11.25 8.45734 11.25 8.65625C11.25 8.85516 11.329 9.04593 11.4697 9.18658C11.6103 9.32723 11.8011 9.40625 12 9.40625H14C14.1989 9.40625 14.3897 9.32723 14.5303 9.18658C14.671 9.04593 14.75 8.85516 14.75 8.65625C14.75 8.45734 14.671 8.26657 14.5303 8.12592C14.3897 7.98527 14.1989 7.90625 14 7.90625ZM11.3588 10.9544C11.289 10.8846 11.2062 10.8293 11.115 10.7915C11.0239 10.7538 10.9262 10.7343 10.8275 10.7343C10.7288 10.7343 10.6311 10.7538 10.54 10.7915C10.4488 10.8293 10.366 10.8846 10.2963 10.9544C10.2265 11.0241 10.1711 11.107 10.1334 11.1981C10.0956 11.2893 10.0762 11.387 10.0762 11.4856C10.0762 11.5843 10.0956 11.682 10.1334 11.7731C10.1711 11.8643 10.2265 11.9471 10.2963 12.0169L11.7106 13.4312C11.8515 13.5721 12.0426 13.6513 12.2419 13.6513C12.4411 13.6513 12.6322 13.5721 12.7731 13.4312C12.914 13.2904 12.9932 13.0993 12.9932 12.9C12.9932 12.7007 12.914 12.5096 12.7731 12.3687L11.3588 10.9544ZM8 11.9062C7.80109 11.9062 7.61032 11.9853 7.46967 12.1259C7.32902 12.2666 7.25 12.4573 7.25 12.6562V14.6562C7.25 14.8552 7.32902 15.0459 7.46967 15.1866C7.61032 15.3272 7.80109 15.4062 8 15.4062C8.19891 15.4062 8.38968 15.3272 8.53033 15.1866C8.67098 15.0459 8.75 14.8552 8.75 14.6562V12.6562C8.75 12.4573 8.67098 12.2666 8.53033 12.1259C8.38968 11.9853 8.19891 11.9062 8 11.9062ZM4.64125 10.9544L3.22688 12.3687C3.08598 12.5096 3.00682 12.7007 3.00682 12.9C3.00682 13.0993 3.08598 13.2904 3.22688 13.4312C3.36777 13.5721 3.55887 13.6513 3.75813 13.6513C3.95738 13.6513 4.14848 13.5721 4.28937 13.4312L5.70375 12.0169C5.84465 11.876 5.9238 11.6849 5.9238 11.4856C5.9238 11.2864 5.84465 11.0953 5.70375 10.9544C5.56285 10.8135 5.37176 10.7343 5.1725 10.7343C4.97324 10.7343 4.78215 10.8135 4.64125 10.9544ZM4.75 8.65625C4.75 8.45734 4.67098 8.26657 4.53033 8.12592C4.38968 7.98527 4.19891 7.90625 4 7.90625H2C1.80109 7.90625 1.61032 7.98527 1.46967 8.12592C1.32902 8.26657 1.25 8.45734 1.25 8.65625C1.25 8.85516 1.32902 9.04593 1.46967 9.18658C1.61032 9.32723 1.80109 9.40625 2 9.40625H4C4.19891 9.40625 4.38968 9.32723 4.53033 9.18658C4.67098 9.04593 4.75 8.85516 4.75 8.65625ZM4.2875 3.88313C4.1466 3.74223 3.95551 3.66307 3.75625 3.66307C3.55699 3.66307 3.3659 3.74223 3.225 3.88313C3.0841 4.02402 3.00495 4.21512 3.00495 4.41438C3.00495 4.61363 3.0841 4.80473 3.225 4.94562L4.64125 6.35813C4.78215 6.49902 4.97324 6.57818 5.1725 6.57818C5.37176 6.57818 5.56285 6.49902 5.70375 6.35813C5.84465 6.21723 5.9238 6.02613 5.9238 5.82688C5.9238 5.62762 5.84465 5.43652 5.70375 5.29563L4.2875 3.88313Z"
        fill="currentColor"
      />
    </svg>`}};l.styles=[a.e,c],d([(0,i.f)()],l.prototype,"color",void 0),d([(0,i.f)()],l.prototype,"size",void 0),l=d([(0,n.f)("wui-loading-spinner")],l),e.s([],383227)},864576,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119),r=e.i(645975),a=e.i(162611);let n=a.m`
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
`;var s=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let c=class extends t.f{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",o.c`<slot></slot>`}};c.styles=[n],s([(0,i.f)()],c.prototype,"width",void 0),s([(0,i.f)()],c.prototype,"height",void 0),s([(0,i.f)()],c.prototype,"variant",void 0),s([(0,i.f)({type:Boolean})],c.prototype,"rounded",void 0),c=s([(0,r.f)("wui-shimmer")],c),e.s([],864576)},912190,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(234051);var r=e.i(829389);e.i(852634);var a=e.i(459088),n=e.i(645975),s=e.i(162611);let c=s.m`
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
`;var d=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let l=class extends t.f{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,o.c`
      <wui-icon size=${(0,r.f)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};l.styles=[a.e,a.j,c],d([(0,i.f)()],l.prototype,"icon",void 0),d([(0,i.f)()],l.prototype,"size",void 0),d([(0,i.f)()],l.prototype,"padding",void 0),d([(0,i.f)()],l.prototype,"color",void 0),l=d([(0,n.f)("wui-icon-box")],l),e.s([],912190)},835902,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(234051);var r=e.i(829389);e.i(684326);var a=e.i(765090);e.i(852634),e.i(839009);var n=e.i(459088),s=e.i(645975),c=e.i(162611);let d=c.m`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.textPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    padding: ${({spacing:e})=>e[3]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[3]} ${({spacing:e})=>e[10]};
    font-size: ${({textSize:e})=>e.large};
    line-height: ${({typography:e})=>e["lg-regular"].lineHeight};
    letter-spacing: ${({typography:e})=>e["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:e})=>e.regular};
    font-family: ${({fontFamily:e})=>e.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:e})=>e[4]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[4]} ${({spacing:e})=>e[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:e})=>e[4]};
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:e})=>e[2]};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:e})=>e[12]};
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
`;var l=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let u=class extends t.f{constructor(){super(...arguments),this.inputElementRef=(0,a.J)(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return o.c` <div class="wui-input-text-container">
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
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?o.c`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?o.c`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?o.c`<wui-icon name="spinner" size="md"></wui-icon>`:o.c`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?o.c`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?o.c`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};u.styles=[n.e,n.j,d],l([(0,i.f)()],u.prototype,"icon",void 0),l([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),l([(0,i.f)({type:Boolean})],u.prototype,"loading",void 0),l([(0,i.f)()],u.prototype,"placeholder",void 0),l([(0,i.f)()],u.prototype,"type",void 0),l([(0,i.f)()],u.prototype,"value",void 0),l([(0,i.f)()],u.prototype,"errorText",void 0),l([(0,i.f)()],u.prototype,"warningText",void 0),l([(0,i.f)()],u.prototype,"onSubmit",void 0),l([(0,i.f)()],u.prototype,"size",void 0),l([(0,i.f)({attribute:!1})],u.prototype,"onKeyDown",void 0),u=l([(0,s.f)("wui-input-text")],u),e.s([],835902)},608601,e=>{e.s(["f",0,{interpolate(e,t,o){if(2!==e.length||2!==t.length)throw Error("inputRange and outputRange must be an array of length 2");let i=e[0]||0,r=e[1]||0,a=t[0]||0,n=t[1]||0;return o<i?a:o>r?n:(n-a)/(r-i)*(o-i)+a}}])},684326,765090,e=>{var t=e.i(654479);let{I:o}=t.e;var i=e.i(391909);let r=(e,t)=>{let o=e._$AN;if(void 0===o)return!1;for(let e of o)e._$AO?.(t,!1),r(e,t);return!0},a=e=>{let t,o;do{if(void 0===(t=e._$AM))break;(o=t._$AN).delete(e),e=t}while(0===o?.size)},n=e=>{for(let t;t=e._$AM;e=t){let o=t._$AN;if(void 0===o)t._$AN=o=new Set;else if(o.has(e))break;o.add(e),d(t)}};function s(e){void 0!==this._$AN?(a(this),this._$AM=e,n(this)):this._$AM=e}function c(e,t=!1,o=0){let i=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(i))for(let e=o;e<i.length;e++)r(i[e],!1),a(i[e]);else null!=i&&(r(i,!1),a(i));else r(this,e)}let d=e=>{e.type==i.x.CHILD&&(e._$AP??=c,e._$AQ??=s)};class l extends i.C{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,o){super._$AT(e,t,o),n(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(r(this,e),a(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class u{}let p=new WeakMap,h=(0,i.l)(class extends l{render(e){return t.i}update(e,[o]){let i=o!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=o,this.ht=e.options?.host,this.rt(this.ct=e.element)),t.i}rt(e){if(void 0!==this.G)if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,o=p.get(t);void 0===o&&(o=new WeakMap,p.set(t,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?p.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});e.s(["J",0,()=>new u,"C",0,h],765090),e.s([],684326)}])})();