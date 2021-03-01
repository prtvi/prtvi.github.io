let canvas = document.getElementById("canv");
let msgImage = null;
let coverImage = null;

function upload(idd) {
  if (idd == "msgfile") {
    let file = document.getElementById(idd);
    msgImage = new SimpleImage(file);
  } else {
    let file = document.getElementById(idd);
    coverImage = new SimpleImage(file);
  }
}

function display(output) {
  output.drawTo(canvas);
}

function chop2hide(image) {
  for (let px of image.values()) {
    px.setRed(Math.floor(px.getRed() / 16) * 16);
    px.setGreen(Math.floor(px.getGreen() / 16) * 16);
    px.setBlue(Math.floor(px.getBlue() / 16) * 16);
  }
  return image;
}

function shift(image) {
  for (let px of image.values()) {
    px.setRed(Math.floor(px.getRed() / 16));
    px.setGreen(Math.floor(px.getGreen() / 16));
    px.setBlue(Math.floor(px.getBlue() / 16));
  }
  return image;
}

function combine(start, hide) {
  let output = new SimpleImage(start.getWidth(), start.getHeight());
  for (let pixel of output.values()) {
    let x = pixel.getX();
    let y = pixel.getY();
    let startPixel = start.getPixel(x, y);
    let hidePixel = hide.getPixel(x, y);
    pixel.setRed(startPixel.getRed() + hidePixel.getRed());
    pixel.setGreen(startPixel.getGreen() + hidePixel.getGreen());
    pixel.setBlue(startPixel.getBlue() + hidePixel.getBlue());
  }
  return output;
}

function show() {
  if (coverImage == null || msgImage == null) {
    alert("Images not uploaded.");
  } else if (
    coverImage.getWidth() != msgImage.getWidth() ||
    coverImage.getHeight() != msgImage.getHeight()
  ) {
    alert(
      "Dimensions do not match. Make sure you upload images with same dimensions."
    );
  } else {
    coverImage = chop2hide(coverImage);
    msgImage = shift(msgImage);
    let output = combine(coverImage, msgImage);
    display(output);
  }
}
