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
	document.getElementById("chooseArt").querySelectorAll(":scope > button").forEach(e => e.addEventListener("click", function () {

		switch (this.innerText) {
			case ("disko"): disko(); break;
			case ("nooks"): nooks(); break;
			case ("entropy"): entropy(); break;
			case ("lines"): lines(); break;
			case ("pack"): pack(); break;
			case ("neighbors"): neighbors(); break;
			case ("paths"): paths(); break;
			case ("molnar"): molnar(); break;
			case ("bebebe"): bebebe(); break;
			case ("boxy"): boxy(); break;
			case ("grid"): grid(); break;
		}
	}));
})();