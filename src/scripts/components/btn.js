import { gsap } from "gsap";

export function initializeToggleButtons() {
  const contentButton = document.getElementById('contentButton');
  const notificationButton = document.getElementById('notificationButton');
  const content = document.getElementById('content');
  const notification = document.getElementById('notification');

  function activateContentButton() {
    contentButton.classList.add('active');
    notificationButton.classList.remove('active');
    content.classList.remove('hidden');
    notification.classList.add('hidden');
  }

  function activateNotificationButton() {
    contentButton.classList.remove('active');
    notificationButton.classList.add('active');
    content.classList.add('hidden');
    notification.classList.remove('hidden');
  }

  activateContentButton();

 // スマートフォン画面の表示件数
const mobileVisibleItemCount = 3; // 例: スマートフォン画面では2件を表示

function adjustDisplayForMobile() {
  const content = document.getElementById('content'); // 表示対象の要素
  const items = content.querySelectorAll('dl'); // 表示対象のアイテム（dl要素）
  console.log(items);

  // すべてのアイテムとそれに続くhrを非表示にする
  items.forEach((item, index) => {
    item.style.display = 'none';
    const hr = item.nextElementSibling; // 同じ階層の次の要素を取得（hr要素）
    if (hr) {
      hr.style.display = 'none';
    }
  });

  // 先頭から指定の件数だけ表示する
  for (let i = 0; i < mobileVisibleItemCount; i++) {
    if (items[i]) {
      items[i].style.display = 'block';
      const hr = items[i].nextElementSibling; // 同じ階層の次の要素を取得（hr要素）
      if (hr && i < mobileVisibleItemCount - 1) {
        hr.style.display = 'block';
      }
    }
  }
}

// ウィンドウの幅に応じて表示件数を調整
function adjustDisplay() {
  if (window.innerWidth <= 960) {
    // スマートフォン画面の場合
    adjustDisplayForMobile();
  } else {
    // 通常の画面幅の場合
    // 通常の表示件数を設定
    const items = document.querySelectorAll('dl');
    items.forEach(item => {
      item.style.display = 'flex'; // 通常の画面幅の場合、すべてのアイテムを表示する
    });

    // すべてのhr要素を表示する
    const hrElements = document.querySelectorAll('hr');
    hrElements.forEach(hr => {
      hr.style.display = 'flex';
    });
  }
}

// ウィンドウのリサイズイベントに対して表示件数を調整する関数を登録
window.addEventListener('resize', adjustDisplay);

// 初回読み込み時に表示件数を調整
adjustDisplay();

  contentButton.addEventListener('click', activateContentButton);
  notificationButton.addEventListener('click', activateNotificationButton);
}


const buttons = document.querySelectorAll('.hover-button');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, { scale: 1.2, y: 2, duration: 0.5, ease: "power2.out" });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, { scale: 1, y: 0, duration: 0.5, ease: "power2.out" });
  });
});