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

define(["jquery", "./Engine", "./Session", "./Flow", "./Store", "./Message", "./Functions", "./Configure"], function($, Engine, Session, Flow, Store, Message, Functions, conf) {
	
	// to avoid being over optimized
	Engine.COPYRIGHT = 
	Session.COPYRIGHT =
	Flow.COPYRIGHT =
	Store.COPYRIGHT = 
	Message.COPYRIGHT = 
	Functions.COPYRIGHT = "UNICOM";
	
	Engine.establishSession = $.proxy(Session.establish, Session);
	Engine.destroySession = $.proxy(Session.destroy, Session);

	Engine.CONF = conf;
	
	return Engine;
});