$('.count').counterUp({
    delay: 10,
    time: 1000
});


$(document).ready(function() {
    $('#emailButton').on('click', function(event) {
        event.preventDefault();  // Prevent any default action

        var email = 'ritu.basak01@gmail.com';
        var subject = 'Subject Here';
        var fullName = $('#fname').val() +' '+ $('#lname').val();
        var email = $('#email').val();
        var num = $('#num').val();
        var mess = $('#mess').val();
        var body = 'Name: '+ fullName +'%0D%0A Email: '+ email +'%0D%0A Phone Number: '+ num +'%0D%0A Message: ' + mess;

        // Create the mailto link
        var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

        window.location.href = mailtoLink;
    });
});

