'use strict';

/*================================================
Module - for Controllers
================================================ */
angular.module('nmApp.controllers', [])


/*================================================
HomeCtrl - Controller
================================================ */
.controller('HomeCtrl', function ($scope, $rootScope, $http, $location, $timeout, shareInfo) {

	//Going to store data as an array of objects
	$scope.dataArr = [];		//JS Array	
	var initialDataGot = "false";
	$scope.downCount = 0;

	/*
	tick() takes care of polling the server to get updated values
	*/
	(function tick() {

			$scope.downCount = 0;

			$http.get('/getdata') 
			.success(function(data, status, headers, config)  {

				if(initialDataGot == "false") {


					/**
					Push each row of JS Object on to array
					*/		
				 	for(var i=0; i < data.services.length; i++) {
						$scope.dataArr.push( data.services[i] );

						//count the number of http services/devices down
						if(data.services[i].data) {
							//console.log("data.services[i].data.prev_state.status="+data.services[i].data.prev_state.status) //TEST
							if(data.services[i].data.prev_state.status === "error")
							$scope.downCount++;							
						}
					}

					initialDataGot = "true"; //flag to indicate the array has been populated 
				}


			   /**
				* Copy the new values array index by index - I did this to reduce screen flickering 
				*/
				else {

					for(i=0; i < data.services.length; i++) {
						$scope.dataArr[i] = data.services[i];
						
						//count the number of http services/devices down
						if(data.services[i].data) {
							if(data.services[i].data.prev_state.status === "error")
							$scope.downCount++;
						}	
					}
				}


				$scope.getTheDetails = function(service, host) {

					/* ==================================================================
	 				Store values to service so they are available to other controllers
					================================================================== */
					shareInfo.setHostName(host);	
					shareInfo.setServiceName(service);

					$location.url("/details");  //render details view
				}
		})

		$timeout(tick, 4000);//delay of 4sec 
	})();
})



/*================================================
DetailsCtrl - Controller
================================================ */
.controller('DetailsCtrl', function ($scope, $rootScope, $http, $location, $routeParams, $timeout, shareInfo) {

	$scope.deviceObj = {}; //device details to be posted to server
	$scope.detailObj = {};


	/* ===============================================
	Get values from service
	=============================================== */
	$scope.deviceObj.serviceName = shareInfo.getServiceName();
	$scope.deviceObj.hostName = shareInfo.getHostName();


	/*
	tick() takes care of polling the server to get updated values
	*/
	(function tick() {

		$http.post('/getdetails', $scope.deviceObj) 

		.success(function(data, status, headers, config)  {
			$scope.detailObj = data;
		})

		.error(function(data, status, headers, config)  {
			console.log("/getdetails ERROR");
		})

			$timeout(tick, 5000);//poll server @ 5sec intervals
	})();

});


