import React from "react";
import "./Input.css";
// import emitter from "../EventEmitter";
import { connect } from "react-redux";
import { createTodo } from "../redux/actions"
import { v4 as uuidv4 } from "uuid";

type PropsType = {
  createTodo: any
};

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

      this.setState({
        inputValue: "",
      });

      this.props.createTodo({
        title: (e.target as HTMLInputElement).value,
        todo_id: uuidv4(),
        completed: false
      })
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

const mapDispatchToProps = {
  createTodo
}
export default connect(null, mapDispatchToProps)(Input);
