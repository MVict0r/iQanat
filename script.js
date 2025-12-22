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
    y: -100,      // Летит сверху (минусовое значение)
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)", // Эффект пружинки при приземлении
});

// 2. Анимация ВСЕГО ОСТАЛЬНОГО (Снизу вверх)
// Мы перечисляем селекторы через запятую в массиве
tl.from([
    ".values__main-card h2",
    ".values__image",
    ".value-card"
], {
    y: 50,       // Летят снизу (плюсовое значение)
    opacity: 0,
    duration: 1.2,
    stagger: 0.1, // Карточки будут появляться "лесенкой" с задержкой 0.1с
    ease: "power2.out"
}, "<"); // <--- ВАЖНО: Этот символ означает "начать одновременно с предыдущей анимацией (сердцем)"


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
    stagger: 0.1, // Карточки будут появляться по очереди
    ease: "power2.out"
});

// Находим все элементы с цифрами
gsap.utils.toArray(".stats-card__number").forEach((el) => {

    // 1. Очищаем текст от пробелов и превращаем в число
    // "16 000" превратится в число 16000
    const endValue = parseFloat(el.innerText.replace(/\s/g, ""));

    // Создаем объект-счетчик, который начнет с 0
    const counter = { val: 0 };

    gsap.to(counter, {
        val: endValue, // Анимируем значение объекта до конечной цифры
        duration: 2,   // Длительность анимации (2 секунды)
        ease: "power1.out", // Замедление к концу

        scrollTrigger: {
            trigger: ".stats", // Запускаем, когда видна секция
            start: "top 80%",
            toggleActions: "play none none reverse" // При скролле вверх цифры сбросятся
        },

        // Самая важная часть: обновление текста на каждом кадре
        onUpdate: function() {
            // Math.ceil округляет дроби до целого
            // toLocaleString('ru-RU') добавляет пробелы (16 000)
            el.innerText = Math.ceil(counter.val).toLocaleString('ru-RU');
        }
    });
});


// Перебираем все секции
gsap.utils.toArray(".photos-section").forEach((section) => {

    // Находим элементы внутри секции
    const overlay = section.querySelector(".photos-overlay");
    const content = section.querySelector(".photos-overlay__content");
    const photos = section.querySelectorAll(".photo");

    // 1. Логика "Прилипания" (Работает везде)
    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: overlay,       // Текст прилипает
        pinSpacing: false   // Отступы не добавляем
    });

    // 2. Анимация текста
    gsap.from(content, {
        scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse"
        },
        y: 30, // Чуть меньше амплитуда для аккуратности
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // 3. Анимация фото
    photos.forEach((photo, index) => {
        gsap.from(photo, {
            scrollTrigger: {
                trigger: photo,
                start: "top 90%", // На мобилке лучше срабатывать раньше (90%)
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1 // Задержка лесенкой
        });
    });
});

// COURSES-SECTION
// Создаем сценарий (timeline) для секции курсов
const tlCourses = gsap.timeline({
    scrollTrigger: {
        trigger: ".courses", // Триггер - сама секция
        start: "top 75%",    // Старт, когда верх секции на 75% экрана
        toggleActions: "play none none reverse" // Проигрываем при входе, реверс при уходе
    }
});

// 1. Анимация Заголовка
tlCourses.from(".courses-title", {
    y: 50,          // Снизу
    opacity: 0,     // Из прозрачности
    duration: 0.8,
    ease: "power2.out"
});

// 2. Анимация Карточек (Волна)
tlCourses.from(".courses-card", {
    y: 100,         // Карточки летят с большей глубины
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,   // Задержка между каждой карточкой 0.1 сек
    ease: "back.out(1.2)", // Легкий пружинящий эффект

    // ОЧЕНЬ ВАЖНО для твоего ховера:
    // После окончания анимации удаляем стили GSAP, чтобы заработал CSS :hover
    clearProps: "all"
}, "-=0.6"); // Начинаем этот шаг за 0.6 сек до окончания анимации заголовка (наложение)

// 3. Анимация кнопок
tlCourses.from(".carousel-btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.5"); // Тоже небольшой нахлест по времени


// HOW-STUDY
const tlStudy = gsap.timeline({
    scrollTrigger: {
        trigger: ".how-study",
        start: "top 75%", // Анимация начнется, когда верх секции будет на 75% экрана
        toggleActions: "play none none reverse"
    }
});

// 1. Анимация заголовка
tlStudy.from(".how-study .title", {
    y: 50,          // Выезжает снизу
    opacity: 0,     // Из прозрачности
    duration: 0.8,
    ease: "power2.out"
});

// 2. Анимация карточек (Grid)
tlStudy.from(".step-card", {
    y: 100,         // Карточки едут с большей глубины
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,   // Каждая следующая карточка появляется с задержкой 0.1с
    ease: "power2.out",

    // Важно: чистим стили после анимации, чтобы не мешать возможным будущим CSS трансформациям
    clearProps: "all"
}, "-=0.6");

// BEST-SLIDER
// const track = document.querySelector(".best-track");
// const originalCards = Array.from(track.children); // Запоминаем исходный набор
//
// // 1. ФУНКЦИЯ ЗАПОЛНЕНИЯ
// // Клонируем карточки, пока трек не станет шире экрана
// // (Это защитит от ситуации, когда карточек мало, а экран 4K)
// const ensureTrackWidth = () => {
//     // Если карточек вообще нет, выходим
//     if (originalCards.length === 0) return;
//
//     // Пока ширина трека меньше ширины экрана (с запасом 500px), добавляем копии оригиналов
//     while (track.scrollWidth < window.innerWidth + 500) {
//         originalCards.forEach(card => {
//             track.appendChild(card.cloneNode(true));
//         });
//     }
// };
//
// // Вызываем функцию заполнения
// ensureTrackWidth();
//
// // 2. ФИНАЛЬНОЕ ДУБЛИРОВАНИЕ ДЛЯ БЕСШОВНОСТИ
// // Теперь, когда трек достаточно длинный, мы берем ВСЁ, что есть,
// // и дублируем это один раз. Это нужно для трюка с x: -50%.
// const currentCards = Array.from(track.children);
// currentCards.forEach(card => {
//     track.appendChild(card.cloneNode(true));
// });
//
// // 3. Анимация (Такая же, как была)
// const scrollSpeed = 50;
// const totalWidth = track.scrollWidth;
// const duration = totalWidth / scrollSpeed;
//
// const sliderAnimation = gsap.to(".best-track", {
//     x: "-50%",
//     ease: "none",
//     duration: duration,
//     repeat: -1,
// });
//
// // 4. Пауза при наведении
// const sliderContainer = document.querySelector(".best-slider");
//
// sliderContainer.addEventListener("mouseenter", () => {
//     sliderAnimation.pause();
// });
//
// sliderContainer.addEventListener("mouseleave", () => {
//     sliderAnimation.play();
// });

// 1. Создаем функцию инициализации одного слайдера
function initInfiniteSlider(sliderContainer) {

    // Ищем трек ИМЕННО ВНУТРИ текущего контейнера
    const track = sliderContainer.querySelector(".best-track");

    // Если трека нет (ошибка верстки), выходим
    if (!track) return;

    // --- ЛОГИКА КЛОНИРОВАНИЯ ---
    const originalCards = Array.from(track.children);

    // Если пусто, нечего анимировать
    if (originalCards.length === 0) return;

    // Клонируем, пока не заполним экран (защита от малого кол-ва карточек)
    while (track.scrollWidth < window.innerWidth + 500) {
        originalCards.forEach(card => {
            track.appendChild(card.cloneNode(true));
        });
    }

    // Финальное дублирование всего набора для бесшовного цикла
    const currentCards = Array.from(track.children);
    currentCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    // --- GSAP АНИМАЦИЯ ---
    const scrollSpeed = 50;
    const totalWidth = track.scrollWidth;
    const duration = totalWidth / scrollSpeed;

    const sliderAnimation = gsap.to(track, {
        x: "-50%", // Двигаем трек
        ease: "none",
        duration: duration,
        repeat: -1,
    });

    // --- ПАУЗА ПРИ НАВЕДЕНИИ ---
    // Вешаем слушатели на текущий контейнер
    sliderContainer.addEventListener("mouseenter", () => {
        sliderAnimation.pause();
    });

    sliderContainer.addEventListener("mouseleave", () => {
        sliderAnimation.play();
    });

    // --- ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ (Опционально) ---
    gsap.from(sliderContainer, {
        scrollTrigger: {
            trigger: sliderContainer, // Триггер - сам текущий слайдер
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
}

// 2. Находим ВСЕ слайдеры на странице и запускаем функцию для каждого
const allSliders = document.querySelectorAll('.best-slider');

allSliders.forEach(slider => {
    initInfiniteSlider(slider);
});

