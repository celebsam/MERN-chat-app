import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./screens/Chat";
import Home from "./screens/Home";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
}

export default App;
