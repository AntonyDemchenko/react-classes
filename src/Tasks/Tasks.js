import react from "react";
import "./Tasks.css";
import TasksItem from "./TasksItem/TasksItem";
class Tasks extends react.Component {
  state = {};
  render() {
    return (
      <section className="tasks active">
        <button className="check-all">
          <p className="chek-all__arrow">❯</p>
        </button>
        <div className="todos-tasks">
          <ul className="todos-list">
            <TasksItem />
          </ul>
        </div>
      </section>
    );
  }
}

export default Tasks;
