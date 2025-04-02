# ChecksController handles all check-related operations
# Provides CRUD (Create, Read, Update, Delete) functionality for checks
# Includes image upload capabilities through Active Storage
class ChecksController < ApplicationController
  # Set the check instance variable before show, update, and destroy actions
  before_action :set_check, only: %i[ show update destroy ]

  # GET /checks
  # Returns a list of all checks in JSON format
  def index
    @checks = Check.all
    render json: @checks
  end

  # GET /checks/1
  # Returns details of a specific check in JSON format
  def show
    render json: @check
  end

  # POST /checks
  # Creates a new check with the provided parameters
  # Returns the created check if successful, or errors if validation fails
  def create
    @check = Check.new(check_params)

    if @check.save
      render json: @check, status: :created, location: @check
    else
      render json: @check.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /checks/1
  # Updates an existing check with the provided parameters
  # Returns the updated check if successful, or errors if validation fails
  def update
    if @check.update(check_params)
      render json: @check
    else
      render json: @check.errors, status: :unprocessable_entity
    end
  end

  # DELETE /checks/1
  # Deletes a specific check
  # Returns no content on successful deletion
  def destroy
    @check.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Finds the check by ID from the request parameters
    def set_check
      @check = Check.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    # Defines the permitted parameters for check creation and updates
    # Allows number, company_id, and image to be set
    def check_params
      params.expect(check: [ :number, :company_id, :image ])
    end
end
