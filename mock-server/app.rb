# myapp.rb
require 'sinatra'

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/' do
  'Hello world!'
end

get '/api/simulations/:identifier' do
  content_type :json
  File.read('data/simulation-result.json')
end

get '/s3/result' do
  content_type :json
  File.read('data/s3-result.json')
end
