import React from "react";
import "./Input.css";
import emitter from "../EventEmitter";

type PropsType = {};

type StateType = {
  inputValue: string;
};

class Input extends React.Component<PropsType, StateType> {
  state: StateType;
  constructor(props: PropsType) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleClick(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
      emitter.emit("event:add-item-DB", {
        title: (e.target as HTMLInputElement).value,
      });
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
          onKeyDown={this.handleClick.bind(this)}
          type="text"
          className="todo__input"
          placeholder="What needs to be done?"
          value={this.state.inputValue}
          onChange={this.handleChange.bind(this)}
        />
      </header>
    );
  }
}
export default Input;
