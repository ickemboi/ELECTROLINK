// get current year
(function () {
    var year = new Date().getFullYear();
    document.querySelector("#currentYear").innerHTML = year;
})();

// scripts.js
$(document).ready(function() {
    $('#subscribe-form').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        var email = $('#email').val();

        $.ajax({
            url: '/subscribe',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email }),
            success: function(response) {
                alert('Subscription successful!');
            },
            error: function(error) {
                alert('An error occurred: ' + error.responseText);
            }
        });
    });
});
