


function PopulateData(){

    var x = document.getElementById("registrationStatusDisplay");
    $('.responseStatus').html("Confirmation email has been sent. Please check your email.");
    var responseMessage = sessionStorage.getItem("responseMessage");
    responseMessage = responseMessage.replace(/(\n)/g, '<br>');
    responseMessage = responseMessage.replace('http://glycomics.ccrc.uga.edu/meetings/sfg/GlycoInformaticsSatelliteProgram.pdf', '<a href="http://glycomics.ccrc.uga.edu/meetings/sfg/GlycoInformaticsSatelliteProgram.pdf" target="_blank">GlycoInformaticsSatelliteProgram</a>');
    responseMessage = responseMessage.replace('Please note:', '<span style="font-weight: bold;color:#a70505;">Please note:</span>');
    $('.responseString').html(responseMessage);
    x.style.display = "block";
}