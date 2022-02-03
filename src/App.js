import react from "react";
import "./App.css";
import Input from "./Input/Input";
import Tasks from "./Tasks/Tasks";
import Footer from "./Footer/Footer";
import store from "./Store/Store";

class App extends react.Component {
  render() {
    return (
      <div className="container">
        {/* <store /> */}
        <Input />
        <Tasks />
        <Footer />
      </div>
    );
  }
}

export default App;
