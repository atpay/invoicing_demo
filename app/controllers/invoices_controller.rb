class InvoicesController < ApplicationController

  def index
    @invoiceSummaries = InvoiceSummary.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @invoiceSummaries }
    end

  end

  def new

  end

  def create

    binding.pry

    invoiceSummary = InvoiceSummary.new
    invoiceSummary.customer_email = params["invoicecustomeremail"]
    invoiceSummary.title = params["invoicecustomeremail"]
    invoiceSummary.due_date = params["invoiceduedate"]
    invoiceSummary.customer_name = params["invoicecustomername"]
    invoiceSummary.atpay_invoice_uuid = params["atpay_invoice_uuid"]
    invoiceSummary.created_at = Time.now
    invoiceSummary.save

    invoiceId = invoiceSummary.id

    params.each do |key, value|
      if key.to_s.include? "invoiceitem"
        invoiceItemArray = value.split(',')

        invoiceItem = InvoiceItem.new
        invoiceItem.invoice_summary_id = invoiceSummary.id
        invoiceItem.amount = invoiceItemArray[2]
        invoiceItem.created_at = Time.now
        invoiceItem.date = invoiceItemArray[4]
        invoiceItem.name = invoiceItemArray[0]
        invoiceItem.description = invoiceItemArray[1]
        invoiceItem.quantity = invoiceItemArray[3]
        invoiceItem.save
      end

    end

      redirect_to "/invoices"

  end
end
