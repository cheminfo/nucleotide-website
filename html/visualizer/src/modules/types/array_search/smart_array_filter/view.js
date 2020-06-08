'use strict';define(["jquery","modules/default/defaultview","lodash"],function(a,b,c){"use strict";function d(){this._query=null,this._data=null,this._originalData=null}return a.extend(!0,d.prototype,b,{inDom:function(){this.module.getDomContent().empty();var b=this._fontSize=this.module.getConfiguration("fontSize"),d=this._div=a("<div>").css({width:"100%",fontSize:`${b}px`}).appendTo(this.module.getDomContent()),e=this._input=a("<input type=\"text\" />").css({padding:"0px 0px",margin:"0",display:"inline-block",fontSize:`${b}px`}).attr("placeholder",this.module.getConfiguration("placeholder","")).appendTo(d);this._query||(this._query=this.module.getConfiguration("initialValue")),e.val(this._query);var f=this.module.getConfiguration("debounce");e.on("keyup",c.debounce(()=>{var a=e.val();this.onQuery(a)},f)),d.append("&nbsp;<i class=\"fa fa-search\"></i>"),this.resizeInput(),this.resolveReady()},onQuery:function(a){a===this._query||(this._query=a,this.module.controller.onQuery(a))},blank:{input:function(){this._data=null,this._originalData=null}},update:{input:function(a){this._data=JSON.parse(JSON.stringify(a)),this._originalData=a.slice(),this.module.controller.onQuery(this._query||"")}},onActionReceive:{clearQuery:function(){this._input.val(""),this.onQuery("")},setQuery:function(a){a+="",this._input.val(a),this.onQuery(a)},appendQuery:function(a){a+="",this._query&&a&&(a=`${this._query} ${a}`),this._input.val(a),this.onQuery(a)}},resizeInput:function(){var a=this._div.width();this._input.css("width",a-2*this._fontSize)},onResize:function(){this.resizeInput()}}),d});
