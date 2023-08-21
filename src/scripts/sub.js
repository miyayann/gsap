import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import  menu  from './components/menu.js';

gsap.registerPlugin(ScrollTrigger);
const telIcon = document.querySelector(".header__tel__icon");

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

menu.init();
setTextAnim()


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
        start: 'top 80%', // スクロールトリガーの開始位置
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

setTextAnim()

