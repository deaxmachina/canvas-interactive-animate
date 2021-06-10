const canvas = document.querySelector("canvas")

const devicePixelRatio = window.devicePixelRatio || 1;

canvas.width = window.innerWidth * devicePixelRatio
canvas.height = window.innerHeight * devicePixelRatio


const c = canvas.getContext('2d');

/// Add event on mouse move ///
let mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', event => {
  // get mouse position
  mouse.x = event.x;
  mouse.y = event.y;
})

/// for responsiveness ///
window.addEventListener('resize', event => {
  canvas.width = window.innerWidth * devicePixelRatio
  canvas.height = window.innerHeight * devicePixelRatio
  init()
})

/// Constants ///
const maxRadius = 90;
const minRadius = 2;
const colourArray = [
  "#006466",
  "#0b525b",
  "#1b3a4b",
  "#272640",
  "#3e1f47"
]

/// Circle class with the circle def and movement def ///
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.colour = colourArray[Math.floor(Math.random()*colourArray.length)]

  this.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false)
    //c.fillStyle = this.colour;
    //c.fill()
    c.strokeStyle = this.colour;
    //c.lineWidth = 2;
    c.stroke()
  }

  this.update = function() {
    // handle the circle hitting the edges of the screen 
    // we want it to reverse direction each time that happens
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx // 1px per frame 
    this.y += this.dy

    // interactivity 
    // get the ditance between the mouse and the circle position 
    if (
      mouse.x - this.x < 50 && 
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius +=1
        }
        
    } else if (this.radius > minRadius) {
      this.radius -=1
    }

    // within the update function we need to call the draw function 
    // to get the circle drawn again
    this.draw()
  }
}

// init the data
let circleArray = [];
function init() {
  circleArray = [] // to reset the array
  // create a bunch of random circles 
  for (let i = 0; i < 6000; i++) {
    const radius = Math.floor(Math.random() * 3) + 1;
    const x = Math.random() * (window.innerWidth - radius*2) + radius;
    const y = Math.random() * (window.innerHeight - radius*2) + radius;
    const dx = (Math.random() - 0.5) * 1;
    const dy = (Math.random() - 0.5) * 1;
    
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

/// the animation function -- it is a loop ///
function animate() {
  // clear the canvas 
  c.clearRect(0, 0, window.innerWidth, window.innerHeight)
  // this will start the animation 
  requestAnimationFrame(animate)
  // this is what we want to animate - the circles
  for (circle of circleArray) {
    circle.update()
  }
}

init()
animate()
