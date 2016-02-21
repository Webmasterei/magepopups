jQuery(document).ready(function ($) {
// Set cookie to not call Popup after subscription
    $('.newsletter button').click(function () {
        Cookies.set('popup','submitted');
    })
    var modal = document.getElementById('shadowbox');

    $(window).click( function(event) {
        if (event.target ==  modal) {
            $(modal).fadeOut();
        }
    });
    var copyEmailBtn = document.querySelector('.emailcopybtn');
    if(copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function(event) {
        var emailLink = document.querySelector('.coupon input');
        var range = document.createRange();
        range.selectNode(emailLink);
        window.getSelection().addRange(range);
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            $('.coupon input').css('background-color',"#2c87f0");
            $('.coupon input').css('color',"white");
        } catch(err) {
        }
        window.getSelection().removeAllRanges();
    });
    }

    var trigger = $('#shadowbox').attr('trigger')
    var exitintent_delay = $('#shadowbox').attr('exitintent_delay')
    var scrolldepth_value =parseInt( $('#shadowbox').attr('scrolldepth'))
    var inactivity_delay = $('#shadowbox').attr('inactivity_delay')
    var timeonpage = $('#shadowbox').attr('timeonpage')
    var urlparameter = $('#shadowbox').attr('parameter')
    var cookie = Cookies.get('popup')
    var opened = 0;

    function getUrlParameter(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }
    var popup_parameter = getUrlParameter('popup');


    if(!cookie && trigger=="exitintent") {
        $(document).on('mouseleave', leaveFromTop);
        function leaveFromTop(e){
            if( e.clientY < 60 && opened==0) {
                setTimeout(function() {
                    $('#shadowbox').fadeIn();
                },exitintent_delay);
            opened = 1;
            }
        }
    }
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
    if(!cookie && trigger=="timeonpage") {
        function showbox() {
            $('#shadowbox').fadeIn();
        }
        var timeout = timeonpage * 1000;
        if (!cookie) {
            setTimeout(showbox, timeout);
        }
    }
    if(trigger=="urlparameter" && popup_parameter==urlparameter) {
            $('#shadowbox').fadeIn();
    }
    $('#close').click(function(){
        $('#shadowbox').fadeOut();
        Cookies.set('popup', 'closed' , {expires:7});
    });
    $('#deletecookie').click( function() {
            Cookies.remove('popup');
    });
});


