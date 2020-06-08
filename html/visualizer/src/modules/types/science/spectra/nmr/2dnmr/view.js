'use strict';define(["modules/default/defaultview","components/jsNMR/src/nmr","jcampconverter"],function(a,b,c){"use strict";function d(){}return $.extend(!0,d.prototype,a,{init:function(){this.dom=$("<div />"),this.module.getDomContent().html(this.dom),this.resolveReady()},inDom:function(){this.nmr=new b({dom:this.dom,mode:"2d",symmetric:!0,minimap:!1})},onResize:function(){this.nmr.resize2DTo(this.width,this.height)},blank:{jcampx:function(a){this.nmr.removeSerie2DX(a)},jcampy:function(a){this.nmr.removeSerie2DY(a)},jcamp2d:function(a){this.nmr.removeSerie2D(a)},jcampxy:function(a){this.nmr.removeSerie2DX(a),this.nmr.removeSerie2DY(a)}},update:{jcampx:function(a){this.addSerieJcampXOrY(a,!0,!1)},jcampy:function(a){this.addSerieJcampXOrY(a,!1,!0)},jcampxy:function(a){this.addSerieJcampXOrY(a,!0,!0)},jcamp2d:function(a){function b(a,b,c){return 0>c&&(c+=1),1<c&&(c-=1),c<1/6?a+6*(b-a)*c:c<1/2?b:c<2/3?a+6*((b-a)*(2/3-c)):a}var d=this,e={lineColor:`rgb(${function(a,c,d){var e,f,h;if(0==c)e=f=h=d;else{var i=.5>d?d*(1+c):d+c-d*c,j=2*d-i;e=b(j,i,a+1/3),f=b(j,i,a),h=b(j,i,a-1/3)}return[Math.round(255*e),Math.round(255*f),Math.round(255*h)]}(100/360,.8,.4).join()})`,twoDColor:{fromPositive:{h:100,s:.3,l:.7},toPositive:{h:100,s:1,l:.5},fromNegative:{h:100,s:.3,l:.5},toNegative:{h:100,s:1,l:.3}}};c.convert(a.get()+"",!0).then(function(a){var b=a.contourLines;d.nmr.setSerie2D("SomeName",b,e),d.redraw()})},annotations:function(){}},addSerieJcampXOrY:function(a,b,d){var e=this,f="SomeName",g={label:"Chemical 1"};c.convert(a.get()+"",!0).then(function(a){var c=a.spectra[0].data[0];b&&e.nmr.setSerie2DX(f,c,g),d&&e.nmr.setSerie2DY(f,c,g),e.redraw()})},redraw:function(){this.nmr.redrawAll2D()}}),d});
