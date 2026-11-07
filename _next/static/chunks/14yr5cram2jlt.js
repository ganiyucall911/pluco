(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47755,e=>{var t=e.i(65801),i=e.i(42710),o=e.i(75457),r=e.i(1564),n=e.i(79484),a=e.i(18887),s=e.i(64126),c=e.i(60334),l=e.i(27302),d=e.i(64717);let u={getGasPriceInEther:(e,t)=>Number(t*e)/1e18,getGasPriceInUSD(e,t,i){let r=u.getGasPriceInEther(t,i);return o.f.bigNumber(e).times(r).toNumber()},getPriceImpact({sourceTokenAmount:e,sourceTokenPriceInUSD:t,toTokenPriceInUSD:i,toTokenAmount:r}){let n=o.f.bigNumber(e).times(t),a=o.f.bigNumber(r).times(i);return n.minus(a).div(n).times(100).toNumber()},getMaxSlippage(e,t){let i=o.f.bigNumber(e).div(100);return o.f.multiply(t,i).toNumber()},getProviderFee:(e,t=.0085)=>o.f.bigNumber(e).times(t).toString(),isInsufficientNetworkTokenForGas:(e,t)=>!!o.f.bigNumber(e).eq(0)||o.f.bigNumber(o.f.bigNumber(t||"0")).gt(e),isInsufficientSourceTokenForSwap(e,t,i){let r=i?.find(e=>e.address===t)?.quantity?.numeric;return o.f.bigNumber(r||"0").lt(e)}};var p=e.i(92279),h=e.i(51887),f=e.i(24742),g=e.i(60398),m=e.i(71080),w=e.i(49454),b=e.i(53157),v=e.i(21728),k=e.i(11424);let y={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:c.W.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},x=(0,t.s)({...y}),$={state:x,subscribe:e=>(0,t.i)(x,()=>e(x)),subscribeKey:(e,t)=>(0,i.T)(x,e,t),getParams(){let e=g.f.state.activeChain,t=g.f.getAccountData(e)?.caipAddress??g.f.state.activeCaipAddress,i=l.f.getPlainAddress(t),n=(0,s.f)(),a=w.f.getConnectorId(g.f.state.activeChain);if(!i)throw Error("No address found to swap the tokens from.");let c=!x.toToken?.address||!x.toToken?.decimals,d=!x.sourceToken?.address||!x.sourceToken?.decimals||!o.f.bigNumber(x.sourceTokenAmount).gt(0),u=!x.sourceTokenAmount;return{networkAddress:n,fromAddress:i,fromCaipAddress:t,sourceTokenAddress:x.sourceToken?.address,toTokenAddress:x.toToken?.address,toTokenAmount:x.toTokenAmount,toTokenDecimals:x.toToken?.decimals,sourceTokenAmount:x.sourceTokenAmount,sourceTokenDecimals:x.sourceToken?.decimals,invalidToToken:c,invalidSourceToken:d,invalidSourceTokenAmount:u,availableToSwap:t&&!c&&!d&&!u,isAuthConnector:a===r.f.CONNECTOR_ID.AUTH}},async setSourceToken(e){if(!e){x.sourceToken=e,x.sourceTokenAmount="",x.sourceTokenPriceInUSD=0;return}x.sourceToken=e,await T.setTokenPrice(e.address,"sourceToken")},setSourceTokenAmount(e){x.sourceTokenAmount=e},async setToToken(e){if(!e){x.toToken=e,x.toTokenAmount="",x.toTokenPriceInUSD=0;return}x.toToken=e,await T.setTokenPrice(e.address,"toToken")},setToTokenAmount(e){x.toTokenAmount=e?o.f.toFixed(e,6):""},async setTokenPrice(e,t){let i=x.tokensPriceMap[e]||0;i||(x.loadingPrices=!0,i=await T.getAddressPrice(e)),"sourceToken"===t?x.sourceTokenPriceInUSD=i:"toToken"===t&&(x.toTokenPriceInUSD=i),x.loadingPrices&&(x.loadingPrices=!1),T.getParams().availableToSwap&&!x.switchingTokens&&T.swapTokens()},async switchTokens(){if(!x.initializing&&x.initialized&&!x.switchingTokens){x.switchingTokens=!0;try{let e=x.toToken?{...x.toToken}:void 0,t=x.sourceToken?{...x.sourceToken}:void 0,i=e&&""===x.toTokenAmount?"1":x.toTokenAmount;T.setSourceTokenAmount(i),T.setToTokenAmount(""),await T.setSourceToken(e),await T.setToToken(t),x.switchingTokens=!1,T.swapTokens()}catch(e){throw x.switchingTokens=!1,e}}},resetState(){x.myTokensWithBalance=y.myTokensWithBalance,x.tokensPriceMap=y.tokensPriceMap,x.initialized=y.initialized,x.initializing=y.initializing,x.switchingTokens=y.switchingTokens,x.sourceToken=y.sourceToken,x.sourceTokenAmount=y.sourceTokenAmount,x.sourceTokenPriceInUSD=y.sourceTokenPriceInUSD,x.toToken=y.toToken,x.toTokenAmount=y.toTokenAmount,x.toTokenPriceInUSD=y.toTokenPriceInUSD,x.networkPrice=y.networkPrice,x.networkTokenSymbol=y.networkTokenSymbol,x.networkBalanceInUSD=y.networkBalanceInUSD,x.inputError=y.inputError},resetValues(){let{networkAddress:e}=T.getParams(),t=x.tokens?.find(t=>t.address===e);T.setSourceToken(t),T.setToToken(void 0)},getApprovalLoadingState:()=>x.loadingApprovalTransaction,clearError(){x.transactionError=void 0},async initializeState(){if(!x.initializing){if(x.initializing=!0,!x.initialized)try{await T.fetchTokens(),x.initialized=!0}catch(e){x.initialized=!1,k.f.showError("Failed to initialize swap"),v.f.goBack()}x.initializing=!1}},async fetchTokens(){let{networkAddress:e}=T.getParams();await T.getNetworkTokenPrice(),await T.getMyTokensWithBalance();let t=x.myTokensWithBalance?.find(t=>t.address===e);t&&(x.networkTokenSymbol=t.symbol,T.setSourceToken(t),T.setSourceTokenAmount("0"))},async getTokenList(){let e=g.f.state.activeCaipNetwork?.caipNetworkId;if(x.caipNetworkId!==e||!x.tokens)try{x.tokensLoading=!0;let t=await d.f.getTokenList(e);x.tokens=t,x.caipNetworkId=e,x.popularTokens=t.sort((e,t)=>e.symbol<t.symbol?-1:+(e.symbol>t.symbol));let i=(e&&c.W.SUGGESTED_TOKENS_BY_CHAIN?.[e]||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e),o=(c.W.SWAP_SUGGESTED_TOKENS||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e).filter(e=>!i.some(t=>t.address===e.address));x.suggestedTokens=[...i,...o]}catch(e){x.tokens=[],x.popularTokens=[],x.suggestedTokens=[]}finally{x.tokensLoading=!1}},async getAddressPrice(e){let t=x.tokensPriceMap[e];if(t)return t;let i=await f.f.fetchTokenPrice({addresses:[e]}),o=i?.fungibles||[],r=[...x.tokens||[],...x.myTokensWithBalance||[]],n=r?.find(t=>t.address===e)?.symbol,a=parseFloat((o.find(e=>e.symbol.toLowerCase()===n?.toLowerCase())?.price||0).toString());return x.tokensPriceMap[e]=a,a},async getNetworkTokenPrice(){let{networkAddress:e}=T.getParams(),t=await f.f.fetchTokenPrice({addresses:[e]}).catch(()=>(k.f.showError("Failed to fetch network token price"),{fungibles:[]})),i=t.fungibles?.[0],o=i?.price.toString()||"0";x.tokensPriceMap[e]=parseFloat(o),x.networkTokenSymbol=i?.symbol||"",x.networkPrice=o},async getMyTokensWithBalance(e){let t=await a.f.getMyTokensWithBalance({forceUpdate:e,caipNetwork:g.f.state.activeCaipNetwork,address:g.f.getAccountData()?.address}),i=d.f.mapBalancesToSwapTokens(t);i&&(await T.getInitialGasPrice(),T.setBalances(i))},setBalances(e){let{networkAddress:t}=T.getParams(),i=g.f.state.activeCaipNetwork;if(!i)return;let r=e.find(e=>e.address===t);e.forEach(e=>{x.tokensPriceMap[e.address]=e.price||0}),x.myTokensWithBalance=e.filter(e=>e.address.startsWith(i.caipNetworkId)),x.networkBalanceInUSD=r?o.f.multiply(r.quantity.numeric,r.price).toString():"0"},async getInitialGasPrice(){let e=await d.f.fetchGasPrice();if(!e)return{gasPrice:null,gasPriceInUSD:null};switch(g.f.state?.activeCaipNetwork?.chainNamespace){case r.f.CHAIN.SOLANA:return x.gasFee=e.standard??"0",x.gasPriceInUSD=o.f.multiply(e.standard,x.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(x.gasFee),gasPriceInUSD:Number(x.gasPriceInUSD)};case r.f.CHAIN.EVM:default:let t=e.standard??"0",i=BigInt(t),n=BigInt(15e4),a=u.getGasPriceInUSD(x.networkPrice,n,i);return x.gasFee=t,x.gasPriceInUSD=a,{gasPrice:i,gasPriceInUSD:a}}},async swapTokens(){let e=g.f.getAccountData()?.address,t=x.sourceToken,i=x.toToken,r=o.f.bigNumber(x.sourceTokenAmount).gt(0);if(r||T.setToTokenAmount(""),!i||!t||x.loadingPrices||!r||!e)return;x.loadingQuote=!0;let n=o.f.bigNumber(x.sourceTokenAmount).times(10**t.decimals).round(0).toFixed(0);try{let r=await f.f.fetchSwapQuote({userAddress:e,from:t.address,to:i.address,gasPrice:x.gasFee,amount:n.toString()});x.loadingQuote=!1;let a=r?.quotes?.[0]?.toAmount;if(!a)return void h.f.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");let s=o.f.bigNumber(a).div(10**i.decimals).toString();T.setToTokenAmount(s),T.hasInsufficientToken(x.sourceTokenAmount,t.address)?x.inputError="Insufficient balance":(x.inputError=void 0,T.setTransactionDetails())}catch(t){let e=await d.f.handleSwapError(t);x.loadingQuote=!1,x.inputError=e||"Insufficient balance"}},async getTransaction(){let{fromCaipAddress:e,availableToSwap:t}=T.getParams(),i=x.sourceToken,o=x.toToken;if(e&&t&&i&&o&&!x.loadingQuote)try{let t;return x.loadingBuildTransaction=!0,t=await d.f.fetchSwapAllowance({userAddress:e,tokenAddress:i.address,sourceTokenAmount:x.sourceTokenAmount,sourceTokenDecimals:i.decimals})?await T.createSwapTransaction():await T.createAllowanceTransaction(),x.loadingBuildTransaction=!1,x.fetchError=!1,t}catch(e){v.f.goBack(),k.f.showError("Failed to check allowance"),x.loadingBuildTransaction=!1,x.approvalTransaction=void 0,x.swapTransaction=void 0,x.fetchError=!0;return}},async createAllowanceTransaction(){let{fromCaipAddress:e,sourceTokenAddress:t,toTokenAddress:i}=T.getParams();if(e&&i){if(!t)throw Error("createAllowanceTransaction - No source token address found.");try{let o=await f.f.generateApproveCalldata({from:t,to:i,userAddress:e}),r=l.f.getPlainAddress(o.tx.from);if(!r)throw Error("SwapController:createAllowanceTransaction - address is required");let n={data:o.tx.data,to:r,gasPrice:BigInt(o.tx.eip155.gasPrice),value:BigInt(o.tx.value),toAmount:x.toTokenAmount};return x.swapTransaction=void 0,x.approvalTransaction={data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount},{data:n.data,to:n.to,gasPrice:n.gasPrice,value:n.value,toAmount:n.toAmount}}catch(e){v.f.goBack(),k.f.showError("Failed to create approval transaction"),x.approvalTransaction=void 0,x.swapTransaction=void 0,x.fetchError=!0;return}}},async createSwapTransaction(){let{networkAddress:e,fromCaipAddress:t,sourceTokenAmount:i}=T.getParams(),o=x.sourceToken,r=x.toToken;if(!t||!i||!o||!r)return;let n=m.f.parseUnits(i,o.decimals)?.toString();try{let i=o.address===e,a=await f.f.generateSwapCalldata({userAddress:t,from:o.address,to:r.address,amount:n,disableEstimate:!0}),s=BigInt(a.tx.eip155.gas),c=BigInt(a.tx.eip155.gasPrice);if(i&&n){let i=x.myTokensWithBalance?.find(t=>t.address===e);if(i){let e=parseInt(i.quantity.decimals,10),l=m.f.parseUnits(i.quantity.numeric,e)??0n,d=s*c;if(BigInt(n)+d>l){let e=l>d?l-d:0n;e>0n&&(a=await f.f.generateSwapCalldata({userAddress:t,from:o.address,to:r.address,amount:e.toString(),disableEstimate:!0}),n=e.toString(),s=BigInt(a.tx.eip155.gas),c=BigInt(a.tx.eip155.gasPrice))}}}let d=l.f.getPlainAddress(a.tx.to);if(!d)throw Error("SwapController:createSwapTransaction - address is required");let p={data:a.tx.data,to:d,gas:s,gasPrice:c,value:i?BigInt(n??"0"):BigInt("0"),toAmount:x.toTokenAmount};return x.gasPriceInUSD=u.getGasPriceInUSD(x.networkPrice,s,c),x.approvalTransaction=void 0,x.swapTransaction=p,p}catch(e){v.f.goBack(),k.f.showError("Failed to create transaction"),x.approvalTransaction=void 0,x.swapTransaction=void 0,x.fetchError=!0;return}},onEmbeddedWalletApprovalSuccess(){k.f.showLoading("Approve limit increase in your wallet"),v.f.replace("SwapPreview")},async sendTransactionForApproval(e){let{fromAddress:t,isAuthConnector:i}=T.getParams();x.loadingApprovalTransaction=!0,i?v.f.pushTransactionStack({onSuccess:T.onEmbeddedWalletApprovalSuccess}):k.f.showLoading("Approve limit increase in your wallet");try{await m.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:r.f.CHAIN.EVM}),await T.swapTokens(),await T.getTransaction(),x.approvalTransaction=void 0,x.loadingApprovalTransaction=!1}catch(e){x.transactionError=e?.displayMessage,x.loadingApprovalTransaction=!1,k.f.showError(e?.displayMessage||"Transaction error"),b.f.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:g.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:T.state.sourceToken?.symbol||"",swapToToken:T.state.toToken?.symbol||"",swapFromAmount:T.state.sourceTokenAmount||"",swapToAmount:T.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===n.P.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(e){if(!e)return;let{fromAddress:t,toTokenAmount:i,isAuthConnector:a}=T.getParams();x.loadingTransaction=!0;let c=`Swapping ${x.sourceToken?.symbol} to ${o.f.formatNumberToLocalString(i,3)} ${x.toToken?.symbol}`,l=`Swapped ${x.sourceToken?.symbol} to ${o.f.formatNumberToLocalString(i,3)} ${x.toToken?.symbol}`;a?v.f.pushTransactionStack({onSuccess(){v.f.replace("Account"),k.f.showLoading(c),$.resetState()}}):k.f.showLoading("Confirm transaction in your wallet");try{let i=[x.sourceToken?.address,x.toToken?.address].join(","),o=await m.f.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:r.f.CHAIN.EVM});return x.loadingTransaction=!1,k.f.showSuccess(l),b.f.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:g.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:T.state.sourceToken?.symbol||"",swapToToken:T.state.toToken?.symbol||"",swapFromAmount:T.state.sourceTokenAmount||"",swapToAmount:T.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===n.P.ACCOUNT_TYPES.SMART_ACCOUNT}}),$.resetState(),a||v.f.replace("Account"),$.getMyTokensWithBalance(i),o}catch(e){x.transactionError=e?.displayMessage,x.loadingTransaction=!1,k.f.showError(e?.displayMessage||"Transaction error"),b.f.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:g.f.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:T.state.sourceToken?.symbol||"",swapToToken:T.state.toToken?.symbol||"",swapFromAmount:T.state.sourceTokenAmount||"",swapToAmount:T.state.toTokenAmount||"",isSmartAccount:(0,s.P)(r.f.CHAIN.EVM)===n.P.ACCOUNT_TYPES.SMART_ACCOUNT}});return}},hasInsufficientToken:(e,t)=>u.isInsufficientSourceTokenForSwap(e,t,x.myTokensWithBalance),setTransactionDetails(){let{toTokenAddress:e,toTokenDecimals:t}=T.getParams();e&&t&&(x.gasPriceInUSD=u.getGasPriceInUSD(x.networkPrice,BigInt(x.gasFee),BigInt(15e4)),x.priceImpact=u.getPriceImpact({sourceTokenAmount:x.sourceTokenAmount,sourceTokenPriceInUSD:x.sourceTokenPriceInUSD,toTokenPriceInUSD:x.toTokenPriceInUSD,toTokenAmount:x.toTokenAmount}),x.maxSlippage=u.getMaxSlippage(x.slippage,x.toTokenAmount),x.providerFee=u.getProviderFee(x.sourceTokenAmount))}},T=(0,p.O)($);e.s(["f",0,T],47755)},93801,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(56350),r=e.i(75457),n=e.i(36220),a=e.i(60398),s=e.i(71080),c=e.i(60334),l=e.i(27302),d=e.i(3468),u=e.i(21728),p=e.i(94712),h=e.i(11424),f=e.i(47755),g=e.i(18887);e.i(4041);var m=e.i(45975);e.i(34420),e.i(62238),e.i(46650),e.i(79929);var w=t,b=e.i(20119);e.i(84326);var v=e.i(65090);e.i(43452),e.i(49536);var k=e.i(62611);let y=k.m`
  :host {
    width: 100%;
    height: 100px;
    border-radius: ${({borderRadius:e})=>e["5"]};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: ${({tokens:e})=>e.theme.textPrimary};
    margin: 0 ${({spacing:e})=>e["2"]};
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: ${({fontFamily:e})=>e.regular};
    font-style: normal;
    font-size: ${({textSize:e})=>e.large};
    font-weight: ${({fontWeight:e})=>e.regular};
    line-height: ${({typography:e})=>e["lg-regular"].lineHeight};
    letter-spacing: ${({typography:e})=>e["lg-regular"].letterSpacing};
    color: ${({tokens:e})=>e.theme.textPrimary};
    caret-color: ${({tokens:e})=>e.core.backgroundAccentPrimary};
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`;var x=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let $=class extends w.f{constructor(){super(...arguments),this.inputElementRef=(0,v.J)(),this.instructionElementRef=(0,v.J)(),this.readOnly=!1,this.instructionHidden=!!this.value,this.pasting=!1,this.onDebouncedSearch=l.f.debounce(async e=>{if(!e.length)return void this.setReceiverAddress("");let t=a.f.state.activeChain;if(l.f.isAddress(e,t))return void this.setReceiverAddress(e);try{let t=await s.f.getEnsAddress(e);if(t){p.f.setReceiverProfileName(e),p.f.setReceiverAddress(t);let i=await s.f.getEnsAvatar(e);p.f.setReceiverProfileImageUrl(i||void 0)}}catch(t){this.setReceiverAddress(e)}finally{p.f.setLoading(!1)}})}firstUpdated(){this.value&&(this.instructionHidden=!0),this.checkHidden()}render(){return this.readOnly?i.c` <wui-flex
        flexDirection="column"
        justifyContent="center"
        gap="01"
        .padding=${["8","4","5","4"]}
      >
        <textarea
          spellcheck="false"
          ?disabled=${!0}
          autocomplete="off"
          .value=${this.value??""}
        ></textarea>
      </wui-flex>`:i.c` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="01"
      .padding=${["8","4","5","4"]}
    >
      <wui-text
        ${(0,v.C)(this.instructionElementRef)}
        class="instruction"
        color="secondary"
        variant="md-medium"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral-secondary"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${(0,v.C)(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value??""}
        autocomplete="off"
      ></textarea>
    </wui-flex>`}async focusInput(){this.instructionElementRef.value&&(this.instructionHidden=!0,await this.toggleInstructionFocus(!1),this.instructionElementRef.value.style.pointerEvents="none",this.inputElementRef.value?.focus(),this.inputElementRef.value&&(this.inputElementRef.value.selectionStart=this.inputElementRef.value.selectionEnd=this.inputElementRef.value.value.length))}async focusInstruction(){this.instructionElementRef.value&&(this.instructionHidden=!1,await this.toggleInstructionFocus(!0),this.instructionElementRef.value.style.pointerEvents="auto",this.inputElementRef.value?.blur())}async toggleInstructionFocus(e){this.instructionElementRef.value&&await this.instructionElementRef.value.animate([{opacity:+!e},{opacity:+!!e}],{duration:100,easing:"ease",fill:"forwards"}).finished}onBoxClick(){this.value||this.instructionHidden||this.focusInput()}onBlur(){this.value||!this.instructionHidden||this.pasting||this.focusInstruction()}checkHidden(){this.instructionHidden&&this.focusInput()}async onPasteClick(){this.pasting=!0;let e=await navigator.clipboard.readText();p.f.setReceiverAddress(e),this.focusInput()}onInputChange(e){let t=e.target;this.pasting=!1,this.value=e.target?.value,t.value&&!this.instructionHidden&&this.focusInput(),p.f.setLoading(!0),this.onDebouncedSearch(t.value)}setReceiverAddress(e){p.f.setReceiverAddress(e),p.f.setReceiverProfileName(void 0),p.f.setReceiverProfileImageUrl(void 0),p.f.setLoading(!1)}};$.styles=y,x([(0,b.f)()],$.prototype,"value",void 0),x([(0,b.f)({type:Boolean})],$.prototype,"readOnly",void 0),x([(0,o.f)()],$.prototype,"instructionHidden",void 0),x([(0,o.f)()],$.prototype,"pasting",void 0),$=x([(0,m.f)("w3m-input-address")],$);var T=t,A=e.i(12699);e.i(38822),e.i(10380),e.i(97521);let S=k.m`
  :host {
    width: 100%;
    height: 100px;
    border-radius: ${({borderRadius:e})=>e["5"]};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
    transition: all ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.lg};
  }

  :host(:hover) {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  .totalValue {
    width: 100%;
  }
`;var P=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let C=class extends T.f{constructor(){super(...arguments),this.readOnly=!1,this.isInsufficientBalance=!1}render(){let e=this.readOnly||!this.token;return i.c` <wui-flex
      flexDirection="column"
      gap="01"
      .padding=${["5","3","4","3"]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${e}
          .value=${this.sendTokenAmount??""}
          ?error=${!!this.isInsufficientBalance}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      ${this.bottomTemplate()}
    </wui-flex>`}buttonTemplate(){return this.token?i.c`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`:i.c`<wui-button
      size="md"
      variant="neutral-secondary"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`}handleSelectButtonClick(){this.readOnly||u.f.push("WalletSendSelectToken")}sendValueTemplate(){if(!this.readOnly&&this.token&&this.sendTokenAmount){let e=this.token.price*Number(this.sendTokenAmount);return i.c`<wui-text class="totalValue" variant="sm-regular" color="secondary"
        >${e?`$${r.f.formatNumberToLocalString(e,2)}`:"Incorrect value"}</wui-text
      >`}return null}maxAmountTemplate(){return this.token?i.c` <wui-text variant="sm-regular" color="secondary">
        ${A.f.roundNumber(Number(this.token.quantity.numeric),6,5)}
      </wui-text>`:null}actionTemplate(){return this.token?i.c`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`:null}bottomTemplate(){return this.readOnly?null:i.c`<wui-flex alignItems="center" justifyContent="space-between">
      ${this.sendValueTemplate()}
      <wui-flex alignItems="center" gap="01" justifyContent="flex-end">
        ${this.maxAmountTemplate()} ${this.actionTemplate()}
      </wui-flex>
    </wui-flex>`}onInputChange(e){p.f.setTokenAmount(String(e.detail))}onMaxClick(){if(this.token){let e=Number(this.token.quantity.decimals),t=r.f.bigNumber(this.token.quantity.numeric);if(!this.token.address&&this.gasPrice){let i=65000n*BigInt(this.gasPrice),o=r.f.bigNumber(i.toString()).div(r.f.bigNumber(10).pow(e)),n=t.minus(o);p.f.setTokenAmount(n.gt(0)?n.toFixed(e,0):"0")}else p.f.setTokenAmount(t.toFixed(e,0))}}};C.styles=S,P([(0,b.f)({type:Object})],C.prototype,"token",void 0),P([(0,b.f)({type:Boolean})],C.prototype,"readOnly",void 0),P([(0,b.f)({type:String})],C.prototype,"sendTokenAmount",void 0),P([(0,b.f)({type:Boolean})],C.prototype,"isInsufficientBalance",void 0),P([(0,b.f)({type:String})],C.prototype,"gasPrice",void 0),C=P([(0,m.f)("w3m-input-token")],C);let I=k.m`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:e})=>e["10"]} !important;
    border: 4px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: ${({borderRadius:e})=>e["4"]} !important;
  }

  .inputContainer {
    height: fit-content;
  }
`;var N=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let E="Insufficient Funds",R="Preview Send",z=class extends t.f{constructor(){super(),this.unsubscribe=[],this.isTryingToChooseDifferentWallet=!1,this.token=p.f.state.token,this.sendTokenAmount=p.f.state.sendTokenAmount,this.receiverAddress=p.f.state.receiverAddress,this.receiverProfileName=p.f.state.receiverProfileName,this.loading=p.f.state.loading,this.params=u.f.state.data?.send,this.caipAddress=a.f.getAccountData()?.caipAddress,this.disconnecting=!1,this.gasFee=f.f.state.gasFee,this.token&&!this.params&&(this.fetchBalances(),this.fetchNetworkPrice());let e=a.f.subscribeKey("activeCaipAddress",t=>{!t&&this.isTryingToChooseDifferentWallet&&(this.isTryingToChooseDifferentWallet=!1,d.f.open({view:"Connect",data:{redirectView:"WalletSend"}}).catch(()=>null),e())});this.unsubscribe.push(a.f.subscribeAccountStateProp("caipAddress",e=>{this.caipAddress=e}),p.f.subscribe(e=>{this.token=e.token,this.sendTokenAmount=e.sendTokenAmount,this.receiverAddress=e.receiverAddress,this.receiverProfileName=e.receiverProfileName,this.loading=e.loading}),f.f.subscribeKey("gasFee",e=>{this.gasFee=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}async firstUpdated(){await this.handleSendParameters()}render(){let e=this.getMessage(),t=!!this.params;return i.c` <wui-flex flexDirection="column" .padding=${["0","4","4","4"]}>
      <wui-flex class="inputContainer" gap="2" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
          .gasPrice=${this.gasFee}
          ?readOnly=${t}
          ?isInsufficientBalance=${e===E}
        ></w3m-input-token>
        <wui-icon-box size="md" variant="secondary" icon="arrowBottom"></wui-icon-box>
        <w3m-input-address
          ?readOnly=${t}
          .value=${this.receiverProfileName?this.receiverProfileName:this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      ${this.buttonTemplate(e)}
    </wui-flex>`}async fetchBalances(){await p.f.fetchTokenBalance(),p.f.fetchNetworkBalance()}async fetchNetworkPrice(){await f.f.getNetworkTokenPrice(),await f.f.getInitialGasPrice()}onButtonClick(){u.f.push("WalletSendPreview",{send:this.params})}onFundWalletClick(){u.f.push("FundWallet",{redirectView:"WalletSend"})}async onConnectDifferentWalletClick(){try{this.isTryingToChooseDifferentWallet=!0,this.disconnecting=!0,await s.f.disconnect()}finally{this.disconnecting=!1}}getMessage(){return this.token?this.sendTokenAmount?this.token.price&&!(Number(this.sendTokenAmount)*this.token.price)?"Incorrect Value":r.f.bigNumber(this.sendTokenAmount).gt(this.token.quantity.numeric)?E:this.receiverAddress?l.f.isAddress(this.receiverAddress,a.f.state.activeChain)?R:"Invalid Address":"Add Address":"Add Amount":"Select Token"}buttonTemplate(e){let t=!e.startsWith(R),o=e===E,r=!!this.params;return o&&!r?i.c`
        <wui-flex .margin=${["4","0","0","0"]} flexDirection="column" gap="4">
          <wui-button
            @click=${this.onFundWalletClick.bind(this)}
            size="lg"
            variant="accent-secondary"
            fullWidth
          >
            Fund Wallet
          </wui-button>

          <wui-separator data-testid="wui-separator" text="or"></wui-separator>

          <wui-button
            @click=${this.onConnectDifferentWalletClick.bind(this)}
            size="lg"
            variant="neutral-secondary"
            fullWidth
            ?loading=${this.disconnecting}
          >
            Connect a different wallet
          </wui-button>
        </wui-flex>
      `:i.c`<wui-flex .margin=${["4","0","0","0"]}>
      <wui-button
        @click=${this.onButtonClick.bind(this)}
        ?disabled=${t}
        size="lg"
        variant="accent-primary"
        ?loading=${this.loading}
        fullWidth
      >
        ${e}
      </wui-button>
    </wui-flex>`}async handleSendParameters(){if(this.loading=!0,!this.params){this.loading=!1;return}let e=Number(this.params.amount);if(isNaN(e)){h.f.showError("Invalid amount"),this.loading=!1;return}let{namespace:t,chainId:i,assetAddress:o}=this.params;if(!c.W.SEND_PARAMS_SUPPORTED_CHAINS.includes(t)){h.f.showError(`Chain "${t}" is not supported for send parameters`),this.loading=!1;return}let r=a.f.getCaipNetworkById(i,t);if(!r){h.f.showError(`Network with id "${i}" not found`),this.loading=!1;return}try{let{balance:t,name:i,symbol:a,decimals:s}=await g.f.fetchERC20Balance({caipAddress:this.caipAddress,assetAddress:o,caipNetwork:r});if(!i||!a||!s||!t)return void h.f.showError("Token not found");p.f.setToken({name:i,symbol:a,chainId:r.id.toString(),address:`${r.chainNamespace}:${r.id}:${o}`,value:0,price:0,quantity:{decimals:s.toString(),numeric:t.toString()},iconUrl:n.f.getTokenImage(a)??""}),p.f.setTokenAmount(String(e)),p.f.setReceiverAddress(this.params.to)}catch(e){console.error("Failed to load token information:",e),h.f.showError("Failed to load token information")}finally{this.loading=!1}}};z.styles=I,N([(0,o.f)()],z.prototype,"token",void 0),N([(0,o.f)()],z.prototype,"sendTokenAmount",void 0),N([(0,o.f)()],z.prototype,"receiverAddress",void 0),N([(0,o.f)()],z.prototype,"receiverProfileName",void 0),N([(0,o.f)()],z.prototype,"loading",void 0),N([(0,o.f)()],z.prototype,"params",void 0),N([(0,o.f)()],z.prototype,"caipAddress",void 0),N([(0,o.f)()],z.prototype,"disconnecting",void 0),N([(0,o.f)()],z.prototype,"gasFee",void 0),z=N([(0,m.f)("w3m-wallet-send-view")],z),e.s(["W3mWalletSendView",0,z],58835);var D=t;e.i(6957),e.i(23838);let B=k.m`
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
    border-radius: ${({borderRadius:e})=>e["3"]};
  }
`;var O=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let j=class extends D.f{constructor(){super(),this.unsubscribe=[],this.tokenBalances=p.f.state.tokenBalances,this.search="",this.onDebouncedSearch=l.f.debounce(e=>{this.search=e}),this.fetchBalancesAndNetworkPrice(),this.unsubscribe.push(p.f.subscribe(e=>{this.tokenBalances=e.tokenBalances}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.c`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}async fetchBalancesAndNetworkPrice(){this.tokenBalances&&this.tokenBalances?.length!==0||(await this.fetchBalances(),await this.fetchNetworkPrice())}async fetchBalances(){await p.f.fetchTokenBalance(),p.f.fetchNetworkBalance()}async fetchNetworkPrice(){await f.f.getNetworkTokenPrice()}templateSearchInput(){return i.c`
      <wui-flex gap="2" padding="3">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){return this.tokens=this.tokenBalances?.filter(e=>e.chainId===a.f.state.activeCaipNetwork?.caipNetworkId),this.search?this.filteredTokens=this.tokenBalances?.filter(e=>e.name.toLowerCase().includes(this.search.toLowerCase())):this.filteredTokens=this.tokens,i.c`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","3","0","3"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["4","3","3","3"]}>
          <wui-text variant="md-medium" color="secondary">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2">
          ${this.filteredTokens&&this.filteredTokens.length>0?this.filteredTokens.map(e=>i.c`<wui-list-token
                    @click=${this.handleTokenClick.bind(this,e)}
                    ?clickable=${!0}
                    tokenName=${e.name}
                    tokenImageUrl=${e.iconUrl}
                    tokenAmount=${e.quantity.numeric}
                    tokenValue=${e.value}
                    tokenCurrency=${e.symbol}
                  ></wui-list-token>`):i.c`<wui-flex
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
                  flexDirection="column"
                >
                  <wui-text variant="lg-medium" align="center" color="primary">
                    No tokens found
                  </wui-text>
                  <wui-text variant="lg-regular" align="center" color="secondary">
                    Your tokens will appear here
                  </wui-text>
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){u.f.push("OnRampProviders")}onInputChange(e){this.onDebouncedSearch(e.detail)}handleTokenClick(e){p.f.setToken(e),p.f.setTokenAmount(void 0),u.f.goBack()}};j.styles=B,O([(0,o.f)()],j.prototype,"tokenBalances",void 0),O([(0,o.f)()],j.prototype,"tokens",void 0),O([(0,o.f)()],j.prototype,"filteredTokens",void 0),O([(0,o.f)()],j.prototype,"search",void 0),j=O([(0,m.f)("w3m-wallet-send-select-token-view")],j),e.s(["W3mSendSelectTokenView",0,j],35989);var U=t,W=e.i(83075),F=e.i(92279),_=e.i(53157),M=t;e.i(52634),e.i(64380),e.i(39009),e.i(73944);var V=e.i(59088);e.i(21803);let G=k.m`
  :host {
    height: 32px;
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    border-radius: ${({borderRadius:e})=>e[32]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    padding: ${({spacing:e})=>e[1]};
    padding-left: ${({spacing:e})=>e[2]};
  }

  wui-avatar,
  wui-image {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  wui-icon {
    border-radius: ${({borderRadius:e})=>e[16]};
  }
`;var L=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let H=class extends M.f{constructor(){super(...arguments),this.text=""}render(){return i.c`<wui-text variant="lg-regular" color="primary">${this.text}</wui-text>
      ${this.imageTemplate()}`}imageTemplate(){return this.address?i.c`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>`:this.imageSrc?i.c`<wui-image src=${this.imageSrc}></wui-image>`:i.c`<wui-icon size="lg" color="inverse" name="networkPlaceholder"></wui-icon>`}};H.styles=[V.e,V.j,G],L([(0,b.f)({type:String})],H.prototype,"text",void 0),L([(0,b.f)({type:String})],H.prototype,"address",void 0),L([(0,b.f)({type:String})],H.prototype,"imageSrc",void 0),H=L([(0,m.f)("wui-preview-item")],H);var q=t;e.i(34051);var K=e.i(29389),Y=t;let Q=k.m`
  :host {
    display: flex;
    padding: ${({spacing:e})=>e[4]} ${({spacing:e})=>e[3]};
    width: 100%;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-image {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }
`;var J=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let X=class extends Y.f{constructor(){super(...arguments),this.imageSrc=void 0,this.textTitle="",this.textValue=void 0}render(){return i.c`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="primary"> ${this.textTitle} </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `}templateContent(){return this.imageSrc?i.c`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`:this.textValue?i.c` <wui-text variant="md-regular" color="secondary"> ${this.textValue} </wui-text>`:i.c`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`}};X.styles=[V.e,V.j,Q],J([(0,b.f)()],X.prototype,"imageSrc",void 0),J([(0,b.f)()],X.prototype,"textTitle",void 0),J([(0,b.f)()],X.prototype,"textValue",void 0),X=J([(0,m.f)("wui-list-content")],X);let Z=k.m`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: ${({spacing:e})=>e["1"]};
    border-radius: ${({borderRadius:e})=>e["5"]};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    padding: ${({spacing:e})=>e["3"]} ${({spacing:e})=>e["2"]}
      ${({spacing:e})=>e["2"]} ${({spacing:e})=>e["2"]};
  }

  wui-list-content {
    width: -webkit-fill-available !important;
  }

  wui-text {
    padding: 0 ${({spacing:e})=>e["2"]};
  }

  wui-flex {
    margin-top: ${({spacing:e})=>e["2"]};
  }

  .network {
    cursor: pointer;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid ${({tokens:e})=>e.core.textAccentPrimary};
    background-color: ${({tokens:e})=>e.core.glass010};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent010};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent010};
    box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent010};
  }

  .network:hover {
    background-color: ${({tokens:e})=>e.core.glass010};
  }

  .network:active {
    background-color: ${({tokens:e})=>e.core.glass010};
  }
`;var ee=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let et=class extends q.f{constructor(){super(...arguments),this.params=u.f.state.data?.send}render(){return i.c` <wui-text variant="sm-regular" color="secondary">Details</wui-text>
      <wui-flex flexDirection="column" gap="1">
        <wui-list-content
          textTitle="Address"
          textValue=${A.f.getTruncateString({string:this.receiverAddress??"",charsStart:4,charsEnd:4,truncate:"middle"})}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`}networkTemplate(){return this.caipNetwork?.name?i.c` <wui-list-content
        @click=${()=>this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${(0,K.f)(n.f.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`:null}onNetworkClick(e){e&&!this.params&&u.f.push("Networks",{network:e})}};et.styles=Z,ee([(0,b.f)()],et.prototype,"receiverAddress",void 0),ee([(0,b.f)({type:Object})],et.prototype,"caipNetwork",void 0),ee([(0,o.f)()],et.prototype,"params",void 0),et=ee([(0,m.f)("w3m-wallet-send-details")],et);let ei=k.m`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: ${({borderRadius:e})=>e["20"]};
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: ${({borderRadius:e})=>e["4"]} !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: ${({borderRadius:e})=>e["4"]} !important;
  }
`;var eo=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let er=class extends U.f{constructor(){super(),this.unsubscribe=[],this.token=p.f.state.token,this.sendTokenAmount=p.f.state.sendTokenAmount,this.receiverAddress=p.f.state.receiverAddress,this.receiverProfileName=p.f.state.receiverProfileName,this.receiverProfileImageUrl=p.f.state.receiverProfileImageUrl,this.caipNetwork=a.f.state.activeCaipNetwork,this.loading=p.f.state.loading,this.params=u.f.state.data?.send,this.unsubscribe.push(p.f.subscribe(e=>{this.token=e.token,this.sendTokenAmount=e.sendTokenAmount,this.receiverAddress=e.receiverAddress,this.receiverProfileName=e.receiverProfileName,this.receiverProfileImageUrl=e.receiverProfileImageUrl,this.loading=e.loading}),a.f.subscribeKey("activeCaipNetwork",e=>this.caipNetwork=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.c` <wui-flex flexDirection="column" .padding=${["0","4","4","4"]}>
      <wui-flex gap="2" flexDirection="column" .padding=${["0","2","0","2"]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="01">
            <wui-text variant="sm-regular" color="secondary">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount?A.f.roundNumber(Number(this.sendTokenAmount),6,5):"unknown"} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="default" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="sm-regular" color="secondary">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName?A.f.getTruncateString({string:this.receiverProfileName,charsStart:20,charsEnd:0,truncate:"end"}):A.f.getTruncateString({string:this.receiverAddress?this.receiverAddress:"",charsStart:4,charsEnd:4,truncate:"middle"})}"
            address=${this.receiverAddress??""}
            .imageSrc=${this.receiverProfileImageUrl??void 0}
            .isAddress=${!0}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${["6","0","0","0"]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="1" .padding=${["3","0","0","0"]}>
          <wui-icon size="sm" color="default" name="warningCircle"></wui-icon>
          <wui-text variant="sm-regular" color="secondary">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="3" .padding=${["4","0","0","0"]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral-secondary"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="accent-primary"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`}sendValueTemplate(){if(!this.params&&this.token&&this.sendTokenAmount){let e=this.token.price*Number(this.sendTokenAmount);return i.c`<wui-text variant="md-regular" color="primary"
        >$${e.toFixed(2)}</wui-text
      >`}return null}async onSendClick(){if(!this.sendTokenAmount||!this.receiverAddress)return void h.f.showError("Please enter a valid amount and receiver address");try{await p.f.sendToken(),this.params?u.f.reset("WalletSendConfirmed"):(h.f.showSuccess("Transaction started"),u.f.replace("Account"))}catch(o){let e="Failed to send transaction",t=o instanceof F.v&&o.originalName===W.Y.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST,i=o instanceof F.v&&o.originalName===W.Y.PROVIDER_RPC_ERROR_NAME.SEND_TRANSACTION_ERROR;(t||i)&&(e=o.message),_.f.sendEvent({type:"track",event:t?"SEND_REJECTED":"SEND_ERROR",properties:p.f.getSdkEventProperties(o)}),h.f.showError(e)}}onCancelClick(){u.f.goBack()}};er.styles=ei,eo([(0,o.f)()],er.prototype,"token",void 0),eo([(0,o.f)()],er.prototype,"sendTokenAmount",void 0),eo([(0,o.f)()],er.prototype,"receiverAddress",void 0),eo([(0,o.f)()],er.prototype,"receiverProfileName",void 0),eo([(0,o.f)()],er.prototype,"receiverProfileImageUrl",void 0),eo([(0,o.f)()],er.prototype,"caipNetwork",void 0),eo([(0,o.f)()],er.prototype,"loading",void 0),eo([(0,o.f)()],er.prototype,"params",void 0),er=eo([(0,m.f)("w3m-wallet-send-preview-view")],er),e.s(["W3mWalletSendPreviewView",0,er],36418);var en=t;let ea=k.m`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background-color: ${({spacing:e})=>e[16]};
    border: 8px solid ${({tokens:e})=>e.theme.borderPrimary};
    border-radius: ${({borderRadius:e})=>e.round};
  }
`,es=class extends en.f{constructor(){super(),this.unsubscribe=[],this.unsubscribe.push()}render(){return i.c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1","3","4","3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="success" name="checkmark"></wui-icon>
        </wui-flex>

        <wui-text variant="h6-medium" color="primary">You successfully sent asset</wui-text>

        <wui-button
          fullWidth
          @click=${this.onCloseClick.bind(this)}
          size="lg"
          variant="neutral-secondary"
        >
          Close
        </wui-button>
      </wui-flex>
    `}onCloseClick(){d.f.close()}};es.styles=ea,es=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}([(0,m.f)("w3m-send-confirmed-view")],es),e.s(["W3mSendConfirmedView",0,es],47803),e.i(58835),e.i(35989),e.i(36418),e.i(47803),e.s(["W3mSendConfirmedView",0,es,"W3mSendSelectTokenView",0,j,"W3mWalletSendPreviewView",0,er,"W3mWalletSendView",0,z],93801)},34420,24947,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(52634),e.i(83227),e.i(39009);var r=e.i(59088),n=e.i(45975),a=e.i(62611);let s=a.m`
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
`;var c=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let l={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},d={lg:"md",md:"md",sm:"sm"},u=class extends t.f{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
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
    `}loadingTemplate(){if(this.loading){let e=d[this.size],t="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return i.c`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return null}};u.styles=[r.e,r.j,s],c([(0,o.f)()],u.prototype,"size",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"fullWidth",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"loading",void 0),c([(0,o.f)()],u.prototype,"variant",void 0),c([(0,o.f)()],u.prototype,"textVariant",void 0),u=c([(0,n.f)("wui-button")],u),e.s([],24947),e.s([],34420)},62238,12699,73944,49536,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119),r=e.i(59088);let n={getSpacingStyles:(e,t)=>Array.isArray(e)?e[t]?`var(--apkt-spacing-${e[t]})`:void 0:"string"==typeof e?`var(--apkt-spacing-${e})`:void 0,getFormattedDate:e=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e),formatCurrency(e=0,t={}){let i=Number(e);return isNaN(i)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...t}).format(i)},getHostName(e){try{return new URL(e).hostname}catch(e){return""}},getTruncateString:({string:e,charsStart:t,charsEnd:i,truncate:o})=>e.length<=t+i?e:"end"===o?`${e.substring(0,t)}...`:"start"===o?`...${e.substring(e.length-i)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(i))}`,generateAvatarColors(e){let t=e.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(t),o=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),r=100-3*Number(o?.replace("px","")),n=`${r}% ${r}% at 65% 40%`,a=[];for(let e=0;e<5;e+=1){let t=this.tintColor(i,.15*e);a.push(`rgb(${t[0]}, ${t[1]}, ${t[2]})`)}return`
    --local-color-1: ${a[0]};
    --local-color-2: ${a[1]};
    --local-color-3: ${a[2]};
    --local-color-4: ${a[3]};
    --local-color-5: ${a[4]};
    --local-radial-circle: ${n}
   `},hexToRgb(e){let t=parseInt(e,16);return[t>>16&255,t>>8&255,255&t]},tintColor(e,t){let[i,o,r]=e;return[Math.round(i+(255-i)*t),Math.round(o+(255-o)*t),Math.round(r+(255-r)*t)]},isNumber:e=>/^[0-9]+$/u.test(e),getColorTheme:e=>e?e:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(e){let t=e.split(".");return 2===t.length?[t[0],t[1]]:["0","00"]},roundNumber:(e,t,i)=>e.toString().length>=t?Number(e).toFixed(i):e,cssDurationToNumber:e=>e.endsWith("s")?1e3*Number(e.replace("s","")):e.endsWith("ms")?Number(e.replace("ms","")):0,maskInput({value:e,decimals:t,integers:i}){if("."===(e=e.replace(",",".")))return"0.";let[o="",r]=e.split(".").map(e=>e.replace(/[^0-9]/gu,"")),n=i?o.substring(0,i):o,a=2===n.length?String(Number(n)):n,s="number"==typeof t?r?.substring(0,t):r;return("string"==typeof s&&("number"!=typeof t||t>0)?[a,s].join("."):a)??""},capitalize:e=>e?e.charAt(0).toUpperCase()+e.slice(1):""};e.s(["f",0,n],12699);var a=e.i(45975),s=e.i(15193);let c=s.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var l=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let d=class extends t.f{render(){return this.style.cssText=`
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
      padding-top: ${this.padding&&n.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&n.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&n.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&n.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&n.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&n.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&n.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&n.getSpacingStyles(this.margin,3)};
      width: ${this.width};
    `,i.c`<slot></slot>`}};d.styles=[r.e,c],l([(0,o.f)()],d.prototype,"flexDirection",void 0),l([(0,o.f)()],d.prototype,"flexWrap",void 0),l([(0,o.f)()],d.prototype,"flexBasis",void 0),l([(0,o.f)()],d.prototype,"flexGrow",void 0),l([(0,o.f)()],d.prototype,"flexShrink",void 0),l([(0,o.f)()],d.prototype,"alignItems",void 0),l([(0,o.f)()],d.prototype,"justifyContent",void 0),l([(0,o.f)()],d.prototype,"columnGap",void 0),l([(0,o.f)()],d.prototype,"rowGap",void 0),l([(0,o.f)()],d.prototype,"gap",void 0),l([(0,o.f)()],d.prototype,"padding",void 0),l([(0,o.f)()],d.prototype,"margin",void 0),l([(0,o.f)()],d.prototype,"width",void 0),d=l([(0,a.f)("wui-flex")],d),e.s([],73944),e.s([],62238),e.i(39009),e.s([],49536)},46650,e=>{e.i(12190),e.s([])},43452,e=>{e.i(52634),e.s([])},38822,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(84326);var r=e.i(65090),n=e.i(62611),a=e.i(59088),s=e.i(12699),c=e.i(45975);let l=n.m`
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
`;var d=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let u=class extends t.f{constructor(){super(...arguments),this.inputElementRef=(0,r.J)(),this.disabled=!1,this.value="",this.placeholder="0",this.widthVariant="auto",this.maxDecimals=void 0,this.maxIntegers=void 0,this.fontSize="h4",this.error=!1}firstUpdated(){this.resizeInput()}updated(){this.style.setProperty("--local-font-size",n.i.textSize[this.fontSize]),this.resizeInput()}render(){return(this.dataset.widthVariant=this.widthVariant,this.dataset.error=String(this.error),this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),"auto"===this.widthVariant)?this.inputTemplate():i.c`
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
    />`}dispatchInputChangeEvent(){this.inputElementRef.value&&(this.inputElementRef.value.value=s.f.maskInput({value:this.inputElementRef.value.value,decimals:this.maxDecimals,integers:this.maxIntegers}),this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value.value,bubbles:!0,composed:!0})),this.resizeInput())}resizeInput(){if("fit"===this.widthVariant){let e=this.inputElementRef.value;if(e){let t=e.previousElementSibling;t&&(t.textContent=e.value||"0",e.style.width=`${t.offsetWidth}px`)}}}};u.styles=[a.e,a.j,l],d([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),d([(0,o.f)({type:String})],u.prototype,"value",void 0),d([(0,o.f)({type:String})],u.prototype,"placeholder",void 0),d([(0,o.f)({type:String})],u.prototype,"widthVariant",void 0),d([(0,o.f)({type:Number})],u.prototype,"maxDecimals",void 0),d([(0,o.f)({type:Number})],u.prototype,"maxIntegers",void 0),d([(0,o.f)({type:String})],u.prototype,"fontSize",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"error",void 0),u=d([(0,c.f)("wui-input-amount")],u),e.s([],38822)},6957,e=>{e.i(35902),e.s([])},10380,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(52634),e.i(39009);var r=e.i(59088),n=e.i(45975),a=e.i(62611);let s=a.m`
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
`;var c=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let l={sm:"sm-medium",md:"md-medium"},d={accent:"accent-primary",secondary:"secondary"},u=class extends t.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.variant="accent",this.icon=void 0}render(){return i.c`
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
    `}iconTemplate(){return this.icon?i.c`<wui-icon name=${this.icon} size="sm"></wui-icon>`:null}};u.styles=[r.e,r.j,s],c([(0,o.f)()],u.prototype,"size",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,o.f)()],u.prototype,"variant",void 0),c([(0,o.f)()],u.prototype,"icon",void 0),u=c([(0,n.f)("wui-link")],u),e.s([],10380)},23838,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119),r=e.i(56350),n=e.i(75457);e.i(52634),e.i(64380),e.i(39009),e.i(73944);var a=e.i(59088),s=e.i(45975),c=e.i(62611);let l=c.m`
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
`;var d=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let u=class extends t.f{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1,this.imageError=!1}render(){return i.c`
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
              ${n.f.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
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
            ${n.f.formatNumberToLocalString(this.tokenAmount,4)}
          </wui-text>
        </wui-flex>
      </button>
    `}updated(e){e.has("tokenImageUrl")&&(this.imageError=!1)}visualTemplate(){return this.tokenName&&this.tokenImageUrl&&!this.imageError?i.c`<wui-image
        alt=${this.tokenName}
        src=${this.tokenImageUrl}
        @onLoadError=${this.handleImageError}
      ></wui-image>`:i.c`<wui-icon name="coinPlaceholder" color="default"></wui-icon>`}handleImageError(){this.imageError=!0}};u.styles=[a.e,a.j,l],d([(0,o.f)()],u.prototype,"tokenName",void 0),d([(0,o.f)()],u.prototype,"tokenImageUrl",void 0),d([(0,o.f)({type:Number})],u.prototype,"tokenValue",void 0),d([(0,o.f)()],u.prototype,"tokenAmount",void 0),d([(0,o.f)()],u.prototype,"tokenCurrency",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"clickable",void 0),d([(0,r.f)()],u.prototype,"imageError",void 0),u=d([(0,s.f)("wui-list-token")],u),e.s([],23838)},79929,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(39009);var r=e.i(59088),n=e.i(45975),a=e.i(62611);let s=a.m`
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
`;var c=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let l=class extends t.f{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,i.c`${this.template()}`}template(){return this.text?i.c`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};l.styles=[r.e,s],c([(0,o.f)()],l.prototype,"text",void 0),c([(0,o.f)()],l.prototype,"bgColor",void 0),l=c([(0,n.f)("wui-separator")],l),e.s([],79929)},97521,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(52634),e.i(64380),e.i(64576),e.i(39009),e.i(73944);var r=e.i(59088),n=e.i(45975),a=e.i(62611);let s=a.m`
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
`;var c=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let l={lg:"lg-regular",md:"lg-regular",sm:"md-regular"},d={lg:"lg",md:"md",sm:"sm"},u=class extends t.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.text="",this.loading=!1}render(){return this.loading?i.c` <wui-flex alignItems="center" gap="01" padding="01">
        <wui-shimmer width="20px" height="20px"></wui-shimmer>
        <wui-shimmer width="32px" height="18px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>`:i.c`
      <button ?disabled=${this.disabled} data-size=${this.size}>
        ${this.imageTemplate()} ${this.textTemplate()}
      </button>
    `}imageTemplate(){if(this.imageSrc&&this.chainImageSrc)return i.c`<wui-flex class="left-image-container">
        <wui-image src=${this.imageSrc} class="token-image"></wui-image>
        <wui-image src=${this.chainImageSrc} class="chain-image"></wui-image>
      </wui-flex>`;if(this.imageSrc)return i.c`<wui-image src=${this.imageSrc} class="token-image"></wui-image>`;let e=d[this.size];return i.c`<wui-flex class="left-icon-container">
      <wui-icon size=${e} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}textTemplate(){let e=l[this.size];return i.c`<wui-text color="primary" variant=${e}
      >${this.text}</wui-text
    >`}};u.styles=[r.e,r.j,s],c([(0,o.f)()],u.prototype,"size",void 0),c([(0,o.f)()],u.prototype,"imageSrc",void 0),c([(0,o.f)()],u.prototype,"chainImageSrc",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,o.f)()],u.prototype,"text",void 0),c([(0,o.f)({type:Boolean})],u.prototype,"loading",void 0),u=c([(0,n.f)("wui-token-button")],u),e.s([],97521)},64576,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119),r=e.i(45975),n=e.i(62611);let a=n.m`
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
`;var s=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let c=class extends t.f{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",i.c`<slot></slot>`}};c.styles=[a],s([(0,o.f)()],c.prototype,"width",void 0),s([(0,o.f)()],c.prototype,"height",void 0),s([(0,o.f)()],c.prototype,"variant",void 0),s([(0,o.f)({type:Boolean})],c.prototype,"rounded",void 0),c=s([(0,r.f)("wui-shimmer")],c),e.s([],64576)},21803,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(64380);var r=e.i(59088),n=e.i(12699),a=e.i(45975),s=e.i(62611);let c=s.m`
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
`;var l=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let d=class extends t.f{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0,this.size="xl"}render(){let e={inherit:"inherit",xxs:"3",xs:"5",sm:"6",md:"8",mdl:"8",lg:"10",xl:"16",xxl:"20"};return this.style.cssText=`
    --local-width: var(--apkt-spacing-${e[this.size??"xl"]});
    --local-height: var(--apkt-spacing-${e[this.size??"xl"]});
    `,i.c`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",i.c`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";let e=n.f.generateAvatarColors(this.address);return this.style.cssText+=`
 ${e}`,null}return this.dataset.variant="default",null}};d.styles=[r.e,c],l([(0,o.f)()],d.prototype,"imageSrc",void 0),l([(0,o.f)()],d.prototype,"alt",void 0),l([(0,o.f)()],d.prototype,"address",void 0),l([(0,o.f)()],d.prototype,"size",void 0),d=l([(0,a.f)("wui-avatar")],d),e.s([],21803)},12190,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(34051);var r=e.i(29389);e.i(52634);var n=e.i(59088),a=e.i(45975),s=e.i(62611);let c=s.m`
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
`;var l=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let d=class extends t.f{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,i.c`
      <wui-icon size=${(0,r.f)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};d.styles=[n.e,n.j,c],l([(0,o.f)()],d.prototype,"icon",void 0),l([(0,o.f)()],d.prototype,"size",void 0),l([(0,o.f)()],d.prototype,"padding",void 0),l([(0,o.f)()],d.prototype,"color",void 0),d=l([(0,a.f)("wui-icon-box")],d),e.s([],12190)},35902,e=>{e.i(12207);var t=e.i(8285),i=e.i(54479);e.i(74576);var o=e.i(20119);e.i(34051);var r=e.i(29389);e.i(84326);var n=e.i(65090);e.i(52634),e.i(39009);var a=e.i(59088),s=e.i(45975),c=e.i(62611);let l=c.m`
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
`;var d=function(e,t,i,o){var r,n=arguments.length,a=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(n<3?r(a):n>3?r(t,i,a):r(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let u=class extends t.f{constructor(){super(...arguments),this.inputElementRef=(0,n.J)(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return i.c` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${(0,n.C)(this.inputElementRef)}
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
      </button>`:null}templateError(){return this.errorText?i.c`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?i.c`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};u.styles=[a.e,a.j,l],d([(0,o.f)()],u.prototype,"icon",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"disabled",void 0),d([(0,o.f)({type:Boolean})],u.prototype,"loading",void 0),d([(0,o.f)()],u.prototype,"placeholder",void 0),d([(0,o.f)()],u.prototype,"type",void 0),d([(0,o.f)()],u.prototype,"value",void 0),d([(0,o.f)()],u.prototype,"errorText",void 0),d([(0,o.f)()],u.prototype,"warningText",void 0),d([(0,o.f)()],u.prototype,"onSubmit",void 0),d([(0,o.f)()],u.prototype,"size",void 0),d([(0,o.f)({attribute:!1})],u.prototype,"onKeyDown",void 0),u=d([(0,s.f)("wui-input-text")],u),e.s([],35902)},84326,65090,e=>{var t=e.i(54479);let{I:i}=t.e;var o=e.i(91909);let r=(e,t)=>{let i=e._$AN;if(void 0===i)return!1;for(let e of i)e._$AO?.(t,!1),r(e,t);return!0},n=e=>{let t,i;do{if(void 0===(t=e._$AM))break;(i=t._$AN).delete(e),e=t}while(0===i?.size)},a=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(void 0===i)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),l(t)}};function s(e){void 0!==this._$AN?(n(this),this._$AM=e,a(this)):this._$AM=e}function c(e,t=!1,i=0){let o=this._$AH,a=this._$AN;if(void 0!==a&&0!==a.size)if(t)if(Array.isArray(o))for(let e=i;e<o.length;e++)r(o[e],!1),n(o[e]);else null!=o&&(r(o,!1),n(o));else r(this,e)}let l=e=>{e.type==o.x.CHILD&&(e._$AP??=c,e._$AQ??=s)};class d extends o.C{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),a(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(r(this,e),n(this))}setValue(e){if(void 0===this._$Ct.strings)this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}class u{}let p=new WeakMap,h=(0,o.l)(class extends d{render(e){return t.i}update(e,[i]){let o=i!==this.G;return o&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=i,this.ht=e.options?.host,this.rt(this.ct=e.element)),t.i}rt(e){if(void 0!==this.G)if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,i=p.get(t);void 0===i&&(i=new WeakMap,p.set(t,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?p.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});e.s(["J",0,()=>new u,"C",0,h],65090),e.s([],84326)}])})();