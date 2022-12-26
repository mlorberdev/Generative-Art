export function entropy(hues) {
    // Variables
    const M = 24;
    const N = 12;
    const lw = .5;
    let diff = lw / 2; // gap between cells
    const hh = .6 * innerHeight;
    const ww = 1.618 * hh;
    const dx = .2 * hh;
    const w = ww - 2 * dx;
    const h = hh - 2 * dx;
    const dim = h / N;
    const tau = 2 * Math.PI;
    const canvas = document.getElementById("c");
    const ctx = canvas.getContext("2d");
        canvas.width = ww;
        canvas.height = hh;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ww, hh);
    const rn = (z) => { return Math.floor(Math.random() * z); }
    const num = rn(10000);
    ctx.font = "italic 400 8px 'Times New Roman'";
    ctx.fillStyle = "#00000088";
    ctx.save();
    ctx.translate(ww-65,hh+35);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(`Entropy № ${num}: ${new Date().toDateString()}`, 50,50);
    ctx.restore();

    // Setup Canvas
    function setup() {
        ctx.strokeStyle = "#00000088";
        ctx.lineWidth = lw;
        ctx.translate(dx + diff, dx + diff);
    }

    async function draw() {
        let m = 0, n = 0;
        for (let i = 0; i < M / 2; i++) {
            for (let j = 0; j < N; j++) {
                let d = rn(2) === 0 ? -1 : 1;
                ctx.save();
                ctx.translate(m * dim + m * diff, j * dim + j * diff);
                ctx.translate(dim / 2, dim / 2);
                ctx.rotate(m * d * .025 * Math.random() * Math.PI + Math.random() * .05 * d);
                ctx.translate(-dim / 2 * i * Math.random() * .05, -dim / 2 * i * Math.random() * .05);
                ctx.strokeRect(0, 0, dim, dim);
                ctx.globalAlpha = .8;
                ctx.fillStyle = hues[rn(5)];
                ctx.fillRect(0,0,dim,dim);
                ctx.globalAlpha = 1;
                ctx.restore();
            }
            m > M ? m-- : m++;
        }
    }

    void function main() {
        setup();
        draw();
        ctx.translate(0,0);
        ctx.rotate(Math.PI);
        ctx.translate(-ww + 2 * dx + diff, -hh + 1.8 * dx + diff);
        draw();
    }();
}