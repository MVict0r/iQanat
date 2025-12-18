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

gsap.utils.toArray(".fade-item").forEach((elem) => {

    // Появление
    gsap.fromTo(
        elem,
        { opacity: 0, y: 120 },
        {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",  // появляется позже (лучше)
                end: "top 55%",    // не исчезает слишком рано
                scrub: true
            }
        }
    );

    // Исчезновение
    gsap.fromTo(
        elem,
        { opacity: 1, y: 0 },
        {
            opacity: 0,
            y: -120,
            ease: "power2.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 40%", // исчезать начинает ПОЗЖЕ
                end: "top 5%",    // исчезает ближе к верху → идеально
                scrub: true
            }
        }
    );

});


const isMobile = window.innerWidth <= 576;

gsap.utils.toArray(".fade-item").forEach((elem) => {

    const yOffset = isMobile ? 60 : 120;

    gsap.fromTo(
        elem,
        { opacity: 0, y: yOffset },
        {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                end: "top 55%",
                scrub: true
            }
        }
    );

    if (!isMobile) {
        gsap.fromTo(
            elem,
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: -yOffset,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 40%",
                    end: "top 5%",
                    scrub: true
                }
            }
        );
    }
});


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

