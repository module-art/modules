!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a(a.s=2)}([,,function(e,t,a){e.exports=a(3)},function(e,t,a){"use strict";a.r(t);a(4);$(document).ready((function(){$(".sidebarCollapse").on("click",(function(){$("#sidebar").toggleClass("active")}));var e,t,a=$("#id_page").html(),n=!1,r="/storage/"+current_theme+"/files/images/default_background.jpg",o=0,i=$('meta[name="csrf-token"]').attr("content");$("#add-rubrique").click((function(){document.getElementById("global-wrapper");$.ajax({method:"post",url:"/coulisses/newrubrique/"+a,data:{_token:i}}).done((function(e){console.log(e.response),document.location.reload(!0)})).fail((function(){alert("Oups! une erreur a empêché l'ajout de rubrique.")}))})),$("#destroy-page").click((function(){confirm("Tous les contenus de cette page seront supprimés. Êtes vous vraiment sûr?")&&$.ajax({method:"delete",url:"/coulisses/destroypage/"+a,data:{_token:i}}).done((function(e){alert(e),location.assign("/coulisses")})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))})),$("#publication").click((function(){var e=this;$.ajax({method:"post",url:"/coulisses/publicationpage/"+a,data:{_token:i}}).done((function(t){console.log(t);var a="Masquer"==e.innerText?"Publier":"Masquer";e.innerText=a})).fail((function(){alert("Oups! une erreur a empêché la publication.")}))})),$(".btn-publish").click((function(){var e,t,a,n,r=$(this).parents(".rubrique-container").first().find(".editrubrique").attr("data-rubrique_id");document.body.style.cursor="wait",e=$(this),t="publicationcontent",a=r,n=e.children().first(),$.ajax({method:"post",url:"/coulisses/"+t+"/"+a,data:{_token:i}}).done((function(t){document.body.style.cursor="default",console.log(t),n.is(".published")?(n.removeClass("published").addClass("unpublished").html('<i class="fas fa-eye"></i>'),e.attr("title","Publier cette rubrique")):(n.removeClass("unpublished").addClass("published").html('<i class="fas fa-eye-slash"></i>'),e.attr("title","Masquer cette rubrique"))})).fail((function(){document.body.style.cursor="default",alert("Oups! une erreur a empêché la modification.")}))})),e=$(".select-gallery"),t=0,e.focus((function(){t=$(this).parents(".after-rubrique").first().attr("data-rubrique_id")})),e.popsuggest({placement:"left",dataUrl:"/coulisses/list-galleries",separator:"|",rows:6,addData:{_token:i}}).on("popSelect",(function(){!function(e,t){var a=$(".after-rubrique[data-rubrique_id="+e+"]").first().find(".markerRow").first(),n='[gallery url="/public/'+current_theme+"/files/galeries/"+t+'" type="square"]',r="/coulisses/bloc/rubrique-"+e;void 0!==n&&$.ajax({url:r,method:"post",data:{_token:i,texte:n,format:"gallery"},dataType:"json"}).done((function(t){console.log(t.response),T(a,e)})).fail((function(){alert("La requête n'a pas abouti. Êtes-vous bien connecté comme admin?")}))}(t,this.value)}));var s=["advlist autolink lists link image charmap print preview anchor","searchreplace visualblocks code fullscreen","insertdatetime media table paste code help wordcount responsivefilemanager"],l="code | bold italic underline | bullist numlist | forecolor backcolor | link unlink | media responsivefilemanager",c="Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Paragraph=p",u="8pt 10pt 12pt 14pt 18pt 24pt 36pt",d="/js/rfm/filemanager/",p="Gestionnaire de fichiers",f="",m={filemanager:"/js/rfm/filemanager/plugin.min.js"},g="i[class],a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|style|onmouseover|onmouseout|name],$elements";function b(e){e.on("focus",(function(e){var t=$(e.target.bodyElement),a=t.hasClass("imagenode")?t:t.parents(".rubrique-container").find(".imagenode"),s=a.attr("data-image-src"),l='<section id="replacement" class="row justify-content-end mb-4"><div class="col-12 col-md-8 col-lg-6 col-xl-5"><div class="card"><div class="card-body"><form method="post" enctype="multipart/form-data" class="" id="replacement-form"><div class="form-group"><label for="image" class="col-form-label">Changer l\'image de fond</label><div class="input-group mb-2"><div class="input-group-prepend"><div class="input-group-text"><i class="far fa-file-image"></i></div></div><input id="image" class="form-control" type="file" name="image" /></div><div class="form-check mb-2"><input class="form-check-input" type="checkbox" value="1" name="delete_image"><label class="form-check-label" for="delete_image"> Image par défaut</label></div><input id="texte" type="hidden" name="texte" /><input type="hidden" name="_token" value="'+i+'" /><div class="row justify-content-between px-3"><button class="btn btn-primary btn-save" ><i class="fas fa-cog fa-spin fa-lg"></i> Enregistrer</button><button id="btn-cancel" class="btn btn-secondary" >Annuler</button></div></form></div></div></div></section>';$(".cols-button, .bloc-button").css("display","none"),void 0===$("#replacement")[0]&&t.parent().append(l),function(e,t){var a=["jpg","jpeg","png"],i=document.querySelector("#image"),s=document.querySelector("#replacement-form");i.addEventListener("change",(function(){var t,r=this.files;if(t=(t=r[0].name.split("."))[t.length-1].toLowerCase(),-1!=a.indexOf(t)&&r[0].size<4096e3){var i,l=new FileReader;l.readAsDataURL(r[0]),l.addEventListener("load",(function(){(i=document.createElement("img")).src=this.result,setTimeout((function(){(o=i.naturalWidth)>=minImgWidth?(n=!0,e.css("background-image",'url("'+i.src+'")')):(alert("Pour avoir un bon rendu sur tout type d'écran, la largeur de l'image doit être supérieure à "+minImgWidth+"px. Cette image fait "+o+"px."),r=[],s.reset())}),300)}),!1)}else-1==a.indexOf(t)?alert("Image non valide, il faut un format jpg ou png."):r[0].size>=4096e3&&alert("Image de taille supérieure à 4096ko. Il faut la réduire avec un logiciel adapté."),r=[],s.reset()}),!1),$("input[name=delete_image]").change((function(){$(this).prop("checked")?(n=!0,e.css("background-image",'url("'+r+'")')):(n=!1,e.css("background-image",'url("'+t+'")'))}))}(a,s),$(".btn-save").on("click",(function(e){$(".fa-cog").css("display","inline-block"),e.preventDefault(),$("#texte").val(t.html());var n="/coulisses/rubrique/"+t.attr("data-rubrique_id"),o=new FormData($("#replacement-form")[0]);$.ajax({url:n,method:"post",data:o,dataType:"json",processData:!1,contentType:!1}).done((function(e){$(".fa-cog").css("display","none"),console.log(e.response),setTimeout((function(){t.css({padding:""}),$("#replacement").remove(),$(".cols-button, .bloc-button").css("display","block"),parseInt(e.img_deleted)&&a.css({backgroundImage:'url("'+r+'")'})}),100)})).fail((function(e){$(".fa-cog").css("display","none");var t=e.responseJSON.message+"\n";$.each(e.responseJSON.errors,(function(e,a){t+=a+"\n"})),alert("La requête n'a pas abouti.\n"+t)})),j()})),$("#btn-cancel").on("click",(function(e){e.preventDefault(),setTimeout((function(){t.css({padding:""}),n&&a.css("background-image",'url("'+s+'")'),$("#replacement").remove(),$(".cols-button, .bloc-button").css("display","block")}),100)}))}))}function h(e){e.on("focus",(function(e){var t=$(e.target.bodyElement);t.parent().append('<div id="bloc-buttons" class="d-flex justify-content-end"><button class="btn btn-primary btn-save">Enregistrer</button></div>'),$(".btn-save").on("mousedown",(function(){var e=t.html(),a=t.attr("data-bloc_id"),n=0==a,r="";if(void 0!==e){n&&(r="col-12"==t.parent()[0].className?"large":"normal",a="rubrique-"+t.parents(".after-rubrique").first().attr("data-rubrique_id"));var o="/coulisses/bloc/"+a;$.ajax({url:o,method:"post",data:{_token:i,texte:e,format:r},dataType:"json"}).done((function(e){console.log(e.response),t.css("border","none"),n&&t.attr("data-bloc_id",e.newId)})).fail((function(){alert("La requête n'a pas abouti. Êtes-vous bien connecté comme admin?")})),j()}}))})),e.on("blur",(function(e){setTimeout((function(){$("#bloc-buttons").remove()}),100)})),e.on("Change",(function(e){$(e.target.bodyElement).css("border","1px red solid")}))}function v(){$(".editrubrique").off(),tinymce.init({selector:".editrubrique",inline:!0,language:"fr_FR",branding:!1,plugins:s,toolbar:l,block_formats:c,fontsize_formats:u,paste_as_text:!0,image_advtab:!0,entity_encoding:"raw",valid_elements:"+*[*]",external_filemanager_path:d,filemanager_title:p,filemanager_sort_by:"date",filemanager_descending:!0,filemanager_access_key:f,relative_urls:!1,media_live_embeds:!0,external_plugins:m,extended_valid_elements:g,init_instance_callback:function(e){b(e)}})}function y(){$(".editable").off(),$(".edititre").off(),tinymce.init({selector:".editable",inline:!0,language:"fr_FR",branding:!1,plugins:s,toolbar:l,block_formats:c,fontsize_formats:u,paste_as_text:!0,image_advtab:!0,entity_encoding:"raw",valid_elements:"+*[*]",external_filemanager_path:d,filemanager_title:p,filemanager_sort_by:"date",filemanager_descending:!0,filemanager_access_key:f,relative_urls:!1,media_live_embeds:!0,external_plugins:m,extended_valid_elements:g,init_instance_callback:function(e){h(e)}}),tinymce.init({selector:".edititre",inline:!0,language:"fr_FR",menubar:!1,branding:!1,plugins:s,toolbar:l,block_formats:c,fontsize_formats:u,paste_as_text:!0,image_advtab:!0,entity_encoding:"raw",valid_elements:"+*[*]",external_filemanager_path:d,filemanager_title:p,filemanager_sort_by:"date",filemanager_descending:!0,filemanager_access_key:f,relative_urls:!1,media_live_embeds:!0,external_plugins:m,extended_valid_elements:g,init_instance_callback:function(e){h(e)}})}function _(){var e=$(".editdate"),t=$(".editheure");e.length>0&&(e.datetimepicker({locale:"fr",format:"L"}),e.on("change.datetimepicker",(function(e){k(moment(e.date).format("YYYYMMDD"),$(this).attr("data-bloc_id"))}))),t.length>0&&(t.datetimepicker({locale:"fr",format:"LT"}),t.on("change.datetimepicker",(function(e){k(moment(e.date).format("HHmm"),$(this).attr("data-bloc_id"))}))),$(".editnumber").click((function(){var e=$(this),t=e.attr("data-bloc_id"),a=e.html();e.addClass("d-none"),e.parent().prepend('<input id="nmber" type="text" value="'+a+'"/><div id="bloc-buttons"><button class="btn btn-primary btn-save pull-right" >Enregistrer</button></div>');var n=$("#nmber");n.focus(),n.blur((function(){e.html($(this).val()),setTimeout((function(){n.remove(),$("#bloc-buttons").remove(),e.removeClass("d-none")}),100)})),$(".btn-save").click((function(){k(n.val(),t)}))}))}function k(e,t){var a="/coulisses/bloc/"+t;$.ajax({url:a,method:"post",data:{_token:i,texte:e,format:"date"},dataType:"json"}).done((function(e){console.log(e.response)})).fail((function(){alert("La requête n'a pas abouti. Êtes-vous bien connecté comme admin?")}))}function x(){$(".add-bloc").off(),$(".change-type").off(),$(".add-bloc").click((function(){var e=$(this).parents(".markerRow").first(),t=e.parent().attr("data-rubrique_cols"),a=this.getAttribute("data-format"),n=$(this).attr("data-order"),r='<div class="col-12"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><h2>Nouveau bloc large</h2></div></div>',o='<div class="col-12 col-md-'+12/t+'"><button class="btn btn-sm btn-outline-danger btn-destroy" ><i class="fas fa-trash-alt"></i></button><div class="editable" data-bloc_id="0"><p>Nouveau paragraphe</p></div></div>';"asc"==n?"large"==a?e.append(r):"normal"==a&&e.append(o):"desc"==n&&("large"==a?e.prepend(r):"normal"==a&&e.prepend(o)),$(".after-rubrique").addClass("not-empty"),y(),q()})),$(".change-type").click((function(){var e=$(this).parents(".after-rubrique").first().attr("data-rubrique_id");e=parseInt(e),$.ajax({method:"post",url:"/coulisses/change-type-content/"+e,data:{dbAction:$(this).attr("data-dbAction"),contentType:$(this).attr("data-contentType"),_token:i},dataType:"json"}).done((function(e){console.log(e.response),document.location.reload(!0)})).fail((function(e){console.log(e),alert("Oups! une erreur a empêché la modification")}))}))}function q(){$(".btn-destroy").off(),$(".btn-destroy").click((function(){if(confirm("Êtes vous sûr?")){var e=$(this).parent();if(e.hasClass("rubrique-container")){if(confirm("Tous les blocs associés à cette rubrique seront effacés. Êtes vous vraiment sûr?")){var t=e.find(".editrubrique").attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/destroyrubrique/"+t,data:{_token:i}}).done((function(t){e.next().remove(),e.remove(),console.log(t)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))}}else if(e.hasClass("type-content")){t=$(this).attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/destroyinsertedrubrique/"+t,data:{_token:i}}).done((function(t){e.remove(),console.log(t)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))}else if(e.hasClass("type-index")){t=$(this).attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/destroyinsertedrubrique/"+t,data:{_token:i}}).done((function(t){e.parents("tr").remove(),console.log(t),document.location.reload(!0)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")}))}else{var a=$(this).next().attr("data-bloc_id");0!=a?$.ajax({method:"post",url:"/coulisses/destroybloc/"+a,data:{_token:i}}).done((function(t){e.remove(),console.log(t)})).fail((function(){alert("Oups! une erreur a empêché la suppression.")})):e.remove()}$(".add-bloc").off(),x()}}))}function w(){$(".change-col").off(),$(".ranger").off(),$(".inverser").off(),$(".change-col").click((function(){var e=$(this).parents(".markerRow").first(),t=parseInt(this.getAttribute("data-colonnes")),a="",n=e.find(".col-12").not(".large-bloc"),r=e.parent().attr("data-rubrique_id");switch(r=parseInt(r),e.children(".clearfix").remove(),n.attr("class","col-12"),t){case 1:a="";break;case 2:a="col-md-6",n.addClass(a);break;case 3:a="col-md-6 col-lg-4",n.addClass(a)}$.ajax({method:"post",url:"/coulisses/cols/"+r,data:{cols:t,_token:i},dataType:"json"}).done((function(a){console.log(a.response),w(),e.parent().attr("data-rubrique_cols",t),setTimeout((function(){j()}),900)})).fail((function(e){alert("Oups! une erreur a empêché la modification")}))})),$(".ranger").click((function(){var e=$(this).parents(".after-rubrique").first(),t=e.attr("data-rubrique_id");T(e,t=parseInt(t))})),$(".inverser").click((function(){var e=$(this).parents(".after-rubrique").first(),t=e.attr("data-rubrique_id");$.ajax({method:"post",url:"/coulisses/ascdesc/"+t,data:{_token:i}}).done((function(a){console.log(a),parseInt(t),T(e,t)})).fail((function(){alert("Oups! une erreur a empêché l'inversion.")}))})),$(".deplacer").click((function(){$(".editable").off(),$(".editrubrique").off(),$(".btn-destroy").off(),$(".add-bloc").off();var e=$(this).parents(".after-rubrique").first(),t=e.attr("data-rubrique_id");e.load("/coulisses/partial_drag/"+t,(function(e,t,a){"error"==t?console.log(a.statusText):(w(),function(){function e(){var e=$(".dropzone");e.length>0&&(e.css("width","2px"),setTimeout((function(){e.remove()}),700))}for(var t,a,n,r,o,i=document.getElementById("drag-mode"),s=i.dataset.id,l=$(".dropy"),c=document.getElementsByClassName("dropy"),u=c.length,d=0;d<u;d++)c[d].addEventListener("dragstart",(function(e){a=parseInt(this.dataset.position),e.dataTransfer.setData("text/plain","4Rt89dhMx"),t=e.target,e.target.style.opacity="0.5"}),!1);function p(){l.off(),l.on("dragenter",(function(l){var c,u,d;e(),l.stopPropagation(),r=parseInt(this.dataset.place),n=parseInt(this.dataset.position),(o=document.createElement("div")).className=t.parentNode.className+" dropzone",o.innerHTML='<div class="indropzone" style = "height: '+t.clientHeight+'px" ></div>',o.style.width="2px",a>n?i.insertBefore(o,this.parentElement):a<n&&(c=o,u=this.parentElement,(d=u.parentNode).lastChild===u?d.appendChild(c):d.insertBefore(c,u.nextSibling)),$(this).off(),o.addEventListener("transitionend",(function(a){!function(a){a.addEventListener("dragover",(function(e){e.preventDefault()}),!1),a.addEventListener("drop",(function(a){if(a.preventDefault(),"4Rt89dhMx"==a.dataTransfer.getData("text/plain")){var n=t.parentNode.cloneNode(!0),o=parseInt(t.dataset.place),l=$(this).parents(".after-rubrique").first();i.replaceChild(n,t.parentNode),setTimeout((function(){i.replaceChild(t.parentNode,a.target.parentNode),n.style.width="2px"}),5),setTimeout((function(){i.removeChild(n),e(),t.style.opacity="1",p(),$.ajax({method:"post",url:"/coulisses/moveblock/"+s,data:{init_place:o,final_place:r,_token:$('[name="csrf-token"]').attr("content")},dataType:"json"}).done((function(e){console.log(e.response),T(l,s)})).fail((function(e){console.log(e),alert("Oups! une erreur a empêché la modification")}))}),705)}}),!1)}(o)}),!1),setTimeout((function(){o.style=null}),5)}))}p(),document.addEventListener("dragend",(function(){e(),t.style.opacity="1",p()}),!1),document.addEventListener("dragover",(function(e){e.clientY<100?window.scrollBy(0,-10):e.clientY>window.innerHeight-100&&window.scrollBy(0,10)}),!1)}())}))}))}function j(){var e=$(".editable iframe");0!=e.length&&(e.first().parent().css("width","100%"),e.each((function(){$(this).removeAttr("style");var e=$(this).width();$(this).width(Math.round(e)),$(this).height(Math.round(9*e/16))})))}function T(e,t){e.load("/coulisses/partial_bloc/"+t,(function(e,a,n){"error"==a?console.log(n.statusText):(console.log("Blocs de la rubrique "+t+" actualisés."),y(),_(),w(),q(),x(),j())}))}!function(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),n=0;n<a.length;n++){for(var r=a[n];" "==r.charAt(0);)r=r.substring(1);0==r.indexOf(t)&&(f=r.substring(t.length,r.length),y(),v())}}("fmk"),x(),q(),w(),j()}))},function(e,t){!function(e){function t(t,a){e("body").css("cursor","wait"),e(t).css("cursor","wait"),e.ajax({method:"post",url:dataUrl,data:e.extend({chain:a},addData)}).done((function(a){e("body").css("cursor","default"),e(t).css("cursor","default");var n,r=a.split(separator),o=r.length,i=document.createElement("div"),s=rows;for(n=0;n<o;n++){if(n%s==0){n==s&&i.appendChild(l);var l=document.createElement("div");l.style.display="inline-block",l.style.marginTop="10px",l.style.marginLeft="10px",l.style.marginRight="10px",l.style.cursor="pointer",l.style.verticalAlign="top"}var c=document.createElement("p");c.className="result",allowHtml&&!r[n].match(/<\/?p>/)?c.innerHTML=r[n]:c.appendChild(document.createTextNode(r[n])),l.appendChild(c),n%s==0&&n>0&&i.appendChild(l)}n<s&&i.appendChild(l),e(t).attr("data-content",i.outerHTML),e(t).popover("show"),setTimeout((function(){!function(t){for(var a=document.querySelectorAll(".result"),n=a.length,r=0;r<n;r++)a[r].addEventListener("mouseover",(function(){this.style.color="#666"}),!1),a[r].addEventListener("mouseout",(function(){this.style.color="black"}),!1),a[r].addEventListener("click",(function(a){t.value=a.target.innerHTML,e(t).popover("hide"),e(".popover").remove(),e(t).trigger("popSelect")}),!1)}(t)}),200)})).fail((function(e){console.log(e),alert("Oups ! search fail.")}))}e.fn.popsuggest=function(a){var n=e.extend({placement:"right",dataUrl:"data.html",chainLength:2,rows:8,separator:",",html:!1,addData:{}},a),r=-1;return dataUrl=n.dataUrl,separator=n.separator,allowHtml=n.html,addData=n.addData,rows=n.rows,this.popover({placement:n.placement,trigger:"manual",html:!0}),this.click((function(e){this.value.length>=n.chainLength&&t(this,this.value)})).keyup((function(a){var o="";if(40==a.keyCode||38==a.keyCode||13==a.keyCode){switch(a.keyCode){case 40:r+=1;break;case 38:r-=1}"over"==function(t,a,n){for(var r=document.getElementsByClassName("result"),o=r.length,i=0;i<o;i++)r[i].style.color="black";return 40==t&&a<o||38==t&&a>=0?(r[a].style.color="#666","ok"):13==t&&a>=0&&a<o?(n.value=r[a].innerHTML,e(n).popover("hide"),e(".popover").remove(),e(n).trigger("popSelect"),"ok"):"over"}(a.keyCode,r,this)&&(r=-1)}else(o=this.value).length>=n.chainLength?(r=-1,t(this,o)):(e(this).popover("hide"),e(".popover").remove())})),e("body").on("click",(function(t){e('[data-toggle="popover"]').each((function(){e(this).is(t.target)||0!==e(this).has(t.target).length||0!==e(".popover").has(t.target).length||e(this).popover("hide")}))})),this}}(jQuery)}]);