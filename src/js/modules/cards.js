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