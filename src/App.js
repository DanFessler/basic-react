import React, { Component } from "react";
import "./App.css";
import Plugin from "./plugins/testPlugin.js";
import basic from "jsbasic";
import { withContentRect } from "react-measure";
import PanelGroup from "react-panelgroup";
import { PlayIcon, StopIcon } from "./icons";

class App extends Component {
  state = {
    program: "poop",
    playing: true,
    test: true,
    panelWidths: [{ size: 800, minSize: 320, resize: "dynamic" }]
  };

  componentDidMount() {
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
        <PanelGroup
          panelWidths={this.state.panelWidths}
          onUpdate={panels => this.setState({ panelWidths: panels })}
        >
          <div style={{ flexGrow: 1 }}>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                // justifyContent: "flex-end",
                color: "#ccc",
                margingBottom: 1,
                backgroundColor: "#222",
                height: 40
              }}
            >
              <div style={{ padding: 8 }}>Basic.js</div>
              <div style={{ flexGrow: 1 }} />
              <div
                value={this.state.playing ? "Stop" : "Play"}
                onClick={this.handlePlay}
                style={{
                  width: 40,
                  border: 0,
                  backgroundColor: "transparent",
                  borderLeft: "1px solid #1a1a1a",
                  cursor: "pointer",
                  color: "inherit",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.state.playing ? (
                  <StopIcon style={{ fill: "#bbb", height: 14 }} />
                ) : (
                  <PlayIcon style={{ fill: "#bbb", height: 16 }} />
                )}
              </div>
            </div>
            <textarea
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              cols="1000"
              style={{
                display: "block",
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
          <Canvas />
        </PanelGroup>
      </div>
    );
  }
}

const Canvas = withContentRect("bounds")(
  ({ measureRef, measure, contentRect }) => {
    return (
      <canvas
        id="canvas"
        width={contentRect.bounds.width}
        height={contentRect.bounds.height}
        ref={measureRef}
        style={{
          display: "block",
          width: "100%"
          // backgroundColor: "blue"
        }}
      />
    );
  }
);

export default App;
