function calc_total(){
    var sum = 0;
    $('.input-amount').each(function(){
        sum += parseFloat($(this).text().replace('$',''));
    });
    $(".preview-subtotal").text('$' + sum.toFixed(2));
    $(".preview-total").text('$' + (sum * 1.0512).toFixed(2));
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
        form_data["amount"] = '$' + (parseFloat($('.payment-form input[name="amount"]').val()).toFixed(2) * $('.payment-form #quantity option:selected').text()).toFixed(2);
        form_data["quantity"] = $('.payment-form #quantity option:selected').text();
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

        var breakdown = [];
        $('.preview-table > tbody  > tr').each(function(i) {
            var $tds = $(this).find('td'),
                name = $tds.eq(0).text(),
                description = $tds.eq(1).text(),
                amount = $tds.eq(2).text(),
                quantity = $tds.eq(3).text(),
                date = $tds.eq(4).text();

                breakdown.push( { name: name, amount: amount.replace('$', ''), quantity: quantity });

                var input = $("<input>")
                    .attr("type", "hidden")
                    .attr("name", "invoiceitem" + i).val(name + ',' + description + ',' + amount + ',' + quantity + ',' + date );

                $('#atpay-invoicing').append($(input));
        });


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

/*        custom_fields = [
            {name: "invoiceNumber", required: true},
            {name: "another_one",  required: true},
            {name: "optional_one", required: false}
        ]*/

        properties= {
            requires_shipping_address	: false ,
            requires_billing_address	: false,
            shipping_address		    : shipping,
            billing_address			    : billing,
            //request_custom_data		    : custom_fields,
            item_details			    : 'Really more like offer details. This will Show up on hosted PCP.',
            name				        : 'Sets offer/token name. Will also show up on hosted PCP',
            item_quantity			    : 9999,
            expires_in_seconds		    : 999999,
            auth_only			        : false
        }


        atpay.invoice($("#invoicecustomeremail").val, "Bulk Invoice", "Please review your order details below:", breakdown, properties,
            function(response){
                var invoice   = response.invoice;
                alert('test');
                uuid  = invoice.uuid;
                $("#atpay_invoice_uuid").val(uuid);
                $("#atpay-invoicing").unbind('submit').submit();
            }
        );

    });
});
