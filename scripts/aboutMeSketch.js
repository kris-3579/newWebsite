class randomWalker {

  constructor() {
    this.container = select(".container");
    this.x = this.container.width/2;
    this.y = this.container.height/2;

  }

  show() {
    background(255);
    strokeWeight(20);
    
    point(this.x, this.y);

  }

  step() {


    let mx = mouseX - this.x;
    let my = mouseY - this.y;

    let xDir = mx > 0.5 ? 1 : -1;
    let yDir = my > 0.5 ? 1 : -1;

    let biasX = random(1) < 0.75 ? xDir : -xDir;
    let biasY = random(1) < 0.75 ? yDir : -yDir;

    // Move and constrain the randomWalker within canvas boundaries
    this.x = constrain(this.x + biasX, 0, this.container.width - 1);
    this.y = constrain(this.y + biasY, 0, this.container.height - 1);
  }
}



let rWalker;

function setup() {
  let container = select(".container");
  let canvas = createCanvas(container.width, container.height);
  canvas.parent(container);
  //canvas.style('z-index', '-0.5'); //p5.js canvas to the backgroudn 
  
  rWalker = new randomWalker;
  background(255);

  
}


function draw() {
  rWalker.step();
  rWalker.show();
  
}

window.addEventListener("resize", ()=> {
  let container = select(".container");
  resizeCanvas(container.width, container.height);
})