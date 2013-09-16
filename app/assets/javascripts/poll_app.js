window.PollApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    var $div = $('<div></div>');
    $div.html($('#currentUser').text());
    var currentUserData = JSON.parse($div.text());
    this.currentUser = new PollApp.Models.User(currentUserData);
    var $rootEl = $("#content");
    var $headerEl = $("#header");
    new PollApp.Routers.Main({ $rootEl:$rootEl, $headerEl: $headerEl });
    Backbone.history.start();
  }
};

$(function () {
  PollApp.initialize();
});
