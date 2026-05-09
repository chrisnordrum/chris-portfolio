const timeline = document.querySelector(".timeline");
const sections = document.querySelectorAll(".timeline section");

function updateTimeline() {
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const visible = windowHeight - timelineRect.top;

    const progress = Math.max(
        0,
        Math.min(visible / timelineRect.height, 1)
    );

    timeline.style.setProperty("--scroll-progress", progress);

    const linePosition = progress * timelineRect.height;

    sections.forEach((section) => {
        const tags = section.querySelector(".tags");
        const tagsRect = tags.getBoundingClientRect();

        const dotPosition =
            (tagsRect.top - timelineRect.top) +
            (tags.offsetHeight / 2);

        if (linePosition >= dotPosition + 28) {
            section.classList.add("in-view");
        } else {
            section.classList.remove("in-view");
        }
    });
}

window.addEventListener("scroll", updateTimeline);
window.addEventListener("resize", updateTimeline);

updateTimeline();

const divisor = document.querySelector(".comparison-before");
const slider = document.querySelector("#slider");

function moveDivisor() {
    divisor.style.width = slider.value + "%";
}

if (slider) slider.addEventListener("input", moveDivisor);