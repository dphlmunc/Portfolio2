// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

//   //animatedModal
//   $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();


    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });
});

(function ($) {

    $.fn.animatedModal = function(options) {
        var modal = $(this);

        //Defaults
        var settings = $.extend({
            modalTarget: modal.attr('href').replace('#',''),
            position:'fixed',
            width:'100%',
            height:'100%',
            top:'0px',
            left:'0px',
            zIndexIn: '9999',
            zIndexOut: '-9999',
            opacityIn:'1',
            opacityOut:'0',
            animatedIn:'zoomIn',
            animatedOut:'zoomOut',
            animationDuration:'.6s',
            overflow:'auto',
            // Callbacks
            beforeOpen: function() {},
            afterOpen: function() {},
            beforeClose: function() {},
            afterClose: function() {}



        }, options);

        var closeBt = $('.close-'+settings.modalTarget);

        //console.log(closeBt)

        var href = $(modal).attr('href'),
            id = $('body').find('#'+settings.modalTarget),
            idConc = '#'+id.attr('id');
        //console.log(idConc);
        // Default Classes
        id.addClass('animated');
        id.addClass(settings.modalTarget+'-off');

        //Init styles
        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration,
            '-moz-animation-duration':settings.animationDuration,
            '-ms-animation-duration':settings.animationDuration,
            'animation-duration':settings.animationDuration
        };
        //Apply stles
        id.css(initStyles);

        modal.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'hidden'});
            if (href == idConc) {
                if (id.hasClass(settings.modalTarget+'-off')) {
                    id.removeClass(settings.animatedOut);
                    id.removeClass(settings.modalTarget+'-off');
                    id.addClass(settings.modalTarget+'-on');
                }

                if (id.hasClass(settings.modalTarget+'-on')) {
                    settings.beforeOpen();
                    id.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                    id.addClass(settings.animatedIn);
                    id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
                };
            }
        });
//
        closeBt.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'auto'});

            settings.beforeClose(); //beforeClose
            if (id.hasClass(settings.modalTarget+'-on')) {
                id.removeClass(settings.modalTarget+'-on');
                id.addClass(settings.modalTarget+'-off');
            }

            if (id.hasClass(settings.modalTarget+'-off')) {
                id.removeClass(settings.animatedIn);
                id.addClass(settings.animatedOut);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
            };

        });

        function afterClose () {
            id.css({'z-index':settings.zIndexOut});
            settings.afterClose(); //afterClose
        }

        function afterOpen () {
            settings.afterOpen(); //afterOpen
        }

    }; // End animatedModal.js

}(jQuery));