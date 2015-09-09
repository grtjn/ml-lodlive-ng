(function() {
  'use strict';

  angular.module('ml.lodlive')
    .service('MLLodliveExampleProfile', [
      function() {
        var ExampleProfile = {};

        // LodLive will match connection by the base URL of the query used, so the key must match the URL
        ExampleProfile.connection = {
          // http matches all http requests, so this will be the only connection settings used
          'http:': {
            sparql: {
              allClasses: 'SELECT DISTINCT ?object  WHERE {[] a ?object} ORDER BY ?object  LIMIT 50  ',
              findSubject: 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1',
              documentUri: 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER ((( isIRI(?object) && ?property != <http://xmlns.com/foaf/0.1/depiction> )|| ?property = <http://www.w3.org/2000/01/rdf-schema#label>  || ?property = <http://www.georss.org/georss/point> || ?property = <http://xmlns.com/foaf/0.1/surname> || ?property = <http://xmlns.com/foaf/0.1/name> || ?property = <http://purl.org/dc/elements/1.1/title>))}  ORDER BY ?property',
              document: 'SELECT DISTINCT *  WHERE  {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))} UNION    {<{URI}> ?property    ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION   {<{URI}> ?property    ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="en")}}  ORDER BY ?property',
              bnode: 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
              inverse: 'SELECT DISTINCT * WHERE {?object ?property <{URI}> FILTER(REGEX(STR(?object),\'//dbpedia.org\'))} LIMIT 100',
              inverseSameAs: 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> FILTER(REGEX(STR(?object),\'//dbpedia.org\'))}'
            },
            useForInverseSameAs: true,
            endpoint: '/lodlive.xqy',
          }
        };

        // here we define the known relationships so that labels will appear
        ExampleProfile.arrows = {
          'http://purl.org/goodrelations/v1#isSimilarTo': 'Similar To',
          'http://purl.org/dc/terms/isPartOf': 'isPartOf',
          'http://purl.org/dc/elements/1.1/type': 'isType',
          'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': 'isType'
        };

        // this is the default data configuration, this is important.  It informs LodLive how to construct queries and how to read the data that comes back
        ExampleProfile.
        default = {
          sparql: {
            allClasses: 'SELECT DISTINCT ?object WHERE {[] a ?object}',
            findSubject: 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
            documentUri: 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object} ORDER BY ?property',
            document: 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
            bnode: 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
            inverse: 'SELECT DISTINCT * WHERE {?object ?property <{URI}>.} LIMIT 100',
            inverseSameAs: 'SELECT DISTINCT * WHERE {{?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> } UNION { ?object <http://www.w3.org/2004/02/skos/core#exactMatch> <{URI}>}}'
          },
          endpoint: '/lodlive.xqy',
          document: {
            className: 'standard',
            titleName: 'product',
            titleProperties: ['http://xmlns.com/foaf/0.1/name']
          }, // http://www.w3.org/2000/01/rdf-schema#label
        };

        ExampleProfile.skuregex = /http:\/\/www\.marklogic\.com\/dmlc\/retail\/(.*)/;

        ExampleProfile.UI = {
          ignoreBnodes: true,
          nodeIcons: [{
            icon: 'fa fa-plus',
            title: 'Add to compare',
            handler: function(node, inst) {
              var rel = node.attr('rel'),
                matches = ExampleProfile.skuregex.exec(rel);
              if (matches && matches.length) {
                console.log('sku', matches[1]);
                var ng = angular.element('div.product-details');
                var scope = ng.scope();
                scope.$apply(function() {
                  scope.productDetails.addToCompare(matches[1]);
                });
              }
            }
          }, {
            icon: 'fa fa-external-link-square',
            title: 'View product details',
            handler: function(node, inst) {
              var rel = node.attr('rel'),
                matches = ExampleProfile.skuregex.exec(rel);
              if (matches && matches.length) {
                console.log('sku', matches[1]);
                var ng = angular.element(document.body);
                var scope = ng.scope();
                scope.$apply(function() {
                  ng.injector().get('$location').path('/consumer/sku/' + matches[1]);
                });
              }
            }
          }],
          tools: [{
            builtin: 'close'
          }, {
            builtin: 'rootNode'
          }, {
            builtin: 'expand'
          }],
          // docInfo: function() {},
          nodeHover: function() {},
          relationships: {
            'http://purl.org/goodrelations/v1#isSimilarTo': {
              color: '#000'
            },
            'http://www.w3.org/2004/02/skos/core#broader': {
              color: '#69C'
            },
            'http://www.w3.org/2004/02/skos/core#related': {
              color: '#FFF444'
            }
          },
        };

        ExampleProfile.endpoints = {
          all: 'output=json&format=json&timeout=0',
          jsonp: true
        };

        return ExampleProfile;
      }
    ]);

}());
