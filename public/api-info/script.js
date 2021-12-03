const copybuttons = document.querySelectorAll(".copybutton");
const copybuttonsfull = document.querySelectorAll(".copybuttonfull");

copybuttons.forEach((element) =>
  element.addEventListener("click", function (e) {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.dataset.link);
  })
);

copybuttonsfull.forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    navigator.clipboard.writeText(
      window.location.origin + e.target.dataset.link
    );
  });
});
