# Check model for managing check records
# Represents a financial check in the system
# Associated with a company and can be linked to invoices
class Check < ApplicationRecord
  # Associates the check with a company
  # Each check must belong to a company
  belongs_to :company
end
