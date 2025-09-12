let inp = document.querySelector("textarea");
let span = document.querySelector("span");
let space = document.querySelector(".space");
let number = document.querySelector(".number");
let word = document.querySelector(".word-counter");

inp.addEventListener("input", () => {
    span.textContent = inp.value.length;
    space.textContent = (inp.value.match(/\s/g) || []).length;
    number.textContent = (inp.value.match(/[0-9]/g) || []).length;
    word.textContent = (inp.value.match(/\b\w+\b/g) || []).length;
});
