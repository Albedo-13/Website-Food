'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Slider
    const offerSlideItems = document.querySelectorAll(".offer__slide"),
        offerSlideNext = document.querySelector(".offer__slider-next"),
        offerSlidePrev = document.querySelector(".offer__slider-prev");

    function hideSlides(slideItems) {
        slideItems.forEach(item => {
            item.style.display = "none";
        });
    }

    function showSlide(slideItems, i = 0) {
        slideItems[i].style.display = "block";
    }

    function showSlideNumber(i = "Err") {
        document.querySelector("#total").innerHTML = customizeSlideNumber(offerSlideItems.length);
        document.querySelector("#current").innerHTML = customizeSlideNumber(i);

        function customizeSlideNumber(value) {
            return value < 10 ? `0${value}` : value;
        }
    }

    function updateSlider(i) {
        hideSlides(offerSlideItems);
        showSlide(offerSlideItems, i);
        showSlideNumber(i + 1);
    }

    updateSlider(0);

    function getActiveSlideIndex() {
        let i;
        for (const item of offerSlideItems) {
            if (item.style.display === "block") {
                i = Array.from(offerSlideItems).indexOf(item);
                break;
            }
        }
        return i;
    }

    function nextSlide() {
        let i = getActiveSlideIndex();
        if (i >= offerSlideItems.length - 1) {
            i = -1;
        }

        updateSlider(++i);
    }

    function prevSlide() {
        let i = getActiveSlideIndex();
        if (i <= 0) {
            i = offerSlideItems.length;
        }

        updateSlider(--i);
    }

    offerSlideNext.addEventListener('click', nextSlide);
    offerSlidePrev.addEventListener('click', prevSlide);
});