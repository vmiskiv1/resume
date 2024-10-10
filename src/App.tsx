import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Resume } from "./pages/Resume";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Resume />} />
      </Routes>
    </Router>
  );
};

export default App;
