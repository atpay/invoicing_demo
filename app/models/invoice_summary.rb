class InvoiceSummary < ActiveRecord::Base
  has_many :invoice_items
  has_many :invoice_statuses

end
