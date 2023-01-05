export function neighbors(hues) {
	// Variables
	const rn = (z) => { return Math.floor(Math.random() * z); }
	let fs = innerHeight > innerWidth && innerWidth < 450 ? 4 : 8;
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const ww = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
	const bd = .1 * ww; // border offset
	const cw = ww - 2 * bd; // drawing area width & height (don't change the 2, it's for two borders, left and right)
	// const U = rn(3) + 1; // number of units per row (U x U grid)
	const U = 1;
	const g = .03 * cw; // space between units
	const w = cw / U; // unit width & height
	let N; // number of nodes
	let d; // max distance between connected nodes
	switch (U) {
		case 1: N = 750; d = 40; break;
		case 2: N = 500; d = 22; break;
		case 3: N = 250; d = 18; break;
	}
	if (fs === 4) { Math.floor(N /= 3); d /= 2; }
	let n = []; // nodes array

	// Setup Canvas
	ctx.lineWidth = fs === 8 ? .8 : .4;
	ctx.lineCap = ctx.lineJoin = "round";
	ctx.fillStyle = hues[0];
	ctx.strokeStyle = "#00000022";
	ctx.fillRect(0, 0, ww, ww); // fill canvas bg
	ctx.translate(bd - g / 2, bd - g / 2); // move ctx to start drawing inside planned border
	ctx.opacity = .2;

	// Draw
	for (let p = 0; p < U; p++) for (let q = 0; q < U; q++) {
		ctx.save();
		ctx.translate(p * w + g, q * w + g);
		for (let i = 0; i < N; i++) n.push({ x: rn(w - g), y: rn(w - g) });
		for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
			if (Math.abs(n[i].x - n[j].x) < d && Math.abs(n[i].y - n[j].y) < d) {

				ctx.strokeStyle = hues[rn(4) + 1];
				ctx.beginPath();
				ctx.moveTo(n[i].x, n[i].y);
				ctx.lineTo(n[j].x, n[j].y);
				ctx.closePath();
				ctx.stroke();
			}
		}
		ctx.restore();
		n = [];
	}
}