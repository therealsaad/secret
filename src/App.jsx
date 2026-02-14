import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Reasons from "./pages/Reasons";
import Special from "./pages/Special";
import Proposal from "./pages/Proposal";
import Trends from "./pages/Trends";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/reasons" element={<Reasons />} />
        <Route path="/proposal" element={<Proposal />} />

        <Route path="/special" element={<Special />} />
        <Route path="/whyily" element={<Reasons />} />
        <Route path="/trend" element={<Trends/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
