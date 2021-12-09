const LoginButton = document.querySelector(".loginButton");
const userInput = document.querySelector(".userInput");
const passInput = document.querySelector(".passInput");
const messagebox = document.querySelector(".messagebox");

const disapearBox = function () {
  messagebox.style.display = "none";
};

LoginButton.addEventListener("click", async (i) => {
  try {
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: userInput.value,
        password: passInput.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "succes") {
      localStorage.setItem("authtoken", data.token);
      window.location.href = "/";
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

const passwordEye = document.querySelector(".eyeIcon");
passwordEye.addEventListener("click", () => {
  if (passInput.type === "password") passInput.type = "text";
  else passInput.type = "password";
});

// const getAvatar = function () {
// 	passwordEye.src = `https://avatars.dicebear.com/api/bottts/${userInput.value}.svg`;
// };

(function () {
  if (localStorage.getItem("authtoken")) {
    window.location.href = "/";
  }
})();
