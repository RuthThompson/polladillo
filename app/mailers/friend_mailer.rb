class FriendMailer < ActionMailer::Base
  def friend_email(poll, emails)
    @poll = poll
    from = "#{poll.user.username} <#{poll.user.email}>"
    subject = "Vote on \"#{poll.title}\" at Polladillo"
    to = emails
    mail(to: emails, subject: subject, from: from)
  end
end
