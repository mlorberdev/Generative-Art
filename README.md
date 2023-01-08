# Generative-Art

This is a collection of generative art projects done as an exercise in JavaScript ES2022 modules and HTML canvas. Inspiration for each piece comes from some of the first-gen artists working in this medium; and, the coding is how I imagine they could have done it with modern tools.

## Use

The project is deployed at [https://mlorberdev-generative-art.netlify.app/](https://mlorberdev-generative-art.netlify.app/). Just click a button at the top to run the corresponding program; lock in a palette if you like; select a download type from the dropdown at the top-left and click save.

## Code Abstract, Grid

```javascript
// CALL DRAWING FUNCTION: creates an N x N grid with possible 1x1, 2x2 or 3x3 subgrid in each cell
async function draw() {
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { // traverse 2d over N x N grid
    let det = rn(3); // random subgrid, calls rn = (input) => { return Math.floor(Math.random() * input) }
    switch (det) { // call shape draw; large (1x1), med (2x2), or small (3x3)
      // shape function draws to a hidden canvas (rotates it randomly, chooses bg and fg colors) then copies to main canvas
      case 0: shape("lg", i, j).then(cx.clearRect(0, 0, mw, mw)); break;
      case 1: for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) shape("md", i, j, k, l).then(cx.clearRect(0, 0, mw, mw)); break;
      case 2: for (let k = 0; k < 3; k++) for (let l = 0; l < 3; l++) shape("sm", i, j, k, l).then(cx.clearRect(0, 0, mw, mw)); break;
    }
  }
}
```

## Screenshots

### Sample
![ss2](./assets/images/mlorber_algorithmic_art%20(3).jpg)
### Sample
![ss3](./assets/images/mlorber_algorithmic_art%20(4).jpg)
### Sample
![ss4](./assets/images/mlorber_algorithmic_art%20(5).jpg)
### Sample
![ss5](./assets/images/mlorber_algorithmic_art%20(6).jpg)
### Sample
![ss5](./assets/images/mlorber_algorithmic_art%20(7).jpg)
### Sample
![ss5](./assets/images/mlorber_algorithmic_art%20(9).jpg)
### Sample
![ss5](./assets/images/mlorber_algorithmic_art%20(10).jpg)
### Sample
![ss5](./assets/images/mlorber_algorithmic_art%20(11).jpg)

## License
2022 [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) attribution required.