class CreateInvoiceItems < ActiveRecord::Migration
  def change
    create_table :invoice_items do |t|
      t.belongs_to :invoice_summary, index:true
      t.string :name, null: false
      t.string :description, null: false
      t.decimal :amount, null: false
      t.integer :quantity, null: false
      t.date :date
      t.timestamps null: false
    end
  end
end
