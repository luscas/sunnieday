console.log(`[${new Date().toDateString()}] Welcome to Sunnieday!`);

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
  });
});

document.querySelectorAll("[data-title]").forEach((el) => {
  tippy(el, {
    content: el.getAttribute("data-title"),
  });
});

document.querySelector(".navbar__menu").addEventListener("click", (e) => {
  document.querySelector(".navbar").classList.toggle("navbar__sub--active");
});

document
  .querySelector(".cookie .btn-accept, .cookie .btn-reject")
  .addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".cookie").classList.add("hide");
    localStorage.setItem("cookie", "ok");
  });

if (localStorage.getItem("cookie") == "ok") {
  document.querySelector(".cookie").style.display = "none";
}
