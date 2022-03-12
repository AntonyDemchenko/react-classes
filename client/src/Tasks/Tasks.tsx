import React from "react";
import "./Tasks.css";
import TasksItem from "./TasksItem/TasksItem";
// import emitter from "../EventEmitter";
import { connect } from "react-redux";
import { checkAllTodos } from "../redux/actions"


type PropsType = {
  todos: Array<TodoType>;
  filterType: string;
  checkAllTodos: any
};

type TodoType = {
  title: string;
  todo_id: string;
  completed: boolean;
};
type StateType = {
  todos: Array<TodoType>;
};

class Tasks extends React.Component<PropsType, StateType> {
  state: StateType;
  constructor(props: PropsType) {
    super(props);

    this.state = { todos: this.props.todos };

  }

  checkAllTodos() {
    if (this.props.todos.every((item) => item.completed === true)) {
      this.props.checkAllTodos(false)
      this.setState({ todos: this.props.todos })
    } else {
      this.props.checkAllTodos(true)
      this.setState({ todos: this.props.todos })
    };

  }


  filterTodos(): StateType {
    let newState: StateType = { todos: [] };

    const filterType = this.props.filterType;
    const todosList = this.props.todos;

    if (filterType === "all") {
      newState.todos = todosList;
    } else if (filterType === "active") {
      newState.todos = todosList.filter((item) => item.completed === false);
    } else if (filterType === "completed") {
      newState.todos = todosList.filter((item) => item.completed === true);
    }
    return newState;
  }

  render() {

    return (
      <section
        className={this.props.todos.length === 0 ? "tasks" : "tasks active"}
      >
        <button
          className={
            this.props.todos.length !== 0 &&
              this.props.todos.every((item) => item.completed === true)
              ? "check-all active "
              : "check-all"
          }
          onClick={this.checkAllTodos.bind(this)}
        >
          <p className="check-all__arrow">❯</p>
        </button>
        <div className="todos-tasks">
          <ul className="todos-list">
            {this.filterTodos().todos.map((item) => (
              <TasksItem todo={item} key={item.todo_id} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  checkAllTodos
}
const mapStateToProps = (state: any) => {

  return {
    todos: state.todo.todos,
    filterType: state.todo.filterType
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
