import { palettes } from "./palettes.js";
// import { disko } from "./disko.js";
// import { nooks } from "./nooks.js";
import { entropy } from "./entropy.js";
import { lines } from "./lines.js";
import { pack } from "./pack.js";
import { neighbors } from "./neighbors.js";
import { paths } from "./paths.js";
import { molnar } from "./molnar.js";
import { bebebe } from "./bebebe.js";
import { boxy } from "./boxy.js";
import { grid } from "./grid.js";

!(function () {

	let lock = document.getElementById("lock");
	let hues;

	void function init() {
		hues = ["rgb(35,57,68)", "rgb(244,242,191)", "rgb(143,137,125)", "rgb(182,170,146)", "rgb(208,196,172)"];
		writeHues();
	}();

	document.getElementById("info_wrap").addEventListener("click", function () {
		let viz = document.getElementById("toast");
		viz.style.display === "none" ? viz.style.display = "block" : viz.style.display = "none";
	});

	async function writeHues() { for (let i = 0; i < 5; i++) document.getElementById(`hue${i}`).style.backgroundColor = hues[i]; };

	function newHues() {
		if (lock.checked) return;
		hues = palettes[Math.floor(Math.random() * palettes.length)];
		writeHues();
	}

	function newBgHue() {
		if (document.getElementById("own_hues").classList.contains("spin")) return;
		let bg = this.style.backgroundColor;
		hues = [bg];
		let swatches = document.querySelectorAll(".hue");
		for (let i = 0; i < 5; i++) if (swatches[i].style.backgroundColor !== bg) hues.push(swatches[i].style.backgroundColor);
		writeHues();
	}

	document.querySelectorAll(".hue").forEach(hue => hue.addEventListener("click", newBgHue));
	document.getElementById("own_hues").addEventListener("click", newOwnHues);

	function newOwnHues() {
		this.classList.toggle("spin");
		let ownHues = document.querySelectorAll(".own_hue");
		if (this.classList.contains("spin")) {
			ownHues.forEach(hue => {
				let x = toHex(hue.parentElement.closest("div").style.backgroundColor);
				hue.value = x;
				hue.classList.toggle("hidden");
			});
			function toHex(rgb, hex = "#") {
				rgb.split("(")[1].split(")")[0].split(", ").forEach(c => hex += parseInt(c).toString(16));
				return hex;
			}
		} else {
			let hue = document.querySelectorAll(".hue");
			for (let i = 0; i < 5; i++) { hues[i] = ownHues[i].value; hue[i].style.backgroundColor = hues[i]; ownHues[i].classList.toggle("hidden"); }
		}
	}

	document.getElementById("chooseArt").querySelectorAll(":scope > button").forEach(e => e.addEventListener("click", function () {

		let c = document.getElementById("c");
		if (c.style.display === "none") c.style.display = "block";

		if (lock.checked === false) newHues();

		switch (this.innerText.toLowerCase()) {
			// case ("disko"): disko(); break;
			// case ("nooks"): nooks(); break;
			case ("entropy"): entropy(hues); break;
			case ("lines"): lines(hues); break;
			case ("pack"): pack(hues); break;
			case ("neighbors"): neighbors(hues); break;
			case ("paths"): paths(hues); break;
			case ("molnar"): molnar(hues); break;
			case ("bebebe"): bebebe(hues); break;
			case ("boxy"): boxy(hues); break;
			case ("grid"): grid(hues); break;
		}

	}));
})();