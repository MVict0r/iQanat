const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const actions = document.querySelector('.nav__actions');
const overlay = document.querySelector('.menu-overlay');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');

    document.body.style.overflow =
        document.body.style.overflow === 'hidden' ? '' : 'hidden';
});

overlay.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// 2. ЛОГИКА МУЛЬТИЯЗЫЧНОСТИ
const langSelect = document.querySelector('.lang-select');
const langBtn = document.querySelector('.lang-select__btn');
const langItems = document.querySelectorAll('.lang-select__list li');

// Функция смены языка
function changeLanguage(lang) {
    // Проверка: есть ли такой язык в словаре (на всякий случай)
    if (!["ru", "kz", "en"].includes(lang)) return;

    // 1. Сохраняем выбор в браузере
    localStorage.setItem('language', lang);

    // 2. Меняем текст на всех элементах с атрибутом data-i18n
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        // Проверяем, есть ли перевод для этого ключа
        if (langArr[key] && langArr[key][lang]) {
            elem.innerText = langArr[key][lang];
        }
    });

    // 3. Обновляем текст кнопки выбора языка (чтобы видно было, что выбрано)
    const langNames = {
        "ru": "Русский",
        "kz": "Қазақша",
        "en": "English"
    };

    // Сохраняем иконку стрелочки при смене текста
    langBtn.innerHTML = `${langNames[lang]} <img src="assets/img/arrow.png" alt="arrow" width="18" height="10">`;
}

// Открытие/закрытие меню
langBtn.addEventListener('click', () => {
    langSelect.classList.toggle('active'); // Лучше использовать active, проверь CSS
});

// Клик по пункту языка
langItems.forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang'); // Получаем "ru", "kz" или "en"
        changeLanguage(lang); // Вызываем функцию перевода
        langSelect.classList.remove('active'); // Закрываем меню
    });
});

// Закрытие при клике вне
document.addEventListener('click', (e) => {
    if (!langSelect.contains(e.target)) {
        langSelect.classList.remove('active');
    }
});

// ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// Проверяем, какой язык был сохранен, или ставим ru
const savedLang = localStorage.getItem('language') || 'ru';
changeLanguage(savedLang);

gsap.registerPlugin(ScrollTrigger);

// HEART SECTION------------------------------------------------------------------
// Создаем таймлайн для секции Values
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".values",
        start: "top 70%", // Анимация начнется, когда верх секции будет на 70% экрана
        toggleActions: "play none none reverse"
    }
});

// 1. Анимация СЕРДЦА (Сверху вниз)
tl.from(".values__heart", {
    y: -100,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
});

tl.from([
    ".values__main-card h2",
    ".values__image",
    ".value-card"
], {
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "power2.out"
}, "<");


// STATS-------------------------------------------------------------------------
gsap.from(".stats__title",{
    scrollTrigger: {
        trigger: ".stats",
        start: "top 75%",
    },
    y: 50,
    opacity: 0,
    duration: 2.8,
    ease: "power2.out"
});

gsap.from(".stats-card", {
    scrollTrigger: {
        trigger: ".stats",
        start: "top 75%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
});

gsap.utils.toArray(".stats-card__number").forEach((el) => {

    // 1. Очищаем текст от пробелов и превращаем в число
    const endValue = parseFloat(el.innerText.replace(/\s/g, ""));

    const counter = { val: 0 };

    gsap.to(counter, {
        val: endValue,
        duration: 2,
        ease: "power1.out",

        scrollTrigger: {
            trigger: ".stats",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },

        onUpdate: function() {
            el.innerText = Math.ceil(counter.val).toLocaleString('ru-RU');
        }
    });
});

//----------------------------------------------------PHOTOS SECTIONS
// gsap.utils.toArray(".photos-section").forEach((section) => {
//     const overlay = section.querySelector(".photos-overlay");
//     const content = section.querySelector(".photos-overlay__content");
//     const photos = section.querySelectorAll(".photo");
//
//     ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         end: "bottom bottom",
//         pin: overlay,
//         pinSpacing: false
//     });
//
//     gsap.from(content, {
//         scrollTrigger: {
//             trigger: section,
//             start: "top 60%",
//             toggleActions: "play none none reverse"
//         },
//         y: 30,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.out"
//     });
//
//     photos.forEach((photo, index) => {
//         gsap.from(photo, {
//             scrollTrigger: {
//                 trigger: photo,
//                 start: "top 90%",
//                 toggleActions: "play none none reverse"
//             },
//             y: 50,
//             opacity: 0,
//             duration: 0.8,
//             delay: index * 0.1
//         });
//     });
// });

// let mm = gsap.matchMedia();
//
// // === ДЕСКТОП (Больше 992px) ===
// mm.add("(min-width: 993px)", () => {
//
//     const sections = gsap.utils.toArray(".photos-section");
//
//     // 1. Предварительная настройка: делаем все тексты FIXED и невидимыми
//     sections.forEach((section) => {
//         const overlay = section.querySelector(".photos-overlay");
//         gsap.set(overlay, {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             autoAlpha: 0 // opacity: 0 + visibility: hidden
//         });
//     });
//
//     // 2. Логика переключения текста
//     sections.forEach((section, i) => {
//         const overlay = section.querySelector(".photos-overlay");
//         const photos = section.querySelectorAll(".photo");
//
//         // --- АНИМАЦИЯ ФОТО (Снизу вверх) ---
//         photos.forEach((photo, index) => {
//             gsap.from(photo, {
//                 scrollTrigger: {
//                     trigger: photo,
//                     start: "top 90%",
//                     toggleActions: "play none none reverse"
//                 },
//                 y: 80,
//                 opacity: 0,
//                 duration: 0.8,
//                 delay: index * 0.1
//             });
//         });
//
//         // --- ЛОГИКА ТЕКСТА ---
//
//         // Сценарий для ПЕРВОЙ секции (Въезд сверху)
//         if (i === 0) {
//             gsap.fromTo(overlay,
//                 { y: -window.innerHeight, autoAlpha: 1 }, // Старт: высоко сверху
//                 {
//                     y: 0, // Конец: по центру
//                     autoAlpha: 1,
//                     ease: "none",
//                     scrollTrigger: {
//                         trigger: section,
//                         start: "top bottom", // Начало секции касается низа экрана
//                         end: "center center", // Центр секции в центре экрана
//                         scrub: 1, // Привязать к скроллу
//                     }
//                 }
//             );
//
//             // Логика исчезновения первой секции, когда скроллим дальше
//             ScrollTrigger.create({
//                 trigger: section,
//                 start: "bottom center",
//                 onLeave: () => gsap.to(overlay, { autoAlpha: 0, duration: 0.3 }),
//                 onEnterBack: () => gsap.to(overlay, { autoAlpha: 1, duration: 0.3 })
//             });
//         }
//
//         // Сценарий для ПОСЛЕДНЕЙ секции (Уезд наверх)
//         else if (i === sections.length - 1) {
//             // Появление (стандартное)
//             ScrollTrigger.create({
//                 trigger: section,
//                 start: "top center",
//                 onEnter: () => gsap.to(overlay, { autoAlpha: 1, duration: 0.3 }),
//                 onLeaveBack: () => gsap.to(overlay, { autoAlpha: 0, duration: 0.3 })
//             });
//
//             // Уезд наверх вместе с концом секции
//             gsap.to(overlay, {
//                 y: -window.innerHeight, // Улетаем вверх
//                 ease: "none",
//                 scrollTrigger: {
//                     trigger: section,
//                     start: "bottom bottom", // Когда низ секции касается низа экрана
//                     end: "bottom top",      // Когда низ секции уходит вверх
//                     scrub: 1
//                 }
//             });
//         }
//
//         // Сценарий для СРЕДНИХ секций (Просто Fade In/Out)
//         else {
//             ScrollTrigger.create({
//                 trigger: section,
//                 start: "top center",    // Когда верх дошел до центра
//                 end: "bottom center",   // Когда низ дошел до центра
//                 onEnter: () => gsap.to(overlay, { autoAlpha: 1, duration: 0.3 }),
//                 onLeave: () => gsap.to(overlay, { autoAlpha: 0, duration: 0.3 }),
//                 onEnterBack: () => gsap.to(overlay, { autoAlpha: 1, duration: 0.3 }),
//                 onLeaveBack: () => gsap.to(overlay, { autoAlpha: 0, duration: 0.3 })
//             });
//         }
//     });
// });
//
// // === МОБИЛЬНЫЕ (Меньше 992px) ===
// mm.add("(max-width: 992px)", () => {
//     // На мобилках возвращаем relative (через CSS оно уже стоит,
//     // но на всякий случай сбрасываем инлайн стили от GSAP)
//     gsap.set(".photos-overlay", {
//         position: "relative",
//         top: "auto",
//         opacity: 1,
//         visibility: "visible",
//         y: 0
//     });
//
//     // Простая анимация появления
//     gsap.utils.toArray(".photos-section").forEach((section) => {
//         const content = section.querySelector(".photos-overlay__content");
//         gsap.from(content, {
//             scrollTrigger: {
//                 trigger: section,
//                 start: "top 80%"
//             },
//             y: 30,
//             opacity: 0,
//             duration: 0.8
//         });
//     });
// });

const sections = gsap.utils.toArray(".photos-section");

// 1. Предварительная настройка (без изменений)
sections.forEach((section) => {
    const overlay = section.querySelector(".photos-overlay");
    gsap.set(overlay, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        autoAlpha: 0,
        zIndex: 10,
        pointerEvents: "none"
    });
});

// 2. ГЛОБАЛЬНЫЙ ПРЕДОХРАНИТЕЛЬ (ИСПРАВЛЕННЫЙ)
ScrollTrigger.create({
    trigger: ".all-photos-wrapper",
    start: "top top",
    end: "bottom bottom",
    // ИСПРАВЛЕНИЕ: Используем gsap.to вместо gsap.set для плавного исчезновения
    onLeave: () => {
        gsap.to(".photos-overlay", { autoAlpha: 0, duration: 0.5, overwrite: true });
    },
    onLeaveBack: () => {
        gsap.to(".photos-overlay", { autoAlpha: 0, duration: 0.5, overwrite: true });
    }
});

// 3. Логика секций
sections.forEach((section, i) => {
    const overlay = section.querySelector(".photos-overlay");
    const photos = section.querySelectorAll(".photo");

    // Анимация фото
    photos.forEach((photo, index) => {
        gsap.from(photo, {
            scrollTrigger: {
                trigger: photo,
                start: "top 95%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // --- ЛОГИКА ТЕКСТА ---

    // Сценарий для ПЕРВОЙ секции
    if (i === 0) {
        gsap.fromTo(overlay,
            { y: -window.innerHeight, autoAlpha: 1 },
            {
                y: 0,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                }
            }
        );

        // Доп. триггер для правильного поведения при перезагрузке и скролле назад
        ScrollTrigger.create({
            trigger: section,
            start: "bottom center",
            onLeave: () => gsap.to(overlay, { autoAlpha: 0, duration: 0.5 }), // 0.5 сек для плавности
            onEnterBack: () => gsap.to(overlay, { autoAlpha: 1, duration: 0.5 }),

            // Фикс бага "залипания" при перезагрузке
            onRefresh: (self) => {
                if (self.progress === 1) {
                    gsap.set(overlay, { autoAlpha: 0 });
                }
            }
        });
    }

    // Сценарий для ПОСЛЕДНЕЙ секции
    else if (i === sections.length - 1) {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            onEnter: () => gsap.to(overlay, { autoAlpha: 1, duration: 0.5 }),
            onLeaveBack: () => gsap.to(overlay, { autoAlpha: 0, duration: 0.5 })
        });

        // Анимация уезда наверх
        gsap.to(overlay, {
            y: -window.innerHeight,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top", // Когда низ секции уходит за верх экрана
                scrub: 1
            }
        });
    }

    // Сценарий для СРЕДНИХ секций
    else {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
                if (self.isActive) {
                    gsap.to(overlay, { autoAlpha: 1, duration: 0.5, overwrite: true });
                } else {
                    gsap.to(overlay, { autoAlpha: 0, duration: 0.5, overwrite: true });
                }
            }
        });
    }
});

// COURSES-SECTION
const tlCourses = gsap.timeline({
    scrollTrigger: {
        trigger: ".courses",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

// Шаг 1: Заголовок
tlCourses.from(".courses-title", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
});

// Шаг 2: КНОПКИ ПЕРЕКЛЮЧЕНИЯ (Новое)
tlCourses.from(".courses .toggle-container", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.6");

// Шаг 3: Карточки слайдера
tlCourses.from(".courses-card", {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.2)",
    clearProps: "all"
}, "-=0.4");

// Шаг 4: Кнопки навигации (стрелки внизу)
tlCourses.from(".carousel-btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.5");


// HOW-STUDY
const tlStudy = gsap.timeline({
    scrollTrigger: {
        trigger: ".how-study",
        start: "top 75%",
        toggleActions: "play none none reverse"
    }
});

// Шаг 1: Заголовок
tlStudy.from(".how-study .title", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
});

// Шаг 2: КНОПКИ ПЕРЕКЛЮЧЕНИЯ (Новое)
// Появляются сразу после начала заголовка с небольшим нахлестом
tlStudy.from(".how-study .toggle-container", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.6");

// Шаг 3: Карточки
tlStudy.from(".step-card", {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    clearProps: "all"
}, "-=0.4");


// BEST-SLIDER
function initInfiniteSlider(sliderContainer) {
    const track = sliderContainer.querySelector(".best-track");
    if (!track) return;
    const originalCards = Array.from(track.children);
    if (originalCards.length === 0) return;
    while (track.scrollWidth < window.innerWidth + 500) {
        originalCards.forEach(card => {
            track.appendChild(card.cloneNode(true));
        });
    }

    const currentCards = Array.from(track.children);
    currentCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    const scrollSpeed = 50;
    const totalWidth = track.scrollWidth;
    const duration = totalWidth / scrollSpeed;

    const sliderAnimation = gsap.to(track, {
        x: "-50%", // Двигаем трек
        ease: "none",
        duration: duration,
        repeat: -1,
    });

    sliderContainer.addEventListener("mouseenter", () => {
        sliderAnimation.pause();
    });

    sliderContainer.addEventListener("mouseleave", () => {
        sliderAnimation.play();
    });

    gsap.from(sliderContainer, {
        scrollTrigger: {
            trigger: sliderContainer,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
}

const allSliders = document.querySelectorAll('.best-slider');

allSliders.forEach(slider => {
    initInfiniteSlider(slider);
});

// COURSES BTN-------------------------------------------------------------------------------
const courseToggles = document.querySelectorAll('.course-toggle');
const courseContents = document.querySelectorAll('.course-tab-content');

courseToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        courseToggles.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        gsap.to(courseContents, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                courseContents.forEach(el => el.style.display = 'none');

                targetContent.style.display = 'block';
                gsap.set(targetContent, { y: 20, opacity: 0 });

                gsap.to(targetContent, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    onStart: () => {
                        const cards = targetContent.querySelectorAll('.courses-card');
                        gsap.fromTo(cards,
                            { y: 50, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, clearProps: "all" }
                        );
                    }
                });
            }
        });
    });
});

document.querySelectorAll('.courses-nav').forEach(button => {
    button.addEventListener('click', function() {
        const container = this.closest('.carousel-container');
        const carousel = container.querySelector('.carousel');

        const direction = this.classList.contains('next') ? 1 : -1;
        const scrollAmount = 350;

        carousel.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
    });
});


// how-study btn------------------------------------------------------------------------------
const toggleBtns = document.querySelectorAll('.toggle-btn');
const tabContents = document.querySelectorAll('.tab-content');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);

        gsap.to(tabContents, {
            opacity: 0,
            y: 20, // Немного сдвигаем вниз при исчезновении
            duration: 0.3,
            onComplete: () => {
                tabContents.forEach(el => el.style.display = 'none');

                targetContent.style.display = 'grid'; // Возвращаем display: grid
                gsap.set(targetContent, { y: 20, opacity: 0 }); // Ставим начальную позицию

                gsap.to(targetContent, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",

                    onStart: () => {
                        const cards = targetContent.querySelectorAll('.step-card');
                        gsap.fromTo(cards,
                            { y: 30, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, clearProps: "all" }
                        );
                    }
                });
            }
        });
    });
});
