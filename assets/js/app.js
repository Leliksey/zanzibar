$(document).ready(function() {
    $(".burger__open").on("click", function () {
        createOverlay();
        $(".overlay span").remove();
        $(".burger__aside").addClass("open");
    });
    $(".burger__close").on("click", function () {
        removeOverlay();
        $(".burger__aside").removeClass("open");
    });
    function createOverlay() {
        var overlay = document.createElement("div");
        var overlay_close = document.createElement("span");
        overlay.append(overlay_close);
        overlay.classList.add("overlay");
        $('body').append(overlay);
        $('body').addClass("ovh");
    };
    function removeOverlay() {
        $('.overlay').remove();
        $('body').removeClass("ovh");
    };
    $(document).on("click", ".overlay", function () {
        removeOverlay();
        $(".burger__aside").removeClass("open");
        $(".btn__close").click();
        $(".popup").removeClass("open");
    });
    $(".popup__open").on("click", function() {
        $(".popup").addClass("open");
        createOverlay();
    });

    // Валидация по кнопке
    $('.popup__button').on('click', function () {
        let isValid = true;
        let phoneRegex = /^\+?\d{7,15}$/; // только цифры, допускается плюс в начале

        $('.popup__input-wrap').each(function () {
            const input = $(this).find('.popup__input');
            const errorParent = $(this);
            const inputVal = $.trim(input.val());

            // Проверка на пустоту
            if (inputVal === '') {
                errorParent.addClass("error");
                isValid = false;
            } else {
                // Для поля телефона — доп. проверка
                if (input.attr('type') === 'tel') {
                    const valNoSpaces = inputVal.replace(/\s/g, '');
                    if (!phoneRegex.test(valNoSpaces)) {
                        errorParent.addClass("error");
                        isValid = false;
                    } else {
                        errorParent.removeClass("error");
                    }
                } else {
                    errorParent.removeClass("error");
                }
            }
        });

        if (!isValid) {
            $('.error__text').fadeIn();
        } else {
            $('.error__text').fadeOut();
            // alert('Форма валидна! Можно отправлять.');
        }
    });

    // Удаление ошибки при вводе и скрытие .error__text если всё ок
    $('.popup__input').on('input', function () {
        const input = $(this);
        const wrap = input.closest('.popup__input-wrap');
        const errorParent = wrap;
        const inputVal = $.trim(input.val());
        const phoneRegex = /^\+?\d{7,15}$/;

        // Убираем ошибку при вводе
        errorParent.removeClass("error");

        // Если это телефон — проверим валидность
        if (input.attr('type') === 'tel') {
            const valNoSpaces = inputVal.replace(/\s/g, '');
            if (!phoneRegex.test(valNoSpaces)) {
                errorParent.addClass("error");
            }
        }

        // Дополнительно: проверяем, есть ли ещё ошибки
        let anyErrors = false;
        $('.popup__input-wrap').each(function () {
            const input = $(this).find('.popup__input');
            const val = $.trim(input.val());

            if (val === '') {
                anyErrors = true;
            } else if (input.attr('type') === 'tel') {
                const cleanVal = val.replace(/\s/g, '');
                if (!phoneRegex.test(cleanVal)) {
                    anyErrors = true;
                }
            }
        });

        if (!anyErrors) {
            $('.error__text').fadeOut();
        }
    });

    // Ограничение ввода: только цифры и + (в начале)
    $('.popup__input[type="tel"]').on('input', function () {
        let val = $(this).val();

        // Оставляем только цифры и плюс
        val = val.replace(/[^\d+]/g, '');

        // Убираем все плюсы кроме первого символа
        if (val.indexOf('+') > 0) {
            val = val.replace(/\+/g, '');
        }

        $(this).val(val);
    });




    $(".catalogs__slider").owlCarousel({
        loop: true,
        margin: 40,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    $(".reviews__slider").owlCarousel({
        loop: true,
        margin: 40,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });


    $(".questions__item").on("click", function() {
        $(this).toggleClass("open");
        $(this).find(".questions__text").slideToggle();
    });
});