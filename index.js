const navMobile = document.querySelector(".nav-mobile");

function menuToggle() {
  if (navMobile.style.display === "none") {
    navMobile.style.display = "flex";
  } else if (navMobile.style.display === "flex") {
    navMobile.style.display = "none";
  } else {
    navMobile.style.display = "none";
  }
}

let navMain = document.querySelector("nav");

document.addEventListener("scroll", (event) => {
  let scrollPosition = window.scrollY;
  console.log(scrollPosition);
  if (scrollPosition === 0) {
    navMain.style.backgroundColor = "rgba(36, 89, 122, 0.93)";
    navMobile.style.backgroundColor = "rgba(36, 89, 122, 0.93)";
  } else if (scrollPosition !== 0) {
    navMain.style.backgroundColor = "rgba(36, 89, 122)";
    navMobile.style.backgroundColor = "rgba(36, 89, 122)";
  }
});

// CAROUSEL (starts here)--------------------------

let slides = document.querySelector(".slides");

let controlNext = document.querySelector(".next-slide");
let controlPrev = document.querySelector(".prev-slide");
let current = document.querySelector(".slides.style.left");

const imgAmount = slides.childElementCount;
const imgWidth = 700;

document.querySelector(".next-slide").addEventListener("click", function () {
  nextSlide();
});
document.querySelector(".prev-slide").addEventListener("click", function () {
  prevSlide();
});

function nextSlide() {
  if (current <= (imgAmount - 1) * -imgWidth) {
    current = 0;
    slides.style.left = current + "px";
  } else {
    current -= imgWidth;
    slides.style.left = current + "px";
  }
}
function prevSlide() {
  if (current >= 0) {
    current += (imgAmount - 1) * -imgWidth;
    slides.style.left = current + "px";
  } else {
    current += imgWidth;
    slides.style.left = current + "px";
  }
}

setInterval(nextSlide, 6000);

// CAROUSEL (ENDS HERE)--------------------------
