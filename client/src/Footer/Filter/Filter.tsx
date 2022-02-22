import React from "react";
import "./Filter.css";
import emitter from "../../EventEmitter";

type StateType = {
  buttons: Array<string>;
  selectedButton: string;
};

type PropsType = {};

class Filter extends React.Component<{}, StateType, PropsType> {
  state: StateType;
  constructor(props: PropsType) {
    super(props);

    this.state = {
      buttons: ["all", "active", "completed"],
      selectedButton: "all",
    };
  }

  setFilter(event: React.MouseEvent<HTMLButtonElement>): void {
    this.setState({
      selectedButton: (event.target as HTMLButtonElement).value,
    });

    emitter.emit("event:change-filter-type", {
      filterType: (event.target as HTMLButtonElement).value,
    });
  }

  render() {
    return (
      <ul className="filter-btns">
        {this.state.buttons.map((item) => (
          <button
            className={
              item === this.state.selectedButton
                ? "filter-btns selected"
                : "filter-btn"
            }
            onClick={this.setFilter.bind(this)}
            value={item}
            key={Date.now() * Math.random()}
          >
            {item}
          </button>
        ))}
      </ul>
    );
  }
}

export default Filter;
