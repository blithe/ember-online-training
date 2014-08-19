(function() {
"use strict";

window.App = Ember.Application.create();

window.App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.ALBUM_FIXTURES
  }
});

})();
