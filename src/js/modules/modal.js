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

    modalCloseBtns.forEach((btn) => {
        btn.addEventListener('click', () => closeModal(modalSelector));
    });

    modalOpenBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);   // БУДЕТ ЛИ ВЫЗОВ?
            clearInterval(modalTimerId);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
            clearInterval(modalTimerId);
        }
    });

    document.addEventListener('keydown', (e) => {
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

export default modal;
export {closeModal};
export {openModal};