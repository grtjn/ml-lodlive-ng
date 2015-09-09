angular.module('ml.lodlive', ['ml.common', 'ml.lodlive.tpls']);
(function () {
  'use strict';

  angular.module('ml.lodlive')
    .directive('mlLodlive', [function () {
      return {
        restrict: 'E',
        controller: 'MLLodliveCtrl',
        //replace: true,
        scope: {
          lodliveId: '@'
        },
        // TODO: get rid of id
        template: '<div id="mllodlive" class="ml-lodlive"><ml-lodlive-legend></ml-lodlive-legend></div>'
      };
    }])
    .controller('MLLodliveCtrl', ['$scope', 'MLRest', function ($scope, mlRest) {
      var model = {
        lodlive: {}
      };

      if ($scope.lodliveId) {
        model.lodlive.id = $scope.lodliveId;
        // TODO: use link function, and $elem to get the right element. Directive could be used more often..
        jQuery('#mllodlive').lodlive(
          {
            profile: MarkLogicProfile,
            firstUri: model.lodlive.id
          }
        );
      }

      $scope.$watch('lodliveId', function(newVal, oldVal) {
        // TODO: use link function, and $elem to get the right element. Directive could be used more often..
        var lodliveObj = jQuery('#mllodlive').lodlive();
        model.lodlive.id = newVal;

        if (lodliveObj) {
          lodliveObj.context.empty();
          lodliveObj.init(model.lodlive.id);
        }

      }, true);

      angular.extend($scope, {
        model: model
      });
    }]);
}());

(function () {

  'use strict';

  angular.module('ml.lodlive')
    .directive('mlLodliveLegend', [function () {
      return {
        restrict: 'E',
        controller: 'MLLodliveLegendCtrl',
        //replace: true,
        scope: {},
        templateUrl: '/ml-lodlive-ng/ml-lodlive-legend-dir.html'
      };
    }])
    .controller('MLLodliveLegendCtrl', ['$scope', function ($scope) {
      var model = {
        profile: MarkLogicProfile,
        showLegend: false,
        items: [
          {
            icon: 'fa fa-list',
            title: 'Document Information'
          },
          {
            icon: 'fa fa-cog',
            title: 'Tools'
          },
          {
            icon: 'fa fa-arrows-alt',
            title: 'Expand All'
          },
          {
            icon: 'fa fa-info-circle',
            title: 'More Information'
          },
          {
            icon: 'fa fa-dot-circle-o',
            title: 'Make Root Node'
          },
          {
            icon: 'fa fa-external-link',
            title: 'Open In Another Page'
          },
          {
            icon: 'fa fa-trash-o',
            title: 'Remove the Node'
          },
          {
            icon: 'fa fa-certificate',
            title: 'Group of Related Items'
          },
          {
            icon: 'fa fa-circle',
            title: 'Related Item'
          }
        ],
        relationships: []
      };

      function initRelationships() {
        // The MarkLogic Lodlive profile is in global scope.
        if (model.profile.UI && model.profile.UI.relationships) {
          var rels = model.profile.UI.relationships;

          for (var p in rels) {
            if (rels.hasOwnProperty(p)) {
              var title = p;
              if (p.indexOf('#') > -1) {
                title = p.substring(p.lastIndexOf('#') + 1);
              }
              else if (p.indexOf('/') > -1) {
                title = p.substring(p.lastIndexOf('/') + 1);
              }

              model.relationships.push({
                icon: 'fa fa-circle',
                title: title,
                style: 'color: ' + rels[p].color
              });
            }
          }
        }

        // Add the default color used when a relationship doesn't have a specified color.
        model.relationships.push({
          icon: 'fa fa-circle',
          title: 'other',
          style: 'color: #369;'
        });
      }

      initRelationships();

      angular.extend($scope, {
        model: model
      });
    }]);

}());

'use strict';
var MarkLogicProfile = {};

// LodLive will match connection by the base URL of the query used, so the key must match the URL 
MarkLogicProfile.connection = {
  // http matches all http requests, so this will be the only connection settings used
 'http:' : {
      description : {
        it : 'DBpedia is a community effort to extract structured information from Wikipedia and to make this information available on the Web. DBpedia allows you to ask sophisticated queries against Wikipedia, and to link other data sets on the Web to Wikipedia data.',
        en : 'DBpedia is a community effort to extract structured information from Wikipedia and to make this information available on the Web. DBpedia allows you to ask sophisticated queries against Wikipedia, and to link other data sets on the Web to Wikipedia data.'
      },
      sparql : {
        allClasses : 'SELECT DISTINCT ?object  WHERE {[] a ?object} ORDER BY ?object  LIMIT 50  ',
        findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} } LIMIT 1',
        documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object.FILTER ((( isIRI(?object) && ?property != <http://xmlns.com/foaf/0.1/depiction> )|| ?property = <http://www.w3.org/2000/01/rdf-schema#label>  || ?property = <http://www.georss.org/georss/point> || ?property = <http://xmlns.com/foaf/0.1/surname> || ?property = <http://xmlns.com/foaf/0.1/name> || ?property = <http://purl.org/dc/elements/1.1/title>))}  ORDER BY ?property',
        document : 'SELECT DISTINCT *  WHERE  {{<{URI}> ?property ?object. FILTER(!isLiteral(?object))} UNION    {<{URI}> ?property    ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="it")} UNION   {<{URI}> ?property    ?object.FILTER(isLiteral(?object)).FILTER(lang(?object) ="en")}}  ORDER BY ?property',
        bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
        inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}> FILTER(REGEX(STR(?object),\'//dbpedia.org\'))} LIMIT 100',
        inverseSameAs : 'SELECT DISTINCT * WHERE {?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> FILTER(REGEX(STR(?object),\'//dbpedia.org\'))}'
      },
      useForInverseSameAs : true,
      endpoint : 'http://dbpedia.org/sparql',
  }
};

// here we define the known relationships so that labels will appear
MarkLogicProfile.arrows = {
  'http://www.w3.org/2002/07/owl#sameAs' : 'isSameAs',
  'http://purl.org/dc/terms/isPartOf' : 'isPartOf',
  'http://purl.org/dc/elements/1.1/type' : 'isType',
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' : 'isType'
};

// this is the default data configuration, this is important.  It informs LodLive how to construct queries and how to read the data that comes back
MarkLogicProfile.default = {
  sparql : {
    allClasses : 'SELECT DISTINCT ?object WHERE {[] a ?object}',
    findSubject : 'SELECT DISTINCT ?subject WHERE { {?subject a <{CLASS}>;<http://purl.org/dc/elements/1.1/title> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2000/01/rdf-schema#label> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} UNION {?subject a <{CLASS}>;<http://www.w3.org/2004/02/skos/core#prefLabel> ?object. FILTER(regex(str(?object),\'{VALUE}\',\'i\'))} }  LIMIT 1  ',
    documentUri : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object} ORDER BY ?property',
    document : 'SELECT DISTINCT * WHERE {<{URI}> ?property ?object}',
    bnode : 'SELECT DISTINCT *  WHERE {<{URI}> ?property ?object}',
    inverse : 'SELECT DISTINCT * WHERE {?object ?property <{URI}>.} LIMIT 100',
    inverseSameAs : 'SELECT DISTINCT * WHERE {{?object <http://www.w3.org/2002/07/owl#sameAs> <{URI}> } UNION { ?object <http://www.w3.org/2004/02/skos/core#exactMatch> <{URI}>}}'
  },
  endpoint : 'http://labs.regesta.com/resourceProxy/',
  document : {
    className : 'standard',
    titleProperties : ['http://www.w3.org/2000/01/rdf-schema#label']
  }, // http://www.w3.org/2000/01/rdf-schema#label
};

MarkLogicProfile.UI = {
  ignoreBnodes: true,
  nodeIcons: [
    { builtin: 'tools' },
    { builtin: 'docInfo' },
    { 
      icon: 'fa fa-thumb-tack', 
      title: 'Pin in SPARQL',
      handler: function(node, inst) {
        var icon = this, pinner = inst.container.find('.rsuite-pinner'), pos, to, uri = node.attr('rel');
        // make sure pinned exists on the instance
        function doTypeAhead(inp,uri) {
          var val = inp.val();
          var resdiv = pinner.find('.rsuite-pinner-results').empty().addClass('loading');
          var sparql = 'SELECT ?subject ?title WHERE { ' +
                       '?subject <http://purl.org/dc/elements/1.1/type> <' + uri +'>; '+
                       '<http://purl.org/dc/elements/1.1/title> ?title FILTER(contains(?title,"' + val + '")) '+
                      '}';
          // console.log('sparql', sparql);
          //do the search
          $.ajax({
            url: inst.options.connection['http:'].endpoint + '?' + inst.options.endpoints.all + '&query=' +  encodeURIComponent(sparql),
            contentType: 'json',
            dataType: inst.getAjaxDataType(),
            success: function(resp) { 
              var b = resp.results.bindings;
              for (var i=0; i < 20; i++) {
                $('<div class="rsuite-pinner-result-item" data-pinned-type="'+ uri + '" data-pinned-value="'+ i +'"> item ' + i + '</div>' )
                  .addClass(inst.rsuitePinned.indexOf(i) > -1 ? 'rsuite-is-pinned' : '')
                  .appendTo(resdiv);
              }
              return;
              if (!b.length) {
                resdiv.html('<div class="noresults">no matches</div>');
                return;
              }
              for (var i=0; i < b.length; i++) {
                $('<div class="rsuite-pinner-result-item" data-pinned-type="' + uri +'" data-pinned-value="'+ b[i].subject.value +'"> ' + b[i].title.value + '</div>' )
                  .addClass(inst.rsuitePinned.indexOf(b[i].subject.value) > -1 ? 'rsuite-is-pinned' : '')
                  .appendTo(resdiv);
              }
            },
            error: function() { console.log('error', arguments); }
          });
        }
        if (!pinner.length) {
          pinner = $('<div class="rsuite-pinner"></div>').hide().appendTo(inst.container);
          var pinpanel = $('<div class="rsuite-pinner-panel"></div>').appendTo(pinner);
          pinpanel.append('<div class="rsuite-pinner-search"><input type="text" class="rsuite-pinner-text"></div>');
          pinpanel.append('<div class="rsuite-pinner-pinned"></div>');
          pinpanel.append('<div class="rsuite-pinner-results"><div class="noresults">type to search</div></div>');
          pinpanel.append('<div class="rsuite-pinner-footer"><button class="rsuite-pinner-btn">done</button></div>');
          pinpanel.find('.rsuite-pinner-text').on('keyup', function(evt) {
            //handle type ahead if not a modifier key
            if (evt.which && (evt.which >= 46 || evt.which === 8)) {
              var inp = $(this);
              clearTimeout(to);
              to = setTimeout(function() { doTypeAhead(inp, pinner.attr('pinner-uri')); },250); //timeout so val() gives the latest value
            }
          });
          pinner.on('click',function(evt) {
            var t = $(evt.target);
            console.log('target',t);
            if (t.is('.rsuite-pinner-btn')) {
              pinner.fadeOut('fast');
            } else {
              evt.preventDefault();
              evt.stopPropagation();
            }
            return false;
          });
          pinpanel.on('click', '.rsuite-pinner-result-item', function() {
            var item = $(this), uri = item.data('pinned-value'), ind = inst.rsuitePinned.indexOf(uri), pinType = item.data('pinned-type');
            console.log('uri %s, pinned index %d', uri, ind);
            item.toggleClass('rsuite-is-pinned');
            // if it's in the array, remove it
            if (ind > -1) {
              inst.rsuitePinned.splice(ind,1);
              inst.rsuitePinTypes[pinType]--;
              if (item.parent('.rsuite-pinner-pinned').length) {
                item.slideUp('fast', function() { item.remove(); });
                pinner.find('.rsuite-pinner-results .rsuite-pinner-result-item[data-pinned-value="' + uri + '"]').removeClass('rsuite-is-pinned');
              }
            } else {
              inst.rsuitePinned.push(uri);
              if (!inst.rsuitePinTypes.hasOwnProperty(pinType)) {
                inst.rsuitePinTypes[pinType] = 0;
              }
              inst.rsuitePinTypes[pinType]++;
              pinner.find('.rsuite-pinner-pinned').append(item.clone());
            }
            console.log('pintype %s, count %d', pinType, inst.rsuitePinTypes[pinType]);
            if (inst.rsuitePinTypes[pinType]) {
              inst.context.find('.lodlive-node[rel="'+pinType+'"]').addClass('pinned');
            } else {
              inst.context.find('.lodlive-node[rel="'+pinType+'"]').removeClass('pinned');
            }
          });
          inst.context.parent().on('scroll', function() { console.log('on scroll'); pinner.fadeOut('fast'); });
          if (!inst.rsuitePinned) {
            inst.rsuitePinned = []; // an array of each pinned iri
            inst.rsuitePinTypes = {}; // object collection of pinned types to highlight nodes
          }
        } else {
          pinner.find('.rsuite-pinner-results').empty();
        }
        if (pinner.attr('pinner-uri') !== uri) {
          pinner.attr('pinner-uri', uri);
          pinner.fadeIn('fast');
          pinner.find('.rsuite-pinner-pinned .rsuite-pinner-result-item').show().not('[data-pinned-type="' + uri +'"]').hide();
        } else {
          clearTimeout(to); // just for safe measure
          pinner.fadeToggle('fast');
        }
        pos = icon.offset();
        pinner.css({ left: pos.left + 20, top: pos.top - 8 });
        pinner.find('.rsuite-pinner-text').val('').focus();
      }
    }
  ],
  tools: [
    { builtin: 'close' },
    { builtin: 'rootNode'},
    { builtin: 'expand' }
  ],
  // docInfo: function() {},
  nodeHover: function() {},
  relationships: {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': {
      color: '#000'
    },
    'http://www.w3.org/2004/02/skos/core#broader': {
      color: '#69C'
    },
    'http://www.w3.org/2004/02/skos/core#related': {
      color: '#FFF444'
    }
  }
};

MarkLogicProfile.endpoints = {
  all : 'output=json&format=json&timeout=0',
  jsonp: true
};
(function(module) {
try {
  module = angular.module('ml.lodlive.tpls');
} catch (e) {
  module = angular.module('ml.lodlive.tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/ml-lodlive-ng/ml-lodlive-legend-dir.html',
    '<div id="ml-lodlive-legend" class="ml-lodlive-legend"><div class="ml-lodlive-legend-toggle"><button class="btn btn-xs ml-lodlive-legend-button" ng-click="model.showLegend = !model.showLegend"><i class="fa fa-life-ring"></i></button></div><div class="ml-lodlive-legend-display" ng-if="model.showLegend"><h4><b>Legend</b></h4><div ng-repeat="item in model.items"><span class="{{item.icon}}"></span> {{item.title}}</div><h5><b>Relationships</b></h5><div ng-repeat="rel in model.relationships"><span class="{{rel.icon}}" style="{{rel.style}}"></span> {{rel.title}}</div></div></div>');
}]);
})();
