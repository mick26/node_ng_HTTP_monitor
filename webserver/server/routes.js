/* ========================================================== 
ROUTE DECLARATIONS

============================================================ */
'use strict';


var netMonRoutes = require('./routes/netMonRoutes.js');//Route definition file


module.exports = function (app, storage) {

	/*================================================================
	- $http get
	=================================================================*/
	app.get('/getdata', netMonRoutes.getData);
	app.post('/getdetails', netMonRoutes.getDetails);
}