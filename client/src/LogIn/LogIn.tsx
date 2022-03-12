import React from "react";
import "./LogIn.css";
import { NavLink } from "react-router-dom";
import emitter from "../EventEmitter";
// import { type } from "os";

type PropsType = {};

type StateType = {
  username: string;
  password: string;
};

type Res = {
  accesstoken: string;
  refreshToken: string;
  user: string;
  status: number;
};

class LogIn extends React.Component<PropsType, StateType> {
  state: StateType;
  todosRef: React.RefObject<HTMLInputElement>;
  constructor(props: PropsType) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.todosRef = React.createRef();
  }

  async login(data: StateType): Promise<Res> {
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

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    this.login(this.state).then((data) => {
      localStorage.setItem("token", JSON.stringify(data));
      emitter.emit("event: check-login", { login: data.status });
    });
    event.preventDefault();

    this.setState({ username: "", password: "" });
  }

  setUserName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ username: (e.target as HTMLInputElement).value.trim() });
  }

  setPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ password: (e.target as HTMLInputElement).value.trim() });
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
            onChange={this.setUserName.bind(this)}
          />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.setPassword.bind(this)}
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
