window.PollApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    PollApp.currentUser = new PollApp.Models.User(JSON.parse($("#currentUser").html()));
    var $rootEl = $("#content")
    this.router = new PollApp.Routers.Main({$rootEl:$rootEl});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollApp.initialize();
});
