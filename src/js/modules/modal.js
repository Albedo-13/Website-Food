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