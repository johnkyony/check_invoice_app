# CheckInvoice model for managing the relationship between checks and invoices
# Acts as a join table to track which checks are associated with which invoices
# Enables many-to-many relationship between checks and invoices
class CheckInvoice < ApplicationRecord
  # Associates the record with a check
  # Each record must belong to a check
  belongs_to :check

  # Associates the record with an invoice
  # Each record must belong to an invoice
  belongs_to :invoice
end
