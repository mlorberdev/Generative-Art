export function nooks() {
	// Variables
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const ww = Math.floor(.8 * innerHeight);
	let st, et;

	// Random
	const rn = (a, b) => { return Math.floor(Math.random() * (b - a)) + a; }
	let num = rn(0, 10000);

	// Setup Canvas
	canvas.width = canvas.height = ww;
	ctx.fillStyle = "whitesmoke";
	ctx.fillRect(0, 0, ww, ww);
	ctx.fillStyle = "#00000022";
	ctx.font = "italic 400 8px 'Times New Roman'";
	ctx.translate(ww / 2, ww / 2);
	ctx.save();
	ctx.rotate(-Math.PI / 2);
	ctx.scale(.5, .5);

	void function main() {
		st = new Date(); // start time
		const A1 = rn(50, 150);
		const A2 = rn(50, 400);
		const A3 = rn(50, 150);
		const A4 = rn(50, 400);
		const f1 = 262;
		const f2 = 222;
		const f3 = 13;
		const f4 = 333;
		const p1 = 12;
		const p2 = 22;
		const p3 = 122;
		const p4 = 6;
		const d1 = .007;
		const d2 = .001;
		const d3 = .007;
		const d4 = .001;
		const ti = 10;
		const tf = 212;
		const ts = .0025;
		for (let t = ti; t < tf; t += ts) {
			// NOTE: change sin and cos in fillText by hand if changing equation below
			ctx.fillRect(
				A1 * Math.sin(3 * f1 + p1) * Math.exp(-d1 * t) + A2 * Math.sin(t * f2 + p2) * Math.exp(-d2 * t),
				A3 * Math.cos(t * f3 + p3) * Math.exp(-d3 * t) + A4 * Math.cos(2 * f4 + p4) * Math.exp(-d4 * t),
				1, 1
			)
		}
		et = new Date() - st; // elapsed time
		ctx.restore();
		ctx.fillStyle = "#00000088";
		ctx.fillText(`Nooks № ${num}: ${st.toLocaleString()}, t=${ti}..${tf}, step ${ts}, ${et}ms ( ${A1}sin(3${f1} + ${p1}) * exp(-${d1}t) + ${A2} * sin(${f2}t + ${p2}) * exp(-${d2}t), ${A3}cos(${f3}t + ${p3}) * exp(-${d3}t) + ${A4} * cos(2${f4} + ${p4}) * exp(-${d4}t) )`, -ww / 2 + 14, ww / 2 - 14);
	}();
}