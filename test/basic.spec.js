/**
 * A basic function test spec
 */

describe('A promise-loader', function() {
  var $compile,
    $rootScope,
    $q;

  beforeEach(module('ngPromiseLoader'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$q_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  it('should show loader when promise is in pending state', function() {
    var loadingContainer = $compile('<div class="loading-container" promise-loader="promise"></div>')($rootScope);
    $rootScope.$digest();

    // loader-backdrop is the container of loader element, which controls the visibility of loader.
    // we just need to check the existence of 'show' class on loader-backdrop.
    var loaderBackdrop = angular.element(loadingContainer[0].querySelector('.loader-backdrop'));

    expect(loaderBackdrop.hasClass('show')).toBe(false);

    var deferred = $q.defer();
    $rootScope.promise = deferred.promise;

    $rootScope.$digest();

    expect(loaderBackdrop.hasClass('show')).toBe(true);

    deferred.resolve('OK');

    $rootScope.$digest();

    expect(loaderBackdrop.hasClass('show')).toBe(false);
  })
});
