import React from "react";
import "./Tasks.css";
import TasksItem from "./TasksItem/TasksItem";
import emitter from "../EventEmitter";

type PropsType = {
  todos: Array<TodoType>;
  filterType: string;
  username: string;
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
    this.state = { todos: [] };
  }

  checkAllTodos() {
    emitter.emit("event:change-all-checkboxes");
  }

  filterTodos(): StateType {
    let newState: StateType = { todos: [] };

    const filterType = this.props.filterType;
    const todosList = this.props.todos;

    if (filterType === "all") {
      newState = todosList;
    } else if (filterType === "active") {
      newState.todos = todosList.filter((item) => item.completed === false);
    } else if (filterType === "completed") {
      newState = todosList.filter((item) => item.completed === true);
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
          onClick={this.checkAllTodos}
        >
          <p className="check-all__arrow">❯</p>
        </button>
        <div className="todos-tasks">
          <ul className="todos-list">
            {this.filterTodos().map((item) => (
              <TasksItem todo={item} key={item.todo_id} />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default Tasks;
