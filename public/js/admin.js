(()=>{var e={133:()=>{!function(e){function t(t,n){e("body").css("cursor","wait"),e(t).css("cursor","wait"),e.ajax({method:"post",url:dataUrl,data:e.extend({chain:n},addData)}).done((function(n){e("body").css("cursor","default"),e(t).css("cursor","default");var a,o=n.split(separator),r=o.length,i=document.createElement("div"),s=rows;for(a=0;a<r;a++){if(a%s==0){a==s&&i.appendChild(l);var l=document.createElement("div");l.style.display="inline-block",l.style.marginTop="10px",l.style.marginLeft="10px",l.style.marginRight="10px",l.style.cursor="pointer",l.style.verticalAlign="top"}var c=document.createElement("p");c.className="result",allowHtml&&!o[a].match(/<\/?p>/)?c.innerHTML=o[a]:c.appendChild(document.createTextNode(o[a])),l.appendChild(c),a%s==0&&a>0&&i.appendChild(l)}a<s&&i.appendChild(l),e(t).attr("data-content",i.outerHTML),e(t).popover("show"),setTimeout((function(){!function(t){for(var n=document.querySelectorAll(".result"),a=n.length,o=0;o<a;o++)n[o].addEventListener("mouseover",(function(){this.style.color="#666"}),!1),n[o].addEventListener("mouseout",(function(){this.style.color="black"}),!1),n[o].addEventListener("click",(function(n){t.value=n.target.innerHTML,e(t).popover("hide"),e(".popover").remove(),e(t).trigger("popSelect")}),!1)}(t)}),200)})).fail((function(e){console.log(e),alert("Oups ! search fail.")}))}e.fn.popsuggest=function(n){var a=e.extend({placement:"right",dataUrl:"data.html",chainLength:2,rows:8,separator:",",html:!1,addData:{}},n),o="ok",r=-1;return dataUrl=a.dataUrl,separator=a.separator,allowHtml=a.html,addData=a.addData,rows=a.rows,this.popover({placement:a.placement,trigger:"manual",html:!0}),this.click((function(e){this.value.length>=a.chainLength&&t(this,this.value)})).keyup((function(n){var i="";if(40==n.keyCode||38==n.keyCode||13==n.keyCode){switch(n.keyCode){case 40:r+=1;break;case 38:r-=1}o=function(t,n,a){for(var o=document.getElementsByClassName("result"),r=o.length,i=0;i<r;i++)o[i].style.color="black";return 40==t&&n<r||38==t&&n>=0?(o[n].style.color="#666","ok"):13==t&&n>=0&&n<r?(a.value=o[n].innerHTML,e(a).popover("hide"),e(".popover").remove(),e(a).trigger("popSelect"),"ok"):"over"}(n.keyCode,r,this),"over"==o&&(r=-1)}else(i=this.value).length>=a.chainLength?(r=-1,t(this,i)):(e(this).popover("hide"),e(".popover").remove())})),e("body").on("click",(function(t){e('[data-toggle="popover"]').each((function(){e(this).is(t.target)||0!==e(this).has(t.target).length||0!==e(".popover").has(t.target).length||e(this).popover("hide")}))})),this}}(jQuery)}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(133);function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function a(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?t(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):t(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(t,n,a){return(n=function(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var a=t[Symbol.toPrimitive];if(void 0!==a){var o=a.call(t,n||"default");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===e(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t}$(document).ready((function(){$(".sidebarCollapse").on("click",(function(){$("#sidebar").toggleClass("active")}));var e={selector:".editable",inline:!0,language:"fr_FR",menubar:!0,branding:!1,plugins:["advlist autolink lists link image charmap print preview anchor","searchreplace visualblocks fullscreen","insertdatetime media table paste code help wordcount "],toolbar:"code | bold italic underline | bullist numlist | forecolor backcolor | link unlink | media image",block_formats:"Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Paragraph=p",fontsize_formats:"8pt 10pt 12pt 14pt 18pt 24pt 36pt",paste_as_text:!0,image_advtab:!0,entity_encoding:"raw",valid_elements:"+*[*]",relative_urls:!1,media_live_embeds:!0,extended_valid_elements:"i[class],a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|style|onmouseover|onmouseout|name],$elements",file_picker_callback:function(e,t,n){var a=window.innerWidth||document.documentElement.clientWidth||document.getElementsByTagName("body")[0].clientWidth,o=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight;tinymce.activeEditor.windowManager.openUrl({url:"/file-manager/tinymce5",title:"Gestionnaire de fichiers",width:.8*a,height:.8*o,onMessage:function(t,n){e(n.content,{text:n.text})}})},init_instance_callback:function(e){!function(e){e.on("focus",(function(e){console.log("callback");var t=$(e.target.bodyElement);t.parent().append('<div id="bloc-buttons" class="d-flex justify-content-end"><button class="btn btn-primary btn-save">Enregistrer</button></div>'),$(".btn-save").on("mousedown",(function(){var e=t.html(),n=t.attr("data-bloc_id"),a=0==n,o="";if(void 0!==e){a&&(o="col-12"==t.parent()[0].className?"large":"normal",n="rubrique-"+t.parents(".after-rubrique").first().attr("data-rubrique_id"));var r="/coulisses/bloc/"+n;$.ajax({url:r,method:"post",data:{_token:d,texte:e,format:o},dataType:"json"}).done((function(e){console.log(e.response),t.css("border","none"),a&&t.attr("data-bloc_id",e.newId)})).fail((function(){alert("La requête n'a pas abouti. Êtes-vous bien connecté comme admin?")})),g()}}))})),e.on("blur",(function(e){setTimeout((function(){$("#bloc-buttons").remove()}),100)})),e.on("Change",(function(e){$(e.target.bodyElement).css("border","1px red solid")}))}(e)}},t=a(a({},e),{},{selector:".editrubrique",menubar:!1,toolbar:"formatselect | bold italic underline | alignleft aligncenter alignright | code",init_instance_callback:function(e){!function(e){e.on("focus",(function(e){var t=$(e.target.bodyElement),n=t.hasClass("imagenode")?t:t.parents(".rubrique-container").find(".imagenode"),a=n.attr("data-image-src"),o='<section id="replacement" class="row justify-content-end mb-4"><div class="col-12 col-md-8 col-lg-6 col-xl-5"><div class="card"><div class="card-body"><form method="post" enctype="multipart/form-data" class="" id="replacement-form"><div class="form-group"><label for="image" class="col-form-label">Changer l\'image de fond</label><div class="input-group mb-2"><div class="input-group-prepend"><div class="input-group-text"><i class="far fa-file-image"></i></div></div><input id="image" class="form-control" type="file" name="image" /></div><div class="form-check mb-2"><input class="form-check-input" type="checkbox" value="1" name="delete_image"><label class="form-check-label" for="delete_image"> Image par défaut</label></div><input id="texte" type="hidden" name="texte" /><input type="hidden" name="_token" value="'+d+'" /><div class="row justify-content-between px-3"><button class="btn btn-primary btn-save" ><i class="fas fa-cog fa-spin fa-lg"></i> Enregistrer</button><button id="btn-cancel" class="btn btn-secondary" >Annuler</button></div></form></div></div></div></section>';$(".cols-button, .bloc-button").css("display","none"),void 0===$("#replacement")[0]&&t.parent().append(o),function(e,t){var n=["jpg","jpeg","png"],a=document.querySelector("#image"),o=document.querySelector("#replacement-form");a.addEventListener("change",(function(){var t,a=this.files;if(t=(t=a[0].name.split("."))[t.length-1].toLowerCase(),-1!=n.indexOf(t)&&a[0].size<u){var r,i=new FileReader;i.readAsDataURL(a[0]),i.addEventListener("load",(function(){(r=document.createElement("img")).src=this.result,setTimeout((function(){(c=r.naturalWidth)>=minImgWidth?(s=!0,e.css("background-image",'url("'+r.src+'")')):(alert("Pour avoir un bon rendu sur tout type d'écran, la largeur de l'image doit être supérieure à "+minImgWidth+"px. Cette image fait "+c+"px."),a=[],o.reset())}),300)}),!1)}else-1==n.indexOf(t)?alert("Image non valide, il faut un format jpg ou png."):a[0].size>=u&&alert("Image de taille supérieure à 4096ko. Il faut la réduire avec un logiciel adapté."),a=[],o.reset()}),!1),$("input[name=delete_image]").change((function(){$(this).prop("checked")?(s=!0,e.css("background-image",'url("'+l+'")')):(s=!1,e.css("background-image",'url("'+t+'")'))}))}(n,a),$(".btn-save").on("click",(function(e){$(".fa-cog").css("display","inline-block"),e.preventDefault(),$("#texte").val(t.html());var a="/coulisses/rubrique/"+t.attr("data-rubrique_id"),o=new FormData($("#replacement-form")[0]);$.ajax({url:a,method:"post",data:o,dataType:"json",processData:!1,contentType:!1}).done((function(e){$(".fa-cog").css("display","none"),console.log(e.response),setTimeout((function(){t.css({padding:""}),$("#replacement").remove(),$(".cols-button, .bloc-button").css("display","block"),parseInt(e.img_deleted)&&n.css({backgroundImage:'url("'+l+'")'})}),100)})).fail((function(e){$(".fa-cog").css("display","none");var t=e.responseJSON.message+"\n";$.each(e.responseJSON.errors,(function(e,n){t+=n+"\n"})),alert("La requête n'a pas abouti.\n"+t)})),g()})),$("#btn-cancel").on("click",(function(e){e.preventDefault(),setTimeout((function(){t.css({padding:""}),s&&n.css("background-image",'url("'+a+'")'),$("#replacement").remove(),$(".cols-button, .bloc-button").css("display","block")}),100)}))}))}(e)}});function n(){tinymce.remove(".editable"),tinymce.init(e)}tinymce.init(e),tinymce.init(t);var o,r,i=$("#id_page").html(),s=!1,l="/storage/"+current_theme+"/files/images/default_background.jpg",c=0,u=4096e3,d=$('meta[name="csrf-token"]').attr("content");function p(){var e=$(".editdate"),t=$(".editheure");e.length>0&&(e.datetimepicker({locale:"fr",format:"L"}),e.on("change.datetimepicker",(function(e){f(moment(e.date).format("YYYYMMDD"),$(this).attr("data-bloc_id"))}))),t.length>0&&(t.datetimepicker({locale:"fr",format:"LT"}),t.on("change.datetimepicker",(function(e){f(moment(e.date).format("HHmm"),$(this).attr("data-bloc_id"))}))),$(".editnumber").click((function(){var e=$(this),t=e.attr("data-bloc_id"),n=e.html();e.addClass("d-none"),e.parent().prepend('<input id="nmber" type="text" value="'+n+'"/><div id="bloc-buttons"><button class="btn btn-primary btn-save pull-right" >Enregistrer</button></div>');var a=$("#nmber");a.focus(),a.blur((function(){e.html($(this).val()),setTimeout((function(){a.remove(),$("#bloc-buttons").remove(),e.removeClass("d-none")}),100)})),$(".btn-save").click((function(){f(a.val(),t)}))}))}function f(e,t){var n="/coulisses/bloc/"+t;$.ajax({url:n,method:"post",data:{_token:d,texte:e,format:"date"},dataType:"json"}).done((function(e){console.log(e.response)})).fail((function(){alert("La requête n'a pas abouti. Êtes-vous bien connecté comme admin?")}))}function m(){$(".add-bloc").off(),$(".change-type").off(),$(".add-bloc").click((function(){var e=$(this).parents(".markerRow").first(),t=e.parent().attr("data-rubrique_cols"),a=this.getAttribute("data-format"),o=$(this).attr("data-order"),r='<div class="col-12"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><h2>Nouveau bloc large</h2></div></div>',i='<div class="col-12 col-md-'+12/t+'"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><p>Nouveau paragraphe</p></div></div>';"asc"==o?"large"==a?e.append(r):"normal"==a&&e.append(i):"desc"==o&&("large"==a?e.prepend(r):"normal"==a&&e.prepend(i)),$(".after-rubrique").addClass("not-empty"),n(),b()})),$(".change-type").click((function(){var e=$(this).parents(".after-rubrique").first().attr("data-rubrique_id");e=parseInt(e),$.ajax({method:"post",url:"/coulisses/change-type-content/"+e,data:{dbAction:$(this).attr("data-dbAction"),contentType:$(this).attr("data-contentType"),_token:d},dataType:"json"}).done((function(e){console.log(e.response),document.location.reload(!0)})).fail((function(e){console.log(e),alert("Oups! une erreur a empêché la modification")}))}))}function b(){$(".btn-destroy").off(),$(".btn-destroy").click((function(){if(confirm("Êtes vous sûr?")){var e=$(this).parent();if(e.hasClass("rubrique-container")){if(confirm("Tous les blocs associés à cette rubrique seront effacés. Êtes vous vraiment sûr?")){var t=e.find(".editrubrique").attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/destroyrubrique/"+t,data:{_token:d}}).done((function(t){e.next().remove(),e.remove(),console.log(t)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))}}else if(e.hasClass("type-content")){t=$(this).attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/destroyinsertedrubrique/"+t,data:{_token:d}}).done((function(t){e.remove(),console.log(t)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))}else if(e.hasClass("type-index")){t=$(this).attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/destroyinsertedrubrique/"+t,data:{_token:d}}).done((function(t){e.parents("tr").remove(),console.log(t)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))}else{var n=$(this).next().attr("data-bloc_id");0!=n?$.ajax({method:"post",url:"/coulisses/destroybloc/"+n,data:{_token:d}}).done((function(t){e.remove(),console.log(t)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")})):e.remove()}$(".add-bloc").off(),m()}}))}function h(){$(".change-col").off(),$(".ranger").off(),$(".inverser").off(),$(".change-col").click((function(){var e=$(this).parents(".markerRow").first(),t=parseInt(this.getAttribute("data-colonnes")),n="",a=e.find(".col-12").not(".large-bloc"),o=e.parent().attr("data-rubrique_id");switch(o=parseInt(o),e.children(".clearfix").remove(),a.attr("class","col-12"),t){case 1:n="";break;case 2:n="col-md-6",a.addClass(n);break;case 3:n="col-md-6 col-lg-4",a.addClass(n)}$.ajax({method:"post",url:"/coulisses/cols/"+o,data:{cols:t,_token:d},dataType:"json"}).done((function(n){console.log(n.response),h(),e.parent().attr("data-rubrique_cols",t),setTimeout((function(){g()}),900)})).fail((function(e){alert("Oups! une erreur a empêché la modification")}))})),$(".ranger").click((function(){var e=$(this).parents(".after-rubrique").first(),t=e.attr("data-rubrique_id");v(e,t=parseInt(t))})),$(".inverser").click((function(){var e=$(this).parents(".after-rubrique").first(),t=e.attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/ascdesc/"+t,data:{_token:d}}).done((function(n){console.log(n),parseInt(t),v(e,t)})).fail((function(){alert("Oups! une erreur a empêché l'inversion.")}))})),$(".deplacer").click((function(){$(".editable").off(),$(".editrubrique").off(),$(".btn-destroy").off(),$(".add-bloc").off();var e=$(this).parents(".after-rubrique").first(),t=e.attr("data-rubrique_id");e.load("/coulisses/partial_drag/"+t,(function(e,t,n){"error"==t?console.log(n.statusText):(h(),function(){function e(e,t){var n=t.parentNode;n.lastChild===t?n.appendChild(e):n.insertBefore(e,t.nextSibling)}function t(){var e=$(".dropzone");e.length>0&&(e.css("width","2px"),setTimeout((function(){e.remove()}),700))}for(var n,a,o,r,i,s=document.getElementById("drag-mode"),l=s.dataset.id,c=$(".dropy"),u=document.getElementsByClassName("dropy"),d=u.length,p=0;p<d;p++)u[p].addEventListener("dragstart",(function(e){a=parseInt(this.dataset.position),e.dataTransfer.setData("text/plain","4Rt89dhMx"),n=e.target,e.target.style.opacity="0.5"}),!1);function f(){c.off(),c.on("dragenter",(function(l){t(),l.stopPropagation(),r=parseInt(this.dataset.place),o=parseInt(this.dataset.position),(i=document.createElement("div")).className=n.parentNode.className+" dropzone",i.innerHTML='<div class="indropzone" style = "height: '+n.clientHeight+'px" ></div>',i.style.width="2px",a>o?s.insertBefore(i,this.parentElement):a<o&&e(i,this.parentElement),$(this).off(),i.addEventListener("transitionend",(function(e){m(i)}),!1),setTimeout((function(){i.style=null}),5)}))}function m(e){e.addEventListener("dragover",(function(e){e.preventDefault()}),!1),e.addEventListener("drop",(function(e){if(e.preventDefault(),"4Rt89dhMx"==e.dataTransfer.getData("text/plain")){var a=n.parentNode.cloneNode(!0),o=parseInt(n.dataset.place),i=$(this).parents(".after-rubrique").first();s.replaceChild(a,n.parentNode),setTimeout((function(){s.replaceChild(n.parentNode,e.target.parentNode),a.style.width="2px"}),5),setTimeout((function(){s.removeChild(a),t(),n.style.opacity="1",f(),$.ajax({method:"post",url:"/coulisses/moveblock/"+l,data:{init_place:o,final_place:r,_token:$('[name="csrf-token"]').attr("content")},dataType:"json"}).done((function(e){console.log(e.response),v(i,l)})).fail((function(e){console.log(e),alert("Oups! une erreur a empêché la modification")}))}),705)}}),!1)}f(),document.addEventListener("dragend",(function(){t(),n.style.opacity="1",f()}),!1),document.addEventListener("dragover",(function(e){e.clientY<100?window.scrollBy(0,-10):e.clientY>window.innerHeight-100&&window.scrollBy(0,10)}),!1)}())}))}))}function g(){var e=$(".editable iframe");0!=e.length&&(e.first().parent().css("width","100%"),e.each((function(){$(this).removeAttr("style");var e=$(this).width();$(this).width(Math.round(e)),$(this).height(Math.round(9*e/16))})))}function v(e,t){e.load("/coulisses/partial_bloc/"+t,(function(e,a,o){"error"==a?console.log(o.statusText):(console.log("Blocs de la rubrique "+t+" actualisés."),n(),p(),h(),b(),m(),g())}))}$("#add-rubrique").click((function(){document.getElementById("global-wrapper");$.ajax({method:"post",url:"/coulisses/newrubrique/"+i,data:{_token:d}}).done((function(e){console.log(e.response),document.location.reload(!0)})).fail((function(){alert("Oups! une erreur a empêché l'ajout de rubrique.")}))})),$("#destroy-page").click((function(){confirm("Tous les contenus de cette page seront supprimés. Êtes vous vraiment sûr?")&&$.ajax({method:"delete",url:"/coulisses/destroypage/"+i,data:{_token:d}}).done((function(e){alert(e),location.assign("/coulisses")})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))})),$("#publication").click((function(){var e=this;$.ajax({method:"post",url:"/coulisses/publicationpage/"+i,data:{_token:d}}).done((function(t){console.log(t);var n="Masquer"==e.innerText?"Publier":"Masquer";e.innerText=n})).fail((function(){alert("Oups! une erreur a empêché la publication.")}))})),$(".btn-publish").click((function(){var e,t,n,a,o=$(this).parents(".rubrique-container").first().find(".editrubrique").attr("data-rubrique_id");document.body.style.cursor="wait",e=$(this),t="publicationcontent",n=o,a=e.children().first(),$.ajax({method:"post",url:"/coulisses/"+t+"/"+n,data:{_token:d}}).done((function(t){document.body.style.cursor="default",a.is(".published")?(a.removeClass("published").addClass("unpublished").html('<i class="fas fa-eye-slash"></i>'),e.attr("title","Publier cette rubrique")):(a.removeClass("unpublished").addClass("published").html('<i class="fas fa-eye"></i>'),e.attr("title","Masquer cette rubrique"))})).fail((function(){document.body.style.cursor="default",alert("Oups! une erreur a empêché la modification.")}))})),o=$(".select-gallery"),r=0,o.focus((function(){r=$(this).parents(".after-rubrique").first().attr("data-rubrique_id")})),o.popsuggest({placement:"left",dataUrl:"/coulisses/list-galleries",separator:"|",rows:6,addData:{_token:d}}).on("popSelect",(function(){!function(e,t){var n=$(".after-rubrique[data-rubrique_id="+e+"]").first().find(".markerRow").first(),a='[gallery url="/public/'+current_theme+"/files/galeries/"+t+'" type="square"]',o="/coulisses/bloc/rubrique-"+e;void 0!==a&&$.ajax({url:o,method:"post",data:{_token:d,texte:a,format:"gallery"},dataType:"json"}).done((function(t){console.log(t.response),v(n,e)})).fail((function(){alert("La requête n'a pas abouti. Êtes-vous bien connecté comme admin?")}))}(r,this.value)})),m(),b(),h(),g()}))})()})();