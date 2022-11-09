/*---------------------------
      Table of Contents
    --------------------
    
    01- Mobile Menu
    02- Sticky Navbar
    03- Module Search 
    04- Scroll Top Button
    05- Equal Height Elements
    06- Set Background-img to section 
    07- Add active class to accordions
    08- Load More Items
    09- Toggle statistic Panel
    10- Add Animation to About Img
    11- Owl Carousel
    12- Popup Video
    13- CounterUp
    14- initialize NiceSelect Plugin
     
 ----------------------------*/

 $(function () {

    "use strict";

    // Global variables
    var $win = $(window);

    /*==========   Mobile Menu   ==========*/
    var $navToggler = $('.navbar-toggler');
    $navToggler.on('click', function () {
        $(this).toggleClass('actived');
    })
    $navToggler.on('click', function () {
        $('.navbar-collapse').toggleClass('menu-opened');
    })

    /*==========   Sticky Navbar   ==========*/
    $win.on('scroll', function () {
        if ($win.width() >= 992) {
            var $navbar = $('.sticky-navbar');
            if ($win.scrollTop() > 80) {
                $navbar.addClass('fixed-navbar');
            } else {
                $navbar.removeClass('fixed-navbar');
            }
        }
    });

    /*==========  Module Search   ==========*/
    var $moduleBtnSearch = $('.module__btn-search'),
        $moduleSearchContainer = $('.module__search-container');
    // Show Module Search
    $moduleBtnSearch.on('click', function (e) {
        e.preventDefault();
        $moduleSearchContainer.toggleClass('active', 'inActive').removeClass('inActive');
    });
    // Close Module Search
    $('.close-search').on('click', function () {
        $moduleSearchContainer.removeClass('active').addClass('inActive');
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Set Background-img to section   ==========*/
    $('.bg-img').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).parent().css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-position': 'center',
        });
        $(this).parent().addClass('bg-img');
        $(this).remove();
    });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion__item-header').on('click', function () {
        $(this).parent('.accordion-item').addClass('opened');
        $(this).parent('.accordion-item').siblings().removeClass('opened');
    })
    $('.accordion__item-title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========   Load More Items  ==========*/
    function loadMore(loadMoreBtn, loadedItem) {
        $(loadMoreBtn).on('click', function (e) {
            e.preventDefault();
            $(this).fadeOut();
            $(loadedItem).fadeIn();
        })
    }

    loadMore('.loadMoreportfolio', '.portfolio-hidden > .portfolio-item');

    /*==========   Toggle statistic Panel  ==========*/
    // $('.statistic__item-btn').on('click', function () {
    //     $(this).parent().addClass('opened');
    //     $(this).parent().siblings().removeClass('opened')
    // })

    /*==========   Owl Carousel  ==========*/
    $('.carousel').each(function () {
        $(this).owlCarousel({
            nav: $(this).data('nav'),
            dots: $(this).data('dots'),
            loop: $(this).data('loop'),
            margin: $(this).data('space'),
            center: $(this).data('center'),
            dotsSpeed: $(this).data('speed'),
            autoplay: $(this).data('autoplay'),
            transitionStyle: $(this).data('transition'),
            animateOut: $(this).data('animate-out'),
            animateIn: $(this).data('animate-in'),
            autoplayTimeout: 15000,
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: $(this).data('slide-sm'),
                },
                700: {
                    items: $(this).data('slide-md'),
                },
                1000: {
                    items: $(this).data('slide'),
                }
            }
        });
    });

    // Owl Carousel With Thumbnails
    $('.thumbs-carousel').owlCarousel({
        thumbs: true,
        thumbsPrerendered: true,
        loop: true,
        margin: 0,
        autoplay: $(this).data('autoplay'),
        nav: $(this).data('nav'),
        dots: $(this).data('dots'),
        dotsSpeed: $(this).data('speed'),
        transitionStyle: $(this).data('transition'),
        animateOut: $(this).data('animate-out'),
        animateIn: $(this).data('animate-in'),
        autoplayTimeout: 20000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    $('.popup-img-item').magnificPopup({
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

    /*==========   counterUp  ==========*/
    $(".counter").counterUp({
        delay: 10,
        time: 4000
    });

    /*==========  initialize NiceSelect Plugin  ==========*/
    $('select').niceSelect();

    /*==========  Contact Form validation  ==========*/
    var contactForm = $("#contactForm"),
        contactResult = $('.contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function (contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function (msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });
});
// 
function DateAndTime() {
	var dt = new Date();

	var Hours = dt.getHours();
	var Min = dt.getMinutes();
	var Sec = dt.getSeconds();
	// var MilliSec = dt.getMilliseconds();  + MilliSec + "MilliSec " (for milliseconds).

	//strings
	var days = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday"
	];

	//strings
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	// var localTime = dt.getLocaleTimeString();
	// var localDate = dt.getLocaleDateString();

	if (Min < 10) {
		Min === "0" + Min;
	} //displays two digits even Min less than 10

	if (Sec < 10) {
		Sec === "0" + Sec;
	} //displays two digits even Sec less than 10

	var suffix = "AM"; //cunverting 24Hours to 12Hours with AM & PM suffix
	if (Hours >= 12) {
		suffix = "PM";
		Hours = Hours - 12;
	}
	if (Hours === 0) {
		Hours = 12;
	}

	// document.getElementById("time").innerHTML = localTime;
	
	document.getElementById("time").innerHTML =
		Hours + " : " + Min + "  " + suffix ;
	document.getElementById("date").innerHTML =
		days[dt.getDay()] +
		", " +
		dt.getDate() +
		" " +
		months[dt.getMonth()] +
		" " +
		dt.getFullYear();
}

new DateAndTime();
setInterval("DateAndTime()", 1000);
// Slider Image Contact 

  
// End Slider Image Contact
// Toggle

      
var thoat = document.querySelector(".thoat");
var menu = document.querySelector(".contact-menu")
var social = document.querySelector(".social");
thoat.addEventListener("click",function(){
    menu.classList.toggle("bienmat")
})
var bat = document.querySelector(".bat");
bat.addEventListener("click",function(){
    menu.classList.remove("bienmat")
})

window.addEventListener("scroll",function(){
    const scrollHeight = window.pageYOffset
    if(scrollHeight > 500){
        menu.style.visibility = 'visible'
        bat.style.visibility = 'visible'
    }
    else{
        menu.style.visibility = 'hidden'
        bat.style.visibility = 'hidden'

    }
})
let prev = window.pageYOffset;
window.addEventListener("scroll",function(){
    let current = window.pageYOffset;
    if(prev < current){
        social.style.visibility = 'visible'
    }
    else{
        social.style.visibility = 'hidden'
    }
    prev = current;
})



