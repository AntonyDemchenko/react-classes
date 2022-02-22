import React from "react";
import "./TasksItem.css";
import emitter from "../../EventEmitter";

type TodoType = {
  title: string;
  todo_id: string;
  completed: boolean;
};

type PropsType = {
  todo: TodoType;
};

type StateType = {
  item: TodoType;
};

class TasksItem extends React.Component<PropsType, StateType> {
  state: StateType;
  constructor(props: PropsType) {
    super(props);

    this.state = { item: props.todo };
  }

  handleClickDelete(event: React.MouseEvent<HTMLButtonElement>): void {
    emitter.emit("event:delete-item", {
      id: this.state.item.todo_id,
    });
  }

  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    emitter.emit("event:change-checkbox", {
      id: this.state.item.todo_id,
      completed: this.state.item.completed,
    });
  }

  render() {
    return (
      <li className="todos__item" item-id={this.state.item.todo_id}>
        <input
          className="todos__toggle"
          type="checkbox"
          checked={this.state.item.completed}
          onChange={this.handleOnChange.bind(this)}
        ></input>
        <p className="todos__title">{this.state.item.title}</p>
        <button
          className="todos__delete"
          onClick={this.handleClickDelete.bind(this)}
        >
          &#215;
        </button>
      </li>
    );
  }
}

export default TasksItem;
