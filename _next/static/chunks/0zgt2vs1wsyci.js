(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,854712,683544,749991,752869,891602,662703,972122,e=>{"use strict";e.s(["D",()=>ev,"Q",()=>eb,"M",()=>ek,"T",()=>eA],749991),e.i(812207);var t=e.i(108285),i=e.i(654479);e.i(374576);var a=e.i(56350);e.i(234051);var n=e.i(829389),r=e.i(436220),s=e.i(960398),o=e.i(971080),c=e.i(149454),l=e.i(803468),u=e.i(221728),d=e.i(811424);e.i(404041);var p=e.i(645975);e.i(534420),e.i(62238),e.i(443452);var h=t,m=e.i(120119);e.i(852634);var f=e.i(459088),g=e.i(162611);let y=g.m`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:e})=>e.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var w=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let x=class extends h.f{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return i.c`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${(0,n.f)(this.iconSize)}></wui-icon>
    </button>`}};x.styles=[f.e,f.j,y],w([(0,m.f)()],x.prototype,"icon",void 0),w([(0,m.f)()],x.prototype,"variant",void 0),w([(0,m.f)()],x.prototype,"type",void 0),w([(0,m.f)()],x.prototype,"size",void 0),w([(0,m.f)()],x.prototype,"iconSize",void 0),w([(0,m.f)({type:Boolean})],x.prototype,"fullWidth",void 0),w([(0,m.f)({type:Boolean})],x.prototype,"disabled",void 0),x=w([(0,p.f)("wui-icon-button")],x),e.s([],683544),e.i(907170),e.i(869609),e.i(143053),e.i(421147),e.i(774339),e.i(79929),e.i(249536),e.i(956303);var b=e.i(365801),v=e.i(742710),k=e.i(401564),I=e.i(675457),A=e.i(150576),P=e.i(227302),E=e.i(653157),$=e.i(518887),S=e.i(769718);let C="INVALID_PAYMENT_CONFIG",N="INVALID_RECIPIENT",T="INVALID_ASSET",q="INVALID_AMOUNT",R="UNABLE_TO_INITIATE_PAYMENT",O="INVALID_CHAIN_NAMESPACE",U="GENERIC_PAYMENT_ERROR",j="UNABLE_TO_GET_EXCHANGES",_="ASSET_NOT_SUPPORTED",L="UNABLE_TO_GET_PAY_URL",z="UNABLE_TO_GET_BUY_STATUS",F="UNABLE_TO_GET_QUOTE",D="UNABLE_TO_GET_QUOTE_STATUS",B="INVALID_RECIPIENT_ADDRESS_FOR_ASSET",W={[C]:"Invalid payment configuration",[N]:"Invalid recipient address",[T]:"Invalid asset specified",[q]:"Invalid payment amount",[B]:"Invalid recipient address for the asset selected",UNKNOWN_ERROR:"Unknown payment error occurred",[R]:"Unable to initiate payment",[O]:"Invalid chain namespace",[U]:"Unable to process payment",[j]:"Unable to get exchanges",[_]:"Asset not supported by the selected exchange",[L]:"Unable to get payment URL",[z]:"Unable to get buy status",UNABLE_TO_GET_TOKEN_BALANCES:"Unable to get token balances",[F]:"Unable to get quote. Please choose a different token",[D]:"Unable to get quote status"};class Q extends Error{get message(){return W[this.code]}constructor(e,t){super(W[e]),this.name="AppKitPayError",this.code=e,this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,Q)}}var M=e.i(364258),K=e.i(82283),G=e.i(564126);let H="reown_test";var V=e.i(959204),Y=e.i(462579);async function X(e,t,i){if(t!==k.f.CHAIN.EVM)throw new Q(O);if(!i.fromAddress)throw new Q(C,"fromAddress is required for native EVM payments.");let a="string"==typeof i.amount?parseFloat(i.amount):i.amount;if(isNaN(a))throw new Q(C);let n=e.metadata?.decimals??18,r=o.f.parseUnits(a.toString(),n);if("bigint"!=typeof r)throw new Q(U);return await o.f.sendTransaction({chainNamespace:t,to:i.recipient,address:i.fromAddress,value:r,data:"0x"})??void 0}async function Z(e,t){if(!t.fromAddress)throw new Q(C,"fromAddress is required for ERC20 EVM payments.");let i=e.asset,a=t.recipient,n=Number(e.metadata.decimals),r=o.f.parseUnits(t.amount.toString(),n);if(void 0===r)throw new Q(U);return await o.f.writeContract({fromAddress:t.fromAddress,tokenAddress:i,args:[a,r],method:"transfer",abi:V.f.getERC20Abi(i),chainNamespace:k.f.CHAIN.EVM})??void 0}async function J(e,t){if(e!==k.f.CHAIN.SOLANA)throw new Q(O);if(!t.fromAddress)throw new Q(C,"fromAddress is required for Solana payments.");let i="string"==typeof t.amount?parseFloat(t.amount):t.amount;if(isNaN(i)||i<=0)throw new Q(C,"Invalid payment amount.");try{if(!Y.f.getProvider(e))throw new Q(U,"No Solana provider available.");let a=await o.f.sendTransaction({chainNamespace:k.f.CHAIN.SOLANA,to:t.recipient,value:i,tokenMint:t.tokenMint});if(!a)throw new Q(U,"Transaction failed.");return a}catch(e){if(e instanceof Q)throw e;throw new Q(U,`Solana payment failed: ${e}`)}}async function ee({sourceToken:e,toToken:t,amount:i,recipient:a}){let n=o.f.parseUnits(i,e.metadata.decimals),r=o.f.parseUnits(i,t.metadata.decimals);return Promise.resolve({type:eb,origin:{amount:n?.toString()??"0",currency:e},destination:{amount:r?.toString()??"0",currency:t},fees:[{id:"service",label:"Service Fee",amount:"0",currency:t}],steps:[{requestId:eb,type:"deposit",deposit:{amount:n?.toString()??"0",currency:e.asset,receiver:a}}],timeInSeconds:6})}function et(e){if(!e)return null;let t=e.steps[0];return t&&t.type===ev?t:null}function ei(e,t=0){if(!e)return[];let i=e.steps.filter(e=>e.type===ek),a=i.filter((e,i)=>i+1>t);return i.length>0&&i.length<3?a:[]}let ea=new M.f({baseUrl:P.f.getApiUrl(),clientId:null});class en extends Error{}function er(){let{projectId:e,sdkType:t,sdkVersion:i}=K.f.state;return{projectId:e,st:t||"appkit",sv:i||"html-wagmi-4.2.2"}}async function es(e,t){let i,a=(i=K.f.getSnapshot().projectId,`https://rpc.walletconnect.org/v1/json-rpc?projectId=${i}`),{sdkType:n,sdkVersion:r,projectId:s}=K.f.getSnapshot(),o={jsonrpc:"2.0",id:1,method:e,params:{...t||{},st:n,sv:r,projectId:s}},c=await fetch(a,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}),l=await c.json();if(l.error)throw new en(l.error.message);return l}async function eo(e){return(await es("reown_getExchanges",e)).result}async function ec(e){return(await es("reown_getExchangePayUrl",e)).result}async function el(e){return(await es("reown_getExchangeBuyStatus",e)).result}async function eu(e){let t=I.f.bigNumber(e.amount).times(10**e.toToken.metadata.decimals).toString(),{chainId:i,chainNamespace:a}=A.f.parseCaipNetworkId(e.sourceToken.network),{chainId:n,chainNamespace:r}=A.f.parseCaipNetworkId(e.toToken.network),s="native"===e.sourceToken.asset?(0,G.Z)(a):e.sourceToken.asset,o="native"===e.toToken.asset?(0,G.Z)(r):e.toToken.asset;return await ea.post({path:"/appkit/v1/transfers/quote",body:{user:e.address,originChainId:i.toString(),originCurrency:s,destinationChainId:n.toString(),destinationCurrency:o,recipient:e.recipient,amount:t},params:er()})}async function ed(e){let t=S.f.isLowerCaseMatch(e.sourceToken.network,e.toToken.network),i=S.f.isLowerCaseMatch(e.sourceToken.asset,e.toToken.asset);return t&&i?ee(e):eu(e)}async function ep(e){return await ea.get({path:"/appkit/v1/transfers/status",params:{requestId:e.requestId,...er()}})}async function eh(e){return await ea.get({path:`/appkit/v1/transfers/assets/exchanges/${e}`,params:er()})}let em=["eip155","solana"],ef={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}},eg={56:"714",204:"714"};function ey(e,t){let{chainNamespace:i,chainId:a}=A.f.parseCaipNetworkId(e),n=ef[i];if(!n)throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${i}`);let r=n.native.assetNamespace,s=n.native.assetReference;"native"!==t?(r=n.defaultTokenNamespace,s=t):"eip155"===i&&eg[a]&&(s=eg[a]);let o=`${i}:${a}`;return`${o}/${r}:${s}`}function ew(e){let t=I.f.bigNumber(e,{safe:!0});return t.lt(.001)?"<0.001":t.round(4).toString()}let ex="unknown",eb="direct-transfer",ev="deposit",ek="transaction",eI=(0,b.s)({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0,choice:"pay",tokenBalances:{[k.f.CHAIN.EVM]:[],[k.f.CHAIN.SOLANA]:[]},isFetchingTokenBalances:!1,selectedPaymentAsset:null,quote:void 0,quoteStatus:"waiting",quoteError:null,isFetchingQuote:!1,selectedExchange:void 0,exchangeUrlForQuote:void 0,requestId:void 0}),eA={state:eI,subscribe:e=>(0,b.i)(eI,()=>e(eI)),subscribeKey:(e,t)=>(0,v.T)(eI,e,t),async handleOpenPay(e){this.resetState(),this.setPaymentConfig(e),this.initializeAnalytics(),function(){let{chainNamespace:e}=A.f.parseCaipNetworkId(eA.state.paymentAsset.network);if(!P.f.isAddress(eA.state.recipient,e))throw new Q(B,`Provide valid recipient address for namespace "${e}"`)}(),await this.prepareTokenLogo(),eI.isConfigured=!0,E.f.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:eI.exchanges,configuration:{network:eI.paymentAsset.network,asset:eI.paymentAsset.asset,recipient:eI.recipient,amount:eI.amount}}}),await l.f.open({view:"Pay"})},resetState(){eI.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},eI.recipient="0x0",eI.amount=0,eI.isConfigured=!1,eI.error=null,eI.isPaymentInProgress=!1,eI.isLoading=!1,eI.currentPayment=void 0,eI.selectedExchange=void 0,eI.exchangeUrlForQuote=void 0,eI.requestId=void 0},resetQuoteState(){eI.quote=void 0,eI.quoteStatus="waiting",eI.quoteError=null,eI.isFetchingQuote=!1,eI.requestId=void 0},setPaymentConfig(e){if(!e.paymentAsset)throw new Q(C);try{eI.choice=e.choice??"pay",eI.paymentAsset=e.paymentAsset,eI.recipient=e.recipient,eI.amount=e.amount,eI.openInNewTab=e.openInNewTab??!0,eI.redirectUrl=e.redirectUrl,eI.payWithExchange=e.payWithExchange,eI.error=null}catch(e){throw new Q(C,e.message)}},setSelectedPaymentAsset(e){eI.selectedPaymentAsset=e},setSelectedExchange(e){eI.selectedExchange=e},setRequestId(e){eI.requestId=e},setPaymentInProgress(e){eI.isPaymentInProgress=e},getPaymentAsset:()=>eI.paymentAsset,getExchanges:()=>eI.exchanges,async fetchExchanges(){try{eI.isLoading=!0,eI.exchanges=(await eo({page:0})).exchanges.slice(0,2)}catch(e){throw d.f.showError(W.UNABLE_TO_GET_EXCHANGES),new Q(j)}finally{eI.isLoading=!1}},async getAvailableExchanges(e){try{let t=e?.asset&&e?.network?ey(e.network,e.asset):void 0;return await eo({page:e?.page??0,asset:t,amount:e?.amount?.toString()})}catch(e){throw new Q(j)}},async getPayUrl(e,t,i=!1){try{let a=Number(t.amount),n=await ec({exchangeId:e,asset:ey(t.network,t.asset),amount:a.toString(),recipient:`${t.network}:${t.recipient}`});return E.f.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{source:"pay",exchange:{id:e},configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:a},currentPayment:{type:"exchange",exchangeId:e},headless:i}}),i&&(this.initiatePayment(),E.f.sendEvent({type:"track",event:"PAY_INITIATED",properties:{source:"pay",paymentId:eI.paymentId||ex,configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:a},currentPayment:{type:"exchange",exchangeId:e}}})),n}catch(e){if(e instanceof Error&&e.message.includes("is not supported"))throw new Q(_);throw Error(e.message)}},async generateExchangeUrlForQuote({exchangeId:e,paymentAsset:t,amount:i,recipient:a}){let n=await ec({exchangeId:e,asset:ey(t.network,t.asset),amount:i.toString(),recipient:a});eI.exchangeSessionId=n.sessionId,eI.exchangeUrlForQuote=n.url},async openPayUrl(e,t,i=!1){try{let a=await this.getPayUrl(e.exchangeId,t,i);if(!a)throw new Q(L);let n=e.openInNewTab??!0;return P.f.openHref(a.url,n?"_blank":"_self"),a}catch(e){throw e instanceof Q?eI.error=e.message:eI.error=W.GENERIC_PAYMENT_ERROR,new Q(L)}},async onTransfer({chainNamespace:e,fromAddress:t,toAddress:i,amount:a,paymentAsset:n}){if(eI.currentPayment={type:"wallet",status:"IN_PROGRESS"},!eI.isPaymentInProgress)try{this.initiatePayment();let r=s.f.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===n.network);if(!r)throw Error("Target network not found");let o=s.f.state.activeCaipNetwork;switch(!S.f.isLowerCaseMatch(o?.caipNetworkId,r.caipNetworkId)&&await s.f.switchActiveNetwork(r),e){case k.f.CHAIN.EVM:"native"===n.asset&&(eI.currentPayment.result=await X(n,e,{recipient:i,amount:a,fromAddress:t})),n.asset.startsWith("0x")&&(eI.currentPayment.result=await Z(n,{recipient:i,amount:a,fromAddress:t})),eI.currentPayment.status="SUCCESS";break;case k.f.CHAIN.SOLANA:eI.currentPayment.result=await J(e,{recipient:i,amount:a,fromAddress:t,tokenMint:"native"===n.asset?void 0:n.asset}),eI.currentPayment.status="SUCCESS";break;default:throw new Q(O)}}catch(e){throw e instanceof Q?eI.error=e.message:eI.error=W.GENERIC_PAYMENT_ERROR,eI.currentPayment.status="FAILED",d.f.showError(eI.error),e}finally{eI.isPaymentInProgress=!1}},async onSendTransaction(e){try{let{namespace:t,transactionStep:i}=e;eA.initiatePayment();let a=s.f.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===eI.paymentAsset?.network);if(!a)throw Error("Target network not found");let n=s.f.state.activeCaipNetwork;if(S.f.isLowerCaseMatch(n?.caipNetworkId,a.caipNetworkId)||await s.f.switchActiveNetwork(a),t===k.f.CHAIN.EVM){let{from:e,to:a,data:n,value:r}=i.transaction;await o.f.sendTransaction({address:e,to:a,data:n,value:BigInt(r),chainNamespace:t})}else if(t===k.f.CHAIN.SOLANA){let{instructions:e}=i.transaction;await o.f.writeSolanaTransaction({instructions:e})}}catch(e){throw e instanceof Q?eI.error=e.message:eI.error=W.GENERIC_PAYMENT_ERROR,d.f.showError(eI.error),e}finally{eI.isPaymentInProgress=!1}},getExchangeById:e=>eI.exchanges.find(t=>t.id===e),validatePayConfig(e){let{paymentAsset:t,recipient:i,amount:a}=e;if(!t)throw new Q(C);if(!i)throw new Q(N);if(!t.asset)throw new Q(T);if(null==a||a<=0)throw new Q(q)},async handlePayWithExchange(e){try{eI.currentPayment={type:"exchange",exchangeId:e};let{network:t,asset:i}=eI.paymentAsset,a={network:t,asset:i,amount:eI.amount,recipient:eI.recipient},n=await this.getPayUrl(e,a);if(!n)throw new Q(R);return eI.currentPayment.sessionId=n.sessionId,eI.currentPayment.status="IN_PROGRESS",eI.currentPayment.exchangeId=e,this.initiatePayment(),{url:n.url,openInNewTab:eI.openInNewTab}}catch(e){return e instanceof Q?eI.error=e.message:eI.error=W.GENERIC_PAYMENT_ERROR,eI.isPaymentInProgress=!1,d.f.showError(eI.error),null}},async getBuyStatus(e,t){try{let i=await el({sessionId:t,exchangeId:e});return("SUCCESS"===i.status||"FAILED"===i.status)&&E.f.sendEvent({type:"track",event:"SUCCESS"===i.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===i.status?P.f.parseError(eI.error):void 0,source:"pay",paymentId:eI.paymentId||ex,configuration:{network:eI.paymentAsset.network,asset:eI.paymentAsset.asset,recipient:eI.recipient,amount:eI.amount},currentPayment:{type:"exchange",exchangeId:eI.currentPayment?.exchangeId,sessionId:eI.currentPayment?.sessionId,result:i.txHash}}}),i}catch(e){throw new Q(z)}},async fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}){if(!e)return[];let{address:a}=A.f.parseCaipAddress(e),n=t;return i===k.f.CHAIN.EVM&&(n=void 0),await $.f.getMyTokensWithBalance({address:a,caipNetwork:n})},async fetchTokensFromExchange(){if(!eI.selectedExchange)return[];let e=Object.values((await eh(eI.selectedExchange.id)).assets).flat();return await Promise.all(e.map(async e=>{let t={chainId:e.network,address:`${e.network}:${e.asset}`,symbol:e.metadata.symbol,name:e.metadata.name,iconUrl:e.metadata.logoURI||"",price:0,quantity:{numeric:"0",decimals:e.metadata.decimals.toString()}},{chainNamespace:i}=A.f.parseCaipNetworkId(t.chainId),a=t.address;if(P.f.isCaipAddress(a)){let{address:e}=A.f.parseCaipAddress(a);a=e}return t.iconUrl=await r.f.getImageByToken(a??"",i).catch(()=>void 0)??"",t}))},async fetchTokens({caipAddress:e,caipNetwork:t,namespace:i}){try{eI.isFetchingTokenBalances=!0;let a=eI.selectedExchange?this.fetchTokensFromExchange():this.fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}),n=await a;eI.tokenBalances={...eI.tokenBalances,[i]:n}}catch(t){let e=t instanceof Error?t.message:"Unable to get token balances";d.f.showError(e)}finally{eI.isFetchingTokenBalances=!1}},async fetchQuote({amount:e,address:t,sourceToken:i,toToken:a,recipient:n}){try{eA.resetQuoteState(),eI.isFetchingQuote=!0;let r=await ed({amount:e,address:eI.selectedExchange?void 0:t,sourceToken:i,toToken:a,recipient:n});if(eI.selectedExchange){let e=et(r);if(e){let t=`${i.network}:${e.deposit.receiver}`,a=I.f.formatNumber(e.deposit.amount,{decimals:i.metadata.decimals??0,round:8});await eA.generateExchangeUrlForQuote({exchangeId:eI.selectedExchange.id,paymentAsset:i,amount:a.toString(),recipient:t})}}eI.quote=r}catch(t){let e=W.UNABLE_TO_GET_QUOTE;if(t instanceof Error&&t.cause&&t.cause instanceof Response)try{let i=await t.cause.json();i.error&&"string"==typeof i.error&&(e=i.error)}catch{}throw eI.quoteError=e,d.f.showError(e),new Q(F)}finally{eI.isFetchingQuote=!1}},async fetchQuoteStatus({requestId:e}){try{if(e===eb){let e=eI.selectedExchange,t=eI.exchangeSessionId;if(e&&t){switch((await this.getBuyStatus(e.id,t)).status){case"IN_PROGRESS":case"UNKNOWN":default:eI.quoteStatus="waiting";break;case"SUCCESS":eI.quoteStatus="success",eI.isPaymentInProgress=!1;break;case"FAILED":eI.quoteStatus="failure",eI.isPaymentInProgress=!1}return}eI.quoteStatus="success";return}let{status:t}=await ep({requestId:e});eI.quoteStatus=t}catch{throw eI.quoteStatus="failure",new Q(D)}},initiatePayment(){eI.isPaymentInProgress=!0,eI.paymentId=crypto.randomUUID()},initializeAnalytics(){eI.analyticsSet||(eI.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",e=>{if(eI.currentPayment?.status&&"UNKNOWN"!==eI.currentPayment.status){let e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[eI.currentPayment.status];E.f.sendEvent({type:"track",event:e,properties:{message:"FAILED"===eI.currentPayment.status?P.f.parseError(eI.error):void 0,source:"pay",paymentId:eI.paymentId||ex,configuration:{network:eI.paymentAsset.network,asset:eI.paymentAsset.asset,recipient:eI.recipient,amount:eI.amount},currentPayment:{type:eI.currentPayment.type,exchangeId:eI.currentPayment.exchangeId,sessionId:eI.currentPayment.sessionId,result:eI.currentPayment.result}}})}}))},async prepareTokenLogo(){if(!eI.paymentAsset.metadata.logoURI)try{let{chainNamespace:e}=A.f.parseCaipNetworkId(eI.paymentAsset.network),t=await r.f.getImageByToken(eI.paymentAsset.asset,e);eI.paymentAsset.metadata.logoURI=t}catch{}}},eP=g.m`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 40px;
    height: 40px;
  }

  .chain-image {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[8]};
    border-top-left-radius: ${({borderRadius:e})=>e[8]};
  }
`;var eE=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let e$=class extends t.f{constructor(){super(),this.unsubscribe=[],this.amount=eA.state.amount,this.namespace=void 0,this.paymentAsset=eA.state.paymentAsset,this.activeConnectorIds=c.f.state.activeConnectorIds,this.caipAddress=void 0,this.exchanges=eA.state.exchanges,this.isLoading=eA.state.isLoading,this.initializeNamespace(),this.unsubscribe.push(eA.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(c.f.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(eA.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(eA.subscribeKey("isLoading",e=>this.isLoading=e)),eA.fetchExchanges(),eA.setSelectedExchange(void 0)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.c`
      <wui-flex flexDirection="column">
        ${this.paymentDetailsTemplate()} ${this.paymentMethodsTemplate()}
      </wui-flex>
    `}paymentMethodsTemplate(){return i.c`
      <wui-flex flexDirection="column" padding="3" gap="2" class="payment-methods-container">
        ${this.payWithWalletTemplate()} ${this.templateSeparator()}
        ${this.templateExchangeOptions()}
      </wui-flex>
    `}initializeNamespace(){let e=s.f.state.activeChain;this.namespace=e,this.caipAddress=s.f.getAccountData(e)?.caipAddress,this.unsubscribe.push(s.f.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},e))}paymentDetailsTemplate(){let e=s.f.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return i.c`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        .padding=${["6","8","6","8"]}
        gap="2"
      >
        <wui-flex alignItems="center" gap="1">
          <wui-text variant="h1-regular" color="primary">
            ${ew(this.amount||"0")}
          </wui-text>

          <wui-flex flexDirection="column">
            <wui-text variant="h6-regular" color="secondary">
              ${this.paymentAsset.metadata.symbol||"Unknown"}
            </wui-text>
            <wui-text variant="md-medium" color="secondary"
              >on ${e?.name||"Unknown"}</wui-text
            >
          </wui-flex>
        </wui-flex>

        <wui-flex class="left-image-container">
          <wui-image
            src=${(0,n.f)(this.paymentAsset.metadata.logoURI)}
            class="token-image"
          ></wui-image>
          <wui-image
            src=${(0,n.f)(r.f.getNetworkImage(e))}
            class="chain-image"
          ></wui-image>
        </wui-flex>
      </wui-flex>
    `}payWithWalletTemplate(){return!function(e){let{chainNamespace:t}=A.f.parseCaipNetworkId(e);return em.includes(t)}(this.paymentAsset.network)?i.c``:this.caipAddress?this.connectedWalletTemplate():this.disconnectedWalletTemplate()}connectedWalletTemplate(){let{name:e,image:t}=this.getWalletProperties({namespace:this.namespace});return i.c`
      <wui-flex flexDirection="column" gap="3">
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${this.onWalletPayment}
          .boxed=${!1}
          ?chevron=${!0}
          ?fullSize=${!1}
          ?rounded=${!0}
          data-testid="wallet-payment-option"
          imageSrc=${(0,n.f)(t)}
          imageSize="3xl"
        >
          <wui-text variant="lg-regular" color="primary">Pay with ${e}</wui-text>
        </wui-list-item>

        <wui-list-item
          type="secondary"
          icon="power"
          iconColor="error"
          @click=${this.onDisconnect}
          data-testid="disconnect-button"
          ?chevron=${!1}
          boxColor="foregroundSecondary"
        >
          <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}disconnectedWalletTemplate(){return i.c`<wui-list-item
      type="secondary"
      boxColor="foregroundSecondary"
      variant="icon"
      iconColor="default"
      iconVariant="overlay"
      icon="wallet"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay with wallet</wui-text>
    </wui-list-item>`}templateExchangeOptions(){if(this.isLoading)return i.c`<wui-flex justifyContent="center" alignItems="center">
        <wui-loading-spinner size="md"></wui-loading-spinner>
      </wui-flex>`;let e=this.exchanges.filter(e=>{var t;let i;return(t=this.paymentAsset,(i=s.f.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===t.network))&&i.testnet)?e.id===H:e.id!==H});return 0===e.length?i.c`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:e.map(e=>i.c`
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${()=>this.onExchangePayment(e)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          imageSrc=${(0,n.f)(e.imageUrl)}
        >
          <wui-text flexGrow="1" variant="lg-regular" color="primary">
            Pay with ${e.name}
          </wui-text>
        </wui-list-item>
      `)}templateSeparator(){return i.c`<wui-separator text="or" bgColor="secondary"></wui-separator>`}async onWalletPayment(){if(!this.namespace)throw Error("Namespace not found");this.caipAddress?u.f.push("PayQuote"):(await c.f.connect(),await l.f.open({view:"PayQuote"}))}onExchangePayment(e){eA.setSelectedExchange(e),u.f.push("PayQuote")}async onDisconnect(){try{await o.f.disconnect(),await l.f.open({view:"Pay"})}catch{console.error("Failed to disconnect"),d.f.showError("Failed to disconnect")}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=c.f.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let a=r.f.getConnectorImage(i);return{name:i.name,image:a}}};e$.styles=eP,eE([(0,a.f)()],e$.prototype,"amount",void 0),eE([(0,a.f)()],e$.prototype,"namespace",void 0),eE([(0,a.f)()],e$.prototype,"paymentAsset",void 0),eE([(0,a.f)()],e$.prototype,"activeConnectorIds",void 0),eE([(0,a.f)()],e$.prototype,"caipAddress",void 0),eE([(0,a.f)()],e$.prototype,"exchanges",void 0),eE([(0,a.f)()],e$.prototype,"isLoading",void 0),e$=eE([(0,p.f)("w3m-pay-view")],e$),e.s(["W3mPayView",0,e$],752869);var eS=t;e.i(653976);var eC=e.i(293090),eN=e.i(112699),eT=t;let eq=g.m`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;var eR=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let eO={"accent-primary":g.i.tokens.core.backgroundAccentPrimary},eU=class extends eT.f{constructor(){super(...arguments),this.rings=3,this.duration=2,this.opacity=.3,this.size="200px",this.variant="accent-primary"}render(){let e=eO[this.variant];this.style.cssText=`
      --pulse-size: ${this.size};
      --pulse-duration: ${this.duration}s;
      --pulse-color: ${e};
      --pulse-opacity: ${this.opacity};
    `;let t=Array.from({length:this.rings},(e,t)=>this.renderRing(t,this.rings));return i.c`
      <div class="pulse-container">
        <div class="pulse-rings">${t}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `}renderRing(e,t){let a=e/t*this.duration,n=`animation-delay: ${a}s;`;return i.c`<div class="pulse-ring" style=${n}></div>`}};eU.styles=[f.e,eq],eR([(0,m.f)({type:Number})],eU.prototype,"rings",void 0),eR([(0,m.f)({type:Number})],eU.prototype,"duration",void 0),eR([(0,m.f)({type:Number})],eU.prototype,"opacity",void 0),eR([(0,m.f)()],eU.prototype,"size",void 0),eR([(0,m.f)()],eU.prototype,"variant",void 0),eU=eR([(0,p.f)("wui-pulse")],eU);let ej=[{id:"received",title:"Receiving funds",icon:"dollar"},{id:"processing",title:"Swapping asset",icon:"recycleHorizontal"},{id:"sending",title:"Sending asset to the recipient address",icon:"send"}],e_=["success","submitted","failure","timeout","refund"],eL=g.m`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .token-badge-container {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({borderRadius:e})=>e[4]};
    z-index: 3;
    min-width: 105px;
  }

  .token-badge-container.loading {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-badge-container.success {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-image-container {
    position: relative;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 64px;
    height: 64px;
  }

  .token-image.success {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.error {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.loading {
    background: ${({colors:e})=>e.accent010};
  }

  .token-image wui-icon {
    width: 32px;
    height: 32px;
  }

  .token-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .token-badge wui-text {
    white-space: nowrap;
  }

  .payment-lifecycle-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[6]};
    border-top-left-radius: ${({borderRadius:e})=>e[6]};
  }

  .payment-step-badge {
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  .payment-step-badge.loading {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .payment-step-badge.error {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  .payment-step-badge.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  .step-icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e.round};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .step-icon-box {
    position: absolute;
    right: -4px;
    bottom: -1px;
    padding: 2px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .step-icon-box.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }
`;var ez=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let eF={received:["pending","success","submitted"],processing:["success","submitted"],sending:["success","submitted"]},eD=class extends eS.f{constructor(){super(),this.unsubscribe=[],this.pollingInterval=null,this.paymentAsset=eA.state.paymentAsset,this.quoteStatus=eA.state.quoteStatus,this.quote=eA.state.quote,this.amount=eA.state.amount,this.namespace=void 0,this.caipAddress=void 0,this.profileName=null,this.activeConnectorIds=c.f.state.activeConnectorIds,this.selectedExchange=eA.state.selectedExchange,this.initializeNamespace(),this.unsubscribe.push(eA.subscribeKey("quoteStatus",e=>this.quoteStatus=e),eA.subscribeKey("quote",e=>this.quote=e),c.f.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e),eA.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}connectedCallback(){super.connectedCallback(),this.startPolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopPolling(),this.unsubscribe.forEach(e=>e())}render(){return i.c`
      <wui-flex flexDirection="column" .padding=${["3","0","0","0"]} gap="2">
        ${this.tokenTemplate()} ${this.paymentTemplate()} ${this.paymentLifecycleTemplate()}
      </wui-flex>
    `}tokenTemplate(){let e=ew(this.amount||"0"),t=this.paymentAsset.metadata.symbol??"Unknown",a=s.f.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network),o="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus;return"success"===this.quoteStatus||"submitted"===this.quoteStatus?i.c`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image success">
          <wui-icon name="checkmark" color="success" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:o?i.c`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image error">
          <wui-icon name="close" color="error" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:i.c`
      <wui-flex alignItems="center" justifyContent="center">
        <wui-flex class="token-image-container">
          <wui-pulse size="125px" rings="3" duration="4" opacity="0.5" variant="accent-primary">
            <wui-flex justifyContent="center" alignItems="center" class="token-image loading">
              <wui-icon name="paperPlaneTitle" color="accent-primary" size="inherit"></wui-icon>
            </wui-flex>
          </wui-pulse>

          <wui-flex
            justifyContent="center"
            alignItems="center"
            class="token-badge-container loading"
          >
            <wui-flex
              alignItems="center"
              justifyContent="center"
              gap="01"
              padding="1"
              class="token-badge"
            >
              <wui-image
                src=${(0,n.f)(r.f.getNetworkImage(a))}
                class="chain-image"
                size="mdl"
              ></wui-image>

              <wui-text variant="lg-regular" color="primary">${e} ${t}</wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}paymentTemplate(){return i.c`
      <wui-flex flexDirection="column" gap="2" .padding=${["0","6","0","6"]}>
        ${this.renderPayment()}
        <wui-separator></wui-separator>
        ${this.renderWallet()}
      </wui-flex>
    `}paymentLifecycleTemplate(){let e=this.getStepsWithStatus();return i.c`
      <wui-flex flexDirection="column" padding="4" gap="2" class="payment-lifecycle-container">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">PAYMENT CYCLE</wui-text>

          ${this.renderPaymentCycleBadge()}
        </wui-flex>

        <wui-flex flexDirection="column" gap="5" .padding=${["2","0","2","0"]}>
          ${e.map(e=>this.renderStep(e))}
        </wui-flex>
      </wui-flex>
    `}renderPaymentCycleBadge(){let e="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus,t="success"===this.quoteStatus||"submitted"===this.quoteStatus;if(e)return i.c`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge error"
          gap="1"
        >
          <wui-icon name="close" color="error" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="error">Failed</wui-text>
        </wui-flex>
      `;if(t)return i.c`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge success"
          gap="1"
        >
          <wui-icon name="checkmark" color="success" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="success">Completed</wui-text>
        </wui-flex>
      `;let a=this.quote?.timeInSeconds??0;return i.c`
      <wui-flex alignItems="center" justifyContent="space-between" gap="3">
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge loading"
          gap="1"
        >
          <wui-icon name="clock" color="default" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="primary">Est. ${a} sec</wui-text>
        </wui-flex>

        <wui-icon name="chevronBottom" color="default" size="xxs"></wui-icon>
      </wui-flex>
    `}renderPayment(){let e=s.f.getAllRequestedCaipNetworks().find(e=>{let t=this.quote?.origin.currency.network;if(!t)return!1;let{chainId:i}=A.f.parseCaipNetworkId(t);return S.f.isLowerCaseMatch(e.id.toString(),i.toString())}),t=ew(I.f.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString()),a=this.quote?.origin.currency.metadata.symbol??"Unknown";return i.c`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Payment Method</wui-text>

        <wui-flex flexDirection="column" alignItems="flex-end" gap="1">
          <wui-flex alignItems="center" gap="01">
            <wui-text variant="lg-regular" color="primary">${t}</wui-text>
            <wui-text variant="lg-regular" color="secondary">${a}</wui-text>
          </wui-flex>

          <wui-flex alignItems="center" gap="1">
            <wui-text variant="md-regular" color="secondary">on</wui-text>
            <wui-image
              src=${(0,n.f)(r.f.getNetworkImage(e))}
              size="xs"
            ></wui-image>
            <wui-text variant="md-regular" color="secondary">${e?.name}</wui-text>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderWallet(){return i.c`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary"
          >${this.selectedExchange?"Exchange":"Wallet"}</wui-text
        >

        ${this.renderWalletText()}
      </wui-flex>
    `}renderWalletText(){let{image:e}=this.getWalletProperties({namespace:this.namespace}),{address:t}=this.caipAddress?A.f.parseCaipAddress(this.caipAddress):{},a=this.selectedExchange?.name;return this.selectedExchange?i.c`
        <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
          <wui-text variant="lg-regular" color="primary">${a}</wui-text>
          <wui-image src=${(0,n.f)(this.selectedExchange.imageUrl)} size="mdl"></wui-image>
        </wui-flex>
      `:i.c`
      <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
        <wui-text variant="lg-regular" color="primary">
          ${eN.f.getTruncateString({string:this.profileName||t||a||"",charsStart:this.profileName?16:4,charsEnd:6*!this.profileName,truncate:this.profileName?"end":"middle"})}
        </wui-text>

        <wui-image src=${(0,n.f)(e)} size="mdl"></wui-image>
      </wui-flex>
    `}getStepsWithStatus(){return"failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus?ej.map(e=>({...e,status:"failed"})):ej.map(e=>{let t=(eF[e.id]??[]).includes(this.quoteStatus)?"completed":"pending";return{...e,status:t}})}renderStep({title:e,icon:t,status:a}){return i.c`
      <wui-flex alignItems="center" gap="3">
        <wui-flex justifyContent="center" alignItems="center" class="step-icon-container">
          <wui-icon name=${t} color="default" size="mdl"></wui-icon>

          <wui-flex alignItems="center" justifyContent="center" class=${(0,eC.f)({"step-icon-box":!0,success:"completed"===a})}>
            ${this.renderStatusIndicator(a)}
          </wui-flex>
        </wui-flex>

        <wui-text variant="md-regular" color="primary">${e}</wui-text>
      </wui-flex>
    `}renderStatusIndicator(e){return"completed"===e?i.c`<wui-icon size="sm" color="success" name="checkmark"></wui-icon>`:"failed"===e?i.c`<wui-icon size="sm" color="error" name="close"></wui-icon>`:"pending"===e?i.c`<wui-loading-spinner color="accent-primary" size="sm"></wui-loading-spinner>`:null}startPolling(){this.pollingInterval||(this.fetchQuoteStatus(),this.pollingInterval=setInterval(()=>{this.fetchQuoteStatus()},3e3))}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null)}async fetchQuoteStatus(){let e=eA.state.requestId;if(!e||e_.includes(this.quoteStatus))this.stopPolling();else try{await eA.fetchQuoteStatus({requestId:e}),e_.includes(this.quoteStatus)&&this.stopPolling()}catch{this.stopPolling()}}initializeNamespace(){let e=s.f.state.activeChain;this.namespace=e,this.caipAddress=s.f.getAccountData(e)?.caipAddress,this.profileName=s.f.getAccountData(e)?.profileName??null,this.unsubscribe.push(s.f.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null},e))}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=c.f.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let a=r.f.getConnectorImage(i);return{name:i.name,image:a}}};eD.styles=eL,ez([(0,a.f)()],eD.prototype,"paymentAsset",void 0),ez([(0,a.f)()],eD.prototype,"quoteStatus",void 0),ez([(0,a.f)()],eD.prototype,"quote",void 0),ez([(0,a.f)()],eD.prototype,"amount",void 0),ez([(0,a.f)()],eD.prototype,"namespace",void 0),ez([(0,a.f)()],eD.prototype,"caipAddress",void 0),ez([(0,a.f)()],eD.prototype,"profileName",void 0),ez([(0,a.f)()],eD.prototype,"activeConnectorIds",void 0),ez([(0,a.f)()],eD.prototype,"selectedExchange",void 0),eD=ez([(0,p.f)("w3m-pay-loading-view")],eD),e.s(["W3mPayLoadingView",0,eD],891602);var eB=t;e.i(604415);var eW=t;e.i(780313);var eQ=e.i(315193);let eM=eQ.m`
  :host {
    display: block;
  }
`,eK=class extends eW.f{render(){return i.c`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-shimmer width="60px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Network Fee</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-shimmer
              width="75px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>

            <wui-flex alignItems="center" gap="01">
              <wui-shimmer width="14px" height="14px" rounded variant="light"></wui-shimmer>
              <wui-shimmer
                width="49px"
                height="14px"
                borderRadius="4xs"
                variant="light"
              ></wui-shimmer>
            </wui-flex>
          </wui-flex>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Service Fee</wui-text>
          <wui-shimmer width="75px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};eK.styles=[eM],eK=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s}([(0,p.f)("w3m-pay-fees-skeleton")],eK);var eG=t;let eH=g.m`
  :host {
    display: block;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }
`;var eV=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let eY=class extends eG.f{constructor(){super(),this.unsubscribe=[],this.quote=eA.state.quote,this.unsubscribe.push(eA.subscribeKey("quote",e=>this.quote=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=I.f.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0,round:6}).toString();return i.c`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-text variant="md-regular" color="primary">
            ${e} ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
          </wui-text>
        </wui-flex>

        ${this.quote&&this.quote.fees.length>0?this.quote.fees.map(e=>this.renderFee(e)):null}
      </wui-flex>
    `}renderFee(e){let t="network"===e.id,a=I.f.formatNumber(e.amount||"0",{decimals:e.currency.metadata.decimals??0,round:6}).toString();if(t){let t=s.f.getAllRequestedCaipNetworks().find(t=>S.f.isLowerCaseMatch(t.caipNetworkId,e.currency.network));return i.c`
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-text variant="md-regular" color="primary">
              ${a} ${e.currency.metadata.symbol||"Unknown"}
            </wui-text>

            <wui-flex alignItems="center" gap="01">
              <wui-image
                src=${(0,n.f)(r.f.getNetworkImage(t))}
                size="xs"
              ></wui-image>
              <wui-text variant="sm-regular" color="secondary">
                ${t?.name||"Unknown"}
              </wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      `}return i.c`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>
        <wui-text variant="md-regular" color="primary">
          ${a} ${e.currency.metadata.symbol||"Unknown"}
        </wui-text>
      </wui-flex>
    `}};eY.styles=[eH],eV([(0,a.f)()],eY.prototype,"quote",void 0),eY=eV([(0,p.f)("w3m-pay-fees")],eY);var eX=t;let eZ=g.m`
  :host {
    display: block;
    width: 100%;
  }

  .disabled-container {
    padding: ${({spacing:e})=>e[2]};
    min-height: 168px;
  }

  wui-icon {
    width: ${({spacing:e})=>e[8]};
    height: ${({spacing:e})=>e[8]};
  }

  wui-flex > wui-text {
    max-width: 273px;
  }
`;var eJ=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let e0=class extends eX.f{constructor(){super(),this.unsubscribe=[],this.selectedExchange=eA.state.selectedExchange,this.unsubscribe.push(eA.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=!!this.selectedExchange;return i.c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        class="disabled-container"
      >
        <wui-icon name="coins" color="default" size="inherit"></wui-icon>

        <wui-text variant="md-regular" color="primary" align="center">
          You don't have enough funds to complete this transaction
        </wui-text>

        ${e?null:i.c`<wui-button
              size="md"
              variant="neutral-secondary"
              @click=${this.dispatchConnectOtherWalletEvent.bind(this)}
              >Connect other wallet</wui-button
            >`}
      </wui-flex>
    `}dispatchConnectOtherWalletEvent(){this.dispatchEvent(new CustomEvent("connectOtherWallet",{detail:!0,bubbles:!0,composed:!0}))}};e0.styles=[eZ],eJ([(0,m.f)({type:Array})],e0.prototype,"selectedExchange",void 0),e0=eJ([(0,p.f)("w3m-pay-options-empty")],e0);var e1=t;let e3=g.m`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    min-height: 60px;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    bottom: -3px;
    right: -5px;
    border: 2px solid ${({tokens:e})=>e.theme.foregroundSecondary};
  }
`,e2=class extends e1.f{render(){return i.c`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.renderOptionEntry()} ${this.renderOptionEntry()} ${this.renderOptionEntry()}
      </wui-flex>
    `}renderOptionEntry(){return i.c`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-shimmer
              width="32px"
              height="32px"
              rounded
              variant="light"
              class="token-image"
            ></wui-shimmer>
            <wui-shimmer
              width="16px"
              height="16px"
              rounded
              variant="light"
              class="chain-image"
            ></wui-shimmer>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-shimmer
              width="74px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
            <wui-shimmer
              width="46px"
              height="14px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}};e2.styles=[e3],e2=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s}([(0,p.f)("w3m-pay-options-skeleton")],e2);var e4=t,e5=e.i(608601);let e6=g.m`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    mask-image: var(--options-mask-image);
    -webkit-mask-image: var(--options-mask-image);
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    cursor: pointer;
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 32px;
    height: 32px;
  }

  .chain-image {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  @media (hover: hover) and (pointer: fine) {
    .pay-option-container:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var e8=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let e9=class extends e4.f{constructor(){super(),this.unsubscribe=[],this.options=[],this.selectedPaymentAsset=null}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();let e=this.shadowRoot?.querySelector(".pay-options-container");e?.removeEventListener("scroll",this.handleOptionsListScroll.bind(this))}firstUpdated(){let e=this.shadowRoot?.querySelector(".pay-options-container");e&&(requestAnimationFrame(this.handleOptionsListScroll.bind(this)),e?.addEventListener("scroll",this.handleOptionsListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleOptionsListScroll()}),this.resizeObserver?.observe(e),this.handleOptionsListScroll())}render(){return i.c`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.options.map(e=>this.payOptionTemplate(e))}
      </wui-flex>
    `}payOptionTemplate(e){let{network:t,metadata:a,asset:o,amount:c="0"}=e,l=s.f.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===t),u=`${t}:${o}`,d=`${this.selectedPaymentAsset?.network}:${this.selectedPaymentAsset?.asset}`,p=I.f.bigNumber(c,{safe:!0}),h=p.gt(0);return i.c`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        @click=${()=>this.onSelect?.(e)}
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-image
              src=${(0,n.f)(a.logoURI)}
              class="token-image"
              size="3xl"
            ></wui-image>
            <wui-image
              src=${(0,n.f)(r.f.getNetworkImage(l))}
              class="chain-image"
              size="md"
            ></wui-image>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="lg-regular" color="primary">${a.symbol}</wui-text>
            ${h?i.c`<wui-text variant="sm-regular" color="secondary">
                  ${p.round(6).toString()} ${a.symbol}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>

        ${u===d?i.c`<wui-icon name="checkmark" size="md" color="success"></wui-icon>`:null}
      </wui-flex>
    `}handleOptionsListScroll(){let e=this.shadowRoot?.querySelector(".pay-options-container");e&&(e.scrollHeight>300?(e.style.setProperty("--options-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--options-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--options-scroll--top-opacity))) 1px,
          black 50px,
          black calc(100% - 50px),
          rgba(155, 155, 155, calc(1 - var(--options-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--options-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--options-scroll--top-opacity",e5.f.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--options-scroll--bottom-opacity",e5.f.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--options-mask-image","none"),e.style.setProperty("--options-scroll--top-opacity","0"),e.style.setProperty("--options-scroll--bottom-opacity","0")))}};e9.styles=[e6],e8([(0,m.f)({type:Array})],e9.prototype,"options",void 0),e8([(0,m.f)()],e9.prototype,"selectedPaymentAsset",void 0),e8([(0,m.f)()],e9.prototype,"onSelect",void 0),e9=e8([(0,p.f)("w3m-pay-options")],e9);let e7=g.m`
  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[5]};
    border-top-left-radius: ${({borderRadius:e})=>e[5]};
  }

  .pay-options-container {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding: ${({spacing:e})=>e[1]};
  }

  w3m-tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  w3m-pay-options.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;var te=function(e,t,i,a){var n,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let tt={eip155:{icon:"ethereum",label:"EVM"},solana:{icon:"solana",label:"Solana"},bip122:{icon:"bitcoin",label:"Bitcoin"},ton:{icon:"ton",label:"Ton"}},ti=class extends eB.f{constructor(){super(),this.unsubscribe=[],this.profileName=null,this.paymentAsset=eA.state.paymentAsset,this.namespace=void 0,this.caipAddress=void 0,this.amount=eA.state.amount,this.recipient=eA.state.recipient,this.activeConnectorIds=c.f.state.activeConnectorIds,this.selectedPaymentAsset=eA.state.selectedPaymentAsset,this.selectedExchange=eA.state.selectedExchange,this.isFetchingQuote=eA.state.isFetchingQuote,this.quoteError=eA.state.quoteError,this.quote=eA.state.quote,this.isFetchingTokenBalances=eA.state.isFetchingTokenBalances,this.tokenBalances=eA.state.tokenBalances,this.isPaymentInProgress=eA.state.isPaymentInProgress,this.exchangeUrlForQuote=eA.state.exchangeUrlForQuote,this.completedTransactionsCount=0,this.unsubscribe.push(eA.subscribeKey("paymentAsset",e=>this.paymentAsset=e)),this.unsubscribe.push(eA.subscribeKey("tokenBalances",e=>this.onTokenBalancesChanged(e))),this.unsubscribe.push(eA.subscribeKey("isFetchingTokenBalances",e=>this.isFetchingTokenBalances=e)),this.unsubscribe.push(c.f.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(eA.subscribeKey("selectedPaymentAsset",e=>this.selectedPaymentAsset=e)),this.unsubscribe.push(eA.subscribeKey("isFetchingQuote",e=>this.isFetchingQuote=e)),this.unsubscribe.push(eA.subscribeKey("quoteError",e=>this.quoteError=e)),this.unsubscribe.push(eA.subscribeKey("quote",e=>this.quote=e)),this.unsubscribe.push(eA.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(eA.subscribeKey("recipient",e=>this.recipient=e)),this.unsubscribe.push(eA.subscribeKey("isPaymentInProgress",e=>this.isPaymentInProgress=e)),this.unsubscribe.push(eA.subscribeKey("selectedExchange",e=>this.selectedExchange=e)),this.unsubscribe.push(eA.subscribeKey("exchangeUrlForQuote",e=>this.exchangeUrlForQuote=e)),this.resetQuoteState(),this.initializeNamespace(),this.fetchTokens()}disconnectedCallback(){super.disconnectedCallback(),this.resetAssetsState(),this.unsubscribe.forEach(e=>e())}updated(e){super.updated(e),e.has("selectedPaymentAsset")&&this.fetchQuote()}render(){return i.c`
      <wui-flex flexDirection="column">
        ${this.profileTemplate()}

        <wui-flex
          flexDirection="column"
          gap="4"
          class="payment-methods-container"
          .padding=${["4","4","5","4"]}
        >
          ${this.paymentOptionsViewTemplate()} ${this.amountWithFeeTemplate()}

          <wui-flex
            alignItems="center"
            justifyContent="space-between"
            .padding=${["1","0","1","0"]}
          >
            <wui-separator></wui-separator>
          </wui-flex>

          ${this.paymentActionsTemplate()}
        </wui-flex>
      </wui-flex>
    `}profileTemplate(){if(this.selectedExchange){let e=I.f.formatNumber(this.quote?.origin.amount,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return i.c`
        <wui-flex
          .padding=${["4","3","4","3"]}
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-text variant="lg-regular" color="secondary">Paying with</wui-text>

          ${this.quote?i.c`<wui-text variant="lg-regular" color="primary">
                ${I.f.bigNumber(e,{safe:!0}).round(6).toString()}
                ${this.quote.origin.currency.metadata.symbol}
              </wui-text>`:i.c`<wui-shimmer width="80px" height="18px" variant="light"></wui-shimmer>`}
        </wui-flex>
      `}let e=P.f.getPlainAddress(this.caipAddress)??"",{name:t,image:a}=this.getWalletProperties({namespace:this.namespace}),{icon:r,label:s}=tt[this.namespace]??{};return i.c`
      <wui-flex
        .padding=${["4","3","4","3"]}
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <wui-wallet-switch
          profileName=${(0,n.f)(this.profileName)}
          address=${(0,n.f)(e)}
          imageSrc=${(0,n.f)(a)}
          alt=${(0,n.f)(t)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        <wui-wallet-switch
          profileName=${(0,n.f)(s)}
          address=${(0,n.f)(e)}
          icon=${(0,n.f)(r)}
          iconSize="xs"
          .enableGreenCircle=${!1}
          alt=${(0,n.f)(s)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
      </wui-flex>
    `}initializeNamespace(){let e=s.f.state.activeChain;this.namespace=e,this.caipAddress=s.f.getAccountData(e)?.caipAddress,this.profileName=s.f.getAccountData(e)?.profileName??null,this.unsubscribe.push(s.f.subscribeChainProp("accountState",e=>this.onAccountStateChanged(e),e))}async fetchTokens(){if(this.namespace){let e;if(this.caipAddress){let{chainId:t,chainNamespace:i}=A.f.parseCaipAddress(this.caipAddress),a=`${i}:${t}`;e=s.f.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===a)}await eA.fetchTokens({caipAddress:this.caipAddress,caipNetwork:e,namespace:this.namespace})}}fetchQuote(){if(this.amount&&this.recipient&&this.selectedPaymentAsset&&this.paymentAsset){let{address:e}=this.caipAddress?A.f.parseCaipAddress(this.caipAddress):{};eA.fetchQuote({amount:this.amount.toString(),address:e,sourceToken:this.selectedPaymentAsset,toToken:this.paymentAsset,recipient:this.recipient})}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=c.f.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let a=r.f.getConnectorImage(i);return{name:i.name,image:a}}paymentOptionsViewTemplate(){return i.c`
      <wui-flex flexDirection="column" gap="2">
        <wui-text variant="sm-regular" color="secondary">CHOOSE PAYMENT OPTION</wui-text>
        <wui-flex class="pay-options-container">${this.paymentOptionsTemplate()}</wui-flex>
      </wui-flex>
    `}paymentOptionsTemplate(){let e=this.getPaymentAssetFromTokenBalances();if(this.isFetchingTokenBalances)return i.c`<w3m-pay-options-skeleton></w3m-pay-options-skeleton>`;if(0===e.length)return i.c`<w3m-pay-options-empty
        @connectOtherWallet=${this.onConnectOtherWallet.bind(this)}
      ></w3m-pay-options-empty>`;let t={disabled:this.isFetchingQuote};return i.c`<w3m-pay-options
      class=${(0,eC.f)(t)}
      .options=${e}
      .selectedPaymentAsset=${(0,n.f)(this.selectedPaymentAsset)}
      .onSelect=${this.onSelectedPaymentAssetChanged.bind(this)}
    ></w3m-pay-options>`}amountWithFeeTemplate(){return this.isFetchingQuote||!this.selectedPaymentAsset||this.quoteError?i.c`<w3m-pay-fees-skeleton></w3m-pay-fees-skeleton>`:i.c`<w3m-pay-fees></w3m-pay-fees>`}paymentActionsTemplate(){let e=this.isFetchingQuote||this.isFetchingTokenBalances,t=this.isFetchingQuote||this.isFetchingTokenBalances||!this.selectedPaymentAsset||!!this.quoteError,a=I.f.formatNumber(this.quote?.origin.amount??0,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return this.selectedExchange?e||t?i.c`
          <wui-shimmer width="100%" height="48px" variant="light" ?rounded=${!0}></wui-shimmer>
        `:i.c`<wui-button
        size="lg"
        fullWidth
        variant="accent-secondary"
        @click=${this.onPayWithExchange.bind(this)}
      >
        ${`Continue in ${this.selectedExchange.name}`}

        <wui-icon name="arrowRight" color="inherit" size="sm" slot="iconRight"></wui-icon>
      </wui-button>`:i.c`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="md-regular" color="secondary">Order Total</wui-text>

          ${e||t?i.c`<wui-shimmer width="58px" height="32px" variant="light"></wui-shimmer>`:i.c`<wui-flex alignItems="center" gap="01">
                <wui-text variant="h4-regular" color="primary">${ew(a)}</wui-text>

                <wui-text variant="lg-regular" color="secondary">
                  ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
                </wui-text>
              </wui-flex>`}
        </wui-flex>

        ${this.actionButtonTemplate({isLoading:e,isDisabled:t})}
      </wui-flex>
    `}actionButtonTemplate(e){let t=ei(this.quote),{isLoading:a,isDisabled:n}=e,r="Pay";return t.length>1&&0===this.completedTransactionsCount&&(r="Approve"),i.c`
      <wui-button
        size="lg"
        variant="accent-primary"
        ?loading=${a||this.isPaymentInProgress}
        ?disabled=${n||this.isPaymentInProgress}
        @click=${()=>{t.length>0?this.onSendTransactions():this.onTransfer()}}
      >
        ${r}
        ${a?null:i.c`<wui-icon
              name="arrowRight"
              color="inherit"
              size="sm"
              slot="iconRight"
            ></wui-icon>`}
      </wui-button>
    `}getPaymentAssetFromTokenBalances(){return this.namespace?(this.tokenBalances[this.namespace]??[]).map(e=>{try{return function(e){let t=s.f.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.chainId),i=e.address;if(!t)throw Error(`Target network not found for balance chainId "${e.chainId}"`);if(S.f.isLowerCaseMatch(e.symbol,t.nativeCurrency.symbol))i="native";else if(P.f.isCaipAddress(i)){let{address:e}=A.f.parseCaipAddress(i);i=e}else if(!i)throw Error(`Balance address not found for balance symbol "${e.symbol}"`);return{network:t.caipNetworkId,asset:i,metadata:{name:e.name,symbol:e.symbol,decimals:Number(e.quantity.decimals),logoURI:e.iconUrl},amount:e.quantity.numeric}}(e)}catch(e){return null}}).filter(e=>!!e).filter(e=>{let{chainId:t}=A.f.parseCaipNetworkId(e.network),{chainId:i}=A.f.parseCaipNetworkId(this.paymentAsset.network);return!!S.f.isLowerCaseMatch(e.asset,this.paymentAsset.asset)||!this.selectedExchange||!S.f.isLowerCaseMatch(t.toString(),i.toString())}):[]}onTokenBalancesChanged(e){this.tokenBalances=e;let[t]=this.getPaymentAssetFromTokenBalances();t&&eA.setSelectedPaymentAsset(t)}async onConnectOtherWallet(){await c.f.connect(),await l.f.open({view:"PayQuote"})}onAccountStateChanged(e){let{address:t}=this.caipAddress?A.f.parseCaipAddress(this.caipAddress):{};if(this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null,t){let{address:e}=this.caipAddress?A.f.parseCaipAddress(this.caipAddress):{};e?S.f.isLowerCaseMatch(e,t)||(this.resetAssetsState(),this.resetQuoteState(),this.fetchTokens()):l.f.close()}}onSelectedPaymentAssetChanged(e){this.isFetchingQuote||eA.setSelectedPaymentAsset(e)}async onTransfer(){let e=et(this.quote);if(e){if(!S.f.isLowerCaseMatch(this.selectedPaymentAsset?.asset,e.deposit.currency))throw Error("Quote asset is not the same as the selected payment asset");let t=this.selectedPaymentAsset?.amount??"0",i=I.f.formatNumber(e.deposit.amount,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!I.f.bigNumber(t).gte(i))return void d.f.showError("Insufficient funds");if(this.quote&&this.selectedPaymentAsset&&this.caipAddress&&this.namespace){let{address:t}=A.f.parseCaipAddress(this.caipAddress);await eA.onTransfer({chainNamespace:this.namespace,fromAddress:t,toAddress:e.deposit.receiver,amount:i,paymentAsset:this.selectedPaymentAsset}),eA.setRequestId(e.requestId),u.f.push("PayLoading")}}}async onSendTransactions(){let e=this.selectedPaymentAsset?.amount??"0",t=I.f.formatNumber(this.quote?.origin.amount??0,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!I.f.bigNumber(e).gte(t))return void d.f.showError("Insufficient funds");let i=ei(this.quote),[a]=ei(this.quote,this.completedTransactionsCount);a&&this.namespace&&(await eA.onSendTransaction({namespace:this.namespace,transactionStep:a}),this.completedTransactionsCount+=1,this.completedTransactionsCount===i.length&&(eA.setRequestId(a.requestId),u.f.push("PayLoading")))}onPayWithExchange(){if(this.exchangeUrlForQuote){let e=P.f.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!e)throw Error("Could not create popup window");e.location.href=this.exchangeUrlForQuote;let t=et(this.quote);t&&eA.setRequestId(t.requestId),eA.initiatePayment(),u.f.push("PayLoading")}}resetAssetsState(){eA.setSelectedPaymentAsset(null)}resetQuoteState(){eA.resetQuoteState()}};async function ta(e){return eA.handleOpenPay(e)}async function tn(e,t=3e5){if(t<=0)throw new Q(C,"Timeout must be greater than 0");try{await ta(e)}catch(e){if(e instanceof Q)throw e;throw new Q(R,e.message)}return new Promise((e,i)=>{var a;let n=!1,r=setTimeout(()=>{n||(n=!0,o(),i(new Q(U,"Payment timeout")))},t);function s(){if(n)return;let t=eA.state.currentPayment,i=eA.state.error,a=eA.state.isPaymentInProgress;if(t?.status==="SUCCESS"){n=!0,o(),clearTimeout(r),e({success:!0,result:t.result});return}if(t?.status==="FAILED"){n=!0,o(),clearTimeout(r),e({success:!1,error:i||"Payment failed"});return}!i||a||t||(n=!0,o(),clearTimeout(r),e({success:!1,error:i}))}let o=(a=[tr("currentPayment",s),tr("error",s),tr("isPaymentInProgress",s)],()=>{a.forEach(e=>{try{e()}catch{}})});s()})}function tr(e,t){return eA.subscribeKey(e,t)}ti.styles=e7,te([(0,a.f)()],ti.prototype,"profileName",void 0),te([(0,a.f)()],ti.prototype,"paymentAsset",void 0),te([(0,a.f)()],ti.prototype,"namespace",void 0),te([(0,a.f)()],ti.prototype,"caipAddress",void 0),te([(0,a.f)()],ti.prototype,"amount",void 0),te([(0,a.f)()],ti.prototype,"recipient",void 0),te([(0,a.f)()],ti.prototype,"activeConnectorIds",void 0),te([(0,a.f)()],ti.prototype,"selectedPaymentAsset",void 0),te([(0,a.f)()],ti.prototype,"selectedExchange",void 0),te([(0,a.f)()],ti.prototype,"isFetchingQuote",void 0),te([(0,a.f)()],ti.prototype,"quoteError",void 0),te([(0,a.f)()],ti.prototype,"quote",void 0),te([(0,a.f)()],ti.prototype,"isFetchingTokenBalances",void 0),te([(0,a.f)()],ti.prototype,"tokenBalances",void 0),te([(0,a.f)()],ti.prototype,"isPaymentInProgress",void 0),te([(0,a.f)()],ti.prototype,"exchangeUrlForQuote",void 0),te([(0,a.f)()],ti.prototype,"completedTransactionsCount",void 0),ti=te([(0,p.f)("w3m-pay-quote-view")],ti),e.s(["W3mPayQuoteView",0,ti],662703),e.s(["M",0,function(){return eA.getExchanges()},"G",0,function(){return eA.state.isPaymentInProgress},"A",0,function(){return eA.state.error},"Z",0,function(){return eA.state.currentPayment?.result},"V",0,ta,"v",0,tn],972122),e.s([],854712)}]);