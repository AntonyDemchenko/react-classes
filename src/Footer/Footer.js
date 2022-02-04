import react from "react";
import "./Footer.css";
import Filter from "./Filter/Filter";
class Footer extends react.Component {
  constructor(props) {
    super(props);
    // console.log(props.props);
    this.state = { todos: props.props };
  }
  render() {
    return (
      <footer className="footer active">
        <span className="todo-count">
          <span className="todo-count__number">0 </span>
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
