export function xoxo(hues) {
// X, O, heart, cat, dog, bunny
  const rn = (n) => { return Math.floor(Math.random() * n); }
  const num = rn(10000); // canvas run number, for title & save
  const N = 8; // subdivisions of canvas (N x N grid); change to make grid more/less dense

  // Setup Canvas & Drawing Context
  const canvas = document.getElementById("c");
  const ww = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
  const ctx = canvas.getContext("2d");
  const w = .7 * ww; // give the canvas a border on the bottom & right
  const dx = .15 * ww; // give the canvas a border on the top & left
  const u = w / N; // subunits (main canvas NxN) dimension
  const main_bg = "white";
  ctx.fillStyle = main_bg; // canvas background color
  ctx.fillRect(0, 0, ww, ww); // apply bg color

  // Mini Canvas (not using offscreen context for compatibility)
  const mc = document.getElementById("mc");
  const mw = mc.width = mc.height = canvas.width / N;
  const cx = mc.getContext("2d");

  // MAIN
  void function main() {
    draw().then(tidyUp);
  }();


  // Call Shapes Drawing Function: makes an N x N grid with possible 2 x 2 or 3 x 3 subgrid in each cell
  async function draw() {
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { // outer & inner loops combined
      let det = rn(3);
      switch (det) {
        case 0: shape("lg", i, j).then(cx.clearRect(0, 0, mw, mw)); break;
        case 1: for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) shape("md", i, j, k, l).then(cx.clearRect(0, 0, mw, mw)); break;
        case 2: for (let k = 0; k < 3; k++) for (let l = 0; l < 3; l++) shape("sm", i, j, k, l).then(cx.clearRect(0, 0, mw, mw)); break;
      }

    }
  }

  // Cleanup bottom & right: wedge and rainbow are overdrawing
  function tidyUp() {
    ctx.fillStyle = main_bg; // canvas background color
    ctx.fillRect(0, ww - dx, ww, ww); // apply bg color
    ctx.fillRect(ww - dx, 0, ww, ww); // apply bg color
  }

  // Shape Drawing
  async function shape(z, i, j, k, l) { // z: lg or sm (without or with subunits); i,j,k,l are counters from calling function, used as multiples
    let d = 0;
    switch (z) { // size
      case "lg": d = u; break;
      case "md": d = u / 2; break;
      case "sm": d = u / 3; break;
    }

    let fg = hues[rn(5)];
    let bg = hues[rn(5)]; // background color

    while (fg === bg) { bg = hues[rn(5)]; } // ensure fg !== bg

    cx.clearRect(0, 0, d, d);
    cx.fillStyle = cx.strokeStyle = bg;
    cx.fillRect(0, 0, d, d); // fill bg color
    cx.beginPath();
    cx.rect(0, 0, d, d);
    cx.stroke();

    let r = rn(4); // rotation
    let s = rn(10); // shape, or default no shape

    // begin draw
    function bd(cc) {
      cx.fillStyle = cx.strokeStyle = cc || fg; // foreground color
      cx.save();
      cx.translate(d / 2, d / 2); // move to minicanvas center
      cx.rotate(r * Math.PI / 2); // rotate by random mult of pi/2 (90 deg)
      cx.translate(-d / 2, -d / 2); // translate back
      cx.beginPath();
    }
    // end draw
    function ed() {
      cx.closePath();// default lineWidth = 1; this closes gaps effectively when combined with draw overlap (follows)
      cx.stroke();
      cx.fill();
      cx.restore();
    }

    switch (s) {
      case 0: bd(); cx.moveTo(0, d); cx.lineTo(d / 2, d / 2); cx.lineTo(d, d); cx.restore(); ed(); break; // pyramid
      case 1: bd(); cx.moveTo(0, 0); cx.lineTo(d, 0); cx.lineTo(0, d); cx.lineTo(0, 0); ed(); break; // right triangle
      case 2: bd(); cx.moveTo(d / 2, d); cx.arc(d / 2, d, d / 2, Math.PI, 0); ed(); break; // semicircle
      case 3: bd(); cx.moveTo(0, 0); cx.arc(0, 0, d / 2 - 1, 0, Math.PI / 2); cx.lineTo(0, 0); ed(); break; // pie wedge
      case 4: bd(); cx.moveTo(d / 2, d / 2); cx.arc(d / 2, d / 2, d / 4, 0, 2 * Math.PI); ed(); break; // circle
      case 5: bd(); cx.moveTo(0, 0); cx.arc(0, 0, d - .5, 0, Math.PI / 2); ed(); break; // full diameter wedge
      case 6: bd(hues[rn(5)]); cx.fillRect(0, 0, d, d); ed(); bd(); cx.moveTo(0, 0); cx.arc(0, 0, d / 2, 0, Math.PI / 2); ed();
        bd(hues[rn(5)]); cx.moveTo(d, d); cx.arc(d, d, d / 2, Math.PI, Math.PI / 2); ed(); break; // two wedges
      case 7: bd(); cx.moveTo(d / 2, d / 2); cx.arc(d / 2, d / 2, d / 2 - 1, 0, Math.PI * 2); ed();
        bd(hues[rn(5)]); cx.moveTo(d / 2, d / 2); cx.arc(d / 2, d / 2, d / 4, 0, 2 * Math.PI); ed(); break; // donut
      case 8: bd(); cx.moveTo(0, 0); cx.arc(0, 0, d, 0, -Math.PI / 2); ed();
        bd(hues[rn(5)]); cx.moveTo(0, 0); cx.arc(0, 0, d / 2 - 1, 0, Math.PI / 2); ed(); break; // rainbow
      case 9: bd(hues[rn(5)]); cx.moveTo(0, d / 2); cx.lineTo(d / 2, 0); cx.lineTo(d, d / 2); cx.lineTo(d / 2, d); ed(); break; // diamond
    }

    // drawimage gets the full minicanvas, but draws it onto the main canvas .5px overlap on all sides to remove gaps between cells

    if (z === "lg") ctx.drawImage(mc, 0, 0, mw, mw, dx + i * u - .5, dx + j * u - .5, mw + .5, mw + .5);
    if (z === "md") ctx.drawImage(mc, 0, 0, mw / 2, mw / 2, dx + i * u + k * u / 2 - .5, dx + j * u + l * u / 2 - .5, mw / 2 + .5, mw / 2 + .5);
    if (z === "sm") ctx.drawImage(mc, 0, 0, mw / 3, mw / 3, dx + i * u + k * u / 3 - .5, dx + j * u + l * u / 3 - .5, mw / 3 + .5, mw / 3 + .5);

    cx.clearRect(-1, -1, d + 1, d + 1);
    return true;
  }
}