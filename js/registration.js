var conferenceCode;


function RegistrationSuccess() {
    var title = $("#title").val();
    var first_name = $("#first_name").val();
    var middle_name = $("#middle_name").val();
    var last_name = $("#last_name").val();
    var phone_num = $("#phone_num");
    var email = $("#email").val();
    var re_enter_email = $("#re_enter_email").val();
    var address = $("#address");
    var profession = $("#profession");
    var registration_fee = $("#registration_fee").val();
    var promo_code = $("#promo_code")
    var department = $("#department").val();
    var organization = $("#organization").val();
    var organization_type = $("#organizationtype").val;
    var diet = $("#diet").val;

    var comments = $("#comments").val();

    var form_object = {
        operation: "AND",
        query_type: "registration_query",
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
        fee: registration_fee,
        diet: diet,
        comment: comments
    };
    var json = "query=" + JSON.stringify(form_object);
    $.ajax({
        type: 'post',
        url: "",
        data: json,
        success: function(results) {
            var resultJSONobj = $.parseJSON(results);

        }
    });
}

function WhichDivToHide() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/conference/info/A01",
        dataType: "json",
        success: HiddingDiv,
        error: function(response) {
            console.log(response);
            alert('fail');
        }
    });
}

function HiddingDiv(response) {
    var whattohideJSONobj = response;
    var statuscode = response["statusCode"];
    conferenceCode = response["conferenceCode"];
    if (statuscode == -1) {
        var x = document.getElementById("registrationonline");
        var y = document.getElementById("registrationnotstarted");
        x.style.display = "none";
        y.style.display = "none";
        console.log(response);
        alert('sucess');
    }
    if (statuscode == 0) {

        var x = document.getElementById("registrationover");
        var y = document.getElementById("registrationnotstarted");
        x.style.display = "none";
        y.style.display = "none";
        console.log(response);
        alert('sucess');
    }
    if (statuscode == 1) {
        var x = document.getElementById("registrationonline");
        var y = document.getElementById("registrationover");
        x.style.display = "none";
        y.style.display = "none";
        console.log(response);
        alert('sucess');
    }
}

function ChooseFile() {
    var chooseFileButton = document.getElementById("choose_file_button");
    chooseFileButton.setAttribute("type", "file");
    document.body.appendChild(x);
}