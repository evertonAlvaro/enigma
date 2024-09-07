const award = window.document.getElementById("award")
award.addEventListener("mouseenter", move)
award.addEventListener("click", move)
let posBtn = -1

function move() {
    posBtn++
    if (posBtn == 0) {
        award.style.transform = "translate(200px, -150px)"
    }
    if (posBtn == 1) {
        award.style.transform = "translate(200px, +100px)"
    }
    if (posBtn == 2) {
        award.style.transform = "translate(-200px, +100px)"
    }
    if (posBtn == 3) {
        award.style.transform = "translate(-200px, -150px)"
    }
    if (posBtn == 4) {
        award.style.transform = "translate(+200px, +100px)"
    }
    if (posBtn == 5) {
        award.style.transform = "translate(+200px, -150px)"
    }
    if (posBtn == 6) {
        award.style.transform = "translate(-200px, +100px)"
    }
    if (posBtn == 7) {
        award.style.transform = "translate(-200px, -150px)"
        posBtn = -1
    }
}