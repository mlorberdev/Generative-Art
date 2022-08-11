export function disko() {
	
	// Variables
	const rn = (z) => { return Math.floor(Math.random() * z) };
	const num = rn(10000); // canvas number & save
	const canvas = document.getElementById("c");
	const ctx = canvas.getContext("2d");
	const ww = .8 * Math.min(innerWidth, innerHeight);

	// Setup Canvas
	canvas.width = canvas.height = ww;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, ww, ww);
	ctx.fillStyle = "#00000044";
	ctx.font = "italic 400 8px 'Times New Roman'";
	ctx.translate(ww / 2, ww / 2 - 12);
	ctx.save();
	ctx.rotate(-Math.PI / 2);
	ctx.scale(.5, .5);

	void function main() {
		const A1 = 12;
		const A4 = 0;
		const A2 = 400;
		const A3 = 400;
		const f1 = 2;
		const f2 = 222;
		const picks = [111, 222, 333, 444, 555, 666, 777, 888, 999];
		const f3 = picks[rn(picks.length)];
		const f4 = picks[rn(picks.length)];
		const p1 = 250;
		const p2 = 344;
		const p3 = 122;
		const p4 = 5;
		const d1 = 0;
		const d2 = (rn(100) / 100 * .004).toPrecision(3);
		const d3 = (rn(100) / 100 * .004).toPrecision(3);
		const d4 = .014;
		const ti = 0;
		const tf = 500;
		const ts = .0025;

		// NOTE: change sin and cos in fillText by hand if changing equation below
		for (let t = ti; t < tf; t += ts) {
			ctx.fillRect(
				A1 * Math.sin(3 * f1 + p1) * Math.exp(-d1 * t) + A2 * Math.sin(t * f2 + p2) * Math.exp(-d2 * t),
				A3 * Math.cos(t * f3 + p3) * Math.exp(-d3 * t) + A4 * Math.cos(2 * f4 + p4) * Math.exp(-d4 * t),
				1, 1
			)
		}
		ctx.restore();
		ctx.fillStyle = "#00000088";
		ctx.fillText(`Disko № ${num}: ${new Date().toDateString()}`, -ww / 2 + 14, ww / 2 - 12);
		ctx.fillText(`t=${ti}..${tf}, step ${ts}, ( ${A1}sin(3*${f1} + ${p1}) * exp(-${d1}t) + ${A2} * sin(${f2}t + ${p2}) * exp(-${d2}t), ${A3}cos(${f3}t + ${p3}) * exp(-${d3}t) + ${A4} * cos(2*${f4} + ${p4}) * exp(-${d4}t) )`, -ww / 2 + 14, ww / 2);
	}();
}