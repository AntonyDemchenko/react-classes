import react from "react";
import "./Footer.css";
import Filter from "./Filter/Filter";

class Footer extends react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setCountActiveTodos() {
    let allTodos = this.props.todos;

    let todosCount = allTodos.filter((item) => item.completed === false);

    return todosCount.length;
  }

  render() {
    return (
      <footer className="footer active">
        <span className="todo-count">
          <span className="todo-count__number">
            {this.setCountActiveTodos() + " "}
          </span>
          <span className="todo-count__name">item </span>
          left
        </span>
        <Filter />
        <button className="delete-checked">Clear completed</button>
      </footer>
    );
  }
}

export default Footer;
