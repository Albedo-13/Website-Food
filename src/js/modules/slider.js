function slider({ container, slide, nextArrow, prevArrow, wrapper, totalCounter, currentCounter, field }) {
    let offset = 0;
    let slideIndex = 1;

    const offerSlider = document.querySelector(container),
        offerSlideItems = document.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesTrack = document.querySelector(field),
        offerSlideNext = document.querySelector(nextArrow),
        offerSlidePrev = document.querySelector(prevArrow),
        offerCurrent = document.querySelector(currentCounter),
        offerTotal = document.querySelector(totalCounter),
        width = window.getComputedStyle(slidesWrapper).width;

    if (offerSlideItems.length < 10) {
        offerTotal.textContent = `0${offerSlideItems.length}`;
        offerCurrent.textContent = `0${slideIndex}`;
    } else {
        offerTotal.textContent = offerSlideItems.length;
        offerCurrent.textContent = slideIndex;
    }

    slidesTrack.style.width = 100 * offerSlideItems.length + '%';
    slidesTrack.style.display = 'flex';
    slidesTrack.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    // Гарантия одинаковых размеров слайдов
    offerSlideItems.forEach(slide => {
        slide.style.width = width;
    });

    offerSlider.style.position = "relative";
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    offerSlider.append(indicators);

    for (let i = 0; i < offerSlideItems.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        dots.push(dot);
    }

    switchActiveDot();

    function showSlideNumber(i = 0) {
        if (offerSlideItems.length < 10) {
            offerCurrent.textContent = `0${i}`;
        } else {
            offerCurrent.textContent = i;
        }
    }

    function switchActiveDot(i = 1) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[i - 1].style.opacity = 1;
    }

    function deleteNotDigits(string) {
        return +string.replace(/\D/g, '');
    }

    offerSlideNext.addEventListener('click', () => {
        // Если уперлись в последний слайд, листая вперед
        if (offset == (deleteNotDigits(width) * (offerSlideItems.length - 1))) {
            offset = 0;
        } else {
            // Сдвигаем offset на размер одного слайда
            offset += deleteNotDigits(width);
        }

        slidesTrack.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == offerSlideItems.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showSlideNumber(slideIndex);
        switchActiveDot(slideIndex);
    });

    offerSlidePrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (offerSlideItems.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesTrack.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = offerSlideItems.length;
        } else {
            slideIndex--;
        }

        showSlideNumber(slideIndex);
        switchActiveDot(slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesTrack.style.transform = `translateX(-${offset}px)`;

            showSlideNumber(slideIndex);
            switchActiveDot(slideIndex);
        });
    });
}

export default slider;