// Swiper js
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    // grabCursor: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },

    on: {
        slideChange: function() {
            // Get the currently selected slide's index
            let selectedIndex = this.activeIndex;

            // Animate the home-details and home-text elements
            gsap.fromTo(
                `.swiper-slide:nth-child(${selectedIndex + 1}) .home-details, .swiper-slide:nth-child(${selectedIndex + 1}) .home-text, .social`, {
                    // Initial state
                    opacity: 0,
                    y: 400,
                    autoAlpha: 0,
                }, {
                    // Final state
                    opacity: 1,
                    y: 0,
                    duration: 1, // Animation duration (in seconds)
                    autoAlpha: 1,
                    ease: "power4.out", // Easing function
                }
            );
        },
    },


});

// Copyright year
document.getElementById("year").innerHTML = new Date().getFullYear();



// Nav open close
const body = document.querySelector('body');
navMenu = document.querySelector('.menu-content');
menuBtn = document.querySelector('.menu-bar');
// navOpenBtn = body.querySelector('.navOpen-btn'),
// navCloseBtn = navMenu.querySelector('.navClose-btn');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle("active");
    navMenu.classList.toggle("open");
});

// if (navMenu && navOpenBtn) {
//     navOpenBtn.addEventListener("click", () => {
//         navMenu.classList.add("open");
//         body.style.overflowY = "hidden";
//     })
// }

// if (navMenu && navCloseBtn) {
//     navCloseBtn.addEventListener("click", () => {
//         navMenu.classList.remove("open");
//         body.style.overflowY = "scroll";
//     })
// }

// Change header bg color
window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 5) {
        document.querySelector("header").classList.add("header-active");
    } else {
        document.querySelector("header").classList.remove("header-active");
    }

    // Scroll up button
    const scrollUpBtn = document.querySelector('.scrollUp-btn');

    if (scrollY > 250) {
        scrollUpBtn.classList.add("scrollUpBtn-active");
    } else {
        scrollUpBtn.classList.remove("scrollUpBtn-active");
    }


    // Nav link indicator

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight,
            sectionTop = section.offsetTop - 100;

        let navId = document.querySelector(`.menu-content a[href='#${section.id}']`);
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navId.classList.add("active-navlink");
        } else {
            navId.classList.remove("active-navlink");
        }

        navId.addEventListener("click", () => {
            navMenu.classList.remove("open");
            body.style.overflowY = "scroll";
        })
    })
})

// for portfolio

//owl owlCarousel
$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        margin: 5,
        mavigation: true,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,

        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});

// team

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
    isAutoPlay = true,
    startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// Scroll Reveal Animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.section-title, .section-subtitle, .section-description, .brand-image, .tesitmonial, .newsletter 
.logo-content, .newsletter-inputBox, .newsletter-mediaIcon, .footer-content, .footer-links`, { interval: 100, })

sr.reveal(`.about-imageContent, .menu-items`, { origin: 'left' })
sr.reveal(`.about-details, .time-table`, { origin: 'right' })