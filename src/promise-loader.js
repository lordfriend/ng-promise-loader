/**
 * An directive to create an loader base on promise
 */
'use strict';

angular.module('ngPromiseLoader', [])
  .directive('promiseLoader', function($q) {
    var loaderBackdropTemplate = '<div class="loader-backdrop">' +
                                   '<div class="loader">' +
                                   '</div>' +
                                 '</div>';

    var defaultSpinner = '<div class="sk-cube-grid">';
    var i;
    for(i = 1; i <= 9; i++) {
      defaultSpinner += '<div class="sk-cube sk-cube' + i + '"></div>';
    }
    defaultSpinner += '</div>';

    return {
      restrict: 'A',
      compile: function promiseLoaderCompile (tElement) {
        tElement.addClass('promise-loader');
        var loaderBackdropElement = angular.element(loaderBackdropTemplate);
        loaderBackdropElement.children().eq(0).append(angular.element(defaultSpinner));
        tElement.append(loaderBackdropElement);
        return function promiseLoaderLink ($scope, $element, $attrs) {
          var i, loaderBackdrop;
          var childrenElements = $element.children();
          for(i = childrenElements.length - 1; i >= 0; i--) {
            if(childrenElements.eq(i).hasClass('loader-backdrop')) {
              loaderBackdrop = childrenElements.eq(i);
              break;
            }
          }

          if($attrs.backdrop === 'true') {
            loaderBackdrop.addClass('show-backdrop');
          }

          $scope.$watch($attrs.promiseLoader, function(newValue) {
            if(newValue && newValue.then) {
              loaderBackdrop.addClass('show');
              console.log(newValue.$$state);
              newValue['finally'](function() {
                loaderBackdrop.removeClass('show');
              });
            }
          });
        }
      }
    }
  });
