$('.count').counterUp({
    delay: 10,
    time: 1000
});

$(document).ready(function () {
    $('#emailButton').on('click', function () {
        var form = $('.cntctFrm')[0]; // Select the form element
        var checkVal = form.checkValidity();

        if (checkVal === true) {
            var email = 'ritu.basak01@gmail.com';
            var subject = 'Subject Here';
            var fullName = $('#fname').val() + ' ' + $('#lname').val();
            var senderEmail = $('#email').val();
            var num = $('#num').val();
            var mess = $('#mess').val();
            var body = 'Name: ' + fullName + '\nEmail: ' + senderEmail + '\nPhone Number: ' + num + '\nMessage: ' + mess;

            var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

            window.location.href = mailtoLink;
            console.log('success');
        } else {
            form.reportValidity();
        }
    });


    function stickyHeader() {
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $('header').addClass('active');
        } else {
            $('header').removeClass('active');
        }
    }

    function updateActiveLink() {
        var headerHeight = $('header').outerHeight();
        var scrollPosition = $(window).scrollTop();

        $('section').each(function () {
            var sectionId = $(this).attr('id');
            var sectionOffset = $(this).offset().top - headerHeight - 5;
            var sectionHeight = $(this).outerHeight();

            if (scrollPosition >= sectionOffset && scrollPosition < (sectionOffset + sectionHeight)) {
                $('.mainNav a').removeClass('active');
                $('.mainNav a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }

    function activeNav() {
        var activeLink = $('.mainNav a.active');
        var indicator = $('.navActive');
        if ($('.mainNav a').hasClass('active')) {
            var positionLeft = activeLink.position().left;
            var positionBottom = activeLink.position().top + activeLink.outerHeight() - indicator.outerHeight();

            // Set navActive position
            indicator.css({
                'left': positionLeft + 'px',
                'top': positionBottom + 'px',
                'width': activeLink.outerWidth() + 'px'
            });
        } else {
            indicator.css({
                // 'left': positionLeft + 'px',
                // 'top': positionBottom + 'px',
                'width': 0
            });
        }
    }

    function removeNavActive() {
        $('.toggler').removeClass('active');
        $('.actDetect').removeClass('active');
    }

    stickyHeader();
    updateActiveLink();
    activeNav();
    removeNavActive();


    $(window).scroll(function () {
        stickyHeader();
        updateActiveLink();
        activeNav();
    });

    $(window).resize(function () {
        stickyHeader();
        updateActiveLink();
        activeNav();
        removeNavActive();
    });

    $('.mainNav a').click(function (e) {
        e.preventDefault();
        activeNav();


        var headerHeight = $('header').outerHeight();
        var sectionId = $(this).attr('href');
        var targetOffset = $(sectionId).offset().top - headerHeight;

        $('.mainNav a').removeClass('active');
        $(this).addClass('active');

        $('html, body').animate({
            scrollTop: targetOffset
        }, 800);
    });
    $('.footNav a').click(function (e) {
        e.preventDefault();
        var headerHeight = $('header').outerHeight();
        var sectionId = $(this).attr('href');
        var targetOffset = $(sectionId).offset().top - headerHeight;

        $('html, body').animate({
            scrollTop: targetOffset
        }, 800);
    });


    $('.toggler').click(function () {
        $(this).toggleClass('active');
        $('.actDetect').toggleClass('active');
    })

});

