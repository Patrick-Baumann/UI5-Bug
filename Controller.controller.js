sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/MockServer",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/OperationMode",
	"sap/m/ToolbarSpacer"
], function(Controller, MockServer, ODataModel, JSONModel, OperationMode, ToolbarSpacer) {
	"use strict";

	var sServiceUrl = "http://my.test.service.com/";

	return Controller.extend("sap.ui.table.sample.OData.Controller", {

	

		formatDimensions : function(sWidth, sHeight, sDepth, sUnit) {
			if (sWidth && sHeight && sDepth && sUnit) {
				return sWidth + "x" + sHeight + "x" + sDepth + " " + (sUnit.toLowerCase());
			}
			return null;
		},

		getTable : function(){
			return this.byId("table");
		},

		onModelRefresh : function() {
			this.getTable().getBinding().refresh(true);
		},

		onOperationModeChange : function(oEvent) {
			this.getTable().bindRows({
				path: "/Airports",
				parameters: {operationMode: oEvent.getParameter("item").getKey()}
			});
			this.initBindingEventHandler();
			this.onModelRefresh();
		},

		initBindingEventHandler : function(){
			var oBusyIndicator = this.oBusyIndicator;
			var oTable = this.getTable();
			var oBinding = oTable.getBinding();

			oBinding.attachDataRequested(function(){
				oTable.setNoData(oBusyIndicator);
			});
			oBinding.attachDataReceived(function(){
				oTable.setNoData(null); //Use default again ("No Data" in case no data is available)
			});
		}

	});

});