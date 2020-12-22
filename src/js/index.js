//====  animation on scroll ===

const animItemsPseudo = document.querySelectorAll('.moveUpStart, .headline_img, .animNumbers, .moveRight, .moveLeft');
const imgUp = document.querySelector('.headline_img');
const headerMenu = document.querySelector('.header_menu');
const animItemsArray = [...animItemsPseudo];
console.log(animItemsPseudo);

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
const burgerBtnMobile = mobileNav.querySelector('.mobileNav_btn');
const burgerBtnHeader = document.querySelector('.burger-btn');
const mobileNavList = mobileNav.querySelector('.mobileNav_list');


burgerBtnHeader.addEventListener('click', showMenu);
mobileNav.addEventListener('click', closeMenu);

function showMenu() {
    mobileNav.classList.add('mobileNav_btn-active');
    mobileNav.classList.add('mobileNav_btn-activeRot');
    mobileNav.classList.remove('hideElem');
    topSection.classList.add('hideElem');
    mobileNavList.classList.add('active');
}

function closeMenu(event) {

    if (event.target == burgerBtnMobile || event.target.classList.contains('mobile-link')) {
        mobileNav.classList.remove('mobileNav_btn-active');
        mobileNav.classList.remove('mobileNav_btn-activeRot');
        mobileNav.classList.add('hideElem');
        topSection.classList.remove('hideElem');
        mobileNavList.classList.remove('active');
    } else {
        return false;
    }
}


//  ==== for algorithm part animation numbers ====

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

const form = document.querySelector('.form'),
    inputName = form.querySelector('#name'),
    inputEmail = form.querySelector('#email'),
    inputMessage = form.querySelector('#message'),
    submitBtn = form.querySelector('.submitBtn'),
    inputsArr = form.querySelectorAll('input, textarea'),
    formPopUp = document.querySelector('.form-popUp'),
    alertText = formPopUp.querySelector('.alertText');


submitBtn.addEventListener('click', submitHandler);
formPopUp.onclick = () => {
    formPopUp.classList.add('hideElem');
    form.classList.remove('blur');
};

function submitHandler(e) {
    e.preventDefault();
    let postString = '';

    const reg = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;
    const isValid = inputEmail.value.match(reg) ? true : false;
    const isEmpty = [...inputsArr].every(item => item.value);

    if (!isEmpty) {
        showPopUp('Please, fill in all the neccessary fields!*');
    } else if (!isValid) {
        showPopUp('Please, enter correct email!*');
    } else {
        postString += `name=${inputName.value}&email=${inputEmail.value}&message=${inputMessage.value}`;

        fetch('url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: postString,
            }).then(resp => resp.text())
            .then(data => {
                showPopUp('Success! Please check your email!');
                console.log('data: ', data);
            })
            .catch(err => {
                showPopUp('Sorry! Something was going wrong(( Please try again.');
                console.log('error: ', err);

            });
        [...inputsArr].forEach(item => item.value = '');
    }

}

function showPopUp(text) {
    formPopUp.classList.remove('hideElem');
    alertText.textContent = text;
    form.classList.add('blur');
}