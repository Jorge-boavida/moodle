/*
YUI 3.4.1 (build 4118)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("graphics-svg",function(b){var i="svgShape",c=b.Lang,g=b.AttributeLite,d,l,f,h,k,e,j,m=b.config.doc;function a(){}a.prototype={_type:"path",curveTo:function(s,q,z,w,v,u){var o,t,r,n,p,A;if(this._pathType!=="C"){this._pathType="C";t=["C"];this._pathArray.push(t);}else{t=this._pathArray[Math.max(0,this._pathArray.length-1)];if(!t){t=[];this._pathArray.push(t);}}o=this._pathArray.length-1;this._pathArray[o]=this._pathArray[o].concat([Math.round(s),Math.round(q),Math.round(z),Math.round(w),v,u]);r=Math.max(v,Math.max(s,z));p=Math.max(u,Math.max(q,w));n=Math.min(v,Math.min(s,z));A=Math.min(u,Math.min(q,w));this._trackSize(r,p);this._trackSize(n,A);},quadraticCurveTo:function(s,r,v,u){var o,t,q,n,p,w;if(this._pathType!=="Q"){this._pathType="Q";t=["Q"];this._pathArray.push(t);}else{t=this._pathArray[Math.max(0,this._pathArray.length-1)];if(!t){t=[];this._pathArray.push(t);}}o=this._pathArray.length-1;this._pathArray[o]=this._pathArray[o].concat([Math.round(s),Math.round(r),Math.round(v),Math.round(u)]);q=Math.max(v,s);p=Math.max(u,r);n=Math.min(v,s);w=Math.min(u,r);this._trackSize(q,p);this._trackSize(n,w);},drawRect:function(n,q,o,p){this.moveTo(n,q);this.lineTo(n+o,q);this.lineTo(n+o,q+p);this.lineTo(n,q+p);this.lineTo(n,q);},drawRoundRect:function(n,s,o,q,p,r){this.moveTo(n,s+r);this.lineTo(n,s+q-r);this.quadraticCurveTo(n,s+q,n+p,s+q);this.lineTo(n+o-p,s+q);this.quadraticCurveTo(n+o,s+q,n+o,s+q-r);this.lineTo(n+o,s+r);this.quadraticCurveTo(n+o,s,n+o-p,s);this.lineTo(n+p,s);this.quadraticCurveTo(n,s,n,s+r);},drawWedge:function(A,v,F,u,q,r){var E,D,t,J,s,B,z,I,H,p,o,G=0,w=q*2,n,C;r=r||q;if(this._pathType!="M"){this._pathType="M";n=["M"];this._pathArray.push(n);}else{n=this._getCurrentArray();}C=this._pathArray.length-1;this._pathArray[C].push(A);this._pathArray[C].push(A);if(Math.abs(u)>360){u=360;}E=Math.ceil(Math.abs(u)/45);D=u/E;t=-(D/180)*Math.PI;J=(F/180)*Math.PI;if(E>0){B=A+Math.cos(F/180*Math.PI)*q;z=v+Math.sin(F/180*Math.PI)*r;this._pathType="L";C++;this._pathArray[C]=["L"];this._pathArray[C].push(Math.round(B));this._pathArray[C].push(Math.round(z));C++;this._pathType="Q";this._pathArray[C]=["Q"];for(;G<E;++G){J+=t;s=J-(t/2);I=A+Math.cos(J)*q;H=v+Math.sin(J)*r;p=A+Math.cos(s)*(q/Math.cos(t/2));o=v+Math.sin(s)*(r/Math.cos(t/2));this._pathArray[C].push(Math.round(p));this._pathArray[C].push(Math.round(o));this._pathArray[C].push(Math.round(I));this._pathArray[C].push(Math.round(H));}}this._trackSize(w,w);return this;},lineTo:function(s,r,p){var o=arguments,q,n,u,t;this._pathArray=this._pathArray||[];if(typeof s==="string"||typeof s==="number"){o=[[s,r]];}n=o.length;this._shapeType="path";if(this._pathType!=="L"){this._pathType="L";t=["L"];this._pathArray.push(t);}else{t=this._getCurrentArray();}u=this._pathArray.length-1;for(q=0;q<n;++q){this._pathArray[u].push(o[q][0]);this._pathArray[u].push(o[q][1]);this._trackSize.apply(this,o[q]);}},_getCurrentArray:function(){var n=this._pathArray[Math.max(0,this._pathArray.length-1)];if(!n){n=[];this._pathArray.push(n);}return n;},moveTo:function(n,q){var p,o;this._pathArray=this._pathArray||[];if(this._pathType!="M"){this._pathType="M";o=["M"];this._pathArray.push(o);}else{o=this._getCurrentArray();}p=this._pathArray.length-1;this._pathArray[p]=this._pathArray[p].concat([n,q]);this._trackSize(n,q);},end:function(){this._closePath();this._graphic.addToRedrawQueue(this);},clear:function(){this._left=0;this._right=0;this._top=0;this._bottom=0;this._pathArray=[];this._path="";},_closePath:function(){var o,s,n,v,p,u,t,y="",r=this.node,q=this._left,w=this._top,x=this.get("fill");if(this._pathArray){o=this._pathArray.concat();while(o&&o.length>0){s=o.shift();v=s.length;n=s[0];y+=" "+n+(s[1]-q);switch(n){case"L":case"M":case"Q":for(t=2;t<v;++t){p=(t%2===0)?w:q;p=s[t]-p;y+=", "+p;}break;case"C":for(t=2;t<v;++t){p=(t%2===0)?w:q;u=s[t];u-=p;y+=" "+u;}break;}}if(x&&x.color){y+="z";}if(y){r.setAttribute("d",y);}this._path=y;this._fillChangeHandler();this._strokeChangeHandler();this._updateTransform();}},_trackSize:function(n,o){if(n>this._right){this._right=n;}if(n<this._left){this._left=n;}if(o<this._top){this._top=o;}if(o>this._bottom){this._bottom=o;}this._width=this._right-this._left;this._height=this._bottom-this._top;}};b.SVGDrawing=a;l=function(n){this._transforms=[];this.matrix=new b.Matrix();l.superclass.constructor.apply(this,arguments);};l.NAME="svgShape";b.extend(l,b.BaseGraphic,b.mix({init:function(){this.initializer.apply(this,arguments);},initializer:function(n){var o=this;o.createNode();o._graphic=n.graphic;o._updateHandler();},addClass:function(n){var o=this.node;o.className.baseVal=c.trim([o.className.baseVal,n].join(" "));},removeClass:function(n){var o=this.node,p=o.className.baseVal;p=p.replace(new RegExp(n+" "),n).replace(new RegExp(n),"");o.className.baseVal=p;},getXY:function(){var q=this._graphic,o=q.getXY(),n=this.get("x"),p=this.get("y");return[o[0]+n,o[1]+p];},setXY:function(o){var p=this._graphic,n=p.getXY();this.set("x",o[0]-n[0]);this.set("y",o[1]-n[1]);},contains:function(n){return n===b.one(this.node);},compareTo:function(n){var o=this.node;return o===n;},test:function(n){return b.Selector.test(this.node,n);},_getDefaultFill:function(){return{type:"solid",opacity:1,cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5};},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1};},createNode:function(){var n=m.createElementNS("http://www.w3.org/2000/svg","svg:"+this._type),p=this.get("id"),o=this.get("pointerEvents");this.node=n;this.addClass("yui3-"+i+" yui3-"+this.name);if(p){n.setAttribute("id",p);}if(o){n.setAttribute("pointer-events",o);}},on:function(o,n){if(b.Node.DOM_EVENTS[o]){return b.one("#"+this.get("id")).on(o,n);}return b.on.apply(this,arguments);},_strokeChangeHandler:function(s){var q=this.node,r=this.get("stroke"),p,n,t,o;if(r&&r.weight&&r.weight>0){o=r.linejoin||"round";p=parseFloat(r.opacity);n=r.dashstyle||"none";t=c.isArray(n)?n.toString():n;r.color=r.color||"#000000";r.weight=r.weight||1;r.opacity=c.isNumber(p)?p:1;
r.linecap=r.linecap||"butt";q.setAttribute("stroke-dasharray",t);q.setAttribute("stroke",r.color);q.setAttribute("stroke-linecap",r.linecap);q.setAttribute("stroke-width",r.weight);q.setAttribute("stroke-opacity",r.opacity);if(o=="round"||o=="bevel"){q.setAttribute("stroke-linejoin",o);}else{o=parseInt(o,10);if(c.isNumber(o)){q.setAttribute("stroke-miterlimit",Math.max(o,1));q.setAttribute("stroke-linejoin","miter");}}}else{q.setAttribute("stroke","none");}},_fillChangeHandler:function(r){var p=this.node,q=this.get("fill"),n,o;if(q){o=q.type;if(o=="linear"||o=="radial"){this._setGradientFill(q);p.setAttribute("fill","url(#grad"+this.get("id")+")");}else{if(!q.color){p.setAttribute("fill","none");}else{n=parseFloat(q.opacity);n=c.isNumber(n)?n:1;p.setAttribute("fill",q.color);p.setAttribute("fill-opacity",n);}}}else{p.setAttribute("fill","none");}},_setGradientFill:function(L){var y,u,K,G,D=c.isNumber,C=this._graphic,v=L.type,J=C.getGradientNode("grad"+this.get("id"),v),z=L.stops,A=this.get("width"),P=this.get("height"),I=L.rotation,x=Math.PI/180,F=parseFloat(parseFloat(Math.tan(I*x)).toFixed(8)),M,O,B,H,Q="0%",N="100%",s="0%",o="0%",q=L.cx,n=L.cy,t=L.fx,p=L.fy,E=L.r;if(v=="linear"){q=A/2;n=P/2;if(Math.abs(F)*A/2>=P/2){if(I<180){s=0;o=P;}else{s=P;o=0;}Q=q-((n-s)/F);N=q-((n-o)/F);}else{if(I>90&&I<270){Q=A;N=0;}else{Q=0;N=A;}s=((F*(q-Q))-n)*-1;o=((F*(q-N))-n)*-1;}J.setAttribute("spreadMethod","pad");J.setAttribute("width",A);J.setAttribute("height",P);J.setAttribute("x1",Math.round(100*Q/A)+"%");J.setAttribute("y1",Math.round(100*s/P)+"%");J.setAttribute("x2",Math.round(100*N/A)+"%");J.setAttribute("y2",Math.round(100*o/P)+"%");}else{J.setAttribute("cx",(q*100)+"%");J.setAttribute("cy",(n*100)+"%");J.setAttribute("fx",(t*100)+"%");J.setAttribute("fy",(p*100)+"%");J.setAttribute("r",(E*100)+"%");}O=z.length;B=0;for(M=0;M<O;++M){H=z[M];u=H.opacity;K=H.color;y=H.offset||M/(O-1);y=Math.round(y*100)+"%";u=D(u)?u:1;u=Math.max(0,Math.min(1,u));B=(M+1)/O;G=C._createGraphicNode("stop");G.setAttribute("offset",y);G.setAttribute("stop-color",K);G.setAttribute("stop-opacity",u);J.appendChild(G);}},set:function(){var n=this;g.prototype.set.apply(n,arguments);if(n.initialized){n._updateHandler();}},translate:function(n,o){this._translateX+=n;this._translateY+=o;this._addTransform("translate",arguments);},translateX:function(n){this._translateX+=n;this._addTransform("translateX",arguments);},translateY:function(n){this._translateY+=n;this._addTransform("translateY",arguments);},skew:function(n,o){this._addTransform("skew",arguments);},skewX:function(n){this._addTransform("skewX",arguments);},skewY:function(n){this._addTransform("skewY",arguments);},_rotation:0,rotate:function(n){this._rotation=n;this._addTransform("rotate",arguments);},scale:function(n,o){this._addTransform("scale",arguments);},_addTransform:function(o,n){n=b.Array(n);this._transform=c.trim(this._transform+" "+o+"("+n.join(", ")+")");n.unshift(o);this._transforms.push(n);if(this.initialized){this._updateTransform();}},_updateTransform:function(){var u=this._type=="path",o=this.node,A,n,q,z,v,s,p,w=this.matrix,r=0,t=this._transforms.length;if(u||(this._transforms&&this._transforms.length>0)){z=this.get("x");v=this.get("y");if(u){z+=this._left;v+=this._top;w.init({dx:z,dy:v});z=0;v=0;}for(;r<t;++r){A=this._transforms[r].shift();if(A){if(A=="rotate"||A=="scale"){q=this.get("transformOrigin");s=z+(q[0]*this.get("width"));p=v+(q[1]*this.get("height"));w.translate(s,p);w[A].apply(w,this._transforms[r]);w.translate(0-s,0-p);}else{w[A].apply(w,this._transforms[r]);}}if(u){this._transforms[r].unshift(A);}}n="matrix("+w.a+","+w.b+","+w.c+","+w.d+","+w.dx+","+w.dy+")";}this._graphic.addToRedrawQueue(this);if(n){o.setAttribute("transform",n);}if(!u){this._transforms=[];}},_draw:function(){var n=this.node;n.setAttribute("width",this.get("width"));n.setAttribute("height",this.get("height"));n.setAttribute("x",this.get("x"));n.setAttribute("y",this.get("y"));n.style.left=this.get("x")+"px";n.style.top=this.get("y")+"px";this._fillChangeHandler();this._strokeChangeHandler();this._updateTransform();},_updateHandler:function(n){this._draw();},_translateX:0,_translateY:0,_transform:"",getBounds:function(){var s=this._type,n,u={},D=this.matrix,M=D.a,L=D.b,K=D.c,I=D.d,A=D.dx,y=D.dy,z=this.get("width"),G=this.get("height"),t=s=="path"?0:this.get("x"),B=s=="path"?0:this.get("y"),J=t+z,x=B+G,v=this.get("stroke"),H=(M*t+K*B+A),r=(L*t+I*B+y),F=(M*J+K*B+A),q=(L*J+I*B+y),E=(M*t+K*x+A),p=(L*t+I*x+y),C=(M*J+K*x+A),o=(L*J+I*x+y);u.left=Math.min(E,Math.min(H,Math.min(F,C)));u.right=Math.max(E,Math.max(H,Math.max(F,C)));u.top=Math.min(q,Math.min(o,Math.min(p,r)));u.bottom=Math.max(q,Math.max(o,Math.max(p,r)));if(v&&v.weight){n=v.weight;u.left-=n;u.right+=n;u.top-=n;u.bottom+=n;}return u;},_getRotatedCornerX:function(o,s,n,r,p,q){return(n+(o-n)*p+(s-r)*q);},_getRotatedCornerY:function(o,s,n,r,p,q){return(r-(o-n)*q+(s-r)*p);},destroy:function(){if(this._graphic&&this._graphic._contentNode){this._graphic._contentNode.removeChild(this.node);}}},b.SVGDrawing.prototype));l.ATTRS={transformOrigin:{valueFn:function(){return[0.5,0.5];}},transform:{setter:function(n){this.matrix.init();this._transforms=this.matrix.getTransformArray(n);this._transform=n;if(this.initialized){this._updateTransform();}return n;},getter:function(){return this._transform;}},id:{valueFn:function(){return b.guid();},setter:function(o){var n=this.node;if(n){n.setAttribute("id",o);}return o;}},x:{value:0},y:{value:0},width:{value:0},height:{value:0},visible:{value:true,setter:function(o){var n=o?"visible":"hidden";this.node.style.visibility=n;return o;}},fill:{valueFn:"_getDefaultFill",setter:function(p){var o,n=this.get("fill")||this._getDefaultFill();o=(p)?b.merge(n,p):null;if(o&&o.color){if(o.color===undefined||o.color=="none"){o.color=null;}}return o;}},stroke:{valueFn:"_getDefaultStroke",setter:function(p){var o=this.get("stroke")||this._getDefaultStroke(),n;if(p&&p.hasOwnProperty("weight")){n=parseInt(p.weight,10);
if(!isNaN(n)){p.weight=n;}}return(p)?b.merge(o,p):null;}},autoSize:{value:false},pointerEvents:{valueFn:function(){var o="visiblePainted",n=this.node;if(n){n.setAttribute("pointer-events",o);}return o;},setter:function(o){var n=this.node;if(n){n.setAttribute("pointer-events",o);}return o;}},gradientNode:{setter:function(n){if(c.isString(n)){n=this._graphic.getGradientNode("linear",n);}return n;}},autoDraw:{getter:function(){return this._graphic.autoDraw;}},node:{readOnly:true,getter:function(){return this.node;}},graphic:{readOnly:true,getter:function(){return this._graphic;}}};b.SVGShape=l;k=function(n){k.superclass.constructor.apply(this,arguments);};k.NAME="svgPath";b.extend(k,b.SVGShape,{_left:0,_right:0,_top:0,_bottom:0,_type:"path",_path:""});k.ATTRS=b.merge(b.SVGShape.ATTRS,{path:{readOnly:true,getter:function(){return this._path;}},width:{getter:function(){var n=Math.max(this._right-this._left,0);return n;}},height:{getter:function(){return Math.max(this._bottom-this._top,0);}}});b.SVGPath=k;h=function(){h.superclass.constructor.apply(this,arguments);};h.NAME="svgRect";b.extend(h,b.SVGShape,{_type:"rect"});h.ATTRS=b.SVGShape.ATTRS;b.SVGRect=h;e=function(n){e.superclass.constructor.apply(this,arguments);};e.NAME="svgEllipse";b.extend(e,l,{_type:"ellipse",_draw:function(){var n=this.node,v=this.get("width"),q=this.get("height"),u=this.get("x"),s=this.get("y"),t=v*0.5,r=q*0.5,p=u+t,o=s+r;n.setAttribute("rx",t);n.setAttribute("ry",r);n.setAttribute("cx",p);n.setAttribute("cy",o);this._fillChangeHandler();this._strokeChangeHandler();this._updateTransform();}});e.ATTRS=b.merge(l.ATTRS,{xRadius:{setter:function(n){this.set("width",n/2);},getter:function(){var n=this.get("width");if(n){n*=0.5;}return n;}},yRadius:{setter:function(n){this.set("height",n/2);},getter:function(){var n=this.get("height");if(n){n*=0.5;}return n;}}});b.SVGEllipse=e;f=function(n){f.superclass.constructor.apply(this,arguments);};f.NAME="svgCircle";b.extend(f,b.SVGShape,{_type:"circle",_draw:function(){var q=this.node,p=this.get("x"),s=this.get("y"),o=this.get("radius"),n=p+o,r=s+o;q.setAttribute("r",o);q.setAttribute("cx",n);q.setAttribute("cy",r);this._fillChangeHandler();this._strokeChangeHandler();this._updateTransform();}});f.ATTRS=b.merge(b.SVGShape.ATTRS,{width:{setter:function(n){this.set("radius",n/2);return n;},getter:function(){return this.get("radius")*2;}},height:{setter:function(n){this.set("radius",n/2);return n;},getter:function(){return this.get("radius")*2;}},radius:{value:0}});b.SVGCircle=f;j=function(){j.superclass.constructor.apply(this,arguments);};j.NAME="svgPieSlice";b.extend(j,b.SVGShape,b.mix({_type:"path",_draw:function(r){var o=this.get("cx"),s=this.get("cy"),q=this.get("startAngle"),p=this.get("arc"),n=this.get("radius");this.clear();this.drawWedge(o,s,q,p,n);this.end();}},b.SVGDrawing.prototype));j.ATTRS=b.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},b.SVGShape.ATTRS);b.SVGPieSlice=j;d=function(n){d.superclass.constructor.apply(this,arguments);};d.NAME="svgGraphic";d.ATTRS={render:{},id:{valueFn:function(){return b.guid();},setter:function(o){var n=this._node;if(n){n.setAttribute("id",o);}return o;}},shapes:{readOnly:true,getter:function(){return this._shapes;}},contentBounds:{readOnly:true,getter:function(){return this._contentBounds;}},node:{readOnly:true,getter:function(){return this._node;}},width:{setter:function(n){if(this._node){this._node.style.width=n+"px";}return n;}},height:{setter:function(n){if(this._node){this._node.style.height=n+"px";}return n;}},autoSize:{value:false},resizeDown:{getter:function(){return this._resizeDown;},setter:function(n){this._resizeDown=n;this._redraw();return n;}},x:{getter:function(){return this._x;},setter:function(n){this._x=n;if(this._node){this._node.style.left=n+"px";}return n;}},y:{getter:function(){return this._y;},setter:function(n){this._y=n;if(this._node){this._node.style.top=n+"px";}return n;}},autoDraw:{value:true},visible:{value:true,setter:function(n){this._toggleVisible(n);return n;}},pointerEvents:{value:"none"}};b.extend(d,b.BaseGraphic,{_x:0,_y:0,getXY:function(){var n=b.one(this._node),o;if(n){o=n.getXY();}return o;},_resizeDown:false,initializer:function(){var n=this.get("render");this._shapes={};this._contentBounds={left:0,top:0,right:0,bottom:0};this._gradients={};this._node=m.createElement("div");this._node.style.position="absolute";this._node.style.left=this.get("x")+"px";this._node.style.top=this.get("y")+"px";this._contentNode=this._createGraphics();this._contentNode.setAttribute("id",this.get("id"));this._node.appendChild(this._contentNode);if(n){this.render(n);}},render:function(q){var n=b.one(q),o=this.get("width")||parseInt(n.getComputedStyle("width"),10),p=this.get("height")||parseInt(n.getComputedStyle("height"),10);n=n||m.body;n.appendChild(this._node);this.parentNode=n;this.set("width",o);this.set("height",p);this.parentNode=n;return this;},destroy:function(){this.removeAllShapes();this._removeChildren(this._node);if(this._node&&this._node.parentNode){this._node.parentNode.removeChild(this._node);}},addShape:function(n){n.graphic=this;var p=this._getShapeClass(n.type),o=new p(n);this._appendShape(o);return o;},_appendShape:function(o){var p=o.node,n=this._frag||this._contentNode;if(this.get("autoDraw")){n.appendChild(p);}else{this._getDocFrag().appendChild(p);}},removeShape:function(n){if(!(n instanceof l)){if(c.isString(n)){n=this._shapes[n];}}if(n&&n instanceof l){n.destroy();delete this._shapes[n.get("id")];}if(this.get("autoDraw")){this._redraw();}return n;},removeAllShapes:function(){var n=this._shapes,o;for(o in n){if(n.hasOwnProperty(o)){n[o].destroy();}}this._shapes={};},_removeChildren:function(n){if(n.hasChildNodes()){var o;while(n.firstChild){o=n.firstChild;this._removeChildren(o);n.removeChild(o);}}},clear:function(){this.removeAllShapes();},_toggleVisible:function(q){var p,o=this._shapes,n=q?"visible":"hidden";if(o){for(p in o){if(o.hasOwnProperty(p)){o[p].set("visible",q);
}}}this._contentNode.style.visibility=n;this._node.style.visibility=n;},_getShapeClass:function(o){var n=this._shapeClass[o];if(n){return n;}return o;},_shapeClass:{circle:b.SVGCircle,rect:b.SVGRect,path:b.SVGPath,ellipse:b.SVGEllipse,pieslice:b.SVGPieSlice},getShapeById:function(o){var n=this._shapes[o];return n;},batch:function(o){var n=this.get("autoDraw");this.set("autoDraw",false);o();this._redraw();this.set("autoDraw",n);},_getDocFrag:function(){if(!this._frag){this._frag=m.createDocumentFragment();}return this._frag;},_redraw:function(){var n=this.get("resizeDown")?this._getUpdatedContentBounds():this._contentBounds;this._contentNode.style.left=n.left+"px";this._contentNode.style.top=n.top+"px";this._contentNode.setAttribute("width",n.width);this._contentNode.setAttribute("height",n.height);this._contentNode.style.width=n.width+"px";this._contentNode.style.height=n.height+"px";this._contentNode.setAttribute("viewBox",""+n.left+" "+n.top+" "+n.width+" "+n.height+"");if(this.get("autoSize")){this.set("width",n.right);this.set("height",n.bottom);}if(this._frag){this._contentNode.appendChild(this._frag);this._frag=null;}},addToRedrawQueue:function(n){var p,o;this._shapes[n.get("id")]=n;if(!this.get("resizeDown")){p=n.getBounds();o=this._contentBounds;o.left=o.left<p.left?o.left:p.left;o.top=o.top<p.top?o.top:p.top;o.right=o.right>p.right?o.right:p.right;o.bottom=o.bottom>p.bottom?o.bottom:p.bottom;o.width=o.right-o.left;o.height=o.bottom-o.top;this._contentBounds=o;}if(this.get("autoDraw")){this._redraw();}},_getUpdatedContentBounds:function(){var r,p,o,n=this._shapes,q={left:0,top:0,right:0,bottom:0};for(p in n){if(n.hasOwnProperty(p)){o=n[p];r=o.getBounds();q.left=Math.min(q.left,r.left);q.top=Math.min(q.top,r.top);q.right=Math.max(q.right,r.right);q.bottom=Math.max(q.bottom,r.bottom);}}q.width=q.right-q.left;q.height=q.bottom-q.top;this._contentBounds=q;return q;},_createGraphics:function(){var n=this._createGraphicNode("svg"),o=this.get("pointerEvents");n.style.position="absolute";n.style.top="px";n.style.left="0px";n.style.overflow="auto";n.setAttribute("overflow","auto");n.setAttribute("pointer-events",o);return n;},_createGraphicNode:function(p,n){var q=m.createElementNS("http://www.w3.org/2000/svg","svg:"+p),o=n||"none";if(p!=="defs"&&p!=="stop"&&p!=="linearGradient"&&p!="radialGradient"){q.setAttribute("pointer-events",o);}return q;},getGradientNode:function(p,q){var n=this._gradients,r,o=q+"Gradient";if(n.hasOwnProperty(p)&&n[p].tagName.indexOf(q)>-1){r=this._gradients[p];}else{r=this._createGraphicNode(o);if(!this._defs){this._defs=this._createGraphicNode("defs");this._contentNode.appendChild(this._defs);}this._defs.appendChild(r);p=p||"gradient"+Math.round(100000*Math.random());r.setAttribute("id",p);if(n.hasOwnProperty(p)){this._defs.removeChild(n[p]);}n[p]=r;}return r;}});b.SVGGraphic=d;},"3.4.1",{requires:["graphics"],skinnable:false});