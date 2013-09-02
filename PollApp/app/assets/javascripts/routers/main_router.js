PollApp.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "home",
    "users/new": "newUser", 
    "users/:user_id": "showUser", 
    "polls/new": "newPoll", 
    "polls/:poll_id/edit": "editPoll", 
    "polls/:poll_id/vote": "votePoll"
  }, 
  
  initialize: function (opts) {
    this.$rootEl = opts.$rootEl;
  },
  
  newUser: function () {
    var view = new PollApp.Views.NewUser({model: new PollApp.Models.User()});
    this._renderView(view);
  }, 
  
  showUser: function (user_id) {
    var that = this; 
    this._withCurrentUserPolls(function (polls) {
      var view = new PollApp.Views.ShowUser({model: PollApp.currentUser, collection: polls});
      that._renderView(view);
    });
  },
  
  newPoll: function () {
    var that = this;
    this._withCurrentUserPolls( function(){
      var view = new PollApp.Views.PollsForm({model: new PollApp.Models.Poll()});
      that._renderView(view);
    })
  }, 
  
  editPoll: function (poll_id) {
    var that = this;
    this._withPoll(poll_id, function(poll){ 
      var view = new PollApp.Views.PollsForm({model: poll});
      that._renderView(view);
    });
  },
  
  votePoll: function (poll_id) {
    var that = this; 
    this._withPoll(poll_id, function (poll) {
      var view = new PollApp.Views.PollsVote({model: poll});
      that._renderView(view);
    });
  },
   
  _renderView: function (view) {
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }, 
  
  _withPoll: function (poll_id, callback) {
    this._withCurrentUserPolls( function(){
      var poll = PollApp.currentUserPolls.get(poll_id);
      if(!poll){
        poll = new PollApp.Models.Poll({id: poll_id});
        poll.fetch({success: callback});
      }else{
        callback(poll);
      }
    });
  }, 
  
  _withCurrentUserPolls: function (callback) {
    if(!PollApp.currentUserPolls){
      PollApp.currentUserPolls = new PollApp.Collections.Polls();
      PollApp.currentUserPolls.fetch({success: callback});
    }else{
      callback(PollApp.currentUserPolls);
    }
  }

});