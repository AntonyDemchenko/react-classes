import react from "react";
import "./TasksItem.css";
import emitter from "../../EventEmitter";
class TasksItem extends react.Component {
  constructor(props) {
    super(props);

    this.state = { item: props.todo };
  }

  handleClickDelete(e) {
    emitter.emit("event:delete-item", {
      id: e.target.closest("li").getAttribute("item-id"),
    });
  }

  handleOnChange(e) {
    emitter.emit("event:change-checkbox", {
      id: e.target.closest("li").getAttribute("item-id"),
    });
  }

  render() {
    return (
      <li className="todos__item" item-id={this.state.item.id}>
        <input
          className="todos__toggle"
          type="checkbox"
          checked={this.state.item.completed}
          onChange={(e) => {
            this.handleOnChange(e);
            e.stopPropagation();
          }}
        ></input>
        <p className="todos__title">{this.state.item.title}</p>
        <button
          onClick={(e) => {
            this.handleClickDelete(e);
            e.stopPropagation();
          }}
          className="todos__delete"
        >
          &#215;
        </button>
      </li>
    );
  }
}

export default TasksItem;
