import react from "react";
import "./App.css";
import Input from "./Input/Input";
import Tasks from "./Tasks/Tasks";
import Footer from "./Footer/Footer";
import store from "./Store/Store";

class App extends react.Component {
  render() {
    // console.log(store.state);
    return (
      <div className="container">
        <Input />
        <Tasks props={store.state} />
        <Footer props={store.state} />
      </div>
    );
  }
}

export default App;
