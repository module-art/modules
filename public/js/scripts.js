!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=10)}({10:function(e,t,n){n(11),e.exports=n(42)},11:function(e,t){$(document).ready(function(){var e=$("#exquis-form input[name=texte]"),t=parseInt($("#remnant").text()),n=0;function o(){n=t-e.val().length,$("#remnant").text(n),n<=0?$("#limit-alert").text("Vous allez finir ce texte."):$("#limit-alert").text("")}e.keyup(function(){o()}),e.on("paste",function(){setTimeout(function(){o()},100)}),$("#send-exquis").click(function(e){$(".fa-cog").css("display","inline-block"),e.preventDefault();var t=$("#exquis-form")[0],n=new FormData(t);n.append("_token",$('meta[name="csrf-token"]').attr("content")),console.log(n.get("texte")),$.ajax({url:"/exquis",method:"post",data:n,dataType:"json",processData:!1,contentType:!1}).done(function(e){$(".fa-cog").css("display","none"),t.reset(),e.nouveau?($("#exquis-container").hide(),$("#new-exquis").html("<p>"+e.response+"</p><p>"+e.nouveau+'</p><p><a class="btn btn-secondary" href="#" onClick="document.location.reload()">cliquez pour recommencer.</a></p>')):(alert(e.response),document.location.reload())}).fail(function(e){$(".fa-cog").css("display","none"),t.reset();var n="";$.each(e.responseJSON.errors,function(e,t){n+=t+"\n"}),alert("La requête n'a pas abouti.\n"+n)})});var r=$(".cd-top"),a=$(".heading.first").first();parseInt(a.css("padding-top")),parseInt(a.css("padding-bottom"));$(document).on("click",".more",function(e){e.preventDefault(),$("html, body").animate({scrollTop:$($.attr(this,"href")).offset().top},1e3)}),$(window).scroll(function(){$(this).scrollTop()>300?r.addClass("cd-is-visible"):r.removeClass("cd-is-visible cd-fade-out"),$(this).scrollTop()>1200?r.addClass("cd-fade-out"):$(this).scrollTop()<1200&&r.removeClass("cd-fade-out")}),r.on("click",function(e){e.preventDefault(),$("body,html").animate({scrollTop:0},1e3)})})},42:function(e,t){}});