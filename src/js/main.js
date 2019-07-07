$(document).ready(function () {
    /* Menu toggle */
    const $sidebar = $('.sidebar');
    const $menuToggle = $('.js-menu-toggle');

    $menuToggle.on('click', function (e) {
        e.preventDefault();
        $sidebar.toggleClass('opened');
    });

    $('.showcase_logo').on('mousemove', function (e) {
        const { clientHeight, clientWidth } = e.currentTarget;
        let { layerX, layerY } = e.originalEvent;

        const percentX = (layerX / clientWidth * 100) - 50;
        const percentY = (layerY / clientHeight * 100) - 50;

        $(this).css('transform', `translate(-50%, -50%) rotateY(${percentX / 3}deg) rotateX(${-percentY / 20}deg)`);
    });

    /* Slider */
    //$('.slider').slick({
    //    infinite: false,
    //    slidesToShow: 3,
    //    slidesToScroll: 1,
    //    dots: false,
    //    arrows: true,
    //    appendArrows: $('.gallery_buttons'),
    //    prevArrow: '<button type="button" class="slick-prev">prev</buttonn>',
    //    nextArrow: '<button type="button" class="slick-next">next</button>'
    //});

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
        navText: ['prev','next']
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

});
