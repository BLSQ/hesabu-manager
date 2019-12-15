# myapp.rb
require 'sinatra'

def simulation_id_based_on_org_unit_and_period(org_unit, period)
  all = JSON.parse(File.read("data/simulations.json"))
  response = all["data"].detect do |h|
    puts h
    puts h["attributes"]["orgUnit"]
    puts h["attributes"]["dhis2Period"]
    h["attributes"]["orgUnit"] == org_unit &&
      h["attributes"]["dhis2Period"] == period
  end
  if response
    response["id"]
  else
    nil
  end
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/' do
  'Hello world!'
end

get '/api/simulations' do
  content_type :json
  File.read("data/simulations.json")
end

# Filter to a specific simulation
#
# Needs ?orgUnit=bla&periods=2019Q1
get '/api/simulation' do
  org_unit = params[:orgUnit] || ""
  period = params[:periods].split(",").first
  identifier = simulation_id_based_on_org_unit_and_period(org_unit, period)

  if identifier && path = Dir.glob("data/*#{identifier}.json").first
    File.read(path)
  else
    not_found
  end
end

get %r{/api/simulations/([0-9]+)} do |identifier|
  content_type :json
  periods = params[:periods]
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

# Without a term will return all known org units
# With a ?term will filter on name
# With a ?id will filter on id
get '/api/org_units' do
  content_type :json
  all_json = File.read("data/all_orgunits.json")
  if id = params[:id]
    units = JSON.parse(all_json)["data"]
    units = units.select {|h| h["id"] == id }
    {data: units}.to_json
  elsif term = params[:term]
    units = JSON.parse(all_json)["data"]
    units = units.select {|h| h["attributes"]["displayName"].downcase.include?(term.downcase) }
    {data: units}.to_json
  else
    all_json
  end

end
