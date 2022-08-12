/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('ratio');
    } else {
        sex = document.querySelector("#female").getAttribute('id');
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = +document.querySelector("#small").getAttribute('data-ratio');
        localStorage.setItem('ratio', ratio);
    }

    function initLocalSettings(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            } 
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    
    initLocalSettings("#gender", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big", "calculating__choose-item_active");

    function updateCalcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    updateCalcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }


                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                
                updateCalcTotal();
            });
        });
    }

    getStaticInformation("#gender", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            updateCalcTotal();
        });
    }

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class MenuCard {
        constructor(image, alter, title, descr, price, cardParent, ...classes) {
            this.image = image;
            this.alter = alter;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.exchange = 27;
            this.convertFromUSDToUAH();
            this.cardParent = document.querySelector(cardParent);
            this.classes = classes;
        }

        convertFromUSDToUAH() {
            this.price *= this.exchange;
        }

        render() {
            const card = document.createElement("div");

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                card.classList.add(this.classes);
            } else {
                this.classes.forEach(className => card.classList.add(className));
            }

            card.innerHTML = `
            <img src=${this.image} alt=${this.alter}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.cardParent.append(card);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll("form");
    const message = {
        loading: "icons/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // для работы с форм датой
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // для работы с json
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}!</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const modal = document.querySelector(".modal"),
        modalOpenBtns = document.querySelectorAll("[data-modal]"),
        modalCloseBtns = document.querySelectorAll("[data-close]"),
        modalTimerId = setTimeout(openModal, 300000);

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalCloseBtns.forEach((btn) => {
        btn.addEventListener('click', closeModal);
    });

    modalOpenBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal();
            clearInterval(modalTimerId);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
            clearInterval(modalTimerId);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === "block") {
            closeModal();
            clearInterval(modalTimerId);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            clearInterval(modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    let offset = 0;
    let slideIndex = 1;

    const offerSlider = document.querySelector(".offer__slider"),
        offerSlideItems = document.querySelectorAll(".offer__slide"),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesTrack = document.querySelector('.offer__slider-inner'),
        offerSlideNext = document.querySelector(".offer__slider-next"),
        offerSlidePrev = document.querySelector(".offer__slider-prev"),
        offerCurrent = document.querySelector("#current"),
        offerTotal = document.querySelector("#total"),
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

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (event.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const deadline = new Date(2023, 5, 26);

    function getTimeDifference(endDate) {
        const t = Date.parse(endDate) - Date.parse(new Date());

        if (t <= 0) {
            return {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            const t = getTimeDifference(deadline);

            days.innerHTML = addZeros(t.days);
            hours.innerHTML = addZeros(t.hours);
            minutes.innerHTML = addZeros(t.minutes);
            seconds.innerHTML = addZeros(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        function addZeros(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map