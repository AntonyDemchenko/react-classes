import React from "react";
import "./TasksItem.css";
// import emitter from "../../EventEmitter";
import { connect } from "react-redux";
import { deleteTodo, checkTodo } from "../../redux/actions"

type TodoType = {
  title: string;
  todo_id: string;
  completed: boolean;
};

type PropsType = {
  todo: TodoType;
  deleteTodo: any;
  checkTodo: any;
  ownProps?: any
};

type StateType = {
  item: TodoType;
};

class TasksItem extends React.Component<PropsType, StateType> {
  state: StateType;
  constructor(props: PropsType) {
    super(props);

    this.state = { item: this.props.ownProps.todo };
  }

  handleClickDelete(event: React.MouseEvent<HTMLButtonElement>): void {
    this.props.deleteTodo(this.state.item.todo_id)

  }

  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {

    // emitter.emit("event:change-checkbox", {
    //   id: this.state.item.todo_id,
    //   completed: this.state.item.completed,
    // });

    this.props.checkTodo(this.state.item.todo_id, this.state.item.completed)
    this.setState({ item: this.props.ownProps.todo })

  }

  render() {
    // console.log(this.props.ownProps.todo.completed)
    return (
      <li className="todos__item" item-id={this.state.item.todo_id}>
        <input
          className="todos__toggle"
          type="checkbox"
          checked={this.props.ownProps.todo.completed}
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

const mapDispatchToProps = {
  deleteTodo,
  checkTodo,
}

const mapStateToProps: any = (state: any, ownProps: any) => {
  // console.log("------", ownProps)

  return {
    state,
    ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksItem);
