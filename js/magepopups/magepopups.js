document.addEventListener( 'DOMContentLoaded', function () {

    // Get the modal
    var modal = document.getElementById('shadowbox');

    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");




    // When the user clicks the button, open the modal
   // btn.onclick = function() {
       // modal.style.display = "block";
    //}

    // When the user clicks on <span> (x), close the modal
   // span.onclick = function() {
   //     modal.style.display = "none";
   // }

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

// Get the trigger
    var trigger = $('#shadowbox').attr('trigger')
    var exitintent_delay = $('#shadowbox').attr('exitintent_delay')
    var scrolldepth_value =parseInt( $('#shadowbox').attr('scrolldepth'))
    var inactivity_delay = $('#shadowbox').attr('inactivity_delay')
    var timeonpage = $('#shadowbox').attr('timeonpage')
    var cookie = Cookies.get('popup')
    var opened = 0;
///DEBUG VALUES
//    console.log(trigger);
//    console.log(exitintent_delay);
//    console.log(scrolldepth_value);
//    console.log(inactivity_delay);
//    console.log(timeonpage);
//    console.log(cookie);
//    console.log(opened);
// EXITINTENT
    if(!cookie && trigger=="exitintent") {
        $( document ).on( "mousemove", function( event ) {
            if(event.pageY < 10 && opened==0) {
                setTimeout(function() {
                    $('#shadowbox').fadeIn();
                },exitintent_delay);
                opened = 1;
            }
        });
    }
// SCROLLDEPTH
    if(!cookie && trigger=="scrolldepth") {
        var height = $(document).height()-$(window).height();
        var scrolldepth = 0;
        var toTop = 0;
        var cookie = Cookies.get('popup')
        $(window).scroll(function(event) {
            toTop = $(window).scrollTop();
            scrolldepth = Math.round((toTop/height)*100);
            if(scrolldepth >= scrolldepth_value && opened==0) {
                if(!cookie) {
                    $('#shadowbox').fadeIn();
                    opened = 1
                }
            }
        });
    }
// Inactivity
    if(!cookie && trigger=="inactivity") {
        idleTime = 0;
        var idleInterval = setInterval(timerIncrement, 1000);

        function timerIncrement() {
            idleTime++;
            if (idleTime > inactivity_delay) {
                if (!cookie && opened == 0) {
                    $('#shadowbox').fadeIn();
                    opened = 1;
                }
            }
        }

        $(this).mousemove(function (e) {
            idleTime = 0;
        });
    }
// Time on Page
    if(!cookie && trigger=="timeonpage") {
        function showbox() {
            $('#shadowbox').fadeIn();
        }

        var timeout = timeonpage * 1000;

        if (!cookie) {
            setTimeout(showbox, timeout);
        }
    }
// Close button
    $('#close').click(function(){
        $('#shadowbox').fadeOut();
        Cookies.set('popup', 'closed' , {expires:7});
    });
});


