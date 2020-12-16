//====  animation on scroll ===

const animItemsPseudo = document.querySelectorAll('.moveUpStart, .headline_img, .animNumbers, .moveRight, .moveLeft');
const imgUp = document.querySelector('.headline_img');
const headerMenu = document.querySelector('.header_menu');
const animItemsArray = [...animItemsPseudo];

animItemsArray.unshift(imgUp);
animItemsArray.unshift(headerMenu);

if (animItemsArray.length > 0) {
    document.addEventListener('scroll', animOnScroll);
}

function animOnScroll() {

    for (let i = 0; i < animItemsArray.length; i++) {
        const animItem = animItemsArray[i];

        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = getCords(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        // add class
        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {

            if (animItem.classList.contains('animNumbers') && !animItem.classList.contains('active')) {
                getIncreaseNum(0, animItem);
            }
            animItem.classList.add('active');

        } else {
            if (!animItem.classList.contains('animNumbers'))
                animItem.classList.remove('active');
        }
    }
}
animOnScroll();

function getCords(el) {
    const cords = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
        top: cords.top + scrollTop,
        left: cords.left + scrollLeft
    };
}

// ==== burger =====

const topSection = document.querySelector('.topSection');
const mobileNav = document.querySelector('.mobileNav');
const burgerBtnMobile = document.querySelector('.mobileNav_btn');
const burgerBtnHeader = document.querySelector('.burger-btn');
const mobileNavList = document.querySelector('.mobileNav_list');


burgerBtnHeader.addEventListener('click', showMenu);
burgerBtnMobile.addEventListener('click', morphingBtn);

function showMenu() {
    mobileNav.classList.add('mobileNav_btn-active');
    mobileNav.classList.add('mobileNav_btn-activeRot');
    mobileNav.classList.remove('hideElem');
    topSection.classList.add('hideElem');
    mobileNavList.classList.add('active');
}

function morphingBtn() {
    mobileNav.classList.remove('mobileNav_btn-active');
    mobileNav.classList.remove('mobileNav_btn-activeRot');
    mobileNav.classList.add('hideElem');
    topSection.classList.remove('hideElem');
    mobileNavList.classList.remove('active');
}


//  ==== SLICK SETTINGS====

// $(document).ready(function () {

//     $('.slider').slick({
//         arrows: false,
//         dots: true,
//         slidesToShow: 3,
//         slideToScroll: 1,
//         infinite: true,
//         initialSlide: 2,
//         variableWidth: true,
//         centerMode: true,
//     });
// });

function getIncreaseNum(startNum, elem) {
    let num = startNum;
    let endNum = elem.textContent;
    let timerId = setInterval(() => {
        elem.innerText = ++num;
        if (num == endNum) {
            setTimeout(() => {
                clearInterval(timerId);
            }, 0);
        }
    }, 100);
}

// === input validation ====

const inputName = document.getElementsByName('userName'),
    inputEmail = document.getElementsByName('userEmail'),
    inputMessage = document.getElementsByName('userMessage'),
    submitBtn = document.querySelector('.submitBtn'),
    inputsArr = document.querySelectorAll('input, textarea');
// form = document.querySelector('.form');
// console.log(inputsArr);


submitBtn.addEventListener('click', submitHandler);

function submitHandler(e) {

    const isEmpty = ![...inputsArr].every(item => item.value);
    console.log(isEmpty);
    // if(isEmpty) 
    fetch('url', {
        method: 'POST',
    }).then(res)
    
}


// submitHandler()