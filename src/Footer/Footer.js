import react from "react";
import "./Footer.css";
import Filter from "./Filter/Filter";
import emitter from "../EventEmitter";

class Footer extends react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setCountActiveTodos() {
    const allTodos = this.props.data.todos;

    const todosCount = allTodos.filter((item) => item.completed === false);

    return todosCount.length;
  }

  deleteAllCheckedTodos() {
    emitter.emit("event:delete-all-checked");
  }

  render() {
    return (
      <footer
        className={
          this.props.data.todos.length === 0 ? "footer" : "footer active"
        }
      >
        <span className="todo-count">
          <span className="todo-count__number">
            {this.setCountActiveTodos() + " "}
          </span>
          <span className="todo-count__name">item </span>
          left
        </span>
        <Filter />
        <button
          className="delete-checked"
          onClick={(e) => this.deleteAllCheckedTodos()}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
