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

  render() {
    return (
      <section className="tasks active">
        <button className="check-all">
          <p className="chek-all__arrow">❯</p>
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
