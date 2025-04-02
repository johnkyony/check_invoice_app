# CheckInvoicesController handles the relationship between checks and invoices
# Provides CRUD (Create, Read, Update, Delete) functionality for check-invoice associations
# Manages the many-to-many relationship between checks and invoices
class CheckInvoicesController < ApplicationController
  # Set the check_invoice instance variable before show, update, and destroy actions
  before_action :set_check_invoice, only: %i[ show update destroy ]

  # GET /check_invoices
  # Returns a list of all check-invoice associations in JSON format
  def index
    @check_invoices = CheckInvoice.all
    render json: @check_invoices
  end

  # GET /check_invoices/1
  # Returns details of a specific check-invoice association in JSON format
  def show
    render json: @check_invoice
  end

  # POST /check_invoices
  # Creates a new check-invoice association with the provided parameters
  # Returns the created association if successful, or errors if validation fails
  def create
    @check_invoice = CheckInvoice.new(check_invoice_params)

    if @check_invoice.save
      render json: @check_invoice, status: :created, location: @check_invoice
    else
      render json: @check_invoice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /check_invoices/1
  # Updates an existing check-invoice association with the provided parameters
  # Returns the updated association if successful, or errors if validation fails
  def update
    if @check_invoice.update(check_invoice_params)
      render json: @check_invoice
    else
      render json: @check_invoice.errors, status: :unprocessable_entity
    end
  end

  # DELETE /check_invoices/1
  # Deletes a specific check-invoice association
  # Returns no content on successful deletion
  def destroy
    @check_invoice.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Finds the check-invoice association by ID from the request parameters
    def set_check_invoice
      @check_invoice = CheckInvoice.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    # Defines the permitted parameters for check-invoice association creation and updates
    # Allows check_id and invoice_id to be set
    def check_invoice_params
      params.expect(check_invoice: [ :check_id, :invoice_id ])
    end
end
