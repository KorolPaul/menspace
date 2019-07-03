$(document).ready(function () {
    /* Menu toggle */
    const menuElement = $('.menu');
    const menuToggleElement = $('.menu-toggle');

    $('.menu-toggle, .menu_leave').on('click', function (e) {
        e.preventDefault();
        menuToggleElement.toggleClass('opened');
        menuElement.toggleClass('opened');
        $('html').toggleClass('menu-opened');
    });

    /* Slider */
    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
    });

});
