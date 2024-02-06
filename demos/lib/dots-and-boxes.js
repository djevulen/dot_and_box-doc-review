var ot=Object.defineProperty;var nt=(n,e,t)=>e in n?ot(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var i=(n,e,t)=>(nt(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const h of r)if(h.type==="childList")for(const l of h.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const h={};return r.integrity&&(h.integrity=r.integrity),r.referrerPolicy&&(h.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?h.credentials="include":r.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(r){if(r.ep)return;r.ep=!0;const h=t(r);fetch(r.href,h)}})();var m=(n=>(n[n.NONE=0]="NONE",n[n.PLUS=1]="PLUS",n[n.MINUS=2]="MINUS",n))(m||{});const x=class x{constructor(e,t,o=m.NONE){i(this,"x");i(this,"y");i(this,"sign");this.x=e,this.y=t,this.sign=o}clone(){return new x(this.x,this.y,this.sign)}plus(e){return new x(this.x+e.x,this.y+e.y,m.NONE)}minus(e){return new x(this.x-e.x,this.y-e.y,m.NONE)}};i(x,"zero",()=>new x(0,0));let a=x;var c=(n=>(n[n.START=0]="START",n[n.IN_PROGRESS=1]="IN_PROGRESS",n[n.STOPPED=2]="STOPPED",n[n.END=3]="END",n))(c||{}),f=(n=>(n[n.BACKWARD=0]="BACKWARD",n[n.FORWARD=1]="FORWARD",n[n.NONE=2]="NONE",n))(f||{});const v=class v{constructor(e,t,o){i(this,"title");i(this,"controls");i(this,"steps");i(this,"origin",a.zero());i(this,"offset",a.zero());i(this,"zoom",1);i(this,"selectedControls",[]);this.title=e,this.controls=t,this.steps=o,this.origin=a.zero()}changeSelected(e){e.forEach(t=>{if(t.selected=!t.selected,t.selected)this.selectedControls.push(t);else{const o=this.selectedControls.indexOf(t);o>=0&&this.selectedControls.splice(o,1)}})}deleteSelected(){this.controls=this.controls.filter(e=>!e.selected)}findControl(e){if(e.startsWith(v.SELECTED_PREFIX)){const t=parseInt(e.substring(v.SELECTED_PREFIX.length),10);return t<this.selectedControls.length?this.selectedControls[t]:void 0}else return this.controls.find(t=>t.id==e)}};i(v,"SELECTED_PREFIX","selected");let C=v;class H{constructor(){i(this,"actions",[]);i(this,"_progress",0);i(this,"direction",f.NONE);i(this,"state",c.START);i(this,"duration",1e3)}init(){this.actions.forEach(e=>e.init())}get progress(){return this._progress}set progress(e){if(e!=this._progress){e>0&&this._progress==0?this.actions.forEach(t=>t.onBeforeForward()):e==0&&this._progress>0&&this.actions.forEach(t=>t.onAfterBackward()),this._progress=e;for(const t of this.actions)t.updateValue(this._progress);this.updateState()}}updateState(){this._progress==0?(this.state=c.START,this.direction==f.BACKWARD&&(this.direction=f.NONE)):this._progress==1?(this.state=c.END,this.direction==f.FORWARD&&(this.direction=f.NONE)):this.state=c.IN_PROGRESS}pause(){this.state==c.IN_PROGRESS&&(this.state=c.STOPPED)}unpause(){this.state==c.STOPPED&&(this.state=c.IN_PROGRESS)}togglePause(){this.state==c.IN_PROGRESS?this.pause():this.unpause()}run(){this.direction!=f.NONE&&(this.state=c.IN_PROGRESS)}forward(){this.state!=c.END&&(this.direction=f.FORWARD,this.state=c.IN_PROGRESS)}backward(){this.state!=c.START&&(this.direction=f.BACKWARD,this.state=c.IN_PROGRESS)}}class z{constructor(){i(this,"id","");i(this,"position",a.zero());i(this,"selected",!1);i(this,"visible",!0)}updatePosition(e,t){this.position.x=e,this.position.y=t}}class R extends z{constructor(){super();i(this,"position");i(this,"selected",!1);i(this,"visible",!0);this.id="dummy",this.position=a.zero()}clone(){return new R}draw(t){console.log(`dummy draw on ${t}`)}hitTest(t){return!1}static getInstance(){return new R}}const rt=6,ht=.1,at=.002,V="yellow",N="courier",lt=14,dt=2,ct=22,ut="rgba(37,33,133,0.68)",b="white",A="black",k=["#F44336","#E91E63","#673AB7","#FFC107","#3F51B5","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FF9800","#FF5722","#673AB7","#795548","#2196F3","#9E9E9E","#607D8B"],pt=[22,14,16,17,12,32],ft=pt[0],S=R.getInstance();class U{constructor(){i(this,"model",new C("",[],[]))}updateModel(e){this.model=e}move(e){}up(e){}}class y extends z{constructor(t,o,r,h,l,u,p){super();i(this,"color");i(this,"size");i(this,"text");i(this,"id");i(this,"selected");i(this,"visible");this.id=t,this.position=o,this.color=h,this.size=r,this.text=l,this.selected=p,this.visible=u}draw(t){t.beginPath(),t.arc(this.position.x,this.position.y,this.size,0,2*Math.PI,!1),t.fillStyle=this.color,t.fill(),this.selected&&(t.lineWidth=dt,t.strokeStyle=V,t.stroke()),t.closePath();const o=this.text.length>1?this.size*.8:this.size*1.2;t.font=`${o}px ${N}`,t.fillStyle=this.color!=b?b:A;const r=o/2-o/4+1,h=r*this.text.length;t.fillText(this.text,this.position.x-h,this.position.y+r)}hitTest(t){let o=this.position.x-t.x,r=this.position.y-t.y;return o*o+r*r<=this.size*this.size}clone(){return new y(this.id.toString(),this.position.clone(),this.size,this.color.toString(),this.text.toString(),this.visible,this.selected)}}class gt extends U{click(e){const t=this.model.controls,o=`${t.length+1}`;t.push(new y(o,e,ft,k[t.length%k.length],o,!0,!1))}}class Et extends U{click(e){}move(e){}}class mt extends U{constructor(){super(...arguments);i(this,"dragStart",a.zero())}click(t){this.dragStart=t;const o=[];this.model.controls.forEach(r=>{r.hitTest(t)&&o.push(r)}),o.length>0&&this.model.changeSelected(o)}move(t){this.model.offset=new a(t.x-this.dragStart.x,t.y-this.dragStart.y)}}const M=class M extends z{constructor(t,o,r,h,l,u,p){super();i(this,"color");i(this,"size");i(this,"text");i(this,"id");i(this,"selected");i(this,"visible");this.id=t,this.position=o,this.size=r,this.color=h,this.text=l,this.selected=p,this.visible=u}draw(t){t.fillStyle=this.color!=b?b:A,t.strokeStyle=A,t.font=`${lt}px ${N}`,this.color!=b&&(t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.size.x,this.size.y)),(this.selected||this.color!=b)&&(t.strokeStyle=this.selected?V:A,t.strokeRect(this.position.x,this.position.y,this.size.x,this.size.y));const o=this.size.x/2-t.measureText(this.text).width/2;t.fillStyle=this.color!=b?b:A,t.fillText(this.text,this.position.x+o,this.position.y+this.size.y/2)}hitTest(t){const o=t.x,r=t.y;return o>=this.position.x&&o<=this.position.x+this.size.x&&r>=this.position.y&&r<=this.position.y+this.size.y}clone(){return new M(this.id.toString(),this.position.clone(),this.size.clone(),this.color.toString(),this.text.toString(),this.visible,this.selected)}};i(M,"counter",1);let O=M;class St extends U{constructor(){super(...arguments);i(this,"dragStart",a.zero())}click(t){this.dragStart=t;const o=`box ${O.counter++}`;this.model.controls.push(new O(o,t,new a(100,50),ut,o,!0,!1))}}class E{static easeLinear(e){return e}static easeInQuad(e){return e*e}static inverseEaseInQuad(e){return Math.sqrt(e)}static easeInCubic(e){return e*e*e}static inverseEaseInCubic(e){return Math.pow(e,1/3)}static getEasingByType(e){switch(e){case 0:return E.easeLinear;case 1:return E.easeInQuad;case 2:return E.easeInCubic;default:return E.easeLinear}}static getInverseEasingByType(e){switch(e){case 0:return E.easeLinear;case 1:return E.inverseEaseInQuad;case 2:return E.inverseEaseInCubic;default:return E.easeLinear}}}var Z=(n=>(n[n.LINEAR=0]="LINEAR",n[n.IN_QUAD=1]="IN_QUAD",n[n.IN_CUBIC=2]="IN_CUBIC",n))(Z||{});class wt{constructor(e){i(this,"canvas");i(this,"ctx");i(this,"_width",100);i(this,"_height",100);i(this,"model",new C("",[],[]));i(this,"isDragging",!1);i(this,"initialPinchDistance",0);i(this,"lastZoom",this.model.zoom);i(this,"fps",1);i(this,"lastTime",0);i(this,"stepStartTime",0);i(this,"easingFunc",E.getEasingByType(Z.IN_QUAD));i(this,"inverseEasingFunc",E.getInverseEasingByType(Z.IN_QUAD));i(this,"showDebug",!0);i(this,"title","");i(this,"marginLeft",0);i(this,"marginTop",0);i(this,"autoPlay",!1);i(this,"EMPTY_TOOL","empty-tool");i(this,"DOT_TOOL","dot-tool");i(this,"BOX_TOOL","box-tool");i(this,"PAN_ZOOM_TOOL","pan-zoom-tool");i(this,"panZoomTool",new mt);i(this,"tools",new Map([[this.EMPTY_TOOL,new Et],[this.DOT_TOOL,new gt],[this.BOX_TOOL,new St],[this.PAN_ZOOM_TOOL,this.panZoomTool]]));i(this,"tool",this.panZoomTool);i(this,"steps",[]);i(this,"currentStepIndex",0);i(this,"_requestedStepProgress",0);i(this,"currentStep",new H);this.ctx=e.getContext("2d"),this.canvas=e,this.attachCanvasEventHandlers()}get requestedStepProgress(){return this._requestedStepProgress}set requestedStepProgress(e){this._requestedStepProgress=e}get zoom(){return this.model.zoom}set zoom(e){this.model.zoom=e}initModel(e){this.steps=[],this.title="",this.currentStepIndex=0,this._requestedStepProgress=0,this.model=e,this.steps=e.steps;for(let t of this.tools.values())t.updateModel(this.model)}apply(e){this.initModel(e),e.title&&(this.title=e.title),this.selectStep(0),this.currentStep.init()}updatePositionAndSize(e){const t=getComputedStyle(this.canvas);this._width=parseInt(t.width,10),this._height=parseInt(t.height,10),this.marginLeft=parseInt(t.marginLeft,10)+e.x,this.marginTop=parseInt(t.marginTop,10)+e.y,this.model.origin=new a(this._width/2,this._height/2),this.model.offset=new a(this._width/2,this._height/2)}attachCanvasEventHandlers(){/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||this.addCanvasEvent("mousedown",t=>this.onPointerDown(t)),this.addCanvasEvent("touchstart",t=>this.handleTouch(t,this.onPointerDown)),this.addCanvasEvent("mouseup",t=>this.onPointerUp()),this.addCanvasEvent("touchend",t=>this.handleTouch(t,this.onPointerUp)),this.addCanvasEvent("mousemove",t=>this.onPointerMove(t)),this.addCanvasEvent("touchmove",t=>this.handleTouch(t,this.onPointerMove)),this.addCanvasEvent("wheel",t=>this.handleScroll(t))}addCanvasEvent(e,t){this.canvas.addEventListener(e,t)}selectTool(e){this.tools.has(e)&&(this.tool=this.tools.get(e))}updateStartTime(){this.currentStep.direction==f.FORWARD?this.stepStartTime=this.lastTime-this.inverseEasingFunc(this.requestedStepProgress)*this.currentStep.duration:this.currentStep.direction==f.BACKWARD&&(this.stepStartTime=this.lastTime-(1-this.inverseEasingFunc(this.requestedStepProgress))*this.currentStep.duration)}selectStep(e){this.currentStepIndex=e,this.currentStep=this.steps[this.currentStepIndex]}nextStep(){this.currentStep.state==c.END&&this.currentStepIndex<this.steps.length-1&&(this.selectStep(this.currentStepIndex+1),this.currentStep.init(),this._requestedStepProgress=0)}previousStep(){this.currentStep.state==c.START&&this.currentStepIndex>0&&(this.selectStep(this.currentStepIndex-1),this._requestedStepProgress=1)}fastForward(){this.autoPlay=!0,this.singleForward()}fastBackward(){this.autoPlay=!0,this.singleBackward()}singleForward(){this.nextStep(),this.currentStep.forward(),this.updateStartTime(),this.currentStep.run()}singleBackward(){this.previousStep(),this.currentStep.backward(),this.updateStartTime(),this.currentStep.run()}forward(){this.autoPlay=!1,this.singleForward()}backward(){this.autoPlay=!1,this.singleBackward()}deleteSelected(){this.togglePause(),this.model.deleteSelected()}togglePause(){this.updateStartTime(),this.currentStep.togglePause(),this.currentStep.state==c.STOPPED&&(this.autoPlay=!1)}drawDebug(e){this.fps=1/((e-this.lastTime)/1e3),this.drawText(`fps: ${Math.round(this.fps)} zoom: ${Math.round(this.model.zoom*100)/100} step: ${this.currentStepIndex} prog: ${Math.round(this._requestedStepProgress*100)/100}`,0,10,12,N)}draw(e){this.canvas.width=this._width,this.canvas.height=this._height,this.showDebug&&this.drawDebug(e),this.title&&this.drawText(this.title,20,30,ct,N),this.ctx.translate(this.model.origin.x,this.model.origin.y),this.ctx.scale(this.model.zoom,this.model.zoom),this.ctx.translate(-this.model.origin.x+this.model.offset.x,-this.model.origin.y+this.model.offset.y),this.currentStep&&this.currentStep.direction!=f.NONE&&this.currentStep.state!=c.STOPPED&&this.updateProgress(),this.handleProgressChange();for(const t of this.model.controls)t.visible&&t.draw(this.ctx);this.lastTime=e,requestAnimationFrame(t=>this.draw(t))}updateProgress(){this.currentStep.direction==f.FORWARD?this._requestedStepProgress=this.easingFunc((this.lastTime-this.stepStartTime)/this.currentStep.duration):this.currentStep.direction==f.BACKWARD&&(this._requestedStepProgress=this.easingFunc((this.currentStep.duration-(this.lastTime-this.stepStartTime))/this.currentStep.duration)),(this._requestedStepProgress<=.001||this._requestedStepProgress>1)&&(this._requestedStepProgress=this._requestedStepProgress<=.001?0:1)}handleProgressChange(){this.currentStep.progress!=this._requestedStepProgress&&(this.currentStep.progress=this._requestedStepProgress,this.autoPlay&&this.handleAutoPlay())}handleAutoPlay(){this.currentStep.state==c.END&&this.currentStepIndex<this.steps.length-1?this.singleForward():this.currentStep.state==c.START&&this.currentStepIndex>0&&this.singleBackward()}getEventLocation(e){return e.touches&&e.touches.length==1?new a(e.touches[0].clientX+window.scrollX-this.marginLeft,e.touches[0].clientY+window.scrollY-this.marginTop):e.clientX&&e.clientY?new a(e.clientX+window.scrollX-this.marginLeft,e.clientY+window.scrollY-this.marginTop):null}drawText(e,t,o,r,h){this.ctx.font=`${r}px ${h}`,this.ctx.fillText(e,t,o)}onPointerDown(e){e.preventDefault(),this.isDragging=!0;let t=this.getEventLocation(e);t!=null&&this.tool.click(new a(t.x/this.model.zoom-this.model.offset.x+this.model.origin.x-this.model.origin.x/this.model.zoom,t.y/this.model.zoom-this.model.offset.y+this.model.origin.y-this.model.origin.y/this.model.zoom))}onPointerUp(){this.isDragging=!1,this.initialPinchDistance=0,this.lastZoom=this.model.zoom}onPointerMove(e){if(e.preventDefault(),this.isDragging){let t=this.getEventLocation(e);this.tool.move(new a(t.x/this.model.zoom+this.model.origin.x-this.model.origin.x/this.model.zoom,t.y/this.model.zoom+this.model.origin.y-this.model.origin.y/this.model.zoom))}}handleTouch(e,t){e.preventDefault(),e.touches.length==1?t.call(this,e):e.type=="touchmove"&&e.touches.length>1&&(this.isDragging=!1,this.handlePinch(e))}handlePinch(e){const t={x:e.touches[0].clientX+window.scrollX-this.marginLeft,y:e.touches[0].clientY+window.scrollY-this.marginTop},o={x:e.touches[1].clientX+window.scrollX-this.marginLeft,y:e.touches[1].clientY+window.scrollY-this.marginTop},r=(t.x-o.x)**2+(t.y-o.y)**2;this.initialPinchDistance==0?this.initialPinchDistance=r:this.adjustZoom(null,r/this.initialPinchDistance)}handleScroll(e){e.preventDefault(),this.adjustZoom(e.deltaY*at,1)}adjustZoom(e,t){this.isDragging||(e?this.model.zoom-=e:t&&(this.model.zoom=t*this.lastZoom),this.model.zoom=Math.min(this.model.zoom,rt),this.model.zoom=Math.max(this.model.zoom,ht))}}var s=(n=>(n.MINUS="-",n.PLUS="+",n.COMMA=",",n.COLON=":",n.SEMICOLON=";",n.EQUALS="=",n.LEFT_BRACKET="(",n.RIGHT_BRACKET=")",n.LESS_THAN="<",n.ASTERIX="*",n.GREATER_THAN=">",n.ASSIGN="<-",n.CLONE="*->",n.SWAP="<->",n.MOVE="->",n.IDENTIFIER="IDENTIFIER",n.NUMBER="NUMBER",n.STRING="STRING",n.TRUE="true",n.FALSE="false",n.ID="id",n.TITLE="title",n.TEXT="text",n.DOT="dot",n.DOTS="dots",n.AT="at",n.SIZE="size",n.END="end",n.WIDTH="width",n.COLOR="color",n.IDS="ids",n.BOX="box",n.LINE="line",n.STEPS="steps",n.SELECTED="selected",n.VISIBLE="visible",n))(s||{});class It{constructor(e,t,o){i(this,"position");i(this,"type");i(this,"value");this.position=e,this.type=t,this.value=o||""}}class L{static isKeyword(e){return this.KEYWORDS_MAP.has(e)}static getKeywordByName(e){return this.KEYWORDS_MAP.get(e)}}i(L,"KEYWORDS_MAP",new Map([[s.ID.toString(),s.ID],[s.TRUE.toString(),s.TRUE],[s.FALSE.toString(),s.FALSE],[s.DOT.toString(),s.DOT],[s.DOTS.toString(),s.DOTS],[s.TITLE.toString(),s.TITLE],[s.TEXT.toString(),s.TEXT],[s.BOX.toString(),s.BOX],[s.LINE.toString(),s.LINE],[s.AT.toString(),s.AT],[s.END.toString(),s.END],[s.SIZE.toString(),s.SIZE],[s.WIDTH.toString(),s.WIDTH],[s.COLOR.toString(),s.COLOR],[s.IDS.toString(),s.IDS],[s.STEPS.toString(),s.STEPS],[s.SELECTED.toString(),s.SELECTED],[s.VISIBLE.toString(),s.VISIBLE]])),i(L,"ASSIGN_PROPERTIES",[s.SELECTED,s.TEXT,s.VISIBLE,s.STRING]);class bt{constructor(){i(this,"start",0);i(this,"position",0);i(this,"line",1);i(this,"tokens",[]);i(this,"source","")}scan(e){for(this.source=e;this.position<e.length;){const t=this.advance();switch(t){case" ":case"\r":break;case`
`:this.line++;break;case"	":break;case"(":this.addToken(s.LEFT_BRACKET);break;case")":this.addToken(s.RIGHT_BRACKET);break;case":":break;case",":this.addToken(s.COMMA);break;case"<":this.matchSwap()||this.addToken(s.LESS_THAN);break;case"*":this.matchClone()||this.addToken(s.ASTERIX);break;case"+":this.addToken(s.PLUS);break;case"-":this.match(">")?this.addToken(s.MOVE):this.addToken(s.MINUS);break;case"=":this.addToken(s.EQUALS);break;case">":this.addToken(s.GREATER_THAN);break;case"/":if(this.match("/"))for(;this.peek()!=`
`&&!this.isAtEnd();)this.advance();break;case"'":this.string();break;default:if(this.isDigit(t))this.number();else if(this.isAlpha(t))this.identifier();else throw new Error(`line: ${this.line} Unexpected character ${t} charcode: ${t.charCodeAt(0)}`)}this.start=this.position}return this.tokens}matchSwap(){return this.match("-")?this.match(">")?(this.addToken(s.SWAP),!0):(this.addToken(s.ASSIGN),!0):!1}matchClone(){return this.match("-")&&this.match(">")?(this.addToken(s.CLONE),!0):!1}addToken(e){this.addTokenValue(e)}addTokenValue(e,t){this.tokens.push(new It(this.start,e,t))}advance(){return this.source.charAt(this.position++)}isAtEnd(){return this.position>=this.source.length}peek(){return this.isAtEnd()?"\0":this.source.charAt(this.position)}match(e){return this.isAtEnd()||this.source.charAt(this.position)!=e?!1:(this.position++,!0)}isDigit(e){return e>="0"&&e<="9"}isDigitOrDot(e){return this.isDigit(e)||e=="."}number(){for(;this.isDigitOrDot(this.peek());)this.advance();let e=this.source.substring(this.start,this.position);this.addTokenValue(s.NUMBER,e)}isAlpha(e){return/[\p{Letter}\p{Mark}]+/gu.test(e)||e=="_"}isAlphanumeric(e){return this.isAlpha(e)||this.isDigit(e)}string(){for(;this.peek()!="'"&&!this.isAtEnd();)this.peek()==`
`&&this.line++,this.advance();if(this.isAtEnd())throw new Error(`line: ${this.line} Unterminated String`);this.advance();let e=this.source.substring(this.start+1,this.position-1);this.addTokenValue(s.STRING,e)}identifier(){for(;this.isAlphanumeric(this.peek());)this.advance();let e=this.source.substring(this.start,this.position);const t=L.isKeyword(e)?L.getKeywordByName(e):s.IDENTIFIER;this.addTokenValue(t,e)}}class D{constructor(e){i(this,"model");this.model=e}init(){}onBeforeForward(){}onAfterBackward(){}}class Tt extends D{constructor(t,o,r,h=""){super(t);i(this,"start");i(this,"to");i(this,"end");i(this,"left",S);i(this,"right",S);i(this,"leftId");i(this,"rightId","");this.start=a.zero(),this.to=r,this.end=r,this.leftId=o,this.rightId=h}init(){super.init(),this.selectControls()}selectControls(){const t=this.model.findControl(this.leftId);if(t?(this.left=t,this.start=this.left.position.clone(),this.end=this.calculateEnd(this.start,this.to)):this.left=S,this.rightId!==""){const o=this.model.findControl(this.rightId);o&&(this.right=o,this.end=this.right.position.clone())}}onBeforeForward(){super.onBeforeForward(),this.selectControls()}calculateEnd(t,o){return o.sign==m.NONE?new a(o.x,o.y):o.sign==m.PLUS?new a(t.x+o.x,t.y+o.y):new a(t.x-o.x,t.y-o.y)}updateValue(t){t==0?this.left.updatePosition(this.start.x,this.start.y):t==1?this.left.updatePosition(this.end.x,this.end.y):this.left.updatePosition(this.start.x+(this.end.x-this.start.x)*t,this.start.y+(this.end.y-this.start.y)*t)}}class xt extends D{constructor(t,o,r){super(t);i(this,"left",S);i(this,"right",S);i(this,"start");i(this,"end");i(this,"leftControlId");i(this,"rightControlId");this.start=a.zero(),this.end=a.zero(),this.leftControlId=o,this.rightControlId=r}init(){super.init(),this.selectControls()}onBeforeForward(){super.onBeforeForward(),this.selectControls()}selectControls(){const t=this.model.findControl(this.leftControlId);this.left=t||S;const o=this.model.findControl(this.rightControlId);this.right=o||S,this.start=this.left.position.clone(),this.end=this.right.position.clone()}updateValue(t){if(t==0)this.left.updatePosition(this.start.x,this.start.y),this.right.updatePosition(this.end.x,this.end.y);else if(t==1)this.left.updatePosition(this.end.x,this.end.y),this.right.updatePosition(this.start.x,this.start.y);else{const o=(this.end.x-this.start.x)*t,r=(this.end.y-this.start.y)*t;this.left.updatePosition(this.start.x+o,this.start.y+r),this.right.updatePosition(this.end.x-o,this.end.y-r)}}}class At extends D{constructor(t,o,r){super(t);i(this,"left",S);i(this,"right",S);i(this,"leftControlId");i(this,"rightControlId");i(this,"isAdded");this.isAdded=!1,this.leftControlId=o,this.rightControlId=r}init(){super.init();const t=this.model.findControl(this.leftControlId);t?(this.left=t,this.cloneAndAddControl()):this.left=S}cloneAndAddControl(){this.isAdded||(this.right=this.left.clone(),this.right.id=this.rightControlId,this.model.controls.push(this.right),this.isAdded=!0)}onBeforeForward(){super.onBeforeForward(),this.cloneAndAddControl()}onAfterBackward(){super.onAfterBackward(),this.destroyControls()}destroyControls(){if(this.isAdded){const t=this.model.controls.indexOf(this.right);t>-1&&(this.model.controls.splice(t,1),this.isAdded=!1)}}updateValue(t){}}class ${constructor(e,t){i(this,"controlId");i(this,"propertyChanges");this.controlId=e,this.propertyChanges=t}}class kt{constructor(e,t,o){i(this,"property");i(this,"newValue");i(this,"oldValue");this.property=e,this.newValue=t,this.oldValue=o}}class vt extends D{constructor(t,o,r){super(t);i(this,"control",S);i(this,"controlId");i(this,"properties");i(this,"change");i(this,"applied",!1);this.controlId=o,this.change=new $(this.controlId,[]),this.properties=r}init(){super.init(),this.selectControls()}selectControls(){this.control=this.model.findControl(this.controlId)}onBeforeForward(){super.onBeforeForward(),this.selectControls(),this.applyChanges()}onAfterBackward(){super.onAfterBackward(),this.revertChanges()}applyChanges(){if(!this.applied&&this.control){this.applied=!0;let t=this.control,o=[];for(const r of this.properties.keys()){const h=t[r],l=this.properties.get(r);t[r]=l,o.push(new kt(r,l,h))}this.change=new $(this.controlId,o)}}revertChanges(){if(this.applied&&this.control){this.applied=!1;let t=this.control;for(const o of this.change.propertyChanges)t[o.property]=o.oldValue;this.change=new $(this.controlId,[])}}updateValue(t){}}class Ct extends D{constructor(t,o){super(t);i(this,"start",a.zero());i(this,"to",new a(100,100));i(this,"leftId","");this.to=o}init(){super.init(),this.start=this.model.offset.clone()}updateValue(t){this.model.offset.x=this.start.x-this.to.x*t,this.model.offset.y=this.start.y-this.to.y*t}}const F=class F extends z{constructor(t,o,r,h,l,u,p){super();i(this,"color");i(this,"_end");i(this,"width");i(this,"selected");i(this,"visible");i(this,"distance",a.zero());this.id=t,this.position=o,this._end=r,this.distance=this._end.minus(this.position),this.width=h,this.color=l,this.selected=p,this.visible=u}get end(){return this._end}set end(t){this.distance=this.position.minus(this.end),this._end=t}draw(t){t.strokeStyle=this.color,this.selected&&(t.strokeStyle=V),t.beginPath(),t.lineWidth=this.width,t.lineCap="round",t.moveTo(this.position.x,this.position.y),t.lineTo(this._end.x,this._end.y),t.stroke()}hitTest(t){return!1}clone(){return new F(this.id.toString(),this.position.clone(),this.end.clone(),this.width,this.color.toString(),this.visible,this.selected)}updatePosition(t,o){this.position.x=t,this.position.y=o,this._end.x=t+this.distance.x,this._end.y=o+this.distance.y}};i(F,"counter",1);let G=F;var K=(n=>(n[n.COL=0]="COL",n[n.ROW=1]="ROW",n[n.BTREE=2]="BTREE",n))(K||{});class B{constructor(){i(this,"scanner",new bt);i(this,"model",B.newModel());i(this,"position",0);i(this,"tokens",[])}static newModel(){return new C("",[],[])}eof(){return this.tokens.length<=this.position}advance(){return this.tokens[this.position++]}peek(){return this.tokens[this.position]}parse(e){for(this.model=B.newModel(),this.tokens=this.scanner.scan(e);this.position<this.tokens.length;)switch(this.advance().type){case s.TITLE:this.title();break;case s.BOX:this.box();break;case s.DOT:this.dot();break;case s.LINE:this.line();break;case s.DOTS:this.dots();break;case s.STEPS:this.steps();break}return this.model}box(){const e=[s.ID,s.SIZE,s.AT,s.TEXT,s.COLOR,s.VISIBLE,s.SELECTED];let t=new a(100,100),o=new a(0,0),r="",h=null,l=b,u=!0,p=!1;for(;!this.eof()&&e.includes(this.peek().type);)switch(this.advance().type){case s.ID:h=this.controlId();break;case s.TEXT:r=this.text();break;case s.AT:o=this.at();break;case s.SIZE:t=this.point();break;case s.COLOR:l=this.color();break;case s.VISIBLE:u=this.visible();break;case s.SELECTED:p=this.selected();break}h==null&&r==""&&(h="b"+this.model.controls.length);const d=new O(h??r,o,t,l,r,u,p);this.model.controls.push(d),d.selected&&this.model.selectedControls.push(d)}line(){const e=[s.ID,s.END,s.AT,s.WIDTH,s.COLOR,s.VISIBLE,s.SELECTED];let t=new a(100,100),o=new a(0,0),r=1,h=null,l=A,u=!0,p=!1;for(;!this.eof()&&e.includes(this.peek().type);)switch(this.advance().type){case s.ID:h=this.controlId();break;case s.AT:o=this.at();break;case s.END:t=this.point();break;case s.WIDTH:r=this.number();break;case s.COLOR:l=this.color();break;case s.VISIBLE:u=this.visible();break;case s.SELECTED:p=this.selected();break}h==null&&(h="l"+this.model.controls.length);const d=new G(h,o,t,r,l,u,p);this.model.controls.push(d),d.selected&&this.model.selectedControls.push(d)}dots(){const e=[s.SIZE,s.AT,s.IDS];let t=20,o=new a(0,0),r="",h="",l=[],u=K.COL;for(;!this.eof()&&e.includes(this.peek().type);)switch(this.advance().type){case s.ID:h=this.controlId();break;case s.AT:o=this.at();break;case s.SIZE:t=this.number();break;case s.IDS:l=this.data();break}if(l.length==0)throw new Error(`data attribute is mandatory for dots at ${this.peek().position}`);let p=t*2+10,d=0;for(h of l){let w=o.clone();u==K.COL&&(w.x+=d*p);let I=k[this.model.controls.length%k.length];const T=new y(h!=""?h:r,w,t,I,h,!0,!1);this.model.controls.push(T),T.selected&&this.model.selectedControls.push(T),d++}}dot(){const e=[s.ID,s.SIZE,s.AT,s.TEXT,s.COLOR,s.VISIBLE,s.SELECTED];let t=20,o=new a(0,0),r="",h="",l=k[this.model.controls.length%k.length],u=!0,p=!1;for(;!this.eof()&&e.includes(this.peek().type);)switch(this.advance().type){case s.ID:h=this.controlId();break;case s.TEXT:r=this.text();break;case s.COLOR:l=this.color();break;case s.AT:o=this.at();break;case s.SIZE:t=this.number();break;case s.VISIBLE:u=this.visible();break;case s.SELECTED:p=this.selected();break}h==""&&r==""&&(h="d"+this.model.controls.length);const d=new y(h!=""?h:r,o,t,l,r!=""?r:h,u,p);this.model.controls.push(d),d.selected&&this.model.selectedControls.push(d)}text(){if(this.peek().type==s.STRING)return this.advance().value;let e="";for(;this.peek().type==s.IDENTIFIER;){const t=this.advance();e+=" "+t.value.toString()}return e.trim()}color(){let e="";if(this.peek().type==s.IDENTIFIER){let t=this.advance();if(e+=t.value,this.match(s.LEFT_BRACKET)){for(e+="(",e+=this.number().toString();this.match(s.COMMA);)e+=",",e+=this.number().toString();if(this.match(s.RIGHT_BRACKET))e+=")";else throw new Error(`Expected closing bracket at ${this.peek().position} got token ${this.peek().value} instead`)}}return e}at(){return this.point()}number(){let e,t=this.peek();if(e=t.type==s.MINUS,e&&this.advance(),t=this.advance(),t.type==s.NUMBER){let o=t.value.includes(".")?parseFloat(t.value):parseInt(t.value,10);return e?-o:o}else throw new Error(`Expected number at position: ${t.position} got token ${t.value} instead`)}title(){this.model.title=this.text()}steps(){let e=new H,t=this.action();for(;t!=null;)e.actions.push(t),this.match(s.COMMA)||(this.model.steps.push(e),e=new H),t=this.action();e.actions.length>0&&this.model.steps.push(e)}action(){if(this.eof())return null;let e=this.controlId(),t=this.peek();switch(t.type){case s.ASSIGN:return this.assign(e);case s.MOVE:return this.move(e);case s.SWAP:return this.swap(e);case s.CLONE:if(this.advance(),t=this.peek(),t.type==s.IDENTIFIER)return this.advance(),new At(this.model,e,t.value);break}return null}controlId(){let e=this.advance();if(this.canBeId(e.type))return e.value;throw new Error(`Expected control identifier at ${e.position} got ${e.value} instead`)}canBeId(e){return e==s.IDENTIFIER||e==s.STRING||e==s.NUMBER}data(){let e=[];for(;!this.eof()&&this.canBeId(this.peek().type);)e.push(this.peek().value),this.advance();return e}move(e){this.advance();let t=a.zero(),o="";if(this.pointInBracketsAhead()?t=this.point():(o=this.peek().value,this.advance()),e=="camera"){if(t.sign==m.NONE)throw new Error("Only relative move for camera is currently supported");return new Ct(this.model,t)}return new Tt(this.model,e,t,o)}pointInBracketsAhead(){const e=this.peek();return e.type==s.PLUS||e.type==s.MINUS||e.type==s.LEFT_BRACKET}assign(e){this.advance();let t=this.peek(),o=new Map;for(;!this.eof()&&L.ASSIGN_PROPERTIES.includes(t.type);){let r="";t.type==s.STRING?r="text":(this.advance(),r=t.type.toString());const h=this.peek();let l;h.type==s.TRUE||h.type==s.FALSE?l=this.boolean():l=h.value,o.set(r,l),this.advance(),t=this.peek()}return new vt(this.model,e,o)}visible(){return this.boolean()}selected(){return this.boolean()}boolean(){const e=this.peek();switch(e.type){case s.TRUE:return!0;case s.FALSE:return!1;default:throw new Error(`Expected boolean value: ${e.position} got token ${e.value} instead`)}}swap(e){this.advance();const o=this.peek().value;return this.advance(),new xt(this.model,e,o)}plus(){return this.match(s.PLUS)}minus(){return this.match(s.MINUS)}sign(){let e=m.NONE;return this.plus()&&(e=m.PLUS),this.minus()&&(e=m.MINUS),e}point(){let e=this.sign();const t=this.match(s.LEFT_BRACKET);let o=this.number();e==m.MINUS&&!t&&(o=-o);let r=this.advance();if(r.type!=s.COMMA)throw new Error(`Expected comma at position: ${r.position} got token ${r} instead`);let h=this.number();if(t&&!this.match(s.RIGHT_BRACKET))throw new Error(`Expected right bracket at position: ${r.position} got token ${r} instead`);return new a(o,h,e)}match(e){return this.eof()||this.peek().type!=e?!1:(this.position++,!0)}error(e){throw new Error(e)}}const q="style",Y="color",Q="border",j="code",yt="width",Ot="height",J="debug",P="experimental",tt="controls",et="autoplay",st="keyboard",it="initialized";class _ extends HTMLElement{constructor(){super(...arguments);i(this,"dotsAndBoxes");i(this,"_code","");i(this,"color","white");i(this,"debug",!1);i(this,"border","1px solid #ccc");i(this,"defaultWidth",100);i(this,"defaultHeight",100);i(this,"showControls",!1);i(this,"experimental",!1);i(this,"autoplay",!1);i(this,"canvas");i(this,"keyboard",!1);i(this,"_initialized",!1);i(this,"keyboardHandlerLambda",t=>this.handleKeyDown(t))}get initialized(){return this._initialized}get code(){return this._code}set code(t){this._code=t,this.reset()}reset(){this._code&&this.dotsAndBoxes&&(this.updateCanvasStyle(this.canvas),this.applyCode(),this.dotsAndBoxes.showDebug=this.debug,this.dotsAndBoxes.updatePositionAndSize(new a(this.offsetLeft,this.offsetTop)),this.dotsAndBoxes.draw(0))}applyCode(){const t=new B().parse(this._code);this.dotsAndBoxes.apply(t)}connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>
        :host { display: block; padding: 0;border: ${this.border};}
        #controls-menu {    
          position: relative;   
          height: 24px;
          left: 0;       
          top: -26px;
          overflow: hidden;
          background-color: white;
          background-color:  rgba(243,243,243,0.7);
          display: ${this.showControls?"flex":"none"};
          flex-wrap: nowrap;
          align-items: center;
        }        
        #controls-menu button {
         color:  rgba(23,23,23,0.7);
         background-color: transparent;
         font-size: 22px;                 
         width: 22px;
         margin: 0;
         padding: 0;
         border: solid 1px transparent;
        }      
         #controls-menu button:hover {
            color:  black;
         }
      </style>
      <div>
        <canvas id="canvas"></canvas>
        <div id="controls-menu"></div>
      </div>
    `,this.buildControls(t.getElementById("controls-menu")),this.canvas=this.getCanvas(t),this.dotsAndBoxes=new wt(this.canvas),this.reset(),this._initialized=!0,this.dispatchEvent(new CustomEvent(it,{bubbles:!0,cancelable:!1,composed:!0})),this.autoplay&&this.fastForward()}getCanvas(t){return t.getElementById("canvas")}updateCanvasStyle(t){t.width=this.offsetWidth?this.offsetWidth-2:this.defaultWidth,t.height=this.offsetHeight?this.offsetHeight-2:this.defaultHeight,t.style.background=this.color,t.style.padding="0",t.style.margin="0",t.style.overflow="hidden",t.style.userSelect="none"}updateControls(){const t=this.shadowRoot.getElementById("controls-menu");t.style.display=this.showControls?"block":"none";const o=this.shadowRoot.getElementById(P);o.style.display=this.experimental?"inline":"none"}buildControls(t){const o=document.createElement("button");o.onclick=g=>this.dotsAndBoxes.fastBackward(),o.textContent="«",t.append(o);const r=document.createElement("button");r.onclick=g=>this.dotsAndBoxes.backward(),r.textContent="◂",t.append(r);const h=document.createElement("button");h.onclick=g=>this.dotsAndBoxes.togglePause(),h.textContent="■",t.append(h);const l=document.createElement("button");l.onclick=g=>this.forward(),l.append("▸"),t.append(l);const u=document.createElement("button");u.onclick=g=>this.dotsAndBoxes.fastForward(),u.append("»"),t.append(u);const p=document.createElement("button");p.onclick=g=>this.reset(),p.append("↺"),t.append(p);const d=document.createElement("div");d.id=P,d.style.display=this.experimental?"inline":"none";const w=document.createElement("button");w.onclick=g=>this.dotsAndBoxes.selectTool(this.dotsAndBoxes.PAN_ZOOM_TOOL),w.append("✜"),t.append(w);const I=document.createElement("input");I.type="range",I.min="0",I.max="1",I.step="0.01",I.value="0",I.oninput=g=>{this.dotsAndBoxes.requestedStepProgress=parseFloat(g.target.value)},d.append(I);const T=document.createElement("button");T.onclick=g=>this.dotsAndBoxes.selectTool(this.dotsAndBoxes.DOT_TOOL),T.append("⏺"),d.append(T);const W=document.createElement("button");W.onclick=g=>this.dotsAndBoxes.selectTool(this.dotsAndBoxes.BOX_TOOL),W.append("□"),d.append(W);const X=document.createElement("button");X.onclick=g=>console.log(this.dotsAndBoxes.model),X.append("ⅈ"),d.append(X),t.append(d)}updateKeyboardHandler(){this.keyboard?document.addEventListener("keydown",this.keyboardHandlerLambda):document.removeEventListener("keydown",this.keyboardHandlerLambda)}handleKeyDown(t){t.key==="ArrowLeft"?this.dotsAndBoxes.backward():t.key==="ArrowRight"?this.dotsAndBoxes.forward():t.key==="Delete"&&this.dotsAndBoxes.deleteSelected()}forward(){this.dotsAndBoxes.forward()}fastForward(){this.dotsAndBoxes.fastForward()}backward(){this.dotsAndBoxes.backward()}fastBackward(){this.dotsAndBoxes.fastBackward()}resize(){this.canvas&&(this.updateCanvasStyle(this.canvas),this.dotsAndBoxes.updatePositionAndSize(new a(this.offsetLeft,this.offsetTop)))}disconnectedCallback(){console.log("Custom element removed from page.")}adoptedCallback(){console.log("Custom element moved to new page.")}attributeChangedCallback(t,o,r){switch(t){case q:this.resize();break;case j:this._code=r,this.dotsAndBoxes&&this.applyCode();break;case Y:this.color=r;break;case Q:this.border=r;break;case tt:this.showControls=r!=null,this.dotsAndBoxes&&this.updateControls();break;case P:this.experimental=r!=null,this.dotsAndBoxes&&this.updateControls();break;case st:this.keyboard=r!=null,this.updateKeyboardHandler();break;case et:this.autoplay=r!=null,this.dotsAndBoxes&&this.fastForward();break;case J:this.debug=r!=null,this.dotsAndBoxes&&(this.dotsAndBoxes.showDebug=this.debug);break;default:console.log(t,o,r)}}}i(_,"ELEM_NAME","dots-and-boxes"),i(_,"observedAttributes",[q,Y,Q,j,yt,Ot,J,P,tt,et,st,it]);customElements.define(_.ELEM_NAME,_);
