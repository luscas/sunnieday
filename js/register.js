console.log("[REGISTER] Welcome to register");

const Register = {
  data: {
    email: "",
    username: "",
    birthday: "",
    gender: "",
    password: "",
    password_confirmation: "",
  },
};

function getElementIndex(node) {
  let index = 0;
  while ((node = node.previousElementSibling)) index++;
  return index;
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-mask]").forEach((el) => {
    IMask(el, {
      mask: el.getAttribute("data-mask"),
    });
  });

  document
    .querySelector(".register input[name=username]")
    .addEventListener("keyup", (e) => {
      let username = e.target.value;

      if (username.trim().length > 0)
        document.querySelector(".avatar__name").textContent = e.target.value;
      else document.querySelector(".avatar__name").textContent = "Username";
    });

  const registerTabActive = parseInt(
    document.querySelector("body").getAttribute("data-step")
  );

  document
    .querySelector(`.register__tab:nth-child(${registerTabActive})`)
    .classList.add("register__tab--active");

  document.querySelectorAll("input[name=gender]").forEach((el) =>
    el.addEventListener("change", (_) => {
      document
        .querySelectorAll("input[name=gender]")
        .forEach((el) => el.removeAttribute("aria-invalid"));
    })
  );

  document
    .querySelector('.register__tab[data-tabindex="1"] input[name=email]')
    .addEventListener("keyup", (e) => {
      validateEmail();
    });

  document
    .querySelectorAll(
      '.register__tab[data-tabindex="2"] input, .register__tab[data-tabindex="2"] select'
    )
    .forEach((el) => {
      el.addEventListener("keyup", (e) => {
        validateUserInfo(el.getAttribute("data-field"));
      });

      el.addEventListener("change", (e) => {
        validateUserInfo(el.getAttribute("data-field"));
      });
    });

  document
    .querySelectorAll('.register__tab[data-tabindex="3"] input')
    .forEach((el) => {
      el.addEventListener("keyup", (e) => {
        validatePasswords(el.getAttribute("data-field"));
      });
    });

  document.querySelectorAll(".avatars .avatar").forEach((el) => {
    el.addEventListener("click", (e) => {
      document
        .querySelectorAll(".avatars .avatar")
        .forEach((x) => x.classList.remove("selected"));
      el.classList.add("selected");
    });
  });

  document
    .getElementById("register__form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      Register.data.avatar = document
        .querySelector(".avatar.selected img")
        .getAttribute("src");

      const hcaptchaVal = document.querySelector(
        "[name=h-captcha-response]"
      ).value;

      if (hcaptchaVal === "") {
        document.querySelector(".h-captcha").classList.add("animate__tada");
      }

      console.log(hcaptchaVal);

      console.log(Register.data);
    });
});

// STEP 1
function validateEmail() {
  const emailEl = document.querySelector("input[name=email]");
  let email = emailEl.value;

  if (
    !email.trim().length ||
    new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    ).test(email) === false
  ) {
    emailEl.setAttribute("aria-invalid", "true");
    emailEl.focus();

    document
      .querySelector('.register__tab[data-tabindex="1"] button.btn.btn-lg')
      .setAttribute("disabled", true);
  } else {
    Register.data.email = email;
    emailEl.removeAttribute("aria-invalid");

    document
      .querySelector('.register__tab[data-tabindex="1"] button.btn.btn-lg')
      .removeAttribute("disabled");
  }
}

// STEP 2
function validateUserInfo(field) {
  let errors = {
    username: null,
    birthday: null,
    gender: null,
  };

  let username = document.querySelector("input[name=username]").value;
  let day = document.querySelector("input[name=day]").value;
  let month = document.querySelector("select[name=month]").value;
  let year = document.querySelector("select[name=year]").value;
  let gender = document.querySelector("input:checked[name=gender]")?.value;
  let birthday = [year, month, day].join("/");

  if (
    username.trim().length == 0 ||
    /([a-zA-Z0-9_\-=?!@:.,]+)$/g.test(username.trim()) === false
  ) {
    // a-z 0-9+ and _-=?!@:.,

    if (field == "username") {
      document
        .querySelector("input[name=username]")
        .setAttribute("aria-invalid", true);
    }

    errors["username"] = "Username invalid";
  } else {
    document
      .querySelector("input[name=username]")
      .removeAttribute("aria-invalid");

    errors["username"] = "valid";
  }

  if (!/\d{4}\/\d{2}\/\d{2}/g.test(birthday)) {
    // Birthday is valid? xxxx/xx/xx

    if (field == "birthday") {
      document
        .querySelectorAll(".birthday")
        .forEach((el) =>
          el.querySelector("input, select").setAttribute("aria-invalid", true)
        );
    }

    errors["birthday"] = "Birthday invalid";
  } else {
    document
      .querySelectorAll(".birthday")
      .forEach((el) =>
        el.querySelector("input, select").removeAttribute("aria-invalid")
      );

    errors["birthday"] = "valid";
  }

  if (gender !== "male" && gender !== "female") {
    if (field == "gender") {
      document
        .querySelectorAll("input[name=gender]")
        .forEach((el) => el.setAttribute("aria-invalid", true));
    }

    errors["gender"] = "Gender is required";
  } else {
    document
      .querySelectorAll("input[name=gender]")
      .forEach((el) => el.removeAttribute("aria-invalid"));

    errors["gender"] = "valid";
  }

  if (
    errors.username === "valid" &&
    errors.birthday === "valid" &&
    errors.gender === "valid"
  ) {
    document
      .querySelector('.register__tab[data-tabindex="2"] button.btn.btn-lg')
      .removeAttribute("disabled");

    Register.data.username = username;
    Register.data.birthday = birthday;
    Register.data.gender = gender;

    console.log(birthday);
  } else {
    document
      .querySelector('.register__tab[data-tabindex="2"] button.btn.btn-lg')
      .setAttribute("disabled", true);
  }
}

// STEP 3
function validatePasswords(field) {
  const password = document.querySelector(
    '.register__tab[data-tabindex="3"] input[name=password]'
  ).value;
  const password_confirmation = document.querySelector(
    '.register__tab[data-tabindex="3"] input[name=password_confirmation]'
  ).value;

  let errors = {
    password: null,
    password_confirmation: null,
  };

  if (!password.length || password.length < 6) {
    document
      .querySelector("input[name=password]")
      .setAttribute("aria-invalid", true);

    errors["password"] = "Password is empty";
  } else {
    document
      .querySelector("input[name=password]")
      .removeAttribute("aria-invalid");

    errors["password"] = "valid";
  }

  if (!password_confirmation.length) {
    if (field == "password_confirmation") {
      document
        .querySelector("input[name=password_confirmation]")
        .setAttribute("aria-invalid", true);
    }

    errors["password_confirmation"] = "Password Confirmation is empty";
  } else if (password !== password_confirmation) {
    if (field == "password_confirmation") {
      document
        .querySelector("input[name=password_confirmation]")
        .setAttribute("aria-invalid", true);
    }

    errors["password_confirmation"] = "Password doesn't match";
  } else {
    document
      .querySelector("input[name=password_confirmation]")
      .removeAttribute("aria-invalid");

    errors["password_confirmation"] = "valid";
  }

  if (errors.password === "valid" && errors.password_confirmation === "valid") {
    document
      .querySelector('.register__tab[data-tabindex="3"] button.btn.btn-lg')
      .removeAttribute("disabled");

    Register.data.password = password;
    Register.data.password_confirmation = password_confirmation;
  } else {
    document
      .querySelector('.register__tab[data-tabindex="3"] button.btn.btn-lg')
      .setAttribute("disabled", true);
  }
}

function changeStep(currentStep) {
  document.querySelector("body").setAttribute("data-step", currentStep);

  document
    .querySelectorAll(".register__tab")
    .forEach((x) => x.classList.remove("register__tab--active"));

  document
    .querySelector(`.register__tab:nth-child(${currentStep})`)
    .classList.add("register__tab--active");
}

function nextStep() {
  let currentStep =
    parseInt(document.querySelector("body").getAttribute("data-step")) + 1;

  changeStep(currentStep);
}

function prevStep() {
  let currentStep =
    parseInt(document.querySelector("body").getAttribute("data-step")) - 1;

  changeStep(currentStep);
}
