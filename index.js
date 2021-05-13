const navBar = document.querySelector('.navbar');
const navImageLight = document.querySelector('.image_light');
const navImageDarkt = document.querySelector('.image_dark');
const navMenuLight = document.querySelectorAll('.menu_light');
const navMenuDark = document.querySelector('.menu_dark');
const navigation = document.querySelector('.navigation');

const mainText = document.querySelector('.presentation__text');
const circle = document.querySelector('.presentation_circle');
const videoBlock = document.querySelector('.presentation__image_block');
const presentation = document.querySelector('.section__presentation');
const buffer = document.querySelector('.buffer');

const container = document.querySelector('.container');
const sectionContentAbout = document.querySelector('.first_part');
const sectionContentImage = document.querySelector('.second_part');

const firstBlockHeight = (+presentation.clientHeight) + (+buffer.clientHeight);

window.addEventListener("scroll", function() {
    let scrollPosition = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    changeNavBar(scrollPosition);
    newBlockVisible();
    scaleCircle(scrollPosition);

});

function scaleCircle(scrollPosition) {
    if (scrollPosition > 0) {
        const scrollMove = 1 + Math.abs(scrollPosition) / 100;

        circle.style.cssText = `
            transition: all 2s ease 0s;
            transform: scale3d(${scrollMove}, ${scrollMove}, 1);
            `;

        const scrollBigMove = 2 + Math.abs(scrollPosition) / 100;
        videoBlock.style.cssText = `
            transition: all 2s ease 0s;
            transform: scale3d(${scrollBigMove}, ${scrollBigMove}, 1);
            `;

        mainText.classList.add('move_up');


    }
    if (scrollPosition === 0) {
        circle.style.cssText = 'transform: scale3d(1, 1, 1);';
        videoBlock.style.cssText = 'transform: scale3d(1, 1, 1);';
    }
    if (scrollPosition === firstBlockHeight) {
        circle.style.cssText = 'transform: scale3d(1, 1, 1);';
        videoBlock.style.cssText = 'transform: scale3d(1, 1, 1);';
    }

    if (scrollPosition < 35) {
        presentation.style.opacity = 1;
        mainText.classList.remove('move_up');
    }
}

function changeNavBar(scrollPosition) {
    if (scrollPosition >= (firstBlockHeight / 2)) {
        navBar.classList.add('dark')
        navImageLight.classList.add('hidden');
        navImageDarkt.classList.remove('hidden');
        navMenuLight.forEach((item) => item.classList.add('hidden'));
        navMenuDark.classList.remove('hidden');
        navigation.classList.remove('hidden');
    }
    if (scrollPosition < (firstBlockHeight / 2)) {
        navBar.classList.remove('dark');
        navImageLight.classList.remove('hidden');
        navImageDarkt.classList.add('hidden');
        navMenuLight.forEach((item) => item.classList.remove('hidden'));
        navMenuDark.classList.add('hidden');
        navigation.classList.add('hidden');
    }
}

function newBlockVisible() {
    let blockVisibleProcent = 0;
    const top = container.getBoundingClientRect().top;
    const height = container.offsetHeight;
    const mBottom = document.documentElement.clientHeight;

    if ((top) <= 0 && (top + height >= 0 && top + height <= mBottom)) {
        const d = height - Math.abs(top);
        blockVisibleProcent = d * 100 / height;
    }

    if ((top) >= 0 && (top < mBottom && top + height >= mBottom)) {
        const d = mBottom - top;
        blockVisibleProcent = d * 100 / height;
    }
    if (blockVisibleProcent >= 15) {
        sectionContentAbout.classList.add('visible');
        setTimeout(() => {
            sectionContentImage.classList.add('visible');
        }, 1500);

    }
}