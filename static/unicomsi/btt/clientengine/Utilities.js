/*_
 * UNICOM(R) Multichannel Bank Transformation Toolkit Source Materials 
 * Copyright(C) 2011 - 2017 UNICOM Systems, Inc. - All Rights Reserved 
 * Highly Confidential Material - All Rights Reserved 
 * THE INFORMATION CONTAINED HEREIN CONSTITUTES AN UNPUBLISHED 
 * WORK OF UNICOM SYSTEMS, INC. ALL RIGHTS RESERVED. 
 * NO MATERIAL FROM THIS WORK MAY BE REPRINTED, 
 * COPIED, OR EXTRACTED WITHOUT WRITTEN PERMISSION OF 
 * UNICOM SYSTEMS, INC. 818-838-0606 
 */


define(["jquery", "./Configure"], function($, conf) {
	
	var _flatJSON = function(dest, de, compositeKey){
		
		if ( de===undefined ) return;
		
		// de is field
		if (toString.call(de)!="[object Object]" && toString.call(de)!="[object Array]")
		{
			if(compositeKey) dest[compositeKey] = de;
			return;
		}
		
		// de is record or array
		for (var f in de)
		{
			_flatJSON(dest, de[f], (compositeKey && compositeKey!="") ? (compositeKey+"." + f) : f);
		}
	};
	
	return {
		
		_corsHelper : function(request, cors){
			return (cors||conf.CORS) ? $.extend(request, {
				xhrFields : {
					withCredentials: true
				},
				crossDomain: true
			}) : request;
		},
		
		isEmpty : function(value){
			return  value === undefined ||
					value === null || 
					value === "" ||
					isNaN(value);
		},
		
		flatJSON : function(json){
			var r = {};
			_flatJSON(r, json);
			return r;
		},
		
		_getInput : function(input){
			return $.extend({}, input);
		},
		
		// filter the btt state(start with dse_) from the data
		_filterBTTState : function(/* _json */ data){
			var state = {};
			for (var f in data){
				if (f.substr(0,4)=="dse_"){
					state[f] = data[f];
					delete data[f];
				}
			}
			return state;
		}
	};
	
});