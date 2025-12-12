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


// gsap.registerPlugin(ScrollTrigger);
//
// gsap.utils.toArray(".fade-item").forEach((elem) => {
//
//     gsap.fromTo(
//       elem,
//       { opacity: 0, y: 80 },
//       {
//           opacity: 1,
//           y: 0,
//           scrollTrigger: {
//               trigger: elem,
//               start: "top 85%",
//               end: "top 50%",
//               scrub: true
//           }
//       }
//     );
//
//     gsap.to(elem, {
//         opacity: 0,
//         y: -80,
//         scrollTrigger: {
//             trigger: elem,
//             start: "top 50%",
//             end: "top 15%",
//             scrub: true
//         }
//     });
//
// });

// gsap.registerPlugin(ScrollTrigger);
//
// gsap.utils.toArray(".fade-item").forEach((elem) => {
//
//     gsap.fromTo(
//       elem,
//       { opacity: 0, y: 100 },
//       {
//           opacity: 1,
//           y: 0,
//           scrollTrigger: {
//               trigger: elem,
//               start: "top 90%",
//               end: "top 40%",
//               scrub: true
//           }
//       }
//     );
//
//     gsap.fromTo(
//       elem,
//       { opacity: 1, y: 0 },
//       {
//           opacity: 0,
//           y: -100,
//           scrollTrigger: {
//               trigger: elem,
//               start: "top 40%",
//               end: "top 0%",
//               scrub: true
//           }
//       }
//     );
//
// });

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

// gsap.utils.toArray(".fade-item").forEach((elem) => {
//
//     gsap.to(elem, {
//         opacity: 1,
//         y: 0,
//         ease: "none",
//         scrollTrigger: {
//             trigger: elem,
//             start: "top 90%",
//             end: "top 10%",
//             scrub: true
//         }
//     });
//
// });
// gsap.utils.toArray(".fade-item").forEach((elem) => {
//
//     gsap.to(elem, {
//         opacity: 0,
//         y: -80,
//         ease: "none",
//         scrollTrigger: {
//             trigger: elem,
//             start: "top 30%",
//             end: "top -20%",
//             scrub: true
//         }
//     });
//
// });
