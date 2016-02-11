document.addEventListener( 'DOMContentLoaded', function () {

    // Get the modal
    var modal = document.getElementById('shadowbox');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");




    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}, false );

jQuery(document).ready(function ($) {
// Set cookie to not call Popup after subscription
    $('.newsletter button').click(function () {
        Cookies.set('popup','submitted');
    })

    var copyEmailBtn = document.querySelector('.emailcopybtn');
    if(copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function(event) {
        // Select the email link anchor text
        var emailLink = document.querySelector('.coupon input');
        var range = document.createRange();
        range.selectNode(emailLink);
        window.getSelection().addRange(range);

        try {
            // Now that we've selected the anchor text, execute the copy command
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            $('.coupon input').css('background-color',"#2c87f0");
            $('.coupon input').css('color',"white");
        } catch(err) {
        }

        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported
        window.getSelection().removeAllRanges();
    });
    }
});


