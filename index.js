// RESPONSIVE NAV BAR ------------------ STARTS HERE

const navMobile = document.querySelector(".nav-mobile");
const icon = document.querySelector(".icon");

function menuToggle() {
  if (navMobile.classList.contains("visible")) {
    navMobile.classList.remove("visible");
    icon.style.color = "white";
    icon.style.border = "1px solid white";
  } else {
    navMobile.classList.add("visible");
    icon.style.color = "rgb(171,195,125)";
    icon.style.border = "1px solid rgb(171,195,125)";
  }
}

let navMain = document.querySelector("nav");

document.addEventListener("scroll", (event) => {
  let scrollPosition = window.scrollY;
  if (scrollPosition === 0) {
    navMain.style.backgroundColor = "rgba(36, 89, 122, 0.93)";
    navMobile.style.backgroundColor = "rgba(36, 89, 122, 0.93)";
  } else if (scrollPosition !== 0) {
    navMain.style.backgroundColor = "rgba(36, 89, 122)";
    navMobile.style.backgroundColor = "rgba(36, 89, 122)";
  }
});

// RESPONSIVE NAV BAR ------------------ ENDS HERE

// HERO SLIDER ---------------------------- STARTS HERE

const slideContainer = document.querySelector(".container-hero");
const slide = document.querySelector(".slides-hero");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 5000;

let slides = document.querySelectorAll(".slide-hero");
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

let slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
  slideWidth = slides[index].clientWidth;
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll(".slide-hero");

slide.addEventListener("transitionend", () => {
  slideWidth = slides[index].clientWidth;
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = "none";
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = "2s";
};

const moveToPreviousSlide = () => {
  slides = getSlides();
  if (index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = "2s";
};

nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);

startSlide();

function resizeSlides() {
  slideWidth = slides[index].clientWidth;
}

window.addEventListener("resize", resizeSlides);

// HERO SLIDER ---------------------------- ENDS HERE

// PROYECTOS SLIDER ---------------------------- STARTS HERE

carouselCardContainer = document.querySelector(".carousel-card-container");

slide.addEventListener("mouseenter", (e) => {
  slide.style.animationPlayState = "paused";
});

slide.addEventListener("mouseleave", (e) => {
  slide.style.animationPlayState = "running";
});

carouselCardContainer.addEventListener("touchmove", (e) => {
  carouselCardContainer.style.animation = "none";
  carouselCardContainer.style.webkitAnimation = "none";
});
