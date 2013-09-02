collection @polls
attributes :id, :title
child(:questions) do
  attributes :id, :poll_id, :value
  child(:answers) do
    attributes :id, :question_id, :value
    node(:votes) { |answer| answer.votes.count }
  end
end