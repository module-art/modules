!function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i(i.s=4)}({4:function(e,t,i){e.exports=i(5)},5:function(e,t){$(document).ready(function(){var e=$('meta[name="csrf-token"]').attr("content");$('td[data-toggle="publication"]').click(function(){var t=$(this).attr("data-page_id"),i=$(this).children().first();$.ajax({method:"post",url:"/coulisses/publicationpage/"+t,data:{_token:e}}).done(function(e){console.log(e),i.is(".published")?i.removeClass("published").addClass("unpublished").html('<i class="far fa-times-circle"></i>'):i.removeClass("unpublished").addClass("published").html('<i class="far fa-check-circle"></i>')}).fail(function(){alert("Oups! une erreur a empêché la modification.")})}),$('td[data-toggle="content-publication"]').click(function(){var t=$(this).attr("data-content_id"),i=$(this).children().first();$.ajax({method:"post",url:"/coulisses/publicationcontent/"+t,data:{_token:e}}).done(function(e){console.log(e),i.is(".published")?i.removeClass("published").addClass("unpublished").html('<i class="far fa-times-circle"></i>'):i.removeClass("unpublished").addClass("published").html('<i class="far fa-check-circle"></i>')}).fail(function(){alert("Oups! une erreur a empêché la modification.")})}),$('td[data-toggle="content-archivage"]').click(function(){var t=$(this).attr("data-content_id"),i=$(this).children().first();$.ajax({method:"post",url:"/coulisses/archivecontent/"+t,data:{_token:e}}).done(function(e){console.log(e),i.is(".published")?i.removeClass("published").addClass("unpublished").html('<i class="far fa-times-circle"></i>'):i.removeClass("unpublished").addClass("published").html('<i class="far fa-check-circle"></i>')}).fail(function(){alert("Oups! une erreur a empêché la modification.")})})})}});