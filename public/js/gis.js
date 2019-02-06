/* #PRODUIRE{fond=javascript/gis.js}
   md5:8a8b88afd57fdae50d2db988a13080f2 */

(function(global,factory){
typeof exports==='object'&&typeof module!=='undefined'?factory(exports):
typeof define==='function'&&define.amd?define(['exports'],factory):
(factory((global.L={})));
}(this,(function(exports){'use strict';
var version="1.3.1+HEAD.ba6f97f";
var freeze=Object.freeze;
Object.freeze=function(obj){return obj;};
function extend(dest){
var i,j,len,src;
for(j=1,len=arguments.length;j<len;j++){
src=arguments[j];
for(i in src){
dest[i]=src[i];
}
}
return dest;
}
var create=Object.create||(function(){
function F(){}
return function(proto){
F.prototype=proto;
return new F();
};
})();
function bind(fn,obj){
var slice=Array.prototype.slice;
if(fn.bind){
return fn.bind.apply(fn,slice.call(arguments,1));
}
var args=slice.call(arguments,2);
return function(){
return fn.apply(obj,args.length?args.concat(slice.call(arguments)):arguments);
};
}
var lastId=0;
function stamp(obj){
obj._leaflet_id=obj._leaflet_id||++lastId;
return obj._leaflet_id;
}
function throttle(fn,time,context){
var lock,args,wrapperFn,later;
later=function(){
lock=false;
if(args){
wrapperFn.apply(context,args);
args=false;
}
};
wrapperFn=function(){
if(lock){
args=arguments;
}else{
fn.apply(context,arguments);
setTimeout(later,time);
lock=true;
}
};
return wrapperFn;
}
function wrapNum(x,range,includeMax){
var max=range[1],
min=range[0],
d=max-min;
return x===max&&includeMax?x:((x-min)%d+d)%d+min;
}
function falseFn(){return false;}
function formatNum(num,digits){
var pow=Math.pow(10,(digits===undefined?6:digits));
return Math.round(num*pow)/pow;
}
function trim(str){
return str.trim?str.trim():str.replace(/^\s+|\s+$/g,'');
}
function splitWords(str){
return trim(str).split(/\s+/);
}
function setOptions(obj,options){
if(!obj.hasOwnProperty('options')){
obj.options=obj.options?create(obj.options):{};
}
for(var i in options){
obj.options[i]=options[i];
}
return obj.options;
}
function getParamString(obj,existingUrl,uppercase){
var params=[];
for(var i in obj){
params.push(encodeURIComponent(uppercase?i.toUpperCase():i)+'='+encodeURIComponent(obj[i]));
}
return((!existingUrl||existingUrl.indexOf('?')===-1)?'?':'&')+params.join('&');
}
var templateRe=/\{ *([\w_-]+) *\}/g;
function template(str,data){
return str.replace(templateRe,function(str,key){
var value=data[key];
if(value===undefined){
throw new Error('No value provided for variable '+str);
}else if(typeof value==='function'){
value=value(data);
}
return value;
});
}
var isArray=Array.isArray||function(obj){
return(Object.prototype.toString.call(obj)==='[object Array]');
};
function indexOf(array,el){
for(var i=0;i<array.length;i++){
if(array[i]===el){return i;}
}
return-1;
}
var emptyImageUrl='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
function getPrefixed(name){
return window['webkit'+name]||window['moz'+name]||window['ms'+name];
}
var lastTime=0;
function timeoutDefer(fn){
var time=+new Date(),
timeToCall=Math.max(0,16-(time-lastTime));
lastTime=time+timeToCall;
return window.setTimeout(fn,timeToCall);
}
var requestFn=window.requestAnimationFrame||getPrefixed('RequestAnimationFrame')||timeoutDefer;
var cancelFn=window.cancelAnimationFrame||getPrefixed('CancelAnimationFrame')||
getPrefixed('CancelRequestAnimationFrame')||function(id){window.clearTimeout(id);};
function requestAnimFrame(fn,context,immediate){
if(immediate&&requestFn===timeoutDefer){
fn.call(context);
}else{
return requestFn.call(window,bind(fn,context));
}
}
function cancelAnimFrame(id){
if(id){
cancelFn.call(window,id);
}
}
var Util=(Object.freeze||Object)({
freeze:freeze,
extend:extend,
create:create,
bind:bind,
lastId:lastId,
stamp:stamp,
throttle:throttle,
wrapNum:wrapNum,
falseFn:falseFn,
formatNum:formatNum,
trim:trim,
splitWords:splitWords,
setOptions:setOptions,
getParamString:getParamString,
template:template,
isArray:isArray,
indexOf:indexOf,
emptyImageUrl:emptyImageUrl,
requestFn:requestFn,
cancelFn:cancelFn,
requestAnimFrame:requestAnimFrame,
cancelAnimFrame:cancelAnimFrame
});
function Class(){}
Class.extend=function(props){
var NewClass=function(){
if(this.initialize){
this.initialize.apply(this,arguments);
}
this.callInitHooks();
};
var parentProto=NewClass.__super__=this.prototype;
var proto=create(parentProto);
proto.constructor=NewClass;
NewClass.prototype=proto;
for(var i in this){
if(this.hasOwnProperty(i)&&i!=='prototype'&&i!=='__super__'){
NewClass[i]=this[i];
}
}
if(props.statics){
extend(NewClass,props.statics);
delete props.statics;
}
if(props.includes){
checkDeprecatedMixinEvents(props.includes);
extend.apply(null,[proto].concat(props.includes));
delete props.includes;
}
if(proto.options){
props.options=extend(create(proto.options),props.options);
}
extend(proto,props);
proto._initHooks=[];
proto.callInitHooks=function(){
if(this._initHooksCalled){return;}
if(parentProto.callInitHooks){
parentProto.callInitHooks.call(this);
}
this._initHooksCalled=true;
for(var i=0,len=proto._initHooks.length;i<len;i++){
proto._initHooks[i].call(this);
}
};
return NewClass;
};
Class.include=function(props){
extend(this.prototype,props);
return this;
};
Class.mergeOptions=function(options){
extend(this.prototype.options,options);
return this;
};
Class.addInitHook=function(fn){
var args=Array.prototype.slice.call(arguments,1);
var init=typeof fn==='function'?fn:function(){
this[fn].apply(this,args);
};
this.prototype._initHooks=this.prototype._initHooks||[];
this.prototype._initHooks.push(init);
return this;
};
function checkDeprecatedMixinEvents(includes){
if(typeof L==='undefined'||!L||!L.Mixin){return;}
includes=isArray(includes)?includes:[includes];
for(var i=0;i<includes.length;i++){
if(includes[i]===L.Mixin.Events){
console.warn('Deprecated include of L.Mixin.Events: '+
'this property will be removed in future releases, '+
'please inherit from L.Evented instead.',new Error().stack);
}
}
}
var Events={
on:function(types,fn,context){
if(typeof types==='object'){
for(var type in types){
this._on(type,types[type],fn);
}
}else{
types=splitWords(types);
for(var i=0,len=types.length;i<len;i++){
this._on(types[i],fn,context);
}
}
return this;
},
off:function(types,fn,context){
if(!types){
delete this._events;
}else if(typeof types==='object'){
for(var type in types){
this._off(type,types[type],fn);
}
}else{
types=splitWords(types);
for(var i=0,len=types.length;i<len;i++){
this._off(types[i],fn,context);
}
}
return this;
},
_on:function(type,fn,context){
this._events=this._events||{};
var typeListeners=this._events[type];
if(!typeListeners){
typeListeners=[];
this._events[type]=typeListeners;
}
if(context===this){
context=undefined;
}
var newListener={fn:fn,ctx:context},
listeners=typeListeners;
for(var i=0,len=listeners.length;i<len;i++){
if(listeners[i].fn===fn&&listeners[i].ctx===context){
return;
}
}
listeners.push(newListener);
},
_off:function(type,fn,context){
var listeners,
i,
len;
if(!this._events){return;}
listeners=this._events[type];
if(!listeners){
return;
}
if(!fn){
for(i=0,len=listeners.length;i<len;i++){
listeners[i].fn=falseFn;
}
delete this._events[type];
return;
}
if(context===this){
context=undefined;
}
if(listeners){
for(i=0,len=listeners.length;i<len;i++){
var l=listeners[i];
if(l.ctx!==context){continue;}
if(l.fn===fn){
l.fn=falseFn;
if(this._firingCount){
this._events[type]=listeners=listeners.slice();
}
listeners.splice(i,1);
return;
}
}
}
},
fire:function(type,data,propagate){
if(!this.listens(type,propagate)){return this;}
var event=extend({},data,{
type:type,
target:this,
sourceTarget:data&&data.sourceTarget||this
});
if(this._events){
var listeners=this._events[type];
if(listeners){
this._firingCount=(this._firingCount+1)||1;
for(var i=0,len=listeners.length;i<len;i++){
var l=listeners[i];
l.fn.call(l.ctx||this,event);
}
this._firingCount--;
}
}
if(propagate){
this._propagateEvent(event);
}
return this;
},
listens:function(type,propagate){
var listeners=this._events&&this._events[type];
if(listeners&&listeners.length){return true;}
if(propagate){
for(var id in this._eventParents){
if(this._eventParents[id].listens(type,propagate)){return true;}
}
}
return false;
},
once:function(types,fn,context){
if(typeof types==='object'){
for(var type in types){
this.once(type,types[type],fn);
}
return this;
}
var handler=bind(function(){
this
.off(types,fn,context)
.off(types,handler,context);
},this);
return this
.on(types,fn,context)
.on(types,handler,context);
},
addEventParent:function(obj){
this._eventParents=this._eventParents||{};
this._eventParents[stamp(obj)]=obj;
return this;
},
removeEventParent:function(obj){
if(this._eventParents){
delete this._eventParents[stamp(obj)];
}
return this;
},
_propagateEvent:function(e){
for(var id in this._eventParents){
this._eventParents[id].fire(e.type,extend({
layer:e.target,
propagatedFrom:e.target
},e),true);
}
}
};
Events.addEventListener=Events.on;
Events.removeEventListener=Events.clearAllEventListeners=Events.off;
Events.addOneTimeEventListener=Events.once;
Events.fireEvent=Events.fire;
Events.hasEventListeners=Events.listens;
var Evented=Class.extend(Events);
function Point(x,y,round){
this.x=(round?Math.round(x):x);
this.y=(round?Math.round(y):y);
}
var trunc=Math.trunc||function(v){
return v>0?Math.floor(v):Math.ceil(v);
};
Point.prototype={
clone:function(){
return new Point(this.x,this.y);
},
add:function(point){
return this.clone()._add(toPoint(point));
},
_add:function(point){
this.x+=point.x;
this.y+=point.y;
return this;
},
subtract:function(point){
return this.clone()._subtract(toPoint(point));
},
_subtract:function(point){
this.x-=point.x;
this.y-=point.y;
return this;
},
divideBy:function(num){
return this.clone()._divideBy(num);
},
_divideBy:function(num){
this.x/=num;
this.y/=num;
return this;
},
multiplyBy:function(num){
return this.clone()._multiplyBy(num);
},
_multiplyBy:function(num){
this.x*=num;
this.y*=num;
return this;
},
scaleBy:function(point){
return new Point(this.x*point.x,this.y*point.y);
},
unscaleBy:function(point){
return new Point(this.x/point.x,this.y/point.y);
},
round:function(){
return this.clone()._round();
},
_round:function(){
this.x=Math.round(this.x);
this.y=Math.round(this.y);
return this;
},
floor:function(){
return this.clone()._floor();
},
_floor:function(){
this.x=Math.floor(this.x);
this.y=Math.floor(this.y);
return this;
},
ceil:function(){
return this.clone()._ceil();
},
_ceil:function(){
this.x=Math.ceil(this.x);
this.y=Math.ceil(this.y);
return this;
},
trunc:function(){
return this.clone()._trunc();
},
_trunc:function(){
this.x=trunc(this.x);
this.y=trunc(this.y);
return this;
},
distanceTo:function(point){
point=toPoint(point);
var x=point.x-this.x,
y=point.y-this.y;
return Math.sqrt(x*x+y*y);
},
equals:function(point){
point=toPoint(point);
return point.x===this.x&&
point.y===this.y;
},
contains:function(point){
point=toPoint(point);
return Math.abs(point.x)<=Math.abs(this.x)&&
Math.abs(point.y)<=Math.abs(this.y);
},
toString:function(){
return'Point('+
formatNum(this.x)+', '+
formatNum(this.y)+')';
}
};
function toPoint(x,y,round){
if(x instanceof Point){
return x;
}
if(isArray(x)){
return new Point(x[0],x[1]);
}
if(x===undefined||x===null){
return x;
}
if(typeof x==='object'&&'x'in x&&'y'in x){
return new Point(x.x,x.y);
}
return new Point(x,y,round);
}
function Bounds(a,b){
if(!a){return;}
var points=b?[a,b]:a;
for(var i=0,len=points.length;i<len;i++){
this.extend(points[i]);
}
}
Bounds.prototype={
extend:function(point){
point=toPoint(point);
if(!this.min&&!this.max){
this.min=point.clone();
this.max=point.clone();
}else{
this.min.x=Math.min(point.x,this.min.x);
this.max.x=Math.max(point.x,this.max.x);
this.min.y=Math.min(point.y,this.min.y);
this.max.y=Math.max(point.y,this.max.y);
}
return this;
},
getCenter:function(round){
return new Point(
(this.min.x+this.max.x)/2,
(this.min.y+this.max.y)/2,round);
},
getBottomLeft:function(){
return new Point(this.min.x,this.max.y);
},
getTopRight:function(){
return new Point(this.max.x,this.min.y);
},
getTopLeft:function(){
return this.min;
},
getBottomRight:function(){
return this.max;
},
getSize:function(){
return this.max.subtract(this.min);
},
contains:function(obj){
var min,max;
if(typeof obj[0]==='number'||obj instanceof Point){
obj=toPoint(obj);
}else{
obj=toBounds(obj);
}
if(obj instanceof Bounds){
min=obj.min;
max=obj.max;
}else{
min=max=obj;
}
return(min.x>=this.min.x)&&
(max.x<=this.max.x)&&
(min.y>=this.min.y)&&
(max.y<=this.max.y);
},
intersects:function(bounds){
bounds=toBounds(bounds);
var min=this.min,
max=this.max,
min2=bounds.min,
max2=bounds.max,
xIntersects=(max2.x>=min.x)&&(min2.x<=max.x),
yIntersects=(max2.y>=min.y)&&(min2.y<=max.y);
return xIntersects&&yIntersects;
},
overlaps:function(bounds){
bounds=toBounds(bounds);
var min=this.min,
max=this.max,
min2=bounds.min,
max2=bounds.max,
xOverlaps=(max2.x>min.x)&&(min2.x<max.x),
yOverlaps=(max2.y>min.y)&&(min2.y<max.y);
return xOverlaps&&yOverlaps;
},
isValid:function(){
return!!(this.min&&this.max);
}
};
function toBounds(a,b){
if(!a||a instanceof Bounds){
return a;
}
return new Bounds(a,b);
}
function LatLngBounds(corner1,corner2){
if(!corner1){return;}
var latlngs=corner2?[corner1,corner2]:corner1;
for(var i=0,len=latlngs.length;i<len;i++){
this.extend(latlngs[i]);
}
}
LatLngBounds.prototype={
extend:function(obj){
var sw=this._southWest,
ne=this._northEast,
sw2,ne2;
if(obj instanceof LatLng){
sw2=obj;
ne2=obj;
}else if(obj instanceof LatLngBounds){
sw2=obj._southWest;
ne2=obj._northEast;
if(!sw2||!ne2){return this;}
}else{
return obj?this.extend(toLatLng(obj)||toLatLngBounds(obj)):this;
}
if(!sw&&!ne){
this._southWest=new LatLng(sw2.lat,sw2.lng);
this._northEast=new LatLng(ne2.lat,ne2.lng);
}else{
sw.lat=Math.min(sw2.lat,sw.lat);
sw.lng=Math.min(sw2.lng,sw.lng);
ne.lat=Math.max(ne2.lat,ne.lat);
ne.lng=Math.max(ne2.lng,ne.lng);
}
return this;
},
pad:function(bufferRatio){
var sw=this._southWest,
ne=this._northEast,
heightBuffer=Math.abs(sw.lat-ne.lat)*bufferRatio,
widthBuffer=Math.abs(sw.lng-ne.lng)*bufferRatio;
return new LatLngBounds(
new LatLng(sw.lat-heightBuffer,sw.lng-widthBuffer),
new LatLng(ne.lat+heightBuffer,ne.lng+widthBuffer));
},
getCenter:function(){
return new LatLng(
(this._southWest.lat+this._northEast.lat)/2,
(this._southWest.lng+this._northEast.lng)/2);
},
getSouthWest:function(){
return this._southWest;
},
getNorthEast:function(){
return this._northEast;
},
getNorthWest:function(){
return new LatLng(this.getNorth(),this.getWest());
},
getSouthEast:function(){
return new LatLng(this.getSouth(),this.getEast());
},
getWest:function(){
return this._southWest.lng;
},
getSouth:function(){
return this._southWest.lat;
},
getEast:function(){
return this._northEast.lng;
},
getNorth:function(){
return this._northEast.lat;
},
contains:function(obj){
if(typeof obj[0]==='number'||obj instanceof LatLng||'lat'in obj){
obj=toLatLng(obj);
}else{
obj=toLatLngBounds(obj);
}
var sw=this._southWest,
ne=this._northEast,
sw2,ne2;
if(obj instanceof LatLngBounds){
sw2=obj.getSouthWest();
ne2=obj.getNorthEast();
}else{
sw2=ne2=obj;
}
return(sw2.lat>=sw.lat)&&(ne2.lat<=ne.lat)&&
(sw2.lng>=sw.lng)&&(ne2.lng<=ne.lng);
},
intersects:function(bounds){
bounds=toLatLngBounds(bounds);
var sw=this._southWest,
ne=this._northEast,
sw2=bounds.getSouthWest(),
ne2=bounds.getNorthEast(),
latIntersects=(ne2.lat>=sw.lat)&&(sw2.lat<=ne.lat),
lngIntersects=(ne2.lng>=sw.lng)&&(sw2.lng<=ne.lng);
return latIntersects&&lngIntersects;
},
overlaps:function(bounds){
bounds=toLatLngBounds(bounds);
var sw=this._southWest,
ne=this._northEast,
sw2=bounds.getSouthWest(),
ne2=bounds.getNorthEast(),
latOverlaps=(ne2.lat>sw.lat)&&(sw2.lat<ne.lat),
lngOverlaps=(ne2.lng>sw.lng)&&(sw2.lng<ne.lng);
return latOverlaps&&lngOverlaps;
},
toBBoxString:function(){
return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(',');
},
equals:function(bounds,maxMargin){
if(!bounds){return false;}
bounds=toLatLngBounds(bounds);
return this._southWest.equals(bounds.getSouthWest(),maxMargin)&&
this._northEast.equals(bounds.getNorthEast(),maxMargin);
},
isValid:function(){
return!!(this._southWest&&this._northEast);
}
};
function toLatLngBounds(a,b){
if(a instanceof LatLngBounds){
return a;
}
return new LatLngBounds(a,b);
}
function LatLng(lat,lng,alt){
if(isNaN(lat)||isNaN(lng)){
throw new Error('Invalid LatLng object: ('+lat+', '+lng+')');
}
this.lat=+lat;
this.lng=+lng;
if(alt!==undefined){
this.alt=+alt;
}
}
LatLng.prototype={
equals:function(obj,maxMargin){
if(!obj){return false;}
obj=toLatLng(obj);
var margin=Math.max(
Math.abs(this.lat-obj.lat),
Math.abs(this.lng-obj.lng));
return margin<=(maxMargin===undefined?1.0E-9:maxMargin);
},
toString:function(precision){
return'LatLng('+
formatNum(this.lat,precision)+', '+
formatNum(this.lng,precision)+')';
},
distanceTo:function(other){
return Earth.distance(this,toLatLng(other));
},
wrap:function(){
return Earth.wrapLatLng(this);
},
toBounds:function(sizeInMeters){
var latAccuracy=180*sizeInMeters/40075017,
lngAccuracy=latAccuracy/Math.cos((Math.PI/180)*this.lat);
return toLatLngBounds(
[this.lat-latAccuracy,this.lng-lngAccuracy],
[this.lat+latAccuracy,this.lng+lngAccuracy]);
},
clone:function(){
return new LatLng(this.lat,this.lng,this.alt);
}
};
function toLatLng(a,b,c){
if(a instanceof LatLng){
return a;
}
if(isArray(a)&&typeof a[0]!=='object'){
if(a.length===3){
return new LatLng(a[0],a[1],a[2]);
}
if(a.length===2){
return new LatLng(a[0],a[1]);
}
return null;
}
if(a===undefined||a===null){
return a;
}
if(typeof a==='object'&&'lat'in a){
return new LatLng(a.lat,'lng'in a?a.lng:a.lon,a.alt);
}
if(b===undefined){
return null;
}
return new LatLng(a,b,c);
}
var CRS={
latLngToPoint:function(latlng,zoom){
var projectedPoint=this.projection.project(latlng),
scale=this.scale(zoom);
return this.transformation._transform(projectedPoint,scale);
},
pointToLatLng:function(point,zoom){
var scale=this.scale(zoom),
untransformedPoint=this.transformation.untransform(point,scale);
return this.projection.unproject(untransformedPoint);
},
project:function(latlng){
return this.projection.project(latlng);
},
unproject:function(point){
return this.projection.unproject(point);
},
scale:function(zoom){
return 256*Math.pow(2,zoom);
},
zoom:function(scale){
return Math.log(scale/256)/Math.LN2;
},
getProjectedBounds:function(zoom){
if(this.infinite){return null;}
var b=this.projection.bounds,
s=this.scale(zoom),
min=this.transformation.transform(b.min,s),
max=this.transformation.transform(b.max,s);
return new Bounds(min,max);
},
infinite:false,
wrapLatLng:function(latlng){
var lng=this.wrapLng?wrapNum(latlng.lng,this.wrapLng,true):latlng.lng,
lat=this.wrapLat?wrapNum(latlng.lat,this.wrapLat,true):latlng.lat,
alt=latlng.alt;
return new LatLng(lat,lng,alt);
},
wrapLatLngBounds:function(bounds){
var center=bounds.getCenter(),
newCenter=this.wrapLatLng(center),
latShift=center.lat-newCenter.lat,
lngShift=center.lng-newCenter.lng;
if(latShift===0&&lngShift===0){
return bounds;
}
var sw=bounds.getSouthWest(),
ne=bounds.getNorthEast(),
newSw=new LatLng(sw.lat-latShift,sw.lng-lngShift),
newNe=new LatLng(ne.lat-latShift,ne.lng-lngShift);
return new LatLngBounds(newSw,newNe);
}
};
var Earth=extend({},CRS,{
wrapLng:[-180,180],
R:6371000,
distance:function(latlng1,latlng2){
var rad=Math.PI/180,
lat1=latlng1.lat*rad,
lat2=latlng2.lat*rad,
sinDLat=Math.sin((latlng2.lat-latlng1.lat)*rad/2),
sinDLon=Math.sin((latlng2.lng-latlng1.lng)*rad/2),
a=sinDLat*sinDLat+Math.cos(lat1)*Math.cos(lat2)*sinDLon*sinDLon,
c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
return this.R*c;
}
});
var SphericalMercator={
R:6378137,
MAX_LATITUDE:85.0511287798,
project:function(latlng){
var d=Math.PI/180,
max=this.MAX_LATITUDE,
lat=Math.max(Math.min(max,latlng.lat),-max),
sin=Math.sin(lat*d);
return new Point(
this.R*latlng.lng*d,
this.R*Math.log((1+sin)/(1-sin))/2);
},
unproject:function(point){
var d=180/Math.PI;
return new LatLng(
(2*Math.atan(Math.exp(point.y/this.R))-(Math.PI/2))*d,
point.x*d/this.R);
},
bounds:(function(){
var d=6378137*Math.PI;
return new Bounds([-d,-d],[d,d]);
})()
};
function Transformation(a,b,c,d){
if(isArray(a)){
this._a=a[0];
this._b=a[1];
this._c=a[2];
this._d=a[3];
return;
}
this._a=a;
this._b=b;
this._c=c;
this._d=d;
}
Transformation.prototype={
transform:function(point,scale){
return this._transform(point.clone(),scale);
},
_transform:function(point,scale){
scale=scale||1;
point.x=scale*(this._a*point.x+this._b);
point.y=scale*(this._c*point.y+this._d);
return point;
},
untransform:function(point,scale){
scale=scale||1;
return new Point(
(point.x/scale-this._b)/this._a,
(point.y/scale-this._d)/this._c);
}
};
function toTransformation(a,b,c,d){
return new Transformation(a,b,c,d);
}
var EPSG3857=extend({},Earth,{
code:'EPSG:3857',
projection:SphericalMercator,
transformation:(function(){
var scale=0.5/(Math.PI*SphericalMercator.R);
return toTransformation(scale,0.5,-scale,0.5);
}())
});
var EPSG900913=extend({},EPSG3857,{
code:'EPSG:900913'
});
function svgCreate(name){
return document.createElementNS('http://www.w3.org/2000/svg',name);
}
function pointsToPath(rings,closed){
var str='',
i,j,len,len2,points,p;
for(i=0,len=rings.length;i<len;i++){
points=rings[i];
for(j=0,len2=points.length;j<len2;j++){
p=points[j];
str+=(j?'L':'M')+p.x+' '+p.y;
}
str+=closed?(svg?'z':'x'):'';
}
return str||'M0 0';
}
var style$1=document.documentElement.style;
var ie='ActiveXObject'in window;
var ielt9=ie&&!document.addEventListener;
var edge='msLaunchUri'in navigator&&!('documentMode'in document);
var webkit=userAgentContains('webkit');
var android=userAgentContains('android');
var android23=userAgentContains('android 2')||userAgentContains('android 3');
var webkitVer=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10);
var androidStock=android&&userAgentContains('Google')&&webkitVer<537&&!('AudioNode'in window);
var opera=!!window.opera;
var chrome=userAgentContains('chrome');
var gecko=userAgentContains('gecko')&&!webkit&&!opera&&!ie;
var safari=!chrome&&userAgentContains('safari');
var phantom=userAgentContains('phantom');
var opera12='OTransition'in style$1;
var win=navigator.platform.indexOf('Win')===0;
var ie3d=ie&&('transition'in style$1);
var webkit3d=('WebKitCSSMatrix'in window)&&('m11'in new window.WebKitCSSMatrix())&&!android23;
var gecko3d='MozPerspective'in style$1;
var any3d=!window.L_DISABLE_3D&&(ie3d||webkit3d||gecko3d)&&!opera12&&!phantom;
var mobile=typeof orientation!=='undefined'||userAgentContains('mobile');
var mobileWebkit=mobile&&webkit;
var mobileWebkit3d=mobile&&webkit3d;
var msPointer=!window.PointerEvent&&window.MSPointerEvent;
var pointer=!!(window.PointerEvent||msPointer);
var touch=!window.L_NO_TOUCH&&(pointer||'ontouchstart'in window||
(window.DocumentTouch&&document instanceof window.DocumentTouch));
var mobileOpera=mobile&&opera;
var mobileGecko=mobile&&gecko;
var retina=(window.devicePixelRatio||(window.screen.deviceXDPI/window.screen.logicalXDPI))>1;
var canvas=(function(){
return!!document.createElement('canvas').getContext;
}());
var svg=!!(document.createElementNS&&svgCreate('svg').createSVGRect);
var vml=!svg&&(function(){
try{
var div=document.createElement('div');
div.innerHTML='<v:shape adj="1"/>';
var shape=div.firstChild;
shape.style.behavior='url(#default#VML)';
return shape&&(typeof shape.adj==='object');
}catch(e){
return false;
}
}());
function userAgentContains(str){
return navigator.userAgent.toLowerCase().indexOf(str)>=0;
}
var Browser=(Object.freeze||Object)({
ie:ie,
ielt9:ielt9,
edge:edge,
webkit:webkit,
android:android,
android23:android23,
androidStock:androidStock,
opera:opera,
chrome:chrome,
gecko:gecko,
safari:safari,
phantom:phantom,
opera12:opera12,
win:win,
ie3d:ie3d,
webkit3d:webkit3d,
gecko3d:gecko3d,
any3d:any3d,
mobile:mobile,
mobileWebkit:mobileWebkit,
mobileWebkit3d:mobileWebkit3d,
msPointer:msPointer,
pointer:pointer,
touch:touch,
mobileOpera:mobileOpera,
mobileGecko:mobileGecko,
retina:retina,
canvas:canvas,
svg:svg,
vml:vml
});
var POINTER_DOWN=msPointer?'MSPointerDown':'pointerdown';
var POINTER_MOVE=msPointer?'MSPointerMove':'pointermove';
var POINTER_UP=msPointer?'MSPointerUp':'pointerup';
var POINTER_CANCEL=msPointer?'MSPointerCancel':'pointercancel';
var TAG_WHITE_LIST=['INPUT','SELECT','OPTION'];
var _pointers={};
var _pointerDocListener=false;
var _pointersCount=0;
function addPointerListener(obj,type,handler,id){
if(type==='touchstart'){
_addPointerStart(obj,handler,id);
}else if(type==='touchmove'){
_addPointerMove(obj,handler,id);
}else if(type==='touchend'){
_addPointerEnd(obj,handler,id);
}
return this;
}
function removePointerListener(obj,type,id){
var handler=obj['_leaflet_'+type+id];
if(type==='touchstart'){
obj.removeEventListener(POINTER_DOWN,handler,false);
}else if(type==='touchmove'){
obj.removeEventListener(POINTER_MOVE,handler,false);
}else if(type==='touchend'){
obj.removeEventListener(POINTER_UP,handler,false);
obj.removeEventListener(POINTER_CANCEL,handler,false);
}
return this;
}
function _addPointerStart(obj,handler,id){
var onDown=bind(function(e){
if(e.pointerType!=='mouse'&&e.MSPOINTER_TYPE_MOUSE&&e.pointerType!==e.MSPOINTER_TYPE_MOUSE){
if(TAG_WHITE_LIST.indexOf(e.target.tagName)<0){
preventDefault(e);
}else{
return;
}
}
_handlePointer(e,handler);
});
obj['_leaflet_touchstart'+id]=onDown;
obj.addEventListener(POINTER_DOWN,onDown,false);
if(!_pointerDocListener){
document.documentElement.addEventListener(POINTER_DOWN,_globalPointerDown,true);
document.documentElement.addEventListener(POINTER_MOVE,_globalPointerMove,true);
document.documentElement.addEventListener(POINTER_UP,_globalPointerUp,true);
document.documentElement.addEventListener(POINTER_CANCEL,_globalPointerUp,true);
_pointerDocListener=true;
}
}
function _globalPointerDown(e){
_pointers[e.pointerId]=e;
_pointersCount++;
}
function _globalPointerMove(e){
if(_pointers[e.pointerId]){
_pointers[e.pointerId]=e;
}
}
function _globalPointerUp(e){
delete _pointers[e.pointerId];
_pointersCount--;
}
function _handlePointer(e,handler){
e.touches=[];
for(var i in _pointers){
e.touches.push(_pointers[i]);
}
e.changedTouches=[e];
handler(e);
}
function _addPointerMove(obj,handler,id){
var onMove=function(e){
if((e.pointerType===e.MSPOINTER_TYPE_MOUSE||e.pointerType==='mouse')&&e.buttons===0){return;}
_handlePointer(e,handler);
};
obj['_leaflet_touchmove'+id]=onMove;
obj.addEventListener(POINTER_MOVE,onMove,false);
}
function _addPointerEnd(obj,handler,id){
var onUp=function(e){
_handlePointer(e,handler);
};
obj['_leaflet_touchend'+id]=onUp;
obj.addEventListener(POINTER_UP,onUp,false);
obj.addEventListener(POINTER_CANCEL,onUp,false);
}
var _touchstart=msPointer?'MSPointerDown':pointer?'pointerdown':'touchstart';
var _touchend=msPointer?'MSPointerUp':pointer?'pointerup':'touchend';
var _pre='_leaflet_';
function addDoubleTapListener(obj,handler,id){
var last,touch$$1,
doubleTap=false,
delay=250;
function onTouchStart(e){
var count;
if(pointer){
if((!edge)||e.pointerType==='mouse'){return;}
count=_pointersCount;
}else{
count=e.touches.length;
}
if(count>1){return;}
var now=Date.now(),
delta=now-(last||now);
touch$$1=e.touches?e.touches[0]:e;
doubleTap=(delta>0&&delta<=delay);
last=now;
}
function onTouchEnd(e){
if(doubleTap&&!touch$$1.cancelBubble){
if(pointer){
if((!edge)||e.pointerType==='mouse'){return;}
var newTouch={},
prop,i;
for(i in touch$$1){
prop=touch$$1[i];
newTouch[i]=prop&&prop.bind?prop.bind(touch$$1):prop;
}
touch$$1=newTouch;
}
touch$$1.type='dblclick';
handler(touch$$1);
last=null;
}
}
obj[_pre+_touchstart+id]=onTouchStart;
obj[_pre+_touchend+id]=onTouchEnd;
obj[_pre+'dblclick'+id]=handler;
obj.addEventListener(_touchstart,onTouchStart,false);
obj.addEventListener(_touchend,onTouchEnd,false);
obj.addEventListener('dblclick',handler,false);
return this;
}
function removeDoubleTapListener(obj,id){
var touchstart=obj[_pre+_touchstart+id],
touchend=obj[_pre+_touchend+id],
dblclick=obj[_pre+'dblclick'+id];
obj.removeEventListener(_touchstart,touchstart,false);
obj.removeEventListener(_touchend,touchend,false);
if(!edge){
obj.removeEventListener('dblclick',dblclick,false);
}
return this;
}
function on(obj,types,fn,context){
if(typeof types==='object'){
for(var type in types){
addOne(obj,type,types[type],fn);
}
}else{
types=splitWords(types);
for(var i=0,len=types.length;i<len;i++){
addOne(obj,types[i],fn,context);
}
}
return this;
}
var eventsKey='_leaflet_events';
function off(obj,types,fn,context){
if(typeof types==='object'){
for(var type in types){
removeOne(obj,type,types[type],fn);
}
}else if(types){
types=splitWords(types);
for(var i=0,len=types.length;i<len;i++){
removeOne(obj,types[i],fn,context);
}
}else{
for(var j in obj[eventsKey]){
removeOne(obj,j,obj[eventsKey][j]);
}
delete obj[eventsKey];
}
return this;
}
function addOne(obj,type,fn,context){
var id=type+stamp(fn)+(context?'_'+stamp(context):'');
if(obj[eventsKey]&&obj[eventsKey][id]){return this;}
var handler=function(e){
return fn.call(context||obj,e||window.event);
};
var originalHandler=handler;
if(pointer&&type.indexOf('touch')===0){
addPointerListener(obj,type,handler,id);
}else if(touch&&(type==='dblclick')&&addDoubleTapListener&&
!(pointer&&chrome)){
addDoubleTapListener(obj,handler,id);
}else if('addEventListener'in obj){
if(type==='mousewheel'){
obj.addEventListener('onwheel'in obj?'wheel':'mousewheel',handler,false);
}else if((type==='mouseenter')||(type==='mouseleave')){
handler=function(e){
e=e||window.event;
if(isExternalTarget(obj,e)){
originalHandler(e);
}
};
obj.addEventListener(type==='mouseenter'?'mouseover':'mouseout',handler,false);
}else{
if(type==='click'&&android){
handler=function(e){
filterClick(e,originalHandler);
};
}
obj.addEventListener(type,handler,false);
}
}else if('attachEvent'in obj){
obj.attachEvent('on'+type,handler);
}
obj[eventsKey]=obj[eventsKey]||{};
obj[eventsKey][id]=handler;
}
function removeOne(obj,type,fn,context){
var id=type+stamp(fn)+(context?'_'+stamp(context):''),
handler=obj[eventsKey]&&obj[eventsKey][id];
if(!handler){return this;}
if(pointer&&type.indexOf('touch')===0){
removePointerListener(obj,type,id);
}else if(touch&&(type==='dblclick')&&removeDoubleTapListener&&
!(pointer&&chrome)){
removeDoubleTapListener(obj,id);
}else if('removeEventListener'in obj){
if(type==='mousewheel'){
obj.removeEventListener('onwheel'in obj?'wheel':'mousewheel',handler,false);
}else{
obj.removeEventListener(
type==='mouseenter'?'mouseover':
type==='mouseleave'?'mouseout':type,handler,false);
}
}else if('detachEvent'in obj){
obj.detachEvent('on'+type,handler);
}
obj[eventsKey][id]=null;
}
function stopPropagation(e){
if(e.stopPropagation){
e.stopPropagation();
}else if(e.originalEvent){
e.originalEvent._stopped=true;
}else{
e.cancelBubble=true;
}
skipped(e);
return this;
}
function disableScrollPropagation(el){
addOne(el,'mousewheel',stopPropagation);
return this;
}
function disableClickPropagation(el){
on(el,'mousedown touchstart dblclick',stopPropagation);
addOne(el,'click',fakeStop);
return this;
}
function preventDefault(e){
if(e.preventDefault){
e.preventDefault();
}else{
e.returnValue=false;
}
return this;
}
function stop(e){
preventDefault(e);
stopPropagation(e);
return this;
}
function getMousePosition(e,container){
if(!container){
return new Point(e.clientX,e.clientY);
}
var rect=container.getBoundingClientRect();
var scaleX=rect.width/container.offsetWidth||1;
var scaleY=rect.height/container.offsetHeight||1;
return new Point(
e.clientX/scaleX-rect.left-container.clientLeft,
e.clientY/scaleY-rect.top-container.clientTop);
}
var wheelPxFactor=
(win&&chrome)?2*window.devicePixelRatio:
gecko?window.devicePixelRatio:1;
function getWheelDelta(e){
return(edge)?e.wheelDeltaY/2:

(e.deltaY&&e.deltaMode===0)?-e.deltaY/wheelPxFactor:

(e.deltaY&&e.deltaMode===1)?-e.deltaY*20:
(e.deltaY&&e.deltaMode===2)?-e.deltaY*60:
(e.deltaX||e.deltaZ)?0:
e.wheelDelta?(e.wheelDeltaY||e.wheelDelta)/2:

(e.detail&&Math.abs(e.detail)<32765)?-e.detail*20:
e.detail?e.detail/-32765*60:

0;
}
var skipEvents={};
function fakeStop(e){
skipEvents[e.type]=true;
}
function skipped(e){
var events=skipEvents[e.type];
skipEvents[e.type]=false;
return events;
}
function isExternalTarget(el,e){
var related=e.relatedTarget;
if(!related){return true;}
try{
while(related&&(related!==el)){
related=related.parentNode;
}
}catch(err){
return false;
}
return(related!==el);
}
var lastClick;
function filterClick(e,handler){
var timeStamp=(e.timeStamp||(e.originalEvent&&e.originalEvent.timeStamp)),
elapsed=lastClick&&(timeStamp-lastClick);
if((elapsed&&elapsed>100&&elapsed<500)||(e.target._simulatedClick&&!e._simulated)){
stop(e);
return;
}
lastClick=timeStamp;
handler(e);
}
var DomEvent=(Object.freeze||Object)({
on:on,
off:off,
stopPropagation:stopPropagation,
disableScrollPropagation:disableScrollPropagation,
disableClickPropagation:disableClickPropagation,
preventDefault:preventDefault,
stop:stop,
getMousePosition:getMousePosition,
getWheelDelta:getWheelDelta,
fakeStop:fakeStop,
skipped:skipped,
isExternalTarget:isExternalTarget,
addListener:on,
removeListener:off
});
var TRANSFORM=testProp(
['transform','WebkitTransform','OTransform','MozTransform','msTransform']);
var TRANSITION=testProp(
['webkitTransition','transition','OTransition','MozTransition','msTransition']);
var TRANSITION_END=
TRANSITION==='webkitTransition'||TRANSITION==='OTransition'?TRANSITION+'End':'transitionend';
function get(id){
return typeof id==='string'?document.getElementById(id):id;
}
function getStyle(el,style){
var value=el.style[style]||(el.currentStyle&&el.currentStyle[style]);
if((!value||value==='auto')&&document.defaultView){
var css=document.defaultView.getComputedStyle(el,null);
value=css?css[style]:null;
}
return value==='auto'?null:value;
}
function create$1(tagName,className,container){
var el=document.createElement(tagName);
el.className=className||'';
if(container){
container.appendChild(el);
}
return el;
}
function remove(el){
var parent=el.parentNode;
if(parent){
parent.removeChild(el);
}
}
function empty(el){
while(el.firstChild){
el.removeChild(el.firstChild);
}
}
function toFront(el){
var parent=el.parentNode;
if(parent.lastChild!==el){
parent.appendChild(el);
}
}
function toBack(el){
var parent=el.parentNode;
if(parent.firstChild!==el){
parent.insertBefore(el,parent.firstChild);
}
}
function hasClass(el,name){
if(el.classList!==undefined){
return el.classList.contains(name);
}
var className=getClass(el);
return className.length>0&&new RegExp('(^|\\s)'+name+'(\\s|$)').test(className);
}
function addClass(el,name){
if(el.classList!==undefined){
var classes=splitWords(name);
for(var i=0,len=classes.length;i<len;i++){
el.classList.add(classes[i]);
}
}else if(!hasClass(el,name)){
var className=getClass(el);
setClass(el,(className?className+' ':'')+name);
}
}
function removeClass(el,name){
if(el.classList!==undefined){
el.classList.remove(name);
}else{
setClass(el,trim((' '+getClass(el)+' ').replace(' '+name+' ',' ')));
}
}
function setClass(el,name){
if(el.className.baseVal===undefined){
el.className=name;
}else{
el.className.baseVal=name;
}
}
function getClass(el){
return el.className.baseVal===undefined?el.className:el.className.baseVal;
}
function setOpacity(el,value){
if('opacity'in el.style){
el.style.opacity=value;
}else if('filter'in el.style){
_setOpacityIE(el,value);
}
}
function _setOpacityIE(el,value){
var filter=false,
filterName='DXImageTransform.Microsoft.Alpha';
try{
filter=el.filters.item(filterName);
}catch(e){
if(value===1){return;}
}
value=Math.round(value*100);
if(filter){
filter.Enabled=(value!==100);
filter.Opacity=value;
}else{
el.style.filter+=' progid:'+filterName+'(opacity='+value+')';
}
}
function testProp(props){
var style=document.documentElement.style;
for(var i=0;i<props.length;i++){
if(props[i]in style){
return props[i];
}
}
return false;
}
function setTransform(el,offset,scale){
var pos=offset||new Point(0,0);
el.style[TRANSFORM]=
(ie3d?
'translate('+pos.x+'px,'+pos.y+'px)':
'translate3d('+pos.x+'px,'+pos.y+'px,0)')+
(scale?' scale('+scale+')':'');
}
function setPosition(el,point){
el._leaflet_pos=point;
if(any3d){
setTransform(el,point);
}else{
el.style.left=point.x+'px';
el.style.top=point.y+'px';
}
}
function getPosition(el){
return el._leaflet_pos||new Point(0,0);
}
var disableTextSelection;
var enableTextSelection;
var _userSelect;
if('onselectstart'in document){
disableTextSelection=function(){
on(window,'selectstart',preventDefault);
};
enableTextSelection=function(){
off(window,'selectstart',preventDefault);
};
}else{
var userSelectProperty=testProp(
['userSelect','WebkitUserSelect','OUserSelect','MozUserSelect','msUserSelect']);
disableTextSelection=function(){
if(userSelectProperty){
var style=document.documentElement.style;
_userSelect=style[userSelectProperty];
style[userSelectProperty]='none';
}
};
enableTextSelection=function(){
if(userSelectProperty){
document.documentElement.style[userSelectProperty]=_userSelect;
_userSelect=undefined;
}
};
}
function disableImageDrag(){
on(window,'dragstart',preventDefault);
}
function enableImageDrag(){
off(window,'dragstart',preventDefault);
}
var _outlineElement;
var _outlineStyle;
function preventOutline(element){
while(element.tabIndex===-1){
element=element.parentNode;
}
if(!element.style){return;}
restoreOutline();
_outlineElement=element;
_outlineStyle=element.style.outline;
element.style.outline='none';
on(window,'keydown',restoreOutline);
}
function restoreOutline(){
if(!_outlineElement){return;}
_outlineElement.style.outline=_outlineStyle;
_outlineElement=undefined;
_outlineStyle=undefined;
off(window,'keydown',restoreOutline);
}
var DomUtil=(Object.freeze||Object)({
TRANSFORM:TRANSFORM,
TRANSITION:TRANSITION,
TRANSITION_END:TRANSITION_END,
get:get,
getStyle:getStyle,
create:create$1,
remove:remove,
empty:empty,
toFront:toFront,
toBack:toBack,
hasClass:hasClass,
addClass:addClass,
removeClass:removeClass,
setClass:setClass,
getClass:getClass,
setOpacity:setOpacity,
testProp:testProp,
setTransform:setTransform,
setPosition:setPosition,
getPosition:getPosition,
disableTextSelection:disableTextSelection,
enableTextSelection:enableTextSelection,
disableImageDrag:disableImageDrag,
enableImageDrag:enableImageDrag,
preventOutline:preventOutline,
restoreOutline:restoreOutline
});
var PosAnimation=Evented.extend({
run:function(el,newPos,duration,easeLinearity){
this.stop();
this._el=el;
this._inProgress=true;
this._duration=duration||0.25;
this._easeOutPower=1/Math.max(easeLinearity||0.5,0.2);
this._startPos=getPosition(el);
this._offset=newPos.subtract(this._startPos);
this._startTime=+new Date();
this.fire('start');
this._animate();
},
stop:function(){
if(!this._inProgress){return;}
this._step(true);
this._complete();
},
_animate:function(){
this._animId=requestAnimFrame(this._animate,this);
this._step();
},
_step:function(round){
var elapsed=(+new Date())-this._startTime,
duration=this._duration*1000;
if(elapsed<duration){
this._runFrame(this._easeOut(elapsed/duration),round);
}else{
this._runFrame(1);
this._complete();
}
},
_runFrame:function(progress,round){
var pos=this._startPos.add(this._offset.multiplyBy(progress));
if(round){
pos._round();
}
setPosition(this._el,pos);
this.fire('step');
},
_complete:function(){
cancelAnimFrame(this._animId);
this._inProgress=false;
this.fire('end');
},
_easeOut:function(t){
return 1-Math.pow(1-t,this._easeOutPower);
}
});
var Map=Evented.extend({
options:{
crs:EPSG3857,
center:undefined,
zoom:undefined,
minZoom:undefined,
maxZoom:undefined,
layers:[],
maxBounds:undefined,
renderer:undefined,
zoomAnimation:true,
zoomAnimationThreshold:4,
fadeAnimation:true,
markerZoomAnimation:true,
transform3DLimit:8388608,
zoomSnap:1,
zoomDelta:1,
trackResize:true
},
initialize:function(id,options){
options=setOptions(this,options);
this._initContainer(id);
this._initLayout();
this._onResize=bind(this._onResize,this);
this._initEvents();
if(options.maxBounds){
this.setMaxBounds(options.maxBounds);
}
if(options.zoom!==undefined){
this._zoom=this._limitZoom(options.zoom);
}
if(options.center&&options.zoom!==undefined){
this.setView(toLatLng(options.center),options.zoom,{reset:true});
}
this._handlers=[];
this._layers={};
this._zoomBoundLayers={};
this._sizeChanged=true;
this.callInitHooks();
this._zoomAnimated=TRANSITION&&any3d&&!mobileOpera&&
this.options.zoomAnimation;
if(this._zoomAnimated){
this._createAnimProxy();
on(this._proxy,TRANSITION_END,this._catchTransitionEnd,this);
}
this._addLayers(this.options.layers);
},
setView:function(center,zoom,options){
zoom=zoom===undefined?this._zoom:this._limitZoom(zoom);
center=this._limitCenter(toLatLng(center),zoom,this.options.maxBounds);
options=options||{};
this._stop();
if(this._loaded&&!options.reset&&options!==true){
if(options.animate!==undefined){
options.zoom=extend({animate:options.animate},options.zoom);
options.pan=extend({animate:options.animate,duration:options.duration},options.pan);
}
var moved=(this._zoom!==zoom)?
this._tryAnimatedZoom&&this._tryAnimatedZoom(center,zoom,options.zoom):
this._tryAnimatedPan(center,options.pan);
if(moved){
clearTimeout(this._sizeTimer);
return this;
}
}
this._resetView(center,zoom);
return this;
},
setZoom:function(zoom,options){
if(!this._loaded){
this._zoom=zoom;
return this;
}
return this.setView(this.getCenter(),zoom,{zoom:options});
},
zoomIn:function(delta,options){
delta=delta||(any3d?this.options.zoomDelta:1);
return this.setZoom(this._zoom+delta,options);
},
zoomOut:function(delta,options){
delta=delta||(any3d?this.options.zoomDelta:1);
return this.setZoom(this._zoom-delta,options);
},
setZoomAround:function(latlng,zoom,options){
var scale=this.getZoomScale(zoom),
viewHalf=this.getSize().divideBy(2),
containerPoint=latlng instanceof Point?latlng:this.latLngToContainerPoint(latlng),
centerOffset=containerPoint.subtract(viewHalf).multiplyBy(1-1/scale),
newCenter=this.containerPointToLatLng(viewHalf.add(centerOffset));
return this.setView(newCenter,zoom,{zoom:options});
},
_getBoundsCenterZoom:function(bounds,options){
options=options||{};
bounds=bounds.getBounds?bounds.getBounds():toLatLngBounds(bounds);
var paddingTL=toPoint(options.paddingTopLeft||options.padding||[0,0]),
paddingBR=toPoint(options.paddingBottomRight||options.padding||[0,0]),
zoom=this.getBoundsZoom(bounds,false,paddingTL.add(paddingBR));
zoom=(typeof options.maxZoom==='number')?Math.min(options.maxZoom,zoom):zoom;
if(zoom===Infinity){
return{
center:bounds.getCenter(),
zoom:zoom
};
}
var paddingOffset=paddingBR.subtract(paddingTL).divideBy(2),
swPoint=this.project(bounds.getSouthWest(),zoom),
nePoint=this.project(bounds.getNorthEast(),zoom),
center=this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset),zoom);
return{
center:center,
zoom:zoom
};
},
fitBounds:function(bounds,options){
bounds=toLatLngBounds(bounds);
if(!bounds.isValid()){
throw new Error('Bounds are not valid.');
}
var target=this._getBoundsCenterZoom(bounds,options);
return this.setView(target.center,target.zoom,options);
},
fitWorld:function(options){
return this.fitBounds([[-90,-180],[90,180]],options);
},
panTo:function(center,options){
return this.setView(center,this._zoom,{pan:options});
},
panBy:function(offset,options){
offset=toPoint(offset).round();
options=options||{};
if(!offset.x&&!offset.y){
return this.fire('moveend');
}
if(options.animate!==true&&!this.getSize().contains(offset)){
this._resetView(this.unproject(this.project(this.getCenter()).add(offset)),this.getZoom());
return this;
}
if(!this._panAnim){
this._panAnim=new PosAnimation();
this._panAnim.on({
'step':this._onPanTransitionStep,
'end':this._onPanTransitionEnd
},this);
}
if(!options.noMoveStart){
this.fire('movestart');
}
if(options.animate!==false){
addClass(this._mapPane,'leaflet-pan-anim');
var newPos=this._getMapPanePos().subtract(offset).round();
this._panAnim.run(this._mapPane,newPos,options.duration||0.25,options.easeLinearity);
}else{
this._rawPanBy(offset);
this.fire('move').fire('moveend');
}
return this;
},
flyTo:function(targetCenter,targetZoom,options){
options=options||{};
if(options.animate===false||!any3d){
return this.setView(targetCenter,targetZoom,options);
}
this._stop();
var from=this.project(this.getCenter()),
to=this.project(targetCenter),
size=this.getSize(),
startZoom=this._zoom;
targetCenter=toLatLng(targetCenter);
targetZoom=targetZoom===undefined?startZoom:targetZoom;
var w0=Math.max(size.x,size.y),
w1=w0*this.getZoomScale(startZoom,targetZoom),
u1=(to.distanceTo(from))||1,
rho=1.42,
rho2=rho*rho;
function r(i){
var s1=i?-1:1,
s2=i?w1:w0,
t1=w1*w1-w0*w0+s1*rho2*rho2*u1*u1,
b1=2*s2*rho2*u1,
b=t1/b1,
sq=Math.sqrt(b*b+1)-b;
var log=sq<0.000000001?-18:Math.log(sq);
return log;
}
function sinh(n){return(Math.exp(n)-Math.exp(-n))/2;}
function cosh(n){return(Math.exp(n)+Math.exp(-n))/2;}
function tanh(n){return sinh(n)/cosh(n);}
var r0=r(0);
function w(s){return w0*(cosh(r0)/cosh(r0+rho*s));}
function u(s){return w0*(cosh(r0)*tanh(r0+rho*s)-sinh(r0))/rho2;}
function easeOut(t){return 1-Math.pow(1-t,1.5);}
var start=Date.now(),
S=(r(1)-r0)/rho,
duration=options.duration?1000*options.duration:1000*S*0.8;
function frame(){
var t=(Date.now()-start)/duration,
s=easeOut(t)*S;
if(t<=1){
this._flyToFrame=requestAnimFrame(frame,this);
this._move(
this.unproject(from.add(to.subtract(from).multiplyBy(u(s)/u1)),startZoom),
this.getScaleZoom(w0/w(s),startZoom),
{flyTo:true});
}else{
this
._move(targetCenter,targetZoom)
._moveEnd(true);
}
}
this._moveStart(true,options.noMoveStart);
frame.call(this);
return this;
},
flyToBounds:function(bounds,options){
var target=this._getBoundsCenterZoom(bounds,options);
return this.flyTo(target.center,target.zoom,options);
},
setMaxBounds:function(bounds){
bounds=toLatLngBounds(bounds);
if(!bounds.isValid()){
this.options.maxBounds=null;
return this.off('moveend',this._panInsideMaxBounds);
}else if(this.options.maxBounds){
this.off('moveend',this._panInsideMaxBounds);
}
this.options.maxBounds=bounds;
if(this._loaded){
this._panInsideMaxBounds();
}
return this.on('moveend',this._panInsideMaxBounds);
},
setMinZoom:function(zoom){
var oldZoom=this.options.minZoom;
this.options.minZoom=zoom;
if(this._loaded&&oldZoom!==zoom){
this.fire('zoomlevelschange');
if(this.getZoom()<this.options.minZoom){
return this.setZoom(zoom);
}
}
return this;
},
setMaxZoom:function(zoom){
var oldZoom=this.options.maxZoom;
this.options.maxZoom=zoom;
if(this._loaded&&oldZoom!==zoom){
this.fire('zoomlevelschange');
if(this.getZoom()>this.options.maxZoom){
return this.setZoom(zoom);
}
}
return this;
},
panInsideBounds:function(bounds,options){
this._enforcingBounds=true;
var center=this.getCenter(),
newCenter=this._limitCenter(center,this._zoom,toLatLngBounds(bounds));
if(!center.equals(newCenter)){
this.panTo(newCenter,options);
}
this._enforcingBounds=false;
return this;
},
invalidateSize:function(options){
if(!this._loaded){return this;}
options=extend({
animate:false,
pan:true
},options===true?{animate:true}:options);
var oldSize=this.getSize();
this._sizeChanged=true;
this._lastCenter=null;
var newSize=this.getSize(),
oldCenter=oldSize.divideBy(2).round(),
newCenter=newSize.divideBy(2).round(),
offset=oldCenter.subtract(newCenter);
if(!offset.x&&!offset.y){return this;}
if(options.animate&&options.pan){
this.panBy(offset);
}else{
if(options.pan){
this._rawPanBy(offset);
}
this.fire('move');
if(options.debounceMoveend){
clearTimeout(this._sizeTimer);
this._sizeTimer=setTimeout(bind(this.fire,this,'moveend'),200);
}else{
this.fire('moveend');
}
}
return this.fire('resize',{
oldSize:oldSize,
newSize:newSize
});
},
stop:function(){
this.setZoom(this._limitZoom(this._zoom));
if(!this.options.zoomSnap){
this.fire('viewreset');
}
return this._stop();
},
locate:function(options){
options=this._locateOptions=extend({
timeout:10000,
watch:false
},options);
if(!('geolocation'in navigator)){
this._handleGeolocationError({
code:0,
message:'Geolocation not supported.'
});
return this;
}
var onResponse=bind(this._handleGeolocationResponse,this),
onError=bind(this._handleGeolocationError,this);
if(options.watch){
this._locationWatchId=
navigator.geolocation.watchPosition(onResponse,onError,options);
}else{
navigator.geolocation.getCurrentPosition(onResponse,onError,options);
}
return this;
},
stopLocate:function(){
if(navigator.geolocation&&navigator.geolocation.clearWatch){
navigator.geolocation.clearWatch(this._locationWatchId);
}
if(this._locateOptions){
this._locateOptions.setView=false;
}
return this;
},
_handleGeolocationError:function(error){
var c=error.code,
message=error.message||
(c===1?'permission denied':
(c===2?'position unavailable':'timeout'));
if(this._locateOptions.setView&&!this._loaded){
this.fitWorld();
}
this.fire('locationerror',{
code:c,
message:'Geolocation error: '+message+'.'
});
},
_handleGeolocationResponse:function(pos){
var lat=pos.coords.latitude,
lng=pos.coords.longitude,
latlng=new LatLng(lat,lng),
bounds=latlng.toBounds(pos.coords.accuracy),
options=this._locateOptions;
if(options.setView){
var zoom=this.getBoundsZoom(bounds);
this.setView(latlng,options.maxZoom?Math.min(zoom,options.maxZoom):zoom);
}
var data={
latlng:latlng,
bounds:bounds,
timestamp:pos.timestamp
};
for(var i in pos.coords){
if(typeof pos.coords[i]==='number'){
data[i]=pos.coords[i];
}
}
this.fire('locationfound',data);
},
addHandler:function(name,HandlerClass){
if(!HandlerClass){return this;}
var handler=this[name]=new HandlerClass(this);
this._handlers.push(handler);
if(this.options[name]){
handler.enable();
}
return this;
},
remove:function(){
this._initEvents(true);
if(this._containerId!==this._container._leaflet_id){
throw new Error('Map container is being reused by another instance');
}
try{
delete this._container._leaflet_id;
delete this._containerId;
}catch(e){
this._container._leaflet_id=undefined;
this._containerId=undefined;
}
if(this._locationWatchId!==undefined){
this.stopLocate();
}
this._stop();
remove(this._mapPane);
if(this._clearControlPos){
this._clearControlPos();
}
this._clearHandlers();
if(this._loaded){
this.fire('unload');
}
var i;
for(i in this._layers){
this._layers[i].remove();
}
for(i in this._panes){
remove(this._panes[i]);
}
this._layers=[];
this._panes=[];
delete this._mapPane;
delete this._renderer;
return this;
},
createPane:function(name,container){
var className='leaflet-pane'+(name?' leaflet-'+name.replace('Pane','')+'-pane':''),
pane=create$1('div',className,container||this._mapPane);
if(name){
this._panes[name]=pane;
}
return pane;
},
getCenter:function(){
this._checkIfLoaded();
if(this._lastCenter&&!this._moved()){
return this._lastCenter;
}
return this.layerPointToLatLng(this._getCenterLayerPoint());
},
getZoom:function(){
return this._zoom;
},
getBounds:function(){
var bounds=this.getPixelBounds(),
sw=this.unproject(bounds.getBottomLeft()),
ne=this.unproject(bounds.getTopRight());
return new LatLngBounds(sw,ne);
},
getMinZoom:function(){
return this.options.minZoom===undefined?this._layersMinZoom||0:this.options.minZoom;
},
getMaxZoom:function(){
return this.options.maxZoom===undefined?
(this._layersMaxZoom===undefined?Infinity:this._layersMaxZoom):
this.options.maxZoom;
},
getBoundsZoom:function(bounds,inside,padding){
bounds=toLatLngBounds(bounds);
padding=toPoint(padding||[0,0]);
var zoom=this.getZoom()||0,
min=this.getMinZoom(),
max=this.getMaxZoom(),
nw=bounds.getNorthWest(),
se=bounds.getSouthEast(),
size=this.getSize().subtract(padding),
boundsSize=toBounds(this.project(se,zoom),this.project(nw,zoom)).getSize(),
snap=any3d?this.options.zoomSnap:1,
scalex=size.x/boundsSize.x,
scaley=size.y/boundsSize.y,
scale=inside?Math.max(scalex,scaley):Math.min(scalex,scaley);
zoom=this.getScaleZoom(scale,zoom);
if(snap){
zoom=Math.round(zoom/(snap/ 100)) * (snap/100);

zoom=inside?Math.ceil(zoom/snap)*snap:Math.floor(zoom/snap)*snap;
}
return Math.max(min,Math.min(max,zoom));
},
getSize:function(){
if(!this._size||this._sizeChanged){
this._size=new Point(
this._container.clientWidth||0,
this._container.clientHeight||0);
this._sizeChanged=false;
}
return this._size.clone();
},
getPixelBounds:function(center,zoom){
var topLeftPoint=this._getTopLeftPoint(center,zoom);
return new Bounds(topLeftPoint,topLeftPoint.add(this.getSize()));
},
getPixelOrigin:function(){
this._checkIfLoaded();
return this._pixelOrigin;
},
getPixelWorldBounds:function(zoom){
return this.options.crs.getProjectedBounds(zoom===undefined?this.getZoom():zoom);
},
getPane:function(pane){
return typeof pane==='string'?this._panes[pane]:pane;
},
getPanes:function(){
return this._panes;
},
getContainer:function(){
return this._container;
},
getZoomScale:function(toZoom,fromZoom){
var crs=this.options.crs;
fromZoom=fromZoom===undefined?this._zoom:fromZoom;
return crs.scale(toZoom)/crs.scale(fromZoom);
},
getScaleZoom:function(scale,fromZoom){
var crs=this.options.crs;
fromZoom=fromZoom===undefined?this._zoom:fromZoom;
var zoom=crs.zoom(scale*crs.scale(fromZoom));
return isNaN(zoom)?Infinity:zoom;
},
project:function(latlng,zoom){
zoom=zoom===undefined?this._zoom:zoom;
return this.options.crs.latLngToPoint(toLatLng(latlng),zoom);
},
unproject:function(point,zoom){
zoom=zoom===undefined?this._zoom:zoom;
return this.options.crs.pointToLatLng(toPoint(point),zoom);
},
layerPointToLatLng:function(point){
var projectedPoint=toPoint(point).add(this.getPixelOrigin());
return this.unproject(projectedPoint);
},
latLngToLayerPoint:function(latlng){
var projectedPoint=this.project(toLatLng(latlng))._round();
return projectedPoint._subtract(this.getPixelOrigin());
},
wrapLatLng:function(latlng){
return this.options.crs.wrapLatLng(toLatLng(latlng));
},
wrapLatLngBounds:function(latlng){
return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
},
distance:function(latlng1,latlng2){
return this.options.crs.distance(toLatLng(latlng1),toLatLng(latlng2));
},
containerPointToLayerPoint:function(point){
return toPoint(point).subtract(this._getMapPanePos());
},
layerPointToContainerPoint:function(point){
return toPoint(point).add(this._getMapPanePos());
},
containerPointToLatLng:function(point){
var layerPoint=this.containerPointToLayerPoint(toPoint(point));
return this.layerPointToLatLng(layerPoint);
},
latLngToContainerPoint:function(latlng){
return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
},
mouseEventToContainerPoint:function(e){
return getMousePosition(e,this._container);
},
mouseEventToLayerPoint:function(e){
return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
},
mouseEventToLatLng:function(e){
return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
},
_initContainer:function(id){
var container=this._container=get(id);
if(!container){
throw new Error('Map container not found.');
}else if(container._leaflet_id){
throw new Error('Map container is already initialized.');
}
on(container,'scroll',this._onScroll,this);
this._containerId=stamp(container);
},
_initLayout:function(){
var container=this._container;
this._fadeAnimated=this.options.fadeAnimation&&any3d;
addClass(container,'leaflet-container'+
(touch?' leaflet-touch':'')+
(retina?' leaflet-retina':'')+
(ielt9?' leaflet-oldie':'')+
(safari?' leaflet-safari':'')+
(this._fadeAnimated?' leaflet-fade-anim':''));
var position=getStyle(container,'position');
if(position!=='absolute'&&position!=='relative'&&position!=='fixed'){
container.style.position='relative';
}
this._initPanes();
if(this._initControlPos){
this._initControlPos();
}
},
_initPanes:function(){
var panes=this._panes={};
this._paneRenderers={};
this._mapPane=this.createPane('mapPane',this._container);
setPosition(this._mapPane,new Point(0,0));
this.createPane('tilePane');
this.createPane('shadowPane');
this.createPane('overlayPane');
this.createPane('markerPane');
this.createPane('tooltipPane');
this.createPane('popupPane');
if(!this.options.markerZoomAnimation){
addClass(panes.markerPane,'leaflet-zoom-hide');
addClass(panes.shadowPane,'leaflet-zoom-hide');
}
},
_resetView:function(center,zoom){
setPosition(this._mapPane,new Point(0,0));
var loading=!this._loaded;
this._loaded=true;
zoom=this._limitZoom(zoom);
this.fire('viewprereset');
var zoomChanged=this._zoom!==zoom;
this
._moveStart(zoomChanged,false)
._move(center,zoom)
._moveEnd(zoomChanged);
this.fire('viewreset');
if(loading){
this.fire('load');
}
},
_moveStart:function(zoomChanged,noMoveStart){
if(zoomChanged){
this.fire('zoomstart');
}
if(!noMoveStart){
this.fire('movestart');
}
return this;
},
_move:function(center,zoom,data){
if(zoom===undefined){
zoom=this._zoom;
}
var zoomChanged=this._zoom!==zoom;
this._zoom=zoom;
this._lastCenter=center;
this._pixelOrigin=this._getNewPixelOrigin(center);
if(zoomChanged||(data&&data.pinch)){
this.fire('zoom',data);
}
return this.fire('move',data);
},
_moveEnd:function(zoomChanged){
if(zoomChanged){
this.fire('zoomend');
}
return this.fire('moveend');
},
_stop:function(){
cancelAnimFrame(this._flyToFrame);
if(this._panAnim){
this._panAnim.stop();
}
return this;
},
_rawPanBy:function(offset){
setPosition(this._mapPane,this._getMapPanePos().subtract(offset));
},
_getZoomSpan:function(){
return this.getMaxZoom()-this.getMinZoom();
},
_panInsideMaxBounds:function(){
if(!this._enforcingBounds){
this.panInsideBounds(this.options.maxBounds);
}
},
_checkIfLoaded:function(){
if(!this._loaded){
throw new Error('Set map center and zoom first.');
}
},
_initEvents:function(remove$$1){
this._targets={};
this._targets[stamp(this._container)]=this;
var onOff=remove$$1?off:on;
onOff(this._container,'click dblclick mousedown mouseup '+
'mouseover mouseout mousemove contextmenu keypress',this._handleDOMEvent,this);
if(this.options.trackResize){
onOff(window,'resize',this._onResize,this);
}
if(any3d&&this.options.transform3DLimit){
(remove$$1?this.off:this.on).call(this,'moveend',this._onMoveEnd);
}
},
_onResize:function(){
cancelAnimFrame(this._resizeRequest);
this._resizeRequest=requestAnimFrame(
function(){this.invalidateSize({debounceMoveend:true});},this);
},
_onScroll:function(){
this._container.scrollTop=0;
this._container.scrollLeft=0;
},
_onMoveEnd:function(){
var pos=this._getMapPanePos();
if(Math.max(Math.abs(pos.x),Math.abs(pos.y))>=this.options.transform3DLimit){
this._resetView(this.getCenter(),this.getZoom());
}
},
_findEventTargets:function(e,type){
var targets=[],
target,
isHover=type==='mouseout'||type==='mouseover',
src=e.target||e.srcElement,
dragging=false;
while(src){
target=this._targets[stamp(src)];
if(target&&(type==='click'||type==='preclick')&&!e._simulated&&this._draggableMoved(target)){
dragging=true;
break;
}
if(target&&target.listens(type,true)){
if(isHover&&!isExternalTarget(src,e)){break;}
targets.push(target);
if(isHover){break;}
}
if(src===this._container){break;}
src=src.parentNode;
}
if(!targets.length&&!dragging&&!isHover&&isExternalTarget(src,e)){
targets=[this];
}
return targets;
},
_handleDOMEvent:function(e){
if(!this._loaded||skipped(e)){return;}
var type=e.type;
if(type==='mousedown'||type==='keypress'){
preventOutline(e.target||e.srcElement);
}
this._fireDOMEvent(e,type);
},
_mouseEvents:['click','dblclick','mouseover','mouseout','contextmenu'],
_fireDOMEvent:function(e,type,targets){
if(e.type==='click'){
var synth=extend({},e);
synth.type='preclick';
this._fireDOMEvent(synth,synth.type,targets);
}
if(e._stopped){return;}
targets=(targets||[]).concat(this._findEventTargets(e,type));
if(!targets.length){return;}
var target=targets[0];
if(type==='contextmenu'&&target.listens(type,true)){
preventDefault(e);
}
var data={
originalEvent:e
};
if(e.type!=='keypress'){
var isMarker=target.getLatLng&&(!target._radius||target._radius<=10);
data.containerPoint=isMarker?
this.latLngToContainerPoint(target.getLatLng()):this.mouseEventToContainerPoint(e);
data.layerPoint=this.containerPointToLayerPoint(data.containerPoint);
data.latlng=isMarker?target.getLatLng():this.layerPointToLatLng(data.layerPoint);
}
for(var i=0;i<targets.length;i++){
targets[i].fire(type,data,true);
if(data.originalEvent._stopped||
(targets[i].options.bubblingMouseEvents===false&&indexOf(this._mouseEvents,type)!==-1)){return;}
}
},
_draggableMoved:function(obj){
obj=obj.dragging&&obj.dragging.enabled()?obj:this;
return(obj.dragging&&obj.dragging.moved())||(this.boxZoom&&this.boxZoom.moved());
},
_clearHandlers:function(){
for(var i=0,len=this._handlers.length;i<len;i++){
this._handlers[i].disable();
}
},
whenReady:function(callback,context){
if(this._loaded){
callback.call(context||this,{target:this});
}else{
this.on('load',callback,context);
}
return this;
},
_getMapPanePos:function(){
return getPosition(this._mapPane)||new Point(0,0);
},
_moved:function(){
var pos=this._getMapPanePos();
return pos&&!pos.equals([0,0]);
},
_getTopLeftPoint:function(center,zoom){
var pixelOrigin=center&&zoom!==undefined?
this._getNewPixelOrigin(center,zoom):
this.getPixelOrigin();
return pixelOrigin.subtract(this._getMapPanePos());
},
_getNewPixelOrigin:function(center,zoom){
var viewHalf=this.getSize()._divideBy(2);
return this.project(center,zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
},
_latLngToNewLayerPoint:function(latlng,zoom,center){
var topLeft=this._getNewPixelOrigin(center,zoom);
return this.project(latlng,zoom)._subtract(topLeft);
},
_latLngBoundsToNewLayerBounds:function(latLngBounds,zoom,center){
var topLeft=this._getNewPixelOrigin(center,zoom);
return toBounds([
this.project(latLngBounds.getSouthWest(),zoom)._subtract(topLeft),
this.project(latLngBounds.getNorthWest(),zoom)._subtract(topLeft),
this.project(latLngBounds.getSouthEast(),zoom)._subtract(topLeft),
this.project(latLngBounds.getNorthEast(),zoom)._subtract(topLeft)
]);
},
_getCenterLayerPoint:function(){
return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
},
_getCenterOffset:function(latlng){
return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
},
_limitCenter:function(center,zoom,bounds){
if(!bounds){return center;}
var centerPoint=this.project(center,zoom),
viewHalf=this.getSize().divideBy(2),
viewBounds=new Bounds(centerPoint.subtract(viewHalf),centerPoint.add(viewHalf)),
offset=this._getBoundsOffset(viewBounds,bounds,zoom);
if(offset.round().equals([0,0])){
return center;
}
return this.unproject(centerPoint.add(offset),zoom);
},
_limitOffset:function(offset,bounds){
if(!bounds){return offset;}
var viewBounds=this.getPixelBounds(),
newBounds=new Bounds(viewBounds.min.add(offset),viewBounds.max.add(offset));
return offset.add(this._getBoundsOffset(newBounds,bounds));
},
_getBoundsOffset:function(pxBounds,maxBounds,zoom){
var projectedMaxBounds=toBounds(
this.project(maxBounds.getNorthEast(),zoom),
this.project(maxBounds.getSouthWest(),zoom)
),
minOffset=projectedMaxBounds.min.subtract(pxBounds.min),
maxOffset=projectedMaxBounds.max.subtract(pxBounds.max),
dx=this._rebound(minOffset.x,-maxOffset.x),
dy=this._rebound(minOffset.y,-maxOffset.y);
return new Point(dx,dy);
},
_rebound:function(left,right){
return left+right>0?
Math.round(left-right)/2:
Math.max(0,Math.ceil(left))-Math.max(0,Math.floor(right));
},
_limitZoom:function(zoom){
var min=this.getMinZoom(),
max=this.getMaxZoom(),
snap=any3d?this.options.zoomSnap:1;
if(snap){
zoom=Math.round(zoom/snap)*snap;
}
return Math.max(min,Math.min(max,zoom));
},
_onPanTransitionStep:function(){
this.fire('move');
},
_onPanTransitionEnd:function(){
removeClass(this._mapPane,'leaflet-pan-anim');
this.fire('moveend');
},
_tryAnimatedPan:function(center,options){
var offset=this._getCenterOffset(center)._trunc();
if((options&&options.animate)!==true&&!this.getSize().contains(offset)){return false;}
this.panBy(offset,options);
return true;
},
_createAnimProxy:function(){
var proxy=this._proxy=create$1('div','leaflet-proxy leaflet-zoom-animated');
this._panes.mapPane.appendChild(proxy);
this.on('zoomanim',function(e){
var prop=TRANSFORM,
transform=this._proxy.style[prop];
setTransform(this._proxy,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1));
if(transform===this._proxy.style[prop]&&this._animatingZoom){
this._onZoomTransitionEnd();
}
},this);
this.on('load moveend',function(){
var c=this.getCenter(),
z=this.getZoom();
setTransform(this._proxy,this.project(c,z),this.getZoomScale(z,1));
},this);
this._on('unload',this._destroyAnimProxy,this);
},
_destroyAnimProxy:function(){
remove(this._proxy);
delete this._proxy;
},
_catchTransitionEnd:function(e){
if(this._animatingZoom&&e.propertyName.indexOf('transform')>=0){
this._onZoomTransitionEnd();
}
},
_nothingToAnimate:function(){
return!this._container.getElementsByClassName('leaflet-zoom-animated').length;
},
_tryAnimatedZoom:function(center,zoom,options){
if(this._animatingZoom){return true;}
options=options||{};
if(!this._zoomAnimated||options.animate===false||this._nothingToAnimate()||
Math.abs(zoom-this._zoom)>this.options.zoomAnimationThreshold){return false;}
var scale=this.getZoomScale(zoom),
offset=this._getCenterOffset(center)._divideBy(1-1/scale);
if(options.animate!==true&&!this.getSize().contains(offset)){return false;}
requestAnimFrame(function(){
this
._moveStart(true,false)
._animateZoom(center,zoom,true);
},this);
return true;
},
_animateZoom:function(center,zoom,startAnim,noUpdate){
if(!this._mapPane){return;}
if(startAnim){
this._animatingZoom=true;
this._animateToCenter=center;
this._animateToZoom=zoom;
addClass(this._mapPane,'leaflet-zoom-anim');
}
this.fire('zoomanim',{
center:center,
zoom:zoom,
noUpdate:noUpdate
});
setTimeout(bind(this._onZoomTransitionEnd,this),250);
},
_onZoomTransitionEnd:function(){
if(!this._animatingZoom){return;}
if(this._mapPane){
removeClass(this._mapPane,'leaflet-zoom-anim');
}
this._animatingZoom=false;
this._move(this._animateToCenter,this._animateToZoom);
requestAnimFrame(function(){
this._moveEnd(true);
},this);
}
});
function createMap(id,options){
return new Map(id,options);
}
var Control=Class.extend({
options:{
position:'topright'
},
initialize:function(options){
setOptions(this,options);
},
getPosition:function(){
return this.options.position;
},
setPosition:function(position){
var map=this._map;
if(map){
map.removeControl(this);
}
this.options.position=position;
if(map){
map.addControl(this);
}
return this;
},
getContainer:function(){
return this._container;
},
addTo:function(map){
this.remove();
this._map=map;
var container=this._container=this.onAdd(map),
pos=this.getPosition(),
corner=map._controlCorners[pos];
addClass(container,'leaflet-control');
if(pos.indexOf('bottom')!==-1){
corner.insertBefore(container,corner.firstChild);
}else{
corner.appendChild(container);
}
return this;
},
remove:function(){
if(!this._map){
return this;
}
remove(this._container);
if(this.onRemove){
this.onRemove(this._map);
}
this._map=null;
return this;
},
_refocusOnMap:function(e){
if(this._map&&e&&e.screenX>0&&e.screenY>0){
this._map.getContainer().focus();
}
}
});
var control=function(options){
return new Control(options);
};
Map.include({
addControl:function(control){
control.addTo(this);
return this;
},
removeControl:function(control){
control.remove();
return this;
},
_initControlPos:function(){
var corners=this._controlCorners={},
l='leaflet-',
container=this._controlContainer=
create$1('div',l+'control-container',this._container);
function createCorner(vSide,hSide){
var className=l+vSide+' '+l+hSide;
corners[vSide+hSide]=create$1('div',className,container);
}
createCorner('top','left');
createCorner('top','right');
createCorner('bottom','left');
createCorner('bottom','right');
},
_clearControlPos:function(){
for(var i in this._controlCorners){
remove(this._controlCorners[i]);
}
remove(this._controlContainer);
delete this._controlCorners;
delete this._controlContainer;
}
});
var Layers=Control.extend({
options:{
collapsed:true,
position:'topright',
autoZIndex:true,
hideSingleBase:false,
sortLayers:false,
sortFunction:function(layerA,layerB,nameA,nameB){
return nameA<nameB?-1:(nameB<nameA?1:0);
}
},
initialize:function(baseLayers,overlays,options){
setOptions(this,options);
this._layerControlInputs=[];
this._layers=[];
this._lastZIndex=0;
this._handlingClick=false;
for(var i in baseLayers){
this._addLayer(baseLayers[i],i);
}
for(i in overlays){
this._addLayer(overlays[i],i,true);
}
},
onAdd:function(map){
this._initLayout();
this._update();
this._map=map;
map.on('zoomend',this._checkDisabledLayers,this);
for(var i=0;i<this._layers.length;i++){
this._layers[i].layer.on('add remove',this._onLayerChange,this);
}
return this._container;
},
addTo:function(map){
Control.prototype.addTo.call(this,map);
return this._expandIfNotCollapsed();
},
onRemove:function(){
this._map.off('zoomend',this._checkDisabledLayers,this);
for(var i=0;i<this._layers.length;i++){
this._layers[i].layer.off('add remove',this._onLayerChange,this);
}
},
addBaseLayer:function(layer,name){
this._addLayer(layer,name);
return(this._map)?this._update():this;
},
addOverlay:function(layer,name){
this._addLayer(layer,name,true);
return(this._map)?this._update():this;
},
removeLayer:function(layer){
layer.off('add remove',this._onLayerChange,this);
var obj=this._getLayer(stamp(layer));
if(obj){
this._layers.splice(this._layers.indexOf(obj),1);
}
return(this._map)?this._update():this;
},
expand:function(){
addClass(this._container,'leaflet-control-layers-expanded');
this._form.style.height=null;
var acceptableHeight=this._map.getSize().y-(this._container.offsetTop+50);
if(acceptableHeight<this._form.clientHeight){
addClass(this._form,'leaflet-control-layers-scrollbar');
this._form.style.height=acceptableHeight+'px';
}else{
removeClass(this._form,'leaflet-control-layers-scrollbar');
}
this._checkDisabledLayers();
return this;
},
collapse:function(){
removeClass(this._container,'leaflet-control-layers-expanded');
return this;
},
_initLayout:function(){
var className='leaflet-control-layers',
container=this._container=create$1('div',className),
collapsed=this.options.collapsed;
container.setAttribute('aria-haspopup',true);
disableClickPropagation(container);
disableScrollPropagation(container);
var form=this._form=create$1('form',className+'-list');
if(collapsed){
this._map.on('click',this.collapse,this);
if(!android){
on(container,{
mouseenter:this.expand,
mouseleave:this.collapse
},this);
}
}
var link=this._layersLink=create$1('a',className+'-toggle',container);
link.href='#';
link.title='Layers';
if(touch){
on(link,'click',stop);
on(link,'click',this.expand,this);
}else{
on(link,'focus',this.expand,this);
}
if(!collapsed){
this.expand();
}
this._baseLayersList=create$1('div',className+'-base',form);
this._separator=create$1('div',className+'-separator',form);
this._overlaysList=create$1('div',className+'-overlays',form);
container.appendChild(form);
},
_getLayer:function(id){
for(var i=0;i<this._layers.length;i++){
if(this._layers[i]&&stamp(this._layers[i].layer)===id){
return this._layers[i];
}
}
},
_addLayer:function(layer,name,overlay){
if(this._map){
layer.on('add remove',this._onLayerChange,this);
}
this._layers.push({
layer:layer,
name:name,
overlay:overlay
});
if(this.options.sortLayers){
this._layers.sort(bind(function(a,b){
return this.options.sortFunction(a.layer,b.layer,a.name,b.name);
},this));
}
if(this.options.autoZIndex&&layer.setZIndex){
this._lastZIndex++;
layer.setZIndex(this._lastZIndex);
}
this._expandIfNotCollapsed();
},
_update:function(){
if(!this._container){return this;}
empty(this._baseLayersList);
empty(this._overlaysList);
this._layerControlInputs=[];
var baseLayersPresent,overlaysPresent,i,obj,baseLayersCount=0;
for(i=0;i<this._layers.length;i++){
obj=this._layers[i];
this._addItem(obj);
overlaysPresent=overlaysPresent||obj.overlay;
baseLayersPresent=baseLayersPresent||!obj.overlay;
baseLayersCount+=!obj.overlay?1:0;
}
if(this.options.hideSingleBase){
baseLayersPresent=baseLayersPresent&&baseLayersCount>1;
this._baseLayersList.style.display=baseLayersPresent?'':'none';
}
this._separator.style.display=overlaysPresent&&baseLayersPresent?'':'none';
return this;
},
_onLayerChange:function(e){
if(!this._handlingClick){
this._update();
}
var obj=this._getLayer(stamp(e.target));
var type=obj.overlay?
(e.type==='add'?'overlayadd':'overlayremove'):
(e.type==='add'?'baselayerchange':null);
if(type){
this._map.fire(type,obj);
}
},
_createRadioElement:function(name,checked){
var radioHtml='<input type="radio" class="leaflet-control-layers-selector" name="'+
name+'"'+(checked?' checked="checked"':'')+'/>';
var radioFragment=document.createElement('div');
radioFragment.innerHTML=radioHtml;
return radioFragment.firstChild;
},
_addItem:function(obj){
var label=document.createElement('label'),
checked=this._map.hasLayer(obj.layer),
input;
if(obj.overlay){
input=document.createElement('input');
input.type='checkbox';
input.className='leaflet-control-layers-selector';
input.defaultChecked=checked;
}else{
input=this._createRadioElement('leaflet-base-layers',checked);
}
this._layerControlInputs.push(input);
input.layerId=stamp(obj.layer);
on(input,'click',this._onInputClick,this);
var name=document.createElement('span');
name.innerHTML=' '+obj.name;
var holder=document.createElement('div');
label.appendChild(holder);
holder.appendChild(input);
holder.appendChild(name);
var container=obj.overlay?this._overlaysList:this._baseLayersList;
container.appendChild(label);
this._checkDisabledLayers();
return label;
},
_onInputClick:function(){
var inputs=this._layerControlInputs,
input,layer;
var addedLayers=[],
removedLayers=[];
this._handlingClick=true;
for(var i=inputs.length-1;i>=0;i--){
input=inputs[i];
layer=this._getLayer(input.layerId).layer;
if(input.checked){
addedLayers.push(layer);
}else if(!input.checked){
removedLayers.push(layer);
}
}
for(i=0;i<removedLayers.length;i++){
if(this._map.hasLayer(removedLayers[i])){
this._map.removeLayer(removedLayers[i]);
}
}
for(i=0;i<addedLayers.length;i++){
if(!this._map.hasLayer(addedLayers[i])){
this._map.addLayer(addedLayers[i]);
}
}
this._handlingClick=false;
this._refocusOnMap();
},
_checkDisabledLayers:function(){
var inputs=this._layerControlInputs,
input,
layer,
zoom=this._map.getZoom();
for(var i=inputs.length-1;i>=0;i--){
input=inputs[i];
layer=this._getLayer(input.layerId).layer;
input.disabled=(layer.options.minZoom!==undefined&&zoom<layer.options.minZoom)||
(layer.options.maxZoom!==undefined&&zoom>layer.options.maxZoom);
}
},
_expandIfNotCollapsed:function(){
if(this._map&&!this.options.collapsed){
this.expand();
}
return this;
},
_expand:function(){
return this.expand();
},
_collapse:function(){
return this.collapse();
}
});
var layers=function(baseLayers,overlays,options){
return new Layers(baseLayers,overlays,options);
};
var Zoom=Control.extend({
options:{
position:'topleft',
zoomInText:'+',
zoomInTitle:'Zoom in',
zoomOutText:'&#x2212;',
zoomOutTitle:'Zoom out'
},
onAdd:function(map){
var zoomName='leaflet-control-zoom',
container=create$1('div',zoomName+' leaflet-bar'),
options=this.options;
this._zoomInButton=this._createButton(options.zoomInText,options.zoomInTitle,
zoomName+'-in',container,this._zoomIn);
this._zoomOutButton=this._createButton(options.zoomOutText,options.zoomOutTitle,
zoomName+'-out',container,this._zoomOut);
this._updateDisabled();
map.on('zoomend zoomlevelschange',this._updateDisabled,this);
return container;
},
onRemove:function(map){
map.off('zoomend zoomlevelschange',this._updateDisabled,this);
},
disable:function(){
this._disabled=true;
this._updateDisabled();
return this;
},
enable:function(){
this._disabled=false;
this._updateDisabled();
return this;
},
_zoomIn:function(e){
if(!this._disabled&&this._map._zoom<this._map.getMaxZoom()){
this._map.zoomIn(this._map.options.zoomDelta*(e.shiftKey?3:1));
}
},
_zoomOut:function(e){
if(!this._disabled&&this._map._zoom>this._map.getMinZoom()){
this._map.zoomOut(this._map.options.zoomDelta*(e.shiftKey?3:1));
}
},
_createButton:function(html,title,className,container,fn){
var link=create$1('a',className,container);
link.innerHTML=html;
link.href='#';
link.title=title;
link.setAttribute('role','button');
link.setAttribute('aria-label',title);
disableClickPropagation(link);
on(link,'click',stop);
on(link,'click',fn,this);
on(link,'click',this._refocusOnMap,this);
return link;
},
_updateDisabled:function(){
var map=this._map,
className='leaflet-disabled';
removeClass(this._zoomInButton,className);
removeClass(this._zoomOutButton,className);
if(this._disabled||map._zoom===map.getMinZoom()){
addClass(this._zoomOutButton,className);
}
if(this._disabled||map._zoom===map.getMaxZoom()){
addClass(this._zoomInButton,className);
}
}
});
Map.mergeOptions({
zoomControl:true
});
Map.addInitHook(function(){
if(this.options.zoomControl){
this.zoomControl=new Zoom();
this.addControl(this.zoomControl);
}
});
var zoom=function(options){
return new Zoom(options);
};
var Scale=Control.extend({
options:{
position:'bottomleft',
maxWidth:100,
metric:true,
imperial:true
},
onAdd:function(map){
var className='leaflet-control-scale',
container=create$1('div',className),
options=this.options;
this._addScales(options,className+'-line',container);
map.on(options.updateWhenIdle?'moveend':'move',this._update,this);
map.whenReady(this._update,this);
return container;
},
onRemove:function(map){
map.off(this.options.updateWhenIdle?'moveend':'move',this._update,this);
},
_addScales:function(options,className,container){
if(options.metric){
this._mScale=create$1('div',className,container);
}
if(options.imperial){
this._iScale=create$1('div',className,container);
}
},
_update:function(){
var map=this._map,
y=map.getSize().y/2;
var maxMeters=map.distance(
map.containerPointToLatLng([0,y]),
map.containerPointToLatLng([this.options.maxWidth,y]));
this._updateScales(maxMeters);
},
_updateScales:function(maxMeters){
if(this.options.metric&&maxMeters){
this._updateMetric(maxMeters);
}
if(this.options.imperial&&maxMeters){
this._updateImperial(maxMeters);
}
},
_updateMetric:function(maxMeters){
var meters=this._getRoundNum(maxMeters),
label=meters<1000?meters+' m':(meters/1000)+' km';
this._updateScale(this._mScale,label,meters/maxMeters);
},
_updateImperial:function(maxMeters){
var maxFeet=maxMeters*3.2808399,
maxMiles,miles,feet;
if(maxFeet>5280){
maxMiles=maxFeet/5280;
miles=this._getRoundNum(maxMiles);
this._updateScale(this._iScale,miles+' mi',miles/maxMiles);
}else{
feet=this._getRoundNum(maxFeet);
this._updateScale(this._iScale,feet+' ft',feet/maxFeet);
}
},
_updateScale:function(scale,text,ratio){
scale.style.width=Math.round(this.options.maxWidth*ratio)+'px';
scale.innerHTML=text;
},
_getRoundNum:function(num){
var pow10=Math.pow(10,(Math.floor(num)+'').length-1),
d=num/pow10;
d=d>=10?10:
d>=5?5:
d>=3?3:
d>=2?2:1;
return pow10*d;
}
});
var scale=function(options){
return new Scale(options);
};
var Attribution=Control.extend({
options:{
position:'bottomright',
prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
},
initialize:function(options){
setOptions(this,options);
this._attributions={};
},
onAdd:function(map){
map.attributionControl=this;
this._container=create$1('div','leaflet-control-attribution');
disableClickPropagation(this._container);
for(var i in map._layers){
if(map._layers[i].getAttribution){
this.addAttribution(map._layers[i].getAttribution());
}
}
this._update();
return this._container;
},
setPrefix:function(prefix){
this.options.prefix=prefix;
this._update();
return this;
},
addAttribution:function(text){
if(!text){return this;}
if(!this._attributions[text]){
this._attributions[text]=0;
}
this._attributions[text]++;
this._update();
return this;
},
removeAttribution:function(text){
if(!text){return this;}
if(this._attributions[text]){
this._attributions[text]--;
this._update();
}
return this;
},
_update:function(){
if(!this._map){return;}
var attribs=[];
for(var i in this._attributions){
if(this._attributions[i]){
attribs.push(i);
}
}
var prefixAndAttribs=[];
if(this.options.prefix){
prefixAndAttribs.push(this.options.prefix);
}
if(attribs.length){
prefixAndAttribs.push(attribs.join(', '));
}
this._container.innerHTML=prefixAndAttribs.join(' | ');
}
});
Map.mergeOptions({
attributionControl:true
});
Map.addInitHook(function(){
if(this.options.attributionControl){
new Attribution().addTo(this);
}
});
var attribution=function(options){
return new Attribution(options);
};
Control.Layers=Layers;
Control.Zoom=Zoom;
Control.Scale=Scale;
Control.Attribution=Attribution;
control.layers=layers;
control.zoom=zoom;
control.scale=scale;
control.attribution=attribution;
var Handler=Class.extend({
initialize:function(map){
this._map=map;
},
enable:function(){
if(this._enabled){return this;}
this._enabled=true;
this.addHooks();
return this;
},
disable:function(){
if(!this._enabled){return this;}
this._enabled=false;
this.removeHooks();
return this;
},
enabled:function(){
return!!this._enabled;
}
});
Handler.addTo=function(map,name){
map.addHandler(name,this);
return this;
};
var Mixin={Events:Events};
var START=touch?'touchstart mousedown':'mousedown';
var END={
mousedown:'mouseup',
touchstart:'touchend',
pointerdown:'touchend',
MSPointerDown:'touchend'
};
var MOVE={
mousedown:'mousemove',
touchstart:'touchmove',
pointerdown:'touchmove',
MSPointerDown:'touchmove'
};
var Draggable=Evented.extend({
options:{
clickTolerance:3
},
initialize:function(element,dragStartTarget,preventOutline$$1,options){
setOptions(this,options);
this._element=element;
this._dragStartTarget=dragStartTarget||element;
this._preventOutline=preventOutline$$1;
},
enable:function(){
if(this._enabled){return;}
on(this._dragStartTarget,START,this._onDown,this);
this._enabled=true;
},
disable:function(){
if(!this._enabled){return;}
if(Draggable._dragging===this){
this.finishDrag();
}
off(this._dragStartTarget,START,this._onDown,this);
this._enabled=false;
this._moved=false;
},
_onDown:function(e){
if(e._simulated||!this._enabled){return;}
this._moved=false;
if(hasClass(this._element,'leaflet-zoom-anim')){return;}
if(Draggable._dragging||e.shiftKey||((e.which!==1)&&(e.button!==1)&&!e.touches)){return;}
Draggable._dragging=this;
if(this._preventOutline){
preventOutline(this._element);
}
disableImageDrag();
disableTextSelection();
if(this._moving){return;}
this.fire('down');
var first=e.touches?e.touches[0]:e;
this._startPoint=new Point(first.clientX,first.clientY);
on(document,MOVE[e.type],this._onMove,this);
on(document,END[e.type],this._onUp,this);
},
_onMove:function(e){
if(e._simulated||!this._enabled){return;}
if(e.touches&&e.touches.length>1){
this._moved=true;
return;
}
var first=(e.touches&&e.touches.length===1?e.touches[0]:e),
newPoint=new Point(first.clientX,first.clientY),
offset=newPoint.subtract(this._startPoint);
if(!offset.x&&!offset.y){return;}
if(Math.abs(offset.x)+Math.abs(offset.y)<this.options.clickTolerance){return;}
preventDefault(e);
if(!this._moved){
this.fire('dragstart');
this._moved=true;
this._startPos=getPosition(this._element).subtract(offset);
addClass(document.body,'leaflet-dragging');
this._lastTarget=e.target||e.srcElement;
if((window.SVGElementInstance)&&(this._lastTarget instanceof SVGElementInstance)){
this._lastTarget=this._lastTarget.correspondingUseElement;
}
addClass(this._lastTarget,'leaflet-drag-target');
}
this._newPos=this._startPos.add(offset);
this._moving=true;
cancelAnimFrame(this._animRequest);
this._lastEvent=e;
this._animRequest=requestAnimFrame(this._updatePosition,this,true);
},
_updatePosition:function(){
var e={originalEvent:this._lastEvent};
this.fire('predrag',e);
setPosition(this._element,this._newPos);
this.fire('drag',e);
},
_onUp:function(e){
if(e._simulated||!this._enabled){return;}
this.finishDrag();
},
finishDrag:function(){
removeClass(document.body,'leaflet-dragging');
if(this._lastTarget){
removeClass(this._lastTarget,'leaflet-drag-target');
this._lastTarget=null;
}
for(var i in MOVE){
off(document,MOVE[i],this._onMove,this);
off(document,END[i],this._onUp,this);
}
enableImageDrag();
enableTextSelection();
if(this._moved&&this._moving){
cancelAnimFrame(this._animRequest);
this.fire('dragend',{
distance:this._newPos.distanceTo(this._startPos)
});
}
this._moving=false;
Draggable._dragging=false;
}
});
function simplify(points,tolerance){
if(!tolerance||!points.length){
return points.slice();
}
var sqTolerance=tolerance*tolerance;
points=_reducePoints(points,sqTolerance);
points=_simplifyDP(points,sqTolerance);
return points;
}
function pointToSegmentDistance(p,p1,p2){
return Math.sqrt(_sqClosestPointOnSegment(p,p1,p2,true));
}
function closestPointOnSegment(p,p1,p2){
return _sqClosestPointOnSegment(p,p1,p2);
}
function _simplifyDP(points,sqTolerance){
var len=points.length,
ArrayConstructor=typeof Uint8Array!==undefined+''?Uint8Array:Array,
markers=new ArrayConstructor(len);
markers[0]=markers[len-1]=1;
_simplifyDPStep(points,markers,sqTolerance,0,len-1);
var i,
newPoints=[];
for(i=0;i<len;i++){
if(markers[i]){
newPoints.push(points[i]);
}
}
return newPoints;
}
function _simplifyDPStep(points,markers,sqTolerance,first,last){
var maxSqDist=0,
index,i,sqDist;
for(i=first+1;i<=last-1;i++){
sqDist=_sqClosestPointOnSegment(points[i],points[first],points[last],true);
if(sqDist>maxSqDist){
index=i;
maxSqDist=sqDist;
}
}
if(maxSqDist>sqTolerance){
markers[index]=1;
_simplifyDPStep(points,markers,sqTolerance,first,index);
_simplifyDPStep(points,markers,sqTolerance,index,last);
}
}
function _reducePoints(points,sqTolerance){
var reducedPoints=[points[0]];
for(var i=1,prev=0,len=points.length;i<len;i++){
if(_sqDist(points[i],points[prev])>sqTolerance){
reducedPoints.push(points[i]);
prev=i;
}
}
if(prev<len-1){
reducedPoints.push(points[len-1]);
}
return reducedPoints;
}
var _lastCode;
function clipSegment(a,b,bounds,useLastCode,round){
var codeA=useLastCode?_lastCode:_getBitCode(a,bounds),
codeB=_getBitCode(b,bounds),
codeOut,p,newCode;
_lastCode=codeB;
while(true){
if(!(codeA|codeB)){
return[a,b];
}
if(codeA&codeB){
return false;
}
codeOut=codeA||codeB;
p=_getEdgeIntersection(a,b,codeOut,bounds,round);
newCode=_getBitCode(p,bounds);
if(codeOut===codeA){
a=p;
codeA=newCode;
}else{
b=p;
codeB=newCode;
}
}
}
function _getEdgeIntersection(a,b,code,bounds,round){
var dx=b.x-a.x,
dy=b.y-a.y,
min=bounds.min,
max=bounds.max,
x,y;
if(code&8){
x=a.x+dx*(max.y-a.y)/dy;
y=max.y;
}else if(code&4){
x=a.x+dx*(min.y-a.y)/dy;
y=min.y;
}else if(code&2){
x=max.x;
y=a.y+dy*(max.x-a.x)/dx;
}else if(code&1){
x=min.x;
y=a.y+dy*(min.x-a.x)/dx;
}
return new Point(x,y,round);
}
function _getBitCode(p,bounds){
var code=0;
if(p.x<bounds.min.x){
code|=1;
}else if(p.x>bounds.max.x){
code|=2;
}
if(p.y<bounds.min.y){
code|=4;
}else if(p.y>bounds.max.y){
code|=8;
}
return code;
}
function _sqDist(p1,p2){
var dx=p2.x-p1.x,
dy=p2.y-p1.y;
return dx*dx+dy*dy;
}
function _sqClosestPointOnSegment(p,p1,p2,sqDist){
var x=p1.x,
y=p1.y,
dx=p2.x-x,
dy=p2.y-y,
dot=dx*dx+dy*dy,
t;
if(dot>0){
t=((p.x-x)*dx+(p.y-y)*dy)/dot;
if(t>1){
x=p2.x;
y=p2.y;
}else if(t>0){
x+=dx*t;
y+=dy*t;
}
}
dx=p.x-x;
dy=p.y-y;
return sqDist?dx*dx+dy*dy:new Point(x,y);
}
function isFlat(latlngs){
return!isArray(latlngs[0])||(typeof latlngs[0][0]!=='object'&&typeof latlngs[0][0]!=='undefined');
}
function _flat(latlngs){
console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.');
return isFlat(latlngs);
}
var LineUtil=(Object.freeze||Object)({
simplify:simplify,
pointToSegmentDistance:pointToSegmentDistance,
closestPointOnSegment:closestPointOnSegment,
clipSegment:clipSegment,
_getEdgeIntersection:_getEdgeIntersection,
_getBitCode:_getBitCode,
_sqClosestPointOnSegment:_sqClosestPointOnSegment,
isFlat:isFlat,
_flat:_flat
});
function clipPolygon(points,bounds,round){
var clippedPoints,
edges=[1,4,2,8],
i,j,k,
a,b,
len,edge,p;
for(i=0,len=points.length;i<len;i++){
points[i]._code=_getBitCode(points[i],bounds);
}
for(k=0;k<4;k++){
edge=edges[k];
clippedPoints=[];
for(i=0,len=points.length,j=len-1;i<len;j=i++){
a=points[i];
b=points[j];
if(!(a._code&edge)){
if(b._code&edge){
p=_getEdgeIntersection(b,a,edge,bounds,round);
p._code=_getBitCode(p,bounds);
clippedPoints.push(p);
}
clippedPoints.push(a);
}else if(!(b._code&edge)){
p=_getEdgeIntersection(b,a,edge,bounds,round);
p._code=_getBitCode(p,bounds);
clippedPoints.push(p);
}
}
points=clippedPoints;
}
return points;
}
var PolyUtil=(Object.freeze||Object)({
clipPolygon:clipPolygon
});
var LonLat={
project:function(latlng){
return new Point(latlng.lng,latlng.lat);
},
unproject:function(point){
return new LatLng(point.y,point.x);
},
bounds:new Bounds([-180,-90],[180,90])
};
var Mercator={
R:6378137,
R_MINOR:6356752.314245179,
bounds:new Bounds([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),
project:function(latlng){
var d=Math.PI/180,
r=this.R,
y=latlng.lat*d,
tmp=this.R_MINOR/r,
e=Math.sqrt(1-tmp*tmp),
con=e*Math.sin(y);
var ts=Math.tan(Math.PI/4-y/ 2)/Math.pow((1-con)/ (1 + con), e /2);
y=-r*Math.log(Math.max(ts,1E-10));
return new Point(latlng.lng*d*r,y);
},
unproject:function(point){
var d=180/Math.PI,
r=this.R,
tmp=this.R_MINOR/r,
e=Math.sqrt(1-tmp*tmp),
ts=Math.exp(-point.y/r),
phi=Math.PI/2-2*Math.atan(ts);
for(var i=0,dphi=0.1,con;i<15&&Math.abs(dphi)>1e-7;i++){
con=e*Math.sin(phi);
con=Math.pow((1-con)/(1+con),e/2);
dphi=Math.PI/2-2*Math.atan(ts*con)-phi;
phi+=dphi;
}
return new LatLng(phi*d,point.x*d/r);
}
};
var index=(Object.freeze||Object)({
LonLat:LonLat,
Mercator:Mercator,
SphericalMercator:SphericalMercator
});
var EPSG3395=extend({},Earth,{
code:'EPSG:3395',
projection:Mercator,
transformation:(function(){
var scale=0.5/(Math.PI*Mercator.R);
return toTransformation(scale,0.5,-scale,0.5);
}())
});
var EPSG4326=extend({},Earth,{
code:'EPSG:4326',
projection:LonLat,
transformation:toTransformation(1/180,1,-1/180,0.5)
});
var Simple=extend({},CRS,{
projection:LonLat,
transformation:toTransformation(1,0,-1,0),
scale:function(zoom){
return Math.pow(2,zoom);
},
zoom:function(scale){
return Math.log(scale)/Math.LN2;
},
distance:function(latlng1,latlng2){
var dx=latlng2.lng-latlng1.lng,
dy=latlng2.lat-latlng1.lat;
return Math.sqrt(dx*dx+dy*dy);
},
infinite:true
});
CRS.Earth=Earth;
CRS.EPSG3395=EPSG3395;
CRS.EPSG3857=EPSG3857;
CRS.EPSG900913=EPSG900913;
CRS.EPSG4326=EPSG4326;
CRS.Simple=Simple;
var Layer=Evented.extend({
options:{
pane:'overlayPane',
attribution:null,
bubblingMouseEvents:true
},
addTo:function(map){
map.addLayer(this);
return this;
},
remove:function(){
return this.removeFrom(this._map||this._mapToAdd);
},
removeFrom:function(obj){
if(obj){
obj.removeLayer(this);
}
return this;
},
getPane:function(name){
return this._map.getPane(name?(this.options[name]||name):this.options.pane);
},
addInteractiveTarget:function(targetEl){
this._map._targets[stamp(targetEl)]=this;
return this;
},
removeInteractiveTarget:function(targetEl){
delete this._map._targets[stamp(targetEl)];
return this;
},
getAttribution:function(){
return this.options.attribution;
},
_layerAdd:function(e){
var map=e.target;
if(!map.hasLayer(this)){return;}
this._map=map;
this._zoomAnimated=map._zoomAnimated;
if(this.getEvents){
var events=this.getEvents();
map.on(events,this);
this.once('remove',function(){
map.off(events,this);
},this);
}
this.onAdd(map);
if(this.getAttribution&&map.attributionControl){
map.attributionControl.addAttribution(this.getAttribution());
}
this.fire('add');
map.fire('layeradd',{layer:this});
}
});
Map.include({
addLayer:function(layer){
if(!layer._layerAdd){
throw new Error('The provided object is not a Layer.');
}
var id=stamp(layer);
if(this._layers[id]){return this;}
this._layers[id]=layer;
layer._mapToAdd=this;
if(layer.beforeAdd){
layer.beforeAdd(this);
}
this.whenReady(layer._layerAdd,layer);
return this;
},
removeLayer:function(layer){
var id=stamp(layer);
if(!this._layers[id]){return this;}
if(this._loaded){
layer.onRemove(this);
}
if(layer.getAttribution&&this.attributionControl){
this.attributionControl.removeAttribution(layer.getAttribution());
}
delete this._layers[id];
if(this._loaded){
this.fire('layerremove',{layer:layer});
layer.fire('remove');
}
layer._map=layer._mapToAdd=null;
return this;
},
hasLayer:function(layer){
return!!layer&&(stamp(layer)in this._layers);
},
eachLayer:function(method,context){
for(var i in this._layers){
method.call(context,this._layers[i]);
}
return this;
},
_addLayers:function(layers){
layers=layers?(isArray(layers)?layers:[layers]):[];
for(var i=0,len=layers.length;i<len;i++){
this.addLayer(layers[i]);
}
},
_addZoomLimit:function(layer){
if(isNaN(layer.options.maxZoom)||!isNaN(layer.options.minZoom)){
this._zoomBoundLayers[stamp(layer)]=layer;
this._updateZoomLevels();
}
},
_removeZoomLimit:function(layer){
var id=stamp(layer);
if(this._zoomBoundLayers[id]){
delete this._zoomBoundLayers[id];
this._updateZoomLevels();
}
},
_updateZoomLevels:function(){
var minZoom=Infinity,
maxZoom=-Infinity,
oldZoomSpan=this._getZoomSpan();
for(var i in this._zoomBoundLayers){
var options=this._zoomBoundLayers[i].options;
minZoom=options.minZoom===undefined?minZoom:Math.min(minZoom,options.minZoom);
maxZoom=options.maxZoom===undefined?maxZoom:Math.max(maxZoom,options.maxZoom);
}
this._layersMaxZoom=maxZoom===-Infinity?undefined:maxZoom;
this._layersMinZoom=minZoom===Infinity?undefined:minZoom;
if(oldZoomSpan!==this._getZoomSpan()){
this.fire('zoomlevelschange');
}
if(this.options.maxZoom===undefined&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom){
this.setZoom(this._layersMaxZoom);
}
if(this.options.minZoom===undefined&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom){
this.setZoom(this._layersMinZoom);
}
}
});
var LayerGroup=Layer.extend({
initialize:function(layers,options){
setOptions(this,options);
this._layers={};
var i,len;
if(layers){
for(i=0,len=layers.length;i<len;i++){
this.addLayer(layers[i]);
}
}
},
addLayer:function(layer){
var id=this.getLayerId(layer);
this._layers[id]=layer;
if(this._map){
this._map.addLayer(layer);
}
return this;
},
removeLayer:function(layer){
var id=layer in this._layers?layer:this.getLayerId(layer);
if(this._map&&this._layers[id]){
this._map.removeLayer(this._layers[id]);
}
delete this._layers[id];
return this;
},
hasLayer:function(layer){
return!!layer&&(layer in this._layers||this.getLayerId(layer)in this._layers);
},
clearLayers:function(){
return this.eachLayer(this.removeLayer,this);
},
invoke:function(methodName){
var args=Array.prototype.slice.call(arguments,1),
i,layer;
for(i in this._layers){
layer=this._layers[i];
if(layer[methodName]){
layer[methodName].apply(layer,args);
}
}
return this;
},
onAdd:function(map){
this.eachLayer(map.addLayer,map);
},
onRemove:function(map){
this.eachLayer(map.removeLayer,map);
},
eachLayer:function(method,context){
for(var i in this._layers){
method.call(context,this._layers[i]);
}
return this;
},
getLayer:function(id){
return this._layers[id];
},
getLayers:function(){
var layers=[];
this.eachLayer(layers.push,layers);
return layers;
},
setZIndex:function(zIndex){
return this.invoke('setZIndex',zIndex);
},
getLayerId:function(layer){
return stamp(layer);
}
});
var layerGroup=function(layers,options){
return new LayerGroup(layers,options);
};
var FeatureGroup=LayerGroup.extend({
addLayer:function(layer){
if(this.hasLayer(layer)){
return this;
}
layer.addEventParent(this);
LayerGroup.prototype.addLayer.call(this,layer);
return this.fire('layeradd',{layer:layer});
},
removeLayer:function(layer){
if(!this.hasLayer(layer)){
return this;
}
if(layer in this._layers){
layer=this._layers[layer];
}
layer.removeEventParent(this);
LayerGroup.prototype.removeLayer.call(this,layer);
return this.fire('layerremove',{layer:layer});
},
setStyle:function(style){
return this.invoke('setStyle',style);
},
bringToFront:function(){
return this.invoke('bringToFront');
},
bringToBack:function(){
return this.invoke('bringToBack');
},
getBounds:function(){
var bounds=new LatLngBounds();
for(var id in this._layers){
var layer=this._layers[id];
bounds.extend(layer.getBounds?layer.getBounds():layer.getLatLng());
}
return bounds;
}
});
var featureGroup=function(layers){
return new FeatureGroup(layers);
};
var Icon=Class.extend({
options:{
popupAnchor:[0,0],
tooltipAnchor:[0,0],
},
initialize:function(options){
setOptions(this,options);
},
createIcon:function(oldIcon){
return this._createIcon('icon',oldIcon);
},
createShadow:function(oldIcon){
return this._createIcon('shadow',oldIcon);
},
_createIcon:function(name,oldIcon){
var src=this._getIconUrl(name);
if(!src){
if(name==='icon'){
throw new Error('iconUrl not set in Icon options (see the docs).');
}
return null;
}
var img=this._createImg(src,oldIcon&&oldIcon.tagName==='IMG'?oldIcon:null);
this._setIconStyles(img,name);
return img;
},
_setIconStyles:function(img,name){
var options=this.options;
var sizeOption=options[name+'Size'];
if(typeof sizeOption==='number'){
sizeOption=[sizeOption,sizeOption];
}
var size=toPoint(sizeOption),
anchor=toPoint(name==='shadow'&&options.shadowAnchor||options.iconAnchor||
size&&size.divideBy(2,true));
img.className='leaflet-marker-'+name+' '+(options.className||'');
if(anchor){
img.style.marginLeft=(-anchor.x)+'px';
img.style.marginTop=(-anchor.y)+'px';
}
if(size){
img.style.width=size.x+'px';
img.style.height=size.y+'px';
}
},
_createImg:function(src,el){
el=el||document.createElement('img');
el.src=src;
return el;
},
_getIconUrl:function(name){
return retina&&this.options[name+'RetinaUrl']||this.options[name+'Url'];
}
});
function icon(options){
return new Icon(options);
}
var IconDefault=Icon.extend({
options:{
iconUrl:'marker-icon.png',
iconRetinaUrl:'marker-icon-2x.png',
shadowUrl:'marker-shadow.png',
iconSize:[25,41],
iconAnchor:[12,41],
popupAnchor:[1,-34],
tooltipAnchor:[16,-28],
shadowSize:[41,41]
},
_getIconUrl:function(name){
if(!IconDefault.imagePath){
IconDefault.imagePath=this._detectIconPath();
}
return(this.options.imagePath||IconDefault.imagePath)+Icon.prototype._getIconUrl.call(this,name);
},
_detectIconPath:function(){
var el=create$1('div','leaflet-default-icon-path',document.body);
var path=getStyle(el,'background-image')||
getStyle(el,'backgroundImage');
document.body.removeChild(el);
if(path===null||path.indexOf('url')!==0){
path='';
}else{
path=path.replace(/^url\(["']?/,'').replace(/marker-icon\.png["']?\)$/,'');
}
return path;
}
});
var MarkerDrag=Handler.extend({
initialize:function(marker){
this._marker=marker;
},
addHooks:function(){
var icon=this._marker._icon;
if(!this._draggable){
this._draggable=new Draggable(icon,icon,true);
}
this._draggable.on({
dragstart:this._onDragStart,
predrag:this._onPreDrag,
drag:this._onDrag,
dragend:this._onDragEnd
},this).enable();
addClass(icon,'leaflet-marker-draggable');
},
removeHooks:function(){
this._draggable.off({
dragstart:this._onDragStart,
predrag:this._onPreDrag,
drag:this._onDrag,
dragend:this._onDragEnd
},this).disable();
if(this._marker._icon){
removeClass(this._marker._icon,'leaflet-marker-draggable');
}
},
moved:function(){
return this._draggable&&this._draggable._moved;
},
_adjustPan:function(e){
var marker=this._marker,
map=marker._map,
speed=this._marker.options.autoPanSpeed,
padding=this._marker.options.autoPanPadding,
iconPos=L.DomUtil.getPosition(marker._icon),
bounds=map.getPixelBounds(),
origin=map.getPixelOrigin();
var panBounds=toBounds(
bounds.min._subtract(origin).add(padding),
bounds.max._subtract(origin).subtract(padding)
);
if(!panBounds.contains(iconPos)){
var movement=toPoint(
(Math.max(panBounds.max.x,iconPos.x)-panBounds.max.x)/(bounds.max.x-panBounds.max.x)-
(Math.min(panBounds.min.x,iconPos.x)-panBounds.min.x)/(bounds.min.x-panBounds.min.x),
(Math.max(panBounds.max.y,iconPos.y)-panBounds.max.y)/(bounds.max.y-panBounds.max.y)-
(Math.min(panBounds.min.y,iconPos.y)-panBounds.min.y)/(bounds.min.y-panBounds.min.y)
).multiplyBy(speed);
map.panBy(movement,{animate:false});
this._draggable._newPos._add(movement);
this._draggable._startPos._add(movement);
L.DomUtil.setPosition(marker._icon,this._draggable._newPos);
this._onDrag(e);
this._panRequest=requestAnimFrame(this._adjustPan.bind(this,e));
}
},
_onDragStart:function(){
this._oldLatLng=this._marker.getLatLng();
this._marker
.closePopup()
.fire('movestart')
.fire('dragstart');
},
_onPreDrag:function(e){
if(this._marker.options.autoPan){
cancelAnimFrame(this._panRequest);
this._panRequest=requestAnimFrame(this._adjustPan.bind(this,e));
}
},
_onDrag:function(e){
var marker=this._marker,
shadow=marker._shadow,
iconPos=getPosition(marker._icon),
latlng=marker._map.layerPointToLatLng(iconPos);
if(shadow){
setPosition(shadow,iconPos);
}
marker._latlng=latlng;
e.latlng=latlng;
e.oldLatLng=this._oldLatLng;
marker
.fire('move',e)
.fire('drag',e);
},
_onDragEnd:function(e){
cancelAnimFrame(this._panRequest);
delete this._oldLatLng;
this._marker
.fire('moveend')
.fire('dragend',e);
}
});
var Marker=Layer.extend({
options:{
icon:new IconDefault(),
interactive:true,
draggable:false,
autoPan:false,
autoPanPadding:[50,50],
autoPanSpeed:10,
keyboard:true,
title:'',
alt:'',
zIndexOffset:0,
opacity:1,
riseOnHover:false,
riseOffset:250,
pane:'markerPane',
bubblingMouseEvents:false
},
initialize:function(latlng,options){
setOptions(this,options);
this._latlng=toLatLng(latlng);
},
onAdd:function(map){
this._zoomAnimated=this._zoomAnimated&&map.options.markerZoomAnimation;
if(this._zoomAnimated){
map.on('zoomanim',this._animateZoom,this);
}
this._initIcon();
this.update();
},
onRemove:function(map){
if(this.dragging&&this.dragging.enabled()){
this.options.draggable=true;
this.dragging.removeHooks();
}
delete this.dragging;
if(this._zoomAnimated){
map.off('zoomanim',this._animateZoom,this);
}
this._removeIcon();
this._removeShadow();
},
getEvents:function(){
return{
zoom:this.update,
viewreset:this.update
};
},
getLatLng:function(){
return this._latlng;
},
setLatLng:function(latlng){
var oldLatLng=this._latlng;
this._latlng=toLatLng(latlng);
this.update();
return this.fire('move',{oldLatLng:oldLatLng,latlng:this._latlng});
},
setZIndexOffset:function(offset){
this.options.zIndexOffset=offset;
return this.update();
},
setIcon:function(icon){
this.options.icon=icon;
if(this._map){
this._initIcon();
this.update();
}
if(this._popup){
this.bindPopup(this._popup,this._popup.options);
}
return this;
},
getElement:function(){
return this._icon;
},
update:function(){
if(this._icon&&this._map){
var pos=this._map.latLngToLayerPoint(this._latlng).round();
this._setPos(pos);
}
return this;
},
_initIcon:function(){
var options=this.options,
classToAdd='leaflet-zoom-'+(this._zoomAnimated?'animated':'hide');
var icon=options.icon.createIcon(this._icon),
addIcon=false;
if(icon!==this._icon){
if(this._icon){
this._removeIcon();
}
addIcon=true;
if(options.title){
icon.title=options.title;
}
if(icon.tagName==='IMG'){
icon.alt=options.alt||'';
}
}
addClass(icon,classToAdd);
if(options.keyboard){
icon.tabIndex='0';
}
this._icon=icon;
if(options.riseOnHover){
this.on({
mouseover:this._bringToFront,
mouseout:this._resetZIndex
});
}
var newShadow=options.icon.createShadow(this._shadow),
addShadow=false;
if(newShadow!==this._shadow){
this._removeShadow();
addShadow=true;
}
if(newShadow){
addClass(newShadow,classToAdd);
newShadow.alt='';
}
this._shadow=newShadow;
if(options.opacity<1){
this._updateOpacity();
}
if(addIcon){
this.getPane().appendChild(this._icon);
}
this._initInteraction();
if(newShadow&&addShadow){
this.getPane('shadowPane').appendChild(this._shadow);
}
},
_removeIcon:function(){
if(this.options.riseOnHover){
this.off({
mouseover:this._bringToFront,
mouseout:this._resetZIndex
});
}
remove(this._icon);
this.removeInteractiveTarget(this._icon);
this._icon=null;
},
_removeShadow:function(){
if(this._shadow){
remove(this._shadow);
}
this._shadow=null;
},
_setPos:function(pos){
setPosition(this._icon,pos);
if(this._shadow){
setPosition(this._shadow,pos);
}
this._zIndex=pos.y+this.options.zIndexOffset;
this._resetZIndex();
},
_updateZIndex:function(offset){
this._icon.style.zIndex=this._zIndex+offset;
},
_animateZoom:function(opt){
var pos=this._map._latLngToNewLayerPoint(this._latlng,opt.zoom,opt.center).round();
this._setPos(pos);
},
_initInteraction:function(){
if(!this.options.interactive){return;}
addClass(this._icon,'leaflet-interactive');
this.addInteractiveTarget(this._icon);
if(MarkerDrag){
var draggable=this.options.draggable;
if(this.dragging){
draggable=this.dragging.enabled();
this.dragging.disable();
}
this.dragging=new MarkerDrag(this);
if(draggable){
this.dragging.enable();
}
}
},
setOpacity:function(opacity){
this.options.opacity=opacity;
if(this._map){
this._updateOpacity();
}
return this;
},
_updateOpacity:function(){
var opacity=this.options.opacity;
setOpacity(this._icon,opacity);
if(this._shadow){
setOpacity(this._shadow,opacity);
}
},
_bringToFront:function(){
this._updateZIndex(this.options.riseOffset);
},
_resetZIndex:function(){
this._updateZIndex(0);
},
_getPopupAnchor:function(){
return this.options.icon.options.popupAnchor;
},
_getTooltipAnchor:function(){
return this.options.icon.options.tooltipAnchor;
}
});
function marker(latlng,options){
return new Marker(latlng,options);
}
var Path=Layer.extend({
options:{
stroke:true,
color:'#3388ff',
weight:3,
opacity:1,
lineCap:'round',
lineJoin:'round',
dashArray:null,
dashOffset:null,
fill:false,
fillColor:null,
fillOpacity:0.2,
fillRule:'evenodd',
interactive:true,
bubblingMouseEvents:true
},
beforeAdd:function(map){
this._renderer=map.getRenderer(this);
},
onAdd:function(){
this._renderer._initPath(this);
this._reset();
this._renderer._addPath(this);
},
onRemove:function(){
this._renderer._removePath(this);
},
redraw:function(){
if(this._map){
this._renderer._updatePath(this);
}
return this;
},
setStyle:function(style){
setOptions(this,style);
if(this._renderer){
this._renderer._updateStyle(this);
}
return this;
},
bringToFront:function(){
if(this._renderer){
this._renderer._bringToFront(this);
}
return this;
},
bringToBack:function(){
if(this._renderer){
this._renderer._bringToBack(this);
}
return this;
},
getElement:function(){
return this._path;
},
_reset:function(){
this._project();
this._update();
},
_clickTolerance:function(){
return(this.options.stroke?this.options.weight/2:0)+this._renderer.options.tolerance;
}
});
var CircleMarker=Path.extend({
options:{
fill:true,
radius:10
},
initialize:function(latlng,options){
setOptions(this,options);
this._latlng=toLatLng(latlng);
this._radius=this.options.radius;
},
setLatLng:function(latlng){
this._latlng=toLatLng(latlng);
this.redraw();
return this.fire('move',{latlng:this._latlng});
},
getLatLng:function(){
return this._latlng;
},
setRadius:function(radius){
this.options.radius=this._radius=radius;
return this.redraw();
},
getRadius:function(){
return this._radius;
},
setStyle:function(options){
var radius=options&&options.radius||this._radius;
Path.prototype.setStyle.call(this,options);
this.setRadius(radius);
return this;
},
_project:function(){
this._point=this._map.latLngToLayerPoint(this._latlng);
this._updateBounds();
},
_updateBounds:function(){
var r=this._radius,
r2=this._radiusY||r,
w=this._clickTolerance(),
p=[r+w,r2+w];
this._pxBounds=new Bounds(this._point.subtract(p),this._point.add(p));
},
_update:function(){
if(this._map){
this._updatePath();
}
},
_updatePath:function(){
this._renderer._updateCircle(this);
},
_empty:function(){
return this._radius&&!this._renderer._bounds.intersects(this._pxBounds);
},
_containsPoint:function(p){
return p.distanceTo(this._point)<=this._radius+this._clickTolerance();
}
});
function circleMarker(latlng,options){
return new CircleMarker(latlng,options);
}
var Circle=CircleMarker.extend({
initialize:function(latlng,options,legacyOptions){
if(typeof options==='number'){
options=extend({},legacyOptions,{radius:options});
}
setOptions(this,options);
this._latlng=toLatLng(latlng);
if(isNaN(this.options.radius)){throw new Error('Circle radius cannot be NaN');}
this._mRadius=this.options.radius;
},
setRadius:function(radius){
this._mRadius=radius;
return this.redraw();
},
getRadius:function(){
return this._mRadius;
},
getBounds:function(){
var half=[this._radius,this._radiusY||this._radius];
return new LatLngBounds(
this._map.layerPointToLatLng(this._point.subtract(half)),
this._map.layerPointToLatLng(this._point.add(half)));
},
setStyle:Path.prototype.setStyle,
_project:function(){
var lng=this._latlng.lng,
lat=this._latlng.lat,
map=this._map,
crs=map.options.crs;
if(crs.distance===Earth.distance){
var d=Math.PI/180,
latR=(this._mRadius/Earth.R)/d,
top=map.project([lat+latR,lng]),
bottom=map.project([lat-latR,lng]),
p=top.add(bottom).divideBy(2),
lat2=map.unproject(p).lat,
lngR=Math.acos((Math.cos(latR*d)-Math.sin(lat*d)*Math.sin(lat2*d))/
(Math.cos(lat*d)*Math.cos(lat2*d)))/d;
if(isNaN(lngR)||lngR===0){
lngR=latR/Math.cos(Math.PI/180*lat);
}
this._point=p.subtract(map.getPixelOrigin());
this._radius=isNaN(lngR)?0:p.x-map.project([lat2,lng-lngR]).x;
this._radiusY=p.y-top.y;
}else{
var latlng2=crs.unproject(crs.project(this._latlng).subtract([this._mRadius,0]));
this._point=map.latLngToLayerPoint(this._latlng);
this._radius=this._point.x-map.latLngToLayerPoint(latlng2).x;
}
this._updateBounds();
}
});
function circle(latlng,options,legacyOptions){
return new Circle(latlng,options,legacyOptions);
}
var Polyline=Path.extend({
options:{
smoothFactor:1.0,
noClip:false
},
initialize:function(latlngs,options){
setOptions(this,options);
this._setLatLngs(latlngs);
},
getLatLngs:function(){
return this._latlngs;
},
setLatLngs:function(latlngs){
this._setLatLngs(latlngs);
return this.redraw();
},
isEmpty:function(){
return!this._latlngs.length;
},
closestLayerPoint:function(p){
var minDistance=Infinity,
minPoint=null,
closest=_sqClosestPointOnSegment,
p1,p2;
for(var j=0,jLen=this._parts.length;j<jLen;j++){
var points=this._parts[j];
for(var i=1,len=points.length;i<len;i++){
p1=points[i-1];
p2=points[i];
var sqDist=closest(p,p1,p2,true);
if(sqDist<minDistance){
minDistance=sqDist;
minPoint=closest(p,p1,p2);
}
}
}
if(minPoint){
minPoint.distance=Math.sqrt(minDistance);
}
return minPoint;
},
getCenter:function(){
if(!this._map){
throw new Error('Must add layer to map before using getCenter()');
}
var i,halfDist,segDist,dist,p1,p2,ratio,
points=this._rings[0],
len=points.length;
if(!len){return null;}
for(i=0,halfDist=0;i<len-1;i++){
halfDist+=points[i].distanceTo(points[i+1])/2;
}
if(halfDist===0){
return this._map.layerPointToLatLng(points[0]);
}
for(i=0,dist=0;i<len-1;i++){
p1=points[i];
p2=points[i+1];
segDist=p1.distanceTo(p2);
dist+=segDist;
if(dist>halfDist){
ratio=(dist-halfDist)/segDist;
return this._map.layerPointToLatLng([
p2.x-ratio*(p2.x-p1.x),
p2.y-ratio*(p2.y-p1.y)
]);
}
}
},
getBounds:function(){
return this._bounds;
},
addLatLng:function(latlng,latlngs){
latlngs=latlngs||this._defaultShape();
latlng=toLatLng(latlng);
latlngs.push(latlng);
this._bounds.extend(latlng);
return this.redraw();
},
_setLatLngs:function(latlngs){
this._bounds=new LatLngBounds();
this._latlngs=this._convertLatLngs(latlngs);
},
_defaultShape:function(){
return isFlat(this._latlngs)?this._latlngs:this._latlngs[0];
},
_convertLatLngs:function(latlngs){
var result=[],
flat=isFlat(latlngs);
for(var i=0,len=latlngs.length;i<len;i++){
if(flat){
result[i]=toLatLng(latlngs[i]);
this._bounds.extend(result[i]);
}else{
result[i]=this._convertLatLngs(latlngs[i]);
}
}
return result;
},
_project:function(){
var pxBounds=new Bounds();
this._rings=[];
this._projectLatlngs(this._latlngs,this._rings,pxBounds);
var w=this._clickTolerance(),
p=new Point(w,w);
if(this._bounds.isValid()&&pxBounds.isValid()){
pxBounds.min._subtract(p);
pxBounds.max._add(p);
this._pxBounds=pxBounds;
}
},
_projectLatlngs:function(latlngs,result,projectedBounds){
var flat=latlngs[0]instanceof LatLng,
len=latlngs.length,
i,ring;
if(flat){
ring=[];
for(i=0;i<len;i++){
ring[i]=this._map.latLngToLayerPoint(latlngs[i]);
projectedBounds.extend(ring[i]);
}
result.push(ring);
}else{
for(i=0;i<len;i++){
this._projectLatlngs(latlngs[i],result,projectedBounds);
}
}
},
_clipPoints:function(){
var bounds=this._renderer._bounds;
this._parts=[];
if(!this._pxBounds||!this._pxBounds.intersects(bounds)){
return;
}
if(this.options.noClip){
this._parts=this._rings;
return;
}
var parts=this._parts,
i,j,k,len,len2,segment,points;
for(i=0,k=0,len=this._rings.length;i<len;i++){
points=this._rings[i];
for(j=0,len2=points.length;j<len2-1;j++){
segment=clipSegment(points[j],points[j+1],bounds,j,true);
if(!segment){continue;}
parts[k]=parts[k]||[];
parts[k].push(segment[0]);
if((segment[1]!==points[j+1])||(j===len2-2)){
parts[k].push(segment[1]);
k++;
}
}
}
},
_simplifyPoints:function(){
var parts=this._parts,
tolerance=this.options.smoothFactor;
for(var i=0,len=parts.length;i<len;i++){
parts[i]=simplify(parts[i],tolerance);
}
},
_update:function(){
if(!this._map){return;}
this._clipPoints();
this._simplifyPoints();
this._updatePath();
},
_updatePath:function(){
this._renderer._updatePoly(this);
},
_containsPoint:function(p,closed){
var i,j,k,len,len2,part,
w=this._clickTolerance();
if(!this._pxBounds||!this._pxBounds.contains(p)){return false;}
for(i=0,len=this._parts.length;i<len;i++){
part=this._parts[i];
for(j=0,len2=part.length,k=len2-1;j<len2;k=j++){
if(!closed&&(j===0)){continue;}
if(pointToSegmentDistance(p,part[k],part[j])<=w){
return true;
}
}
}
return false;
}
});
function polyline(latlngs,options){
return new Polyline(latlngs,options);
}
Polyline._flat=_flat;
var Polygon=Polyline.extend({
options:{
fill:true
},
isEmpty:function(){
return!this._latlngs.length||!this._latlngs[0].length;
},
getCenter:function(){
if(!this._map){
throw new Error('Must add layer to map before using getCenter()');
}
var i,j,p1,p2,f,area,x,y,center,
points=this._rings[0],
len=points.length;
if(!len){return null;}
area=x=y=0;
for(i=0,j=len-1;i<len;j=i++){
p1=points[i];
p2=points[j];
f=p1.y*p2.x-p2.y*p1.x;
x+=(p1.x+p2.x)*f;
y+=(p1.y+p2.y)*f;
area+=f*3;
}
if(area===0){
center=points[0];
}else{
center=[x/area,y/area];
}
return this._map.layerPointToLatLng(center);
},
_convertLatLngs:function(latlngs){
var result=Polyline.prototype._convertLatLngs.call(this,latlngs),
len=result.length;
if(len>=2&&result[0]instanceof LatLng&&result[0].equals(result[len-1])){
result.pop();
}
return result;
},
_setLatLngs:function(latlngs){
Polyline.prototype._setLatLngs.call(this,latlngs);
if(isFlat(this._latlngs)){
this._latlngs=[this._latlngs];
}
},
_defaultShape:function(){
return isFlat(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0];
},
_clipPoints:function(){
var bounds=this._renderer._bounds,
w=this.options.weight,
p=new Point(w,w);
bounds=new Bounds(bounds.min.subtract(p),bounds.max.add(p));
this._parts=[];
if(!this._pxBounds||!this._pxBounds.intersects(bounds)){
return;
}
if(this.options.noClip){
this._parts=this._rings;
return;
}
for(var i=0,len=this._rings.length,clipped;i<len;i++){
clipped=clipPolygon(this._rings[i],bounds,true);
if(clipped.length){
this._parts.push(clipped);
}
}
},
_updatePath:function(){
this._renderer._updatePoly(this,true);
},
_containsPoint:function(p){
var inside=false,
part,p1,p2,i,j,k,len,len2;
if(!this._pxBounds.contains(p)){return false;}
for(i=0,len=this._parts.length;i<len;i++){
part=this._parts[i];
for(j=0,len2=part.length,k=len2-1;j<len2;k=j++){
p1=part[j];
p2=part[k];
if(((p1.y>p.y)!==(p2.y>p.y))&&(p.x<(p2.x-p1.x)*(p.y-p1.y)/(p2.y-p1.y)+p1.x)){
inside=!inside;
}
}
}
return inside||Polyline.prototype._containsPoint.call(this,p,true);
}
});
function polygon(latlngs,options){
return new Polygon(latlngs,options);
}
var GeoJSON=FeatureGroup.extend({
initialize:function(geojson,options){
setOptions(this,options);
this._layers={};
if(geojson){
this.addData(geojson);
}
},
addData:function(geojson){
var features=isArray(geojson)?geojson:geojson.features,
i,len,feature;
if(features){
for(i=0,len=features.length;i<len;i++){
feature=features[i];
if(feature.geometries||feature.geometry||feature.features||feature.coordinates){
this.addData(feature);
}
}
return this;
}
var options=this.options;
if(options.filter&&!options.filter(geojson)){return this;}
var layer=geometryToLayer(geojson,options);
if(!layer){
return this;
}
layer.feature=asFeature(geojson);
layer.defaultOptions=layer.options;
this.resetStyle(layer);
if(options.onEachFeature){
options.onEachFeature(geojson,layer);
}
return this.addLayer(layer);
},
resetStyle:function(layer){
layer.options=extend({},layer.defaultOptions);
this._setLayerStyle(layer,this.options.style);
return this;
},
setStyle:function(style){
return this.eachLayer(function(layer){
this._setLayerStyle(layer,style);
},this);
},
_setLayerStyle:function(layer,style){
if(typeof style==='function'){
style=style(layer.feature);
}
if(layer.setStyle){
layer.setStyle(style);
}
}
});
function geometryToLayer(geojson,options){
var geometry=geojson.type==='Feature'?geojson.geometry:geojson,
coords=geometry?geometry.coordinates:null,
layers=[],
pointToLayer=options&&options.pointToLayer,
_coordsToLatLng=options&&options.coordsToLatLng||coordsToLatLng,
latlng,latlngs,i,len;
if(!coords&&!geometry){
return null;
}
switch(geometry.type){
case'Point':
latlng=_coordsToLatLng(coords);
return pointToLayer?pointToLayer(geojson,latlng):new Marker(latlng);
case'MultiPoint':
for(i=0,len=coords.length;i<len;i++){
latlng=_coordsToLatLng(coords[i]);
layers.push(pointToLayer?pointToLayer(geojson,latlng):new Marker(latlng));
}
return new FeatureGroup(layers);
case'LineString':
case'MultiLineString':
latlngs=coordsToLatLngs(coords,geometry.type==='LineString'?0:1,_coordsToLatLng);
return new Polyline(latlngs,options);
case'Polygon':
case'MultiPolygon':
latlngs=coordsToLatLngs(coords,geometry.type==='Polygon'?1:2,_coordsToLatLng);
return new Polygon(latlngs,options);
case'GeometryCollection':
for(i=0,len=geometry.geometries.length;i<len;i++){
var layer=geometryToLayer({
geometry:geometry.geometries[i],
type:'Feature',
properties:geojson.properties
},options);
if(layer){
layers.push(layer);
}
}
return new FeatureGroup(layers);
default:
throw new Error('Invalid GeoJSON object.');
}
}
function coordsToLatLng(coords){
return new LatLng(coords[1],coords[0],coords[2]);
}
function coordsToLatLngs(coords,levelsDeep,_coordsToLatLng){
var latlngs=[];
for(var i=0,len=coords.length,latlng;i<len;i++){
latlng=levelsDeep?
coordsToLatLngs(coords[i],levelsDeep-1,_coordsToLatLng):
(_coordsToLatLng||coordsToLatLng)(coords[i]);
latlngs.push(latlng);
}
return latlngs;
}
function latLngToCoords(latlng,precision){
precision=typeof precision==='number'?precision:6;
return latlng.alt!==undefined?
[formatNum(latlng.lng,precision),formatNum(latlng.lat,precision),formatNum(latlng.alt,precision)]:
[formatNum(latlng.lng,precision),formatNum(latlng.lat,precision)];
}
function latLngsToCoords(latlngs,levelsDeep,closed,precision){
var coords=[];
for(var i=0,len=latlngs.length;i<len;i++){
coords.push(levelsDeep?
latLngsToCoords(latlngs[i],levelsDeep-1,closed,precision):
latLngToCoords(latlngs[i],precision));
}
if(!levelsDeep&&closed){
coords.push(coords[0]);
}
return coords;
}
function getFeature(layer,newGeometry){
return layer.feature?
extend({},layer.feature,{geometry:newGeometry}):
asFeature(newGeometry);
}
function asFeature(geojson){
if(geojson.type==='Feature'||geojson.type==='FeatureCollection'){
return geojson;
}
return{
type:'Feature',
properties:{},
geometry:geojson
};
}
var PointToGeoJSON={
toGeoJSON:function(precision){
return getFeature(this,{
type:'Point',
coordinates:latLngToCoords(this.getLatLng(),precision)
});
}
};
Marker.include(PointToGeoJSON);
Circle.include(PointToGeoJSON);
CircleMarker.include(PointToGeoJSON);
Polyline.include({
toGeoJSON:function(precision){
var multi=!isFlat(this._latlngs);
var coords=latLngsToCoords(this._latlngs,multi?1:0,false,precision);
return getFeature(this,{
type:(multi?'Multi':'')+'LineString',
coordinates:coords
});
}
});
Polygon.include({
toGeoJSON:function(precision){
var holes=!isFlat(this._latlngs),
multi=holes&&!isFlat(this._latlngs[0]);
var coords=latLngsToCoords(this._latlngs,multi?2:holes?1:0,true,precision);
if(!holes){
coords=[coords];
}
return getFeature(this,{
type:(multi?'Multi':'')+'Polygon',
coordinates:coords
});
}
});
LayerGroup.include({
toMultiPoint:function(precision){
var coords=[];
this.eachLayer(function(layer){
coords.push(layer.toGeoJSON(precision).geometry.coordinates);
});
return getFeature(this,{
type:'MultiPoint',
coordinates:coords
});
},
toGeoJSON:function(precision){
var type=this.feature&&this.feature.geometry&&this.feature.geometry.type;
if(type==='MultiPoint'){
return this.toMultiPoint(precision);
}
var isGeometryCollection=type==='GeometryCollection',
jsons=[];
this.eachLayer(function(layer){
if(layer.toGeoJSON){
var json=layer.toGeoJSON(precision);
if(isGeometryCollection){
jsons.push(json.geometry);
}else{
var feature=asFeature(json);
if(feature.type==='FeatureCollection'){
jsons.push.apply(jsons,feature.features);
}else{
jsons.push(feature);
}
}
}
});
if(isGeometryCollection){
return getFeature(this,{
geometries:jsons,
type:'GeometryCollection'
});
}
return{
type:'FeatureCollection',
features:jsons
};
}
});
function geoJSON(geojson,options){
return new GeoJSON(geojson,options);
}
var geoJson=geoJSON;
var ImageOverlay=Layer.extend({
options:{
opacity:1,
alt:'',
interactive:false,
crossOrigin:false,
errorOverlayUrl:'',
zIndex:1,
className:'',
},
initialize:function(url,bounds,options){
this._url=url;
this._bounds=toLatLngBounds(bounds);
setOptions(this,options);
},
onAdd:function(){
if(!this._image){
this._initImage();
if(this.options.opacity<1){
this._updateOpacity();
}
}
if(this.options.interactive){
addClass(this._image,'leaflet-interactive');
this.addInteractiveTarget(this._image);
}
this.getPane().appendChild(this._image);
this._reset();
},
onRemove:function(){
remove(this._image);
if(this.options.interactive){
this.removeInteractiveTarget(this._image);
}
},
setOpacity:function(opacity){
this.options.opacity=opacity;
if(this._image){
this._updateOpacity();
}
return this;
},
setStyle:function(styleOpts){
if(styleOpts.opacity){
this.setOpacity(styleOpts.opacity);
}
return this;
},
bringToFront:function(){
if(this._map){
toFront(this._image);
}
return this;
},
bringToBack:function(){
if(this._map){
toBack(this._image);
}
return this;
},
setUrl:function(url){
this._url=url;
if(this._image){
this._image.src=url;
}
return this;
},
setBounds:function(bounds){
this._bounds=toLatLngBounds(bounds);
if(this._map){
this._reset();
}
return this;
},
getEvents:function(){
var events={
zoom:this._reset,
viewreset:this._reset
};
if(this._zoomAnimated){
events.zoomanim=this._animateZoom;
}
return events;
},
setZIndex:function(value){
this.options.zIndex=value;
this._updateZIndex();
return this;
},
getBounds:function(){
return this._bounds;
},
getElement:function(){
return this._image;
},
_initImage:function(){
var wasElementSupplied=this._url.tagName==='IMG';
var img=this._image=wasElementSupplied?this._url:create$1('img');
addClass(img,'leaflet-image-layer');
if(this._zoomAnimated){addClass(img,'leaflet-zoom-animated');}
if(this.options.className){addClass(img,this.options.className);}
img.onselectstart=falseFn;
img.onmousemove=falseFn;
img.onload=bind(this.fire,this,'load');
img.onerror=bind(this._overlayOnError,this,'error');
if(this.options.crossOrigin){
img.crossOrigin='';
}
if(this.options.zIndex){
this._updateZIndex();
}
if(wasElementSupplied){
this._url=img.src;
return;
}
img.src=this._url;
img.alt=this.options.alt;
},
_animateZoom:function(e){
var scale=this._map.getZoomScale(e.zoom),
offset=this._map._latLngBoundsToNewLayerBounds(this._bounds,e.zoom,e.center).min;
setTransform(this._image,offset,scale);
},
_reset:function(){
var image=this._image,
bounds=new Bounds(
this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
size=bounds.getSize();
setPosition(image,bounds.min);
image.style.width=size.x+'px';
image.style.height=size.y+'px';
},
_updateOpacity:function(){
setOpacity(this._image,this.options.opacity);
},
_updateZIndex:function(){
if(this._image&&this.options.zIndex!==undefined&&this.options.zIndex!==null){
this._image.style.zIndex=this.options.zIndex;
}
},
_overlayOnError:function(){
this.fire('error');
var errorUrl=this.options.errorOverlayUrl;
if(errorUrl&&this._url!==errorUrl){
this._url=errorUrl;
this._image.src=errorUrl;
}
}
});
var imageOverlay=function(url,bounds,options){
return new ImageOverlay(url,bounds,options);
};
var VideoOverlay=ImageOverlay.extend({
options:{
autoplay:true,
loop:true
},
_initImage:function(){
var wasElementSupplied=this._url.tagName==='VIDEO';
var vid=this._image=wasElementSupplied?this._url:create$1('video');
addClass(vid,'leaflet-image-layer');
if(this._zoomAnimated){addClass(vid,'leaflet-zoom-animated');}
vid.onselectstart=falseFn;
vid.onmousemove=falseFn;
vid.onloadeddata=bind(this.fire,this,'load');
if(wasElementSupplied){
var sourceElements=vid.getElementsByTagName('source');
var sources=[];
for(var j=0;j<sourceElements.length;j++){
sources.push(sourceElements[j].src);
}
this._url=(sourceElements.length>0)?sources:[vid.src];
return;
}
if(!isArray(this._url)){this._url=[this._url];}
vid.autoplay=!!this.options.autoplay;
vid.loop=!!this.options.loop;
for(var i=0;i<this._url.length;i++){
var source=create$1('source');
source.src=this._url[i];
vid.appendChild(source);
}
}
});
function videoOverlay(video,bounds,options){
return new VideoOverlay(video,bounds,options);
}
var DivOverlay=Layer.extend({
options:{
offset:[0,7],
className:'',
pane:'popupPane'
},
initialize:function(options,source){
setOptions(this,options);
this._source=source;
},
onAdd:function(map){
this._zoomAnimated=map._zoomAnimated;
if(!this._container){
this._initLayout();
}
if(map._fadeAnimated){
setOpacity(this._container,0);
}
clearTimeout(this._removeTimeout);
this.getPane().appendChild(this._container);
this.update();
if(map._fadeAnimated){
setOpacity(this._container,1);
}
this.bringToFront();
},
onRemove:function(map){
if(map._fadeAnimated){
setOpacity(this._container,0);
this._removeTimeout=setTimeout(bind(remove,undefined,this._container),200);
}else{
remove(this._container);
}
},
getLatLng:function(){
return this._latlng;
},
setLatLng:function(latlng){
this._latlng=toLatLng(latlng);
if(this._map){
this._updatePosition();
this._adjustPan();
}
return this;
},
getContent:function(){
return this._content;
},
setContent:function(content){
this._content=content;
this.update();
return this;
},
getElement:function(){
return this._container;
},
update:function(){
if(!this._map){return;}
this._container.style.visibility='hidden';
this._updateContent();
this._updateLayout();
this._updatePosition();
this._container.style.visibility='';
this._adjustPan();
},
getEvents:function(){
var events={
zoom:this._updatePosition,
viewreset:this._updatePosition
};
if(this._zoomAnimated){
events.zoomanim=this._animateZoom;
}
return events;
},
isOpen:function(){
return!!this._map&&this._map.hasLayer(this);
},
bringToFront:function(){
if(this._map){
toFront(this._container);
}
return this;
},
bringToBack:function(){
if(this._map){
toBack(this._container);
}
return this;
},
_updateContent:function(){
if(!this._content){return;}
var node=this._contentNode;
var content=(typeof this._content==='function')?this._content(this._source||this):this._content;
if(typeof content==='string'){
node.innerHTML=content;
}else{
while(node.hasChildNodes()){
node.removeChild(node.firstChild);
}
node.appendChild(content);
}
this.fire('contentupdate');
},
_updatePosition:function(){
if(!this._map){return;}
var pos=this._map.latLngToLayerPoint(this._latlng),
offset=toPoint(this.options.offset),
anchor=this._getAnchor();
if(this._zoomAnimated){
setPosition(this._container,pos.add(anchor));
}else{
offset=offset.add(pos).add(anchor);
}
var bottom=this._containerBottom=-offset.y,
left=this._containerLeft=-Math.round(this._containerWidth/2)+offset.x;
this._container.style.bottom=bottom+'px';
this._container.style.left=left+'px';
},
_getAnchor:function(){
return[0,0];
}
});
var Popup=DivOverlay.extend({
options:{
maxWidth:300,
minWidth:50,
maxHeight:null,
autoPan:true,
autoPanPaddingTopLeft:null,
autoPanPaddingBottomRight:null,
autoPanPadding:[5,5],
keepInView:false,
closeButton:true,
autoClose:true,
closeOnEscapeKey:true,
className:''
},
openOn:function(map){
map.openPopup(this);
return this;
},
onAdd:function(map){
DivOverlay.prototype.onAdd.call(this,map);
map.fire('popupopen',{popup:this});
if(this._source){
this._source.fire('popupopen',{popup:this},true);
if(!(this._source instanceof Path)){
this._source.on('preclick',stopPropagation);
}
}
},
onRemove:function(map){
DivOverlay.prototype.onRemove.call(this,map);
map.fire('popupclose',{popup:this});
if(this._source){
this._source.fire('popupclose',{popup:this},true);
if(!(this._source instanceof Path)){
this._source.off('preclick',stopPropagation);
}
}
},
getEvents:function(){
var events=DivOverlay.prototype.getEvents.call(this);
if(this.options.closeOnClick!==undefined?this.options.closeOnClick:this._map.options.closePopupOnClick){
events.preclick=this._close;
}
if(this.options.keepInView){
events.moveend=this._adjustPan;
}
return events;
},
_close:function(){
if(this._map){
this._map.closePopup(this);
}
},
_initLayout:function(){
var prefix='leaflet-popup',
container=this._container=create$1('div',
prefix+' '+(this.options.className||'')+
' leaflet-zoom-animated');
var wrapper=this._wrapper=create$1('div',prefix+'-content-wrapper',container);
this._contentNode=create$1('div',prefix+'-content',wrapper);
disableClickPropagation(wrapper);
disableScrollPropagation(this._contentNode);
on(wrapper,'contextmenu',stopPropagation);
this._tipContainer=create$1('div',prefix+'-tip-container',container);
this._tip=create$1('div',prefix+'-tip',this._tipContainer);
if(this.options.closeButton){
var closeButton=this._closeButton=create$1('a',prefix+'-close-button',container);
closeButton.href='#close';
closeButton.innerHTML='&#215;';
on(closeButton,'click',this._onCloseButtonClick,this);
}
},
_updateLayout:function(){
var container=this._contentNode,
style=container.style;
style.width='';
style.whiteSpace='nowrap';
var width=container.offsetWidth;
width=Math.min(width,this.options.maxWidth);
width=Math.max(width,this.options.minWidth);
style.width=(width+1)+'px';
style.whiteSpace='';
style.height='';
var height=container.offsetHeight,
maxHeight=this.options.maxHeight,
scrolledClass='leaflet-popup-scrolled';
if(maxHeight&&height>maxHeight){
style.height=maxHeight+'px';
addClass(container,scrolledClass);
}else{
removeClass(container,scrolledClass);
}
this._containerWidth=this._container.offsetWidth;
},
_animateZoom:function(e){
var pos=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center),
anchor=this._getAnchor();
setPosition(this._container,pos.add(anchor));
},
_adjustPan:function(){
if(!this.options.autoPan||(this._map._panAnim&&this._map._panAnim._inProgress)){return;}
var map=this._map,
marginBottom=parseInt(getStyle(this._container,'marginBottom'),10)||0,
containerHeight=this._container.offsetHeight+marginBottom,
containerWidth=this._containerWidth,
layerPos=new Point(this._containerLeft,-containerHeight-this._containerBottom);
layerPos._add(getPosition(this._container));
var containerPos=map.layerPointToContainerPoint(layerPos),
padding=toPoint(this.options.autoPanPadding),
paddingTL=toPoint(this.options.autoPanPaddingTopLeft||padding),
paddingBR=toPoint(this.options.autoPanPaddingBottomRight||padding),
size=map.getSize(),
dx=0,
dy=0;
if(containerPos.x+containerWidth+paddingBR.x>size.x){
dx=containerPos.x+containerWidth-size.x+paddingBR.x;
}
if(containerPos.x-dx-paddingTL.x<0){
dx=containerPos.x-paddingTL.x;
}
if(containerPos.y+containerHeight+paddingBR.y>size.y){
dy=containerPos.y+containerHeight-size.y+paddingBR.y;
}
if(containerPos.y-dy-paddingTL.y<0){
dy=containerPos.y-paddingTL.y;
}
if(dx||dy){
map
.fire('autopanstart')
.panBy([dx,dy]);
}
},
_onCloseButtonClick:function(e){
this._close();
stop(e);
},
_getAnchor:function(){
return toPoint(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0]);
}
});
var popup=function(options,source){
return new Popup(options,source);
};
Map.mergeOptions({
closePopupOnClick:true
});
Map.include({
openPopup:function(popup,latlng,options){
if(!(popup instanceof Popup)){
popup=new Popup(options).setContent(popup);
}
if(latlng){
popup.setLatLng(latlng);
}
if(this.hasLayer(popup)){
return this;
}
if(this._popup&&this._popup.options.autoClose){
this.closePopup();
}
this._popup=popup;
return this.addLayer(popup);
},
closePopup:function(popup){
if(!popup||popup===this._popup){
popup=this._popup;
this._popup=null;
}
if(popup){
this.removeLayer(popup);
}
return this;
}
});
Layer.include({
bindPopup:function(content,options){
if(content instanceof Popup){
setOptions(content,options);
this._popup=content;
content._source=this;
}else{
if(!this._popup||options){
this._popup=new Popup(options,this);
}
this._popup.setContent(content);
}
if(!this._popupHandlersAdded){
this.on({
click:this._openPopup,
keypress:this._onKeyPress,
remove:this.closePopup,
move:this._movePopup
});
this._popupHandlersAdded=true;
}
return this;
},
unbindPopup:function(){
if(this._popup){
this.off({
click:this._openPopup,
keypress:this._onKeyPress,
remove:this.closePopup,
move:this._movePopup
});
this._popupHandlersAdded=false;
this._popup=null;
}
return this;
},
openPopup:function(layer,latlng){
if(!(layer instanceof Layer)){
latlng=layer;
layer=this;
}
if(layer instanceof FeatureGroup){
for(var id in this._layers){
layer=this._layers[id];
break;
}
}
if(!latlng){
latlng=layer.getCenter?layer.getCenter():layer.getLatLng();
}
if(this._popup&&this._map){
this._popup._source=layer;
this._popup.update();
this._map.openPopup(this._popup,latlng);
}
return this;
},
closePopup:function(){
if(this._popup){
this._popup._close();
}
return this;
},
togglePopup:function(target){
if(this._popup){
if(this._popup._map){
this.closePopup();
}else{
this.openPopup(target);
}
}
return this;
},
isPopupOpen:function(){
return(this._popup?this._popup.isOpen():false);
},
setPopupContent:function(content){
if(this._popup){
this._popup.setContent(content);
}
return this;
},
getPopup:function(){
return this._popup;
},
_openPopup:function(e){
var layer=e.layer||e.target;
if(!this._popup){
return;
}
if(!this._map){
return;
}
stop(e);
if(layer instanceof Path){
this.openPopup(e.layer||e.target,e.latlng);
return;
}
if(this._map.hasLayer(this._popup)&&this._popup._source===layer){
this.closePopup();
}else{
this.openPopup(layer,e.latlng);
}
},
_movePopup:function(e){
this._popup.setLatLng(e.latlng);
},
_onKeyPress:function(e){
if(e.originalEvent.keyCode===13){
this._openPopup(e);
}
}
});
var Tooltip=DivOverlay.extend({
options:{
pane:'tooltipPane',
offset:[0,0],
direction:'auto',
permanent:false,
sticky:false,
interactive:false,
opacity:0.9
},
onAdd:function(map){
DivOverlay.prototype.onAdd.call(this,map);
this.setOpacity(this.options.opacity);
map.fire('tooltipopen',{tooltip:this});
if(this._source){
this._source.fire('tooltipopen',{tooltip:this},true);
}
},
onRemove:function(map){
DivOverlay.prototype.onRemove.call(this,map);
map.fire('tooltipclose',{tooltip:this});
if(this._source){
this._source.fire('tooltipclose',{tooltip:this},true);
}
},
getEvents:function(){
var events=DivOverlay.prototype.getEvents.call(this);
if(touch&&!this.options.permanent){
events.preclick=this._close;
}
return events;
},
_close:function(){
if(this._map){
this._map.closeTooltip(this);
}
},
_initLayout:function(){
var prefix='leaflet-tooltip',
className=prefix+' '+(this.options.className||'')+' leaflet-zoom-'+(this._zoomAnimated?'animated':'hide');
this._contentNode=this._container=create$1('div',className);
},
_updateLayout:function(){},
_adjustPan:function(){},
_setPosition:function(pos){
var map=this._map,
container=this._container,
centerPoint=map.latLngToContainerPoint(map.getCenter()),
tooltipPoint=map.layerPointToContainerPoint(pos),
direction=this.options.direction,
tooltipWidth=container.offsetWidth,
tooltipHeight=container.offsetHeight,
offset=toPoint(this.options.offset),
anchor=this._getAnchor();
if(direction==='top'){
pos=pos.add(toPoint(-tooltipWidth/2+offset.x,-tooltipHeight+offset.y+anchor.y,true));
}else if(direction==='bottom'){
pos=pos.subtract(toPoint(tooltipWidth/2-offset.x,-offset.y,true));
}else if(direction==='center'){
pos=pos.subtract(toPoint(tooltipWidth/2+offset.x,tooltipHeight/2-anchor.y+offset.y,true));
}else if(direction==='right'||direction==='auto'&&tooltipPoint.x<centerPoint.x){
direction='right';
pos=pos.add(toPoint(offset.x+anchor.x,anchor.y-tooltipHeight/2+offset.y,true));
}else{
direction='left';
pos=pos.subtract(toPoint(tooltipWidth+anchor.x-offset.x,tooltipHeight/2-anchor.y-offset.y,true));
}
removeClass(container,'leaflet-tooltip-right');
removeClass(container,'leaflet-tooltip-left');
removeClass(container,'leaflet-tooltip-top');
removeClass(container,'leaflet-tooltip-bottom');
addClass(container,'leaflet-tooltip-'+direction);
setPosition(container,pos);
},
_updatePosition:function(){
var pos=this._map.latLngToLayerPoint(this._latlng);
this._setPosition(pos);
},
setOpacity:function(opacity){
this.options.opacity=opacity;
if(this._container){
setOpacity(this._container,opacity);
}
},
_animateZoom:function(e){
var pos=this._map._latLngToNewLayerPoint(this._latlng,e.zoom,e.center);
this._setPosition(pos);
},
_getAnchor:function(){
return toPoint(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0]);
}
});
var tooltip=function(options,source){
return new Tooltip(options,source);
};
Map.include({
openTooltip:function(tooltip,latlng,options){
if(!(tooltip instanceof Tooltip)){
tooltip=new Tooltip(options).setContent(tooltip);
}
if(latlng){
tooltip.setLatLng(latlng);
}
if(this.hasLayer(tooltip)){
return this;
}
return this.addLayer(tooltip);
},
closeTooltip:function(tooltip){
if(tooltip){
this.removeLayer(tooltip);
}
return this;
}
});
Layer.include({
bindTooltip:function(content,options){
if(content instanceof Tooltip){
setOptions(content,options);
this._tooltip=content;
content._source=this;
}else{
if(!this._tooltip||options){
this._tooltip=new Tooltip(options,this);
}
this._tooltip.setContent(content);
}
this._initTooltipInteractions();
if(this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)){
this.openTooltip();
}
return this;
},
unbindTooltip:function(){
if(this._tooltip){
this._initTooltipInteractions(true);
this.closeTooltip();
this._tooltip=null;
}
return this;
},
_initTooltipInteractions:function(remove$$1){
if(!remove$$1&&this._tooltipHandlersAdded){return;}
var onOff=remove$$1?'off':'on',
events={
remove:this.closeTooltip,
move:this._moveTooltip
};
if(!this._tooltip.options.permanent){
events.mouseover=this._openTooltip;
events.mouseout=this.closeTooltip;
if(this._tooltip.options.sticky){
events.mousemove=this._moveTooltip;
}
if(touch){
events.click=this._openTooltip;
}
}else{
events.add=this._openTooltip;
}
this[onOff](events);
this._tooltipHandlersAdded=!remove$$1;
},
openTooltip:function(layer,latlng){
if(!(layer instanceof Layer)){
latlng=layer;
layer=this;
}
if(layer instanceof FeatureGroup){
for(var id in this._layers){
layer=this._layers[id];
break;
}
}
if(!latlng){
latlng=layer.getCenter?layer.getCenter():layer.getLatLng();
}
if(this._tooltip&&this._map){
this._tooltip._source=layer;
this._tooltip.update();
this._map.openTooltip(this._tooltip,latlng);
if(this._tooltip.options.interactive&&this._tooltip._container){
addClass(this._tooltip._container,'leaflet-clickable');
this.addInteractiveTarget(this._tooltip._container);
}
}
return this;
},
closeTooltip:function(){
if(this._tooltip){
this._tooltip._close();
if(this._tooltip.options.interactive&&this._tooltip._container){
removeClass(this._tooltip._container,'leaflet-clickable');
this.removeInteractiveTarget(this._tooltip._container);
}
}
return this;
},
toggleTooltip:function(target){
if(this._tooltip){
if(this._tooltip._map){
this.closeTooltip();
}else{
this.openTooltip(target);
}
}
return this;
},
isTooltipOpen:function(){
return this._tooltip.isOpen();
},
setTooltipContent:function(content){
if(this._tooltip){
this._tooltip.setContent(content);
}
return this;
},
getTooltip:function(){
return this._tooltip;
},
_openTooltip:function(e){
var layer=e.layer||e.target;
if(!this._tooltip||!this._map){
return;
}
this.openTooltip(layer,this._tooltip.options.sticky?e.latlng:undefined);
},
_moveTooltip:function(e){
var latlng=e.latlng,containerPoint,layerPoint;
if(this._tooltip.options.sticky&&e.originalEvent){
containerPoint=this._map.mouseEventToContainerPoint(e.originalEvent);
layerPoint=this._map.containerPointToLayerPoint(containerPoint);
latlng=this._map.layerPointToLatLng(layerPoint);
}
this._tooltip.setLatLng(latlng);
}
});
var DivIcon=Icon.extend({
options:{
iconSize:[12,12],
html:false,
bgPos:null,
className:'leaflet-div-icon'
},
createIcon:function(oldIcon){
var div=(oldIcon&&oldIcon.tagName==='DIV')?oldIcon:document.createElement('div'),
options=this.options;
div.innerHTML=options.html!==false?options.html:'';
if(options.bgPos){
var bgPos=toPoint(options.bgPos);
div.style.backgroundPosition=(-bgPos.x)+'px '+(-bgPos.y)+'px';
}
this._setIconStyles(div,'icon');
return div;
},
createShadow:function(){
return null;
}
});
function divIcon(options){
return new DivIcon(options);
}
Icon.Default=IconDefault;
var GridLayer=Layer.extend({
options:{
tileSize:256,
opacity:1,
updateWhenIdle:mobile,
updateWhenZooming:true,
updateInterval:200,
zIndex:1,
bounds:null,
minZoom:0,
maxZoom:undefined,
maxNativeZoom:undefined,
minNativeZoom:undefined,
noWrap:false,
pane:'tilePane',
className:'',
keepBuffer:2
},
initialize:function(options){
setOptions(this,options);
},
onAdd:function(){
this._initContainer();
this._levels={};
this._tiles={};
this._resetView();
this._update();
},
beforeAdd:function(map){
map._addZoomLimit(this);
},
onRemove:function(map){
this._removeAllTiles();
remove(this._container);
map._removeZoomLimit(this);
this._container=null;
this._tileZoom=undefined;
},
bringToFront:function(){
if(this._map){
toFront(this._container);
this._setAutoZIndex(Math.max);
}
return this;
},
bringToBack:function(){
if(this._map){
toBack(this._container);
this._setAutoZIndex(Math.min);
}
return this;
},
getContainer:function(){
return this._container;
},
setOpacity:function(opacity){
this.options.opacity=opacity;
this._updateOpacity();
return this;
},
setZIndex:function(zIndex){
this.options.zIndex=zIndex;
this._updateZIndex();
return this;
},
isLoading:function(){
return this._loading;
},
redraw:function(){
if(this._map){
this._removeAllTiles();
this._update();
}
return this;
},
getEvents:function(){
var events={
viewprereset:this._invalidateAll,
viewreset:this._resetView,
zoom:this._resetView,
moveend:this._onMoveEnd
};
if(!this.options.updateWhenIdle){
if(!this._onMove){
this._onMove=throttle(this._onMoveEnd,this.options.updateInterval,this);
}
events.move=this._onMove;
}
if(this._zoomAnimated){
events.zoomanim=this._animateZoom;
}
return events;
},
createTile:function(){
return document.createElement('div');
},
getTileSize:function(){
var s=this.options.tileSize;
return s instanceof Point?s:new Point(s,s);
},
_updateZIndex:function(){
if(this._container&&this.options.zIndex!==undefined&&this.options.zIndex!==null){
this._container.style.zIndex=this.options.zIndex;
}
},
_setAutoZIndex:function(compare){
var layers=this.getPane().children,
edgeZIndex=-compare(-Infinity,Infinity);
for(var i=0,len=layers.length,zIndex;i<len;i++){
zIndex=layers[i].style.zIndex;
if(layers[i]!==this._container&&zIndex){
edgeZIndex=compare(edgeZIndex,+zIndex);
}
}
if(isFinite(edgeZIndex)){
this.options.zIndex=edgeZIndex+compare(-1,1);
this._updateZIndex();
}
},
_updateOpacity:function(){
if(!this._map){return;}
if(ielt9){return;}
setOpacity(this._container,this.options.opacity);
var now=+new Date(),
nextFrame=false,
willPrune=false;
for(var key in this._tiles){
var tile=this._tiles[key];
if(!tile.current||!tile.loaded){continue;}
var fade=Math.min(1,(now-tile.loaded)/200);
setOpacity(tile.el,fade);
if(fade<1){
nextFrame=true;
}else{
if(tile.active){
willPrune=true;
}else{
this._onOpaqueTile(tile);
}
tile.active=true;
}
}
if(willPrune&&!this._noPrune){this._pruneTiles();}
if(nextFrame){
cancelAnimFrame(this._fadeFrame);
this._fadeFrame=requestAnimFrame(this._updateOpacity,this);
}
},
_onOpaqueTile:falseFn,
_initContainer:function(){
if(this._container){return;}
this._container=create$1('div','leaflet-layer '+(this.options.className||''));
this._updateZIndex();
if(this.options.opacity<1){
this._updateOpacity();
}
this.getPane().appendChild(this._container);
},
_updateLevels:function(){
var zoom=this._tileZoom,
maxZoom=this.options.maxZoom;
if(zoom===undefined){return undefined;}
for(var z in this._levels){
if(this._levels[z].el.children.length||z===zoom){
this._levels[z].el.style.zIndex=maxZoom-Math.abs(zoom-z);
this._onUpdateLevel(z);
}else{
remove(this._levels[z].el);
this._removeTilesAtZoom(z);
this._onRemoveLevel(z);
delete this._levels[z];
}
}
var level=this._levels[zoom],
map=this._map;
if(!level){
level=this._levels[zoom]={};
level.el=create$1('div','leaflet-tile-container leaflet-zoom-animated',this._container);
level.el.style.zIndex=maxZoom;
level.origin=map.project(map.unproject(map.getPixelOrigin()),zoom).round();
level.zoom=zoom;
this._setZoomTransform(level,map.getCenter(),map.getZoom());
falseFn(level.el.offsetWidth);
this._onCreateLevel(level);
}
this._level=level;
return level;
},
_onUpdateLevel:falseFn,
_onRemoveLevel:falseFn,
_onCreateLevel:falseFn,
_pruneTiles:function(){
if(!this._map){
return;
}
var key,tile;
var zoom=this._map.getZoom();
if(zoom>this.options.maxZoom||
zoom<this.options.minZoom){
this._removeAllTiles();
return;
}
for(key in this._tiles){
tile=this._tiles[key];
tile.retain=tile.current;
}
for(key in this._tiles){
tile=this._tiles[key];
if(tile.current&&!tile.active){
var coords=tile.coords;
if(!this._retainParent(coords.x,coords.y,coords.z,coords.z-5)){
this._retainChildren(coords.x,coords.y,coords.z,coords.z+2);
}
}
}
for(key in this._tiles){
if(!this._tiles[key].retain){
this._removeTile(key);
}
}
},
_removeTilesAtZoom:function(zoom){
for(var key in this._tiles){
if(this._tiles[key].coords.z!==zoom){
continue;
}
this._removeTile(key);
}
},
_removeAllTiles:function(){
for(var key in this._tiles){
this._removeTile(key);
}
},
_invalidateAll:function(){
for(var z in this._levels){
remove(this._levels[z].el);
this._onRemoveLevel(z);
delete this._levels[z];
}
this._removeAllTiles();
this._tileZoom=undefined;
},
_retainParent:function(x,y,z,minZoom){
var x2=Math.floor(x/2),
y2=Math.floor(y/2),
z2=z-1,
coords2=new Point(+x2,+y2);
coords2.z=+z2;
var key=this._tileCoordsToKey(coords2),
tile=this._tiles[key];
if(tile&&tile.active){
tile.retain=true;
return true;
}else if(tile&&tile.loaded){
tile.retain=true;
}
if(z2>minZoom){
return this._retainParent(x2,y2,z2,minZoom);
}
return false;
},
_retainChildren:function(x,y,z,maxZoom){
for(var i=2*x;i<2*x+2;i++){
for(var j=2*y;j<2*y+2;j++){
var coords=new Point(i,j);
coords.z=z+1;
var key=this._tileCoordsToKey(coords),
tile=this._tiles[key];
if(tile&&tile.active){
tile.retain=true;
continue;
}else if(tile&&tile.loaded){
tile.retain=true;
}
if(z+1<maxZoom){
this._retainChildren(i,j,z+1,maxZoom);
}
}
}
},
_resetView:function(e){
var animating=e&&(e.pinch||e.flyTo);
this._setView(this._map.getCenter(),this._map.getZoom(),animating,animating);
},
_animateZoom:function(e){
this._setView(e.center,e.zoom,true,e.noUpdate);
},
_clampZoom:function(zoom){
var options=this.options;
if(undefined!==options.minNativeZoom&&zoom<options.minNativeZoom){
return options.minNativeZoom;
}
if(undefined!==options.maxNativeZoom&&options.maxNativeZoom<zoom){
return options.maxNativeZoom;
}
return zoom;
},
_setView:function(center,zoom,noPrune,noUpdate){
var tileZoom=this._clampZoom(Math.round(zoom));
if((this.options.maxZoom!==undefined&&tileZoom>this.options.maxZoom)||
(this.options.minZoom!==undefined&&tileZoom<this.options.minZoom)){
tileZoom=undefined;
}
var tileZoomChanged=this.options.updateWhenZooming&&(tileZoom!==this._tileZoom);
if(!noUpdate||tileZoomChanged){
this._tileZoom=tileZoom;
if(this._abortLoading){
this._abortLoading();
}
this._updateLevels();
this._resetGrid();
if(tileZoom!==undefined){
this._update(center);
}
if(!noPrune){
this._pruneTiles();
}
this._noPrune=!!noPrune;
}
this._setZoomTransforms(center,zoom);
},
_setZoomTransforms:function(center,zoom){
for(var i in this._levels){
this._setZoomTransform(this._levels[i],center,zoom);
}
},
_setZoomTransform:function(level,center,zoom){
var scale=this._map.getZoomScale(zoom,level.zoom),
translate=level.origin.multiplyBy(scale)
.subtract(this._map._getNewPixelOrigin(center,zoom)).round();
if(any3d){
setTransform(level.el,translate,scale);
}else{
setPosition(level.el,translate);
}
},
_resetGrid:function(){
var map=this._map,
crs=map.options.crs,
tileSize=this._tileSize=this.getTileSize(),
tileZoom=this._tileZoom;
var bounds=this._map.getPixelWorldBounds(this._tileZoom);
if(bounds){
this._globalTileRange=this._pxBoundsToTileRange(bounds);
}
this._wrapX=crs.wrapLng&&!this.options.noWrap&&[
Math.floor(map.project([0,crs.wrapLng[0]],tileZoom).x/tileSize.x),
Math.ceil(map.project([0,crs.wrapLng[1]],tileZoom).x/tileSize.y)
];
this._wrapY=crs.wrapLat&&!this.options.noWrap&&[
Math.floor(map.project([crs.wrapLat[0],0],tileZoom).y/tileSize.x),
Math.ceil(map.project([crs.wrapLat[1],0],tileZoom).y/tileSize.y)
];
},
_onMoveEnd:function(){
if(!this._map||this._map._animatingZoom){return;}
this._update();
},
_getTiledPixelBounds:function(center){
var map=this._map,
mapZoom=map._animatingZoom?Math.max(map._animateToZoom,map.getZoom()):map.getZoom(),
scale=map.getZoomScale(mapZoom,this._tileZoom),
pixelCenter=map.project(center,this._tileZoom).floor(),
halfSize=map.getSize().divideBy(scale*2);
return new Bounds(pixelCenter.subtract(halfSize),pixelCenter.add(halfSize));
},
_update:function(center){
var map=this._map;
if(!map){return;}
var zoom=this._clampZoom(map.getZoom());
if(center===undefined){center=map.getCenter();}
if(this._tileZoom===undefined){return;}
var pixelBounds=this._getTiledPixelBounds(center),
tileRange=this._pxBoundsToTileRange(pixelBounds),
tileCenter=tileRange.getCenter(),
queue=[],
margin=this.options.keepBuffer,
noPruneRange=new Bounds(tileRange.getBottomLeft().subtract([margin,-margin]),
tileRange.getTopRight().add([margin,-margin]));
if(!(isFinite(tileRange.min.x)&&
isFinite(tileRange.min.y)&&
isFinite(tileRange.max.x)&&
isFinite(tileRange.max.y))){throw new Error('Attempted to load an infinite number of tiles');}
for(var key in this._tiles){
var c=this._tiles[key].coords;
if(c.z!==this._tileZoom||!noPruneRange.contains(new Point(c.x,c.y))){
this._tiles[key].current=false;
}
}
if(Math.abs(zoom-this._tileZoom)>1){this._setView(center,zoom);return;}
for(var j=tileRange.min.y;j<=tileRange.max.y;j++){
for(var i=tileRange.min.x;i<=tileRange.max.x;i++){
var coords=new Point(i,j);
coords.z=this._tileZoom;
if(!this._isValidTile(coords)){continue;}
var tile=this._tiles[this._tileCoordsToKey(coords)];
if(tile){
tile.current=true;
}else{
queue.push(coords);
}
}
}
queue.sort(function(a,b){
return a.distanceTo(tileCenter)-b.distanceTo(tileCenter);
});
if(queue.length!==0){
if(!this._loading){
this._loading=true;
this.fire('loading');
}
var fragment=document.createDocumentFragment();
for(i=0;i<queue.length;i++){
this._addTile(queue[i],fragment);
}
this._level.el.appendChild(fragment);
}
},
_isValidTile:function(coords){
var crs=this._map.options.crs;
if(!crs.infinite){
var bounds=this._globalTileRange;
if((!crs.wrapLng&&(coords.x<bounds.min.x||coords.x>bounds.max.x))||
(!crs.wrapLat&&(coords.y<bounds.min.y||coords.y>bounds.max.y))){return false;}
}
if(!this.options.bounds){return true;}
var tileBounds=this._tileCoordsToBounds(coords);
return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
},
_keyToBounds:function(key){
return this._tileCoordsToBounds(this._keyToTileCoords(key));
},
_tileCoordsToNwSe:function(coords){
var map=this._map,
tileSize=this.getTileSize(),
nwPoint=coords.scaleBy(tileSize),
sePoint=nwPoint.add(tileSize),
nw=map.unproject(nwPoint,coords.z),
se=map.unproject(sePoint,coords.z);
return[nw,se];
},
_tileCoordsToBounds:function(coords){
var bp=this._tileCoordsToNwSe(coords),
bounds=new LatLngBounds(bp[0],bp[1]);
if(!this.options.noWrap){
bounds=this._map.wrapLatLngBounds(bounds);
}
return bounds;
},
_tileCoordsToKey:function(coords){
return coords.x+':'+coords.y+':'+coords.z;
},
_keyToTileCoords:function(key){
var k=key.split(':'),
coords=new Point(+k[0],+k[1]);
coords.z=+k[2];
return coords;
},
_removeTile:function(key){
var tile=this._tiles[key];
if(!tile){return;}
if(!androidStock){
tile.el.setAttribute('src',emptyImageUrl);
}
remove(tile.el);
delete this._tiles[key];
this.fire('tileunload',{
tile:tile.el,
coords:this._keyToTileCoords(key)
});
},
_initTile:function(tile){
addClass(tile,'leaflet-tile');
var tileSize=this.getTileSize();
tile.style.width=tileSize.x+'px';
tile.style.height=tileSize.y+'px';
tile.onselectstart=falseFn;
tile.onmousemove=falseFn;
if(ielt9&&this.options.opacity<1){
setOpacity(tile,this.options.opacity);
}
if(android&&!android23){
tile.style.WebkitBackfaceVisibility='hidden';
}
},
_addTile:function(coords,container){
var tilePos=this._getTilePos(coords),
key=this._tileCoordsToKey(coords);
var tile=this.createTile(this._wrapCoords(coords),bind(this._tileReady,this,coords));
this._initTile(tile);
if(this.createTile.length<2){
requestAnimFrame(bind(this._tileReady,this,coords,null,tile));
}
setPosition(tile,tilePos);
this._tiles[key]={
el:tile,
coords:coords,
current:true
};
container.appendChild(tile);
this.fire('tileloadstart',{
tile:tile,
coords:coords
});
},
_tileReady:function(coords,err,tile){
if(!this._map){return;}
if(err){
this.fire('tileerror',{
error:err,
tile:tile,
coords:coords
});
}
var key=this._tileCoordsToKey(coords);
tile=this._tiles[key];
if(!tile){return;}
tile.loaded=+new Date();
if(this._map._fadeAnimated){
setOpacity(tile.el,0);
cancelAnimFrame(this._fadeFrame);
this._fadeFrame=requestAnimFrame(this._updateOpacity,this);
}else{
tile.active=true;
this._pruneTiles();
}
if(!err){
addClass(tile.el,'leaflet-tile-loaded');
this.fire('tileload',{
tile:tile.el,
coords:coords
});
}
if(this._noTilesToLoad()){
this._loading=false;
this.fire('load');
if(ielt9||!this._map._fadeAnimated){
requestAnimFrame(this._pruneTiles,this);
}else{
setTimeout(bind(this._pruneTiles,this),250);
}
}
},
_getTilePos:function(coords){
return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
},
_wrapCoords:function(coords){
var newCoords=new Point(
this._wrapX?wrapNum(coords.x,this._wrapX):coords.x,
this._wrapY?wrapNum(coords.y,this._wrapY):coords.y);
newCoords.z=coords.z;
return newCoords;
},
_pxBoundsToTileRange:function(bounds){
var tileSize=this.getTileSize();
return new Bounds(
bounds.min.unscaleBy(tileSize).floor(),
bounds.max.unscaleBy(tileSize).ceil().subtract([1,1]));
},
_noTilesToLoad:function(){
for(var key in this._tiles){
if(!this._tiles[key].loaded){return false;}
}
return true;
}
});
function gridLayer(options){
return new GridLayer(options);
}
var TileLayer=GridLayer.extend({
options:{
minZoom:0,
maxZoom:18,
subdomains:'abc',
errorTileUrl:'',
zoomOffset:0,
tms:false,
zoomReverse:false,
detectRetina:false,
crossOrigin:false
},
initialize:function(url,options){
this._url=url;
options=setOptions(this,options);
if(options.detectRetina&&retina&&options.maxZoom>0){
options.tileSize=Math.floor(options.tileSize/2);
if(!options.zoomReverse){
options.zoomOffset++;
options.maxZoom--;
}else{
options.zoomOffset--;
options.minZoom++;
}
options.minZoom=Math.max(0,options.minZoom);
}
if(typeof options.subdomains==='string'){
options.subdomains=options.subdomains.split('');
}
if(!android){
this.on('tileunload',this._onTileRemove);
}
},
setUrl:function(url,noRedraw){
this._url=url;
if(!noRedraw){
this.redraw();
}
return this;
},
createTile:function(coords,done){
var tile=document.createElement('img');
on(tile,'load',bind(this._tileOnLoad,this,done,tile));
on(tile,'error',bind(this._tileOnError,this,done,tile));
if(this.options.crossOrigin){
tile.crossOrigin='';
}
tile.alt='';
tile.setAttribute('role','presentation');
tile.src=this.getTileUrl(coords);
return tile;
},
getTileUrl:function(coords){
var data={
r:retina?'@2x':'',
s:this._getSubdomain(coords),
x:coords.x,
y:coords.y,
z:this._getZoomForUrl()
};
if(this._map&&!this._map.options.crs.infinite){
var invertedY=this._globalTileRange.max.y-coords.y;
if(this.options.tms){
data['y']=invertedY;
}
data['-y']=invertedY;
}
return template(this._url,extend(data,this.options));
},
_tileOnLoad:function(done,tile){
if(ielt9){
setTimeout(bind(done,this,null,tile),0);
}else{
done(null,tile);
}
},
_tileOnError:function(done,tile,e){
var errorUrl=this.options.errorTileUrl;
if(errorUrl&&tile.getAttribute('src')!==errorUrl){
tile.src=errorUrl;
}
done(e,tile);
},
_onTileRemove:function(e){
e.tile.onload=null;
},
_getZoomForUrl:function(){
var zoom=this._tileZoom,
maxZoom=this.options.maxZoom,
zoomReverse=this.options.zoomReverse,
zoomOffset=this.options.zoomOffset;
if(zoomReverse){
zoom=maxZoom-zoom;
}
return zoom+zoomOffset;
},
_getSubdomain:function(tilePoint){
var index=Math.abs(tilePoint.x+tilePoint.y)%this.options.subdomains.length;
return this.options.subdomains[index];
},
_abortLoading:function(){
var i,tile;
for(i in this._tiles){
if(this._tiles[i].coords.z!==this._tileZoom){
tile=this._tiles[i].el;
tile.onload=falseFn;
tile.onerror=falseFn;
if(!tile.complete){
tile.src=emptyImageUrl;
remove(tile);
delete this._tiles[i];
}
}
}
}
});
function tileLayer(url,options){
return new TileLayer(url,options);
}
var TileLayerWMS=TileLayer.extend({
defaultWmsParams:{
service:'WMS',
request:'GetMap',
layers:'',
styles:'',
format:'image/jpeg',
transparent:false,
version:'1.1.1'
},
options:{
crs:null,
uppercase:false
},
initialize:function(url,options){
this._url=url;
var wmsParams=extend({},this.defaultWmsParams);
for(var i in options){
if(!(i in this.options)){
wmsParams[i]=options[i];
}
}
options=setOptions(this,options);
var realRetina=options.detectRetina&&retina?2:1;
var tileSize=this.getTileSize();
wmsParams.width=tileSize.x*realRetina;
wmsParams.height=tileSize.y*realRetina;
this.wmsParams=wmsParams;
},
onAdd:function(map){
this._crs=this.options.crs||map.options.crs;
this._wmsVersion=parseFloat(this.wmsParams.version);
var projectionKey=this._wmsVersion>=1.3?'crs':'srs';
this.wmsParams[projectionKey]=this._crs.code;
TileLayer.prototype.onAdd.call(this,map);
},
getTileUrl:function(coords){
var tileBounds=this._tileCoordsToNwSe(coords),
crs=this._crs,
bounds=toBounds(crs.project(tileBounds[0]),crs.project(tileBounds[1])),
min=bounds.min,
max=bounds.max,
bbox=(this._wmsVersion>=1.3&&this._crs===EPSG4326?
[min.y,min.x,max.y,max.x]:
[min.x,min.y,max.x,max.y]).join(','),
url=L.TileLayer.prototype.getTileUrl.call(this,coords);
return url+
getParamString(this.wmsParams,url,this.options.uppercase)+
(this.options.uppercase?'&BBOX=':'&bbox=')+bbox;
},
setParams:function(params,noRedraw){
extend(this.wmsParams,params);
if(!noRedraw){
this.redraw();
}
return this;
}
});
function tileLayerWMS(url,options){
return new TileLayerWMS(url,options);
}
TileLayer.WMS=TileLayerWMS;
tileLayer.wms=tileLayerWMS;
var Renderer=Layer.extend({
options:{
padding:0.1,
tolerance:0
},
initialize:function(options){
setOptions(this,options);
stamp(this);
this._layers=this._layers||{};
},
onAdd:function(){
if(!this._container){
this._initContainer();
if(this._zoomAnimated){
addClass(this._container,'leaflet-zoom-animated');
}
}
this.getPane().appendChild(this._container);
this._update();
this.on('update',this._updatePaths,this);
},
onRemove:function(){
this.off('update',this._updatePaths,this);
this._destroyContainer();
},
getEvents:function(){
var events={
viewreset:this._reset,
zoom:this._onZoom,
moveend:this._update,
zoomend:this._onZoomEnd
};
if(this._zoomAnimated){
events.zoomanim=this._onAnimZoom;
}
return events;
},
_onAnimZoom:function(ev){
this._updateTransform(ev.center,ev.zoom);
},
_onZoom:function(){
this._updateTransform(this._map.getCenter(),this._map.getZoom());
},
_updateTransform:function(center,zoom){
var scale=this._map.getZoomScale(zoom,this._zoom),
position=getPosition(this._container),
viewHalf=this._map.getSize().multiplyBy(0.5+this.options.padding),
currentCenterPoint=this._map.project(this._center,zoom),
destCenterPoint=this._map.project(center,zoom),
centerOffset=destCenterPoint.subtract(currentCenterPoint),
topLeftOffset=viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);
if(any3d){
setTransform(this._container,topLeftOffset,scale);
}else{
setPosition(this._container,topLeftOffset);
}
},
_reset:function(){
this._update();
this._updateTransform(this._center,this._zoom);
for(var id in this._layers){
this._layers[id]._reset();
}
},
_onZoomEnd:function(){
for(var id in this._layers){
this._layers[id]._project();
}
},
_updatePaths:function(){
for(var id in this._layers){
this._layers[id]._update();
}
},
_update:function(){
var p=this.options.padding,
size=this._map.getSize(),
min=this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
this._bounds=new Bounds(min,min.add(size.multiplyBy(1+p*2)).round());
this._center=this._map.getCenter();
this._zoom=this._map.getZoom();
}
});
var Canvas=Renderer.extend({
getEvents:function(){
var events=Renderer.prototype.getEvents.call(this);
events.viewprereset=this._onViewPreReset;
return events;
},
_onViewPreReset:function(){
this._postponeUpdatePaths=true;
},
onAdd:function(){
Renderer.prototype.onAdd.call(this);
this._draw();
},
_initContainer:function(){
var container=this._container=document.createElement('canvas');
on(container,'mousemove',throttle(this._onMouseMove,32,this),this);
on(container,'click dblclick mousedown mouseup contextmenu',this._onClick,this);
on(container,'mouseout',this._handleMouseOut,this);
this._ctx=container.getContext('2d');
},
_destroyContainer:function(){
delete this._ctx;
remove(this._container);
off(this._container);
delete this._container;
},
_updatePaths:function(){
if(this._postponeUpdatePaths){return;}
var layer;
this._redrawBounds=null;
for(var id in this._layers){
layer=this._layers[id];
layer._update();
}
this._redraw();
},
_update:function(){
if(this._map._animatingZoom&&this._bounds){return;}
this._drawnLayers={};
Renderer.prototype._update.call(this);
var b=this._bounds,
container=this._container,
size=b.getSize(),
m=retina?2:1;
setPosition(container,b.min);
container.width=m*size.x;
container.height=m*size.y;
container.style.width=size.x+'px';
container.style.height=size.y+'px';
if(retina){
this._ctx.scale(2,2);
}
this._ctx.translate(-b.min.x,-b.min.y);
this.fire('update');
},
_reset:function(){
Renderer.prototype._reset.call(this);
if(this._postponeUpdatePaths){
this._postponeUpdatePaths=false;
this._updatePaths();
}
},
_initPath:function(layer){
this._updateDashArray(layer);
this._layers[stamp(layer)]=layer;
var order=layer._order={
layer:layer,
prev:this._drawLast,
next:null
};
if(this._drawLast){this._drawLast.next=order;}
this._drawLast=order;
this._drawFirst=this._drawFirst||this._drawLast;
},
_addPath:function(layer){
this._requestRedraw(layer);
},
_removePath:function(layer){
var order=layer._order;
var next=order.next;
var prev=order.prev;
if(next){
next.prev=prev;
}else{
this._drawLast=prev;
}
if(prev){
prev.next=next;
}else{
this._drawFirst=next;
}
delete layer._order;
delete this._layers[L.stamp(layer)];
this._requestRedraw(layer);
},
_updatePath:function(layer){
this._extendRedrawBounds(layer);
layer._project();
layer._update();
this._requestRedraw(layer);
},
_updateStyle:function(layer){
this._updateDashArray(layer);
this._requestRedraw(layer);
},
_updateDashArray:function(layer){
if(layer.options.dashArray){
var parts=layer.options.dashArray.split(','),
dashArray=[],
i;
for(i=0;i<parts.length;i++){
dashArray.push(Number(parts[i]));
}
layer.options._dashArray=dashArray;
}
},
_requestRedraw:function(layer){
if(!this._map){return;}
this._extendRedrawBounds(layer);
this._redrawRequest=this._redrawRequest||requestAnimFrame(this._redraw,this);
},
_extendRedrawBounds:function(layer){
if(layer._pxBounds){
var padding=(layer.options.weight||0)+1;
this._redrawBounds=this._redrawBounds||new Bounds();
this._redrawBounds.extend(layer._pxBounds.min.subtract([padding,padding]));
this._redrawBounds.extend(layer._pxBounds.max.add([padding,padding]));
}
},
_redraw:function(){
this._redrawRequest=null;
if(this._redrawBounds){
this._redrawBounds.min._floor();
this._redrawBounds.max._ceil();
}
this._clear();
this._draw();
this._redrawBounds=null;
},
_clear:function(){
var bounds=this._redrawBounds;
if(bounds){
var size=bounds.getSize();
this._ctx.clearRect(bounds.min.x,bounds.min.y,size.x,size.y);
}else{
this._ctx.clearRect(0,0,this._container.width,this._container.height);
}
},
_draw:function(){
var layer,bounds=this._redrawBounds;
this._ctx.save();
if(bounds){
var size=bounds.getSize();
this._ctx.beginPath();
this._ctx.rect(bounds.min.x,bounds.min.y,size.x,size.y);
this._ctx.clip();
}
this._drawing=true;
for(var order=this._drawFirst;order;order=order.next){
layer=order.layer;
if(!bounds||(layer._pxBounds&&layer._pxBounds.intersects(bounds))){
layer._updatePath();
}
}
this._drawing=false;
this._ctx.restore();
},
_updatePoly:function(layer,closed){
if(!this._drawing){return;}
var i,j,len2,p,
parts=layer._parts,
len=parts.length,
ctx=this._ctx;
if(!len){return;}
this._drawnLayers[layer._leaflet_id]=layer;
ctx.beginPath();
for(i=0;i<len;i++){
for(j=0,len2=parts[i].length;j<len2;j++){
p=parts[i][j];
ctx[j?'lineTo':'moveTo'](p.x,p.y);
}
if(closed){
ctx.closePath();
}
}
this._fillStroke(ctx,layer);
},
_updateCircle:function(layer){
if(!this._drawing||layer._empty()){return;}
var p=layer._point,
ctx=this._ctx,
r=Math.max(Math.round(layer._radius),1),
s=(Math.max(Math.round(layer._radiusY),1)||r)/r;
this._drawnLayers[layer._leaflet_id]=layer;
if(s!==1){
ctx.save();
ctx.scale(1,s);
}
ctx.beginPath();
ctx.arc(p.x,p.y/s,r,0,Math.PI*2,false);
if(s!==1){
ctx.restore();
}
this._fillStroke(ctx,layer);
},
_fillStroke:function(ctx,layer){
var options=layer.options;
if(options.fill){
ctx.globalAlpha=options.fillOpacity;
ctx.fillStyle=options.fillColor||options.color;
ctx.fill(options.fillRule||'evenodd');
}
if(options.stroke&&options.weight!==0){
if(ctx.setLineDash){
ctx.setLineDash(layer.options&&layer.options._dashArray||[]);
}
ctx.globalAlpha=options.opacity;
ctx.lineWidth=options.weight;
ctx.strokeStyle=options.color;
ctx.lineCap=options.lineCap;
ctx.lineJoin=options.lineJoin;
ctx.stroke();
}
},
_onClick:function(e){
var point=this._map.mouseEventToLayerPoint(e),layer,clickedLayer;
for(var order=this._drawFirst;order;order=order.next){
layer=order.layer;
if(layer.options.interactive&&layer._containsPoint(point)&&!this._map._draggableMoved(layer)){
clickedLayer=layer;
}
}
if(clickedLayer){
fakeStop(e);
this._fireEvent([clickedLayer],e);
}
},
_onMouseMove:function(e){
if(!this._map||this._map.dragging.moving()||this._map._animatingZoom){return;}
var point=this._map.mouseEventToLayerPoint(e);
this._handleMouseHover(e,point);
},
_handleMouseOut:function(e){
var layer=this._hoveredLayer;
if(layer){
removeClass(this._container,'leaflet-interactive');
this._fireEvent([layer],e,'mouseout');
this._hoveredLayer=null;
}
},
_handleMouseHover:function(e,point){
var layer,candidateHoveredLayer;
for(var order=this._drawFirst;order;order=order.next){
layer=order.layer;
if(layer.options.interactive&&layer._containsPoint(point)){
candidateHoveredLayer=layer;
}
}
if(candidateHoveredLayer!==this._hoveredLayer){
this._handleMouseOut(e);
if(candidateHoveredLayer){
addClass(this._container,'leaflet-interactive');
this._fireEvent([candidateHoveredLayer],e,'mouseover');
this._hoveredLayer=candidateHoveredLayer;
}
}
if(this._hoveredLayer){
this._fireEvent([this._hoveredLayer],e);
}
},
_fireEvent:function(layers,e,type){
this._map._fireDOMEvent(e,type||e.type,layers);
},
_bringToFront:function(layer){
var order=layer._order;
var next=order.next;
var prev=order.prev;
if(next){
next.prev=prev;
}else{
return;
}
if(prev){
prev.next=next;
}else if(next){
this._drawFirst=next;
}
order.prev=this._drawLast;
this._drawLast.next=order;
order.next=null;
this._drawLast=order;
this._requestRedraw(layer);
},
_bringToBack:function(layer){
var order=layer._order;
var next=order.next;
var prev=order.prev;
if(prev){
prev.next=next;
}else{
return;
}
if(next){
next.prev=prev;
}else if(prev){
this._drawLast=prev;
}
order.prev=null;
order.next=this._drawFirst;
this._drawFirst.prev=order;
this._drawFirst=order;
this._requestRedraw(layer);
}
});
function canvas$1(options){
return canvas?new Canvas(options):null;
}
var vmlCreate=(function(){
try{
document.namespaces.add('lvml','urn:schemas-microsoft-com:vml');
return function(name){
return document.createElement('<lvml:'+name+' class="lvml">');
};
}catch(e){
return function(name){
return document.createElement('<'+name+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
};
}
})();
var vmlMixin={
_initContainer:function(){
this._container=create$1('div','leaflet-vml-container');
},
_update:function(){
if(this._map._animatingZoom){return;}
Renderer.prototype._update.call(this);
this.fire('update');
},
_initPath:function(layer){
var container=layer._container=vmlCreate('shape');
addClass(container,'leaflet-vml-shape '+(this.options.className||''));
container.coordsize='1 1';
layer._path=vmlCreate('path');
container.appendChild(layer._path);
this._updateStyle(layer);
this._layers[stamp(layer)]=layer;
},
_addPath:function(layer){
var container=layer._container;
this._container.appendChild(container);
if(layer.options.interactive){
layer.addInteractiveTarget(container);
}
},
_removePath:function(layer){
var container=layer._container;
remove(container);
layer.removeInteractiveTarget(container);
delete this._layers[stamp(layer)];
},
_updateStyle:function(layer){
var stroke=layer._stroke,
fill=layer._fill,
options=layer.options,
container=layer._container;
container.stroked=!!options.stroke;
container.filled=!!options.fill;
if(options.stroke){
if(!stroke){
stroke=layer._stroke=vmlCreate('stroke');
}
container.appendChild(stroke);
stroke.weight=options.weight+'px';
stroke.color=options.color;
stroke.opacity=options.opacity;
if(options.dashArray){
stroke.dashStyle=isArray(options.dashArray)?
options.dashArray.join(' '):
options.dashArray.replace(/( *, *)/g,' ');
}else{
stroke.dashStyle='';
}
stroke.endcap=options.lineCap.replace('butt','flat');
stroke.joinstyle=options.lineJoin;
}else if(stroke){
container.removeChild(stroke);
layer._stroke=null;
}
if(options.fill){
if(!fill){
fill=layer._fill=vmlCreate('fill');
}
container.appendChild(fill);
fill.color=options.fillColor||options.color;
fill.opacity=options.fillOpacity;
}else if(fill){
container.removeChild(fill);
layer._fill=null;
}
},
_updateCircle:function(layer){
var p=layer._point.round(),
r=Math.round(layer._radius),
r2=Math.round(layer._radiusY||r);
this._setPath(layer,layer._empty()?'M0 0':
'AL '+p.x+','+p.y+' '+r+','+r2+' 0,'+(65535*360));
},
_setPath:function(layer,path){
layer._path.v=path;
},
_bringToFront:function(layer){
toFront(layer._container);
},
_bringToBack:function(layer){
toBack(layer._container);
}
};
var create$2=vml?vmlCreate:svgCreate;
var SVG=Renderer.extend({
getEvents:function(){
var events=Renderer.prototype.getEvents.call(this);
events.zoomstart=this._onZoomStart;
return events;
},
_initContainer:function(){
this._container=create$2('svg');
this._container.setAttribute('pointer-events','none');
this._rootGroup=create$2('g');
this._container.appendChild(this._rootGroup);
},
_destroyContainer:function(){
remove(this._container);
off(this._container);
delete this._container;
delete this._rootGroup;
delete this._svgSize;
},
_onZoomStart:function(){
this._update();
},
_update:function(){
if(this._map._animatingZoom&&this._bounds){return;}
Renderer.prototype._update.call(this);
var b=this._bounds,
size=b.getSize(),
container=this._container;
if(!this._svgSize||!this._svgSize.equals(size)){
this._svgSize=size;
container.setAttribute('width',size.x);
container.setAttribute('height',size.y);
}
setPosition(container,b.min);
container.setAttribute('viewBox',[b.min.x,b.min.y,size.x,size.y].join(' '));
this.fire('update');
},
_initPath:function(layer){
var path=layer._path=create$2('path');
if(layer.options.className){
addClass(path,layer.options.className);
}
if(layer.options.interactive){
addClass(path,'leaflet-interactive');
}
this._updateStyle(layer);
this._layers[stamp(layer)]=layer;
},
_addPath:function(layer){
if(!this._rootGroup){this._initContainer();}
this._rootGroup.appendChild(layer._path);
layer.addInteractiveTarget(layer._path);
},
_removePath:function(layer){
remove(layer._path);
layer.removeInteractiveTarget(layer._path);
delete this._layers[stamp(layer)];
},
_updatePath:function(layer){
layer._project();
layer._update();
},
_updateStyle:function(layer){
var path=layer._path,
options=layer.options;
if(!path){return;}
if(options.stroke){
path.setAttribute('stroke',options.color);
path.setAttribute('stroke-opacity',options.opacity);
path.setAttribute('stroke-width',options.weight);
path.setAttribute('stroke-linecap',options.lineCap);
path.setAttribute('stroke-linejoin',options.lineJoin);
if(options.dashArray){
path.setAttribute('stroke-dasharray',options.dashArray);
}else{
path.removeAttribute('stroke-dasharray');
}
if(options.dashOffset){
path.setAttribute('stroke-dashoffset',options.dashOffset);
}else{
path.removeAttribute('stroke-dashoffset');
}
}else{
path.setAttribute('stroke','none');
}
if(options.fill){
path.setAttribute('fill',options.fillColor||options.color);
path.setAttribute('fill-opacity',options.fillOpacity);
path.setAttribute('fill-rule',options.fillRule||'evenodd');
}else{
path.setAttribute('fill','none');
}
},
_updatePoly:function(layer,closed){
this._setPath(layer,pointsToPath(layer._parts,closed));
},
_updateCircle:function(layer){
var p=layer._point,
r=Math.max(Math.round(layer._radius),1),
r2=Math.max(Math.round(layer._radiusY),1)||r,
arc='a'+r+','+r2+' 0 1,0 ';
var d=layer._empty()?'M0 0':
'M'+(p.x-r)+','+p.y+
arc+(r*2)+',0 '+
arc+(-r*2)+',0 ';
this._setPath(layer,d);
},
_setPath:function(layer,path){
layer._path.setAttribute('d',path);
},
_bringToFront:function(layer){
toFront(layer._path);
},
_bringToBack:function(layer){
toBack(layer._path);
}
});
if(vml){
SVG.include(vmlMixin);
}
function svg$1(options){
return svg||vml?new SVG(options):null;
}
Map.include({
getRenderer:function(layer){
var renderer=layer.options.renderer||this._getPaneRenderer(layer.options.pane)||this.options.renderer||this._renderer;
if(!renderer){
renderer=this._renderer=(this.options.preferCanvas&&canvas$1())||svg$1();
}
if(!this.hasLayer(renderer)){
this.addLayer(renderer);
}
return renderer;
},
_getPaneRenderer:function(name){
if(name==='overlayPane'||name===undefined){
return false;
}
var renderer=this._paneRenderers[name];
if(renderer===undefined){
renderer=(SVG&&svg$1({pane:name}))||(Canvas&&canvas$1({pane:name}));
this._paneRenderers[name]=renderer;
}
return renderer;
}
});
var Rectangle=Polygon.extend({
initialize:function(latLngBounds,options){
Polygon.prototype.initialize.call(this,this._boundsToLatLngs(latLngBounds),options);
},
setBounds:function(latLngBounds){
return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
},
_boundsToLatLngs:function(latLngBounds){
latLngBounds=toLatLngBounds(latLngBounds);
return[
latLngBounds.getSouthWest(),
latLngBounds.getNorthWest(),
latLngBounds.getNorthEast(),
latLngBounds.getSouthEast()
];
}
});
function rectangle(latLngBounds,options){
return new Rectangle(latLngBounds,options);
}
SVG.create=create$2;
SVG.pointsToPath=pointsToPath;
GeoJSON.geometryToLayer=geometryToLayer;
GeoJSON.coordsToLatLng=coordsToLatLng;
GeoJSON.coordsToLatLngs=coordsToLatLngs;
GeoJSON.latLngToCoords=latLngToCoords;
GeoJSON.latLngsToCoords=latLngsToCoords;
GeoJSON.getFeature=getFeature;
GeoJSON.asFeature=asFeature;
Map.mergeOptions({
boxZoom:true
});
var BoxZoom=Handler.extend({
initialize:function(map){
this._map=map;
this._container=map._container;
this._pane=map._panes.overlayPane;
this._resetStateTimeout=0;
map.on('unload',this._destroy,this);
},
addHooks:function(){
on(this._container,'mousedown',this._onMouseDown,this);
},
removeHooks:function(){
off(this._container,'mousedown',this._onMouseDown,this);
},
moved:function(){
return this._moved;
},
_destroy:function(){
remove(this._pane);
delete this._pane;
},
_resetState:function(){
this._resetStateTimeout=0;
this._moved=false;
},
_clearDeferredResetState:function(){
if(this._resetStateTimeout!==0){
clearTimeout(this._resetStateTimeout);
this._resetStateTimeout=0;
}
},
_onMouseDown:function(e){
if(!e.shiftKey||((e.which!==1)&&(e.button!==1))){return false;}
this._clearDeferredResetState();
this._resetState();
disableTextSelection();
disableImageDrag();
this._startPoint=this._map.mouseEventToContainerPoint(e);
on(document,{
contextmenu:stop,
mousemove:this._onMouseMove,
mouseup:this._onMouseUp,
keydown:this._onKeyDown
},this);
},
_onMouseMove:function(e){
if(!this._moved){
this._moved=true;
this._box=create$1('div','leaflet-zoom-box',this._container);
addClass(this._container,'leaflet-crosshair');
this._map.fire('boxzoomstart');
}
this._point=this._map.mouseEventToContainerPoint(e);
var bounds=new Bounds(this._point,this._startPoint),
size=bounds.getSize();
setPosition(this._box,bounds.min);
this._box.style.width=size.x+'px';
this._box.style.height=size.y+'px';
},
_finish:function(){
if(this._moved){
remove(this._box);
removeClass(this._container,'leaflet-crosshair');
}
enableTextSelection();
enableImageDrag();
off(document,{
contextmenu:stop,
mousemove:this._onMouseMove,
mouseup:this._onMouseUp,
keydown:this._onKeyDown
},this);
},
_onMouseUp:function(e){
if((e.which!==1)&&(e.button!==1)){return;}
this._finish();
if(!this._moved){return;}
this._clearDeferredResetState();
this._resetStateTimeout=setTimeout(bind(this._resetState,this),0);
var bounds=new LatLngBounds(
this._map.containerPointToLatLng(this._startPoint),
this._map.containerPointToLatLng(this._point));
this._map
.fitBounds(bounds)
.fire('boxzoomend',{boxZoomBounds:bounds});
},
_onKeyDown:function(e){
if(e.keyCode===27){
this._finish();
}
}
});
Map.addInitHook('addHandler','boxZoom',BoxZoom);
Map.mergeOptions({
doubleClickZoom:true
});
var DoubleClickZoom=Handler.extend({
addHooks:function(){
this._map.on('dblclick',this._onDoubleClick,this);
},
removeHooks:function(){
this._map.off('dblclick',this._onDoubleClick,this);
},
_onDoubleClick:function(e){
var map=this._map,
oldZoom=map.getZoom(),
delta=map.options.zoomDelta,
zoom=e.originalEvent.shiftKey?oldZoom-delta:oldZoom+delta;
if(map.options.doubleClickZoom==='center'){
map.setZoom(zoom);
}else{
map.setZoomAround(e.containerPoint,zoom);
}
}
});
Map.addInitHook('addHandler','doubleClickZoom',DoubleClickZoom);
Map.mergeOptions({
dragging:true,
inertia:!android23,
inertiaDeceleration:3400,
inertiaMaxSpeed:Infinity,
easeLinearity:0.2,
worldCopyJump:false,
maxBoundsViscosity:0.0
});
var Drag=Handler.extend({
addHooks:function(){
if(!this._draggable){
var map=this._map;
this._draggable=new Draggable(map._mapPane,map._container);
this._draggable.on({
dragstart:this._onDragStart,
drag:this._onDrag,
dragend:this._onDragEnd
},this);
this._draggable.on('predrag',this._onPreDragLimit,this);
if(map.options.worldCopyJump){
this._draggable.on('predrag',this._onPreDragWrap,this);
map.on('zoomend',this._onZoomEnd,this);
map.whenReady(this._onZoomEnd,this);
}
}
addClass(this._map._container,'leaflet-grab leaflet-touch-drag');
this._draggable.enable();
this._positions=[];
this._times=[];
},
removeHooks:function(){
removeClass(this._map._container,'leaflet-grab');
removeClass(this._map._container,'leaflet-touch-drag');
this._draggable.disable();
},
moved:function(){
return this._draggable&&this._draggable._moved;
},
moving:function(){
return this._draggable&&this._draggable._moving;
},
_onDragStart:function(){
var map=this._map;
map._stop();
if(this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){
var bounds=toLatLngBounds(this._map.options.maxBounds);
this._offsetLimit=toBounds(
this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
.add(this._map.getSize()));
this._viscosity=Math.min(1.0,Math.max(0.0,this._map.options.maxBoundsViscosity));
}else{
this._offsetLimit=null;
}
map
.fire('movestart')
.fire('dragstart');
if(map.options.inertia){
this._positions=[];
this._times=[];
}
},
_onDrag:function(e){
if(this._map.options.inertia){
var time=this._lastTime=+new Date(),
pos=this._lastPos=this._draggable._absPos||this._draggable._newPos;
this._positions.push(pos);
this._times.push(time);
this._prunePositions(time);
}
this._map
.fire('move',e)
.fire('drag',e);
},
_prunePositions:function(time){
while(this._positions.length>1&&time-this._times[0]>50){
this._positions.shift();
this._times.shift();
}
},
_onZoomEnd:function(){
var pxCenter=this._map.getSize().divideBy(2),
pxWorldCenter=this._map.latLngToLayerPoint([0,0]);
this._initialWorldOffset=pxWorldCenter.subtract(pxCenter).x;
this._worldWidth=this._map.getPixelWorldBounds().getSize().x;
},
_viscousLimit:function(value,threshold){
return value-(value-threshold)*this._viscosity;
},
_onPreDragLimit:function(){
if(!this._viscosity||!this._offsetLimit){return;}
var offset=this._draggable._newPos.subtract(this._draggable._startPos);
var limit=this._offsetLimit;
if(offset.x<limit.min.x){offset.x=this._viscousLimit(offset.x,limit.min.x);}
if(offset.y<limit.min.y){offset.y=this._viscousLimit(offset.y,limit.min.y);}
if(offset.x>limit.max.x){offset.x=this._viscousLimit(offset.x,limit.max.x);}
if(offset.y>limit.max.y){offset.y=this._viscousLimit(offset.y,limit.max.y);}
this._draggable._newPos=this._draggable._startPos.add(offset);
},
_onPreDragWrap:function(){
var worldWidth=this._worldWidth,
halfWidth=Math.round(worldWidth/2),
dx=this._initialWorldOffset,
x=this._draggable._newPos.x,
newX1=(x-halfWidth+dx)%worldWidth+halfWidth-dx,
newX2=(x+halfWidth+dx)%worldWidth-halfWidth-dx,
newX=Math.abs(newX1+dx)<Math.abs(newX2+dx)?newX1:newX2;
this._draggable._absPos=this._draggable._newPos.clone();
this._draggable._newPos.x=newX;
},
_onDragEnd:function(e){
var map=this._map,
options=map.options,
noInertia=!options.inertia||this._times.length<2;
map.fire('dragend',e);
if(noInertia){
map.fire('moveend');
}else{
this._prunePositions(+new Date());
var direction=this._lastPos.subtract(this._positions[0]),
duration=(this._lastTime-this._times[0])/1000,
ease=options.easeLinearity,
speedVector=direction.multiplyBy(ease/duration),
speed=speedVector.distanceTo([0,0]),
limitedSpeed=Math.min(options.inertiaMaxSpeed,speed),
limitedSpeedVector=speedVector.multiplyBy(limitedSpeed/speed),
decelerationDuration=limitedSpeed/(options.inertiaDeceleration*ease),
offset=limitedSpeedVector.multiplyBy(-decelerationDuration/2).round();
if(!offset.x&&!offset.y){
map.fire('moveend');
}else{
offset=map._limitOffset(offset,map.options.maxBounds);
requestAnimFrame(function(){
map.panBy(offset,{
duration:decelerationDuration,
easeLinearity:ease,
noMoveStart:true,
animate:true
});
});
}
}
}
});
Map.addInitHook('addHandler','dragging',Drag);
Map.mergeOptions({
keyboard:true,
keyboardPanDelta:80
});
var Keyboard=Handler.extend({
keyCodes:{
left:[37],
right:[39],
down:[40],
up:[38],
zoomIn:[187,107,61,171],
zoomOut:[189,109,54,173]
},
initialize:function(map){
this._map=map;
this._setPanDelta(map.options.keyboardPanDelta);
this._setZoomDelta(map.options.zoomDelta);
},
addHooks:function(){
var container=this._map._container;
if(container.tabIndex<=0){
container.tabIndex='0';
}
on(container,{
focus:this._onFocus,
blur:this._onBlur,
mousedown:this._onMouseDown
},this);
this._map.on({
focus:this._addHooks,
blur:this._removeHooks
},this);
},
removeHooks:function(){
this._removeHooks();
off(this._map._container,{
focus:this._onFocus,
blur:this._onBlur,
mousedown:this._onMouseDown
},this);
this._map.off({
focus:this._addHooks,
blur:this._removeHooks
},this);
},
_onMouseDown:function(){
if(this._focused){return;}
var body=document.body,
docEl=document.documentElement,
top=body.scrollTop||docEl.scrollTop,
left=body.scrollLeft||docEl.scrollLeft;
this._map._container.focus();
window.scrollTo(left,top);
},
_onFocus:function(){
this._focused=true;
this._map.fire('focus');
},
_onBlur:function(){
this._focused=false;
this._map.fire('blur');
},
_setPanDelta:function(panDelta){
var keys=this._panKeys={},
codes=this.keyCodes,
i,len;
for(i=0,len=codes.left.length;i<len;i++){
keys[codes.left[i]]=[-1*panDelta,0];
}
for(i=0,len=codes.right.length;i<len;i++){
keys[codes.right[i]]=[panDelta,0];
}
for(i=0,len=codes.down.length;i<len;i++){
keys[codes.down[i]]=[0,panDelta];
}
for(i=0,len=codes.up.length;i<len;i++){
keys[codes.up[i]]=[0,-1*panDelta];
}
},
_setZoomDelta:function(zoomDelta){
var keys=this._zoomKeys={},
codes=this.keyCodes,
i,len;
for(i=0,len=codes.zoomIn.length;i<len;i++){
keys[codes.zoomIn[i]]=zoomDelta;
}
for(i=0,len=codes.zoomOut.length;i<len;i++){
keys[codes.zoomOut[i]]=-zoomDelta;
}
},
_addHooks:function(){
on(document,'keydown',this._onKeyDown,this);
},
_removeHooks:function(){
off(document,'keydown',this._onKeyDown,this);
},
_onKeyDown:function(e){
if(e.altKey||e.ctrlKey||e.metaKey){return;}
var key=e.keyCode,
map=this._map,
offset;
if(key in this._panKeys){
if(map._panAnim&&map._panAnim._inProgress){return;}
offset=this._panKeys[key];
if(e.shiftKey){
offset=toPoint(offset).multiplyBy(3);
}
map.panBy(offset);
if(map.options.maxBounds){
map.panInsideBounds(map.options.maxBounds);
}
}else if(key in this._zoomKeys){
map.setZoom(map.getZoom()+(e.shiftKey?3:1)*this._zoomKeys[key]);
}else if(key===27&&map._popup&&map._popup.options.closeOnEscapeKey){
map.closePopup();
}else{
return;
}
stop(e);
}
});
Map.addInitHook('addHandler','keyboard',Keyboard);
Map.mergeOptions({
scrollWheelZoom:true,
wheelDebounceTime:40,
wheelPxPerZoomLevel:60
});
var ScrollWheelZoom=Handler.extend({
addHooks:function(){
on(this._map._container,'mousewheel',this._onWheelScroll,this);
this._delta=0;
},
removeHooks:function(){
off(this._map._container,'mousewheel',this._onWheelScroll,this);
},
_onWheelScroll:function(e){
var delta=getWheelDelta(e);
var debounce=this._map.options.wheelDebounceTime;
this._delta+=delta;
this._lastMousePos=this._map.mouseEventToContainerPoint(e);
if(!this._startTime){
this._startTime=+new Date();
}
var left=Math.max(debounce-(+new Date()-this._startTime),0);
clearTimeout(this._timer);
this._timer=setTimeout(bind(this._performZoom,this),left);
stop(e);
},
_performZoom:function(){
var map=this._map,
zoom=map.getZoom(),
snap=this._map.options.zoomSnap||0;
map._stop();
var d2=this._delta/(this._map.options.wheelPxPerZoomLevel*4),
d3=4*Math.log(2/(1+Math.exp(-Math.abs(d2))))/Math.LN2,
d4=snap?Math.ceil(d3/snap)*snap:d3,
delta=map._limitZoom(zoom+(this._delta>0?d4:-d4))-zoom;
this._delta=0;
this._startTime=null;
if(!delta){return;}
if(map.options.scrollWheelZoom==='center'){
map.setZoom(zoom+delta);
}else{
map.setZoomAround(this._lastMousePos,zoom+delta);
}
}
});
Map.addInitHook('addHandler','scrollWheelZoom',ScrollWheelZoom);
Map.mergeOptions({
tap:true,
tapTolerance:15
});
var Tap=Handler.extend({
addHooks:function(){
on(this._map._container,'touchstart',this._onDown,this);
},
removeHooks:function(){
off(this._map._container,'touchstart',this._onDown,this);
},
_onDown:function(e){
if(!e.touches){return;}
preventDefault(e);
this._fireClick=true;
if(e.touches.length>1){
this._fireClick=false;
clearTimeout(this._holdTimeout);
return;
}
var first=e.touches[0],
el=first.target;
this._startPos=this._newPos=new Point(first.clientX,first.clientY);
if(el.tagName&&el.tagName.toLowerCase()==='a'){
addClass(el,'leaflet-active');
}
this._holdTimeout=setTimeout(bind(function(){
if(this._isTapValid()){
this._fireClick=false;
this._onUp();
this._simulateEvent('contextmenu',first);
}
},this),1000);
this._simulateEvent('mousedown',first);
on(document,{
touchmove:this._onMove,
touchend:this._onUp
},this);
},
_onUp:function(e){
clearTimeout(this._holdTimeout);
off(document,{
touchmove:this._onMove,
touchend:this._onUp
},this);
if(this._fireClick&&e&&e.changedTouches){
var first=e.changedTouches[0],
el=first.target;
if(el&&el.tagName&&el.tagName.toLowerCase()==='a'){
removeClass(el,'leaflet-active');
}
this._simulateEvent('mouseup',first);
if(this._isTapValid()){
this._simulateEvent('click',first);
}
}
},
_isTapValid:function(){
return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance;
},
_onMove:function(e){
var first=e.touches[0];
this._newPos=new Point(first.clientX,first.clientY);
this._simulateEvent('mousemove',first);
},
_simulateEvent:function(type,e){
var simulatedEvent=document.createEvent('MouseEvents');
simulatedEvent._simulated=true;
e.target._simulatedClick=true;
simulatedEvent.initMouseEvent(
type,true,true,window,1,
e.screenX,e.screenY,
e.clientX,e.clientY,
false,false,false,false,0,null);
e.target.dispatchEvent(simulatedEvent);
}
});
if(touch&&!pointer){
Map.addInitHook('addHandler','tap',Tap);
}
Map.mergeOptions({
touchZoom:touch&&!android23,
bounceAtZoomLimits:true
});
var TouchZoom=Handler.extend({
addHooks:function(){
addClass(this._map._container,'leaflet-touch-zoom');
on(this._map._container,'touchstart',this._onTouchStart,this);
},
removeHooks:function(){
removeClass(this._map._container,'leaflet-touch-zoom');
off(this._map._container,'touchstart',this._onTouchStart,this);
},
_onTouchStart:function(e){
var map=this._map;
if(!e.touches||e.touches.length!==2||map._animatingZoom||this._zooming){return;}
var p1=map.mouseEventToContainerPoint(e.touches[0]),
p2=map.mouseEventToContainerPoint(e.touches[1]);
this._centerPoint=map.getSize()._divideBy(2);
this._startLatLng=map.containerPointToLatLng(this._centerPoint);
if(map.options.touchZoom!=='center'){
this._pinchStartLatLng=map.containerPointToLatLng(p1.add(p2)._divideBy(2));
}
this._startDist=p1.distanceTo(p2);
this._startZoom=map.getZoom();
this._moved=false;
this._zooming=true;
map._stop();
on(document,'touchmove',this._onTouchMove,this);
on(document,'touchend',this._onTouchEnd,this);
preventDefault(e);
},
_onTouchMove:function(e){
if(!e.touches||e.touches.length!==2||!this._zooming){return;}
var map=this._map,
p1=map.mouseEventToContainerPoint(e.touches[0]),
p2=map.mouseEventToContainerPoint(e.touches[1]),
scale=p1.distanceTo(p2)/this._startDist;
this._zoom=map.getScaleZoom(scale,this._startZoom);
if(!map.options.bounceAtZoomLimits&&(
(this._zoom<map.getMinZoom()&&scale<1)||
(this._zoom>map.getMaxZoom()&&scale>1))){
this._zoom=map._limitZoom(this._zoom);
}
if(map.options.touchZoom==='center'){
this._center=this._startLatLng;
if(scale===1){return;}
}else{
var delta=p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
if(scale===1&&delta.x===0&&delta.y===0){return;}
this._center=map.unproject(map.project(this._pinchStartLatLng,this._zoom).subtract(delta),this._zoom);
}
if(!this._moved){
map._moveStart(true,false);
this._moved=true;
}
cancelAnimFrame(this._animRequest);
var moveFn=bind(map._move,map,this._center,this._zoom,{pinch:true,round:false});
this._animRequest=requestAnimFrame(moveFn,this,true);
preventDefault(e);
},
_onTouchEnd:function(){
if(!this._moved||!this._zooming){
this._zooming=false;
return;
}
this._zooming=false;
cancelAnimFrame(this._animRequest);
off(document,'touchmove',this._onTouchMove);
off(document,'touchend',this._onTouchEnd);
if(this._map.options.zoomAnimation){
this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),true,this._map.options.zoomSnap);
}else{
this._map._resetView(this._center,this._map._limitZoom(this._zoom));
}
}
});
Map.addInitHook('addHandler','touchZoom',TouchZoom);
Map.BoxZoom=BoxZoom;
Map.DoubleClickZoom=DoubleClickZoom;
Map.Drag=Drag;
Map.Keyboard=Keyboard;
Map.ScrollWheelZoom=ScrollWheelZoom;
Map.Tap=Tap;
Map.TouchZoom=TouchZoom;
var oldL=window.L;
function noConflict(){
window.L=oldL;
return this;
}
window.L=exports;
Object.freeze=freeze;
exports.version=version;
exports.noConflict=noConflict;
exports.Control=Control;
exports.control=control;
exports.Browser=Browser;
exports.Evented=Evented;
exports.Mixin=Mixin;
exports.Util=Util;
exports.Class=Class;
exports.Handler=Handler;
exports.extend=extend;
exports.bind=bind;
exports.stamp=stamp;
exports.setOptions=setOptions;
exports.DomEvent=DomEvent;
exports.DomUtil=DomUtil;
exports.PosAnimation=PosAnimation;
exports.Draggable=Draggable;
exports.LineUtil=LineUtil;
exports.PolyUtil=PolyUtil;
exports.Point=Point;
exports.point=toPoint;
exports.Bounds=Bounds;
exports.bounds=toBounds;
exports.Transformation=Transformation;
exports.transformation=toTransformation;
exports.Projection=index;
exports.LatLng=LatLng;
exports.latLng=toLatLng;
exports.LatLngBounds=LatLngBounds;
exports.latLngBounds=toLatLngBounds;
exports.CRS=CRS;
exports.GeoJSON=GeoJSON;
exports.geoJSON=geoJSON;
exports.geoJson=geoJson;
exports.Layer=Layer;
exports.LayerGroup=LayerGroup;
exports.layerGroup=layerGroup;
exports.FeatureGroup=FeatureGroup;
exports.featureGroup=featureGroup;
exports.ImageOverlay=ImageOverlay;
exports.imageOverlay=imageOverlay;
exports.VideoOverlay=VideoOverlay;
exports.videoOverlay=videoOverlay;
exports.DivOverlay=DivOverlay;
exports.Popup=Popup;
exports.popup=popup;
exports.Tooltip=Tooltip;
exports.tooltip=tooltip;
exports.Icon=Icon;
exports.icon=icon;
exports.DivIcon=DivIcon;
exports.divIcon=divIcon;
exports.Marker=Marker;
exports.marker=marker;
exports.TileLayer=TileLayer;
exports.tileLayer=tileLayer;
exports.GridLayer=GridLayer;
exports.gridLayer=gridLayer;
exports.SVG=SVG;
exports.svg=svg$1;
exports.Renderer=Renderer;
exports.Canvas=Canvas;
exports.canvas=canvas$1;
exports.Path=Path;
exports.CircleMarker=CircleMarker;
exports.circleMarker=circleMarker;
exports.Circle=Circle;
exports.circle=circle;
exports.Polyline=Polyline;
exports.polyline=polyline;
exports.Polygon=Polygon;
exports.polygon=polygon;
exports.Rectangle=Rectangle;
exports.rectangle=rectangle;
exports.Map=Map;
exports.map=createMap;
})));
L.Icon.Default.imagePath='/images/';
(function(){
L.gisConfig={
'gis_layers':{"openstreetmap_mapnik":{"nom":"OpenStreetMap","layer":"L.tileLayer.provider(\"OpenStreetMap\")"},"openstreetmap_blackandwhite":{"nom":"OpenStreetMap Black and White","layer":"L.tileLayer.provider(\"OpenStreetMap.BlackAndWhite\")"},"openstreetmap_de":{"nom":"OpenStreetMap DE","layer":"L.tileLayer.provider(\"OpenStreetMap.DE\")"},"openstreetmap_fr":{"nom":"OpenStreetMap FR","layer":"L.tileLayer.provider(\"OpenStreetMap.France\")"},"openstreetmap_hot":{"nom":"OpenStreetMap H.O.T.","layer":"L.tileLayer.provider(\"OpenStreetMap.HOT\")"},"google_roadmap":{"nom":"Google Roadmap","layer":"L.gridLayer.googleMutant({type:\"roadmap\"})"},"google_satellite":{"nom":"Google Satellite","layer":"L.gridLayer.googleMutant({type:\"satellite\"})"},"google_terrain":{"nom":"Google Terrain","layer":"L.gridLayer.googleMutant({type:\"terrain\"})"},"bing_aerial":{"nom":"Bing Aerial","layer":"L.BingLayer(\"\")"},"opentopomap":{"nom":"OpenTopoMap","layer":"L.tileLayer.provider(\"OpenTopoMap\")"},"openmapsurfer":{"nom":"OpenMapSurfer","layer":"L.tileLayer.provider(\"OpenMapSurfer\")"},"openmapsurfer_grayscale":{"nom":"OpenMapSurfer Grayscale","layer":"L.tileLayer.provider(\"OpenMapSurfer.Grayscale\")"},"hydda":{"nom":"Hydda","layer":"L.tileLayer.provider(\"Hydda\")"},"hydda_base":{"nom":"Hydda Base","layer":"L.tileLayer.provider(\"Hydda.Base\")"},"stamen_toner":{"nom":"Stamen Toner","layer":"L.tileLayer.provider(\"Stamen.Toner\")"},"stamen_tonerlite":{"nom":"Stamen Toner Lite","layer":"L.tileLayer.provider(\"Stamen.TonerLite\")"},"stamen_terrain":{"nom":"Stamen Terrain","layer":"L.tileLayer.provider(\"Stamen.Terrain\")"},"stamen_watercolor":{"nom":"Stamen Watercolor","layer":"L.tileLayer.provider(\"Stamen.Watercolor\")"},"esri_worldstreetmap":{"nom":"Esri WorldStreetMap","layer":"L.tileLayer.provider(\"Esri.WorldStreetMap\")"},"esri_delorme":{"nom":"Esri DeLorme","layer":"L.tileLayer.provider(\"Esri.DeLorme\")"},"esri_worldtopomap":{"nom":"Esri WorldTopoMap","layer":"L.tileLayer.provider(\"Esri.WorldTopoMap\")"},"esri_worldimagery":{"nom":"Esri WorldImagery","layer":"L.tileLayer.provider(\"Esri.WorldImagery\")"},"esri_worldterrain":{"nom":"Esri WorldTerrain","layer":"L.tileLayer.provider(\"Esri.WorldTerrain\")"},"esri_worldshadedrelief":{"nom":"Esri WorldShadedRelief","layer":"L.tileLayer.provider(\"Esri.WorldShadedRelief\")"},"esri_worldphysical":{"nom":"Esri WorldPhysical","layer":"L.tileLayer.provider(\"Esri.WorldPhysical\")"},"esri_oceanbasemap":{"nom":"Esri OceanBasemap","layer":"L.tileLayer.provider(\"Esri.OceanBasemap\")"},"esri_natgeoworldmap":{"nom":"Esri NatGeoWorldMap","layer":"L.tileLayer.provider(\"Esri.NatGeoWorldMap\")"},"esri_worldgraycanvas":{"nom":"Esri WorldGrayCanvas","layer":"L.tileLayer.provider(\"Esri.WorldGrayCanvas\")"},"cartodb_positron":{"nom":"CartoDB Positron","layer":"L.tileLayer(\"https:\/\/cartodb-basemaps-{s}.global.ssl.fastly.net\/light_all\/{z}\/{x}\/{y}.png\", L.tileLayer.provider(\"CartoDB.Positron\").options)"},"cartodb_positron_base":{"nom":"CartoDB Positron Base","layer":"L.tileLayer(\"https:\/\/cartodb-basemaps-{s}.global.ssl.fastly.net\/light_nolabels\/{z}\/{x}\/{y}.png\", L.tileLayer.provider(\"CartoDB.PositronNoLabels\").options)"},"cartodb_darkmatter":{"nom":"CartoDB DarkMatter","layer":"L.tileLayer(\"https:\/\/cartodb-basemaps-{s}.global.ssl.fastly.net\/dark_all\/{z}\/{x}\/{y}.png\", L.tileLayer.provider(\"CartoDB.DarkMatter\").options)"},"cartodb_darkmatter_base":{"nom":"CartoDB DarkMatter Base","layer":"L.tileLayer(\"https:\/\/cartodb-basemaps-{s}.global.ssl.fastly.net\/dark_nolabels\/{z}\/{x}\/{y}.png\", L.tileLayer.provider(\"CartoDB.DarkMatterNoLabels\").options)"}},
'default_layer':'openstreetmap_fr',
'affiche_layers':["openstreetmap_fr"]
};
L.geocoderConfig={
'forwardUrl':'',
'reverseUrl':''
};
})();
L.Geocoder=L.Class.extend({
includes:L.Evented,
options:{
forwardUrl:L.geocoderConfig.forwardUrl,
reverseUrl:L.geocoderConfig.reverseUrl,
limit:1,
acceptLanguage:'fr',
addressdetails:1
},
initialize:function(callback,options){
L.Util.setOptions(this,options);
this._user_callback=callback;
},
geocode:function(data){
if(L.LatLng&&(data instanceof L.LatLng)){
this._reverse_geocode(data);
}else if(typeof(data)=='string'){
this.options.search=data;
this._geocode(data);
}
},
_geocode:function(text){
this._request(
this.options.forwardUrl,
{
format:'json',
q:text,
limit:this.options.limit,
addressdetails:this.options.addressdetails,
'accept-language':this.options.acceptLanguage
}
);
},
_reverse_geocode:function(latlng){
this._request(
this.options.reverseUrl,
{
format:'json',
lat:latlng.lat,
lon:latlng.lng,
'accept-language':this.options.acceptLanguage
}
);
},
_request:function(url,data){
jQuery.ajax({
cache:true,
context:this,
data:data,
success:this._callback,
url:url
});
},
_callback:function(response,textStatus,jqXHR){
var return_location={},
geocoder_server=false;
if(this.options.search){
return_location.search=this.options.search;
}
if(response.type==='FeatureCollection'){
geocoder_server='photon';
}
if(((response instanceof Array)&&(!response.length))||((response instanceof Object)&&(response.error))){
return_location.error='not found';
}else{
return_location.street=return_location.postcode=return_location.postcode=
return_location.locality=return_location.region=return_location.country='';
if(geocoder_server=='photon'){
if(!response.features.length||response.features.length==0){
return_location.error='not found';
}
else{
place=response.features[0];
var street_components=[];
if(place.properties.country){
return_location.country=place.properties.country;
}
if(place.properties.country_code){
return_location.country_code=place.properties.country_code;
}
if(place.properties.state){
return_location.region=place.properties.state;
}
if(place.properties.city){
return_location.locality=place.properties.city;
}else if(place.properties.town){
return_location.locality=place.properties.town;
}else if(place.properties.village){
return_location.locality=place.properties.village;
}else if(place.properties.osm_key=='place'&&(place.properties.osm_value=='city'||place.properties.osm_value=='village')){
return_location.locality=place.properties.name;
}else if(place.properties.county){
street_components.push(place.properties.county);
}
if(place.properties.postcode){
return_location.postcode=place.properties.postcode;
}
if(place.properties.street){
street_components.push(place.properties.street);
}else if(place.properties.road){
street_components.push(place.properties.road);
}else if(place.properties.pedestrian){
street_components.push(place.properties.pedestrian);
}
if(place.properties.housenumber){
street_components.unshift(place.properties.housenumber);
}
if(return_location.street===''&&street_components.length>0){
return_location.street=street_components.join(' ');
}
place.lat=place.geometry.coordinates[1];
place.lon=place.geometry.coordinates[0];
return_location.point=new L.LatLng(place.lat,place.lon);
}
}
else{
if(response.length>0)
place=response[0];
else{
place=response;
}
var street_components=[];
if(place.address.country){
return_location.country=place.address.country;
}
if(place.address.country_code){
return_location.country_code=place.address.country_code;
}
if(place.address.state){
return_location.region=place.address.state;
}
if(place.address.city){
return_location.locality=place.address.city;
}else if(place.address.town){
return_location.locality=place.address.town;
}else if(place.address.village){
return_location.locality=place.address.village;
}else if(place.address.county){
street_components.push(place.address.county);
}
if(place.address.postcode){
return_location.postcode=place.address.postcode;
}
if(place.address.road){
street_components.push(place.address.road);
}else if(place.address.pedestrian){
street_components.push(place.address.pedestrian);
}
if(place.address.house_number){
street_components.unshift(place.address.house_number);
}
if(return_location.street===''&&street_components.length>0){
return_location.street=street_components.join(' ');
}
return_location.point=new L.LatLng(place.lat,place.lon);
}
}
this.fire('complete',{result:return_location});
this._user_callback(return_location);
}
});
function gis_focus_marker(id,map){
var carte=eval('map'+map);
var i,count=0;
for(i in carte._layers){
if(L.MarkerClusterGroup&&carte._layers[i]instanceof L.MarkerClusterGroup){
carte._layers[i].eachLayer(function(layer){
if(layer.id&&layer.id==id){
carte._layers[i].zoomToShowLayer(layer,function(){
layer.openPopup();
});
count++;
}
});
if(count>0){
break;
}
}else if(((carte._layers[i].feature)&&(carte._layers[i].feature.id==id))||(carte._layers[i].id&&carte._layers[i].id==id)){
carte.panTo(carte._layers[i].getLatLng());
carte._layers[i].openPopup();
break;
}
count++;
}
}
L.KML=L.FeatureGroup.extend({
options:{
async:true
},
initialize:function(kml,options){
L.Util.setOptions(this,options);
this._kml=kml;
this._layers={};
if(kml){
this.addKML(kml,options,this.options.async);
}
},
loadXML:function(url,cb,options,async){
if(async===undefined)async=this.options.async;
if(options===undefined)options=this.options;
var req=new window.XMLHttpRequest();
if(req.withCredentials===undefined&&typeof window.XDomainRequest!=='undefined'){
var xdr=new window.XDomainRequest();
xdr.open('GET',url,async);
xdr.onprogress=function(){};
xdr.ontimeout=function(){};
xdr.onerror=function(){};
xdr.onload=function(){
if(xdr.responseText){
var xml=new window.ActiveXObject('Microsoft.XMLDOM');
xml.loadXML(xdr.responseText);
cb(xml,options);
}
};
setTimeout(function(){xdr.send();},0);
}else{
req.open('GET',url,async);
req.setRequestHeader('Accept','application/vnd.google-earth.kml+xml');
try{
req.overrideMimeType('text/xml');
}catch(e){}
req.onreadystatechange=function(){
if(req.readyState!==4)return;
if(req.status===200)cb(req.responseXML,options);
};
req.send(null);
}
},
addKML:function(url,options,async){
var _this=this;
var cb=function(kml){_this._addKML(kml);};
this.loadXML(url,cb,options,async);
},
_addKML:function(xml){
var layers=L.KML.parseKML(xml);
if(!layers||!layers.length)return;
for(var i=0;i<layers.length;i++){
this.fire('addlayer',{
layer:layers[i]
});
this.addLayer(layers[i]);
}
this.latLngs=L.KML.getLatLngs(xml);
this.fire('loaded');
},
latLngs:[]
});
L.Util.extend(L.KML,{
parseKML:function(xml){
var style=this.parseStyles(xml);
this.parseStyleMap(xml,style);
var el=xml.getElementsByTagName('Folder');
var layers=[],l;
for(var i=0;i<el.length;i++){
if(!this._check_folder(el[i])){continue;}
l=this.parseFolder(el[i],style);
if(l){layers.push(l);}
}
el=xml.getElementsByTagName('Placemark');
for(var j=0;j<el.length;j++){
if(!this._check_folder(el[j])){continue;}
l=this.parsePlacemark(el[j],xml,style);
if(l){layers.push(l);}
}
el=xml.getElementsByTagName('GroundOverlay');
for(var k=0;k<el.length;k++){
l=this.parseGroundOverlay(el[k]);
if(l){layers.push(l);}
}
return layers;
},
_check_folder:function(e,folder){
e=e.parentNode;
while(e&&e.tagName!=='Folder')
{
e=e.parentNode;
}
return!e||e===folder;
},
parseStyles:function(xml){
var styles={};
var sl=xml.getElementsByTagName('Style');
for(var i=0,len=sl.length;i<len;i++){
var style=this.parseStyle(sl[i]);
if(style){
var styleName='#'+style.id;
styles[styleName]=style;
}
}
return styles;
},
parseStyle:function(xml){
var style={},poptions={},ioptions={},el,id;
var attributes={color:true,width:true,Icon:true,href:true,hotSpot:true};
function _parse(xml){
var options={};
for(var i=0;i<xml.childNodes.length;i++){
var e=xml.childNodes[i];
var key=e.tagName;
if(!attributes[key]){continue;}
if(key==='hotSpot')
{
for(var j=0;j<e.attributes.length;j++){
options[e.attributes[j].name]=e.attributes[j].nodeValue;
}
}else{
var value=e.childNodes[0].nodeValue;
if(key==='color'){
options.opacity=parseInt(value.substring(0,2),16)/255.0;
options.color='#'+value.substring(6,8)+value.substring(4,6)+value.substring(2,4);
}else if(key==='width'){
options.weight=value;
}else if(key==='Icon'){
ioptions=_parse(e);
if(ioptions.href){options.href=ioptions.href;}
}else if(key==='href'){
options.href=value;
}
}
}
return options;
}
el=xml.getElementsByTagName('LineStyle');
if(el&&el[0]){style=_parse(el[0]);}
el=xml.getElementsByTagName('PolyStyle');
if(el&&el[0]){poptions=_parse(el[0]);}
if(poptions.color){style.fillColor=poptions.color;}
if(poptions.opacity){style.fillOpacity=poptions.opacity;}
el=xml.getElementsByTagName('IconStyle');
if(el&&el[0]){ioptions=_parse(el[0]);}
if(ioptions.href){
style.icon=new L.KMLIcon({
iconUrl:ioptions.href,
shadowUrl:null,
anchorRef:{x:ioptions.x,y:ioptions.y},
anchorType:{x:ioptions.xunits,y:ioptions.yunits}
});
}
id=xml.getAttribute('id');
if(id&&style){
style.id=id;
}
return style;
},
parseStyleMap:function(xml,existingStyles){
var sl=xml.getElementsByTagName('StyleMap');
for(var i=0;i<sl.length;i++){
var e=sl[i],el;
var smKey,smStyleUrl;
el=e.getElementsByTagName('key');
if(el&&el[0]){smKey=el[0].textContent;}
el=e.getElementsByTagName('styleUrl');
if(el&&el[0]){smStyleUrl=el[0].textContent;}
if(smKey==='normal')
{
existingStyles['#'+e.getAttribute('id')]=existingStyles[smStyleUrl];
}
}
return;
},
parseFolder:function(xml,style){
var el,layers=[],l;
el=xml.getElementsByTagName('Folder');
for(var i=0;i<el.length;i++){
if(!this._check_folder(el[i],xml)){continue;}
l=this.parseFolder(el[i],style);
if(l){layers.push(l);}
}
el=xml.getElementsByTagName('Placemark');
for(var j=0;j<el.length;j++){
if(!this._check_folder(el[j],xml)){continue;}
l=this.parsePlacemark(el[j],xml,style);
if(l){layers.push(l);}
}
el=xml.getElementsByTagName('GroundOverlay');
for(var k=0;k<el.length;k++){
if(!this._check_folder(el[k],xml)){continue;}
l=this.parseGroundOverlay(el[k]);
if(l){layers.push(l);}
}
if(!layers.length){return;}
if(layers.length===1){return layers[0];}
return new L.FeatureGroup(layers);
},
parsePlacemark:function(place,xml,style,options){
var h,i,j,k,el,il,opts=options||{};
el=place.getElementsByTagName('styleUrl');
for(i=0;i<el.length;i++){
var url=el[i].childNodes[0].nodeValue;
for(var a in style[url]){
opts[a]=style[url][a];
}
}
il=place.getElementsByTagName('Style')[0];
if(il){
var inlineStyle=this.parseStyle(place);
if(inlineStyle){
for(k in inlineStyle){
opts[k]=inlineStyle[k];
}
}
}
var multi=['MultiGeometry','MultiTrack','gx:MultiTrack'];
for(h in multi){
el=place.getElementsByTagName(multi[h]);
for(i=0;i<el.length;i++){
return this.parsePlacemark(el[i],xml,style,opts);
}
}
var layers=[];
var parse=['LineString','Polygon','Point','Track','gx:Track'];
for(j in parse){
var tag=parse[j];
el=place.getElementsByTagName(tag);
for(i=0;i<el.length;i++){
var l=this['parse'+tag.replace(/gx:/,'')](el[i],xml,opts);
if(l){layers.push(l);}
}
}
if(!layers.length){
return;
}
var layer=layers[0];
if(layers.length>1){
layer=new L.FeatureGroup(layers);
}
var name,descr='';
el=place.getElementsByTagName('name');
if(el.length&&el[0].childNodes.length){
name=el[0].childNodes[0].nodeValue;
}
el=place.getElementsByTagName('description');
for(i=0;i<el.length;i++){
for(j=0;j<el[i].childNodes.length;j++){
descr=descr+el[i].childNodes[j].nodeValue;
}
}
if(name){
layer.on('add',function(){
layer.bindPopup('<h2>'+name+'</h2>'+descr);
});
}
return layer;
},
parseCoords:function(xml){
var el=xml.getElementsByTagName('coordinates');
return this._read_coords(el[0]);
},
parseLineString:function(line,xml,options){
var coords=this.parseCoords(line);
if(!coords.length){return;}
return new L.Polyline(coords,options);
},
parseTrack:function(line,xml,options){
var el=xml.getElementsByTagName('gx:coord');
if(el.length===0){el=xml.getElementsByTagName('coord');}
var coords=[];
for(var j=0;j<el.length;j++){
coords=coords.concat(this._read_gxcoords(el[j]));
}
if(!coords.length){return;}
return new L.Polyline(coords,options);
},
parsePoint:function(line,xml,options){
var el=line.getElementsByTagName('coordinates');
if(!el.length){
return;
}
var ll=el[0].childNodes[0].nodeValue.split(',');
return new L.KMLMarker(new L.LatLng(ll[1],ll[0]),options);
},
parsePolygon:function(line,xml,options){
var el,polys=[],inner=[],i,coords;
el=line.getElementsByTagName('outerBoundaryIs');
for(i=0;i<el.length;i++){
coords=this.parseCoords(el[i]);
if(coords){
polys.push(coords);
}
}
el=line.getElementsByTagName('innerBoundaryIs');
for(i=0;i<el.length;i++){
coords=this.parseCoords(el[i]);
if(coords){
inner.push(coords);
}
}
if(!polys.length){
return;
}
if(options.fillColor){
options.fill=true;
}
if(polys.length===1){
return new L.Polygon(polys.concat(inner),options);
}
return new L.MultiPolygon(polys,options);
},
getLatLngs:function(xml){
var el=xml.getElementsByTagName('coordinates');
var coords=[];
for(var j=0;j<el.length;j++){
coords=coords.concat(this._read_coords(el[j]));
}
return coords;
},
_read_coords:function(el){
var text='',coords=[],i;
for(i=0;i<el.childNodes.length;i++){
text=text+el.childNodes[i].nodeValue;
}
text=text.split(/[\s\n]+/);
for(i=0;i<text.length;i++){
var ll=text[i].split(',');
if(ll.length<2){
continue;
}
coords.push(new L.LatLng(ll[1],ll[0]));
}
return coords;
},
_read_gxcoords:function(el){
var text='',coords=[];
text=el.firstChild.nodeValue.split(' ');
coords.push(new L.LatLng(text[1],text[0]));
return coords;
},
parseGroundOverlay:function(xml){
var latlonbox=xml.getElementsByTagName('LatLonBox')[0];
var bounds=new L.LatLngBounds(
[
latlonbox.getElementsByTagName('south')[0].childNodes[0].nodeValue,
latlonbox.getElementsByTagName('west')[0].childNodes[0].nodeValue
],
[
latlonbox.getElementsByTagName('north')[0].childNodes[0].nodeValue,
latlonbox.getElementsByTagName('east')[0].childNodes[0].nodeValue
]
);
var attributes={Icon:true,href:true,color:true};
function _parse(xml){
var options={},ioptions={};
for(var i=0;i<xml.childNodes.length;i++){
var e=xml.childNodes[i];
var key=e.tagName;
if(!attributes[key]){continue;}
var value=e.childNodes[0].nodeValue;
if(key==='Icon'){
ioptions=_parse(e);
if(ioptions.href){options.href=ioptions.href;}
}else if(key==='href'){
options.href=value;
}else if(key==='color'){
options.opacity=parseInt(value.substring(0,2),16)/255.0;
options.color='#'+value.substring(6,8)+value.substring(4,6)+value.substring(2,4);
}
}
return options;
}
var options={};
options=_parse(xml);
if(latlonbox.getElementsByTagName('rotation')[0]!==undefined){
var rotation=latlonbox.getElementsByTagName('rotation')[0].childNodes[0].nodeValue;
options.rotation=parseFloat(rotation);
}
return new L.RotatedImageOverlay(options.href,bounds,{opacity:options.opacity,angle:options.rotation});
}
});
L.KMLIcon=L.Icon.extend({
_setIconStyles:function(img,name){
L.Icon.prototype._setIconStyles.apply(this,[img,name]);
var options=this.options;
this.options.popupAnchor=[0,(-0.83*img.height)];
if(options.anchorType.x==='fraction')
img.style.marginLeft=(-options.anchorRef.x*img.width)+'px';
if(options.anchorType.y==='fraction')
img.style.marginTop=((-(1-options.anchorRef.y)*img.height)+1)+'px';
if(options.anchorType.x==='pixels')
img.style.marginLeft=(-options.anchorRef.x)+'px';
if(options.anchorType.y==='pixels')
img.style.marginTop=(options.anchorRef.y-img.height+1)+'px';
}
});
L.KMLMarker=L.Marker.extend({
options:{
icon:new L.KMLIcon.Default()
}
});
L.RotatedImageOverlay=L.ImageOverlay.extend({
options:{
angle:0
},
_reset:function(){
L.ImageOverlay.prototype._reset.call(this);
this._rotate();
},
_animateZoom:function(e){
L.ImageOverlay.prototype._animateZoom.call(this,e);
this._rotate();
},
_rotate:function(){
if(L.DomUtil.TRANSFORM){
this._image.style[L.DomUtil.TRANSFORM]+=' rotate('+this.options.angle+'deg)';
}else if(L.Browser.ie){
var rad=this.options.angle*(Math.PI/180),
costheta=Math.cos(rad),
sintheta=Math.sin(rad);
this._image.style.filter+=' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11='+
costheta+', M12='+(-sintheta)+', M21='+sintheta+', M22='+costheta+')';
}
},
getBounds:function(){
return this._bounds;
}
});
L.GPX=L.FeatureGroup.extend({
initialize:function(gpx,options){
L.Util.setOptions(this,options);
this._gpx=gpx;
this._layers={};
if(gpx){
this.addGPX(gpx,options,this.options.async);
}
},
loadXML:function(url,cb,options,async){
if(async===undefined)async=this.options.async;
if(options===undefined)options=this.options;
var req=new window.XMLHttpRequest();
req.open('GET',url,async);
try{
req.overrideMimeType('text/xml');
}catch(e){}
req.onreadystatechange=function(){
if(req.readyState!==4)return;
if(req.status===200)cb(req.responseXML,options);
};
req.send(null);
},
_humanLen:function(l){
if(l<2000)
return l.toFixed(0)+' m';
else
return(l/1000).toFixed(1)+' km';
},
_polylineLen:function(line)
{
var ll=line._latlngs;
var d=0,p=null;
for(var i=0;i<ll.length;i++)
{
if(i&&p)
d+=p.distanceTo(ll[i]);
p=ll[i];
}
return d;
},
addGPX:function(url,options,async){
var _this=this;
var cb=function(gpx,options){_this._addGPX(gpx,options);};
this.loadXML(url,cb,options,async);
},
_addGPX:function(gpx,options){
var layers=this.parseGPX(gpx,options);
if(!layers)return;
this.addLayer(layers);
this.fire('loaded');
},
parseGPX:function(xml,options){
var j,i,el,layers=[];
var named=false,tags=[['rte','rtept'],['trkseg','trkpt']];
for(j=0;j<tags.length;j++){
el=xml.getElementsByTagName(tags[j][0]);
for(i=0;i<el.length;i++){
var l=this.parse_trkseg(el[i],xml,options,tags[j][1]);
for(var k=0;k<l.length;k++){
if(this.parse_name(el[i],l[k]))named=true;
layers.push(l[k]);
}
}
}
el=xml.getElementsByTagName('wpt');
if(options.display_wpt!==false){
for(i=0;i<el.length;i++){
var marker=this.parse_wpt(el[i],xml,options);
if(!marker)continue;
if(this.parse_name(el[i],marker))named=true;
layers.push(marker);
}
}
if(!layers.length)return;
var layer=layers[0];
if(layers.length>1)
layer=new L.FeatureGroup(layers);
if(!named)this.parse_name(xml,layer);
return layer;
},
parse_name:function(xml,layer){
var i,el,txt='',name,descr='',link,len=0;
el=xml.getElementsByTagName('name');
if(el.length)
name=el[0].childNodes[0].nodeValue;
el=xml.getElementsByTagName('desc');
for(i=0;i<el.length;i++){
for(var j=0;j<el[i].childNodes.length;j++)
descr=descr+el[i].childNodes[j].nodeValue;
}
el=xml.getElementsByTagName('link');
if(el.length)
link=el[0].getAttribute('href');
if(layer instanceof L.Path)
len=this._polylineLen(layer);
if(name)txt+='<h2>'+name+'</h2>'+descr;
if(len)txt+='<p>'+this._humanLen(len)+'</p>';
if(link)txt+='<p><a target="_blank" href="'+link+'">[...]</a></p>';
if(layer&&layer._popup===undefined)layer.bindPopup(txt);
return txt;
},
parse_trkseg:function(line,xml,options,tag){
var el=line.getElementsByTagName(tag);
if(!el.length)return[];
var coords=[];
for(var i=0;i<el.length;i++){
var ll=new L.LatLng(el[i].getAttribute('lat'),
el[i].getAttribute('lon'));
ll.meta={};
for(var j in el[i].childNodes){
var e=el[i].childNodes[j];
if(!e.tagName)continue;
ll.meta[e.tagName]=e.textContent;
}
coords.push(ll);
}
var l=[new L.Polyline(coords,options)];
this.fire('addline',{line:l});
return l;
},
parse_wpt:function(e,xml,options){
var m=new L.Marker(new L.LatLng(e.getAttribute('lat'),
e.getAttribute('lon')),options);
var attributes={};
for(var i=0;i<e.childNodes.length;i++){
var ch=e.childNodes[i];
if(ch.nodeName!=='#text'){
attributes[ch.nodeName]=ch.textContent;
}
}
this.fire('addpoint',{point:m,attributes:attributes});
return m;
}
});
-
(function(global,factory){
typeof exports==='object'&&typeof module!=='undefined'?factory(exports):
typeof define==='function'&&define.amd?define(['exports'],factory):
(factory((global.topojson=global.topojson||{})));
}(this,function(exports){'use strict';
function noop(){}
function transformAbsolute(transform){
if(!transform)return noop;
var x0,
y0,
kx=transform.scale[0],
ky=transform.scale[1],
dx=transform.translate[0],
dy=transform.translate[1];
return function(point,i){
if(!i)x0=y0=0;
point[0]=(x0+=point[0])*kx+dx;
point[1]=(y0+=point[1])*ky+dy;
};
}
function transformRelative(transform){
if(!transform)return noop;
var x0,
y0,
kx=transform.scale[0],
ky=transform.scale[1],
dx=transform.translate[0],
dy=transform.translate[1];
return function(point,i){
if(!i)x0=y0=0;
var x1=Math.round((point[0]-dx)/kx),
y1=Math.round((point[1]-dy)/ky);
point[0]=x1-x0;
point[1]=y1-y0;
x0=x1;
y0=y1;
};
}
function reverse(array,n){
var t,j=array.length,i=j-n;
while(i<--j)t=array[i],array[i++]=array[j],array[j]=t;
}
function bisect(a,x){
var lo=0,hi=a.length;
while(lo<hi){
var mid=lo+hi>>>1;
if(a[mid]<x)lo=mid+1;
else hi=mid;
}
return lo;
}
function feature(topology,o){
return o.type==="GeometryCollection"?{
type:"FeatureCollection",
features:o.geometries.map(function(o){return feature$1(topology,o);})
}:feature$1(topology,o);
}
function feature$1(topology,o){
var f={
type:"Feature",
id:o.id,
properties:o.properties||{},
geometry:object(topology,o)
};
if(o.id==null)delete f.id;
return f;
}
function object(topology,o){
var absolute=transformAbsolute(topology.transform),
arcs=topology.arcs;
function arc(i,points){
if(points.length)points.pop();
for(var a=arcs[i<0?~i:i],k=0,n=a.length,p;k<n;++k){
points.push(p=a[k].slice());
absolute(p,k);
}
if(i<0)reverse(points,n);
}
function point(p){
p=p.slice();
absolute(p,0);
return p;
}
function line(arcs){
var points=[];
for(var i=0,n=arcs.length;i<n;++i)arc(arcs[i],points);
if(points.length<2)points.push(points[0].slice());
return points;
}
function ring(arcs){
var points=line(arcs);
while(points.length<4)points.push(points[0].slice());
return points;
}
function polygon(arcs){
return arcs.map(ring);
}
function geometry(o){
var t=o.type;
return t==="GeometryCollection"?{type:t,geometries:o.geometries.map(geometry)}
:t in geometryType?{type:t,coordinates:geometryType[t](o)}
:null;
}
var geometryType={
Point:function(o){return point(o.coordinates);},
MultiPoint:function(o){return o.coordinates.map(point);},
LineString:function(o){return line(o.arcs);},
MultiLineString:function(o){return o.arcs.map(line);},
Polygon:function(o){return polygon(o.arcs);},
MultiPolygon:function(o){return o.arcs.map(polygon);}
};
return geometry(o);
}
function stitchArcs(topology,arcs){
var stitchedArcs={},
fragmentByStart={},
fragmentByEnd={},
fragments=[],
emptyIndex=-1;
arcs.forEach(function(i,j){
var arc=topology.arcs[i<0?~i:i],t;
if(arc.length<3&&!arc[1][0]&&!arc[1][1]){
t=arcs[++emptyIndex],arcs[emptyIndex]=i,arcs[j]=t;
}
});
arcs.forEach(function(i){
var e=ends(i),
start=e[0],
end=e[1],
f,g;
if(f=fragmentByEnd[start]){
delete fragmentByEnd[f.end];
f.push(i);
f.end=end;
if(g=fragmentByStart[end]){
delete fragmentByStart[g.start];
var fg=g===f?f:f.concat(g);
fragmentByStart[fg.start=f.start]=fragmentByEnd[fg.end=g.end]=fg;
}else{
fragmentByStart[f.start]=fragmentByEnd[f.end]=f;
}
}else if(f=fragmentByStart[end]){
delete fragmentByStart[f.start];
f.unshift(i);
f.start=start;
if(g=fragmentByEnd[start]){
delete fragmentByEnd[g.end];
var gf=g===f?f:g.concat(f);
fragmentByStart[gf.start=g.start]=fragmentByEnd[gf.end=f.end]=gf;
}else{
fragmentByStart[f.start]=fragmentByEnd[f.end]=f;
}
}else{
f=[i];
fragmentByStart[f.start=start]=fragmentByEnd[f.end=end]=f;
}
});
function ends(i){
var arc=topology.arcs[i<0?~i:i],p0=arc[0],p1;
if(topology.transform)p1=[0,0],arc.forEach(function(dp){p1[0]+=dp[0],p1[1]+=dp[1];});
else p1=arc[arc.length-1];
return i<0?[p1,p0]:[p0,p1];
}
function flush(fragmentByEnd,fragmentByStart){
for(var k in fragmentByEnd){
var f=fragmentByEnd[k];
delete fragmentByStart[f.start];
delete f.start;
delete f.end;
f.forEach(function(i){stitchedArcs[i<0?~i:i]=1;});
fragments.push(f);
}
}
flush(fragmentByEnd,fragmentByStart);
flush(fragmentByStart,fragmentByEnd);
arcs.forEach(function(i){if(!stitchedArcs[i<0?~i:i])fragments.push([i]);});
return fragments;
}
function mesh(topology){
return object(topology,meshArcs.apply(this,arguments));
}
function meshArcs(topology,o,filter){
var arcs=[];
function arc(i){
var j=i<0?~i:i;
(geomsByArc[j]||(geomsByArc[j]=[])).push({i:i,g:geom});
}
function line(arcs){
arcs.forEach(arc);
}
function polygon(arcs){
arcs.forEach(line);
}
function geometry(o){
if(o.type==="GeometryCollection")o.geometries.forEach(geometry);
else if(o.type in geometryType)geom=o,geometryType[o.type](o.arcs);
}
if(arguments.length>1){
var geomsByArc=[],
geom;
var geometryType={
LineString:line,
MultiLineString:polygon,
Polygon:polygon,
MultiPolygon:function(arcs){arcs.forEach(polygon);}
};
geometry(o);
geomsByArc.forEach(arguments.length<3
?function(geoms){arcs.push(geoms[0].i);}
:function(geoms){if(filter(geoms[0].g,geoms[geoms.length-1].g))arcs.push(geoms[0].i);});
}else{
for(var i=0,n=topology.arcs.length;i<n;++i)arcs.push(i);
}
return{type:"MultiLineString",arcs:stitchArcs(topology,arcs)};
}
function cartesianTriangleArea(triangle){
var a=triangle[0],b=triangle[1],c=triangle[2];
return Math.abs((a[0]-c[0])*(b[1]-a[1])-(a[0]-b[0])*(c[1]-a[1]));
}
function ring(ring){
var i=-1,
n=ring.length,
a,
b=ring[n-1],
area=0;
while(++i<n){
a=b;
b=ring[i];
area+=a[0]*b[1]-a[1]*b[0];
}
return area/2;
}
function merge(topology){
return object(topology,mergeArcs.apply(this,arguments));
}
function mergeArcs(topology,objects){
var polygonsByArc={},
polygons=[],
components=[];
objects.forEach(function(o){
if(o.type==="Polygon")register(o.arcs);
else if(o.type==="MultiPolygon")o.arcs.forEach(register);
});
function register(polygon){
polygon.forEach(function(ring$$){
ring$$.forEach(function(arc){
(polygonsByArc[arc=arc<0?~arc:arc]||(polygonsByArc[arc]=[])).push(polygon);
});
});
polygons.push(polygon);
}
function area(ring$$){
return Math.abs(ring(object(topology,{type:"Polygon",arcs:[ring$$]}).coordinates[0]));
}
polygons.forEach(function(polygon){
if(!polygon._){
var component=[],
neighbors=[polygon];
polygon._=1;
components.push(component);
while(polygon=neighbors.pop()){
component.push(polygon);
polygon.forEach(function(ring$$){
ring$$.forEach(function(arc){
polygonsByArc[arc<0?~arc:arc].forEach(function(polygon){
if(!polygon._){
polygon._=1;
neighbors.push(polygon);
}
});
});
});
}
}
});
polygons.forEach(function(polygon){
delete polygon._;
});
return{
type:"MultiPolygon",
arcs:components.map(function(polygons){
var arcs=[],n;
polygons.forEach(function(polygon){
polygon.forEach(function(ring$$){
ring$$.forEach(function(arc){
if(polygonsByArc[arc<0?~arc:arc].length<2){
arcs.push(arc);
}
});
});
});
arcs=stitchArcs(topology,arcs);
if((n=arcs.length)>1){
for(var i=1,k=area(arcs[0]),ki,t;i<n;++i){
if((ki=area(arcs[i]))>k){
t=arcs[0],arcs[0]=arcs[i],arcs[i]=t,k=ki;
}
}
}
return arcs;
})
};
}
function neighbors(objects){
var indexesByArc={},
neighbors=objects.map(function(){return[];});
function line(arcs,i){
arcs.forEach(function(a){
if(a<0)a=~a;
var o=indexesByArc[a];
if(o)o.push(i);
else indexesByArc[a]=[i];
});
}
function polygon(arcs,i){
arcs.forEach(function(arc){line(arc,i);});
}
function geometry(o,i){
if(o.type==="GeometryCollection")o.geometries.forEach(function(o){geometry(o,i);});
else if(o.type in geometryType)geometryType[o.type](o.arcs,i);
}
var geometryType={
LineString:line,
MultiLineString:polygon,
Polygon:polygon,
MultiPolygon:function(arcs,i){arcs.forEach(function(arc){polygon(arc,i);});}
};
objects.forEach(geometry);
for(var i in indexesByArc){
for(var indexes=indexesByArc[i],m=indexes.length,j=0;j<m;++j){
for(var k=j+1;k<m;++k){
var ij=indexes[j],ik=indexes[k],n;
if((n=neighbors[ij])[i=bisect(n,ik)]!==ik)n.splice(i,0,ik);
if((n=neighbors[ik])[i=bisect(n,ij)]!==ij)n.splice(i,0,ij);
}
}
}
return neighbors;
}
function compareArea(a,b){
return a[1][2]-b[1][2];
}
function minAreaHeap(){
var heap={},
array=[],
size=0;
heap.push=function(object){
up(array[object._=size]=object,size++);
return size;
};
heap.pop=function(){
if(size<=0)return;
var removed=array[0],object;
if(--size>0)object=array[size],down(array[object._=0]=object,0);
return removed;
};
heap.remove=function(removed){
var i=removed._,object;
if(array[i]!==removed)return;
if(i!==--size)object=array[size],(compareArea(object,removed)<0?up:down)(array[object._=i]=object,i);
return i;
};
function up(object,i){
while(i>0){
var j=((i+1)>>1)-1,
parent=array[j];
if(compareArea(object,parent)>=0)break;
array[parent._=i]=parent;
array[object._=i=j]=object;
}
}
function down(object,i){
while(true){
var r=(i+1)<<1,
l=r-1,
j=i,
child=array[j];
if(l<size&&compareArea(array[l],child)<0)child=array[j=l];
if(r<size&&compareArea(array[r],child)<0)child=array[j=r];
if(j===i)break;
array[child._=i]=child;
array[object._=i=j]=object;
}
}
return heap;
}
function presimplify(topology,triangleArea){
var absolute=transformAbsolute(topology.transform),
relative=transformRelative(topology.transform),
heap=minAreaHeap();
if(!triangleArea)triangleArea=cartesianTriangleArea;
topology.arcs.forEach(function(arc){
var triangles=[],
maxArea=0,
triangle,
i,
n,
p;
for(i=0,n=arc.length;i<n;++i){
p=arc[i];
absolute(arc[i]=[p[0],p[1],Infinity],i);
}
for(i=1,n=arc.length-1;i<n;++i){
triangle=arc.slice(i-1,i+2);
triangle[1][2]=triangleArea(triangle);
triangles.push(triangle);
heap.push(triangle);
}
for(i=0,n=triangles.length;i<n;++i){
triangle=triangles[i];
triangle.previous=triangles[i-1];
triangle.next=triangles[i+1];
}
while(triangle=heap.pop()){
var previous=triangle.previous,
next=triangle.next;
if(triangle[1][2]<maxArea)triangle[1][2]=maxArea;
else maxArea=triangle[1][2];
if(previous){
previous.next=next;
previous[2]=triangle[2];
update(previous);
}
if(next){
next.previous=previous;
next[0]=triangle[0];
update(next);
}
}
arc.forEach(relative);
});
function update(triangle){
heap.remove(triangle);
triangle[1][2]=triangleArea(triangle);
heap.push(triangle);
}
return topology;
}
var version="1.6.26";
exports.version=version;
exports.mesh=mesh;
exports.meshArcs=meshArcs;
exports.merge=merge;
exports.mergeArcs=mergeArcs;
exports.feature=feature;
exports.neighbors=neighbors;
exports.presimplify=presimplify;
}));
L.TOPOJSON=L.FeatureGroup.extend({
options:{
async:true
},
initialize:function(data,options){
L.Util.setOptions(this,options);
this._topojson=data;
this._layers={};
if(data){
this.addTOPOJSON(data,options,this.options.async);
}
},
loadJSON:function(url,cb,options,async){
if(async===undefined)async=this.options.async;
if(options===undefined)options=this.options;
var req=new window.XMLHttpRequest();
if(req.withCredentials===undefined&&typeof window.XDomainRequest!=='undefined'){
var xdr=new window.XDomainRequest();
xdr.open('GET',url,async);
xdr.onprogress=function(){};
xdr.ontimeout=function(){};
xdr.onerror=function(){};
xdr.onload=function(){
if(xdr.responseText){
cb(xdr.responseText,options);
}
};
setTimeout(function(){xdr.send();},0);
}else{
req.open('GET',url,async);
try{
req.overrideMimeType('application/json');
}catch(e){}
req.onreadystatechange=function(){
if(req.readyState!==4)return;
if(req.status===200)cb(req.response,options);
};
req.send(null);
}
},
addTOPOJSON:function(url,options,async){
var _this=this,
cb=function(data){_this._addTOPOJSON(data);};
this.loadJSON(url,cb,options,async);
},
_addTOPOJSON:function(data){
var layers=this.parseTOPOJSON(data);
if(!layers||!layers.length)return;
for(var i=0;i<layers.length;i++){
this.fire('addlayer',{
layer:layers[i]
});
this.addLayer(layers[i]);
}
this.fire('loaded');
},
_addData:function(l,d){
if('addData'in l)l.addData(d);
if('setGeoJSON'in l)l.setGeoJSON(d);
},
parseTOPOJSON:function(data){
var layers=[],
o=typeof data==='string'?JSON.parse(data):data;
for(var i in o.objects){
var layer=L.geoJson(),
ft=topojson.feature(o,o.objects[i]);
if(ft.features)this._addData(layer,ft.features);
else _this._addData(layer,ft);
layers.push(layer);
}
return layers;
}
});
(function(root,factory){
if(typeof define==='function'&&define.amd){
define(['leaflet'],factory);
}else if(typeof modules==='object'&&module.exports){
module.exports=factory(require('leaflet'));
}else{
factory(L);
}
}(this,function(L){
'use strict';
L.TileLayer.Provider=L.TileLayer.extend({
initialize:function(arg,options){
var providers=L.TileLayer.Provider.providers;
var parts=arg.split('.');
var providerName=parts[0];
var variantName=parts[1];
if(!providers[providerName]){
throw'No such provider ('+providerName+')';
}
var provider={
url:providers[providerName].url,
options:providers[providerName].options
};
if(variantName&&'variants'in providers[providerName]){
if(!(variantName in providers[providerName].variants)){
throw'No such variant of '+providerName+' ('+variantName+')';
}
var variant=providers[providerName].variants[variantName];
var variantOptions;
if(typeof variant==='string'){
variantOptions={
variant:variant
};
}else{
variantOptions=variant.options;
}
provider={
url:variant.url||provider.url,
options:L.Util.extend({},provider.options,variantOptions)
};
}
if(provider.options.retina){
if(options.detectRetina&&L.Browser.retina){
options.detectRetina=false;
}else{
provider.options.retina='';
}
}
var attributionReplacer=function(attr){
if(attr.indexOf('{attribution.')===-1){
return attr;
}
return attr.replace(/\{attribution.(\w*)\}/,
function(match,attributionName){
return attributionReplacer(providers[attributionName].options.attribution);
}
);
};
provider.options.attribution=attributionReplacer(provider.options.attribution);
var layerOpts=L.Util.extend({},provider.options,options);
L.TileLayer.prototype.initialize.call(this,provider.url,layerOpts);
}
});
L.TileLayer.Provider.providers={
OpenStreetMap:{
url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
options:{
maxZoom:19,
attribution:
'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
},
variants:{
Mapnik:{},
BlackAndWhite:{
url:'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
options:{
maxZoom:18
}
},
DE:{
url:'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
options:{
maxZoom:18
}
},
France:{
url:'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
options:{
maxZoom:20,
attribution:'&copy; Openstreetmap France | {attribution.OpenStreetMap}'
}
},
HOT:{
url:'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
options:{
attribution:'{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}
},
BZH:{
url:'http://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
options:{
attribution:'{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
bounds:[[46.2,-5.5],[50,0.7]]
}
}
}
},
OpenSeaMap:{
url:'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
options:{
attribution:'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
}
},
OpenTopoMap:{
url:'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
options:{
maxZoom:17,
attribution:'Map data: {attribution.OpenStreetMap}, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}
},
Thunderforest:{
url:'https://{s}.tile.thunderforest.com/{variant}/{z}/{x}/{y}.png?apikey={apikey}',
options:{
attribution:
'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, {attribution.OpenStreetMap}',
variant:'cycle',
apikey:'<insert your api key here>',
maxZoom:22
},
variants:{
OpenCycleMap:'cycle',
Transport:{
options:{
variant:'transport'
}
},
TransportDark:{
options:{
variant:'transport-dark'
}
},
SpinalMap:{
options:{
variant:'spinal-map'
}
},
Landscape:'landscape',
Outdoors:'outdoors',
Pioneer:'pioneer'
}
},
OpenMapSurfer:{
url:'https://korona.geog.uni-heidelberg.de/tiles/{variant}/x={x}&y={y}&z={z}',
options:{
maxZoom:20,
variant:'roads',
attribution:'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data {attribution.OpenStreetMap}'
},
variants:{
Roads:'roads',
AdminBounds:{
options:{
variant:'adminb',
maxZoom:19
}
},
Grayscale:{
options:{
variant:'roadsg',
maxZoom:19
}
}
}
},
Hydda:{
url:'https://{s}.tile.openstreetmap.se/hydda/{variant}/{z}/{x}/{y}.png',
options:{
maxZoom:18,
variant:'full',
attribution:'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data {attribution.OpenStreetMap}'
},
variants:{
Full:'full',
Base:'base',
RoadsAndLabels:'roads_and_labels'
}
},
MapBox:{
url:'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
options:{
attribution:
'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; '+
'Map data {attribution.OpenStreetMap}',
subdomains:'abcd',
id:'streets',
accessToken:'<insert your access token here>',
}
},
Stamen:{
url:'https://stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}',
options:{
attribution:
'Map tiles by <a href="http://stamen.com">Stamen Design</a>, '+
'<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; '+
'Map data {attribution.OpenStreetMap}',
subdomains:'abcd',
minZoom:0,
maxZoom:20,
variant:'toner',
ext:'png'
},
variants:{
Toner:'toner',
TonerBackground:'toner-background',
TonerHybrid:'toner-hybrid',
TonerLines:'toner-lines',
TonerLabels:'toner-labels',
TonerLite:'toner-lite',
Watercolor:{
options:{
variant:'watercolor',
minZoom:1,
maxZoom:16
}
},
Terrain:{
options:{
variant:'terrain',
minZoom:0,
maxZoom:18
}
},
TerrainBackground:{
options:{
variant:'terrain-background',
minZoom:0,
maxZoom:18
}
},
TopOSMRelief:{
options:{
variant:'toposm-color-relief',
ext:'jpg',
bounds:[[22,-132],[51,-56]]
}
},
TopOSMFeatures:{
options:{
variant:'toposm-features',
bounds:[[22,-132],[51,-56]],
opacity:0.9
}
}
}
},
Esri:{
url:'https://server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}',
options:{
variant:'World_Street_Map',
attribution:'Tiles &copy; Esri'
},
variants:{
WorldStreetMap:{
options:{
attribution:
'{attribution.Esri} &mdash; '+
'Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}
},
DeLorme:{
options:{
variant:'Specialty/DeLorme_World_Base_Map',
minZoom:1,
maxZoom:11,
attribution:'{attribution.Esri} &mdash; Copyright: &copy;2012 DeLorme'
}
},
WorldTopoMap:{
options:{
variant:'World_Topo_Map',
attribution:
'{attribution.Esri} &mdash; '+
'Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}
},
WorldImagery:{
options:{
variant:'World_Imagery',
attribution:
'{attribution.Esri} &mdash; '+
'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}
},
WorldTerrain:{
options:{
variant:'World_Terrain_Base',
maxZoom:13,
attribution:
'{attribution.Esri} &mdash; '+
'Source: USGS, Esri, TANA, DeLorme, and NPS'
}
},
WorldShadedRelief:{
options:{
variant:'World_Shaded_Relief',
maxZoom:13,
attribution:'{attribution.Esri} &mdash; Source: Esri'
}
},
WorldPhysical:{
options:{
variant:'World_Physical_Map',
maxZoom:8,
attribution:'{attribution.Esri} &mdash; Source: US National Park Service'
}
},
OceanBasemap:{
options:{
variant:'Ocean_Basemap',
maxZoom:13,
attribution:'{attribution.Esri} &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
}
},
NatGeoWorldMap:{
options:{
variant:'NatGeo_World_Map',
maxZoom:16,
attribution:'{attribution.Esri} &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
}
},
WorldGrayCanvas:{
options:{
variant:'Canvas/World_Light_Gray_Base',
maxZoom:16,
attribution:'{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ'
}
}
}
},
OpenWeatherMap:{
url:'http://{s}.tile.openweathermap.org/map/{variant}/{z}/{x}/{y}.png?appid={apiKey}',
options:{
maxZoom:19,
attribution:'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
apiKey:'<insert your api key here>',
opacity:0.5
},
variants:{
Clouds:'clouds',
CloudsClassic:'clouds_cls',
Precipitation:'precipitation',
PrecipitationClassic:'precipitation_cls',
Rain:'rain',
RainClassic:'rain_cls',
Pressure:'pressure',
PressureContour:'pressure_cntr',
Wind:'wind',
Temperature:'temp',
Snow:'snow'
}
},
HERE:{
url:
'https://{s}.{base}.maps.cit.api.here.com/maptile/2.1/'+
'{type}/{mapID}/{variant}/{z}/{x}/{y}/{size}/{format}?'+
'app_id={app_id}&app_code={app_code}&lg={language}',
options:{
attribution:
'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
subdomains:'1234',
mapID:'newest',
'app_id':'<insert your app_id here>',
'app_code':'<insert your app_code here>',
base:'base',
variant:'normal.day',
maxZoom:20,
type:'maptile',
language:'eng',
format:'png8',
size:'256'
},
variants:{
normalDay:'normal.day',
normalDayCustom:'normal.day.custom',
normalDayGrey:'normal.day.grey',
normalDayMobile:'normal.day.mobile',
normalDayGreyMobile:'normal.day.grey.mobile',
normalDayTransit:'normal.day.transit',
normalDayTransitMobile:'normal.day.transit.mobile',
normalNight:'normal.night',
normalNightMobile:'normal.night.mobile',
normalNightGrey:'normal.night.grey',
normalNightGreyMobile:'normal.night.grey.mobile',
basicMap:{
options:{
type:'basetile'
}
},
mapLabels:{
options:{
type:'labeltile',
format:'png'
}
},
trafficFlow:{
options:{
base:'traffic',
type:'flowtile'
}
},
carnavDayGrey:'carnav.day.grey',
hybridDay:{
options:{
base:'aerial',
variant:'hybrid.day'
}
},
hybridDayMobile:{
options:{
base:'aerial',
variant:'hybrid.day.mobile'
}
},
pedestrianDay:'pedestrian.day',
pedestrianNight:'pedestrian.night',
satelliteDay:{
options:{
base:'aerial',
variant:'satellite.day'
}
},
terrainDay:{
options:{
base:'aerial',
variant:'terrain.day'
}
},
terrainDayMobile:{
options:{
base:'aerial',
variant:'terrain.day.mobile'
}
}
}
},
FreeMapSK:{
url:'http://t{s}.freemap.sk/T/{z}/{x}/{y}.jpeg',
options:{
minZoom:8,
maxZoom:16,
subdomains:'1234',
bounds:[[47.204642,15.996093],[49.830896,22.576904]],
attribution:
'{attribution.OpenStreetMap}, vizualization CC-By-SA 2.0 <a href="http://freemap.sk">Freemap.sk</a>'
}
},
MtbMap:{
url:'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
options:{
attribution:
'{attribution.OpenStreetMap} &amp; USGS'
}
},
CartoDB:{
url:'https://cartodb-basemaps-{s}.global.ssl.fastly.net/{variant}/{z}/{x}/{y}.png',
options:{
attribution:'{attribution.OpenStreetMap} &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
subdomains:'abcd',
maxZoom:19,
variant:'light_all'
},
variants:{
Positron:'light_all',
PositronNoLabels:'light_nolabels',
PositronOnlyLabels:'light_only_labels',
DarkMatter:'dark_all',
DarkMatterNoLabels:'dark_nolabels',
DarkMatterOnlyLabels:'dark_only_labels'
}
},
HikeBike:{
url:'http://{s}.tiles.wmflabs.org/{variant}/{z}/{x}/{y}.png',
options:{
maxZoom:19,
attribution:'{attribution.OpenStreetMap}',
variant:'hikebike'
},
variants:{
HikeBike:{},
HillShading:{
options:{
maxZoom:15,
variant:'hillshading'
}
}
}
},
BasemapAT:{
url:'https://maps{s}.wien.gv.at/basemap/{variant}/normal/google3857/{z}/{y}/{x}.{format}',
options:{
maxZoom:19,
attribution:'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
subdomains:['','1','2','3','4'],
format:'png',
bounds:[[46.358770,8.782379],[49.037872,17.189532]],
variant:'geolandbasemap'
},
variants:{
basemap:{
options:{
maxZoom:20,
variant:'geolandbasemap'
}
},
grau:'bmapgrau',
overlay:'bmapoverlay',
highdpi:{
options:{
variant:'bmaphidpi',
format:'jpeg'
}
},
orthofoto:{
options:{
maxZoom:20,
variant:'bmaporthofoto30cm',
format:'jpeg'
}
}
}
},
nlmaps:{
url:'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{variant}/EPSG:3857/{z}/{x}/{y}.png',
options:{
minZoom:6,
maxZoom:19,
bounds:[[50.5,3.25],[54,7.6]],
attribution:'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>'
},
variants:{
'standaard':'brtachtergrondkaart',
'pastel':'brtachtergrondkaartpastel',
'grijs':'brtachtergrondkaartgrijs',
'luchtfoto':{
'url':'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857/{z}/{x}/{y}.png',
}
}
},
NASAGIBS:{
url:'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/{variant}/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
options:{
attribution:
'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System '+
'(<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
bounds:[[-85.0511287776,-179.999999975],[85.0511287776,179.999999975]],
minZoom:1,
maxZoom:9,
format:'jpg',
time:'',
tilematrixset:'GoogleMapsCompatible_Level'
},
variants:{
ModisTerraTrueColorCR:'MODIS_Terra_CorrectedReflectance_TrueColor',
ModisTerraBands367CR:'MODIS_Terra_CorrectedReflectance_Bands367',
ViirsEarthAtNight2012:{
options:{
variant:'VIIRS_CityLights_2012',
maxZoom:8
}
},
ModisTerraLSTDay:{
options:{
variant:'MODIS_Terra_Land_Surface_Temp_Day',
format:'png',
maxZoom:7,
opacity:0.75
}
},
ModisTerraSnowCover:{
options:{
variant:'MODIS_Terra_Snow_Cover',
format:'png',
maxZoom:8,
opacity:0.75
}
},
ModisTerraAOD:{
options:{
variant:'MODIS_Terra_Aerosol',
format:'png',
maxZoom:6,
opacity:0.75
}
},
ModisTerraChlorophyll:{
options:{
variant:'MODIS_Terra_Chlorophyll_A',
format:'png',
maxZoom:7,
opacity:0.75
}
}
}
},
NLS:{
url:'https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg',
options:{
attribution:'<a href="http://geo.nls.uk/maps/">National Library of Scotland Historic Maps</a>',
bounds:[[49.6,-12],[61.7,3]],
minZoom:1,
maxZoom:18,
subdomains:'0123',
}
},
JusticeMap:{
url:'http://www.justicemap.org/tile/{size}/{variant}/{z}/{x}/{y}.png',
options:{
attribution:'<a href="http://www.justicemap.org/terms.php">Justice Map</a>',
size:'county',
bounds:[[14,-180],[72,-56]]
},
variants:{
income:'income',
americanIndian:'indian',
asian:'asian',
black:'black',
hispanic:'hispanic',
multi:'multi',
nonWhite:'nonwhite',
white:'white',
plurality:'plural'
}
}
};
L.tileLayer.provider=function(provider,options){
return new L.TileLayer.Provider(provider,options);
};
return L;
}));
(function(){
L.Control.FullScreen=L.Control.extend({
options:{
position:'topleft',
title:'Full Screen',
titleCancel:'Exit Full Screen',
forceSeparateButton:false,
forcePseudoFullscreen:false,
fullscreenElement:false
},
onAdd:function(map){
var className='leaflet-control-zoom-fullscreen',container,content='';
if(map.zoomControl&&!this.options.forceSeparateButton){
container=map.zoomControl._container;
}else{
container=L.DomUtil.create('div','leaflet-bar');
}
if(this.options.content){
content=this.options.content;
}else{
className+=' fullscreen-icon';
}
this._createButton(this.options.title,className,content,container,this.toggleFullScreen,this);
this._map.on('enterFullscreen exitFullscreen',this._toggleTitle,this);
return container;
},
_createButton:function(title,className,content,container,fn,context){
this.link=L.DomUtil.create('a',className,container);
this.link.href='#';
this.link.title=title;
this.link.innerHTML=content;
L.DomEvent
.addListener(this.link,'click',L.DomEvent.stopPropagation)
.addListener(this.link,'click',L.DomEvent.preventDefault)
.addListener(this.link,'click',fn,context);
L.DomEvent
.addListener(container,fullScreenApi.fullScreenEventName,L.DomEvent.stopPropagation)
.addListener(container,fullScreenApi.fullScreenEventName,L.DomEvent.preventDefault)
.addListener(container,fullScreenApi.fullScreenEventName,this._handleEscKey,context);
L.DomEvent
.addListener(document,fullScreenApi.fullScreenEventName,L.DomEvent.stopPropagation)
.addListener(document,fullScreenApi.fullScreenEventName,L.DomEvent.preventDefault)
.addListener(document,fullScreenApi.fullScreenEventName,this._handleEscKey,context);
return this.link;
},
toggleFullScreen:function(){
var map=this._map;
map._exitFired=false;
if(map._isFullscreen){
if(fullScreenApi.supportsFullScreen&&!this.options.forcePseudoFullscreen){
fullScreenApi.cancelFullScreen(this.options.fullscreenElement?this.options.fullscreenElement:map._container);
}else{
L.DomUtil.removeClass(this.options.fullscreenElement?this.options.fullscreenElement:map._container,'leaflet-pseudo-fullscreen');
}
map.invalidateSize();
map.fire('exitFullscreen');
map._exitFired=true;
map._isFullscreen=false;
}
else{
if(fullScreenApi.supportsFullScreen&&!this.options.forcePseudoFullscreen){
fullScreenApi.requestFullScreen(this.options.fullscreenElement?this.options.fullscreenElement:map._container);
}else{
L.DomUtil.addClass(this.options.fullscreenElement?this.options.fullscreenElement:map._container,'leaflet-pseudo-fullscreen');
}
map.invalidateSize();
map.fire('enterFullscreen');
map._isFullscreen=true;
}
},
_toggleTitle:function(){
this.link.title=this._map._isFullscreen?this.options.title:this.options.titleCancel;
},
_handleEscKey:function(){
var map=this._map;
if(!fullScreenApi.isFullScreen(map)&&!map._exitFired){
map.fire('exitFullscreen');
map._exitFired=true;
map._isFullscreen=false;
}
}
});
L.Map.addInitHook(function(){
if(this.options.fullscreenControl){
this.fullscreenControl=L.control.fullscreen(this.options.fullscreenControlOptions);
this.addControl(this.fullscreenControl);
}
});
L.control.fullscreen=function(options){
return new L.Control.FullScreen(options);
};
var
fullScreenApi={
supportsFullScreen:false,
isFullScreen:function(){return false;},
requestFullScreen:function(){},
cancelFullScreen:function(){},
fullScreenEventName:'',
prefix:''
},
browserPrefixes='webkit moz o ms khtml'.split(' ');
if(typeof document.exitFullscreen!=='undefined'){
fullScreenApi.supportsFullScreen=true;
}else{
for(var i=0,il=browserPrefixes.length;i<il;i++){
fullScreenApi.prefix=browserPrefixes[i];
if(typeof document[fullScreenApi.prefix+'CancelFullScreen']!=='undefined'){
fullScreenApi.supportsFullScreen=true;
break;
}
}
if(typeof document['msExitFullscreen']!=='undefined'){
fullScreenApi.prefix='ms';
fullScreenApi.supportsFullScreen=true;
}
}
if(fullScreenApi.supportsFullScreen){
if(fullScreenApi.prefix==='ms'){
fullScreenApi.fullScreenEventName='MSFullscreenChange';
}else{
fullScreenApi.fullScreenEventName=fullScreenApi.prefix+'fullscreenchange';
}
fullScreenApi.isFullScreen=function(){
switch(this.prefix){
case'':
return document.fullscreen;
case'webkit':
return document.webkitIsFullScreen;
case'ms':
return document.msFullscreenElement;
default:
return document[this.prefix+'FullScreen'];
}
};
fullScreenApi.requestFullScreen=function(el){
switch(this.prefix){
case'':
return el.requestFullscreen();
case'ms':
return el.msRequestFullscreen();
default:
return el[this.prefix+'RequestFullScreen']();
}
};
fullScreenApi.cancelFullScreen=function(){
switch(this.prefix){
case'':
return document.exitFullscreen();
case'ms':
return document.msExitFullscreen();
default:
return document[this.prefix+'CancelFullScreen']();
}
};
}
if(typeof jQuery!=='undefined'){
jQuery.fn.requestFullScreen=function(){
return this.each(function(){
var el=jQuery(this);
if(fullScreenApi.supportsFullScreen){
fullScreenApi.requestFullScreen(el);
}
});
};
}
window.fullScreenApi=fullScreenApi;
})();
(function(factory,window){
if(typeof define==='function'&&define.amd){
define(['leaflet'],factory);
}else if(typeof exports==='object'){
module.exports=factory(require('leaflet'));
}
if(typeof window!=='undefined'&&window.L){
window.L.Control.MiniMap=factory(L);
window.L.control.minimap=function(layer,options){
return new window.L.Control.MiniMap(layer,options);
};
}
}(function(L){
var MiniMap=L.Control.extend({
options:{
position:'bottomright',
toggleDisplay:false,
zoomLevelOffset:-5,
zoomLevelFixed:false,
centerFixed:false,
zoomAnimation:false,
autoToggleDisplay:false,
minimized:false,
width:150,
height:150,
collapsedWidth:19,
collapsedHeight:19,
aimingRectOptions:{color:'#ff7800',weight:1,clickable:false},
shadowRectOptions:{color:'#000000',weight:1,clickable:false,opacity:0,fillOpacity:0},
strings:{hideText:'Hide MiniMap',showText:'Show MiniMap'},
mapOptions:{}
},
initialize:function(layer,options){
L.Util.setOptions(this,options);
this.options.aimingRectOptions.clickable=false;
this.options.shadowRectOptions.clickable=false;
this._layer=layer;
},
onAdd:function(map){
this._mainMap=map;
this._container=L.DomUtil.create('div','leaflet-control-minimap');
this._container.style.width=this.options.width+'px';
this._container.style.height=this.options.height+'px';
L.DomEvent.disableClickPropagation(this._container);
L.DomEvent.on(this._container,'mousewheel',L.DomEvent.stopPropagation);
var mapOptions={
attributionControl:false,
dragging:!this.options.centerFixed,
zoomControl:false,
zoomAnimation:this.options.zoomAnimation,
autoToggleDisplay:this.options.autoToggleDisplay,
touchZoom:this.options.centerFixed?'center':!this._isZoomLevelFixed(),
scrollWheelZoom:this.options.centerFixed?'center':!this._isZoomLevelFixed(),
doubleClickZoom:this.options.centerFixed?'center':!this._isZoomLevelFixed(),
boxZoom:!this._isZoomLevelFixed(),
crs:map.options.crs
};
mapOptions=L.Util.extend(this.options.mapOptions,mapOptions);
this._miniMap=new L.Map(this._container,mapOptions);
this._miniMap.addLayer(this._layer);
this._mainMapMoving=false;
this._miniMapMoving=false;
this._userToggledDisplay=false;
this._minimized=false;
if(this.options.toggleDisplay){
this._addToggleButton();
}
this._miniMap.whenReady(L.Util.bind(function(){
this._aimingRect=L.rectangle(this._mainMap.getBounds(),this.options.aimingRectOptions).addTo(this._miniMap);
this._shadowRect=L.rectangle(this._mainMap.getBounds(),this.options.shadowRectOptions).addTo(this._miniMap);
this._mainMap.on('moveend',this._onMainMapMoved,this);
this._mainMap.on('move',this._onMainMapMoving,this);
this._miniMap.on('movestart',this._onMiniMapMoveStarted,this);
this._miniMap.on('move',this._onMiniMapMoving,this);
this._miniMap.on('moveend',this._onMiniMapMoved,this);
},this));
return this._container;
},
addTo:function(map){
L.Control.prototype.addTo.call(this,map);
var center=this.options.centerFixed||this._mainMap.getCenter();
this._miniMap.setView(center,this._decideZoom(true));
this._setDisplay(this.options.minimized);
return this;
},
onRemove:function(map){
this._mainMap.off('moveend',this._onMainMapMoved,this);
this._mainMap.off('move',this._onMainMapMoving,this);
this._miniMap.off('moveend',this._onMiniMapMoved,this);
this._miniMap.removeLayer(this._layer);
},
changeLayer:function(layer){
this._miniMap.removeLayer(this._layer);
this._layer=layer;
this._miniMap.addLayer(this._layer);
},
_addToggleButton:function(){
this._toggleDisplayButton=this.options.toggleDisplay?this._createButton(
'',this._toggleButtonInitialTitleText(),('leaflet-control-minimap-toggle-display leaflet-control-minimap-toggle-display-'+
this.options.position),this._container,this._toggleDisplayButtonClicked,this):undefined;
this._toggleDisplayButton.style.width=this.options.collapsedWidth+'px';
this._toggleDisplayButton.style.height=this.options.collapsedHeight+'px';
},
_toggleButtonInitialTitleText:function(){
if(this.options.minimized){
return this.options.strings.showText;
}else{
return this.options.strings.hideText;
}
},
_createButton:function(html,title,className,container,fn,context){
var link=L.DomUtil.create('a',className,container);
link.innerHTML=html;
link.href='#';
link.title=title;
var stop=L.DomEvent.stopPropagation;
L.DomEvent
.on(link,'click',stop)
.on(link,'mousedown',stop)
.on(link,'dblclick',stop)
.on(link,'click',L.DomEvent.preventDefault)
.on(link,'click',fn,context);
return link;
},
_toggleDisplayButtonClicked:function(){
this._userToggledDisplay=true;
if(!this._minimized){
this._minimize();
}else{
this._restore();
}
},
_setDisplay:function(minimize){
if(minimize!==this._minimized){
if(!this._minimized){
this._minimize();
}else{
this._restore();
}
}
},
_minimize:function(){
if(this.options.toggleDisplay){
this._container.style.width=this.options.collapsedWidth+'px';
this._container.style.height=this.options.collapsedHeight+'px';
this._toggleDisplayButton.className+=(' minimized-'+this.options.position);
this._toggleDisplayButton.title=this.options.strings.showText;
}else{
this._container.style.display='none';
}
this._minimized=true;
},
_restore:function(){
if(this.options.toggleDisplay){
this._container.style.width=this.options.width+'px';
this._container.style.height=this.options.height+'px';
this._toggleDisplayButton.className=this._toggleDisplayButton.className
.replace('minimized-'+this.options.position,'');
this._toggleDisplayButton.title=this.options.strings.hideText;
}else{
this._container.style.display='block';
}
this._minimized=false;
},
_onMainMapMoved:function(e){
if(!this._miniMapMoving){
var center=this.options.centerFixed||this._mainMap.getCenter();
this._mainMapMoving=true;
this._miniMap.setView(center,this._decideZoom(true));
this._setDisplay(this._decideMinimized());
}else{
this._miniMapMoving=false;
}
this._aimingRect.setBounds(this._mainMap.getBounds());
},
_onMainMapMoving:function(e){
this._aimingRect.setBounds(this._mainMap.getBounds());
},
_onMiniMapMoveStarted:function(e){
if(!this.options.centerFixed){
var lastAimingRect=this._aimingRect.getBounds();
var sw=this._miniMap.latLngToContainerPoint(lastAimingRect.getSouthWest());
var ne=this._miniMap.latLngToContainerPoint(lastAimingRect.getNorthEast());
this._lastAimingRectPosition={sw:sw,ne:ne};
}
},
_onMiniMapMoving:function(e){
if(!this.options.centerFixed){
if(!this._mainMapMoving&&this._lastAimingRectPosition){
this._shadowRect.setBounds(new L.LatLngBounds(this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.sw),this._miniMap.containerPointToLatLng(this._lastAimingRectPosition.ne)));
this._shadowRect.setStyle({opacity:1,fillOpacity:0.3});
}
}
},
_onMiniMapMoved:function(e){
if(!this._mainMapMoving){
this._miniMapMoving=true;
this._mainMap.setView(this._miniMap.getCenter(),this._decideZoom(false));
this._shadowRect.setStyle({opacity:0,fillOpacity:0});
}else{
this._mainMapMoving=false;
}
},
_isZoomLevelFixed:function(){
var zoomLevelFixed=this.options.zoomLevelFixed;
return this._isDefined(zoomLevelFixed)&&this._isInteger(zoomLevelFixed);
},
_decideZoom:function(fromMaintoMini){
if(!this._isZoomLevelFixed()){
if(fromMaintoMini){
return this._mainMap.getZoom()+this.options.zoomLevelOffset;
}else{
var currentDiff=this._miniMap.getZoom()-this._mainMap.getZoom();
var proposedZoom=this._miniMap.getZoom()-this.options.zoomLevelOffset;
var toRet;
if(currentDiff>this.options.zoomLevelOffset&&this._mainMap.getZoom()<this._miniMap.getMinZoom()-this.options.zoomLevelOffset){
if(this._miniMap.getZoom()>this._lastMiniMapZoom){
toRet=this._mainMap.getZoom()+1;
this._miniMap.setZoom(this._miniMap.getZoom()-1);
}else{
toRet=this._mainMap.getZoom();
}
}else{
toRet=proposedZoom;
}
this._lastMiniMapZoom=this._miniMap.getZoom();
return toRet;
}
}else{
if(fromMaintoMini){
return this.options.zoomLevelFixed;
}else{
return this._mainMap.getZoom();
}
}
},
_decideMinimized:function(){
if(this._userToggledDisplay){
return this._minimized;
}
if(this.options.autoToggleDisplay){
if(this._mainMap.getBounds().contains(this._miniMap.getBounds())){
return true;
}
return false;
}
return this._minimized;
},
_isInteger:function(value){
return typeof value==='number';
},
_isDefined:function(value){
return typeof value!=='undefined';
}
});
L.Map.mergeOptions({
miniMapControl:false
});
L.Map.addInitHook(function(){
if(this.options.miniMapControl){
this.miniMapControl=(new MiniMap()).addTo(this);
}
});
return MiniMap;
},window));
(function(window,document,undefined){
L.MarkerClusterGroup=L.FeatureGroup.extend({
options:{
maxClusterRadius:80,
iconCreateFunction:null,
spiderfyOnMaxZoom:true,
showCoverageOnHover:true,
zoomToBoundsOnClick:true,
singleMarkerMode:false,
disableClusteringAtZoom:null,
removeOutsideVisibleBounds:true,
animate:true,
animateAddingMarkers:false,
spiderfyDistanceMultiplier:1,
spiderLegPolylineOptions:{weight:1.5,color:'#222',opacity:0.5},
chunkedLoading:false,
chunkInterval:200,
chunkDelay:50,
chunkProgress:null,
polygonOptions:{}
},
initialize:function(options){
L.Util.setOptions(this,options);
if(!this.options.iconCreateFunction){
this.options.iconCreateFunction=this._defaultIconCreateFunction;
}
this._featureGroup=L.featureGroup();
this._featureGroup.addEventParent(this);
this._nonPointGroup=L.featureGroup();
this._nonPointGroup.addEventParent(this);
this._inZoomAnimation=0;
this._needsClustering=[];
this._needsRemoving=[];
this._currentShownBounds=null;
this._queue=[];
var animate=L.DomUtil.TRANSITION&&this.options.animate;
L.extend(this,animate?this._withAnimation:this._noAnimation);
this._markerCluster=animate?L.MarkerCluster:L.MarkerClusterNonAnimated;
},
addLayer:function(layer){
if(layer instanceof L.LayerGroup){
return this.addLayers([layer]);
}
if(!layer.getLatLng){
this._nonPointGroup.addLayer(layer);
return this;
}
if(!this._map){
this._needsClustering.push(layer);
return this;
}
if(this.hasLayer(layer)){
return this;
}
if(this._unspiderfy){
this._unspiderfy();
}
this._addLayer(layer,this._maxZoom);
this._topClusterLevel._recalculateBounds();
this._refreshClustersIcons();
var visibleLayer=layer,
currentZoom=this._zoom;
if(layer.__parent){
while(visibleLayer.__parent._zoom>=currentZoom){
visibleLayer=visibleLayer.__parent;
}
}
if(this._currentShownBounds.contains(visibleLayer.getLatLng())){
if(this.options.animateAddingMarkers){
this._animationAddLayer(layer,visibleLayer);
}else{
this._animationAddLayerNonAnimated(layer,visibleLayer);
}
}
return this;
},
removeLayer:function(layer){
if(layer instanceof L.LayerGroup){
return this.removeLayers([layer]);
}
if(!layer.getLatLng){
this._nonPointGroup.removeLayer(layer);
return this;
}
if(!this._map){
if(!this._arraySplice(this._needsClustering,layer)&&this.hasLayer(layer)){
this._needsRemoving.push(layer);
}
return this;
}
if(!layer.__parent){
return this;
}
if(this._unspiderfy){
this._unspiderfy();
this._unspiderfyLayer(layer);
}
this._removeLayer(layer,true);
this._topClusterLevel._recalculateBounds();
this._refreshClustersIcons();
layer.off('move',this._childMarkerMoved,this);
if(this._featureGroup.hasLayer(layer)){
this._featureGroup.removeLayer(layer);
if(layer.clusterShow){
layer.clusterShow();
}
}
return this;
},
addLayers:function(layersArray){
if(!L.Util.isArray(layersArray)){
return this.addLayer(layersArray);
}
var fg=this._featureGroup,
npg=this._nonPointGroup,
chunked=this.options.chunkedLoading,
chunkInterval=this.options.chunkInterval,
chunkProgress=this.options.chunkProgress,
l=layersArray.length,
offset=0,
originalArray=true,
m;
if(this._map){
var started=(new Date()).getTime();
var process=L.bind(function(){
var start=(new Date()).getTime();
for(;offset<l;offset++){
if(chunked&&offset%200===0){
var elapsed=(new Date()).getTime()-start;
if(elapsed>chunkInterval){
break;
}
}
m=layersArray[offset];
if(m instanceof L.LayerGroup){
if(originalArray){
layersArray=layersArray.slice();
originalArray=false;
}
this._extractNonGroupLayers(m,layersArray);
l=layersArray.length;
continue;
}
if(!m.getLatLng){
npg.addLayer(m);
continue;
}
if(this.hasLayer(m)){
continue;
}
this._addLayer(m,this._maxZoom);
if(m.__parent){
if(m.__parent.getChildCount()===2){
var markers=m.__parent.getAllChildMarkers(),
otherMarker=markers[0]===m?markers[1]:markers[0];
fg.removeLayer(otherMarker);
}
}
}
if(chunkProgress){
chunkProgress(offset,l,(new Date()).getTime()-started);
}
if(offset===l){
this._topClusterLevel._recalculateBounds();
this._refreshClustersIcons();
this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds);
}else{
setTimeout(process,this.options.chunkDelay);
}
},this);
process();
}else{
var needsClustering=this._needsClustering;
for(;offset<l;offset++){
m=layersArray[offset];
if(m instanceof L.LayerGroup){
if(originalArray){
layersArray=layersArray.slice();
originalArray=false;
}
this._extractNonGroupLayers(m,layersArray);
l=layersArray.length;
continue;
}
if(!m.getLatLng){
npg.addLayer(m);
continue;
}
if(this.hasLayer(m)){
continue;
}
needsClustering.push(m);
}
}
return this;
},
removeLayers:function(layersArray){
var i,m,
l=layersArray.length,
fg=this._featureGroup,
npg=this._nonPointGroup,
originalArray=true;
if(!this._map){
for(i=0;i<l;i++){
m=layersArray[i];
if(m instanceof L.LayerGroup){
if(originalArray){
layersArray=layersArray.slice();
originalArray=false;
}
this._extractNonGroupLayers(m,layersArray);
l=layersArray.length;
continue;
}
this._arraySplice(this._needsClustering,m);
npg.removeLayer(m);
if(this.hasLayer(m)){
this._needsRemoving.push(m);
}
}
return this;
}
if(this._unspiderfy){
this._unspiderfy();
var layersArray2=layersArray.slice(),
l2=l;
for(i=0;i<l2;i++){
m=layersArray2[i];
if(m instanceof L.LayerGroup){
this._extractNonGroupLayers(m,layersArray2);
l2=layersArray2.length;
continue;
}
this._unspiderfyLayer(m);
}
}
for(i=0;i<l;i++){
m=layersArray[i];
if(m instanceof L.LayerGroup){
if(originalArray){
layersArray=layersArray.slice();
originalArray=false;
}
this._extractNonGroupLayers(m,layersArray);
l=layersArray.length;
continue;
}
if(!m.__parent){
npg.removeLayer(m);
continue;
}
this._removeLayer(m,true,true);
if(fg.hasLayer(m)){
fg.removeLayer(m);
if(m.clusterShow){
m.clusterShow();
}
}
}
this._topClusterLevel._recalculateBounds();
this._refreshClustersIcons();
this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds);
return this;
},
clearLayers:function(){
if(!this._map){
this._needsClustering=[];
delete this._gridClusters;
delete this._gridUnclustered;
}
if(this._noanimationUnspiderfy){
this._noanimationUnspiderfy();
}
this._featureGroup.clearLayers();
this._nonPointGroup.clearLayers();
this.eachLayer(function(marker){
marker.off('move',this._childMarkerMoved,this);
delete marker.__parent;
});
if(this._map){
this._generateInitialClusters();
}
return this;
},
getBounds:function(){
var bounds=new L.LatLngBounds();
if(this._topClusterLevel){
bounds.extend(this._topClusterLevel._bounds);
}
for(var i=this._needsClustering.length-1;i>=0;i--){
bounds.extend(this._needsClustering[i].getLatLng());
}
bounds.extend(this._nonPointGroup.getBounds());
return bounds;
},
eachLayer:function(method,context){
var markers=this._needsClustering.slice(),
needsRemoving=this._needsRemoving,
i;
if(this._topClusterLevel){
this._topClusterLevel.getAllChildMarkers(markers);
}
for(i=markers.length-1;i>=0;i--){
if(needsRemoving.indexOf(markers[i])===-1){
method.call(context,markers[i]);
}
}
this._nonPointGroup.eachLayer(method,context);
},
getLayers:function(){
var layers=[];
this.eachLayer(function(l){
layers.push(l);
});
return layers;
},
getLayer:function(id){
var result=null;
id=parseInt(id,10);
this.eachLayer(function(l){
if(L.stamp(l)===id){
result=l;
}
});
return result;
},
hasLayer:function(layer){
if(!layer){
return false;
}
var i,anArray=this._needsClustering;
for(i=anArray.length-1;i>=0;i--){
if(anArray[i]===layer){
return true;
}
}
anArray=this._needsRemoving;
for(i=anArray.length-1;i>=0;i--){
if(anArray[i]===layer){
return false;
}
}
return!!(layer.__parent&&layer.__parent._group===this)||this._nonPointGroup.hasLayer(layer);
},
zoomToShowLayer:function(layer,callback){
if(typeof callback!=='function'){
callback=function(){};
}
var showMarker=function(){
if((layer._icon||layer.__parent._icon)&&!this._inZoomAnimation){
this._map.off('moveend',showMarker,this);
this.off('animationend',showMarker,this);
if(layer._icon){
callback();
}else if(layer.__parent._icon){
this.once('spiderfied',callback,this);
layer.__parent.spiderfy();
}
}
};
if(layer._icon&&this._map.getBounds().contains(layer.getLatLng())){
callback();
}else if(layer.__parent._zoom<Math.round(this._map._zoom)){
this._map.on('moveend',showMarker,this);
this._map.panTo(layer.getLatLng());
}else{
var moveStart=function(){
this._map.off('movestart',moveStart,this);
moveStart=null;
};
this._map.on('movestart',moveStart,this);
this._map.on('moveend',showMarker,this);
this.on('animationend',showMarker,this);
layer.__parent.zoomToBounds();
if(moveStart){
showMarker.call(this);
}
}
},
onAdd:function(map){
this._map=map;
var i,l,layer;
if(!isFinite(this._map.getMaxZoom())){
throw"Map has no maxZoom specified";
}
this._featureGroup.addTo(map);
this._nonPointGroup.addTo(map);
if(!this._gridClusters){
this._generateInitialClusters();
}
this._maxLat=map.options.crs.projection.MAX_LATITUDE;
for(i=0,l=this._needsRemoving.length;i<l;i++){
layer=this._needsRemoving[i];
this._removeLayer(layer,true);
}
this._needsRemoving=[];
this._zoom=Math.round(this._map._zoom);
this._currentShownBounds=this._getExpandedVisibleBounds();
this._map.on('zoomend',this._zoomEnd,this);
this._map.on('moveend',this._moveEnd,this);
if(this._spiderfierOnAdd){
this._spiderfierOnAdd();
}
this._bindEvents();
l=this._needsClustering;
this._needsClustering=[];
this.addLayers(l);
},
onRemove:function(map){
map.off('zoomend',this._zoomEnd,this);
map.off('moveend',this._moveEnd,this);
this._unbindEvents();
this._map._mapPane.className=this._map._mapPane.className.replace(' leaflet-cluster-anim','');
if(this._spiderfierOnRemove){
this._spiderfierOnRemove();
}
delete this._maxLat;
this._hideCoverage();
this._featureGroup.remove();
this._nonPointGroup.remove();
this._featureGroup.clearLayers();
this._map=null;
},
getVisibleParent:function(marker){
var vMarker=marker;
while(vMarker&&!vMarker._icon){
vMarker=vMarker.__parent;
}
return vMarker||null;
},
_arraySplice:function(anArray,obj){
for(var i=anArray.length-1;i>=0;i--){
if(anArray[i]===obj){
anArray.splice(i,1);
return true;
}
}
},
_removeFromGridUnclustered:function(marker,z){
var map=this._map,
gridUnclustered=this._gridUnclustered;
for(;z>=0;z--){
if(!gridUnclustered[z].removeObject(marker,map.project(marker.getLatLng(),z))){
break;
}
}
},
_childMarkerMoved:function(e){
if(!this._ignoreMove){
e.target._latlng=e.oldLatLng;
this.removeLayer(e.target);
e.target._latlng=e.latlng;
this.addLayer(e.target);
}
},
_removeLayer:function(marker,removeFromDistanceGrid,dontUpdateMap){
var gridClusters=this._gridClusters,
gridUnclustered=this._gridUnclustered,
fg=this._featureGroup,
map=this._map;
if(removeFromDistanceGrid){
this._removeFromGridUnclustered(marker,this._maxZoom);
}
var cluster=marker.__parent,
markers=cluster._markers,
otherMarker;
this._arraySplice(markers,marker);
while(cluster){
cluster._childCount--;
cluster._boundsNeedUpdate=true;
if(cluster._zoom<0){
break;
}else if(removeFromDistanceGrid&&cluster._childCount<=1){
otherMarker=cluster._markers[0]===marker?cluster._markers[1]:cluster._markers[0];
gridClusters[cluster._zoom].removeObject(cluster,map.project(cluster._cLatLng,cluster._zoom));
gridUnclustered[cluster._zoom].addObject(otherMarker,map.project(otherMarker.getLatLng(),cluster._zoom));
this._arraySplice(cluster.__parent._childClusters,cluster);
cluster.__parent._markers.push(otherMarker);
otherMarker.__parent=cluster.__parent;
if(cluster._icon){
fg.removeLayer(cluster);
if(!dontUpdateMap){
fg.addLayer(otherMarker);
}
}
}else{
cluster._iconNeedsUpdate=true;
}
cluster=cluster.__parent;
}
delete marker.__parent;
},
_isOrIsParent:function(el,oel){
while(oel){
if(el===oel){
return true;
}
oel=oel.parentNode;
}
return false;
},
fire:function(type,data,propagate){
if(data&&data.layer instanceof L.MarkerCluster){
if(data.originalEvent&&this._isOrIsParent(data.layer._icon,data.originalEvent.relatedTarget)){
return;
}
type='cluster'+type;
}
L.FeatureGroup.prototype.fire.call(this,type,data,propagate);
},
listens:function(type,propagate){
return L.FeatureGroup.prototype.listens.call(this,type,propagate)||L.FeatureGroup.prototype.listens.call(this,'cluster'+type,propagate);
},
_defaultIconCreateFunction:function(cluster){
var childCount=cluster.getChildCount();
var c=' marker-cluster-';
if(childCount<10){
c+='small';
}else if(childCount<100){
c+='medium';
}else{
c+='large';
}
return new L.DivIcon({html:'<div><span>'+childCount+'</span></div>',className:'marker-cluster'+c,iconSize:new L.Point(40,40)});
},
_bindEvents:function(){
var map=this._map,
spiderfyOnMaxZoom=this.options.spiderfyOnMaxZoom,
showCoverageOnHover=this.options.showCoverageOnHover,
zoomToBoundsOnClick=this.options.zoomToBoundsOnClick;
if(spiderfyOnMaxZoom||zoomToBoundsOnClick){
this.on('clusterclick',this._zoomOrSpiderfy,this);
}
if(showCoverageOnHover){
this.on('clustermouseover',this._showCoverage,this);
this.on('clustermouseout',this._hideCoverage,this);
map.on('zoomend',this._hideCoverage,this);
}
},
_zoomOrSpiderfy:function(e){
var cluster=e.layer,
bottomCluster=cluster;
while(bottomCluster._childClusters.length===1){
bottomCluster=bottomCluster._childClusters[0];
}
if(bottomCluster._zoom===this._maxZoom&&
bottomCluster._childCount===cluster._childCount&&
this.options.spiderfyOnMaxZoom){
cluster.spiderfy();
}else if(this.options.zoomToBoundsOnClick){
cluster.zoomToBounds();
}
if(e.originalEvent&&e.originalEvent.keyCode===13){
this._map._container.focus();
}
},
_showCoverage:function(e){
var map=this._map;
if(this._inZoomAnimation){
return;
}
if(this._shownPolygon){
map.removeLayer(this._shownPolygon);
}
if(e.layer.getChildCount()>2&&e.layer!==this._spiderfied){
this._shownPolygon=new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions);
map.addLayer(this._shownPolygon);
}
},
_hideCoverage:function(){
if(this._shownPolygon){
this._map.removeLayer(this._shownPolygon);
this._shownPolygon=null;
}
},
_unbindEvents:function(){
var spiderfyOnMaxZoom=this.options.spiderfyOnMaxZoom,
showCoverageOnHover=this.options.showCoverageOnHover,
zoomToBoundsOnClick=this.options.zoomToBoundsOnClick,
map=this._map;
if(spiderfyOnMaxZoom||zoomToBoundsOnClick){
this.off('clusterclick',this._zoomOrSpiderfy,this);
}
if(showCoverageOnHover){
this.off('clustermouseover',this._showCoverage,this);
this.off('clustermouseout',this._hideCoverage,this);
map.off('zoomend',this._hideCoverage,this);
}
},
_zoomEnd:function(){
if(!this._map){
return;
}
this._mergeSplitClusters();
this._zoom=Math.round(this._map._zoom);
this._currentShownBounds=this._getExpandedVisibleBounds();
},
_moveEnd:function(){
if(this._inZoomAnimation){
return;
}
var newBounds=this._getExpandedVisibleBounds();
this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._zoom,newBounds);
this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),newBounds);
this._currentShownBounds=newBounds;
return;
},
_generateInitialClusters:function(){
var maxZoom=this._map.getMaxZoom(),
radius=this.options.maxClusterRadius,
radiusFn=radius;
if(typeof radius!=="function"){
radiusFn=function(){return radius;};
}
if(this.options.disableClusteringAtZoom){
maxZoom=this.options.disableClusteringAtZoom-1;
}
this._maxZoom=maxZoom;
this._gridClusters={};
this._gridUnclustered={};
for(var zoom=maxZoom;zoom>=0;zoom--){
this._gridClusters[zoom]=new L.DistanceGrid(radiusFn(zoom));
this._gridUnclustered[zoom]=new L.DistanceGrid(radiusFn(zoom));
}
this._topClusterLevel=new this._markerCluster(this,-1);
},
_addLayer:function(layer,zoom){
var gridClusters=this._gridClusters,
gridUnclustered=this._gridUnclustered,
markerPoint,z;
if(this.options.singleMarkerMode){
this._overrideMarkerIcon(layer);
}
layer.on('move',this._childMarkerMoved,this);
for(;zoom>=0;zoom--){
markerPoint=this._map.project(layer.getLatLng(),zoom);
var closest=gridClusters[zoom].getNearObject(markerPoint);
if(closest){
closest._addChild(layer);
layer.__parent=closest;
return;
}
closest=gridUnclustered[zoom].getNearObject(markerPoint);
if(closest){
var parent=closest.__parent;
if(parent){
this._removeLayer(closest,false);
}
var newCluster=new this._markerCluster(this,zoom,closest,layer);
gridClusters[zoom].addObject(newCluster,this._map.project(newCluster._cLatLng,zoom));
closest.__parent=newCluster;
layer.__parent=newCluster;
var lastParent=newCluster;
for(z=zoom-1;z>parent._zoom;z--){
lastParent=new this._markerCluster(this,z,lastParent);
gridClusters[z].addObject(lastParent,this._map.project(closest.getLatLng(),z));
}
parent._addChild(lastParent);
this._removeFromGridUnclustered(closest,zoom);
return;
}
gridUnclustered[zoom].addObject(layer,markerPoint);
}
this._topClusterLevel._addChild(layer);
layer.__parent=this._topClusterLevel;
return;
},
_refreshClustersIcons:function(){
this._featureGroup.eachLayer(function(c){
if(c instanceof L.MarkerCluster&&c._iconNeedsUpdate){
c._updateIcon();
}
});
},
_enqueue:function(fn){
this._queue.push(fn);
if(!this._queueTimeout){
this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300);
}
},
_processQueue:function(){
for(var i=0;i<this._queue.length;i++){
this._queue[i].call(this);
}
this._queue.length=0;
clearTimeout(this._queueTimeout);
this._queueTimeout=null;
},
_mergeSplitClusters:function(){
var mapZoom=Math.round(this._map._zoom);
this._processQueue();
if(this._zoom<mapZoom&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())){
this._animationStart();
this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._zoom,this._getExpandedVisibleBounds());
this._animationZoomIn(this._zoom,mapZoom);
}else if(this._zoom>mapZoom){
this._animationStart();
this._animationZoomOut(this._zoom,mapZoom);
}else{
this._moveEnd();
}
},
_getExpandedVisibleBounds:function(){
if(!this.options.removeOutsideVisibleBounds){
return this._mapBoundsInfinite;
}else if(L.Browser.mobile){
return this._checkBoundsMaxLat(this._map.getBounds());
}
return this._checkBoundsMaxLat(this._map.getBounds().pad(1));
},
_checkBoundsMaxLat:function(bounds){
var maxLat=this._maxLat;
if(maxLat!==undefined){
if(bounds.getNorth()>=maxLat){
bounds._northEast.lat=Infinity;
}
if(bounds.getSouth()<=-maxLat){
bounds._southWest.lat=-Infinity;
}
}
return bounds;
},
_animationAddLayerNonAnimated:function(layer,newCluster){
if(newCluster===layer){
this._featureGroup.addLayer(layer);
}else if(newCluster._childCount===2){
newCluster._addToMap();
var markers=newCluster.getAllChildMarkers();
this._featureGroup.removeLayer(markers[0]);
this._featureGroup.removeLayer(markers[1]);
}else{
newCluster._updateIcon();
}
},
_extractNonGroupLayers:function(group,output){
var layers=group.getLayers(),
i=0,
layer;
output=output||[];
for(;i<layers.length;i++){
layer=layers[i];
if(layer instanceof L.LayerGroup){
this._extractNonGroupLayers(layer,output);
continue;
}
output.push(layer);
}
return output;
},
_overrideMarkerIcon:function(layer){
var icon=layer.options.icon=this.options.iconCreateFunction({
getChildCount:function(){
return 1;
},
getAllChildMarkers:function(){
return[layer];
}
});
return icon;
}
});
L.MarkerClusterGroup.include({
_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-Infinity,-Infinity),new L.LatLng(Infinity,Infinity))
});
L.MarkerClusterGroup.include({
_noAnimation:{
_animationStart:function(){
},
_animationZoomIn:function(previousZoomLevel,newZoomLevel){
this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,previousZoomLevel);
this._topClusterLevel._recursivelyAddChildrenToMap(null,newZoomLevel,this._getExpandedVisibleBounds());
this.fire('animationend');
},
_animationZoomOut:function(previousZoomLevel,newZoomLevel){
this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,previousZoomLevel);
this._topClusterLevel._recursivelyAddChildrenToMap(null,newZoomLevel,this._getExpandedVisibleBounds());
this.fire('animationend');
},
_animationAddLayer:function(layer,newCluster){
this._animationAddLayerNonAnimated(layer,newCluster);
}
},
_withAnimation:{
_animationStart:function(){
this._map._mapPane.className+=' leaflet-cluster-anim';
this._inZoomAnimation++;
},
_animationZoomIn:function(previousZoomLevel,newZoomLevel){
var bounds=this._getExpandedVisibleBounds(),
fg=this._featureGroup,
i;
this._ignoreMove=true;
this._topClusterLevel._recursively(bounds,previousZoomLevel,0,function(c){
var startPos=c._latlng,
markers=c._markers,
m;
if(!bounds.contains(startPos)){
startPos=null;
}
if(c._isSingleParent()&&previousZoomLevel+1===newZoomLevel){
fg.removeLayer(c);
c._recursivelyAddChildrenToMap(null,newZoomLevel,bounds);
}else{
c.clusterHide();
c._recursivelyAddChildrenToMap(startPos,newZoomLevel,bounds);
}
for(i=markers.length-1;i>=0;i--){
m=markers[i];
if(!bounds.contains(m._latlng)){
fg.removeLayer(m);
}
}
});
this._forceLayout();
this._topClusterLevel._recursivelyBecomeVisible(bounds,newZoomLevel);
fg.eachLayer(function(n){
if(!(n instanceof L.MarkerCluster)&&n._icon){
n.clusterShow();
}
});
this._topClusterLevel._recursively(bounds,previousZoomLevel,newZoomLevel,function(c){
c._recursivelyRestoreChildPositions(newZoomLevel);
});
this._ignoreMove=false;
this._enqueue(function(){
this._topClusterLevel._recursively(bounds,previousZoomLevel,0,function(c){
fg.removeLayer(c);
c.clusterShow();
});
this._animationEnd();
});
},
_animationZoomOut:function(previousZoomLevel,newZoomLevel){
this._animationZoomOutSingle(this._topClusterLevel,previousZoomLevel-1,newZoomLevel);
this._topClusterLevel._recursivelyAddChildrenToMap(null,newZoomLevel,this._getExpandedVisibleBounds());
this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,previousZoomLevel,this._getExpandedVisibleBounds());
},
_animationAddLayer:function(layer,newCluster){
var me=this,
fg=this._featureGroup;
fg.addLayer(layer);
if(newCluster!==layer){
if(newCluster._childCount>2){
newCluster._updateIcon();
this._forceLayout();
this._animationStart();
layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));
layer.clusterHide();
this._enqueue(function(){
fg.removeLayer(layer);
layer.clusterShow();
me._animationEnd();
});
}else{
this._forceLayout();
me._animationStart();
me._animationZoomOutSingle(newCluster,this._map.getMaxZoom(),this._zoom);
}
}
}
},
_animationZoomOutSingle:function(cluster,previousZoomLevel,newZoomLevel){
var bounds=this._getExpandedVisibleBounds();
cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds,previousZoomLevel+1,newZoomLevel);
var me=this;
this._forceLayout();
cluster._recursivelyBecomeVisible(bounds,newZoomLevel);
this._enqueue(function(){
if(cluster._childCount===1){
var m=cluster._markers[0];
this._ignoreMove=true;
m.setLatLng(m.getLatLng());
this._ignoreMove=false;
if(m.clusterShow){
m.clusterShow();
}
}else{
cluster._recursively(bounds,newZoomLevel,0,function(c){
c._recursivelyRemoveChildrenFromMap(bounds,previousZoomLevel+1);
});
}
me._animationEnd();
});
},
_animationEnd:function(){
if(this._map){
this._map._mapPane.className=this._map._mapPane.className.replace(' leaflet-cluster-anim','');
}
this._inZoomAnimation--;
this.fire('animationend');
},
_forceLayout:function(){
L.Util.falseFn(document.body.offsetWidth);
}
});
L.markerClusterGroup=function(options){
return new L.MarkerClusterGroup(options);
};
L.MarkerCluster=L.Marker.extend({
initialize:function(group,zoom,a,b){
L.Marker.prototype.initialize.call(this,a?(a._cLatLng||a.getLatLng()):new L.LatLng(0,0),{icon:this});
this._group=group;
this._zoom=zoom;
this._markers=[];
this._childClusters=[];
this._childCount=0;
this._iconNeedsUpdate=true;
this._boundsNeedUpdate=true;
this._bounds=new L.LatLngBounds();
if(a){
this._addChild(a);
}
if(b){
this._addChild(b);
}
},
getAllChildMarkers:function(storageArray){
storageArray=storageArray||[];
for(var i=this._childClusters.length-1;i>=0;i--){
this._childClusters[i].getAllChildMarkers(storageArray);
}
for(var j=this._markers.length-1;j>=0;j--){
storageArray.push(this._markers[j]);
}
return storageArray;
},
getChildCount:function(){
return this._childCount;
},
zoomToBounds:function(){
var childClusters=this._childClusters.slice(),
map=this._group._map,
boundsZoom=map.getBoundsZoom(this._bounds),
zoom=this._zoom+1,
mapZoom=map.getZoom(),
i;
while(childClusters.length>0&&boundsZoom>zoom){
zoom++;
var newClusters=[];
for(i=0;i<childClusters.length;i++){
newClusters=newClusters.concat(childClusters[i]._childClusters);
}
childClusters=newClusters;
}
if(boundsZoom>zoom){
this._group._map.setView(this._latlng,zoom);
}else if(boundsZoom<=mapZoom){
this._group._map.setView(this._latlng,mapZoom+1);
}else{
this._group._map.fitBounds(this._bounds);
}
},
getBounds:function(){
var bounds=new L.LatLngBounds();
bounds.extend(this._bounds);
return bounds;
},
_updateIcon:function(){
this._iconNeedsUpdate=true;
if(this._icon){
this.setIcon(this);
}
},
createIcon:function(){
if(this._iconNeedsUpdate){
this._iconObj=this._group.options.iconCreateFunction(this);
this._iconNeedsUpdate=false;
}
return this._iconObj.createIcon();
},
createShadow:function(){
return this._iconObj.createShadow();
},
_addChild:function(new1,isNotificationFromChild){
this._iconNeedsUpdate=true;
this._boundsNeedUpdate=true;
this._setClusterCenter(new1);
if(new1 instanceof L.MarkerCluster){
if(!isNotificationFromChild){
this._childClusters.push(new1);
new1.__parent=this;
}
this._childCount+=new1._childCount;
}else{
if(!isNotificationFromChild){
this._markers.push(new1);
}
this._childCount++;
}
if(this.__parent){
this.__parent._addChild(new1,true);
}
},
_setClusterCenter:function(child){
if(!this._cLatLng){
this._cLatLng=child._cLatLng||child._latlng;
}
},
_resetBounds:function(){
var bounds=this._bounds;
if(bounds._southWest){
bounds._southWest.lat=Infinity;
bounds._southWest.lng=Infinity;
}
if(bounds._northEast){
bounds._northEast.lat=-Infinity;
bounds._northEast.lng=-Infinity;
}
},
_recalculateBounds:function(){
var markers=this._markers,
childClusters=this._childClusters,
latSum=0,
lngSum=0,
totalCount=this._childCount,
i,child,childLatLng,childCount;
if(totalCount===0){
return;
}
this._resetBounds();
for(i=0;i<markers.length;i++){
childLatLng=markers[i]._latlng;
this._bounds.extend(childLatLng);
latSum+=childLatLng.lat;
lngSum+=childLatLng.lng;
}
for(i=0;i<childClusters.length;i++){
child=childClusters[i];
if(child._boundsNeedUpdate){
child._recalculateBounds();
}
this._bounds.extend(child._bounds);
childLatLng=child._wLatLng;
childCount=child._childCount;
latSum+=childLatLng.lat*childCount;
lngSum+=childLatLng.lng*childCount;
}
this._latlng=this._wLatLng=new L.LatLng(latSum/totalCount,lngSum/totalCount);
this._boundsNeedUpdate=false;
},
_addToMap:function(startPos){
if(startPos){
this._backupLatlng=this._latlng;
this.setLatLng(startPos);
}
this._group._featureGroup.addLayer(this);
},
_recursivelyAnimateChildrenIn:function(bounds,center,maxZoom){
this._recursively(bounds,0,maxZoom-1,
function(c){
var markers=c._markers,
i,m;
for(i=markers.length-1;i>=0;i--){
m=markers[i];
if(m._icon){
m._setPos(center);
m.clusterHide();
}
}
},
function(c){
var childClusters=c._childClusters,
j,cm;
for(j=childClusters.length-1;j>=0;j--){
cm=childClusters[j];
if(cm._icon){
cm._setPos(center);
cm.clusterHide();
}
}
}
);
},
_recursivelyAnimateChildrenInAndAddSelfToMap:function(bounds,previousZoomLevel,newZoomLevel){
this._recursively(bounds,newZoomLevel,0,
function(c){
c._recursivelyAnimateChildrenIn(bounds,c._group._map.latLngToLayerPoint(c.getLatLng()).round(),previousZoomLevel);
if(c._isSingleParent()&&previousZoomLevel-1===newZoomLevel){
c.clusterShow();
c._recursivelyRemoveChildrenFromMap(bounds,previousZoomLevel);
}else{
c.clusterHide();
}
c._addToMap();
}
);
},
_recursivelyBecomeVisible:function(bounds,zoomLevel){
this._recursively(bounds,0,zoomLevel,null,function(c){
c.clusterShow();
});
},
_recursivelyAddChildrenToMap:function(startPos,zoomLevel,bounds){
this._recursively(bounds,-1,zoomLevel,
function(c){
if(zoomLevel===c._zoom){
return;
}
for(var i=c._markers.length-1;i>=0;i--){
var nm=c._markers[i];
if(!bounds.contains(nm._latlng)){
continue;
}
if(startPos){
nm._backupLatlng=nm.getLatLng();
nm.setLatLng(startPos);
if(nm.clusterHide){
nm.clusterHide();
}
}
c._group._featureGroup.addLayer(nm);
}
},
function(c){
c._addToMap(startPos);
}
);
},
_recursivelyRestoreChildPositions:function(zoomLevel){
for(var i=this._markers.length-1;i>=0;i--){
var nm=this._markers[i];
if(nm._backupLatlng){
nm.setLatLng(nm._backupLatlng);
delete nm._backupLatlng;
}
}
if(zoomLevel-1===this._zoom){
for(var j=this._childClusters.length-1;j>=0;j--){
this._childClusters[j]._restorePosition();
}
}else{
for(var k=this._childClusters.length-1;k>=0;k--){
this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
}
}
},
_restorePosition:function(){
if(this._backupLatlng){
this.setLatLng(this._backupLatlng);
delete this._backupLatlng;
}
},
_recursivelyRemoveChildrenFromMap:function(previousBounds,zoomLevel,exceptBounds){
var m,i;
this._recursively(previousBounds,-1,zoomLevel-1,
function(c){
for(i=c._markers.length-1;i>=0;i--){
m=c._markers[i];
if(!exceptBounds||!exceptBounds.contains(m._latlng)){
c._group._featureGroup.removeLayer(m);
if(m.clusterShow){
m.clusterShow();
}
}
}
},
function(c){
for(i=c._childClusters.length-1;i>=0;i--){
m=c._childClusters[i];
if(!exceptBounds||!exceptBounds.contains(m._latlng)){
c._group._featureGroup.removeLayer(m);
if(m.clusterShow){
m.clusterShow();
}
}
}
}
);
},
_recursively:function(boundsToApplyTo,zoomLevelToStart,zoomLevelToStop,runAtEveryLevel,runAtBottomLevel){
var childClusters=this._childClusters,
zoom=this._zoom,
i,c;
if(zoomLevelToStart<=zoom){
if(runAtEveryLevel){
runAtEveryLevel(this);
}
if(runAtBottomLevel&&zoom===zoomLevelToStop){
runAtBottomLevel(this);
}
}
if(zoom<zoomLevelToStart||zoom<zoomLevelToStop){
for(i=childClusters.length-1;i>=0;i--){
c=childClusters[i];
if(boundsToApplyTo.intersects(c._bounds)){
c._recursively(boundsToApplyTo,zoomLevelToStart,zoomLevelToStop,runAtEveryLevel,runAtBottomLevel);
}
}
}
},
_isSingleParent:function(){
return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount;
}
});
L.Marker.include({
clusterHide:function(){
this.options.opacityWhenUnclustered=this.options.opacity||1;
return this.setOpacity(0);
},
clusterShow:function(){
var ret=this.setOpacity(this.options.opacity||this.options.opacityWhenUnclustered);
delete this.options.opacityWhenUnclustered;
return ret;
}
});
L.DistanceGrid=function(cellSize){
this._cellSize=cellSize;
this._sqCellSize=cellSize*cellSize;
this._grid={};
this._objectPoint={};
};
L.DistanceGrid.prototype={
addObject:function(obj,point){
var x=this._getCoord(point.x),
y=this._getCoord(point.y),
grid=this._grid,
row=grid[y]=grid[y]||{},
cell=row[x]=row[x]||[],
stamp=L.Util.stamp(obj);
this._objectPoint[stamp]=point;
cell.push(obj);
},
updateObject:function(obj,point){
this.removeObject(obj);
this.addObject(obj,point);
},
removeObject:function(obj,point){
var x=this._getCoord(point.x),
y=this._getCoord(point.y),
grid=this._grid,
row=grid[y]=grid[y]||{},
cell=row[x]=row[x]||[],
i,len;
delete this._objectPoint[L.Util.stamp(obj)];
for(i=0,len=cell.length;i<len;i++){
if(cell[i]===obj){
cell.splice(i,1);
if(len===1){
delete row[x];
}
return true;
}
}
},
eachObject:function(fn,context){
var i,j,k,len,row,cell,removed,
grid=this._grid;
for(i in grid){
row=grid[i];
for(j in row){
cell=row[j];
for(k=0,len=cell.length;k<len;k++){
removed=fn.call(context,cell[k]);
if(removed){
k--;
len--;
}
}
}
}
},
getNearObject:function(point){
var x=this._getCoord(point.x),
y=this._getCoord(point.y),
i,j,k,row,cell,len,obj,dist,
objectPoint=this._objectPoint,
closestDistSq=this._sqCellSize,
closest=null;
for(i=y-1;i<=y+1;i++){
row=this._grid[i];
if(row){
for(j=x-1;j<=x+1;j++){
cell=row[j];
if(cell){
for(k=0,len=cell.length;k<len;k++){
obj=cell[k];
dist=this._sqDist(objectPoint[L.Util.stamp(obj)],point);
if(dist<closestDistSq){
closestDistSq=dist;
closest=obj;
}
}
}
}
}
}
return closest;
},
_getCoord:function(x){
return Math.floor(x/this._cellSize);
},
_sqDist:function(p,p2){
var dx=p2.x-p.x,
dy=p2.y-p.y;
return dx*dx+dy*dy;
}
};
(function(){
L.QuickHull={
getDistant:function(cpt,bl){
var vY=bl[1].lat-bl[0].lat,
vX=bl[0].lng-bl[1].lng;
return(vX*(cpt.lat-bl[0].lat)+vY*(cpt.lng-bl[0].lng));
},
findMostDistantPointFromBaseLine:function(baseLine,latLngs){
var maxD=0,
maxPt=null,
newPoints=[],
i,pt,d;
for(i=latLngs.length-1;i>=0;i--){
pt=latLngs[i];
d=this.getDistant(pt,baseLine);
if(d>0){
newPoints.push(pt);
}else{
continue;
}
if(d>maxD){
maxD=d;
maxPt=pt;
}
}
return{maxPoint:maxPt,newPoints:newPoints};
},
buildConvexHull:function(baseLine,latLngs){
var convexHullBaseLines=[],
t=this.findMostDistantPointFromBaseLine(baseLine,latLngs);
if(t.maxPoint){
convexHullBaseLines=
convexHullBaseLines.concat(
this.buildConvexHull([baseLine[0],t.maxPoint],t.newPoints)
);
convexHullBaseLines=
convexHullBaseLines.concat(
this.buildConvexHull([t.maxPoint,baseLine[1]],t.newPoints)
);
return convexHullBaseLines;
}else{
return[baseLine[0]];
}
},
getConvexHull:function(latLngs){
var maxLat=false,minLat=false,
maxLng=false,minLng=false,
maxLatPt=null,minLatPt=null,
maxLngPt=null,minLngPt=null,
maxPt=null,minPt=null,
i;
for(i=latLngs.length-1;i>=0;i--){
var pt=latLngs[i];
if(maxLat===false||pt.lat>maxLat){
maxLatPt=pt;
maxLat=pt.lat;
}
if(minLat===false||pt.lat<minLat){
minLatPt=pt;
minLat=pt.lat;
}
if(maxLng===false||pt.lng>maxLng){
maxLngPt=pt;
maxLng=pt.lng;
}
if(minLng===false||pt.lng<minLng){
minLngPt=pt;
minLng=pt.lng;
}
}
if(minLat!==maxLat){
minPt=minLatPt;
maxPt=maxLatPt;
}else{
minPt=minLngPt;
maxPt=maxLngPt;
}
var ch=[].concat(this.buildConvexHull([minPt,maxPt],latLngs),
this.buildConvexHull([maxPt,minPt],latLngs));
return ch;
}
};
}());
L.MarkerCluster.include({
getConvexHull:function(){
var childMarkers=this.getAllChildMarkers(),
points=[],
p,i;
for(i=childMarkers.length-1;i>=0;i--){
p=childMarkers[i].getLatLng();
points.push(p);
}
return L.QuickHull.getConvexHull(points);
}
});
L.MarkerCluster.include({
_2PI:Math.PI*2,
_circleFootSeparation:25,
_circleStartAngle:Math.PI/6,
_spiralFootSeparation:28,
_spiralLengthStart:11,
_spiralLengthFactor:5,
_circleSpiralSwitchover:9,
spiderfy:function(){
if(this._group._spiderfied===this||this._group._inZoomAnimation){
return;
}
var childMarkers=this.getAllChildMarkers(),
group=this._group,
map=group._map,
center=map.latLngToLayerPoint(this._latlng),
positions;
this._group._unspiderfy();
this._group._spiderfied=this;
if(childMarkers.length>=this._circleSpiralSwitchover){
positions=this._generatePointsSpiral(childMarkers.length,center);
}else{
center.y+=10;
positions=this._generatePointsCircle(childMarkers.length,center);
}
this._animationSpiderfy(childMarkers,positions);
},
unspiderfy:function(zoomDetails){
if(this._group._inZoomAnimation){
return;
}
this._animationUnspiderfy(zoomDetails);
this._group._spiderfied=null;
},
_generatePointsCircle:function(count,centerPt){
var circumference=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+count),
legLength=circumference/this._2PI,
angleStep=this._2PI/count,
res=[],
i,angle;
res.length=count;
for(i=count-1;i>=0;i--){
angle=this._circleStartAngle+i*angleStep;
res[i]=new L.Point(centerPt.x+legLength*Math.cos(angle),centerPt.y+legLength*Math.sin(angle))._round();
}
return res;
},
_generatePointsSpiral:function(count,centerPt){
var spiderfyDistanceMultiplier=this._group.options.spiderfyDistanceMultiplier,
legLength=spiderfyDistanceMultiplier*this._spiralLengthStart,
separation=spiderfyDistanceMultiplier*this._spiralFootSeparation,
lengthFactor=spiderfyDistanceMultiplier*this._spiralLengthFactor*this._2PI,
angle=0,
res=[],
i;
res.length=count;
for(i=count-1;i>=0;i--){
angle+=separation/legLength+i*0.0005;
res[i]=new L.Point(centerPt.x+legLength*Math.cos(angle),centerPt.y+legLength*Math.sin(angle))._round();
legLength+=lengthFactor/angle;
}
return res;
},
_noanimationUnspiderfy:function(){
var group=this._group,
map=group._map,
fg=group._featureGroup,
childMarkers=this.getAllChildMarkers(),
m,i;
group._ignoreMove=true;
this.setOpacity(1);
for(i=childMarkers.length-1;i>=0;i--){
m=childMarkers[i];
fg.removeLayer(m);
if(m._preSpiderfyLatlng){
m.setLatLng(m._preSpiderfyLatlng);
delete m._preSpiderfyLatlng;
}
if(m.setZIndexOffset){
m.setZIndexOffset(0);
}
if(m._spiderLeg){
map.removeLayer(m._spiderLeg);
delete m._spiderLeg;
}
}
group.fire('unspiderfied',{
cluster:this,
markers:childMarkers
});
group._ignoreMove=false;
group._spiderfied=null;
}
});
L.MarkerClusterNonAnimated=L.MarkerCluster.extend({
_animationSpiderfy:function(childMarkers,positions){
var group=this._group,
map=group._map,
fg=group._featureGroup,
legOptions=this._group.options.spiderLegPolylineOptions,
i,m,leg,newPos;
group._ignoreMove=true;
for(i=0;i<childMarkers.length;i++){
newPos=map.layerPointToLatLng(positions[i]);
m=childMarkers[i];
leg=new L.Polyline([this._latlng,newPos],legOptions);
map.addLayer(leg);
m._spiderLeg=leg;
m._preSpiderfyLatlng=m._latlng;
m.setLatLng(newPos);
if(m.setZIndexOffset){
m.setZIndexOffset(1000000);
}
fg.addLayer(m);
}
this.setOpacity(0.3);
group._ignoreMove=false;
group.fire('spiderfied',{
cluster:this,
markers:childMarkers
});
},
_animationUnspiderfy:function(){
this._noanimationUnspiderfy();
}
});
L.MarkerCluster.include({
_animationSpiderfy:function(childMarkers,positions){
var me=this,
group=this._group,
map=group._map,
fg=group._featureGroup,
thisLayerLatLng=this._latlng,
thisLayerPos=map.latLngToLayerPoint(thisLayerLatLng),
svg=L.Path.SVG,
legOptions=L.extend({},this._group.options.spiderLegPolylineOptions),
finalLegOpacity=legOptions.opacity,
i,m,leg,legPath,legLength,newPos;
if(finalLegOpacity===undefined){
finalLegOpacity=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
}
if(svg){
legOptions.opacity=0;
legOptions.className=(legOptions.className||'')+' leaflet-cluster-spider-leg';
}else{
legOptions.opacity=finalLegOpacity;
}
group._ignoreMove=true;
for(i=0;i<childMarkers.length;i++){
m=childMarkers[i];
newPos=map.layerPointToLatLng(positions[i]);
leg=new L.Polyline([thisLayerLatLng,newPos],legOptions);
map.addLayer(leg);
m._spiderLeg=leg;
if(svg){
legPath=leg._path;
legLength=legPath.getTotalLength()+0.1;
legPath.style.strokeDasharray=legLength;
legPath.style.strokeDashoffset=legLength;
}
if(m.setZIndexOffset){
m.setZIndexOffset(1000000);
}
if(m.clusterHide){
m.clusterHide();
}
fg.addLayer(m);
if(m._setPos){
m._setPos(thisLayerPos);
}
}
group._forceLayout();
group._animationStart();
for(i=childMarkers.length-1;i>=0;i--){
newPos=map.layerPointToLatLng(positions[i]);
m=childMarkers[i];
m._preSpiderfyLatlng=m._latlng;
m.setLatLng(newPos);
if(m.clusterShow){
m.clusterShow();
}
if(svg){
leg=m._spiderLeg;
legPath=leg._path;
legPath.style.strokeDashoffset=0;
leg.setStyle({opacity:finalLegOpacity});
}
}
this.setOpacity(0.3);
group._ignoreMove=false;
setTimeout(function(){
group._animationEnd();
group.fire('spiderfied',{
cluster:me,
markers:childMarkers
});
},200);
},
_animationUnspiderfy:function(zoomDetails){
var me=this,
group=this._group,
map=group._map,
fg=group._featureGroup,
thisLayerPos=zoomDetails?map._latLngToNewLayerPoint(this._latlng,zoomDetails.zoom,zoomDetails.center):map.latLngToLayerPoint(this._latlng),
childMarkers=this.getAllChildMarkers(),
svg=L.Path.SVG,
m,i,leg,legPath,legLength,nonAnimatable;
group._ignoreMove=true;
group._animationStart();
this.setOpacity(1);
for(i=childMarkers.length-1;i>=0;i--){
m=childMarkers[i];
if(!m._preSpiderfyLatlng){
continue;
}
m.setLatLng(m._preSpiderfyLatlng);
delete m._preSpiderfyLatlng;
nonAnimatable=true;
if(m._setPos){
m._setPos(thisLayerPos);
nonAnimatable=false;
}
if(m.clusterHide){
m.clusterHide();
nonAnimatable=false;
}
if(nonAnimatable){
fg.removeLayer(m);
}
if(svg){
leg=m._spiderLeg;
legPath=leg._path;
legLength=legPath.getTotalLength()+0.1;
legPath.style.strokeDashoffset=legLength;
leg.setStyle({opacity:0});
}
}
group._ignoreMove=false;
setTimeout(function(){
var stillThereChildCount=0;
for(i=childMarkers.length-1;i>=0;i--){
m=childMarkers[i];
if(m._spiderLeg){
stillThereChildCount++;
}
}
for(i=childMarkers.length-1;i>=0;i--){
m=childMarkers[i];
if(!m._spiderLeg){
continue;
}
if(m.clusterShow){
m.clusterShow();
}
if(m.setZIndexOffset){
m.setZIndexOffset(0);
}
if(stillThereChildCount>1){
fg.removeLayer(m);
}
map.removeLayer(m._spiderLeg);
delete m._spiderLeg;
}
group._animationEnd();
group.fire('unspiderfied',{
cluster:me,
markers:childMarkers
});
},200);
}
});
L.MarkerClusterGroup.include({
_spiderfied:null,
unspiderfy:function(){
this._unspiderfy.apply(this,arguments);
},
_spiderfierOnAdd:function(){
this._map.on('click',this._unspiderfyWrapper,this);
if(this._map.options.zoomAnimation){
this._map.on('zoomstart',this._unspiderfyZoomStart,this);
}
this._map.on('zoomend',this._noanimationUnspiderfy,this);
if(!L.Browser.touch){
this._map.getRenderer(this);
}
},
_spiderfierOnRemove:function(){
this._map.off('click',this._unspiderfyWrapper,this);
this._map.off('zoomstart',this._unspiderfyZoomStart,this);
this._map.off('zoomanim',this._unspiderfyZoomAnim,this);
this._map.off('zoomend',this._noanimationUnspiderfy,this);
this._noanimationUnspiderfy();
},
_unspiderfyZoomStart:function(){
if(!this._map){
return;
}
this._map.on('zoomanim',this._unspiderfyZoomAnim,this);
},
_unspiderfyZoomAnim:function(zoomDetails){
if(L.DomUtil.hasClass(this._map._mapPane,'leaflet-touching')){
return;
}
this._map.off('zoomanim',this._unspiderfyZoomAnim,this);
this._unspiderfy(zoomDetails);
},
_unspiderfyWrapper:function(){
this._unspiderfy();
},
_unspiderfy:function(zoomDetails){
if(this._spiderfied){
this._spiderfied.unspiderfy(zoomDetails);
}
},
_noanimationUnspiderfy:function(){
if(this._spiderfied){
this._spiderfied._noanimationUnspiderfy();
}
},
_unspiderfyLayer:function(layer){
if(layer._spiderLeg){
this._featureGroup.removeLayer(layer);
if(layer.clusterShow){
layer.clusterShow();
}
if(layer.setZIndexOffset){
layer.setZIndexOffset(0);
}
this._map.removeLayer(layer._spiderLeg);
delete layer._spiderLeg;
}
}
});
L.MarkerClusterGroup.include({
refreshClusters:function(layers){
if(!layers){
layers=this._topClusterLevel.getAllChildMarkers();
}else if(layers instanceof L.MarkerClusterGroup){
layers=layers._topClusterLevel.getAllChildMarkers();
}else if(layers instanceof L.LayerGroup){
layers=layers._layers;
}else if(layers instanceof L.MarkerCluster){
layers=layers.getAllChildMarkers();
}else if(layers instanceof L.Marker){
layers=[layers];
}
this._flagParentsIconsNeedUpdate(layers);
this._refreshClustersIcons();
if(this.options.singleMarkerMode){
this._refreshSingleMarkerModeMarkers(layers);
}
return this;
},
_flagParentsIconsNeedUpdate:function(layers){
var id,parent;
for(id in layers){
parent=layers[id].__parent;
while(parent){
parent._iconNeedsUpdate=true;
parent=parent.__parent;
}
}
},
_refreshSingleMarkerModeMarkers:function(layers){
var id,layer;
for(id in layers){
layer=layers[id];
if(this.hasLayer(layer)){
layer.setIcon(this._overrideMarkerIcon(layer));
}
}
}
});
L.Marker.include({
refreshIconOptions:function(options,directlyRefreshClusters){
var icon=this.options.icon;
L.setOptions(icon,options);
this.setIcon(icon);
if(directlyRefreshClusters&&this.__parent){
this.__parent._group.refreshClusters(this);
}
return this;
}
});
}(window,document));
(function(){
L.Map.Gis=L.Map.extend({
includes:L.Evented,
options:{
mapId:'map_gis',
utiliser_bb:false,
sw_lat:0,
ne_lat:0,
sw_lon:0,
ne_lon:0,
gis_layers:L.gisConfig.gis_layers,
default_layer:L.gisConfig.default_layer,
affiche_layers:L.gisConfig.affiche_layers,
scaleControl:false,
overviewControl:false,
layersControl:false,
layersControlOptions:{},
noControl:false,
tooltip:false,
cluster:false,
clusterOptions:{
disableClusteringAtZoom:0,
showCoverageOnHover:false,
maxClusterRadius:80,
spiderfyOnMaxZoom:false
},
pathStyles:null,
autocenterandzoom:false,
openId:false,
affiche_points:true,
json_points:{
url:'',
objets:'',
limit:500,
env:[],
titre:'',
description:'',
icone:''
},
localize_visitor:false,
localize_visitor_zoom:0,
centrer_fichier:true,
kml:false,
gpx:false,
geojson:false,
topojson:false,
langue:false
},
initialize:function(id,options){
L.Util.setOptions(this,options);
this.on('load',function(){
jQuery('#'+this._container.id).get(0).map=this;
if(this.options.callback&&typeof(this.options.callback)==='function')
this.options.callback(this);
jQuery('#'+this._container.id).trigger('load',this);
});
L.Map.prototype.initialize.call(this,id,options);
if(this.options.utiliser_bb){
this.fitBounds(
L.latLngBounds(
[this.options.sw_lat,this.options.sw_lon],
[this.options.ne_lat,this.options.ne_lon]
)
);
}
this.populateTileLayers(this.options.affiche_layers);
this.initControls();
this.loadData();
this.addOverlays();
if(this.options.localize_visitor){
var maxZoom=this.options.localize_visitor_zoom;
this.on('locationerror',function(e){
maxZoom=this.options.zoom;
alert(e.message);
});
this.locate({setView:true,maxZoom:maxZoom});
}
if(!this.options.affiche_points||!Object.keys(this.options.json_points).length){
jQuery('#'+this._container.id).trigger('ready',this);
}
},
populateTileLayers:function(){
if(this.options.default_layer!='none'){
var default_layer=this.createTileLayer(this.options.default_layer);
this.addLayer(default_layer);
}
if(this.options.layersControl&&!this.options.noControl&&this.options.affiche_layers.length>1){
var layers_control=L.control.layers('','',this.options.layersControlOptions);
if(this.options.default_layer!='none'){
layers_control.addBaseLayer(default_layer,this.options.gis_layers[this.options.default_layer].nom);
}
for(var l in this.options.affiche_layers){
if(this.options.affiche_layers[l]!==this.options.default_layer){
var layer=this.createTileLayer(this.options.affiche_layers[l]);
if(typeof layer!=='undefined')
layers_control.addBaseLayer(layer,this.options.gis_layers[this.options.affiche_layers[l]].nom);
}
}
this.addControl(layers_control);
this.layersControl=layers_control;
L.DomUtil.addClass(layers_control._form,'noajax');
}
},
initControls:function(){
this.attributionControl.setPrefix('');
if(this.options.scaleControl)
L.control.scale().addTo(this);
if(this.options.overviewControl&&this.options.default_layer!='none'){
var minimap_layer=this.createTileLayer(this.options.default_layer);
L.control.minimap(minimap_layer,{width:100,height:100,toggleDisplay:true}).addTo(this);
}
},
createTileLayer:function(name){
var layer;
if(typeof this.options.gis_layers[name]!=='undefined')
eval('layer=new '+this.options.gis_layers[name].layer+';');
return layer;
},
setGeoJsonFeatureIcon:function(feature,layer){
if(feature.properties&&feature.properties.icon){
icon_options={
'iconUrl':feature.properties.icon,
'iconSize':[feature.properties.icon_size[0],feature.properties.icon_size[1]],
'iconAnchor':[feature.properties.icon_anchor[0],feature.properties.icon_anchor[1]]
};
if(feature.properties.popup_anchor)
icon_options.popupAnchor=[feature.properties.popup_anchor[0],feature.properties.popup_anchor[1]];
if(feature.properties.shadow)
icon_options.shadowUrl=feature.properties.shadow;
if(feature.properties.shadow_size)
icon_options.shadowSize=[feature.properties.shadow_size[0],feature.properties.shadow_size[1]];
if(feature.properties.shadow_anchor)
icon_options.shadowAnchor=[feature.properties.shadow_anchor[0],feature.properties.shadow_anchor[1]];
layer.setIcon(L.icon(icon_options));
}
},
setGeoJsonFeaturePopup:function(feature,layer){
if(feature.properties
&&!feature.properties.noclick
&&(feature.properties.title||feature.properties.description||
(this.options.langue&&(feature.properties['title_'+this.options.langue]||feature.properties['description_'+this.options.langue])))){
var popupContent='',
popupOptions='',
tooltipContent=false,
description_ok=false;
if(this.options.langue){
langue=this.options.langue;
if(feature.properties['title_'+langue]){
tooltipContent=feature.properties['title_'+langue];
popupContent='<strong class="title">'+feature.properties['title_'+langue]+'</strong>';
}else if(feature.properties.title){
tooltipContent=feature.properties.title;
popupContent='<strong class="title">'+feature.properties.title+'</strong>';
}
if(feature.properties['description_'+langue]){
popupContent=popupContent+feature.properties['description_'+langue];
description_ok=true;
}
}else if(feature.properties.title){
tooltipContent=feature.properties.title;
popupContent='<strong class="title">'+feature.properties.title+'</strong>';
}
if(!description_ok&&feature.properties.description)
popupContent=popupContent+feature.properties.description;
if(feature.properties.popup_options)
popupOptions=feature.properties.popup_options;
layer.bindPopup(popupContent,popupOptions);
if(this.options.tooltip&&tooltipContent){
layer.bindTooltip(tooltipContent).openTooltip();
}
}
},
parseGeoJson:function(data){
var map=this;
if(!map.options.cluster){
this.parseGeoJsonFeatures(data);
}else{
map.markerCluster=L.markerClusterGroup(map.options.clusterOptions).addTo(map);
var markers=[];
var autres={
type:'FeatureCollection',
features:[]
};
jQuery.each(data.features,function(i,feature){
if(feature.geometry.type=='Point'&&feature.geometry.coordinates[0]){
var marker=L.marker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]]);
map.setGeoJsonFeatureIcon(feature,marker);
map.setGeoJsonFeaturePopup(feature,marker);
marker.id=feature.id;
markers.push(marker);
}else{
autres.features.push(feature);
}
});
map.markerCluster.addLayers(markers);
this.parseGeoJsonFeatures(autres);
if(map.options.autocenterandzoom){
if(data.features.length>1)
map.fitBounds(map.markerCluster.getBounds());
else
map.setView(map.markerCluster.getBounds().getCenter(),map.options.zoom);
}
if(map.options.openId){
gis_focus_marker(map.options.openId,map.options.mapId);
}
}
},
parseGeoJsonFeatures:function(data){
var map=this;
if(data.features&&data.features.length>0){
var geojson=L.geoJson('',{
style:this.options.pathStyles?this.options.pathStyles:function(feature){
if(feature.properties&&feature.properties.styles)
return feature.properties.styles;
else
return'';
},
onEachFeature:function(feature,layer){
if(feature.geometry.type=='Point'){
map.setGeoJsonFeatureIcon(feature,layer);
}
map.setGeoJsonFeaturePopup(feature,layer);
},
pointToLayer:function(feature,latlng){
var alt='Marker';
if(feature.properties.title){
alt=feature.properties.title;
}
return L.marker(latlng,{alt:alt});
}
}).addData(data).addTo(map);
if(map.options.autocenterandzoom){
if(data.features.length==1&&data.features[0].geometry.type=='Point')
map.setView(geojson.getBounds().getCenter(),map.options.zoom);
else
map.fitBounds(geojson.getBounds());
}
if(map.options.openId)
gis_focus_marker(map.options.openId,map.options.mapId);
if(typeof map.geojsons=='undefined')map.geojsons=[];
map.geojsons.push(geojson);
}
},
addJSON:function(data){
return this.parseGeoJson(data);
},
removeAllMarkers:function(){
if(this.options.cluster){
this.markerCluster.clearLayers();
}
if(typeof this.geojsons=='undefined')this.geojsons=[];
for(var i in this.geojsons){
this.geojsons[i].clearLayers();
this.removeLayer(this.geojsons[i]);
}
this.geojsons=[];
},
loadData:function(){
var map=this;
if(map.options.affiche_points
&&typeof(map.options.json_points)!=='undefined'
&&map.options.json_points.url.length){
var args={};
jQuery.extend(true,args,map.options.json_points.env);
if(typeof map.options.json_points.objets!=='undefined'){
args.objets=map.options.json_points.objets;
if(args.objets=='point_libre'){
args.lat=map.options.center[0];
args.lon=map.options.center[1];
if(typeof map.options.json_points.titre!=='undefined')
args.titre=map.options.json_points.titre;
if(typeof map.options.json_points.description!=='undefined')
args.description=map.options.json_points.description;
if(typeof map.options.json_points.icone!=='undefined')
args.icone=map.options.json_points.icone;
}
}
if(typeof map.options.json_points.limit!=='undefined')
args.limit=map.options.json_points.limit;
jQuery.getJSON(map.options.json_points.url,args,
function(data){
if(data){
map.parseGeoJson(data);
jQuery('#'+map._container.id).trigger('ready',map);
}
}
);
}
},
addOverlays:function(){
var map=this;
if(map.options.kml&&map.options.kml.length){
map.kml={};
for(var i in map.options.kml){
map.kml[i]=new L.KML(map.options.kml[i],{async:true});
if(map.options.centrer_fichier)
map.kml[i].on('loaded',function(e){map.fitBounds(e.target.getBounds());});
map.addLayer(map.kml[i]);
}
}
if(map.options.gpx&&map.options.gpx.length){
map.gpx={};
for(var i in map.options.gpx){
map.gpx[i]=new L.GPX(map.options.gpx[i],{async:true});
if(map.options.centrer_fichier)
map.gpx[i].on('loaded',function(e){map.fitBounds(e.target.getBounds());});
map.addLayer(map.gpx[i]);
}
}
if(map.options.geojson&&map.options.geojson.length){
for(var i in map.options.geojson){
jQuery.getJSON(map.options.geojson[i],function(data){
if(data)
map.parseGeoJson(data);
});
}
}
if(map.options.topojson&&map.options.topojson.length){
for(var i in map.options.topojson){
map.topojson[i]=new L.TOPOJSON(map.options.topojson[i],{async:true});
if(map.options.centrer_fichier){
map.topojson[i].on('loaded',function(e){map.fitBounds(e.target.getBounds());});
}
map.addLayer(map.topojson[i]);
}
}
}
});
L.map.gis=function(id,options){
return new L.Map.Gis(id,options);
};
})();
