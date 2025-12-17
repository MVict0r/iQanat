const langSelect = document.querySelector('.lang-select');
const langBtn = document.querySelector('.lang-select__btn');
const langItems = document.querySelectorAll('.lang-select__list li');

langBtn.addEventListener('click', () => {
    langSelect.classList.toggle('open');
});

langItems.forEach(item => {
    item.addEventListener('click', () => {
        langBtn.innerHTML = item.innerText + ' <img src="assets/img/arrow.png" alt="arrow">';
        langSelect.classList.remove('open');
    });
});

document.addEventListener('click', (e) => {
    if (!langSelect.contains(e.target)) {
        langSelect.classList.remove('open');
    }
});

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

