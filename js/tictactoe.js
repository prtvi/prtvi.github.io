let canvasMaxX = window.innerWidth / 3;
let canvasMaxY = canvasMaxX;
let segmentWidth = canvasMaxX / 3;
let segmentHeight = canvasMaxY / 3;

let positions = ["", "", "", "", "", "", "", "", "", ""];

let board = [
  [positions[1], positions[2], positions[3]],
  [positions[4], positions[5], positions[6]],
  [positions[7], positions[8], positions[9]],
];

let winner;
let players = ["X", "O"];
let human;
let comp;

let clicked = 0;
let played = 0;

function setup() {
  createCanvas(canvasMaxX, canvasMaxY);
  human = random(players);
  if (human == "X") {
    comp = "O";
  } else {
    comp = "X";
  }
}

function mouseClicked() {
  if (clicked == 0) {
    clicked = 1;
  } else {
    clicked = 0;
  }
}

function getBoardSegmentFromMousePos() {
  let x = mouseX;
  let y = mouseY;

  if (clicked == 1) {
    if (x > 0 && y > 0 && x < segmentWidth && y < segmentHeight) {
      //   console.log("segment 1");
      clicked = 0;
      return 1;
    } else if (
      x > segmentWidth &&
      x < 2 * segmentWidth &&
      y < segmentHeight &&
      y > 0
    ) {
      //   console.log("segment 2");
      clicked = 0;
      return 2;
    } else if (
      x > 2 * segmentWidth &&
      x < canvasMaxX &&
      y < segmentHeight &&
      y > 0
    ) {
      //   console.log("segment 3");
      clicked = 0;
      return 3;
    } else if (
      x > 0 &&
      x < segmentWidth &&
      y > segmentHeight &&
      y < 2 * segmentHeight
    ) {
      //   console.log("segment 4");
      clicked = 0;
      return 4;
    } else if (
      x > segmentWidth &&
      x < 2 * segmentWidth &&
      y > segmentHeight &&
      y < 2 * segmentHeight
    ) {
      //   console.log("segment 5");
      clicked = 0;
      return 5;
    } else if (
      x > 2 * segmentWidth &&
      x < canvasMaxX &&
      y > segmentHeight &&
      y < 2 * segmentHeight
    ) {
      //   console.log("segment 6");
      clicked = 0;
      return 6;
    } else if (
      x > 0 &&
      x < segmentWidth &&
      y > 2 * segmentHeight &&
      y < canvasMaxY
    ) {
      //   console.log("segment 7");
      clicked = 0;
      return 7;
    } else if (
      x > segmentWidth &&
      x < 2 * segmentWidth &&
      y > 2 * segmentHeight &&
      y < canvasMaxY
    ) {
      //   console.log("segment 8");
      clicked = 0;
      return 8;
    } else if (
      x > 2 * segmentWidth &&
      x < canvasMaxX &&
      y > 2 * segmentHeight &&
      y < canvasMaxY
    ) {
      //   console.log("segment 9");
      clicked = 0;
      return 9;
    }
  } else {
    return;
  }
}

function updateBoard(ch, pos) {
  positions[pos] = ch;
  board = [
    [positions[1], positions[2], positions[3]],
    [positions[4], positions[5], positions[6]],
    [positions[7], positions[8], positions[9]],
  ];
}

function isPosFree(pos) {
  return positions[pos] == "";
}

function isWinner(posit, ch) {
  return (
    (posit[7] == ch && posit[8] == ch && posit[9] == ch) ||
    (posit[4] == ch && posit[5] == ch && posit[6] == ch) ||
    (posit[1] == ch && posit[2] == ch && posit[3] == ch) ||
    (posit[1] == ch && posit[4] == ch && posit[7] == ch) ||
    (posit[2] == ch && posit[5] == ch && posit[8] == ch) ||
    (posit[3] == ch && posit[6] == ch && posit[9] == ch) ||
    (posit[1] == ch && posit[5] == ch && posit[9] == ch) ||
    (posit[3] == ch && posit[5] == ch && posit[7] == ch)
  );
}

function isBoardFull() {
  let count = 0;
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] == "") {
      count++;
    }
  }
  if (count >= 1) {
    return false;
  } else {
    return true;
  }
}

function compMove() {
  if (played == 1) {
    possibleMoves = [];
    for (let i = 1; i < positions.length; i++) {
      if (positions[i] == "") {
        possibleMoves[i] = i;
      }
    }

    let move = 0;
    for (let letter of players) {
      for (let m of possibleMoves) {
        //
        positionsCopy = [];
        for (let i = 1; i < positions.length; i++) {
          positionsCopy[i] = positions[i];
        }

        positionsCopy[m] = letter;

        if (isWinner(positionsCopy, letter)) {
          move = m;
          return move;
        }
      }
    }

    let cornersOpen = [];
    for (let i of possibleMoves) {
      if ([1, 3, 7, 9].includes(i)) {
        cornersOpen.push(i);
      }
    }

    if (cornersOpen.length > 0) {
      move = random(cornersOpen);
      return move;
    }

    if (possibleMoves.includes(5)) {
      move = 5;
      return move;
    }

    let edgesOpen = [];
    for (let i of possibleMoves) {
      if ([2, 4, 6, 8].includes(i)) {
        edgesOpen.push(i);
      }
    }

    if (edgesOpen.length > 0) {
      move = random(edgesOpen);
    }
    return move;
  }
}

function declareWinner(winn) {
  if (winn != null) {
    document.getElementById("winner").innerHTML = winn + " won!";
  } else {
    document.getElementById("winner").innerHTML = "Tie!";
  }
}

// function clearBoard() {
//   loop();
//   positions = ["", "", "", "", "", "", "", "", "", ""];
// }

function playerMove() {
  let pos = getBoardSegmentFromMousePos();
  if (isPosFree(pos)) {
    updateBoard(human, pos);
    played = 1;
  }
}

function putCompMove(pos) {
  updateBoard(comp, pos);
  played = 0;
}


function draw() {
  background(240);
  // print(positions);

  if (!isBoardFull()) {
    if (!isWinner(positions, human)) {
      playerMove();
    } else if (isWinner(positions, human)) {
      winner = human;
      noLoop();
      declareWinner(winner);
      // console.log(winner);
    }

    if (!isWinner(positions, comp)) {
      let move = compMove();
      if (move == 0) {
        winner = null;
        noLoop();
        declareWinner(winner);
        // console.log(winner);
      } else {
        putCompMove(move);
      }
    } else if (isWinner(positions, comp)) {
      winner = comp;
      noLoop();
      declareWinner(winner);
      // console.log(winner);
    }
  } else if (isWinner(positions, human)) {
    winner = human;
    noLoop();
    declareWinner(winner);
    // console.log(winner);
  } else if (isWinner(positions, comp)) {
    winner = comp;
    noLoop();
    declareWinner(winner);
  } else {
    winner = null;
    noLoop();
    declareWinner(winner);
    // console.log(winner);
  }

  //   drawing the grid
  stroke(0);
  strokeWeight(5);
  line(segmentWidth, 5, segmentWidth, canvasMaxY - 5);
  line(2 * segmentWidth, 5, 2 * segmentWidth, canvasMaxY - 5);
  line(5, segmentWidth, canvasMaxX - 5, segmentWidth);
  line(5, 2 * segmentWidth, canvasMaxX - 5, 2 * segmentWidth);

  // printing moves on the grid
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let ch = board[j][i];
      noFill();
      stroke(0);
      strokeWeight(3);

      if (ch == players[1]) {
        //   an offset of "(segmentWidth) / 2" to get center of each segment of board
        let x = i * segmentWidth + segmentWidth / 2;
        let y = j * segmentHeight + segmentHeight / 2;

        ellipse(x, y, segmentWidth - 50);
      } else if (ch == players[0]) {
        //   an offset of 25 to draw 'X's inside of segment
        let offset = 30;

        let x1 = i * segmentWidth + offset;
        let y1 = j * segmentHeight + offset;

        let x2 = i * segmentWidth;
        let y2 = (j + 1) * segmentHeight;

        line(
          x1,
          y1,
          x1 + segmentWidth - 2 * offset,
          y1 + segmentHeight - 2 * offset
        );

        line(
          x2 + offset,
          y2 - offset,
          x2 + segmentWidth - offset,
          y2 - segmentHeight + offset
        );
      }
    }
  }
}
