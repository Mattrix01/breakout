const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

// where user block starts
const userStart = [230, 10];
// tracking user
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;

// create block
// passing through 2 values to figure out where our block goes starting form the left.
class Block {
  constructor(xAxis, yAxis) {
    // bottom left the anchor point
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.topLeft = [xAxis, yAxis + blockHeight];
  }
}

//all my blocks, how ever many we add we create, 15 below.
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// drawing all blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    // created a div and stored as block
    const block = document.createElement("div");
    // added my block class to block div created above
    block.classList.add("block");
    //go into blocks array and find first item
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
    console.log(blocks[i].bottomLeft);
  }
}

//add user
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
drawUser();

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

//move user
function moveUser(e) {
  // listening to an event of keys of arrow left or right.
  switch (e.key) {
    // if value of arrow left we move current position below
    case "ArrowLeft":
      // if statement to stop from going off screen
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        console.log(currentPosition[0] > 0);
        drawUser();
      }
      break;
    case "ArrowRight":
      // if statement to stop from going off screen
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        console.log(currentPosition[0]);
        drawUser();
      }
      break;
  }
}
// everytime hear a mouse down, invoke moveUser function, then see if key arrow left etc
document.addEventListener("keydown", moveUser);

//draw the user in function because using the positioning often
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//draw the ball function
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, 30);

//check for collisions
function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = "You Win!";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }
  // check for wall hits
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter
  ) {
    changeDirection();
  }

  //check for user collision
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  //game over check
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You lose!";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
