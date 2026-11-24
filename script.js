// Hero typewriter effect
const phrases = ["stories move", "brands stand out", "moments matter", "every frame speaks"];
const typedText = document.querySelector("#typed-text");
let phraseIndex = 0, charIndex = phrases[0].length, removing = true;

function runTypewriter() {
  const phrase = phrases[phraseIndex];
  if (removing) {
    charIndex--;
    typedText.textContent = phrase.slice(0, charIndex);
  } else {
    charIndex++;
    typedText.textContent = phrase.slice(0, charIndex);
  }

  let delay = removing ? 42 : 72;
  if (!removing && charIndex === phrase.length) {
    removing = true;
    delay = 1450;
  } else if (removing && charIndex === 0) {
    removing = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 260;
  }
  window.setTimeout(runTypewriter, delay);
}
window.setTimeout(runTypewriter, 1500);

// Reveal content as each section enters the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeNavigation);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) closeNavigation();
});
