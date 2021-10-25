let numbers = document.querySelectorAll(".numbers");
let operations = document.querySelectorAll(".operations");
let screen = document.querySelector(".screen");
let equal = document.querySelector(".show-result");
let del = document.querySelector(".del");
let reset = document.querySelector(".reset");
let body = document.querySelector("body");
let resultDisplayed = false;

//click on each number
numbers.forEach((number) =>
	number.addEventListener("click", (e) => {
		let currentString = screen.innerHTML;
		let lastChar = currentString[currentString.length - 1];

		if (screen.innerText == "0" || screen.querySelector("span")) {
			screen.innerText = "";
		}

		if (resultDisplayed === false) {
			screen.innerHTML += e.target.innerHTML;
		} else if (
			(resultDisplayed === true && lastChar === "+") ||
			lastChar === "-" ||
			lastChar === "×" ||
			lastChar === "/"
		) {
			resultDisplayed = false;
			screen.innerHTML += e.target.innerHTML;
		} else {
			resultDisplayed = false;
			screen.innerHTML = "";
			screen.innerHTML += e.target.innerHTML;
		}
	})
);

//click on *, /, +, -
operations.forEach((operation) =>
	operation.addEventListener("click", (e) => {
		let currentString = screen.innerHTML;
		let lastChar = currentString[currentString.length - 1];

		if (
			lastChar === "+" ||
			lastChar === "-" ||
			lastChar === "×" ||
			lastChar === "/"
		) {
			let newString =
				currentString.substring(0, currentString.length - 1) +
				e.target.innerHTML;
			screen.innerHTML = newString;
		} else {
			screen.innerHTML += e.target.innerHTML;
		}
	})
);

//click on =
equal.addEventListener("click", () => {
	let inputString = screen.innerHTML;
	let numbers = inputString.split(/\+|\-|\×|\//g);
	let operators = inputString.replace(/[0-9]|\./g, "").split("");

	let divide = operators.indexOf("/");
	while (divide != -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
		operators.splice(divide, 1);
		divide = operators.indexOf("/");
	}

	let multiply = operators.indexOf("×");
	while (multiply != -1) {
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
		operators.splice(multiply, 1);
		multiply = operators.indexOf("×");
	}

	let subtract = operators.indexOf("-");
	while (subtract != -1) {
		numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
		operators.splice(subtract, 1);
		subtract = operators.indexOf("-");
	}

	let add = operators.indexOf("+");
	while (add != -1) {
		numbers.splice(
			add,
			2,
			parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
		);
		operators.splice(add, 1);
		add = operators.indexOf("+");
	}

	screen.innerHTML = numbers[0];

	resultDisplayed = true;
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
