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