# InvoicesController handles all invoice-related operations
# Provides CRUD (Create, Read, Update, Delete) functionality for invoices
class InvoicesController < ApplicationController
  # Set the invoice instance variable before show, update, and destroy actions
  before_action :set_invoice, only: %i[ show update destroy ]

  # GET /invoices
  # Returns a list of all invoices in JSON format
  def index
    @invoices = Invoice.all
    render json: @invoices
  end

  # GET /invoices/1
  # Returns details of a specific invoice in JSON format
  def show
    render json: @invoice
  end

  # POST /invoices
  # Creates a new invoice with the provided parameters
  # Returns the created invoice if successful, or errors if validation fails
  def create
    @invoice = Invoice.new(invoice_params)

    if @invoice.save
      render json: @invoice, status: :created, location: @invoice
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /invoices/1
  # Updates an existing invoice with the provided parameters
  # Returns the updated invoice if successful, or errors if validation fails
  def update
    if @invoice.update(invoice_params)
      render json: @invoice
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  # DELETE /invoices/1
  # Deletes a specific invoice
  # Returns no content on successful deletion
  def destroy
    @invoice.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # Finds the invoice by ID from the request parameters
    def set_invoice
      @invoice = Invoice.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    # Defines the permitted parameters for invoice creation and updates
    # Allows number and company_id to be set
    def invoice_params
      params.expect(invoice: [ :number, :company_id ])
    end
end
