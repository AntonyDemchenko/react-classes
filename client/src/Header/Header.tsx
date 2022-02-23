import React from "react";
import "./Header.css";
import store from "../Store/Store";
import emitter from "../EventEmitter";

type PropsType = {};

type StateType = {
  username: string;
};
class Header extends React.Component<PropsType, StateType> {
  state: StateType;
  mounted: boolean;
  constructor(props: PropsType) {
    super(props);

    this.state = {
      username: store.state.username,
    };

    this.mounted = false;
  }

  componentDidMount(): void {
    this.mounted = true;
    if (this.mounted) {
      emitter.subscribe("event: update-store", () => {
        this.setUsername();
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setUsername(): void {
    this.setState({
      username: store.state.username,
    });
  }

  logOut(): void {
    localStorage.clear();
    emitter.emit("event: check-login", { login: "" });
  }
  render() {
    // this.mounted = false;
    return (
      <header className="main-header">
        <div className="header__user">
          <div className="header__icon"></div>
          <p className="header__user-title">user:</p>
          <p className="header__username">{this.state.username}</p>
        </div>
        <button className="header__logout" onClick={this.logOut}>
          Log out
        </button>
      </header>
    );
  }
}

export default Header;
