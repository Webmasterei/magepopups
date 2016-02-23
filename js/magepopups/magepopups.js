jQuery(document).ready(function ($) {
// Set cookie to not call Popup after subscription
    $.fn.magepopups = function(widgetId) {

        var trigger = $("#"+widgetId).attr('trigger');
        var exitintent_delay = $("#"+widgetId).attr('exitintent_delay');
        var scrolldepth_value = parseInt( $("#"+widgetId).attr('scrolldepth'));
        var inactivity_delay = $("#"+widgetId).attr('inactivity_delay');
        var timeonpage = $("#"+widgetId).attr('timeonpage');
        var urlparameter = $("#"+widgetId).attr('parameter');
        var cookie = Cookies.get('popup');
        var opened = 0;

        $('.newsletter button').click(function () {
            Cookies.set('popup','submitted');
        })

        $(window).click( function(event) {
            if (event.target.id ==  widgetId) {
                $("#"+widgetId).fadeOut();
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
                        $("#"+widgetId).fadeIn();
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
                        $("#"+widgetId).fadeIn();
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
                        $("#"+widgetId).fadeIn();
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
                $("#"+widgetId).fadeIn();
            }
            var timeout = timeonpage * 1000;
            if (!cookie) {
                setTimeout(showbox, timeout);
            }
        }
        if(trigger=="urlparameter" && popup_parameter==urlparameter) {
            setTimeout(function() {
                    $("#"+widgetId).fadeIn();
            },1000);
        }
        $('#close').click(function(){
            $("#"+widgetId).fadeOut();
            Cookies.set('popup', 'closed' , {expires:7});
        });
        $('#deletecookie').click( function() {
            Cookies.remove('popup');
        });
    }
});


