function calc_total(){
    var sum = 0;
    $('.input-amount').each(function(){
        sum += parseFloat($(this).text());
    });
    $(".preview-total").text(sum);
}
$(document).on('click', '.input-remove-row', function(){
    var tr = $(this).closest('tr');
    tr.fadeOut(200, function(){
        tr.remove();
        calc_total()
    });
});

$(function(){
    $('.preview-add-button').click(function(){
        var form_data = {};
        form_data["name"] = $('.payment-form input[name="name"]').val();
        form_data["description"] = $('.payment-form input[name="description"]').val();
        form_data["amount"] = parseFloat($('.payment-form input[name="amount"]').val()).toFixed(2);
        form_data["status"] = $('.payment-form #status option:selected').text();
        form_data["date"] = $('.payment-form input[name="date"]').val();
        form_data["remove-row"] = '<span class="glyphicon glyphicon-remove"></span>';
        var row = $('<tr></tr>');
        $.each(form_data, function( type, value ) {
            $('<td class="input-'+type+'"></td>').html(value).appendTo(row);
        });
        $('.preview-table > tbody:last').append(row);
        calc_total();
    });
});

$(document).on('keyup', '#invoicetitle', function(){
    $("#invoicetitledisplay").html($("#invoicetitle").val());
});

$(document).on('keyup', '#invoicenumber', function(){
    $("#invoicenumberdisplay").html($("#invoicenumber").val());
});

$(function(){
    atpay.config({
        partner_id: 340
    });
});

function returnFunc(data) {
    alert(data);
}

$(document).ready(function() {
    $("#atpay-invoicing").submit(function(e) {
        e.preventDefault();

        breakdown = [
            {name: "Red #353", amount: 0.10, quantity: 2},
            {name: "Blue #533", amount: .10, quantity: 1},
            {name: "NM 'Sales Tax", amount: 0.10, quantity: 1}
        ]

        billing = {
            street  : "123 Billing",
            street2 : "",
            city    : "City Of Billing",
            state   : "Billing State",
            zip     : "91010"
        }

        shipping = {
            street  : "123 shipping",
            street2 : "",
            city    : "City Of shipping",
            state   : "Shipping State",
            zip     : "91010"
        }

        custom_fields = [
            {name: "custom_field", required: true},
            {name: "another_one",  required: true},
            {name: "optional_one", required: false}
        ]

        properties= {
            requires_shipping_address	: true,
            requires_billing_address	: true,
            shipping_address		    : shipping,
            billing_address			    : billing,
            request_custom_data		    : custom_fields,
            item_details			    : 'Really more like offer details. This will Show up on hosted PCP.',
            name				        : 'Sets offer/token name. Will also show up on hosted PCP',
            item_quantity			    : 9999,
            expires_in_seconds		    : 999999,
            auth_only			        : false
        }


        atpay.invoice("tyler@atpay.com", "Bulk Invoice", "Please review your order details below:", breakdown, properties,
            function(response){
                var invoice       = response.invoice;
                var invoice_uuid  = invoice.uuid;
                alert (invoice_uuid);
            }
        );
    });
});
