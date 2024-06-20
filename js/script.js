$('.count').counterUp({
    delay: 10,
    time: 1000
});

$(document).ready(function () {

    // contact form submission
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

    // stickyHeader and scrolltop
    function stickyHeader() {
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $('header').addClass('active');
            $('scrollTop').addClass('active');
        } else {
            $('header').removeClass('active');
            $('scrollTop').removeClass('active');
        }
    }

    // Update the header link
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
    // active the navigation
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

    // Service section hover
    function mouseEnter() {
        var e = $(this);
        var activeHoverLeft = e.position().left;
        var activeHoverTop = e.position().top;
        var activeHoverHeight = e.outerHeight();
        var activeHoverOverlay = e.siblings('.overlay');

        activeHoverOverlay.css({
            'left': activeHoverLeft + 'px',
            'top': activeHoverTop + 'px',
            'height': activeHoverHeight + 'px'
        });
    }

    function mouseLeave() {
        var e = $(this);
        var firstChild = e.parent().children().first();
        var firstChildLeft = firstChild.position().left;
        var firstChildTop = firstChild.position().top;
        var firstChildHeight = firstChild.outerHeight();
        var activeHoverOverlay = e.siblings('.overlay');

        activeHoverOverlay.css({
            'left': firstChildLeft + 'px',
            'top': firstChildTop + 'px',
            'height': firstChildHeight + 'px'
        });
    }

    function hoverEffect() {
        $('.servFlex').hover(mouseEnter, mouseLeave);
    }
    // mobile menu activation
    function removeNavActive() {
        $('.toggler').removeClass('active');
        $('.actDetect').removeClass('active');
    }



    // implementation of functions
    var firstServFlex = $('.servFlex').first();
    if (firstServFlex.length) {
        mouseEnter.call(firstServFlex[0]);
    }
    hoverEffect();
    stickyHeader();
    updateActiveLink();
    activeNav();
    removeNavActive();


    // scroll effects
    $(window).scroll(function () {
        stickyHeader();
        updateActiveLink();
        activeNav();
    });


    // resizing effects
    $(window).resize(function () {
        stickyHeader();
        updateActiveLink();
        activeNav();
        removeNavActive();
    });

    // bookmark topnav
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
    // bookmark footnav
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
    $(document).on('click', '.closeModal', function () {
        $('body').removeClass('active');
        $('.custModal').removeClass('active');
    });
    $(document).keydown(function (event) {
        if (event.key === 'Escape') { // Check if the key pressed is Escape
            if ($('.custModal').hasClass('active')) {
                $('body').removeClass('active');
                $('.custModal').removeClass('active');
            } else if ($('.actDetect').hasClass('active')) {
                $('.toggler').toggleClass('active');
                $('.actDetect').toggleClass('active');
            }
        }
    });


    // function prtModalSlider(){
    //     $('.custModal').html(customContent);
    //     var swiper = new Swiper(".prtSwiper", {
    //         effect: "cards",
    //         grabCursor: true,
    //         initialSlide: 0, // Adjust initial slide index as needed
    //         speed: 500,
    //         loop: true,
    //         rotate: true,
    //         mousewheel: {
    //             invert: false,
    //         },
    //     });
    // }


    $('.workImg').click(function () {
        // Reset .custModal content
        $('body').addClass('active');
        $('.custModal').empty().addClass('active');

        // Find the .swipe elements within the clicked .workImg's siblings
        var custContent = $(this).siblings('.content').children('.notGit');
        var images = $(this).siblings('.content').find('.swipe');
        var proUrl = $(this).siblings('.content').find('.title').data('url');
        var proName = $(this).siblings('.content').find('.title').text();

        // console.log(custContent)
        // Start building the custom content for .custModal
        var customContent = `
        <i class="fa-solid fa-xmark closeModal"></i>
            <div class="container-lg">
                <div class="row prtFlex">
                    <div class="col-lg-6">
                        <div class="swiper prtSwiper">
                            <div class="swiper-wrapper">
        `;

        // Check if images are found
        if (images.length > 0) {
            // Loop through each image and append it to swiper-wrapper
            images.each(function () {
                customContent += `
                    <div class="swiper-slide">
                        <img src="${$(this).attr('src')}" alt="pic">
                    </div>
                `;
            });
        } else {
            // If no images found, provide a default swiper-slide
            customContent += `
                <div class="swiper-slide">
                    <img src="images/pic.jpg" alt="Default pic">
                </div>
            `;
        }

        // Continue building the rest of the custom content
        customContent += `
                            </div>
                        </div>
                    </div>`


        if (custContent.length === 0) {

            customContent += `
<div class="col-lg-6 content">
    
        ${proName ? `<h2>${proName}</h2>` : '<h2>Coming Soon</h2>'}
    
`;


            // Define repositories array and GitHub API related variables
            const repositories = [{
                owner: 'Ritu20011',
                repo: proUrl
            }];

            // Function to fetch repo languages
            function fetchRepoLanguages(owner, repo, token) {
                const url = `https://api.github.com/repos/${owner}/${repo}/languages`;
                const headers = token ? {
                    'Authorization': `token ${token}`
                } : {};

                return $.ajax({
                    url: url,
                    headers: headers,
                    method: 'GET'
                });
            }

            // Loop through repositories array
            repositories.forEach(({
                owner,
                repo
            }) => {
                const token = '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'; // Optional for public repos
                const githubPagesUrl = `https://${owner.toLowerCase()}.github.io/${repo}/`;

                fetchRepoLanguages(owner, repo, token)
                    .done((data) => {
                        lang(data); // Call lang function on success
                    })
                    .fail((err) => {
                        console.error(`Error fetching languages for ${repo}:`, err);
                        customContent += `hi`;
                        $('.custModal').html(customContent);

                        // Initialize Swiper after appending the HTML
                        var swiper = new Swiper(".prtSwiper", {
                            effect: "cards",
                            grabCursor: true,
                            initialSlide: 0, // Adjust initial slide index as needed
                            speed: 500,
                            loop: true,
                            rotate: true,
                            mousewheel: {
                                invert: false,
                            },
                        });
                    });

                // Function to handle language data
                function lang(data) {
                    customContent += `<div class="head mb-3">Used Language</div>`;
                    // Calculate total bytes
                    const totalBytes = Object.values(data).reduce((acc, val) => acc + val, 0);

                    // Append language percentages to customContent
                    $.each(data, function (language, bytes) {
                        const percentage = ((bytes / totalBytes) * 100).toFixed(2);
                        customContent += `<p>${language}: ${percentage}%</p>`;
                    });

                    // Append remaining content and GitHub link
                    customContent += `
                            <div class="head">Website Link</div>
                            <a href="${githubPagesUrl}">${githubPagesUrl}</a>
                        </div>
                    </div>
                </div>
            </div>
            `;

                    // Append the custom content to .custModal
                    $('.custModal').html(customContent);

                    // Initialize Swiper after appending the HTML
                    var swiper = new Swiper(".prtSwiper", {
                        effect: "cards",
                        grabCursor: true,
                        initialSlide: 0, // Adjust initial slide index as needed
                        speed: 500,
                        loop: true,
                        rotate: true,
                        mousewheel: {
                            invert: false,
                        },
                    });
                }
            });
        } else {
            customContent += `<div class="col-lg-6 content">
                        <div>
                        ${custContent.html()}
                        </div>
                        </div>`;
            // Append the custom content to .custModal
            $('.custModal').html(customContent);

            // Initialize Swiper after appending the HTML
            var swiper = new Swiper(".prtSwiper", {
                effect: "cards",
                grabCursor: true,
                initialSlide: 0, // Adjust initial slide index as needed
                speed: 500,
                loop: true,
                rotate: true,
                mousewheel: {
                    invert: false,
                },
            });
        }
    });




});