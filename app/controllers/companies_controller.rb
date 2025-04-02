# CompaniesController handles all company-related operations
# Provides CRUD (Create, Read, Update, Delete) functionality for companies
class CompaniesController < ApplicationController
  # Set the company instance variable before show, update, and destroy actions
  before_action :set_company, only: %i[ show update destroy ]

  # GET /companies
  # Returns a list of all companies in JSON format
  def index
    @companies = Company.all
    render json: @companies
  end

  # GET /companies/1
  # Returns details of a specific company in JSON format
  def show
    render json: @company
  end

  # POST /companies
  # Creates a new company with the provided parameters
  # Returns the created company if successful, or errors if validation fails
  def create
    @company = Company.new(company_params)

    if @company.save
      render json: @company, status: :created, location: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /companies/1
  # Updates an existing company with the provided parameters
  # Returns the updated company if successful, or errors if validation fails
  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  # DELETE /companies/1
  # Deletes a specific company
  # Returns no content on successful deletion
  def destroy
    @company.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Finds the company by ID from the request parameters
    def set_company
      @company = Company.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    # Defines the permitted parameters for company creation and updates
    def company_params
      params.expect(company: [ :name ])
    end
end
