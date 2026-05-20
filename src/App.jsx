import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import EffectsLayer from "./components/EffectsLayer";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Reasons from "./pages/Reasons";
import Special from "./pages/Special";
import Proposal from "./pages/Proposal";
import Trends from "./pages/Trends";
import Chat from "./pages/Chat";

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<AnimatedPageWrapper><Home /></AnimatedPageWrapper>} />
      <Route path="/story" element={<AnimatedPageWrapper><Story /></AnimatedPageWrapper>} />
      <Route path="/reasons" element={<AnimatedPageWrapper><Reasons /></AnimatedPageWrapper>} />
      <Route path="/proposal" element={<AnimatedPageWrapper><Proposal /></AnimatedPageWrapper>} />
      <Route path="/special" element={<AnimatedPageWrapper><Special /></AnimatedPageWrapper>} />
      <Route path="/whyily" element={<AnimatedPageWrapper><Reasons /></AnimatedPageWrapper>} />
      <Route path="/trend" element={<AnimatedPageWrapper><Trends /></AnimatedPageWrapper>} />
      <Route path="/chat" element={<AnimatedPageWrapper><Chat /></AnimatedPageWrapper>} />
    </Routes>
  );
}

function AnimatedPageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <EffectsLayer />
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
