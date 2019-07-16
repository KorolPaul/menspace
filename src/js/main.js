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
    var $galleryInfo = $('.gallery_info-content');
    var $galleryCount = $('.gallery_count-value');
    var $galleryCountTotal = $('.gallery_count-total');

    $galleryCountTotal.text($('.slider_column').children().length);

    $sliderItems.on('click', function (e) {
        var title = $(this).find('.title').text();
        var text = $(this).find('.text').text();
        var date = $(this).find('.date').text();
        var src = $(this).find('.slider_image').attr('src');

        var $newInfo = $(`<div class="gallery_info-image-wrapper"><img class="gallery_image" src="${src}" alt=""><div class="gallery_info-meta"><p class="gallery_info-title">${title}</p><p class="gallery_info-date">${date}</p></div></div><div class="gallery_info-text">${text}</div>`); 
        $galleryInfo.html($newInfo);

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
        //responsive : {
        //    1024 : {
        //        items: 6
        //    }
        //}
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

    /* Scroll */
    var timeout = 500;
    var isAninimating = false;
    var activePage = 0;
    var $pages = $('.page');
    var $navigation = $('.pages_link');

    function scrollPages(e) {
        if (isAninimating) { return }
        isAninimating = true;
        setTimeout(() => {
            isAninimating = false;
        }, timeout);

        var page = $pages.eq(activePage);
        if (e) {
            var isScrollDown = e.deltaY >= 0;
            if (isScrollDown) {
                if (activePage === 0 && !page.hasClass('scaled')) {
                    page.addClass('scaled')
                } else if (activePage < $pages.length - 1) {
                    activePage++;
                }
            } else {
                if (activePage === 0) {
                    page.removeClass('scaled')
                } else if (activePage !== 5) {
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
        document.addEventListener('wheel', scrollPages);
    }

    $navigation.on('click', function(e) {
        if (!isMobile) {
            e.preventDefault();
            var index = $(this).index();
            activePage = index;
            scrollPages(false);
        }
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
    window.addEventListener('popstate', navigateToPage);
    navigateToPage();

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

    $('.fade').on('click', togglePopup)

});
