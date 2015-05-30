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

  window.onload = function() {
  var elevator = new Elevator({
    element: document.querySelector('.elevator-button'),
    mainAudio: '../src/elevator.mp3',
    endAudio: '../src/ding.mp3'
  });
}

// You can run the elevator, by calling.


});
