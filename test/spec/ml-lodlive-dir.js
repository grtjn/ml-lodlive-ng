/* global describe, beforeEach, module, it, expect, inject */

describe('MLLodlive-directive', function () {
  'use strict';

  var elem, $scope, $compile, $rootScope, factory;

  beforeEach(module('ml.lodlive'));

  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');

    factory = $injector.get('MLLodliveProfileFactory');
    $scope = $rootScope.$new();
    $scope.profile = factory.profile();
    $scope.iri = 'http://root.example/blah';
  }));

  beforeEach(function() {
    elem = angular.element('<ml-lodlive profile="profile" iri="iri"></ml-lodlive>');
    $compile(elem)($scope);
    $scope.$digest();
  });

  it('should contain template', function() {
    expect(elem.find('.ml-lodlive-legend').length).toEqual(1);
  });

  it('should contain graph', function() {
    expect(elem.find('.lodlive-graph-container').length).toEqual(1);
    expect(elem.find('.lodlive-graph-context').length).toEqual(1);
  });
});
