class CreateInvoiceStatuses < ActiveRecord::Migration
  def change
    create_table :invoice_statuses do |t|
      t.belongs_to :invoice_summary, index:true
      t.string :status
      t.string :notes
      t.timestamps null: false
    end
  end
end
