export function idk() {
	// Variables
	const rn = () => {return Math.random();}
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const ww = Math.floor(.8 * innerHeight);
	let st, et;

	// Setup Canvas
	canvas.width = canvas.height = ww;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, ww, ww);
	ctx.fillStyle = "#000000bb";
	ctx.font = "italic 400 8px 'Times New Roman'";
	ctx.translate(ww / 2, ww / 2);
	ctx.save();
	ctx.rotate(-Math.PI / 2);
	ctx.scale(.5, .5);

	void function main() {
		const A1 = 122;
		const A2 = 333;
		const A3 = 122;
		const A4 = 333;
		const f1 = 262;
		const f2 = 222;
		const f3 = 777;
		const f4 = 333;
		const p1 = 400;
		const p2 = 344;
		const p3 = 122;
		const p4 = 200;
		const d1 = .004;
		const d2 = .001;
		const d3 = .004;
		const d4 = .001;
		const ti = 0;
		const tf = 400;
		const ts = .01;
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
		ctx.fillText(`Equation ${Math.floor(Math.random() * 10000)}: ${new Date().toLocaleString()}, t=${ti}..${tf}, step ${ts}, ${et}ms ( ${A1}sin(3${f1} + ${p1}) * exp(-${d1}t) + ${A2} * sin(${f2}t + ${p2}) * exp(-${d2}t), ${A3}cos(${f3}t + ${p3}) * exp(-${d3}t) + ${A4} * cos(2${f4} + ${p4}) * exp(-${d4}t) )`, -ww / 2 + 14, ww / 2 - 14);
	}();
}