const learnMorePijltje = document.querySelector(".learnMorePijltje");
const whyPmu = document.querySelector(".whyPmu");

learnMorePijltje.addEventListener("click", function (e) {
  whyPmu.scrollIntoView({ behavior: "smooth" });
});
