'use strict';(function(a){a.extend(!0,window,{Slick:{Formatters:{PercentComplete:function(a,b,c){return null==c||""===c?"-":50>c?`<span style="color:red;font-weight:bold;">${c}%</span>`:`<span style="color:green">${c}%</span>`},PercentCompleteBar:function(a,b,c){if(null==c||""===c)return"";var d;return d=30>c?"red":70>c?"silver":"green",`<span class="percent-complete-bar" style="background:${d};width:${c}%"></span>`},YesNo:function(a,b,c){return c?"Yes":"No"},Checkmark:function(a,b,c){return c?"<span style=\"color: green;\">&#10004;</span>":"<span style=\"color: red;\">&#10008;</span>"}}}})})(jQuery);