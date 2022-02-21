import React from "react";
import "./Header.css";
import store from "../Store/Store";
import emitter from "../EventEmitter";
class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      username: store.state.username,
    };
  }

  componentDidMount() {
    emitter.subscribe("event: update-store", (data) => {
      this.setUsername();
    });
  }

  setUsername() {
    this.setState({
      username: store.state.username,
    });
  }

  logOut() {
    console.log("ddddddddddddddddddddddddd");

    localStorage.clear();
    emitter.emit("event: check-login", { login: "" });
  }
  render() {
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
