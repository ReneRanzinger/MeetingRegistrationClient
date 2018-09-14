function WhichDivToHide() {
    $.ajax({
        type: "GET",
        url: getWsUrl("info","XABKSHRKZU"),
    //    url: getWsUrl("post_reg","A01","A001"),
        dataType: "json",
        success: function(data) {
            HiddingDiv(data);
        },
        error: function(response) {
            console.log(response);
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