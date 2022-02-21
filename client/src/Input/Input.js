import React from "react";
import "./Input.css";
import emitter from "../EventEmitter";
import { emit } from "process";

class Input extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: "" };
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleClick(e) {
    if (e.keyCode === 13 && e.target.value.trim()) {
      emitter.emit("event:add-item-DB", { title: e.target.value });
      this.setState({
        inputValue: "",
      });
    }
  }

  render() {
    return (
      <header className="input-header">
        <h1 className="main-title">todos</h1>
        <input
          onKeyDown={(e) => this.handleClick(e)}
          type="text"
          className="todo__input"
          placeholder="What needs to be done?"
          value={this.state.inputValue}
          onChange={(event) => this.handleChange(event)}
        />
      </header>
    );
  }
}
export default Input;
