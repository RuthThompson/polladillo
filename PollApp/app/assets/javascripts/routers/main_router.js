PollApp.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "home",
    "signup": "newUser"
  }, 
  
  initialize: function(opts){
    this.$rootEl = opts.$rootEl;
  },
  
  newUser: function(){
    view = new PollApp.Views.NewUser({model: new PollApp.Models.User()})
    this._renderView(view)
  }, 
  
  home: function(){
    
  }, 
  
  _renderView: function(view){
    if(this.currentView){
      this.currentView.remove()
    }
    this.currentView = view;
    this.$rootEl.html(view.render().$el)
  }

});
