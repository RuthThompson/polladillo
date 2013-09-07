PollApp.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "home",
    "signup": "newUser", 
    "users/:user_id": "showUser", 
    "users/:user_id/edit": "editUser",
    "polls/new": "newPoll",
    "polls/:poll_id/edit": "editPoll", 
    "polls/:poll_id/email": "emailPoll",
    "polls/:poll_id/vote": "votePoll", 
    "polls/:poll_id/results": "tallyPoll",
    ":anything_else": "four04"
  }, 
  
  initialize: function (opts) {
    PollApp.router = this;
    this.$rootEl = opts.$rootEl;
    this.$headerEl = opts.$headerEl;
    this.createLayout();
  },
  
  createLayout: function(){
    this.header = new PollApp.Views.TopStripe();
    this.$headerEl.html(this.header.render().$el);
  },
  
  refreshLayout: function() {
    delete PollApp.currentUserPolls;
    this.reRenderCurrentView();
    this.header.render();
  },
  
  refreshLogin: function () {
    delete PollApp.currentUserPolls;
    this.header.render();
  },
  
  home: function () {
    var view = new PollApp.Views.Home();
    this._renderView(view);
  },
  
  four04: function () {
    var view = new PollApp.Views.Four04();
    this._renderView(view);
  },
  
  newUser: function () {
    var view = new PollApp.Views.UserForm({model: new PollApp.Models.User()});
    this._renderView(view);
  }, 
  
  editUser: function (id) {
    if(PollApp.currentUser.id == id){
      var view = new PollApp.Views.UserForm({model: PollApp.currentUser});
      this._renderView(view);
    }else{
      Backbone.history.navigate("", {trigger: true});
    }
  },
  
  showUser: function (user_id) {
    if(PollApp.currentUser.id == user_id){
      var that = this; 
      this._withCurrentUserPolls(function (polls) {
        var view = new PollApp.Views.ShowUser({model: PollApp.currentUser, collection: polls});
        that._renderView(view);
      });
    }else{
      Backbone.history.navigate("", {trigger: true});
    }
  },
  
  newPoll: function () {
   if(PollApp.currentUser.id !== undefined){
      var that = this;
      this._withCurrentUserPolls( function(){
        var view = new PollApp.Views.PollsForm({model: new PollApp.Models.Poll()});
        that._renderView(view);
      });
    }else{
      Backbone.history.navigate("", {trigger: true});
    }
  }, 
  
  editPoll: function (poll_id) {
    if(PollApp.currentUser.id !=  undefined){
      var that = this;
      this._withCurrentUserPoll(poll_id, function(poll){ 
        var view = new PollApp.Views.PollsForm({model: poll});
        that._renderView(view);
      });
    }else{
      Backbone.history.navigate("", { trigger: true });
    }
  },
  
  votePoll: function (poll_id) {
    var that = this; 
    this._withPoll(poll_id, function (poll) {
      var view = new PollApp.Views.PollsVote({model: poll});
      that._renderView(view);
    });
  },
  
  tallyPoll: function (poll_id){
    var that = this; 
    this._withPoll(poll_id, function (poll) {
      var view = new PollApp.Views.PollsResults({model: poll});
      that._renderView(view);
    });
  },
  
  emailPoll: function (poll_id){
    if(PollApp.currentUser.id !== null){
      var that = this;
      this._withCurrentUserPoll(poll_id, function(poll){ 
        var view = new PollApp.Views.PollsEmail({model: poll});
        that._renderView(view);
      });
     }else{
       Backbone.history.navigate("", { trigger: true });
     }
  },
   
  reRenderCurrentView: function () {
    var hash = window.location.hash
    Backbone.history.navigate(hash, { trigger:true })
  },
  
  _renderView: function (view) {
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }, 
  
  _withPoll : function (poll_id, callback) {
    poll = new PollApp.Models.Poll({id: poll_id});
    poll.fetch({success: callback});
  },
  
  _withCurrentUserPoll: function (poll_id, callback) {
    this._withCurrentUserPolls( function(){
      var poll = PollApp.currentUserPolls.get(poll_id);
      if(!poll){
        poll = new PollApp.Models.Poll({id: poll_id});
        poll.fetch({
          success: function () {
            // users can see anyone's poll, but they can't edit, email etc. other people's polls
            // so we don't want to let them think they are going to be able to by handing the view 
            // a poll in this function unless it is the users poll
            if (poll.user_id == currentUser.id) {
              callback(poll);
            } else {
              Backbone.history.navigate("", { trigger: true });
            }
          }
        });
      }else{
        callback(poll);
      }
    });
  }, 
  
  _withCurrentUserPolls: function (callback) {
    if(!PollApp.currentUserPolls){  
      PollApp.currentUserPolls = new PollApp.Collections.Polls();
      PollApp.currentUserPolls.fetch({success: callback});
      // PollsController#index always only gives the current users polls
    }else{
      callback(PollApp.currentUserPolls);
    }
  }

});
