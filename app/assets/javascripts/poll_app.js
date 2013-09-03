window.PollApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new PollApp.Models.User(JSON.parse($("#currentUser").html()));
    var $rootEl = $("#content")
    var $headerEl = $("#header")
    this.router = new PollApp.Routers.Main({$rootEl:$rootEl, $headerEl: $headerEl});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollApp.initialize();
});
