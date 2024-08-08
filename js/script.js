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
            var subject = $('#selPro').val();;
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
            $('.scrollTop').addClass('active');
        } else {
            $('header').removeClass('active');
            $('.scrollTop').removeClass('active');
        }
    }

    //display color picker

    function colorPickDisp() {
        $('.picker').click(function () {
            $('.swatches').toggleClass('active');
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $('.swatches').css('animation', 'colorSwatchActive 0.5s ease-in-out forwards');
            } else {
                $('.swatches').css('animation', 'colorSwatch 0.5s ease-in-out forwards');
            }
        });

        $(document).click(function (event) {
            if ($('.picker').hasClass('active')) {
                if (!$(event.target).closest('.picker').length && !$(event.target).closest('.swatches').length) {
                    $('.swatches').removeClass('active');
                    $('.picker').removeClass('active');
                    $('.swatches').css('animation', 'colorSwatch 0.5s ease-in-out forwards'); // Reset animation
                }
            }
        });

    }

    // pick the color
    function pickColor() {
        // Function to set a cookie
        function setCookie(name, value, daysToExpire) {
            var expires = "";
            if (daysToExpire) {
                var date = new Date();
                date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + encodeURIComponent(value || "") + expires + "; path=/";
        }

        // Function to get a cookie
        function getCookie(name) {
            var nameEQ = name + "=";
            var cookiesArray = document.cookie.split(';');
            for (var i = 0; i < cookiesArray.length; i++) {
                var cookie = cookiesArray[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
                }
            }
            return null;
        }

        // Function to delete a cookie
        function deleteCookie(name) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }

        // Event handler for clicking on color swatches
        $('.swatch').click(function () {
            // Remove active class from all swatches
            $('.swatch').removeClass('active');

            // Add active class to the clicked swatch
            $(this).addClass('active');

            // Get the classes of the clicked swatch
            var classList = Array.from(this.classList);

            // Filter out unwanted classes (like "swatch" and "active")
            var filteredClasses = classList.filter(function (className) {
                return className !== "swatch" && className !== "active";
            });

            // Set the body class to the filtered classes
            $('body').removeClass();
            $('body').addClass(filteredClasses);

            // Log the filtered classes to the console (for debugging)
            console.log(filteredClasses);

            // Set a cookie with the selected color class
            if (filteredClasses.length > 0) {
                setCookie("selectedColor", filteredClasses[0], 7); // Set cookie to expire in 7 days
            }
        });

        // Check if there's a previously selected color stored in a cookie
        var storedColor = getCookie("selectedColor");
        if (storedColor) {
            // Apply the stored color to the body
            $('body').addClass(storedColor);

            // Add the active class to the corresponding swatch
            $('.swatch.' + storedColor).addClass('active');
        } else {
            console.log('hello')
        }
        $('.delete').click(function () {
            console.log('Before delete: ', document.cookie);

            // Delete the "selectedColor" cookie immediately after checking it
            deleteCookie("selectedColor");
            window.location.reload();
            console.log('After delete: ', document.cookie);
        })
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
            var positionBottom = activeLink.position().top + activeLink.outerHeight() - indicator.outerHeight() - 4;
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

    //scroll top
    function calculateTop() {
        var totalHeight = $(document).height() - $(window).height();
        var scrollPosition = $(window).scrollTop();

        // Calculate scroll percentage
        var percentage = (scrollPosition / totalHeight) * 100;

        // Ensure percentage reaches 100 when very close
        if (percentage > 98) {
            percentage = 100;
        } else {
            percentage = Math.floor(percentage);
        }

        // Update the conic-gradient background
        var gradient = `conic-gradient(var(--default-color) ${percentage}%, transparent ${percentage + 1}%)`;
        $('.scrollTop .overlay').css({ background: gradient });
    }






    function filterActive() {
        var activeEle = $('.filterItem.filterNavAct').attr('filter-nav');
        var activeHead = $('[filter-nav="' + activeEle + '"]');
        var filterHeight = $(activeHead).outerHeight();
        var filterWidth = $(activeHead).outerWidth();
        var filterTop = $(activeHead).position().top;
        var filterLeft = $(activeHead).position().left;
        console.log(activeEle);
        console.log(activeHead);
        // Correct the syntax for setting CSS properties
        $('.filterList .active').css({
            width: filterWidth,
            height: filterHeight,
            top: filterTop,
            left: filterLeft
        });
    }

    // function 

    $('.filterItem').click(function () {
        $('.filterItem').removeClass('filterNavAct');
        $(this).addClass('filterNavAct');
        var filterHead = $(this).attr('filter-nav');

        filterActive();

        if (filterHead === "all") {
            $('.work').removeClass('active');
            $('.work').fadeOut();
            $('.work').addClass('active');
            $('.work').fadeIn();
        } else {
            $('.work').removeClass('active');
            $('.work').fadeOut();
            $('.work[filter-item="' + filterHead + '"]').addClass('active');
            $('.work[filter-item="' + filterHead + '"]').fadeIn(1000);
        }
    });

    var firstFilter = $('.filterItem[filter-nav="all"]');
    if (firstFilter.length) {
        $('.filterItem').removeClass('filterNavAct');
        firstFilter.addClass('filterNavAct');
        filterActive();
        $('.work').removeClass('active');
        $('.work').addClass('active');
    }


    // $(document).mousemove(function(e) {
    //         var mouseX = e.pageX;
    //         var mouseY = e.pageY;

    //         // Move main element `.mine` with the mouse
    //         $('.mine').css({
    //             'left': mouseX + 'px',
    //             'top': mouseY + 'px' // Adjusted top position
    //         });
    //         $('.child').css({
    //             'left': mouseX + 'px',
    //             'top': mouseY + 'px' // Adjusted top position
    //         });
    //         $('.child1').css({
    //             'left': mouseX + 'px',
    //             'top': mouseY + 'px' // Adjusted top position
    //         });
    //         $('.child2').css({
    //             'left': mouseX + 'px',
    //             'top': mouseY + 'px' // Adjusted top position
    //         });
    //         $('.child3').css({
    //             'left': mouseX + 'px',
    //             'top': mouseY + 'px' // Adjusted top position
    //         });
    //     })

    // const $ball = $('.ball');

    // function getRandomPosition() {
    //     const maxWidth = $(window).width() - $ball.width();
    //     const maxHeight = $(window).height() - $ball.height();
    //     const randomX = Math.floor(Math.random() * maxWidth);
    //     const randomY = Math.floor(Math.random() * maxHeight);
    //     return { x: randomX, y: randomY };
    // }

    // function moveBall() {
    //     const { x, y } = getRandomPosition();
    //     $ball.css({ left: x + 'px', top: y + 'px' });
    //     setTimeout(moveBall, 2000); // Recursively call moveBall after the transition duration
    // }

    // moveBall(); // Initial call to start the movement

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
    colorPickDisp();
    pickColor();
    calculateTop();


    // scroll effects
    $(window).scroll(function () {
        stickyHeader();
        updateActiveLink();
        activeNav();
        calculateTop();
    });


    // resizing effects
    $(window).resize(function () {
        if (firstServFlex.length) {
            mouseEnter.call(firstServFlex[0]);
        }
        filterActive();
        stickyHeader();
        updateActiveLink();
        activeNav();
        removeNavActive();
        calculateTop();

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
    // scrolltop 
    $('.scrollTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    // mobile nav toggler
    $('.toggler').click(function () {
        $(this).toggleClass('active');
        $('.actDetect').toggleClass('active');
    })
    // modal close
    $(document).on('click', '.closeModal', function () {
        $('body').removeClass('active');
        $('.custModal').removeClass('active');
    });
    // esc key
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
        // var clickedTop = event.pageY - $(window).scrollTop();
        // console.log(clickedTop)
        // $('body').css('top', -clickedTop + 'px');
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


            function fetchSecretKey() {
                fetch('js/secret.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        return data.secretKey;
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            }

            fetchSecretKey();

            // Loop through repositories array
            repositories.forEach(({
                owner,
                repo
            }) => {
                const token = fetchSecretKey(); // Optional for public repos
                const githubPagesUrl = `https://${owner.toLowerCase()}.github.io/${repo}/`;

                fetchRepoLanguages(owner, repo, token)
                    .done((data) => {
                        lang(data); // Call lang function on success
                    })
                    .fail((err) => {
                        console.error(`Error fetching languages for ${repo}:`, err);
                        customContent += `Our site is coming soon! Get ready for an exciting new experience—stay tuned for updates!`;
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
                            <a href="${githubPagesUrl}" target="_blank">${githubPagesUrl}</a>
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




    function vibrateDevice() {
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200, 100, 200]);
            alert('Device vibrated with pattern');
        } else {
            alert('Vibration API is not supported by this browser');
        }
    }
    function showNotification() {
        if (!("Notification" in window)) {
            alert("This browser does not support notifications.");
        } else if (Notification.permission === "granted") {
            // If permission is already granted, send notification
            new Notification("Hello!", {
                body: "This is a test notification.",
                icon: "icon.png" // You can use any icon here
            });
            vibrateDevice();
        } else if (Notification.permission === "default") {
            // Request permission if the status is "default"
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Hello!", {
                        body: "This is a test notification.",
                        icon: "icon.png"
                    });
                    vibrateDevice();
                }
            });
        } else {
            alert("Notification permission denied.");
        }
    }
    $('.bannerImg').click(function(){
        showNotification();
    })




});






