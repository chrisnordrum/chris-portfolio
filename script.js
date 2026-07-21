const timelines = document.querySelectorAll(".timeline");

function updateTimeline() {
    const windowHeight = window.innerHeight;

    timelines.forEach(timeline => {
        if (timeline.offsetParent === null) return; // skip the hidden panel

        const timelineRect = timeline.getBoundingClientRect();
        const visible = windowHeight - timelineRect.top;
        const progress = Math.max(0, Math.min(visible / timelineRect.height, 1));
        timeline.style.setProperty("--scroll-progress", progress);

        const linePosition = progress * timelineRect.height;

        timeline.querySelectorAll("section").forEach(section => {
            const tags = section.querySelector(".tags");
            if (!tags) return;

            const tagsRect = tags.getBoundingClientRect();
            const dotPosition =
                (tagsRect.top - timelineRect.top) +
                (tags.offsetHeight / 2);

            section.classList.toggle("in-view", linePosition >= dotPosition + 40);
        });
    });
}

const tabButtons = document.querySelectorAll(".tabs button");
const workTimeline = document.querySelector(".timeline-work");
const questsTimeline = document.querySelector(".timeline-quests");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const showWork = button.dataset.timeline === "work";
        workTimeline.hidden = !showWork;
        questsTimeline.hidden = showWork;

        updateTimeline();
    })
});

window.addEventListener("scroll", updateTimeline);
window.addEventListener("resize", updateTimeline);

updateTimeline();

const divisor = document.querySelector(".comparison-before");
const slider = document.querySelector("#slider");

function moveDivisor() {
    divisor.style.width = `${slider.value}%`;
}

if (slider) slider.addEventListener("input", moveDivisor);