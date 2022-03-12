import React from "react";
import { NavLink } from "react-router-dom";

import "./Registration.css";
// import emitter from "../EventEmitter";

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

class Registration extends React.Component<PropsType, StateType> {
  state: StateType;
  loginRef: React.RefObject<HTMLAnchorElement>;
  constructor(props: PropsType) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.loginRef = React.createRef();
  }
  async registration(data: StateType): Promise<Res> {
    const newData = JSON.stringify(data);

    const response = await fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    });
    return response.json();
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    this.registration(this.state).then((data) => {
      console.log("reg", data);
      localStorage.setItem(
        "token",
        JSON.stringify({
          accessToken: data.accesstoken,
          refreshToken: data.refreshToken,
        })
      );
      this.detectRegistration(data.status);
    });
    event.preventDefault();
    this.setState({ username: "", password: "" });
  }

  detectRegistration(succesStatus: number) {
    if (succesStatus === 200) {
      (this.loginRef as any).current.click();
    }
  }

  setUserName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ username: (e.target as HTMLInputElement).value });
  }

  setPassword(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ password: (e.target as HTMLInputElement).value });
  }

  render() {
    return (
      <div className="reg">
        <h1 className="reg_title">Registration</h1>

        <form className="reg_form" onSubmit={this.handleSubmit.bind(this)}>
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

        <NavLink to="/" className="sign-in" ref={this.loginRef}>
          Sign in!
        </NavLink>
      </div>
    );
  }
}

export default Registration;
