window.PollApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    $rootEl = $("#content")
    this.router = new PollApp.Routers.Main({$rootEl:$rootEl});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  PollApp.initialize();
});
