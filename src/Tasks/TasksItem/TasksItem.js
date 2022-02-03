import react from "react";
import "./TasksItem.css";
class TasksItem extends react.Component {
  state = {};
  render() {
    return (
      <li className="todos__item">
        <input className="todos__toggle" type="checkbox"></input>
        <p className="todos__title">qqq11111111111111</p>
        <button className="todos__delete">&#215;</button>
      </li>
    );
  }
}

export default TasksItem;
