(function(module) {
try {
  module = angular.module('mlLodLiveNgDemo.Tpls');
} catch (e) {
  module = angular.module('mlLodLiveNgDemo.Tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/home.html',
    '<h1 class="page-header" itemprop="name">LodLive for MarkLogic in Angular</h1><div class="home row"><h4>Key features</h4><ul><li>Integrate ML-Lodlive in Angular very easily</li><li>Vizualize any RDF data directly from SPARQL endpoints</li><li>Explore RDF data without customization</li><li>Highly configurable</li></ul><h4>Example</h4><div class="row"><div class="col-md-10 col-md-offset-1"><div class="alert alert-info" role="alert"><strong>Note:</strong> Below example allows exploring DBPedia, starting with Barack Obama as topic:</div><ml-lodlive iri="model.iri" profile="model.profile"></ml-lodlive></div></div><div style="display:none">{{model}}</div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('mlLodLiveNgDemo.Tpls');
} catch (e) {
  module = angular.module('mlLodLiveNgDemo.Tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/quickstart.html',
    '<h1 class="page-header">Quickstart</h1><div class="row"><div class="col-md-12"><p>To start using Lodlive for MarkLogic, follow these simple steps to get started.</p><ol class="steps"><li><p>Download <a href="https://raw.github.com/grtjn/ml-lodlive-ng/master/dist/ml-lodlive-ng.js">ml-lodlive-ng.js</a> (<a href="https://raw.github.com/grtjn/ml-lodlive-ng/master/dist/ml-lodlive-ng.min.js">minified version</a>) and put it with your other scripts. Alternatively, you can use Bower to install it automatically:</p><div hljs="" language="bash">bower install [--save] ml-lodlive-ng</div><p>Or if you prefer bleeding edge:</p><div hljs="" language="bash">bower install [--save] git@github.com:grtjn/ml-lodlive-ng.git</div><p>If not using Bower, you\'ll also need to fetch <a href="https://github.com/withjam/ml-lodlive/tree/v0.2.2" rel="external">ml-lodlive.complete.js (v0.2.2)</a> yourself.</p></li><li><p>Load ml-lodlive.complete.js, and ml-lodlive-ng.js into your HTML page (typically in the end of the <em>BODY</em> of your HTML):</p><pre hljs="" language="html">\n' +
    '<script src="/bower_components/ml-lodlive/dist/ml-lodlive.complete.js"></script>\n' +
    '<script src="/bower_components/ml-lodlive-ng/dist/ml-lodlive-ng[.min].js"></script></pre><p class="text-muted">Note: You can simplify this by making use of <a href="https://www.npmjs.com/package/wiredep" rel="external">wiredep</a>, optionally together with <a href="https://www.npmjs.com/package/gulp-useref" rel="external">gulp-useref</a>.</p></li><li><p>Load ml-lodlive.css, and ml-lodlive-ng.css into your HTML page (typically in the end of the <em>HEAD</em> of your HTML):</p><pre hljs="" language="html">\n' +
    '<link rel="stylesheet" href="/bower_components/ml-lodlive/css/ml-lodlive.css"></pre><link rel="stylesheet" href="/bower_components/ml-lodlive-ng/dist/ml-lodlive-ng.css"><p class="text-muted">Note: You can simplify this by making use of <a href="https://www.npmjs.com/package/wiredep" rel="external">wiredep</a>, optionally together with <a href="https://www.npmjs.com/package/gulp-useref" rel="external">gulp-useref</a>.</p><p class="text-muted">Note: If you go down the route of using gulp-useref, you will likely need to copy images to a folder that is publicly accessible as /img/, otherwise images used by ml-lodlive cannot be found by the directive.</p></li><li><p>Make your application module depend on the <code>ml-lodlive-ng</code> module:</p><div hljs="" language="js">angular.module(\'myApplicationModule\', [\'ml.lodlive\']);</div></li><li><p>Add objects and call-back functions to your scope like so:</p><pre hljs="" language="js">\n' +
    '$scope.model = {\n' +
    '  iri: \'http://dbpedia.org/resource/Barack_Obama\',\n' +
    '  profile: factory.profile(\'dbpedia\')\n' +
    '};\n' +
    '</pre></li><li><p>Add a <code>&lt;ml-lodlive&gt;</code> element in your template like so:</p><pre hljs="" language="html">\n' +
    '<ml-lodlive iri="model.iri" profile="model.profile">\n' +
    '</ml-lodlive></pre></li><li><p>Optionally override the height via CSS for the map container:</p><div hljs="" language="css">.map-canvas { height: 400px !important; }</div></li></ol></div></div>');
}]);
})();
