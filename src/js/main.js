$(document).ready(function () {
    var isMobile = screen.width < 769;

    /* Menu toggle */
    const $sidebar = $('.sidebar');
    const $menuToggle = $('.js-menu-toggle');

    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
        }
        $sidebar.toggleClass('opened');
        $('html').toggleClass('sidebar-opened');
    }
    $menuToggle.on('click', toggleMenu);

    window.addEventListener('keydown', function(e) {
        if ((e.key === 'Escape' || e.keyCode === 27) && $sidebar.hasClass('opened')) {
            toggleMenu();
        }
    });

    $('.showcase_logo-image').on('mousemove', function (e) {
        const { clientHeight, clientWidth } = e.currentTarget;
        let { layerX, layerY, offsetX, offsetY } = e.originalEvent;
        const x = offsetX || layerX;
        const y = offsetY || layerY;

        const percentX = (x / clientWidth * 100) - 50;
        const percentY = (y / clientHeight * 100) - 50;

        $(this).css('transform', `rotateY(${percentX / 3}deg) rotateX(${-percentY / 20}deg)`);
    });


    /* Gallery */
    var $sliderItems = $('.slider_item');
    var $galleryImage = $('.gallery_image');
    var $galleryInfoText = $('.gallery_info-text');
    var $galleryCount = $('.gallery_count-value');
    var $galleryCountTotal = $('.gallery_count-total');

    $galleryCountTotal.text($('.slider_column').children().length);

    $sliderItems.on('click', function (e) {
        var src = $(this).find('.slider_image').attr('src');
        var $newInfo = $(this).find('.slider_item-meta').html(); 
        $galleryInfoText.html($newInfo);
        $galleryImage.attr('src', src);

        $galleryCount.text($(this).data('number'));

        $sliderItems.removeClass('active');
        $(this).addClass('active');
    });

    $('.slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        nav: true,
        dots: false,
        items: 3,
        navContainer: $('.gallery_buttons'),
        navText: ['prev','next'],
    });

    /* Tabs */
    $tabButtons = $('.widget_navigation-button');
    $tabs = $('.widget_tab');
    $tabButtons.on('click', function (e) {
        if (!$(this).hasClass('active')) {
            $tabButtons.removeClass('active');
            $(this).addClass('active');

            var tabNumber = $(this).data('tab');
            $tabs.removeClass('active');
            $(`.widget_tab[data-tab="${tabNumber}"]`).addClass('active');
        }
    });

    /* Counter */
    var $counter = $('.appointment_button');
    function generateSymbol() {
        return Math.random().toString(36).substring(7).substring(0, 1);
    }

    /* Scroll */
    var timeout = 1000;
    var isAninimating = false;
    var activePage = 0;
    var $pages = $('.page');
    var $navigation = $('.pages_link');

    function scrollPages(e, inverse = false) {
        if (isAninimating && !inverse) { return }
        isAninimating = true;
        setTimeout(() => {
            isAninimating = false;
        }, timeout);

        $counter.text(generateSymbol());

        var page = $pages.eq(activePage);
        if (e) {
            var isScrollDown = e.deltaY >= 0;
            if (inverse) {
                isScrollDown = !isScrollDown;
            }
            if (isScrollDown) {
                if (activePage === 0 && !page.hasClass('scaled')) {
                    page.addClass('scaled')
                } else if (activePage < $pages.length - 1) {
                    activePage++;
                }
            } else {
                if (activePage === 0) {
                    page.removeClass('scaled')
                } else {
                    activePage--
                }
            }
        }
        
        $pages.removeClass('active');
        $navigation.removeClass('active');
        $pages.eq(activePage).addClass('active');
        $navigation.eq(activePage).addClass('active');
    }

    if (!isMobile) {
        document.addEventListener('wheel', scrollPages, { capture: false, passive: true });
    }

    $('.menu_link').on('click', function() {
        toggleMenu();
    });

    /* Navigation */
    function navigateToPage() {
        switch (document.location.hash) {
            case '#about':
                activePage = 1;
                break;
            case '#services':
                activePage = 2;
                break;
            case '#price-lists':
                activePage = 3;
                break;
            case '#gallery':
                activePage = 4;
                break;
            case '#contact':
                activePage = 5;
                break;
            default:
                activePage = 0;
        }
        scrollPages();
    }
    window.addEventListener('popstate', function() {
        navigateToPage();
    });

    window.scrollTo(0, 0);
    navigateToPage();

    if (!isMobile) {
        var hammer = new Hammer(document.body, {});
        hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        hammer.on('swipe', function(e) {
            scrollPages(e, true);
        });
    } else {
        $showcase = $('.showcase');
        var hammer = new Hammer(document.querySelector('.showcase_bg'));
        hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        hammer.on('swipe', function ev(e) {
            if (e.deltaY < 0 ) {
                $showcase.addClass('scrolled');
            }
        });
        var hammer2 = new Hammer(document.querySelector('.showcase_mobile-video-bg'));
        hammer2.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        hammer2.on('swipe', function ev(e) {
            if (e.deltaY > 0 ) {
                $showcase.removeClass('scrolled');
            } else {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(".page__about").offset().top
                }, 100, "linear");
            };
        });
    }

    /* Load videos */
    if (!isMobile) {
        $('video source').each(function(e) {
            console.log($(this).data('src'))
            $(this).attr('src', $(this).data('src'))
        });
        document.querySelector('video').load();
    }

    /* Popup */
    var $popup = $('.popup');
    var $popupContent = $('.popup_content');

    function togglePopup() {
        $popup.toggleClass('opened');
    }

    $('.service_button').on('click', function(e) {
        e.preventDefault();

        var content = $(this).next().html();
        $popupContent.html(content);
        togglePopup();
    });

    $('.fade').on('click', togglePopup);

});
