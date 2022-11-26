const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;

// where user block starts
const userStart = [230, 10];
// tracking user
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// create block
// passing through 2 values to figure out where our block goes starting form the left.
class Block {
  constructor(xAxis, yAxis) {
    // bottom left the anchor point
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockHeight, yAxis + blockHeight];
  }
}
//all my blocks, how ever many we add we create, 15 below.
const blocks = [
  new Block(10, 270),
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
function addBLocks() {
  for (let i = 0; i < blocks.length; i++) {
    // created a div and stored as block
    const block = document.createElement("div");
    // added my block class to block div created above
    block.classList.add("block");
    //go into blocks array and find first item
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBLocks();

//add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

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

//move user
function moveUser(e) {
  // listening to an event of keys of arrow left or right.
  switch (e.key) {
    // if value of arrow left we move current position below
    case "ArrowLeft":
      // if statement to stop from going off screen
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      // if statement to stop from going off screen
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

// everytime hear a mouse down, invoke moveUser function, then see if key arrow left etc
document.addEventListener("keydown", moveUser);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
// putting ball inside the parent with appendChild
grid.appendChild(ball);

//moving ball
function moveBall() {
  ballCurrentPosition[0] += 2;
  ballCurrentPosition[1] += 2;
  drawBall();
}

// every 30ms move ball
setInterval(moveBall, 30);
