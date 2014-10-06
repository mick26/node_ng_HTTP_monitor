/* ========================================================== 
ROUTE DEFINITIONS

============================================================ */
'use strict';

/* ========================================================== 
External/Internal Modules/Packages Required
============================================================ */
var moment = require('moment'); //for date time
var services_loader = require ('./../../../watchmen/lib/services.js');
var storage_factory = require ('./../../../watchmen/lib/storage/storage_factory');


var storage = storage_factory.get_storage_instance();




module.exports = {

  /* ==============================================
  Get details to complete details view
  send host and service name in post from client
  ============================================== */
  getDetails: function(req, res) {
       
   /*
    * Extract hostName and serviceName from body of POST req
    */
    var hostName = req.body.hostName;
    var serviceName = req.body.serviceName;

    var service = services_loader.load_services().filter(function(service) {
    //console.log("service= "+JSON.stringify(service)); //TEST

     /*
      * returns true if got a service and host match, OR else returns false
      */
      return(service.host.name === hostName && service.name === serviceName);

    })[0];


    //if returned false
    if (!service){
      return res.end('not found');
    }

    //if returned true
    storage.report_one(service, function (err, service) {

     /*
      * Respond to client with the following JSON which is used with details view
      */
      res.json({
        service : service,
        hostName: hostName,
        title: service.url_info,
        serviceName: serviceName,
        eventsSince : moment (+new Date() - service.remove_events_older_than_seconds * 1000),
        status: service.data ? service.data.status : 'unavailable', // no data collected yet
        critical_events: service.data ? service.data.events.filter(function(item){return item.type == 'critical';}) : [],
        warning_events: service.data ? service.data.events.filter(function(item){return item.type == 'warning';}) : []
      });

    });
  },



  /* ==============================================
  Get data about all the services, needed for list view 
  - send in JSON format
  ============================================== */
  getData: function(req, res) {
    console.log("In getData");//TEST

    var services = services_loader.load_services();

    storage.report_all(services, function (err, data) {
      res.json(data);
    });

  }

};
