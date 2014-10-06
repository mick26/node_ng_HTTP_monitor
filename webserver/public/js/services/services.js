/* ============================================================
Module - just for services
============================================================= */
angular.module('nmApp.services', [])
    

    /* ============================================================
	Service - needed to pass server and host value between controllers
	============================================================= */
    .service('shareInfo', function () {
    	var serviceName = '';
        var hostName = '';

        return {
            getServiceName: function () {
                return serviceName;
            },
            setServiceName: function(value) {
                serviceName = value;
            },
            getHostName: function () {
                return hostName;
            },
            setHostName: function(value) {
                hostName = value;
            }


        };
    });