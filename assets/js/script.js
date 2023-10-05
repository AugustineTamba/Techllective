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

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle("active");
    navMenu.classList.toggle("open");
});

// Change header bg color
window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 5) {
        document.querySelector("header").classList.add("header-active");
        // Change the logo image source to black version
        document.querySelector(".logo-icon").src = "./assets/images/dark-logo.png";
    } else {
        document.querySelector("header").classList.remove("header-active");
        // Change the logo image source back to the original version
        document.querySelector(".logo-icon").src = "./assets/images/logo.png";
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

        // let navId = document.querySelector(`.menu-content a[href='#${section.id}']`);
        // if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        //     navId.classList.add("active-navlink");
        // } else {
        //     navId.classList.remove("active-navlink");
        // }

        // navId.addEventListener("click", () => {
        //     navMenu.classList.remove("open");
        //     body.style.overflowY = "scroll";
        // })

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle("active");
            navMenu.classList.toggle("open");
        });
    })
})

// explore button
function exploreButton() {
    // Get a reference to the section you want to scroll to
    const serviceSection = document.getElementById("services");

    // Scroll to the "service" section
    serviceSection.scrollIntoView({ behavior: "smooth" });
}

// blog load-more button
function loadMore() {
        // Replace 'https://example.com' with the URL of the website you want to open.
        const websiteUrl = 'https://techllective-blog.vercel.app/';

        // Use window.location to navigate to the specified website.
        window.location.href = websiteUrl;
}

// post-box

// Get all img elements within the post-box class
  const imgElements = document.querySelectorAll('.post-box img.post-img');

  // Define a function to open the link when the image is clicked
  function openLink(event) {
    // Get the closest parent post-box element
    const postBox = event.target.closest('.post-box');
    
    // Get the link URL from the "href" attribute of the post-title link within the clicked post-box
    const link = postBox.querySelector('.post-title').getAttribute('href');

    // Navigate to the link
    window.location.href = link;
  }

  // Add a click event listener to each img element
  imgElements.forEach((imgElement) => {
    imgElement.addEventListener('click', openLink);
  });


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
const paginationBullets = document.querySelectorAll(".bullet");

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
    if (!isAutoPlay) return; // Return if isAutoPlay is false
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

// Function to update the active bullet based on the current visible card
const updateActiveBullet = () => {
    const visibleCardIndex = Math.round(carousel.scrollLeft / firstCardWidth) % paginationBullets.length;
    paginationBullets.forEach((bullet, index) => {
        if (index === visibleCardIndex) {
            bullet.classList.add("active");
        } else {
            bullet.classList.remove("active");
        }
    });
};

// Call the function initially to set the active bullet
updateActiveBullet();

// Update active bullet when the carousel is scrolled
carousel.addEventListener("scroll", updateActiveBullet);

// Update active bullet and scroll to the selected card when a bullet is clicked
paginationBullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        carousel.scrollLeft = (index + cardPerView) * firstCardWidth + 1;
        updateActiveBullet();
    });
});

// Contact US
function sendMail() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    // Display popup
    let popupContainer = document.querySelector(".popup-container");
    let popupTitle = document.querySelector(".popup-title");
    let popupMessage = document.querySelector(".popup-message");
    let popupOkayButton = document.querySelector(".popup-okay-button");

    if (name.trim() !== "" && email.trim() !== "") {
        // Check if the email contains "@" and ".com"
        if (email.includes("@") && email.includes(".com")) {
            let params = {
                name: name,
                email: email,
                message: message
            };

            const serviceID = "service_jc8x1si";
            const tempateID = "template_vq9drmp";

            emailjs.send(serviceID, tempateID, params)
                .then(function(response) {
                    console.log("Success!", response.status, response.text);

                    // Show the success message
                    popupTitle.textContent = "Success!";
                    popupMessage.textContent = "Message sent successfully!";

                    // Clear the input fields
                    document.getElementById('name').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('message').value = "";
                })
                .catch(function(error) {
                    console.log("Failed...", error);

                    // Show the error message
                    popupTitle.textContent = "Error!";
                    popupMessage.textContent = "There was an error sending your message. Please try again later!";
                });
        } else {
            // Show the error message
            popupTitle.textContent = "Invalid Entry!";
            popupMessage.textContent = "Invalid email address. Please check email address and try again!";
        }
    } else {
        // Show the error message
        popupTitle.textContent = "Error!";
        popupMessage.innerHTML = "Name and email fields are empty. <br /> Please provide your name and email address and try again!";
    }


    popupContainer.style.display = "flex";

    // Close the popup when "Okay" button is clicked
    popupOkayButton.addEventListener("click", function() {
        popupContainer.style.display = "none";
    });
}

// Footer Newsletter 
function sendMailNewsletter() {
    let email2 = document.getElementById("email2").value;

    // Display popup
    let popupContainer = document.querySelector(".popup-container1");
    let popupTitle = document.querySelector(".popup-title1");
    let popupMessage = document.querySelector(".popup-message1");
    let popupOkayButton = document.querySelector(".popup-okay-button1");

    if (email2.trim() !== "") {
        // Check if the email contains "@" and ".com"
        if (email2.includes("@") && email2.includes(".com")) {
            let params = {
                email2: email2,
            };

            const serviceID = "service_6vcv0nk";
            const tempateID = "template_f0nxql5";

            emailjs.send(serviceID, tempateID, params)
                .then(function(response) {
                    console.log("Success!", response.status, response.text);

                    // Show the success message
                    popupTitle.textContent = "Success!";
                    popupMessage.textContent = "Message sent successfully!";

                    // Clear the input fields
                    document.getElementById('email2').value = "";

                })
                .catch(function(error) {
                    console.log("Failed...", error);

                    // Show the error message
                    popupTitle.textContent = "Error!";
                    popupMessage.textContent = "There was an error sending your message. Please try again later!";
                });
        } else {
            // Show the error message
            popupTitle.textContent = "Invalid Entry!";
            popupMessage.textContent = "Invalid email address. Please check email address and try again!";
        }
    } else {
        // Show the error message
        popupTitle.textContent = "Error!";
        popupMessage.innerHTML = "Name and email fields are empty. <br /> Please provide your name and email address and try again!";
    }


    popupContainer.style.display = "flex";

    // Close the popup when "Okay" button is clicked
    popupOkayButton.addEventListener("click", function() {
        popupContainer.style.display = "none";
    });
}

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
