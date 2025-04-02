# ApplicationController is the base controller for all controllers in the application
# Inherits from ActionController::API to provide API-only functionality
# This means the application is configured as a JSON API without view rendering
class ApplicationController < ActionController::API
end
