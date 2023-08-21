import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
const tl = gsap.timeline();
import  menu  from './components/menu.js';
import { initializeToggleButtons } from './components/btn.js';

gsap.registerPlugin(ScrollTrigger);

const topText = document.querySelector(".header__text");
const topHero = document.querySelector(".header__hero");
const telIcon = document.querySelector(".header__tel__icon");
const loaderBg = ".loader-bg";
// const target = document.querySelector("#button");
// console.log(target);

const closeLoadingScreen = (loaderBg) => {
  tl.to(loaderBg, {
    opacity: 0,
    direction: 1.1,
  });
};

// ロード完了したら
window.onload = () => {
  setTimeout(() => {
    closeLoadingScreen(loaderBg);
    tl.fromTo(topHero, {transformOrigin: "center", height: "0%", duration: 0.5, ease: "elastic.out(1, 0.7)" ,opacity: 0}, { opacity:1, height: "100%", duration: 1});

    tl.from(topText, { opacity: 0, rotation: 360, duration: 1 });

telIcon.addEventListener("mouseenter", () => {
  gsap.to(telIcon, {
    duration: 0.3,
    y: -5, // 少し上に移動
    rotation: 10, // 左に傾く
    ease: "power1.out",
    onComplete: () => {
      // 右に傾くアニメーション
      gsap.to(telIcon, {
        duration: 0.3,
        x: 3, // 右に傾く
        rotation: -5, // 右に傾く
        ease: "power1.out",
        onComplete: () => {
          // 左に戻るアニメーション
          gsap.to(telIcon, {
            duration: 0.3,
            rotation: -5, // 右に傾く
            x: 0, // 元の位置に戻す
            rotation: 0, // 元の角度に戻す
            ease: "power1.out",
          });
        },
      });
    },
  });
});

telIcon.addEventListener("mouseleave", () => {
  gsap.to(telIcon, {
    duration: 0.3,
    y: 0, // 元の位置に戻す
    rotation: 0, // 元の角度に戻す
    x: 0, // 元の位置に戻す
    ease: "power1.in",
  });
});


setTextAnim()

  }, 2500);
};

menu.init();

function addFloatingAnimation(target) {
  gsap.from(target, {
    y: -50,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: target,
      start: "top 60%",
      toggleActions: "play none none reverse", // アニメーションの制御
    },
  });
}

const targets = document.querySelectorAll("[data-scroll]");
console.log(targets);
targets.forEach(target => {
  addFloatingAnimation(target);
});



//お知らせのボタン制御//
initializeToggleButtons();


function setTextAnim(){
  let setAnim = ($item)=>{
    let rnd = 'rnd' + Math.round(Math.random()*1000);
    let target = `.${rnd} .letter`;
    $item.classList.add(rnd);
    $item.innerHTML = $item.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    setTimeout(()=>{
      gsap.set(target,{
        y: 50, //表示状態の指定
        opacity:0,
      });
      ScrollTrigger.create({
        trigger: target,
        start: 'top 90%', // スクロールトリガーの開始位置
        onEnter() {
          gsap.to(target, {
            duration: 0.3,
            y: 0,
            opacity: 1,
            ease: 'back',
            stagger: {
              each: 0.05,
              from: 'start',
            },
          });
        },
        onLeaveBack() {
          gsap.to(target, {
            duration: 0.3,
            y: 50, // 初期状態に戻す
            opacity: 0,
            ease: 'back',
            stagger: {
              each: 0.05,
              from: 'end', // 逆向きにアニメーションするために 'end' を指定
            },
          });
        },
      });
      
    }, 10);
  };
  let $items = document.querySelectorAll('[data-anime="framein"]');
  console.log($items);
  $items.forEach((item)=>{
    setAnim(item);
  });
}




