/**
 * Created by bob on 8/19/15.
 */
'use strict';
angular.module('exampleApp', ['ngPromiseLoader'])
  .controller('MainCtrl', function ($scope, $timeout, $q) {
    var getTableData = function () {
      return $timeout(function () {
        var data = [];
        for (var i = 0; i < 5; i++) {
          data.push({name: 'item' + i, number: Math.random() * (i + 1)});
        }
        return data;
      }, 3000);
    };

    var getErrorPromise = function () {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.reject('Something Happened');
      }, 3000);
      return deferred.promise;
    };

    $scope.loadTable = function () {
      $scope.tablePromise = getTableData()
        .then(function (data) {
          console.log(data);
          $scope.tableData = data;
          return data;
        });
    };

    $scope.loadError = function () {
      $scope.errorPromise = getErrorPromise()
        .then(function (data) {
          console.log('this callback should not be invoked');
          return data;
        }, function(reason) {
          return $q.reject(new Error(reason));
        });
    }
  });
