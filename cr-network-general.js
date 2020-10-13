function handleLoginPanel() {

    // handle sign up link
    $('.hero-login .panel div[id*="SignupLinkSection"]').appendTo('.hero-login .panel-body');
    $('<p class="sign-up-text">Not a member yet?</p>').insertBefore($('.hero-login .panel div[id*="SignupLinkSection"] a'));

    // handle 'remember me' box
    $('.hero-login input[id*="Remember"] + label').text('Remember Me');
    $('.hero-login input[id*="Remember"]').closest('.form-group').addClass('remember-me');
}

function handleAppendMe() {
    $('.append-me').each(function () {
        var self = $(this),
            appendTo = $(self).find('+ .row');

        $(appendTo).wrapInner('<div class="row" />');
        $(self).appendTo(appendTo);
    });
}

function handleTestimonials() {
    $('.testimonial').each(function () {
        var self = $(this);

        $(self).find('.HtmlContent > *:not(h2)').wrapAll('<div class="testimonial-bottom-content" />');
    });
}

function handleLandingControls() {
    $('.HLLandingControl ul li').each(function () {
        var self = $(this),
            byline = $(self).find('.ByLine'),
            postedIn = $(self).find('div[id*="FoundIn"]');

        $(byline).appendTo(self);
        $(postedIn).appendTo(self);
    });

    // handle event date blocks
    $('.home .HLEventList ul li').each(function () {
        var self = $(this),
            month = $(self).find('.date-block .calendar-month span').text();

        month = month.substring(0, 3);
        $(self).find('.date-block .calendar-month').text(month);

        var dateBlock = $(self).find('.date-block'),
            month = $(dateBlock).find('.calendar-month');

        $(month).appendTo(dateBlock);
    });
}

function handleUnansweredQuestions() {
    $('.unanswered-questions .HLLandingControl ul li').addClass('callout-card');
}

function handlePoll() {

    var hasPollHtml = false;

    setInterval(function () {
        if (hasPollHtml) {
            return;
        }
        if (!!($('.home .hlc-blockui-busy').html())) {
            $('.home .hlc-blockui-busy').closest('.ContentUserControl').addClass('callout-card blue-card small-h2 margin-top-25');
            hasPollHtml = true;
        }
    }, 500);
    
}

function handleByLineAndPicture(self) {


    var profilePicture = $(self).find('.title-row > .col-md-2'),
        byline = $(self).find('.ByLine');

    $(byline).wrap('<div class="profile-picture-byline" />');
    var profilePictureContainer = $(self).find('.profile-picture-byline');
    $(profilePicture).prependTo(profilePictureContainer);
    $(profilePictureContainer).appendTo(self);

    // handle comma in byline
    var bylineLink = $(byline).find('a').clone();
    $(byline).find('a').remove();

    if ($(self).closest('.HLLandingControl').hasClass('HLRecentBlogs')) {
        $(byline).text('');
    } else {
        var bylineText = $(byline).text();
        bylineText = $.trim(bylineText);
        var bylineStart = !!(bylineText.indexOf(',') > -1) ? bylineText.indexOf(',') : bylineText.indexOf(':');
        bylineStart++;
        bylineText = bylineText.substring(bylineStart);
        $(byline).text(bylineText);

    }
    $(byline).prepend(bylineLink);
}

function handleCalloutCards() {
    $('.callout-card .HLLandingControl ul li, .HLLandingControl ul li.callout-card').each(function () {
        var self = $(this);

        handleByLineAndPicture(self);

    });
}

function handleRedCard() {
    $('.callout-card.red-card').each(function () {
        var self = $(this),
            link = $(self).find('a'),
            target = $(link).attr('target'),
            href = $(link).attr('href');

        if (target == "_blank") {
            $(self).wrap('<a class="card-wrapper" href="' + href + '" target="_blank" />');
        } else {
            $(self).wrap('<a class="card-wrapper" href="' + href + '" />');
        }
        $(link).wrapInner('<span class="link-text" />');
        $(link).contents().unwrap();
    });
}

function handleRelatedContent() {
    $('.related-content .HLLandingControl .Content ul li').each(function () {
        var self = $(this);
        handleByLineAndPicture(self);
    });
}

function handleTags() {
    $('.tag-button').wrapAll('<div class="tag-buttons" />');
}

function handleBlogs() {
    $('.home .HLRecentBlogs ul li').each(function () {
        var self = $(this);


        // handle byline and profile image
        handleByLineAndPicture(self);

        // handle blog image
        handleAjaxCall(self);

        // handle posted in
        var postedIn = $(self).find('h5'),
            communityName = $(postedIn).find('a');

        $(postedIn).html(communityName);
        $(postedIn).addClass('blogs-posted-in');
    });
}

function handleNetworks() {

    function checkNetworksLength() {
        function slickifySmall() {
            $('.networks-slider').slick({
                dots: true,
                arrows: false,
                slidesToShow: 1,
                mobileFirst: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: 'unslick'
                    }
                ]
            });
        }

        function slickifyMedium() {
            $('.networks-slider').slick({
                dots: true,
                arrows: false,
                slidesToShow: 1,
                mobileFirst: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 900,
                        settings: 'unslick'
                    }
                ]
            });
        }
        function slickifyLarge() {
            $('.networks-slider').slick({
                dots: true,
                arrows: false,
                slidesToShow: 1,
                mobileFirst: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: 'unslick'
                    }
                ]
            });
        }

        function slickifyDesktop() {
            $('.networks-slider').slick({
                dots: true,
                arrows: false,
                slidesToShow: 1,
                mobileFirst: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4
                        }
                    }
                ]
            });
        }
        var width = $(window).width(),
            networksLength = networks.length;

        if (networksLength > 4) {
            slickifyDesktop();
        } else if (networksLength == 4 && width < 1200) {
            slickifyLarge();
        } else if (networksLength == 3 && width < 900) {
            slickifyMedium();
        } else if (networksLength == 2 && width < 600) {
            slickifySmall();
        }

    }

    $('.networks-home .hero-widget').closest('.row').addClass('hero-widget-row');

    $('.networks-home h4').each(function () {
        var self = $(this),
            parentRow = $(self).closest('.row'),
            contentRow = $(parentRow).find('+ .row');

            $(self).prependTo($(contentRow).find('.hero-widget'));
    });

    // handle slider
    $('.MyNetworksControl .hero-widget-row').wrapAll('<div class="networks-slider slick-dotted" />');
    $('.networks-slider').appendTo('.MyNetworksControl');
    var networks = $('.networks-slider .hero-widget-row').toArray();

    checkNetworksLength();
    $(window).on('resize orientationChange', function () {
        checkNetworksLength();
    });
}

function handleSuggestedContacts() {
    $('.home .HL-contact-suggestions .update-friend .btn-primary').text('Add');
}

function handlePageTitle() {
    if ($('#MainCopy_ContentWrapper').hasClass('no-margin')) {
        $('#PageTitleH1').addClass('grey-border');
    }
}

function handleLoggedInLoggedOutSections() {
    $('div[class*="col-md-12"][class*="section"]:empty').closest('.bg-grey').hide();
}

$(function () {
    // handle search
    $('.search-bar-top').insertAfter('#MPheader > .row:first-child > .col-md-12:first-child > .pull-right:first-child');

    handleLoginPanel();
    handleAppendMe();
    handleTestimonials();
    handleLandingControls();
    handleUnansweredQuestions();
    handlePoll();
    handleCalloutCards();
    handleRedCard();
    handleRelatedContent();
    handleTags();
    handleBlogs();
    handleNetworks();
    handleSuggestedContacts();
    handlePageTitle();
    handleLoggedInLoggedOutSections();
});