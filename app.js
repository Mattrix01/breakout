const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;

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
//all my blocks
const blocks = [new Block(10, 270)];

console.log(blocks[0]);
// drawing all blocks
function addBLocks() {
  for (let i = 0; i < blocks.length; i++) {
    // created a div and stored as block
    const block = document.createElement("div");
    // added my block class to block div created above
    block.classList.add("block");
    //go into blocks array and find first item
    block.style.left = blocks[i].bottomLeft[0];
    block.style.bottom = "50px";
    grid.appendChild(block);
  }
}

addBLocks();
