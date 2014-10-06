'use strict';

/*
Ref.
http://watchmen.letsnode.com/
https://github.com/iloire/WatchMen
https://www.npmjs.org/package/express-dynamic-helpers-patch
*/


/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express = require('express');
var app = express();
var moment = require ('moment');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var colours = require('colors');

var dynamicHelpers = require('express-dynamic-helpers-patch')(app);


/* ========================================================== 
Internal Modules/Packages Required
============================================================ */
//var watchmen = require('../lib/watchmen');
//var storage_factory = require ('../lib/storage/storage_factory');

var watchmen = require('../WatchMen/lib/watchmen.js');
var storage_factory = require ('../watchmen/lib/storage/storage_factory.js');



var storage = storage_factory.get_storage_instance();

//var routes = require('./server/routes.js').add_routes(app, storage);
var routes = require('./server/routes.js');

/* ========================================================== 
Port the server will listen on
============================================================ */
app.set('port', process.env.PORT || 3000);
//var port = parseInt(process.argv[2], 10) || 3000;


/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 



/* ===================================================================
Use Middleware
==================================================================== */ 
app.use(logger('dev'));       //log every request to the console in dev
app.use(bodyParser.json());   //parse application/json

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

app.use(methodOverride());


/* ==========================================================
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public'));


//development only
if (app.get('env') === 'development') {
 // app.use(errorHandler({ dumpExceptions: true, showStack: true }));
};

//production only
if (app.get('env') === 'production') {
 // app.use(errorHandler());
};


/* ========================================================== 
Time Date Formatting 
============================================================ */
var helpers = {
    dateformat : function (req, res) {
    return function (date, format) {

      if (format==='ago'){
          return moment(date).fromNow();
      }
      else if (format==='timespan'){
        return moment(date).fromNow(true);
      }
      else {
          return moment(date).format(format || 'MMM D YYYY, hh:mm');
      }
    };

  }
};


app.dynamicHelpers(helpers);



/* ========================================================== 
ROUTES - using Express and Storage
============================================================ */
routes(app, storage);


/* ========================================================== 
Start server
============================================================ */
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d' .green, server.address().port);
});





