class VotesController < ApplicationController
  
  def create
    @votes = Vote.create!(params[:votes])
    push_notification_to_poll(@votes.first.poll)
    render :json => @votes
  end
  
  def from_text
    @answer = Answer.find(params[:Body].to_i)
    if @answer
      Vote.create({:answer_id => @answer.id})
      push_notification_to_poll(@answer.poll)
      twiml = Twilio::TwiML::Response.new do |r|
          r.Sms "Thanks for voting! 
                 -- Polladillo"
        end
        text = twiml.text
        render :text => text
    else
      render :nothing => true
    end
  end
  
  private
  def push_notification_to_poll(poll)
    @poll = poll
    poll_id = @poll.id
    poll_data = Rabl.render(@poll, "show", :view_path => 'app/views/polls', :format => :json)
    Pusher.url = "http://beb17ccd0585f1c87905:d080f4f24d4b98dea11e@api.pusherapp.com/apps/53324"
    Pusher["poll_#{poll_id}"].trigger('updated', { :poll => poll_data })
  end
end
