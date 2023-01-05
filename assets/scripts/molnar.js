export function molnar(hues) {

	// Variables
	const rn = (z) => { return Math.floor(Math.random() * z); }
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const w = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
	const N = 8; // number of units on canvas is N x N
	const u = .6 * w / N; // unit size, initial
	const dx = .2 * w + .05 * u * N; // canvas border width
	const v = 10; // number of revolutions per unit
	let rg = () => { return (Math.random() - 0.5) * 6; } // growth factor

	void function main() {
		init();
		draw();

		// Setup
		function init() {
			ctx.lineWidth = .7;
			ctx.fillStyle = hues[0]; // canvas bg
			ctx.fillRect(0, 0, w, w);
			ctx.translate(dx, dx);
		}

		// Drawing Function
		function draw() {
			for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
				ctx.save();
				ctx.translate(i * u, j * u);
				let z = 0.95 * u; // radius for unit
				ctx.strokeStyle = hues[rn(4)+1];
				for (let k = 0; k < v; k++) {
					ctx.beginPath();
					ctx.moveTo(i - z / 2 + rg(), j - z / 2 + rg());
					ctx.lineTo(i + z / 2 + rg(), j - z / 2 + rg());
					ctx.lineTo(i + z / 2 + rg(), j + z / 2 + rg());
					ctx.lineTo(i - z / 2 + rg(), j + z / 2 + rg());
					ctx.closePath();
					ctx.stroke();
					z -= Math.random() * 10; // reduces radius
				}
				ctx.restore();
			}
		}
	}();
}