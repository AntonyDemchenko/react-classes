import React from "react";
import "./Filter.css";
import emitter from "../../EventEmitter";
import { connect } from "react-redux";
import { toggleFilter } from "../../redux/actions"

type StateType = {
  buttons: Array<string>;
  selectedButton: string;

};

type PropsType = {
  toggleFilter: any;
};

class Filter extends React.Component<PropsType, StateType> {
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

    this.props.toggleFilter((event.target as HTMLButtonElement).value)
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

const mapDispatchToProps = {
  toggleFilter
}

export default connect(null, mapDispatchToProps)(Filter);
