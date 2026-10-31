(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47755,e=>{var t=e.i(365801),o=e.i(742710),i=e.i(675457),r=e.i(401564),a=e.i(979484),n=e.i(518887),s=e.i(564126),c=e.i(360334),l=e.i(227302),d=e.i(664717);let u={getGasPriceInEther:(e,t)=>Number(t*e)/1e18,getGasPriceInUSD(e,t,o){let r=u.getGasPriceInEther(t,o);return i.f.bigNumber(e).times(r).toNumber()},getPriceImpact({sourceTokenAmount:e,sourceTokenPriceInUSD:t,toTokenPriceInUSD:o,toTokenAmount:r}){let a=i.f.bigNumber(e).times(t),n=i.f.bigNumber(r).times(o);return a.minus(n).div(a).times(100).toNumber()},getMaxSlippage(e,t){let o=i.f.bigNumber(e).div(100);return i.f.multiply(t,o).toNumber()},getProviderFee:(e,t=.0085)=>i.f.bigNumber(e).times(t).toString(),isInsufficientNetworkTokenForGas:(e,t)=>!!i.f.bigNumber(e).eq(0)||i.f.bigNumber(i.f.bigNumber(t||"0")).gt(e),isInsufficientSourceTokenForSwap(e,t,o){let r=o?.find(e=>e.address===t)?.quantity?.numeric;return i.f.bigNumber(r||"0").lt(e)}};var p=e.i(592279),h=e.i(851887),g=e.i(24742),m=e.i(960398),f=e.i(971080),b=e.i(149454),v=e.i(653157),y=e.i(221728),w=e.i(811424);let k={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:c.W.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},T=(0,t.s)({...k}),x={state:T,subscribe:e=>(0,t.i)(T,()=>e(T)),subscribeKey:(e,t)=>(0,o.T)(T,e,t),getParams(){let e=m.f.state.activeChain,t=m.f.getAccountData(e)?.caipAddress??m.f.state.activeCaipAddress,o=l.f.getPlainAddress(t),a=(0,s.f)(),n=b.f.getConnectorId(m.f.state.activeChain);if(!o)throw Error("No address found to swap the tokens from.");let c=!T.toToken?.address||!T.toToken?.decimals,d=!T.sourceToken?.address||!T.sourceToken?.decimals||!i.f.bigNumber(T.sourceTokenAmount).gt(0),u=!T.sourceTokenAmount;return{networkAddress:a,fromAddress:o,fromCaipAddress:t,sourceTokenAddress:T.sourceToken?.address,toTokenAddress:T.toToken?.address,toTokenAmount:T.toTokenAmount,toTokenDecimals:T.toToken?.decimals,sourceTokenAmount:T.sourceTokenAmount,sourceTokenDecimals:T.sourceToken?.decimals,invalidToToken:c,invalidSourceToken:d,invalidSourceTokenAmount:u,availableToSwap:t&&!c&&!d&&!u,isAuthConnector:n===r.f.CONNECTOR_ID.AUTH}},async setSourceToken(e){if(!e){T.sourceToken=e,T.sourceTokenAmount="",T.sourceTokenPriceInUSD=0;return}T.sourceToken=e,await $.setTokenPrice(e.address,"sourceToken")},setSourceTokenAmount(e){T.sourceTokenAmount=e},async setToToken(e){if(!e){T.toToken=e,T.toTokenAmount="",T.toTokenPriceInUSD=0;return}T.toToken=e,await $.setTokenPrice(e.address,"toToken")},setToTokenAmount(e){T.toTokenAmount=e?i.f.toFixed(e,6):""},async setTokenPrice(e,t){let o=T.tokensPriceMap[e]||0;o||(T.loadingPrices=!0,o=await $.getAddressPrice(e)),"sourceToken"===t?T.sourceTokenPriceInUSD=o:"toToken"===t&&(T.toTokenPriceInUSD=o),T.loadingPrices&&(T.loadingPrices=!1),$.getParams().availableToSwap&&!T.switchingTokens&&$.swapTokens()},async switchTokens(){if(!T.initializing&&T.initialized&&!T.switchingTokens){T.switchingTokens=!0;try{let e=T.toToken?{...T.toToken}:void 0,t=T.sourceToken?{...T.sourceToken}:void 0,o=e&&""===T.toTokenAmount?"1":T.toTokenAmount;$.setSourceTokenAmount(o),$.setToTokenAmount(""),await $.setSourceToken(e),await $.setToToken(t),T.switchingTokens=!1,$.swapTokens()}catch(e){throw T.switchingTokens=!1,e}}},resetState(){T.myTokensWithBalance=k.myTokensWithBalance,T.tokensPriceMap=k.tokensPriceMap,T.initialized=k.initialized,T.initializing=k.initializing,T.switchingTokens=k.switchingTokens,T.sourceToken=k.sourceToken,T.sourceTokenAmount=k.sourceTokenAmount,T.sourceTokenPriceInUSD=k.sourceTokenPriceInUSD,T.toToken=k.toToken,T.toTokenAmount=k.toTokenAmount,T.toTokenPriceInUSD=k.toTokenPriceInUSD,T.networkPrice=k.networkPrice,T.networkTokenSymbol=k.networkTokenSymbol,T.networkBalanceInUSD=k.networkBalanceInUSD,T.inputError=k.inputError},resetValues(){let{networkAddress:e}=$.getParams(),t=T.tokens?.find(t=>t.address===e);$.setSourceToken(t),$.setToToken(void 0)},getApprovalLoadingState:()=>T.loadingApprovalTransaction,clearError(){T.transactionError=void 0},async initializeState(){if(!T.initializing){if(T.initializing=!0,!T.initialized)try{await $.fetchTokens(),T.initialized=!0}catch(e){T.initialized=!1,w.f.showError("Failed to initialize swap"),y.f.goBack()}T.initializing=!1}},async fetchTokens(){let{networkAddress:e}=$.getParams();await $.getNetworkTokenPrice(),await $.getMyTokensWithBalance();let t=T.myTokensWithBalance?.find(t=>t.address===e);t&&(T.networkTokenSymbol=t.symbol,$.setSourceToken(t),$.setSourceTokenAmount("0"))},async getTokenList(){let e=m.f.state.activeCaipNetwork?.caipNetworkId;if(T.caipNetworkId!==e||!T.tokens)try{T.tokensLoading=!0;let t=await d.f.getTokenList(e);T.tokens=t,T.caipNetworkId=e,T.popularTokens=t.sort((e,t)=>e.symbol<t.symbol?-1:+(e.symbol>t.symbol));let o=(e&&c.W.SUGGESTED_TOKENS_BY_CHAIN?.[e]||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e),i=(c.W.SWAP_SUGGESTED_TOKENS||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e).filter(e=>!o.some(t=>t.address===e.address));T.suggestedTokens=[...o,...i]}catch(e){T.tokens=[],T.popularTokens=[],T.suggestedTokens=[]}finally{T.tokensLoading=!1}},async getAddressPrice(e){let t=T.tokensPriceMap[e];if(t)return t;let o=await g.f.fetchTokenPrice({addresses:[e]}),i=o?.fungibles||[],r=[...T.tokens||[],...T.myTokensWithBalance||[]],a=r?.find(t=>t.address===e)?.symbol,n=parseFloat((i.find(e=>e.symbol.toLowerCase()===a?.toLowerCase())?.price||0).toString());return T.tokensPriceMap[e]=n,n},async getNetworkTokenPrice(){let{networkAddress:e}=$.getParams(),t=await g.f.fetchTokenPrice({addresses:[e]}).catch(()=>(w.f.showError("Failed to fetch network token price"),{fungibles:[]})),o=t.fungibles?.[0],i=o?.price.toString()||"0";T.tokensPriceMap[e]=parseFloat(i),T.networkTokenSymbol=o?.symbol||"",T.networkPrice=i},async getMyTokensWithBalance(e){let t=await n.f.getMyTokensWithBalance({forceUpdate:e,caipNetwork:m.f.state.activeCaipNetwork,address:m.f.getAccountData()?.address}),o=d.f.mapBalancesToSwapTokens(t);o&&(await $.getInitialGasPrice(),$.setBalances(o))},setBalances(e){let{networkAddress:t}=$.getParams(),o=m.f.state.activeCaipNetwork;if(!o)return;let r=e.find(e=>e.address===t);e.forEach(e=>{T.tokensPriceMap[e.address]=e.price||0}),T.myTokensWithBalance=e.filter(e=>e.address.startsWith(o.caipNetworkId)),T.networkBalanceInUSD=r?i.f.multiply(r.quantity.numeric,r.price).toString():"0"},async getInitialGasPrice(){let e=await d.f.fetchGasPrice();if(!e)return{gasPrice:null,gasPriceInUSD:null};switch(m.f.state?.activeCaipNetwork?.chainNamespace){case r.f.CHAIN.SOLANA:return T.gasFee=e.standard??"0",T.gasPriceInUSD=i.f.multiply(e.standard,T.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(T.gasFee),gasPriceInUSD:Number(T.gasPriceInUSD)};case r.f.CHAIN.EVM:default:let t=e.standard??"0",o=BigInt(t),a=BigInt(15e4),n=u.getGasPriceInUSD(T.networkPrice,a,o);return T.gasFee=t,T.gasPriceInUSD=n,{gasPrice:o,gasPriceInUSD:n}}},async swapTokens(){let e=m.f.getAccountData()?.address,t=T.sourceToken,o=T.toToken,r=i.f.bigNumber(T.sourceTokenAmount).gt(0);if(r||$.setToTokenAmount(""),!o||!t||T.loadingPrices||!r||!e)return;T.loadingQuote=!0;let a=i.f.bigNumber(T.sourceTokenAmount).times(10**t.decimals).round(0).toFixed(0);try{let r=await g.f.fetchSwapQuote({userAddress:e,from:t.address,to:o.address,gasPrice:T.gasFee,amount:a.toString()});T.loadingQuote=!1;let n=r?.quotes?.[0]?.toAmount;if(!n)return void h.f.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");let s=i.f.bigNumber(n).div(10**o.decimals).toString();$.setToTokenAmount(s),$.hasInsufficientToken(T.sourceTokenAmount,t.address)?T.inputError="Insufficient balance":(T.inputError=void 0,$.setTransactionDetails())}catch(t){let e=await d.f.handleSwapError(t);T.loadingQuote=!1,T.inputError=e||"Insufficient balance"}},async getTransaction(){let{fromCaipAddress:e,availableToSwap:t}=$.getParams(),o=T.sourceToken,i=T.toToken;if(e&&t&&o&&i&&!T.loadingQuote)try{let t;return T.loadingBuildTransaction=!0,t=await d.f.fetchSwapAllowance({userAddress:e,tokenAddress:o.address,sourceTokenAmount:T.sourceTokenAmount,sourceTokenDecimals:o.decimals})?await $.createSwapTransaction():await $.createAllowanceTransaction(),T.loadingBuildTransaction=!1,T.fetchError=!1,t}catch(e){y.f.goBack(),w.f.showError("Failed to check allowance"),T.loadingBuildTransaction=!1,T.approvalTransaction=void 0,T.swapTransaction=void 0,T.fetchError=!0;return}},async createAllowanceTransaction(){let{fromCaipAddress:e,sourceTokenAddress:t,toTokenAddress:o}=$.getParams();if(e&&o){if(!t)throw Error("createAllowanceTransaction - No source token address found.");try{let i=await g.f.generateApproveCalldata({from:t,to:o,userAddress:e}),r=l.f.getPlainAddress(i.tx.from);if(!r)throw Error("SwapController:createAllowanceTransaction - address is required");let a={data:i.tx.data,to:r,gasPrice:BigInt(i.tx.eip155.gasPrice),value:BigInt(i.tx.value),toAmount:T.toTokenAmount};return T.swapTransaction=void 0,T.approvalTransaction={data:a.data,to:a.to,gasPrice:a.gasPrice,value:a.value,toAmount:a.toAmount},{data:a.data,to:a.to,gasPrice:a.gasPrice,value:a.value,toAmount:a.toAmount}}catch(e){y.f.goBack(),w.f.showError("Failed to create approval transaction"),T.approvalTransaction=void 0,T.swapTransaction=void 0,T.fetchError=!0;return}}},async createSwapTransaction(){let{networkAddress:e,fromCaipAddress:t,sourceTokenAmount:o}=$.getParams(),i=T.sourceToken,r=T.toToken;if(!t||!o||!i||!r)return;let a=f.f.parseUnits(o,i.decimals)?.toString();try{let o=i.address===e,n=await g.f.generateSwapCalldata({userAddress:t,from:i.address,to:r.address,amount:a,disableEstimate:!0}),s=BigInt(n.tx.eip155.gas),c=BigInt(n.tx.eip155.gasPrice);if(o&&a){let o=T.myTokensWithBalance?.find(t=>t.address===e);if(o){let e=parseInt(o.quantity.decimals,10),l=f.f.parseUnits(o.quantity.numeric,e)??0n,d=s*c;if(BigInt(a)+d>l){let e=l>d?l-d:0n;e>0n&&(n=await g.f.generateSwapCalldata({userAddress:t,from:i.address,to:r.address,amount:e.toString(),disableEstimate:!0}),a=e.toString(),s=BigInt(n.tx.eip155.gas),c=BigInt(n.tx.eip155.gasPrice))}}}let d=l.f.getPlainAddress(n.tx.to);if(!d)throw Error("SwapController:createSwapTransaction - address is required");let p={data:n.tx.data,to:d,gas:s,gasPrice:c,value:o?BigInt(a??"0"):BigInt("0"),toAmount:T.toTokenAmount};return T.gasPriceInUSD=u.getGasPriceInUSD(T.networkPrice,s,c),T.approvalTransaction=void 0,T.swapTransaction=p,p}catch(e){y.f.goBack(),w.f.showError("Failed to create transaction"),T.approvalTransaction=void 0,T.swapTransaction=void 0,T.fetchError=!0;return}},onEmbeddedWalletApprovalSuccess(){w.f.showLoading("Approve limit increase in your wallet"),y.f.replace("SwapPreview")},async sendTransactionForApproval(e){let{fromAddress:t,isAuthConnector:o}=$.getParams();T.loadingApprovalTransaction=!0,o?y.f.pushTransactionStack({onSuccess:$.onEmbeddedWalletApprovalSuccess}):w.f.showLoading("Approve limit increase in your wallet");try{await f.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:r.f.CHAIN.EVM}),await $.swapTokens(),await $.getTransaction(),T.approvalTransaction=void 0,T.loadingApprovalTransaction=!1}catch(e){T.transactionError=e?.displayMessage,T.loadingApprovalTransaction=!1,w.f.showError(e?.displayMessage||"Transaction error"),v.f.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:m.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:$.state.sourceToken?.symbol||"",swapToToken:$.state.toToken?.symbol||"",swapFromAmount:$.state.sourceTokenAmount||"",swapToAmount:$.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===a.P.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(e){if(!e)return;let{fromAddress:t,toTokenAmount:o,isAuthConnector:n}=$.getParams();T.loadingTransaction=!0;let c=`Swapping ${T.sourceToken?.symbol} to ${i.f.formatNumberToLocalString(o,3)} ${T.toToken?.symbol}`,l=`Swapped ${T.sourceToken?.symbol} to ${i.f.formatNumberToLocalString(o,3)} ${T.toToken?.symbol}`;n?y.f.pushTransactionStack({onSuccess(){y.f.replace("Account"),w.f.showLoading(c),x.resetState()}}):w.f.showLoading("Confirm transaction in your wallet");try{let o=[T.sourceToken?.address,T.toToken?.address].join(","),i=await f.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:r.f.CHAIN.EVM});return T.loadingTransaction=!1,w.f.showSuccess(l),v.f.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:m.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:$.state.sourceToken?.symbol||"",swapToToken:$.state.toToken?.symbol||"",swapFromAmount:$.state.sourceTokenAmount||"",swapToAmount:$.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===a.P.ACCOUNT_TYPES.SMART_ACCOUNT}}),x.resetState(),n||y.f.replace("Account"),x.getMyTokensWithBalance(o),i}catch(e){T.transactionError=e?.displayMessage,T.loadingTransaction=!1,w.f.showError(e?.displayMessage||"Transaction error"),v.f.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:m.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:$.state.sourceToken?.symbol||"",swapToToken:$.state.toToken?.symbol||"",swapFromAmount:$.state.sourceTokenAmount||"",swapToAmount:$.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===a.P.ACCOUNT_TYPES.SMART_ACCOUNT}});return}},hasInsufficientToken:(e,t)=>u.isInsufficientSourceTokenForSwap(e,t,T.myTokensWithBalance),setTransactionDetails(){let{toTokenAddress:e,toTokenDecimals:t}=$.getParams();e&&t&&(T.gasPriceInUSD=u.getGasPriceInUSD(T.networkPrice,BigInt(T.gasFee),BigInt(15e4)),T.priceImpact=u.getPriceImpact({sourceTokenAmount:T.sourceTokenAmount,sourceTokenPriceInUSD:T.sourceTokenPriceInUSD,toTokenPriceInUSD:T.toTokenPriceInUSD,toTokenAmount:T.toTokenAmount}),T.maxSlippage=u.getMaxSlippage(T.slippage,T.toTokenAmount),T.providerFee=u.getProviderFee(T.sourceTokenAmount))}},$=(0,p.O)(x);e.s(["f",0,$],47755)},534420,624947,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(852634),e.i(383227),e.i(839009);var r=e.i(459088),a=e.i(645975),n=e.i(162611);let s=n.m`
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
`;var c=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let l={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},d={lg:"md",md:"md",sm:"sm"},u=class extends t.f{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let e=this.textVariant??l[this.size];return o.c`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let e=d[this.size],t="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return o.c`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return null}};u.styles=[r.e,r.j,s],c([(0,i.f)()],u.prototype,"size",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"fullWidth",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"loading",void 0),c([(0,i.f)()],u.prototype,"variant",void 0),c([(0,i.f)()],u.prototype,"textVariant",void 0),u=c([(0,a.f)("wui-button")],u),e.s([],624947),e.s([],534420)},62238,112699,73944,249536,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119),r=e.i(459088);let a={getSpacingStyles:(e,t)=>Array.isArray(e)?e[t]?`var(--apkt-spacing-${e[t]})`:void 0:"string"==typeof e?`var(--apkt-spacing-${e})`:void 0,getFormattedDate:e=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e),formatCurrency(e=0,t={}){let o=Number(e);return isNaN(o)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...t}).format(o)},getHostName(e){try{return new URL(e).hostname}catch(e){return""}},getTruncateString:({string:e,charsStart:t,charsEnd:o,truncate:i})=>e.length<=t+o?e:"end"===i?`${e.substring(0,t)}...`:"start"===i?`...${e.substring(e.length-o)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(o))}`,generateAvatarColors(e){let t=e.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),o=this.hexToRgb(t),i=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),r=100-3*Number(i?.replace("px","")),a=`${r}% ${r}% at 65% 40%`,n=[];for(let e=0;e<5;e+=1){let t=this.tintColor(o,.15*e);n.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`
    --local-color-1: ${n[0]};
    --local-color-2: ${n[1]};
    --local-color-3: ${n[2]};
    --local-color-4: ${n[3]};
    --local-color-5: ${n[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(e){let t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]},tintColor(e,t){let[o,i,r]=e;return[Math.round(o+(255-o)*t),Math.round(i+(255-i)*t),Math.round(r+(255-r)*t)]},isNumber:e=>/^[0-9]+$/u.test(e),getColorTheme:e=>e?e:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(e){let t=e.split(".");return 2===t.length?[t[0],t[1]]:["0","00"]},roundNumber:(e,t,o)=>e.toString().length>=t?Number(e).toFixed(o):e,cssDurationToNumber:e=>e.endsWith("s")?1e3*Number(e.replace("s","")):e.endsWith("ms")?Number(e.replace("ms","")):0,maskInput({value:e,decimals:t,integers:o}){if("."===(e=e.replace(",",".")))return"0.";let[i="",r]=e.split(".").map(e=>e.replace(/[^0-9]/gu,"")),a=o?i.substring(0,o):i,n=2===a.length?String(Number(a)):a,s="number"==typeof t?r?.substring(0,t):r;return("string"==typeof s&&("number"!=typeof t||t>0)?[n,s].join("."):n)??""},capitalize:e=>e?e.charAt(0).toUpperCase()+e.slice(1):""};e.s(["f",0,a],112699);var n=e.i(645975),s=e.i(315193);let c=s.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var l=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let d=class extends t.f{render(){return this.style.cssText=`
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
    `,o.c`<slot></slot>`}};d.styles=[r.e,c],l([(0,i.f)()],d.prototype,"flexDirection",void 0),l([(0,i.f)()],d.prototype,"flexWrap",void 0),l([(0,i.f)()],d.prototype,"flexBasis",void 0),l([(0,i.f)()],d.prototype,"flexGrow",void 0),l([(0,i.f)()],d.prototype,"flexShrink",void 0),l([(0,i.f)()],d.prototype,"alignItems",void 0),l([(0,i.f)()],d.prototype,"justifyContent",void 0),l([(0,i.f)()],d.prototype,"columnGap",void 0),l([(0,i.f)()],d.prototype,"rowGap",void 0),l([(0,i.f)()],d.prototype,"gap",void 0),l([(0,i.f)()],d.prototype,"padding",void 0),l([(0,i.f)()],d.prototype,"margin",void 0),l([(0,i.f)()],d.prototype,"width",void 0),d=l([(0,n.f)("wui-flex")],d),e.s([],73944),e.s([],62238),e.i(839009),e.s([],249536)},746650,e=>{e.i(912190),e.s([])},443452,e=>{e.i(852634),e.s([])},538822,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(684326);var r=e.i(765090),a=e.i(162611),n=e.i(459088),s=e.i(112699),c=e.i(645975);let l=a.m`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([data-error='true']) > input {
    color: ${({tokens:e})=>e.core.textError};
  }

  :host([data-error='false']) > input {
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  input {
    background: transparent;
    height: auto;
    box-sizing: border-box;
    color: ${({tokens:e})=>e.theme.textPrimary};
    font-feature-settings: 'case' on;
    font-size: ${({textSize:e})=>e.h4};
    caret-color: ${({tokens:e})=>e.core.backgroundAccentPrimary};
    line-height: ${({typography:e})=>e["h4-regular-mono"].lineHeight};
    letter-spacing: ${({typography:e})=>e["h4-regular-mono"].letterSpacing};
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    font-family: ${({fontFamily:e})=>e.mono};
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
    font-family: ${({fontFamily:e})=>e.mono};
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
    color: ${({tokens:e})=>e.theme.textSecondary};
  }
`;var d=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let u=class extends t.f{constructor(){super(...arguments),this.inputElementRef=(0,r.J)(),this.disabled=!1,this.value="",this.placeholder="0",this.widthVariant="auto",this.maxDecimals=void 0,this.maxIntegers=void 0,this.fontSize="h4",this.error=!1}firstUpdated(){this.resizeInput()}updated(){this.style.setProperty("--local-font-size",a.i.textSize[this.fontSize]),this.resizeInput()}render(){return(this.dataset.widthVariant=this.widthVariant,this.dataset.error=String(this.error),this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),"auto"===this.widthVariant)?this.inputTemplate():o.c`
      <div class="wui-input-amount-fit-width">
        <span class="wui-input-amount-fit-mirror"></span>
        ${this.inputTemplate()}
      </div>
    `}inputTemplate(){return o.c`<input
      ${(0,r.C)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    />`}dispatchInputChangeEvent(){this.inputElementRef.value&&(this.inputElementRef.value.value=s.f.maskInput({value:this.inputElementRef.value.value,decimals:this.maxDecimals,integers:this.maxIntegers}),this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value.value,bubbles:!0,composed:!0})),this.resizeInput())}resizeInput(){if("fit"===this.widthVariant){let e=this.inputElementRef.value;if(e){let t=e.previousElementSibling;t&&(t.textContent=e.value||"0",e.style.width=`${t.offsetWidth}px`)}}}};u.styles=[n.e,n.j,l],d([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),d([(0,i.f)({type:String})],u.prototype,"value",void 0),d([(0,i.f)({type:String})],u.prototype,"placeholder",void 0),d([(0,i.f)({type:String})],u.prototype,"widthVariant",void 0),d([(0,i.f)({type:Number})],u.prototype,"maxDecimals",void 0),d([(0,i.f)({type:Number})],u.prototype,"maxIntegers",void 0),d([(0,i.f)({type:String})],u.prototype,"fontSize",void 0),d([(0,i.f)({type:Boolean})],u.prototype,"error",void 0),u=d([(0,c.f)("wui-input-amount")],u),e.s([],538822)},6957,e=>{e.i(835902),e.s([])},210380,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(852634),e.i(839009);var r=e.i(459088),a=e.i(645975),n=e.i(162611);let s=n.m`
  button {
    border: none;
    background: transparent;
    height: 20px;
    padding: ${({spacing:e})=>e[2]};
    column-gap: ${({spacing:e})=>e[1]};
    border-radius: ${({borderRadius:e})=>e[1]};
    padding: 0 ${({spacing:e})=>e[1]};
    border-radius: ${({spacing:e})=>e[1]};
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent'] {
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button[data-variant='secondary'] {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[data-variant='accent']:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-variant='accent']:hover:enabled {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  button[data-variant='secondary']:hover:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var c=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let l={sm:"sm-medium",md:"md-medium"},d={accent:"accent-primary",secondary:"secondary"},u=class extends t.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.variant="accent",this.icon=void 0}render(){return o.c`
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
    `}iconTemplate(){return this.icon?o.c`<wui-icon name=${this.icon} size="sm"></wui-icon>`:null}};u.styles=[r.e,r.j,s],c([(0,i.f)()],u.prototype,"size",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,i.f)()],u.prototype,"variant",void 0),c([(0,i.f)()],u.prototype,"icon",void 0),u=c([(0,a.f)("wui-link")],u),e.s([],210380)},923838,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119),r=e.i(56350),a=e.i(675457);e.i(852634),e.i(864380),e.i(839009),e.i(73944);var n=e.i(459088),s=e.i(645975),c=e.i(162611);let l=c.m`
  :host {
    width: 100%;
  }

  button {
    padding: ${({spacing:e})=>e[3]};
    display: flex;
    gap: ${({spacing:e})=>e[3]};
    justify-content: space-between;
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    background-color: transparent;
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: ${({spacing:e})=>e[10]};
    height: ${({spacing:e})=>e[10]};
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  .token-name-container {
    flex: 1;
  }
`;var d=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let u=class extends t.f{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1,this.imageError=!1}render(){return o.c`
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
    `}updated(e){e.has("tokenImageUrl")&&(this.imageError=!1)}visualTemplate(){return this.tokenName&&this.tokenImageUrl&&!this.imageError?o.c`<wui-image
        alt=${this.tokenName}
        src=${this.tokenImageUrl}
        @onLoadError=${this.handleImageError}
      ></wui-image>`:o.c`<wui-icon name="coinPlaceholder" color="default"></wui-icon>`}handleImageError(){this.imageError=!0}};u.styles=[n.e,n.j,l],d([(0,i.f)()],u.prototype,"tokenName",void 0),d([(0,i.f)()],u.prototype,"tokenImageUrl",void 0),d([(0,i.f)({type:Number})],u.prototype,"tokenValue",void 0),d([(0,i.f)()],u.prototype,"tokenAmount",void 0),d([(0,i.f)()],u.prototype,"tokenCurrency",void 0),d([(0,i.f)({type:Boolean})],u.prototype,"clickable",void 0),d([(0,r.f)()],u.prototype,"imageError",void 0),u=d([(0,s.f)("wui-list-token")],u),e.s([],923838)},79929,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(839009);var r=e.i(459088),a=e.i(645975),n=e.i(162611);let s=n.m`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({tokens:e})=>e.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  :host([data-bg-color='primary']) > wui-text {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  :host([data-bg-color='secondary']) > wui-text {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }
`;var c=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let l=class extends t.f{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,o.c`${this.template()}`}template(){return this.text?o.c`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};l.styles=[r.e,s],c([(0,i.f)()],l.prototype,"text",void 0),c([(0,i.f)()],l.prototype,"bgColor",void 0),l=c([(0,a.f)("wui-separator")],l),e.s([],79929)},497521,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(852634),e.i(864380),e.i(864576),e.i(839009),e.i(73944);var r=e.i(459088),a=e.i(645975),n=e.i(162611);let s=n.m`
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
`;var c=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let l={lg:"lg-regular",md:"lg-regular",sm:"md-regular"},d={lg:"lg",md:"md",sm:"sm"},u=class extends t.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.text="",this.loading=!1}render(){return this.loading?o.c` <wui-flex alignItems="center" gap="01" padding="01">
        <wui-shimmer width="20px" height="20px"></wui-shimmer>
        <wui-shimmer width="32px" height="18px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:o.c`
      <button ?disabled=${this.disabled} data-size=${this.size}>
        ${this.imageTemplate()} ${this.textTemplate()}
      </button>
    `}imageTemplate(){if(this.imageSrc&&this.chainImageSrc)return o.c`<wui-flex class="left-image-container">
        <wui-image src=${this.imageSrc} class="token-image"></wui-image>
        <wui-image src=${this.chainImageSrc} class="chain-image"></wui-image>
      </wui-flex>`;if(this.imageSrc)return o.c`<wui-image src=${this.imageSrc} class="token-image"></wui-image>`;let e=d[this.size];return o.c`<wui-flex class="left-icon-container">
      <wui-icon size=${e} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}textTemplate(){let e=l[this.size];return o.c`<wui-text color="primary" variant=${e}
      >${this.text}</wui-text
    >`}};u.styles=[r.e,r.j,s],c([(0,i.f)()],u.prototype,"size",void 0),c([(0,i.f)()],u.prototype,"imageSrc",void 0),c([(0,i.f)()],u.prototype,"chainImageSrc",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,i.f)()],u.prototype,"text",void 0),c([(0,i.f)({type:Boolean})],u.prototype,"loading",void 0),u=c([(0,a.f)("wui-token-button")],u),e.s([],497521)},864576,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119),r=e.i(645975),a=e.i(162611);let n=a.m`
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
    `,this.dataset.rounded=this.rounded?"true":"false",o.c`<slot></slot>`}};c.styles=[n],s([(0,i.f)()],c.prototype,"width",void 0),s([(0,i.f)()],c.prototype,"height",void 0),s([(0,i.f)()],c.prototype,"variant",void 0),s([(0,i.f)({type:Boolean})],c.prototype,"rounded",void 0),c=s([(0,r.f)("wui-shimmer")],c),e.s([],864576)},221803,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(864380);var r=e.i(459088),a=e.i(112699),n=e.i(645975),s=e.i(162611);let c=s.m`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
    border-radius: ${({borderRadius:e})=>e[16]};
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  :host([data-variant='generated']) {
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`;var l=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let d=class extends t.f{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0,this.size="xl"}render(){let e={inherit:"inherit",xxs:"3",xs:"5",sm:"6",md:"8",mdl:"8",lg:"10",xl:"16",xxl:"20"};return this.style.cssText=`
    --local-width: var(--apkt-spacing-${e[this.size??"xl"]});
    --local-height: var(--apkt-spacing-${e[this.size??"xl"]});
    `,o.c`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",o.c`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";let e=a.f.generateAvatarColors(this.address);return this.style.cssText+=`
 ${e}`,null}return this.dataset.variant="default",null}};d.styles=[r.e,c],l([(0,i.f)()],d.prototype,"imageSrc",void 0),l([(0,i.f)()],d.prototype,"alt",void 0),l([(0,i.f)()],d.prototype,"address",void 0),l([(0,i.f)()],d.prototype,"size",void 0),d=l([(0,n.f)("wui-avatar")],d),e.s([],221803)},912190,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(234051);var r=e.i(829389);e.i(852634);var a=e.i(459088),n=e.i(645975),s=e.i(162611);let c=s.m`
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
`;var l=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let d=class extends t.f{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,o.c`
      <wui-icon size=${(0,r.f)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};d.styles=[a.e,a.j,c],l([(0,i.f)()],d.prototype,"icon",void 0),l([(0,i.f)()],d.prototype,"size",void 0),l([(0,i.f)()],d.prototype,"padding",void 0),l([(0,i.f)()],d.prototype,"color",void 0),d=l([(0,n.f)("wui-icon-box")],d),e.s([],912190)},835902,e=>{e.i(812207);var t=e.i(108285),o=e.i(654479);e.i(374576);var i=e.i(120119);e.i(234051);var r=e.i(829389);e.i(684326);var a=e.i(765090);e.i(852634),e.i(839009);var n=e.i(459088),s=e.i(645975),c=e.i(162611);let l=c.m`
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
`;var d=function(e,t,o,i){var r,a=arguments.length,n=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(a<3?r(n):a>3?r(t,o,n):r(t,o))||n);return a>3&&n&&Object.defineProperty(t,o,n),n};let u=class extends t.f{constructor(){super(...arguments),this.inputElementRef=(0,a.J)(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return o.c` <div class="wui-input-text-container">
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
      </button>`:null}templateError(){return this.errorText?o.c`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?o.c`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};u.styles=[n.e,n.j,l],d([(0,i.f)()],u.prototype,"icon",void 0),d([(0,i.f)({type:Boolean})],u.prototype,"disabled",void 0),d([(0,i.f)({type:Boolean})],u.prototype,"loading",void 0),d([(0,i.f)()],u.prototype,"placeholder",void 0),d([(0,i.f)()],u.prototype,"type",void 0),d([(0,i.f)()],u.prototype,"value",void 0),d([(0,i.f)()],u.prototype,"errorText",void 0),d([(0,i.f)()],u.prototype,"warningText",void 0),d([(0,i.f)()],u.prototype,"onSubmit",void 0),d([(0,i.f)()],u.prototype,"size",void 0),d([(0,i.f)({attribute:!1})],u.prototype,"onKeyDown",void 0),u=d([(0,s.f)("wui-input-text")],u),e.s([],835902)},684326,765090,e=>{var t=e.i(654479);let{I:o}=t.e;var i=e.i(391909);let r=(e,t)=>{let o=e._$AN;if(void 0===o)return!1;for(let e of o)e._$AO?.(t,!1),r(e,t);return!0},a=e=>{let t,o;do{if(void 0===(t=e._$AM))break;(o=t._$AN).delete(e),e=t}while(0===o?.size)},n=e=>{for(let t;t=e._$AM;e=t){let o=t._$AN;if(void 0===o)t._$AN=o=new Set;else if(o.has(e))break;o.add(e),l(t)}};function s(e){void 0!==this._$AN?(a(this),this._$AM=e,n(this)):this._$AM=e}function c(e,t=!1,o=0){let i=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(i))for(let e=o;e<i.length;e++)r(i[e],!1),a(i[e]);else null!=i&&(r(i,!1),a(i));else r(this,e)}let l=e=>{e.type==i.x.CHILD&&(e._$AP??=c,e._$AQ??=s)};class d extends i.C{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,o){super._$AT(e,t,o),n(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(r(this,e),a(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class u{}let p=new WeakMap,h=(0,i.l)(class extends d{render(e){return t.i}update(e,[o]){let i=o!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=o,this.ht=e.options?.host,this.rt(this.ct=e.element)),t.i}rt(e){if(void 0!==this.G)if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,o=p.get(t);void 0===o&&(o=new WeakMap,p.set(t,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?p.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});e.s(["J",0,()=>new u,"C",0,h],765090),e.s([],684326)}])})();