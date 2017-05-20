(function(){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(prop){var _super=this.prototype;initializing=true;var prototype=new this();initializing=false;for(var name in prop){prototype[name]=typeof prop[name]=="function"&&typeof _super[name]=="function"&&fnTest.test(prop[name])?(function(name,fn){return function(){var tmp=this._super;this._super=_super[name];var ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,prop[name]):prop[name];}
function Class(){if(!initializing&&this.init)
this.init.apply(this,arguments);}
Class.prototype=prototype;Class.constructor=Class;Class.extend=arguments.callee;return Class;};})();var MM_Core=Class.extend({init:function(moduleName,entityName)
{if(moduleName==undefined){this._alert("MM_Core.js: module name is required (i.e. MM_MembershipLevelsView, MM_BundlesView, etc.)");}
if(entityName==undefined){this._alert("MM_Core.js: entity name is required (i.e. Membership Level, Bundle, etc.)");}
this.module=moduleName;this.entityName=entityName;this.method="performAction";this.action="module-handle";this.updateHandler="dataUpdateHandler";this.mm_page="mm_configure_site";this.mm_module="member_types";},_alert:function(str){alert(str);},shouldRedirectExternal:function(urlObj,func){var url="";if(urlObj.url!=undefined){url=urlObj.url;}
else{url=urlObj;}
if(func=="changeMembership"){if(url.toLowerCase().indexOf("paypal")>=0||url.toLowerCase().indexOf("clickbank")>=0){return confirm("You will be redirected to "+url);}}
return true;},createFormSubmit:function(params,submitButtonId){if(params!=null){var html="<form id='mm-paymentmethod' action='"+params.url+"' method='post'>";for(var eachvar in params){html+="<input type='hidden' name='"+eachvar+"' value='"+params[eachvar]+"' />";}
html+="</form>";jQuery("body").append(html);if(submitButtonId!=undefined){if(jQuery("#"+submitButtonId).length){jQuery("#"+submitButtonId).submit();}
else{this._alert("No button defined "+submitButtonId);}}
else{if(jQuery("#mm-paymentmethod").length){jQuery("#mm-paymentmethod").submit();}
else{this._alert("No button defined mm-paymentmethod");}}}},downloadFile:function(url){document.location.href=url;},isValidURL:function(url)
{return true;},ucfirst:function(str)
{return str.charAt(0).toUpperCase()+str.slice(1);},getVar:function(value,defaultValue){if(value==undefined){return defaultValue;}
return value;},setDataGridProps:function(sortBy,sortDir,crntPage,resultSize)
{this.sortBy=sortBy;this.sortDir=sortDir;this.crntPage=crntPage;this.resultSize=resultSize;},getQuerystringParam:function(name)
{name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(window.location.href);if(results==null){return"";}else{return decodeURIComponent(results[1].replace(/\+/g," "));}},sort:function(columnName)
{var newSortDir="asc";if(columnName==this.sortBy)
{if(this.sortDir=="asc"){newSortDir="desc";}}
this.sortBy=columnName;this.sortDir=newSortDir;this.refreshView();},dgPreviousPage:function(dgCrntPage)
{if(parseInt(dgCrntPage)!=0){this.crntPage=parseInt(dgCrntPage)-1;this.refreshView();}},dgNextPage:function(dgCrntPage,dgTotalPages)
{if(dgCrntPage!=(parseInt(dgTotalPages)-1)){this.crntPage=parseInt(dgCrntPage)+1;this.refreshView();}},dgSetResultSize:function(pageControl)
{if(jQuery(pageControl).val()!=undefined)
{this.crntPage=0;this.resultSize=jQuery(pageControl).val();this.refreshView();}},refreshView:function()
{var values={sortBy:this.sortBy,sortDir:this.sortDir,crntPage:this.crntPage,resultSize:this.resultSize,mm_action:"refreshView"};var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,'mmjs','refreshViewCallback');},refreshViewCallback:function(data)
{if(data.message!=undefined&&data.message.length>0){jQuery("#mm-view-container").html(data.message);}
else{this._alert("No data received");}},save:function(callback,params,callbackFunc)
{this.processForm();if(this.validateForm()==true){var form_obj=new MM_Form('mm-form-container');var values=form_obj.getFields();values.mm_action="save";if(params!=undefined&&params!=""){if(typeof params=="object"){for(var key in params){eval("values."+key+"='"+params[key]+"'");}}}
var callbackObject="mmjs";if(callback!=undefined&&callback!="")
{callbackObject=callback;}
var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,callbackObject,this.updateHandler);}},create:function(dialogId,width,height)
{mmdialog_js.showDialog(dialogId,this.module,width,height,"Create "+this.entityName);},edit:function(dialogId,id,width,height)
{mmdialog_js.showDialog(dialogId,this.module,width,height,"Edit "+this.entityName,id);},remove:function(id)
{var doRemove=confirm("Are you sure you want to delete this "+this.entityName.toLowerCase()+"?");if(doRemove)
{var values={id:id,mm_action:"remove"};var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,'mmjs',this.updateHandler);}},dataUpdateHandler:function(data)
{if(data.type=="error")
{if(data.message.length>0)
{this._alert(data.message);return false;}}
else{if(data.message!=undefined&&data.message.length>0)
{this._alert(data.message);}
this.refreshView();this.closeDialog();}},closeDialog:function(dialogReference)
{if(dialogReference!=undefined&&dialogReference!="")
{dialogReference.close();}
else
{mmdialog_js.close();}},processForm:function()
{},validateForm:function()
{return true;},validatePhone:function(phone)
{var regexs=new Array();regexs.push(/^(\+\d)*\s*(\(\d{3}\)\s*)*\d{3}(-{0,1}|\s{0,1})\d{2}(-{0,1}|\s{0,1})\d{2}$/);regexs.push(/^\d{10}$/);regexs.push(/^(\d{3})*(\-|\s)*\d{3}(\-|\s)*\d{4}$/);regexs.push(/^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/);for(i=0;i<regexs.length;i++)
{if(phone.match(regexs[i])){return true;}}
return false;},validateCreditDate:function(year,month)
{var d=new Date();var curr_date=d.getDate();var curr_month=d.getMonth()+1;var curr_year=d.getFullYear();curr_year=curr_year.toString().substring(2);if(parseInt(curr_year)>parseInt(year))
{return false;}
else if(parseInt(curr_year)==parseInt(year))
{var m=month.replace(/^[ 0]/g,'');if(parseInt(curr_month)>parseInt(m))
{return false;}}
return true;},validateEmail:function(email)
{var apos=email.indexOf("@");var dotpos=email.lastIndexOf(".");if(apos<1||dotpos-apos<2)
{return false;}
return true;},validateUrl:function(s){var regexp=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return regexp.test(s);},startUpload:function()
{return true;},stopUpload:function(success,msg,filePath)
{if(success=='1')
{jQuery("#mm-uploaded-file-details").show();jQuery("#mm-file-upload-container").hide();if(jQuery("#mm-uploaded-file")[0]){var tag=jQuery("#mm-uploaded-file")[0].tagName;if(tag.toLowerCase()=="div"){jQuery("#mm-uploaded-file").attr("href",msg);var fileArr=msg.split('/');if(filePath!=undefined){jQuery("#mm-uploaded-file-hidden").text(filePath);}
jQuery("#mm-uploaded-file").text(fileArr.pop());}}
else{jQuery("#mm-uploaded-file").attr("src",msg);}}
else
{jQuery("#mm-uploaded-file-details").hide();jQuery("#mm-file-upload-container").show();this._alert(msg);}
return true;},clearUploadedFile:function()
{jQuery("#fileToUpload").attr("value","");jQuery("#mm-uploaded-file-details").hide();jQuery("#mm-file-upload-container").show();jQuery("#mm-uploaded-file").attr("src","");},countryChangeHandler:function(type){var ajax=new MM_Ajax(false,this.module,this.action,this.method);var values={mm_action:"loadStates",country:jQuery("#mm_field_"+type+"_country").val(),type:type,referer:jQuery("input[name='_wp_http_referer']").val(),};values[mm_nonce_name_checkout_form]=jQuery("input[name='"+mm_nonce_name_checkout_form+"']").val();ajax.send(values,false,'mmjs','countryChangeHandlerCallback');return false;},countryChangeHandlerCallback:function(data){if(data.type=="error"){alert(data.message);}else{jQuery("#mm_field_"+data.data.type+"_state_dd").empty().append(data.data.html);jQuery("#mm_field_"+data.data.type+"_state_dd").trigger("change");}
return false;},stateChangeHandler:function(type){var iso=jQuery("#mm_field_"+type+"_country").val();if(jQuery("#mm_field_"+type+"_state_dd").val()=="-1"){jQuery("#mm_field_"+type+"_state").show().focus();}else{jQuery("#mm_field_"+type+"_state").val(jQuery("#mm_field_"+type+"_state_dd").val());jQuery("#mm_field_"+type+"_state").hide();}},validateInputCallback:function(data)
{if(data.type=='error')
{alert(data.message);this.validated=false;}
else
{this.validated=true;}},});(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else if(typeof exports==='object'){module.exports=factory;}else{factory(jQuery);}}(function($){$.fn.bgiframe=function(s){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;',conditional:/MSIE 6\.0/.test(navigator.userAgent)},s);if(!$.isFunction(s.conditional)){var condition=s.conditional;s.conditional=function(){return condition;};}
var $iframe=$('<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;"/>');return this.each(function(){var $this=$(this);if(s.conditional(this)===false){return;}
var existing=$this.children('iframe.bgiframe');var $el=existing.length===0?$iframe.clone():existing;$el.css({'top':s.top=='auto'?((parseInt($this.css('borderTopWidth'),10)||0)*-1)+'px':prop(s.top),'left':s.left=='auto'?((parseInt($this.css('borderLeftWidth'),10)||0)*-1)+'px':prop(s.left),'width':s.width=='auto'?(this.offsetWidth+'px'):prop(s.width),'height':s.height=='auto'?(this.offsetHeight+'px'):prop(s.height),'opacity':s.opacity===true?0:undefined});if(existing.length===0){$this.prepend($el);}});};$.fn.bgIframe=$.fn.bgiframe;function prop(n){return n&&n.constructor===Number?n+'px':n;}}));$.extend({createUploadIframe:function(id,uri)
{var frameId='jUploadFrame'+id;if(window.ActiveXObject){var io=document.createElement('<iframe id="'+frameId+'" name="'+frameId+'" />');if(typeof uri=='boolean'){io.src='javascript:false';}
else if(typeof uri=='string'){io.src=uri;}}
else{var io=document.createElement('iframe');io.id=frameId;io.name=frameId;}
io.style.position='absolute';io.style.top='-1000px';io.style.left='-1000px';document.body.appendChild(io);return io},createUploadForm:function(id,fileElementId)
{var formId='jUploadForm'+id;var fileId='jUploadFile'+id;var form=$('<form  action="" method="POST" name="'+formId+'" id="'+formId+'" enctype="multipart/form-data"></form>');var oldElement=$('#'+fileElementId);var newElement=$(oldElement).clone();$(oldElement).attr('id',fileId);$(oldElement).before(newElement);$(oldElement).appendTo(form);$(form).css('position','absolute');$(form).css('top','-1200px');$(form).css('left','-1200px');$(form).appendTo('body');return form;},ajaxFileUpload:function(s){s=$.extend({},$.ajaxSettings,s);var id=new Date().getTime()
var form=$.createUploadForm(id,s.fileElementId);var io=$.createUploadIframe(id,s.secureuri);var frameId='jUploadFrame'+id;var formId='jUploadForm'+id;if(s.global&&!$.active++)
{$.event.trigger("ajaxStart");}
var requestDone=false;var xml={}
if(s.global)
$.event.trigger("ajaxSend",[xml,s]);var uploadCallback=function(isTimeout)
{var io=document.getElementById(frameId);try
{if(io.contentWindow)
{xml.responseText=io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;xml.responseXML=io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;}else if(io.contentDocument)
{xml.responseText=io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;xml.responseXML=io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;}}catch(e)
{$.handleError(s,xml,null,e);}
if(xml||isTimeout=="timeout")
{requestDone=true;var status;try{status=isTimeout!="timeout"?"success":"error";if(status!="error")
{var data=$.uploadHttpData(xml,s.dataType);if(s.success)
s.success(data,status);if(s.global)
$.event.trigger("ajaxSuccess",[xml,s]);}else
$.handleError(s,xml,status);}catch(e)
{status="error";$.handleError(s,xml,status,e);}
if(s.global)
$.event.trigger("ajaxComplete",[xml,s]);if(s.global&&!--$.active)
$.event.trigger("ajaxStop");if(s.complete)
s.complete(xml,status);$(io).unbind()
setTimeout(function()
{try
{$(io).remove();$(form).remove();}catch(e)
{$.handleError(s,xml,null,e);}},100)
xml=null}}
if(s.timeout>0)
{setTimeout(function(){if(!requestDone)uploadCallback("timeout");},s.timeout);}
try
{var form=$('#'+formId);$(form).attr('action',s.url);$(form).attr('method','POST');$(form).attr('target',frameId);if(s.data)
{for(var eachvar in s.data)
{$(form).append("<input type='hidden' name='"+eachvar+"' value='"+s.data[eachvar]+"' />");}}
if(form.encoding)
{form.encoding='multipart/form-data';}
else
{form.enctype='multipart/form-data';}
$(form).submit();}catch(e)
{$.handleError(s,xml,null,e);}
if(window.attachEvent){document.getElementById(frameId).attachEvent('onload',uploadCallback);}
else{document.getElementById(frameId).addEventListener('load',uploadCallback,false);}
return{abort:function(){}};},uploadHttpData:function(r,type){var data=!type;data=type=="xml"||data?r.responseXML:r.responseText;if(type=="script")
$.globalEval(data);if(type=="json")
eval("data = "+data);if(type=="html")
$("<div>").html(data).evalScripts();return data;}});var glCache={version:'1.0',cache:[],defaultExpire:1*60,setData:function(id,data,expire)
{if(!id||!data)
{return false;}
this.clear(id);var now=(new Date()).getTime()/ 1000|0;expire=(expire==0)?expire:(now+(expire?expire:this.defaultExpire));this.cache[id]={expire:expire,data:data};return true;},getData:function(id)
{var cache=this.cache[id];if(!cache)
{return null;}
else
{var now=(new Date()).getTime()/ 1000|0;if(now>=cache.expire&&cache.expire!=0)
{this.clear(id);return null;}
else
{return cache.data;}}},clear:function(id)
{return delete this.cache[id];},clearAll:function()
{for(var i in this.cache)
{if(!this.clear(i))
{return false;}}
return true;}}
function SearchPostFilter()
{jQuery("#post-search-input").attr("disabled","disabled");return true;}
function s(v)
{if(v.constructor==String)
{return jQuery('#'+v);}
else
{return jQuery(v);}}
function empty(v)
{if(v==undefined)return true;if(!v)return true;if((v.constructor===String)&&(v==''))return true;if((v.constructor===Array)&&(v.length==0))return true;return false;}
function RouteToPage(url,lock_id)
{document.location.href=url;var r=doAjax({lock:jQuery('body')[0],dataType:'json',url:url,onSuccess:function(data)
{}});doAddAjax(r,'Router');}
function doAjax(options)
{if(doGetCacheAJAX(options)){return false;}
if(!options.ignoreStack){if(!window.ajax_request_version){window.ajax_request_version=0;}
options.version=++window.ajax_request_version;}
if(options.lock){doAjaxLock(options.lock);}
var xhr=jQuery.ajax({async:options.sjax===false?false:true,data:options.data,dataType:options.dataType||'json',type:options.type||'POST',url:options.url,dataFilter:function(data,type)
{if(type=='json')
{var firstChar=data.slice(0,1);var lastChar=data.slice(data.length,data.length+1);if((firstChar!=='{')||(firstChar!=='"')||(lastChar!=='}')||(lastChar!=='"'))
{var candidate;var firstQuote=data.indexOf('"');var lastQuote=data.lastIndexOf('"');var firstCurly=data.indexOf("{");var lastCurly=data.lastIndexOf("}");if(firstQuote&&(firstQuote!=lastQuote)&&(!lastCurly||(lastQuote>lastCurly)))
{candidate=data.slice(firstQuote,lastQuote+1);return candidate;}
else if(firstCurly&&(firstCurly!=lastCurly)&&(!lastQuote||(lastCurly>lastQuote)))
{candidate=data.slice(firstCurly,lastCurly+1);return candidate;}}}
return data;},success:function(data,status)
{if(options.ignoreStack||(window.ajax_request_version==options.version))
{if(data.redirect)
{alert(sprintf(__('Session expired. You will be redirected to "%s" page.'),data.redirect));document.location=data.redirect;return;}
if(options.onSuccess&&!data.errors){options.onSuccess(data,status);}
doSetCacheAJAX(options,data);}
if(options.lock){doAjaxUnlock(options.lock);}},error:function(XMLHttpRequest,status,errorThrown)
{if(options.ignoreStack||(window.ajax_request_version==options.version))
{if(options.onError){options.onError(XMLHttpRequest,status);}
onAjaxError(XMLHttpRequest,status);}
if(options.lock){doAjaxUnlock(options.lock);}},cache:false});var request={xhr:xhr,options:options};return request;}
function __(str)
{if((window.l10n)&&str&&l10n[str])
{str=l10n[str];}
return str;}
function doGetCacheAJAX(options)
{if(glCache&&options.cacheId)
{var cache=glCache.getData(options.cacheId);if(cache)
{if(cache.errors&&options.onError)
{options.onError(cache.errors);}
else if(options.onSuccess)
{options.onSuccess(cache);}
return true;}}
return false;}
function doSetCacheAJAX(options,data)
{if(glCache&&options.cacheId&&!options.noCache)
{return glCache.setData(options.cacheId,data,options.cacheExpire);}}
function doCancelAjax(id)
{if(!mm||!mm.ajaxRequests)return;var requests=mm.ajaxRequests[id];jQuery(requests).each(function()
{if(this.options)
{if(this.options.lock)
doAjaxUnlock(this.options.lock);}
if(this.xhr)
{this.xhr.abort();}});delete mm.ajaxRequests[id];mm.ajaxRequests[id]=null;}
function doAddAjax(r,id)
{if(!window.mm)
window.mm={};if(!mm.ajaxRequests)
mm.ajaxRequests=[];if(!mm.ajaxRequests[id])
mm.ajaxRequests[id]=[];var requests=mm.ajaxRequests[id];requests.push(r);return requests;}
function onAjaxError(xhr,status)
{var errinfo={errcode:status};if(xhr.status!=200)
{errinfo.message=xhr.statusText;}
else
{errinfo.message=__('Incorrect response data :'+xhr.responseText);}
if(status=='parsererror')
{alert(__('[AJAX ERROR] ')+errinfo.message);}}
function addMessages(messages,classes,parent)
{var content='';jQuery(messages).each(function(){content=content+'<li>'+this+'</li>';});if(content!='')
{var str='<div class="'+classes+'"><ul>'+content+'</ul></div>';parent.prepend(str);}}
function processMessages(data,parentElement,scrollContainer)
{parentElement=s(parentElement||'message-container');if(!empty(data.pageMessages))
{addMessages(data.pageMessages,'message-container',parentElement);}
if(!empty(data.pageErrors))
{addMessages(data.pageErrors,'message-container',parentElement);}
if(scrollContainer)
{s(scrollContainer)[0].scrollTop=0;}
return true;}
function clearMessages(parentElement)
{parentElement=s(parentElement||'mm-messages-container');jQuery('.message-container',parentElement).remove();}
function doAjaxLock(element)
{if(!element)return;jQuery(element).show();jQuery(element).css('disabled','disabled');if(!element.lockArea)
element.lockArea=jQuery('<div class="lock-area"></div>');if(!element.lockAreaTitle)
element.lockAreaTitle=jQuery('<div class="lock-area-title"></div>');try
{jQuery(element.lockArea).bgiframe();}
catch(e)
{}
arrangeElementAbove(element.lockArea,element,true,null,98);var posDelta={top:element.offsetHeight/2-10,left:element.offsetWidth/2-110};arrangeElementAbove(element.lockAreaTitle,element.lockArea[0],false,posDelta,99);viewAjaxLock(element,true);if(!element.lockCount){element.lockCount=0;}
element.lockCount++;}
function doAjaxUnlock(element)
{if(!element||!element.lockCount)
return;element.lockCount--;if(element.lockCount==0)
{if(element.lockAreaTitle)
element.lockAreaTitle.remove();if(element.lockArea)
element.lockArea.remove();jQuery(element).css('disabled','');}}
function viewAjaxLock(element,isVisible)
{if(element&&element.lockArea&&element.lockAreaTitle)
{if(isVisible)
{element.lockArea.show();element.lockAreaTitle.show();repositionAjaxLock(element);}
else
{element.lockArea.hide();element.lockAreaTitle.hide();}}}
function repositionAjaxLock(element,isCopySize)
{if(!element.lockArea||!element.lockAreaTitle)return;repositionElementAbove(element.lockArea,element,null);if(isCopySize)
{jQuery(element.lockArea).height(element.offsetHeight).width(element.offsetWidth);}
var posDelta={top:element.offsetHeight/2-10,left:element.offsetWidth/2-110};repositionElementAbove(element.lockAreaTitle,element.lockArea[0],posDelta);}
function arrangeElementAbove(element,target,isCopySize,posDelta,zIndex)
{if(!repositionElementAbove(element,target,posDelta))return;if(isCopySize)
{element.height(target.offsetHeight).width(target.offsetWidth);}
if(zIndex)
{element.css('z-index',zIndex);}
jQuery(document.body).append(element);return element;}
function repositionElementAbove(element,target,posDelta)
{if(!element||!target)
return false;var t=jQuery(target).offset().top;var l=jQuery(target).offset().left;if(posDelta&&posDelta.top)
t=t+posDelta.top;if(posDelta&&posDelta.left)
l=l+posDelta.left;element.css('position','absolute').css('top',t).css('left',l);return true;}
function applyTableCheckboxes(table)
{var mainBox=jQuery('TH.checkbox INPUT',table);mainBox.unbind('click');mainBox.bind('click',function(){if(this.checked){jQuery('TD.checkbox INPUT',table).attr('checked','checked');}
else{jQuery('TD.checkbox INPUT',table).removeAttr('checked');}});}jQuery.fn.center=function(){this.css("position","absolute");this.css("top",((jQuery(window).height()-this.outerHeight())/ 2)+jQuery(window).scrollTop()+"px");this.css("left",((jQuery(window).width()-this.outerWidth())/ 2)+jQuery(window).scrollLeft()+"px");return this;}
var MM_Ajax=Class.extend({init:function(custom_url,module,action,method){this.url=wpadmin_url+'admin-ajax.php';this.module=module;this.action=action;this.useLoader=true;this.method=method;this.postvars="";this.hideButton=true;this.dataType='json';this.response="";if(isAdministrationSection!=undefined){if(!isAdministrationSection){this.lockarea="main";}
else{this.lockarea="wpwrap";}}
else{this.lockarea="wpwrap";}},dump:function(type)
{if(type=='post')
alert("class.ajax.js:\n\n"+this.postvars);else if(type=='response')
alert("class.ajax.js:\n\n"+this.response);},send:function(data,lockdiv,returnobj,returnfunc,datatype)
{this.postvars="";this.response="";for(var eachvar in data)
{this.postvars+=eachvar+": "+data[eachvar]+"\n";}
if(!lockdiv)
lockdiv='body';data.method=this.method;data.action=this.action;data.module=this.module;var responseType=this.dataType;if(datatype!=undefined)
{responseType=datatype;}
var self=this;this.startLoader();var r=doAjax({sjax:this.async===false?false:true,data:data,lock:jQuery(''+lockdiv)[0],url:this.url,dataType:responseType,onSuccess:function(data)
{self.stopLoader(data);for(var eachvar in data)
{this.response+=eachvar+": "+data[eachvar]+"\n";}
eval(returnobj+"."+returnfunc+"(data)");},onError:function(e){self.stopLoader();}});doAddAjax(r,this.module+"Request");},createLoaderDiv:function()
{jQuery("<div id=\"mm-progressbar-container\" style='position:absolute;left: 38%; top:30%; z-index: 10000; filter: alpha(opacity=100);opacity:1;' ><div id=\"mm-progressbar\" style=\"width:350px; height:22px; border: 1px solid #ccc;\"></div></div>").hide().appendTo("body").fadeIn();},lock:function()
{jQuery("<div id=\"mm-lockscreen-container\" disabled=\"disabled\" style='background-color:#f7f7f7; position:absolute;left: 0%; top:0%; width:100%; height:100%; z-index: 9999; filter: alpha(opacity=30);opacity:0.3;' ></div>").hide().appendTo("body").fadeIn();},unlock:function()
{if(jQuery("#mm-lockscreen-container").length)
{jQuery("#mm-lockscreen-container").remove();}},startLoader:function(lockarea){if(this.hideButton){if(smartTagLibDialog!=undefined){try{smartTagLibDialog.preventDblClick();}catch(e){}}
else if(mmdialog_js!=undefined){try{mmdialog_js.preventDblClick();}catch(e){}}}
if(!this.useLoader){return false;}
if(jQuery("#mm-progressbar-container").length){return false;}
var center=" ";jQuery("<style type='text/css'> .ui-progressbar-value { "+center+" background-image: url('"+globalurl+"/resources/images/pbar-animated.gif');} </style>").appendTo("head");this.createLoaderDiv();if(lockarea!=undefined){this.lockarea=lockarea;}
this.lock();jQuery("#mm-progressbar-container").center();jQuery("#mm-lockscreen-container").center();if(jQuery().progressbar){jQuery("#mm-progressbar").progressbar({value:100});}},stopLoader:function(response){if(this.hideButton){if(smartTagLibDialog!=undefined){try{if(response!=undefined){if(response.type!=undefined){if(response.type=='error'){smartTagLibDialog.releaseButton();}}
else{smartTagLibDialog.releaseButton();}}
else{smartTagLibDialog.releaseButton();}}catch(e){}}
else if(mmdialog_js!=undefined){try{if(response!=undefined){if(response.type!=undefined){if(response.type=='error'){mmdialog_js.releaseButton();}}
else{mmdialog_js.releaseButton();}}
else{mmdialog_js.releaseButton();}}catch(e){}}}
this.unlock();jQuery("#mm-progressbar-container").remove();},});jQuery.fn.isBound=function(type,fn){var data=this.data('events')[type];if(data===undefined||data.length===0){return false;}
return(-1!==jQuery.inArray(fn,data));};var clickCount=0;var allowDblClick=false;var dialogIsOpen=false;var MM_DialogJS=Class.extend({init:function(dblClick)
{this.method="performAction";this.action="module-handle";var size=this.getWindowSize();this.dialogWidth=650;this.dialogHeight=size.height-130;},allowDoubleClick:function(allow){allowDblClick=allow;},getWindowSize:function(){var size={height:0,width:0,};if(typeof(window.innerWidth)=='number'){size.width=window.innerWidth;size.height=window.innerHeight;}
else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){size.width=document.documentElement.clientWidth;size.height=document.documentElement.clientHeight;}
else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){size.width=document.body.clientWidth;size.height=document.body.clientHeight;}
return size;},showDialog:function(dialogId,module,width,height,title,params,methodReplace,objName)
{this.dialogId=dialogId;if(title!=undefined){this.dialogTitle=title;}
if(width==undefined||width==""){this.width=this.dialogWidth;}
else{this.width=width;}
if(height==undefined||height==""){this.height=this.dialogHeight;}
else{this.height=height;}
var values={mm_action:"showDialog"};if(params!=undefined&&params!=""){if(typeof params=="object"){for(var key in params){try{if(typeof params[key]=="string"){eval("values."+key+"='"+params[key].replace(/(\')/g,"")+"'");}
else
{eval("values."+key+"='"+params[key]+"'");}}
catch(e)
{alert(e+" : "+key);}}}else{values.id=params;}}
var methodName=this.method;if(methodReplace!=undefined&&methodReplace!=""){methodName=methodReplace;}
var obj="mmdialog_js";if(objName!=undefined&&objName!=""){obj=objName;}
var ajax=new MM_Ajax(false,module,this.action,methodName);ajax.send(values,false,obj,"showDialogCallback");},createDiv:function(id)
{if(jQuery("#"+id).length==0)
{jQuery("<div id='"+id+"' style='font-size: 14px;'></div>").hide().appendTo("body").fadeIn();}},displayMessage:function(message,width,height){this.width=450;this.height=300;if(width!=undefined){this.width=width;}
if(height!=undefined){this.height=height;}
this.dialogId='mm-response';this.createDiv(this.dialogId);this.dialogError(message);},dialogError:function(message){if(jQuery("#mm-progressbar-container").length){jQuery("#mm-progressbar-container").hide();}
if(this.dialogTitle==undefined&&this.dialogTitle!=""){this.dialogTitle="Alert";}
jQuery("#"+this.dialogId).dialog({width:this.width,height:this.height,title:"Alert",buttons:{"OK":function(){mmdialog_js.close(this.dialogId)}}});jQuery("#"+this.dialogId).html(message);jQuery("#"+this.dialogId).dialog("open");},disableDialog:function(dialogId){jQuery("#"+dialogId).dialog();if(dialogId==undefined){jQuery("#"+this.dialogId).dialog("option","disabled",true);}
else{jQuery("#"+dialogId).dialog("option","disabled",true);}},getDialogButton:function(dialogSelector,buttonName)
{var buttons=jQuery(dialogSelector+' .ui-dialog-buttonpane button');for(var i=0;i<buttons.length;++i)
{var jButton=jQuery(buttons[i]);if(jButton.text()==buttonName)
{return jButton;}}
return null;},disableButton:function(dialogId,buttonName){jQuery("#"+dialogId).parent().find("button").each(function(){if(jQuery(this).text()==buttonName){jQuery(this).attr('style','filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;');jQuery(this).attr('disabled','disabled');}});},enableButton:function(dialogId,buttonName){jQuery("#"+dialogId).parent().find("button").each(function(){if(jQuery(this).text()==buttonName){jQuery(this).attr('style','filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity: 1;opacity: 1;');jQuery(this).removeAttr('disabled');}});},findButton:function(dialogId){var button=null;jQuery("#"+dialogId).parent().find("button").each(function(){if(button==null&&!jQuery(this).is(":disabled")){button=jQuery(this);}});return button;},bindEnterKey:function(buttonObj,areaId){var contentArea="#"+areaId;var keyFunc=function(event){var shouldEnter=true;jQuery(contentArea).find("textarea").each(function(){if(jQuery(this).is(":focus")){shouldEnter=false;}});if(!shouldEnter){return true;}
var keycode=(event.keyCode?event.keyCode:(event.which?event.which:event.charCode));if(keycode==13){jQuery(buttonObj).click();jQuery(contentArea).unbind("keydown");return false;}else{return true;}};jQuery(contentArea).unbind("keydown");jQuery(contentArea).bind("keydown",keyFunc);},showDialogCallback:function(data)
{if(data.type!=undefined&&data.type=="error")
{if(data.message.length>0)
{this.dialogError(data.message);return false;}
if(data.message.url!=undefined)
{document.location.href=data.message.url;return false;}}
else if(data.message!=undefined&&data.message.length>0)
{jQuery("#"+this.dialogId).dialog();jQuery("#"+this.dialogId).dialog("option","width",this.width);jQuery("#"+this.dialogId).dialog("option","height",this.height);jQuery("#"+this.dialogId).dialog("option","minWidth",this.width);jQuery("#"+this.dialogId).dialog("option","minHeight",this.height);if(this.dialogTitle!=undefined){jQuery("#"+this.dialogId).dialog("option","title",this.dialogTitle);}
jQuery("#"+this.dialogId).dialog("option","modal",true);jQuery("#"+this.dialogId).html(data.message);jQuery("#"+this.dialogId).dialog("open");this.bindEnterKey(this.findButton(this.dialogId),this.dialogId);dialogIsOpen=true;this.releaseButton();}
else{alert("No data received");}},preventDblClick:function(){if(!allowDblClick){if(dialogIsOpen){var button=this.findButton(this.dialogId);if(button!=null){button.hide();}}}},releaseButton:function(){if(!allowDblClick){var button=this.findButton(this.dialogId);if(button!=null){button.show();}}},close:function(dialogId)
{dialogIsOpen=false;try
{if(dialogId==undefined){jQuery("#"+this.dialogId).dialog("close");}
else{jQuery("#"+dialogId).dialog("close");}}
catch(e){}}});var mmdialog_js=new MM_DialogJS();var MM_Form=Class.extend({init:function(field_wrapper){this.divwrapper=field_wrapper;this.postvars="";},dump:function()
{alert(this.postvars);},getFields:function()
{var $inputs=jQuery('#'+this.divwrapper+' input, #'+this.divwrapper+' textarea, #'+this.divwrapper+' input:radio, #'+this.divwrapper+' input:checkbox, #'+this.divwrapper+' select');var values={};$inputs.each(function(i,el){var elem_name=el.id.replace(/-/g,"_");if(jQuery(el).val()!=null){values[elem_name]=jQuery(el).val();}});for(var eachvar in values)
{this.postvars+=eachvar+": "+values[eachvar]+"\n";}
return values;},getFormContents:function()
{var $inputs=jQuery('#'+this.divwrapper+' input, #'+this.divwrapper+' textarea, #'+this.divwrapper+' input:radio, #'+this.divwrapper+' input:checkbox, #'+this.divwrapper+' select');var values={};$inputs.each(function(i,el){var elem_name=el.name;if(jQuery(el).val()!=null){values[elem_name]=jQuery(el).val();}});for(var eachvar in values)
{this.postvars+=eachvar+": "+values[eachvar]+"\n";}
return values;}});var MM_SmartTagLibraryViewJS=MM_Core.extend({showSmartTagLibrary:function(contentAreaId)
{this.contentAreaId=contentAreaId;var values={mm_module:"smarttag.library"};smartTagLibDialog.showDialog("mm-smarttag-library-dialog",this.module,800,"","SmartTag Library",values,"","smartTagLibDialog");},toggleSmartTagGroup:function(id)
{jQuery("#mm-smarttag-group"+id+"-children").toggle();jQuery("#mm-smarttag-group"+id+"-open-img").toggle();jQuery("#mm-smarttag-group"+id+"-closed-img").toggle();},smartTagClickHandler:function(file)
{jQuery("#mm-smarttag-documentation").load(file);},showIdLookup:function(contentAreaId)
{this.contentAreaId=contentAreaId;var values={mm_module:"smarttag.idlookup"};smartTagLibDialog.showDialog("mm-id-lookup-dialog",this.module,550,350,"ID Lookup",values,"","smartTagLibDialog");},lookupIds:function()
{var values={mm_action:"getLookupGrid",objectType:jQuery("#mm-object-type-selection").val()};var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,"stl_js","lookupIdsCallback");},lookupIdsCallback:function(data)
{jQuery("#mm-lookup-results-container").html(data);},insertContent:function(content)
{if(this.contentAreaId=="wordpress"){this.insertText("content",content,false);}
else{var html=jQuery("#"+this.contentAreaId).val();jQuery("#"+this.contentAreaId).val(html+content);}
smartTagLibDialog.close();},insertTemplate:function(templateType,templateName)
{if(templateType!="")
{var insertOk=confirm("Are you sure you want to insert the "+templateName+" template? ");if(insertOk)
{var values={mm_action:"getPageTemplate",mm_template_type:templateType};var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,"stl_js","insertTemplateCallback");}}},insertTemplateCallback:function(data)
{this.contentAreaId=="wordpress";this.insertText("content",data,false);},normalizeElement:function(textarea)
{textarea=textarea||'content';if(textarea.constructor==String){textarea=document.getElementById(textarea);}
return textarea;},insertText:function(textarea,text,forceTextMode)
{textarea=this.normalizeElement(textarea);if(typeof tinyMCE!='undefined'&&(ed=tinyMCE.activeEditor)&&!ed.isHidden()&&!forceTextMode)
{ed.focus();if(tinymce.isIE){ed.selection.moveToBookmark(ed.windowManager.bookmark);}
ed.selection.setContent(text);return;}
if((textarea)&&(document.selection&&textarea.selection))
{var scrollTop=textarea.scrollTop;textarea.focus();var sel=textarea.selection;sel.text=text;if(sel.text.length>0)
{sel.collapse(false);}
sel.select();textarea.focus();textarea.scrollTop=scrollTop;}
else if((textarea)&&(textarea.selectionStart||textarea.selectionStart=='0'))
{var startPos=textarea.selectionStart,endPos=textarea.selectionEnd,cursorPos=endPos,scrollTop=textarea.scrollTop;if(startPos!=endPos)
{textarea.value=textarea.value.substring(0,startPos)
+text
+textarea.value.substring(endPos,textarea.value.length);cursorPos+=text.length-textarea.value.substring(startPos,endPos).length;}
else{textarea.value=textarea.value.substring(0,startPos)
+text
+textarea.value.substring(endPos,textarea.value.length);cursorPos+=text.length;}
textarea.focus();textarea.selectionStart=cursorPos;textarea.selectionEnd=cursorPos;textarea.scrollTop=scrollTop;}
else{jQuery(textarea).val(jQuery(textarea).val()+text);}}});var smartTagLibDialog=new MM_DialogJS();var stl_js=new MM_SmartTagLibraryViewJS("MM_SmartTagLibraryView","");var MM_PaymentUtilsViewJS=MM_Core.extend({showPaymentOptions:function(userId,accessType,accessTypeId,lastActionParams)
{var values={mm_module:"payment_options",userId:userId,accessType:accessType,accessTypeId:accessTypeId,lastActionParams:lastActionParams};mm_pymtdialog.showDialog("mm-payment-options-dialog",this.module,465,500,"Payment Options",values,"","mm_pymtdialog");},getPaymentOptionsList:function()
{productId=jQuery("#mm-product-selector").val();userId=jQuery("#mm-user-id").val();if(productId!=0&&userId!=0)
{var values={mm_action:"getPaymentOptionsList",mm_product_id:productId,mm_user_id:userId};var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,"pymtutils_js","paymentOptionsListCallback");}
else
{jQuery("#mm-payment-options-list").hide();}},paymentOptionsListCallback:function(data)
{if(data==undefined)
{jQuery("#mm-payment-options-list").hide();alert("No response received");}
else if(data.type=="error")
{jQuery("#mm-payment-options-list").hide();alert(data.message);}
else
{jQuery("#mm-payment-options-list").html(data.message);jQuery("#mm-payment-options-list").show();}},changeMembershipStatus:function(memberId,membership_id,newStatus,redirectUrl)
{var msg="";switch(parseInt(newStatus))
{case 2:msg="Are you sure you want to cancel your membership?";break;case 4:msg="Are you sure you want to pause your membership?";break;default:msg="Invalid status '"+newStatus+"'";break;}
this.id=memberId;var values={mm_id:this.id,mm_membership_id:membership_id,mm_new_status:newStatus,mm_redirect_url:redirectUrl,mm_action:"changeMembershipStatus"};var doContinue=confirm(msg);if(doContinue)
{var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,'pymtutils_js',"accessRightsUpdateHandler");}},changeBundleStatus:function(memberId,bundleId,newStatus,redirectUrl)
{var msg="";switch(parseInt(newStatus))
{case 2:msg="Are you sure you want to cancel this bundle?";break;case 4:msg="Are you sure you want to pause this bundle?";break;default:msg="Invalid status '"+newStatus+"'";break;}
this.id=memberId;var values={mm_id:this.id,mm_bundle_id:bundleId,mm_new_status:newStatus,mm_redirect_url:redirectUrl,mm_action:"changeBundleStatus"};var doContinue=confirm(msg);if(doContinue)
{var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,'pymtutils_js',"accessRightsUpdateHandler");}},applyFreeBundle:function(memberId,bundleId,redirectUrl)
{this.id=memberId;var values={mm_id:this.id,mm_bundle_id:bundleId,mm_redirect_url:redirectUrl,mm_action:"applyFreeBundle"};var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,'pymtutils_js',"accessRightsUpdateHandler");},showPaymentConfirmation:function(userId,productId,height,width,isGift)
{var values={mm_module:"payment_confirmation",userId:userId,productId:productId,isGift:isGift};if(!height)
{height=200;}
if(!width)
{width=450;}
mm_pymtdialog.showDialog("mm-payment-confirmation-dialog",this.module,width,height,"Order Confirmation",values,"","mm_pymtdialog");},showAdminPaymentConfirmation:function(userId,productId)
{var values={mm_action:"placeOrderCardOnFile",mm_product_id:productId,mm_user_id:userId,mm_source:"admin"};if(jQuery("#mm-affiliate").val()!="")
{values.mm_affiliate=jQuery("#mm-affiliate").val();}
if(jQuery("#mm-subaffiliate").val()!="")
{values.mm_subaffiliate=jQuery("#mm-subaffiliate").val();}
var msg="Are you sure you want to charge the member's card on file for this product?";var doContinue=confirm(msg);if(doContinue)
{var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,"pymtutils_js","placeOrderCardOnFileCallback");}},placeOrderCardOnFile:function(userId,productId,sourceId,isGift)
{var values={};var doContinue=true;if(jQuery("#mm_1clickpurchase_form").length>0)
{doContinue=oneclickpurchase_js.validate();if(doContinue)
{var form_obj=new MM_Form('mm_1clickpurchase_form');values=form_obj.getFields();}}
if(doContinue)
{pymtutils_js.closeDialog(mm_pymtdialog);values.mm_action="placeOrderCardOnFile";values.mm_product_id=productId;values.mm_user_id=userId;values.mm_source=sourceId;values.mm_is_gift=isGift;var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,"pymtutils_js","placeOrderCardOnFileCallback");}},placeOrderCardOnFileCallback:function(data)
{if(data==undefined)
{alert("There was an error placing your order");}
else if(data.type=="error"||data.status==4)
{alert(data.message);}
else
{document.location.href=data.url;}},accessRightsUpdateHandler:function(data)
{if(data.type=="error")
{if(data.message.length>0)
{alert(data.message);return false;}
return false;}
else
{if(data.url!=undefined&&data.url.length>0)
{document.location.href=data.url;}
else
{if(data.message!=undefined&&data.message.length>0)
{alert(data.message);}
var url=document.location.href;var index=url.indexOf("message");if(index!=-1)
{url=url.substring(0,index-1);}
document.location.href=url;}}},checkIfPaymentRequired:function(accessType,accessTypeId,callbackFunction,callbackReference)
{if(accessType==undefined||accessType=="")
{alert("Missing required parameter 'accessType' in mm-payment_utils.js.checkIfPaymentRequired");return false;}
if(accessTypeId==undefined||accessTypeId=="")
{alert("Missing required parameter 'accessTypeId' in mm-payment_utils.js.checkIfPaymentRequired");return false;}
if(callbackFunction==undefined||callbackFunction=="")
{alert("Missing required parameter 'callbackFunction' in mm-payment_utils.js.checkIfPaymentRequired");return false;}
this.callbackReference=callbackReference;this.callbackFunction=callbackFunction;var values={mm_action:"checkIfPaymentRequired",accessType:accessType,accessTypeId:accessTypeId};var ajax=new MM_Ajax(false,this.module,this.action,this.method);ajax.send(values,false,"pymtutils_js","dfltCallbackHandler");},dfltCallbackHandler:function(data)
{result=false;if(data!=undefined)
{if(data.type=="error")
{result=data;}
else
{result=data.message;}}
else
{result=false;}
if(this.callbackReference!=undefined&&this.callbackReference!="")
{eval(this.callbackReference+"."+this.callbackFunction+"(result)");}
else
{eval(this.callbackFunction+"(result)");}}});var callbackReference="";var callbackFunction="";var mm_pymtdialog=new MM_DialogJS();var pymtutils_js=new MM_PaymentUtilsViewJS("MM_PaymentUtilsView","");