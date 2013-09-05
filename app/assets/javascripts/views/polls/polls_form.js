PollApp.Views.PollsForm = Backbone.View.extend({
  events: {
    "click #savePoll": "savePoll", 
    "click #deletePoll": 'deletePoll',
    "click #addQuestion": "addQuestion", 
    "click .addAnswer": "addAnswer", 
    "click .removeAnswer": "removeAnswer", 
    "click .removeQuestion": "removeQuestion"
  }, 

  template: JST['polls/form'], 
  
  render: function () {
    this.$el.html(this.template({poll: this.model}));
    return this
  },
  
  savePoll: function (event) {
    event.preventDefault();
    var that = this;
    data = $("#editPoll").serializeJSON();
    var opts = {
       success: function () {
         wait: true,
         Backbone.history.navigate("#/users/" + PollApp.currentUser.id)
        }, 
        error: function (model, xhr) {
          that.displayErrors(model, xhr)
        }
    }
    if (this.model.isNew()){
      PollApp.currentUserPolls.create(data.poll, opts)
    }else{
      this.model.save(data.poll, opts)
    }
  },
  
  deletePoll: function () {
    this.model.destroy();
    Backbone.history.navigate("#/users/" + PollApp.currentUser.id)
  },
  
  addQuestion: function (event) {
    var questionNum = $(event.target).data("question-num") + 1
    $(event.target).data("question-num", questionNum)
    if(questionNum !== questionNum ){
      questionNum = 0;
    }
    var question = new PollApp.Models.Question() //just need a blank question for the form
    var $li = JST["polls/question_form_part"]({question: question, questionNum: questionNum})
    $("ul#questions").append($li)
  },
  
  addAnswer: function (event) {
    var questionNum = $(event.target).data("question-num");
    var $answerUl = $("#answers-" + questionNum);
    var answerNum = $answerUl.find("li").last().data("answer-num")
    if(answerNum == null){
       answerNum = 0;
    }else{
      answerNum ++;
    }
    var answer = new PollApp.Models.Answer() //just need a blank answer for the form
    var $li = JST["polls/question_answer_form_part"]({answer: answer, questionNum: questionNum, answerNum: answerNum})
    $answerUl.append($li)
  }, 
  
  removeQuestion: function (event) {
    var questionNum = $(event.target).data("question-num");
    var $questionLi = $("#questions li[data-question-num='" + questionNum +"']");
    $questionLi.addClass("hidden");
    var $deleteInput = $('<input type="hidden" name="poll[questions_attributes][' + questionNum + '][_destroy]" value="true" >')
    $questionLi.append($deleteInput);
  }, 
  
  removeAnswer: function (event) {
    var questionNum = $(event.target).data("question-num");
    var answerNum = $(event.target).data("answer-num");
    var $answerLi = $("#answers-" + questionNum + " li[data-answer-num='" + answerNum +"']" );
    $answerLi.addClass("hidden");
    var $deleteInput = $('<input type="hidden" name="poll[questions_attributes][' + questionNum + '][answers_attributes]['+ answerNum +'][_destroy]" value="true" >')
    $answerLi.append($deleteInput);
  }, 
  
  displayErrors: function (model, xhr) {
    var $errorBox = $('#error_messages');
    $errorBox.html("");
    _.each(xhr.responseJSON, function (error) {
      $errorBox.append('<div class="error_message">' + error + '</div')
    });    
  }
});
