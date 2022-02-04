import react from "react";
import "./Tasks.css";
import TasksItem from "./TasksItem/TasksItem";
// import store from "../Store/Store";
import emitter from "../EventEmitter";
class Tasks extends react.Component {
  constructor(props) {
    super(props);
    // console.log(props.props);
    this.state = { todos: props.props };
  }

  componentDidMount() {
    emitter.subscribe("event:add-item", (data) =>
      this.setState({ todos: this.props.props })
    );
  }

  render() {
    return (
      <section className="tasks active">
        <button className="check-all">
          <p className="chek-all__arrow">❯</p>
        </button>
        <div className="todos-tasks">
          <ul className="todos-list">
            {this.state.todos.map((item) => (
              <TasksItem todo={item} key={item.id} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default Tasks;
