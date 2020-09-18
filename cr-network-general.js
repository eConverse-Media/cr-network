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

    $(profilePicture).wrap('<div class="profile-picture-byline" />');
    var profilePictureContainer = $(self).find('.profile-picture-byline');
    $(byline).appendTo(profilePictureContainer);
    $(profilePictureContainer).appendTo(self);

    // handle comma in byline
    var bylineLink = $(byline).find('a').clone();
    $(byline).find('a').remove();

    if ($(self).closest('.HLLandingControl').hasClass('HLRecentBlogs')) {
        $(byline).text('');
    } else {

        var bylineText = $(byline).text();
        bylineText = $.trim(bylineText);
        bylineText = bylineText.substring(2);
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
    handleTags();
    handleBlogs();
});