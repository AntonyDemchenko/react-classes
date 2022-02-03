import react from "react";
import "./Filter.css";
class Filter extends react.Component {
  state = {};
  render() {
    return (
      <ul className="filter-btns">
        <li className="all selected">
          <button>All</button>
        </li>
        <li className="active">
          <button>Active</button>
        </li>
        <li className="completed">
          <button>Completed</button>
        </li>
      </ul>
    );
  }
}

export default Filter;
