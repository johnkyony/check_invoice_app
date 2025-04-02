# Invoice model for managing invoice records
# Represents a financial invoice in the system
# Associated with a company and can be linked to checks
class Invoice < ApplicationRecord
  # Associates the invoice with a company
  # Each invoice must belong to a company
  belongs_to :company
end
