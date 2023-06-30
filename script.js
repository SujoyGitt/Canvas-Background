let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

//creating circle function
function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
  //draw circle
  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  //update circle values x/y direction and width/height
  this.update = () => {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    //inneractivicy
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < 40) {
        this.radius += 1;
      }
    } else if (this.radius > 2) {
      this.radius -= 1;
    }
    this.draw();
  };
}
//create empty array
let circleArray = [];
//creting multiple circle using loop
for (let i = 0; i < 600; i++) {
  let radius = Math.floor(Math.random() * 3);
  let x = Math.random() * (canvas.width - radius * 2) + radius;
  let y = Math.random() * (canvas.height - radius * 2) + radius;
  let dx = Math.floor((Math.random() - 0.5) * 3);
  let dy = Math.floor((Math.random() - 0.5) * 3);
  let Color = ["a", "b", "c", "d", "e", "f",0, 1, 2, 3, 4, 5, 6];
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor = randomColor + Math.floor(Math.random() * Color.length);
  }
  //store all circle in empty array
  circleArray.push(new Circle(x, y, dx, dy, radius, randomColor));
}
//animation function
let animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //run all circle using circleArray with loop
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
};
animate();
