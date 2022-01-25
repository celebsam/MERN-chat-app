import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/chat" exact component={Chat} />
      </Router>
    </>
  );
}

export default App;
