// const passwordEye = document.querySelector(".eyeIcon");
// passwordEye.addEventListener("click", () => {
//   if (passInput.type === "password") passInput.type = "text";
//   else passInput.type = "password";
// });

const passInput1 = document.querySelector(".passInput1");
const passInput2 = document.querySelector(".passInput2");
const loginButton = document.querySelector(".loginButton");
const messagebox = document.querySelector(".messagebox");

const disapearBox = function () {
  messagebox.style.display = "none";
};

const toLogin = function (params) {
  window.location.href = "/login";
};

loginButton.addEventListener("click", async (e) => {
  try {
    const res = await fetch(`/api/resetpassword${window.location.search}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        password: passInput1.value,
        passwordConfirm: passInput2.value,
      }),
    });
    const data = await res.json();
    if (data.status === "ok") {
      messagebox.style.display = "block";
      messagebox.style.backgroundColor = "#2ecc71";
      messagebox.style.color = "#000000";
      messagebox.innerHTML = "Password succesfully resetted!";
      setTimeout(disapearBox, 5000);
      setTimeout(toLogin, 5000);
    } else {
      messagebox.style.display = "block";
      messagebox.style.backgroundColor = "#e74c3c";
      messagebox.style.color = "#ffffff";
      messagebox.innerHTML = data.error;
      setTimeout(disapearBox, 5000);
    }
  } catch (err) {
    messagebox.style.display = "block";
    messagebox.style.backgroundColor = "#e74c3c";
    messagebox.style.color = "#ffffff";
    messagebox.innerHTML = err;
    setTimeout(disapearBox, 5000);
  }
});

const eyeIcon1 = document.querySelector(".eyeIcon1");
const eyeIcon2 = document.querySelector(".eyeIcon2");

eyeIcon1.addEventListener("click", () => {
  if (passInput1.type === "password") {
    passInput1.type = "text";
  } else {
    passInput1.type = "password";
  }
});

eyeIcon2.addEventListener("click", () => {
  if (passInput2.type === "password") {
    passInput2.type = "text";
  } else {
    passInput2.type = "password";
  }
});
