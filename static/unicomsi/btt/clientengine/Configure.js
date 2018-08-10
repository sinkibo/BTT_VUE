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

define({
	
//	BTTPARAMS : {
//		"SESSION_ID"	: "dse_sessionId", 
//		"APPLICATION_ID": "dse_applicationId",		
//		"PAGE_ID"		: "dse_pageId",
//		
//		"OPERATION_NAME": "dse_operationName", 
//		"PROCESSOR_ID"	: "dse_processorId",
//		"PROCESSOR_STATE" : "dse_processorState",
//		"NEXT_EVENT_NAME" : "dse_nextEventName",
//		
//		
//		"TIME_ZONE"		: "dse_timezone",
//		"LOCALE"		: "dse_locale",
//		
//		"AJAXINPUTMAP"	: "dse_ajaxInputMapping",
//		"AJAXOUTPUTMAP"	: "dse_ajaxOutputMapping",
//		"SUBMITFORM_ID"	: "dse_submitFormId",
//		"WEB_URL"		: "dse_webURL",
//		
//		"ERROR_MSG"		: "dse_errorMessages"
//	},
	
	// Enable CORS for cross domain access
	CORS : true,

	REQUEST_HANDLER: (function () {
		// var _BASE = "http://192.168.56.103:8080/BTTServerProject/"; // must be postfixed with "/"
		var _BASE = "http://10.200.0.139:8080/BTTServerProject/"; // must be postfixed with "/"
		// var _BASE = ""; // empty means the current context root
		return {
			BASE: _BASE,
			SESSION: _BASE + "openapi/session",
			LOGOUT: _BASE + "openapi/logout",
			FLOW: _BASE + "openapi/flow",
			OP_FLOW: _BASE + "openapi/op_flow",
			OPERATION: _BASE + "openapi/op"
		};
	})()
});