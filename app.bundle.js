!function(e){function t(t){for(var r,o,s=t[0],c=t[1],l=t[2],u=0,d=[];u<s.length;u++)o=s[u],a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(p&&p(t);d.length;)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={0:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var p=c;i.push([80,1]),n()}({0:function(e,t){e.exports=React},12:function(e,t){e.exports=ReactRedux},33:function(e,t){e.exports=Redux},63:function(e,t){e.exports=ReactDOM},66:function(e,t,n){e.exports=n.p+"sa-digital-number.ttf"},75:function(e,t){e.exports=PropTypes},80:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(63),o=n.n(i),s=n(1);const c=s.c.div`

`,l=s.c.h1`
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: normal;
  top: -18px;
  left: 0;
  margin: 0;
  padding: 0;
  font-size: 36px;
`;class p extends a.a.PureComponent{render(){return a.a.createElement(c,null,a.a.createElement(l,null,"Palm Game"))}}var u=n(8),d=n.n(u),h=n(3),m=n(18),g=n.n(m),f=n(32),b=n.n(f);const x={active:"#161616",activeLight:b()(.05,"#161616"),deactivated:g()(.05,"#9ead86"),background:"#9ead86"},y=s.b`
    background: ${x.deactivated};
    border-color: ${x.deactivated};
`,w=s.b`
    background: ${x.active};
    border-color: ${x.active};
`,v=s.b`
    background: ${x.activeLight};
`,k=s.d`
  50% {
    ${w}
  }
  100% {
    ${y}
  }
`,E=e=>s.b`
  ${y};
  animation-iteration-count: infinite;
  animation-name: ${k};
  animation-duration: ${e};
`,O=E("1s"),I=E("400ms"),j=s.b`
  padding: 2px;
  border: 2px solid;
  box-shadow: inset 0 0 0 2px ${x.background};
  background-clip: content-box;
`,T=s.c.td`
  display: inline-block;
  margin: 1px;
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  ${e=>12===e.size?j:void 0};
  ${e=>(function(e,t){switch(e){case 1:return 12===t?w:v;case 0:return y;case 2:return O;case 3:return I}})(e.value,e.size)};
`;var S=a.a.memo(T);const A=s.c.table`
  width: ${e=>22*e.width+10}px;
  ${e=>e.hasBorder?"border:2px solid #000":""};
  padding:1px;
  line-height: 1px;
`;class $ extends a.a.PureComponent{constructor(e){if(super(e),e.frame.size!==e.width*e.height)throw RangeError(`Invalid size, width=${e.width}, height=${e.height}, pixelCnt=${e.frame.size}`);d.a.react(this)}render(){const e=Object(h.c)(0,this.props.height).map(e=>a.a.createElement("tr",{key:e},this.Row(e)));return a.a.createElement(A,{width:this.props.width,hasBorder:this.props.hasBorder},a.a.createElement("tbody",null,e))}Row(e){const t=e*this.props.width,n=t+this.props.width;return this.props.frame.toSeq().slice(t,n).map((e,t)=>a.a.createElement(S,{value:e,key:t,size:this.props.pixelSize}))}}const z=Object.freeze({graphicWidth:10,graphicHeight:16,scoreDigitMaxWidth:7,countDigitMaxWidth:4,smallMatrixWidth:4,smallMatrixHeight:2}),M=Object.freeze({defaultButtonThrottleIntervalMs:120,maxLevel:9}),C=Object.freeze({beanProduceChance:.5,baseCreepIntervalMs:1e3,winBodyLength:15,baseScore:5,escapeAnimationIntervalMs:100}),L=Object.freeze({probability:{I:10,L:5,J:5,T:8,S:5,Z:5,O:8},initialX:z.graphicWidth/2,initialY:z.graphicHeight-1,baseDescendIntervalMs:1e3,hardDropThrottleIntervalMs:600,markClearPauseDurationMs:400,baseScore:5,winFloorCountPerLevel:50}),D=Object.freeze({screen:z,core:M,snakeGame:C,tetrisGame:L});var _=n(66),H=n.n(_);const R=D.screen.scoreDigitMaxWidth,W=s.c.div`
  font-family: 'sa-digital-number', serif;
  position: relative;
  margin: 5px 0 5px;
  font-size: ${e=>e.fontSize}px;
  height: ${e=>e.fontSize+2}px;
  
  @font-face {
    font-family: 'sa-digital-number';
    src: url(${H.a});
  }
  
  p {
    position: absolute;
    margin: 0;
    top: 1px;
    right: 0;
    bottom: 1px;
  }
`,P=s.c.p`
  color: ${x.active};
  z-index: 2;
`,G=s.c.p`
  color: ${x.deactivated};
  z-index: 1;
`;class B extends a.a.PureComponent{constructor(e){if(super(e),e.width>R)throw new RangeError(`Digit width must be <=${R} and >0.`);this.backgroundDigits=function(e){let t=8;for(let n=1;n<e;n++)t+=8*Math.pow(10,n);return t}(e.width)}render(){return a.a.createElement(W,{fontSize:this.props.fontSize},a.a.createElement(P,null,this.props.value),a.a.createElement(G,null,this.backgroundDigits))}}const N=s.c.div`
  overflow: auto;
`,U=a.a.memo(s.c.div`
    display: inline-block;
    margin: 2px;
    position: relative;
    width: ${10}px;
    height: ${10}px;
    
    &:before, &:after {
      position: absolute;
      content: "";
      left: ${5}px;
      top: 0;
      width: ${5}px;
      height: ${10}px;
      background: ${e=>e.isActive?x.active:x.deactivated};
      border-radius: ${5} ${10}/2 0 0;
      transform: rotate(-45deg);
      transform-origin: 0 100%;
    }
    &:after {
      left: 0;
      transform: rotate(45deg);
      transform-origin: 100% 100%;
    }
`);class K extends a.a.PureComponent{constructor(e){if(super(e),e.maxHp<=0)throw new RangeError(`Life bar maxHp must be > 0. But it's set to ${e.maxHp}.`);if(e.count<=0)throw new RangeError(`Life bar width must be > 0. But it's set to ${e.count}.`)}render(){return a.a.createElement(N,null,function(e){const t=e.maxHp<=0?e.count:(1-e.hp/e.maxHp)*e.count;return[...Array(e.count).keys()].map(e=>a.a.createElement(U,{isActive:t<=e,key:e}))}(this.props))}}const F=Object.freeze(["[key] trigger up","[key] trigger right","[key] trigger down","[key] trigger left"]),q=Object.freeze(["[key] trigger A","[key] trigger B"]),J=Object.freeze(["[key] trigger select","[key] trigger START"]),V=Object.freeze([...J,...q,...J]),Z=Object.freeze([...V,"[sys] console animate"]),X=Object.freeze({directionKeys:F,mainKeys:q,funcKeys:J,allKeys:V,noLogging:Z});function Y(e,t){const n=t||0;!function(e,t){if(!e)throw new Error(t)}(e>n,"max must > min");const r=e-n;return Math.floor(Math.random()*Math.floor(r))+n}function Q(e){if(null===e)throw new TypeError("Value is null");if(void 0===e)throw new TypeError("Value is undefined");if("string"==typeof e&&0===e.length)throw new Error("Value is empty string.");return e}function ee(e,t,n=`'${e}' is not strictly equal to '${t}'!`){if(!Object.is(e,t))throw Error(n)}function te(e){return Object.freeze({type:Q(e)})}function ne(e,t){return Object.freeze({type:Q(e),payload:Q(t)})}const re=te("[sys] enable sound"),ae=te("[sys] disable sound"),ie=te("[sys] console start"),oe=te("[sys] console animate"),se=te("[game] increase level"),ce=te("[game] decrease level"),le=te("[sys] enter game"),pe=te("[sys] exit game"),ue=te("[sys] toggle pause"),de=te("[sys] toggle game"),he=te("[none] dummy action"),me=te("[game] next level"),ge=te("[game] win"),fe=Object.freeze({soundEnable:()=>re,soundDisable:()=>ae,consoleStart:()=>ie,consoleAnimate:()=>oe,addScore:(e,t)=>ne("[game] add score",{score:e,count:t}),increaseLevel:()=>se,decreaseLevel:()=>ce,enterGame:()=>le,exitGame:()=>pe,togglePause:()=>ue,toggleGame:()=>de,quitGame:e=>ne("[game] quit",e),dummy:()=>he,nextLevel:()=>me,win:()=>ge}),be=te("[key] trigger up"),xe=te("[key] trigger right"),ye=te("[key] trigger down"),we=te("[key] trigger left"),ve=te("[key] trigger select"),ke=te("[key] trigger START"),Ee=te("[key] trigger A"),Oe=te("[key] trigger B"),Ie=Object.freeze({up:be,right:xe,down:ye,left:we,select:ve,start:ke,a:Ee,b:Oe}),je=te("[game snake] bite self"),Te=te("[game snake] hit wall"),Se=Object.freeze({setDirection:e=>ne("[game] set direction",e),biteSelf:()=>je,hitWall:()=>Te,creep:(e,t)=>ne("[game snake] creep",{head:e,grown:t}),escape:e=>ne("[game snake] escape through hole",e)});var Ae=n(33),$e=n(67),ze=n(68),Me=n(90),Ce=n(89),Le=n(69),De=n(81),_e=n(82),He=n(38),Re=n(91),We=n(87);const Pe=Object.freeze({Minimal:{hp:0,maxHp:0},Full:{hp:100,maxHp:100}});class Ge{constructor(e,t){this.x=e,this.y=t}equals(e){return e instanceof Ge&&e.x===this.x&&e.y===this.y}hashCode(){return 17*(37*this.x+11)+13*this.y}}function Be(e,t){return new Ge(e,t)}var Ne;!function(e){e.SNAKE="snake",e.TETRIS="tetris"}(Ne||(Ne={}));const Ue=te("[game tetris] rotate"),Ke=te("[game tetris] hard drop"),Fe=te("[game tetris] lock down"),qe=te("[game tetris] next block"),Je=te("[game tetris] overflow"),Ve=Object.freeze({move:e=>ne("[game tetris] move",e),rotate:()=>Ue,descend:e=>ne("[game tetris] descend",e),hardDrop:()=>Ke,lockDown:()=>Fe,nextBlock:()=>qe,lineMarkPause:e=>ne("[game tetris] line mark pause (pre-clear)",e),lineClear:e=>ne("[game tetris] line clear",e),overflow:()=>Je});function Ze(){return fe.dummy()}function Xe(e){switch(e.type){case"[key] trigger select":return fe.toggleGame();case"[key] trigger START":return fe.enterGame();case"[key] trigger left":return fe.decreaseLevel();case"[key] trigger right":return fe.increaseLevel();default:return fe.dummy()}}function Ye(e,t){switch(e.type){case"[key] trigger START":return fe.togglePause();case"[key] trigger select":return fe.quitGame("to_quit"===t.gameStatus);default:return fe.dummy()}}function Qe(e){switch(e.type){case"[key] trigger up":return Se.setDirection("NORTH");case"[key] trigger right":return Se.setDirection("EAST");case"[key] trigger down":return Se.setDirection("SOUTH");case"[key] trigger left":return Se.setDirection("WEST");case"[key] trigger START":return fe.togglePause();default:return fe.dummy()}}function et(e){switch(e.type){case"[key] trigger right":return Ve.move(1);case"[key] trigger down":return Ve.descend("manual");case"[key] trigger left":return Ve.move(-1);case"[key] trigger A":return Ve.hardDrop();case"[key] trigger B":return Ve.rotate();case"[key] trigger START":return fe.togglePause();default:return fe.dummy()}}function tt(e){let t;if("STARTING"===e.status)t=Ze;else if("MENU"===e.status)t=Xe;else{if("IN_GAME"!==e.status)throw new TypeError("Unknown system status:"+e.status);t=e.isPaused()?Ye:function(e){switch(e){case Ne.SNAKE:return Qe;case Ne.TETRIS:return et;default:throw new TypeError("Unknown enum type:"+e)}}(e.gameType)}return t}const nt=(e,t)=>e.pipe(Object(Le.a)("[key] trigger up","[key] trigger right","[key] trigger down","[key] trigger left","[key] trigger select","[key] trigger START","[key] trigger A","[key] trigger B"),Object(He.a)(e=>{const n=t.value.core;return tt(n)(e,n)}),Object(De.a)(e=>"[none] dummy action"!==e.type));var rt=n(70),at=n(83);const it=(e,t)=>e.pipe(Object(Le.a)("[sys] console animate","[sys] console start","[sys] toggle game"),Object(_e.a)(t),Object(He.a)(([,e])=>e.core.anim),Object(De.a)(e=>"animation - dummy"!==e.type),Object(at.a)(e=>Object(rt.a)(fe.consoleAnimate()).pipe(Object(Re.a)(e.frameInterval)))),ot=(e,t)=>e.pipe(Object(Le.a)("[game] win"),Object(_e.a)(t),Object(He.a)(([,e])=>e.core.getLevel()),Object(at.a)(e=>e>=D.core.maxLevel?Object(rt.a)(fe.exitGame()):Object(rt.a)(fe.increaseLevel(),fe.nextLevel()))),st=e=>e.pipe(Object(De.a)(e=>"[game] quit"===e.type&&e.payload),Object(He.a)(()=>fe.exitGame())),ct=e=>e.pipe(Object(Le.a)("[sys] exit game"),Object(He.a)(()=>fe.consoleStart())),lt={epic:Object(Me.a)(it,ot,st,ct),_winGameEpic:ot,_exitGameEpic:ct,_quitGameEpic:st,_animationEpic:it};var pt=n(17);const ut=1,dt=0,ht=2,mt=3,gt=D.screen.graphicWidth,ft=D.screen.graphicHeight,bt=gt*ft,xt=Object(h.c)(0,bt).map(()=>dt).toList(),yt=D.screen.smallMatrixWidth,wt=D.screen.smallMatrixHeight,vt=yt*wt;function kt(e){return e.y*gt+e.x}const Et=ft-1;function Ot(e){return e.x+(Et-e.y)*gt}const It=wt-1;const jt=Object(h.c)(0,bt).map(e=>e<=gt||e%gt==0||(e+1)%gt==0||e>bt-gt?ut:dt).toList();function Tt(e,t){return t.fill(dt),e.deposit.render(e=>{e.forEach((e,n)=>{e.forEach((e,r)=>{if(e>0){const a=function(e,t){return e+(Et-t)*gt}(r,n);a<t.length&&(t[a]=1===e?ut:mt)}})})}),e.block.render().forEach(e=>t[Ot(e)]=ut),Object(h.a)(t)}function St(e,t){return t.fill(dt),(e.height>D.screen.smallMatrixHeight?e.rotate():e).renderBase().forEach(e=>t[function(e){return e.x+(It-e.y)*yt}(e)]=ut),Object(h.a)(t)}var At=n(28);const $t=new Uint8Array(new ArrayBuffer(bt)),zt=new Uint8Array(new ArrayBuffer(vt));const Mt=Object.freeze({drawMatrix:function(e){let t=xt;switch(e.core.status){case"STARTING":case"MENU":t=e.core.anim.currentFrame($t);break;case"IN_GAME":switch(e.core.gameType){case Ne.SNAKE:t=function(e,t){return jt.forEach((e,n)=>t[n]=e),e.body.forEach(e=>{t[kt(e)]=ut}),e.bean&&(t[kt(e.bean)]=ht),e.hole&&(t[kt(e.hole)]=dt),Object(h.a)(t)}(e.snake,$t);break;case Ne.TETRIS:t=Tt(e.tetris,$t);break;default:throw new TypeError("Unknown gameType:"+e.core.gameType)}e.core.isPaused()&&(t=function(e){return e.map(e=>e===ut?ht:dt)}(t))}return t},drawTetrisSmallMatrix:Object(At.a)(function(e){return e},e=>St(e,zt))});class Ct{constructor(e){this.step=void 0===e?1:e}isCompleted(){return this.step>=3}advance(){let e;return e=this.isCompleted()?this:new Ct(this.step+1)}currentFrame(e){switch(this.step){case 1:e.fill(dt);break;case 2:e.fill(ut);break;case 3:e.fill(dt)}return Object(h.a)(e)}get frameInterval(){switch(this.step){case 1:return 200;case 2:return 1e3;case 3:return 200;default:throw new Error("Asssertion error: no such step")}}get type(){return"animation - console start"}}const Lt=new Ct,Dt={value:"\nIII\nI I\nIII\nI I\nI I\n",width:3},_t={value:"\nIII\nI\nIII\nI\nIII\n",width:3},Ht={value:"\nI\nI\nI\nI\nI\n",width:1},Rt={value:"\nI  I\nII I\nIIII\nI II\nI  I\n",width:4},Wt={value:"\nI  I\nI I\nII\nI I\nI  I\n",width:4},Pt={value:"\nIII\nI I\nIII\nII\nI I\n",width:3},Gt={value:"\nIII\nI\nIII\n  I\nIII\n",width:3},Bt={value:"\nIII\n I\n I\n I\n I\n",width:3},Nt=(Ut=8,{value:{value:"\nO\nO\nO\nO\nO\n",width:1}.value.split(/\n/g).map(e=>e.repeat(Ut)).join("\n"),width:Ut});var Ut;const Kt=[Nt,Gt,Rt,Dt,Wt,_t,Nt],Ft=[Nt,Bt,_t,Pt,_t,Bt,Pt,Ht,Gt,Nt],qt=Object.freeze({SNAKE:Kt,TETRIS:Ft}),Jt=300,Vt="\n";class Zt{constructor(e,t){if(this.colIdx=0,this.lastFrameTimestamp=Date.now(),0===Q(e).length)throw new Error("Background letters is empty!");if(this.backgroundSheet=Xt(e,Vt).map(e=>e.replace(/[\s]/g,"O")),this.sheetWidth=this.backgroundSheet[0].length,t>this.sheetWidth)throw new Error(`Windows width ${t} is greater than sheet width ${this.sheetWidth}`);this.windowWidth=t}setBackgroundFrame(e,t){if(Date.now()-this.lastFrameTimestamp>Jt){const n=this.backgroundSheet.map(e=>e.substr(this.colIdx,this.windowWidth)).join("");for(let r=0;r<n.length;r++){const a=n.charAt(r),i=r+t;"O"===a?e[i]=dt:"I"===a?e[i]=ut:"S"===a&&(e[i]=ht)}this.shiftWindow()}}shiftWindow(){this.colIdx+this.windowWidth>=this.sheetWidth?this.colIdx=0:this.colIdx++,this.lastFrameTimestamp=Date.now()}}function Xt(e,t){return e.map(e=>(function(e,t){return{value:e.value.split(t).map(t=>t+" ".repeat(e.width-t.length)).join(t),width:e.width}})(e,t).value.split(t)).reduce((e,t)=>e.map((e,n)=>e+" "+t[n]))}const Yt={snake:new Zt(qt.SNAKE,gt),tetris:new Zt(qt.TETRIS,gt),_convertLettersToRows:Xt},Qt=Object(h.c)(2,8).map(e=>Be(e,ft/2-2)).toList(),en=(ft/2+1)*gt,tn=Object(h.c)(0,(ft/2+1)*gt).map(e=>e<=gt||e%gt==0||(e+1)%gt==0||e>ft/2*gt?ut:dt).toList();class nn{constructor(e,t,n){this.body=void 0===e?Qt:e,this.di=void 0===t?"EAST":t,this.lastTail=n}advance(){const e=this.body.last();let t=e.x,n=e.y,r=this.di;switch(this.di){case"EAST":e.x>=gt-3?(n=e.y-1,r="NORTH"):t=e.x+1;break;case"NORTH":2===e.y?(t=e.x-1,r="WEST"):n=e.y-1;break;case"WEST":2===e.x?(n=e.y+1,r="SOUTH"):t=e.x-1;break;case"SOUTH":e.y>=ft/2-2?(t=e.x+1,r="EAST"):n=e.y+1}const a=this.body.toSeq().concat(Be(t,n)).takeLast(this.body.size).toList(),i=this.body.first(void 0);return new nn(a,r,i)}currentFrame(e){if(this.body===Qt&&tn.forEach((t,n)=>e[n]=t),Yt.snake.setBackgroundFrame(e,en),this.body.forEach(t=>{const n=kt(t);e[n]===dt&&(e[n]=ut)}),void 0!==this.lastTail){const t=kt(this.lastTail);e[t]===ut&&(e[t]=dt)}return Object(h.a)(e)}isCompleted(){return!1}get type(){return"animation - game snake"}get frameInterval(){return 200}}const rn=new nn,an=(ft/2+1)*gt,on=D.tetrisGame.initialX,sn=D.tetrisGame.initialY,cn=Object.freeze([{t:"I",o:90,x:on-4,y:sn-2},{t:"L",o:0,x:on-4,y:sn-7},{t:"T",o:90,x:on+2,y:sn-7},{t:"S",o:90,x:on-1,y:sn-7},{t:"O",o:0,x:on+2,y:sn-3}]);class ln{isCompleted(){return!1}advance(){return new ln}currentFrame(e){return this===pn&&(e.fill(dt),cn.map(e=>jr.new(e.t,e.o,e.x,e.y)).forEach(t=>{t.render().forEach(t=>e[Ot(t)]=ut)})),Yt.tetris.setBackgroundFrame(e,an),Object(h.a)(e)}get type(){return"animation - game tetris"}get frameInterval(){return 400}}const pn=new ln,un={type:"animation - dummy",frameInterval:1e3,isCompleted:()=>!0,advance:()=>un,currentFrame:()=>xt},dn=Object.freeze({emptyAnim:un,consoleStartInitial:Lt,snakeInitial:rn,tetrisInitial:pn}),hn=Object.freeze({status:"STARTING",scores:Object(h.b)(),counts:Object(h.b)(),maxScores:Object(h.b)(),level:Object(h.b)([[Ne.SNAKE,3],[Ne.TETRIS,3]]),gameType:Ne.TETRIS,gameStatus:"stopped",anim:dn.emptyAnim,audioEnabled:!0,getLevel(){return this.level.get(this.gameType,3)},getScore(){return this.scores.get(this.gameType,0)},getCount(){return this.counts.get(this.gameType,0)},isPaused:function(){return"paused"===this.gameStatus||"to_quit"===this.gameStatus}});const mn=Object.freeze({Default:hn}),gn=Object.keys(Ne).map(e=>Ne[e]);function fn(e=mn.Default,t){return Object(pt.a)(e,n=>{switch(t.type){case"[game] add score":n.scores=e.scores.update(e.gameType,e=>bn(e,t.payload.score)),n.counts=e.counts.update(e.gameType,e=>bn(e,t.payload.count));break;case"[game] increase level":const r=e.getLevel();n.level=e.level.set(e.gameType,r>=D.core.maxLevel?1:r+1);break;case"[game] decrease level":const a=e.getLevel();n.level=e.level.set(e.gameType,a<=1?D.core.maxLevel:a-1);break;case"[sys] console start":n.anim=dn.consoleStartInitial;break;case"[sys] console animate":n.anim.isCompleted()?("STARTING"===e.status&&(n.status="MENU"),n.anim=yn(e)):n.anim=n.anim.advance();break;case"[sys] toggle pause":ee(e.status,"IN_GAME","cannot pause game if not in game."),n.gameStatus="running"===e.gameStatus?"paused":"running";break;case"[sys] enter game":ee(e.status,"MENU","can only enter game from menu."),n.scores=e.scores.set(e.gameType,0),n.counts=e.counts.set(e.gameType,0),n.anim=dn.emptyAnim,n.status="IN_GAME",n.gameStatus="running";break;case"[sys] exit game":ee(e.status,"IN_GAME","cannot exit game if not in game."),n.status="MENU",n.maxScores=e.scores.mergeWith(xn,e.maxScores);break;case"[sys] toggle game":!function(e,t,n=`'${e}' is strictly equal to '${t}'!`){if(Object.is(e,t))throw Error(n)}(e.status,"IN_GAME","cannot toggle game when in game."),n.gameType=function(e,t){const n=t.indexOf(e);return n>=t.length-1?t[0]:t[n+1]}(e.gameType,gn),n.anim=yn(n);break;case"[game] quit":n.gameStatus=t.payload?"stopped":"to_quit";break;case"[sys] enable sound":n.audioEnabled=!0;break;case"[sys] disable sound":n.audioEnabled=!1}})}function bn(e,t){return(e||0)+Math.round(t)}function xn(e,t){const n=e||0,r=t||0;return Math.max(n,r)}function yn(e){let t=dn.emptyAnim;switch(e.status){case"STARTING":case"MENU":switch(e.gameType){case Ne.SNAKE:t=dn.snakeInitial;break;case Ne.TETRIS:t=dn.tetrisInitial}}return t}const wn=Object(Me.a)(lt.epic,nt);var vn=n(84),kn=n(86),En=n(85);function On(e,t,n,r,a){return(i,o)=>i.pipe(Object(De.a)(e=>"[sys] enter game"===e.type||n.includes(e.type)),Object(_e.a)(o),Object(He.a)(([,e])=>e),Object(De.a)(t=>t.core.gameType===e),Object(vn.a)(e=>{const n=t-100*e.core.getLevel();return Object(En.a)(n,n).pipe(Object(kn.a)(i.pipe(Object(De.a)(e=>"[sys] exit game"===e.type||r.includes(e.type)))),Object(_e.a)(o),Object(He.a)(([,e])=>e),Object(De.a)(e=>"running"===e.core.gameStatus),Object(He.a)(a))}))}function In(e){let t;const n=e.snake,r=function(e,t){switch(e){case"NORTH":return Be(t.x,t.y-1);case"EAST":return Be(t.x+1,t.y);case"SOUTH":return Be(t.x,t.y+1);case"WEST":return Be(t.x-1,t.y);default:throw new TypeError("UnknownDirection:"+e)}}(n.direction,n.body.last());if(r.equals(n.hole))t=Se.escape(0);else if(function(e){return e.x<1||e.x>=D.screen.graphicWidth-1||e.y<1||e.y>=D.screen.graphicHeight-1}(r))t=Se.hitWall();else if(n.body.contains(r))t=Se.biteSelf();else{const e=r.equals(n.bean);t=Se.creep(r,e)}return t}const jn=D.snakeGame.baseCreepIntervalMs,Tn=On(Ne.SNAKE,jn,["[game] next level"],["[game snake] escape through hole"],In);const Sn=D.snakeGame.baseScore,An=(e,t)=>e.pipe(Object(De.a)(e=>"[game snake] creep"===e.type&&e.payload.grown||"[game] win"===e.type),Object(_e.a)(t),Object(He.a)(([e,t])=>{const n=t.core.getLevel(),r=t.snake.body.size,a="[game] win"===e.type?3:1,i=Sn*r+Sn*n;return fe.addScore(i*a,1)})),$n=D.snakeGame.escapeAnimationIntervalMs,zn=(e,t)=>e.pipe(Object(Le.a)("[game snake] escape through hole"),Object(He.a)(e=>{if("[game snake] escape through hole"===e.type)return e.payload;throw new TypeError("Assertion error: impossible to reach here!")}),Object(Re.a)($n),Object(_e.a)(t),Object(He.a)(([e,t])=>t.snake.body.size<=0?fe.win():Se.escape(e+1))),Mn=(e,t)=>e.pipe(Object(Le.a)("[game snake] hit wall","[game snake] bite self"),Object(_e.a)(t),Object(De.a)(([,e])=>e.snake.life<1),Object(We.a)(fe.exitGame())),Cn={epic:Object(Me.a)(Tn,An,zn,Mn),_scoreEpic:An,_escapeEpic:zn,_nextCreepAction:In,_exitEpic:Mn,BASIC_INTERVAL:jn,SCORE_BASE:Sn,ESCAPE_INTERVAL:$n};var Ln=n(88);const Dn=On(Ne.TETRIS,D.tetrisGame.baseDescendIntervalMs,["[game] next level","[game tetris] next block"],["[game tetris] line mark pause (pre-clear)"],function(e){let t;return t=e.tetris.block.shouldLock()?Ve.lockDown():Ve.descend("auto")}),_n=D.tetrisGame.markClearPauseDurationMs,Hn=D.tetrisGame.baseScore,Rn=Object.freeze({epic:Object(Me.a)((e,t)=>e.pipe(Object(Le.a)("[sys] exit game","[game] quit"),Object(Ln.a)(()=>t.value.tetris.deposit.clear()),Object(De.a)(()=>!1)),Dn,e=>e.pipe(Object(Le.a)("[game tetris] hard drop"),Object(We.a)(Ve.lockDown())),(e,t)=>e.pipe(Object(Le.a)("[game tetris] lock down"),Object(Ln.a)(()=>t.value.tetris.block.lockDown()),Object(We.a)(t.value.tetris.deposit),Object(He.a)(e=>{const t=e.fullLines();return 0===t.length?e.isOverflow()?Ve.overflow():Ve.nextBlock():(e.clearLines(t,"mark"),Ve.lineMarkPause(t))})),(e,t)=>e.pipe(Object(De.a)(e=>"[game tetris] descend"===e.type&&"manual"===e.payload),Object(De.a)(()=>t.value.tetris.block.shouldLock()),Object(We.a)(Ve.lockDown())),(e,t)=>{const n="[game tetris] line mark pause (pre-clear)";return e.pipe(Object(Le.a)(n),Object(Re.a)(_n),Object(He.a)(e=>e.type===n&&e.payload||[]),Object(_e.a)(t),Object(at.a)(([e,t])=>t.tetris.floorCount>D.tetrisGame.winFloorCountPerLevel?Object(rt.a)(Ve.lineClear(e),fe.win()):Object(rt.a)(Ve.lineClear(e))))},(e,t)=>{const n="[game tetris] line clear";return e.pipe(Object(Le.a)(n),Object(_e.a)(t),Object(Ln.a)(([e,t])=>e.type===n&&t.tetris.deposit.clearLines(e.payload,"clear")),Object(We.a)(Ve.nextBlock()))},e=>{const t="[game tetris] line clear";return e.pipe(Object(Le.a)(t),Object(He.a)(e=>{const n=e.type===t&&e.payload.length||0,r=Hn*Math.pow(n,1.5);return fe.addScore(r,1)}))},e=>e.pipe(Object(Le.a)("[game tetris] overflow"),Object(We.a)(fe.exitGame())))}),Wn=5,Pn=Object.freeze({body:function(){const e=D.screen.graphicHeight-2,t=e-Wn;return Object(h.c)(t,e).reverse().map(e=>Be(3,e)).toList()}(),direction:"NORTH",life:3});const Gn=Object.freeze({Default:Pn}),Bn=D.snakeGame.winBodyLength;function Nn(e=Gn.Default,t){return Object(pt.a)(e,n=>{switch(t.type){case"[game] set direction":return void(function(e,t){switch(e){case"NORTH":return"SOUTH"===t;case"EAST":return"WEST"===t;case"SOUTH":return"NORTH"===t;case"WEST":return"WEST"===t;default:throw new TypeError("UnknownDirection:"+e)}}(e.direction,t.payload)||e.direction===t.payload||(n.direction=t.payload));case"[game snake] creep":const{head:r,grown:a}=t.payload,i=e.body.size,o=e.body.toSeq().concat(r).takeLast(a?i+1:i).toList();return n.body=o,void(o.size>=Bn?(n.hole=e.hole?e.hole:Jn.get(Y(Jn.size-1)),n.bean=void 0):n.bean=a?void 0:e.bean?e.bean:function(e){if(Math.random()>D.snakeGame.beanProduceChance){const t=Be(Y(Fn,Un),Y(qn,Kn));if(!e.contains(t))return t}return}(o));case"[game snake] hit wall":case"[game snake] bite self":return Object.assign({},Gn.Default,{life:e.life-1});case"[game snake] escape through hole":return void(n.body=e.body.takeLast(e.body.size-1));case"[game] win":return n.body=Gn.Default.body,n.direction=Gn.Default.direction,void(n.hole=void 0);default:return}})}const Un=1,Kn=1,Fn=D.screen.graphicWidth-1,qn=D.screen.graphicHeight-1;const Jn=(()=>{const e=Object(h.c)(Un,Fn).map(e=>Be(e,0)),t=Object(h.c)(Un,Fn).map(e=>Be(e,qn)),n=Object(h.c)(Kn,qn).map(e=>Be(0,e)),r=Object(h.c)(Kn,qn).map(e=>Be(Fn,e));return e.concat(t,n,r).toList()})();class Vn{constructor(e,t){this._isOverflow=!1,this.yCap=t,this.buffer=Array(t).fill(0).map(()=>new Uint8Array(new ArrayBuffer(e)).fill(0))}check(e,t){return t<this.yCap&&this.buffer[t][e]>0}mark(e,t){t>=this.yCap?this._isOverflow=!0:this.buffer[t][e]=1}dropDistance(e){return function(e,t){for(let n=e.length-1;n>=0;n--)if(t(e[n],n))return n;return-1}(this.buffer,(t,n)=>n<=e.y&&t[e.x]>0)}render(e){e(this.buffer)}fullLines(){return this.buffer.map((e,t)=>e.includes(0)?-1:t).filter(e=>e>=0)}isOverflow(){return this._isOverflow}clearLines(e,t){switch(t){case"mark":e.map(e=>this.buffer[e].fill(2));break;case"clear":const n=e.map(e=>this.buffer[e].fill(0)),r=this.buffer.filter((t,n)=>!e.includes(n));r.forEach((e,t)=>this.buffer[t]=e),n.forEach((e,t)=>this.buffer[t+r.length]=e)}}clear(...e){0===e.length?(this.buffer.forEach(e=>e.fill(0)),this._isOverflow=!1):e.forEach(e=>this.buffer[e.y][e.x]=0)}_set(...e){e.forEach(e=>this.buffer[e.y][e.x]=1)}_setLines(...e){e.forEach(e=>this.buffer[e].fill(1))}_with(e,t){this._set(e),t(),this.clear()}}const Zn=new Vn(D.screen.graphicWidth,D.screen.graphicHeight+1);const Xn=Object.freeze({getInstance:()=>Zn,_new:(e,t)=>new Vn(e,t)}),Yn=br("I",Be(0,0),Be(0,1),Be(0,2),Be(0,3)),Qn=br("I",Be(0,0),Be(1,0),Be(2,0),Be(3,0)),er=br("L",Be(0,0),Be(0,1),Be(0,2),Be(1,0)),tr=br("L",Be(0,0),Be(1,0),Be(2,0),Be(2,1)),nr=br("L",Be(0,0),Be(0,1),Be(1,1),Be(2,1)),rr=br("L",Be(0,2),Be(1,2),Be(1,1),Be(1,0)),ar=br("J",Be(0,0),Be(1,0),Be(1,1),Be(1,2)),ir=br("J",Be(2,0),Be(0,1),Be(1,1),Be(2,1)),or=br("J",Be(0,0),Be(0,1),Be(1,0),Be(2,0)),sr=br("J",Be(0,0),Be(0,1),Be(0,2),Be(1,2)),cr=br("T",Be(1,0),Be(0,1),Be(1,1),Be(2,1)),lr=br("T",Be(0,0),Be(0,1),Be(1,1),Be(0,2)),pr=br("T",Be(0,1),Be(1,0),Be(1,1),Be(1,2)),ur=br("T",Be(0,0),Be(1,0),Be(2,0),Be(1,1)),dr=br("S",Be(0,0),Be(1,0),Be(1,1),Be(2,1)),hr=br("S",Be(0,1),Be(1,1),Be(1,0),Be(0,2)),mr=br("Z",Be(0,1),Be(1,1),Be(1,0),Be(2,0)),gr=br("Z",Be(0,0),Be(1,1),Be(0,1),Be(1,2)),fr=br("O",Be(0,0),Be(0,1),Be(1,1),Be(1,0));function br(e,...t){const n=t.map(e=>e.x).sort(),r=n[n.length-1]-n[0]+1,a=t.map(e=>e.y).sort(),i=a[a.length-1]-a[0]+1;return Object.freeze({type:e,body:Object(h.d)(t),width:r,height:i})}const xr=Object.freeze({0:{I:Yn,L:er,J:ar,T:cr,S:dr,Z:mr,O:fr},[-90]:{I:Qn,L:tr,J:ir,T:lr,S:hr,Z:gr,O:fr},90:{I:Qn,L:nr,J:or,T:pr,S:hr,Z:gr,O:fr},180:{I:Yn,L:rr,J:sr,T:ur,S:dr,Z:mr,O:fr}}),yr=D.screen.graphicWidth-1;class wr{constructor(e,t,n,r,a){this.depo=e,this.base=t,this.orientation=n,this.x=r,this.y=a,this.body=t.body.map(e=>Be(e.x+r,e.y+a))}moveRight(){let e;return e=this.x+this.width>yr?this:this.body.find(e=>this.depo.check(e.x+1,e.y))?this:new wr(this.depo,this.base,this.orientation,this.x+1,this.y)}moveLeft(){let e;return e=this.x<=0?this:this.body.find(e=>this.depo.check(e.x-1,e.y))?this:new wr(this.depo,this.base,this.orientation,this.x-1,this.y)}rotate(){const e=function(e,t){let n=e+t;return n>180?n-=360:n<-90&&(n+=360),n}(this.orientation,90),t=xr[e][this.base.type],n=Math.max(this.x+t.width-yr-1,0),r=new wr(this.depo,t,e,this.x-n,this.y);return r.body.find(e=>this.depo.check(e.x,e.y))?this:r}descend(){return new wr(this.depo,this.base,this.orientation,this.x,this.y-1)}hardDrop(){const e=Object(h.c)(this.x,this.x+this.base.width).map(e=>this.body.toSeq().filter(t=>t.x===e).minBy(e=>e.y)),t=e.toSeq().map(e=>this.depo.dropDistance(e)).toList(),n=e.map(e=>e.y),r=t.zip(n).map(([e,t])=>t-e).min();return new wr(this.depo,this.base,this.orientation,this.x,this.y-r+1)}render(){return this.body}renderBase(){return this.base.body}shouldLock(){return this.y<=0||void 0!==this.body.find(e=>this.depo.check(e.x,e.y-1))}lockDown(){this.body.forEach(e=>this.depo.mark(e.x,e.y))}get _x(){return this.x}get _y(){return this.y}get _orientation(){return this.orientation}get width(){return this.base.width}get height(){return this.base.height}}const vr=Object.freeze({moveLeft(){return this},moveRight(){return this},rotate(){return this},descend(){return this},hardDrop(){return this},render:()=>Object(h.d)(),renderBase:()=>Object(h.d)(),shouldLock:()=>!1,lockDown:()=>null,_x:-1,_y:-1,_orientation:0,width:-1,height:-1}),kr=Object.entries(D.tetrisGame.probability),Er=Object.values(D.tetrisGame.probability).reduce((e,t)=>e+t);function Or(e,t,n,r,a=Xn.getInstance()){return new wr(a,xr[t][e],t,n,r)}const Ir=Object(At.a)(e=>e,e=>Or(e,0,D.tetrisGame.initialX,D.tetrisGame.initialY)),jr=Object.freeze({nextRandom:function(){let e=Y(Er);for(const[t,n]of kr)if((e-=n)<=0)return Ir(t);throw Error("Assertion error: tetris PROBABILITY_TOP is invalid!")},dummy:vr,new:Or,_MAX_X:yr}),Tr=Object.freeze({deposit:Xn.getInstance(),block:jr.nextRandom(),nextBlock:jr.nextRandom(),floorCount:0}),Sr=Object.freeze({Default:Tr}),Ar=D.tetrisGame.winFloorCountPerLevel;function $r(e=Sr.Default,t){return Object(pt.a)(e,n=>{switch(t.type){case"[game tetris] move":n.block=t.payload>0?e.block.moveRight():e.block.moveLeft();break;case"[game tetris] rotate":n.block=e.block.rotate();break;case"[game tetris] descend":e.block.shouldLock()||(n.block=e.block.descend());break;case"[game tetris] hard drop":n.block=e.block.hardDrop();break;case"[game tetris] next block":n.block=e.nextBlock,n.nextBlock=jr.nextRandom();break;case"[game tetris] line mark pause (pre-clear)":n.block=jr.dummy,n.floorCount=n.floorCount+t.payload.length;break;case"[game tetris] line clear":n.floorCount=n.floorCount>Ar?n.floorCount-Ar:n.floorCount}})}const zr=Object(Me.a)(Cn.epic,Rn.epic);const Mr=Object.freeze({sfxCoreMenu:new Audio("audio/sfx_core_menu.mp3"),sfxCoreSelect:new Audio("audio/sfx_core_menu_select.mp3"),sfxKeypress:new Audio("audio/sfx_core_keypress.mp3"),sfxEnterGame:new Audio("audio/sfx_core_enter_game.mp3"),sfxPauseIn:new Audio("audio/sfx_core_pause_in.mp3"),sfxPauseOut:new Audio("audio/sfx_core_pause_out.mp3"),sfxSnakeEatBean:new Audio("audio/sfx_snake_eat_bean.mp3"),sfxSnakeDamage:new Audio("audio/sfx_snake_damage.mp3"),sfxSnakeEscape:new Audio("audio/sfx_snake_escape.mp3"),sfxTetrisLockdown:new Audio("audio/sfx_tetris_lockdown2.mp3"),sfxTetrisLineclear:new Audio("audio/sfx_tetris_lineclear.mp3")});function Cr(e,t,n=(()=>!0)){const r="function"==typeof t?Object(De.a)(t):Object(De.a)(e=>t.includes(e.type));return(t,a)=>t.pipe(Object(De.a)(()=>a.value.core.audioEnabled),r,Object(De.a)(()=>n(a.value)),Object(Ln.a)(()=>(function(e){return e.currentTime=0,e.play()})(e)),Object(De.a)(()=>!1))}const Lr=Cr(Mr.sfxCoreMenu,["[game] increase level","[game] decrease level"],e=>"MENU"===e.core.status),Dr=Cr(Mr.sfxCoreSelect,["[sys] toggle game"]),_r=Cr(Mr.sfxEnterGame,["[sys] enter game"]),Hr=Cr(Mr.sfxPauseIn,["[sys] toggle pause"],e=>"IN_GAME"===e.core.status&&e.core.isPaused()),Rr=Cr(Mr.sfxPauseOut,["[sys] toggle pause"],e=>"IN_GAME"===e.core.status&&"running"===e.core.gameStatus),Wr=Cr(Mr.sfxKeypress,X.directionKeys,e=>"IN_GAME"===e.core.status),Pr=Cr(Mr.sfxKeypress,X.mainKeys,e=>"IN_GAME"===e.core.status&&"paused"===e.core.gameStatus),Gr=Cr(Mr.sfxCoreMenu,["[key] trigger select"],e=>"IN_GAME"===e.core.status),Br=Object(Me.a)(Lr,Dr,_r,Hr,Rr,Wr,Pr,Gr),Nr=Cr(Mr.sfxSnakeEatBean,e=>"[game snake] creep"===e.type&&e.payload.grown),Ur=Cr(Mr.sfxSnakeDamage,["[game snake] hit wall","[game snake] bite self"]),Kr=Cr(Mr.sfxSnakeEscape,e=>"[game snake] escape through hole"===e.type&&0===e.payload),Fr=Object(Me.a)(Nr,Ur,Kr),qr=Cr(Mr.sfxKeypress,["[game tetris] rotate"]),Jr=Cr(Mr.sfxTetrisLockdown,["[game tetris] lock down"]),Vr=Cr(Mr.sfxTetrisLineclear,["[game tetris] line clear"]),Zr=Object(Me.a)(qr,Jr,Vr),Xr=Object(Me.a)(Br,Fr,Zr),Yr=Object(Me.a)(wn,zr,Xr),Qr=Object(Ce.a)(),ea=Object(ze.composeWithDevTools)({}),ta=Object($e.createLogger)({collapsed:!0,predicate:(e,t)=>!X.noLogging.includes(t.type)}),na=Object(Ae.createStore)((e,t)=>{return function(e,t){return Object(pt.a)(e,e=>{switch(t.type){case"[sys] exit game":e.snake=Gn.Default,e.tetris=Sr.Default}})}(Object(Ae.combineReducers)({core:fn,snake:Nn,tetris:$r})(e,t),t)},void 0,ea(Object(Ae.applyMiddleware)(Qr,ta)));Qr.run(Yr);var ra=n(12);const aa=Object(ra.connect)(function(e){return{audioEnabled:e.core.audioEnabled}},function(e){return{toggleAudio:t=>e(t?fe.soundDisable():fe.soundEnable())}}),ia=Object(At.a)(e=>e.snake.life,e=>({hp:e,maxHp:10})),oa=Object.freeze({allOff:Object(h.c)(0,8).map(()=>0).toList(),allOn:Object(h.c)(0,8).map(()=>1).toList()});function sa(e){let t=0;for(let n=0;n<e;n++)t+=8*Math.pow(10,n);return t}const ca=Object(ra.connect)(function(e){let t=Pe.Minimal,n=Pe.Minimal,r=e.core.getScore(),a=e.core.getCount(),i=e.core.getLevel(),o=oa.allOff;if("STARTING"===e.core.status)t=Pe.Full,n=Pe.Full,r=sa(D.screen.scoreDigitMaxWidth),a=sa(D.screen.countDigitMaxWidth),o=oa.allOn,i=8;else if("IN_GAME"===e.core.status)switch(e.core.gameType){case Ne.SNAKE:t=ia(e);break;case Ne.TETRIS:o=Mt.drawTetrisSmallMatrix(e.tetris.nextBlock);break;default:throw new TypeError(`Illegal game type:${e.core.gameType}`)}return{score:r,count:a,level:i,life:t,enemyLife:n,smallFrame:o,audioMuted:!e.core.audioEnabled}});const la=Object(ra.connect)(function(e){return{width:D.screen.graphicWidth,height:D.screen.graphicHeight,hasBorder:!0,pixelSize:12,frame:Mt.drawMatrix(e)}});const pa=Object(ra.connect)(function(e){let t;switch(e.core.gameType){case Ne.TETRIS:t=D.tetrisGame.hardDropThrottleIntervalMs}return{mainAThrottleInterval:t}},e=>({upAction:()=>e(Ie.up),rightAction:()=>e(Ie.right),downAction:()=>e(Ie.down),leftAction:()=>e(Ie.left),selectAction:()=>e(Ie.select),startAction:()=>e(Ie.start),actionA:()=>e(Ie.a),actionB:()=>e(Ie.b)})),ua=Object.freeze({connectToMenu:aa,connectToDashboard:ca,connectToMatrix:la,connectToKeyboard:pa}),da=Object.freeze({info:"M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z",github:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",question:"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z",audio:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z",mute:"M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"}),ha=da.mute,ma=s.c.svg`
  width: 18px;
  height: 18px;
`;class ga extends a.a.PureComponent{render(){return a.a.createElement(ma,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a.a.createElement("path",{fill:this.props.activated?x.active:x.deactivated,d:ha}))}}const fa=D.screen.scoreDigitMaxWidth,ba=D.screen.countDigitMaxWidth,xa=1,ya=10,wa=s.c.div`
  width: ${92}px;
  text-align: right;
  font-size: 16px;
  line-height: 16px;
  padding: 4px;

  > div > p {
    margin: 6px 2px 6px;
  }
`,va=s.c.div`
  margin-top: 10px;
  margin-bottom: 10px;
`,ka=s.c.div`
  width: ${70}px;
  margin-top: 10px;
  margin-left: ${22}px;
  color: ${e=>e.isActive?x.active:x.deactivated};
  > div {
    right: 0;
  }
`,Ea=s.c.div`
  color: ${e=>e.isActive?x.active:x.deactivated};
`,Oa=s.c.div`
  margin-top: 20px;
`;function Ia(e){return void 0===e?{hp:0,maxHp:0}:e}var ja=ua.connectToDashboard(class extends a.a.PureComponent{render(){const e=Ia(this.props.enemyLife),t=Ia(this.props.life);return a.a.createElement(wa,null,a.a.createElement(va,null,a.a.createElement("p",null,"Scores"),a.a.createElement(B,{value:this.props.score,width:fa,fontSize:15})),a.a.createElement(va,null,a.a.createElement("p",null,"Counts"),a.a.createElement(B,{value:this.props.count,width:ba,fontSize:15})),a.a.createElement(va,null,a.a.createElement("p",null,"Level"),a.a.createElement(B,{value:this.props.level,width:xa,fontSize:22})),a.a.createElement(ka,{isActive:e.maxHp>0},a.a.createElement("p",null,"Enemy"),a.a.createElement(K,{hp:e.hp,maxHp:e.maxHp,count:ya})),a.a.createElement(ka,{isActive:t.maxHp>0},a.a.createElement("p",null,"Life"),a.a.createElement(K,{hp:t.hp,maxHp:t.maxHp,count:ya})),a.a.createElement(Ea,{isActive:this.props.smallFrame.includes(1)},a.a.createElement("p",null,"Next"),a.a.createElement($,{width:4,height:2,hasBorder:!1,frame:this.props.smallFrame,pixelSize:8})),a.a.createElement(Oa,null,a.a.createElement(ga,{activated:this.props.audioMuted})))}});const Ta=s.c.div`
  flex: 100%;
  background: ${x.background};
  padding: 4px;
  border: 1px solid #000;
  display: flex;
`,Sa=ua.connectToMatrix($);var Aa=class extends a.a.PureComponent{render(){return a.a.createElement(Ta,null,a.a.createElement(Sa,null),a.a.createElement(ja,null))}},$a=n(71),za=n.n($a),Ma=n(54),Ca=n.n(Ma);const La=Object.freeze({blue:"#108FE8",yellow:"#FFC334",red:"#E53030",green:"#0EC518",black:"#1b1b1b"}),Da=La.blue,_a=Object.freeze({darken40:g()(.4,Da),transparentDarken40:Ca()(.8,g()(.4,Da)),darken20:g()(.2,Da),darken13:g()(.13,Da),darken10:g()(.1,Da),lighten20:b()(.2,Da),lighten15:b()(.15,Da),transparentWhite:Ca()(.83,"#ffffff")}),Ha=`${La.black} solid 2px`,Ra=s.b`
  border: ${Ha};
  cursor: pointer;
  display: inline-block;
  background: ${Da};
`,Wa=s.b`
  ${Ra};
  border-radius: 100%;
  box-shadow: 0 -2px 1px 2px ${_a.darken10} inset,
              0 4px 3px ${_a.transparentDarken40},
              0 4px 3px ${_a.transparentWhite} inset;

  height: ${80}px;
  width: ${80}px;
  margin: 20px;

  font-size: ${40}px;
  text-decoration: none;
  font-weight: bold;
  color: ${_a.darken20};
  text-shadow: 0 -2px 0 ${_a.darken20}, 0 1px 1px ${_a.lighten15};
  line-height: ${80}px;
  text-align: center;
  &:active {
    box-shadow: 0 -2px 2px 2px ${_a.darken13} inset;
    text-shadow: 0 -2px 0 ${_a.darken20}, 0 1px 1px ${_a.lighten15};
  }
`,Pa=s.b`
  ${Ra};
  border-radius: 7px;
  box-shadow: 0 -2px 1px 1px ${_a.darken10} inset,
              0 3px 3px ${_a.transparentDarken40},
              0 3px 2px ${_a.transparentWhite} inset;
  height: 12px;
  width: 40px;
  &:active {
    box-shadow: 0 -2px 2px 1px ${_a.darken13} inset;
  }
`,Ga=Math.sqrt(1012.5)+2,Ba=s.b`
  ${Ra};
  height: ${45}px;
  width: ${45}px;
  margin: 10px 20px 10px;
  position: relative;
  border-radius: 2px;
  &:after {
    cursor: pointer;
    
    width: ${Ga}px;
    height: ${Ga}px;
    content: "";
    position: absolute;
    z-index: -1;
    background: ${Da};
    border-radius: 2px;
  }
  &:active {
    box-shadow: none;
    &:after {
      box-shadow: none;
    }
  }
`,Na=s.b`
  ${Ba};
  border-bottom: none;
  box-shadow: -3px 0 4px -1px ${_a.darken10} inset,
              2px 5px 5px -2px ${_a.transparentWhite} inset;
  &:after {
    left: -2.5px;
    bottom: 0;
    transform-origin: 0 100%;
    transform: rotate(45deg);
    border-bottom: ${Ha};
    border-right: ${Ha};
    box-shadow: -3px -3px 4px -1px ${_a.darken10} inset,
                4px 3px 4px -2px ${_a.transparentDarken40},
                0 2.5px 2px -1px ${_a.transparentWhite} inset;
  }
`,Ua=s.b`
  ${Ba};
  border-right: none;
  box-shadow: 0 -3px 2px -1px ${_a.darken10} inset,
              0px 6px 3px -3px ${_a.transparentDarken40},
              3px 5px 3px -2px ${_a.transparentWhite} inset;
  &:after {
    right: 0;
    bottom: -2.5px;
    transform-origin: 100% 100%;
    transform: rotate(45deg);
    border-top: ${Ha};
    border-right: ${Ha};
    box-shadow: -4px 0 3px -2px ${_a.darken10} inset,
                4px 0 4px -2px ${_a.transparentDarken40},
                0 2.5px 2px -1px ${_a.transparentWhite} inset;
  }
`,Ka=s.b`
  ${Ba};
  border-top: none;
  box-shadow: -3px -3px 2px -1px ${_a.darken10} inset,
              0px 5px 4px -2px ${_a.transparentDarken40},
              3px 0px 3px -2px ${_a.transparentWhite} inset;
  &:after {
    left: -2.5px;
    top: 0;
    transform-origin: 0 0;
    transform: rotate(-45deg);
    border-top: ${Ha};
    border-right: ${Ha};
    box-shadow: -3px 3px 2px -1px ${_a.transparentWhite} inset;
  }
`,Fa=s.b`
  ${Ba};
  border-left: none;
  box-shadow: 0 -3px 2px -1px ${_a.darken10} inset,
              0px 6px 4px -3px ${_a.transparentDarken40},
              0px 5px 3px -2px ${_a.transparentWhite} inset;

  &:after {
    left: 0;
    bottom: -2.5px;
    transform-origin: 0 100%;
    transform: rotate(-45deg);
    border-top: ${Ha};
    border-left: ${Ha};
    box-shadow: 4px 0 2px -2px ${_a.darken10} inset,
                -2px 0 2px -1px ${_a.transparentDarken40},
                0 3px 2px -1px ${_a.transparentWhite} inset;
  }
`,qa=45,Ja=s.c.div`
  ${e=>(e=>{switch(e){case"main":return Wa;case"func":return Pa;case"up":return Na;case"left":return Ua;case"down":return Ka;case"right":return Fa}})(e.type)};
`;class Va extends a.a.Component{shouldComponentUpdate(){return!1}constructor(e){if(super(e),typeof e.downHandler!=typeof e.upHandler)throw ReferenceError("downHandler and upHandler must be both absent or both present.");var t,n;d.a.react(this),e.keyboardCode&&e.actionHandler&&(t=e.keyboardCode,n=e.actionHandler,document.addEventListener("keypress",e=>{e.code===t&&n()}))}render(){return a.a.createElement(Ja,{type:this.props.type,onMouseDown:this.handleDown,onMouseUp:this.handleUp,onClick:this.props.actionHandler,onTouchStart:this.handleTouch,onTouchEnd:this.preventTouchend},this.props.caption)}preventTouchend(e){e.preventDefault(),this.handleUp()}handleTouch(e){this.props.actionHandler&&(e.preventDefault(),this.props.actionHandler(),this.handleDown(e))}handleDown(e){this.props.downHandler&&(e.preventDefault(),this.props.downHandler(),document.addEventListener("mouseup",this.handleUp))}handleUp(){this.props.upHandler&&(document.removeEventListener("mouseup",this.handleUp),this.props.upHandler())}}const Za=D.core.defaultButtonThrottleIntervalMs;class Xa extends a.a.Component{constructor(e){super(e),this.throttleInterval=e.throttleIntervalMs?e.throttleIntervalMs:Za,this.state={handles:Object(h.a)()},this.throttledDispatch=za()(this.props.action,this.throttleInterval,{trailing:!1}),d.a.react(this)}shouldComponentUpdate(){return!1}render(){return a.a.createElement(Va,{type:this.props.type,caption:this.props.caption,actionHandler:this.throttledDispatch,downHandler:this.fireOn,upHandler:this.fireOff,keyboardCode:this.props.keyboardCode})}fireOn(){const e=window.setInterval(this.throttledDispatch,this.throttleInterval);this.setState(t=>({handles:t.handles.push(e)}))}fireOff(){this.state.handles.forEach(window.clearInterval),this.setState({handles:Object(h.a)()})}}var Ya=s.c.div`
  position: relative;
  > div {
    position: absolute;
  }
`;const Qa=1.2*qa,ei=1.2*qa,ti=s.c.div`
  left: ${ei}px;
`,ni=s.c.div`
  top: ${Qa}px;
  left: ${2.1*ei}px;
`,ri=s.c.div`
  top: ${2*Qa}px;
  left: ${ei}px;
`,ai=s.c.div`
  top: ${Qa}px;
`;var ii=class extends a.a.PureComponent{render(){return a.a.createElement(Ya,null,a.a.createElement(ti,null,a.a.createElement(Xa,{type:"up",action:this.props.upAction,keyboardCode:"KeyW"})),a.a.createElement(ni,null,a.a.createElement(Xa,{type:"right",action:this.props.rightAction,keyboardCode:"KeyD"})),a.a.createElement(ri,null,a.a.createElement(Xa,{type:"down",action:this.props.downAction,keyboardCode:"KeyS"})),a.a.createElement(ai,null,a.a.createElement(Xa,{type:"left",action:this.props.leftAction,keyboardCode:"KeyA"})))}};const oi=s.b`
  font-size: 12px;
  font-weight: bold;
  p {
    margin: 5px;
  }
`,si=s.c.div`
  ${oi};
`,ci=s.c.div`
  ${oi};
  left: 60px;
`;class li extends a.a.PureComponent{render(){return a.a.createElement(Ya,null,a.a.createElement(si,null,a.a.createElement(Xa,{type:"func",action:this.props.selectAction,throttleIntervalMs:300,keyboardCode:"Digit1"}),a.a.createElement("p",null,"Select")),a.a.createElement(ci,null,a.a.createElement(Xa,{type:"func",action:this.props.startAction,throttleIntervalMs:300,keyboardCode:"Digit2"}),a.a.createElement("p",null,"Start")))}}const pi=s.c.div`
  left: 90px;
`,ui=s.c.div`
  top: 50px;
`;var di=class extends a.a.PureComponent{render(){return a.a.createElement(Ya,null,a.a.createElement(pi,null,a.a.createElement(Xa,{type:"main",caption:"A",action:this.props.actionA,throttleIntervalMs:this.props.throttleIntervalA,keyboardCode:"KeyK"})),a.a.createElement(ui,null,a.a.createElement(Xa,{type:"main",caption:"B",action:this.props.actionB,throttleIntervalMs:this.props.throttleIntervalB,keyboardCode:"KeyJ"})))}};const hi=s.c.div`
  position: relative;
  > div {
    position: absolute;
  }
`,mi=s.c.div`
  top: 30px;
`,gi=s.c.div`
  left: 170px;
`,fi=s.c.div`
  left: 220px;
  top: 30px;
`;var bi=ua.connectToKeyboard(class extends a.a.PureComponent{constructor(e){super(e)}render(){const e=this.props;return a.a.createElement(hi,null,a.a.createElement(mi,null,a.a.createElement(ii,{upAction:e.upAction,rightAction:e.rightAction,downAction:e.downAction,leftAction:e.leftAction})),a.a.createElement(gi,null,a.a.createElement(li,{selectAction:e.selectAction,startAction:e.startAction})),a.a.createElement(fi,null,a.a.createElement(di,{actionA:e.actionA,actionB:e.actionB,throttleIntervalA:this.props.mainAThrottleInterval,throttleIntervalB:this.props.mainBThrottleInterval})))}}),xi=n(35);const yi=n.n(xi)()(172,222,255),wi=s.c.div`
  width: 480px;
  position: absolute;
  padding-top: 50px;
  z-index: -2;
  top:5px;

  background: ${"lightskyblue"};
  border: outset 3px ${"lightskyblue"};
  border-radius: 10px;

  user-select: none;

  transform: scale(${e=>e.scale});
  transform-origin: top center;
`,vi=s.c.div`
  width: 380px;
  padding: 28px 0 16px;
  border: #000 solid;
  border-width: 0 6px 6px;
  margin: 0 auto;
  position: relative;
`,ki=s.c.div`
  width: 340px;
  border: solid 5px;
  border-color: ${"#5f92bd"} ${yi} ${yi} ${"#5f92bd"};
  margin: 0 auto;
  position: relative;
  display: flex;
`,Ei=s.c.div`
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  position: relative;
  margin-top: 20px;
  padding: 20px;
  z-index: 1;
`;var Oi=class extends a.a.PureComponent{constructor(e){super(e),this.state={scale:1},d.a.react(this)}componentDidMount(){this.scaleUI(),window.addEventListener("resize",this.scaleUI)}componentWillUnmount(){window.removeEventListener("resize",this.scaleUI)}render(){return a.a.createElement(wi,{scale:this.state.scale,id:"console"},a.a.createElement(vi,null,a.a.createElement(p,null),a.a.createElement(ki,null,a.a.createElement(Aa,null))),a.a.createElement(Ei,null,a.a.createElement(bi,null)))}scaleUI(){const e=Math.min(window.innerWidth/500,window.innerHeight/865);this.setState({scale:e})}};const Ii=24,ji=s.c.svg`
  width: ${function(e){return e.size?e.size:Ii}}px;
  cursor: pointer;
  margin: 3px;
`;class Ti extends a.a.PureComponent{render(){return a.a.createElement(ji,{onClick:this.props.onClickHandler,size:this.props.size,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a.a.createElement("path",{fill:"rgba(255, 255, 255, 0.5)",d:this.props.svgPath}))}}const Si=s.c.div`
  color: #9c9c9c;
  font-size: 0.8em;
  font-family: monospace;
`,Ai="0.4.2";class $i extends a.a.PureComponent{constructor(e){super(e),this.state=this.getUiInfo(),d.a.react(this)}componentDidMount(){window.addEventListener("resize",this.updateUiInfo)}componentWillUnmount(){window.removeEventListener("resize",this.updateUiInfo)}render(){return a.a.createElement(Si,null,a.a.createElement("p",null,"UI-version:",Ai),a.a.createElement("p",null,"Author:Cause Chung"),a.a.createElement("p",null,a.a.createElement("span",null,"window size:",this.state.uiWidth,"x",this.state.uiHeight)))}updateUiInfo(){this.setState(this.getUiInfo())}getUiInfo(){return{uiWidth:window.innerWidth,uiHeight:window.innerHeight}}}const zi={infoExpanded:!1},Mi=s.c.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  position: fixed;
  z-index: 100;
  width: ${e=>e.infoExpanded?"100%":"0"};
  height: ${e=>e.infoExpanded?"100%":"0"};
  margin: 0;
  padding: 0;
  top:2px;
  right:2px;
  background-color:rgba(0,0,0,0.6);
`,Ci=s.c.div`
  display: flex;
  flex-direction: column;
  position:absolute;
  right:0;
  top:0;
`,Li="https://github.com/cuzfrog/palm-game";var Di=ua.connectToMenu(class extends a.a.PureComponent{constructor(e){super(e),this.state=zi,d.a.react(this)}render(){const e=this.props.audioEnabled?da.audio:da.mute;return a.a.createElement(Mi,{infoExpanded:this.state.infoExpanded,onClick:this.closeInfo},a.a.createElement(Ci,null,a.a.createElement("a",{href:Li,target:"_blank"},a.a.createElement(Ti,{svgPath:da.github})),a.a.createElement(Ti,{svgPath:e,onClickHandler:this.toggleAudio,size:22}),a.a.createElement(Ti,{svgPath:da.question,onClickHandler:this.toggleInfo})),this.state.infoExpanded?a.a.createElement($i,null):null)}toggleInfo(){const e={infoExpanded:!this.state.infoExpanded};this.setState(e)}closeInfo(){this.state.infoExpanded&&this.setState(zi)}toggleAudio(){this.props.toggleAudio(this.props.audioEnabled)}});const _i=s.c.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;const Hi=s.a`
  body {
    margin: 0;
    padding: 0;
    background: #060816;
    font: 20px/1 "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
    text-rendering: optimizeLegibility;
    touch-action: manipulation;
  }
`;o.a.render(a.a.createElement(ra.Provider,{store:na},a.a.createElement(Hi,null),a.a.createElement(class extends a.a.PureComponent{render(){return a.a.createElement(_i,null,a.a.createElement(Di,null),a.a.createElement(Oi,null))}},null)),document.getElementById("root")),(()=>na.dispatch(fe.consoleStart()))()}});
//# sourceMappingURL=app.bundle.js.map