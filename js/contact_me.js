$(function() {
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      var data = {
        service_id: 'rimorin@gmail.com',
        template_id: 'template_n5uxH0J1',
        user_id: 'user_S64QlZRZsvoEhAd4tjG7I',
        template_params: {
          'reply_to': email,
          'to_name': 'John Eric',
          'phone_no' : phone,
          'from_name': name,
          'message_html': message
        }
      };  

      $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
      }).done(function () {
        //Success message
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
        $('#success > .alert-success')
          .append("<strong>Your message has been sent. </strong>");
        $('#success > .alert-success')
          .append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      }).fail(function (error) {
        //alert('Oops... ' + JSON.stringify(error));
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
        $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      }).always(function () {
        setTimeout(function () {
          $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
        }, 1000);
      });;

      // $.ajax({
      //   url: "././mail/contact_me.php",
      //   type: "POST",
      //   data: {
      //     name: name,
      //     phone: phone,
      //     email: email,
      //     message: message
      //   },
      //   cache: false,
      //   crossDomain: true,
      //   success: function() {
      //     // Success message
      //     $('#success').html("<div class='alert alert-success'>");
      //     $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
      //       .append("</button>");
      //     $('#success > .alert-success')
      //       .append("<strong>Your message has been sent. </strong>");
      //     $('#success > .alert-success')
      //       .append('</div>');
      //     //clear all fields
      //     $('#contactForm').trigger("reset");
      //   },
      //   error: function() {
      //     // Fail message
      //     $('#success').html("<div class='alert alert-danger'>");
      //     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
      //       .append("</button>");
      //     $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
      //     $('#success > .alert-danger').append('</div>');
      //     //clear all fields
      //     $('#contactForm').trigger("reset");
      //   },
      //   complete: function() {
      //     setTimeout(function() {
      //       $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
      //     }, 1000);
      //   }
      // });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
