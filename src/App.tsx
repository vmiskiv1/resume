import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { Resume } from './views/Resume/Resume';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Resume />} />
      </Routes>
    </Router>
  )
}

export default App
