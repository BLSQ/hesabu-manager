# myapp.rb
require 'sinatra'

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/' do
  'Hello world!'
end

get '/api/simulations/:identifier' do |identifier|
  puts identifier
  content_type :json
  if path = Dir.glob("data/*#{identifier}.json").first
    File.read(path)
  else
    not_found
  end
end

get '/s3/results/:identifier.json' do |identifier|
  content_type :json
  if path = Dir.glob("data/s3/*#{identifier}.json").first
    File.read(path)
  else
    not_found
  end
end
