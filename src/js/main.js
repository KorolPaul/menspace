$(document).ready(function () {
    /* Menu toggle */
    const $sidebar = $('.sidebar');
    const $menuToggle = $('.js-menu-toggle');

    $menuToggle.on('click', function (e) {
        e.preventDefault();
        $sidebar.toggleClass('opened');
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
