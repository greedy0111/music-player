const frame = document.querySelector('section');
const lists = frame.querySelectorAll("article"); 
const deg = 45; //각각의 article 요소가 회전할 각도
const len = lists.length - 1; //순번이 0부터 시작하므로 전체 개수에서 1을 뺌
const audio = frame.querySelectorAll('audio');

let i = 0;

const prev = document.querySelector('.btnPrev');
const next = document.querySelector('.btnNext');

for (let el of lists) {
    let pic = el.querySelector(".pic");
    el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
    pic.style.backgroundImage = `url(../img/member${i + 1}.jpg)`;
    i++;

    let play = el.querySelector(".play");
    let pause = el.querySelector(".pause");
    let load = el.querySelector(".load");

    play.addEventListener('click', e => {
        let isActive = e.currentTarget.closest('article').classList.contains('on');
        if (isActive) {
            e.currentTarget.closest('article').querySelector('.pic').classList.add('on');
            e.currentTarget.closest('article').querySelector('audio').play();
        }
    });

    pause.addEventListener('click', e => {
        let isActive = e.currentTarget.closest('article').classList.contains('on');
        if (isActive) {
            e.currentTarget.closest('article').querySelector('.pic').classList.remove('on');
            e.currentTarget.closest('article').querySelector('audio').pause();
        }
    })
    load.addEventListener('click', e => {
        let isActive = e.currentTarget.closest('article').classList.contains('on');
        if (isActive) {
            e.currentTarget.closest('article').querySelector('.pic').classList.add('on');
            e.currentTarget.closest('article').querySelector('audio').load();
            e.currentTarget.closest('article').querySelector('audio').play();
        }
    })
}

let num = 0; // 좌우 버튼을 클릭할 때마다 frame 요소를 회원하기 위한 카운트 값
let active = 0;

prev.addEventListener('click', () => {
    initMusic()
    num++;
    frame.style.transform = `rotate(${deg * num}deg)`;

    // 현재 패널의 순번이 0이면 다시 마지막 패널의 순번으로 변경하고 
    // 그렇지 않으면 현재 패널 순번에서 1씩 감소시켜서 activation 함수 호출
    (active == 0) ? active = len : active--;
    activation(active, lists);
})

next.addEventListener('click', () => {
    initMusic()
    num--;
    frame.style.transform = `rotate(${deg * num}deg)`;

     // 현재 패널의 순번이 마지막 순번이면 다시 처음 패널의 순번으로 변경하고 
    // 그렇지 않으면 현재 패널 순번에서 1씩 증가시켜서 activation 함수 호출
    (active == len ) ? active = 0 : active++;
    activation(active, lists);
})


function activation(index, lists) {
    // for문을 돌면서 모든 list의 'on' class 제거
    for (let el of lists) {
        el.classList.remove('on'); 
    }
    lists[index].classList.add('on');
};

// 음악 초기화 
function initMusic() {
    for (let el of audio) {
        el.pause();
        el.load();
        el.parentElement.previousElementSibling.classList.remove('on');
    }
}