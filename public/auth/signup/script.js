const LoginButton = document.querySelector(".loginButton");
const userInput = document.querySelector(".userInput");

const passInput1 = document.querySelector(".passInput1");
const passInput2 = document.querySelector(".passInput2");

// const getAvatar = function () {
// 	passwordEye.src = `https://avatars.dicebear.com/api/bottts/${userInput.value}.svg`;
// };

const messagebox = document.querySelector(".messagebox");

const disapearBox = function () {
  messagebox.style.display = "none";
};

LoginButton.addEventListener("click", async () => {
  try {
    const res = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: userInput.value,
        password: passInput1.value,
        passwordConfirm: passInput2.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "succes") {
      localStorage.setItem("authtoken", data.token);
      window.location.href = "/dashboard";
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

const passwordEye1 = document.querySelector(".eyeIcon1");
passwordEye1.addEventListener("click", () => {
  if (passInput1.type === "password") passInput1.type = "text";
  else passInput1.type = "password";
});

const passwordEye2 = document.querySelector(".eyeIcon2");
passwordEye2.addEventListener("click", () => {
  if (passInput2.type === "password") passInput2.type = "text";
  else passInput2.type = "password";
});
