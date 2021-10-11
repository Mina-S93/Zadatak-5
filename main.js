let numbers = document.querySelectorAll(".numbers");
let operations = document.querySelectorAll(".operations");
let screen = document.querySelector(".screen");
let equal = document.querySelector(".show-result");
let del = document.querySelector(".del");
let reset = document.querySelector(".reset");
let body = document.querySelector("body");

//click on each number
numbers.forEach((number) =>
	number.addEventListener("click", () => {
		if (screen.innerText == "0" || screen.querySelector("span")) {
			screen.innerText = "";
		}
		screen.innerText += number.value;
	})
);

//click on *, /, +, -
operations.forEach((operation) =>
	operation.addEventListener("click", () => {
		screen.innerText += operation.value;
	})
);

//click on =
equal.addEventListener("click", () => {
	let screenValue = screen.innerText.replaceAll(",", ".");
	let result = String(eval(screenValue)).replace(".", ",");
	return (screen.innerHTML = `<span>${result}</span>`);
});

//click on delete
del.addEventListener("click", () => {
	let screenValue = screen.innerText;
	let sub = screenValue.substring(0, screenValue.length - 1);
	if (sub.length > 0) {
		screen.innerText = sub;
	} else {
		screen.innerText = "0";
	}
});

//click on reset
reset.addEventListener("click", () => {
	screen.innerText = "0";
});

let theme = document.querySelectorAll(".theme");
let themeChanger = document.querySelector(".theme-changer");
let themes = [...theme];
let theme1 = document.querySelector("#theme1");
let theme2 = document.querySelector("#theme2");
let theme3 = document.querySelector("#theme3");

//changing themes
themeChanger.addEventListener("click", () => {
	themes[0].classList.add("none");
	let currentTheme = themes.shift();
	themes.push(currentTheme);
	themes[0].classList.remove("none");

	if (!theme1.classList.contains("none")) {
		body.classList.replace("neon", "dark");
	} else if (!theme2.classList.contains("none")) {
		body.classList.replace("dark", "light");
	} else if (!theme3.classList.contains("none")) {
		body.classList.replace("light", "neon");
	}
});

//prefers-color-scheme
const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

if (!userPrefersDark) {
	body.classList.replace("dark", "light");
	let lightTheme = [...theme];
	let firstTheme = lightTheme.shift();
	firstTheme.classList.add("none");
	lightTheme.push(firstTheme);
	themeChanger.addEventListener("click", () => {
		lightTheme[0].classList.add("none");
		let currentTheme = lightTheme.shift();
		lightTheme.push(currentTheme);
		lightTheme[0].classList.remove("none");

		if (!theme1.classList.contains("none")) {
			body.classList.replace("neon", "dark");
		} else if (!theme2.classList.contains("none")) {
			body.classList.replace("dark", "light");
		} else if (!theme3.classList.contains("none")) {
			body.classList.replace("light", "neon");
		}
	});
	theme2.classList.remove("none");
	theme1.classList.add("none");
}
