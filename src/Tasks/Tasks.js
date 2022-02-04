import react from "react";
import "./Tasks.css";
import TasksItem from "./TasksItem/TasksItem";
// import store from "../Store/Store";
import emitter from "../EventEmitter";
class Tasks extends react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkAllTodos() {
    emitter.emit("event:change-all-checkboxes");
    // if (this.className === "check-all") {
    //   this.className = "check-all active";
    // } else {
    //   this.className = "check-all";
    // }
  }

  toggleArrow() {
    let className = "check-all";

    if (
      this.props.todos.length !== 0 &&
      this.props.todos.every((item) => item.completed === true)
    ) {
      className = "check-all active";
      return className;
    } else return className;
  }

  render() {
    return (
      <section className="tasks active">
        <button
          className={this.toggleArrow()}
          onClick={(e) => this.checkAllTodos()}
        >
          <p className="check-all__arrow">❯</p>
        </button>
        <div className="todos-tasks">
          <ul className="todos-list">
            {this.props.todos.map((item) => (
              <TasksItem todo={item} key={item.id} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default Tasks;
