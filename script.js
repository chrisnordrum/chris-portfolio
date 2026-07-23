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
            const title = section.querySelector("h3");
            if (!title) return;

            const titleRect = title.getBoundingClientRect();
            const dotPosition =
                (titleRect.top - timelineRect.top) +
                (title.offsetHeight / 2);

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

const quip = document.querySelector(".quip");
const quips = [
    "This one took a side quest and never came back.",
    "You took a wrong turn. Even my turbo Miata couldn't find this page.",
    "This route was never committed to main.",
    "The page you wanted is off getting detailed. Try again later.",
    "404: my bad, not yours. Probably.",
    "Dead link. The rest of the site works, I promise."
];

if (quip) quip.textContent = quips[Math.floor(Math.random() * quips.length)];