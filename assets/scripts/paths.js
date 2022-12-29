export function paths(hues) {

	// Variables
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const w = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
	const N = 9; // number of units on canvas is N x N
	const u = .55 * w / N; // unit size
	const g = .1 * u; // creates a gap between units (e.g. g = .1 makes a .1*u gap, as the translate is 1.1*u)
	const dx = .2 * w - g; // canvas border width
	const rn = (z) => { return Math.floor(Math.random() * z) };
	const num = rn(10000);
	const nodes = [
		[0, 0], [u / 3, 0], [2 * u / 3, 0], [u, 0],
		[0, u / 3], [u / 3, u / 3], [2 * u / 3, u / 3], [u, u / 3],
		[0, 2 * u / 3], [u / 3, 2 * u / 3], [2 * u / 3, 2 * u / 3], [u, 2 * u / 3],
		[0, u], [u / 3, u], [2 * u / 3, u], [u, u]
	]; // each unit is has 4x4 nodes (i.e. 3x3 cells per unit)

	void function main() {
		init();
		draw();
	}();

	// Setup
	function init() {
		ctx.lineWidth = 2;
		ctx.lineCap = ctx.lineJoin = "round";
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, w); // fill canvas bg
		let fs = innerHeight > innerWidth && innerWidth < 450 ? 4 : 8;
		ctx.font = `italic 400 ${fs}px 'Times New Roman'`;
		ctx.fillStyle = "#000000bb";
		ctx.fillText(`Paths № ${num} ${new Date().toDateString()}`, 5, w - 7);
		ctx.translate(dx, dx); // move ctx to start drawing inside planned border
	}

	// Draw: Makes an N x N grid; each cell has 16 nodes; a line is drawn through each, closed, then the ctx is translated to next cell
	function draw() {
		for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
			nodes.sort((a, b) => .5 - Math.random()); // shuffle nodes
			hues.sort((a, b) => .5 - Math.random()); // shuffle palette
			ctx.save();
			ctx.translate(i * (u + g), j * (u + g));
			ctx.fillStyle = hues[0];
			ctx.strokeStyle = hues[1];
			ctx.fillRect(-g / 2, -g / 2, u + g, u + g);
			ctx.beginPath();
			ctx.moveTo(nodes[0][0], nodes[0][1]);
			for (let k = 1; k < 16; k++) ctx.lineTo(nodes[k][0], nodes[k][1]);
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}
	}
}