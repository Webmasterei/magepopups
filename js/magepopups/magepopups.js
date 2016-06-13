// Set the inital cookie

//Set Expire Time of the cookie

var daysToExpire = 30;
var firstVisitDate = new Date();
firstVisitDate = firstVisitDate.getTime();
if(!Cookies.get('magepopup')) {
    Cookies.set('magepopup', {
        first_visit_date: firstVisitDate,
        pages_visited: 0,
        closed_popup: 0,
        } , {
        expires: daysToExpire,
        domain: window.location.host
    });
}
// Get the cookie into variable
var cookie = Cookies.get('magepopup');
cookie = JSON.parse(cookie);
//Pages visited counter
pagesVisited = cookie.pages_visited;
pagesVisited++;
cookie.pages_visited = pagesVisited;
Cookies.set('magepopup', cookie)

jQuery(document).ready(function ($) {
// Set cookie to not call Popup after subscription
    $.fn.magepopups = function(widgetId) {
        var trigger = $("#"+widgetId).attr('trigger');
        var exitintent_delay = $("#"+widgetId).attr('exitintent_delay');
        var scrolldepth_value = parseInt( $("#"+widgetId).attr('scrolldepth'));
        var inactivity_delay = $("#"+widgetId).attr('inactivity_delay');
        var timeonpage = $("#"+widgetId).attr('timeonpage');
        var urlparameter = $("#"+widgetId).attr('parameter');
        var parameter = $("#"+widgetId).attr('parameter');
        var cookie = Cookies.get('magepopup');
        cookie = JSON.parse(cookie);
        closedPopup = cookie.closed_popup;
        pagesVisited = cookie.pages_visited;
        first_visit_date = cookie.first_visit_date;

        var opened = 0;

        $('.newsletter button').click(function () {
        //    Cookies.set('popup','submitted');
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

        if(closedPopup==0 && trigger=="exitintent") {
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

        if(!closedPopup && trigger=="scrolldepth") {
            var height = $(document).height()-$(window).height();
            var scrolldepth = 0;
            var toTop = 0;
            $(window).scroll(function(event) {
                toTop = $(window).scrollTop();
                scrolldepth = Math.round((toTop/height)*100);
                if(scrolldepth >= scrolldepth_value && opened==0) {
                        $("#"+widgetId).fadeIn();
                        opened = 1
                }
            });
        }
        if(!closedPopup && trigger=="inactivity") {
            idleTime = 0;
            var idleInterval = setInterval(timerIncrement, 1000);

            function timerIncrement() {
                idleTime++;
                if (idleTime > inactivity_delay) {
                    if (!opened) {
                        $("#"+widgetId).fadeIn();
                        opened = 1;
                    }
                }
            }
            $(this).mousemove(function (e) {
                idleTime = 0;
            });
        }
        if(!closedPopup && trigger=="timeonpage") {
            function showbox() {
                $("#"+widgetId).fadeIn();
            }
            var timeout = timeonpage * 1000;
            setTimeout(showbox, timeout);
        }
        if(!closedPopup && trigger=="timeondomain" ) {
            setInterval(function(){
                    var now = new Date();
                    now = now.getTime();
                    timeondomain = Math.round((now-first_visit_date)/1000);
                    if(timeondomain==parameter) {
                        $("#"+widgetId).fadeIn();
                    }
                },1000)
        }
        if(!closedPopup && trigger=="cart_product_attribute" && parameter==1) {
            $("#"+widgetId).fadeIn();
        }
        if(trigger=="urlparameter" && popup_parameter==urlparameter && !cookie.closed_popup) {
            setTimeout(function() {
                    $("#"+widgetId).fadeIn();
            },1000);
        }
        // N Pages visited
        if(!closedPopup && trigger=="visited_n_pages" && pagesVisited == parameter) {
            $("#"+widgetId).fadeIn();
        }

        $('#close').click(function(){
            $("#"+widgetId).fadeOut();
            $("#hide-box-"+widgetId).fadeIn();
            cookie.closed_popup = 1;
            Cookies.set('magepopup', cookie);
        });
        $(".shadowbox").click(function(){
            $("#"+widgetId).fadeOut();
            $("#hide-box-"+widgetId).fadeIn();
            cookie.closed_popup = 1;
            Cookies.set('magepopup', cookie);        });
        $("#hide-box-"+widgetId).click(function(){
            $("#"+widgetId).fadeIn();
        });
        $('#deletecookie').click( function() {
            Cookies.remove('magepopup');
        });
        if(cookie.closed_popup) {
            $("#hide-box-"+widgetId).fadeIn();
        }
        console.log(Cookies.get('magepopup'));
    }

});


