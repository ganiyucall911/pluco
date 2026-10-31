(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,534420,624947,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119);t.i(852634),t.i(383227),t.i(839009);var i=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
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
`;var l=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let c={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},d={lg:"md",md:"md",sm:"sm"},u=class extends e.f{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let t=this.textVariant??c[this.size];return o.c`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let t=d[this.size],e="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return o.c`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`}return null}};u.styles=[i.e,i.j,s],l([(0,r.f)()],u.prototype,"size",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"disabled",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"fullWidth",void 0),l([(0,r.f)({type:Boolean})],u.prototype,"loading",void 0),l([(0,r.f)()],u.prototype,"variant",void 0),l([(0,r.f)()],u.prototype,"textVariant",void 0),u=l([(0,a.f)("wui-button")],u),t.s([],624947),t.s([],534420)},62238,112699,73944,249536,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119),i=t.i(459088);let a={getSpacingStyles:(t,e)=>Array.isArray(t)?t[e]?`var(--apkt-spacing-${t[e]})`:void 0:"string"==typeof t?`var(--apkt-spacing-${t})`:void 0,getFormattedDate:t=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t),formatCurrency(t=0,e={}){let o=Number(t);return isNaN(o)?"$0.00":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2,...e}).format(o)},getHostName(t){try{return new URL(t).hostname}catch(t){return""}},getTruncateString:({string:t,charsStart:e,charsEnd:o,truncate:r})=>t.length<=e+o?t:"end"===r?`${t.substring(0,e)}...`:"start"===r?`...${t.substring(t.length-o)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(o))}`,generateAvatarColors(t){let e=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),o=this.hexToRgb(e),r=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),i=100-3*Number(r?.replace("px","")),a=`${i}% ${i}% at 65% 40%`,n=[];for(let t=0;t<5;t+=1){let e=this.tintColor(o,.15*t);n.push(`rgb(${e[0]}, ${e[1]}, ${e[2]})`)}return`
    --local-color-1: ${n[0]};
    --local-color-2: ${n[1]};
    --local-color-3: ${n[2]};
    --local-color-4: ${n[3]};
    --local-color-5: ${n[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(t){let e=parseInt(t,16);return[e>>16&255,e>>8&255,255&e]},tintColor(t,e){let[o,r,i]=t;return[Math.round(o+(255-o)*e),Math.round(r+(255-r)*e),Math.round(i+(255-i)*e)]},isNumber:t=>/^[0-9]+$/u.test(t),getColorTheme:t=>t?t:"u">typeof window&&window.matchMedia&&"function"==typeof window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)")?.matches?"dark":"light":"dark",splitBalance(t){let e=t.split(".");return 2===e.length?[e[0],e[1]]:["0","00"]},roundNumber:(t,e,o)=>t.toString().length>=e?Number(t).toFixed(o):t,cssDurationToNumber:t=>t.endsWith("s")?1e3*Number(t.replace("s","")):t.endsWith("ms")?Number(t.replace("ms","")):0,maskInput({value:t,decimals:e,integers:o}){if("."===(t=t.replace(",",".")))return"0.";let[r="",i]=t.split(".").map(t=>t.replace(/[^0-9]/gu,"")),a=o?r.substring(0,o):r,n=2===a.length?String(Number(a)):a,s="number"==typeof e?i?.substring(0,e):i;return("string"==typeof s&&("number"!=typeof e||e>0)?[n,s].join("."):n)??""},capitalize:t=>t?t.charAt(0).toUpperCase()+t.slice(1):""};t.s(["f",0,a],112699);var n=t.i(645975),s=t.i(315193);let l=s.m`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
`;var c=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let d=class extends e.f{render(){return this.style.cssText=`
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
    `,o.c`<slot></slot>`}};d.styles=[i.e,l],c([(0,r.f)()],d.prototype,"flexDirection",void 0),c([(0,r.f)()],d.prototype,"flexWrap",void 0),c([(0,r.f)()],d.prototype,"flexBasis",void 0),c([(0,r.f)()],d.prototype,"flexGrow",void 0),c([(0,r.f)()],d.prototype,"flexShrink",void 0),c([(0,r.f)()],d.prototype,"alignItems",void 0),c([(0,r.f)()],d.prototype,"justifyContent",void 0),c([(0,r.f)()],d.prototype,"columnGap",void 0),c([(0,r.f)()],d.prototype,"rowGap",void 0),c([(0,r.f)()],d.prototype,"gap",void 0),c([(0,r.f)()],d.prototype,"padding",void 0),c([(0,r.f)()],d.prototype,"margin",void 0),c([(0,r.f)()],d.prototype,"width",void 0),d=c([(0,n.f)("wui-flex")],d),t.s([],73944),t.s([],62238),t.i(839009),t.s([],249536)},907170,695553,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119);t.i(852634);var i=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
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
`;var l=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let c=class extends e.f{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="default",this.variant="accent"}render(){return o.c`
      <button data-variant=${this.variant} ?disabled=${this.disabled} data-size=${this.size}>
        <wui-icon
          color=${({accent:"accent-primary",primary:"inverse",secondary:"default"})[this.variant]||this.iconColor}
          size=${this.size}
          name=${this.icon}
        ></wui-icon>
      </button>
    `}};c.styles=[i.e,i.j,s],l([(0,r.f)()],c.prototype,"size",void 0),l([(0,r.f)({type:Boolean})],c.prototype,"disabled",void 0),l([(0,r.f)()],c.prototype,"icon",void 0),l([(0,r.f)()],c.prototype,"iconColor",void 0),l([(0,r.f)()],c.prototype,"variant",void 0),c=l([(0,a.f)("wui-icon-link")],c),t.s([],695553),t.s([],907170)},443452,t=>{t.i(852634),t.s([])},869609,t=>{t.i(864380),t.s([])},143053,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119);t.i(234051);var i=t.i(829389);t.i(383227),t.i(839009);var a=t.i(459088),n=t.i(645975),s=t.i(162611);let l=s.m`
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
`;var c=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let d=class extends e.f{constructor(){super(...arguments),this.type="primary",this.imageSrc="google",this.imageSize=void 0,this.loading=!1,this.boxColor="foregroundPrimary",this.disabled=!1,this.rightIcon=!0,this.boxed=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",this.dataset.type=this.type,o.c`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        tabindex=${(0,i.f)(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?o.c`<wui-image
        icon=${this.icon}
        iconColor=${(0,i.f)(this.iconColor)}
        ?boxed=${this.boxed}
        ?rounded=${this.rounded}
        boxColor=${this.boxColor}
      ></wui-image>`:o.c`<wui-image
      ?boxed=${this.boxed}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      size=${(0,i.f)(this.imageSize)}
      src=${this.imageSrc}
      boxColor=${this.boxColor}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?o.c`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:o.c`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};d.styles=[a.e,a.j,l],c([(0,r.f)()],d.prototype,"type",void 0),c([(0,r.f)()],d.prototype,"imageSrc",void 0),c([(0,r.f)()],d.prototype,"imageSize",void 0),c([(0,r.f)()],d.prototype,"icon",void 0),c([(0,r.f)()],d.prototype,"iconColor",void 0),c([(0,r.f)({type:Boolean})],d.prototype,"loading",void 0),c([(0,r.f)()],d.prototype,"tabIdx",void 0),c([(0,r.f)()],d.prototype,"boxColor",void 0),c([(0,r.f)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,r.f)({type:Boolean})],d.prototype,"rightIcon",void 0),c([(0,r.f)({type:Boolean})],d.prototype,"boxed",void 0),c([(0,r.f)({type:Boolean})],d.prototype,"rounded",void 0),c([(0,r.f)({type:Boolean})],d.prototype,"fullSize",void 0),d=c([(0,n.f)("wui-list-item")],d),t.s([],143053)},421147,t=>{t.i(383227),t.s([])},774339,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119),i=t.i(116275),a=t.i(252157);let n=o.V`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;t.i(852634),t.i(864380);var s=t.i(459088),l=t.i(645975),c=t.i(162611);let d=c.m`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: 100%;
    outline: 1px solid ${({tokens:t})=>t.core.glass010};
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;var u=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let h=class extends e.f{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:n,md:a.f,lg:i.f},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText=`
      --local-width: var(--apkt-spacing-10);
      --local-height: var(--apkt-spacing-10);
      --local-icon-size: var(--apkt-spacing-4);
    `):this.style.cssText=`

      --local-path: var(--apkt-path-network-${this.size});
      --local-width:  var(--apkt-width-network-${this.size});
      --local-height:  var(--apkt-height-network-${this.size});
      --local-icon-size:  var(--apkt-spacing-${({sm:"4",md:"6",lg:"10"})[this.size]});
    `,o.c`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?o.c`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:o.c`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`}};h.styles=[s.e,d],u([(0,r.f)()],h.prototype,"size",void 0),u([(0,r.f)()],h.prototype,"name",void 0),u([(0,r.f)({type:Object})],h.prototype,"networkImagesBySize",void 0),u([(0,r.f)()],h.prototype,"imageSrc",void 0),u([(0,r.f)({type:Boolean})],h.prototype,"selected",void 0),u([(0,r.f)({type:Boolean})],h.prototype,"round",void 0),h=u([(0,l.f)("wui-network-image")],h),t.s([],774339)},79929,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119);t.i(839009);var i=t.i(459088),a=t.i(645975),n=t.i(162611);let s=n.m`
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
`;var l=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let c=class extends e.f{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,o.c`${this.template()}`}template(){return this.text?o.c`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};c.styles=[i.e,s],l([(0,r.f)()],c.prototype,"text",void 0),l([(0,r.f)()],c.prototype,"bgColor",void 0),c=l([(0,a.f)("wui-separator")],c),t.s([],79929)},780313,t=>{t.i(864576),t.s([])},956303,t=>{t.i(720226),t.s([])},604415,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119);t.i(234051);var i=t.i(829389);t.i(852634),t.i(864380),t.i(839009),t.i(73944);var a=t.i(459088),n=t.i(112699),s=t.i(645975),l=t.i(162611);let c=l.m`
  button {
    display: flex;
    align-items: center;
    height: 40px;
    padding: ${({spacing:t})=>t[2]};
    border-radius: ${({borderRadius:t})=>t[4]};
    column-gap: ${({spacing:t})=>t[1]};
    background-color: transparent;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  wui-image,
  .icon-box {
    width: ${({spacing:t})=>t[6]};
    height: ${({spacing:t})=>t[6]};
    border-radius: ${({borderRadius:t})=>t[4]};
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: 8px;
    height: 8px;
    background-color: ${({tokens:t})=>t.core.textSuccess};
    box-shadow: 0 0 0 2px ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: 50%;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }
  }
`;var d=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let u=class extends e.f{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.enableGreenCircle=!0,this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return o.c`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `}leftImageTemplate(){let t=this.icon?o.c`<wui-icon
          size=${(0,i.f)(this.iconSize)}
          color="default"
          name=${this.icon}
          class="icon"
        ></wui-icon>`:o.c`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;return o.c`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${!!this.icon}
      >
        ${t}
        ${this.enableGreenCircle?o.c`<wui-flex class="circle"></wui-flex>`:null}
      </wui-flex>
    `}textTemplate(){return o.c`
      <wui-text variant="lg-regular" color="primary">
        ${n.f.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
      </wui-text>
    `}rightImageTemplate(){return o.c`<wui-icon name="chevronBottom" size="sm" color="default"></wui-icon>`}};u.styles=[a.e,a.j,c],d([(0,r.f)()],u.prototype,"address",void 0),d([(0,r.f)()],u.prototype,"profileName",void 0),d([(0,r.f)()],u.prototype,"alt",void 0),d([(0,r.f)()],u.prototype,"imageSrc",void 0),d([(0,r.f)()],u.prototype,"icon",void 0),d([(0,r.f)()],u.prototype,"iconSize",void 0),d([(0,r.f)({type:Boolean})],u.prototype,"enableGreenCircle",void 0),d([(0,r.f)({type:Boolean})],u.prototype,"loading",void 0),d([(0,r.f)({type:Number})],u.prototype,"charsStart",void 0),d([(0,r.f)({type:Number})],u.prototype,"charsEnd",void 0),u=d([(0,s.f)("wui-wallet-switch")],u),t.s([],604415)},116275,t=>{t.i(812207);var e=t.i(654479);let o=e.V`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;t.s(["f",0,o])},252157,t=>{t.i(812207);var e=t.i(654479);let o=e.V`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;t.s(["f",0,o])},864576,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119),i=t.i(645975),a=t.i(162611);let n=a.m`
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
`;var s=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let l=class extends e.f{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",o.c`<slot></slot>`}};l.styles=[n],s([(0,r.f)()],l.prototype,"width",void 0),s([(0,r.f)()],l.prototype,"height",void 0),s([(0,r.f)()],l.prototype,"variant",void 0),s([(0,r.f)({type:Boolean})],l.prototype,"rounded",void 0),l=s([(0,i.f)("wui-shimmer")],l),t.s([],864576)},912190,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119);t.i(234051);var i=t.i(829389);t.i(852634);var a=t.i(459088),n=t.i(645975),s=t.i(162611);let l=s.m`
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
`;var c=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let d=class extends e.f{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,o.c`
      <wui-icon size=${(0,i.f)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};d.styles=[a.e,a.j,l],c([(0,r.f)()],d.prototype,"icon",void 0),c([(0,r.f)()],d.prototype,"size",void 0),c([(0,r.f)()],d.prototype,"padding",void 0),c([(0,r.f)()],d.prototype,"color",void 0),d=c([(0,n.f)("wui-icon-box")],d),t.s([],912190)},720226,t=>{t.i(812207);var e=t.i(108285),o=t.i(654479);t.i(374576);var r=t.i(120119);t.i(852634),t.i(864380);var i=t.i(459088),a=t.i(645975);t.i(912190);var n=t.i(162611);let s=n.m`
  :host {
    position: relative;
    background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-image='true']) {
    background-color: transparent;
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-size='sm']) {
    width: 32px;
    height: 32px;
  }

  :host([data-size='md']) {
    width: 40px;
    height: 40px;
  }

  :host([data-size='lg']) {
    width: 56px;
    height: 56px;
  }

  :host([name='Extension'])::after {
    border: 1px solid ${({colors:t})=>t.accent010};
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid ${({colors:t})=>t.accent010};
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  wui-icon[data-parent-size='sm'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='md'] {
    width: 32px;
    height: 32px;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid ${({tokens:t})=>t.theme.backgroundPrimary};
    padding: 1px;
  }
`;var l=function(t,e,o,r){var i,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(n=(a<3?i(n):a>3?i(e,o,n):i(e,o))||n);return a>3&&n&&Object.defineProperty(e,o,n),n};let c=class extends e.f{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let t="1";return"lg"===this.size?t="4":"md"===this.size?t="2":"sm"===this.size&&(t="1"),this.style.cssText=`
       --local-border-radius: var(--apkt-borderRadius-${t});
   `,this.dataset.size=this.size,this.imageSrc&&(this.dataset.image="true"),this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),o.c`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?o.c`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?o.c`<wui-icon size="md" color="default" name=${this.walletIcon}></wui-icon>`:o.c`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`}};c.styles=[i.e,s],l([(0,r.f)()],c.prototype,"size",void 0),l([(0,r.f)()],c.prototype,"name",void 0),l([(0,r.f)()],c.prototype,"imageSrc",void 0),l([(0,r.f)()],c.prototype,"walletIcon",void 0),l([(0,r.f)({type:Boolean})],c.prototype,"installed",void 0),l([(0,r.f)()],c.prototype,"badgeSize",void 0),c=l([(0,a.f)("wui-wallet-image")],c),t.s([],720226)},608601,t=>{t.s(["f",0,{interpolate(t,e,o){if(2!==t.length||2!==e.length)throw Error("inputRange and outputRange must be an array of length 2");let r=t[0]||0,i=t[1]||0,a=e[0]||0,n=e[1]||0;return o<r?a:o>i?n:(n-a)/(i-r)*(o-r)+a}}])}])})();