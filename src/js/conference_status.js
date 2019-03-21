var conferenceCode="IHLQXXWQAA";

function WhichDivToHide() {

    var endpoint;
    if(getUrlParameter('postRegCode')!=''){
       endpoint=getWsUrl("post_reg",conferenceCode,getUrlParameter('postRegCode'))
    } else {
        endpoint=getWsUrl("info",conferenceCode)
    }

    $.ajax({
        type: "GET",
        url: endpoint,
        dataType: "json",
        success: function(data) {
            HiddingDiv(data);
        },
        error: function(response) {
            console.log(response);
            if(response.status == 404){
                alertify.alert()
                    .setting({
                        'title': 'Conference Not Found',
                        'label':'OK',
                        'message': 'Could not find the Registration page for conference. Please use the correct URL or Contact Organizers.'
                    }).show();
            }else {
                alertify.alert()
                    .setting({
                        'title': 'Server Down',
                        'label':'OK',
                        'message': 'OOPS!! Something went wrong! Please try again later or Contact Organizers.'
                    }).show();
            }
            $('#loading_image').fadeOut();
        }
    });
}



function HiddingDiv(data) {
    var statuscode = data['statusCode'];
    conferenceCode = data['conferenceCode'];
    if (statuscode == -1) {
        var z = document.getElementById("registrationover");
        $('.regEnd').html(data['registrationEnd']);
        z.style.display = "block";
    } else if (statuscode == 0) {
        var z = document.getElementById("registrationonline");
        z.style.display = "block";
        configureRegistrationDropDown(data);
    } else if (statuscode == 1) {
        var z = document.getElementById("registrationnotstarted");
        $('.regStart').html(data['registrationStart']);
        $('.regEnd').html(data['registrationEnd']);
        z.style.display = "block";
    }
    $('#loading_image').fadeOut();
}

function configureRegistrationDropDown(data) {
    var fee_ddl = document.getElementById("registrationfee");
    for (i = 0; i < data.fees.length; i++) {
        var feeObj = data.fees[i];
        var regNameString = feeObj["name"];
        var regFeeInt = feeObj["amount"]; 
        var option = document.createElement("option");
        option.text = regNameString + " - $" + regFeeInt + ".0";
        option.value = regNameString + " " + regFeeInt;
        fee_ddl.add(option);
    }
}

function getUrlParameter(name) {

    name = name.replace(/[\[]/,'\\[').replace(/[\]]/,'\\]');

    var regex = new RegExp('[\\?&]' +name + '=([^&#]*)');

    var results = regex.exec(location.search);

    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g,' '));

}