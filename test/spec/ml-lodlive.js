/* global describe, beforeEach, module, it, expect, inject */

describe('MLLodlive', function () {
  'use strict';

  var factory, profile;

  beforeEach(module('ml.lodlive'));

  beforeEach(inject(function ($injector) {
    factory = $injector.get('MLLodliveProfileFactory');
  }));

  it('should exist', function() {
    expect(factory).not.toBeUndefined();
  });

  it('should create a marklogic profile', function() {
    profile = factory.profile();
    expect(profile.connection['http:'].endpoint).toEqual('/v1/graphs/sparql');
  });

  it('should create a dbpedia profile', function() {
    profile = factory.profile('dbpedia');
    expect(profile.connection['http:'].endpoint).toEqual('http://dbpedia.org/sparql');
  });
});
