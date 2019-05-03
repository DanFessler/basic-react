export default class Plugin {
  constructor(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext("2d");

    this.mouseState = {
      x: 0,
      y: 0,
      button: 0
    };

    window.onmousemove = e => {
      let rect = this.canvas.getBoundingClientRect();
      this.mouseState.x = e.clientX - rect.left;
      this.mouseState.y = e.clientY - rect.top;
    };

    this.canvas.onmousedown = e => {
      this.mouseState.button = e.buttons;
    };

    this.canvas.onmouseup = e => {
      this.mouseState.button = e.buttons;
    };
  }

  getFunctions() {
    return {
      shapoopie: () => console.log("The girl who's hard to get!"),
      alert: message => alert(message),
      drawCircle: (x, y, r, color) => {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 360);
        this.ctx.fill();
      },
      fillCanvas: color => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      },
      clearCanvas: () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      getMouseX: () => {
        return this.mouseState.x;
      },
      getMouseY: () => {
        return this.mouseState.y;
      },
      getMouseButton: () => {
        return this.mouseState.button;
      },
      sin: i => {
        return Math.sin(i);
      },
      cos: i => {
        return Math.cos(i);
      }
    };
  }
}
