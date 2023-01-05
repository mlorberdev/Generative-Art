export function pack(hues) {

	const rn = (z) => { return z === undefined ? Math.random() : Math.floor(Math.random() * z); }
	const tau = 2 * Math.PI;
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	let ww = .8 * Math.min(innerWidth, innerHeight);;
	const dx = .15 * ww;
	canvas.width = canvas.height = ww;
	const circles = [];
	const min = 2;
	const max = 60;
	const N = 500;
	const A = 500;
	const T = rn(2) // type, circle(0) or square(1)
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, ww, ww);
	let variant;
	T === 0 ? variant = "Circle" : variant = "Square";
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000000bb";
	ctx.globalAlpha = .8;
	ww -= dx * 2;
	T === 0 ? ctx.translate(canvas.width / 2, canvas.width / 2) : ctx.translate(dx, dx);

	function draw() {
		let c;
		let int = true;
		for (let i = 0; i < A; i++) {
			let aa = rn() * tau;
			let rr = rn() * ww / 2;
			T === 0 ? c = {
				x: Math.floor(rr * Math.cos(aa)),
				y: Math.floor(rr * Math.sin(aa)),
				r: rr,
				mr: min
			} : c = {
				x: rn(ww),
				y: rn(ww),
				r: rr,
				mr: min
			};

			if (intersect(c)) {
				continue;
			} else {
				int = false;
				break;
			}
		}

		if (int) return

		for (let i = min; i < max; i++) {
			c.mr = i;
			if (intersect(c)) {
				c.mr--;
				break;
			}
		}

		circles.push(c);
		ctx.beginPath();
		ctx.arc(c.x, c.y, c.mr, 0, tau);
		ctx.stroke();
		ctx.fillStyle = hues[rn(5)];
		ctx.fill();
	}

	function intersect(c) {
		for (let i = 0; i < circles.length; i++) {
			let cc = circles[i];
			let a = c.mr + cc.mr;
			let x = c.x - cc.x;
			let y = c.y - cc.y;

			if (a >= Math.hypot(x, y)) {
				return true;
			}
		}

		if (T === 0) {
			if (Math.abs(c.r + c.mr) > ww / 2) return true;
		} else {
			if (c.x + c.mr >= ww || c.x - c.mr <= 0 || c.y + c.mr >= ww || c.y - c.mr <= 0) return true;
		}

		return false;
	}

	for (let i = 0; i < N; i++) draw();

}