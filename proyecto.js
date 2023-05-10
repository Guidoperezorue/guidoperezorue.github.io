// RESPONSIVE NAV BAR ------------------ STARTS HERE

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

// RESPONSIVE NAV BAR ------------------ ENDS HERE

let firstClone;
let lastClone;

const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 4000;

let slides = document.querySelectorAll(".slide");
let index = 1;
let slideId;
let isPaused = false;

firstClone = slides[0].cloneNode(true);
lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

let slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll(".slide");

slide.addEventListener("transitionend", () => {
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
  slide.style.transition = ".7s";
};

const moveToPreviousSlide = () => {
  slides = getSlides();
  if (index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = ".7s";
};

slideContainer.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});

slideContainer.addEventListener("mouseleave", startSlide);

nextBtn.addEventListener("click", () => {
  if (!isPaused) {
    clearInterval(slideId);
  }
  moveToNextSlide();
  startSlide();
});

prevBtn.addEventListener("click", () => {
  if (!isPaused) {
    clearInterval(slideId);
  }
  moveToPreviousSlide();
  startSlide();
});

const resizeSlides = () => {
  slideWidth = slides[index].clientWidth;
};

window.addEventListener("resize", resizeSlides);

startSlide();

// MOBILE TOUCH

let touchStartX = 0;
let touchEndX = 0;
let touchDeltaX = 0;
let touchAnimationFrame = null;

slideContainer.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  cancelAnimationFrame(touchAnimationFrame);
});

slideContainer.addEventListener("touchmove", (event) => {
  touchDeltaX = event.touches[0].clientX - touchStartX;
  slide.style.transform = `translateX(${-slideWidth * index + touchDeltaX}px)`;
});

slideContainer.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});

const handleSwipe = () => {
  const swipeDistance = touchEndX - touchStartX;
  const swipeThreshold = slideContainer.clientWidth * 0.1; // adjust threshold as needed

  if (swipeDistance > swipeThreshold) {
    // Swiped left-to-right, move to previous slide
    if (!isPaused) {
      clearInterval(slideId);
    }
    moveToPreviousSlide();
  } else if (swipeDistance < -swipeThreshold) {
    // Swiped right-to-left, move to next slide
    if (!isPaused) {
      clearInterval(slideId);
    }
    moveToNextSlide();
  } else {
    // Swipe distance is not enough, snap back to current slide
    slide.style.transition = ".3s";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  touchDeltaX = 0;
  touchAnimationFrame = requestAnimationFrame(() => {
    slide.style.transition = ".5s";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  });
};
