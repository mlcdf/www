$(document).ready(function() {

  'use strict';
  console.log('Hey there !');

  $('form').submit(function() {

    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: 'contact.php',
      data: $('form').serialize(),
      success: function() {
        $('#confirmation').text('Message successfully sent. Thank you !');
      },
      error: function() {
        $('#confirmation').text('Something went wrong. Please try again.');
      }
    });
  });

});
