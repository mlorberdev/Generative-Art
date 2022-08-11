import { palettes } from "./palettes.js";
export function pack() {

	// variables
	const rn = (nn) => { return Math.floor(Math.random() * nn); }
	const palette = palettes[rn(palettes.length)];
	const num = rn(10000);
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const circles = [];
	const tau = 2 * Math.PI;
	const min = 2;
	const max = 100;
	const N = 600;
	const A = 20;
	let z = .8 * innerHeight; // canvas size
	const dx = .15 * z;

	const pr = window.devicePixelRatio;
	canvas.width = z * pr;
	canvas.height = z * pr;
	ctx.scale(pr, pr);

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, z, z);
	ctx.font = "italic 400 8px 'Times New Roman'";
	ctx.fillStyle = "#000000bb";
	ctx.fillText(`Pack № ${num} ${new Date().toDateString()}`, 5, z - 7);
	ctx.globalAlpha = .8;
	ctx.lineWidth = 1;
	ctx.translate(dx, dx);
	z -= dx * 2; // z is now drawable dim on canvas

	function draw() {
		let c;
		let draw = false;

		for (let a = 0; a < A; a++) {
			c = {	x: rn(z),	y: rn(z),	r: min};

			if (intersect(c)) continue;
			else {
				draw = true;
				break;
			}
		}

		if (!draw) return;

		for (let rz = min; rz < max; rz++) {
			c.r = rz;
			if (intersect(c)) {
				c.r--;
				break;
			}
		}

		circles.push(c);
		ctx.beginPath();
		ctx.arc(c.x, c.y, c.r, 0, tau);
		ctx.fillStyle = palette[rn(5)];
		ctx.stroke();
		ctx.fill();
	}

	function intersect(circle) {
		for (let i = 0; i < circles.length; i++) {
			let cc = circles[i];
			let a = circle.r + cc.r;
			let x = circle.x - cc.x;
			let y = circle.y - cc.y;

			if (a >= Math.hypot(x,y)) {
				return true;
			}
		}
		
		if (circle.x + circle.r >= z || circle.x - circle.r <= 0 || circle.y + circle.r >= z || circle.y - circle.r <= 0) return true;
		else return false;
	}

	for (let i = 0; i < N; i++) draw();

}