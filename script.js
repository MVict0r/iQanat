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


gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade-item").forEach((elem) => {

    gsap.fromTo(elem,
        {
            opacity: 0,
            y: 80
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",      // когда элемент появляется
                end: "top 20%",        // когда он должен исчезнуть
                scrub: true,           // плавность
            }
        }
    );

    // Исчезновение
    gsap.to(elem, {
        opacity: 0,
        y: -80,
        ease: "power2.out",
        scrollTrigger: {
            trigger: elem,
            start: "top 20%",
            end: "top -10%",
            scrub: true,
        }
    });

});
