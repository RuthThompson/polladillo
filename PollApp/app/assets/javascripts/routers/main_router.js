PollApp.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "home",
    "users/new": "newUser", 
    "users/:user_id": "showUser", 
    "polls/new": "newPoll"
  }, 
  
  initialize: function (opts) {
    this.$rootEl = opts.$rootEl;
  },
  
  newUser: function () {
    view = new PollApp.Views.NewUser({model: new PollApp.Models.User()});
    this._renderView(view);
  }, 
  
  showUser: function (user_id) {
    view = new PollApp.Views.ShowUser({model: PollApp.currentUser});
    this._renderView(view);
  },
  
  newPoll: function () {
    view = new PollApp.Views.NewPoll({model: new PollApp.Models.Poll()});
    this._renderView(view);
  }, 
   
  _renderView: function (view) {
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(view.render().$el)
    console.log(view.render().$el)
  }

});
