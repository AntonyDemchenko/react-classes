import React from "react";
import "./Footer.css";
import Filter from "./Filter/Filter";
import emitter from "../EventEmitter";

type TodoType = {
  title: string;
  todo_id: string;
  completed: boolean;
};

type PropsType = {
  todos: Array<TodoType>;
  filterType: string;
  username: string;
};

class Footer extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    console.log(props);
  }

  setCountActiveTodos(): number {
    const allTodos = this.props.todos;

    const todosCount = allTodos.filter((item) => item.completed === false);

    return todosCount.length;
  }

  deleteAllCheckedTodos(): void {
    emitter.emit("event:delete-all-checked");
  }

  render() {
    console.log("ssssssssssssssssssssss");
    return (
      <footer
        className={this.props.todos.length === 0 ? "footer" : "footer active"}
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
