let track = document.querySelector('.carousel-track');
const originSlides = track.length;
const slideBtns = document.querySelector('.carousel_btn-block');

// additinal items to track
const items = track.children;
const itemsLength = items.length;

for (let i = 0; i < itemsLength * 2; i++) {
    track.appendChild(items[i++].cloneNode(true));
    track.prepend(items[(items.length - 1) - i].cloneNode(true));
}

// set track width 
let leng = items.length * (items[0].offsetWidth + 100);
track.style.width = `${leng}px`;

let trackTrans = 0;
let posStart;
let posMove;
let posEnd;
const slideMin = -2;
let slideCurrent = 0;
const slideMax = 2;
const itemWidth = track.children[0].offsetWidth;
const step = (track.offsetWidth) / track.children.length;
let thresholdMove = itemWidth * 0.3;

// btn actions
const makeActiveBtn = () => slideBtns.children[slideCurrent + slideMax].classList.toggle('active');

[...slideBtns.children].forEach((item, index) => item.dataset.id = (slideMin + index));
slideBtns.addEventListener('click', btnSwitch);

function btnSwitch(e) {
    if(!e.target.classList.contains('carousel-btn')) return false;
    makeActiveBtn();
    let id = e.target.dataset.id;
    slideCurrent = +id;
    console.log(slideCurrent);
    changeSlide();
    makeActiveBtn();
}

makeActiveBtn();
track.addEventListener('mousedown', mouseStart);
track.addEventListener('touchstart', mouseStart);

function getEventType(e) {
    return e.type.includes('touch') ? e.changedTouches[0] : e;
}

function mouseStart(e) {
    const ev = getEventType(e);
    posStart = ev.clientX;
    track.addEventListener('touchmove', mouseAction);
    track.addEventListener('touchend', mouseEnd);
    track.addEventListener('mousemove', mouseAction);
    track.addEventListener('mouseup', mouseEnd);
}

function mouseAction(e) {
    track.style.transition = '';
    let currentPos = trackTrans;
    let ev = getEventType(e);
    posMove = ev.clientX - posStart;
    track.style.transform = `translate3d(${currentPos += posMove}px, 0px, 0px)`;
}

function changeSlide() {
    track.style.transition = `.5s ease-out`;
    trackTrans = step * -slideCurrent;
    track.style.transform = `translate3d(${trackTrans}px, 0px, 0px)`;
    track.style.width = `${leng}px`;
}

function mouseEnd(e) {
    let ev = getEventType(e);
    posEnd = ev.clientX;
    track.removeEventListener('mousemove', mouseAction);
    track.removeEventListener('mouseup', mouseEnd);
    track.removeEventListener('touchmove', mouseAction);
    track.removeEventListener('touchend', mouseEnd);
    track.style = `transition: .5s ease-out`;

    makeActiveBtn();

    if (Math.abs(posMove) > thresholdMove) {
        if (posEnd < posStart && slideCurrent < slideMax) {
            slideCurrent++;
            changeSlide();

        } else if (posEnd > posStart && slideCurrent > slideMin) {
            slideCurrent--;
            changeSlide();

        } else {
            changeSlide();

        }
    } else {
        changeSlide();

    }

    makeActiveBtn();
}