const LoginButton = document.querySelector(".loginButton");
const SignupButton = document.querySelector(".SignupButton");
const userInput = document.querySelector(".userInput");
const passInput = document.querySelector(".passInput");

LoginButton.addEventListener("click", (i) => {
  console.log(userInput.value);
});

const passwordEye = document.querySelector(".eyeIcon");
passwordEye.addEventListener("click", () => {
  if (passInput.type === "password") passInput.type = "text";
  else passInput.type = "password";
});

// const getAvatar = function () {
// 	passwordEye.src = `https://avatars.dicebear.com/api/bottts/${userInput.value}.svg`;
// };
