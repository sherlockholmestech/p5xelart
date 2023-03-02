p5.disableFriendlyErrors = true;

const gap = 20;

let mode;
let cols, rows;
let pixeldata = [];

function setup() {
  createCanvas(300, 300);
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(0, height + 5);
  cols = width / gap;
  rows = height / gap;
  for (let i = 0; i < (rows * cols); i++) {
    pixeldata.push(color(255, 255, 255))
  }
}

function draw() {
  background(220);
  drawCanvas();
}

function getMousePos() {
  let position = cols * Math.floor(mouseY / gap) + Math.floor(mouseX / gap);
  return position;
}

function drawCanvas() {
  strokeWeight(1);
  let pos = 0;
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      fill(pixeldata[pos]);
      rect(x, y, gap, gap);
      pos += 1;
    }
  }
}

function mouseDragged() {
  pixeldata[getMousePos()] = colorPicker.color();
}

function mousePressed() {
  pixeldata[getMousePos()] = colorPicker.color();
}

