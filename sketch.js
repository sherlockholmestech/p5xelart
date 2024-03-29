const gap = 20;

let cnv;
let mode;
let cols, rows;
let pixeldata = [];
let border = true;

function setup() {
  cnv = createCanvas(findOptimalCanvasSize(), findOptimalCanvasSize());
  cnv.elt.addEventListener("contextmenu", (e) => e.preventDefault())
  centerCanvas();
  borderswitch = createButton('Toggle Borders');
  borderswitch.position(0, 0);
  borderswitch.class('option-button');
  borderswitch.mousePressed(toggleBorders);
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(120, 0);
  colorPicker.class('colorpicker');
  saveImageButton = createButton('Save Image');
  saveImageButton.position(183, 0);
  saveImageButton.class('option-button');
  saveImageButton.mousePressed(saveImage);
  cols = width / gap;
  rows = height / gap;
  for (let i = 0; i < (rows * cols); i++) {
    pixeldata.push(color('#ffffff'));
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
      let points;
      if (pmouseX > mouseX) {
        points = bresenham(mouseX, mouseY, pmouseX, pmouseY);
      } else if (mouseX > pmouseX) {
        points = bresenham(pmouseX, pmouseY, mouseX, mouseY);
      } else if (mouseY != pmouseY && mouseX == pmouseX) {
        if (mouseY > pmouseY) {
          points = verticalLine(mouseX, pmouseY, mouseY);
        } else {
          points = verticalLine(mouseX, mouseY, pmouseY);
        }
      } else {
        points = [[mouseX, mouseY]];
      }
      for (let i = 0; i < points.length; i++) {
        pixeldata[getMousePos(points[i][0], points[i][1])] = colorPicker.color();
      }
    } else if (mouseButton == RIGHT) {
      pixeldata[getMousePos(mouseX, mouseY)] = color('#ffffff');
    }
  }
}

//more mousey shenanigans
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (mouseButton == LEFT) {
      pixeldata[getMousePos(mouseX, mouseY)] = colorPicker.color();
    } else if (mouseButton == RIGHT) {
      pixeldata[getMousePos(mouseX, mouseY)] = color('#ffffff');
    }
  }
}

/*
  THE FOLLOWING FUNCTIONS ARE ALL DRAWING FUNCTIONS
*/

// main drawing part here
function drawCanvas() {
	if (border) {
    strokeWeight(1);
  } else {
    strokeWeight(0);
  };
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
function getMousePos(x, y) {
	let position = cols * Math.floor(y / gap) + Math.floor(x / gap);
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

function verticalLine(x, y0, y1) {
  let points = [];
  for (let y = y0; y < y1; y++) {
    points.push([x, y]);
  }
  return points;
}

function toggleBorders() {
  border = !border;
}

function saveImage() {
  saveCanvas(cnv, 'image', 'png');
}