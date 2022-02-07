import react from "react";
import "./Tasks.css";
import TasksItem from "./TasksItem/TasksItem";
// import store from "../Store/Store";
import emitter from "../EventEmitter";
class Tasks extends react.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  checkAllTodos() {
    emitter.emit("event:change-all-checkboxes");
  }

  filterTodos() {
    let newState = [];

    if (this.props.data.filterType === "all") {
      newState = this.props.data.todos;
    } else if (this.props.data.filterType === "active") {
      newState = this.props.data.todos.filter(
        (item) => item.completed === false
      );
    } else if (this.props.data.filterType === "completed") {
      newState = this.props.data.todos.filter(
        (item) => item.completed === true
      );
    }

    return newState;
  }

  render() {
    return (
      <section
        className={
          this.props.data.todos.length === 0 ? "tasks" : "tasks active"
        }
      >
        <button
          className={
            this.props.data.todos.length !== 0 &&
            this.props.data.todos.every((item) => item.completed === true)
              ? "check-all active "
              : "check-all"
          }
          onClick={(e) => this.checkAllTodos()}
        >
          <p className="check-all__arrow">❯</p>
        </button>
        <div className="todos-tasks">
          <ul className="todos-list">
            {this.filterTodos().map((item) => (
              <TasksItem todo={item} key={item.id} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default Tasks;
