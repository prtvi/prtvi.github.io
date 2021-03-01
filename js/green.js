let canvas = document.getElementById("canv");
let fgImage = null;
let bgImage = null;

function upload(idd) {
  if (idd == "fgfile") {
    let file = document.getElementById(idd);
    fgImage = new SimpleImage(file);
  } else {
    let file = document.getElementById(idd);
    bgImage = new SimpleImage(file);
  }
}

function display(output) {
  output.drawTo(canvas);
}

function composite() {
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var greenThreshold = 200;
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      var bgPixel = bgImage.getPixel(x, y);
      output.setPixel(x, y, bgPixel);
    } else {
      output.setPixel(x, y, pixel);
    }
  }
  return output;
}

function show() {
  if (fgImage == null || bgImage == null) {
    alert("Images not uploaded.");
  } else if (
    fgImage.getWidth() != bgImage.getWidth() ||
    fgImage.getHeight() != bgImage.getHeight()
  ) {
    alert(
      "Dimensions do not match. Make sure you upload images with same dimensions."
    );
  } else {
    var output = composite();
    display(output);
  }
}
