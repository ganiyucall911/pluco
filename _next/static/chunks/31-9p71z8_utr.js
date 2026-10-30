(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[47755,e=>{var t=e.i(365801),a=e.i(742710),i=e.i(675457),o=e.i(401564),n=e.i(979484),s=e.i(518887),r=e.i(564126),c=e.i(360334),l=e.i(227302),u=e.i(664717);let d={getGasPriceInEther:(e,t)=>Number(t*e)/1e18,getGasPriceInUSD(e,t,a){let o=d.getGasPriceInEther(t,a);return i.f.bigNumber(e).times(o).toNumber()},getPriceImpact({sourceTokenAmount:e,sourceTokenPriceInUSD:t,toTokenPriceInUSD:a,toTokenAmount:o}){let n=i.f.bigNumber(e).times(t),s=i.f.bigNumber(o).times(a);return n.minus(s).div(n).times(100).toNumber()},getMaxSlippage(e,t){let a=i.f.bigNumber(e).div(100);return i.f.multiply(t,a).toNumber()},getProviderFee:(e,t=.0085)=>i.f.bigNumber(e).times(t).toString(),isInsufficientNetworkTokenForGas:(e,t)=>!!i.f.bigNumber(e).eq(0)||i.f.bigNumber(i.f.bigNumber(t||"0")).gt(e),isInsufficientSourceTokenForSwap(e,t,a){let o=a?.find(e=>e.address===t)?.quantity?.numeric;return i.f.bigNumber(o||"0").lt(e)}};var m=e.i(592279),p=e.i(851887),h=e.i(24742),g=e.i(960398),k=e.i(971080),f=e.i(149454),T=e.i(653157),w=e.i(221728),v=e.i(811424);let P={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:c.W.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},b=(0,t.s)({...P}),y={state:b,subscribe:e=>(0,t.i)(b,()=>e(b)),subscribeKey:(e,t)=>(0,a.T)(b,e,t),getParams(){let e=g.f.state.activeChain,t=g.f.getAccountData(e)?.caipAddress??g.f.state.activeCaipAddress,a=l.f.getPlainAddress(t),n=(0,r.f)(),s=f.f.getConnectorId(g.f.state.activeChain);if(!a)throw Error("No address found to swap the tokens from.");let c=!b.toToken?.address||!b.toToken?.decimals,u=!b.sourceToken?.address||!b.sourceToken?.decimals||!i.f.bigNumber(b.sourceTokenAmount).gt(0),d=!b.sourceTokenAmount;return{networkAddress:n,fromAddress:a,fromCaipAddress:t,sourceTokenAddress:b.sourceToken?.address,toTokenAddress:b.toToken?.address,toTokenAmount:b.toTokenAmount,toTokenDecimals:b.toToken?.decimals,sourceTokenAmount:b.sourceTokenAmount,sourceTokenDecimals:b.sourceToken?.decimals,invalidToToken:c,invalidSourceToken:u,invalidSourceTokenAmount:d,availableToSwap:t&&!c&&!u&&!d,isAuthConnector:s===o.f.CONNECTOR_ID.AUTH}},async setSourceToken(e){if(!e){b.sourceToken=e,b.sourceTokenAmount="",b.sourceTokenPriceInUSD=0;return}b.sourceToken=e,await S.setTokenPrice(e.address,"sourceToken")},setSourceTokenAmount(e){b.sourceTokenAmount=e},async setToToken(e){if(!e){b.toToken=e,b.toTokenAmount="",b.toTokenPriceInUSD=0;return}b.toToken=e,await S.setTokenPrice(e.address,"toToken")},setToTokenAmount(e){b.toTokenAmount=e?i.f.toFixed(e,6):""},async setTokenPrice(e,t){let a=b.tokensPriceMap[e]||0;a||(b.loadingPrices=!0,a=await S.getAddressPrice(e)),"sourceToken"===t?b.sourceTokenPriceInUSD=a:"toToken"===t&&(b.toTokenPriceInUSD=a),b.loadingPrices&&(b.loadingPrices=!1),S.getParams().availableToSwap&&!b.switchingTokens&&S.swapTokens()},async switchTokens(){if(!b.initializing&&b.initialized&&!b.switchingTokens){b.switchingTokens=!0;try{let e=b.toToken?{...b.toToken}:void 0,t=b.sourceToken?{...b.sourceToken}:void 0,a=e&&""===b.toTokenAmount?"1":b.toTokenAmount;S.setSourceTokenAmount(a),S.setToTokenAmount(""),await S.setSourceToken(e),await S.setToToken(t),b.switchingTokens=!1,S.swapTokens()}catch(e){throw b.switchingTokens=!1,e}}},resetState(){b.myTokensWithBalance=P.myTokensWithBalance,b.tokensPriceMap=P.tokensPriceMap,b.initialized=P.initialized,b.initializing=P.initializing,b.switchingTokens=P.switchingTokens,b.sourceToken=P.sourceToken,b.sourceTokenAmount=P.sourceTokenAmount,b.sourceTokenPriceInUSD=P.sourceTokenPriceInUSD,b.toToken=P.toToken,b.toTokenAmount=P.toTokenAmount,b.toTokenPriceInUSD=P.toTokenPriceInUSD,b.networkPrice=P.networkPrice,b.networkTokenSymbol=P.networkTokenSymbol,b.networkBalanceInUSD=P.networkBalanceInUSD,b.inputError=P.inputError},resetValues(){let{networkAddress:e}=S.getParams(),t=b.tokens?.find(t=>t.address===e);S.setSourceToken(t),S.setToToken(void 0)},getApprovalLoadingState:()=>b.loadingApprovalTransaction,clearError(){b.transactionError=void 0},async initializeState(){if(!b.initializing){if(b.initializing=!0,!b.initialized)try{await S.fetchTokens(),b.initialized=!0}catch(e){b.initialized=!1,v.f.showError("Failed to initialize swap"),w.f.goBack()}b.initializing=!1}},async fetchTokens(){let{networkAddress:e}=S.getParams();await S.getNetworkTokenPrice(),await S.getMyTokensWithBalance();let t=b.myTokensWithBalance?.find(t=>t.address===e);t&&(b.networkTokenSymbol=t.symbol,S.setSourceToken(t),S.setSourceTokenAmount("0"))},async getTokenList(){let e=g.f.state.activeCaipNetwork?.caipNetworkId;if(b.caipNetworkId!==e||!b.tokens)try{b.tokensLoading=!0;let t=await u.f.getTokenList(e);b.tokens=t,b.caipNetworkId=e,b.popularTokens=t.sort((e,t)=>e.symbol<t.symbol?-1:+(e.symbol>t.symbol));let a=(e&&c.W.SUGGESTED_TOKENS_BY_CHAIN?.[e]||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e),i=(c.W.SWAP_SUGGESTED_TOKENS||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e).filter(e=>!a.some(t=>t.address===e.address));b.suggestedTokens=[...a,...i]}catch(e){b.tokens=[],b.popularTokens=[],b.suggestedTokens=[]}finally{b.tokensLoading=!1}},async getAddressPrice(e){let t=b.tokensPriceMap[e];if(t)return t;let a=await h.f.fetchTokenPrice({addresses:[e]}),i=a?.fungibles||[],o=[...b.tokens||[],...b.myTokensWithBalance||[]],n=o?.find(t=>t.address===e)?.symbol,s=parseFloat((i.find(e=>e.symbol.toLowerCase()===n?.toLowerCase())?.price||0).toString());return b.tokensPriceMap[e]=s,s},async getNetworkTokenPrice(){let{networkAddress:e}=S.getParams(),t=await h.f.fetchTokenPrice({addresses:[e]}).catch(()=>(v.f.showError("Failed to fetch network token price"),{fungibles:[]})),a=t.fungibles?.[0],i=a?.price.toString()||"0";b.tokensPriceMap[e]=parseFloat(i),b.networkTokenSymbol=a?.symbol||"",b.networkPrice=i},async getMyTokensWithBalance(e){let t=await s.f.getMyTokensWithBalance({forceUpdate:e,caipNetwork:g.f.state.activeCaipNetwork,address:g.f.getAccountData()?.address}),a=u.f.mapBalancesToSwapTokens(t);a&&(await S.getInitialGasPrice(),S.setBalances(a))},setBalances(e){let{networkAddress:t}=S.getParams(),a=g.f.state.activeCaipNetwork;if(!a)return;let o=e.find(e=>e.address===t);e.forEach(e=>{b.tokensPriceMap[e.address]=e.price||0}),b.myTokensWithBalance=e.filter(e=>e.address.startsWith(a.caipNetworkId)),b.networkBalanceInUSD=o?i.f.multiply(o.quantity.numeric,o.price).toString():"0"},async getInitialGasPrice(){let e=await u.f.fetchGasPrice();if(!e)return{gasPrice:null,gasPriceInUSD:null};switch(g.f.state?.activeCaipNetwork?.chainNamespace){case o.f.CHAIN.SOLANA:return b.gasFee=e.standard??"0",b.gasPriceInUSD=i.f.multiply(e.standard,b.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(b.gasFee),gasPriceInUSD:Number(b.gasPriceInUSD)};case o.f.CHAIN.EVM:default:let t=e.standard??"0",a=BigInt(t),n=BigInt(15e4),s=d.getGasPriceInUSD(b.networkPrice,n,a);return b.gasFee=t,b.gasPriceInUSD=s,{gasPrice:a,gasPriceInUSD:s}}},async swapTokens(){let e=g.f.getAccountData()?.address,t=b.sourceToken,a=b.toToken,o=i.f.bigNumber(b.sourceTokenAmount).gt(0);if(o||S.setToTokenAmount(""),!a||!t||b.loadingPrices||!o||!e)return;b.loadingQuote=!0;let n=i.f.bigNumber(b.sourceTokenAmount).times(10**t.decimals).round(0).toFixed(0);try{let o=await h.f.fetchSwapQuote({userAddress:e,from:t.address,to:a.address,gasPrice:b.gasFee,amount:n.toString()});b.loadingQuote=!1;let s=o?.quotes?.[0]?.toAmount;if(!s)return void p.f.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");let r=i.f.bigNumber(s).div(10**a.decimals).toString();S.setToTokenAmount(r),S.hasInsufficientToken(b.sourceTokenAmount,t.address)?b.inputError="Insufficient balance":(b.inputError=void 0,S.setTransactionDetails())}catch(t){let e=await u.f.handleSwapError(t);b.loadingQuote=!1,b.inputError=e||"Insufficient balance"}},async getTransaction(){let{fromCaipAddress:e,availableToSwap:t}=S.getParams(),a=b.sourceToken,i=b.toToken;if(e&&t&&a&&i&&!b.loadingQuote)try{let t;return b.loadingBuildTransaction=!0,t=await u.f.fetchSwapAllowance({userAddress:e,tokenAddress:a.address,sourceTokenAmount:b.sourceTokenAmount,sourceTokenDecimals:a.decimals})?await S.createSwapTransaction():await S.createAllowanceTransaction(),b.loadingBuildTransaction=!1,b.fetchError=!1,t}catch(e){w.f.goBack(),v.f.showError("Failed to check allowance"),b.loadingBuildTransaction=!1,b.approvalTransaction=void 0,b.swapTransaction=void 0,b.fetchError=!0;return}},async createAllowanceTransaction(){let{fromCaipAddress:e,sourceTokenAddress:t,toTokenAddress:a}=S.getParams();if(e&&a){if(!t)throw Error("createAllowanceTransaction - No source token address found.");try{let i=await h.f.generateApproveCalldata({from:t,to:a,userAddress:e}),o=l.f.getPlainAddress(i.tx.from);if(!o)throw Error("SwapController:createAllowanceTransaction - address is required");let n={data:i.tx.data,to:o,gasPrice:BigInt(i.tx.eip155.gasPrice),value:BigInt(i.tx.value),toAmount:b.toTokenAmount};return b.swapTransaction=void 0,b.approvalTransaction={data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount},{data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount}}catch(e){w.f.goBack(),v.f.showError("Failed to create approval transaction"),b.approvalTransaction=void 0,b.swapTransaction=void 0,b.fetchError=!0;return}}},async createSwapTransaction(){let{networkAddress:e,fromCaipAddress:t,sourceTokenAmount:a}=S.getParams(),i=b.sourceToken,o=b.toToken;if(!t||!a||!i||!o)return;let n=k.f.parseUnits(a,i.decimals)?.toString();try{let a=i.address===e,s=await h.f.generateSwapCalldata({userAddress:t,from:i.address,to:o.address,amount:n,disableEstimate:!0}),r=BigInt(s.tx.eip155.gas),c=BigInt(s.tx.eip155.gasPrice);if(a&&n){let a=b.myTokensWithBalance?.find(t=>t.address===e);if(a){let e=parseInt(a.quantity.decimals,10),l=k.f.parseUnits(a.quantity.numeric,e)??0n,u=r*c;if(BigInt(n)+u>l){let e=l>u?l-u:0n;e>0n&&(s=await h.f.generateSwapCalldata({userAddress:t,from:i.address,to:o.address,amount:e.toString(),disableEstimate:!0}),n=e.toString(),r=BigInt(s.tx.eip155.gas),c=BigInt(s.tx.eip155.gasPrice))}}}let u=l.f.getPlainAddress(s.tx.to);if(!u)throw Error("SwapController:createSwapTransaction - address is required");let m={data:s.tx.data,to:u,gas:r,gasPrice:c,value:a?BigInt(n??"0"):BigInt("0"),toAmount:b.toTokenAmount};return b.gasPriceInUSD=d.getGasPriceInUSD(b.networkPrice,r,c),b.approvalTransaction=void 0,b.swapTransaction=m,m}catch(e){w.f.goBack(),v.f.showError("Failed to create transaction"),b.approvalTransaction=void 0,b.swapTransaction=void 0,b.fetchError=!0;return}},onEmbeddedWalletApprovalSuccess(){v.f.showLoading("Approve limit increase in your wallet"),w.f.replace("SwapPreview")},async sendTransactionForApproval(e){let{fromAddress:t,isAuthConnector:a}=S.getParams();b.loadingApprovalTransaction=!0,a?w.f.pushTransactionStack({onSuccess:S.onEmbeddedWalletApprovalSuccess}):v.f.showLoading("Approve limit increase in your wallet");try{await k.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:o.f.CHAIN.EVM}),await S.swapTokens(),await S.getTransaction(),b.approvalTransaction=void 0,b.loadingApprovalTransaction=!1}catch(e){b.transactionError=e?.displayMessage,b.loadingApprovalTransaction=!1,v.f.showError(e?.displayMessage||"Transaction error"),T.f.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:g.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:S.state.sourceToken?.symbol||"",swapToToken:S.state.toToken?.symbol||"",swapFromAmount:S.state.sourceTokenAmount||"",swapToAmount:S.state.toTokenAmount||"",isSmartAccount:(0,r.P)(o.f.CHAIN.EVM)===n.P.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(e){if(!e)return;let{fromAddress:t,toTokenAmount:a,isAuthConnector:s}=S.getParams();b.loadingTransaction=!0;let c=`Swapping ${b.sourceToken?.symbol} to ${i.f.formatNumberToLocalString(a,3)} ${b.toToken?.symbol}`,l=`Swapped ${b.sourceToken?.symbol} to ${i.f.formatNumberToLocalString(a,3)} ${b.toToken?.symbol}`;s?w.f.pushTransactionStack({onSuccess(){w.f.replace("Account"),v.f.showLoading(c),y.resetState()}}):v.f.showLoading("Confirm transaction in your wallet");try{let a=[b.sourceToken?.address,b.toToken?.address].join(","),i=await k.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:o.f.CHAIN.EVM});return b.loadingTransaction=!1,v.f.showSuccess(l),T.f.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:g.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:S.state.sourceToken?.symbol||"",swapToToken:S.state.toToken?.symbol||"",swapFromAmount:S.state.sourceTokenAmount||"",swapToAmount:S.state.toTokenAmount||"",isSmartAccount:(0,r.P)(o.f.CHAIN.EVM)===n.P.ACCOUNT_TYPES.SMART_ACCOUNT}}),y.resetState(),s||w.f.replace("Account"),y.getMyTokensWithBalance(a),i}catch(e){b.transactionError=e?.displayMessage,b.loadingTransaction=!1,v.f.showError(e?.displayMessage||"Transaction error"),T.f.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:g.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:S.state.sourceToken?.symbol||"",swapToToken:S.state.toToken?.symbol||"",swapFromAmount:S.state.sourceTokenAmount||"",swapToAmount:S.state.toTokenAmount||"",isSmartAccount:(0,r.P)(o.f.CHAIN.EVM)===n.P.ACCOUNT_TYPES.SMART_ACCOUNT}});return}},hasInsufficientToken:(e,t)=>d.isInsufficientSourceTokenForSwap(e,t,b.myTokensWithBalance),setTransactionDetails(){let{toTokenAddress:e,toTokenDecimals:t}=S.getParams();e&&t&&(b.gasPriceInUSD=d.getGasPriceInUSD(b.networkPrice,BigInt(b.gasFee),BigInt(15e4)),b.priceImpact=d.getPriceImpact({sourceTokenAmount:b.sourceTokenAmount,sourceTokenPriceInUSD:b.sourceTokenPriceInUSD,toTokenPriceInUSD:b.toTokenPriceInUSD,toTokenAmount:b.toTokenAmount}),b.maxSlippage=d.getMaxSlippage(b.slippage,b.toTokenAmount),b.providerFee=d.getProviderFee(b.sourceTokenAmount))}},S=(0,m.O)(y);e.s(["f",0,S],47755)},538822,e=>{e.i(812207);var t=e.i(108285),a=e.i(654479);e.i(374576);var i=e.i(120119);e.i(684326);var o=e.i(765090),n=e.i(162611),s=e.i(459088),r=e.i(112699),c=e.i(645975);let l=n.m`
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
`;var u=function(e,t,a,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(s=(n<3?o(s):n>3?o(t,a,s):o(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let d=class extends t.f{constructor(){super(...arguments),this.inputElementRef=(0,o.J)(),this.disabled=!1,this.value="",this.placeholder="0",this.widthVariant="auto",this.maxDecimals=void 0,this.maxIntegers=void 0,this.fontSize="h4",this.error=!1}firstUpdated(){this.resizeInput()}updated(){this.style.setProperty("--local-font-size",n.i.textSize[this.fontSize]),this.resizeInput()}render(){return(this.dataset.widthVariant=this.widthVariant,this.dataset.error=String(this.error),this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),"auto"===this.widthVariant)?this.inputTemplate():a.c`
      <div class="wui-input-amount-fit-width">
        <span class="wui-input-amount-fit-mirror"></span>
        ${this.inputTemplate()}
      </div>
    `}inputTemplate(){return a.c`<input
      ${(0,o.C)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    />`}dispatchInputChangeEvent(){this.inputElementRef.value&&(this.inputElementRef.value.value=r.f.maskInput({value:this.inputElementRef.value.value,decimals:this.maxDecimals,integers:this.maxIntegers}),this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value.value,bubbles:!0,composed:!0})),this.resizeInput())}resizeInput(){if("fit"===this.widthVariant){let e=this.inputElementRef.value;if(e){let t=e.previousElementSibling;t&&(t.textContent=e.value||"0",e.style.width=`${t.offsetWidth}px`)}}}};d.styles=[s.e,s.j,l],u([(0,i.f)({type:Boolean})],d.prototype,"disabled",void 0),u([(0,i.f)({type:String})],d.prototype,"value",void 0),u([(0,i.f)({type:String})],d.prototype,"placeholder",void 0),u([(0,i.f)({type:String})],d.prototype,"widthVariant",void 0),u([(0,i.f)({type:Number})],d.prototype,"maxDecimals",void 0),u([(0,i.f)({type:Number})],d.prototype,"maxIntegers",void 0),u([(0,i.f)({type:String})],d.prototype,"fontSize",void 0),u([(0,i.f)({type:Boolean})],d.prototype,"error",void 0),d=u([(0,c.f)("wui-input-amount")],d),e.s([],538822)},497521,e=>{e.i(812207);var t=e.i(108285),a=e.i(654479);e.i(374576);var i=e.i(120119);e.i(852634),e.i(864380),e.i(864576),e.i(839009),e.i(73944);var o=e.i(459088),n=e.i(645975),s=e.i(162611);let r=s.m`
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
`;var c=function(e,t,a,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(s=(n<3?o(s):n>3?o(t,a,s):o(t,a))||s);return n>3&&s&&Object.defineProperty(t,a,s),s};let l={lg:"lg-regular",md:"lg-regular",sm:"md-regular"},u={lg:"lg",md:"md",sm:"sm"},d=class extends t.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.text="",this.loading=!1}render(){return this.loading?a.c` <wui-flex alignItems="center" gap="01" padding="01">
        <wui-shimmer width="20px" height="20px"></wui-shimmer>
        <wui-shimmer width="32px" height="18px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:a.c`
      <button ?disabled=${this.disabled} data-size=${this.size}>
        ${this.imageTemplate()} ${this.textTemplate()}
      </button>
    `}imageTemplate(){if(this.imageSrc&&this.chainImageSrc)return a.c`<wui-flex class="left-image-container">
        <wui-image src=${this.imageSrc} class="token-image"></wui-image>
        <wui-image src=${this.chainImageSrc} class="chain-image"></wui-image>
      </wui-flex>`;if(this.imageSrc)return a.c`<wui-image src=${this.imageSrc} class="token-image"></wui-image>`;let e=u[this.size];return a.c`<wui-flex class="left-icon-container">
      <wui-icon size=${e} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}textTemplate(){let e=l[this.size];return a.c`<wui-text color="primary" variant=${e}
      >${this.text}</wui-text
    >`}};d.styles=[o.e,o.j,r],c([(0,i.f)()],d.prototype,"size",void 0),c([(0,i.f)()],d.prototype,"imageSrc",void 0),c([(0,i.f)()],d.prototype,"chainImageSrc",void 0),c([(0,i.f)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,i.f)()],d.prototype,"text",void 0),c([(0,i.f)({type:Boolean})],d.prototype,"loading",void 0),d=c([(0,n.f)("wui-token-button")],d),e.s([],497521)}],982012,e=>{e.v(t=>Promise.all(["static/chunks/3v2scxcshe86h.js"].map(t=>e.l(t))).then(()=>t(596403)))},340171,e=>{e.v(t=>Promise.all(["static/chunks/06b1djwhnzux9.js"].map(t=>e.l(t))).then(()=>t(169592)))},210729,e=>{e.v(t=>Promise.all(["static/chunks/2yhrr0ssbejww.js"].map(t=>e.l(t))).then(()=>t(786977)))},480342,e=>{e.v(t=>Promise.all(["static/chunks/0opgi7wwy_w07.js"].map(t=>e.l(t))).then(()=>t(532833)))},995724,e=>{e.v(t=>Promise.all(["static/chunks/2xcr66kdq0er4.js"].map(t=>e.l(t))).then(()=>t(972412)))},952792,e=>{e.v(t=>Promise.all(["static/chunks/3yu2hph-0a772.js"].map(t=>e.l(t))).then(()=>t(126763)))},959668,e=>{e.v(t=>Promise.all(["static/chunks/2dydnwhhoamrq.js"].map(t=>e.l(t))).then(()=>t(336682)))},841373,e=>{e.v(t=>Promise.all(["static/chunks/408qukzhur98t.js"].map(t=>e.l(t))).then(()=>t(51383)))},969595,e=>{e.v(t=>Promise.all(["static/chunks/15-ago0tsbrd8.js"].map(t=>e.l(t))).then(()=>t(4289)))},196302,e=>{e.v(t=>Promise.all(["static/chunks/15wj4orvi4nmi.js"].map(t=>e.l(t))).then(()=>t(843229)))},344243,e=>{e.v(t=>Promise.all(["static/chunks/2ovpks3u9ft2o.js"].map(t=>e.l(t))).then(()=>t(412721)))},233052,e=>{e.v(t=>Promise.all(["static/chunks/0cwd7tmblagr8.js"].map(t=>e.l(t))).then(()=>t(656357)))},500280,e=>{e.v(t=>Promise.all(["static/chunks/3tbgcvjtmgk0a.js"].map(t=>e.l(t))).then(()=>t(478319)))},292833,e=>{e.v(t=>Promise.all(["static/chunks/39fqgt3hslvua.js"].map(t=>e.l(t))).then(()=>t(861289)))},617096,e=>{e.v(t=>Promise.all(["static/chunks/3-5d7nyyvpysg.js"].map(t=>e.l(t))).then(()=>t(926703)))},205963,e=>{e.v(t=>Promise.all(["static/chunks/2d_vl4mujuj8s.js"].map(t=>e.l(t))).then(()=>t(409953)))},548774,e=>{e.v(t=>Promise.all(["static/chunks/001p5es7r47rp.js"].map(t=>e.l(t))).then(()=>t(632295)))},550090,e=>{e.v(t=>Promise.all(["static/chunks/02ggvu75nx83f.js"].map(t=>e.l(t))).then(()=>t(152019)))},538711,e=>{e.v(t=>Promise.all(["static/chunks/1oi00xp-dlz_r.js"].map(t=>e.l(t))).then(()=>t(164871)))},650621,e=>{e.v(t=>Promise.all(["static/chunks/3r5fjboe7msiw.js"].map(t=>e.l(t))).then(()=>t(159021)))},105462,e=>{e.v(t=>Promise.all(["static/chunks/1nzk11cjafwrv.js"].map(t=>e.l(t))).then(()=>t(765788)))},470963,e=>{e.v(t=>Promise.all(["static/chunks/34kgqm90byngq.js"].map(t=>e.l(t))).then(()=>t(617729)))},956906,e=>{e.v(t=>Promise.all(["static/chunks/00e0f3x9q-8ma.js"].map(t=>e.l(t))).then(()=>t(734056)))},978023,e=>{e.v(t=>Promise.all(["static/chunks/1y6ljlgmmkf47.js"].map(t=>e.l(t))).then(()=>t(271507)))},69039,e=>{e.v(t=>Promise.all(["static/chunks/04x5h2u-wszlt.js"].map(t=>e.l(t))).then(()=>t(402658)))},63605,e=>{e.v(t=>Promise.all(["static/chunks/38668o67zgmla.js"].map(t=>e.l(t))).then(()=>t(739621)))},542324,e=>{e.v(t=>Promise.all(["static/chunks/0xeeprmb_s-yv.js"].map(t=>e.l(t))).then(()=>t(111923)))},944020,e=>{e.v(t=>Promise.all(["static/chunks/27poi9kgs-so0.js"].map(t=>e.l(t))).then(()=>t(384535)))},750711,e=>{e.v(t=>Promise.all(["static/chunks/2qcgogqoa4iie.js"].map(t=>e.l(t))).then(()=>t(15680)))},956601,e=>{e.v(t=>Promise.all(["static/chunks/0wjv74tnekarp.js"].map(t=>e.l(t))).then(()=>t(301958)))},281254,e=>{e.v(t=>Promise.all(["static/chunks/1648_n3nlsj-a.js"].map(t=>e.l(t))).then(()=>t(111420)))},179893,e=>{e.v(t=>Promise.all(["static/chunks/0b-xwdty-xxrb.js"].map(t=>e.l(t))).then(()=>t(852452)))},201514,e=>{e.v(t=>Promise.all(["static/chunks/04b7nsp58r0-6.js"].map(t=>e.l(t))).then(()=>t(335252)))},144980,e=>{e.v(t=>Promise.all(["static/chunks/1pzu1k1_w1k4u.js"].map(t=>e.l(t))).then(()=>t(680835)))},684074,e=>{e.v(t=>Promise.all(["static/chunks/3izwny02j0cup.js"].map(t=>e.l(t))).then(()=>t(294301)))},967422,e=>{e.v(t=>Promise.all(["static/chunks/0zzvt-njq7nyl.js"].map(t=>e.l(t))).then(()=>t(389931)))},413200,e=>{e.v(t=>Promise.all(["static/chunks/3y6g48j2flcm8.js"].map(t=>e.l(t))).then(()=>t(969097)))},248479,e=>{e.v(t=>Promise.all(["static/chunks/3_5g01n_lm5x6.js"].map(t=>e.l(t))).then(()=>t(288299)))},767369,e=>{e.v(t=>Promise.all(["static/chunks/0vxdd7si-1oq9.js"].map(t=>e.l(t))).then(()=>t(266712)))},177793,e=>{e.v(t=>Promise.all(["static/chunks/1l2i2xdm1fudc.js"].map(t=>e.l(t))).then(()=>t(71960)))},104447,e=>{e.v(t=>Promise.all(["static/chunks/091ylt8-apsas.js"].map(t=>e.l(t))).then(()=>t(465425)))},593690,e=>{e.v(t=>Promise.all(["static/chunks/45085fcnrtgke.js"].map(t=>e.l(t))).then(()=>t(365891)))},551383,e=>{e.v(t=>Promise.all(["static/chunks/19l9vsc4hlqw6.js"].map(t=>e.l(t))).then(()=>t(284131)))},365739,e=>{e.v(t=>Promise.all(["static/chunks/3o5s1oypvalu6.js"].map(t=>e.l(t))).then(()=>t(709900)))},183589,e=>{e.v(t=>Promise.all(["static/chunks/3dsocodp2la6p.js"].map(t=>e.l(t))).then(()=>t(645017)))},809957,e=>{e.v(t=>Promise.all(["static/chunks/3bff_w6gy2hv6.js"].map(t=>e.l(t))).then(()=>t(644919)))},722236,e=>{e.v(t=>Promise.all(["static/chunks/2d3-dwxf4py8c.js"].map(t=>e.l(t))).then(()=>t(906501)))},784968,e=>{e.v(t=>Promise.all(["static/chunks/09jisrqbsvcsi.js"].map(t=>e.l(t))).then(()=>t(674571)))},40934,e=>{e.v(t=>Promise.all(["static/chunks/0hgtuk-mx58ax.js"].map(t=>e.l(t))).then(()=>t(713559)))},971802,e=>{e.v(t=>Promise.all(["static/chunks/16_nhhi91_1bk.js"].map(t=>e.l(t))).then(()=>t(994384)))},557792,e=>{e.v(t=>Promise.all(["static/chunks/40dg6m4rdg651.js"].map(t=>e.l(t))).then(()=>t(576208)))},807885,e=>{e.v(t=>Promise.all(["static/chunks/10w9zarz1k3h4.js"].map(t=>e.l(t))).then(()=>t(56529)))}]);