export function patrn() {

  document.getElementById("playPause").style.display = "block";
  const canvas = document.getElementById("c");
  const tw = canvas.width = canvas.height = .8 * Math.min(innerWidth, innerHeight);
  canvas.setAttribute('width', tw * window.devicePixelRatio);
  canvas.setAttribute('height', tw * window.devicePixelRatio);

  const generator = (() => {
    "use strict";

    function buildModel(config, rnd, collisionDetector) {
      let activeLineCount = 0,
        seeds;

      function buildLine(p0, angle, parent) {
        const growthRate = 1;
        const line = {
          p0,
          p1: { ...p0 },
          angle,
          generation: parent ? parent.generation + 1 : 0,
          parent,
          active: true,
          split: false,
          expired: false,
          steps: 0,
          rnd: rnd(),
          grow() {
            this.p1.x += Math.sin(angle) * growthRate;
            this.p1.y += Math.cos(angle) * growthRate;
            this.steps++;
            this.split = rnd() < config.pBifurcation;
            if (rnd() < this.generation * config.expiryThreshold) {
              this.expired = true;
            }
          },
          clip() {
            this.p1.x -= Math.sin(angle) * growthRate;
            this.p1.y -= Math.cos(angle) * growthRate;
          }
        };
        activeLineCount++;
        line.grow();
        return line;
      }

      function buildSeed() {
        const angle = rnd(0, Math.PI * 2);
        return {
          angle,
          lines: [buildLine({
            x: rnd(0, canvas.width),
            y: rnd(0, canvas.height),
          }, angle)],
          grow() {
            this.lines.filter(l => l.active).forEach(line => {
              line.grow();
              if (line.expired) {
                line.active = false;
                activeLineCount--;
                return;
              }
              if (collisionDetector.checkForCollisions(line, model.forEachLineUntilTrue)) {
                line.clip();
                line.active = false;
                activeLineCount--;
                return;
              }
              if (line.split) {
                line.split = false;
                const newAngle = line.angle + Math.PI / 2 * (rnd() < 0.5 ? 1 : -1);
                this.lines.push(buildLine({
                  x: line.p1.x,
                  y: line.p1.y,
                }, newAngle, line))
              }
            });
          }
        };
      }

      const model = {
        generate() {
          seeds = Array(config.seedCount).fill().map(buildSeed);
        },
        grow() {
          seeds.forEach(s => s.grow());
        },
        forEachLineUntilTrue(fn) {
          (seeds || []).some(seed => {
            return seed.lines.some(line => {
              return fn(line, config);
            })
          })
        },
        isActive() {
          return activeLineCount > 0;
        }
      };

      return model;
    }

    function randomFromSeed(seed) {
      // https://stackoverflow.com/a/47593316/138256
      function mulberry32() {
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      }

      return function (a = 1, b = 0) {
        const min = b && a,
          max = b || a;
        return mulberry32() * (max - min) + min;
      }
    }

    function buildCollisionDetector(canvas) {
      const CLOCKWISE = 1, ANTICLOCKWISE = 2, COLINEAR = 0;

      function lineOffscreen(line) {
        return !canvas.isVisible(line.p1.x, line.p1.y);
      }

      function orientation(p, q, r) {
        const val = ((q.y - p.y) * (r.x - q.x)) - ((q.x - p.x) * (r.y - q.y));
        if (val > 0) {
          return CLOCKWISE;
        } else if (val < 0) {
          return ANTICLOCKWISE;
        }
        return COLINEAR;
      }

      function onSegment(p, q, r) {
        return (q.x <= Math.max(p.x, r.x)) && (q.x >= Math.min(p.x, r.x)) && (q.y <= Math.max(p.y, r.y)) && (q.y >= Math.min(p.y, r.y));
      }

      function linesIntersect(l1, l2) {
        const o1 = orientation(l1.p0, l1.p1, l2.p0),
          o2 = orientation(l1.p0, l1.p1, l2.p1),
          o3 = orientation(l2.p0, l2.p1, l1.p0),
          o4 = orientation(l2.p0, l2.p1, l1.p1);

        if ((o1 != o2) && (o3 != o4)) {
          return true;
        }

        if ((o1 === COLINEAR) && onSegment(l1.p0, l2.p0, l1.p1)) {
          return true;
        }

        if ((o2 === COLINEAR) && onSegment(l1.p0, l2.p1, l1.p1)) {
          return true;
        }

        if ((o3 === COLINEAR) && onSegment(l2.p0, l1.p0, l2.p1)) {
          return true;
        }

        if ((o4 === COLINEAR) && onSegment(l2.p0, l1.p1, l2.p1)) {
          return true;
        }

        return false;
      }

      return {
        checkForCollisions(line1, forEachLineUntilTrue) {
          if (lineOffscreen(line1)) {
            return true;
          }

          let foundCollision = false;
          forEachLineUntilTrue(line2 => {
            if (line1 === line2 || line1.parent === line2 || line2.parent === line1) {
              return;
            }
            return foundCollision = linesIntersect(line1, line2);
          });
          return foundCollision;
        }
      };
    }

    function buildRandomConfig(rnd) {
      const useGradients = rnd() > 0.3;

      return {
        seedCount: Math.round(rnd(1, 10)),
        pBifurcation: rnd(0.02, 0.05),
        maxRectWidth: rnd(0, 100),
        rectBaseHue: rnd(360),
        rectSaturation: rnd(20, 100),
        rectHueVariation: rnd(100),
        rectAlpha: useGradients ? rnd(0.4, 0.8) : rnd(0.1, 0.4),
        rectLightness: rnd(20, 70),
        expiryThreshold: rnd(0.001),
        lineDarkness: rnd(),
        pencilHorizontal: rnd() > 0.5,
        useGradients
      };
    }

    function createNewRender(seed, onFinished) {
      function update() {
        model.grow();

        if (model.isActive()) {
          view.canvas.clear();
          model.forEachLineUntilTrue((line, config) => {
            view.canvas.drawRect(line, Math.min(config.maxRectWidth, line.steps), `hsla(${(config.rectBaseHue + (line.rnd - 0.5) * config.rectHueVariation) % 360},${config.rectSaturation}%,${config.rectLightness}%,${config.rectAlpha})`, config.useGradients);
          });
          model.forEachLineUntilTrue((line, config) => {
            const lineColourValue = Math.round(config.lineDarkness * 100),
              lineColour = `rgb(${lineColourValue},${lineColourValue},${lineColourValue})`;
            view.canvas.drawLine(line, lineColour)
          });
          return false;
        }
        return true;
      }

      let model, rnd, config, stopRequested, collisionDetector;

      const render = {
        init() {
          stopRequested = false;
          rnd = randomFromSeed(seed);
          config = buildRandomConfig(rnd);
          collisionDetector = buildCollisionDetector(view.canvas);
          model = buildModel(config, rnd, collisionDetector);
          view.canvas.clear();
          model.generate();
        },
        start() {
          function doUpdate() {
            const isComplete = update();

            if (stopRequested) {
              stopRequested = false;

            } else if (isComplete) {
              onFinished();

            } else {
              requestAnimationFrame(doUpdate);
            }
          }
          doUpdate();
        },
        stop() {
          stopRequested = true;
        },
        applyPencil() {
          view.canvas.clear();
          model.forEachLineUntilTrue((line, config) => {
            if (!config.pencilHorizontal || Math.sin(line.angle) ** 2 < rnd()) {
              view.canvas.drawWithPencil(line, rnd(10, 100), {
                h: (config.rectBaseHue + (line.rnd - 0.5) * config.rectHueVariation) % 360,
                s: config.rectSaturation,
                l: config.rectLightness
              }, rnd);
            }
          });
          model.forEachLineUntilTrue((line, config) => {
            const lineColourValue = Math.round(config.lineDarkness * 100),
              lineColour = `rgb(${lineColourValue},${lineColourValue},${lineColourValue})`;
            view.canvas.drawLine(line, lineColour)
          });
        }
      };
      return render;
    }

    let render, onFinishedCurrentHandler = () => { };

    return {
      onFinishedCurrent(handler) {
        onFinishedCurrentHandler = handler;
      },
      startNew(seed = Date.now() & 0xfffff) {
        if (render) {
          render.stop();
        }
        render = createNewRender(seed, onFinishedCurrentHandler);
        render.init();
        render.start();
        return seed;
      },
      resume() {
        render.start();
      },
      pause() {
        render.stop();
      },
      applyPencil() {
        render.applyPencil();
      }
    };

  })();

  const view = (() => {
    // "use strict";
    const elPlayPause = document.getElementById('playPause'),
      elDownload = document.getElementById('download'),
      elContinuous = document.getElementById('continuous'),
      elPencil = document.getElementById('pencil'),
      elSeeds = document.getElementById('recentSeeds'),
      elCanvas = document.getElementById('c'),

      NO_OP = () => { },
      MAX_SEEDS = 3,

      STATE_INIT = 1,
      STATE_RUNNING = 2,
      STATE_PAUSED = 3,
      STATE_STOPPED = 4,

      viewModel = {};

    let onStartHandler, onResumeHandler, onPauseHandler, onSeedClickHandler, onPencilClickHandler;

    elPlayPause.onclick = () => {
      let handler, newState;
      if (viewModel.state === STATE_INIT || viewModel.state === STATE_STOPPED) {
        handler = onStartHandler || NO_OP;
        newState = STATE_RUNNING;

      } else if (viewModel.state === STATE_RUNNING) {
        handler = onPauseHandler || NO_OP;
        newState = STATE_PAUSED;

      } else if (viewModel.state === STATE_PAUSED) {
        handler = onResumeHandler || NO_OP;
        newState = STATE_RUNNING;

      } else {
        console.assert(false, 'Unexpected state: ' + viewModel.state);
      }
      viewModel.state = newState;
      updateFromModel();
      handler();
    };

    elContinuous.onclick = () => {
      viewModel.isContinuous = elContinuous.checked;
    };

    elPencil.onclick = () => {
      (onPencilClickHandler || NO_OP)();
    };

    elSeeds.onclick = e => {
      viewModel.state = STATE_RUNNING;
      (onSeedClickHandler || NO_OP)(Number(e.target.innerText));
    };

    elDownload.onclick = () => {
      const link = document.createElement('a');
      link.download = `${viewModel.seeds[0]}.png`;
      link.href = elCanvas.toDataURL();
      link.click();
    };

    function updateFromModel() {
      if (viewModel.state === STATE_RUNNING) {
        elPlayPause.innerText = 'Pause';
      } else if (viewModel.state === STATE_PAUSED) {
        elPlayPause.innerText = 'Resume';
      } else {
        elPlayPause.innerText = 'Start';
      }

      elContinuous.checked = viewModel.isContinuous;
      elSeeds.innerHTML = viewModel.seeds.map(seed => `<li>${seed}</li>`).join('');
      elPencil.disabled = elDownload.disabled = (viewModel.state === STATE_INIT || viewModel.state === STATE_RUNNING);
    }

    const canvas = (() => {
      const ctx = elCanvas.getContext('2d');

      function doUpdateDimensions(canvasObj) {
        ctx.canvas.width = canvasObj.width = elCanvas.clientWidth;
        ctx.canvas.height = canvasObj.height = elCanvas.clientHeight;
      }

      let updateDimensions = true;
      const canvas = {
        clear() {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, elCanvas.width, elCanvas.height);
          if (updateDimensions) {
            updateDimensions = false;
            doUpdateDimensions(this);
          }
        },
        drawLine(line, colour) {
          ctx.strokeStyle = colour;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(line.p0.x, line.p0.y);
          ctx.lineTo(line.p1.x, line.p1.y);
          ctx.stroke();
        },
        drawRect(line, width, colour, withGradient) {
          const xDelta = width * Math.cos(line.angle),
            yDelta = width * Math.sin(line.angle);

          if (withGradient) {
            const gradient = ctx.createLinearGradient(line.p0.x - xDelta, line.p0.y + yDelta, line.p0.x + xDelta, line.p0.y - yDelta);
            gradient.addColorStop(0, 'rgba(255,255,255,0)');
            gradient.addColorStop(0.5, colour);
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gradient;
          } else {
            ctx.fillStyle = colour;
          }
          ctx.beginPath();
          ctx.moveTo(line.p0.x - xDelta, line.p0.y + yDelta);
          ctx.lineTo(line.p1.x - xDelta, line.p1.y + yDelta);
          ctx.lineTo(line.p1.x + xDelta, line.p1.y - yDelta);
          ctx.lineTo(line.p0.x + xDelta, line.p0.y - yDelta);
          ctx.fill();
        },
        drawWithPencil(line, width, colourValues, rnd) {
          const ALPHA_FADEOUT_RATE = 4,
            ALPHA_RANDOMNESS = 0.1;
          let alpha = 0.4;

          for (let d = 1; d < width; d++) {
            ctx.strokeStyle = `hsla(${colourValues.h},${colourValues.s}%,${colourValues.l}%,${alpha + ALPHA_RANDOMNESS * (rnd() - 0.5)})`;
            ctx.beginPath();
            ctx.moveTo(line.p0.x - d * Math.cos(line.angle), line.p0.y + d * Math.sin(line.angle));
            ctx.lineTo(line.p1.x - d * Math.cos(line.angle), line.p1.y + d * Math.sin(line.angle));
            ctx.stroke();
            alpha *= (1 - ALPHA_FADEOUT_RATE / width);
          }
        },
        isVisible(x, y) {
          return x >= 0 && x < this.width && y >= 0 && y < this.height;
        }
      };

      window.onresize = () => {
        updateDimensions = true;
        if (viewModel.state !== STATE_RUNNING) {
          const currentImage = elCanvas.toDataURL();
          doUpdateDimensions(canvas);
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = currentImage;
        }
      };

      return canvas;
    })();

    const viewObj = {
      init() {
        viewModel.state = STATE_INIT;
        viewModel.isContinuous = false;
        viewModel.seeds = [];
        updateFromModel();
      },
      onStart(handler) {
        onStartHandler = handler;
      },
      onResume(handler) {
        onResumeHandler = handler;
      },
      onPause(handler) {
        onPauseHandler = handler;
      },
      onPencil(handler) {
        onPencilClickHandler = handler;
      },
      onSeedClick(handler) {
        onSeedClickHandler = handler;
      },
      addSeed(newSeed) {
        const seedIndex = viewModel.seeds.findIndex(s => s === newSeed);
        if (seedIndex === -1) {
          if (viewModel.seeds.unshift(newSeed) > MAX_SEEDS) {
            viewModel.seeds.length = MAX_SEEDS;
          }
        } else {
          viewModel.seeds.splice(seedIndex, 1);
          viewModel.seeds.unshift(newSeed);
        }
        updateFromModel();
      },
      setStopped() {
        viewModel.state = STATE_STOPPED;
        updateFromModel();
      },
      isContinuous() {
        return viewModel.isContinuous;
      },
      canvas
    };

    return viewObj;
  })();

  function init() {
    "use strict";
    view.init();

    function startNew(seed) {
      const newSeed = generator.startNew(seed);
      view.addSeed(newSeed);
    }

    view.onStart(startNew);

    view.onResume(() => {
      generator.resume();
    });

    view.onPause(() => {
      generator.pause();
    });

    view.onPencil(() => {
      generator.applyPencil();
    });

    view.onSeedClick(seed => {
      startNew(seed);
    });

    generator.onFinishedCurrent(() => {
      if (view.isContinuous()) {
        startNew();
      } else {
        view.setStopped();
      }
    });
  }
  init();
}