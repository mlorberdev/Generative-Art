export function neighbors() {
	// Random Number
	function rn(z) { return Math.floor(Math.random() * z); }

	// Variables
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const ww = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
	const border = .15 * ww; // border offset
	const w = ww - 2 * border; // drawing area width & height (don't change the 2, it's for two borders, left and right)
	const N = 1000; // number of nodes
	const d = 25 + rn(10); // max distance between connected nodes
	let nodes = [];

	// Setup Canvas
	ctx.lineWidth = .5;
	ctx.lineCap = ctx.lineJoin = "round";
	ctx.fillStyle = "white";
	ctx.strokeStyle = "#00000022";
	ctx.fillRect(0, 0, ww, ww); // fill canvas bg
	const num = rn(10000);
	ctx.font = "italic 400 8px 'Times New Roman'";
	ctx.fillStyle = "#000000bb";
	ctx.fillText(`Neighbors № ${num} ${new Date().toDateString()}`, 5, canvas.width - 7);
	ctx.translate(border, border); // move ctx to start drawing inside planned border

	// Draw
	for (let i = 0; i < N; i++) nodes.push({ x: rn(w), y: rn(w) });
	for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
		if (Math.abs(nodes[i].x - nodes[j].x) < d && Math.abs(nodes[i].y - nodes[j].y) < d) {
			ctx.beginPath();
			ctx.moveTo(nodes[i].x, nodes[i].y);
			ctx.lineTo(nodes[j].x, nodes[j].y);
			ctx.closePath();
			ctx.stroke();
		}
	}
}