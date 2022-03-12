import React from "react";
import "./Footer.css";
import Filter from "./Filter/Filter";
// import emitter from "../EventEmitter";
import { connect } from "react-redux";
import { deleteAllChecked } from "../redux/actions";

type TodoType = {
  title: string;
  todo_id: string;
  completed: boolean;
};

type PropsType = {
  todos: Array<TodoType>;
  filterType: string;
  // username: string;
  deleteAllChecked: any;
  ownProps?: any
};

class Footer extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    // console.log(this.props)
  }

  setCountActiveTodos(): number {
    const allTodos = this.props.todos;

    const todosCount = allTodos.filter((item) => item.completed === false);

    return todosCount.length;
  }

  deleteAllCheckedTodos(): void {
    // emitter.emit("event:delete-all-checked");
    this.props.deleteAllChecked()
  }

  render() {
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

const mapDispatchToProps = {
  deleteAllChecked
}

const mapStateToProps = (state: any) => {
  // console.log("------", state)
  return {
    todos: state.todo.todos,
    filterType: state.todo.filterType
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
