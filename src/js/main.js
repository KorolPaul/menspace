//screen.orientation.lock('portrait')

$(document).ready(function () {
    var isMobile = 'ontouchstart' in window || navigator.msMaxTouchPoints;

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

        $(this).css('transform', `rotateY(${percentX / 6}deg) rotateX(${-percentY / 20}deg)`);
    });


    /* Gallery */
    var $sliderItems = $('.slider_item');
    var $galleryImage = $('.gallery_image');
    var $galleryInfoText = $('.gallery_info-text');
    var $galleryCount = $('.gallery_count-value');
    var $galleryCountTotal = $('.gallery_count-total');

    $galleryCountTotal.text($('.slider_column').children().length);

    $sliderItems.on('click', function (e) {
        $galleryImage.attr('src', '');
        var src = $(this).data('src');
        var $newInfo = $(this).find('.slider_item-meta').html(); 
        $galleryInfoText.html($newInfo);
        $galleryImage.attr('src', src);

        $galleryCount.text($(this).data('number'));

        $sliderItems.removeClass('active');
        $(this).addClass('active');
    });

    /* Gallery slider */
    var gallerySlider = $('.slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        nav: true,
        dots: false,
        items: 6,
        navContainer: $('.gallery_buttons'),
        navText: ['prev','next'],
    });

    /* Prices slider */
    if (isMobile) {
        $('.prices, .services_list').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            nav: false,
            dots: true,
            items: 1,
            navText: ['prev','next'],
        });
    }

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
    var timeout = 1200;
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
            case '#partners':
                activePage = 5;
                break;
            case '#contact':
                activePage = 6;
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

    var hammer = new Hammer(document.body, {});
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammer.on('swipe', function(e) {
        scrollPages(e, true);
    });

    var hammer2 = new Hammer(document.querySelector('.gallery_info-image-wrapper'), {});
    hammer2.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    hammer2.on('swipe', function(e) {
        var activeSlide = $('.owl-item:not(.cloned) .slider_item.active:first-child');

        if (e.deltaX > 0) {
            activeSlide.parent().prev().children().trigger('click');
        } else {
            activeSlide.parent().next().children().trigger('click');
        }
    });

    /* Partners */
    $('.carousel__partners').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        items: 1,
        //autoWidth: true,
        navText: ['',''],
        responsive : {
            768 : {
                items: 2,
            },
            1024 : {
                items: 3,
            },
            1400 : {
                items: 4,
            }
        }
    });

    /* Load videos */
    $('video source').each(function(e) {
        if (!isMobile) {
            $(this).attr('src', $(this).data('src'));
            
        }
    });
    //if (!isMobile) {
    //    //$('.showcase_video').removeAttr('controls');
    //}
    document.querySelector('video').load();

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

    /* Translations */
    function loadTranslation() {
        const lang = localStorage.lang || 'pt';
        $('.lang_item[href="'+ lang +'"]').addClass('active');
        
        fetch('translations.json')
            .then(responce => {
                return responce.json();
            })
            .then(data => {
                $('.loc').each((i, el) => {
                    const word = el.dataset.word.split('.');
                    
                    try {
                        if (word.length === 1) {
                            el.innerHTML = data[lang][word[0]];
                        } else if (word.length === 2) {
                            el.innerHTML = data[lang][word[0]][word[1]];
                        } else if (word.length === 3) {
                            el.innerHTML = data[lang][word[0]][word[1]][word[2]];
                        } else if (word.length === 4) {
                            el.innerHTML = data[lang][word[0]][parseInt(word[1])][word[2]][word[3]];
                        } else if (word.length === 6) {
                            el.innerHTML = data[lang][word[0]][word[1]][word[2]][parseInt(word[3])][word[4]][word[5]];
                        }
                    } catch(err) {
                        console.error(err);
                    }
                })
            });
    }

    loadTranslation();

    $('.lang_item').on('click', function(e) {
        e.preventDefault();

        if (!$(this).hasClass('active')) {
            const lang = $(this).attr('href');
    
            $('.lang_item').removeClass('active');
            $(this).addClass('active');
            localStorage.lang = lang;
            loadTranslation();
        }
    });

});
