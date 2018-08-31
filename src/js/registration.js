var conferenceCode;
//var orgtypeselected;


function RegistrationSuccess() {
  //  getselectedorgtypevalue();
    

    var title_ddl = document.getElementById("title");    
    var title = title_ddl.options[title_ddl.selectedIndex].value;
    var first_name = $("#first_name").val();
    var middle_name = $("#middle_name").val();
    var last_name = $("#last_name").val();
    var phone_num = $("#phone_num").val();
    var email = $("#email").val();
    var address = $("#address").val();
    var profession = $("#profession").val();
    var promo_code = $("#promo_code").val();
    var department = $("#department").val();
    var organization = $("#organization").val();
    //var organization_type = orgtypeselected;
    var diet_ddl = document.getElementById("diet");
    var diet = diet_ddl.options[diet_ddl.selectedIndex].value;
    var comments = $("#comments").val();

    var selectedFee_ddl = document.getElementById("registrationfee");
    var selectedFee = selectedFee_ddl.options[selectedFee_ddl.selectedIndex].value;
    var FeeSplit = selectedFee.split(" ");
    var conregfee = '';
    for (i = 0; i < FeeSplit.length - 1; i++) {
        conregfee = conregfee + FeeSplit[i] + " ";
    }
    var FeeObject  = { "name": conregfee, "amount": parseFloat(FeeSplit[FeeSplit.length - 1])};

    var form_object = {
        conferenceCode: conferenceCode,
        title: title,
        firstName: first_name,
        middleName: middle_name,
        lastName: last_name,
        department: department,
        institution: organization,
        email: email,
        address: address,
        phone: phone_num,
        profession: profession,
        promotionCode: promo_code,
        fee: FeeObject,
        comment: comments,
        diet: diet
    };
    debugger;
    $.ajax({
        type: 'post',
        url: "http://localhost:8080/registration/register",
        // dataType: 'application/json',
        data: JSON.stringify(form_object),
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        success: function(results) {
            alert('sucess');
        },
        error: function(response) {
            console.log(response);
            alert('fail')
        }
    });
}

// function getselectedorgtypevalue() {
//     var orgtypeddl = document.getElementById("organizationtype");
//     orgtypeselected = orgtypeddl.options[orgtypeddl.selectedIndex].value;
// }

function WhichDivToHide() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/conference/info/A02",
        dataType: "json",
        success: function(data) {
            HiddingDiv(data);
        },
        error: function(response) {
           // hideAllFirst();
            console.log(response);
            alert('fail');
        }
    });
}



function HiddingDiv(data) {
    var statuscode =0; //data['statusCode'];
    conferenceCode = data['conferenceCode'];
    configureRegistrationDropDown(data);
    if (statuscode == -1) {
        var z = document.getElementById("registrationover");
        z.style.display = "block";
    }
    if (statuscode == 0) {
        var z = document.getElementById("registrationonline");
        z.style.display = "block";
    }
    if (statuscode == 1) {
        var z = document.getElementById("registrationnotstarted");
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
        option.text = regNameString + " - $" + regFeeInt;;
        option.value = regNameString + " " + regFeeInt;
        fee_ddl.add(option);
    }
}