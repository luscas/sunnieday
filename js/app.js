console.log(`[${new Date().toDateString()}] Welcome to Sunnieday!`);

const form = document.querySelector(".auth form");

form.addEventListener("submit", (e) => {
  console.log(e);
});

document.querySelectorAll(".eye").forEach((el) => {
  el.addEventListener("click", (e) => {
    const input = el.parentElement.querySelector("input");

    if (el.classList.contains("eye-off")) {
      el.classList.remove("eye-off");
      el.classList.add("eye-on");
      input.setAttribute("type", "password");
    } else {
      el.classList.remove("eye-on");
      el.classList.add("eye-off");
      input.setAttribute("type", "text");
    }

    console.log(input.value);
  });
});

document.querySelectorAll("[data-title]").forEach((el) => {
  tippy(el, {
    content: el.getAttribute("data-title"),
  });
});

// comment out theses lines if you didn't want the rotation animation on sunlight header
let initialAngle = 0;
setInterval(function () {
  initialAngle += 0.15;

  document
    .querySelector(":root")
    .style.setProperty("--rotate-sunlight", `${initialAngle}deg`);
});
