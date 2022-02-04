import react from "react";
import "./Input.css";
import emitter from "../EventEmitter";

class Input extends react.Component {
  constructor() {
    super();
    this.state = { inputValue: " " };
  }

  componentDidMount() {
    emitter.subscribe("event:add-item", (data) => this.addNewItem(data));
  }

  addNewItem(data) {
    // console.log(data.title);
    data.title = " ";
    this.setState({
      inputValue: " ",
    });
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleClick(e) {
    if (e.keyCode === 13 && e.target.value.trim()) {
      // console.log("this is:", e.target.value);
      emitter.emit("event:add-item", {
        title: e.target.value,
        // id: this.addItem().getAttribute('item-id'),
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
