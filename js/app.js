(function() {
"use strict";

window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('album', { path: '/album/:album_id'});
});

App.ApplicationRoute = Ember.Route.extend({
  events: {
    play: function(song) {
      this.controllerFor('nowPlaying').set('model', song);
    }
  }
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

App.AudioPlayerComponent = Ember.Component.extend({
  classNames: "audio-control",
  currentTime: 0,
  duration: null,
  isLoaded: false,
  isPlaying: false,

  didInsertElement: function() {
    var component = this;
    this.$('audio')
      .on('loadeddata', function() {
        component.set("isLoaded", true);
        component.set("duration", Math.floor(this.duration));
      })
      .on('timeupdate', function() {
        component.set("currentTime", Math.floor(this.currentTime));
      })
      .on('play', function() {
        component.set("isPlaying", true);
      })
      .on('pause', function() {
        component.set("isPlaying", false);
      });
  }
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
