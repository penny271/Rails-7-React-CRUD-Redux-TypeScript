# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins 'http://localhost:3000'
    origins '*'
    resource '*', header: :any, methods: %i[get post patch put delete]
  end
end