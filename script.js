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
