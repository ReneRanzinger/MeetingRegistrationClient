var conferenceCode;
var regfeeobject;
var selectedRegFee;
var titleselected;
var orgtypeselected;
var dietselected;


function RegistrationSuccess() {
    getselectedtitlevalue();
    getSelectedRegistrationFee();
    getselectedorgtypevalue();
    getselecteddietvalue()

    var title = titleselected;
    var first_name = $("#first_name").val();
    var middle_name = $("#middle_name").val();
    var last_name = $("#last_name").val();
    var phone_num = $("#phone_num").val();
    var email = $("#email").val();
    var re_enter_email = $("#re_enter_email").val();
    var address = $("#address").val();
    var profession = $("#profession").val();
    var registration_fee = regfeeobject;
    var promo_code = $("#promo_code").val();
    var department = $("#department").val();
    var organization = $("#organization").val();
    var organization_type = orgtypeselected;
    var diet = dietselected;
    var comments = $("#comments").val();

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
        fee: regfeeobject,
        comment: comments,
        diet: diet
    };
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

function getselectedtitlevalue() {
    var titleddl = document.getElementById("title");
    titleselected = titleddl.options[titleddl.selectedIndex].value;
}

function getselectedorgtypevalue() {
    var orgtypeddl = document.getElementById("organizationtype");
    orgtypeselected = orgtypeddl.options[orgtypeddl.selectedIndex].value;
}

function getselecteddietvalue() {
    var dietddl = document.getElementById("diet");
    dietselected = dietddl.options[dietddl.selectedIndex].value;
}

function getSelectedRegistrationFee() {
    var regfeeddl = document.getElementById("registrationfee");
    selectedRegFee = regfeeddl.options[regfeeddl.selectedIndex].value;
    var selectedRegFeeSplit = selectedRegFee.split(" ");
    var conregfee = '';
    for (i = 0; i < selectedRegFeeSplit.length - 1; i++) {
        conregfee = conregfee + selectedRegFeeSplit[i] + " ";
    }
    regfeeobject = { "name": conregfee, "amount": parseInt(selectedRegFeeSplit[selectedRegFeeSplit.length - 1] + 0.0) };

}

function WhichDivToHide() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/conference/info/A02",
        dataType: "json",
        success: function(data) {
            HiddingDiv(data);
        },
        error: function(response) {
            hideAllFirst();
            console.log(response);
            alert('fail');
        }
    });
}

function hideAllFirst() {
    var x = document.getElementById("registrationonline");
    var y = document.getElementById("registrationnotstarted");
    var z = document.getElementById("registrationover");
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";
}

function HiddingDiv(data) {
    var statuscode = data['statusCode'];
    conferenceCode = data['conferenceCode'];
    configureRegistrationDropDown(data);
    if (statuscode == -1) {
        var x = document.getElementById("registrationonline");
        var y = document.getElementById("registrationnotstarted");
        var z = document.getElementById("registrationover");
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        alert('sucess');
    }
    if (statuscode == 0) {

        var x = document.getElementById("registrationover");
        var y = document.getElementById("registrationnotstarted");
        var z = document.getElementById("registrationonline");
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        alert('sucess');
    }
    if (statuscode == 1) {
        var x = document.getElementById("registrationonline");
        var y = document.getElementById("registrationover");
        var z = document.getElementById("registrationnotstarted");
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "block";
        alert('sucess');
    }
}

function ChooseFile() {
    var chooseFileButton = document.getElementById("choose_file_button");
    chooseFileButton.setAttribute("type", "file");
    document.body.appendChild(x);
}

function configureRegistrationDropDown(data) {
    var regddl = document.getElementById("registrationfee");
    for (i = 0; i < data.fees.length; i++) {
        var feeObj = data.fees[i];
        var regNameString = feeObj["name"];
        var regFeeInt = feeObj["amount"];
        var conregoption = regNameString + " " + regFeeInt;
        var option = document.createElement("option");
        option.text = conregoption;
        option.value = conregoption;
        regddl.add(option);
    }
}