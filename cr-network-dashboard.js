$(function () {
    var name = $('.HLWelcomeHeader .panel-body h4').text(),
        greeting = '<div class="greeting"><span>Welcome back, </span><a href="profile">' + name + '</a></div>',
        linkToInbox = '/network/members/profile/myaccount/inbox/',
		unreadEmailCount = $('a[id^="Welcome_Details_MessagesCount"]').length !== 0 ? parseInt($('a[id^="Welcome_Details_MessagesCount"]').text()) : 0,
        emailContent = '<div class="email-content"><a href ="' + linkToInbox + '"><i class="cr cr-mail"></i>' + unreadEmailCount + ' unread messages</a></div>',
        progressBar = $('div[id*="CompleteBarProgress"]').clone(),
        progressText = '<span class="progress-text">Profile Completion</span>';
        
    // create the first row
    $('.member-dashboard-img').wrap('<div class="user-details" />')
    $('.member-dashboard-img').prepend('<a class="settings-button" href="preferences"><i class="cr cr-settings"></i></a>');
    $('.user-details').wrap('<div class="dashboard-row-1" />');
    $('.user-details').append(greeting);
    $('.greeting').append(emailContent);
    
    $('.dashboard-link').wrapAll('<div class="dashboard-links" />');
    $('.dashboard-links').appendTo('.dashboard-row-1');
    $('.dashboard-links').wrap('<div class="dashboard-links-progress" />');
    if (!!($.trim($(progressBar).html()))) {
        $('.dashboard-links-progress').prepend(progressBar);
        $('.dashboard-links-progress').prepend(progressText);
    }

    // make the second row
    $('.dashboard-button').wrapAll('<div class="dashboard-row-2" />');
    // make the dashboard
    $('div[class*="dashboard-row-"]').wrapAll('<div class="member-dashboard clearfix" />');
    $('.member-dashboard').wrapInner('<div class="row row-wide dashboard-inner clearfix" />');

    // handleToggle
    $('.dashboard-toggle').appendTo('.member-dashboard');
    checkForDesktop();
    $(window).on('resize orientationChange', function () {
        if ($(window).width() < 992 &&
        !($('.dashboard-inner .slick-track').html())) {
            slickify();
        }
    });

});

function slickify() {
    $('.dashboard-inner').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 992,
                settings: 'unslick'
            }
        ]
    });
}

function toggleDashboard() {
    var isOpen = !!($('.member-dashboard').hasClass('open'));

    if (isOpen) {
        handleClose();
    } else {
        handleOpen();
    }
}

function handleOpen() {
	$('.member-dashboard').addClass('open');
	$('.dashboard-toggle').addClass('open');
	$('.dashboard-toggle button').text('Collapse');
}

function handleClose() {
	$('.member-dashboard').removeClass('open');
    $('.dashboard-toggle').removeClass('open');
	$('.dashboard-toggle button').text('Expand');
	if ($(window).width() < 992) {
		$('.member-dashboard .slick-initialized').slick('slickGoTo', 0, false);
	}
	$('.member-dashboard > .row-wide').animate({
		scrollTop: 0
    });
    document.cookie = "hasClosed=true";
}

function checkForDesktop() {
    var allCookies = document.cookie.split(';'),
        name = "hasClosed",
        closeCookie;

    for (var i = 0; i < allCookies.length; i++) {
        var currentCookie = allCookies[i],
            cookieName = currentCookie.substring(0, currentCookie.indexOf('=')),
            cookieVal = currentCookie.substring(currentCookie.indexOf('=') + 1);

        cookieName = $.trim(cookieName);

        if (cookieName == name &&
        cookieVal == "true") {
            closeCookie = true;
        }
    }

	if ($(window).width() > 991 && !closeCookie) {
		handleOpen();
		$('.toggle-content').hide();
	} else {
        handleClose();
        slickify();
	}
}