// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('SampleCtrl',function($scope,$cordovaAppAvailability,$cordovaGeolocation,$cordovaLocalNotification,$cordovaToast,$cordovaLaunchNavigator){
  $scope.test="hai";
  $scope.testAppAvailabity=function(){
    $cordovaAppAvailability.check('com.whatsapp')
      .then(function() {
        // is available
        alert("app available")
      }, function () {
        // not available
        alert("app not available")
      });
  }


  $scope.getGeoLocation=function(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude
      $scope.long = position.coords.longitude
    }, function(err) {
      // error
      alert("sorry try again")
    });
  }

$scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);
      
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'My local Notification',
        text: 'Text here',
        at: _10SecondsFromNow
      }).then(function (result) {
        // ...
      });
    };

  $scope.showToast=function(){
    $cordovaToast.showLongBottom('Here is a message').then(function(success) {
    // success
  }, function (error) {
    // error
  });
  }  

  $scope.launchNavigator = function() {
    var destination = [ 11.024828,77.0083163];
  var start = [ 11.018219, 77.021418];
    $cordovaLaunchNavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
    });
  };
})
