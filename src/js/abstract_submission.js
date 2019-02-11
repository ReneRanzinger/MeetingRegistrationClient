$("#short_talk").on('change', function() {
  if ($(this).is(':checked')) {
    $(this).attr('value', 'true');
  } else {
    $(this).attr('value', 'false');
  }
});

$(function () {

  $('#data').validator();

  $("form#data").submit(function(e) {
    e.preventDefault();

    $('#loading_image').fadeIn();

    var formData = new FormData();
    formData.append("confirmationNumber",$("#confirmation_number").val());
    formData.append("email",$("#email").val());
    formData.append("abstractTitle",$("#abstract_title").val());
    formData.append("file",document.getElementById('browseButton').files[0]);
    formData.append("considerTalk",$("#short_talk").val());

    $.ajax({
      type: 'POST',
      url: getWsUrl("abstract_submit"),
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (response) {
        var responseMessage = response['message'];
        sessionStorage.setItem("responseMessage", responseMessage);
        window.location='./confirmation.html';
        $('#loading_image').fadeOut(); 
      },
      error: function (response) {
          if(response.status < 500){
            var messageAlert = 'alert-danger';
            var messageText = response.responseJSON.errors.toString();

            // let's compose Bootstrap alert box HTML
            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            // inject the alert to .messages div in our form
            $('#data').find('.messages').html(alertBox);
            var messagebox = document.getElementById("error-messages-box");
            messagebox.scrollIntoView();
            $('#loading_image').fadeOut();
        }else{
          alertify.alert()
                          .setting({
                              'title': 'Registration Failed',
                              'label':'OK',
                              'message': 'OOPS!! Something went wrong! Please try again later.'
                            }).show();
        }
        $('#loading_image').fadeOut();
      }
    });
  });
});
  