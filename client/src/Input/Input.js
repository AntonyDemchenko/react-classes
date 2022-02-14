import React from "react";
import "./Input.css";
import emitter from "../EventEmitter";

class Input extends React.Component {
  constructor() {
    super();
    this.state = { inputValue: "" };
  }

  // componentDidMount() {
  //   emitter.subscribe("event:add-item", (data) => this.addNewItem(data));
  // }

  async addNewItemDB(data) {
    const newData = JSON.stringify({ title: data });
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    });

    // data.title = " ";
    await this.setState({
      inputValue: "",
    });
    return response.json();
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleClick(e) {
    if (e.keyCode === 13 && e.target.value.trim()) {
      this.addNewItemDB(e.target.value).then((data) => {
        // console.log("RES 3", data);

        emitter.emit("event:add-item", {
          title: data.title,
          todo_id: data.todo_id,
          completed: data.completed,
        });
      });
    }
  }

  render() {
    return (
      <header>
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
