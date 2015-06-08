class CreateInvoiceSummaries < ActiveRecord::Migration
  def change
    create_table :invoice_summaries do |t|
      t.string :title,  null: false
      t.date :due_date, null: false
      t.string :customer_name, null: false
      t.string :customer_email, null: false
      t.string :state
      t.decimal :tax_rate
      t.string :atpay_invoice_uuid
      t.timestamps null: false
    end
  end
end
