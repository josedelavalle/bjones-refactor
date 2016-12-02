var app = angular.module('bjonesApp', ['ngRoute', 'ngAria', 'ngMaterial', 'material.svgAssetsCache', 'ngAnimate']);

app.controller('DialogCtrl', function($scope) {

});

app.controller('bjonesController', function($scope, $mdDialog, getWheelItems, getFacebookEvents) {
	$scope.title = "b.jones";
	$scope.subtitle = "organic spa";
	$scope.streetAddress = "62 B South St. Morristown, NJ ";
	$scope.serviceCategoryList = [{name: "Swedish", description: "Swedish Massage is relaxing yet still therapeutic. It combines an array of strokes such as rolling, kneading, and percussion to improve circulation. The benefits of this type of bodywork are wide-ranging and include relief from aches and pains, decreased stress, enhanced mental clarity, and greater flexibility."},
									  {name: "Deep Tissue", description: "Deep Tissue helps relieve severe tension in muscle and connective tissue or fascia. This type of massage focuses on the muscles located below the surface of the top muscles. Deep tissue massage is often recommended for individuals who experience consistent pain, are involved in heavy physical activity (such as athletes), and patients who have sustained physical injury. It is not uncommon for receivers of deep tissue massage to have their pain replaced with a new muscle ache for a day or two"}];
	$scope.seeMap = false;
	apiKey = "AIzaSyBy34i8mK7IXxcAqmZfOEX70XZtNEt7D7s";
	$scope.mapSrc="https://maps.googleapis.com/maps/api/staticmap?center=" + $scope.streetAddress.replace(" ","+") + "&zoom=16&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=" + apiKey;
	$scope.selectedIndex = 0;
	$scope.currentNavItem = 'page1';
	getWheelItems.get().then(function (msg) {
		$scope.menuItems = msg.data;
		console.log($scope.menuItems);
	});
	

	
	fb_fields = "name,description,place,timezone,start_time,cover,url";
	getFacebookEvents.get(fb_fields).then(function (msg) {
      	$scope.facebookEvents = msg.data.data;
      	console.log($scope.facebookEvents);
  	});

	var self = this;

    self.openDialog = function($event) {
      $mdDialog.show({
        controller: DialogCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'partials/dialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      })
    }

	$scope.changeCategory = function() {
		$scope.selectedIndex = this.$index;
	};

});

app.factory('getFacebookEvents', function ($http) {
    return {
        get: function (fb_fields) {
        	fb_page_id = "628344893968942";
			access_token = "1691046484469603|dTJsfLPx5m5uppXQ4A5Flw49WFs";
			
        	url = "https://graph.facebook.com/v2.7/" + fb_page_id + "/events/attending/?fields=" + fb_fields + "&access_token=" + access_token;
        	console.log(url);
            return $http.get(url);
        }
    };
});

app.factory('getWheelItems', function ($http) {
	return {
        get: function () {
            return $http.get('assets/wheelItems.json');
        }
    };
});

function DialogCtrl ($timeout, $q, $scope, $mdDialog) {
    
    $scope.title="b.jones";
    $scope.subtitle = "organic spa";

    var self = this;
    self.cancel = function($event) {
      $mdDialog.cancel();
    };
    self.finish = function($event) {
      $mdDialog.hide();
    };
 
  }