PollApp.Views.NewPoll = Backbone.View.extend({
  events: {
    "click #savePoll"   : "newPoll", 
    "click #addQuestion": "addQuestion", 
    "click #addAnswer"  : "addAnswer"
  }, 

  template: JST['polls/form'], 
  
  render: function () {
    this.$el.html(this.template({poll: this.model}));
    return this
    
  },
  
  newPoll: function (event) {
    event.preventDefault();
    data = $("#editPoll").serializeJSON();
    console.log(data);
    var opts = {
       success: function (data) {
         Backbone.history.navigate("#/users/" + PollApp.currentUser.id)
        }, 
        error: function (responseObj) {
          console.log("failure -- ruth make an errors view");
          console.log(responseObj);
        }
    }
  
    PollApp.currentUserPolls.create(data.poll, opts)
  },
  
  addQuestion: function (event) {
    if(!this.model.get("questions")){
      this.model.set("questions", new PollApp.Collections.Questions());
    }
    this.model.get("questions").add({});
    this.render();
  }, 
  
  addAnswer: function (event) {
    var question_num = parseInt($(event.target).data("question-num"))
    question = this.model.get("questions").at(question_num)
    if(!question.get("answers")){
      question.set("answers", new PollApp.Collections.Answers());
    }
    question.get("answers").add({});
    this.render();
  }

});
