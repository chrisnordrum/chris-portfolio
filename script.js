const divisor = document.querySelector(".comparison-before");
const slider = document.querySelector("#slider");

function moveDivisor() {
    divisor.style.width = slider.value + "%";
}

if (slider) slider.addEventListener("input", moveDivisor);