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

$(function () {
    // handle search
    $('.search-bar-top').insertAfter('#MPheader > .row:first-child > .col-md-12:first-child > .pull-right:first-child');

    handleLoginPanel();
    handleAppendMe();
    handleTestimonials();
});