


function PopulateData(){

    var x = document.getElementById("registrationStatusDisplay");
    $('.responseStatus').html("Confirmation email has been sent. Please check your email.");
    $('.responseString').html(sessionStorage.getItem("responseMessage"));
    x.style.display = "block";
}