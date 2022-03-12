import React from "react";
import "./App.css";

// import api from "./api";
import emitter from "./EventEmitter";
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import Registration from "./Registration/Registartion";
import TodoApp from "./TodoApp/TodoApp";
import Header from "./Header/Header";

type StateType = {
  login: string;
};

type PropsType = {};

class App extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      login: "start",
    };
  }

  componentDidMount(): void {
    emitter.subscribe("event: check-login", (data: StateType) => {
      this.checkLogin(data.login);
    });
  }

  checkLogin(data: string): void {
    this.setState({
      login: data,
    });
  }

  render() {
    return (
      <>
        {this.state.login ? <Header /> : <></>}
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={this.state.login ? <TodoApp /> : <LogIn />}
            ></Route>

            <Route path="/registration" element={<Registration />}></Route>
          </Routes>
        </div>
      </>
    );
    // }
  }
}

export default App;
