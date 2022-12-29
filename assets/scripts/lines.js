export function lines(hues) {

    // Variables
    const canvas = document.getElementById("c"), ctx = canvas.getContext("2d");
    const N = 3000;
    // const lw = [1, 2, 3, 4, 5];
    let lw = innerHeight > innerWidth && innerWidth < 450 ? [1, 2, 3] : [1, 2, 3, 4, 5];
    const ww = .8 * Math.min(innerWidth, innerHeight);
    const dx = .1 * ww;
    const w = ww - 2 * dx;
    const mag = .12 * w; // max line length
    const palette = [];
    const rn = (z) => { return Math.floor(Math.random() * z); }
    let num = rn(10000);
    let vertical = false; // vertical or horizontal line
    let x, y; // xy coordinates for each line

    // Setup Canvas
    function setup() {
        canvas.width = canvas.height = ww;
        ctx.fillStyle = hues[0];
        ctx.fillRect(0, 0, ww, ww);
    }

    void function main() {
        setup();
        let fs = innerHeight > innerWidth && innerWidth < 450 ? 4 : 8;
        ctx.font = `italic 400 ${fs}px 'Times New Roman'`;
        ctx.fillStyle = hues[1];
        ctx.fillText(`3000 Lines № ${num} ${palette.toString()} ${new Date().toDateString()}`, 5, ww - 7);
        ctx.translate(dx, dx);
        for (let i = 0; i < N; i++) line();
    }();

    function line() {
        ctx.strokeStyle = hues[rn(4) + 1];
        let ll = rn(mag);
        x = rn(w);
        y = rn(w);
        rn(2) === 0 ? vertical = true : vertical = false;
        ctx.lineWidth = lw[rn(5)];
        ctx.beginPath();
        ctx.moveTo(x, y);
        if (vertical === true) {
            if (y + ll > w) y -= ll;
            ctx.lineTo(x, y + ll)
        } else {
            if (x + ll > w) x -= ll;
            ctx.lineTo(x + ll, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
}