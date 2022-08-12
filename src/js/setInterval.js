const btn = document.querySelector(".btn");
    
function myAnimation() {
    const elem = document.querySelector(".box");
    let pos = 1;
    let id = setInterval(frameUp, 10);
    function frameUp() {
        if (pos == 300) {
            clearInterval(id);
            id = setInterval(frameDown, 10);
        } else {
            ++pos;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }

    function frameDown() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            --pos;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

btn.addEventListener('click', myAnimation);