let canvasMaxX = window.innerWidth / 1.4;
let canvasMaxY = window.innerHeight / 1.6;

let strips = [];
let stripWidth = 3;

// let slider = document.getElementById("range");

let clicked = 0;
let i = 0;

function mouseClicked() {
  if (
    clicked == 0 &&
    mouseX > 0 &&
    mouseX < canvasMaxX &&
    mouseY > 0 &&
    mouseY < canvasMaxY
  ) {
    clicked = 1;
  } else {
    clicked = 0;
  }
}

function swap(arr, a, b) {
  let temp = arr[a][1];
  arr[a][1] = arr[b][1];
  arr[b][1] = temp;
}

function setup() {
  createCanvas(canvasMaxX, canvasMaxY);
  for (let i = stripWidth; i < canvasMaxX; i += stripWidth) {
    strips.push([i, random(5, canvasMaxY - 5)]);
  }
}

// function begin() {}

// slider.oninput = function () {
//   stripWidth = this.value;
//   strips = [];
//   begin();
//   print(stripWidth);
//   loop();
// };

function draw() {
  background(215);

  // if (strips.length == 0) {
  //   begin();
  // }

  if (clicked == 1) {
    if (i < strips.length) {
      for (let j = 0; j < strips.length - i - 1; j++) {
        let a = strips[j][1];
        let b = strips[j + 1][1];
        if (a > b) {
          swap(strips, j, j + 1);
        }
      }
    } else {
      console.log("Finished");
      noLoop();
    }
    i++;
  }

  for (let i = 0; i < strips.length; i++) {
    stroke(0);
    strokeWeight(stripWidth);
    line(strips[i][0], canvasMaxY, strips[i][0], canvasMaxY - strips[i][1]);
  }
}
