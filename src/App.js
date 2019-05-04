import React, { Component } from "react";
import "./App.css";
import Plugin from "./plugins/testPlugin.js";
import basic from "jsbasic";

class App extends Component {
  state = {
    program: "poop",
    playing: true
  };

  componentWillMount() {
    fetch("./programs/test.bas")
      .then(r => r.text())
      .then(program => {
        let plugin = new Plugin("canvas");
        basic.import(plugin.getFunctions());
        basic.run(program);
        this.setState({ program: program });
      });
  }

  handleSourceChange = e => {
    if (this.state.playing) {
      this.setState({ playing: false });
      basic.stop();
    }
    this.setState({ program: e.target.value });
  };

  handlePlay = () => {
    if (this.state.playing) {
      this.setState({ playing: false });
      basic.stop();
    } else {
      this.setState({ playing: true });
      basic.run(this.state.program);
    }
  };

  render() {
    return (
      <div className="App">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <canvas
            id="canvas"
            width="800"
            height="600"
            ref="canvasRef"
            // style={{ boxShadow: "0 2px 10px black" }}
          />
          <div
            style={{
              display: "flex",
              // justifyContent: "flex-end",
              color: "#ccc",
              margingBottom: 1,
              backgroundColor: "#222"
            }}
          >
            <div style={{ padding: 8 }}>Main.bas</div>
            <div style={{ flexGrow: 1 }} />
            <button
              value={this.state.playing ? "Stop" : "Play"}
              onClick={this.handlePlay}
              style={{
                display: "block",
                padding: 8,
                border: 0,
                backgroundColor: "transparent",
                borderLeft: "1px solid #1a1a1a",
                cursor: "pointer",
                color: "inherit"
              }}
            >
              {this.state.playing ? "Stop" : "Play"}
            </button>
          </div>
          <div style={{ width: 800, flexGrow: 1 }}>
            <textarea
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              style={{
                boxSizing: "border-box",
                width: "100%",
                height: "100%",
                resize: "none",
                display: "block",
                padding: 10,
                margin: 0,
                border: 0,
                backgroundColor: "#1a1a1a",
                fontFamily: "monospace",
                color: "#aaa"
              }}
              value={this.state.program}
              onChange={this.handleSourceChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
