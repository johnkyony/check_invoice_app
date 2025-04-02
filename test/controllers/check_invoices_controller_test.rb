require "test_helper"

class CheckInvoicesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @check_invoice = check_invoices(:one)
  end

  test "should get index" do
    get check_invoices_url, as: :json
    assert_response :success
  end

  test "should create check_invoice" do
    assert_difference("CheckInvoice.count") do
      post check_invoices_url, params: { check_invoice: { check_id: @check_invoice.check_id, invoice_id: @check_invoice.invoice_id } }, as: :json
    end

    assert_response :created
  end

  test "should show check_invoice" do
    get check_invoice_url(@check_invoice), as: :json
    assert_response :success
  end

  test "should update check_invoice" do
    patch check_invoice_url(@check_invoice), params: { check_invoice: { check_id: @check_invoice.check_id, invoice_id: @check_invoice.invoice_id } }, as: :json
    assert_response :success
  end

  test "should destroy check_invoice" do
    assert_difference("CheckInvoice.count", -1) do
      delete check_invoice_url(@check_invoice), as: :json
    end

    assert_response :no_content
  end
end
