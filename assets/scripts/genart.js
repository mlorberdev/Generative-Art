import { palettes } from "./palettes.js";
import { disko } from "./disko.js";
import { nooks } from "./nooks.js";
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

	const writeHues = () => { for (let i = 0; i < 5; i++) document.getElementById(`hue${i}`).style.backgroundColor = hues[i]; };
	let lock = document.getElementById("lock");
	let hues;

	function newHues() {
		if (lock.checked) return;
		hues = palettes[Math.floor(Math.random() * palettes.length)];
		writeHues();
	} newHues();

	function newBgHue() {
		let bg = this.style.backgroundColor;
		hues = [bg];
		let swatches = document.querySelectorAll(".hue");
		for (let i = 0; i < 4; i++) if (swatches[i].style.backgroundColor !== bg) hues.push(swatches[i].style.backgroundColor);
		writeHues();
	}

	document.querySelectorAll(".hue").forEach(hue => hue.addEventListener("click", newBgHue));

	document.getElementById("chooseArt").querySelectorAll(":scope > button").forEach(e => e.addEventListener("click", function () {

		if (lock.checked === false) newHues();

		switch (this.innerText.toLowerCase()) {
			case ("disko"): disko(); break;
			case ("nooks"): nooks(); break;
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