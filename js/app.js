(function() {
"use strict";

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('album', { path: '/album/:album_id'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.ALBUM_FIXTURES
  }
});

App.AlbumRoute = Ember.Route.extend({
  model: function(params) {
    return App.ALBUM_FIXTURES.findProperty('id', params.album_id);
  }
});

App.NowPlayingController = Ember.ObjectController.extend();

Ember.Handlebars.helper('format-duration', function(value) {
  var minutes = Math.floor(value/60),
      seconds = value%60;

    if (seconds < 10) {
      seconds = "0" + seconds
    };

  return minutes + ":" + seconds;
});

App.Album = Ember.Object.extend({
  totalDuration: function() {
    return this.get('songs').reduce(function(sum, record) {
      return sum + record.duration;
    }, 0);
  }.property('songs.@each.duration')
});

App.Song = Ember.Object.extend();

})();
