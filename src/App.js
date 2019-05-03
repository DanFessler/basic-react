import React, { Component } from "react";
import "./App.css";
import Plugin from "./plugins/testPlugin.js";
import basic from "jsbasic";

const program = `
  i:0
  update
    fillCanvas("hsla("+(i%360)+",100%,50%,0.1)")
    i:i+1
    'drawCircle(getMouseX,getMouseY,50-10*getMouseButton,"hsl("+((i*2)%360)+",100%,50%)")
    drawGrid(getMouseX,getMouseY, 20, 10, "hsl("+((i*2)%360)+",100%,50%)")
  endupdate

  function drawGrid(x,y,w,h, color)
    for thisy:0 to h-1
      for thisx:0 to w-1
        s: sin((i+(thisx-w/2)*(thisy-h/2))/5)*5+10
        drawCircle(x + thisx*40 - (w-1)*40/2, y + thisy*40 - (h-1)*40/2, s, color)
      next
    next
  endfunction
`;

class App extends Component {
  componentDidMount() {
    let plugin = new Plugin("canvas");
    basic.import(plugin.getFunctions());
    basic.run(program);
    this.refs.canvasRef.width = window.innerWidth;
    this.refs.canvasRef.height = window.innerHeight;
  }
  render() {
    return (
      <div className="App">
        <canvas id="canvas" width="1000" height="1000" ref="canvasRef" />
      </div>
    );
  }
}

export default App;
