// RESPONSIVE NAV BAR ------------------ STARTS HERE

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

// RESPONSIVE NAV BAR ------------------ ENDS HERE

// CAROUSEL INFINITE COLIBRIES   -----   STARTS HERE

// PONERLE LET A TODAS ESTAS VARIABLES Y HACER UNA FUNCIÓN PARA CADA BOTÓN QUE
// PRIMERO REEMPLACE UN DIV COMPLETO POR EL OTRO Y DSP VUELVA A LLAMAR A TODOS LOS ELEMENTOS
// QUE SEAN NECESARIOS

let firstClone;
let lastClone;

function declareAll() {
  const slideContainer = document.querySelector(".container");
  const slide = document.querySelector(".slides");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const interval = 3000;

  let slides = document.querySelectorAll(".slide");
  let index = 1;
  let slideId;

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

  nextBtn.addEventListener("click", moveToNextSlide);
  prevBtn.addEventListener("click", moveToPreviousSlide);

  const resizeSlides = () => {
    slideWidth = slides[index].clientWidth;
  };

  window.addEventListener("resize", resizeSlides);

  startSlide();
}

declareAll();

// CAROUSEL INFINITE COLIBRIES   -----   ENDS HERE

// SWITCH COLIBRIES / PLANTAS  -----   STARTS HERE

const btnColibries = document.querySelector(".btn-colibries");
const btnPlantas = document.querySelector(".btn-plantas");

const displayContainer = document.querySelector(".display-container");

const colibries = document.querySelector(".colibries");
const plantas = document.querySelector(".plantas");

btnColibries.addEventListener("click", function () {
  if (colibries.classList.contains("active")) {
    return;
  } else if (plantas.classList.contains("active")) {
    plantas.classList.remove("active");
    colibries.classList.add("active");
    displayContainer.style.backgroundColor = "rgb(207,161,216, .6)";
    plantas.replaceWith(colibries);
    firstClone.remove();
    lastClone.remove();
    declareAll();
  }
});

btnPlantas.addEventListener("click", function () {
  if (plantas.classList.contains("active")) {
    return;
  } else if (colibries.classList.contains("active")) {
    colibries.classList.remove("active");
    plantas.classList.add("active");
    displayContainer.style.backgroundColor = "rgb(171, 195, 125, .6)";
    colibries.replaceWith(plantas);
    firstClone.remove();
    lastClone.remove();
    declareAll();
  }
});

// SWITCH COLIBRIES / PLANTAS  -----   ENDS HERE
