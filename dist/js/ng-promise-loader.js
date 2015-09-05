/**
 * ng-promise-loader 1.0.1
 * License: MIT License
 */
'use strict';

angular.module('ngPromiseLoader', [])
  .directive('promiseLoader', function() {
    var loaderBackdropTemplate = '<div class="loader-backdrop">' +
                                   '<div class="loader">' +
                                   '</div>' +
                                 '</div>';
    var errorBackdropTemplate = '<div class="error-backdrop">' +
                                  '<div class="error-toast">' +
                                    '<span class="error-text"></span>' +
                                  '</div>' +
                                '</div>';
    var defaultSpinner = '<div class="sk-three-bounce">';
    var i;
    for(i = 1; i <= 3; i++) {
      defaultSpinner += '<div class="sk-child sk-bounce' + i + '"></div>';
    }
    defaultSpinner += '</div>';

    return {
      restrict: 'A',
      compile: function promiseLoaderCompile(tElement) {
        tElement.addClass('promise-loader');
        var loaderBackdropElement = angular.element(loaderBackdropTemplate);
        angular.element(loaderBackdropElement[0].querySelector('.loader')).append(angular.element(defaultSpinner));
        tElement.append(loaderBackdropElement);
        tElement.append(angular.element(errorBackdropTemplate));
        return function promiseLoaderLink ($scope, $element, $attrs) {
          var loaderBackdrop = angular.element($element[0].querySelector('.loader-backdrop')),
            errorBackdrop = angular.element($element[0].querySelector('.error-backdrop')),
            errorText = angular.element($element[0].querySelector('.error-text'));


          if($attrs.backdrop === 'true') {
            loaderBackdrop.addClass('show-backdrop');
          }

          errorBackdrop.on('click', function() {
            errorBackdrop.removeClass('show');
          });

          $scope.$watch($attrs.promiseLoader, function(newValue) {
            if(newValue && newValue.then) {
              // hide error message when new promise is in pending state
              errorBackdrop.removeClass('show');
              errorText.empty();

              loaderBackdrop.addClass('show');
              newValue.catch(function(error) {
                errorText.text(error.message);
                errorBackdrop.addClass('show');
              })
                ['finally'](function() {
                loaderBackdrop.removeClass('show');
              });
            }
          });

          $scope.$on('$destory', function() {
            errorBackdrop.off('click');
          })
        }
      }
    }
  });
