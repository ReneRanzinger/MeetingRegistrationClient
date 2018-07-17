function RegistrationSuccess() {
    var title = $("#title").val();
    var firstname = $("#firstname").val();
    var middlename = $("#middlename").val();
    var lastname = $("#lastname").val();
    var registrationfee = $("#registrationfee").val();
    var department = $("#department").val();
    var organization = $("#organization").val();
    var organizationtype = $().val("#organizationtype");
    var email = $("#email").val();
    var reenteremail = $("#reenteremail").val();
    var comments = $("#comments").val();

    var formObject = {
        operation: "AND",
        query_type: "registration_query",
        title: title,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        registrationfee: registrationfee,
        department: department,
        organization: organization,
        organizationtype: organizationtype,
        email: email,
        reenteremail: reenteremail,
        comments: comments

    };
    var json = "query=" + JSON.stringify(formObject);
    $.ajax({
        type: 'post',
        url: getWsUrl("search_protein"),
        data: json,
        success: function(results) {
            if (results.list_id) {
                window.location = './protein_list.html?id=' + results.list_id;
            } else {
                displayErrorByCode("server-down")
            }

        }
    });
}