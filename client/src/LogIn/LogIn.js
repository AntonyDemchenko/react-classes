import React from "react";
import "./LogIn.css";
import { NavLink } from "react-router-dom";
import emitter from "../EventEmitter";
class LogIn extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    };
    this.todosRef = React.createRef();
  }
  async login(data) {
    const newData = JSON.stringify(data);

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    });
    return response.json();
  }

  handleSubmit(event) {
    this.login(this.state).then((data) => {
      localStorage.setItem("token", JSON.stringify(data));
      emitter.emit("event: check-login", { login: data.status });
    });
    event.preventDefault();

    this.setState({ username: "", password: "" });
  }

  setUserName(e) {
    this.setState({ username: e.trim() });
  }

  setPassword(e) {
    this.setState({ password: e.trim() });
  }

  render() {
    return (
      <div className="login">
        <h1 className="login_title">LOG IN</h1>
        <form
          className="login_form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => this.setUserName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setPassword(e.target.value)}
          />

          <div className="submit">
            <button
              className="submit_btn"
              type="submit"
              value={this.state.password}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="links">
          <NavLink to="/registration" className="sign-up">
            Sign up!
          </NavLink>
        </div>
      </div>
    );
  }
}

export default LogIn;
