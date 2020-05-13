!function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(s,o,function(e){return t[e]}.bind(null,o));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class s{constructor(t,...e){this.body=e,this.direction=t,this.ateApple=!1}advance(){const t=this.body[0].slice();switch(this.direction){case"left":t[0]--;break;case"right":t[0]++;break;case"up":t[1]--;break;case"down":t[1]++;break;default:throw"Invalid direction"}this.body.unshift(t),this.ateApple?this.ateApple=!1:this.body.pop()}setDirection(t){let e;switch(this.direction){case"left":case"right":e=["up","down"];break;case"up":case"down":e=["left","right"];break;default:throw"Invalid direction"}e.includes(t)&&(this.direction=t)}checkCollision(t,e){let i=!1,s=!1;const[o,...n]=this.body,[a,r]=o;(a<0||a>t-1||(r<0||r>e-1))&&(i=!0);for(let t of n)a===t[0]&&r===t[1]&&(s=!0);return i||s}isEatingeApple(t){const e=this.body[0];return e[0]===t.position[0]&&e[1]===t.position[1]&&(this.ateApple=!0,!0)}}class o{constructor(t=[10,10]){this.position=t}setNewPosition(t,e){const i=Math.round(Math.random()*t-1),s=Math.round(Math.random()*e-1);console.log(this.position),this.position=[i,s],console.log(this.position)}isOnSnake(t){let e=!1;for(let i of t.body)this.position[0]===i[0]&&this.position[1]===i[1]&&(e=!0);return e}}class n{static gameOver(t,e,i){t.save(),t.font="bold 70px sans-serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle",t.strokeStyle="white",t.lineWidth=5,t.strokeText("Game over",e,i-180),t.fillText("Game over",e,i-180),t.font="bold 30px sans-serif",t.strokeText("Appuyer sur la touche Espace pour rejouer ",e,i-120),t.fillText("Appuyer sur la touche Espace pour rejouer ",e,i-120),t.restore()}static drawScore(t,e,i,s){t.save(),t.font="bold 200px sans-serif",t.fillStyle="gray",t.textAlign="center",t.textBaseline="middle",t.fillText(s.toString(),e,i),t.restore()}static drawBlock(t,e,i){const[s,o]=e;t.fillRect(s*i,o*i,i,i)}static drawSnack(t,e,i){t.save(),t.fillStyle="#ff0000";for(let s of i.body)this.drawBlock(t,s,e);t.restore()}static drawApple(t,e,i){const s=e/2,o=i.position[0]*e+s,n=i.position[1]*e+s;t.save(),t.fillStyle="#33cc33",t.beginPath(),t.arc(o,n,s,0,2*Math.PI,!0),t.fill(),t.restore()}}class a{constructor(t=900,e=600){this.canvasWidth=t,this.canvasHeight=e,this.blockSize=30,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.blockWidth=this.canvasWidth/this.blockSize,this.blockHeight=this.canvasHeight/this.blockSize,this.xCenter=this.canvasWidth/2,this.yCenter=this.canvasHeight/2,this.delay,this.snaky,this.apple,this.score,this.timeOut}init(){this.canvas.width=this.canvasWidth,this.canvas.height=this.canvasHeight,this.canvas.style.border="30px solid grey",this.canvas.style.margin="50px auto",this.canvas.style.display="block",this.canvas.style.backgroundColor="#ddd",document.body.appendChild(this.canvas),this.launch()}launch(){this.snaky=new s("right",[5,4],[4,4],[3,4],[2,4]),this.apple=new o,this.score=0,this.delay=100,clearTimeout(this.timeOut),this.refreshCanvas()}refreshCanvas(){if(this.snaky.advance(),this.snaky.checkCollision(this.blockWidth,this.blockHeight))n.gameOver(this.ctx,this.xCenter,this.yCenter);else{if(this.snaky.isEatingeApple(this.apple)){this.score++;do{this.apple.setNewPosition(this.blockWidth,this.blockHeight)}while(this.apple.isOnSnake(this.snaky));this.score%5==0&&0!=this.score&&(this.delay/=2)}this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight),n.drawScore(this.ctx,this.xCenter,this.yCenter,this.score),n.drawSnack(this.ctx,this.blockSize,this.snaky),n.drawApple(this.ctx,this.blockSize,this.apple),this.timeOut=setTimeout(this.refreshCanvas.bind(this),this.delay)}}}window.onload=()=>{let t=new a;t.init(),document.onkeydown=e=>{let i;switch(e.keyCode){case 32:return void t.launch();case 37:i="left";break;case 38:i="up";break;case 39:i="right";break;case 40:i="down";break;default:return}console.log("newDirection : "+i),t.snaky.setDirection(i)}}}]);