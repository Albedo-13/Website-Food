/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  updateCalcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(elem => {
      elem.addEventListener('click', e => {
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

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class MenuCard {
    constructor(image, alter, title, descr, price, cardParent) {
      this.image = image;
      this.alter = alter;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.exchange = 27;
      this.convertFromUSDToUAH();
      this.cardParent = document.querySelector(cardParent);

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

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

  Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "icons/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так..."
  };
  forms.forEach(form => {
    bindPostData(form);
  });

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; // form.append(statusMessage);

      form.insertAdjacentElement('afterend', statusMessage); // для работы с форм датой
      // request.setRequestHeader('Content-type', 'multipart/form-data');
      // для работы с json
      // request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.style.display = 'none';
    Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);
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
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
    }, 4000);
  }

  fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
        modalOpenBtns = document.querySelectorAll(triggerSelector),
        modalCloseBtns = document.querySelectorAll("[data-close]");
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => closeModal(modalSelector));
  });
  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(modalSelector, modalTimerId);
      clearInterval(modalTimerId);
    });
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
      clearInterval(modalTimerId);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.style.display === "block") {
      closeModal(modalSelector);
      clearInterval(modalTimerId);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      clearInterval(modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    wrapper,
    totalCounter,
    currentCounter,
    field
  } = _ref;
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
  slidesWrapper.style.overflow = 'hidden'; // Гарантия одинаковых размеров слайдов

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

  function showSlideNumber() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (offerSlideItems.length < 10) {
      offerCurrent.textContent = `0${i}`;
    } else {
      offerCurrent.textContent = i;
    }
  }

  function switchActiveDot() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[i - 1].style.opacity = 1;
  }

  function deleteNotDigits(string) {
    return +string.replace(/\D/g, '');
  }

  offerSlideNext.addEventListener('click', () => {
    // Если уперлись в последний слайд, листая вперед
    if (offset == deleteNotDigits(width) * (offerSlideItems.length - 1)) {
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
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesTrack.style.transform = `translateX(-${offset}px)`;
      showSlideNumber(slideIndex);
      switchActiveDot(slideIndex);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    if (event.target && event.target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (event.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(_ref) {
  let {
    parentSelector,
    endDate,
    daySelector,
    hourSelector,
    minuteSelector,
    secondSelector
  } = _ref;

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

  function setClock(selector, endDate) {
    const timer = document.querySelector(selector),
          days = timer.querySelector(daySelector),
          hours = timer.querySelector(hourSelector),
          minutes = timer.querySelector(minuteSelector),
          seconds = timer.querySelector(secondSelector),
          timeInterval = setInterval(updateClock, 1000);

    if (!timer || !days || !hours || !minutes || !seconds) {
      timer.innerHTML = `error adding timer:<br/>null reference selector(s)<br/>check http://example.com`;
      timer.classList.add("error");
      return;
    }

    updateClock();

    function updateClock() {
      const t = getTimeDifference(endDate);
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
      }

      return num;
    }
  }

  setClock(parentSelector, endDate);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModal"])('.modal', modalTimerId), 60000);
  Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimerId);
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])({
    parentSelector: ".timer",
    endDate: new Date(2023, 5, 26),
    daySelector: "#days",
    hourSelector: "#hours",
    minuteSelector: "#minutes",
    secondSelector: "#seconds"
  });
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
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

const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map