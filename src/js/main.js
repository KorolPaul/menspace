$(document).ready(function () {
    /* Loader */
    setTimeout(() => {
        $('.loader').removeClass('active');
    }, 1000);

    /* Menu toggle */
    const menuElement = $('.menu');
    const menuToggleElement = $('.menu-toggle');

    $('.menu-toggle, .menu_leave').on('click', function (e) {
        e.preventDefault();
        menuToggleElement.toggleClass('opened');
        menuElement.toggleClass('opened');
        $('html').toggleClass('menu-opened');
    });

    /* Popups */
    function popupToggle(targetElement) {
        if (targetElement.target && targetElement.target.className === 'fade') {
            $('html').toggleClass('popup-opened');
            console.log(1, targetElement.target.className);
            targetElement.stopPropagation();
            $('.popup.opened').toggleClass('opened');
        } else {
            $('html').addClass('popup-opened');
            $(targetElement).toggleClass('opened');
        }
    }

    $('.fade').on('click', popupToggle);

    $('.go-to-authorization-open-window').on('click', function (event) {
        event.preventDefault();

        openModal('.popup-authorization')
    });
    $('.go-to-registration-open-window').on('click', function (event) {
        event.preventDefault();

        openModal('.popup-registration')
    });
    $('.go-to-reset-password-open-window').on('click', function (event) {
        event.preventDefault();

        openModal('.popup-reset-password')
    });

    function openModal(targetElement) {
        $('html').addClass('popup-opened');
        $('.popup.opened').removeClass('opened');
        $(targetElement).addClass('opened');
    }

    /* Select customization */
    $('select[data-mode="icons"]').each(function () {
        const iconOptions = $(this).find('option');
        const iconChoices = [];
        for (let i = 0; i < iconOptions.length; i++) {
            iconChoices.push({
                value: iconOptions[i].value,
                label: iconOptions[i].innerText,
                selected: i === 0,
                customProperties: {
                    iconSrc: iconOptions[i].dataset.icon,
                },
            });
        };
        const choises = new Choices($(this)[0], {
            searchEnabled: false,
            itemSelectText: '',
            callbackOnCreateTemplates: function (template) {
                return {
                    item: (classNames, data) => {
                        return template(`
                            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
                                ${data.customProperties ? '<img src="' + data.customProperties.iconSrc + '" alt="data.label" class="flag-icon" />' : ''} ${data.label}
                            </div>
                        `);
                    },
                    choice: (classNames, data) => {
                        return template(`
                            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
                                ${data.customProperties ? '<img src="' + data.customProperties.iconSrc + '" alt="data.label" class="flag-icon" />' : ''} ${data.label}
                            </div>
                        `);
                    },
                };
            }
        });

        choises.setChoices(iconChoices, 'value', 'label', true);
    });

    if ($('select:not([data-mode="icons"])').length) {
        new Choices('select:not([data-mode="icons"])', {
            searchEnabled: false,
            itemSelectText: ''
        });
    }

    /* Switcher element */
    const switchButtons = $('.switch_item');
    for (let i = 0; i < switchButtons.length; i++) {
        switchButtons.on('click', changeSwitcher);
    }

    function changeSwitcher() {
        const activeClassName = 'switch_item__active';
        $(this).parent().find('.switch_item').removeClass(activeClassName);
        $(this).addClass(activeClassName);

        const tab = $(this).data('tab-link');
        $(this).parent().parent().parent().find('.tab').removeClass('active');
        $('.tab[data-tab="' + tab + '"]').addClass('active');
    }

    /* Balance button */
    $('.refresh-user-balance-button').on('click', function() {
        const icon =  $(this).find('.refresh-user-balance-icon');
        icon.addClass('loading');
        setTimeout(function() {
            icon.removeClass('loading');
        }, 3000);
    });

    /* Slider */
    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
    });

    /* Phone number pattern */
    const phoneElements = document.querySelectorAll('input[type="tel"]');
    for (let i = 0; i < phoneElements.length; i++) {
        var dateMask = IMask(phoneElements[i],
        {
            mask: '-0000-0000',
            lazy: false
        });
    }
    $('.js-country').on('mousedown', '.choices__item--choice', function() {
        let text = $(this).html();
        text = text.substring(0, text.indexOf('">') + 2) + text.substring(text.indexOf('(') + 1, text.indexOf(')'));
        $('.phone_code').html(text);
    });

    /* Load button */
    $('.dashboard_button').on('click', function() {
        $(this).addClass('loading');
        setTimeout(() => {
            $(this).removeClass('loading');
        }, 2000);
    });

    /* Alert messages */
    $('.alert_close').on('click', function() {
        $(this).parent().removeClass('active');
    });

});
