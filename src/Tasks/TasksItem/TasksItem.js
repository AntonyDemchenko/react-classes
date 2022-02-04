import react from "react";
import "./TasksItem.css";
class TasksItem extends react.Component {
  constructor(props) {
    super(props);
    // console.log(props.todo);
    this.state = { item: props.todo };
  }

  render() {
    return (
      <li className="todos__item">
        <input className="todos__toggle" type="checkbox"></input>
        <p className="todos__title">{this.state.item.title}</p>
        <button className="todos__delete">&#215;</button>
      </li>
    );
  }
}

export default TasksItem;
