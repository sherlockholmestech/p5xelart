const gap = 20;

let cnv;
let mode;
let cols, rows;
let pixeldata = [];

function setup() {
  cnv = createCanvas(findOptimalCanvasSize(), findOptimalCanvasSize());
  cnv.elt.addEventListener("contextmenu", (e) => e.preventDefault())
  centerCanvas();
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(0, height + 5);
  cols = width / gap;
  rows = height / gap;
  for (let i = 0; i < (rows * cols); i++) {
    if (i % 2 == 0) {
      pixeldata.push(color('#ffffff'));
    } else {
      pixeldata.push(color('#d9d9d9'))
    }
  }
}

function draw() {
  background(220);
  drawCanvas();
}

//mousey shenanigans
function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (mouseButton == LEFT) {
      pixeldata[getMousePos()] = colorPicker.color();
    } else if (mouseButton == RIGHT) {
      if (getMousePos() % 2 == 0) {
        pixeldata[getMousePos()] = color('#ffffff');
      } else {
        pixeldata[getMousePos()] = color('#d9d9d9');
      }
    }
  }
}

//more mousey shenanigans
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (mouseButton == LEFT) {
      pixeldata[getMousePos()] = colorPicker.color();
    } else if (mouseButton == RIGHT) {
      if (getMousePos() % 2 == 0) {
        pixeldata[getMousePos()] = color('#ffffff');
      } else {
        pixeldata[getMousePos()] = color('#d9d9d9');
      }
    }
  }
}

/*
  THE FOLLOWING FUNCTIONS ARE ALL DRAWING FUNCTIONS
*/

// main drawing part here
function drawCanvas() {
	strokeWeight(0);
	let pos = 0;
	for (let y = 0; y < height; y += gap) {
	  for (let x = 0; x < width; x += gap) {
		fill(pixeldata[pos]);
		rect(x, y, gap, gap);
		pos += 1;
	  }
	}
}

/*
  THE FOLLOWING FUNCTIONS ARE ALL UTILITY FUNCTIONS
*/

// gets the position of the mouse and returns it as a index in the pixeldata array
function getMousePos() {
	let position = cols * Math.floor(mouseY / gap) + Math.floor(mouseX / gap);
	return position;
}

//square canvas cuz rectangular canvases are unsupported, also makes my life more easy
function findOptimalCanvasSize() {
	let maxSize = (windowWidth < windowHeight)? windowWidth : windowHeight;
	maxSize -= 150;
	for (i = maxSize; i > 0; i--) {
	  if (i % gap == 0) {
		return i;
	  }
	}
}
  
//center ze canvas
function centerCanvas() {
	let x = (windowWidth - width) / 2;
	let y = 100;
	cnv.position(x, y);
}

//Bresenham's line algorithm to fill in empty spaces
function bresenham(x0, y0, x1, y1) {
  let points = [];
  let dx = x1 - x0;
  let dy = y1 - y0;
  let D = 2 * dy - dx;
  let y = y0;

  for (let x = x0; x < x1; x++) {
    points.push([x, y]);
    if (D > 0) {
      y = y + 1;
      D = D - 2 * dx;
    }
    D = D + 2 * dy;
  }
  return points;
}