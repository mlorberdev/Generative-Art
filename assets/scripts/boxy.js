export function boxy(hues) {

	// Utility Functions
	const rn = (z) => { return Math.floor(Math.random() * z); }

	// Variables
	const num = rn(10000); // canvas number & save number
	const N = 9; // subdivisions of canvas (N x N grid); change to make grid more/less dense
	const canvas = document.getElementById("c");
	const ww = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
	const ctx = canvas.getContext("2d");
	const w = .7 * ww; // gives the canvas a border on the bottom & right
	const dx = .15 * ww; // gives the canvas a border on the top & left
	const u = w / N; // subunits (main canvas NxN) dimension

	// Setup Canvas
	hues = hues.sort((a, b) => .5 - Math.random()); // shuffle hues
	ctx.fillStyle = "#fff"; // color canvas bg
	ctx.fillRect(0, 0, ww, ww);
	let fs = innerHeight > innerWidth && innerWidth < 450 ? 4 : 8;
	ctx.font = `italic 400 ${fs}px 'Times New Roman'`;
	ctx.fillStyle = "#000000bb";
	// if (innerWidth < 1024 || innerHeight < 768) {
	// 	ctx.font = "italic 400 12px 'Times New Roman'";
	// 	ctx.fillText('Boxy does not work on mobile at this time', ww/8, ww/2);
	// 	return;
	// }
	ctx.fillText(`Boxy № ${num} ${new Date().toDateString()}`, 5, ww - 5);
	ctx.globalAlpha = .6;
	ctx.strokeStyle = "#0000000044";
	ctx.lineWidth = .6;

	// Main
	void function main() {
		for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
			ctx.save();
			ctx.translate(i * u + dx, j * u + dx);
			cell().then(cell_fg());
			ctx.restore();
		}
	}();

	// Fill Cell Background
	async function cell(d, e) {
		d ||= u - 5;
		e ||= 0;
		ctx.beginPath();
		ctx.rect(e, e, d, d);
		ctx.fillStyle = hues[rn(5)];
		ctx.fill();
		ctx.stroke();
	}

	// Fill Cell Foreground Units
	async function cell_fg() {
		const n = rn(2) === 0 ? 4 : 6; // subunits, 4 or 6
		const sf = n === 4 ? .2 : .13; // scale factor
		ctx.save();
		switch (rn(4)) {
			case 0: break;
			case 1: ctx.translate(0, u); ctx.rotate(-Math.PI / 2); break;
			case 2: ctx.translate(u, u); ctx.rotate(-Math.PI); break;
			case 3: ctx.translate(u, 0); ctx.rotate(Math.PI / 2); break;
		}
		// for (let i = 1; i < n + 1; i++) cell((u - 5) - i * sf * u, 5 * i + 4);
		for (let i = 1; i < n + 1; i++) cell((u - 5) - i * sf * u, 5 * sf * i + 4);
		ctx.restore();
	}
}