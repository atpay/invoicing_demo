class InvoiceStatusController < ApplicationController
  skip_before_filter :authenticate_user!
  protect_from_forgery :except => :create

  def index

  end

  def create
    render nothing: true

    invoiceStatus = InvoiceStatus.new
    data_json = JSON.parse request.body.read
    invoiceStatus.notes = data_json
    invoiceStatus.save

  end
end
