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

define(["jquery", "./Configure", "./Session", "./Store", "./Utilities"], function($, conf, Session, Store, utl) {

	return function(flowName) {
		
		
		var _flowName = flowName;
		var _procID = null;	// private
		var _state = "initial"; // private
		var _store = new Store();
		
		this._start = function(input, success, error, context){
			
			if (context != true) context = this;

			var data = $.extend({},
							input,
							Session.bttState
						);
			data["dse_operationName"] = _flowName;
			// data["dse_processorState"] = "initial";
			data["dse_nextEventName"] = "start";
			
			$.ajax(conf.REQUEST_HANDLER.FLOW, utl._corsHelper({
				async : false,
				"data" : utl.flatJSON(data),
				type: "POST",
				dataType:"json",
				headers: {
					"BTT-action":"flow"
				}
			}))
			.done(function (response){
				var params = response.params;
				
				console.debug("Engine.launchFlow : " + _flowName);
				Session._updateBTTState(params);
				// update status
				_procID = params["dse_processorId"];
				_state = params["dse_processorState"];
				// update the store
				_store.update(response);
				
				if (typeof success == "function") success.call(context, _store, this);
			})
			.fail(function(response){
				console.error(response);
				if (typeof error == "function") error.call(context, response, this);
			});
			
			return this.procID ? true : false;
		};
		
		
		/**
		 * Submit the user input to server(flow) and fire the exit event of the current User State.
		 * The flow will be transited to the next state as the specified event name.
		 * Please note that this method will validate the input data automatically at the beginning of its execution,
		 * if the validation was failed it will call the error call-back function and return false.
		 * Params:
		 * 		eventName, the exit event name, the flow processor will use this name to determine the next state
		 * 		input, the data should be submitted to server, in JSON format
		 * 		success, the call-back function on success, function(store, flow)
		 * 		error, the call-back function on error, function(response, flow, errorFields)
		 * 				errorFields, the error fields that can't pass the validation, undefined if this NOT a validation error
		 * 		context, the context(this) of the above call-back function, null means this flow instance
		 * 
		 * Return:
		 * 		true, success
		 * 		false, failed
		 */
		this.changeEvent = function(eventName, input, success, error, context){
			
			if (context != true) context = this;
			
			input = input ? _store.extractInputData(input) : {};
			_store.push(input);
			
			if (!_store.validate(input))
			{
				var errorFields = _store.getErrorFields(input);
				console.debug("Flow.changeEvent()-->validate", errorFields);
				if (typeof error == "function") error.call(context, null, this, errorFields);
				return false;
			}
			
			var data = $.extend({},
//					_store.extractInputData(input),
					input,
					Session.bttState
				);
			data["dse_operationName"] = _flowName;
			data["dse_processorId"] = _procID;
			data["dse_processorState"] = _state;
			data["dse_nextEventName"] = eventName;
			
			var isOK = false;
			
			$.ajax(conf.REQUEST_HANDLER.FLOW, utl._corsHelper({
				async : false,
				"data" : utl.flatJSON(data),
				type: "POST",
				dataType:"json",
				headers: {
					"BTT-action":"flow"
				}
			}))
			.done(function (response){
				var params = response.params;
				
				Session._updateBTTState(params);
				// update status
				_state = params["dse_processorState"];
				console.debug("Flow.changeEvent: " + eventName);
				// update the store
				_store.update(response);
				
				isOK = true;
				// create the flow
				if (typeof success == "function") success.call(context, _store, this);
			})
			.fail(function(response){
				console.error("Flow.changeEvent - error: ", response);
				if (typeof error == "function") error.call(context, response, this);
			});
			
			return isOK;
		};
		
		
		/**
		 * Execute an operation under flow(context).
		 * Please note that the context of this operation would be chained under the flow context, 
		 * which means it can access its own operation context, its parent flow context, its parent session context and the application(root) context.
		 * Please note that this method will validate the input data automatically at the beginning of its execution,
		 * if the validation was failed it will call the error call-back function and return false.		 
		 * Params:
		 * 		operationName, the name of the operation
		 * 		input, the data should be submitted to server, in JSON format
		 * 		success, the call-back function on success, function(store, flow)
		 * 		error, the call-back function on error, function(response, flow, errorFields)
		 * 				errorFields, the error fields that can't pass the validation, undefined if this NOT a validation error
		 * 		context, the context(this) of the above call-back function, null means this flow instance
		 */
		this.execOperation = function(operationName, input, success, error, context){

			if (context != true) context = this;

			input = input ? _store.extractInputData(input) : {};
			_store.push(input);
			
			if (!_store.validate(input))
			{
				var errorFields = _store.getErrorFields(input);
				console.debug("Flow.changeEvent()-->validate", errorFields);
				if (typeof error == "function") error.call(context, null, this, errorFields);
				return false;
			}
			
			var data = $.extend({},
//					_store.extractInputData(input),
					input,
					Session.bttState
				);			

			data["dse_operationName"] = operationName;
			data["dse_processorId"] = _procID;
			
			return $.ajax(conf.REQUEST_HANDLER.OP_FLOW, utl._corsHelper({
						"data" : utl.flatJSON(data),
						type: "POST",
						dataType:"json",
						headers: {
							"BTT-action":"op_flow"
						}
					}))
					.done(function (response){

						console.debug("Engine.execOperation : " + operationName);
						
//						Session._updateBTTState(response);
						// update the store and notify
						_store.update(response);
						
						if (typeof success == "function") success.call(context, _store, this);
					})
					.fail(function(response){
						console.error("Engine.execOperation - error: ", response);
						if (typeof error == "function") error.call(context, response, this);
					});
		};
		
		/**
		 * return the name of the flow instance
		 */
		this.getName = function(){
			return _flowName;
		};
		
		
		/**
		 * return the current state name of the flow instance
		 */
		this.getState = function(){
			return _state;
		};
		
		
		/**
		 * return the store binding to this flow instance
		 */
		this.getStore = function(){
			return _store;
		};
		
		return this;
	};
});