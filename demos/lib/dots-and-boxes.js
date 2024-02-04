var j=Object.defineProperty;var J=(n,t,e)=>t in n?j(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var s=(n,t,e)=>(J(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const h of r)if(h.type==="childList")for(const l of h.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const h={};return r.integrity&&(h.integrity=r.integrity),r.referrerPolicy&&(h.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?h.credentials="include":r.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(r){if(r.ep)return;r.ep=!0;const h=e(r);fetch(r.href,h)}})();var g=(n=>(n[n.NONE=0]="NONE",n[n.PLUS=1]="PLUS",n[n.MINUS=2]="MINUS",n))(g||{});const I=class I{constructor(t,e,o=g.NONE){s(this,"x");s(this,"y");s(this,"sign");this.x=t,this.y=e,this.sign=o}clone(){return new I(this.x,this.y,this.sign)}plus(t){return new I(this.x+t.x,this.y+t.y,g.NONE)}minus(t){return new I(this.x-t.x,this.y-t.y,g.NONE)}};s(I,"zero",()=>new I(0,0));let a=I;var d=(n=>(n[n.START=0]="START",n[n.IN_PROGRESS=1]="IN_PROGRESS",n[n.STOPPED=2]="STOPPED",n[n.END=3]="END",n))(d||{}),u=(n=>(n[n.BACKWARD=0]="BACKWARD",n[n.FORWARD=1]="FORWARD",n[n.NONE=2]="NONE",n))(u||{});const T=class T{constructor(t,e,o){s(this,"title");s(this,"controls");s(this,"steps");s(this,"origin",a.zero());s(this,"offset",a.zero());s(this,"zoom",1);s(this,"selectedControls",[]);this.title=t,this.controls=e,this.steps=o,this.origin=a.zero()}changeSelected(t){t.forEach(e=>{if(e.selected=!e.selected,e.selected)this.selectedControls.push(e);else{const o=this.selectedControls.indexOf(e);o>=0&&this.selectedControls.splice(o,1)}})}deleteSelected(){this.controls=this.controls.filter(t=>!t.selected)}findControl(t){if(t.startsWith(T.SELECTED_PREFIX)){const e=parseInt(t.substring(T.SELECTED_PREFIX.length),10);return e<this.selectedControls.length?this.selectedControls[e]:void 0}else return this.controls.find(e=>e.id==t)}};s(T,"SELECTED_PREFIX","selected");let y=T;class z{constructor(){s(this,"actions",[]);s(this,"_progress",0);s(this,"direction",u.NONE);s(this,"state",d.START);s(this,"duration",1e3)}init(){this.actions.forEach(t=>t.init())}get progress(){return this._progress}set progress(t){if(t!=this._progress){t>0&&this._progress==0?this.actions.forEach(e=>e.onBeforeForward()):t==0&&this._progress>0&&this.actions.forEach(e=>e.onAfterBackward()),this._progress=t;for(const e of this.actions)e.updateValue(this._progress);this.updateState()}}updateState(){this._progress==0?(this.state=d.START,this.direction==u.BACKWARD&&(this.direction=u.NONE)):this._progress==1?(this.state=d.END,this.direction==u.FORWARD&&(this.direction=u.NONE)):this.state=d.IN_PROGRESS}pause(){this.state==d.IN_PROGRESS&&(this.state=d.STOPPED)}unpause(){this.state==d.STOPPED&&(this.state=d.IN_PROGRESS)}togglePause(){this.state==d.IN_PROGRESS?this.pause():this.unpause()}run(){this.direction!=u.NONE&&(this.state=d.IN_PROGRESS)}forward(){this.state!=d.END&&(this.direction=u.FORWARD,this.state=d.IN_PROGRESS)}backward(){this.state!=d.START&&(this.direction=u.BACKWARD,this.state=d.IN_PROGRESS)}}const tt=6,et=.1,st=.002,Q="yellow",v="courier",it=14,ot=22,nt="rgba(37,33,133,0.68)",w="white",A="black",O=["#F44336","#E91E63","#673AB7","#FFC107","#3F51B5","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FF9800","#FF5722","#673AB7","#795548","#2196F3","#9E9E9E","#607D8B"],rt=[22,14,16,17,12,32],ht=rt[0];class B{constructor(){s(this,"model",new y("",[],[]))}updateModel(t){this.model=t}move(t){}up(t){}}class D{constructor(t,e,o,r,h,l,p){s(this,"position");s(this,"color");s(this,"size");s(this,"text");s(this,"id");s(this,"selected");s(this,"visible");this.id=t,this.position=e,this.color=r,this.size=o,this.text=h,this.selected=p,this.visible=l}draw(t){t.beginPath(),t.arc(this.position.x,this.position.y,this.size,0,2*Math.PI,!1),t.fillStyle=this.color,t.fill(),this.selected&&(t.strokeStyle=Q,t.stroke()),t.closePath();const e=this.text.length>1?this.size*.8:this.size*1.2;t.font=`${e}px ${v}`,t.fillStyle=this.color!=w?w:A;const o=e/2-e/4+1,r=o*this.text.length;t.fillText(this.text,this.position.x-r,this.position.y+o)}hitTest(t){let e=this.position.x-t.x,o=this.position.y-t.y;return e*e+o*o<=this.size*this.size}clone(){return new D(this.id.toString(),this.position.clone(),this.size,this.color.toString(),this.text.toString(),this.visible,this.selected)}}class at extends B{click(t){const e=this.model.controls,o=`${e.length+1}`;e.push(new D(o,t,ht,O[e.length%O.length],o,!0,!1))}}class lt extends B{click(t){}move(t){}}class dt extends B{constructor(){super(...arguments);s(this,"dragStart",a.zero())}click(e){this.dragStart=e;const o=[];this.model.controls.forEach(r=>{r.hitTest(e)&&o.push(r)}),o.length>0&&this.model.changeSelected(o)}move(e){this.model.offset=new a(e.x-this.dragStart.x,e.y-this.dragStart.y)}}const P=class P{constructor(t,e,o,r,h,l,p){s(this,"position");s(this,"color");s(this,"size");s(this,"text");s(this,"id");s(this,"selected");s(this,"visible");this.id=t,this.position=e,this.size=o,this.color=r,this.text=h,this.selected=p,this.visible=l}draw(t){t.fillStyle=this.color!=w?w:A,t.strokeStyle=A,t.font=`${it}px ${v}`,this.color!=w&&(t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.size.x,this.size.y)),(this.selected||this.color!=w)&&(t.strokeStyle=this.selected?Q:A,t.strokeRect(this.position.x,this.position.y,this.size.x,this.size.y));const e=this.size.x/2-t.measureText(this.text).width/2;t.fillStyle=this.color!=w?w:A,t.fillText(this.text,this.position.x+e,this.position.y+this.size.y/2)}hitTest(t){const e=t.x,o=t.y;return e>=this.position.x&&e<=this.position.x+this.size.x&&o>=this.position.y&&o<=this.position.y+this.size.y}clone(){return new P(this.id.toString(),this.position.clone(),this.size.clone(),this.color.toString(),this.text.toString(),this.visible,this.selected)}};s(P,"counter",1);let b=P;class ct extends B{constructor(){super(...arguments);s(this,"dragStart",a.zero())}click(e){this.dragStart=e;const o=`box ${b.counter++}`;this.model.controls.push(new b(o,e,new a(100,50),nt,o,!0,!1))}}class f{static easeLinear(t){return t}static easeInQuad(t){return t*t}static inverseEaseInQuad(t){return Math.sqrt(t)}static easeInCubic(t){return t*t*t}static inverseEaseInCubic(t){return Math.pow(t,1/3)}static getEasingByType(t){switch(t){case 0:return f.easeLinear;case 1:return f.easeInQuad;case 2:return f.easeInCubic;default:return f.easeLinear}}static getInverseEasingByType(t){switch(t){case 0:return f.easeLinear;case 1:return f.inverseEaseInQuad;case 2:return f.inverseEaseInCubic;default:return f.easeLinear}}}var U=(n=>(n[n.LINEAR=0]="LINEAR",n[n.IN_QUAD=1]="IN_QUAD",n[n.IN_CUBIC=2]="IN_CUBIC",n))(U||{});class ut{constructor(t){s(this,"canvas");s(this,"ctx");s(this,"_width",100);s(this,"_height",100);s(this,"model",new y("",[],[]));s(this,"isDragging",!1);s(this,"initialPinchDistance",0);s(this,"lastZoom",this.model.zoom);s(this,"fps",1);s(this,"lastTime",0);s(this,"stepStartTime",0);s(this,"easingFunc",f.getEasingByType(U.IN_QUAD));s(this,"inverseEasingFunc",f.getInverseEasingByType(U.IN_QUAD));s(this,"showDebug",!0);s(this,"title","");s(this,"marginLeft",0);s(this,"marginTop",0);s(this,"autoPlay",!1);s(this,"EMPTY_TOOL","empty-tool");s(this,"DOT_TOOL","dot-tool");s(this,"BOX_TOOL","box-tool");s(this,"PAN_ZOOM_TOOL","pan-zoom-tool");s(this,"panZoomTool",new dt);s(this,"tools",new Map([[this.EMPTY_TOOL,new lt],[this.DOT_TOOL,new at],[this.BOX_TOOL,new ct],[this.PAN_ZOOM_TOOL,this.panZoomTool]]));s(this,"tool",this.panZoomTool);s(this,"steps",[]);s(this,"currentStepIndex",0);s(this,"_requestedStepProgress",0);s(this,"currentStep",new z);this.ctx=t.getContext("2d"),this.canvas=t,this.attachCanvasEventHandlers()}get requestedStepProgress(){return this._requestedStepProgress}set requestedStepProgress(t){this._requestedStepProgress=t}get zoom(){return this.model.zoom}set zoom(t){this.model.zoom=t}initModel(t){this.steps=[],this.title="",this.currentStepIndex=0,this._requestedStepProgress=0,this.model=t,this.steps=t.steps;for(let e of this.tools.values())e.updateModel(this.model)}apply(t){this.initModel(t),t.title&&(this.title=t.title),this.selectStep(0),this.currentStep.init()}updatePositionAndSize(t){const e=getComputedStyle(this.canvas);this._width=parseInt(e.width,10),this._height=parseInt(e.height,10),this.marginLeft=parseInt(e.marginLeft,10)+t.x,this.marginTop=parseInt(e.marginTop,10)+t.y,this.model.origin=new a(this._width/2,this._height/2),this.model.offset=new a(this._width/2,this._height/2)}attachCanvasEventHandlers(){/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||this.addCanvasEvent("mousedown",e=>this.onPointerDown(e)),this.addCanvasEvent("touchstart",e=>this.handleTouch(e,this.onPointerDown)),this.addCanvasEvent("mouseup",e=>this.onPointerUp()),this.addCanvasEvent("touchend",e=>this.handleTouch(e,this.onPointerUp)),this.addCanvasEvent("mousemove",e=>this.onPointerMove(e)),this.addCanvasEvent("touchmove",e=>this.handleTouch(e,this.onPointerMove)),this.addCanvasEvent("wheel",e=>this.handleScroll(e))}addCanvasEvent(t,e){this.canvas.addEventListener(t,e)}selectTool(t){this.tools.has(t)&&(this.tool=this.tools.get(t))}updateStartTime(){this.currentStep.direction==u.FORWARD?this.stepStartTime=this.lastTime-this.inverseEasingFunc(this.requestedStepProgress)*this.currentStep.duration:this.currentStep.direction==u.BACKWARD&&(this.stepStartTime=this.lastTime-(1-this.inverseEasingFunc(this.requestedStepProgress))*this.currentStep.duration)}selectStep(t){this.currentStepIndex=t,this.currentStep=this.steps[this.currentStepIndex]}nextStep(){this.currentStep.state==d.END&&this.currentStepIndex<this.steps.length-1&&(this.selectStep(this.currentStepIndex+1),this.currentStep.init(),this._requestedStepProgress=0)}previousStep(){this.currentStep.state==d.START&&this.currentStepIndex>0&&(this.selectStep(this.currentStepIndex-1),this._requestedStepProgress=1)}fastForward(){this.autoPlay=!0,this.singleForward()}fastBackward(){this.autoPlay=!0,this.singleBackward()}singleForward(){this.nextStep(),this.currentStep.forward(),this.updateStartTime(),this.currentStep.run()}singleBackward(){this.previousStep(),this.currentStep.backward(),this.updateStartTime(),this.currentStep.run()}forward(){this.autoPlay=!1,this.singleForward()}backward(){this.autoPlay=!1,this.singleBackward()}deleteSelected(){this.togglePause(),this.model.deleteSelected()}togglePause(){this.updateStartTime(),this.currentStep.togglePause(),this.currentStep.state==d.STOPPED&&(this.autoPlay=!1)}drawDebug(t){this.fps=1/((t-this.lastTime)/1e3),this.drawText(`fps: ${Math.round(this.fps)} zoom: ${Math.round(this.model.zoom*100)/100} step: ${this.currentStepIndex} prog: ${Math.round(this._requestedStepProgress*100)/100}`,0,10,12,v)}draw(t){this.canvas.width=this._width,this.canvas.height=this._height,this.showDebug&&this.drawDebug(t),this.title&&this.drawText(this.title,20,30,ot,v),this.ctx.translate(this.model.origin.x,this.model.origin.y),this.ctx.scale(this.model.zoom,this.model.zoom),this.ctx.translate(-this.model.origin.x+this.model.offset.x,-this.model.origin.y+this.model.offset.y),this.currentStep&&this.currentStep.direction!=u.NONE&&this.currentStep.state!=d.STOPPED&&(this.updateProgress(),this.handleProgressChange());for(const e of this.model.controls)e.visible&&e.draw(this.ctx);this.lastTime=t,requestAnimationFrame(e=>this.draw(e))}updateProgress(){this.currentStep.direction==u.FORWARD?this._requestedStepProgress=this.easingFunc((this.lastTime-this.stepStartTime)/this.currentStep.duration):this.currentStep.direction==u.BACKWARD&&(this._requestedStepProgress=this.easingFunc((this.currentStep.duration-(this.lastTime-this.stepStartTime))/this.currentStep.duration)),(this._requestedStepProgress<=.001||this._requestedStepProgress>1)&&(this._requestedStepProgress=this._requestedStepProgress<=.001?0:1)}handleProgressChange(){this.currentStep.progress!=this._requestedStepProgress&&(this.currentStep.progress=this._requestedStepProgress,this.autoPlay&&this.handleAutoPlay())}handleAutoPlay(){this.currentStep.state==d.END&&this.currentStepIndex<this.steps.length-1?this.singleForward():this.currentStep.state==d.START&&this.currentStepIndex>0&&this.singleBackward()}getEventLocation(t){return t.touches&&t.touches.length==1?new a(t.touches[0].clientX+window.scrollX-this.marginLeft,t.touches[0].clientY+window.scrollY-this.marginTop):t.clientX&&t.clientY?new a(t.clientX+window.scrollX-this.marginLeft,t.clientY+window.scrollY-this.marginTop):null}drawText(t,e,o,r,h){this.ctx.font=`${r}px ${h}`,this.ctx.fillText(t,e,o)}onPointerDown(t){t.preventDefault(),this.isDragging=!0;let e=this.getEventLocation(t);e!=null&&this.tool.click(new a(e.x/this.model.zoom-this.model.offset.x+this.model.origin.x-this.model.origin.x/this.model.zoom,e.y/this.model.zoom-this.model.offset.y+this.model.origin.y-this.model.origin.y/this.model.zoom))}onPointerUp(){this.isDragging=!1,this.initialPinchDistance=0,this.lastZoom=this.model.zoom}onPointerMove(t){if(t.preventDefault(),this.isDragging){let e=this.getEventLocation(t);this.tool.move(new a(e.x/this.model.zoom+this.model.origin.x-this.model.origin.x/this.model.zoom,e.y/this.model.zoom+this.model.origin.y-this.model.origin.y/this.model.zoom))}}handleTouch(t,e){t.preventDefault(),t.touches.length==1?e.call(this,t):t.type=="touchmove"&&t.touches.length>1&&(this.isDragging=!1,this.handlePinch(t))}handlePinch(t){const e={x:t.touches[0].clientX+window.scrollX-this.marginLeft,y:t.touches[0].clientY+window.scrollY-this.marginTop},o={x:t.touches[1].clientX+window.scrollX-this.marginLeft,y:t.touches[1].clientY+window.scrollY-this.marginTop},r=(e.x-o.x)**2+(e.y-o.y)**2;this.initialPinchDistance==0?this.initialPinchDistance=r:this.adjustZoom(null,r/this.initialPinchDistance)}handleScroll(t){t.preventDefault(),this.adjustZoom(t.deltaY*st,1)}adjustZoom(t,e){this.isDragging||(t?this.model.zoom-=t:e&&(this.model.zoom=e*this.lastZoom),this.model.zoom=Math.min(this.model.zoom,tt),this.model.zoom=Math.max(this.model.zoom,et))}}var i=(n=>(n.MINUS="-",n.PLUS="+",n.COMMA=",",n.COLON=":",n.SEMICOLON=";",n.EQUALS="=",n.LEFT_BRACKET="(",n.RIGHT_BRACKET=")",n.LESS_THAN="<",n.ASTERIX="*",n.GREATER_THAN=">",n.ASSIGN="<-",n.CLONE="*->",n.SWAP="<->",n.MOVE="->",n.IDENTIFIER="IDENTIFIER",n.NUMBER="NUMBER",n.STRING="STRING",n.TRUE="true",n.FALSE="false",n.ID="id",n.TITLE="title",n.TEXT="text",n.DOT="dot",n.DOTS="dots",n.AT="at",n.SIZE="size",n.COLOR="color",n.DATA="data",n.BOX="box",n.STEPS="steps",n.SELECTED="selected",n.VISIBLE="visible",n))(i||{});class pt{constructor(t,e,o){s(this,"position");s(this,"type");s(this,"value");this.position=t,this.type=e,this.value=o||""}}class C{static isKeyword(t){return this.KEYWORDS_MAP.has(t)}static getKeywordByName(t){return this.KEYWORDS_MAP.get(t)}}s(C,"KEYWORDS_MAP",new Map([[i.ID.toString(),i.ID],[i.TRUE.toString(),i.TRUE],[i.FALSE.toString(),i.FALSE],[i.DOT.toString(),i.DOT],[i.DOTS.toString(),i.DOTS],[i.TITLE.toString(),i.TITLE],[i.TEXT.toString(),i.TEXT],[i.BOX.toString(),i.BOX],[i.AT.toString(),i.AT],[i.SIZE.toString(),i.SIZE],[i.COLOR.toString(),i.COLOR],[i.DATA.toString(),i.DATA],[i.STEPS.toString(),i.STEPS],[i.SELECTED.toString(),i.SELECTED],[i.VISIBLE.toString(),i.VISIBLE]])),s(C,"ASSIGN_PROPERTIES",[i.SELECTED,i.TEXT,i.VISIBLE,i.STRING]);class ft{constructor(){s(this,"start",0);s(this,"position",0);s(this,"line",1);s(this,"tokens",[]);s(this,"source","")}scan(t){for(this.source=t;this.position<t.length;){const e=this.advance();switch(e){case" ":case"\r":break;case`
`:this.line++;break;case"	":break;case"(":this.addToken(i.LEFT_BRACKET);break;case")":this.addToken(i.RIGHT_BRACKET);break;case":":break;case",":this.addToken(i.COMMA);break;case"<":this.matchSwap()||this.addToken(i.LESS_THAN);break;case"*":this.matchClone()||this.addToken(i.ASTERIX);break;case"+":this.addToken(i.PLUS);break;case"-":this.match(">")?this.addToken(i.MOVE):this.addToken(i.MINUS);break;case"=":this.addToken(i.EQUALS);break;case">":this.addToken(i.GREATER_THAN);break;case"/":if(this.match("/"))for(;this.peek()!=`
`&&!this.isAtEnd();)this.advance();break;case"'":this.string();break;default:if(this.isDigit(e))this.number();else if(this.isAlpha(e))this.identifier();else throw new Error(`line: ${this.line} Unexpected character ${e} charcode: ${e.charCodeAt(0)}`)}this.start=this.position}return this.tokens}matchSwap(){return this.match("-")?this.match(">")?(this.addToken(i.SWAP),!0):(this.addToken(i.ASSIGN),!0):!1}matchClone(){return this.match("-")&&this.match(">")?(this.addToken(i.CLONE),!0):!1}addToken(t){this.addTokenValue(t)}addTokenValue(t,e){this.tokens.push(new pt(this.start,t,e))}advance(){return this.source.charAt(this.position++)}isAtEnd(){return this.position>=this.source.length}peek(){return this.isAtEnd()?"\0":this.source.charAt(this.position)}match(t){return this.isAtEnd()||this.source.charAt(this.position)!=t?!1:(this.position++,!0)}isDigit(t){return t>="0"&&t<="9"}isDigitOrDot(t){return this.isDigit(t)||t=="."}number(){for(;this.isDigitOrDot(this.peek());)this.advance();let t=this.source.substring(this.start,this.position);this.addTokenValue(i.NUMBER,t)}isAlpha(t){return/[\p{Letter}\p{Mark}]+/gu.test(t)||t=="_"}isAlphanumeric(t){return this.isAlpha(t)||this.isDigit(t)}string(){for(;this.peek()!="'"&&!this.isAtEnd();)this.peek()==`
`&&this.line++,this.advance();if(this.isAtEnd())throw new Error(`line: ${this.line} Unterminated String`);this.advance();let t=this.source.substring(this.start+1,this.position-1);this.addTokenValue(i.STRING,t)}identifier(){for(;this.isAlphanumeric(this.peek());)this.advance();let t=this.source.substring(this.start,this.position);const e=C.isKeyword(t)?C.getKeywordByName(t):i.IDENTIFIER;this.addTokenValue(e,t)}}class k{constructor(t){s(this,"model");this.model=t}init(){}onBeforeForward(){}onAfterBackward(){}}class X{constructor(){s(this,"id");s(this,"position");s(this,"selected",!1);s(this,"visible",!0);this.id="dummy",this.position=a.zero()}clone(){return new X}draw(t){console.log(`dummy draw on ${t}`)}hitTest(t){return!1}}const m=new X;class gt extends k{constructor(e,o,r,h=""){super(e);s(this,"start");s(this,"to");s(this,"end");s(this,"left",m);s(this,"right",m);s(this,"leftId");s(this,"rightId","");this.start=a.zero(),this.to=r,this.end=r,this.leftId=o,this.rightId=h}init(){super.init(),this.selectControls()}selectControls(){const e=this.model.findControl(this.leftId);if(e?(this.left=e,this.start=this.left.position.clone(),this.end=this.calculateEnd(this.start,this.to)):this.left=m,this.rightId!==""){const o=this.model.findControl(this.rightId);o&&(this.right=o,this.end=this.right.position.clone())}}onBeforeForward(){super.onBeforeForward(),this.selectControls()}calculateEnd(e,o){return o.sign==g.NONE?new a(o.x,o.y):o.sign==g.PLUS?new a(e.x+o.x,e.y+o.y):new a(e.x-o.x,e.y-o.y)}updateValue(e){e==0?(this.left.position.x=this.start.x,this.left.position.y=this.start.y):e==1?(this.left.position.x=this.end.x,this.left.position.y=this.end.y):(this.left.position.x=this.start.x+(this.end.x-this.start.x)*e,this.left.position.y=this.start.y+(this.end.y-this.start.y)*e)}}class mt extends k{constructor(e,o,r){super(e);s(this,"left",m);s(this,"right",m);s(this,"start");s(this,"end");s(this,"leftControlId");s(this,"rightControlId");this.start=a.zero(),this.end=a.zero(),this.leftControlId=o,this.rightControlId=r}init(){super.init(),this.selectControls()}onBeforeForward(){super.onBeforeForward(),this.selectControls()}selectControls(){const e=this.model.findControl(this.leftControlId);this.left=e||m;const o=this.model.findControl(this.rightControlId);this.right=o||m,this.start=this.left.position.clone(),this.end=this.right.position.clone()}updateValue(e){if(e==0)this.left.position.x=this.start.x,this.left.position.y=this.start.y,this.right.position.x=this.end.x,this.right.position.y=this.end.y;else if(e==1)this.left.position.x=this.end.x,this.left.position.y=this.end.y,this.right.position.x=this.start.x,this.right.position.y=this.start.y;else{const o=(this.end.x-this.start.x)*e,r=(this.end.y-this.start.y)*e;this.right.position.x=this.end.x-o,this.right.position.y=this.end.y-r,this.left.position.x=this.start.x+o,this.left.position.y=this.start.y+r}}}class Et extends k{constructor(e,o,r){super(e);s(this,"left",m);s(this,"right",m);s(this,"leftControlId");s(this,"rightControlId");s(this,"isAdded");this.isAdded=!1,this.leftControlId=o,this.rightControlId=r}init(){super.init();const e=this.model.findControl(this.leftControlId);e?(this.left=e,this.cloneAndAddControl()):this.left=m}cloneAndAddControl(){this.isAdded||(this.right=this.left.clone(),this.right.id=this.rightControlId,this.model.controls.push(this.right),this.isAdded=!0)}onBeforeForward(){super.onBeforeForward(),this.cloneAndAddControl()}onAfterBackward(){super.onAfterBackward(),this.destroyControls()}destroyControls(){if(this.isAdded){const e=this.model.controls.indexOf(this.right);e>-1&&(this.model.controls.splice(e,1),this.isAdded=!1)}}updateValue(e){}}class F{constructor(t,e){s(this,"controlId");s(this,"propertyChanges");this.controlId=t,this.propertyChanges=e}}class St{constructor(t,e,o){s(this,"property");s(this,"newValue");s(this,"oldValue");this.property=t,this.newValue=e,this.oldValue=o}}class wt extends k{constructor(e,o,r){super(e);s(this,"control",m);s(this,"controlId");s(this,"properties");s(this,"change");s(this,"applied",!1);this.controlId=o,this.change=new F(this.controlId,[]),this.properties=r}init(){super.init(),this.selectControls()}selectControls(){this.control=this.model.findControl(this.controlId)}onBeforeForward(){super.onBeforeForward(),this.selectControls(),this.applyChanges()}onAfterBackward(){super.onAfterBackward(),this.revertChanges()}applyChanges(){if(!this.applied&&this.control){this.applied=!0;let e=this.control,o=[];for(const r of this.properties.keys()){const h=e[r],l=this.properties.get(r);e[r]=l,o.push(new St(r,l,h))}this.change=new F(this.controlId,o)}}revertChanges(){if(this.applied&&this.control){this.applied=!1;let e=this.control;for(const o of this.change.propertyChanges)e[o.property]=o.oldValue;this.change=new F(this.controlId,[])}}updateValue(e){}}class It extends k{constructor(e,o){super(e);s(this,"start",a.zero());s(this,"to",new a(100,100));s(this,"leftId","");this.to=o}init(){super.init(),this.start=this.model.offset.clone()}updateValue(e){this.model.offset.x=this.start.x-this.to.x*e,this.model.offset.y=this.start.y-this.to.y*e}}class L{constructor(){s(this,"scanner",new ft);s(this,"model",L.newModel());s(this,"position",0);s(this,"tokens",[])}static newModel(){return new y("",[],[])}eof(){return this.tokens.length<=this.position}advance(){return this.tokens[this.position++]}peek(){return this.tokens[this.position]}parse(t){for(this.model=L.newModel(),this.tokens=this.scanner.scan(t);this.position<this.tokens.length;)switch(this.advance().type){case i.TITLE:this.title();break;case i.BOX:this.box();break;case i.DOT:this.dot();break;case i.STEPS:this.steps();break}return this.model}box(){const t=[i.ID,i.SIZE,i.AT,i.TEXT,i.COLOR,i.VISIBLE,i.SELECTED];let e=new a(100,100),o=new a(0,0),r="",h=null,l=w,p=!0,E=!1;for(;t.includes(this.peek().type);)switch(this.advance().type){case i.ID:h=this.controlId();break;case i.TEXT:r=this.text();break;case i.AT:o=this.at();break;case i.SIZE:e=this.point();break;case i.COLOR:l=this.color();break;case i.VISIBLE:p=this.visible();break;case i.SELECTED:E=this.selected();break}h==null&&r==""&&(h="b"+this.model.controls.length);const c=new b(h??r,o,e,l,r,p,E);this.model.controls.push(c),c.selected&&this.model.selectedControls.push(c)}dot(){const t=[i.ID,i.SIZE,i.AT,i.TEXT,i.COLOR,i.VISIBLE,i.SELECTED];let e=20,o=new a(0,0),r="",h="",l=O[this.model.controls.length%O.length],p=!0,E=!1;for(;t.includes(this.peek().type);)switch(this.advance().type){case i.ID:h=this.controlId();break;case i.TEXT:r=this.text();break;case i.COLOR:l=this.color();break;case i.AT:o=this.at();break;case i.SIZE:e=this.number();break;case i.VISIBLE:p=this.visible();break;case i.SELECTED:E=this.selected();break}h==""&&r==""&&(h="d"+this.model.controls.length);const c=new D(h!=""?h:r,o,e,l,r!=""?r:h,p,E);this.model.controls.push(c),c.selected&&this.model.selectedControls.push(c)}text(){if(this.peek().type==i.STRING)return this.advance().value;let t="";for(;this.peek().type==i.IDENTIFIER;){const e=this.advance();t+=" "+e.value.toString()}return t.trim()}color(){let t="";if(this.peek().type==i.IDENTIFIER){let e=this.advance();if(t+=e.value,this.match(i.LEFT_BRACKET)){for(t+="(",t+=this.number().toString();this.match(i.COMMA);)t+=",",t+=this.number().toString();if(this.match(i.RIGHT_BRACKET))t+=")";else throw new Error(`Expected closing bracket at ${this.peek().position} got token ${this.peek().value} instead`)}}return t}at(){return this.point()}number(){let t,e=this.peek();if(t=e.type==i.MINUS,t&&this.advance(),e=this.advance(),e.type==i.NUMBER){let o=e.value.includes(".")?parseFloat(e.value):parseInt(e.value,10);return t?-o:o}else throw new Error(`Expected number at position: ${e.position} got token ${e.value} instead`)}title(){this.model.title=this.text()}steps(){let t=new z,e=this.action();for(;e!=null;)t.actions.push(e),this.match(i.COMMA)||(this.model.steps.push(t),t=new z),e=this.action();t.actions.length>0&&this.model.steps.push(t)}action(){if(this.eof())return null;let t=this.controlId(),e=this.peek();switch(e.type){case i.ASSIGN:return this.assign(t);case i.MOVE:return this.move(t);case i.SWAP:return this.swap(t);case i.CLONE:if(this.advance(),e=this.peek(),e.type==i.IDENTIFIER)return this.advance(),new Et(this.model,t,e.value);break}return null}controlId(){let t=this.advance();if(t.type==i.IDENTIFIER||t.type==i.STRING||t.type==i.NUMBER)return t.value;throw new Error(`Expected control identifier at ${t.position} got ${t.value} instead`)}move(t){this.advance();let e=a.zero(),o="";if(this.pointInBracketsAhead()?e=this.point():(o=this.peek().value,this.advance()),t=="camera"){if(e.sign==g.NONE)throw new Error("Only relative move for camera is currently supported");return new It(this.model,e)}return new gt(this.model,t,e,o)}pointInBracketsAhead(){const t=this.peek();return t.type==i.PLUS||t.type==i.MINUS||t.type==i.LEFT_BRACKET}assign(t){this.advance();let e=this.peek(),o=new Map;for(;!this.eof()&&C.ASSIGN_PROPERTIES.includes(e.type);){let r="";e.type==i.STRING?r="text":(this.advance(),r=e.type.toString());const h=this.peek();let l;h.type==i.TRUE||h.type==i.FALSE?l=this.boolean():l=h.value,o.set(r,l),this.advance(),e=this.peek()}return new wt(this.model,t,o)}visible(){return this.boolean()}selected(){return this.boolean()}boolean(){const t=this.peek();switch(t.type){case i.TRUE:return!0;case i.FALSE:return!1;default:throw new Error(`Expected boolean value: ${t.position} got token ${t.value} instead`)}}swap(t){this.advance();const o=this.peek().value;return this.advance(),new mt(this.model,t,o)}plus(){return this.match(i.PLUS)}minus(){return this.match(i.MINUS)}sign(){let t=g.NONE;return this.plus()&&(t=g.PLUS),this.minus()&&(t=g.MINUS),t}point(){let t=this.sign();const e=this.match(i.LEFT_BRACKET);let o=this.number();t==g.MINUS&&!e&&(o=-o);let r=this.advance();if(r.type!=i.COMMA)throw new Error(`Expected comma at position: ${r.position} got token ${r} instead`);let h=this.number();if(e&&!this.match(i.RIGHT_BRACKET))throw new Error(`Expected right bracket at position: ${r.position} got token ${r} instead`);return new a(o,h,t)}match(t){return this.eof()||this.peek().type!=t?!1:(this.position++,!0)}error(t){throw new Error(t)}}const $="style",G="color",K="border",Z="code",xt="width",At="height",H="debug",W="experimental",q="controls",V="autoplay",Y="keyboard";class R extends HTMLElement{constructor(){super(...arguments);s(this,"dotsAndBoxes");s(this,"_code","");s(this,"color","white");s(this,"debug",!1);s(this,"border","1px solid #ccc");s(this,"defaultWidth",100);s(this,"defaultHeight",100);s(this,"showControls",!1);s(this,"experimental",!1);s(this,"autoplay",!1);s(this,"canvas");s(this,"keyboard",!1);s(this,"keyboardHandlerLambda",e=>this.handleKeyDown(e))}get code(){return this._code}reset(){this._code&&this.dotsAndBoxes&&(this.updateCanvasStyle(this.canvas),this.applyCode(),this.dotsAndBoxes.showDebug=this.debug,this.dotsAndBoxes.updatePositionAndSize(new a(this.offsetLeft,this.offsetTop)),this.dotsAndBoxes.draw(0))}applyCode(){const e=new L().parse(this._code);this.dotsAndBoxes.apply(e)}connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>
        :host { display: block; padding: 0;border: ${this.border};}
        #controls-menu {    
          position: relative;   
          height: 24px;
          left: 0;       
          top: -26px;
          overflow:hidden;
          background-color: white;
          background-color:  rgba(243,243,243,0.7);
          display: ${this.showControls?"flex":"none"};
          align-items: center;
        }        
        #controls-menu button {
         color:  rgba(23,23,23,0.7);
         background-color: transparent;
         font-size: 18px;        
         height: 22px;
         width: 24px;
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
    `,this.buildControls(e.getElementById("controls-menu")),this.canvas=this.getCanvas(e),this.dotsAndBoxes=new ut(this.canvas),this.reset(),this.autoplay&&this.fastForward()}getCanvas(e){return e.getElementById("canvas")}updateCanvasStyle(e){e.width=this.offsetWidth?this.offsetWidth-2:this.defaultWidth,e.height=this.offsetHeight?this.offsetHeight-2:this.defaultHeight,e.style.background=this.color,e.style.padding="0",e.style.margin="0",e.style.overflow="hidden",e.style.userSelect="none"}updateControls(){const e=this.shadowRoot.getElementById("controls-menu");e.style.display=this.showControls?"block":"none"}buildControls(e){const o=document.createElement("button");o.onclick=c=>this.dotsAndBoxes.fastBackward(),o.textContent="⏴⏴",e.append(o);const r=document.createElement("button");r.onclick=c=>this.dotsAndBoxes.backward(),r.textContent="⏴",e.append(r);const h=document.createElement("button");h.onclick=c=>this.dotsAndBoxes.togglePause(),h.textContent="■",e.append(h);const l=document.createElement("button");l.onclick=c=>this.forward(),l.append("⏵"),e.append(l);const p=document.createElement("button");p.onclick=c=>this.dotsAndBoxes.fastForward(),p.append("⏵⏵"),e.append(p);const E=document.createElement("button");if(E.onclick=c=>this.reset(),E.append("↺"),e.append(E),this.experimental){const c=document.createElement("button");c.onclick=x=>this.dotsAndBoxes.selectTool(this.dotsAndBoxes.PAN_ZOOM_TOOL),c.append("☩"),e.append(c);const S=document.createElement("input");S.type="range",S.min="0",S.max="1",S.step="0.01",S.value="0",S.oninput=x=>{this.dotsAndBoxes.requestedStepProgress=parseFloat(x.target.value)},e.append(S);const N=document.createElement("button");N.onclick=x=>this.dotsAndBoxes.selectTool(this.dotsAndBoxes.DOT_TOOL),N.append("❍"),e.append(N);const _=document.createElement("button");_.onclick=x=>this.dotsAndBoxes.selectTool(this.dotsAndBoxes.BOX_TOOL),_.append("◻"),e.append(_);const M=document.createElement("button");M.onclick=x=>console.log(this.dotsAndBoxes.model),M.append("m"),e.append(M)}}updateKeyboardHandler(){this.keyboard?document.addEventListener("keydown",this.keyboardHandlerLambda):document.removeEventListener("keydown",this.keyboardHandlerLambda)}handleKeyDown(e){e.key==="ArrowLeft"?this.dotsAndBoxes.backward():e.key==="ArrowRight"?this.dotsAndBoxes.forward():e.key==="Delete"&&this.dotsAndBoxes.deleteSelected()}forward(){this.dotsAndBoxes.forward()}fastForward(){this.dotsAndBoxes.fastForward()}backward(){this.dotsAndBoxes.backward()}fastBackward(){this.dotsAndBoxes.fastBackward()}resize(){this.canvas&&(this.updateCanvasStyle(this.canvas),this.dotsAndBoxes.updatePositionAndSize(new a(this.offsetLeft,this.offsetTop)))}disconnectedCallback(){console.log("Custom element removed from page.")}adoptedCallback(){console.log("Custom element moved to new page.")}attributeChangedCallback(e,o,r){switch(e){case $:this.resize();break;case Z:this._code=r,this.dotsAndBoxes&&this.applyCode();break;case G:this.color=r;break;case K:this.border=r;break;case q:this.showControls=r!=null,this.dotsAndBoxes&&this.updateControls();break;case W:this.experimental=r!=null,this.dotsAndBoxes&&this.updateControls();break;case Y:this.keyboard=r!=null,this.updateKeyboardHandler();break;case V:this.autoplay=r!=null,this.dotsAndBoxes&&this.fastForward();break;case H:this.debug=r!=null,this.dotsAndBoxes&&(this.dotsAndBoxes.showDebug=this.debug);break;default:console.log(e,o,r)}}}s(R,"ELEM_NAME","dots-and-boxes"),s(R,"observedAttributes",[$,G,K,Z,xt,At,H,W,q,V,Y]);customElements.define(R.ELEM_NAME,R);
