const loginButton = document.querySelector(".loginButton");
const emailInput = document.querySelector(".userInput");
const messagebox = document.querySelector(".messagebox");

const disapearBox = function () {
  messagebox.style.display = "none";
};

// const toLogin = () => {
//   window.location.href = "/login";
// };

loginButton.addEventListener("click", async (e) => {
  try {
    const email = emailInput.value;
    console.log(email);
    const res = await fetch("/api/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await res.json();
    if (data.status === "ok") {
      messagebox.style.display = "block";
      messagebox.style.backgroundColor = "#2ecc71";
      messagebox.style.color = "#000000";
      messagebox.innerHTML = "Email send succesfully!";
      setTimeout(disapearBox, 5000);
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
