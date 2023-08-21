import gsap from "gsap";

const menu = {
  init
}

let isOpen = false, clickTl = null;
const $ = {};

function init() {
  $.menuButton = document.querySelector('.btn-menu');
  $.container = document.querySelector('#global-container');
  $.menuBars = document.querySelectorAll('.btn-menu__bar');
  $.menuWraps = document.querySelectorAll('.btn-menu__wrap');

  clickTl = _createClickTL();
  _bindEvents();
}



  function _bindEvents() {
    $.menuButton.addEventListener("mouseenter", () => _enter());
    $.menuButton.addEventListener("click", () => toggle());
  }

  function _enter() {
    const tl = gsap.timeline({
      defaults: {
          stagger: 0.1,
          duration: 0.3
      }
  });
  tl.set($.menuBars, {
    transformOrigin: "right"
  }).to($.menuBars, {
    scaleX:0
  }).set($.menuBars, {
    transformOrigin: 'left'
  }).to($.menuBars, {
      scaleX: 1
  })
  }

  function _createClickTL() {
    const tl = gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.3
        }
    });

    tl.to($.menuWraps[0], {
        y: 0,
        rotateZ: 225,
    }, "toggle").to($.menuWraps[1], {
        x: "-1em",
        opacity: 0
    }, "toggle").to($.menuWraps[2], {
        y: 0,
        rotateZ: -45,
    });

    return tl;
}

  function toggle() {
    $.container.classList.toggle("menu-open");

    if(isOpen) {
      setTimeout(() => {
          clickTl.reverse();
      }, 1000);
  } else {
      clickTl.play();
  }
  isOpen = !isOpen;
  }

  export default menu;
