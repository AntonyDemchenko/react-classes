import React from "react";
import "./Filter.css";
import emitter from "../../EventEmitter";
class Filter extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  setFilter(e) {
    let allFilterBtns = e.target.closest("ul").querySelectorAll("li");
    allFilterBtns.forEach((element) => {
      element.classList.remove("selected");
    });
    e.target.closest("li").classList.add("selected");

    emitter.emit("event:change-filter-type", {
      filterType: e.target.value,
    });
  }

  render() {
    return (
      <ul className="filter-btns">
        <li className=" selected">
          <button onClick={(e) => this.setFilter(e)} value="all">
            All
          </button>
        </li>
        <li className="">
          <button onClick={(e) => this.setFilter(e)} value="active">
            Active
          </button>
        </li>
        <li className="">
          <button onClick={(e) => this.setFilter(e)} value="completed">
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

export default Filter;
