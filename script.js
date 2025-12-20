const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
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

// PHOTO SECTION------------------------------------------------------------------
// Находим все секции с классом .photos-section и перебираем их по одной
gsap.utils.toArray(".photos-section").forEach((section) => {

    // Внутри текущей секции находим нужные элементы
    const overlay = section.querySelector(".photos-overlay");
    const content = section.querySelector(".photos-overlay__content");
    const photos = section.querySelectorAll(".photo");

    // 1. Логика "Прилипания" (Pinning) для текущей секции
    ScrollTrigger.create({
        trigger: section,    // Триггером является ИМЕННО ЭТА секция
        start: "top top",
        end: "bottom bottom",
        pin: overlay,        // Закрепляем ИМЕННО ЭТОТ оверлей
        pinSpacing: false    // Важно: отключаем добавление отступов, так как оверлей absolute
    });

    // 2. Анимация появления текста внутри текущей секции
    gsap.from(content, {
        scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // 3. Анимация фото внутри текущей секции
    // Мы перебираем фото, чтобы добавить задержку (index * 0.1)
    // которая сбрасывается для каждой новой секции
    photos.forEach((photo, index) => {
        gsap.from(photo, {
            scrollTrigger: {
                trigger: photo, // Каждое фото триггерит само себя
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.1 // Первая фото - 0с, вторая - 0.1с и т.д.
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


const carousel = document.querySelector(".carousel");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

const cardWidth = 350; // ширина карточки + gap

btnNext.addEventListener("click", () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
});

btnPrev.addEventListener("click", () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
});

