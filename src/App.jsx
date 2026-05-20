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
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/reasons" element={<Reasons />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/special" element={<Special />} />
          <Route path="/whyily" element={<Reasons />} />
          <Route path="/trend" element={<Trends />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
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
