import { palettes } from "./palettes.js";
export function bebebe() {

	// Color Palette
	const hues = palettes[Math.floor(Math.random() * palettes.length)];

	// Variables
	const rn = (n, p) => { p = p || 0; return Math.floor(Math.random() * n) + p; }
	const ver = rn(2);
	const N = 10;
	const num = rn(10000);
	const dots = [];

	// Setup Main Canvas
	const canvas = document.getElementById("c");
	const tw = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
	canvas.setAttribute('width', tw * window.devicePixelRatio);
	canvas.setAttribute('height', tw * window.devicePixelRatio);
	const ctx = c.getContext("2d");
	ctx.lineWidth = 3;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	let rh = rn(5);
	ctx.fillStyle = hues[rh];
	hues.splice(rh, 1);
	ctx.fillRect(0, 0, tw, tw);
	ctx.font = "italic 400 8px 'Times New Roman'";
	ctx.globalCompositeOperation = "lighter";
	ctx.fillText(`bebebe № ${num} ${hues.toString()} ${new Date().toDateString()}`, 5, tw - 5);
	ctx.globalCompositeOperation = "source-over";

	// Translate Contexts
	const d = .6 * tw / N;
	const dx = 3.2;
	ctx.translate(dx * d, dx * d);

	// Switch
	async function shape(i, j) {
		ctx.save();
		ctx.translate(d * i + d / 2, d * j + d / 2);
		switch (rn(3)) {
			case 0: dot(5); break; // sm filled dot
			case 1: dot(10); if (rn(2) === 0) dot(5); break; // lg filled dot, maybe with center sm dot
			default: break;
		}
		function dot(r) {
			ctx.fillStyle = ctx.strokeStyle = hues[rn(4)];
			ctx.beginPath(); ctx.arc(d / 2, d / 2, r, 0, Math.PI * 2); ctx.fill();
		}
		ctx.restore();
		ctx.fillStyle = ctx.strokeStyle = hues[rn(4)];
		ctx.save();
		ctx.translate(d * i + d / 2, d * j + d / 2);
		ctx.rotate(rn(4) * Math.PI / 2);
		ver === 0 ? v1() : v2();

		function v1() {
			switch (rn(9)) {
				case 0: ctx.strokeRect(0, 0, d, d); break; // square
				case 1: ctx.beginPath(); ctx.moveTo(-d, -d); ctx.lineTo(d, d); ctx.lineTo(-d, d); ctx.closePath(); ctx.stroke(); break;
				case 2: ctx.beginPath(); ctx.moveTo(-d, -d); ctx.lineTo(0, -d); ctx.lineTo(d / 2, d / 2); ctx.lineTo(-d, d / 2); ctx.closePath(); ctx.stroke(); break;
				case 3: ctx.beginPath(); ctx.moveTo(-d / 2, -d / 2); ctx.lineTo(d / 2, -d / 2); ctx.lineTo(d / 2, d / 2); ctx.lineTo(-d / 2, d); ctx.closePath(); ctx.stroke(); break;
				case 4: ctx.beginPath(); ctx.moveTo(-1.5 * d, -1.5 * d); ctx.lineTo(d / 2, -1.5 * d); ctx.lineTo(d / 2, d / 2); ctx.lineTo(-1.5 * d, 0); ctx.closePath(); ctx.stroke(); break;
				case 5: ctx.beginPath(); ctx.moveTo(-1.5 * d, -1.5 * d); ctx.lineTo(d / 2, -1.5 * d); ctx.lineTo(0, d / 2); ctx.lineTo(-1.5 * d, 0); ctx.closePath(); ctx.stroke(); break;
				case 6: ctx.beginPath(); ctx.moveTo(0, d); ctx.lineTo(0, -d); ctx.closePath(); ctx.stroke(); break;
				default: break;
			}
		}

		function v2() {
			switch (rn(12)) {
				case 0: ctx.strokeRect(0, 0, d, d); break; // square
				case 1: ctx.strokeRect(-d / 2, -d / 2, 1.5 * d, 1.5 * d); // larger square
				case 2: ctx.beginPath(); ctx.moveTo(-d, -d); ctx.lineTo(d, d); ctx.lineTo(-d, d); ctx.closePath(); ctx.stroke(); break; // rt triangle
				case 3: ctx.beginPath(); ctx.moveTo(-d, 0); ctx.lineTo(0, 0); ctx.stroke(); ctx.arc(0, 0, d, 0, Math.PI); ctx.closePath(); ctx.stroke(); break; // semicircle
				case 4: ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(2 * d, 0); ctx.lineTo(d, d); ctx.closePath(); ctx.stroke(); break;
				case 5: ctx.beginPath(); ctx.moveTo(-1.5 * d, -1.5 * d); ctx.lineTo(d / 2, -1.5 * d); ctx.lineTo(d / 2, d / 2); ctx.lineTo(-1.5 * d, 0); ctx.closePath(); ctx.stroke(); break;
				case 6: ctx.beginPath(); ctx.moveTo(-1.5 * d, -1.5 * d); ctx.lineTo(d / 2, -1.5 * d); ctx.lineTo(0, d / 2); ctx.lineTo(-1.5 * d, 0); ctx.closePath(); ctx.stroke(); break;
				case 7: ctx.beginPath(); ctx.moveTo(0, d); ctx.lineTo(0, 0); ctx.lineTo(d, 0); ctx.stroke(); ctx.arc(0, 0, d, 0, 1.5 * Math.PI); ctx.closePath(); ctx.stroke(); break; // semicircle
				default: break;
			}
		}
	}
	// Shapes
	void function shapes() {
		for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
			if (rn(3) === 0) continue;
			shape(i, j).then(ctx.restore());
		}
	}()
}