export function lines() {

    // Variables
    const canvas = document.getElementById("c"), ctx = canvas.getContext("2d");
    const N = 3000;
    const lw = .5;
    const ww = .8 * innerHeight;
    const dx = .05 * ww;
    const w = ww - 2 * dx;
    const mag = .12 * w; // max line magnitude
    const shifts = [-6, 30, 120, 150, 300]; // hue shift
    const palette = [];
    const rn = (z) => { return Math.floor(Math.random() * z); }
    let num = rn(10000);
    let vertical = false; // vertical or horizontal line
    let x, y; // xy coordinates for each line

    // Setup Canvas
    function setup() {
        canvas.width = canvas.height = ww;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, ww, ww);
    }

    void function main() {
        setup();
        setPalette();
        ctx.translate(dx, dx);
        for (let i = 0; i < N; i++) line();
    }();


    function setPalette() {
        let ph = rn(360); // primary hue
        let sh = ph + shifts[rn(shifts.length)]; // secondary hue
        let s = 42;
        let l = rn(10); // starting lightness. will go to 0..99 after looping below

        let pc = `hsl(${ph}, ${s}%, ${l + 30}%)`; // primary color
        let pv = `hsl(${ph}, ${s}%, ${l + 20}%)`; // primary variant
        let sc = `hsl(${sh}, ${s}%, ${l + 40}%)`; // secondary color
        let sv = `hsl(${sh}, ${s}%, ${l + 60}%)`; // secondary variant
        let ac = `hsl(${ph + 30}, ${s}%, ${l + 50}%)`; // accent color: primary color rotated by 180 deg

        palette.push(pc, pv, sc, sv, ac);
        ctx.font = "italic 400 8px 'Times New Roman'";
        ctx.fillStyle = "#00000088";
        ctx.fillText(`Lines № ${num} ${palette.toString()} ${new Date().toDateString()}`, 5, ww - 7);
    }

    function line() {
        ctx.strokeStyle = palette[rn(5)];
        let ll = rn(mag);
        x = rn(w);
        y = rn(w);
        rn(2) === 0 ? vertical = true : vertical = false;
        ctx.lineWidth = Math.random() * 3;
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